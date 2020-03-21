import gql from 'graphql-tag';

export const ADD_CALENDAR_EVENT = gql`
  mutation AddCalendarEvent($calendarEvent: CalendarEventInput!) {
    addCalendarEvent(calendarEvent: $calendarEvent) {
      id
      title
      type
      isAllDay
      startDate
      endDate
    }
  }
`;

export const ADD_TASK = gql`
  mutation AddTask($task: TaskInput!) {
    addTask(task: $task) {
      id
      title
      list
      isPublic
      order
    }
  }
`;

export const DELETE_CALENDAR_EVENT = gql`
  mutation DeleteCalendarEvent($id: ID!) {
    deleteCalendarEvent(id: $id) {
      id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
      title
      list
      isPublic
      order
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

export const REORDER_TASK = gql`
  mutation ReorderTask($id: ID!, $newOrder: Int!) {
    reorderTask(id: $id, newOrder: $newOrder) {
      id
      title
      list
      isPublic
      order
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $task: TaskInput!) {
    updateTask(id: $id, task: $task) {
      id
      title
      list
      isPublic
      order
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
