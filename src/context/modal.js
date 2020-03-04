/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { createContext, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { AuthModal } from '../components/modals';
import { ModalTypeEnum } from '../utils/enums';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [options, setOptions] = useState({ isOpened: false, modalType: null });

  const style = css`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100vw;
    height: 100vh;
  `;

  const getModal = (modalType) => {
    switch (modalType) {
      case ModalTypeEnum.AUTH:
        return <AuthModal />;
      default:
        return null;
    }
  };

  const openAuthModal = () => {
    setOptions({ isOpened: true, modalType: ModalTypeEnum.AUTH });
  };

  const closeModal = () => {
    setOptions({ isOpened: false });
  };

  return (
    <ModalContext.Provider value={{ openAuthModal, closeModal }}>
      {createPortal(options.isOpened && getModal(options.modalType), document.getElementById('modal-root'))}
      {options.isOpened && <div css={style} />}
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = { children: PropTypes.element.isRequired };

export { ModalContext, ModalProvider };
