import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import "./index.css";
import LoginModal from "./components/LoginModal";

const App = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-black">
      <LoginModal />
      <div className="flex space-x-8">
        <div className="hidden">
          <AddTask />
        </div>
        <div className="w-full max-w-3xl bg-gray-800 text-white rounded-lg shadow-lg p-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-4 text-center w-full p-4 rounded-lg">
            To Do List
          </h1>
          <div className="w-full h-full overflow-y-auto">
            {/* Kiselv is the king */}
            <TaskList />
            <h1>Kiselv!</h1>
          </div>
        </div>
      </div>
      <AddTask />
    </div>
  );
};

export default App;
