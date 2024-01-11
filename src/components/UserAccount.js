import React, { useState, useEffect, useContext } from 'react'
import { Breadcrumb, Button, Card, Form, Container, Spinner } from 'react-bootstrap'
import { Formik } from 'formik'
import { Link, Navigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { UserContext } from '../context'
import { getUser, getAccessToken } from '../services/AuthService'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as Yup from 'yup';




// Main component for user account management
function UserAccount({ isLoggedIn, logIn }) {
  const [state, setState] = useContext(UserContext)
  // Local state for user data and form control
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password1: '',
    password2: '',
    telephone: '',
  });
  const [isFormEnabled, setIsFormEnabled] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = () => {
      const user = getUser();
      if (user !== undefined) {
        setUserData(user);
      }
    };

    fetchUser();
  }, []);

  // Enable form for editing
  const handleButtonClick = () => {
    setIsFormEnabled(true);
  };

  // Update local user data state on form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevValues) => ({
      ...prevValues,
      [name]: value ?? '',  
    }));
  };



  // Handle form submission
  const handleSubmit = async (values, actions) => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/users/${userData.id}/`;
    const formData = new FormData();

    // Append user data to form data
    for (const key in values) {
      formData.append(key, values[key]);
    }

    const token = getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const res = await axios.put(url, formData, {
        headers: headers,
      })
      console.log(formData)
      await logIn(values.username, values.password1)
      setSubmitted(true)
      toast.success("Tu usuario se actualizo")
    } catch (response) {
      const data = response.response.data
      console.log('data ', data)
      for (const value in data) {
        actions.setFieldError(value, data[value].join(' '))
      }
      toast.error("No pudimos actualizar tu usuario, intenteló más tarde")
    }
  }

  // Yup validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username es requerido'),
    email: Yup.string()
      .email('Correo invalido')
      .required('Correo es requerido'),
    first_name: Yup.string()
      .required('Primer nombre es requerido'),
    last_name: Yup.string()
      .required('Apellidos requeridos'),
    password1: Yup.string()
      .required('Password es requerida')
      .min(8, 'Password must be at least 8 characters long'),
    password2: Yup.string()
      .oneOf([Yup.ref('password1'), null], 'Passwords no coinciden'),
    telephone: Yup.string()
      .required('Telefono es requerido')
      .matches(/^[0-9]+$/, "Telefono tiene que ser numerico")
  });

  if (!isLoggedIn || isSubmitted) {
    return <Navigate to='/' />
  }


  // Render user account form
  return (
    <Container className='mt-2 user_info_container'>
      <Container>
        {state.user && state.user.active ? 
          (<UserSubscription   />) : 
        (
          <LinkContainer to='/payment-methods'>
            <Button variant='outline-light'>Inscríbite</Button>
          </LinkContainer>
        )}
      </Container>

      <Container className='mt-2  user_form'>
        <Formik
          initialValues={userData}
          enableReinitialize={true}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className='mb-3' controlId='username'>
                <Form.Label>Usuario:</Form.Label>
                <Form.Control
                  className={'username' in errors ? 'is-invalid' : ''}
                  name='username'
                  onChange={handleChange}
                  required
                  value={values.username  ? values.username : ""}
                  disabled={!isFormEnabled}
                />
                {'username' in errors && (
                  <Form.Control.Feedback type='invalid'>
                    {errors.username}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  className={'email' in errors ? 'is-invalid' : ''}
                  type='email'
                  name='email'
                  onChange={handleChange}
                  required
                  value={values.email ? values.email  : ""}
                  disabled={!isFormEnabled}
                />
                {'email' in errors && (
                  <Form.Control.Feedback type='invalid'>
                    {errors.email}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className='mb-3' controlId='first_name'>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  className={'first_name' in errors ? 'is-invalid' : ''}
                  name='first_name'
                  onChange={handleChange}
                  required
                  value={values.first_name ? values.first_name : ""}
                  disabled={!isFormEnabled}
                />
                {'first_name' in errors && (
                  <Form.Control.Feedback type='invalid'>
                    {errors.first_name}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className='mb-3' controlId='last_name'>
                <Form.Label>Apellidos:</Form.Label>
                <Form.Control
                  className={'last_name' in errors ? 'is-invalid' : ''}
                  name='last_name'
                  onChange={handleChange}
                  required
                  value={values.last_name ? values.last_name : ""}
                  disabled={!isFormEnabled}
                />

                {'last_name' in errors && (
                  <Form.Control.Feedback type='invalid'>
                    {errors.last_name}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              <Form.Group className='mb-3' controlId='password1'>
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                  className={'password1' in errors ? 'is-invalid' : ''}
                  name='password1'
                  onChange={handleChange}
                  required
                  type='password'
                  value={values.password1 ? values.password1 : ""}
                  disabled={!isFormEnabled}
                />
                {'password1' in errors && (
                  <Form.Control.Feedback type='invalid'>
                    {errors.password1}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className='mb-3' controlId='password2'>
                <Form.Label>Confirma Contraseña:</Form.Label>
                <Form.Control
                  className={'password2' in errors ? 'is-invalid' : ''}
                  name='password2'
                  onChange={handleChange}
                  required
                  type='password'
                  value={values.password2 ? values.password2 : "" }
                  disabled={!isFormEnabled}
                />
                {'password2' in errors && (
                  <Form.Control.Feedback type='invalid'>
                    {errors.password2}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Form.Group className='mb-3' controlId='telephone'>
                <Form.Label>Teléfono:</Form.Label>
                <Form.Control
                  className={'telephone' in errors ? 'is-invalid' : ''}
                  name='telephone'
                  type='tel'
                  onChange={handleChange}
                  required
                  value={values.telephone ? values.telephone  : ""}
                  disabled={!isFormEnabled}
                />
                {'telephone' in errors && (
                  <Form.Control.Feedback type='invalid'>
                    {errors.telephone}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              <Button variant='primary' onClick={handleButtonClick}>
                Habilitar formulario
              </Button>

              <Button variant='primary' type='submit' disabled={!isFormEnabled}>
                Enviar
              </Button>
            </Form>
          )}
        </Formik>
      </Container>
    </Container>
  )
}


// Component to display user subscription details
function UserSubscription(props) {
  const [userSub, setUserSub] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [refreshSubData, setRefreshSubData] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)


  // Fetch subscription data on mount
  useEffect(() => {
    const getSub = async () => {
      setIsLoading(true);

      let user = getUser()
      let url = `${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}/`

      const token = getAccessToken()
      const headers = { Authorization: `Bearer ${token}` }

      try {
        let response = await axios.get(url, {
          headers: headers,
        })
        console.log('Subscription :', response.data)
        setUserSub(response.data)
        if (response.data.status == "canceled") {
          setIsCancelled(true)
        }
      } catch (error) {
        console.error('Error getting subscription:', error.response.data)
      }
      finally {
        setIsLoading(false); // Set loading to false after fetching is done
      }
    }

    getSub()
  }, [refreshSubData])


  // Handle subscription cancellation
  const handleCancelSubscription = async () => {
    // Implement your cancel subscription logic here
    
    let user = getUser()
    let url = `${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}/`

    const token = getAccessToken()
    const headers = { Authorization: `Bearer ${token}` }

    try {
      let response = await axios.delete(url, {
        headers: headers,
      })
      setIsCancelled(true);
      setRefreshSubData(!refreshSubData);
    } catch (error) {
      toast.error("Error al intentar cancelar tu subscrición, por favor contactenos")
      console.error('Error deleting subscription:', error.response.data)
    }
    console.log('Subscription deleted')
  }

  const handleReactivateSubscription = async () => {

  }

  if (isLoading) {
    return <div className="text-center">
             <Spinner animation="border" role="status">
               <span className="visually-hidden">Loading...</span>
             </Spinner>
           </div>;
  }
  // Render subscription details
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Subscripción:</Card.Title>
          <Card.Text>
            <strong>Plan:</strong> {userSub.product_name}
            <br />
            <strong>Precio: </strong> $
            {Math.floor(userSub.product_price / 100) +
              (userSub.product_price % 100) / 100}
            <br />
            { !isCancelled ? 
              <strong>Siguiente cobró: </strong>
              :
              <strong>Cuenta activa hasta : </strong>
            }
            <TimestampToDate timestamp={userSub.current_period_end} />
            <br />
            <strong>Status: </strong> 
            {userSub.status}
          </Card.Text>
          { !isCancelled  ?
          
            <Button variant='danger' onClick={handleCancelSubscription}>
              Cancel Subscription
            </Button>
            :
            <Button variant='primary' onClick={handleReactivateSubscription}>
              Reactiva subscripción
            </Button>
          }
        </Card.Body>
      </Card>
    </>
  )
}


// Component to convert timestamp to readable date
function TimestampToDate({ timestamp }) {
  const date = new Date(timestamp * 1000)
  const formattedDate = date.toLocaleString() // Adjust formatting as needed

  return <> {formattedDate}</>
}

export default UserAccount
