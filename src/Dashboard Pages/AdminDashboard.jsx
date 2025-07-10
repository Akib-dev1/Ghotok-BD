import axios from "axios";
import React, { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const revenueData = [{ name: "Revenue Generated", value: 8000 }];

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
  useEffect(() => {
    axios.get("http://localhost:5000/biodata").then((response) => {
      setBiodata(response.data);
    });
    axios.get("http://localhost:5000/users").then((response) => {
      setUsers(response.data);
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
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-7xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-96">
            <h2 className="text-center font-semibold mb-4">Biodata Stats</h2>
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

          <div className="h-96">
            <h2 className="text-center font-semibold mb-4">Revenue Stats</h2>
            <ResponsiveContainer width="100%" height="100%">
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
