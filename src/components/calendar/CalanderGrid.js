/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import PropTypes from 'prop-types';
import CalendarCell from './CalendarCell';

const CalendarGrid = ({ selectedDate, onSelectDate }) => {
  return (
    <React.Fragment>
      {[...Array((new Date(selectedDate.year, selectedDate.month).getDay() + 6) % 7).keys()].reverse().map((date) => (
        <CalendarCell
          key={`${selectedDate.year}-${selectedDate.month - 1}-${new Date(
            selectedDate.year,
            selectedDate.month + 1,
            0,
          ).getDate() - date}`}
          isGreyed
          isToday={
            selectedDate.year === new Date().getFullYear() &&
            selectedDate.month - 1 === new Date().getMonth() &&
            new Date(selectedDate.year, selectedDate.month + 1, 0).getDate() - date === new Date().getDate()
          }
          year={selectedDate.year}
          month={selectedDate.month - 1}
          date={new Date(selectedDate.year, selectedDate.month + 1, 0).getDate() - date}
          onClick={onSelectDate}
        />
      ))}
      {[...Array(new Date(selectedDate.year, selectedDate.month + 1, 0).getDate()).keys()].map((date) => (
        <CalendarCell
          key={`${selectedDate.year}-${selectedDate.month}-${date + 1}`}
          isSelected={selectedDate.date === date + 1}
          isToday={
            selectedDate.year === new Date().getFullYear() &&
            selectedDate.month === new Date().getMonth() &&
            date + 1 === new Date().getDate()
          }
          year={selectedDate.year}
          month={selectedDate.month}
          date={date + 1}
          onClick={onSelectDate}
        />
      ))}
      {[...Array(6 - ((new Date(selectedDate.year, selectedDate.month + 1, 0).getDay() + 6) % 7)).keys()].map(
        (date) => (
          <CalendarCell
            key={`${selectedDate.year}-${selectedDate.month + 1}-${date + 1}`}
            isGreyed
            isToday={
              selectedDate.year === new Date().getFullYear() &&
              selectedDate.month + 1 === new Date().getMonth() &&
              date + 1 === new Date().getDate()
            }
            year={selectedDate.year}
            month={selectedDate.month + 1}
            date={date + 1}
            onClick={onSelectDate}
          />
        ),
      )}
    </React.Fragment>
  );
};

CalendarGrid.propTypes = {
  selectedDate: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    date: PropTypes.number,
  }).isRequired,
  onSelectDate: PropTypes.func.isRequired,
};

export default CalendarGrid;
