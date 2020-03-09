/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useTheme } from 'emotion-theming';
import CalendarHeader from './CalanderHeader';
import CalendarGrid from './CalanderGrid';

const Calendar = () => {
  const { colours } = useTheme();
  const [selectedDate, setSelectedDate] = useState({ year: 2020, month: 2, date: 1 });

  const calendar = css`
    margin: 0px 100px;
    text-align: center;
    color: ${colours.white};
  `;

  const handleSelectDate = (year, month, date) => {
    return () => {
      setSelectedDate({ year, month, date });
    };
  };

  const handleToggleMonthLeft = () => {
    setSelectedDate((previousSelectedDate) => {
      return previousSelectedDate.month === 0
        ? { ...previousSelectedDate, month: 11, year: previousSelectedDate.year - 1 }
        : { ...previousSelectedDate, month: previousSelectedDate.month - 1 };
    });
  };

  const handleToggleMonthRight = () => {
    setSelectedDate((previousSelectedDate) => {
      return previousSelectedDate.month === 11
        ? { ...previousSelectedDate, month: 0, year: previousSelectedDate.year + 1 }
        : { ...previousSelectedDate, month: previousSelectedDate.month + 1 };
    });
  };

  return (
    <div css={calendar}>
      <CalendarHeader
        selectedYear={selectedDate.year}
        selectedMonth={selectedDate.month}
        onToggleMonthLeft={handleToggleMonthLeft}
        onToggleMonthRight={handleToggleMonthRight}
      />
      <CalendarGrid
        selectedYear={selectedDate.year}
        selectedMonth={selectedDate.month}
        selectedDate={selectedDate.date}
        onSelectDate={handleSelectDate}
      />
    </div>
  );
};

export default Calendar;
