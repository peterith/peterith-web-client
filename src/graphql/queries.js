import gql from 'graphql-tag';

export const LOGIN = gql`
  query Login($user: UserInput!) {
    login(user: $user) {
      token
      username
    }
  }
`;

export const GET_USER = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      token
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
