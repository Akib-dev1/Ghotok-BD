import axios from "axios";
import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderValueLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
    >
      {value}
    </text>
  );
};

export default function AdminDashboard() {
  const [biodata, setBiodata] = useState([]);
  const [users, setUsers] = useState([]);
  const [revenue, setRevenue] = useState(0);
  useEffect(() => {
    axios
      .get("https://b11a12-server-side-akib-dev1.vercel.app/biodata")
      .then((response) => {
        setBiodata(response.data);
      });
    axios
      .get("https://b11a12-server-side-akib-dev1.vercel.app/users")
      .then((response) => {
        setUsers(response.data);
      });
    axios
      .get("https://b11a12-server-side-akib-dev1.vercel.app/biodata/contact")
      .then((response) => {
        let total = 0;
        response.data.forEach((item) => {
          total += item.amount;
        });
        setRevenue(total);
      });
  }, []);
  const dataBio = [
    { name: "Total Biodata", value: biodata.length },
    {
      name: "Male Biodata",
      value: biodata.filter((item) => item.type === "Male").length,
    },
    {
      name: "Female Biodata",
      value: biodata.filter((item) => item.type === "Female").length,
    },
    {
      name: "Premium Biodata",
      value: users.filter((item) => item.isPremium === true).length,
    },
  ];

  const revenueData = [{ name: "Revenue Generated", value: revenue }];
  return (
    <div className="min-h-screen bg-[#FFF3F5] dark:bg-[#121212] flex items-center justify-center p-6 transition-colors duration-500">
      <div className="bg-white dark:bg-[#1F1F1F] rounded-2xl shadow-lg w-full max-w-7xl p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-500">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#D33454] dark:text-[#FF5C7A]">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Biodata Stats */}
          <div className="h-96 bg-white dark:bg-[#2A2A2A] rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-600 transition-colors duration-300">
            <h2 className="text-center font-semibold mb-4 text-[#D33454] dark:text-[#FF5C7A]">
              Biodata Stats
            </h2>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={dataBio}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  labelLine={false}
                  label={renderValueLabel}
                  dataKey="value"
                >
                  {dataBio.map((entry, index) => (
                    <Cell
                      key={`cell-bio-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Stats */}
          <div className="h-96 bg-white dark:bg-[#2A2A2A] rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-600 transition-colors duration-300">
            <h2 className="text-center font-semibold mb-4 text-[#D33454] dark:text-[#FF5C7A]">
              Revenue Stats
            </h2>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={revenueData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  labelLine={false}
                  label={renderValueLabel}
                  dataKey="value"
                >
                  {revenueData.map((entry, index) => (
                    <Cell
                      key={`cell-rev-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
