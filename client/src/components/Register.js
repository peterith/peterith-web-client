import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation, useQuery } from '@apollo/react-hooks';
import Message from './Message';
import './Register.css';

export default () => {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [formValueClasses, setFormValueClasses] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [formMessages, setFormMessages] = useState({
    username: 'Username is required to join the club!',
    email: 'How will you receive my emails?',
    password: 'Make sure your password is at least 8 characters!'
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

  const CHECK_USERNAME = gql`
    query CheckUsername($user: UserInput!) {
      checkUsername(user: $user) {
        success
        message
      }
    }
  `;

  const [registerUser] = useMutation(REGISTER_USER);
  const { data } = useQuery(CHECK_USERNAME, {
    variables: {
      user: {
        username: formValues.username
      }
    }
  });

  const handleSubmit = event => {
    const newFormValueClasses = {
      username: formValueClasses.username,
      email: formValueClasses.email,
      password: formValueClasses.password
    };

    event.preventDefault();
    if (!formValues.username) newFormValueClasses.username = 'invalid';
    if (!formValues.email) newFormValueClasses.email = 'invalid';
    if (formValues.password.length < 8)
      newFormValueClasses.password = 'invalid';
    setFormValueClasses(newFormValueClasses);
    if (
      !newFormValueClasses.username &&
      !newFormValueClasses.email &&
      !newFormValueClasses.password
    ) {
      registerUser({
        variables: {
          user: {
            username: formValues.username,
            email: formValues.email,
            password: formValues.password
          }
        }
      });
    } else {
    }
  };

  const handleBlur = event => {
    event.preventDefault();

    if (!data.checkUsername.success) {
      setFormValueClasses({ ...formValueClasses, username: 'invalid' });
      setFormMessages({ ...formMessages, username: 'Username is taken!' });
    } else {
      setFormValueClasses({ ...formValueClasses, username: '' });
      setFormMessages({
        ...formMessages,
        username: 'Username is required to join the club!'
      });
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <p>
        Sign up to receive the emails from me, from time to time. I won't spam!
      </p>
      <form onSubmit={handleSubmit}>
        Username <span className="mandatory">*</span>
        <br />
        <input
          type="text"
          name="username"
          value={formValues.username}
          className={formValueClasses.username}
          onChange={event =>
            setFormValues({
              ...formValues,
              [event.target.name]: event.target.value
            })
          }
          onBlur={handleBlur}
        />{' '}
        {formValueClasses.username && (
          <Message>{formMessages.username}</Message>
        )}
        <br />
        Email <span className="mandatory">*</span>
        <br />
        <input
          type="text"
          name="email"
          value={formValues.email}
          className={formValueClasses.email}
          onChange={event =>
            setFormValues({
              ...formValues,
              [event.target.name]: event.target.value
            })
          }
        />{' '}
        {formValueClasses.email && <Message>{formMessages.email}</Message>}
        <br />
        Password <span className="mandatory">*</span>
        <br />
        <input
          type="password"
          name="password"
          value={formValues.password}
          className={formValueClasses.password}
          onChange={event =>
            setFormValues({
              ...formValues,
              [event.target.name]: event.target.value
            })
          }
        />{' '}
        {formValueClasses.password && (
          <Message>{formMessages.password}</Message>
        )}
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};
