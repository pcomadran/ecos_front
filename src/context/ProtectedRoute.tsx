import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth, Role } from "../context/authContext";

interface ProtectedRouteProps {
  roles: Role[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles }) => {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute - user:", user);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("ProtectedRoute - user is null or undefined");
    return <Navigate to="/login" />;
  }

  const userRole = user.role;

  if (!userRole || !roles.includes(userRole)) {
    console.log("ProtectedRoute - user role not authorized");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;