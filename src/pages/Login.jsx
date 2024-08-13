import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { loginUser } from "../redux/passwordSlice";

const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (username.length < 5) {
      setError("Username must be at least 5 chars");
      return;
    }

    if (password.length < 5) {
      setError("Password must be at least 5 chars");
      return;
    }

    setError("");

    // Dispatch the loginUser action
    dispatch(loginUser({ username, password }))
      .then((resultAction) => {
        console.log(resultAction.payload)
        if (loginUser.fulfilled.match(resultAction)) {
          if (resultAction.payload.message === 'login successfull') {
            toast.success("Login successful!");
            navigate('/password');
          } else {
            setError(resultAction.payload.message || "Login failed");
          }
        }
      })
      .catch((error) => {
        // Handle unexpected errors
        setError("An unexpected error occurred");
        console.error("Login error:", error);
      });
  };

  return (
    <div className="h-screen flex items-center bg-gray-800">
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Login
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-violet-500 text-white py-2 rounded-lg hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-2">
          Don't have an account?
          <Link to={"/register"}>
            <span className="ml-1 text-blue-400 cursor-pointer">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
