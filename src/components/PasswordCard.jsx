import React, { useState } from "react";
import { FaCopy, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

const PasswordCard = ({ password }) => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to copy the password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied");
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex items-center space-x-4">
      <input
        type={showPassword ? "text" : "password"}
        value={password}
        readOnly
        className="flex-1 border border-gray-300 rounded-lg p-2 text-gray-800"
      />
      <button
        onClick={copyToClipboard}
        className="p-2 text-violet-500 hover:text-violet-700 transition-colors rounded-lg"
        aria-label="Copy Password"
      >
        <FaCopy size={24} />
      </button>
      <button
        onClick={togglePasswordVisibility}
        className="p-2 text-violet-500 hover:text-violet-700 transition-colors rounded-lg"
        aria-label={showPassword ? "Hide Password" : "Show Password"}
      >
        {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
      </button>
    </div>
  );
};

export default PasswordCard;
