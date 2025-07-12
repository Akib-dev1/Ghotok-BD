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
        "http://localhost:5000/biodata/favorite"
      );
      return response.data;
    },
  });

  const favourites = data?.filter((item) => item.email === user?.email);

  const handleDelete = (id) => {
    console.log("Delete biodata with id:", id);
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
          `http://localhost:5000/biodata/favorite/${id}`
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
      <div className="flex justify-center items-center h-full">
        <ScaleLoader barCount={6} color="#ff1d8d" height={50} width={4} />
      </div>
    );
  }

  return (
    <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto py-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        My Favourite Biodatas
      </h1>
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Biodata ID</th>
              <th className="px-4 py-3 border">Permanent Address</th>
              <th className="px-4 py-3 border">Occupation</th>
              <th className="px-4 py-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {favourites.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-3 border">{item.name}</td>
                <td className="px-4 py-3 border">{item.biodataID}</td>
                <td className="px-4 py-3 border">{item.permanentAddress}</td>
                <td className="px-4 py-3 border">{item.occupation}</td>
                <td className="px-4 py-3 border text-center">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md flex items-center justify-center gap-2 text-sm"
                  >
                    <FaTrashAlt className="text-white" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {favourites.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No favourite biodatas found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FavouriteBiodata;
