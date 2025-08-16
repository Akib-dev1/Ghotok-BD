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

  const onSubmit = () => {
    reset();
  };

  return (
    <section className="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 py-16 px-4 flex items-center justify-center transition-colors duration-500 ease-in-out">
      <div className="w-full max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-10 flex flex-col lg:flex-row gap-12 lg:gap-16 transition-colors duration-500 ease-in-out">
        {/* Left Info Panel */}
        <div className="flex flex-col flex-grow min-w-0 space-y-8">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-[#D33454] dark:text-[#FF5C7A] great-vibes mb-4 sm:mb-6 transition-colors duration-500 ease-in-out">
              Contact{" "}
              <span className="text-[#B72B48] dark:text-[#FF7A92]">
                GhotokBD
              </span>
            </h1>
            <p className="text-gray-700 dark:text-gray-300 prociono text-base sm:text-lg max-w-md transition-colors duration-500 ease-in-out">
              We’re here to assist you. Reach out anytime via email, phone, or
              WhatsApp — our dedicated team is always ready to help you find
              your perfect match.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6">
            <ContactInfoItem
              icon={<FaEnvelope className="text-white dark:text-[#1E1E1E]" />}
              iconBg="bg-[#D33454] dark:bg-[#FF5C7A]"
              label="Email"
              value="akibanj2017@gmail.com"
              href="mailto:akibanj2017@gmail.com"
            />
            <ContactInfoItem
              icon={<FaPhone className="text-white dark:text-[#1E1E1E]" />}
              iconBg="bg-[#D33454] dark:bg-[#FF5C7A]"
              label="Phone"
              value="+8801985326982"
              href="tel:+8801985326982"
            />
            <ContactInfoItem
              icon={<FaWhatsapp className="text-white dark:text-[#1E1E1E]" />}
              iconBg="bg-[#25D366] dark:bg-[#1B8A3E]"
              label="WhatsApp"
              value="Chat on WhatsApp"
              href="https://wa.me/8801985326982"
            />
          </div>

          <div className="flex items-start gap-4 bg-[#FFE5E8] dark:bg-[#2C1E1F] rounded-xl p-5 shadow-md max-w-md transition-colors duration-500 ease-in-out">
            <FaInfoCircle className="text-[#B72B48] dark:text-[#FF7A92] text-3xl mt-1" />
            <p className="text-[#5A3B3B] dark:text-gray-300 prociono text-sm sm:text-base transition-colors duration-500 ease-in-out">
              Need help with your account or want to know more about our
              services? Contact us and we’ll guide you step by step.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-5 sm:space-y-6 flex-grow min-w-0"
          noValidate
        >
          {/** Full Name */}
          <div>
            <Label
              htmlFor="name"
              className="text-[#D33454] dark:text-[#FF5C7A] mb-1 block font-semibold text-sm sm:text-base transition-colors duration-500 ease-in-out"
            >
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              {...register("name", { required: true })}
              className="focus-visible:ring-[#D33454] dark:focus-visible:ring-[#FF5C7A] transition-colors duration-500 ease-in-out"
            />
          </div>

          {/** Email */}
          <div>
            <Label
              htmlFor="email"
              className="text-[#D33454] dark:text-[#FF5C7A] mb-1 block font-semibold text-sm sm:text-base transition-colors duration-500 ease-in-out"
            >
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: true })}
              className="focus-visible:ring-[#D33454] dark:focus-visible:ring-[#FF5C7A] transition-colors duration-500 ease-in-out"
            />
          </div>

          {/** Message */}
          <div>
            <Label
              htmlFor="message"
              className="text-[#D33454] dark:text-[#FF5C7A] mb-1 block font-semibold text-sm sm:text-base transition-colors duration-500 ease-in-out"
            >
              Your Message
            </Label>
            <Textarea
              id="message"
              rows="5"
              placeholder="Write your message here..."
              {...register("message", { required: true })}
              className="focus-visible:ring-[#D33454] dark:focus-visible:ring-[#FF5C7A] transition-colors duration-500 ease-in-out"
            />
          </div>

          {/** Submit Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#D33454] to-[#B72B48] dark:from-[#FF5C7A] dark:to-[#FF7A92] hover:scale-105 transition-transform duration-200 text-white text-lg font-semibold py-3 px-6 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D33454] dark:focus:ring-[#FF5C7A] focus:ring-opacity-50"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
