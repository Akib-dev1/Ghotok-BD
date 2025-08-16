import React, { use } from "react";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { AuthContext } from "@/Contexts/AuthProvidor";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { ScaleLoader } from "react-spinners";

const EditBiodata = () => {
  const { user } = use(AuthContext);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["biodata", user?.email],
    queryFn: async () => {
      const response = await axios.get(
        `https://b11a12-server-side-akib-dev1.vercel.app/biodata/${user?.email}`
      );
      return response.data;
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = data.profileImage[0];
    const imageData = new FormData();
    imageData.append("image", imageFile);
    const imgData = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imbbApiKey}`,
      imageData
    );
    const imageURL = imgData.data.data.url;
    data.email = user?.email;
    const biodata = {
      ...data,
      profileImage: imageURL,
    };
    const response = await axios.put(
      "https://b11a12-server-side-akib-dev1.vercel.app/biodata",
      biodata
    );
    if (response.data.upsertedCount > 0) {
      refetch();
      Swal.fire({
        title: "Biodata Added Successfully",
        icon: "success",
      });
    } else if (response.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        title: "Biodata Updated Successfully",
        icon: "success",
      });
    }
  };
  const renderError = (field) =>
    errors[field] && (
      <span className="text-red-500 text-sm mt-1">This field is required</span>
    );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <ScaleLoader barCount={6} color="#ff1d8d" height={50} width={4} />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#FFF3F5] dark:bg-[#121212] py-4 md:py-12 transition-colors duration-500">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto bg-white dark:bg-[#1F1F1F] shadow-lg rounded-xl p-10 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
        <h2 className="text-4xl font-bold text-[#D33454] dark:text-[#FF5C7A] mb-6 text-center">
          Edit Your Biodata
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Common function to generate input/select field */}
          {[
            {
              label: "Biodata Type",
              type: "select",
              name: "type",
              options: ["Male", "Female"],
              defaultValue: data?.type,
            },
            {
              label: "Full Name",
              type: "text",
              name: "name",
              defaultValue: data?.name,
              placeholder: "Your full name",
            },
            { label: "Profile Image", type: "file", name: "profileImage" },
            {
              label: "Date of Birth",
              type: "date",
              name: "dob",
              defaultValue: data?.dob,
            },
            {
              label: "Height",
              type: "select",
              name: "height",
              options: [
                "4ft 10in",
                "5ft 0in",
                "5ft 2in",
                "5ft 4in",
                "5ft 6in",
                "5ft 8in",
                "6ft 0in",
              ],
              defaultValue: data?.height,
            },
            {
              label: "Weight",
              type: "select",
              name: "weight",
              options: [
                "40kg",
                "45kg",
                "50kg",
                "55kg",
                "60kg",
                "65kg",
                "70kg+",
              ],
              defaultValue: data?.weight,
            },
            {
              label: "Age",
              type: "number",
              name: "age",
              defaultValue: data?.age,
            },
            {
              label: "Occupation",
              type: "select",
              name: "occupation",
              options: [
                "Student",
                "Engineer",
                "Doctor",
                "Teacher",
                "Business",
                "Other",
              ],
              defaultValue: data?.occupation,
            },
            {
              label: "Race",
              type: "select",
              name: "race",
              options: ["Fair", "Medium", "Dark"],
              defaultValue: data?.race,
            },
            {
              label: "Father's Name",
              type: "text",
              name: "father",
              defaultValue: data?.father,
            },
            {
              label: "Mother's Name",
              type: "text",
              name: "mother",
              defaultValue: data?.mother,
            },
            {
              label: "Permanent Division",
              type: "select",
              name: "permanentDivision",
              options: [
                "Dhaka",
                "Chattagram",
                "Rangpur",
                "Barisal",
                "Khulna",
                "Mymensingh",
                "Sylhet",
              ],
              defaultValue: data?.permanentDivision,
            },
            {
              label: "Present Division",
              type: "select",
              name: "presentDivision",
              options: [
                "Dhaka",
                "Chattagram",
                "Rangpur",
                "Barisal",
                "Khulna",
                "Mymensingh",
                "Sylhet",
              ],
              defaultValue: data?.presentDivision,
            },
            {
              label: "Expected Partner Age",
              type: "number",
              name: "partnerAge",
              defaultValue: data?.partnerAge,
            },
            {
              label: "Expected Partner Height",
              type: "select",
              name: "partnerHeight",
              options: [
                "4ft 10in",
                "5ft 0in",
                "5ft 2in",
                "5ft 4in",
                "5ft 6in",
                "5ft 8in",
                "6ft 0in",
              ],
              defaultValue: data?.partnerHeight,
            },
            {
              label: "Expected Partner Weight",
              type: "select",
              name: "partnerWeight",
              options: [
                "40kg",
                "45kg",
                "50kg",
                "55kg",
                "60kg",
                "65kg",
                "70kg+",
              ],
              defaultValue: data?.partnerWeight,
            },
            {
              label: "Email",
              type: "text",
              name: "email",
              defaultValue: user?.email,
              readOnly: true,
            },
            {
              label: "Mobile Number",
              type: "tel",
              name: "mobile",
              defaultValue: data?.mobile,
            },
          ].map((field, idx) => (
            <div className="flex flex-col" key={idx}>
              <Label className="text-[#D33454] dark:text-[#FF5C7A] mb-1">
                {field.label}
              </Label>

              {field.type === "select" ? (
                <select
                  {...register(field.name, { required: !field.readOnly })}
                  className="border border-gray-300 dark:border-gray-600 dark:bg-[#2A2A2A] dark:text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D33454] dark:focus:ring-[#FF5C7A] transition-colors duration-300"
                  defaultValue={field.defaultValue || ""}
                  disabled={field.readOnly}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  {...register(field.name, { required: !field.readOnly })}
                  type={field.type}
                  placeholder={field.placeholder || ""}
                  defaultValue={field.defaultValue}
                  readOnly={field.readOnly}
                  className={`border border-gray-300 dark:border-gray-600 dark:bg-[#2A2A2A] dark:text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#D33454] dark:focus:ring-[#FF5C7A] transition-colors duration-300 ${
                    field.readOnly
                      ? "bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                      : ""
                  }`}
                />
              )}
              {renderError(field.name)}
            </div>
          ))}

          {/* Submit Button */}
          <div className="md:col-span-2 text-right">
            <Button
              type="submit"
              className="bg-[#D33454] dark:bg-[#FF5C7A] hover:bg-[#b72b48] dark:hover:bg-[#FF3F70] text-white max-lg:w-full text-lg px-6 py-3 rounded-md cursor-pointer transition-colors duration-300"
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
