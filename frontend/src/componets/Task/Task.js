import moment from "moment";

const Task = ({ task, openDetails }) => {
  const { title, is_completed, due_date } = task;

  return (
    <div className="Task" onClick={openDetails}>
      <div className="Task__title-container">
        <h3
          className={`Task__title ${is_completed && "Task__title--complete"}`}
        >
          {title}
        </h3>
      </div>
      {due_date && (
        <p
          className={`Task__dueDate  ${
            is_completed && "Task__dueDate--complete"
          }`}
        >
          {moment(due_date).format("D/MM/YYYY")}
        </p>
      )}
    </div>
  );
};

export default Task;
