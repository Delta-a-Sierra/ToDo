import { useContext, useState } from "react";
import TaskDetailsPresentation from "./TaskDetailsPresentation";
import { GroupContext } from "../../contexts/GroupContext";
import { TaskReducerTypes, TaskContext } from "../../contexts/TaskContext";
import moment from "moment";
import axios from "axios";

const TaskDetails = ({ CloseDetails, selectedTask }) => {
  const [GroupState] = useContext(GroupContext);
  const [TaskState, TaskDispatcher] = useContext(TaskContext);

  const [editMode, setEditMode] = useState(false);

  const [Form, setForm] = useState({
    Title: selectedTask.title,
    Description: selectedTask.description,
    "Created At": moment(selectedTask.created_at).format("D/MM/YYYY"),
    "Due Date": moment(selectedTask.due_date).format("D/MM/YYYY"),
    is_completed: selectedTask.is_completed,
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
