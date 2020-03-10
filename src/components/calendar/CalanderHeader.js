/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';

const CalendarHeader = ({ year, month, onToggleMonthLeft, onToggleMonthRight }) => {
  const { colours } = useTheme();

  const yearStyle = css`
    grid-column: span 7;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px 10px 0px 0px;
    font-size: 1.2rem;
    background-color: ${colours.secondary.dark};
    color: ${colours.white};
    box-shadow: 0px 0px 0px 1px ${colours.secondary.dark};
  `;

  const monthStyle = css`
    grid-column: span 3;
    background-color: ${colours.secondary.dark};
    color: ${colours.white};
    box-shadow: 0px 0px 0px 1px ${colours.secondary.dark};
  `;

  const icon = css`
    display: flex;
    align-items: flex-start;
    grid-column: span 2;
    background-color: ${colours.secondary.dark};
    color: ${colours.white};
    box-shadow: 0px 0px 0px 1px ${colours.secondary.dark};
  `;

  const hover = css`
    transition: color 0.3s;
    cursor: pointer;
    &:hover {
      color: ${colours.primary.main};
    }
  `;

  const left = css`
    margin-left: auto;
  `;

  const dayStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colours.secondary.main};
    color: ${colours.white};
    box-shadow: 0px 0px 0px 1px ${colours.secondary.main};
  `;

  return (
    <React.Fragment>
      <div css={yearStyle}>{year}</div>
      <div css={icon}>
        <span
          css={[hover, left]}
          className="fas fa-chevron-left"
          role="button"
          aria-label="toggle month left"
          tabIndex="0"
          onKeyPress={onToggleMonthLeft}
          onClick={onToggleMonthLeft}
        />
      </div>
      <span css={monthStyle}>
        {
          [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ][month]
        }
      </span>
      <div css={icon}>
        <span
          css={hover}
          className="fas fa-chevron-right"
          role="button"
          aria-label="toggle month left"
          tabIndex="0"
          onKeyPress={onToggleMonthRight}
          onClick={onToggleMonthRight}
        />
      </div>
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
        <span css={dayStyle} key={day}>
          {day}
        </span>
      ))}
    </React.Fragment>
  );
};

CalendarHeader.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onToggleMonthLeft: PropTypes.func.isRequired,
  onToggleMonthRight: PropTypes.func.isRequired,
};

export default CalendarHeader;
