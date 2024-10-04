import React, { useState, useEffect, useContext } from 'react'
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { getUser, getAccessToken } from '../services/AuthService'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap' // new
import { LinkContainer } from 'react-router-bootstrap'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../context'
import './VideoDetailed.css'

const VideoDetailed = (props) => {
  // Use the useLocation hook to get the location object
  const [state, setState] = useContext(UserContext)

  const [video, setVideo] = useState(null)
  const { video_id, video_title } = useParams() //
  const getVideo = async () => {
    // Replace 'your_api_base_url' with the actual base URL of your API
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/video_detail/${video_id}`

    const token = getAccessToken()

    // Make the GET request to retrieve the video
    try {
      let response = await axios.get(
        apiUrl,
        { timeout: 5000 }
      )

      setVideo(response.data)
      console.log('videos', response.data)
    } catch (error) {
      console.error('Error obtaining videos:')
      console.log(error)
      console.log(video)
    }
  }

  useEffect(() => {
    getVideo()
    console.log('video', video)
  }, [])

  

  function convertRawDataToDescription(rawData) {
    const parsedData = JSON.parse(rawData)

    return stateToHTML(convertFromRaw(parsedData))
  }

  const showVideoPlayer =
    (state.user && state.user.active) ||
    (state.user && state.user.is_staff) ||
    (video && video.free)

  return (
    <div className='video-detail'>
      {video ? (
        <div className='video-detail-container'>
          <div className='video-card'>
            <h2 className='video-title'>{video.title}</h2>

            {video.free ? <bold className='mb-2'> Video gratis</bold> : <></>}

            {showVideoPlayer ? (
              <div
                className='video-embed'
                dangerouslySetInnerHTML={{ __html: video.url }}
              />
            ) : (
              <div className='custom-video-container'>
                {/* Your custom video player with play button and "Inscríbite" legend */}
                <div className='video-overlay'>
                  <div className='play-button'></div>
                  <LinkContainer to='/payment-methods'>
                    <Button variant='outline-light' className='inscribe-button'>
                      Inscríbite para ver el video
                    </Button>
                  </LinkContainer>
                </div>
              </div>
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: convertRawDataToDescription(video.description),
              }}
            />
            <p className='video-date'>
              Date of Creation: {video.date_of_creation}
            </p>
            {/* Add more attributes as needed */}
          </div>
        </div>
      ) : (
        <div className='subscription-container text-center'>
          <div className='subscription-box'>
            <h2>Suscríbete a la Escuela de Yoga</h2>
            <p>
              Para ver el video completo, suscríbete a nuestra escuela de yoga y
              disfruta del acceso completo a todo el contenido.
            </p>

            <LinkContainer to='/payment-methods'>
              <Button variant='primary' className='subscribe-button'>
                Subscribe
              </Button>
            </LinkContainer>
          </div>
        </div>
      )}

      {/* <div dangerouslySetInnerHTML={{ __html: videoUrl }} /> */}
      {/* Add more details or components as needed */}
    </div>
  )
}

export default VideoDetailed
