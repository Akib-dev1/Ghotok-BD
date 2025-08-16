import React from "react";
import errorMessage from "../../assets/Error.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router";
const Error = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Lottie Animation */}
      <Lottie
        animationData={errorMessage}
        loop={true}
        className="w-72 h-72 md:w-96 md:h-96 mb-6"
      />

      {/* Text Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-[#D33454]">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mt-2">
          Page Not Found!
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Oops! The link you followed might be broken or the page may have been
          removed.
        </p>

        {/* Button */}
        <div className="mt-6">
          <button
            onClick={handleClick}
            className="bg-[#D33454] cursor-pointer text-white px-6 py-3 rounded-xl shadow hover:bg-[#b02a46] transition font-medium"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
