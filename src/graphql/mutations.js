import gql from 'graphql-tag';

export const ADD_CALENDAR_EVENT = gql`
  mutation AddCalendarEvent($calendarEvent: CalendarEventInput!) {
    addCalendarEvent(calendarEvent: $calendarEvent) {
      title
      type
      isAllDay
      startDate
      endDate
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($password: String!) {
    deleteUser(password: $password) {
      firstName
      lastName
      username
      email
      role
      createdAt
      updatedAt
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($user: UserInput!) {
    registerUser(user: $user) {
      token
      username
      email
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UserInput!) {
    updateUser(user: $user) {
      token
      username
      email
    }
  }
`;
