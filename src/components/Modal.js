/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import { useModal } from '../hooks';

const Modal = ({ children }) => {
  const { colours } = useTheme();
  const { closeModal } = useModal();

  const slideUp = keyframes`
  from {
      opacity: 0;
      left: 50%;
    top: 50%;
    transform: translate(-50%, -45%);
  }
  to {
    opacity: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

  const modal = css`
    padding: 30px;
    border-radius: 10px;
    background-color: ${colours.background.primary};
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.7);
    position: fixed;
    animation: ${slideUp} 0.5s forwards;
    max-height: 50vh;
    overflow-x: hidden;
    overflow-y: auto;
  `;

  const button = css`
    font-size: 1.3rem;
    float: right;
    color: ${colours.text};
    transition: color 0.3s;
    cursor: pointer;
    &:hover {
      color: ${colours.primary.main};
    }
  `;

  return (
    <div css={modal}>
      <span
        css={button}
        role="button"
        aria-label="close modal"
        className="fas fa-times"
        onClick={closeModal}
        onKeyPress={closeModal}
        tabIndex="0"
      />
      {children}
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Modal;
