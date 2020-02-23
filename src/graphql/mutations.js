import gql from 'graphql-tag';

export const REGISTER_USER = gql`
  mutation RegisterUser($user: UserInput!) {
    registerUser(user: $user) {
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

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UserInput!, $oldPassword: String!) {
    updateUser(user: $user, oldPassword: $oldPassword) {
      token
      username
      email
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
