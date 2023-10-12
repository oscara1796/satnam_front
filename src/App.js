// client/src/App.js
import React, { useState, useEffect } from 'react';
import {
  Button, Container, Form, Navbar
} from 'react-bootstrap'; 
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';
import { Outlet, Route, Routes} from 'react-router-dom'; // changed
import logo from './assets/img/logo.svg'
import Landing from './components/Landing';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import SubscriptionForm from './components/SubscriptionForm';
import UserAccount from './components/UserAccount';
import StripeCancel from './components/StripeCancel';
import StripeSuccess from './components/StripeSuccess';
import axios from 'axios';
import { getUser, getAccessToken, isTokenExpired } from './services/AuthService'; 
// import { getSubscription, SubStatus } from './services/SubsService'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import './App.css';



// changed
function App () {

  const [isSubscriptionFormSubmitted, setSubscriptionFormSubmitted] = useState(false);

  const [isLoggedIn, setLoggedIn] = useState(() => {
    return window.localStorage.getItem('satnam.auth') !== null;
  });

  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const logIn = async (username, password) => {
    // const url = '/api/log_in/';

    const url = `${process.env.REACT_APP_BASE_URL}/api/log_in/`;
    try {
      const response = await axios.post(url, { username, password });
      window.localStorage.setItem(
        'satnam.auth', JSON.stringify(response.data)
      );
      
      setLoggedIn(true);
      window.localStorage.setItem(
        'satnam.user', JSON.stringify(getUser())
      );
      
      return {response, isError: false}
    }
    catch (error) {
      console.error(error);

      return {response: error, isError: true}
    }
  };

  const logOut = () => {
    window.localStorage.removeItem('satnam.auth');
    window.localStorage.removeItem('satnam.user');
    setLoggedIn(false);
  };

  const fetchRefreshToken = async () => {
      const refreshToken = JSON.parse(
        window.localStorage.getItem('satnam.auth')
      )?.refresh;
      if (!refreshToken) {
        console.log("No refresh token");
        logOut(); // No refresh token, trigger logout
        location.reload();
        return;
      }

      const url = `${process.env.REACT_APP_BASE_URL}/api/token/refresh/`;
      try {
        const response = await axios.post(url, { refresh: refreshToken });
        console.log(response);
        window.localStorage.setItem(
          'satnam.auth',
          JSON.stringify(response.data)
        );
        setLoggedIn(true);
      } catch (error) {
        console.error(error);
        logOut(); // Failed to refresh token, trigger logout
        location.reload();
      }
    
  };



  // useEffect(() => {
  //   const subSubmitedToken = async () => {
      
  //     if (isSubscriptionFormSubmitted) {
  //       const object = await SubStatus(setSubscriptionActive);
  //       console.log(object);
  //       if (subscriptionActive) {
  //         showPaymentAlert(true);
         
  //       } else{
  //         showPaymentAlert(false);
  //       }
  //       setSubscriptionFormSubmitted(false);
  //     }
  //   };

  //   subSubmitedToken();
  // }, [isSubscriptionFormSubmitted]);

  // useEffect(() => {
  //   const RefreshToken = async () => {
  //     if (isTokenExpired() && isLoggedIn) {
  //       fetchRefreshToken();
  //       console.log("token expired");
  //     } 

  //     if (isLoggedIn) {
  //        await SubStatus(setSubscriptionActive);
  //     }
  //   };

  //   RefreshToken();
  // });


  


  // function showPaymentAlert(isSuccessful) {
    
  
  //   if (isSuccessful) {
  //       toast.success('Pago  Aprovado!', {
  //         position: toast.POSITION.TOP_CENTER, // You can customize the position
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         autoClose: false,
  //       });
  //   } else {
  //     toast.error('Payment Failed!', {
  //       position: toast.POSITION.TOP_CENTER, // You can customize the position
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       autoClose: false,
  //       className: 'error-toast',
  //     });
  //   }
  
  // }
  
  

  return (
    <Routes>
       <Route 
          path='/' 
              element={
                  <Layout  
                      isLoggedIn={isLoggedIn}
                      logOut={logOut}  
                  />
                } 
              > 
       <Route index element={<Landing isLoggedIn={isLoggedIn}  />} />
        <Route path='sign-up' element={<SignUp isLoggedIn={isLoggedIn}  />} />
        <Route path='log-in' element={<LogIn isLoggedIn={isLoggedIn}   logIn={logIn} />} />
        <Route path='account' element={<UserAccount isLoggedIn={isLoggedIn}  setSubscriptionFormSubmitted={setSubscriptionFormSubmitted}     logIn={logIn} />} />
        <Route path='sub-form' element={<SubscriptionForm isLoggedIn={isLoggedIn}  setSubscriptionFormSubmitted={setSubscriptionFormSubmitted}     logIn={logIn} />} />
        <Route path='sub-success' element={<StripeSuccess isLoggedIn={isLoggedIn} />} />
        <Route path='sub-cancel' element={<StripeCancel  isLoggedIn={isLoggedIn} />} />
      </Route>
    </Routes>
  );
}

function Layout ({ isLoggedIn, logOut }) {

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
        <ToastContainer />
      {/* <Container className='pt-3'> */}
        <Outlet />
      {/* </Container> */}
    </>
  );
}






export default App;
