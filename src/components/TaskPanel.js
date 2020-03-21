/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useTheme } from 'emotion-theming';
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { GET_TASKS } from '../graphql/queries';
import { ADD_TASK, UPDATE_TASK, REORDER_TASK, DELETE_TASK } from '../graphql/mutations';
import { TaskListEnum } from '../utils/enums';
import TaskList from './TaskList';
import { useToast } from '../hooks';

const TaskPanel = ({ className }) => {
  const { colours } = useTheme();
  const { addSuccessToast, addErrorToast } = useToast();
  const [lastSavedToDoTasks, setLastSavedToDoTasks] = useState([]);
  const [todoTasks, setToDoTasks] = useState([]);

  const { error } = useQuery(GET_TASKS, {
    onCompleted: ({ getTasks }) => {
      setToDoTasks(getTasks.map(({ __typename, ...task }) => task));
      setLastSavedToDoTasks(getTasks.map(({ __typename, ...task }) => task));
    },
  });

  const [addTaskMutation] = useMutation(ADD_TASK, {
    onCompleted: ({ addTask: { __typename, ...addTask } }) => {
      setToDoTasks((previousTasks) => {
        return previousTasks.map((task) => (task.tempId ? addTask : task));
      });
      setLastSavedToDoTasks((previousTasks) => {
        return previousTasks.concat(addTask);
      });
      addSuccessToast('Task has been added.');
    },
    onError: ({ graphQLErrors }) => {
      setToDoTasks(lastSavedToDoTasks);
      addErrorToast(graphQLErrors[0].message);
    },
  });

  const [updateTaskMutation] = useMutation(UPDATE_TASK, {
    onCompleted: ({ updateTask: { __typename, ...updateTask } }) => {
      setToDoTasks((previousTasks) => {
        return previousTasks.map((task) => (task.tempId ? updateTask : task));
      });
      setLastSavedToDoTasks((previousTasks) => {
        return previousTasks.map((task) => (task.tempId ? updateTask : task));
      });
      addSuccessToast('Task has been updated.');
    },
    onError: ({ graphQLErrors }) => {
      setToDoTasks(lastSavedToDoTasks);
      addErrorToast(graphQLErrors[0].message);
    },
  });

  const [reorderTaskMutation] = useMutation(REORDER_TASK, {
    onCompleted: ({ reorderTask }) => {
      setToDoTasks(reorderTask.map(({ __typename, ...task }) => task));
      setLastSavedToDoTasks(reorderTask.map(({ __typename, ...task }) => task));
      addSuccessToast('Task has been reordered.');
    },
    onError: ({ graphQLErrors }) => {
      setToDoTasks(lastSavedToDoTasks);
      addErrorToast(graphQLErrors[0].message);
    },
  });

  const [deleteTaskMutation] = useMutation(DELETE_TASK, {
    onCompleted: ({ deleteTask }) => {
      setToDoTasks(deleteTask.map(({ __typename, ...task }) => task));
      setLastSavedToDoTasks(deleteTask.map(({ __typename, ...task }) => task));
      addSuccessToast('Task has been deleted.');
    },
    onError: ({ graphQLErrors }) => {
      setToDoTasks(lastSavedToDoTasks);
      addErrorToast(graphQLErrors[0].message);
    },
  });

  const grid = css`
    background-color: ${colours.background.secondary};
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    padding: 30px;
  `;

  const handleDragEnd = (result) => {
    if (!result.destination || result.source.index === result.destination.index) {
      return;
    }

    const highIndex = result.source.index > result.destination.index ? result.source.index : result.destination.index;
    const lowIndex = highIndex === result.source.index ? result.destination.index : result.source.index;
    const tasks = todoTasks
      .map((task) => {
        if (task.order < lowIndex || task.order > highIndex) {
          return task;
        }
        if (task.order === result.source.index) {
          return {
            ...task,
            order: result.destination.index,
          };
        }
        if (result.source.index < result.destination.index) {
          return {
            ...task,
            order: task.order - 1,
          };
        }
        return {
          ...task,
          order: task.order + 1,
        };
      })
      .sort((a, b) => a.order - b.order);
    setToDoTasks(tasks);
    const reorderedTask = todoTasks.find((task) => task.order === result.source.index);
    reorderTaskMutation({ variables: { id: reorderedTask.id, newOrder: result.destination.index } });
  };

  const handleAddTask = () => {
    setToDoTasks((previousTasks) => {
      return previousTasks.concat({
        tempId: uuidv4(),
        list: TaskListEnum.TO_DO,
        isPublic: true,
        order: previousTasks.length,
      });
    });
  };

  const handleChangeTask = (id, value) => {
    setToDoTasks((previousTasks) => {
      return previousTasks.map((task) => {
        return task.id !== id && task.tempId !== id
          ? task
          : {
              ...task,
              title: value,
            };
      });
    });
  };

  const handleBlurTask = (id) => {
    const blurredTask = todoTasks.find((task) => task.id === id || task.tempId === id);
    if (blurredTask.title) {
      const { id: _, tempId, ...task } = blurredTask;
      if (blurredTask.tempId) {
        addTaskMutation({
          variables: {
            task,
          },
        });
      } else {
        const lastSavedBlurredTask = lastSavedToDoTasks.find((task) => task.id === id);
        if (lastSavedBlurredTask.title !== blurredTask.title) {
          updateTaskMutation({
            variables: {
              id,
              task,
            },
          });
        }
      }
    } else {
      setToDoTasks(lastSavedToDoTasks);
    }
  };

  const handleDeleteTask = (id) => {
    setToDoTasks((previousTasks) => {
      return previousTasks.reduce((acc, cur, index) => {
        if (cur.id === id) {
          return acc;
        }
        return cur.order === index
          ? acc.concat(cur)
          : acc.concat({
              ...cur,
              order: cur.order - 1,
            });
      }, []);
    });
    deleteTaskMutation({ variables: { id } });
  };
  if (error) {
    return <div>Unable to get tasks, please try again later.</div>;
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div css={grid} className={className}>
        <TaskList
          heading="To Do"
          tasks={todoTasks}
          onAddTask={handleAddTask}
          onChangeTask={handleChangeTask}
          onBlurTask={handleBlurTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </DragDropContext>
  );
};

TaskPanel.propTypes = {
  className: PropTypes.string,
};

TaskPanel.defaultProps = {
  className: null,
};

export default TaskPanel;
