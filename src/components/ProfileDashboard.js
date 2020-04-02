/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Calander from './calendar';
import UserInfoPanel from './UserInfoPanel';
import TaskPanel from './TaskPanel';
import SleepPanel from './SleepPanel';

const ProfileDashboard = () => {
  const profileDashboard = css`
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-auto-rows: 100px;
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
    grid-row: span 5;
    display: flex;
    justify-content: center;
  `;

  const userInfoPanel = css`
    grid-column: span 4;
    grid-row: span 3;
  `;

  const taskPanel = css`
    grid-column: span 4;
    grid-row: span 5;
  `;

  const sleepPanel = css`
    grid-column: span 6;
  `;

  return (
    <div css={profileDashboard}>
      <div css={calendarContainer}>
        <Calander />
      </div>
      <UserInfoPanel css={userInfoPanel} />
      <TaskPanel css={taskPanel} />
      <SleepPanel css={sleepPanel} />
    </div>
  );
};

export default ProfileDashboard;
