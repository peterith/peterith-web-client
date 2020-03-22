/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import ReactDatePicker from 'react-datepicker';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from 'emotion-theming';
import Tooltip from './Tooltip';

const DatePicker = ({ label, description, selected, isAllDay, isRequired, onChange }) => {
  const { colours } = useTheme();

  const red = css`
    color: ${colours.primary.main};
  `;

  const id = uuidv4();

  return (
    <label htmlFor={id}>
      {label}: {description && <Tooltip>{description}</Tooltip>} {isRequired && <span css={red}>*</span>}
      <br />
      <ReactDatePicker
        id={id}
        selected={selected}
        showTimeSelect={!isAllDay}
        timeFormat="HH:mm"
        dateFormat={`MMMM d, yyyy${isAllDay ? '' : ' h:mm aa'}`}
        onChange={onChange}
      />
      <br />
    </label>
  );
};

export default DatePicker;
