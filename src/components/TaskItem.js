/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Draggable } from 'react-beautiful-dnd';
import { useTheme } from 'emotion-theming';
import PropTypes from 'prop-types';
import EditableInput from './EditableInput';
import { InputTypeEnum } from '../utils/enums';

const TaskItem = ({ task, onChange, onBlur, onDelete }) => {
  const { colours } = useTheme();

  const style = css`
    background-color: ${colours.background.secondary};
    border: 1px solid ${colours.primary.light};
    border-radius: 5px;
    margin-top: 10px;
    padding: 10px;
    transition: border-color 0.3s;
    &:hover {
      border-color: ${colours.primary.dark};
    }
  `;

  const handleChange = (value) => {
    onChange(task.id || task.tempId, value);
  };

  const handleBlur = () => {
    onBlur(task.id || task.tempId);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <Draggable draggableId={task.id || task.tempId} index={task.order}>
      {(provided) => (
        <div css={style} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <EditableInput
            type={InputTypeEnum.TEXT}
            value={task.title}
            placeholder="Type to add task"
            isInitiallyEditing={!!task.tempId}
            onChange={handleChange}
            onBlur={handleBlur}
            onDelete={handleDelete}
          />
        </div>
      )}
    </Draggable>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string,
    tempId: PropTypes.string,
    title: PropTypes.string,
    list: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    order: PropTypes.number.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TaskItem;
