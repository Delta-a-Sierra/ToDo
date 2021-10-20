import { useContext, useState } from "react";
import { GroupFilter } from "../";
import { LargeButton, FilterButton } from "../";
import { TaskContext } from "../../contexts/TaskContext";

const GroupNav = ({ title, dueCount }) => {
  const [allFiterActive, setAllFilterActive] = useState(true);
  const [completeFilterActive, setCompleteFilterActive] = useState(false);
  const [uncompleteFilterActive, setUncompleteFilterActive] = useState(false);
  const [TaskSate] = useContext(TaskContext);

  const filterProps = {
    allFiterActive: allFiterActive,
    completeFilterActive: completeFilterActive,
    uncompleteFilterActive: uncompleteFilterActive,
  };

  const FilterTasks = (type) => {
    switch (type) {
      case "all":
        setAllFilterActive(true);
        setCompleteFilterActive(false);
        setUncompleteFilterActive(false);
        break;
      case "complete":
        setAllFilterActive(false);
        setCompleteFilterActive(true);
        setUncompleteFilterActive(false);
        break;
      case "uncomplete":
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

  return (
    <nav className="Group-Nav">
      <div className="Group-Nav__row">
        <h1 className="Group-Nav__title">{title}</h1>

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
