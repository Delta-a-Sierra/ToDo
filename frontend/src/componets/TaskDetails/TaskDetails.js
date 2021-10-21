import { useContext, useState, useEffect } from "react";
import TaskDetailsPresentation from "./TaskDetailsPresentation";
import { GroupContext } from "../../contexts/GroupContext";
import { TaskReducerTypes, TaskContext } from "../../contexts/TaskContext";
import axios from "axios";

const TaskDetails = ({ CloseDetails, selectedTask }) => {
  const [GroupState] = useContext(GroupContext);
  const [TaskState, TaskDispatcher] = useContext(TaskContext);

  const [editMode, setEditMode] = useState(false);

  const [Form, setForm] = useState({
    Title: selectedTask.title,
    Description: selectedTask.description,
    "Created At": selectedTask.created_at,
    "Due Date": selectedTask.due_date,
    is_completed: selectedTask.is_completed,
    Group: FindGroup(selectedTask.task_g_id, GroupState.groups).name,
    groupID: selectedTask.task_g_id,
  });
  const [FormErrors, setFormErrors] = useState({
    Title: "",
    Description: "",
    "Due Date": "",
    Group: "",
  });

  let taskDetails = {
    id: selectedTask.id,
    title: Form.Title,
    description: Form.Description,
    due_date: Form["Due Date"],
    created_at: Form["Created At"],
    is_completed: Form.is_completed,
    task_g_id: Form.groupID,
  };

  const ToggleEdit = (e) => {
    e.preventDefault();
    setEditMode((prev) => !prev);
  };

  const onChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const SetGroup = (name, id) => {
    setForm({ ...Form, Group: name, groupID: id });
  };

  const resetGroup = () => {
    setForm({ ...Form, Group: "" });
  };

  const setGroupError = (errorText) => {
    setFormErrors({ ...FormErrors, Group: errorText });
  };

  const ResetGroupErrors = () => {
    setFormErrors({ ...FormErrors, Group: "" });
  };

  const UpdateTask = async (e) => {
    e.preventDefault();
    CloseDetails();
    await TaskDispatcher({
      type: TaskReducerTypes.UPDATE_TASK,
      payload: taskDetails,
    });
  };

  const ToggleComplete = async (e) => {
    e.preventDefault();
    setForm({ ...Form, is_completed: !Form.is_completed });
    TaskDispatcher({
      type: TaskReducerTypes.TOGGLE_COMPLETE,
      payload: taskDetails.id,
    });
  };

  const DeleteTask = async (e) => {
    e.preventDefault();
    CloseDetails();
    await TaskDispatcher({
      type: TaskReducerTypes.DELETE_TASK,
      payload: taskDetails.id,
    });
  };

  return (
    <TaskDetailsPresentation
      Form={Form}
      CloseDetails={CloseDetails}
      onChange={onChange}
      FormErrors={FormErrors}
      items={GroupState.groups}
      SetGroup={SetGroup}
      resetGroup={resetGroup}
      ResetGroupErrors={ResetGroupErrors}
      setGroupError={setGroupError}
      selectedTask={selectedTask}
      editMode={editMode}
      ToggleEdit={ToggleEdit}
      UpdateTask={UpdateTask}
      DeleteTask={DeleteTask}
      ToggleComplete={ToggleComplete}
    />
  );
};

export default TaskDetails;

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

const FindGroup = (id, groups) => {
  return groups.find((group) => group.id == id);
};
