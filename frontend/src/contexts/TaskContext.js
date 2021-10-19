import { createContext, useEffect, useReducer } from "react";
import moment from "moment";

export const TaskContext = createContext();

export const TaskReducerTypes = {
  ADD_TASKS: "ADD_TASKS",
  NOMRALIZE_DATES: "NOMRALIZE_DATES",
};

const Reducer = (state, action) => {
  switch (action.type) {
    case TaskReducerTypes.ADD_TASKS:
      return { ...state, tasks: [...action.payload] };
    default:
      break;
  }
};

export const TaskProvider = (props) => {
  const [TaskState, TaskDispatcher] = useReducer(Reducer, { tasks: [] });

  return (
    <TaskContext.Provider value={[TaskState, TaskDispatcher]}>
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
