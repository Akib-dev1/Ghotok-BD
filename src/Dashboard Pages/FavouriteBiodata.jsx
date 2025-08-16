import { AuthContext } from "@/Contexts/AuthProvidor";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ScaleLoader } from "react-spinners";
import Swal from "sweetalert2";

const FavouriteBiodata = () => {
  const { user } = use(AuthContext);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Favourite Biodata"],
    queryFn: async () => {
      const response = await axios.get(
        "https://b11a12-server-side-akib-dev1.vercel.app/biodata/favorite"
      );
      return response.data;
    },
  });

  const favourites = data?.filter((item) => item.email === user?.email);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(
          `https://b11a12-server-side-akib-dev1.vercel.app/biodata/favorite/${id}`
        );
        if (response.data.deletedCount > 0) {
          Swal.fire({
            title: "Biodata deleted successfully!",
            icon: "success",
          });
          refetch();
        }
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
        <h1 className="text-3xl font-bold mb-8 text-center text-[#D33454] dark:text-[#FF5C7A]">
          My Favourite Biodatas
        </h1>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm border border-gray-300 dark:border-gray-600 text-center">
            <thead className="bg-[#D33454] dark:bg-[#FF5C7A] text-white font-semibold">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Biodata ID</th>
                <th className="px-4 py-3">Permanent Address</th>
                <th className="px-4 py-3">Occupation</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody className="text-gray-700 dark:text-gray-200 font-[Poppins]">
              {favourites.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-[#fdf1f2] dark:hover:bg-[#2A2A2A] border-b dark:border-gray-700 transition-colors duration-300"
                >
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.biodataID}</td>
                  <td className="px-4 py-3">{item.permanentAddress}</td>
                  <td className="px-4 py-3">{item.occupation}</td>
                  <td className="px-4 py-3 flex justify-center">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-3 py-1 rounded text-xs flex items-center cursor-pointer justify-center gap-2 transition-colors duration-300"
                    >
                      <FaTrashAlt className="text-white text-sm" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {favourites.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="py-6 text-gray-500 dark:text-gray-400 italic"
                  >
                    No favourite biodatas found.
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

export default FavouriteBiodata;
