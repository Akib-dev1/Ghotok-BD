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
      const response = await axios.get("https://b11a12-server-side-akib-dev1.vercel.app/biodata");
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
    <section className="mb-10 py-16">
      <div className="max-w-9/12 mx-auto max-lg:max-w-10/12 max-md:max-w-11/12 px-4 text-center">
        <h2 className="text-4xl font-bold text-[#D33454] great-vibes mb-10">
          Our Success in Numbers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white shadow rounded-2xl py-6 px-4 space-y-2">
            <FaUsers className="text-[#D33454] text-3xl mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800">Total Biodatas</h3>
            <p className="text-[#D33454] text-3xl font-bold">
              <CountUp end={totalBiodatas} duration={5} />
            </p>
          </div>
          <div className="bg-white shadow rounded-2xl py-6 px-4 space-y-2">
            <FaFemale className="text-[#D33454] text-3xl mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800">Girls Biodata</h3>
            <p className="text-[#D33454] text-3xl font-bold">
              <CountUp end={totalGirls} duration={5} />
            </p>
          </div>
          <div className="bg-white shadow rounded-2xl py-6 px-4 space-y-2">
            <FaMale className="text-[#D33454] text-3xl mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800">Boys Biodata</h3>
            <p className="text-[#D33454] text-3xl font-bold">
              <CountUp end={totalBoys} duration={5} />
            </p>
          </div>
          <div className="bg-white shadow rounded-2xl py-6 px-4 space-y-2">
            <FaHeart className="text-[#D33454] text-3xl mx-auto" />
            <h3 className="text-2xl font-bold text-gray-800">
              Marriages Completed
            </h3>
            <p className="text-[#D33454] text-3xl font-bold">
              <CountUp end={totalMarriages} duration={5} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCounter;
