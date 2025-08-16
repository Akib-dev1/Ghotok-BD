import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ScaleLoader } from "react-spinners";

const SuccessStories = () => {
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["successStories"],
    queryFn: async () => {
      const response = await axios.get(
        "https://b11a12-server-side-akib-dev1.vercel.app/biodata/success-stories"
      );
      return response.data;
    },
  });

  const handleOpen = (story) => {
    setSelectedStory(story);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ScaleLoader barCount={6} color="#ff1d8d" height={50} width={4} />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FFF3F5] dark:bg-[#121212] py-6 md:py-12 transition-colors duration-500">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto bg-white dark:bg-[#1F1F1F] shadow-lg rounded-xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
        <h2 className="text-3xl font-bold text-[#D33454] dark:text-[#FF5C7A] mb-6 text-center">
          Success Story List
        </h2>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-left border border-gray-300 dark:border-gray-600 rounded-md transition-colors duration-500">
            <thead className="bg-[#D33454] dark:bg-[#FF5C7A] text-white font-semibold">
              <tr>
                <th className="px-4 py-3">Male Biodata ID</th>
                <th className="px-4 py-3">Female Biodata ID</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-200 font-[Poppins]">
              {data?.map((story) => (
                <tr
                  key={story._id}
                  className="border-b dark:border-gray-700 hover:bg-pink-50 dark:hover:bg-[#2A2A2A] transition-colors duration-300"
                >
                  <td className="px-4 py-3">{story.maleId}</td>
                  <td className="px-4 py-3">{story.femaleId}</td>
                  <td className="px-4 py-3 text-center">
                    <Button
                      className="bg-[#D33454] dark:bg-[#FF5C7A] hover:bg-[#b72b48] dark:hover:bg-[#FF3F70] text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300"
                      onClick={() => handleOpen(story)}
                    >
                      View Story
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal (View Story) */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md bg-white dark:bg-[#1F1F1F] border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg transition-colors duration-500 p-6">
            <DialogHeader>
              <DialogTitle className="text-[#D33454] dark:text-[#FF5C7A]">
                Success Story
              </DialogTitle>
            </DialogHeader>
            <p className="text-gray-700 dark:text-gray-200 mt-2">
              {selectedStory?.review}
            </p>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default SuccessStories;
