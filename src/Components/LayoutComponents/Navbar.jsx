import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { AuthContext } from "@/Contexts/AuthProvidor";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Navbar = () => {
  const { user } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const { data } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://b11a12-server-side-akib-dev1.vercel.app/users/${user.email}`
      );
      return res.data;
    },
  });
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };
  return (
    <nav className="backdrop-blur-lg bg-[#E3D4B4] shadow-md z-50 relative">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/" className="great-vibes text-[#D33454]">
            GhotokBD
          </Link>
        </div>

        <div className="hidden md:flex text-xl text-[#1F2937] font-semibold space-x-6">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/biodatas">Biodatas</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </div>

        <div className="hidden md:flex items-center">
          {user ? (
            <Link
              to={data?.role === "admin" ? "/dashboard" : "/dashboard/profile"}
              className="bg-[#D33454] text-white px-4 py-2 rounded-full hover:border-[#D33454] border border-[#D33454] hover:bg-inherit duration-150 ease-in hover:text-[#000000] text-lg"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-[#D33454] text-white px-4 py-2 rounded-full hover:border-[#D33454] border border-[#D33454] hover:bg-inherit duration-150 ease-in hover:text-[#000000] text-lg"
            >
              Login
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 ml-4 cursor-pointer rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition-colors duration-300 hover:scale-110"
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-inner ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-4 text-gray-700 text-lg">
          <NavLink to="/" end onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/biodatas" onClick={() => setIsOpen(false)}>
            Biodatas
          </NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>
            About Us
          </NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)}>
            Contact Us
          </NavLink>
          {user ? (
            <Link
              to={data?.role === "admin" ? "/dashboard" : "/dashboard/profile"}
              onClick={() => setIsOpen(false)}
              className="bg-[#D33454] text-white text-center py-2 rounded-md hover:bg-[#D33454]/80"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-[#D33454] text-white text-center py-2 rounded-md hover:bg-[#D33454]/80"
            >
              Login
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full self-center bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition-colors duration-300 hover:scale-110"
            title={
              theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
            }
          >
            {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
