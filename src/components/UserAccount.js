import React, { useState, useEffect } from 'react';
import {
  Breadcrumb, Button, Card, Form, Container
} from 'react-bootstrap';
import { Formik } from 'formik';
import { Link, Navigate } from 'react-router-dom'; 
import { getUser, getAccessToken } from '../services/AuthService'; 
import axios from 'axios';


function UserAccount({isLoggedIn, setSubscriptionFormSubmitted, logIn}) {

  

  const [userData, setUserData] = useState({});
  const [isFormEnabled, setIsFormEnabled] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);


  

  useEffect(() => {
    const fetchUser =() => {
      const user = getUser();
      console.log("user ", user);
      if (user != undefined){
        setUserData(user);
      }
    };

    fetchUser();
  }, []);

  
  
  

  

  const handleButtonClick = () => {
    setIsFormEnabled(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit =  async (values, actions) => {

    const url = `${process.env.REACT_APP_BASE_URL}/api/users/${userData.id}/`;
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('password1', values.password1);
    formData.append('password2', values.password2);
    formData.append('email', values.email);
    formData.append('telephone', values.telephone);
    // Perform additional form submission logic here

    const token = getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const res = await axios.put(url, formData, {
        headers: headers,
      });
      console.log(formData);
      await logIn(values.username, values.password1);
      setSubmitted(true);
      
    } catch (response) {
      const data = response.response.data;
      console.log("data ",data);
      for(const value in data){
        actions.setFieldError(value, data[value].join(' '));
      }
    }
  };

  if (!isLoggedIn  || isSubmitted) {
    return <Navigate to='/' />;
  }

  return (
    <Container className='mt-2 user_info_container'>
        <Container>

          {userData.active ? (<UserSubscription  setSubscriptionFormSubmitted={setSubscriptionFormSubmitted}  />) : (<></>)}
        </Container>


        <Container className="mt-2  user_form">
            <Formik
              initialValues={userData}
              enableReinitialize={true}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (

                
                <Form onSubmit={handleSubmit} >
                  <Form.Group className='mb-3' controlId='username'>
                        <Form.Label>Usuario:</Form.Label>
                        <Form.Control
                          className={'username' in errors ? 'is-invalid' : ''}
                          name='username'
                          onChange={handleChange}
                          required
                          value={values.username}
                          disabled={!isFormEnabled}
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
                          value={values.email}
                          disabled={!isFormEnabled}
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
                          value={values.first_name}
                          disabled={!isFormEnabled}
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
                          value={values.last_name}
                          disabled={!isFormEnabled}
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
                          disabled={!isFormEnabled}
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
                          disabled={!isFormEnabled}
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
                          disabled={!isFormEnabled}
                        />
                        {
                          'telephone' in errors && (
                            <Form.Control.Feedback type='invalid'>{errors.telephone}</Form.Control.Feedback>
                          )
                        }
                      </Form.Group>

                  <Button variant="primary" onClick={handleButtonClick}>
                    Habilitar formulario
                  </Button>

                  <Button variant="primary" type="submit" disabled={!isFormEnabled}>
                    Enviar
                  </Button>
                </Form>
            )}
          </Formik>
      </Container>
    </Container>
    
  );
}

function UserSubscription({setSubscriptionFormSubmitted}) {

  const [userSub, setUserSub] = useState({});

    useEffect(() => {
      const getSub = async () => {
        let user = getUser();
        let url = `${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}/`;

        const token = getAccessToken();
        const headers = { Authorization: `Bearer ${token}` };

        try {
          let response = await axios.get(url, {
            headers: headers,
          });
          console.log('Subscription :', response.data);
          setUserSub(response.data)
        } catch (error) {
          console.error('Error getting subscription:', error.response.data);
        }
      };

      getSub();
    }, []);


    const handleCancelSubscription = async () => {
    // Implement your cancel subscription logic here

    let user = getUser();
    let url = `${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}/`;

    const token = getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    try{
      let response = await axios.delete(url,  {
        headers: headers,
      });
      setSubscriptionFormSubmitted(true);
    } catch (error) {
      console.error('Error deleting subscription:', error.response.data);
    }
    console.log('Subscription deleted');
  };

  return (
    <>
      <Card>
      <Card.Body>
        <Card.Title>Subscription Details</Card.Title>
        <Card.Text>
          <strong>Plan:</strong> {userSub.product_name}
          <br />
          <strong>Precio: </strong> ${Math.floor(userSub.product_price / 100) + ((userSub.product_price % 100) / 100)}
          <br />
          <strong>Siguiente cobró: </strong>  <TimestampToDate timestamp={userSub.current_period_end} />
        </Card.Text>
        <Button variant="danger" onClick={handleCancelSubscription}>
          Cancel Subscription
        </Button>
      </Card.Body>
    </Card>
    </>
  );
}

function TimestampToDate({ timestamp }) {
  const date = new Date(timestamp * 1000);
  const formattedDate = date.toLocaleString(); // Adjust formatting as needed

  return <> {formattedDate}</>;
}


export default UserAccount;