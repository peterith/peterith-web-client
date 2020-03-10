/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useTheme } from 'emotion-theming';
import CalendarHeader from './CalanderHeader';
import CalendarGrid from './CalanderGrid';

const Calendar = () => {
  const { colours } = useTheme();
  const [selectedDate, setSelectedDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    date: new Date().getDate(),
  });

  const calendar = css`
    display: grid;
    grid-template-columns: repeat(7, 80px);
    grid-template-rows: 40px 30px 30px;
    grid-gap: 1px;
    margin: 0px 100px;
    text-align: center;
    border-radius: 10px 10px 0px 0px;
    background-color: ${colours.white};
    color: ${colours.black};
  `;

  const handleSelectDate = (year, month, date) => {
    return () => {
      setSelectedDate({ year, month, date });
    };
  };

  const handleToggleMonthLeft = () => {
    setSelectedDate((previousSelectedDate) => {
      return previousSelectedDate.month === 0
        ? { month: 11, year: previousSelectedDate.year - 1 }
        : { month: previousSelectedDate.month - 1, year: previousSelectedDate.year };
    });
  };

  const handleToggleMonthRight = () => {
    setSelectedDate((previousSelectedDate) => {
      return previousSelectedDate.month === 11
        ? { month: 0, year: previousSelectedDate.year + 1 }
        : { month: previousSelectedDate.month + 1, year: previousSelectedDate.year };
    });
  };

  return (
    <div css={calendar}>
      <CalendarHeader
        year={selectedDate.year}
        month={selectedDate.month}
        onToggleMonthLeft={handleToggleMonthLeft}
        onToggleMonthRight={handleToggleMonthRight}
      />
      <CalendarGrid selectedDate={selectedDate} onSelectDate={handleSelectDate} />
    </div>
  );
};

export default Calendar;
