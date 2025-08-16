import Sidebar from "@/Components/ReUsable Components/Sidebar";
import React, { use, useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { FaBars, FaTimes, FaHome, FaSignOutAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/Contexts/AuthProvidor";

const DashboardLayout = () => {
  const { logout } = use(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"; // Load saved theme
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme); // Save theme on change
  }, [theme]);

  return (
    <div className="min-h-screen bg-[#FFF3F5] dark:bg-[#121212] flex flex-col lg:flex-row transition-colors duration-500">
      {/* Mobile Topbar */}
      <div className="lg:hidden w-full bg-white dark:bg-[#1F1F1F] shadow px-4 py-3 flex justify-between items-center z-50 transition-colors duration-500">
        <Link
          to="/"
          className="text-2xl text-[#D33454] dark:text-[#FF5C7A] font-bold great-vibes"
        >
          GhotokBD
        </Link>
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-[#B72B48] dark:text-[#FF7A92] hover:text-[#D33454] dark:hover:text-[#FF5C7A] transition-colors"
          >
            <FaHome size={20} />
          </Link>
          <button
            className="text-[#B72B48] dark:text-[#FF7A92] hover:text-[#D33454] dark:hover:text-[#FF5C7A] cursor-pointer transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#1F1F1F] px-4 py-4 border-b border-gray-200 dark:border-gray-700 shadow-sm space-y-4 transition-colors duration-500">
          <Sidebar layout="horizontal" onNavigate={() => setMenuOpen(false)} />
          <Button
            onClick={logout}
            variant="outline"
            className="w-full border-[#D33454] dark:border-[#FF5C7A] text-[#D33454] dark:text-[#FF5C7A] hover:bg-[#E3D4B4] dark:hover:bg-[#FF7A92] cursor-pointer transition-colors"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </Button>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-[250px] min-h-screen bg-[#FFF3F5] dark:bg-[#121212] border-r border-gray-200 dark:border-gray-700 px-4 py-6 shadow-md transition-colors duration-500">
        <Link
          to="/"
          className="text-3xl font-bold text-[#D33454] dark:text-[#FF5C7A] great-vibes text-center mb-6 transition-colors duration-500"
        >
          GhotokBD
        </Link>

        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 mb-4 rounded-lg font-medium text-[#B72B48] dark:text-[#FF7A92] hover:bg-[#FBEFF0] dark:hover:bg-[#1E1E1E] transition-colors duration-300"
        >
          <FaHome className="text-lg" />
          Back to Home
        </Link>

        <Sidebar layout="vertical" />

        <div className="mt-auto pt-10">
          <Button
            onClick={logout}
            variant="outline"
            className="w-full cursor-pointer border-[#D33454] dark:border-[#FF5C7A] text-[#D33454] dark:text-[#FF5C7A] hover:bg-[#E3D4B4] dark:hover:bg-[#FF7A92] transition-colors"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 transition-colors duration-500">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
