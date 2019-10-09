import React, { useContext, useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from './App';

const LOGIN = gql`
  query Login($user: UserInput!) {
    login(user: $user) {
      success
      message
      user {
        username
        email
      }
      token
    }
  }
`;

export default ({ history }) => {
  const { dispatch } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  });

  const [login, { client, data }] = useLazyQuery(LOGIN);

  const handleSubmit = event => {
    event.preventDefault();
    login({
      variables: {
        user: { username: formValues.username, password: formValues.password }
      }
    });
  };

  if (data) {
    if (data.login.success) {
      dispatch({
        type: 'LOGIN',
        payload: { user: data.login.user, token: data.login.token }
      });
      client.resetStore();
      history.push('/profile');
    } else {
      return (
        <div>
          <p>Message from server: {data.login.message}</p>
        </div>
      );
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        Username
        <br />
        <input
          type="text"
          name="username"
          value={formValues.username}
          onChange={event =>
            setFormValues({
              ...formValues,
              [event.target.name]: event.target.value
            })
          }
        />
        <br />
        Password
        <br />
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={event =>
            setFormValues({
              ...formValues,
              [event.target.name]: event.target.value
            })
          }
        />
        <br />
        <input type="submit" value="Login" className="button" />
      </form>
    </div>
  );
};
