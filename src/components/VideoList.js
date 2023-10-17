import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser, getAccessToken } from '../services/AuthService'; 
import VideoCard from './VideoCard';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  useEffect(async ()  => {
    // Fetch video data from your API or data source here
    // Example fetch:

    let url = `${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}/`;
    const token = getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
    let response = await axios.post(url, formData, {
        headers: headers,
      });
  }, []);

  return (
    <div className="video-list">
      {videos.map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
};

export default VideoList;
