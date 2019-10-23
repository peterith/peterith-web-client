import React, { createContext, useReducer, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Header from './Header';
import About from './About';
import Contact from './Contact';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Footer from './Footer';
import './App.css';

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('token', action.payload.token);

      return {
        isAuthenticated: true,
        username: action.payload.username,
        token: action.payload.token
      };
    case 'LOGOUT':
      localStorage.removeItem('username');
      localStorage.removeItem('token');

      return {
        isAuthenticated: false,
        username: null,
        token: null
      };
    case 'REFRESH':
      if (localStorage.token) {
        return {
          isAuthenticated: true,
          username: localStorage.username,
          token: localStorage.token
        };
      }

      return state;
    default:
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    username: null,
    token: null
  });

  useEffect(() => {
    dispatch({ type: 'REFRESH' });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="container">
        <Header />
        <main>
          <Route path="/" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/@:username" exact component={Profile} />
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};
