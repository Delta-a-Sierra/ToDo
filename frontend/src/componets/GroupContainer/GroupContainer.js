import { useState } from "react";
import { FilterProvider } from "../../contexts/TaskFilterContext";
import {
  Nav,
  NewTasks,
  GroupNav,
  NewTaskBtn,
  TaskDetails,
  TaskDisplay,
} from "../";

const GroupContainer = ({ title, fave }) => {
  const [selectedTask, setSelectedTask] = useState({});
  const [NewTask, setNewTask] = useState(false);
  const [TaskDetailsActive, setTaskDetailsActive] = useState(false);

  const SelectTask = async (task) => {
    if (task.title === selectedTask.title) {
      console.log("same task");
      CloseDetails();
      setSelectedTask({});
      return;
    }
    if (TaskDetailsActive) {
      console.log("changing");
      await CloseDetails();
      setSelectedTask({ ...task });
      setTaskDetailsActive(true);
      return;
    }
    setSelectedTask({ ...task });
    setTaskDetailsActive((prev) => !prev);
  };

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
