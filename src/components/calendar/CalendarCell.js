/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';

const CalendarCell = ({ year, month, date, isSelected, isGreyed, onClick }) => {
  const { colours } = useTheme();

  const cell = css`
    box-sizing: border-box;
    height: 80px;
    padding: 5px;
    box-shadow: 0 0 0 1px;
  `;

  const greyed = css`
    background-color: rgba(0, 0, 0, 0.3);
  `;

  const selected = css`
    background-color: ${colours.secondary.light};
  `;

  return (
    <div
      css={isGreyed ? [cell, greyed] : isSelected ? [cell, selected] : cell}
      data-date={`${year}-${month}-${date}`}
      role="button"
      aria-label="select date"
      tabIndex={0}
      onKeyPress={onClick(year, month, date)}
      onClick={onClick(year, month, date)}
    >
      {date}
    </div>
  );
};

CalendarCell.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  date: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  isGreyed: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

CalendarCell.defaultProps = {
  isSelected: false,
  isGreyed: false,
};

export default CalendarCell;
