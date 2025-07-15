import React from "react";

const ContactInfoItem = ({ icon, label, value, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 text-[#B72B48] hover:text-[#D33454] transition-colors duration-200 cursor-pointer"
    >
      <div className="flex max-sm:flex-col sm:items-center gap-4">
        {icon}
        <div>
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-lg max-sm:text-sm ">{value}</p>
        </div>
      </div>
    </a>
  );
};

export default ContactInfoItem;
