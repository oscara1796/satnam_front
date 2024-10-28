// YogaPoseTracker.js - Updated to Send Frames Every Three Seconds
import React, { useEffect, useState, useRef } from 'react';
import Webcam from 'react-webcam'; // Import Webcam component
import { SunSalutationFactory } from './YogaPosefactory'; // Import the factory
import { Navigate } from 'react-router-dom';
import './YogaPoseTracker.css'; // Import the CSS
import { Pose } from '@mediapipe/pose';
import * as cam from '@mediapipe/camera_utils';
import * as drawingUtils from '@mediapipe/drawing_utils';

function YogaPoseTracker({ isLoggedIn }) {
  const wsRef = useRef(null);
  const waitingForResponseRef = useRef(false);
  const lastFrameSentTimeRef = useRef(0); // Keep track of last frame sent time
  const [poseResult, setPoseResult] = useState('Waiting for result...');
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Get the Sun Salutation sequence using the factory
  const sunSalutationSequence = SunSalutationFactory();

  // Initialize WebSocket only once when the component mounts
  useEffect(() => {
    if (!wsRef.current) {
      const websocketUrl = process.env.REACT_APP_BASE_URL
        ? `${process.env.REACT_APP_BASE_URL.replace('http', 'ws')}/ws/pose/`
        : 'ws://localhost:8000/ws/pose/'; // Fallback URL for development
      try {
        const websocket = new WebSocket(websocketUrl);
        wsRef.current = websocket;

        websocket.onopen = () => {
          console.log('WebSocket connection established');
        };

        websocket.onmessage = function (event) {
          const data = JSON.parse(event.data);
          waitingForResponseRef.current = false; // Allow sending next keypoints now that response is received

          // Handle the received data
          handleWebSocketMessage(data);
        };

        websocket.onerror = (error) => {
          console.error('WebSocket error observed:', error);
          setPoseResult('WebSocket connection error. Please try restarting the game.');
        };

        websocket.onclose = (event) => {
          console.log(`WebSocket closed with code: ${event.code}`);
          wsRef.current = null;
        };
      } catch (error) {
        console.error('WebSocket connection error:', error);
      }
    }

    // Cleanup function to close WebSocket when component unmounts
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, []); // Empty dependency array to run only once when the component mounts

  useEffect(() => {
    let camera = null;

    if ((gameStarted || isCountingDown) && webcamRef.current !== null) {
      const pose = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.5,
      });

      pose.onResults(onResults);

      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await pose.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }

    return () => {
      if (camera) {
        camera.stop();
      }
    };
  }, [gameStarted, isCountingDown]);

  const onResults = (results) => {
    if (canvasRef.current && webcamRef.current) {
      const canvasElement = canvasRef.current;
      const canvasCtx = canvasElement.getContext('2d');

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);

      if (results.poseLandmarks) {
        drawingUtils.drawConnectors(
          canvasCtx,
          results.poseLandmarks,
          Pose.POSE_CONNECTIONS,
          { color: '#00FF00', lineWidth: 4 }
        );
        drawingUtils.drawLandmarks(canvasCtx, results.poseLandmarks, {
          color: '#FF0000',
          lineWidth: 3,
        });
      }
      canvasCtx.restore();
    }

    const currentTime = Date.now();
    if (
      results.poseLandmarks &&
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN &&
      !waitingForResponseRef.current &&
      gameStarted &&
      !isCountingDown &&
      !isTransitioning &&
      currentTime - lastFrameSentTimeRef.current >= 3000 // Check if 3 seconds have passed
    ) {
      try {
        // Extract keypoints and send to the server
        const keypoints = results.poseLandmarks.map((landmark) => ({
          x: landmark.x,
          y: landmark.y,
          z: landmark.z,
          visibility: landmark.visibility,
        }));

        wsRef.current.send(JSON.stringify({ keypoints }));
        waitingForResponseRef.current = true; // Block sending until we receive response
        lastFrameSentTimeRef.current = currentTime; // Update the last sent time

        // Optionally, display 'Processing...' while waiting
        setPoseResult('Processing...');
      } catch (error) {
        console.error('Failed to send keypoints to WebSocket:', error);
      }
    }
  };

  const handleWebSocketMessage = (data) => {
    if (data.pose_result === 'Processing...') {
      setPoseResult('Processing...');
    } else if (data.pose_label && data.is_correct) {
      const expectedPoseValue = sunSalutationSequence[currentPoseIndex].value;

      if (data.pose_label === expectedPoseValue && data.is_correct === 'Yes') {
        // Correct pose performed
        setPoseResult(`Correct! You performed ${data.pose_label}`);
        setIsTransitioning(true); // Start transition period
        // Stop sending frames during the transition
        setTimeout(() => {
          setIsTransitioning(false);
          const nextIndex = currentPoseIndex + 1;
          if (nextIndex === sunSalutationSequence.length) {
            setPoseResult('Congratulations! You completed the Sun Salutation sequence!');
            setGameStarted(false);
            setCurrentPoseIndex(0); // Reset index to 0
          } else {
            setCurrentPoseIndex(nextIndex);
            setPoseResult(`Get ready for ${sunSalutationSequence[nextIndex].ui_name}`);
          }
        }, 3000); // Wait for 3 seconds
      } else {
        // Not the correct pose
        setPoseResult(`Pose: ${data.pose_label}, Correct: ${data.is_correct}`);
        waitingForResponseRef.current = false; // Allow sending next keypoints
      }
    } else if (data.error) {
      console.error('Error from server:', data.error);
      setPoseResult('Error processing pose. Please try again.');
      waitingForResponseRef.current = false; // Allow sending next keypoints
    }
  };

  const startGame = () => {
    setPoseResult('Get ready...');
    setCurrentPoseIndex(0);
    setIsTransitioning(false);
    setIsCountingDown(true);
    setGameStarted(false);
    lastFrameSentTimeRef.current = Date.now(); // Initialize last sent time
    setTimeout(() => {
      setIsCountingDown(false);
      setGameStarted(true);
      setPoseResult('Waiting for result...');
    }, 3000);
  };

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="yoga-pose-tracker">
      <h1 className="title">Yoga Pose Tracker</h1>
      <button className="start-button" onClick={startGame} disabled={gameStarted || isCountingDown}>
        Start Sun Salutation Game
      </button>
      <p className="pose-result">{poseResult}</p>
      {gameStarted || isCountingDown ? (
        <div className="webcam-container">
          <p className="current-pose">
            Current Pose: {sunSalutationSequence[currentPoseIndex]?.ui_name} | {sunSalutationSequence[currentPoseIndex]?.value}
          </p>
          <div className="camera-feed">
            <Webcam
              ref={webcamRef}
              style={{ display: 'none' }} // Hide the actual webcam video
              screenshotFormat="image/jpeg"
              width={640}
              height={480}
              mirrored={true}
            />
            <canvas ref={canvasRef} width={640} height={480} className="output_canvas" />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default YogaPoseTracker;
