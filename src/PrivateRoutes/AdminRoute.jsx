import { AuthContext } from "@/Contexts/AuthProvidor";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import { ScaleLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const { pathname } = useLocation();
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
  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ScaleLoader color="#D33454" />
      </div>
    );
  }
  if (data?.role === "admin") {
    return children;
  }
  return <Navigate state={pathname} to="/unauthorized"></Navigate>;
};

export default AdminRoute;
