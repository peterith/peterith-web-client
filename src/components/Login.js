import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/react-hooks';
import { AuthContext } from './App';
import MessageBox from './MessageBox';
import { LOGIN } from '../graphql/queries';

export default () => {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    username: '',
    password: ''
  });
  const [isInvalid, setIsInvalid] = useState(false);

  const [login, { client, data }] = useLazyQuery(LOGIN);

  const errorMessageBox = (
    <MessageBox>Incorrect username or password!</MessageBox>
  );
  const handleSubmit = event => {
    event.preventDefault();
    login({
      variables: {
        user: formValues
      }
    });
  };

  const handleChange = event => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    if (data) {
      if (data.login.success) {
        dispatch({
          type: 'LOGIN',
          payload: {
            username: data.login.username,
            token: data.login.token,
            client,
            history
          }
        });
      } else {
        setIsInvalid(true);
      }
    }
  }, [data, client, dispatch, history]);

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          value={formValues.username}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          value={formValues.password}
          onChange={handleChange}
        />
        <br />
        <input type="submit" value="Login" className="button button-red" />
      </form>
      {isInvalid && errorMessageBox}
    </div>
  );
};
