/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Calander from './calendar';
import UserInfoGrid from './UserInfoGrid';

const ProfileDashboard = () => {
  const profileDashboard = css`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 30px;
    align-items: flex-start;
    justify-content: center;
    padding: 30px;
    margin: auto;
    box-sizing: border-box;
    @media (min-width: 1281px) {
      width: 1280px;
    }
  `;

  const calendarContainer = css`
    grid-column: span 6;
    display: flex;
    justify-content: center;
  `;

  const userInfoGrid = css`
    grid-column: span 4;
  `;

  return (
    <div css={profileDashboard}>
      <div css={calendarContainer}>
        <Calander />
      </div>
      <UserInfoGrid css={userInfoGrid} />
    </div>
  );
};

export default ProfileDashboard;
