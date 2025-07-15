import React from "react";

const Banner = () => {
  return (
    <div className="lg:max-w-9/12 mx-auto">
      <div className="relative lg:mt-10 lg:rounded-2xl shadow-2xl overflow-hidden min-h-[36rem]">
        <div className="absolute inset-0 bg-[url('https://i.ibb.co/9m986nvq/image.png')] bg-cover bg-top bg-no-repeat"></div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-white px-6 py-16 sm:px-10 sm:py-20 md:px-16 lg:px-24 flex items-center min-h-[36rem]">
          <div className="max-w-xl space-y-4">
            <h1 className="text-3xl sm:text-4xl max-md:text-center md:text-5xl font-bold leading-tight">
              Find Your Life Partner with GhotokBD
            </h1>
            <p className="text-sm sm:text-base md:text-lg max-md:text-center text-white/90 leading-relaxed">
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
