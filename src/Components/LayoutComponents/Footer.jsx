import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#FAF9F6] dark:bg-[#121212] border-t border-gray-200 dark:border-gray-700 text-slate-800 dark:text-gray-100 py-8 px-4 md:px-12 transition-colors duration-500 ease-in-out">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl great-vibes font-bold text-[#D33454] dark:text-[#FF5C7A]">
            GhotokBD
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-500">
            &copy; {new Date().getFullYear()} GhotokBD. All rights reserved.
          </p>
        </div>

        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/akib.anjum.5"
            target="_blank"
            aria-label="Facebook"
            className="bg-[#D33454] dark:bg-[#FF5C7A] hover:bg-[#a82a40] dark:hover:bg-[#FF7A92] text-white p-3 rounded-full transition transform hover:scale-110 duration-300"
          >
            <FaFacebookF />
          </a>

          <a
            href="https://www.instagram.com/itsakib16/"
            target="_blank"
            aria-label="Instagram"
            className="bg-[#D33454] dark:bg-[#FF5C7A] hover:bg-[#a82a40] dark:hover:bg-[#FF7A92] text-white p-3 rounded-full transition transform hover:scale-110 duration-300"
          >
            <FaInstagram />
          </a>

          <a
            href="https://github.com/Akib-dev1"
            target="_blank"
            aria-label="GitHub"
            className="bg-[#D33454] dark:bg-[#FF5C7A] hover:bg-[#a82a40] dark:hover:bg-[#FF7A92] text-white p-3 rounded-full transition transform hover:scale-110 duration-300"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
