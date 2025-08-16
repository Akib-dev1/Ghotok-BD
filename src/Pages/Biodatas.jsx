import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import { Link } from "react-router";

const Biodatas = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [biodataType, setBiodataType] = useState("");
  const [division, setDivision] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const res = await axios.get(
        "https://b11a12-server-side-akib-dev1.vercel.app/biodata"
      );
      return res.data;
    },
  });

  const [filteredData, setFilteredData] = useState([]);

  // Filter the data whenever filters or data change
  useEffect(() => {
    if (data) {
      let filtered = [...data];

      if (biodataType) {
        filtered = filtered.filter((item) => item.type === biodataType);
      }

      if (division) {
        filtered = filtered.filter(
          (item) => item.permanentDivision === division
        );
      }

      if (minAge !== "") {
        filtered = filtered.filter((item) => item.age >= parseInt(minAge));
      }

      if (maxAge !== "") {
        filtered = filtered.filter((item) => item.age <= parseInt(maxAge));
      }

      setFilteredData(filtered);
      setCurrentPage(1); // Reset to page 1 when filters change
    }
  }, [data, minAge, maxAge, biodataType, division]);

  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = filteredData.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ScaleLoader color="#D33454" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FFF3F5] dark:bg-[#121212] text-gray-900 dark:text-gray-100 py-12 px-4 transition-colors duration-500 ease-in-out flex flex-col justify-between">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Filter Section */}
        <aside className="bg-white dark:bg-[#1E1E1E] border h-fit border-gray-200 dark:border-gray-700 p-6 rounded-2xl shadow-md transition-colors duration-500 ease-in-out">
          <h3 className="text-xl font-semibold text-[#D33454] dark:text-[#FF5C7A] mb-4 transition-colors duration-500 ease-in-out">
            Filter Biodatas
          </h3>

          {/* Age Filter */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-[#B72B48] dark:text-[#FF7A92] font-medium transition-colors duration-500 ease-in-out">
              Age Range
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Min"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D33454] dark:focus:ring-[#FF5C7A] transition-colors duration-500 ease-in-out"
              />
              <span className="text-[#B72B48] dark:text-[#FF7A92]">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D33454] dark:focus:ring-[#FF5C7A] transition-colors duration-500 ease-in-out"
              />
            </div>
          </div>

          {/* Biodata Type Filter */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-[#B72B48] dark:text-[#FF7A92] font-medium transition-colors duration-500 ease-in-out">
              Biodata Type
            </label>
            <select
              value={biodataType}
              onChange={(e) => setBiodataType(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D33454] dark:focus:ring-[#FF5C7A] transition-colors duration-500 ease-in-out cursor-pointer"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Division Filter */}
          <div>
            <label className="block mb-2 text-sm text-[#B72B48] dark:text-[#FF7A92] font-medium transition-colors duration-500 ease-in-out">
              Division
            </label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-[#2A2A2A] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#D33454] dark:focus:ring-[#FF5C7A] transition-colors duration-500 ease-in-out cursor-pointer"
            >
              <option value="">All</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattagram">Chattagram</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Barisal">Barisal</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Sylhet">Sylhet</option>
            </select>
          </div>
        </aside>

        {/* Biodata Display Section */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentItems.length > 0 ? (
            currentItems.map((user, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md flex flex-col items-center hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-2 border-[#E3D4B4] dark:border-[#3A3A3A] mb-4 transition-colors duration-500 ease-in-out"
                />
                <div className="text-center w-full text-gray-600 dark:text-gray-300 transition-colors duration-500 ease-in-out">
                  <p className="text-sm mb-1">
                    <span className="font-semibold text-[#B72B48] dark:text-[#FF5C7A]">
                      Biodata ID:
                    </span>{" "}
                    {user.biodataID}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold text-[#B72B48] dark:text-[#FF5C7A]">
                      Type:
                    </span>{" "}
                    {user.type}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold text-[#B72B48] dark:text-[#FF5C7A]">
                      Division:
                    </span>{" "}
                    {user.permanentDivision}
                  </p>
                  <p className="text-sm mb-1">
                    <span className="font-semibold text-[#B72B48] dark:text-[#FF5C7A]">
                      Age:
                    </span>{" "}
                    {user.age}
                  </p>
                  <p className="text-sm mb-4">
                    <span className="font-semibold text-[#B72B48] dark:text-[#FF5C7A]">
                      Occupation:
                    </span>{" "}
                    {user.occupation}
                  </p>
                </div>
                <Link to={`/biodatas/${user.biodataID}`}>
                  <Button className="w-full bg-gradient-to-r from-[#D33454] to-[#B72B48] dark:from-[#FF5C7A] dark:to-[#FF7A92] text-white text-sm hover:scale-105 cursor-pointer transition-transform duration-200">
                    View Profile
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400 text-lg font-medium transition-colors duration-500 ease-in-out">
              No biodatas found with selected filters.
            </p>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center flex-wrap gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`mx-1 px-3 py-1 rounded-md transition-all duration-300 ${
              currentPage === page
                ? "bg-[#D33454] text-white border border-[#D33454]"
                : "bg-white dark:bg-[#1E1E1E] text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-[#b72b48] hover:text-white cursor-pointer dark:hover:bg-[#FF5C7A] dark:hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Biodatas;
