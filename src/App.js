// client/src/App.js
import React, { useState, useEffect, useContext, useRef } from 'react'
import { Button, Container, Form, Navbar } from 'react-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import { Outlet, Route, Routes } from 'react-router-dom' // changed
import logo from './assets/img/logo.png'
import Landing from './components/Landing'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import UserAccount from './components/UserAccount'
import StripeCancel from './components/StripeCancel'
import StripeSuccess from './components/StripeSuccess'
import VideoList from './components/VideoList'
import CreateVideoAdmin from './components/CreateVideoAdmin'
import PaymentOptions from './components/PaymentOptions'
import VideoDetailed from './components/VideoDetailed'
import UpdateVideoAdmin from './components/UpdateVideoAdmin'
import ContactForm from './components/ContactForm'
import ContactAdminList from './components/ContactAdminList'
import TrialDaysForm from './components/TrialDaysForm'
import CreateScheduleAdmin from './components/CreateScheduleAdmin'
import CalendarComponent from './components/CalendarComponent'
import PasswordRecovery from './components/PasswordRecovery'
import ResetPassword from './components/ResetPassword'
import TermsOfService from './components/TermsOfService'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import SubscriptionPlansAdmin from './components/SubscriptionPlansAdmin'
import YogaTeacher from './components/YogaTeacher'
import axios from 'axios'
import {
  getUser,
  getAccessToken,
  setTokenExpirationTimeout,
} from './services/AuthService'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from './context'

import './App.css'

// changed
function App() {
  const [isLoggedIn, setLoggedIn] = useState(() => {
    return window.localStorage.getItem('satnam.auth') !== null
  })

  const [trialDays, setTrialDays] = useState([])

  const isLoggedInRef = useRef(isLoggedIn)

  useEffect(() => {
    isLoggedInRef.current = isLoggedIn

    const token = getAccessToken() // Function to get the JWT token
    const timeoutId = setTokenExpirationTimeout(token, () => {
      // Handle token expiration (e.g., log out the user)
      if (isLoggedInRef.current) {
        logOut()
        console.log('token expired')
      }
    })
    return () => clearTimeout(timeoutId)
  }, [isLoggedIn])

  const logIn = async (username, password) => {
    // const url = '/api/log_in/';

    const url = `${process.env.REACT_APP_BASE_URL}/api/log_in/`
    try {
      const response = await axios.post(
        url,
        { username, password },
        { timeout: 5000 }
      )
      window.localStorage.setItem('satnam.auth', JSON.stringify(response.data))
      window.localStorage.setItem('satnam.user', JSON.stringify(getUser()))
      return { response, isError: false }
    } catch (error) {
      return { response: error, isError: true }
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('satnam.auth')
    window.localStorage.removeItem('satnam.user')
    setLoggedIn(false)

    // Reload the page
    window.location.reload()
  }

  useEffect(() => {
    const fetchTrialDays = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/trial-days/`,
          { timeout: 5000 }
        )
        console.log('days ', response.data)

        setTrialDays(response.data) // Assuming the response has a 'days' field
      } catch (error) {
        // console.error("Error fetching trialDays data:", error);
        // Handle the error as needed, maybe set trialDays to some default or error value
      }
    }

    fetchTrialDays()
  }, [isLoggedIn])

  return (
    <Routes>
      <Route
        path='/'
        element={<Layout isLoggedIn={isLoggedIn} logOut={logOut} />}
      >
        <Route
          index
          element={<Landing isLoggedIn={isLoggedIn} trialDays={trialDays} />}
        />
        <Route
          path='video-detailed/:video_id/:video_title'
          element={<VideoDetailed isLoggedIn={isLoggedIn} />}
        />

        <Route
          path='video-update/:video_id/:video_title'
          element={<UpdateVideoAdmin isLoggedIn={isLoggedIn} />}
        />
        <Route path='videos' element={<VideoList isLoggedIn={isLoggedIn} />} />

        <Route
          path='admin-contact-list'
          element={<ContactAdminList isLoggedIn={isLoggedIn} logIn={logIn} />}
        />

        <Route
          path='password-recovery'
          element={<PasswordRecovery isLoggedIn={isLoggedIn} />}
        />
        <Route
          path='/reset-password/:uid/:token'
          element={<ResetPassword isLoggedIn={isLoggedIn} />}
        />

        <Route
          path='payment-methods'
          element={
            <PaymentOptions isLoggedIn={isLoggedIn} trialDays={trialDays} />
          }
        />
        <Route
          path='videos-create'
          element={<CreateVideoAdmin isLoggedIn={isLoggedIn} />}
        />
        <Route
          path='terms-sections'
          element={<TermsOfService isLoggedIn={isLoggedIn} />}
        />

        <Route
          path='privacy-policy'
          element={<PrivacyPolicy isLoggedIn={isLoggedIn} />}
        />

        <Route
          path='trial-days-create'
          element={
            <TrialDaysForm
              isLoggedIn={isLoggedIn}
              trialDays={trialDays}
              setTrialDays={setTrialDays}
            />
          }
        />
        <Route
          path='schedule-create'
          element={<CreateScheduleAdmin isLoggedIn={isLoggedIn} />}
        />

        <Route
          path='subcriptions-plans-admin'
          element={<SubscriptionPlansAdmin isLoggedIn={isLoggedIn} />}
        />
        <Route path='sign-up' element={<SignUp isLoggedIn={isLoggedIn} />} />
        <Route
          path='log-in'
          element={
            <LogIn
              isLoggedIn={isLoggedIn}
              logIn={logIn}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route
          path='account'
          element={
            <UserAccount
              isLoggedIn={isLoggedIn}
              logIn={logIn}
              logOut={logOut}
            />
          }
        />
        <Route
          path='contact-form'
          element={<ContactForm isLoggedIn={isLoggedIn} />}
        />

        <Route
          path='maestros'
          element={<YogaTeacher isLoggedIn={isLoggedIn} />}
        />

        <Route
          path='calendar'
          element={<CalendarComponent isLoggedIn={isLoggedIn} />}
        />

        <Route
          path='sub-success'
          element={<StripeSuccess isLoggedIn={isLoggedIn} />}
        />
        <Route
          path='sub-cancel'
          element={<StripeCancel isLoggedIn={isLoggedIn} />}
        />
      </Route>
    </Routes>
  )
}

function Layout({ isLoggedIn, logOut }) {
  const [isSticky, setIsSticky] = useState(false)
  const [state, setState] = useContext(UserContext)
  const [isOffline, setIsOffline] = useState(!navigator.onLine)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset

      if (scrollTop > 0) {
        setIsSticky(true)
      } else {
        setIsSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const goOnline = () => setIsOffline(false)
    const goOffline = () => setIsOffline(true)

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return (
    <>
      {isOffline && (
        <div
          style={{
            color: 'red',
            textAlign: 'center',
            padding: '10px',
            backgroundColor: 'lightyellow',
          }}
        >
          Estas offline. Algunas opciones pueden no funcionar correctamente.
        </div>
      )}

      <Navbar
        bg='light'
        expand='lg'
        variant='light'
        className={isSticky ? 'sticky' : ''}
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='logo'>
              <img src={logo} alt='logo' />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
            <Nav className=''>
              <div className='navbar_links'>
                <LinkContainer to='/calendar'>
                  <a className='nav_link'>Horarios Escuela</a>
                </LinkContainer>

                <LinkContainer to='/videos'>
                  <a id='video_cursos' className='nav_link'>
                    Cursos
                  </a>
                </LinkContainer>

                <LinkContainer to='/contact-form'>
                  <a className='nav_link'>Contacto</a>
                </LinkContainer>

                <LinkContainer to='/maestros'>
                  <a className='nav_link'>Maestros</a>
                </LinkContainer>


                {state && state.user && state.user.is_staff ? (
                  <NavDropdown id='adminmenue' title='Admin'>
                    <LinkContainer to='/videos-create'>
                      <NavDropdown.Item className='custom-item-navbar-admin'>
                        Añade Video
                      </NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/admin-contact-list'>
                      <NavDropdown.Item className='custom-item-navbar-admin'>
                        Mensajes de contacto
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/trial-days-create'>
                      <NavDropdown.Item className='custom-item-navbar-admin'>
                        Días de prueba
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/schedule-create'>
                      <NavDropdown.Item className='custom-item-navbar-admin'>
                        Horario Escuela
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/subcriptions-plans-admin'>
                      <NavDropdown.Item className='custom-item-navbar-admin'>
                        Crear subscripciones
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                ) : (
                  <></>
                )}
              </div>
              <div className='auth_buttons'>
                {isLoggedIn ? (
                  <>
                    <LinkContainer to='/account'>
                      <Button data-cy='account'>Cuenta</Button>
                    </LinkContainer>
                    <Form>
                      <Button
                        data-cy='logOut'
                        type='button'
                        onClick={() => logOut()}
                      >
                        Salir
                      </Button>
                    </Form>
                  </>
                ) : (
                  <>
                    <LinkContainer to='/sign-up'>
                      <Button data-cy='signUp'>Crear cuenta</Button>
                    </LinkContainer>
                    <LinkContainer to='/log-in'>
                      <Button data-cy='logIn'>Inicia Sesión</Button>
                    </LinkContainer>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <!-- Alert container --> */}
      <ToastContainer position='top-center' theme='colored' autoClose={10000} />
      {/* <Container className='pt-3'> */}

      <main>
        <Outlet />
      </main>
      {/* </Container> */}
      <Footer />
    </>
  )
}

export default App
