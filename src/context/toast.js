/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { createContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Toast from '../components/Toast';
import { ToastTypeEnum } from '../utils/enums';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {
  const style = css`
    position: fixed;
    right: 20px;
    top: 100px;
    width: 450px;
    max-width: 80%;
  `;

  const [toasts, setToasts] = useState([]);

  const addErrorToast = (message) => {
    setToasts((prevToasts) => {
      return prevToasts.concat({
        id: uuidv4(),
        toastType: ToastTypeEnum.ERROR,
        message,
      });
    });
  };

  const addSuccessToast = (message) => {
    setToasts((prevToasts) => {
      return prevToasts.concat({
        id: uuidv4(),
        toastType: ToastTypeEnum.SUCCESS,
        message,
      });
    });
  };

  const handleClose = (id) => {
    return () => {
      setToasts((prevToasts) => {
        return prevToasts.filter((toast) => toast.id !== id);
      });
    };
  };

  return (
    <ToastContext.Provider value={{ addErrorToast, addSuccessToast }}>
      {createPortal(
        <div css={style}>
          {toasts.map(({ id, toastType, message }) => {
            return (
              <Toast key={id} onClose={handleClose(id)} toastType={toastType}>
                {message}
              </Toast>
            );
          })}
        </div>,
        document.getElementById('toast-root'),
      )}
      {children}
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export { ToastContext, ToastProvider };
