import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import ProfileEdit from './ProfileEdit';
import { GET_USER } from '../graphql/queries';

export default () => {
  const [editMode, setEditMode] = useState(false);
  const { username } = useParams();
  const { data, refetch } = useQuery(GET_USER, { variables: { username } });

  const handleClick = () => {
    setEditMode(true);
  };

  if (editMode) {
    return (
      <div>
        <h1>Profile</h1>
        <ProfileEdit
          setEditMode={setEditMode}
          refetch={refetch}
          user={data.getUser.user}
        ></ProfileEdit>
      </div>
    );
  }

  if (data) {
    if (data.getUser.success) {
      return (
        <div>
          <h1>Profile</h1>
          <table>
            <tbody>
              <tr>
                <td>Username:</td>
                <td>{data.getUser.user.username}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{data.getUser.user.email}</td>
              </tr>
            </tbody>
          </table>
          <button className="button button-red" onClick={handleClick}>
            Edit
          </button>
        </div>
      );
    }

    return <p>{data.getUser.message}</p>;
  }

  return <p>Please login again.</p>;
};
