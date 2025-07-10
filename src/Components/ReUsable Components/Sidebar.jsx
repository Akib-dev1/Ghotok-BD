import { AuthContext } from "@/Contexts/AuthProvidor";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use } from "react";
import {
  FaTachometerAlt,
  FaUserEdit,
  FaIdCard,
  FaEnvelopeOpenText,
  FaHeart,
  FaUserShield,
  FaUsersCog,
  FaStar,
  FaCheckCircle,
} from "react-icons/fa";
import { NavLink } from "react-router";
import { ScaleLoader } from "react-spinners";

const Sidebar = ({ layout = "vertical", onNavigate }) => {
  const baseClass = "flex items-center gap-3 px-4 py-2 font-medium transition";

  const { user } = use(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ScaleLoader color="#D33454" />
      </div>
    );
  }

  return (
    <nav
      className={`flex ${
        layout === "horizontal" ? "flex-col" : "flex-col"
      } gap-2`}
    >
      {/* 🧑‍💼 User Panel */}
      {data?.role === "normal" && (
        <>
          <NavLink
            to="/dashboard/overview"
            end
            onClick={onNavigate}
            className={baseClass}
          >
            <FaTachometerAlt className="text-lg" />
            Overview
          </NavLink>

          <NavLink
            to="/dashboard/edit-biodata"
            onClick={onNavigate}
            className={baseClass}
          >
            <FaUserEdit className="text-lg" />
            Edit Biodata
          </NavLink>

          <NavLink
            to="/dashboard/view-biodata"
            onClick={onNavigate}
            className={baseClass}
          >
            <FaIdCard className="text-lg" />
            View Biodata
          </NavLink>

          <NavLink
            to="/dashboard/my-contact-request"
            onClick={onNavigate}
            className={baseClass}
          >
            <FaEnvelopeOpenText className="text-lg" />
            My Contact Request
          </NavLink>

          <NavLink
            to="/dashboard/favourite-biodata"
            onClick={onNavigate}
            className={baseClass}
          >
            <FaHeart className="text-lg" />
            Favourites Biodata
          </NavLink>
        </>
      )}

      {/* 🛠 Admin Panel */}
      {data?.role === "admin" && (
        <>
          <NavLink to="/dashboard" onClick={onNavigate} className={baseClass}>
            <FaUserShield className="text-lg" />
            Admin Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/manage"
            onClick={onNavigate}
            className={baseClass}
          >
            <FaUsersCog className="text-lg" />
            Manage Users
          </NavLink>

          <NavLink
            to="/dashboard/approvedPremium"
            onClick={onNavigate}
            className={baseClass}
          >
            <FaStar className="text-lg" />
            Approved Premium
          </NavLink>

          <NavLink
            to="/dashboard/approvedContactRequests"
            onClick={onNavigate}
            className={baseClass}
          >
            <FaCheckCircle className="text-lg" />
            Approved Contact Request
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Sidebar;
