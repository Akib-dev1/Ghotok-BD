import React from "react";

const WhyChooseUS = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#D33454] mb-8">
          Why Choose Us
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
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
              className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg text-[#D33454]">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUS;
