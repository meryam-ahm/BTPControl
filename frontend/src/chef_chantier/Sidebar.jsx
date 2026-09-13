import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  FileText,
  Package,
  Camera,
  AlertTriangle,
  Settings
} from "lucide-react";

export default function Sidebar() {
  const items = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", path: "/" },
    { icon: <Users size={20} />, label: "Workers", path: "/workers" },
    { icon: <CheckSquare size={20} />, label: "Tasks", path: "/tasks" },
     { icon: <Package size={20} />, label: "Resources", path: "/Resources" },
     { icon: <AlertTriangle size={20} />, label: "Incidents", path: "/incidents" },
   ];

  return (
    <div className="w-64 min-h-screen bg-[#0a192f] text-white p-5">
      <h1 className="text-lg font-bold mb-8">Chef de Chantier</h1>

      <div className="space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl text-sm transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-800/60 text-gray-300"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}