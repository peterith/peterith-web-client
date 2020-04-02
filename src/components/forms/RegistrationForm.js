/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { useAuth, useModal, useToast } from '../../hooks';
import { validateEmail, validatePassword } from '../../utils/validation';
import Heading from '../Heading';
import Input from './Input';
import { InputTypeEnum } from '../../utils/enums';
import InputButton from './InputButton';

const RegistrationForm = () => {
  const { refreshUser } = useAuth();
  const { closeModal } = useModal();
  const { addSuccessToast, addErrorToast } = useToast();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateEmail(formValues.email) && validatePassword(formValues.password)) {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URI}/register`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      switch (response.status) {
        case 200: {
          closeModal();
          refreshUser();
          addSuccessToast(`Please update your username.`);
          break;
        }
        case 422:
          addErrorToast('Incorrect email or password format.');
          break;
        case 409:
          addErrorToast('Email is already registerded.');
          break;
        default:
          addErrorToast('Unable to register, please try again later.');
          break;
      }
    } else {
      addErrorToast(`Invalid email or password format.`);
    }
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setFormValues((previousFormValues) => ({
      ...previousFormValues,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading headingLevel={2}>Register</Heading>
      <Input
        type={InputTypeEnum.EMAIL}
        label="Email"
        isRequired
        onChange={handleChange('email')}
        value={formValues.email}
      />
      <Input
        type={InputTypeEnum.PASSWORD}
        label="Password"
        description="Password must contain at least 8 characters!"
        isRequired
        onChange={handleChange('password')}
        value={formValues.password}
      />
      <InputButton value="Register" />
    </form>
  );
};

export default RegistrationForm;
