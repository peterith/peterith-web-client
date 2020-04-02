/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useAuth, useModal, useToast } from '../../hooks';
import Heading from '../Heading';
import Input from './Input';
import { InputTypeEnum } from '../../utils/enums';
import InputButton from './InputButton';

const LoginForm = () => {
  const { refreshUser } = useAuth();
  const { closeModal } = useModal();
  const { addSuccessToast, addErrorToast } = useToast();
  const [formValues, setFormValues] = useState({
    username: '',
    password: '',
  });

  const style = css`
    border-bottom: 1px solid;
    padding-bottom: 20px;
  `;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues),
    });

    switch (response.status) {
      case 200: {
        const { username } = await response.json();
        closeModal();
        refreshUser();
        addSuccessToast(`Welcome back, ${username}.`);
        break;
      }
      case 401:
        addErrorToast('Incorrect username/email or password.');
        break;
      default:
        addErrorToast('Unable to login, please try again later.');
        break;
    }
  };

  const handleChange = (field) => ({ target: { value } }) => {
    setFormValues((previousFormValues) => ({
      ...previousFormValues,
      [field]: value,
    }));
  };

  return (
    <form css={style} onSubmit={handleSubmit}>
      <Heading headingLevel={2}>Login</Heading>
      <Input
        type={InputTypeEnum.TEXT}
        label="Username/Email"
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
