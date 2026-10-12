import React from "react";
import { useNavigate } from "react-router-dom";
import LogIn from "../pages/login/LogIn";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080"; 

function LogInRoute() {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/oauth2/authorization/google`;
  };

  const handleCancel = () => {
    // If there's no history (user opened /login directly), go home instead
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  return <LogIn onGoogleLogin={handleGoogleLogin} onCancel={handleCancel} />;
}

export default LogInRoute;
