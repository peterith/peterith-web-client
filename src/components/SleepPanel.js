/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useQuery } from '@apollo/client';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import { GET_CURRENT_WEEK_SLEEP } from '../graphql/queries';
import Heading from './Heading';
import { useProfile } from '../hooks';

const SleepPanel = ({ className }) => {
  const { colours } = useTheme();
  const { user } = useProfile();
  const { data, loading, error } = useQuery(GET_CURRENT_WEEK_SLEEP, {
    variables: { userId: user.id },
    skip: !user.id,
  });

  const sleepPanel = css`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 20px;
    background-color: ${colours.background.secondary};
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 30px;
    text-align: center;
  `;

  const panelHeading = css`
    grid-column: span 8;
  `;

  const gridData = css`
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  if (loading) {
    return <div />;
  }

  if (error) {
    return <div>Unable to load sleep data, please try again later.</div>;
  }
  return (
    <div css={sleepPanel} className={className}>
      <Heading css={panelHeading} headingLevel={2}>
        Weekly Tracker
      </Heading>
      {['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
        <span key={day}>{day}</span>
      ))}
      <strong>Sleep</strong>
      {data &&
        data.getCurrentWeekSleep.map((sleep) => (
          <span css={gridData} key={sleep.id}>
            {Math.floor(sleep.minutesAsleep / 60)}:
            {sleep.minutesAsleep % 60 < 10
              ? `0${sleep.minutesAsleep % 60}`
              : sleep.minutesAsleep % 60}
          </span>
        ))}
    </div>
  );
};

SleepPanel.propTypes = {
  className: PropTypes.string,
};

SleepPanel.defaultProps = {
  className: null,
};

export default SleepPanel;
