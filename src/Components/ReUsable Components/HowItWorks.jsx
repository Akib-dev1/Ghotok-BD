import React from "react";
import {
  FaUserPlus,
  FaFileAlt,
  FaSearch,
  FaHeart,
  FaDollarSign,
  FaPhoneAlt,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-white text-2xl" />,
      title: "Create an Account",
      desc: "Sign up and get started with your free profile in minutes.",
    },
    {
      icon: <FaFileAlt className="text-white text-2xl" />,
      title: "Add Your Biodata",
      desc: "Enter your personal details, preferences, and photo to complete your biodata.",
    },
    {
      icon: <FaSearch className="text-white text-2xl" />,
      title: "Explore Other Profiles",
      desc: "Browse biodatas of other members once you're logged in.",
    },
    {
      icon: <FaHeart className="text-white text-2xl" />,
      title: "Add to Favourites",
      desc: "Save the profiles you like to your favourites for easy access later.",
    },
    {
      icon: <FaDollarSign className="text-white text-2xl" />,
      title: "Request Contact Info",
      desc: "Pay $5 to request someone's contact info securely.",
    },
    {
      icon: <FaPhoneAlt className="text-white text-2xl" />,
      title: "Connect Privately",
      desc: "Get the contact details (after admin approval) and connect directly.",
    },
  ];

  return (
    <section className="max-w-9/12 mx-auto my-16 px-4 max-lg:max-w-10/12 max-md:max-w-11/12">
      <h2 className="text-4xl font-bold text-center text-[#D33454] great-vibes mb-10">
        How It Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-lg p-6 text-center transition-all duration-300 space-y-4"
          >
            <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-[#D33454]">
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
