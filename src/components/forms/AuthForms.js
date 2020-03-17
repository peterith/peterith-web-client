/** @jsx jsx */
import { jsx } from '@emotion/core';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';

const AuthForms = () => {
  return (
    <div>
      <LoginForm />
      <RegistrationForm />
    </div>
  );
};

export default AuthForms;
