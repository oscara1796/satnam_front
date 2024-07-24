import React, { useState, useEffect, useContext } from 'react'
import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Container,
  Spinner,
} from 'react-bootstrap'
import { Formik } from 'formik'
import { Navigate } from 'react-router-dom'

import { UserContext } from '../context'
import { getUser, getAccessToken } from '../services/AuthService'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import SubscribeBanner from './SubscribeBanner'
import PaymentMethodsList from './PaymentMethodsList'
import { showErrorNotification } from '../services/notificationService'

// Main component for user account management
function UserAccount({ isLoggedIn, logIn, logOut }) {
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
  })
  const [isFormEnabled, setIsFormEnabled] = useState(false)
  const [isSubmitted, setSubmitted] = useState(false)

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = () => {
      if (state.user !== undefined) {
        setUserData(state.user)
      }
    }

    fetchUser()
  }, [state.user])

  // Enable form for editing
  const handleButtonClick = () => {
    setIsFormEnabled(true)
  }

  // Update local user data state on form change
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevValues) => ({
      ...prevValues,
      [name]: value ?? '',
    }))
  }

  // Handle form submission
  const handleSubmit = async (values, actions) => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/users/${userData.id}/`
    const token = getAccessToken()
    const headers = { Authorization: `Bearer ${token}` }

    // Create an object to hold only the changed fields
    const updatedFields = {}
    const fieldsToSend = { ...values } // Include all values including passwords

    // Filter out unchanged fields from updatedFields
    for (const key in values) {
      if (values[key] !== userData[key]) {
        updatedFields[key] = values[key]
      }
    }

    // Exclude passwords from updatedFields
    const { password1, password2, ...fieldsToUpdate } = updatedFields

    try {
      const res = await axios.patch(url, fieldsToSend, {
        headers: headers,
      })
      console.log('USER account form data ', fieldsToSend)
      console.log(res)
      // Update state without passwords
      setState((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          ...fieldsToUpdate,
        },
      }))
      setSubmitted(true)
      toast.success('Tu usuario se actualizó')
    } catch (response) {
      showErrorNotification(response)
    }
  }
  // Yup validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username es requerido'),
    email: Yup.string()
      .email('Correo invalido')
      .required('Correo es requerido'),
    first_name: Yup.string().required('Primer nombre es requerido'),
    last_name: Yup.string().required('Apellidos requeridos'),
    password1: Yup.string()
      .required('Password es requerida')
      .min(8, 'Password must be at least 8 characters long'),
    password2: Yup.string().oneOf(
      [Yup.ref('password1'), null],
      'Passwords no coinciden'
    ),
    telephone: Yup.string()
      .required('Telefono es requerido')
      .matches(/^[0-9]+$/, 'Telefono tiene que ser numerico'),
  })

  if (!isLoggedIn || isSubmitted) {
    return <Navigate to='/' />
  }

  // Render user account form
  return (
    <Container className='mt-2 user_info_container'>
      <Container>
        {state.user && state.user.active ? (
          <UserSubscription logOut={logOut} />
        ) : (
          <SubscribeBanner />
        )}
      </Container>

      <Container>
        <PaymentMethodsList isLoggedIn={isLoggedIn} />
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
                  value={values.username ? values.username : ''}
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
                  value={values.email ? values.email : ''}
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
                  value={values.first_name ? values.first_name : ''}
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
                  value={values.last_name ? values.last_name : ''}
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
                  value={values.password1 ? values.password1 : ''}
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
                  value={values.password2 ? values.password2 : ''}
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
                  value={values.telephone ? values.telephone : ''}
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
  const [isLoading, setIsLoading] = useState(true)
  const [refreshSubData, setRefreshSubData] = useState(false)
  const [isCancelled, setIsCancelled] = useState(false)
  

  // Fetch subscription data on mount
  useEffect(() => {
    const getSub = async () => {
      setIsLoading(true)

      let user = getUser()
      let url = `${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}/`

      const token = getAccessToken()
      const headers = { Authorization: `Bearer ${token}` }

      try {
        let response = await axios.get(
          url,
          {
            headers: headers,
          },
          { timeout: 5000 }
        )
        console.log('Subscription :', response.data)
        setUserSub(response.data)
        if (response.data.cancel_at_period_end === true) {
          setIsCancelled(true)
        } else {
          setIsCancelled(false)
        }
      } catch (error) {
        console.error('Error getting subscription:', error.response.data)
        setUserSub({})
        props.logOut()
      } finally {
        setIsLoading(false) // Set loading to false after fetching is done
      }
    }

    getSub()
  }, [refreshSubData])

  // Handle subscription cancellation
  const handleCancelSubscription = async () => {
    // Implement your cancel subscription logic here

    let user = getUser()
    let url = ""
    if (userSub.subscription_type === "stripe") {
      url = `${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}/`
      
    } else{
      
      url = `${process.env.REACT_APP_BASE_URL}/api/subscription_plan_paypal/${user.id}/`
    }

    const token = getAccessToken()
    const headers = { Authorization: `Bearer ${token}` }

    try {
      let response = await axios.delete(
        url,
        {
          headers: headers,
        },
        { timeout: 5000 }
      )
      setRefreshSubData(!refreshSubData)
    } catch (error) {
      toast.error(
        'Error al intentar cancelar tu subscrición, por favor contactenos'
      )
      console.error('Error deleting subscription:', error.response.data)
    }
    console.log('Subscription deleted')
  }

  const handleReactivateSubscription = async () => {
    let user = getUser()
    let url= ""
    if (userSub.subscription_type === "stripe") {
      url = `${process.env.REACT_APP_BASE_URL}/api/create_subscription/${user.id}/`
      
    } else{
      
      url = `${process.env.REACT_APP_BASE_URL}/api/subscription_plan_paypal/${user.id}/`
    }

    try {
      const token = getAccessToken()
      const headers = { Authorization: `Bearer ${token}` }

      let response = await axios.patch(
        url,
        {},
        {
          headers: headers,
        },
        { timeout: 5000 }
      )

      console.log(response.data)
      setRefreshSubData(!refreshSubData)
    } catch (error) {
      toast.error(
        'Error al intentar reactivar tu subscrición, por favor contactenos'
      )
      console.error('Error reactivate subscription:', error.response.data)
    }
    console.log('Subscription reactivated')
  }

  if (isLoading) {
    return (
      <div className='text-center'>
        <Spinner animation='border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    )
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
            {userSub.subscription_type == "paypal" ?  userSub.product_price : Math.floor(userSub.product_price / 100) +
              (userSub.product_price % 100) / 100} MXN
            <br />
            {!isCancelled ? (
              <strong>Siguiente cobró: </strong>
            ) : (
              <strong>Cuenta activa hasta : </strong>
            )}
            <TimestampToDate timestamp={userSub.current_period_end} />
            <br />
            <strong>Status: </strong>
            {userSub.status}
          </Card.Text>
          {!isCancelled ? (
            <Button variant='danger' onClick={handleCancelSubscription}>
              Cancel Subscription
            </Button>
          ) : (
            <Button variant='primary' onClick={handleReactivateSubscription}>
              Reactiva subscripción
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  )
}

// Component to convert timestamp to readable date
function TimestampToDate({ timestamp }) {

  let date;
  if (typeof timestamp === 'number') {
      date = new Date(timestamp * 1000);
  } else if (typeof timestamp === 'string') {
      date = new Date(timestamp);
  } else {
      console.error('Invalid timestamp format:', timestamp);
      return <>{'Fecha invalida '}</>; // Render some fallback or error message
  }

  // Use Spanish locale and custom options for formatting the date
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  const formattedDate = date.toLocaleString('es-ES', options);

  return <> {formattedDate} </>;
}

export default UserAccount
