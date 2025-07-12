import { AuthContext } from "@/Contexts/AuthProvidor";
import React, { use } from "react";

const Overview = () => {
  const { user } = use(AuthContext);

  const fieldClass = "bg-[#FFF3F5] h-full w-full p-4 rounded-lg shadow-sm border";
  const labelClass = "text-sm mb-1 font-semibold text-[#B72B48]";
  const valueClass = "text-base text-gray-800";

  return (
    <section className="min-h-screen bg-[#FFF3F5] py-12 flex items-center justify-center">
      <div className="w-full max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto bg-white rounded-xl shadow-xl border border-gray-200 py-10 px-5 flex flex-col items-center">
        <h2 className="text-4xl font-bold text-[#D33454] mb-10 text-center great-vibes">
          Welcome, {user?.displayName || "User"}
        </h2>

        <img
          src={user?.photoURL}
          alt="Profile"
          className="rounded-full shadow-lg w-40 h-40 object-cover border-4 border-[#D33454] mb-6"
        />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
          <div className={fieldClass}>
            <p className={labelClass}>Full Name</p>
            <p className={valueClass}>{user?.displayName || "N/A"}</p>
          </div>
          <div className={fieldClass}>
            <p className={labelClass}>Email</p>
            <p className={valueClass}>{user?.email || "N/A"}</p>
          </div>
          <div className={fieldClass}>
            <p className={labelClass}>User ID</p>
            <p className={valueClass}>{user?.uid}</p>
          </div>
          <div className={fieldClass}>
            <p className={labelClass}>Email Verified</p>
            <p className={valueClass}>{user?.emailVerified ? "Yes" : "No"}</p>
          </div>
          <div className={fieldClass}>
            <p className={labelClass}>Creation Time</p>
            <p className={valueClass}>
              {user?.metadata?.creationTime || "N/A"}
            </p>
          </div>
          <div className={fieldClass}>
            <p className={labelClass}>Last Sign-In</p>
            <p className={valueClass}>
              {user?.metadata?.lastSignInTime || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
