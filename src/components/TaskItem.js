/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import { useDarkMode, useToggle, useClickOutside } from '../hooks';
import { InputTypeEnum } from '../utils/enums';

const TaskItem = ({ task, onChangeTitle, onChangeDeadline, onClickOutside, onDelete }) => {
  const { colours } = useTheme();
  const { isDarkMode } = useDarkMode();
  const [isEditing, toggleEditing] = useToggle(!!task.tempId);
  const inputNode = useRef(null);

  const taskItemNode = useClickOutside(isEditing, () => {
    toggleEditing();
    onClickOutside(task.id || task.tempId);
  });

  useEffect(() => {
    if (isEditing) {
      inputNode.current.focus();
    }
  }, [inputNode, isEditing]);

  const taskItem = css`
    display: grid;
    grid-template-columns: auto 40px;
    background-color: ${colours.background.secondary};
    border: 2px solid ${colours.text};
    border-radius: 5px;
    padding: 10px;
    transition: box-shadow 0.3s;
    &:active {
      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.7);
    }
  `;

  const darkMode = css`
    transition: border-color 0.3s, box-shadow 0.3s;
    border-color: ${colours.primary.light};
    &:hover {
      border-color: ${colours.primary.dark};
    }
    &:active {
      border-color: ${colours.primary.dark};
    }
  `;

  const input = css`
    border-radius: 5px;
    width: 200px;
  `;

  const deadline = css`
    grid-column: 1;
    margin-top: 10px;
    font-size: 0.9rem;
  `;

  const icons = css`
    grid-column: 2;
    grid-row: 1;
    display: flex;
    justify-content: space-between;
  `;

  const icon = css`
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: ${colours.primary.main};
    }
  `;

  const handleChangeTitle = ({ target: { value } }) => {
    onChangeTitle(task.id || task.tempId, value);
  };

  const handleChangeDeadline = (date) => {
    onChangeDeadline(task.id || task.tempId, date);
  };
  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div css={isDarkMode ? [taskItem, darkMode] : taskItem} ref={taskItemNode}>
      {isEditing ? (
        <input
          css={input}
          ref={inputNode}
          type={InputTypeEnum.TEXT}
          value={task.title}
          placeholder="Type to add task"
          onChange={handleChangeTitle}
        />
      ) : (
        <span>{task.title}</span>
      )}
      {task.deadline && !isEditing && <span css={deadline}>{new Date(task.deadline).toLocaleDateString()}</span>}
      {isEditing && (
        <div css={deadline}>
          <DatePicker selected={task.deadline && new Date(task.deadline)} onChange={handleChangeDeadline} />
        </div>
      )}
      {!isEditing && (
        <div css={icons}>
          <span
            css={icon}
            className="fas fa-edit"
            role="button"
            aria-label="edit field"
            tabIndex="0"
            onKeyPress={toggleEditing}
            onClick={toggleEditing}
          />{' '}
          <span
            css={icon}
            className="fas fa-trash-alt"
            role="button"
            aria-label="delete field"
            tabIndex="0"
            onKeyPress={handleDelete}
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    tempId: PropTypes.string,
    list: PropTypes.string.isRequired,
    title: PropTypes.string,
    deadline: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
    isPublic: PropTypes.bool.isRequired,
    order: PropTypes.number.isRequired,
  }).isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onChangeDeadline: PropTypes.func.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskItem;
