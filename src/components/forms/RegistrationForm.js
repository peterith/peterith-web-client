/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useAuth, useModal, useToast } from '../../hooks';
import { REGISTER_USER } from '../../graphql/mutations';
import { validateUsername, validateEmail, validatePassword } from '../../utils/validation';
import Heading from '../Heading';
import Input from './Input';
import { InputTypeEnum } from '../../utils/enums';
import InputButton from './InputButton';

const RegistrationForm = () => {
  const { login } = useAuth();
  const { closeModal } = useModal();
  const { addSuccessToast, addErrorToast } = useToast();
  const [formValues, setFormValues] = useState({ username: '', email: '', password: '' });

  const [registerUser] = useMutation(REGISTER_USER, {
    variables: { user: { username: formValues.username, email: formValues.email, password: formValues.password } },
    onCompleted: ({ registerUser: { username, token } }) => {
      closeModal();
      login(username, token);
      addSuccessToast(`Welcome, ${username}!`);
    },
    onError: ({ graphQLErrors }) => {
      addErrorToast(graphQLErrors[0].message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      registerUser();
    }
  };

  const isFormValid = () => {
    const isUsernameValid = validateField('username', validateUsername);
    const isEmailValid = validateField('email', validateEmail);
    const isPasswordValid = validateField('password', validatePassword);

    return isUsernameValid && isEmailValid && isPasswordValid;
  };

  const validateField = (field, validateFormValue) => {
    if (validateFormValue(formValues[field])) {
      return true;
    }
    addErrorToast(`You have entered an invalid ${field}.`);
    return false;
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormValues((prevFormValues) => {
      return { ...prevFormValues, [name]: value };
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Heading headingLevel={2}>Register</Heading>
      <Input
        type={InputTypeEnum.TEXT}
        label="Username"
        description="Username must contain 6-20 alphanumeric characters!"
        isRequired
        name="username"
        onChange={handleChange}
        value={formValues.username}
      />
      <Input
        type={InputTypeEnum.EMAIL}
        label="Email"
        description="Please provide a valid email address!"
        isRequired
        name="email"
        onChange={handleChange}
        value={formValues.email}
      />
      <Input
        type={InputTypeEnum.PASSWORD}
        label="Password"
        description="Password must contain at least 8 characters!"
        isRequired
        name="password"
        onChange={handleChange}
        value={formValues.password}
      />
      <InputButton value="Register" />
    </form>
  );
};

export default RegistrationForm;
