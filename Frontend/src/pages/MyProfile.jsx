import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyProfile = () => {
  

  const {userData} = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Profile</h2>
        <div className="space-y-4">
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Name:</span> {userData.name}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Email:</span> {userData.email}
          </p>
          <p className="text-gray-700 text-lg">
            <span className="font-semibold">Phone:</span> {userData.phone}
          </p>
        </div>
        <button
          className="mt-6 px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
