import React, { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import Message from './Message';
import {
  VALIDATE_USERNAME_AVAILABILITY,
  VALIDATE_EMAIL_AVAILABILITY
} from '../graphql/queries';
import { REGISTER_USER } from '../graphql/mutations';
import {
  messagesEnum,
  formClassesEnum,
  validateUsername,
  validateEmail,
  validatePassword
} from '../utils/validations';
import './Register.css';

export default ({ history }) => {
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
  const [validateUsernameAvailability, { data: usernameData }] = useLazyQuery(
    VALIDATE_USERNAME_AVAILABILITY
  );
  const [validateEmailAvailability, { data: emailData }] = useLazyQuery(
    VALIDATE_EMAIL_AVAILABILITY
  );

  useEffect(() => {
    if (usernameData) {
      if (usernameData.validateUsernameAvailability.success) {
        setFormClasses(prevFormClasses => {
          return { ...prevFormClasses, username: formClassesEnum.VALID };
        });
      } else {
        setFormMessages(prevFormMessages => {
          return {
            ...prevFormMessages,
            username: usernameData.validateUsernameAvailability.message
          };
        });
        setFormClasses(prevFormClasses => {
          return { ...prevFormClasses, username: formClassesEnum.INVALID };
        });
      }
    }
  }, [usernameData]);

  useEffect(() => {
    if (emailData) {
      if (emailData.validateEmailAvailability.success) {
        setFormClasses(prevFormClasses => {
          return { ...prevFormClasses, email: formClassesEnum.VALID };
        });
      } else {
        setFormMessages(prevFormMessages => {
          return {
            ...prevFormMessages,
            email: emailData.validateEmailAvailability.message
          };
        });
        setFormClasses(prevFormClasses => {
          return { ...prevFormClasses, email: formClassesEnum.INVALID };
        });
      }
    }
  }, [emailData]);

  const handleSubmit = event => {
    event.preventDefault();
    validateUsername(
      formValues.username,
      validateUsernameAvailability,
      setFormClasses,
      setFormMessages
    );
    validateEmail(
      formValues.email,
      validateEmailAvailability,
      setFormClasses,
      setFormMessages
    );
    validatePassword(formValues.password, setFormClasses);

    if (
      formClasses.username === formClassesEnum.VALID &&
      formClasses.email === formClassesEnum.VALID &&
      formClasses.password === formClassesEnum.VALID
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
      history.push('/login');
    }
  };

  const handleChange = event => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  const handleBlurOnUsernameField = () => {
    validateUsername(
      formValues.username,
      validateUsernameAvailability,
      setFormClasses,
      setFormMessages
    );
  };

  const handleBlurOnEmailField = () => {
    validateEmail(
      formValues.email,
      validateEmailAvailability,
      setFormClasses,
      setFormMessages
    );
  };

  const handleBlurOnPasswordField = () => {
    validatePassword(formValues.password, setFormClasses);
  };

  return (
    <div>
      <h1>Register</h1>
      <p>
        Sign up to receive the emails from me, from time to time. I won't spam!
      </p>
      <form onSubmit={handleSubmit}>
        Username: <span className="red">*</span>
        <br />
        <input
          type="text"
          name="username"
          value={formValues.username}
          className={formClasses.username}
          onChange={handleChange}
          onBlur={handleBlurOnUsernameField}
        />{' '}
        {formClasses.username === formClassesEnum.VALID && (
          <span className="fas fa-check green" />
        )}
        {formClasses.username === formClassesEnum.INVALID && (
          <Message>{formMessages.username}</Message>
        )}
        <br />
        Email: <span className="red">*</span>
        <br />
        <input
          type="email"
          name="email"
          value={formValues.email}
          className={formClasses.email}
          onChange={handleChange}
          onBlur={handleBlurOnEmailField}
        />{' '}
        {formClasses.email === formClassesEnum.VALID && (
          <span className="fas fa-check green" />
        )}
        {formClasses.email === formClassesEnum.INVALID && (
          <Message>{formMessages.email}</Message>
        )}
        <br />
        Password: <span className="red">*</span>
        <br />
        <input
          type="password"
          name="password"
          value={formValues.password}
          className={formClasses.password}
          onChange={handleChange}
          onBlur={handleBlurOnPasswordField}
        />{' '}
        {formClasses.password === formClassesEnum.VALID && (
          <span className="fas fa-check green" />
        )}
        {formClasses.password === formClassesEnum.INVALID && (
          <Message>{formMessages.password}</Message>
        )}
        <br />
        <input type="submit" value="Register" className="button button-red" />
      </form>
    </div>
  );
};
