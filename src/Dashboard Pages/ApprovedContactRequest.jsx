import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const ApprovedContactRequest = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/biodata/contact");
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
        axios.patch(`http://localhost:5000/biodata/contact`, query).then(() => {
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
    <section className="bg-[#FFF3F5] min-h-screen py-10">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:w-11/12 mx-auto">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-pink-100">
          <h2 className="text-3xl font-bold text-center text-[#D33454] mb-8 great-vibes">
            All Contact Requests
          </h2>

          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-sm border border-gray-300 text-center">
              <thead className="bg-pink-100 text-[#D33454] font-semibold">
                <tr>
                  <th className="px-4 py-3 border">Name</th>
                  <th className="px-4 py-3 border">Email</th>
                  <th className="px-4 py-3 border">Biodata ID</th>
                  <th className="px-4 py-3 border">Approval</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 font-[Poppins]">
                {data.map((req) => (
                  <tr key={req._id} className="hover:bg-pink-50 transition">
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
                          onClick={() => handleApprove(req._id, req.biodataID)}
                          className="bg-[#D33454] hover:bg-[#b82c46] text-white text-sm px-4 py-2 rounded-lg transition cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {data.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-6 text-gray-500 italic">
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
