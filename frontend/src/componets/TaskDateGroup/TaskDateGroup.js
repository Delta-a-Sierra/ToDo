import { Task } from "..";

const TaskDateGroup = ({ title, tasks, SelectTask }) => {
  return (
    <div className="TaskGroup">
      <h1 className="TaskGroup__title">{title}</h1>
      <div className="TaskGroup__tasks">
        {tasks.map((task) => {
          return <Task openDetails={() => SelectTask(task)} task={task} />;
        })}
      </div>
    </div>
  );
};

export default TaskDateGroup;
