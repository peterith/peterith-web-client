/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { useAuth, useModal, useToast } from '../../hooks';
import { LOGIN } from '../../graphql/queries';
import Heading from '../Heading';
import Input from './Input';
import { InputTypeEnum } from '../../utils/enums';
import InputButton from './InputButton';

const LoginForm = () => {
  const { login } = useAuth();
  const { closeModal } = useModal();
  const { addSuccessToast, addErrorToast } = useToast();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  // variables are passed at the query function due to apollo client bug, move variables back here when bug is fixed
  const [loginQuery] = useLazyQuery(LOGIN, {
    onCompleted: ({ login: { username, token } }) => {
      closeModal();
      login(username, token);
      addSuccessToast(`Welcome back, ${username}!`);
    },
    onError: ({ graphQLErrors }) => {
      addErrorToast(graphQLErrors[0].message);
    },
  });

  const style = css`
    border-bottom: 1px solid;
    padding-bottom: 20px;
  `;

  const handleSubmit = (event) => {
    event.preventDefault();
    loginQuery({
      variables: {
        user: formValues,
      },
    });
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setFormValues((previousFormValues) => ({
      ...previousFormValues,
      [name]: value,
    }));
  };

  return (
    <form css={style} onSubmit={handleSubmit}>
      <Heading headingLevel={2}>Login</Heading>
      <Input
        type={InputTypeEnum.TEXT}
        label="Username"
        onChange={handleChange('username')}
        value={formValues.username}
      />
      <Input
        type={InputTypeEnum.PASSWORD}
        label="Password"
        onChange={handleChange('password')}
        value={formValues.password}
      />
      <InputButton value="Login" />
    </form>
  );
};

export default LoginForm;
