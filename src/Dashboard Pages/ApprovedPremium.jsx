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
      const response = await axios.get("http://localhost:5000/users/premium");
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
          `http://localhost:5000/users/${email}`,
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
              {data?.map((user) => (
                <tr key={user._id} className="border-b hover:bg-[#fdf1f2]">
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
                        className="bg-[#E3D4B4] hover:bg-[#cbb88f] text-[#5A3B3B] text-sm cursor-pointer"
                        onClick={() => handleMakePremium(user.email)}
                      >
                        Make Premium
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {data?.length === 0 && (
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
