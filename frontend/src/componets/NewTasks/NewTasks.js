import "../../sass/main.css";
import { useContext, useEffect, useState } from "react";
import { LabledInput, LabeledTextArea, LargeButton, GroupDropdown } from "..";
import { GroupContext } from "../../contexts/GroupContext";

const NewTasks = ({ toggleNewTask }) => {
  const [Form, setForm] = useState({});
  const [FormErrors, setFormErrors] = useState({
    Title: "",
    Description: "",
    Group: "",
    "Due Date": "",
  });

  useEffect(() => {
    console.log(Form);
  }, [Form]);

  const onChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };

  const SetGroup = (name) => {
    const group = GroupState.groups.find((group) => group.name === name);
    setForm({ ...Form, Group: group.name, groupID: group.id });
  };

  const resetGroup = () => {
    setForm({ ...Form, Group: "" });
  };

  const [GroupState, GroupDispatcher] = useContext(GroupContext);

  return (
    <div className="New-Task">
      <h1 className="New-Task__title">New Task</h1>
      <form className="New-Task__form">
        <LabledInput
          FormErrors={FormErrors}
          onChange={onClick}
          placeholder="Enter Title"
          name="Title"
          type="text"
          Form={Form}
        />

        <LabeledTextArea
          FormErrors={FormErrors}
          onChange={onClick}
          placeholder="Enter Description"
          name="Description"
          type="text"
          Form={Form}
        />
        <GroupDropdown
          FormErrors={FormErrors}
          onChange={onChange}
          placeholder="Select Group"
          name="Group"
          type="text"
          Form={Form}
          items={GroupState.groups}
          SetGroup={SetGroup}
          resetGroup={resetGroup}
        />
        <LabledInput
          FormErrors={FormErrors}
          onChange={onClick}
          placeholder="dd/mm/yyyy"
          name="Due Date"
          type="text"
          Form={Form}
        />

        <div className="New-Task__buttons">
          <LargeButton text="Confirm" />
          <LargeButton onClick={toggleNewTask} text="Cancel" />
        </div>
      </form>
    </div>
  );
};

const onClick = () => {
  return;
};
export default NewTasks;
