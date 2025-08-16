import React from "react";

const Banner = () => {
  return (
    <div className="lg:max-w-9/12 mx-auto">
      <div className="relative lg:mt-10 lg:rounded-2xl shadow-2xl overflow-hidden min-h-[36rem] transition-colors duration-500 ease-in-out">
        {/* Background Image */}
        <div className="absolute inset-0 bg-[url('https://i.ibb.co/9m986nvq/image.png')] bg-cover bg-top bg-no-repeat"></div>

        {/* Overlay for dark mode and readability */}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/70 transition-colors duration-500 ease-in-out"></div>

        {/* Content */}
        <div className="relative z-10 text-white px-6 py-16 sm:px-10 sm:py-20 md:px-16 lg:px-24 flex items-center min-h-[36rem]">
          <div className="max-w-xl space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-md:text-center transition-colors duration-500 ease-in-out">
              Find Your Life Partner with{" "}
              <span className="text-[#D33454] dark:text-[#FF5C7A]">
                GhotokBD
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg max-md:text-center text-white/90 dark:text-white/80 leading-relaxed transition-colors duration-500 ease-in-out">
              A trusted Bangladeshi matrimony platform. Serious biodatas,
              verified profiles, real connections. Join now and begin your
              forever journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
