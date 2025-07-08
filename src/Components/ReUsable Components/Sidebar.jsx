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

const navItems = [
  // 🧑‍💼 User Section
  {
    name: "Dashboard",
    icon: <FaTachometerAlt />,
    path: "/dashboard",
  },
  {
    name: "Edit Biodata",
    icon: <FaUserEdit />,
    path: "/dashboard/editBiodata",
  },
  {
    name: "View Biodata",
    icon: <FaIdCard />,
    path: "/dashboard/viewBiodata",
  },
  {
    name: "My Contact Request",
    icon: <FaEnvelopeOpenText />,
    path: "/dashboard/contacts",
  },
  {
    name: "Favourites Biodata",
    icon: <FaHeart />,
    path: "/dashboard/favourites",
  },

  // 🛠 Admin Section
  {
    name: "Admin Dashboard",
    icon: <FaUserShield />,
    path: "/dashboard/admin",
  },
  {
    name: "Manage Users",
    icon: <FaUsersCog />,
    path: "/dashboard/manageUsers",
  },
  {
    name: "Approved Premium",
    icon: <FaStar />,
    path: "/dashboard/approvedPremium",
  },
  {
    name: "Approved Contact Request",
    icon: <FaCheckCircle />,
    path: "/dashboard/approvedContacts",
  },
];

const Sidebar = ({ layout = "vertical", onNavigate }) => {
  return (
    <nav
      className={`flex ${
        layout === "horizontal" ? "flex-col gap-2" : "flex-col gap-2"
      }`}
    >
      {navItems.map((item, i) => (
        <NavLink
          key={i}
          to={item.path}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center ${
              layout === "horizontal" ? "gap-3 px-4 py-2" : "gap-3 px-4 py-2"
            } rounded-lg font-medium transition ${
              isActive
                ? "bg-[#D33454] text-white shadow"
                : "text-[#B72B48] hover:bg-[#FBEFF0]"
            }`
          }
        >
          <span className="text-lg">{item.icon}</span>
          <span>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;
