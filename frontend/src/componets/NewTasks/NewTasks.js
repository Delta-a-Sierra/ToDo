import "../../sass/main.css";
import { useContext, useState } from "react";
import { LabledInput, LabeledTextArea, LargeButton, GroupDropdown } from "..";
import { GroupContext } from "../../contexts/GroupContext";
import { TaskReducerTypes, TaskContext } from "../../contexts/TaskContext";
import axios from "axios";

const NewTasks = ({ toggleNewTask }) => {
  const [TaskState, TaskDispatcher] = useContext(TaskContext);
  const [Validated, setValidated] = useState(false);
  const [Form, setForm] = useState({});
  const [FormErrors, setFormErrors] = useState({
    Title: "",
    Description: "",
    Group: "",
    "Due Date": "",
  });

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

  const TestIfValid = () => {
    let isValid = true;
    for (const input in FormErrors) {
      if (isValid) {
        if (FormErrors[input] !== "") {
          isValid = false;
        }
      }
    }
    setValidated(isValid);
  };

  const ValidateForm = () => {
    const titleError = ValidateTitle(Form.Title);
    const dueDateError = ValidateDate(Form["Due Date"]);
    const groupError = ValidateGroup(Form.Group);
    setFormErrors({
      ...FormErrors,
      Title: titleError,
      "Due Date": dueDateError,
      Group: groupError,
    });
    TestIfValid();
  };

  const ResetGroupErrors = () => {
    setFormErrors({ ...FormErrors, Group: "" });
  };

  const CreateTask = async (e) => {
    e.preventDefault();
    ValidateForm();
    if (Validated) {
      await NewTaskApiCall(Form);

      toggleNewTask();
      TaskDispatcher({
        type: TaskReducerTypes.UPDATE_TASK,
      });
    }
  };

  const [GroupState] = useContext(GroupContext);

  const commonProps = {
    FormErrors: FormErrors,
    onChange: onChange,
    type: "text",
    Form: Form,
  };

  return (
    <div className="New-Task">
      <h1 className="New-Task__title">New Task</h1>
      <form className="New-Task__form">
        <LabledInput {...commonProps} placeholder="Enter Title" name="Title" />

        <LabeledTextArea
          {...commonProps}
          placeholder="Enter Description"
          name="Description"
        />
        <GroupDropdown
          {...commonProps}
          placeholder="Select Group"
          name="Group"
          items={GroupState.groups}
          SetGroup={SetGroup}
          resetGroup={resetGroup}
          ResetGroupErrors={ResetGroupErrors}
          setGroupError={setGroupError}
        />
        <LabledInput
          {...commonProps}
          placeholder="dd/mm/yyyy"
          name="Due Date"
        />

        <div className="New-Task__buttons">
          <LargeButton onClick={CreateTask} text="Confirm" />
          <LargeButton onClick={toggleNewTask} text="Cancel" />
        </div>
      </form>
    </div>
  );
};

export default NewTasks;

const NewTaskApiCall = async (form) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/tasks`,
      data: {
        title: form.Title,
        description: form.Description,
        due_date: form["Due Date"],
        task_g_id: form.groupID,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 201) {
      return true;
    }
  } catch (e) {
    try {
      console.log(e.response.data.message);
    } catch {
      console.log("server unavailable");
    }
    return false;
  }
};

// --------------- Validation --------------

const ValidateTitle = (title) => {
  if (!title) {
    return "Required";
  }
  return "";
};

const ValidateDate = (date) => {
  if (!date) {
    return "";
  }
  const dateRegex =
    "^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]([0][1-9]|[1][0-2])[/]([0-9]{4}|[0-9]{2})$";
  if (!date.match(dateRegex)) {
    return "Invalid Date";
  }
  return "";
};

const ValidateGroup = (group) => {
  if (!group) {
    return "No group selected";
  }
  return "";
};
