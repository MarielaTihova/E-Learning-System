import { createContext } from 'react';
import jwtDecode from 'jwt-decode';

export const getLoggedUser = () => {
  try {
    return jwtDecode(localStorage.getItem('token') || '');
  } catch (e) {
    localStorage.removeItem('token');
    return null;
  }
}

const UserContext = createContext({
  user: null,
  setUser: () => {},
});

export default UserContext;
