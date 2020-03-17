/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { createContext, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalEnum } from '../utils/enums';
import Modal from '../components/Modal';
import { AuthForms, CalendarEventForm } from '../components/forms';

const ModalContext = createContext();

const getModalContent = (modalType) => {
  switch (modalType) {
    case ModalEnum.AUTH:
      return AuthForms;
    case ModalEnum.CALENDAR_EVENT:
      return CalendarEventForm;
    default:
      return null;
  }
};

const ModalProvider = ({ children }) => {
  const [options, setOptions] = useState({
    isOpened: false,
    modalType: null,
    payload: {},
  });

  const style = css`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100vw;
    height: 100vh;
  `;

  const ModalContent = getModalContent(options.modalType);

  const openAuthModal = () => {
    setOptions({
      isOpened: true,
      modalType: ModalEnum.AUTH,
      payload: {},
    });
  };

  const openCalendarEventModal = (payload) => () => {
    setOptions({
      isOpened: true,
      modalType: ModalEnum.CALENDAR_EVENT,
      payload,
    });
  };

  const closeModal = () => {
    setOptions({ isOpened: false });
  };

  return (
    <ModalContext.Provider value={{ openAuthModal, openCalendarEventModal, closeModal }}>
      {createPortal(
        options.isOpened && (
          <Modal>
            <ModalContent onSubmit={options.payload.onSubmit} />
          </Modal>
        ),
        document.getElementById('modal-root'),
      )}
      {options.isOpened && <div css={style} />}
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { ModalContext, ModalProvider };
