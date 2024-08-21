import { useState } from "react";
import axios from "axios";

const LoginModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
    setIsOpen(false);
  };

  const closeRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  const openLoginModal = () => {
    setIsOpen(true);
    setIsRegisterOpen(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        method: "post",
        url: "http://localhost:8000/api/users/login",
        data: { email, password },
        withCredentials: true,
      };

      await axios(config);
      setIsLoggedIn(true);
      closeModal();
      alert("Connected");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const config = {
        method: "post",
        url: "http://localhost:8000/api/users/register",
        data: { email, password, confirmPassword },
        withCredentials: true,
      };

      await axios(config);
      setIsRegisterOpen(false);
      alert("Registration successful. Please log in.");
      setIsOpen(true);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      const config = {
        method: "post",
        url: "http://localhost:8000/api/users/logout",
        withCredentials: true,
      };

      await axios(config);
      setIsLoggedIn(false);
      alert("You have been logged out.");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="absolute top-4 right-4">
      {isLoggedIn ? (
        <div className="text-white flex items-center">
          <span className="mr-4">You are logged in</span>
          <button
            className="text-white p-2 bg-red-600 rounded-full hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <button
            className="text-white p-2 w-20 bg-gray-800 rounded-full border-none hover:bg-gray-700"
            onClick={toggleModal}
          >
            <span className="text-xl">Login</span>
          </button>

          {isOpen && (
            <div className="absolute top-12 right-0 w-80 p-6 bg-white rounded-lg shadow-lg z-50">
              <button
                className="absolute top-2 right-2 text-white bg-red-400 hover:bg-red-600"
                onClick={closeModal}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Login
              </h2>
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                  <label className="block text-black">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 bg-gray-300 rounded mt-1 placeholder-black"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-black">Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 bg-gray-300 rounded mt-1 placeholder-black"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                  Login
                </button>
              </form>
              <div className="flex justify-center mt-4">
                <button
                  className="text-blue-600 bg-black hover:underline"
                  onClick={openRegisterModal}
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {isRegisterOpen && (
        <div className="absolute top-12 right-0 w-80 p-6 bg-white rounded-lg shadow-lg z-50">
          <button
            className="absolute top-2 right-2 bg-red-400 text-white-600 hover:bg-red-600"
            onClick={closeRegisterModal}
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Register
          </h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-4">
              <label className="block text-black">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 bg-gray-300 rounded mt-1 placeholder-black"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 bg-gray-300 rounded mt-1 placeholder-black"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-black">Confirm Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 bg-gray-300 rounded mt-1 placeholder-black"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Register
            </button>
          </form>
          <div className="flex justify-center mt-4">
            <button
              className="text-blue-600 hover:underline"
              onClick={openLoginModal}
            >
              Back to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
