import { useState, useEffect, useContext } from "react";
import { FilterProvider } from "../../contexts/TaskFilterContext";
import { TaskContext, TaskReducerTypes } from "../../contexts/TaskContext";
import axios from "axios";
import {
  LoadingScreen,
  Nav,
  NewTasks,
  GroupNav,
  NewTaskBtn,
  TaskDetails,
  TaskDisplay,
} from "../";

const GroupContainer = ({ title, fave }) => {
  const SelectTask = (task) => {
    setSelectedTask({ ...task });
    setTaskDetailsActive((prev) => !prev);
  };
  const [selectedTask, setSelectedTask] = useState({});
  const [NewTask, setNewTask] = useState(false);
  const [TaskDetailsActive, setTaskDetailsActive] = useState(false);

  const CloseDetails = () => {
    setTaskDetailsActive(false);
  };

  const toggleNewTask = () => {
    setNewTask((prev) => !prev);
  };

  return (
    <FilterProvider>
      <div className="Home">
        <div className="Home__content">
          {fave ? <GroupNav fave title={title} /> : <GroupNav title={title} />}
          <div className="tasks_Cotainer">
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
    </FilterProvider>
  );
};

export default GroupContainer;

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
