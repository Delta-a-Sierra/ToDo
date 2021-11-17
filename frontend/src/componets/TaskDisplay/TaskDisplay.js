import { useState, useEffect, useContext } from "react";
import { TaskDateGroup } from "..";
import { TaskContext } from "../../contexts/TaskContext";
import moment from "moment";
import { FilterContext } from "../../contexts/TaskFilterContext";

const TaskDisplay = ({ filterType, SelectTask }) => {
  const [TaskState] = useContext(TaskContext);
  const [FilterState] = useContext(FilterContext);

  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [dueTasks, setDueTasks] = useState([]);

  useEffect(() => {
    try {
      setDisplayedTasks(
        RemoveDueTask(FilterTasks(FilterState.filter, TaskState.tasks))
      );
    } catch {
      setDisplayedTasks([]);
    }

    try {
      setDueTasks(
        GetDueTasks(FilterTasks(FilterState.filter, TaskState.tasks))
      );
    } catch {
      setDueTasks([]);
    }
  }, [FilterState.filter, TaskState.tasks]);

  return (
    <div className="TaskDisplay">
      {dueTasks.length >= 1 && (
        <TaskDateGroup
          SelectTask={SelectTask}
          key="duetaskgroup"
          title="Due Tasks"
          tasks={dueTasks}
        />
      )}
      {displayedTasks.length >= 1 && (
        <TaskDateGroup
          SelectTask={SelectTask}
          key="remainingtaskgroup"
          title="Remaing Tasks"
          tasks={displayedTasks}
        />
      )}
      {displayedTasks.length < 1 && dueTasks.length < 1 && (
        <p className="TaskGroup__title">No Tasks to Display</p>
      )}
    </div>
  );
};

export default TaskDisplay;

const GetDueTasks = (tasks) => {
  return tasks.filter((task) => {
    if (
      moment().format("DD/MM/YYYY") === task.due_date ||
      moment().isAfter(moment(task.due_date, "DD/MM/YYYY"))
    ) {
      return task;
    }
  });
};

const RemoveDueTask = (tasks) => {
  return tasks.filter((task) => {
    if (moment().isBefore(moment(task.due_date, "DD/MM/YYYY"))) {
      console.log(`returning task ${task.title}`);
      return tasks;
    }
  });
};

const FilterTasks = (type, tasks) => {
  let newTasks;
  switch (type) {
    case "all":
      newTasks = [...tasks];
      break;
    case "complete":
      let completeTasks = tasks.filter((task) => {
        if (task.is_completed) {
          return task;
        }
      });
      newTasks = [...completeTasks];
      break;
    case "unComplete":
      let unCompleteTasks = tasks.filter((task) => {
        if (!task.is_completed) {
          return task;
        }
      });
      newTasks = [...unCompleteTasks];
      break;

    default:
      break;
  }
  return newTasks;
};
