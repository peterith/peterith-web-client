import React, { createContext, useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const client = useApolloClient();
  const [auth, setAuth] = useState({
    username: localStorage.getItem('username'),
    token: localStorage.getItem('token'),
  });

  const login = (username, token) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    client.resetStore();
    setAuth((prevAuth) => {
      return { ...prevAuth, username, token };
    });
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    client.resetStore();
    history.push('/');
    setAuth((prevAuth) => {
      return { ...prevAuth, username: null, token: null };
    });
  };

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = { children: PropTypes.element.isRequired };

export { AuthContext, AuthProvider };
