import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { ScaleLoader } from "react-spinners";

const SuccessStory = () => {
  const { data: successStories, isLoading } = useQuery({
    queryKey: ["success-stories"],
    queryFn: async () => {
      const res = await axios.get(
        "https://b11a12-server-side-akib-dev1.vercel.app/biodata/success-stories"
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
    <section className="py-12 transition-colors duration-500 ease-in-out">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:w-11/12 mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#D33454] dark:text-[#FF5C7A] great-vibes mb-10 transition-colors duration-500 ease-in-out">
          Success Stories
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {successStories
            .sort((a, b) => new Date(b.marriageDate) - new Date(a.marriageDate)) // descending
            .map((story) => (
              <div
                key={story._id}
                className="bg-white dark:bg-[#2A2A2A] p-6 rounded-2xl shadow-md hover:shadow-lg space-y-3 transition-colors duration-500 ease-in-out"
              >
                <img
                  src={story.imageFile}
                  alt="Couple"
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 transition-colors duration-500 ease-in-out">
                  Marriage Date: {story.marriageDate}
                </p>
                <p className="text-yellow-500 text-sm mb-2">
                  {"★".repeat(story.rating) + "☆".repeat(5 - story.rating)}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-500 ease-in-out">
                  {story.review}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStory;
