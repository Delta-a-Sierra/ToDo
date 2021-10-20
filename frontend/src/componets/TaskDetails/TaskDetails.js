import { useContext, useState } from "react";
import TaskDetailsPresentation from "./TaskDetailsPresentation";
import { GroupContext } from "../../contexts/GroupContext";
import moment from "moment";

const TaskDetails = ({ CloseDetails, selectedTask }) => {
  const [GroupState] = useContext(GroupContext);
  const [editMode, setEditMode] = useState(false);
  const [Form, setForm] = useState({
    Title: selectedTask.title,
    Description: selectedTask.description,
    "Created At": moment(selectedTask.created_at).format("D/MM/YYYY"),
    "Due Date": moment(selectedTask.due_date).format("D/MM/YYYY"),
  });
  const [FormErrors, setFormErrors] = useState({
    Title: "",
    Description: "",
    "Due Date": "",
    Group: "",
  });

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
    />
  );
};

export default TaskDetails;
