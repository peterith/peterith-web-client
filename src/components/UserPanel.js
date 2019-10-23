import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withApollo } from '@apollo/react-hoc';
import { AuthContext } from './App';

export default withApollo(
  withRouter(({ client, history }) => {
    const { state, dispatch } = useContext(AuthContext);

    const handleOnLogOut = event => {
      event.preventDefault();
      dispatch({ type: 'LOGOUT' });
      client.resetStore();
      history.push('/');
    };

    return state.isAuthenticated ? (
      <div className="nav-user">
        <Link to={`/@${state.username}`} className="link">
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
