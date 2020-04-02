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

export const GET_AUTH_USER = gql`
  query GetAuthUser {
    getAuthUser {
      id
      fullName
      username
      email
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

export const GET_CURRENT_WEEK_SLEEP = gql`
  query GetCurrentWeekSleep($userId: ID!) {
    getCurrentWeekSleep(userId: $userId) {
      id
      date
      minutesAsleep
    }
  }
`;

export const GET_TASKS = gql`
  query GetTasks($userId: ID!) {
    getTasks(userId: $userId) {
      id
      list
      title
      deadline
      isPublic
      order
    }
  }
`;

export const GET_USER = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      id
      fullName
      username
      email
      fitbit {
        id
        sleepGoal
      }
    }
  }
`;
