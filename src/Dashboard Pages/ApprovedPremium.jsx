import React from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const demoRequests = [
  {
    _id: "bd123",
    name: "Akib Rahman",
    email: "akibanj2017@gmail.com",
    biodataID: "B-1021",
  },
  {
    _id: "bd456",
    name: "Sarah Islam",
    email: "sarah@example.com",
    biodataID: "B-1045",
  },
];

const ApprovedPremium = () => {
  return (
    <section className="min-h-screen bg-[#FFF3F5] py-12 px-4 font-poppins">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:w-11/12 mx-auto bg-white rounded-xl shadow-xl border border-gray-200 p-10">
        <h2 className="text-4xl font-bold text-[#D33454] mb-10 text-center great-vibes">
          Premium Approval Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-[#D33454] text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Biodata ID</th>
                <th className="px-4 py-2 text-center">Make Premium</th>
              </tr>
            </thead>
            <tbody>
              {demoRequests?.map((user) => (
                <tr key={user._id} className="border-b hover:bg-[#fdf1f2]">
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3">{user.biodataID}</td>
                  <td className="px-4 py-3 text-center">
                    <Button
                      className="bg-[#E3D4B4] hover:bg-[#cbb88f] text-[#5A3B3B] text-sm"
                      onClick={() => console.log("Make Premium:", user._id)}
                    >
                      Make Premium
                    </Button>
                  </td>
                </tr>
              ))}
              {demoRequests?.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">
                    No premium requests available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ApprovedPremium;
