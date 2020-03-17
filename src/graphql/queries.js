import gql from 'graphql-tag';

export const GET_ABOUT_STORY = gql`
  query GetAboutStory {
    getAboutStory {
      title
      description
      sections {
        id
        title
        contents {
          id
          title
          text
          order
        }
        order
      }
    }
  }
`;

export const GET_CALENDAR_EVENTS_BY_DATE_RANGE = gql`
  query GetCalendarEventsByDateRange($startDate: Date!, $endDate: Date!) {
    getCalendarEventsByDateRange(startDate: $startDate, endDate: $endDate) {
      id
      title
      type
      isAllDay
      startDate
      endDate
    }
  }
`;

export const GET_USER = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      username
      email
    }
  }
`;

export const LOGIN = gql`
  query Login($user: UserInput!) {
    login(user: $user) {
      token
      username
    }
  }
`;
