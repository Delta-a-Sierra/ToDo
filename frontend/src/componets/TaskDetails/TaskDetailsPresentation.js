import { LabledInput, LabeledTextArea, GroupDropdown, LargeButton } from "..";
import { useState, useEffect } from "react";

const TaskDetailsPresentation = ({
  Form,
  CloseDetails,
  onChange,
  FormErrors,
  items,
  SetGroup,
  resetGroup,
  ResetGroupErrors,
  setGroupError,
  selectedTask,
  editMode,
  ToggleEdit,
  UpdateTask,
}) => {
  let commonProps = {
    onChange: onChange,
    type: "text",
    Form: Form,
    FormErrors: FormErrors,
  };

  useEffect(() => {
    if (editMode) {
      commonProps = { ...commonProps, readOnly: true, theme: "white" };
    }
  }, [editMode]);

  const { Title, Description, Group } = Form;
  const due_date = Form["Due Date"];
  const created_at = Form["Created At"];

  if (editMode) {
    return (
      <div className="Task-details">
        <h1 className="Task-details__title">Task Details</h1>
        <form className="Task-details__form">
          <LabledInput
            {...commonProps}
            name="Title"
            placeholder="enter new title"
          />
          <LabeledTextArea
            {...commonProps}
            name="Description"
            placeholder="enter new description"
          />

          <GroupDropdown
            {...commonProps}
            placeholder="Select Group"
            name="Group"
            items={items}
            SetGroup={SetGroup}
            resetGroup={resetGroup}
            ResetGroupErrors={ResetGroupErrors}
            setGroupError={setGroupError}
          />

          <LabledInput
            {...commonProps}
            name="Due Date"
            placeholder="DD / MM / YYYY"
          />
          <div className="New-Task__buttons">
            <LargeButton onClick={UpdateTask} text="Confirm" />
            <LargeButton onClick={ToggleEdit} text="Cancel" />
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Task-details">
      <h1 className="Task-details__title">Task Details</h1>
      <form className="Task-details__form">
        <LabledInput
          {...commonProps}
          name="Title"
          placeholder="enter new title"
          readOnly
        />
        <LabeledTextArea
          {...commonProps}
          name="Description"
          placeholder="enter new description"
          readOnly
        />
        <LabledInput
          {...commonProps}
          name="Group"
          placeholder="enter group name"
          readOnly
        />

        <LabledInput
          {...commonProps}
          name="Due Date"
          placeholder="DD / MM / YYYY"
          readOnly
        />
        <div className="New-Task__buttons">
          <LargeButton onClick={ToggleEdit} text="edit" />
          <LargeButton onClick={CloseDetails} text="Cancel" />
        </div>
      </form>
    </div>
  );
};

export default TaskDetailsPresentation;
