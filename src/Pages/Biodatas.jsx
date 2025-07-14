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
      const res = await axios.get("http://localhost:5000/biodata");
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
    <section className="min-h-screen bg-[#FFF3F5] py-12 px-4 flex flex-col justify-between">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Filter Section */}
        <aside className="bg-white border border-gray-200 p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-[#D33454] mb-4">
            Filter Biodatas
          </h3>

          {/* Age Filter */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-[#B72B48] font-medium">
              Age Range
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="Min"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              />
              <span className="text-[#B72B48]">-</span>
              <input
                type="number"
                placeholder="Max"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Biodata Type Filter */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-[#B72B48] font-medium">
              Biodata Type
            </label>
            <select
              value={biodataType}
              onChange={(e) => setBiodataType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Division Filter */}
          <div>
            <label className="block mb-2 text-sm text-[#B72B48] font-medium">
              Division
            </label>
            <select
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
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
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-md flex flex-col items-center hover:shadow-lg transition"
              >
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border-2 border-[#E3D4B4] mb-4"
                />
                <div className="text-center w-full">
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold text-[#B72B48]">
                      Biodata ID:
                    </span>{" "}
                    {user.biodataID}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold text-[#B72B48]">Type:</span>{" "}
                    {user.type}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold text-[#B72B48]">
                      Division:
                    </span>{" "}
                    {user.permanentDivision}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold text-[#B72B48]">Age:</span>{" "}
                    {user.age}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold text-[#B72B48]">
                      Occupation:
                    </span>{" "}
                    {user.occupation}
                  </p>
                </div>
                <Link to={`/biodatas/${user.biodataID}`}>
                  <Button className="bg-[#D33454] hover:bg-[#b72b48] text-white text-sm w-full cursor-pointer">
                    View Profile
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg font-medium">
              No biodatas found with selected filters.
            </p>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`mx-1 px-3 py-1 border rounded-md transition ${
              currentPage === page
                ? "bg-[#D33454] text-white border-[#D33454]"
                : "bg-white text-gray-700 border-gray-300 hover:bg-[#b72b48] hover:text-white"
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
