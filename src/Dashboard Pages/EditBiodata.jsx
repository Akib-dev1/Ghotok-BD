import React from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const EditBiodata = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Biodata submitted:", data);
    const imageFile = data.profileImage[0];
    const imageData = new FormData();
    imageData.append("image", imageFile);
    const imgData = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imbbApiKey}`,
      imageData
    );
    const imageURL = imgData.data.data.url;
    const biodata = {
      ...data,
      profileImage: imageURL,
    };
    console.log("Biodata with image URL:", biodata);
  };

  const renderError = (field) =>
    errors[field] && (
      <span className="text-red-500 text-sm mt-1">This field is required</span>
    );

  return (
    <section className="min-h-screen bg-[#FFF3F5] py-4 md:py-12">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:w-11/12 mx-auto bg-white shadow-lg rounded-xl p-10 border border-gray-200">
        <h2 className="text-4xl font-bold text-[#D33454] mb-6 text-center">
          Edit Your Biodata
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Biodata Type */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Biodata Type</Label>
            <select
              {...register("type", { required: true })}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Type</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {renderError("type")}
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Full Name</Label>
            <Input
              {...register("name", { required: true })}
              placeholder="Your full name"
              className="border border-gray-300"
            />
            {renderError("name")}
          </div>

          {/* Profile Image */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Profile Image</Label>
            <Input
              type="file"
              {...register("profileImage", { required: true })}
              className="border border-gray-300"
            />
            {renderError("profileImage")}
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Date of Birth</Label>
            <Input
              type="date"
              {...register("dob", { required: true })}
              className="border border-gray-300"
            />
            {renderError("dob")}
          </div>

          {/* Height */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Height</Label>
            <select
              {...register("height", { required: true })}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Height</option>
              <option value="4ft 10in">4'10"</option>
              <option value="5ft 0in">5'0"</option>
              <option value="5ft 2in">5'2"</option>
              <option value="5ft 4in">5'4"</option>
              <option value="5ft 6in">5'6"</option>
              <option value="5ft 8in">5'8"</option>
              <option value="6ft 0in">6'0"</option>
            </select>
            {renderError("height")}
          </div>

          {/* Weight */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Weight</Label>
            <select
              {...register("weight", { required: true })}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Weight</option>
              <option value="40kg">40kg</option>
              <option value="45kg">45kg</option>
              <option value="50kg">50kg</option>
              <option value="55kg">55kg</option>
              <option value="60kg">60kg</option>
              <option value="65kg">65kg</option>
              <option value="70kg+">70kg+</option>
            </select>
            {renderError("weight")}
          </div>

          {/* Age */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Age</Label>
            <Input
              type="number"
              {...register("age", { required: true })}
              className="border border-gray-300"
            />
            {renderError("age")}
          </div>

          {/* Occupation */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Occupation</Label>
            <select
              {...register("occupation", { required: true })}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Occupation</option>
              <option value="Student">Student</option>
              <option value="Engineer">Engineer</option>
              <option value="Doctor">Doctor</option>
              <option value="Teacher">Teacher</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
            {renderError("occupation")}
          </div>

          {/* Race */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Race</Label>
            <select
              {...register("race", { required: true })}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Race</option>
              <option value="Fair">Fair</option>
              <option value="Medium">Medium</option>
              <option value="Dark">Dark</option>
            </select>
            {renderError("race")}
          </div>

          {/* Father */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Father's Name</Label>
            <Input
              {...register("father", { required: true })}
              className="border border-gray-300"
            />
            {renderError("father")}
          </div>

          {/* Mother */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Mother's Name</Label>
            <Input
              {...register("mother", { required: true })}
              className="border border-gray-300"
            />
            {renderError("mother")}
          </div>

          {/* Permanent Division */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Permanent Division</Label>
            <select
              {...register("permanentDivision", { required: true })}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Division</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattagra">Chattagra</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Barisal">Barisal</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Sylhet">Sylhet</option>
            </select>
            {renderError("permanentDivision")}
          </div>

          {/* Present Division */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Present Division</Label>
            <select
              {...register("presentDivision", { required: true })}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Division</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattagra">Chattagra</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Barisal">Barisal</option>
              <option value="Khulna">Khulna</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Sylhet">Sylhet</option>
            </select>
            {renderError("presentDivision")}
          </div>

          {/* Expected Partner Age */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Expected Partner Age</Label>
            <Input
              type="number"
              {...register("partnerAge", { required: true })}
              className="border border-gray-300"
            />
            {renderError("partnerAge")}
          </div>

          {/* Expected Partner Height */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">
              Expected Partner Height
            </Label>
            <select
              {...register("partnerHeight", { required: true })}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Height</option>
              <option value="4ft 10in">4'10"</option>
              <option value="5ft 0in">5'0"</option>
              <option value="5ft 2in">5'2"</option>
              <option value="5ft 4in">5'4"</option>
              <option value="5ft 6in">5'6"</option>
              <option value="5ft 8in">5'8"</option>
              <option value="6ft 0in">6'0"</option>
            </select>
            {renderError("partnerHeight")}
          </div>

          {/* Expected Partner Weight */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">
              Expected Partner Weight
            </Label>
            <select
              {...register("partnerWeight", { required: true })}
              className="border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select Weight</option>
              <option value="40kg">40kg</option>
              <option value="45kg">45kg</option>
              <option value="50kg">50kg</option>
              <option value="55kg">55kg</option>
              <option value="60kg">60kg</option>
              <option value="65kg">65kg</option>
              <option value="70kg+">70kg+</option>
            </select>
            {renderError("partnerWeight")}
          </div>

          {/* Contact Email (Readonly) */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Email</Label>
            <Input
              {...register("email")}
              defaultValue="user@example.com"
              readOnly
              className="border border-gray-300 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Mobile Number */}
          <div className="flex flex-col">
            <Label className="text-[#D33454] mb-1">Mobile Number</Label>
            <Input
              type="tel"
              {...register("mobile", { required: true })}
              className="border border-gray-300"
            />
            {renderError("mobile")}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-right">
            <Button
              type="submit"
              className="bg-[#D33454] hover:bg-[#b72b48] text-white max-lg:w-full text-lg px-6 py-3 rounded-md"
            >
              Save And Publish Now
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditBiodata;
