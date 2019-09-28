import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

export default () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const REGISTER_USER = gql`
    mutation RegisterUser($user: UserInput!) {
      registerUser(user: $user) {
        success
        message
        payload {
          firstName
          lastName
          email
        }
      }
    }
  `;

  const [registerUser] = useMutation(REGISTER_USER);

  const handleSubmit = event => {
    event.preventDefault();

    registerUser({
      variables: {
        user: {
          username: formValues.username,
          email: formValues.email,
          password: formValues.password
        }
      }
    });
  };

  return (
    <div>
      <h1>Register</h1>
      <form id="registrationForm" onSubmit={handleSubmit}>
        Username:
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
        Email:
        <br />
        <input
          type="text"
          name="email"
          value={formValues.email}
          onChange={event =>
            setFormValues({
              ...formValues,
              [event.target.name]: event.target.value
            })
          }
        />
        <br />
        Password:
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
        <input type="submit" />
      </form>
    </div>
  );
};
