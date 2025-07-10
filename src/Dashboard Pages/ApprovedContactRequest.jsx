import React, { useState } from "react";

const demoRequests = [
  {
    id: 1,
    name: "Rahim Uddin",
    email: "rahim@example.com",
    biodataId: "BD101",
    approved: false,
  },
  {
    id: 2,
    name: "Salma Akter",
    email: "salma@example.com",
    biodataId: "BD202",
    approved: true,
  },
  {
    id: 3,
    name: "Tariq Khan",
    email: "tariq@example.com",
    biodataId: "BD303",
    approved: false,
  },
];

export default function ApprovedContactRequest() {
  const [requests, setRequests] = useState(demoRequests);

  const handleApprove = (id) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, approved: true } : req
    );
    setRequests(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-6xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">
          All Contact Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border border-gray-300 rounded-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Biodata ID</th>
                <th className="px-4 py-2 border">Approval</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="text-center">
                  <td className="px-4 py-2 border">{req.name}</td>
                  <td className="px-4 py-2 border">{req.email}</td>
                  <td className="px-4 py-2 border">{req.biodataId}</td>
                  <td className="px-4 py-2 border">
                    {req.approved ? (
                      <span className="text-green-600 font-semibold">
                        Approved
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
                    No contact requests found.
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
