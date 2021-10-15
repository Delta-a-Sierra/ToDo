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
}) => {
  const [DropdownActive, setDropdownActive] = useState(false);
  const [CreateNew, setCreateNew] = useState(false);

  const ToggleDropdown = () => {
    setDropdownActive((prev) => !DropdownActive);
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
    />
  );
};

export default GroupDropdown;
