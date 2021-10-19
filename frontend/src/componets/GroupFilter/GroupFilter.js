import { useState } from "react";

const GroupFilter = ({
  allFiterActive,
  completeFilterActive,
  uncompleteFilterActive,
  FilterTasks,
}) => {
  const [choice, setChoice] = useState("All");
  const [dropDownActive, setDropdownActive] = useState(false);

  const ToggleDropdown = () => {
    setDropdownActive((prev) => !prev);
  };

  const CloseDropdown = () => {
    setDropdownActive(false);
  };

  const SelectOption = (e, type) => {
    setChoice(e.target.innerHTML);
    FilterTasks(type);
    CloseDropdown();
  };

  return (
    <div className="Group-Filter">
      <div className="Group-Filter__header">
        <h4 className="Group-Filter__title" onClick={ToggleDropdown}>
          Sort by: <span className="Group-Filter__choice">{choice}</span>
        </h4>
      </div>
      {dropDownActive && (
        <div className="dropdown" onMouseLeave={CloseDropdown}>
          <ul className="dropdown__content">
            <li
              onClick={(e) => SelectOption(e, "all")}
              className={`dropdown__item ${
                allFiterActive && "dropdown__item--active"
              }`}
            >
              All
            </li>
            <li
              onClick={(e) => SelectOption(e, "complete")}
              className={`dropdown__item ${
                completeFilterActive && "dropdown__item--active"
              }`}
            >
              Completed
            </li>
            <li
              onClick={(e) => SelectOption(e, "uncomplete")}
              className={`dropdown__item ${
                uncompleteFilterActive && "dropdown__item--active"
              }`}
            >
              Uncompleted
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GroupFilter;
