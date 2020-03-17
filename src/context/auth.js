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

  const login = async (username, token) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    client.clearStore().then(() => {
      history.push(`/@${username}`);
      setAuth((previousAuth) => {
        return {
          ...previousAuth,
          username,
          token,
        };
      });
    });
  };

  const logout = async () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    client.clearStore().then(() => {
      history.push('/');
      setAuth((previousAuth) => {
        return {
          ...previousAuth,
          username: null,
          token: null,
        };
      });
    });
  };

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { AuthContext, AuthProvider };
