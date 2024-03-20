import React, { useState } from 'react'
import './ContactForm.css'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import CaptchaForm from './CaptchaForm'

const ContactForm = () => {
  const [captchaValidated, setCaptchaValidated] = useState(false)
  // Initial values for the form
  const initialValues = {
    name: '',
    email: '',
    message: '',
  }

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Correo invalido').required('Required'),
    message: Yup.string().required('Required'),
  })

  // Function to handle form submission
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    if (!captchaValidated) {
      toast.error('Por favor valida el captcha primero')
      setSubmitting(false)
      return
    }

    const apiUrl = `${process.env.REACT_APP_BASE_URL}/api/contact/`

    axios
      .post(apiUrl, values, { timeout: 5000 })
      .then((response) => {
        // Handle success response
        toast.success(`Se ha mandado tu mensaje `)
        resetForm()
      })
      .catch((error) => {
        // Handle error response
        toast.error(`Error mandando tu mensaje: ${error}`)
      })
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <div className='contact-form'>
      <h1>Contáctanos</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor='name'>Nombre</label>
              <Field name='name' type='text' />
              <ErrorMessage name='name' component='div' />
            </div>

            <div>
              <label htmlFor='email'>Email</label>
              <Field name='email' type='email' />
              <ErrorMessage name='email' component='div' />
            </div>

            <div>
              <label htmlFor='message'>Mensaje</label>
              <Field name='message' as='textarea' />
              <ErrorMessage name='message' component='div' />
            </div>

            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <CaptchaForm
        setCaptchaValidated={setCaptchaValidated}
        captchaValidated={captchaValidated}
      />
    </div>
  )
}

export default ContactForm
