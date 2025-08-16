import { AuthContext } from "@/Contexts/AuthProvidor";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use } from "react";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const MyContactRequest = () => {
  const { user } = use(AuthContext);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: async () => {
      const response = await axios.get(
        "https://b11a12-server-side-akib-dev1.vercel.app/biodata/contact/requests"
      );
      return response.data;
    },
  });

  const finalData = data?.filter((req) => req.email === user?.email);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the request from your history.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#D33454",
      cancelButtonColor: "#999",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://b11a12-server-side-akib-dev1.vercel.app/biodata/contact/requests/${id}`
          )
          .then((response) => {
            if (response.data.deletedCount > 0) {
              Swal.fire({
                title: "Request Removed!",
                icon: "success",
              });
              refetch();
            }
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
    <section className="min-h-screen bg-[#FFF3F5] dark:bg-[#121212] py-12 px-4 transition-colors duration-500">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto bg-white dark:bg-[#1F1F1F] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-10 transition-colors duration-500">
        <h2 className="text-3xl font-bold text-center text-[#D33454] dark:text-[#FF5C7A] mb-8">
          My Contact Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-gray-300 dark:border-gray-600 text-center">
            <thead className="bg-[#D33454] dark:bg-[#FF5C7A] text-white font-semibold">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Biodata ID</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Mobile No</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-200 font-[Poppins]">
              {finalData?.map((req, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#fdf1f2] dark:hover:bg-[#2A2A2A] border-b dark:border-gray-700 transition-colors duration-300"
                >
                  <td className="px-4 py-3">{req.biodataName}</td>
                  <td className="px-4 py-3">{req.biodataID}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 capitalize text-xs font-semibold text-white rounded ${
                        req.status === "approved"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {req.status === "approved" ? req.biodataMobile : "--"}
                  </td>
                  <td className="px-4 py-3">
                    {req.status === "approved" ? req.biodataEmail : "--"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(req.biodataID)}
                      className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors duration-300 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {finalData?.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-gray-500 dark:text-gray-400 italic"
                  >
                    You have no contact requests yet.
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

export default MyContactRequest;
