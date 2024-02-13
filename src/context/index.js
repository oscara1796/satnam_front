import { useState, useEffect, createContext } from 'react'
import {
  getUser,
  getAccessToken,
  isTokenExpired,
} from '../services/AuthService'

const UserContext = createContext()


const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    user: JSON.parse(localStorage.getItem('satnam.user')),
    auth: getAccessToken(),
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
