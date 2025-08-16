import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import CountUp from "react-countup";
import { FaUsers, FaFemale, FaMale, FaHeart } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";

const SuccessCounter = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const response = await axios.get(
        "https://b11a12-server-side-akib-dev1.vercel.app/biodata"
      );
      return response.data;
    },
  });
  const { data: gotMarried, isLoading: isMarriedLoading } = useQuery({
    queryKey: ["marriages"],
    queryFn: async () => {
      const response = await axios.get(
        "https://b11a12-server-side-akib-dev1.vercel.app/biodata/success-stories"
      );
      return response.data;
    },
  });
  const totalBiodatas = data?.length;
  const totalGirls = data?.filter(
    (biodata) => biodata.type === "Female"
  ).length;
  const totalBoys = data?.filter((biodata) => biodata.type === "Male").length;
  const totalMarriages = gotMarried?.length;

  if (isLoading || isMarriedLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ScaleLoader barCount={6} color="#ff1d8d" height={50} width={4} />
      </div>
    );
  }
  return (
    <section className="mb-10 py-16 transition-colors duration-500 ease-in-out">
      <div className="max-w-9/12 mx-auto max-lg:max-w-10/12 max-md:max-w-11/12 px-4 text-center">
        <h2 className="text-4xl font-bold text-[#D33454] dark:text-[#FF5C7A] great-vibes mb-10 transition-colors duration-500 ease-in-out">
          Our Success in Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaUsers />,
              label: "Total Biodatas",
              value: totalBiodatas,
            },
            { icon: <FaFemale />, label: "Girls Biodata", value: totalGirls },
            { icon: <FaMale />, label: "Boys Biodata", value: totalBoys },
            {
              icon: <FaHeart />,
              label: "Marriages Completed",
              value: totalMarriages,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#2A2A2A] shadow-md rounded-2xl flex flex-col justify-center py-6 px-4 space-y-2 transition-colors duration-500 ease-in-out"
            >
              <div className="text-[#D33454] dark:text-[#FF5C7A] text-3xl mx-auto transition-colors duration-500 ease-in-out">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 transition-colors duration-500 ease-in-out">
                {item.label}
              </h3>
              <p className="text-[#D33454] dark:text-[#FF5C7A] text-3xl font-bold transition-colors duration-500 ease-in-out">
                <CountUp end={item.value} duration={5} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
