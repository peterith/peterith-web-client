import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withApollo } from '@apollo/react-hoc';

export default withApollo(
  withRouter(({ client, history }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      localStorage.getItem('token')
        ? setIsLoggedIn(true)
        : setIsLoggedIn(false);
    });

    const handleOnLogOut = event => {
      event.preventDefault();
      localStorage.removeItem('token');
      client.resetStore();
      history.push('/');
    };

    return isLoggedIn ? (
      <div className="nav-user">
        <Link to="/profile" className="link">
          Profile
        </Link>
        {' | '}
        <a href="/" onClick={handleOnLogOut} className="link">
          Log out
        </a>
      </div>
    ) : (
      <div className="nav-user">
        <Link to="/register" className="link">
          Register
        </Link>
        {' | '}
        <Link to="/login" className="link">
          Log In
        </Link>
      </div>
    );
  })
);
