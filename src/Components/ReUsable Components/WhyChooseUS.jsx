import React from "react";

const WhyChooseUS = () => {
  return (
    <section className="py-16">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#D33454] great-vibes mb-12">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          {[
            {
              title: "Easy to Use",
              desc: "Simple design that makes finding your match stress-free.",
              icon: "✨",
            },
            {
              title: "Trusted Platform",
              desc: "We focus on genuine biodatas with verified information.",
              icon: "🏆",
            },
            {
              title: "Safe & Secure",
              desc: "Your privacy is our priority with strict data protection.",
              icon: "🔐",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 flex flex-col items-start space-y-4 cursor-pointer"
            >
              <div className="text-5xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-xl text-[#D33454] dark:text-[#FF5C7A]">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUS;
