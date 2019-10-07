import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export default () => {
  const ME = gql`
    query Me {
      me {
        success
        message
        user {
          username
          email
        }
      }
    }
  `;
  const { data } = useQuery(ME);

  if (data && data.me.success) {
    return (
      <div>
        <h1>Profile</h1>
        <p>Username: {data.me.user.username}</p>
        <p>Email: {data.me.user.email}</p>
      </div>
    );
  } else {
    return <p>You need to login.</p>;
  }
};
