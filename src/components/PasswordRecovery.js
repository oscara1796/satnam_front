import React, { useState } from 'react';
import { Formik } from 'formik';
import { Button, Card, Form, Container, Alert, Spinner } from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import axios from 'axios';
import { showErrorNotification } from '../services/notificationService'

function PasswordRecovery({isLoggedIn}) {
  const [isSubmitted, setSubmitted] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const emailSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .matches(/\S/, 'El campo no debe estar vacío o contener solo espacios en blanco')
      .email('El email no es válido')
      .required('El email es obligatorio'),
  });

  const onSubmit = async (values, actions) => {
    setLoading(true);
    try {
      // Adjust the URL to your API endpoint for password recovery
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/password-reset/`, { email: values.email }, { timeout: 5000 });
      toast.success("Si tu email está registrado, recibirás un enlace para restablecer tu contraseña.");
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      showErrorNotification(error)
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    // Optionally redirect the user or give feedback
    return (
        <Container className='mt-2 centered-container'>
            <Alert variant="success" className='text-center'>Revisa tu correo electrónico para instrucciones.</Alert>
        </Container>
    )
  }

  if (isLoggedIn || isSubmitted) {
    return <Navigate to='/' />
  }

  return (
    <Container className='mt-2 centered-container'>
      <Card>
        <Card.Header>Recuperación de Contraseña</Card.Header>
        <Card.Body>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={emailSchema}
            onSubmit={onSubmit}
          >
            {({ errors, handleChange, handleSubmit,handleBlur, touched, values }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='email'>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    isInvalid={touched.email && !!errors.email}
                  />
                  {touched.email && errors.email && (
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
                <div className='d-grid gap-2'>
                  <Button type='submit' variant='primary' disabled={isLoading}>
                    {isLoading ? 
                       <>
                         <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            {' Enviando...'} 
                       </>
                    : 'Enviar'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <Card.Text className='text-center mt-3'>
            Recordaste tu contraseña? <Link to='/log-in'>Iniciar sesión</Link>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PasswordRecovery;
