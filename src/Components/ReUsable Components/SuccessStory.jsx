import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { ScaleLoader } from "react-spinners";

const SuccessStory = () => {
  const { data: successStories, isLoading } = useQuery({
    queryKey: ["success-stories"],
    queryFn: async () => {
      const res = await axios.get(
        "http://localhost:5000/biodata/success-stories"
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ScaleLoader barCount={6} color="#ff1d8d" height={50} width={4} />
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:w-11/12 mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#D33454] great-vibes mb-10">
          Success Stories
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {successStories
            .sort((a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)) // descending
            .map((story) => (
              <div key={story._id} className="bg-white p-4 rounded-lg shadow">
                <img
                  src={story.imageFile}
                  alt="Couple"
                  className="w-full h-48 object-cover rounded mb-4"
                />
                <p className="text-sm text-gray-600 mb-1">
                  Marriage Date: {story.marriageDate}
                </p>
                <p className="text-sm text-yellow-500 mb-2">
                  {"★".repeat(story.rating) + "☆".repeat(5 - story.rating)}
                </p>
                <p className="text-gray-700 text-sm">{story.review}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStory;
