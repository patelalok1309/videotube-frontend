import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    console.log("ProtectedRoute")
    const isAuthenticated = useSelector((state) => state.auth.auth.status);

    return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
