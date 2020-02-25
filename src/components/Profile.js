/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GET_USER } from '../graphql/queries';
import Heading from './Heading';

const Profile = () => {
  const { username } = useParams();
  const { data, loading, error } = useQuery(GET_USER, { variables: { username } });

  const profile = css`
    display: flex;
    justify-content: center;
  `;

  const section = css`
    border: 1px solid;
    border-radius: 10px;
    padding: 30px;
  `;

  const heading = css`
    margin-top: 0px;
  `;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{`${error.graphQLErrors[0].message}`}</p>;
  }

  return (
    <div css={profile}>
      <section css={section}>
        <Heading css={heading}>Profile</Heading>
        <table>
          <tbody>
            <tr>
              <td>Username:</td>
              <td>{data.getUser.username}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{data.getUser.email}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Profile;
