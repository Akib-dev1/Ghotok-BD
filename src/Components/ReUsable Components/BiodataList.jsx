import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";
import { ScaleLoader } from "react-spinners";

const BiodataList = () => {
  const [sortOrder, setSortOrder] = useState("ascending");

  const { data: biodatas, isLoading } = useQuery({
    queryKey: ["biodatas"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/biodata");
      return response.data;
    },
  });

  const { data: users, isLoading: isUsersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/users");
      return response.data;
    },
  });

  const premiumBiodataIDs = users
    ?.filter((user) => user.isPremium && user?.biodataID)
    .map((user) => user.biodataID);

  const biodatasWithPremium = biodatas
    ?.filter((biodata) => premiumBiodataIDs?.includes(biodata.biodataID))
    ?.sort((a, b) =>
      sortOrder === "ascending" ? a.age - b.age : b.age - a.age
    );

  if (isLoading || isUsersLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ScaleLoader barCount={6} color="#ff1d8d" height={50} width={4} />
      </div>
    );
  }

  return (
    <div className="max-w-9/12 mx-auto my-10 max-lg:max-w-10/12 max-md:max-w-11/12">
      <h1 className="text-4xl font-bold great-vibes text-[#D33454] mb-6 capitalize">
        Premium Biodatas
      </h1>

      {/* Sort dropdown */}
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2 font-medium">
          Sort by Age:
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {biodatasWithPremium?.slice(0, 6).map((biodata) => (
          <div
            key={biodata.biodataID}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow w-full max-w-sm mx-auto"
          >
            <img
              src={biodata.profileImage}
              alt="Profile"
              className="w-full max-h-56 object-cover"
            />
            <div className="p-5 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span className="font-medium">
                  Biodata ID:{" "}
                  <span className="text-black">{biodata.biodataID}</span>
                </span>
                <span className="bg-[#D33454] text-white px-2 py-0.5 rounded-full text-xs">
                  {biodata.type}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-gray-800">
                {biodata.permanentDivision}
              </h2>

              <div className="text-sm text-gray-600 space-y-1">
                <p>Age: {biodata.age}</p>
                <p>Occupation: {biodata.occupation}</p>
              </div>

              <Link to={`/biodatas/${biodata.biodataID}`}>
                <button className="mt-3 w-full bg-[#D33454] cursor-pointer hover:bg-[#B02A3D] text-white py-2 rounded-xl text-sm font-medium transition">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiodataList;
