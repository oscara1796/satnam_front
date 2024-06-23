import React, { useState, useEffect } from 'react'
import {
  EditorState,
  ContentState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { LinkContainer } from 'react-router-bootstrap'

const ImageComponent = ({ image, title }) => {
  const imageUrl = image.startsWith('https://satnam-bucket') ? image : `${process.env.REACT_APP_BASE_URL}${image}`;

  return (
    <img
      src={imageUrl}
      alt={title}
      className='play-icon'
    />
  );
};


const VideoCard = ({
  id,
  title,
  image,
  description,
  url,
  free,
  date_of_creation,
  is_staff,
}) => {
  const [savedData, setSavedData] = useState(null) // Data retrieved from the database

  useEffect(() => {
    // Simulate retrieving data from your database

    // Parse the retrieved data and convert it to ContentState
    const parsedData = JSON.parse(description)
    const contentState = convertFromRaw(parsedData)
    console.log(parsedData)
    // Store the parsed data for rendering
    setSavedData(parsedData)
  }, []) // Ensure this effect runs once when the component mounts

  const getPlainTextFromContentState = (contentState) => {
    const fullContent = contentState.blocks
      .map((block) => block.text)
      .join('\n')
    const maxLength = 200 // Set the maximum length you want to display

    const truncatedContent =
      fullContent.length > maxLength
        ? fullContent.slice(0, maxLength) + '...' // Display ellipsis for truncated content
        : fullContent
    return truncatedContent
  }
  return (
    <div className='video-card-search container'>
      {/* if user is staff then can modify videos */}
      {is_staff && (
        <LinkContainer
          to={{
            pathname: `/video-update/${id}/${title}`, // Adjust the route path as needed
          }}
        >
          <a className='video_link_edit'>editar Video</a>
        </LinkContainer>
      )}

      {free && (
        <div className='free-icon'>
          {/* Add an icon or board design for free videos */}
          <span>Gratis</span>
        </div>
      )}
      <h2>{title}</h2>
      <LinkContainer to={`/video-detailed/${id}/${title}`}>
        <div className='video-image-container'>
          <ImageComponent image={image} title={title} />
          <i className='play-icon'>▶️</i> {/* Add a play icon */}
        </div>
      </LinkContainer>
      {savedData && (
        <div>
          <hr />
          {/* <div dangerouslySetInnerHTML={{ __html: stateToHTML(convertFromRaw(savedData)) }} /> */}
          <p>{getPlainTextFromContentState(savedData)}</p>
        </div>
      )}
      <LinkContainer
        to={{
          pathname: `/video-detailed/${id}/${title}`, // Adjust the route path as needed
        }}
      >
        <a className='video_link'>Ver Video</a>
      </LinkContainer>

      <p>Creado el: {new Date(date_of_creation).toLocaleDateString()}</p>
    </div>
  )
}

export default VideoCard
