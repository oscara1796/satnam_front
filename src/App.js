// client/src/App.js
import React, { useState, useEffect, useContext } from 'react'
import { Button, Container, Form, Navbar } from 'react-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import { Outlet, Route, Routes, useLocation, Navigate } from 'react-router-dom' // changed
import logo from './assets/img/logo.svg'
import Landing from './components/Landing'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import SubscriptionForm from './components/SubscriptionForm'
import UserAccount from './components/UserAccount'
import StripeCancel from './components/StripeCancel'
import StripeSuccess from './components/StripeSuccess'
import VideoList from './components/VideoList'
import CreateVideoAdmin from './components/CreateVideoAdmin'
import PaymentOptions from './components/PaymentOptions'
import VideoDetailed from './components/VideoDetailed'
import UpdateVideoAdmin from './components/UpdateVideoAdmin'
import ContactForm from './components/ContactForm'
import axios from 'axios'
import { getUser, getAccessToken, isTokenExpired } from './services/AuthService'
// import { getSubscription, SubStatus } from './services/SubsService';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContext } from './context'

import './App.css'

// changed
function App() {
  var location = useLocation()

  const [isLoggedIn, setLoggedIn] = useState(() => {
    return window.localStorage.getItem('satnam.auth') !== null
  })

  const logIn = async (username, password) => {
    // const url = '/api/log_in/';

    const url = `${process.env.REACT_APP_BASE_URL}/api/log_in/`
    try {
      const response = await axios.post(url, { username, password })
      window.localStorage.setItem('satnam.auth', JSON.stringify(response.data))

      setLoggedIn(true)
      window.localStorage.setItem('satnam.user', JSON.stringify(getUser()))

      return { response, isError: false }
    } catch (error) {
      console.error(error)

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

  const checkTokenExpiration = async () => {
    if (isTokenExpired() && isLoggedIn) {
      logOut() // Failed to refresh token, trigger logout
      console.log('token expired')
    }
    console.log('reviewed token')
  }

  useEffect(() => {
    checkTokenExpiration()
    const tokenCheckInterval = setInterval(checkTokenExpiration, 60000)
    return () => {
      clearInterval(tokenCheckInterval) // Clear the interval when the component unmounts
    }
  }, [])

  return (
    <Routes>
      <Route
        path='/'
        element={<Layout isLoggedIn={isLoggedIn} logOut={logOut} />}
      >
        <Route index element={<Landing isLoggedIn={isLoggedIn} />} />
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
          path='payment-methods'
          element={<PaymentOptions isLoggedIn={isLoggedIn} logIn={logIn} />}
        />
        <Route
          path='videos-create'
          element={<CreateVideoAdmin isLoggedIn={isLoggedIn} />}
        />
        <Route path='sign-up' element={<SignUp isLoggedIn={isLoggedIn} />} />
        <Route
          path='log-in'
          element={<LogIn isLoggedIn={isLoggedIn} logIn={logIn} />}
        />
        <Route
          path='account'
          element={<UserAccount isLoggedIn={isLoggedIn} logIn={logIn} />}
        />
        <Route
          path='contact-form'
          element={<ContactForm isLoggedIn={isLoggedIn}  />}
        />
        <Route
          path='sub-form'
          element={<SubscriptionForm isLoggedIn={isLoggedIn} />}
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

  return (
    <>
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
                <LinkContainer to='/'>
                  <a className='nav_link'>Posts</a>
                </LinkContainer>

                <LinkContainer to='/videos'>
                  <a id='video_cursos' className='nav_link'>
                    Cursos
                  </a>
                </LinkContainer>

                <LinkContainer to='/contact-form'>
                  <a className='nav_link'>Contacto</a>
                </LinkContainer>
                {state && state.user && state.user.is_staff ? (
                  <NavDropdown id='adminmenue' title='Admin'>
                    <LinkContainer to='/videos-create'>
                      <NavDropdown.Item className='custom-item-navbar-admin'>
                        Añade Video
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/videos-create'>
                      <NavDropdown.Item className='custom-item-navbar-admin'>
                        Mensajes de contacto
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
                      <Button data-cy='account'>Account</Button>
                    </LinkContainer>
                    <Form>
                      <Button
                        data-cy='logOut'
                        type='button'
                        onClick={() => logOut()}
                      >
                        Log out
                      </Button>
                    </Form>
                  </>
                ) : (
                  <>
                    <LinkContainer to='/sign-up'>
                      <Button data-cy='signUp'>Sign up</Button>
                    </LinkContainer>
                    <LinkContainer to='/log-in'>
                      <Button data-cy='logIn'>Log in</Button>
                    </LinkContainer>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <!-- Alert container --> */}
      <ToastContainer position='top-center' theme="colored"/>
      {/* <Container className='pt-3'> */}
      <Outlet />
      {/* </Container> */}
    </>
  )
}

export default App
