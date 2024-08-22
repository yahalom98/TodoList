import { useState } from "react";
import PropTypes from "prop-types";

const TodoItem = ({ task, onToggle, onDelete, onUpdateDescription }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState(task.description || "");

  const handleSave = () => {
    onUpdateDescription(description);
    setIsEditing(false);
  };

  const getUrgencyColor = () => {
    switch (task.urgency) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
    }
  };

  return (
    <div className="my-2 rounded-lg shadow-md">
      <div
        className={`p-4 rounded-t-lg ${getUrgencyColor()} flex items-center justify-between`}
      >
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={onToggle}
            className="mr-4"
          />
          <span
            className={`flex-1 cursor-pointer ${
              task.completed ? "line-through" : ""
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {task.name} - {task.date} {task.time}
          </span>
        </div>
        <span
          className="text-black cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "-" : "+"}
        </span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-4 bg-gray-500 rounded-b-lg mt-1">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
              <button
                onClick={handleSave}
                className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-2">{description}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 mr-4"
              >
                Edit
              </button>
              <button onClick={onDelete} className="text-red-500">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TodoItem.propTypes = {
  task: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdateDescription: PropTypes.func.isRequired,
};

export default TodoItem;
