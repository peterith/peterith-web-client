import React, { useContext, useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { AuthContext } from './App';
import MessageBox from './MessageBox';

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

const errorMessage = <MessageBox>Incorrect username or password!</MessageBox>;

export default ({ history }) => {
  const { dispatch } = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  });
  const [isInvalid, setIsInvalid] = useState(false);
  const [login, { client, data }] = useLazyQuery(LOGIN);

  const handleSubmit = event => {
    event.preventDefault();
    login({
      variables: {
        user: { username: formValues.username, password: formValues.password }
      }
    });
  };

  useEffect(() => {
    if (data) {
      if (data.login.success) {
        dispatch({
          type: 'LOGIN',
          payload: { user: data.login.user, token: data.login.token }
        });
        client.resetStore();
        history.push('/profile');
      } else {
        setIsInvalid(true);
      }
    }
  }, [data, client, dispatch, history]);

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
      {isInvalid && errorMessage}
    </div>
  );
};
