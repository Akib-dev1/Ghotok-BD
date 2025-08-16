import React, { use } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AuthContext } from "@/Contexts/AuthProvidor";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ScaleLoader } from "react-spinners";

const activityData = [
  { name: "Jan", sent: 3, received: 2 },
  { name: "Feb", sent: 4, received: 1 },
  { name: "Mar", sent: 2, received: 3 },
  { name: "Apr", sent: 5, received: 4 },
  { name: "May", sent: 6, received: 5 },
  { name: "Jun", sent: 7, received: 6 },
];

const COLORS = ["#D33454", "#F59EB3", "#656B76"];

const Overview = () => {
  const { user } = use(AuthContext);
  const { data, isLoading } = useQuery({
    queryKey: ["Favourite Biodata"],
    queryFn: async () => {
      const response = await axios.get(
        "https://b11a12-server-side-akib-dev1.vercel.app/biodata/favorite"
      );
      return response.data;
    },
  });

  const { data: contactRequests, isLoading: loadingRequests } = useQuery({
    queryKey: ["contactRequests"],
    queryFn: async () => {
      const response = await axios.get(
        "https://b11a12-server-side-akib-dev1.vercel.app/biodata/contact/requests"
      );
      return response.data;
    },
  });

  const finalData = contactRequests?.filter((req) => req.email === user?.email);

  const Pending = finalData?.filter((req) => req.status === "pending").length;

  const approved = finalData?.filter((req) => req.status === "approved").length;

  const favourites = data?.filter((item) => item.email === user?.email);

  const userStats = [
    { id: 2, title: "Favourites", value: favourites?.length },
    { id: 3, title: "Contact Requests", value: finalData?.length },
  ];

  const requestStatus = [
    { name: "Pending", value: Pending },
    { name: "Accepted", value: approved },
  ];

  if (isLoading || loadingRequests) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FFF3F5]">
        <ScaleLoader barCount={6} color="#D33454" height={50} width={4} />
      </div>
    );
  }
  return (
    <section className="min-h-screen bg-[#FFF3F5] py-8">
      <div className="max-w-9/12 max-lg:max-w-10/12 max-md:max-w-11/12 mx-auto">
        {/* Welcome */}
        <h2 className="text-2xl font-bold text-[#D33454] mb-6">
          👋 Welcome back, {user?.displayName}
        </h2>
        <p className="text-gray-600 mb-8">
          Here’s a quick overview of your activity.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {userStats.map((stat) => (
            <Card
              key={stat.id}
              className="shadow-lg rounded-xl border border-gray-200 bg-white"
            >
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-[#D33454]">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-gray-800 mt-2">
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Line Chart */}
          <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-[#D33454] mb-4">
              Activity Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sent"
                  stroke="#D33454"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="received"
                  stroke="#656B76"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white shadow-lg rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-[#D33454] mb-4">
              Request Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={requestStatus}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  dataKey="value"
                >
                  {requestStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overview;
