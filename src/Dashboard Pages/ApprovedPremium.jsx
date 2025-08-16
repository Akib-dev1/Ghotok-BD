import React from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const ApprovedPremium = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["premiumRequests"],
    queryFn: async () => {
      const response = await axios.get(
        "https://b11a12-server-side-akib-dev1.vercel.app/users/premium"
      );
      return response.data;
    },
  });

  const handleMakePremium = async (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make premium!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.patch(
          `https://b11a12-server-side-akib-dev1.vercel.app/users/${email}`,
          { isPremium: true }
        );
        if (response.data.modifiedCount > 0) {
          Swal.fire({
            title: "User is now a premium member!",
            icon: "success",
          });
          refetch();
        }
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ScaleLoader barCount={6} color="#ff1d8d" height={50} width={4} />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FFF3F5] dark:bg-[#121212] py-12 px-4 transition-colors duration-500">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto bg-white dark:bg-[#1F1F1F] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-10 transition-colors duration-500">
        <h2 className="text-4xl font-bold text-[#D33454] dark:text-[#FF5C7A] mb-10 text-center great-vibes">
          Premium Approval Requests
        </h2>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto border-collapse text-gray-700 dark:text-gray-300 transition-colors duration-500">
            <thead className="bg-[#D33454] dark:bg-[#B73A5D] text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Biodata ID</th>
                <th className="px-4 py-2 text-center">Make Premium</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b dark:border-gray-700 hover:bg-[#fdf1f2] dark:hover:bg-[#2A1B1B] transition-colors duration-300"
                  >
                    <td className="px-4 py-3">{user.displayName}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.biodataID}</td>
                    <td className="px-4 py-3 text-center">
                      {user.isPremium ? (
                        <span className="text-yellow-600 font-semibold">
                          Premium
                        </span>
                      ) : (
                        <Button
                          className="bg-[#E3D4B4] hover:bg-[#cbb88f] text-[#5A3B3B] text-sm cursor-pointer transition duration-300"
                          onClick={() => handleMakePremium(user.email)}
                        >
                          Make Premium
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-gray-500 dark:text-gray-400 italic"
                  >
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
