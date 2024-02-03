// client/components/SignUp.js

import React, { useState } from 'react'
import { Formik } from 'formik'
import { Breadcrumb, Button, Card, Form, Container, Spinner } from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as Yup from 'yup';
import { showErrorNotification } from '../services/notificationService'


const signupSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .matches(/\S/, 'El campo no debe estar vacío o contener solo espacios en blanco')
    .min(2, 'El nombre de usuario es muy corto')
    .max(30, 'El nombre de usuario es muy largo')
    .required('El nombre de usuario es obligatorio'),
  email: Yup.string()
    .trim()
    .matches(/\S/, 'El campo no debe estar vacío o contener solo espacios en blanco')
    .email('El email no es válido')
    .required('El email es obligatorio'),
  first_name: Yup.string()
    .trim()
    .matches(/\S/, 'El campo no debe estar vacío o contener solo espacios en blanco')
    .required('El nombre es obligatorio'),
  last_name: Yup.string()
    .trim()
    .matches(/\S/, 'El campo no debe estar vacío o contener solo espacios en blanco')
    .required('Los apellidos son obligatorios'),
  password1: Yup.string()
    .trim()
    .matches(/\S/, 'El campo no debe estar vacío o contener solo espacios en blanco')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .required('La contraseña es obligatoria'),
  password2: Yup.string()
    .trim()
    .matches(/\S/, 'El campo no debe estar vacío o contener solo espacios en blanco')
    .oneOf([Yup.ref('password1'), null], 'Las contraseñas no coinciden')
    .required('La confirmación de contraseña es obligatoria'),
  telephone: Yup.string()
    .trim()
    .matches(/\S/, 'El campo no debe estar vacío o contener solo espacios en blanco')
    .matches(/^[0-9]+$/, "El teléfono debe ser numérico")
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .required('El teléfono es obligatorio'),
});


// changed
function SignUp({ isLoggedIn }) {
  const [isSubmitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (values, actions) => {
    setIsLoading(true)
    // const url ='/api/sign_up/';
    const url = `${process.env.REACT_APP_BASE_URL}/api/sign_up/`
    const formData = new FormData()
    formData.append('username', values.username)
    formData.append('first_name', values.first_name)
    formData.append('last_name', values.last_name)
    formData.append('password1', values.password1)
    formData.append('password2', values.password2)
    formData.append('email', values.email)
    formData.append('telephone', values.telephone)

    try {
      await axios.post(url, formData, { timeout: 5000 })
      setSubmitted(true)
    } catch (error) {
      console.log(error);
      showErrorNotification(error)
    }finally {
      setIsLoading(false); // Stop loading regardless of outcome
    }
  }

  if (isLoggedIn || isSubmitted) {
    return <Navigate to='/log-in' />
  }
  return (
    <Container className='mt-2'>
      <Breadcrumb>
        <Breadcrumb.Item href='/#/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Inscríbete</Breadcrumb.Item>
      </Breadcrumb>
      <Card>
        <Card.Header>Inscríbete</Card.Header>
        <Card.Body>
          <Formik
            initialValues={{
              username: '',
              first_name: '',
              email: '',
              last_name: '',
              password1: '',
              password2: '',
              telephone: '',
            }}
            onSubmit={onSubmit}
            validationSchema={signupSchema}
          >
            {({
              errors,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue,
              handleBlur,
              touched,
              values,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='username'>
                  <Form.Label>Usuario:</Form.Label>
                  <Form.Control
                    className={'username' in errors && touched.username ? 'is-invalid' : ''}
                    name='username'
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    values={values.username}
                  />
                  {'username' in errors && touched.username && (
                    <Form.Control.Feedback type='invalid'>
                      {errors.username}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className='mb-3' controlId='email'>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    className={'email' in errors && touched.email ? 'is-invalid' : ''}
                    type='email'
                    name='email'
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    values={values.email}
                  />
                  {'email' in errors && touched.email && (
                    <Form.Control.Feedback type='invalid'>
                      {errors.email}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className='mb-3' controlId='first_name'>
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    className={'first_name' in errors && touched.first_name ? 'is-invalid' : ''}
                    name='first_name'
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    values={values.first_name}
                  />
                  {'first_name' in errors && touched.first_name && (
                    <Form.Control.Feedback type='invalid'>
                      {errors.first_name}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className='mb-3' controlId='last_name'>
                  <Form.Label>Apellidos:</Form.Label>
                  <Form.Control
                    className={'last_name' in errors && touched.last_name ? 'is-invalid' : ''}
                    name='last_name'
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    values={values.last_name}
                  />

                  {'last_name' in errors && touched.last_name && (
                    <Form.Control.Feedback type='invalid'>
                      {errors.last_name}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <Form.Group className='mb-3' controlId='password1'>
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    className={'password1' in errors && touched.password1 ? 'is-invalid' : ''}
                    name='password1'
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    type='password'
                    value={values.password1}
                  />
                  {'password1' in errors && touched.password1 && (
                    <Form.Control.Feedback type='invalid'>
                      {errors.password1}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className='mb-3' controlId='password2'>
                  <Form.Label>Confirma Contraseña:</Form.Label>
                  <Form.Control
                    className={'password2' in errors && touched.password2 ? 'is-invalid' : ''}
                    name='password2'
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    type='password'
                    value={values.password2}
                  />
                  {'password2' in errors && touched.password2 && (
                    <Form.Control.Feedback type='invalid'>
                      {errors.password2}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className='mb-3' controlId='telephone'>
                  <Form.Label>Teléfono:</Form.Label>
                  <Form.Control
                    className={'telephone' in errors && touched.telephone ? 'is-invalid' : ''}
                    name='telephone'
                    type='tel'
                    onChange={handleChange}
                    required
                    onBlur={handleBlur}
                    value={values.telephone}
                  />
                  {'telephone' in errors && touched.telephone && (
                    <Form.Control.Feedback type='invalid'>
                      {errors.telephone}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <div className='d-grid mb-3'>
                  <Button
                    disabled={isSubmitting}
                    type='submit'
                    variant='primary'
                  >
                    {isLoading ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            {' Loading...'}
                          </>
                        ) : (
                          'Sign up'
                        )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <Card.Text className='text-center'>
            Ya tienes cuenta? <Link to='/log-in'>Log in!</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default SignUp
