import { useContext, useState } from "react";
import { GroupFilter } from "../";
import { FilterButton } from "../";
import { TaskContext } from "../../contexts/TaskContext";
import {
  GroupContext,
  types as GroupReducerTypes,
} from "../../contexts/GroupContext";

import {
  FilterContext,
  FilterReducerTypes,
  FilterOptions,
} from "../../contexts/TaskFilterContext";

const GroupNav = ({ title, fave }) => {
  const [allFiterActive, setAllFilterActive] = useState(true);
  const [completeFilterActive, setCompleteFilterActive] = useState(false);
  const [uncompleteFilterActive, setUncompleteFilterActive] = useState(false);
  const [TaskSate] = useContext(TaskContext);
  const [GroupState, GroupDispatcher] = useContext(GroupContext);
  const [FilterState, FilterDispacther] = useContext(FilterContext);

  const filterProps = {
    allFiterActive: allFiterActive,
    completeFilterActive: completeFilterActive,
    uncompleteFilterActive: uncompleteFilterActive,
  };

  const FilterTasks = (type) => {
    switch (type) {
      case "all":
        FilterDispacther({
          type: FilterReducerTypes.SWITCH_FILTER,
          payload: FilterOptions.all,
        });
        setAllFilterActive(true);
        setCompleteFilterActive(false);
        setUncompleteFilterActive(false);
        break;
      case "complete":
        FilterDispacther({
          type: FilterReducerTypes.SWITCH_FILTER,
          payload: FilterOptions.complete,
        });
        setAllFilterActive(false);
        setCompleteFilterActive(true);
        setUncompleteFilterActive(false);
        break;
      case "uncomplete":
        FilterDispacther({
          type: FilterReducerTypes.SWITCH_FILTER,
          payload: FilterOptions.unComplete,
        });
        setAllFilterActive(false);
        setCompleteFilterActive(false);
        setUncompleteFilterActive(true);
        break;

      default:
        setAllFilterActive(true);
        setCompleteFilterActive(false);
        setUncompleteFilterActive(false);
        break;
    }
  };

  const ToggleFave = () => {
    GroupDispatcher({
      type: GroupReducerTypes.TOGGLE_FAVE,
    });
  };

  return (
    <nav className="Group-Nav">
      <div className="Group-Nav__row">
        {fave && (
          <div>
            <svg
              className={`Group-Nav__fave ${
                GroupState.current_group.is_fav && "Group-Nav__fave--active"
              }`}
              onClick={ToggleFave}
              xmlns="http://www.w3.org/2000/svg"
              width="33.366"
              height="31.731"
              viewBox="0 0 33.366 31.731"
            >
              <path
                id="Icon_feather-star"
                data-name="Icon feather-star"
                d="M19.683,3l5.155,10.444,11.528,1.685-8.341,8.125,1.969,11.478-10.31-5.422L9.373,34.731l1.969-11.478L3,15.129l11.528-1.685Z"
                transform="translate(-3 -3)"
              />
            </svg>
          </div>
        )}
        <div className="Group-Nav__title-container">
          <h1 className="Group-Nav__title">{title}</h1>
        </div>

        <GroupFilter {...filterProps} FilterTasks={FilterTasks} />
      </div>
      <p className="Group-Nav__highlight">
        You have {TaskSate.due_count} tasks due today
      </p>
      <div className="Group-Nav__buttons">
        <FilterButton
          onClick={() => FilterTasks("all")}
          active={allFiterActive}
          text="All"
        />
        <FilterButton
          onClick={() => FilterTasks("complete")}
          active={completeFilterActive}
          text="Complete"
        />
        <FilterButton
          onClick={() => FilterTasks("uncomplete")}
          active={uncompleteFilterActive}
          text="Uncomplete"
        />
      </div>
    </nav>
  );
};

export default GroupNav;
