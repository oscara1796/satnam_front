import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';



const VideoCard = ({ title, image, description, url, free, date_of_creation }) => {

  const [savedData, setSavedData] = useState(null); // Data retrieved from the database

  useEffect(() => {
    // Simulate retrieving data from your database
   

    // Parse the retrieved data and convert it to ContentState
    const parsedData = JSON.parse(description);
    const contentState = convertFromRaw(parsedData);
    // Store the parsed data for rendering
    setSavedData(parsedData);
  }, []); // Ensure this effect runs once when the component mounts



    return (
      <div className="video-card container">
        <img src={image} alt={title} />
        <h2>{title}</h2>
          {savedData && (
          <div>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: stateToHTML(convertFromRaw(savedData)) }} />
          </div>
        )}
        <a href={url} target="_blank" rel="noopener noreferrer">
          Watch Video
        </a>
        <p>{free ? 'Free' : 'Paid'}</p>
        <p>Created on: {new Date(date_of_creation).toLocaleDateString()}</p>
      </div>
    );
  };


export default VideoCard;