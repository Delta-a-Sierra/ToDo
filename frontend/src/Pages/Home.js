import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import { TaskContext, TaskReducerTypes } from "../contexts/TaskContext";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import {
  LoadingScreen,
  Nav,
  NewTasks,
  GroupNav,
  TaskDateGroup,
  NewTaskBtn,
  TaskDetails,
  TaskDisplay,
} from "../componets";
import { GettingStarted } from ".";
import axios from "axios";

const Home = () => {
  const [authenticated] = useContext(AuthContext);
  const [Loading, setLoading] = useState(true);
  const [NoTasks, setNoTasks] = useState(true);
  const [NewTask, setNewTask] = useState(false);
  const [TaskDetailsActive, setTaskDetailsActive] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});
  const [TaskState, TaskDispatcher] = useContext(TaskContext);

  useEffect(() => {
    const GetTasks = async () => {
      setTimeout(async () => {
        const response = await fetchTasks();
        if (response.length >= 1) {
          TaskDispatcher({
            type: TaskReducerTypes.ADD_TASKS,
            payload: [...response],
          });
        }
        setLoading(false);
      }, 2500);
    };

    GetTasks();
  }, []);

  useEffect(() => {
    if (TaskState.tasks.length >= 1) {
      setNoTasks(false);
    }
  }, [TaskState.tasks]);

  const toggleNewTask = () => {
    setNewTask((prev) => !prev);
  };

  const CloseDetails = () => {
    setTaskDetailsActive(false);
  };

  const SelectTask = (task) => {
    setSelectedTask({ ...task });
    setTaskDetailsActive((prev) => !prev);
  };

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  if (Loading) {
    return <LoadingScreen />;
  }

  if (NoTasks) {
    return (
      <div className="Home">
        <div className="Home__content">
          <GettingStarted toggleNewTask={toggleNewTask} />
        </div>
        <Nav />
        {NewTask && <NewTasks toggleNewTask={toggleNewTask} />}
      </div>
    );
  }

  return (
    <div className="Home">
      <div className="Home__content">
        <GroupNav title="All Tasks" dueCount={2} />
        <div className="tasks_Cotainer">
          {/* <TaskDateGroup
            title="Due Today"
            SelectTask={SelectTask}
            tasks={TaskState.tasks}
          /> */}
          <TaskDisplay SelectTask={SelectTask} filterType={"all"} />
          {NewTask && <NewTasks toggleNewTask={toggleNewTask} />}
          <NewTaskBtn onClick={toggleNewTask} />
          {TaskDetailsActive && (
            <TaskDetails
              selectedTask={selectedTask}
              CloseDetails={CloseDetails}
            />
          )}
        </div>
      </div>
      <Nav />
    </div>
  );
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

export default Home;
