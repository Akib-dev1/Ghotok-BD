import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Swal from "sweetalert2";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const AddSuccessStories = () => {
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const image = data.imageFile[0];
    const imageData = new FormData();
    imageData.append("image", image);
    const imgData = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imbbApiKey}`,
      imageData
    );
    const imageURL = imgData.data.data.url;
    data.imageFile = imageURL;
    data.rating = rating;
    axios
      .post("http://localhost:5000/biodata/success-stories", data)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success Story Published!",
            icon: "success",
          });
          reset();
          setRating(0);
        }
      });
  };

  const renderError = (field) =>
    errors[field] && (
      <span className="text-red-500 text-sm mt-1">This field is required</span>
    );

  return (
    <section className="min-h-screen bg-[#FFF3F5] py-4 md:py-12">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto bg-white shadow-lg rounded-xl p-10 border border-gray-200">
        <h2 className="text-4xl font-bold text-[#D33454] mb-6 text-center">
          Share Your Success Story
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Self Biodata ID */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Male Biodata ID</Label>
            <Input
              {...register("maleId", { required: true })}
              placeholder="E.g. B-101"
              className="border border-gray-300"
            />
            {renderError("maleId")}
          </div>

          {/* Partner Biodata ID */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Female Biodata ID</Label>
            <Input
              {...register("femaleId", { required: true })}
              placeholder="E.g. B-202"
              className="border border-gray-300"
            />
            {renderError("femaleId")}
          </div>

          {/* Image Upload - Styled Drop Area */}
          <div className="flex flex-col md:col-span-2">
            <Label className="text-[#D33454] mb-1">Couple Image</Label>

            <label
              htmlFor="imageFile"
              className="flex flex-col items-center justify-center gap-2 px-6 py-10 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer text-gray-500 hover:border-[#D33454] hover:bg-pink-50 transition"
            >
              <svg
                className="w-10 h-10 text-[#D33454]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M7 10l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
              <span>Click to select image</span>
            </label>

            <Input
              type="file"
              id="imageFile"
              {...register("imageFile", { required: true })}
              accept="image/*"
              className="hidden"
            />
            {renderError("imageFile")}
          </div>

          {/* Review */}
          <div className="flex flex-col md:col-span-2">
            <Label className="text-[#D33454] mb-1">Your Review</Label>
            <Textarea
              {...register("review", { required: true })}
              placeholder="How was your experience using Ghotok BD?"
              className="border border-gray-300"
              rows={5}
            />
            {renderError("review")}
          </div>

          <div className="">
            <Rating
              style={{ maxWidth: 180 }}
              value={rating}
              onChange={setRating}
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 text-right">
            <Button
              type="submit"
              className="bg-[#D33454] hover:bg-[#b72b48] text-white max-lg:w-full text-lg px-6 py-3 rounded-md"
            >
              Submit Success Story
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddSuccessStories;
