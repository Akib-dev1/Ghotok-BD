import React, { useState } from "react";

const demoContactRequests = [
  {
    id: 1,
    name: "Rahim Uddin",
    biodataId: "BD101",
    status: "Approved",
    mobile: "017XXXXXXXX",
    email: "rahim@example.com",
  },
  {
    id: 2,
    name: "Salma Akter",
    biodataId: "BD202",
    status: "Pending",
    mobile: "",
    email: "",
  },
  {
    id: 3,
    name: "Tariq Khan",
    biodataId: "BD303",
    status: "Approved",
    mobile: "018XXXXXXXX",
    email: "tariq@example.com",
  },
];

export default function MyContactRequest() {
  const [requests, setRequests] = useState(demoContactRequests);

  const handleDelete = (id) => {
    const filtered = requests.filter((req) => req.id !== id);
    setRequests(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          My Contact Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 text-sm text-center">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Biodata ID</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Mobile No</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-t">
                  <td className="px-4 py-2 border">{req.name}</td>
                  <td className="px-4 py-2 border">{req.biodataId}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        req.status === "Approved"
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 border">
                    {req.status === "Approved" ? req.mobile : "--"}
                  </td>
                  <td className="px-4 py-2 border">
                    {req.status === "Approved" ? req.email : "--"}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleDelete(req.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {requests.length === 0 && (
                <tr>
                  <td colSpan="6" className="py-6 text-gray-500">
                    You have no contact requests yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
