import { useState } from "react";
import PropTypes from "prop-types";

const TodoItem = ({ task, onToggle, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getColor = () => {
    if (task.urgency === "high") return "bg-red-200";
    if (task.urgency === "medium") return "bg-yellow-200";
    return "bg-green-200";
  };

  const handleHeaderClick = (e) => {
    if (e.target.type !== "checkbox") {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`rounded-lg shadow-lg my-2`}>
      <div
        className={`p-4 flex items-center justify-between cursor-pointer ${getColor()}`}
        onClick={handleHeaderClick}
      >
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
            className="mr-2"
          />
          <span className={task.completed ? "line-through" : ""}>
            {task.name} - {task.date} {task.time}
          </span>
        </div>
        <div>{isOpen ? "-" : "+"}</div>
      </div>
      {isOpen && (
        <div className="p-4 bg-white text-black rounded-b-lg">
          <p>{task.description}</p>
          <button
            onClick={onDelete}
            className="bg-red-500 text-white p-2 rounded mt-4"
          >
            Delete Task
          </button>
        </div>
      )}
    </div>
  );
};

TodoItem.propTypes = {
  task: PropTypes.shape({
    urgency: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
