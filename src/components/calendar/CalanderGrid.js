/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import CalendarCell from './CalendarCell';

const CalendarGrid = ({ selectedYear, selectedMonth, selectedDate, onSelectDate }) => {
  const { colours } = useTheme();

  const calendarGrid = css`
    display: grid;
    grid-template-columns: repeat(7, 80px);
    grid-gap: 1px;
    text-align: left;
    background-color: ${colours.white};
    color: ${colours.black};
  `;

  return (
    <div css={calendarGrid}>
      {[...Array((new Date(selectedYear, selectedMonth).getDay() + 6) % 7).keys()].reverse().map((date) => (
        <CalendarCell
          key={uuidv4()}
          isGreyed
          year={selectedYear}
          month={selectedMonth - 1}
          date={new Date(selectedYear, selectedMonth + 1, 0).getDate() - date}
          onClick={onSelectDate}
        />
      ))}
      {[...Array(new Date(selectedYear, selectedMonth + 1, 0).getDate()).keys()].map((date) => (
        <CalendarCell
          key={uuidv4()}
          isSelected={selectedDate === date + 1}
          year={selectedYear}
          month={selectedMonth}
          date={date + 1}
          onClick={onSelectDate}
        />
      ))}
      {[...Array(6 - ((new Date(selectedYear, selectedMonth + 1, 0).getDay() + 6) % 7)).keys()].map((date) => (
        <CalendarCell
          key={uuidv4()}
          isGreyed
          year={selectedYear}
          month={selectedMonth + 1}
          date={date + 1}
          onClick={onSelectDate}
        />
      ))}
    </div>
  );
};

CalendarGrid.propTypes = {
  selectedYear: PropTypes.number.isRequired,
  selectedMonth: PropTypes.number.isRequired,
  selectedDate: PropTypes.number.isRequired,
  onSelectDate: PropTypes.func.isRequired,
};

export default CalendarGrid;
