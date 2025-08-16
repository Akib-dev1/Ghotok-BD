import { AuthContext } from "@/Contexts/AuthProvidor";
import React, { use } from "react";

const Profile = () => {
  const { user } = use(AuthContext);

  const fieldClass =
    "bg-[#FFF3F5] dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-4 transition-colors duration-500";
  const labelClass =
    "text-sm mb-2 font-semibold text-[#D33454] dark:text-[#FF5C7A]";
  const valueClass = "text-lg font-bold text-gray-800 dark:text-gray-200";

  return (
    <section className="min-h-screen bg-[#FFF3F5] dark:bg-[#121212] py-12 flex items-center justify-center transition-colors duration-500">
      <div className="w-full max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto bg-white dark:bg-[#1F1F1F] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-10 px-5 flex flex-col items-center transition-colors duration-500">
        <h2 className="text-4xl font-bold text-[#D33454] dark:text-[#FF5C7A] mb-10 text-center great-vibes">
          Welcome, {user?.displayName || "User"}
        </h2>

        <img
          src={user?.photoURL}
          alt="Profile"
          className="rounded-full shadow-lg w-40 h-40 object-cover border-4 border-[#D33454] dark:border-[#FF5C7A] mb-6 transition-colors duration-500"
        />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <div className={fieldClass}>
            <p className={`${labelClass} dark:text-gray-300`}>Full Name</p>
            <p className={`${valueClass} dark:text-gray-200`}>
              {user?.displayName || "N/A"}
            </p>
          </div>
          <div className={fieldClass}>
            <p className={`${labelClass} dark:text-gray-300`}>Email</p>
            <p className={`${valueClass} dark:text-gray-200`}>
              {user?.email || "N/A"}
            </p>
          </div>
          <div className={fieldClass}>
            <p className={`${labelClass} dark:text-gray-300`}>User ID</p>
            <p className={`${valueClass} dark:text-gray-200`}>{user?.uid}</p>
          </div>
          <div className={fieldClass}>
            <p className={`${labelClass} dark:text-gray-300`}>Email Verified</p>
            <p className={`${valueClass} dark:text-gray-200`}>
              {user?.emailVerified ? "Yes" : "No"}
            </p>
          </div>
          <div className={fieldClass}>
            <p className={`${labelClass} dark:text-gray-300`}>Creation Time</p>
            <p className={`${valueClass} dark:text-gray-200`}>
              {user?.metadata?.creationTime || "N/A"}
            </p>
          </div>
          <div className={fieldClass}>
            <p className={`${labelClass} dark:text-gray-300`}>Last Sign-In</p>
            <p className={`${valueClass} dark:text-gray-200`}>
              {user?.metadata?.lastSignInTime || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
