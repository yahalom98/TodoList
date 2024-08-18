import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskUrgency, setTaskUrgency] = useState("low");
  const [taskDescription, setTaskDescription] = useState("");

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleToggle = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const addTask = () => {
    if (!taskName || !taskDate || !taskTime || !taskDescription) {
      alert("Please enter all task details.");
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      date: taskDate,
      time: taskTime,
      urgency: taskUrgency,
      completed: false,
      description: taskDescription,
    };
    setTasks([...tasks, newTask]);
    setTaskName("");
    setTaskDate("");
    setTaskTime("");
    setTaskUrgency("low");
    setTaskDescription("");
    setIsAddTaskOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleAddTask = () => {
    setIsAddTaskOpen(!isAddTaskOpen);
  };

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${
        isDarkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div className="flex space-x-8">
        <div className="flex flex-col items-center">
          <button
            onClick={toggleAddTask}
            className={`bg-blue-500 text-white py-2 px-2 rounded mb-4 text-sm w-32`}
          >
            {isAddTaskOpen ? "Close" : "Add New Task"}{" "}
          </button>
          {isAddTaskOpen && (
            <div className="flex flex-col items-center w-80">
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task Name"
                className={`border p-2 rounded w-full mb-2 ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-black"
                }`}
              />
              <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className={`border p-2 rounded w-full mb-2 ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-black"
                }`}
              />
              <input
                type="time"
                value={taskTime}
                onChange={(e) => setTaskTime(e.target.value)}
                className={`border p-2 rounded w-full mb-2 ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-black"
                }`}
              />
              <select
                value={taskUrgency}
                onChange={(e) => setTaskUrgency(e.target.value)}
                className={`border p-2 rounded w-full mb-2 ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Task Description"
                className={`border p-2 rounded w-full mb-2 ${
                  isDarkMode
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-black"
                }`}
              />
              <button
                onClick={addTask}
                className="bg-green-400 text-white p-1 rounded w-full"
              >
                Add Task
              </button>
            </div>
          )}
        </div>

        <div
          className={`w-full max-w-lg ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          } rounded-lg shadow-lg p-6 flex flex-col items-center`}
        >
          <h1 className="text-2xl font-bold mb-4 text-center w-full p-4 rounded-lg">
            To Do List
          </h1>
          <div className="h-96 overflow-y-auto w-full text-black flex flex-col">
            {tasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                onToggle={() => handleToggle(task.id)}
                onDelete={() => handleDelete(task.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={toggleTheme}
        className={`absolute top-6 left-6 ${
          isDarkMode ? "glowing-button-dark" : "glowing-button-light"
        }`}
      >
        Change to {isDarkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
};

export default App;
