import { useEffect, useState } from "react";
import "../../sass/main.css";
import GroupDropDownPresentation from "./GroupDropdownPresentation";

const GroupDropdown = ({
  FormErrors,
  onChange,
  Form,
  name,
  items,
  SetGroup,
  resetGroup,
}) => {
  const [DropdownActive, setDropdownActive] = useState(false);
  const [CreateNew, setCreateNew] = useState(false);

  const ToggleDropdown = () => {
    setDropdownActive((prev) => !DropdownActive);
  };

  const ToggleCreateNew = () => {
    if (DropdownActive) {
      setDropdownActive(false);
    }
    setCreateNew((prev) => !prev);
  };

  const CancelNewGroup = () => {
    ToggleCreateNew();
    resetGroup();
  };

  return (
    <GroupDropDownPresentation
      name={name}
      Form={Form}
      FormErrors={FormErrors}
      items={items}
      onChange={onChange}
      SetGroup={SetGroup}
      DropdownActive={DropdownActive}
      CreateNew={CreateNew}
      ToggleDropdown={ToggleDropdown}
      ToggleCreateNew={ToggleCreateNew}
      CancelNewGroup={CancelNewGroup}
    />
  );
};

export default GroupDropdown;
