import React from "react";

const WhyPremium = () => {
  return (
    <section className="py-16">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#D33454] great-vibes mb-12">
          Why Upgrade to Premium?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Unlimited Contact Requests", icon: "📞" },
            { title: "Priority Match Suggestions", icon: "⚡" },
            { title: "Verified Badge & Visibility", icon: "✅" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 flex flex-col items-center justify-center space-y-4 cursor-pointer border border-gray-200 dark:border-gray-700"
            >
              <div className="text-5xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-xl text-[#D33454] dark:text-[#FF5C7A]">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                Enjoy exclusive benefits that enhance your matchmaking
                experience.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPremium;
