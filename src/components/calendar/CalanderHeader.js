/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';

const CalendarHeader = ({ selectedYear, selectedMonth, onToggleMonthLeft, onToggleMonthRight }) => {
  const { colours } = useTheme();

  const calendarHeader = css`
    display: grid;
    grid-template-columns: repeat(7, 81px);
    grid-template-rows: 40px 30px 30px;
    background-color: ${colours.secondary.dark};
    border-radius: 10px 10px 0px 0px;
  `;

  const year = css`
    grid-column: span 7;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px 10px 0px 0px;
    font-size: 1.2rem;
  `;

  const month = css`
    grid-column: span 3;
  `;

  const icon = css`
    display: flex;
    align-items: flex-start;
    grid-column: span 2;
    transition: color 0.3s;
    cursor: pointer;
    &:hover {
      color: ${colours.primary.main};
    }
  `;

  const left = css`
    margin-left: auto;
  `;

  const right = css`
    margin-right: auto;
  `;

  const dayStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colours.secondary.main};
  `;

  return (
    <div css={calendarHeader}>
      <div css={year}>{selectedYear}</div>

      <span
        css={[icon, left]}
        className="fas fa-chevron-left"
        role="button"
        aria-label="toggle month left"
        tabIndex="0"
        onKeyPress={onToggleMonthLeft}
        onClick={onToggleMonthLeft}
      />
      <span css={month}>
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
          ][selectedMonth]
        }
      </span>
      <span
        css={[icon, right]}
        className="fas fa-chevron-right"
        role="button"
        aria-label="toggle month left"
        tabIndex="0"
        onKeyPress={onToggleMonthRight}
        onClick={onToggleMonthRight}
      />
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
        <span css={dayStyle} key={day}>
          {day}
        </span>
      ))}
    </div>
  );
};

CalendarHeader.propTypes = {
  selectedYear: PropTypes.number.isRequired,
  selectedMonth: PropTypes.number.isRequired,
  onToggleMonthLeft: PropTypes.func.isRequired,
  onToggleMonthRight: PropTypes.func.isRequired,
};

export default CalendarHeader;
