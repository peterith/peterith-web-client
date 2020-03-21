/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import TaskItem from './TaskItem';
import Heading from './Heading';

const TaskList = ({ heading, tasks, onAddTask, onChangeTask, onBlurTask, onDeleteTask }) => {
  const { colours } = useTheme();

  const taskList = css`
    padding: 10px;
    border: 1px solid ${colours.primary.light};
    border-radius: 10px;
    transition: border 0.3s;
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

  return (
    <Droppable droppableId={uuidv4()}>
      {(provided) => (
        <div {...provided.droppableProps} css={taskList} ref={provided.innerRef}>
          {onAddTask && (
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
            <TaskItem
              key={task.id || task.tempId}
              task={task}
              onChange={onChangeTask}
              onBlur={onBlurTask}
              onDelete={onDeleteTask}
            />
          ))}
          {provided.placeholder}
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
      title: PropTypes.string,
      list: PropTypes.string.isRequired,
      isPublic: PropTypes.bool.isRequired,
      order: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onAddTask: PropTypes.func.isRequired,
  onChangeTask: PropTypes.func.isRequired,
  onBlurTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
};

export default TaskList;
