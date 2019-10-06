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
  const { loading, error, data } = useQuery(ME);

  if (loading) return <p>loading...</p>;
  if (error) return <p>{error}</p>;
  if (data && data.me.success) {
    return (
      <div>
        <h1>Profile</h1>
        <p>{data.me.user.username}</p>
        <p>{data.me.user.email}</p>
      </div>
    );
  } else {
    return <p>You need to login.</p>;
  }
};
