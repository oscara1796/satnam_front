import React from 'react';

import  { useParams } from 'react-router-dom';


const VideoDetailed = (props) => {
  // Use the useLocation hook to get the location object
  
  const { video_id, video_title } =  useParams();

  return (
    <div className="video-detail">
      <h2>{video_title}</h2>
      <h2>{video_id}</h2>
      {/* <div dangerouslySetInnerHTML={{ __html: videoUrl }} /> */}
      {/* Add more details or components as needed */}
    </div>
  );
}

export default VideoDetailed;
