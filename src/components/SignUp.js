// client/components/SignUp.js

import React, { useState } from 'react'; 
import { Formik } from 'formik';
import {
  Breadcrumb, Button, Card, Form, Container
} from 'react-bootstrap';
import { Link, Navigate } from 'react-router-dom'; 
import axios from 'axios';

// changed
function SignUp ({isLoggedIn}) {

  const [isSubmitted, setSubmitted] = useState(false);
  const onSubmit = async (values, actions) => {
    // const url ='/api/sign_up/';
    const url = `${process.env.REACT_APP_BASE_URL}/api/sign_up/`;
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('password1', values.password1);
    formData.append('password2', values.password2);
    formData.append('email', values.email);
    formData.append('telephone', values.telephone);

    

    try{
      await axios.post(url, formData);
      setSubmitted(true);
    } catch (response){
      const data = response.response.data;
      console.log("data ",data);
      for(const value in data){
        actions.setFieldError(value, data[value].join(' '));
      }
    }
  };

  if (isLoggedIn || isSubmitted) {
    return <Navigate to='/log-in' />;
  }
  return (
    <Container className="mt-2">
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
                  telephone: ''
                }}
                onSubmit={onSubmit}
              >
                {({
                  errors, 
                  handleChange,
                  handleSubmit,
                  isSubmitting, 
                  setFieldValue, 
                  values
                }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='username'>
                      <Form.Label>Usuario:</Form.Label>
                      <Form.Control
                        className={'username' in errors ? 'is-invalid' : ''}
                        name='username'
                        onChange={handleChange}
                        required
                        values={values.username}
                      />
                      {
                        'username' in errors && (
                          <Form.Control.Feedback type='invalid'>{errors.username}</Form.Control.Feedback>
                        )
                      }
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='email'>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        className={'email' in errors ? 'is-invalid' : ''}
                        type='email'
                        name='email'
                        onChange={handleChange}
                        required
                        values={values.email}
                      />
                      {
                        'email' in errors && (
                          <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                        )
                      }
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='first_name'>
                      <Form.Label>Nombre:</Form.Label>
                      <Form.Control
                        className={'first_name' in errors ? 'is-invalid' : ''}
                        name='first_name'
                        onChange={handleChange}
                        required
                        values={values.first_name}
                      />
                      {
                        'first_name' in errors && (
                          <Form.Control.Feedback type='invalid'>{errors.first_name}</Form.Control.Feedback>
                        )
                      }
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='last_name'>
                      <Form.Label>Apellidos:</Form.Label>
                      <Form.Control
                        className={'last_name' in errors ? 'is-invalid' : ''}
                        name='last_name'
                        onChange={handleChange}
                        required
                        values={values.last_name}
                      />

                      {
                        'last_name' in errors && (
                          <Form.Control.Feedback type='invalid'>{errors.last_name}</Form.Control.Feedback>
                        )
                      }
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='password1'>
                      <Form.Label>Contraseña:</Form.Label>
                      <Form.Control
                        className={'password1' in errors ? 'is-invalid' : ''}
                        name='password1'
                        onChange={handleChange}
                        required
                        type='password'
                        value={values.password1}
                      />
                      {
                        ('password1' in errors) && (
                          <Form.Control.Feedback type='invalid'>{errors.password1}</Form.Control.Feedback>
                        )
                      }
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='password2'>
                      <Form.Label>Confirma Contraseña:</Form.Label>
                      <Form.Control
                        className={'password2' in errors ? 'is-invalid' : ''}
                        name='password2'
                        onChange={handleChange}
                        required
                        type='password'
                        value={values.password2}
                      />
                      {
                        'password2' in errors && (
                          <Form.Control.Feedback type='invalid'>{errors.password2}</Form.Control.Feedback>
                        )
                      }
                    </Form.Group>
                   
                    <Form.Group className='mb-3' controlId='telephone'>
                      <Form.Label>Teléfono:</Form.Label>
                      <Form.Control
                        className={'telephone' in errors ? 'is-invalid' : ''}
                        name='telephone'
                        type='tel'
                        onChange={handleChange}
                        required
                        value={values.telephone}
                      />
                      {
                        'telephone' in errors && (
                          <Form.Control.Feedback type='invalid'>{errors.telephone}</Form.Control.Feedback>
                        )
                      }
                    </Form.Group>

                    <div className='d-grid mb-3'>
                      <Button disabled={isSubmitting} type='submit' variant='primary'>Sign up</Button>
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
  );
}

export default SignUp;
