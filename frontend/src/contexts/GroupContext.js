import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

// ------------------- Reducer ---------------------

export const types = {
  ADD_GROUP: "ADD_GROUP",
  CHANGE_GROUP: "CHANGE_GROUP",
  DELETE_GROUP: "DELETE_GROUP",
  UPDATE_GROUP: "UPDATE_GROUP",
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.ADD_GROUP:
      const newGroup = { groups: [...state.groups, action.payload] };
      return { ...newGroup };

    case types.CHANGE_GROUP:
      const changedGroup = state.groups.map((group) => {
        if (group.id === action.payload.id) {
          return action.payload;
        }
        return group;
      });
      return { groups: [...changedGroup] };
    case types.DELETE_GROUP:
      const remaingGroups = state.groups.filter((group) => {
        if (group.id !== action.payload.id) {
          return group;
        }
      });
      return { ...state, groups: [...remaingGroups] };
    case types.UPDATE_GROUP:
      return { ...state, groups: [...action.payload] };

    default:
      break;
  }
};

const mockGroup = {
  groups: [
    { name: "Personal", id: 1, is_fav: true },
    { name: "Work", id: 2, is_fav: true },
    { name: "hobbie", id: 3, is_fav: false },
    { name: "study", id: 4, is_fav: false },
  ],
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
