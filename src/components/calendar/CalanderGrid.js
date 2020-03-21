/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import PropTypes from 'prop-types';
import CalendarCell from './CalendarCell';

const CalendarGrid = ({ events, selectedDate, onSelectDate, onClickEvent }) => {
  const today = new Date();
  const previousMonth = new Date(selectedDate.year, selectedDate.month, 0);
  const lastDayCurrentMonth = new Date(selectedDate.year, selectedDate.month + 1, 0);
  const nextMonth = new Date(selectedDate.year, selectedDate.month + 1);

  return (
    <React.Fragment>
      {[...Array(previousMonth.getDay()).keys()].map((key) => {
        const date = key + 1 + previousMonth.getDate() - [...Array(previousMonth.getDay()).keys()].length;
        return (
          <CalendarCell
            key={`${previousMonth.getFullYear()}-${previousMonth.getMonth()}-${date}`}
            date={{
              year: previousMonth.getFullYear(),
              month: previousMonth.getMonth(),
              date,
            }}
            events={events.filter((event) => {
              const startDate = new Date(event.startDate);
              return (
                startDate.getFullYear() === previousMonth.getFullYear() &&
                startDate.getMonth() === previousMonth.getMonth() &&
                startDate.getDate() === date
              );
            })}
            isGreyed
            isToday={
              previousMonth.getFullYear() === today.getFullYear() &&
              previousMonth.getMonth() === today.getMonth() &&
              date === today.getDate()
            }
            onSelect={onSelectDate}
            onClickEvent={onClickEvent}
          />
        );
      })}
      {[...Array(lastDayCurrentMonth.getDate()).keys()].map((date) => (
        <CalendarCell
          key={`${selectedDate.year}-${selectedDate.month}-${date + 1}`}
          date={{
            year: selectedDate.year,
            month: selectedDate.month,
            date: date + 1,
          }}
          events={events.filter((event) => {
            const startDate = new Date(event.startDate);
            const endDate = new Date(event.endDate);
            const calendarDate = new Date(selectedDate.year, selectedDate.month, date + 1);
            return startDate <= calendarDate && endDate >= calendarDate;
          })}
          isSelected={selectedDate.date === date + 1}
          isToday={
            selectedDate.year === today.getFullYear() &&
            selectedDate.month === today.getMonth() &&
            date + 1 === today.getDate()
          }
          onSelect={onSelectDate}
          onClickEvent={onClickEvent}
        />
      ))}
      {[...Array((8 - nextMonth.getDay()) % 7).keys()].map((date) => (
        <CalendarCell
          key={`${nextMonth.getFullYear()}-${nextMonth.getMonth()}-${date + 1}`}
          date={{
            year: nextMonth.getFullYear(),
            month: nextMonth.getMonth(),
            date: date + 1,
          }}
          events={events.filter((event) => {
            const startDate = new Date(event.startDate);
            return (
              startDate.getFullYear() === nextMonth.getFullYear() &&
              startDate.getMonth() === nextMonth.getMonth() &&
              startDate.getDate() === date + 1
            );
          })}
          isGreyed
          isToday={
            nextMonth.getFullYear() === today.getFullYear() &&
            nextMonth.getMonth() === today.getMonth() &&
            date + 1 === today.getDate()
          }
          onSelect={onSelectDate}
          onClickEvent={onClickEvent}
        />
      ))}
    </React.Fragment>
  );
};

CalendarGrid.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      isAllDay: PropTypes.bool.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string,
    }),
  ),
  selectedDate: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    date: PropTypes.number,
  }).isRequired,
  onSelectDate: PropTypes.func.isRequired,
  onClickEvent: PropTypes.func.isRequired,
};

CalendarGrid.defaultProps = {
  events: [],
};

export default CalendarGrid;
