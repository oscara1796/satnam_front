import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser, getAccessToken } from '../services/AuthService'; 
import VideoCard from './VideoCard';
import { Navigate } from 'react-router-dom'; 

const VideoList = ({isLoggedIn}) => {
  const [videos, setVideos] = useState([]);

  const getVideos = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}/api/video_list/`+ `?page=1&page_size=10`;
    const token = getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
    
    try{
      
      let response = await axios.get(url, {
          headers: headers,
        });
        setVideos(response.data)
    }catch(error){
      console.error('Error getting videos');
      console.log(error);
    }
  }

  useEffect(()  => {
    // Fetch video data from your API or data source here
    // Example fetch:
    getVideos();
  }, []);

  if (!isLoggedIn  ) {
    return <Navigate to='/log-in' />;
  }

  return (
    <div className="video-list">
      {videos && videos.results && videos.results.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
};

export default VideoList;
