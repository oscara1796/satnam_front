import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { getUser, getAccessToken } from '../services/AuthService'
import VideoCard from './VideoCard'
import PageIndex from './PageIndex'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './Spinner.css'

const MySwal = withReactContent(Swal);

const Categories = ({ handleCategoryOption, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    async function getCategories() {
      // Define the URL of your Django API endpoint
      const url = `${process.env.REACT_APP_BASE_URL}/api/category_list/`;

      // Fetch categories from the API
      try {
        let response = await axios.get(url, {  timeout: 5000 });
        setCategories(response.data);
        console.log('categories', response.data);
      } catch (error) {
        console.error('Error obtaining categories:');
        console.log(error);
      }
    }

    getCategories();
  }, []);

  const handleDeleteCategory = async (categoryId) => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/category_detail/${categoryId}/`;
    const token = getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    try {
      await axios.delete(url, { headers: headers });
      setCategories(categories.filter(category => category.id !== categoryId));
      console.log('Category deleted successfully');
    } catch (error) {
      console.error('Error deleting category:');
      console.log(error);
    }
  };

  const confirmDeleteCategory = (categoryId) => {
    MySwal.fire({
      title: 'Estas segur@?',
      text: 'Realmente  quieres eliminar esta categoria?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteCategory(categoryId);
        MySwal.fire('Eliminada!', 'La categoria ha sido eliminada con exito.', 'success');
      }
    });
  };

  return (
    <>
      {categories.map((category) => (
        <div key={category.id} style={{ marginBottom: '10px' }}>
          {state.user && state.user.is_staff && (
            <button
              onClick={() => confirmDeleteCategory(category.id)}
              className='delete-category-button'
              style={{ marginBottom: '5px', backgroundColor: 'red', color: 'white' }}
            >
              Delete {category.title}
            </button>
          )}
          <button
            onClick={handleCategoryOption}
            value={category.id}
            style={{
              backgroundColor: category.id == selectedCategory ? '#007bff' : 'initial',
              color: category.id == selectedCategory ? 'white' : 'initial',
            }}
          >
            {category.title}
          </button>
        </div>
      ))}
    </>
  );
};


const VideoList = ({ isLoggedIn }) => {
  const [videos, setVideos] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [searchInitiated, setSearchInitiated] = useState(false)
  const [state, setState] = useContext(UserContext)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const video_elements_per_page = 9

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.trim())
  }

  const handleSearch = async () => {
    setCategory('')
    if (searchQuery === '') {
      setPage(1)
    }
    setSearchInitiated(!searchInitiated)
  }

  const handleCategoryOption = async (event) => {
    setSearchQuery('')
    setPage(1)
    if (event.target.value === category) {
      setCategory('')
    } else {
      setCategory(event.target.value)
    }
  }

  const getVideos = async () => {
    let url =
      `${process.env.REACT_APP_BASE_URL}/api/video_list/` +
      `?page=${page}&page_size=${video_elements_per_page}`
    

    if (searchQuery) {
      url = url + `&search=${searchQuery}`
    }

    if (category) {
      url = url + `&category=${category}`
    }

    try {
      let response = await axios.get(
        url,
        { timeout: 5000 }
      )
      setTotalPages(
        Math.ceil(response.data.total_count / video_elements_per_page)
      )
      console.log(response.data)
      setVideos(response.data)
    } catch (error) {
      setVideos([])
      console.error('Error getting videos')
      console.log(error)
    }
  }

  useEffect(() => {
    // Fetch video data from your API or data source here
    // Example fetch:
    getVideos()
  }, [page, category, searchInitiated])

 

  return (
    <div className='video-list container-fluid mt-4'>
      <div className='video_search_container'>
        <input
          type='text'
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch()
            }
          }}
        />
        <button onClick={handleSearch}>Buscar videos</button>
      </div>
      <h3 className='text-center'>Categorías</h3>
      <div className='categories_container'>
        <Categories
          handleCategoryOption={handleCategoryOption}
          selectedCategory={category}
        />
      </div>
      {videos && videos.results && videos.results.length > 0 ? (
        <>
          <div className='videos-grid'>
            {videos.results.map((video) => (
              <VideoCard
                key={video.id}
                {...video}
                is_staff={state.user ? state.user.is_staff : false}
              />
            ))}
          </div>
          <PageIndex totalPages={totalPages} page={page} setPage={setPage} />
        </>
      ) : (
        <div
          className='d-flex align-items-center justify-content-center'
          style={{ height: '80vh' }}
        >
          <p className='text-center' style={{ fontSize: '3rem' }}>
            No hay videos por aqui ...{' '}
          </p>
        </div>
      )}
    </div>
  )
}

export default VideoList
