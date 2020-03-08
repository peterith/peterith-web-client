/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import UserInfo from './UserInfo';
import Calander from './Calander';

const Profile = () => {
  const style = css`
    display: flex;
    align-items: flex-start;
    justify-content: center;
  `;

  return (
    <div css={style}>
      <UserInfo />
      <Calander />
    </div>
  );
};

export default Profile;
