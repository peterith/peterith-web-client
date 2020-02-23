import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { AuthContext } from './App';
import Message from './Message';
import MessageBox from './MessageBox';
import { UPDATE_USER, DELETE_USER } from '../graphql/mutations';
import {
  VALIDATE_USERNAME_AVAILABILITY,
  VALIDATE_EMAIL_AVAILABILITY
} from '../graphql/queries';
import {
  messagesEnum,
  formClassesEnum,
  validateUsername,
  validateEmail,
  validatePassword
} from '../utils/validations';

export default ({ setEditMode, refetch, user }) => {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    username: user.username,
    email: user.email,
    newPassword: '',
    oldPassword: ''
  });
  const [formClasses, setFormClasses] = useState({
    username: formClassesEnum.VALID,
    email: formClassesEnum.VALID,
    password: ''
  });
  const [formMessages, setFormMessages] = useState({
    username: messagesEnum.USERNAME_INVALID,
    email: messagesEnum.EMAIL_INVALID,
    password: messagesEnum.PASSWORD_INVALID
  });
  const [isInvalid, setIsInvalid] = useState(false);

  const [updateUser, { client, data: updateUserData }] = useMutation(
    UPDATE_USER
  );
  const [deleteUser, { data: deleteUserData }] = useMutation(DELETE_USER);
  const [validateUsernameAvailability, { data: usernameData }] = useLazyQuery(
    VALIDATE_USERNAME_AVAILABILITY
  );
  const [validateEmailAvailability, { data: emailData }] = useLazyQuery(
    VALIDATE_EMAIL_AVAILABILITY
  );

  const errorMessageBox = <MessageBox>Incorrect password!</MessageBox>;

  useEffect(() => {
    if (updateUserData) {
      if (updateUserData.updateUser.success) {
        dispatch({
          type: 'LOGIN',
          payload: {
            username: updateUserData.updateUser.username,
            token: updateUserData.updateUser.token,
            client,
            history
          }
        });
        refetch();
        setEditMode(false);
      }

      setIsInvalid(true);
    }
  }, [updateUserData, dispatch, client, history, refetch, setEditMode]);

  useEffect(() => {
    if (deleteUserData) {
      if (deleteUserData.deleteUser.success) {
        dispatch({
          type: 'LOGOUT',
          payload: {
            client,
            history
          }
        });
      }

      setIsInvalid(true);
    }
  }, [deleteUserData, dispatch, client, history]);

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
    if (formValues.username === user.username) {
      setFormClasses(prevFormClasses => {
        return {
          ...prevFormClasses,
          username: formClassesEnum.VALID
        };
      });
    } else {
      validateUsername(
        formValues.username,
        validateUsernameAvailability,
        setFormClasses,
        setFormMessages
      );
    }

    if (formValues.email === user.email) {
      setFormClasses(prevFormClasses => {
        return {
          ...prevFormClasses,
          email: formClassesEnum.VALID
        };
      });
    } else {
      validateEmail(
        formValues.email,
        validateEmailAvailability,
        setFormClasses,
        setFormMessages
      );
    }

    if (formValues.newPassword) {
      validatePassword(formValues.newPassword, setFormClasses);
    } else {
      setFormClasses(prevFormClasses => {
        return {
          ...prevFormClasses,
          password: ''
        };
      });
    }

    if (
      formClasses.username === formClassesEnum.VALID &&
      formClasses.email === formClassesEnum.VALID &&
      formClasses.password !== formClassesEnum.INVALID
    ) {
      updateUser({
        variables: {
          user: {
            username: formValues.username,
            email: formValues.email,
            password: formValues.newPassword,
            oldPassword: formValues.oldPassword
          }
        }
      });
    }
  };

  const handleChange = event => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  const handleBlurOnUsernameField = event => {
    if (event.target.value === user.username) {
      setFormClasses(prevFormClasses => {
        return {
          ...prevFormClasses,
          username: formClassesEnum.VALID
        };
      });
    } else {
      validateUsername(
        formValues.username,
        validateUsernameAvailability,
        setFormClasses,
        setFormMessages
      );
    }
  };

  const handleBlurOnEmailField = event => {
    if (event.target.value === user.email) {
      setFormClasses(prevFormClasses => {
        return {
          ...prevFormClasses,
          email: formClassesEnum.VALID
        };
      });
    } else {
      validateEmail(
        formValues.email,
        validateEmailAvailability,
        setFormClasses,
        setFormMessages
      );
    }
  };

  const handleBlurOnNewPasswordField = event => {
    if (event.target.value) {
      validatePassword(formValues.newPassword, setFormClasses);
    } else {
      setFormClasses(prevFormClasses => {
        return {
          ...prevFormClasses,
          password: ''
        };
      });
    }
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleDeactivate = () => {
    deleteUser({ variables: { password: formValues.oldPassword } });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
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
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          name="email"
          id="email"
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
        <label htmlFor="new-password">New Password:</label>
        <br />
        <input
          type="password"
          name="newPassword"
          id="new-password"
          value={formValues.newPassword}
          className={formClasses.password}
          onChange={handleChange}
          onBlur={handleBlurOnNewPasswordField}
        />{' '}
        {formClasses.password === formClassesEnum.VALID && (
          <span className="fas fa-check green" />
        )}
        {formClasses.password === formClassesEnum.INVALID && (
          <Message>{formMessages.password}</Message>
        )}
        <br />
        <label htmlFor="old-password">Old password:</label>
        <br />
        <input
          type="password"
          name="oldPassword"
          id="old-password"
          value={formValues.oldPassword}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Save" className="button button-red" />
        <input
          type="button"
          value="Cancel"
          className="button button-red"
          onClick={handleCancel}
        />
        <input
          type="button"
          value="Deactivate"
          className="button button-iris"
          onClick={handleDeactivate}
        />
      </form>
      {isInvalid && errorMessageBox}
    </>
  );
};
