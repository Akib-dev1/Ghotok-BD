import React from "react";

const SuccessStoryCard = () => {
  // Demo data
  const male = {
    biodataId: "B-101",
    name: "Rahim Uddin",
    age: 28,
    occupation: "Engineer",
  };

  const female = {
    biodataId: "B-202",
    name: "Sharmin Akter",
    age: 24,
    occupation: "Teacher",
  };

  const imageURL =
    "https://images.unsplash.com/photo-1608219990613-8f7893adfafa?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6 max-w-4xl mx-auto mb-8">
      {/* Centered Marriage Photo */}
      <div className="flex justify-center mb-6">
        <img
          src={imageURL}
          alt="Couple"
          className="h-56 w-auto object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Male Info */}
        <div>
          <h3 className="text-xl font-semibold text-[#D33454] mb-2">
            Groom Info
          </h3>
          <ul className="text-gray-700 space-y-1">
            <li>
              <strong>Biodata ID:</strong> {male.biodataId}
            </li>
            <li>
              <strong>Name:</strong> {male.name}
            </li>
            <li>
              <strong>Age:</strong> {male.age}
            </li>
            <li>
              <strong>Occupation:</strong> {male.occupation}
            </li>
          </ul>
        </div>

        {/* Female Info */}
        <div>
          <h3 className="text-xl font-semibold text-[#D33454] mb-2">
            Bride Info
          </h3>
          <ul className="text-gray-700 space-y-1">
            <li>
              <strong>Biodata ID:</strong> {female.biodataId}
            </li>
            <li>
              <strong>Name:</strong> {female.name}
            </li>
            <li>
              <strong>Age:</strong> {female.age}
            </li>
            <li>
              <strong>Occupation:</strong> {female.occupation}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryCard;
