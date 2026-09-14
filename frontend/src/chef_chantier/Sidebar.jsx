import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Package,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import axios from "axios";

export default function Sidebar() {
  const navigate = useNavigate();

  const [loggingOut, setLoggingOut] =
    useState(false);

  const items = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: <Users size={20} />,
      label: "Workers",
      path: "/workers",
    },
    {
      icon: <CheckSquare size={20} />,
      label: "Tasks",
      path: "/tasks",
    },
    {
      icon: <Package size={20} />,
      label: "Resources",
      path: "/Resources",
    },
    {
      icon: <AlertTriangle size={20} />,
      label: "Incidents",
      path: "/incidents",
    },
  ];

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    const token =
      localStorage.getItem("token");

    try {
      if (token) {
        await axios.post(
          "http://127.0.0.1:8000/api/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
      }
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/login", {
        replace: true,
      });

      setLoggingOut(false);
    }
  };

  return (
    <div className="w-64 min-h-screen bg-[#0a192f] text-white p-5 flex flex-col">

      <h1 className="text-lg font-bold mb-8">
        Chef de Chantier
      </h1>

      <div className="space-y-1 flex-1">

        {items.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `
              flex items-center gap-3 p-3 rounded-xl
              text-sm transition
              ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-gray-800/60 text-gray-300"
              }
              `
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}

      </div>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        disabled={loggingOut}
        className={`
          flex items-center gap-3
          p-3 rounded-xl
          text-sm
          text-gray-300
          hover:bg-red-500/10
          hover:text-red-300
          transition
          ${
            loggingOut
              ? "opacity-50 cursor-not-allowed"
              : ""
          }
        `}
      >
        <LogOut size={20} />

        {loggingOut
          ? "Logging out..."
          : "Logout"}
      </button>

    </div>
  );
}