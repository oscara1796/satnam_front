import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { getUser, getAccessToken } from '../services/AuthService'
import VideoCard from './VideoCard'
import PageIndex from './PageIndex'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context'
import './Spinner.css'

const Spinner = () => {
  return <div className='spinner'></div>
}

const Categories = ({ handleCategoryOption, selectedCategory }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function getCategories() {
      // Define the URL of your Django API endpoint
      const url = `${process.env.REACT_APP_BASE_URL}/api/category_list/`
      const token = getAccessToken()
      const headers = { Authorization: `Bearer ${token}` }

      // Fetch categories from the API
      try {
        let response = await axios.get(
          url,
          {
            headers: headers,
          },
          { timeout: 5000 }
        )
        setCategories(response.data)
        console.log('categories', response.data)
      } catch (error) {
        console.error('Error obtaining categories:')
        console.log(error)
      }
    }

    getCategories()
  }, [])

  return (
    <>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={handleCategoryOption}
          value={category.id}
          style={{
            backgroundColor:
              category.id == selectedCategory ? '#007bff' : 'initial',
            color: category.id == selectedCategory ? 'white' : 'initial',
          }}
        >
          {category.title}
        </button>
      ))}
    </>
  )
}

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
    const token = getAccessToken()
    const headers = { Authorization: `Bearer ${token}` }

    if (searchQuery) {
      url = url + `&search=${searchQuery}`
    }

    if (category) {
      url = url + `&category=${category}`
    }

    try {
      let response = await axios.get(
        url,
        {
          headers: headers,
        },
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

  if (!isLoggedIn) {
    return <Navigate to='/log-in' />
  }

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
