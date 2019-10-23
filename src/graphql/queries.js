import gql from 'graphql-tag';

export const LOGIN = gql`
  query Login($user: UserInput!) {
    login(user: $user) {
      success
      message
      username
      token
    }
  }
`;

export const VALIDATE_USERNAME_AVAILABILITY = gql`
  query ValidateUsernameAvailability($username: String!) {
    validateUsernameAvailability(username: $username) {
      success
      message
    }
  }
`;

export const VALIDATE_EMAIL_AVAILABILITY = gql`
  query ValidateEmailAvailability($email: String!) {
    validateEmailAvailability(email: $email) {
      success
      message
    }
  }
`;

export const GET_USER = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      success
      message
      user {
        username
        email
      }
    }
  }
`;
