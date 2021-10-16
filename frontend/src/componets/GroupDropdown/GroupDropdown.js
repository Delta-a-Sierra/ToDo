import { useContext, useEffect, useState } from "react";
import "../../sass/main.css";
import GroupDropDownPresentation from "./GroupDropdownPresentation";
import axios from "axios";
import { GroupContext, types as GroupTypes } from "../../contexts/GroupContext";

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
  const [GroupState, GroupDispatcher] = useContext(GroupContext);

  const ToggleDropdown = () => {
    setDropdownActive((prev) => !DropdownActive);
  };

  const ToggleCreateNew = () => {
    if (DropdownActive) {
      setDropdownActive(false);
    }
    // resetGroup();
    setCreateNew((prev) => !prev);
  };

  const CancelNewGroup = () => {
    ToggleCreateNew();
  };

  const CreateNewGroup = async (e) => {
    e.preventDefault();
    const response = await NewGroupApiCall(Form.Group);
    if (response) {
      const group = await FindGroup(Form.Group);
      GroupDispatcher({ type: GroupTypes.ADD_GROUP, payload: group });
      SetGroup(group.name, group.id);
    }
    if (!response) {
      console.log("unable to create group");
    }
    setCreateNew(false);
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
      CreateNewGroup={CreateNewGroup}
    />
  );
};

export default GroupDropdown;

const NewGroupApiCall = async (group) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/taskgroups`,
      data: { name: group, description: "", icon_id: 1, is_fav: false },
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

const FindGroup = async (groupName) => {
  const groups = await GetGroupsApiCall();
  const group = groups.find((group) => {
    if (group.name === groupName) {
      return group;
    }
  });

  return group;
};

const GetGroupsApiCall = async () => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/taskgroups`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      const groups = await response.data.task_groups;
      return [...groups];
    }
  } catch (e) {
    try {
      console.log(e.response.data.message);
    } catch {
      console.log("server unavailable");
    }
    return [];
  }
};
