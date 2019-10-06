import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export default () => {
  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  });

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

  const [login, { called, loading, data }] = useLazyQuery(LOGIN);

  const handleSubmit = event => {
    event.preventDefault();
    login({
      variables: {
        user: { username: formValues.username, password: formValues.password }
      }
    });
  };

  if (called && loading) return <p>Loading ...</p>;

  if (data && data.login.success) {
    localStorage.setItem('token', data.login.token);
    return (
      <div>
        <p>{data.login.user.username}</p>
        <p>{data.login.user.email}</p>
        <p>{data.login.token}</p>
      </div>
    );
  } else if (data && !data.login.success) {
    return (
      <div>
        <p>Message from server: {data.login.message}</p>
      </div>
    );
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
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};
