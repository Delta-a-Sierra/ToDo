import { createContext, useEffect, useReducer, useState } from "react";
import moment from "moment";
import axios from "axios";

export const TaskContext = createContext();

export const TaskReducerTypes = {
  ADD_TASKS: "ADD_TASKS",
  DUE_TASKS: "DUE_TASKS",
  UPDATE_TASK: "UPDATE_TASK",
  REFRESH_TASKS: "REFRESH_TASKS",
  DELETE_TASK: "DELETE_TASK",
  REMOVE_TASK: "REMOVE_TASK",
  TOGGLE_COMPLETE: "TOGGLE_COMPLETE",
};

const Reducer = (state, action) => {
  switch (action.type) {
    case TaskReducerTypes.ADD_TASKS:
      return { ...state, tasks: NormalizeDates(action.payload) };
    case TaskReducerTypes.DUE_TASKS:
      return {
        ...state,
        due_count: action.payload.length,
        due_tasks: action.payload,
      };
    case TaskReducerTypes.UPDATE_TASK:
      UpdateTask(action.payload);
      return { ...state, update: true };
    case TaskReducerTypes.REFRESH_TASKS:
      return {
        ...state,
        tasks: NormalizeDates(action.payload),
        update: false,
      };
    case TaskReducerTypes.DELETE_TASK:
      DeleteTask(action.payload);
      return { ...state, tasks: RemoveTask(action.payload, state.tasks) };
    case TaskReducerTypes.TOGGLE_COMPLETE:
      ToggleCompleteAPICall(action.payload, state.tasks);
      return { ...state, tasks: ToggleComplete(action.payload, state.tasks) };
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
    const RefreshTasks = async () => {
      const response = (await fetchTasks()) || [];
      if (response.length >= 1) {
        await TaskDispatcher({
          type: TaskReducerTypes.REFRESH_TASKS,
          payload: [...response],
        });
      }
    };
    if (TaskState.update === true) {
      RefreshTasks();
    }
    return;
  }, [TaskState.update]);

  return (
    <TaskContext.Provider value={[TaskState, TaskDispatcher]}>
      {props.children}
    </TaskContext.Provider>
  );
};

const GetDueCount = (tasks) => {
  const dueTasks = tasks.filter((task) => {
    if (
      (moment().format("DD/MM/YYYY") === task.due_date ||
        moment().isAfter(moment(task.due_date, "DD/MM/YYYY"))) &&
      !task.is_completed
    ) {
      return task;
    }
  });
  return dueTasks;
};

const RemoveTask = (id, tasks) => {
  return tasks.filter((task) => {
    if (task.id !== id) {
      return task;
    }
  });
};

const ToggleComplete = (id, tasks) => {
  return tasks.map((task) => {
    if (task.id === id) {
      let newTask = { ...task, is_completed: !task.is_completed };
      return newTask;
    }
    return task;
  });
};

const ToggleCompleteAPICall = (id, tasks) => {
  let task = tasks.find((task) => task.id === id);
  task = { ...task, is_completed: !task.is_completed };
  console.log(task);
  UpdateTask(task);
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

const DeleteTask = async (id) => {
  const token = window.localStorage.getItem("token");

  try {
    await axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/tasks/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

const NormalizeDates = (tasks) => {
  return tasks.map((task) => {
    return {
      ...task,
      due_date: moment(task.due_date).format("DD/MM/YYYY"),
      created_at: moment(task.created_at).format("DD/MM/YYYY"),
    };
  });
};

export default TaskProvider;
