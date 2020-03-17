/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

const CalendarEventIcon = () => {
  const { colours } = useTheme();
  const style = css`
    color: ${colours.primary.main};
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: ${colours.primary.dark};
    }
  `;

  return <span css={style} className="fas fa-dumbbell" />;
};

export default CalendarEventIcon;
