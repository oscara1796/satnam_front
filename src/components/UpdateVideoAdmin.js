import React, { useEffect, useState, useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Container, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { UserContext } from '../context'
import axios from 'axios'
import { getUser, getAccessToken } from '../services/AuthService'
import { Navigate } from 'react-router-dom'
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'

import CreateCategory from './CreateCategory'
// import { CategoryList } from './CreateVideoAdmin'


const CategoryList = ({ getCategory, field, form, ...props }) => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    // Fetches categories from the server
    async function getCategories() {
      const url = `${process.env.REACT_APP_BASE_URL}/api/category_list/`
      const token = getAccessToken()
      const headers = { Authorization: `Bearer ${token}` }

      try {
        let response = await axios.get(url, {
          headers: headers,
        })
        setCategories(response.data)
      } catch (error) {
        toast.error(`Error obteniendo categorías: ${error.message}`)
      }
    }

    getCategories()
  }, [getCategory])

  // Render a select dropdown with categories
  return (
    <select {...field} {...props}>
      {categories.map((category) => (
        <option key={category.id} data_key={category.id} value={category.title}>
          {category.title}
        </option>
      ))}
    </select>
  )
}

const UpdateVideoAdmin = (props) => {
  const [isSubmitted, setSubmitted] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [getCategory, setGetCategories] = useState(false)
  const [isExpanded, setExpanded] = useState(false)
  const { video_id, video_title } = useParams()
  const [state, setState] = useContext(UserContext)
  const [video, setVideo] = useState({})
  // const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const getVideo = async () => {
    // Replace 'your_api_base_url' with the actual base URL of your API
    const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/video_detail/${video_id}/`

    const token = getAccessToken()
    const headers = { Authorization: `Bearer ${token}` }

    // Make the GET request to retrieve the video
    try {
      let response = await axios.get(apiUrl, {
        headers: headers,
      })
      console.log('videos', response.data)
      setVideo({
        ...response.data,
        description: EditorState.createWithContent(
          convertFromRaw(JSON.parse(response.data.description))
        ),
      })
    } catch (error) {
      console.error('Error obtaining videos:')
      console.log(error)
    }
  }

  useEffect(() => {
    getVideo()
  }, [])

  // Handles form submission
  const handleSubmit = async (values) => {
    // Ensure you handle the description properly
    const contentState = values.description.getCurrentContent()
    if (!contentState.hasText()) {
      toast.error('Please provide a description.')
      return
    }
    const content = JSON.stringify(convertToRaw(contentState))

    // Getting selected category details
    const selectedOption =
      document.getElementById('mySelect').options[
        document.getElementById('mySelect').selectedIndex
      ]
    const optionAttributes = Array.from(selectedOption.attributes).reduce(
      (acc, attr) => {
        acc[attr.name] = attr.value
        return acc
      },
      {}
    )

    // Create form data for submission
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('image', values.image)
    formData.append('description', content)
    formData.append('categories', JSON.stringify(optionAttributes))
    formData.append('url', values.url)
    formData.append('free', values.free)

    const url = `${process.env.REACT_APP_BASE_URL}/api/video_detail/${video_id}/`
    const token = getAccessToken()
    const headers = { Authorization: `Bearer ${token}` }

    try {
      // Make a POST request to submit the form data
      let response = await axios.put(url, formData, {
        headers: headers,
      })
      console.log(response.data)
      setSubmitted(true)
    } catch (error) {
      console.error('Error creating subscription:')
      console.log(error)
      console.log('navigate to cancel')
      toast.error(`Error actualizando video: ${error.message}`)
    }
  }

  if (!props.isLoggedIn || (state.user && !state.user.is_staff)) {
    return <Navigate to='/log-in' />
  }

  if (isSubmitted) {
    console.log('navigate to videos ')
    return <Navigate to='/videos' />
  }

  const closeModal = () => {
    setShowModal(false)
  }

  // Function to open the modal
  const openModal = () => {
    setShowModal(true)
  }

  const handleToggleExpand = () => {
    setExpanded(!isExpanded)
  }

  // Validation logic for Formik
  const validate = (values) => {
    const errors = {}
    if (!values.title) {
      errors.title = 'Titulo es requerido'
    }
    // Regex pattern to validate Vimeo embed code
    const vimeoEmbedPattern =
      /<div.*src="https:\/\/player\.vimeo\.com\/video\/\d+.*<\/script>/

    // Validation for URL to be a Vimeo embed code
    if (!values.url.match(vimeoEmbedPattern)) {
      errors.url = 'URL tiene que ser una url de vimeo valida'
    }
    if (values.description.getCurrentContent().hasText() === false) {
      errors.description = 'Description es requerida'
    }
    return errors
  }

  return (
    <Container className='mt-2  sub_form create_video_form'>
      {/* Formik component for handling form state and submission */}
      <Formik
        initialValues={video}
        enableReinitialize={true}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {({ isSubmitting, setFieldValue, handleChange, values }) => (
          <Form>
            <div className='mb-3'>
              <label htmlFor='title' className='form-label'>
                Titulo video:
              </label>
              <Field
                type='text'
                name='title'
                className='form-control'
                value={values.title}
                required
              />
              <ErrorMessage
                name='title'
                component='div'
                className='text-danger'
              />
            </div>
            <div className='col-md-12 mb-3'>
              <label htmlFor='image' className='form-label'>
                Image:
              </label>
              <input
                type='file'
                name='image'
                className='form-control'
                onChange={(event) => {
                  const file = event.currentTarget.files[0]
                  setFieldValue('image', file)
                }}
                required
              />
              <ErrorMessage
                name='image'
                component='div'
                className='text-danger'
              />
            </div>

            {isExpanded && (
              <div className='col-md-12 mb-3 expanded-overlay'>
                <div className='expanded-editor'>
                  <button
                    className='expanded-editor-button'
                    onClick={handleToggleExpand}
                  >
                    Reduce Editor
                  </button>
                  <label htmlFor='description' className='form-label'>
                    Description:
                  </label>
                  <Field
                    name='description'
                    render={({ field, form }) => (
                      <Editor
                        editorState={field.value || EditorState.createEmpty()}
                        onEditorStateChange={(editorState) =>
                          form.setFieldValue(field.name, editorState)
                        }
                        className='custom-editor'
                        wrapperClassName='wrapper-class'
                        editorClassName='expanded-editor-class'
                        toolbarClassName='toolbar-class'
                      />
                    )}
                    required
                  />
                  <ErrorMessage
                    name='description'
                    component='div'
                    className='text-danger'
                  />
                </div>
              </div>
            )}

            {!isExpanded && (
              <div className='col-md-12 mb-3'>
                <label htmlFor='description' className='form-label'>
                  Description:
                </label>
                <Field
                  name='description'
                  render={({ field, form }) => (
                    <Editor
                      editorState={field.value || EditorState.createEmpty()}
                      onEditorStateChange={(editorState) =>
                        form.setFieldValue(field.name, editorState)
                      }
                      className='custom-editor'
                      wrapperClassName='wrapper-class'
                      editorClassName='editor-class'
                      toolbarClassName='toolbar-class'
                    />
                  )}
                  required
                />
                <ErrorMessage
                  name='description'
                  component='div'
                  className='text-danger'
                />
                <button onClick={handleToggleExpand}>Expand Editor</button>
              </div>
            )}

            <div className='mb-3'>
              <label htmlFor='url' className='form-label'>
                Video url:
              </label>
              <Field
                type='url'
                name='url'
                required
                as='textarea' // Use the custom URL input component
                className='form-control'
                rows={4}
              />
              <ErrorMessage
                name='url'
                component='div'
                className='text-danger'
              />
            </div>

            <div className='mb-3 create-video-checkbox'>
              <label htmlFor='free' className='form-label'>
                <Field type='checkbox' name='free' /> Gratis
              </label>

              <ErrorMessage
                name='free'
                component='div'
                className='text-danger'
              />
            </div>

            <div className='col-md-6 mb-3 d-flex justify-content-start  align-items-center'>
              <label htmlFor='categories' className='form-label me-3'>
                Categorias:
              </label>
              <Field
                as='select'
                id='mySelect'
                name='categories'
                className='form-control me-3'
                component={CategoryList}
                getCategory={getCategory}
                required
              />
              <ErrorMessage
                name='categories'
                component='div'
                className='text-danger'
              />
              <button
                type='button'
                className='btn btn-primary mt-2'
                onClick={openModal}
              >
                Añade categoria
              </button>
            </div>

            <button
              id='create_video_button'
              type='submit'
              className='btn btn-primary'
              disabled={isSubmitting}
            >
              Crea video
            </button>
            <Button variant='danger' className='ms-4' onClick={openModal}>
              Eliminar
            </Button>
          </Form>
        )}
      </Formik>

      {/* Display the modal for creating a category */}
      {showModal && (
        <CreateCategory
          onClose={closeModal}
          setGetCategories={setGetCategories}
        />
      )}
    </Container>
  )
}

export default UpdateVideoAdmin
