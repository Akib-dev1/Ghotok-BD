import React from "react";

const WhyPremium = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#D33454] mb-8">
          Why Upgrade to Premium?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Unlimited Contact Requests", icon: "📞" },
            { title: "Priority Match Suggestions", icon: "⚡" },
            { title: "Verified Badge & Visibility", icon: "✅" },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg text-[#D33454]">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyPremium;
