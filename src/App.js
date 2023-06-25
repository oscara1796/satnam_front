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
import axios from 'axios';



import './App.css';

// changed
function App () {

  const [isLoggedIn, setLoggedIn] = useState(() => {
    return window.localStorage.getItem('satnam.auth') !== null;
  });
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
       <Route index element={<Landing isLoggedIn={isLoggedIn} />} />
        <Route path='sign-up' element={<SignUp isLoggedIn={isLoggedIn}  />} />
        <Route path='log-in' element={<LogIn isLoggedIn={isLoggedIn}   logIn={logIn} />} />
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
                        <LinkContainer to='/sign-up'>
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
      {/* <Container className='pt-3'> */}
        <Outlet />
      {/* </Container> */}
    </>
  );
}


export default App;
