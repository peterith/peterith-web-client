/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import { useDarkMode, useProfile, useAuth } from '../hooks';
import TaskItem from './TaskItem';
import Heading from './Heading';

const TaskList = ({
  heading,
  tasks,
  onAddTask,
  onChangeTaskTitle,
  onChangeTaskDeadline,
  onClickOutsideTask,
  onDeleteTask,
}) => {
  const { colours } = useTheme();
  const { isDarkMode } = useDarkMode();
  const { user: authUser } = useAuth();
  const { user: profileUser } = useProfile();

  const taskList = css`
    padding: 10px;
    border: 2px solid ${colours.text};
    border-radius: 10px;
    overflow: auto;
    height: 500px;
  `;

  const darkMode = css`
    transition: border-color 0.3s;
    border-color: ${colours.primary.light};
    &:hover {
      border-color: ${colours.primary.dark};
    }
  `;

  const headingStyle = css`
    text-align: center;
  `;

  const icon = css`
    float: right;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: ${colours.primary.main};
    }
  `;

  const draggable = css`
    margin-top: 10px;
  `;

  return (
    <Droppable droppableId={uuidv4()}>
      {({ innerRef: ref, droppableProps, placeholder }) => (
        <div ref={ref} {...droppableProps} css={isDarkMode ? [taskList, darkMode] : taskList}>
          {authUser.id && authUser.id === profileUser.id && (
            <span
              css={icon}
              className="fas fa-plus"
              role="button"
              aria-label="add task"
              tabIndex="0"
              onKeyPress={onAddTask}
              onClick={onAddTask}
            />
          )}
          <Heading css={headingStyle} headingLevel={2}>
            {heading}
          </Heading>
          {tasks.map((task) => (
            <Draggable
              key={task.id || task.tempId}
              draggableId={task.id || task.tempId}
              index={task.order}
              isDragDisabled={!authUser.id || authUser.id !== profileUser.id}
            >
              {({ innerRef, draggableProps, dragHandleProps }) => (
                <div ref={innerRef} {...draggableProps} {...dragHandleProps} css={draggable}>
                  <TaskItem
                    task={task}
                    isEditable={authUser.id && authUser.id === profileUser.id}
                    onChangeTitle={onChangeTaskTitle}
                    onChangeDeadline={onChangeTaskDeadline}
                    onClickOutside={onClickOutsideTask}
                    onDelete={onDeleteTask}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {placeholder}
        </div>
      )}
    </Droppable>
  );
};

TaskList.propTypes = {
  heading: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      tempId: PropTypes.string,
      list: PropTypes.string.isRequired,
      title: PropTypes.string,
      deadline: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
      isPublic: PropTypes.bool.isRequired,
      order: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddTask: PropTypes.func.isRequired,
  onChangeTaskTitle: PropTypes.func.isRequired,
  onChangeTaskDeadline: PropTypes.func.isRequired,
  onClickOutsideTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default TaskList;
