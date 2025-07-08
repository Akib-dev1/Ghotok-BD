import Sidebar from "@/Components/ReUsable Components/Sidebar";
import React, { use, useState } from "react";
import { Link, Outlet } from "react-router";
import { FaBars, FaTimes, FaHome, FaSignOutAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/Contexts/AuthProvidor";

const DashboardLayout = () => {
  const { logout } = use(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF3F5] flex flex-col lg:flex-row font-poppins">
      <div className="lg:hidden w-full bg-white shadow px-4 py-3 flex justify-between items-center z-50">
        <Link to="/" className="text-2xl text-[#D33454] font-bold great-vibes">
          GhotokBD
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-[#B72B48] hover:text-[#D33454]">
            <FaHome size={20} />
          </Link>
          <button
            className="text-[#B72B48] hover:text-[#D33454]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white px-4 py-4 border-b border-gray-200 shadow-sm">
          <Sidebar layout="horizontal" onNavigate={() => setMenuOpen(false)} />
        </div>
      )}

      <aside className="hidden lg:flex lg:flex-col w-[250px] min-h-screen bg-[#FFF3F5] border-r border-gray-200 px-4 py-6 shadow-md">
        <Link
          to="/"
          className="text-3xl font-bold text-[#D33454] great-vibes text-center mb-6"
        >
          GhotokBD
        </Link>

        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2 mb-4 rounded-lg font-medium text-[#B72B48] hover:bg-[#FBEFF0] transition"
        >
          <FaHome className="text-lg" />
          Back to Home
        </Link>

        <Sidebar layout="vertical" />
        <div className="mt-auto pt-10">
          <Button
            onClick={logout}
            variant="outline"
            className="w-full border-[#D33454] text-[#D33454] hover:bg-[#E3D4B4]"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
