import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { getUser, getAccessToken } from '../services/AuthService'
import axios from 'axios'

const CreateCategory = ({ onClose, setGetCategories }) => {
  // Define the initial form values
  const initialValues = {
    title: '',
    description: '',
  }

  // Submit handler
  const onSubmit = async (values, { setSubmitting }) => {
    // Handle form submission here (e.g., send data to the server)
    console.log('Submitted values:', values)
    const url = `${process.env.REACT_APP_BASE_URL}/api/category_list/`
    const token = getAccessToken()
    const headers = { Authorization: `Bearer ${token}` }
    const formData = new FormData()
    formData.append('title', values.title)
    formData.append('description', values.description)

    try {
      let response = await axios.post(
        url,
        formData,
        {
          headers: headers,
        },
        { timeout: 5000 }
      )
      console.log(response.data)
      setGetCategories(true)
      onClose()
    } catch (error) {
      console.error('Error creating category')
      console.log(error)
    }
    setSubmitting(false)
  }

  return (
    <div
      className={`modal show`}
      style={{ display: 'block' }}
      tabIndex='-1'
      role='dialog'
    >
      <div className='modal-dialog modal-dialog-centered' role='document'>
        <div className='modal-content shadow'>
          <div className='modal-header'>
            <h5 className='modal-title'>Añade categoria</h5>
            <button
              type='button'
              className='close'
              data-dismiss='modal'
              aria-label='Close'
              onClick={onClose}
            >
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
          <div className='modal-body'>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  <div className='mb-3'>
                    <label htmlFor='title' className='form-label'>
                      Título
                    </label>
                    <Field
                      id='title_category'
                      type='text'
                      name='title'
                      className='form-control'
                      required
                    />
                    <ErrorMessage
                      name='title'
                      component='div'
                      className='text-danger'
                    />
                  </div>

                  <div className='mb-3'>
                    <label htmlFor='description' className='form-label'>
                      Descripción
                    </label>
                    <Field
                      id='category_description'
                      as='textarea'
                      name='description'
                      className='form-control'
                      required
                    />
                    <ErrorMessage
                      name='description'
                      component='div'
                      className='text-danger'
                    />
                  </div>

                  <button
                    id='category_submit_button'
                    type='submit'
                    disabled={isSubmitting}
                    className='btn btn-primary'
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-dismiss='modal'
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCategory
