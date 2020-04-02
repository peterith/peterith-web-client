/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTheme } from 'emotion-theming';
import { GET_CALENDAR_EVENTS_BY_DATE_RANGE } from '../../graphql/queries';
import { ADD_CALENDAR_EVENT, DELETE_CALENDAR_EVENT } from '../../graphql/mutations';
import { useToast, useModal, useProfile, useAuth } from '../../hooks';
import CalendarHeader from './CalanderHeader';
import CalendarGrid from './CalanderGrid';

const Calendar = () => {
  const { colours } = useTheme();
  const { user: authUser } = useAuth();
  const { user: profileUser } = useProfile();
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
      userId: profileUser.id,
      startDate: new Date(selectedDate.year, selectedDate.month, 1 - previousMonth.getDay()),
      endDate: new Date(selectedDate.year, selectedDate.month + 1, (9 - nextMonth.getDay()) % 7),
    },
    skip: !profileUser.id,
    onCompleted: ({ getCalendarEventsByDateRange }) => {
      setEvents(getCalendarEventsByDateRange);
    },
    onError: () => {
      addErrorToast('Unable to get calendar events.');
    },
  });

  const [addCalendarEventMutation] = useMutation(ADD_CALENDAR_EVENT, {
    onCompleted: ({ addCalendarEvent }) => {
      closeModal();
      setEvents((previousEvents) => {
        return previousEvents.concat(addCalendarEvent);
      });
      addSuccessToast('Event has been added!');
    },
    onError: ({ graphQLErrors }) => {
      addErrorToast(graphQLErrors[0].message);
    },
  });

  const [deleteCalendarEventMutation] = useMutation(DELETE_CALENDAR_EVENT, {
    onCompleted: ({ deleteCalendarEvent }) => {
      setEvents((previousEvents) => {
        return previousEvents.filter(({ id }) => deleteCalendarEvent.id !== id);
      });
      addSuccessToast('Event has been deleted!');
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

  const handleSelectDate = (date) => {
    return () => {
      setSelectedDate(date);
    };
  };

  const handleClickEvent = (id) => () => {
    deleteCalendarEventMutation({
      variables: {
        id,
      },
    });
  };

  return (
    <div css={calendar}>
      <CalendarHeader
        year={selectedDate.year}
        month={selectedDate.month}
        isViewOnly={!authUser.id || authUser.id !== profileUser.id}
        onToggleToday={handleToggleToday}
        onAddEvent={openCalendarEventModal({
          onSubmit: addCalendarEventMutation,
          startDate: new Date(selectedDate.year, selectedDate.month, selectedDate.date),
          endDate: new Date(selectedDate.year, selectedDate.month, selectedDate.date),
        })}
        onToggleMonthLeft={handleToggleMonthLeft}
        onToggleMonthRight={handleToggleMonthRight}
      />
      <CalendarGrid
        events={events}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
        onClickEvent={handleClickEvent}
      />
    </div>
  );
};

export default Calendar;
