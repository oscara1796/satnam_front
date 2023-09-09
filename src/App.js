// client/src/App.js
import React, { useState, useEffect } from 'react';
import {
  Button, Container, Form, Navbar
} from 'react-bootstrap'; 
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet, Route, Routes } from 'react-router-dom'; // changed
import logo from './assets/img/logo.svg'

import Landing from './components/Landing';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import SubscriptionForm from './components/SubscriptionForm';
import UserAccount from './components/UserAccount';
import axios from 'axios';
import { getUser, getAccessToken, isTokenExpired } from './services/AuthService'; 
import { getSubscription } from './services/SubsService'; 



import './App.css';



// changed
function App () {

  const [isSubscriptionFormSubmitted, setSubscriptionFormSubmitted] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(() => {
    return window.localStorage.getItem('satnam.auth') !== null;
  });

  const [subscriptionActive, setSubscriptionActive] = useState({});
  const logIn = async (username, password) => {
    // const url = '/api/log_in/';

    const url = `${process.env.REACT_APP_BASE_URL}/api/log_in/`;
    try {
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem(
        'satnam.auth', JSON.stringify(response.data)
      );
      setLoggedIn(true);
      return {response, isError: false}
    }
    catch (error) {
      console.error(error);

      return {response: error, isError: true}
    }
  };

  const logOut = () => {
    window.localStorage.removeItem('satnam.auth');
    setLoggedIn(false);
  };



  useEffect(() => {
    const fetchRefreshToken = async () => {
      if (isTokenExpired() || isSubscriptionFormSubmitted) {
        const refreshToken = JSON.parse(
          window.localStorage.getItem('satnam.auth')
        )?.refresh;
        if (!refreshToken) {
          logOut(); // No refresh token, trigger logout
          return;
        }
  
        const url = `${process.env.REACT_APP_BASE_URL}/api/token/refresh/`;
        try {
          const response = await axios.post(url, { refresh: refreshToken });
          window.localStorage.setItem(
            'satnam.auth',
            JSON.stringify(response.data)
          );
          setLoggedIn(true);
        } catch (error) {
          console.error(error);
          logOut(); // Failed to refresh token, trigger logout
        }
      } 

      if (isSubscriptionFormSubmitted) {
          const user = getUser();

          showPaymentAlert(user.active);
      }
    };

    fetchRefreshToken();
  }, [isSubscriptionFormSubmitted]);


  function showPaymentAlert(isSuccessful) {
    const alertContainer = document.getElementById('paymentAlert');
    const alertMessage = alertContainer.querySelector('.alert-message');
  
    if (isSuccessful) {
        alertContainer.style.backgroundColor = '#04b852'; // Green background for success
        alertMessage.textContent = 'El pago se ha realizado con éxito';
    } else {
        alertContainer.style.backgroundColor = '#dc3545'; // Red background for failure
        alertMessage.textContent = 'Payment Failed';
    }
  
    alertContainer.style.display = 'flex';
  }
  
  const  closePaymentAlert = () => {
    const alertContainer = document.getElementById('paymentAlert');
    alertContainer.style.display = 'none';
    console.log("hola");
  }

  return (
    <Routes>
       <Route 
          path='/' 
              element={
                  <Layout  
                      isLoggedIn={isLoggedIn}
                      logOut={logOut}  
                      closePaymentAlert={closePaymentAlert}
                  />
                } 
              > 
       <Route index element={<Landing isLoggedIn={isLoggedIn}  />} />
        <Route path='sign-up' element={<SignUp isLoggedIn={isLoggedIn}  />} />
        <Route path='log-in' element={<LogIn isLoggedIn={isLoggedIn}   logIn={logIn} />} />
        <Route path='account' element={<UserAccount isLoggedIn={isLoggedIn}  setSubscriptionFormSubmitted={setSubscriptionFormSubmitted}     logIn={logIn} />} />
        <Route path='sub-form' element={<SubscriptionForm isLoggedIn={isLoggedIn}  setSubscriptionFormSubmitted={setSubscriptionFormSubmitted}     logIn={logIn} />} />
      </Route>
    </Routes>
  );
}

function Layout ({ isLoggedIn, logOut, closePaymentAlert }) {

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar bg='light' expand='lg' variant='light' className={isSticky ? 'sticky' : ''}>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='logo'><img src={logo}   alt='logo' /></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className='justify-content-end'>
          <Nav className=""> 

              <div className='navbar_links'>
                <LinkContainer to='/'>
                    <a>Posts</a>
                </LinkContainer>

                <LinkContainer to='/'>
                    <a>Cursos</a>
                </LinkContainer>

                <LinkContainer to='/'>
                    <a>Contacto</a>
                </LinkContainer>
              </div>
              <div className='auth_buttons'>
                  {
                    isLoggedIn ? (
                      <>
                        <LinkContainer to='/account'>
                          <Button data-cy="account">Account</Button>
                        </LinkContainer>
                        <Form>
                          <Button 
                            data-cy='logOut'
                            type='button'
                            onClick={() => logOut()}
                            >Log out</Button>
                        </Form>
                      </>
                    ) : (
                      <>
                        <LinkContainer to='/sign-up'>
                          <Button data-cy="signUp">Sign up</Button>
                        </LinkContainer>
                        <LinkContainer to='/log-in'>
                          <Button data-cy="logIn">Log in</Button>
                        </LinkContainer>
                      </>
                    )
                  }
              </div>
          </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <!-- Alert container --> */}
        <div id="paymentAlert" class="alert-container">
            <p class="alert-message"></p>
            <button class="alert-button" onClick={() => closePaymentAlert()}>OK</button>
        </div>
      {/* <Container className='pt-3'> */}
        <Outlet />
      {/* </Container> */}
    </>
  );
}






export default App;
