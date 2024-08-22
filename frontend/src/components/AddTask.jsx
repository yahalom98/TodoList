import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const AddTask = () => {
  const { addTask } = useContext(AppContext);
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [taskUrgency, setTaskUrgency] = useState("low");
  const [taskDescription, setTaskDescription] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName || !taskDate || !taskTime || !taskDescription) {
      alert("Please fill out all fields.");
      return;
    }
    addTask({
      id: Date.now(),
      name: taskName,
      date: taskDate,
      time: taskTime,
      urgency: taskUrgency,
      description: taskDescription,
      completed: false,
    });
    setTaskName("");
    setTaskDate("");
    setTaskTime("");
    setTaskUrgency("low");
    setTaskDescription("");
    setIsOpen(false); // Close the panel after submitting
  };

  return (
    <div className="relative">
      {/* Button to open the sliding panel */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-20 bg-blue-600 text-white px-4 py-2 rounded-r-lg focus:outline-none"
      >
        Add New Task
      </button>

      {/* Sliding panel */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-6 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "300px" }}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="text-right text-red-500 font-bold mb-4"
        >
          Close
        </button>
        <h2 className="text-xl font-bold mb-2 text-center w-full p-1 rounded-lg">
          Add New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Task Name"
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            type="date"
            value={taskDate}
            onChange={(e) => setTaskDate(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task Description"
            className="w-full p-2 rounded bg-gray-800 text-white"
          ></textarea>
          <select
            value={taskUrgency}
            onChange={(e) => setTaskUrgency(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
