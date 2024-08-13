import React, { useState } from "react";
import { FaSave, FaCopy } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { savePassword } from "../redux/passwordSlice";
import toast from "react-hot-toast";

const generatePassword = (length, includeUppercase, includeLowercase, includeNumbers, includeSpecialChars) => {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  let characters = '';
  if (includeUppercase) characters += uppercaseChars;
  if (includeLowercase) characters += lowercaseChars;
  if (includeNumbers) characters += numberChars;
  if (includeSpecialChars) characters += specialChars;

  if (characters.length === 0) return ''; // No characters to choose from

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

const PasswordGenerator = () => {
  const username = useSelector((state) => state.password.username);
  const passwords = useSelector((state) => state.password.passwords);

  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);
  const [error, setError] = useState(""); // Error state

  const dispatch = useDispatch();

  const handleGeneratePassword = (e) => {
    e.preventDefault();
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSpecialChars) {
      setError("Please select at least one option.");
      return;
    }

    setError(""); // Clear error if validation passes
    const newPassword = generatePassword(
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSpecialChars
    );
    setPassword(newPassword);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!password) {
      setError("Generate a password first before saving.");
      return;
    }

    // Dispatch the savePassword action
    dispatch(savePassword({ username, password }))
      .then((resultAction) => {
        if (savePassword.fulfilled.match(resultAction)) {
          if (resultAction.payload.message === 'Password saved successfully') { // Assuming a success message from your API
            toast.success("Password saved successfully");
            // No need to manually update passwords; Redux state will handle it
          } else {
            setError(resultAction.payload.message || "Failed to save password");
          }
        }
      })
      .catch((error) => {
        // Handle unexpected errors
        setError("An unexpected error occurred");
        console.error("Save password error:", error);
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied");
  };

  return (
    <div className="py-8 px-6 bg-white rounded-2xl shadow-lg mx-auto w-[800px]">
      <h1 className="text-3xl font-extrabold mb-4 text-center">Password Generator</h1>
      <hr className="border-gray-300 mb-6" />
      <div className="flex items-center space-x-4 my-8">
        <p className="p-4 rounded-lg bg-violet-100 text-teal-800 text-xl font-bold text-center flex-1 h-16">
          {password}
        </p>
        <div className="flex space-x-2">
          <button
            className="text-violet-500 hover:text-violet-700 transition-colors"
            onClick={copyToClipboard}
          >
            <FaCopy size={24} />
          </button>
          <button
            className="text-violet-500 hover:text-violet-700 transition-colors"
            onClick={handleSavePassword}
          >
            <FaSave size={24} />
          </button>
        </div>
      </div>
      <form onSubmit={handleGeneratePassword}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password Length</label>
          <div className="flex items-center space-x-4">
            <p className="text-sm text-gray-600">{length}</p>
            <input
              type="range"
              min={8}
              max={25}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="flex-grow cursor-pointer"
            />
            <p className="text-sm text-gray-600">25</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="flex justify-between text-gray-700 mb-1 font-semibold">
            Include Uppercase
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
              className="mr-2"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="flex justify-between text-gray-700 mb-1 font-semibold">
            Include Lowercase
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
              className="mr-2"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="flex justify-between text-gray-700 mb-1 font-semibold">
            Include Numbers
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
              className="mr-2"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="flex justify-between text-gray-700 mb-1 font-semibold">
            Include Special Characters
            <input
              type="checkbox"
              checked={includeSpecialChars}
              onChange={() => setIncludeSpecialChars(!includeSpecialChars)}
              className="mr-2"
            />
          </label>
        </div>
        
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-violet-500 text-white py-2 rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Generate Password
        </button>
      </form>
    </div>
  );
};

export default PasswordGenerator;
