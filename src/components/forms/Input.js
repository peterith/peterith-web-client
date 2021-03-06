/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useTheme } from 'emotion-theming';
import Tooltip from './Tooltip';

const Input = ({ type, label, description, value, isRequired, onChange }) => {
  const { colours } = useTheme();

  const input = css`
    margin: 10px 0px;
    border-radius: 5px;
    padding: 3px;
    width: 300px;
    max-width: 50vw;
    box-sizing: content-box;
  `;

  const red = css`
    color: ${colours.primary.main};
  `;

  const id = uuidv4();

  return (
    <label htmlFor={id}>
      {label}: {description && <Tooltip>{description}</Tooltip>} {isRequired && <span css={red}>*</span>}
      <br />
      <input css={input} id={id} type={type} value={value} required={isRequired} onChange={onChange} />
      <br />
    </label>
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  value: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  description: null,
  isRequired: false,
};

export default Input;
