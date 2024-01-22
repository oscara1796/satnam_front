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
} from 'react-bootstrap'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../context'
import { getAccessToken } from '../services/AuthService'

// changed
function LogIn({ isLoggedIn, logIn, setLoggedIn}) {
  const [isSubmitted, setSubmitted] = useState(false)
  const [state, setState] = useContext(UserContext)
  const onSubmit = async (values, actions) => {
    try {
      const { response, isError } = await logIn(
        values.username,
        values.password
      )

      if (isError) {
        const data = response.response.data
        for (const value in data) {
          actions.setFieldError(value, data[value])
        }
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
      toast.error(`Error no pudimos hacer log in: ${error.message}`)
    }
  }
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
            onSubmit={onSubmit}
          >
            {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
              <>
                {'errors' in errors && (
                  <Alert variant='danger'>{errors.errors}</Alert>
                )}
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='username'>
                    <Form.Label>Usuario/Email:</Form.Label>
                    <Form.Control
                      name='username'
                      onChange={handleChange}
                      value={values.username}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                      name='password'
                      onChange={handleChange}
                      type='password'
                      value={values.password}
                    />
                  </Form.Group>
                  <div className='d-grid mb-3'>
                    <Button type='submit' variant='primary'>
                      Log in
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
          <Card.Text className='text-center'>
            No tienes cuenta? <Link to='/sign-up'>Sign up!</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LogIn
