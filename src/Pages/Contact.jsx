import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaPhone, FaWhatsapp, FaInfoCircle } from "react-icons/fa";
import ContactInfoItem from "@/Components/ReUsable Components/ContactInfoItem";

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    console.log("Contact form data:", data);
    reset();
  };

  return (
    <section className="min-h-screen bg-[#FFF3F5] py-16 px-4 font-poppins flex items-center justify-center">
      <div className="w-full max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex flex-col lg:flex-row gap-12 lg:gap-16">
        <div className="flex flex-col flex-grow min-w-0">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#D33454] great-vibes mb-4 sm:mb-6">
            Contact <span className="text-[#B72B48]">GhotokBD</span>
          </h1>
          <p className="text-gray-600 prociono text-base sm:text-lg max-w-md mb-8">
            We’re here to assist you. Reach out anytime via email, phone, or
            WhatsApp — our dedicated team at GhotokBD is always ready to help
            you find your perfect match.
          </p>

          <div className="bg-[#D33454]/10 rounded-lg p-6 shadow-inner space-y-6 sm:space-y-8">
            <ContactInfoItem
              icon={<FaEnvelope size={30} className="text-[#D33454]" />}
              label="Email"
              value="akibanj2017@gmail.com"
              href="mailto:akibanj2017@gmail.com"
            />
            <ContactInfoItem
              icon={<FaPhone size={30} className="text-[#D33454]" />}
              label="Phone"
              value="+8801985326982"
              href="tel:+8801985326982"
            />
            <ContactInfoItem
              icon={<FaWhatsapp size={30} className="text-[#D33454]" />}
              label="WhatsApp"
              value="Chat on WhatsApp"
              href="https://wa.me/8801985326982"
            />
          </div>

          <div className="mt-10 sm:mt-12 flex items-start gap-4 bg-[#E3D4B4] rounded-lg p-5 shadow-md max-w-md">
            <FaInfoCircle className="text-[#B72B48] text-3xl mt-1" />
            <p className="text-[#5A3B3B] prociono text-sm sm:text-base">
              Need help with your account or want to know more about our
              services? Contact us and we’ll guide you step by step.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5 sm:space-y-6 flex-grow min-w-0"
          noValidate
        >
          <div>
            <Label
              htmlFor="name"
              className="text-[#D33454] mb-1 block font-semibold text-sm sm:text-base"
            >
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
              className="focus-visible:ring-[#D33454]"
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="text-[#D33454] mb-1 block font-semibold text-sm sm:text-base"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
              className="focus-visible:ring-[#D33454]"
            />
          </div>

          <div>
            <Label
              htmlFor="message"
              className="text-[#D33454] mb-1 block font-semibold text-sm sm:text-base"
            >
              Your Message
            </Label>
            <Textarea
              id="message"
              rows="5"
              placeholder="Write your message here..."
              {...register("message", { required: true })}
              className="focus-visible:ring-[#D33454]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#D33454] hover:bg-[#b72b48] text-white text-lg cursor-pointer font-semibold py-3 px-6 rounded-lg duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D33454] focus:ring-opacity-50 ease-out"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
