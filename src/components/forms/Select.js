/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { useTheme } from 'emotion-theming';
import Tooltip from './Tooltip';

const Select = ({ label, description, isRequired, onChange, options, value }) => {
  const { colours } = useTheme();

  const select = css`
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
      <select id={id} css={select} onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <br />
    </label>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
};

Select.defaultProps = {
  description: null,
  isRequired: false,
};

export default Select;
