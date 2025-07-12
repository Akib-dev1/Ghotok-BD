import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";

const MyContactRequest = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/biodata/contact");
      return response.data;
    },
  });

  const handleDelete = (id) => {
    console.log(`Deleting request with ID: ${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ScaleLoader barCount={6} color="#ff1d8d" height={50} width={4} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          My Contact Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm text-center">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Biodata ID</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Mobile No</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((req) => (
                <tr key={req.id} className="border-t">
                  <td className="px-4 py-2 border">{req.biodataName}</td>
                  <td className="px-4 py-2 border">{req.biodataID}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 capitalize py-1 rounded text-white text-xs ${
                        req.status === "approved"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {req.status === "approved" ? req.biodataMobile : "--"}
                  </td>
                  <td className="px-4 py-2 border">
                    {req.status === "approved" ? req.biodataEmail : "--"}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(req.biodataID)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {data?.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-6 text-gray-500">
                    You have no contact requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyContactRequest;
