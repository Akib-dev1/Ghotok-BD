import React from "react";

const Safety = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#D33454] mb-8">
          How We Ensure Safety
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Verified Profiles", icon: "📝" },
            { title: "Privacy Protection", icon: "🔒" },
            { title: "Respectful Community", icon: "🤝" },
          ].map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg text-[#D33454]">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                We make sure every step is safe and respectful for our members.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Safety;
