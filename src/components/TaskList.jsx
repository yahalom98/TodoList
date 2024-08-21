import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import TodoItem from "./TodoItem";

const TaskList = () => {
  const { tasks, handleToggle, handleDelete, handleUpdateDescription } =
    useContext(AppContext);
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.urgency === filter;
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Filter Buttons */}
      <div className="flex justify-center space-x-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg w-28 text-center transition-all duration-300 ${
            filter === "all"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("low")}
          className={`px-3 py-1.5 rounded-lg w-28 text-center transition-all duration-300 ${
            filter === "low"
              ? "bg-green-500 text-white shadow-md"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
        >
          Low
        </button>
        <button
          onClick={() => setFilter("medium")}
          className={`px-3 py-1.5 rounded-lg w-28 text-center transition-all duration-300 ${
            filter === "medium"
              ? "bg-yellow-500 text-white shadow-md"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
        >
          Medium
        </button>
        <button
          onClick={() => setFilter("high")}
          className={`px-3 py-1.5 rounded-lg w-28 text-center transition-all duration-300 ${
            filter === "high"
              ? "bg-red-500 text-white shadow-md"
              : "bg-gray-700 text-gray-200 hover:bg-gray-600"
          }`}
        >
          High
        </button>
      </div>

      {/* Task List with Increased Height and Animation */}
      <div className="space-y-4 h-96 p-2 w-full">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="transform transition-all duration-300 hover:scale-105"
          >
            <TodoItem
              task={task}
              onToggle={() => handleToggle(task.id)}
              onDelete={() => handleDelete(task.id)}
              onUpdateDescription={(newDescription) =>
                handleUpdateDescription(task.id, newDescription)
              }
              className="w-full bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
