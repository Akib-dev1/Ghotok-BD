import React, { useContext } from "react";
import { AuthContext } from "@/Contexts/AuthProvidor";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router";
import { ScaleLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/users/${user?.email}`
      );
      return response.data;
    },
  });

  // Wait until both Firebase auth and DB query finish
  if (loading || isLoading || !user?.email) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ScaleLoader color="#D33454" />
      </div>
    );
  }

  if (data?.role === "admin") {
    return children;
  }

  return <Navigate to="/unauthorized" />;
};

export default AdminRoute;
