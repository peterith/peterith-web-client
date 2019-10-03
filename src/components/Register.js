import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import Message from './Message';
import './Register.css';

export default () => {
  const messagesEnum = {
    USERNAME_INVALID: 'Username is required to join the club!',
    EMAIL_INVALID: 'How will you receive my emails?',
    PASSWORD_INVALID: 'Make sure your password is at least 8 characters!'
  };

  Object.freeze(messagesEnum);
  const formClassesEnum = {
    INVALID: 'invalid',
    VALID: 'valid'
  };

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
    query CheckUsername($username: String!) {
      checkUsername(username: $username) {
        success
        message
      }
    }
  `;

  const CHECK_EMAIL = gql`
    query CheckEmail($email: String!) {
      checkEmail(email: $email) {
        success
        message
      }
    }
  `;

  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [formClasses, setFormClasses] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [formMessages, setFormMessages] = useState({
    username: messagesEnum.USERNAME_INVALID,
    email: messagesEnum.EMAIL_INVALID,
    password: messagesEnum.PASSWORD_INVALID
  });

  const [registerUser] = useMutation(REGISTER_USER);
  const [checkUsername, { data: usernameData }] = useLazyQuery(CHECK_USERNAME);
  const [checkEmail, { data: emailData }] = useLazyQuery(CHECK_EMAIL);

  useEffect(() => {
    if (usernameData && !usernameData.checkUsername.success) {
      setFormMessages(prevFormMessages => {
        return {
          ...prevFormMessages,
          username: usernameData.checkUsername.message
        };
      });
      setFormClasses(prevFormValueClasses => {
        return { ...prevFormValueClasses, username: formClassesEnum.INVALID };
      });
    } else if (usernameData && usernameData.checkUsername.success) {
      setFormClasses(prevFormValueClasses => {
        return { ...prevFormValueClasses, username: formClassesEnum.VALID };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usernameData]);

  useEffect(() => {
    if (emailData && !emailData.checkEmail.success) {
      setFormMessages(prevFormMessages => {
        return {
          ...prevFormMessages,
          email: emailData.checkEmail.message
        };
      });
      setFormClasses(prevFormValueClasses => {
        return { ...prevFormValueClasses, email: formClassesEnum.INVALID };
      });
    } else if (emailData && emailData.checkEmail.success) {
      setFormClasses(prevFormValueClasses => {
        return { ...prevFormValueClasses, email: formClassesEnum.VALID };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailData]);

  const handleSubmit = event => {
    event.preventDefault();
    const newFormValueClasses = {
      username: formClasses.username,
      email: formClasses.email,
      password: formClasses.password
    };

    if (!formValues.username)
      newFormValueClasses.username = formClassesEnum.INVALID;
    if (!formValues.email) newFormValueClasses.email = formClassesEnum.INVALID;
    if (formValues.password.length < 8)
      newFormValueClasses.password = formClassesEnum.INVALID;
    setFormClasses(newFormValueClasses);
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
    } else alert('fail');
  };

  const handleBlurOnUsername = event => {
    event.preventDefault();
    if (!formValues.username) {
      setFormClasses(prevFormValueClasses => {
        return {
          ...prevFormValueClasses,
          username: formClassesEnum.INVALID
        };
      });
      setFormMessages(prevFormMessages => {
        return {
          ...prevFormMessages,
          username: messagesEnum.USERNAME_INVALID
        };
      });
    } else {
      checkUsername({
        variables: {
          username: formValues.username
        }
      });
    }
  };

  const handleBlurOnEmail = event => {
    event.preventDefault();

    if (!formValues.email) {
      setFormClasses(prevFormValueClasses => {
        return {
          ...prevFormValueClasses,
          email: formClassesEnum.INVALID
        };
      });
      setFormMessages(prevFormMessages => {
        return {
          ...prevFormMessages,
          email: messagesEnum.EMAIL_INVALID
        };
      });
    } else {
      checkEmail({
        variables: {
          email: formValues.email
        }
      });
    }
  };

  const handleBlurOnPassword = event => {
    event.preventDefault();

    if (formValues.password.length < 8) {
      setFormClasses(prevFormValueClasses => {
        return { ...prevFormValueClasses, password: formClassesEnum.INVALID };
      });
    } else {
      setFormClasses(prevFormValueClasses => {
        return { ...prevFormValueClasses, password: formClassesEnum.VALID };
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
        Username <span className="red">*</span>
        <br />
        <input
          type="text"
          name="username"
          value={formValues.username}
          className={formClasses.username}
          onChange={event =>
            setFormValues({
              ...formValues,
              [event.target.name]: event.target.value
            })
          }
          onBlur={handleBlurOnUsername}
        />{' '}
        {formClasses.username === formClassesEnum.VALID && (
          <span className="fas fa-check green" />
        )}
        {formClasses.username === formClassesEnum.INVALID && (
          <Message>{formMessages.username}</Message>
        )}
        <br />
        Email <span className="red">*</span>
        <br />
        <input
          type="text"
          name="email"
          value={formValues.email}
          className={formClasses.email}
          onChange={event =>
            setFormValues({
              ...formValues,
              [event.target.name]: event.target.value
            })
          }
          onBlur={handleBlurOnEmail}
        />{' '}
        {formClasses.email === formClassesEnum.VALID && (
          <span className="fas fa-check green" />
        )}
        {formClasses.email === formClassesEnum.INVALID && (
          <Message>{formMessages.email}</Message>
        )}
        <br />
        Password <span className="red">*</span>
        <br />
        <input
          type="password"
          name="password"
          value={formValues.password}
          className={formClasses.password}
          onChange={event =>
            setFormValues({
              ...formValues,
              [event.target.name]: event.target.value
            })
          }
          onBlur={handleBlurOnPassword}
        />{' '}
        {formClasses.password === formClassesEnum.VALID && (
          <span className="fas fa-check green" />
        )}
        {formClasses.password === formClassesEnum.INVALID && (
          <Message>{formMessages.password}</Message>
        )}
        <br />
        <input type="submit" value="register" />
      </form>
    </div>
  );
};
