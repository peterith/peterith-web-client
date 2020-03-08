/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useTheme } from 'emotion-theming';
import { v4 as uuidv4 } from 'uuid';

const Calendar = () => {
  const { colours } = useTheme();
  const [selectedDate, setSelectedDate] = useState({ year: 2020, month: 2, date: 1 });

  const calendar = css`
    margin: 0px 100px;
    text-align: center;
    color: ${colours.white};
  `;

  const year = css`
    border-radius: 10px 10px 0px 0px;
    background-color: ${colours.secondary.dark};
    height: 20px;
    line-height: 30px;
    font-size: 1.2rem;
  `;

  const month = css`
    background-color: ${colours.secondary.dark};
    display: flex;
    align-items: center;
    height: 40px;
    line-height: 30px;
  `;

  const lol = css`
    flex-grow: 1;
    flex-basis: 0;
  `;

  const icon = css`
    flex-grow: 2;
    transition: color 0.3s;
    cursor: pointer;
    &:hover {
      color: ${colours.primary.main};
    }
  `;
  const left = css`
    text-align: right;
  `;

  const right = css`
    text-align: left;
  `;
  const days = css`
    display: flex;
    height: 25px;
    align-items: center;
    justify-content: space-around;
    background-color: ${colours.secondary.main};
  `;

  const grid = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 1px;
    text-align: left;
    background-color: ${colours.white};
    color: ${colours.black};
  `;

  const cell = css`
    width: 80px;
    height: 80px;
    padding: 5px;
    box-shadow: 0 0 0 1px;
  `;

  const greyed = css`
    background-color: rgba(0, 0, 0, 0.3);
  `;

  const selected = css`
    background-color: ${colours.secondary.light};
  `;

  const handleClickMonthLeft = () => {
    setSelectedDate((previousSelectedDate) => {
      return previousSelectedDate.month === 0
        ? { month: 11, year: previousSelectedDate.year - 1 }
        : { ...previousSelectedDate, month: previousSelectedDate.month - 1 };
    });
  };

  const handleClickMonthRight = () => {
    setSelectedDate((previousSelectedDate) => {
      return previousSelectedDate.month === 11
        ? { month: 0, year: previousSelectedDate.year + 1 }
        : { ...previousSelectedDate, month: previousSelectedDate.month + 1 };
    });
  };

  const handleClickDate = ({ target }) => {
    const date = target.dataset.date.split('-');
    setSelectedDate({
      year: Number(date[0]),
      month: Number(date[1]),
      date: Number(date[2]),
    });
  };

  return (
    <div css={calendar}>
      <div css={year}>{selectedDate.year}</div>
      <div css={month}>
        <span
          css={[icon, left]}
          className="fas fa-chevron-left"
          role="button"
          aria-label="shift month left"
          tabIndex="0"
          onKeyPress={handleClickMonthLeft}
          onClick={handleClickMonthLeft}
        />
        <span css={lol}>
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
            ][selectedDate.month]
          }
        </span>
        <span
          css={[icon, right]}
          className="fas fa-chevron-right"
          role="button"
          aria-label="shift month left"
          tabIndex="0"
          onKeyPress={handleClickMonthRight}
          onClick={handleClickMonthRight}
        />
      </div>
      <div css={days}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div css={grid}>
        {[...Array((new Date(selectedDate.year, selectedDate.month).getDay() + 6) % 7).keys()].reverse().map((date) => (
          <div css={[cell, greyed]} key={uuidv4()}>
            {new Date(selectedDate.year, selectedDate.month + 1, 0).getDate() - date}
          </div>
        ))}
        {[...Array(new Date(selectedDate.year, selectedDate.month + 1, 0).getDate()).keys()].map((date) => (
          <div
            css={selectedDate.date === date + 1 ? [cell, selected] : cell}
            key={uuidv4()}
            data-date={`${selectedDate.year}-${selectedDate.month}-${date + 1}`}
            onClick={handleClickDate}
          >
            {date + 1}
          </div>
        ))}
        {[...Array(6 - ((new Date(selectedDate.year, selectedDate.month + 1, 0).getDay() + 6) % 7)).keys()].map(
          (date) => (
            <div css={[cell, greyed]} key={uuidv4()}>
              {date + 1}
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Calendar;
