import { createContext, useEffect, useReducer } from "react";
import moment from "moment";

export const TaskContext = createContext();

export const TaskReducerTypes = {
  ADD_TASKS: "ADD_TASKS",
  NOMRALIZE_DATES: "NOMRALIZE_DATES",
  DUE_TASKS: "DUE_TASKS",
};

const Reducer = (state, action) => {
  switch (action.type) {
    case TaskReducerTypes.ADD_TASKS:
      return { ...state, tasks: [...action.payload] };
    case TaskReducerTypes.DUE_TASKS:
      return { ...state, due_count: action.payload };
    default:
      break;
  }
};

export const TaskProvider = (props) => {
  const [TaskState, TaskDispatcher] = useReducer(Reducer, { tasks: [] });

  useEffect(() => {
    const dueCount = GetDueCount(TaskState.tasks);
    TaskDispatcher({ type: TaskReducerTypes.DUE_TASKS, payload: dueCount });
  }, [TaskState.tasks]);

  return (
    <TaskContext.Provider value={[TaskState, TaskDispatcher]}>
      {props.children}
    </TaskContext.Provider>
  );
};

const GetDueCount = (tasks) => {
  const dueTasks = tasks.filter((task) => {
    if (moment().format("L") === moment(task.due_date).format("L")) {
      return task;
    }
  });
  return dueTasks.length;
};

export default TaskProvider;
