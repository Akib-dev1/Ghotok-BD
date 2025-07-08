import React from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../components/LayoutComponents/Navbar";
import Footer from "@/Components/LayoutComponents/Footer";

const AuthLayout = () => {
  const { pathname } = useLocation();
  let msg;
  if (pathname === "/login") {
    document.title = "Login - GhotokBD";
    msg = "Welcome to the login page";
  } else if (pathname === "/signup") {
    document.title = "Sign Up - GhotokBD";
    msg = "Welcome to the sign up page";
  }
  return (
    <>
      <header className="sticky top-0 z-50 shadow">
        <Navbar />
      </header>
      <div className="relative flex items-center justify-center min-h-screen bg-[url('https://i.ibb.co/678C9tkQ/image.png')] bg-no-repeat bg-cover bg-gray-100 px-4 sm:px-6">
        {/* Black overlay */}
        <div className="absolute w-full h-full inset-0 bg-black/50 z-0" />

        {/* Content Wrapper */}
        <div className="relative z-10 w-full max-w-[1440px] flex items-center justify-center flex-col lg:flex-row gap-8 lg:gap-20 py-10 px-4">
          {/* Left: Text */}
          <div className="text-center lg:text-left max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl great-vibes font-bold text-white mb-4">
              {msg}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white">
              Please enter your credentials to continue
            </p>
          </div>

          {/* Right: Form (via <Outlet />) */}
          <div className="w-full max-w-sm lg:max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default AuthLayout;
