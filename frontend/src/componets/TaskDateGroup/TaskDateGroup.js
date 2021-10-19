import { Task } from "..";

const TaskDateGroup = ({ title, tasks }) => {
  return (
    <div className="TaskGroup">
      <h1 className="TaskGroup__title">{title}</h1>
      <div className="TaskGroup__tasks">
        {tasks.map((task) => {
          return <Task task={task} />;
        })}
      </div>
    </div>
  );
};

export default TaskDateGroup;
