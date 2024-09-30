import { FaTimes } from "react-icons/fa";
const Task = ({ task, onDelete, toggleReminder }) => {
  return (
    <div
      className={task.reminder
         ? "task reminder" : "task"}
      onDoubleClick={() => toggleReminder(task.id)}
    >
      <h3>
        {task.id}{" "}
        <FaTimes style={{ color: "red" }} onClick={() => onDelete(task.id)} />
      </h3>
      <p>{task.text}</p>
      <p>{task.date}</p>
    </div>
  );
};

export default Task;
