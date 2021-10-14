import { createContext, useState, useReducer } from "react";

// ------------------- Reducer ---------------------

export const types = {
  ADD_GROUP: "ADD_GROUP",
  CHANGE_GROUP: "CHANGE_GROUP",
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
  //   const [Groups, setGroups] = useState([
  //     { name: "Personal", id: 1, is_fav: true },
  //     { name: "Work", id: 2, is_fav: true },
  //     { name: "hobbie", id: 3, is_fav: false },
  //     { name: "study", id: 4, is_fav: false },
  //   ]);

  const [GroupState, GroupDispatcher] = useReducer(reducer, mockGroup);

  return (
    <GroupContext.Provider value={[GroupState, GroupDispatcher]}>
      {props.children}
    </GroupContext.Provider>
  );
};
