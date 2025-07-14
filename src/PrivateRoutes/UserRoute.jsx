import { use } from "react";
import { AuthContext } from "@/Contexts/AuthProvidor";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate } from "react-router";
import { ScaleLoader } from "react-spinners";

const UserRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/users/${user.email}`);
      return res.data;
    },
  });

  if (loading || isLoading || !user?.email) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ScaleLoader color="#D33454" />
      </div>
    );
  }

  if (data?.role === "normal") {
    return children;
  } else if (data?.role) {
    return <Navigate to="/unauthorized" />;
  }
  return null;
};

export default UserRoute;
