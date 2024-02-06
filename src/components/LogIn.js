// client/src/components/LogIn.js

import React, { useState, useContext } from 'react'
import { Formik } from 'formik'
import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Form,
  Container,
  Spinner
} from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../context'
import { getAccessToken } from '../services/AuthService'
import { showErrorNotification } from '../services/notificationService'
import * as Yup from 'yup';

// changed
function LogIn({ isLoggedIn, logIn, setLoggedIn}) {
  const [isSubmitted, setSubmitted] = useState(false)
  const [state, setState] = useContext(UserContext)
  const [isLoading, setLoading] = useState(false);
  const [showRecoverPass, setShowRecoverPass] = useState(false);

  const onSubmit = async (values, actions) => {
    setLoading(true);
    try {
      const { response, isError } = await logIn(
        values.username,
        values.password
      )

      if (isError) {
        showErrorNotification(response);
        
        setShowRecoverPass(true)
      } else {
        setLoggedIn(true)
        setState({
          user: JSON.parse(localStorage.getItem('satnam.user')),
          auth: getAccessToken(),
        })
        setSubmitted(true)
      }
    } catch (error) {
      console.error(error)
      
    }finally {
      setLoading(false); // Stop loading regardless of outcome
    }
  }

    // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Assuming a basic username rule: letters, numbers, dots, and underscores, 3 to 30 characters
  // Adjust the regex according to your username requirements
  const usernameRegex = /^[a-zA-Z0-9._]{3,30}$/;


  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .matches(/\S/, 'El campo no debe estar vacío o contener solo espacios en blanco')
      .required('El campo de usuario/email es obligatorio')
      .test(
        'is-valid-username-or-email',
        'Ingrese un nombre de usuario o correo electrónico válido',
        value => emailRegex.test(value) || usernameRegex.test(value) // Validate against both patterns
      ),
    password: Yup.string()
      .required('La contraseña es obligatoria'),
  });

  if (isLoggedIn || isSubmitted) {
    return <Navigate to='/' />
  }

  return (
    <Container className='mt-2 centered-container'>
      <Card>
        <Card.Header>Log in</Card.Header>
        <Card.Body>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={onSubmit}
          >
            {({ errors, handleChange, handleSubmit,handleBlur,touched, isSubmitting, values }) => (
              <>
                  
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='username'>
                    <Form.Label>Usuario/Email:</Form.Label>
                    <Form.Control
                      name='username'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      isInvalid={touched.username && !!errors.username}
                    />
                    {touched.username && errors.username && (
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                      name='password'
                      onChange={handleChange}
                      type='password'
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={touched.password && !!errors.password}
                    />
                    {touched.password && errors.password && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <div className='d-grid mb-3'>
                    <Button type='submit' variant='primary'>
                      {isLoading ? (
                          <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            {' Loading...'}
                          </>
                        ) : (
                          'Log in'
                        )}
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
          <Card.Text className='text-center'>
            No tienes cuenta? <Link to='/sign-up'>Sign up!</Link>
          </Card.Text>
          
          {showRecoverPass && (
             <Card.Text className='text-center'>
                Se te olvidó tu contraseña ? <Link to='/password-recovery'>Recupera contraseña</Link>
              </Card.Text>
          ) }
         
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LogIn
