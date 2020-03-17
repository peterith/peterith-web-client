/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTheme } from 'emotion-theming';
import { GET_CALENDAR_EVENTS_BY_DATE_RANGE } from '../../graphql/queries';
import { ADD_CALENDAR_EVENT } from '../../graphql/mutations';
import { useToast, useModal } from '../../hooks';
import CalendarHeader from './CalanderHeader';
import CalendarGrid from './CalanderGrid';

const Calendar = () => {
  const { colours } = useTheme();
  const { addSuccessToast, addErrorToast } = useToast();
  const { openCalendarEventModal, closeModal } = useModal();
  const [events, setEvents] = useState([]);
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    date: today.getDate(),
  });

  const previousMonth = new Date(selectedDate.year, selectedDate.month, 0);
  const nextMonth = new Date(selectedDate.year, selectedDate.month + 1);

  useQuery(GET_CALENDAR_EVENTS_BY_DATE_RANGE, {
    variables: {
      startDate: new Date(Date.UTC(selectedDate.year, selectedDate.month, 1 - previousMonth.getDay())),
      endDate: new Date(Date.UTC(selectedDate.year, selectedDate.month + 1, (9 - nextMonth.getDay()) % 7)),
    },
    onCompleted: ({ getCalendarEventsByDateRange }) => {
      setEvents(getCalendarEventsByDateRange);
    },
    onError: () => {
      addErrorToast('Unable to get calendar events.');
    },
  });

  const [addCalendarEventMutation] = useMutation(ADD_CALENDAR_EVENT, {
    onCompleted: ({ addCalendarEvent }) => {
      setEvents((previousEvents) => {
        closeModal();
        previousEvents.push(addCalendarEvent);
        addSuccessToast('Successfully added an event!');
      });
    },
    onError: ({ graphQLErrors }) => {
      addErrorToast(graphQLErrors[0].message);
    },
  });

  const calendar = css`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: 40px 30px 30px;
    text-align: center;
    border-radius: 20px 20px 0px 0px;
    background-color: ${colours.white};
    color: ${colours.black};
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.7);
  `;

  const handleToggleToday = () => {
    setSelectedDate({
      year: today.getFullYear(),
      month: today.getMonth(),
      date: today.getDate(),
    });
  };

  const handleToggleMonthLeft = () => {
    setSelectedDate((previousSelectedDate) => {
      return previousSelectedDate.month === 0
        ? {
            month: 11,
            year: previousSelectedDate.year - 1,
          }
        : {
            month: previousSelectedDate.month - 1,
            year: previousSelectedDate.year,
          };
    });
  };

  const handleToggleMonthRight = () => {
    setSelectedDate((previousSelectedDate) => {
      return previousSelectedDate.month === 11
        ? {
            month: 0,
            year: previousSelectedDate.year + 1,
          }
        : {
            month: previousSelectedDate.month + 1,
            year: previousSelectedDate.year,
          };
    });
  };

  const handleSelectDate = (year, month, date) => {
    return () => {
      setSelectedDate({
        year,
        month,
        date,
      });
    };
  };

  return (
    <div css={calendar}>
      <CalendarHeader
        year={selectedDate.year}
        month={selectedDate.month}
        onToggleToday={handleToggleToday}
        onAddEvent={openCalendarEventModal({ onSubmit: addCalendarEventMutation })}
        onToggleMonthLeft={handleToggleMonthLeft}
        onToggleMonthRight={handleToggleMonthRight}
      />
      <CalendarGrid events={events} selectedDate={selectedDate} onSelectDate={handleSelectDate} />
    </div>
  );
};

export default Calendar;
