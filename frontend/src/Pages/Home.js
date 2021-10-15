import { AuthContext, AuthProvider } from "../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { LoadingScreen, Nav, NewTasks } from "../componets";
import { GettingStarted } from ".";
import axios from "axios";

const Home = () => {
  const [authenticated] = useContext(AuthContext);
  const [Loading, setLoading] = useState(true);
  const [NoTasks, setNoTasks] = useState(true);
  const [Tasks, settasks] = useState([]);
  const [NewTask, setNewTask] = useState(false);

  useEffect(() => {
    const GetTasks = async () => {
      setTimeout(async () => {
        const response = await fetchTasks();
        settasks(response);
        setLoading(false);
      }, 2500);
    };
    GetTasks();
  }, []);

  useEffect(() => {
    if (Tasks.length >= 1) {
      setNoTasks(false);
    }
  }, [Tasks]);

  const toggleNewTask = () => {
    setNewTask((prev) => !prev);
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
      <div className="Home__content"></div>
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
