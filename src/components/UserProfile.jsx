import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/passwordSlice";
import PasswordCard from "./PasswordCard";
import User from "./User";
import { IoIosLogOut } from "react-icons/io";
import toast from "react-hot-toast";

const UserProfile = () => {
  const passwords = useSelector((state) => state.password.passwords);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Dispatch the logout action
      const resultAction = await dispatch(logoutUser());

      // Check if the logout was successful
      if (logoutUser.fulfilled.match(resultAction)) {
        toast.success("Logged out successfully!");
        navigate("/"); // Redirect to login or home page
      } else {
        toast.error(resultAction.payload || "Logout failed");
      }
    } catch (error) {
      // Handle any unexpected errors
      toast.error("An unexpected error occurred");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="p-5 rounded-r-3xl bg-white h-screen flex flex-col justify-between overflow-hidden">
      {/* User Section */}
      <div className="p-5">
        <User />
      </div>

      {/* Save Passwords Section */}
      <div className="flex flex-col flex-grow p-5">
        <hr />
        <h1 className="text-xl font-bold mt-4">Save Passwords</h1>
        <div className="flex flex-col gap-2 mt-2 overflow-auto max-h-[400px] scrollbar-hidden">
          {passwords.length > 0 ? (
            [...passwords]
              .reverse()
              .map((password, index) => (
                <PasswordCard key={index} password={password} />
              ))
          ) : (
            <p>No passwords available</p>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-5 flex justify-center">
        <hr />
        <button
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800"
        >
          Logout <IoIosLogOut className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
