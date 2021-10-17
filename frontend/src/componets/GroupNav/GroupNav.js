import { GroupFilter } from "../";

const GroupNav = ({ title, dueCount }) => {
  return (
    <nav className="Group-Nav">
      <div className="Group-Nav__row">
        <h1 className="Group-Nav__title">{title}</h1>
        <GroupFilter />
      </div>
      <p className="Group-Nav__highlight">
        You have {dueCount} tasks due today
      </p>
    </nav>
  );
};

export default GroupNav;
