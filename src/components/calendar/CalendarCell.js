/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';

const CalendarCell = ({ year, month, date, isSelected, isGreyed, isToday, onClick }) => {
  const { colours } = useTheme();

  const cell = css`
    box-sizing: border-box;
    height: 80px;
    padding: 5px;
    background-color: ${colours.white};
    color: ${colours.black};
    box-shadow: 0px 0px 0px 1px ${colours.secondary.main};
    text-align: left;
  `;

  const greyed = css`
    background-color: rgba(0, 0, 0, 0.3);
  `;

  const selected = css`
    background-color: ${colours.secondary.light};
  `;

  const circle = css`
    border: 1px solid ${colours.primary.main};
    border-radius: 100%;
    padding: 3px;
  `;

  return (
    <div
      css={isGreyed ? [cell, greyed] : isSelected ? [cell, selected] : cell}
      role="gridcell"
      aria-label="select date"
      tabIndex={0}
      onKeyPress={onClick(year, month, date)}
      onClick={onClick(year, month, date)}
    >
      <span css={isToday && circle}>{date}</span>
    </div>
  );
};

CalendarCell.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  isGreyed: PropTypes.bool,
  isToday: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

CalendarCell.defaultProps = {
  isSelected: false,
  isGreyed: false,
};

export default CalendarCell;
