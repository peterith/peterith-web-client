import React, { createContext, useReducer } from 'react';
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
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);

      return {
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case 'LOGOUT':
      localStorage.removeItem('user');
      localStorage.removeItem('token');

      return {
        isAuthenticated: false,
        user: null,
        token: null
      };
    default:
      return state;
  }
};

export default () => {
  const [state, dispatch] = useReducer(reducer, {
    isAuthenticated: false,
    token: null
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <div className="container">
        <Header />
        <main>
          <Route path="/" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
        </main>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};
