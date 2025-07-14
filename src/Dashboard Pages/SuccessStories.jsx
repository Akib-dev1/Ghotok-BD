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
        "http://localhost:5000/biodata/success-stories"
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
    <section className="min-h-screen bg-[#FFF3F5] py-6 md:py-12">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-[#D33454] mb-6 text-center">
          Success Story List
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left border rounded-md">
            <thead className="bg-[#D33454] text-white">
              <tr>
                <th className="px-4 py-3">Male Biodata ID</th>
                <th className="px-4 py-3">Female Biodata ID</th>
                <th className="px-4 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {data?.map((story) => (
                <tr
                  key={story._id}
                  className="border-b hover:bg-pink-50 transition duration-200"
                >
                  <td className="px-4 py-3">{story.maleId}</td>
                  <td className="px-4 py-3">{story.femaleId}</td>
                  <td className="px-4 py-3 text-center">
                    <Button
                      className="bg-[#D33454] hover:bg-[#b72b48] text-white px-4 py-2 rounded-md"
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
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-[#D33454]">
                Success Story
              </DialogTitle>
            </DialogHeader>
            <p className="text-gray-700">{selectedStory?.review}</p>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default SuccessStories;
