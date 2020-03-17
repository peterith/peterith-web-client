/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';

const CalendarHeader = ({ year, month, onToggleToday, onAddEvent, onToggleMonthLeft, onToggleMonthRight }) => {
  const { colours } = useTheme();

  const headerColour = css`
    background-color: ${colours.secondary.dark};
    color: ${colours.white};
  `;

  const todayContainer = css`
    grid-column: span 2;
    border-top-left-radius: 10px;
    display: flex;
    align-items: center;
    font-size: 0.9rem;
  `;

  const today = css`
    margin-left: 10px;
  `;
  const yearStyle = css`
    grid-column: span 3;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
  `;

  const addIconContainer = css`
    grid-column: span 2;
    display: flex;
    align-items: center;
    border-top-right-radius: 10px;
  `;

  const addIcon = css`
    margin: 0px 10px 0px auto;
  `;

  const monthStyle = css`
    grid-column: span 3;
  `;

  const icon = css`
    display: flex;
    align-items: flex-start;
    grid-column: span 2;
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
  `;

  return (
    <React.Fragment>
      <div css={[todayContainer, headerColour]}>
        <span
          css={[today, hover]}
          role="button"
          aria-label="toggle today"
          tabIndex="0"
          onKeyPress={onToggleToday}
          onClick={onToggleToday}
        >
          TODAY
        </span>
      </div>
      <div css={[yearStyle, headerColour]}>{year}</div>
      <div css={[addIconContainer, headerColour]}>
        <span
          css={[addIcon, hover]}
          className="fas fa-plus"
          role="button"
          aria-label="add event"
          tabIndex="0"
          onKeyPress={onAddEvent}
          onClick={onAddEvent}
        />
      </div>
      <div css={[icon, headerColour]}>
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
      <span css={[monthStyle, headerColour]}>
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
      <div css={[icon, headerColour]}>
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
  onToggleToday: PropTypes.func.isRequired,
  onAddEvent: PropTypes.func.isRequired,
  onToggleMonthLeft: PropTypes.func.isRequired,
  onToggleMonthRight: PropTypes.func.isRequired,
};

export default CalendarHeader;
