/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import { ToastTypeEnum } from '../utils/enums';

const getOptions = (toastType) => {
  switch (toastType) {
    case ToastTypeEnum.ERROR:
      return { colour: '#f66', symbol: 'fas fa-times-circle', title: 'Error' };
    case ToastTypeEnum.SUCCESS:
      return { colour: '#4fb', symbol: 'fas fa-check-circle', title: 'Success' };
    default:
      return {};
  }
};

const Toast = ({ toastType, onClose, children }) => {
  const { colours } = useTheme();

  const { colour, symbol, title } = getOptions(toastType);

  const slideLeft = keyframes`
  from {
      opacity: 0;
      transform: translateX(20px);
  }
`;

  const toastStyle = css`
    display: flex;
    margin: 20px;
    border-radius: 10px;
    background-color: ${colours.white};
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.7);
    animation: ${slideLeft} 0.5s;
  `;

  const bannerStyle = css`
    background-color: ${colour};
    border-radius: 10px 0px 0px 10px;
    width: 80px;
    text-align: center;
    font-size: 2rem;
    line-height: 80px;
    color: ${colours.white};
  `;

  const textStyle = css`
    padding: 15px 20px;
    font-size: 0.9rem;
  `;

  const titleStyle = css`
    font-size: 1rem;
    font-weight: bold;
    line-height: 30px;
  `;

  const closeButtonStyle = css`
    margin-left: auto;
    padding: 10px;
    color: ${colours.black};
    cursor: pointer;
  `;

  return (
    <div css={toastStyle}>
      <div css={bannerStyle}>
        <span className={symbol} />
      </div>
      <div css={textStyle}>
        <span css={titleStyle}>{title}</span>
        <br />
        {children}
      </div>
      <span css={closeButtonStyle} className="fas fa-times" onClick={onClose} />
    </div>
  );
};

Toast.propTypes = {
  toastType: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};

export default Toast;
