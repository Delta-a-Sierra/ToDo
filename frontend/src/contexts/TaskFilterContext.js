import { createContext, useReducer, useEffect } from "react";

export const FilterContext = createContext();

export const FilterReducerTypes = {
  SWITCH_FILTER: "SWITCH_FILTER",
};

export const FilterOptions = {
  all: "all",
  complete: "complete",
  unComplete: "unComplete",
};

const FilterReducer = (state, action) => {
  switch (action.type) {
    case FilterReducerTypes.SWITCH_FILTER:
      return { ...state, filter: action.payload };
    default:
      break;
  }
};

export const FilterProvider = (props) => {
  const [FilterState, FilterDispatcher] = useReducer(FilterReducer, {
    filter: "",
  });

  useEffect(() => {
    FilterDispatcher({
      type: FilterReducerTypes.SWITCH_FILTER,
      payload: "all",
    });
  }, []);

  return (
    <FilterContext.Provider value={[FilterState, FilterDispatcher]}>
      {props.children}
    </FilterContext.Provider>
  );
};
