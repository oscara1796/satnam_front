import React, { useEffect, useState, useRef } from 'react';
import Webcam from "react-webcam";
import { SunSalutationFactory } from './SunSalutationFactory'; // Import the factory
import './YogaPoseTracker.css'; // Import the CSS

function YogaPoseTracker({isLoggedIn}) {
  const [ws, setWs] = useState(null);
  const [poseResult, setPoseResult] = useState('Waiting for result...');
  const [currentPoseIndex, setCurrentPoseIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const webcamRef = useRef(null);

  // Get the Sun Salutation sequence using the factory
  const sunSalutationSequence = SunSalutationFactory();

  useEffect(() => {
    if (gameStarted) {
      const websocket = new WebSocket(`${process.env.REACT_APP_BASE_URL.replace('http', 'ws')}/ws/pose/`);
      setWs(websocket);

      websocket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.pose_result === 'Pose detection and correctness in progress') {
          setPoseResult('Processing...');
        } else if (data.pose_label && data.is_correct) {
          const expectedPoseValue = sunSalutationSequence[currentPoseIndex].value;
          setPoseResult(`Pose: ${data.pose_label}, Correct: ${data.is_correct}`);
          
          if (data.pose_label === expectedPoseValue && data.is_correct === 'Yes') {
            // Move to the next pose if the current pose is correct
            setCurrentPoseIndex((prevIndex) => prevIndex + 1);
            if (currentPoseIndex + 1 === sunSalutationSequence.length) {
              setPoseResult('Congratulations! You completed the Sun Salutation sequence!');
              setGameStarted(false);
              websocket.close();
            }
          }
        }
      };

      return () => websocket.close();
    }
  }, [gameStarted, currentPoseIndex]);

  const sendImageToWebSocket = () => {
    if (ws && webcamRef.current) {
      const frame = webcamRef.current.getScreenshot();
      if (frame) {
        ws.send(JSON.stringify({ frame }));
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentPoseIndex(0);
    setPoseResult('Waiting for result...');
  };

  useEffect(() => {
    if (gameStarted) {
      const interval = setInterval(() => {
        sendImageToWebSocket();
      }, 1000); // Send frame every second

      return () => clearInterval(interval);
    }
  }, [gameStarted, ws]);

  if (!isLoggedIn ) {
    return <Navigate to='/' />
  }

  return (
    <div className="yoga-pose-tracker">
      <h1 className="title">Yoga Pose Tracker</h1>
      <button className="start-button" onClick={startGame} disabled={gameStarted}>Start Sun Salutation Game</button>
      <p className="pose-result">{poseResult}</p>
      {gameStarted ? (
        <div className="webcam-container">
          <p className="current-pose">Current Pose: {sunSalutationSequence[currentPoseIndex].ui_name}</p>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam"
          />
        </div>
      ) : null}
    </div>
  );
}

export default YogaPoseTracker;
