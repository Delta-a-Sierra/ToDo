import { useState } from "react";

const GroupFilter = () => {
  const [choice, setChoice] = useState("All");
  const [dropDownActive, setDropdownActive] = useState(false);

  const ToggleDropdown = () => {
    setDropdownActive((prev) => !prev);
  };

  const CloseDropdown = () => {
    setDropdownActive(false);
  };

  const SelectOption = () => {
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
              onClick={SelectOption}
              className="dropdown__item dropdown__item--active"
            >
              All
            </li>
            <li onClick={SelectOption} className="dropdown__item">
              Completed
            </li>
            <li onClick={SelectOption} className="dropdown__item">
              Uncompleted
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default GroupFilter;
