import { createContext, useEffect, useReducer } from "react";
import moment from "moment";
import axios from "axios";

export const TaskContext = createContext();

export const TaskReducerTypes = {
  ADD_TASKS: "ADD_TASKS",
  DUE_TASKS: "DUE_TASKS",
  UPDATE_TASK: "UPDATE_TASK",
  REFRESH_TASKS: "REFRESH_TASKS",
  DELETE_TASK: "DELETE_TASK",
};

const Reducer = (state, action) => {
  switch (action.type) {
    case TaskReducerTypes.ADD_TASKS:
      return { ...state, tasks: [...action.payload] };
    case TaskReducerTypes.DUE_TASKS:
      return { ...state, due_count: action.payload };
    case TaskReducerTypes.UPDATE_TASK:
      UpdateTask(action.payload);
      return { ...state, update: true };
    case TaskReducerTypes.REFRESH_TASKS:
      return { ...state, tasks: [...action.payload], update: false };
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

  useEffect(() => {
    const GetTasks = async () => {
      const response = await fetchTasks();
      if (response.length >= 1) {
        TaskDispatcher({
          type: TaskReducerTypes.ADD_TASKS,
          payload: [...response],
        });
      }
    };
    if (TaskState.update) {
      console.log("updating tasks");
      GetTasks();
    }
  }, [TaskState.update]);

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

const fetchTasks = async () => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/tasks`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 204) {
      return [];
    }
    return response.data.tasks;
  } catch (err) {
    return err;
  }
};

const fetchTaskGroup = async (id) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/taskgroups/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 204) {
      return [];
    }
    return response.data.tasks;
  } catch (err) {
    return err;
  }
};

const UpdateTask = async (task) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/tasks/${task.id}`,
      data: { ...task },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      console.log(response);
    }
  } catch (e) {
    try {
      console.log(e.response.data.message);
    } catch {}
  }
};

export default TaskProvider;
