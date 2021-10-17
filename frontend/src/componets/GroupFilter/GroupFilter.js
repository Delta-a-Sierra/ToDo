import { useState } from "react";

const GroupFilter = () => {
  const [choice, setChoice] = useState("All");
  return (
    <div className="Group-Filter">
      <div className="Group-Filter__header">
        <h4 className="Group-Filter__title">
          Sort by: <span className="Group-Filter__choice">{choice}</span>
        </h4>
      </div>
      <div className="dropdown">
        <ul className="dropdown__content">
          <li className="dropdown__item dropdown__item--active">All</li>
          <li className="dropdown__item">Completed</li>
          <li className="dropdown__item">Uncompleted</li>
        </ul>
      </div>
    </div>
  );
};

export default GroupFilter;
