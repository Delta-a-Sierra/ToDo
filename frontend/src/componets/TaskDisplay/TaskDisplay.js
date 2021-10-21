import { useState, useEffect, useContext } from "react";
import { TaskDateGroup } from "..";
import { TaskContext } from "../../contexts/TaskContext";
import moment from "moment";

const TaskDisplay = ({ filterType, SelectTask }) => {
  const [TaskState] = useContext(TaskContext);

  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [dueTasks, setDueTasks] = useState([]);

  useEffect(() => {
    setDisplayedTasks(RemoveDueTask(FilterTasks(filterType, TaskState.tasks)));
    setDueTasks(GetDueTasks(FilterTasks(filterType, TaskState.tasks)));
  }, [filterType, TaskState.tasks]);

  return (
    <div className="TaskDisplay">
      <TaskDateGroup
        SelectTask={SelectTask}
        key="duetaskgroup"
        title="Due Tasks"
        tasks={dueTasks}
      />
      <TaskDateGroup
        SelectTask={SelectTask}
        key="remainingtaskgroup"
        title="Remaing Tasks"
        tasks={displayedTasks}
      />
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
