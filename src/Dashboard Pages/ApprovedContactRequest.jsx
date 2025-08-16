import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const ApprovedContactRequest = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: async () => {
      const response = await axios.get(
        "https://b11a12-server-side-akib-dev1.vercel.app/biodata/contact"
      );
      return response.data;
    },
  });

  const handleApprove = (id, bioID) => {
    const query = { id: id, biodataID: bioID };
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://b11a12-server-side-akib-dev1.vercel.app/biodata/contact`,
            query
          )
          .then(() => {
            Swal.fire({
              title: "Request Approved!",
              icon: "success",
            });
            refetch();
          });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF3F5]">
        <ScaleLoader barCount={6} color="#D33454" height={50} width={4} />
      </div>
    );
  }

  return (
    <section className="bg-[#FFF3F5] dark:bg-[#121212] min-h-screen py-10 transition-colors duration-500">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:w-11/12 mx-auto">
        <div className="bg-white dark:bg-[#1F1F1F] p-8 rounded-2xl shadow-lg border border-pink-100 dark:border-gray-700 transition-colors duration-500">
          <h2 className="text-3xl font-bold text-center text-[#D33454] dark:text-[#FF5C7A] mb-8 great-vibes">
            All Contact Requests
          </h2>

          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-sm border border-gray-300 dark:border-gray-600 text-center transition-colors duration-500">
              <thead className="bg-pink-100 dark:bg-pink-900 text-[#D33454] dark:text-[#FF5C7A] font-semibold">
                <tr>
                  <th className="px-4 py-3 border">Name</th>
                  <th className="px-4 py-3 border">Email</th>
                  <th className="px-4 py-3 border">Biodata ID</th>
                  <th className="px-4 py-3 border">Approval</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300 font-[Poppins]">
                {data.length > 0 ? (
                  data.map((req) => (
                    <tr
                      key={req._id}
                      className="hover:bg-pink-50 dark:hover:bg-pink-900 transition-colors duration-300"
                    >
                      <td className="px-4 py-3 border">{req.requestedBy}</td>
                      <td className="px-4 py-3 border">{req.email}</td>
                      <td className="px-4 py-3 border">{req.biodataID}</td>
                      <td className="px-4 py-3 border">
                        {req.status === "approved" ? (
                          <span className="text-green-600 font-medium">
                            ✔ Approved
                          </span>
                        ) : (
                          <button
                            onClick={() =>
                              handleApprove(req._id, req.biodataID)
                            }
                            className="bg-[#D33454] hover:bg-[#b82c46] text-white text-sm px-4 py-2 rounded-lg transition duration-300 cursor-pointer"
                          >
                            Approve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-6 text-gray-500 dark:text-gray-400 italic"
                    >
                      No contact requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApprovedContactRequest;
