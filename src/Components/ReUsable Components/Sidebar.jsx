import React from "react";
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

const Sidebar = ({ layout = "vertical", onNavigate }) => {
  const baseClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition";

  return (
    <nav
      className={`flex ${
        layout === "horizontal" ? "flex-col" : "flex-col"
      } gap-2`}
    >
      {/* 🧑‍💼 User Panel */}
      <NavLink to="/dashboard" end onClick={onNavigate} className={baseClass}>
        <FaTachometerAlt className="text-lg" />
        Dashboard
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

      {/* 🛠 Admin Panel */}
      <NavLink
        to="/dashboard/admin-dashboard"
        onClick={onNavigate}
        className={baseClass}
      >
        <FaUserShield className="text-lg" />
        Admin Dashboard
      </NavLink>

      <NavLink
        to="/dashboard/manage-users"
        onClick={onNavigate}
        className={baseClass}
      >
        <FaUsersCog className="text-lg" />
        Manage Users
      </NavLink>

      <NavLink
        to="/dashboard/approved-premium"
        onClick={onNavigate}
        className={baseClass}
      >
        <FaStar className="text-lg" />
        Approved Premium
      </NavLink>

      <NavLink
        to="/dashboard/approved-contact-requests"
        onClick={onNavigate}
        className={baseClass}
      >
        <FaCheckCircle className="text-lg" />
        Approved Contact Request
      </NavLink>
    </nav>
  );
};

export default Sidebar;
