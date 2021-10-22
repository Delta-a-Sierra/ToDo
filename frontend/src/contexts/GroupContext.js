import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

// ------------------- Reducer ---------------------

export const types = {
  ADD_GROUP: "ADD_GROUP",
  CHANGE_GROUP: "CHANGE_GROUP",
  DELETE_GROUP: "DELETE_GROUP",
  UPDATE_GROUP: "UPDATE_GROUP",
  SET_CURRENT: "SET_CURRENT",
  TOGGLE_FAVE: "TOGGLE_FAVE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.ADD_GROUP:
      const newGroup = [...state.groups, action.payload];
      return { ...state, groups: SortGroups(newGroup) };

    case types.SET_CURRENT:
      return {
        ...state,
        current_group: FindGroup(action.payload, state.groups),
      };
    case types.CHANGE_GROUP:
      const changedGroup = state.groups.map((group) => {
        if (group.id === action.payload.id) {
          return action.payload;
        }
        return group;
      });
      return { ...state, groups: [...changedGroup] };

    case types.DELETE_GROUP:
      const remaingGroups = state.groups.filter((group) => {
        if (group.id !== action.payload.id) {
          return group;
        }
      });
      return { ...state, groups: [...remaingGroups] };

    case types.UPDATE_GROUP:
      return { ...state, groups: SortGroups([...action.payload]) };

    case types.TOGGLE_FAVE:
      const ToggleGroup = ToggleFave(state.current_group);
      ChangeGroupApiCall(ToggleGroup);
      let newGroups = updateGroups(ToggleGroup, state.groups);

      return { ...state, groups: newGroups, current_group: ToggleGroup };

    default:
      break;
  }
};

// ------------------- Context ---------------------
export const GroupContext = createContext();
export const GroupProvider = (props) => {
  const [GroupState, GroupDispatcher] = useReducer(reducer, { groups: [] });

  useEffect(() => {
    const GetGroups = async () => {
      const groups = (await GetGroupsApiCall()) || [];
      GroupDispatcher({ type: types.UPDATE_GROUP, payload: [...groups] });
    };
    GetGroups();
  }, []);

  return (
    <GroupContext.Provider value={[GroupState, GroupDispatcher]}>
      {props.children}
    </GroupContext.Provider>
  );
};

const FindGroup = (id, groups) => {
  return groups.find((group) => group.id == id);
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
      return response.data.task_groups;
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

const ToggleFave = (currentGroup) => {
  return { ...currentGroup, is_fav: !currentGroup.is_fav };
};

const updateGroups = (changedGroup, groups) => {
  return groups.map((group) => {
    if (group.id == changedGroup.id) {
      return changedGroup;
    }
    return group;
  });
};

const ChangeGroupApiCall = async (group) => {
  const token = window.localStorage.getItem("token");
  try {
    const response = await axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/taskgroups/${group.id}`,
      data: group,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
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

const SortGroups = (groups) => {
  console.log(groups);
  return groups.sort((a, b) => {
    let groupA = a.name.toLowerCase(),
      groupB = b.name.toLowerCase();

    if (groupA < groupB) {
      return -1;
    }
    if (groupA > groupB) {
      return 1;
    }
    return 0;
  });
};
