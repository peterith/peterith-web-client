/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import CalendarEventIcon from './CalendarEventIcon';

const CalendarCell = ({ date, events, isSelected, isGreyed, isToday, onSelect, onClickEvent }) => {
  const { colours } = useTheme();

  const cell = css`
    box-sizing: border-box;
    width: 70px;
    height: 70px;
    padding: 5px;
    background-color: ${colours.white};
    color: ${colours.black};
    border-bottom: 1px solid;
    border-left: 1px solid;
    text-align: left;
    &:nth-of-type(7n - 1) {
      border-left: none;
    }
    &:nth-last-of-type(-n + 7) {
      border-bottom: none;
    }
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

  const style = [cell];
  if (isSelected) {
    style.push(selected);
  } else if (isGreyed) {
    style.push(greyed);
  }

  return (
    <div
      css={style}
      role="gridcell"
      aria-label="select date"
      tabIndex={0}
      onKeyPress={onSelect(date)}
      onClick={onSelect(date)}
    >
      <div>
        <span css={isToday && circle}>{date.date}</span>
      </div>
      {events.map(({ id }) => (
        <CalendarEventIcon key={id} onClick={onClickEvent(id)} />
      ))}
    </div>
  );
};

CalendarCell.propTypes = {
  date: PropTypes.shape({
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
  }).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      isAllDay: PropTypes.bool.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string,
    }),
  ),
  isSelected: PropTypes.bool,
  isGreyed: PropTypes.bool,
  isToday: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClickEvent: PropTypes.func.isRequired,
};

CalendarCell.defaultProps = {
  events: [],
  isSelected: false,
  isGreyed: false,
};

export default CalendarCell;
