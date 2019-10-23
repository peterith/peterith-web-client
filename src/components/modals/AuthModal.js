/** @jsx jsx */
import { jsx } from '@emotion/core';
import Modal from './Modal';
import { LoginForm, RegistrationForm } from '../forms';

const AuthModal = () => {
  return (
    <Modal>
      <LoginForm />
      <RegistrationForm />
    </Modal>
  );
};

export default AuthModal;
