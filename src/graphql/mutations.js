import gql from 'graphql-tag';

export const REGISTER_USER = gql`
  mutation RegisterUser($user: UserInput!) {
    registerUser(user: $user) {
      success
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UserInput!) {
    updateUser(user: $user) {
      success
      message
      username
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($username: String!) {
    deleteUser(username: $username) {
      success
      message
    }
  }
`;
