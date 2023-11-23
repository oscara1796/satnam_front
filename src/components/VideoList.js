import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUser, getAccessToken } from '../services/AuthService'; 
import VideoCard from './VideoCard';
import { Navigate } from 'react-router-dom'; 

const Categories = ({handleCategoryOption}) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      // Define the URL of your Django API endpoint
      const url = `${process.env.REACT_APP_BASE_URL}/api/category_list/`;
      const token = getAccessToken();
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch categories from the API
      try {
        let response = await axios.get(url, {
          headers: headers,
        });
        setCategories(response.data);
        console.log("categories", response.data);
      } catch (error) {
        console.error('Error obtaining categories:');
        console.log(error);
      }
    }

    getCategories();
  }, []);

  return (
    <>
      {categories.map((category) => (
        <button key={category.id} onClick={handleCategoryOption} value={category.id}>{category.title}</button>
      ))}
    </>
  );
};

const VideoList = ({isLoggedIn}) => {
  const [videos, setVideos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/search_videos/?search=${searchQuery}`);
      console.log(response.data);
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCategoryOption = async (event) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/search_videos/?category=${event.target.value}`);
      console.log(response.data);
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const getVideos = async () => {
    let url = `${process.env.REACT_APP_BASE_URL}/api/video_list/`+ `?page=1&page_size=5`;
    const token = getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
    
    try{
      
      let response = await axios.get(url, {
          headers: headers,
        });
        console.log(response.data);
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
    <div className="video-list container-fluid mt-4">
      {videos && videos.results && videos.results.length  > 0 ? (
        <>
           <div className='video_search_container'>
            <input type="text" value={searchQuery} onChange={handleSearchChange} />
              <button onClick={handleSearch}>Buscar videos</button>
           </div>
           <div className='categories_container'>
            <Categories handleCategoryOption={handleCategoryOption} />
           </div>
           <div className='videos-grid'>
            {
              videos.results.map((video) => (
                <VideoCard key={video.id} {...video} />
              ))
            }
           </div>
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center" style={{height: '80vh'}}>
          <p className='text-center' style={{fontSize: '3rem'}} >No hay videos por aqui ...  </p>
        </div>
      )}
    </div>
  );
};




export default VideoList;
