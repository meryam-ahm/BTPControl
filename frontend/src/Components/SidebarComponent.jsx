import React, { useState } from "react";
import "../App.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { GoHome } from "react-icons/go";
import { HiDocumentText } from "react-icons/hi";
import { MdMonitor } from "react-icons/md";
import { LogOut } from "lucide-react";
import axios from "axios";

export default function SidebarComponent() {
  const [open, setOpen] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    const token = localStorage.getItem("token");

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
      console.error("Logout error:", error);
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
    <div
      className={`
        min-h-screen h-full bg-[#03002e] text-white flex flex-col
        transition-all duration-300
        ${open ? "w-[270px]" : "w-[80px]"}
      `}
    >
      <div className="flex items-center justify-between p-4 border-b border-white/10 mb-6">
        {open && (
          <div className="flex items-center gap-3">
            <img
              src="/edited-photo.png"
              alt="logo"
              className="w-10 h-10 object-contain"
            />

            <div>
              <p className="font-bold text-lg">
                BTPControl
              </p>

              <p className="text-xs text-gray-300">
                Cloud-based platform
              </p>
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          className="text-xl p-2 hover:bg-white/10 rounded-lg"
        >
          <HiOutlineMenu />
        </button>
      </div>

      <nav className="flex flex-col gap-3 px-3 flex-1 overflow-y-auto pb-10">

        <NavItem
          open={open}
          to="/engineer"
          icon={<GoHome />}
          label="Dashboard"
          active={
            location.pathname === "/engineer" ||
            location.pathname === "/engineer/ProjectDashboard"
          }
        />

        <NavItem
          open={open}
          to="/engineer/planning"
          icon={<HiDocumentText />}
          label="Planning & Gantt"
          active={location.pathname.startsWith("/engineer/planning")}
        />

        <NavItem
          open={open}
          to="/engineer/execution"
          icon={<MdMonitor />}
          label="Execution"
          active={location.pathname.startsWith("/engineer/execution")}
        />

      </nav>

      {/* LOGOUT */}
      <div className="px-3 pb-5">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className={`
            w-full flex items-center gap-4 px-3 py-3 rounded-xl
            text-gray-300
            hover:bg-red-500/10
            hover:text-red-300
            transition
            ${loggingOut ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <LogOut
            size={22}
            className="flex-shrink-0"
          />

          {open && (
            <span className="text-sm font-medium">
              {loggingOut
                ? "Logging out..."
                : "Logout"}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

function NavItem({
  open,
  to,
  icon,
  label,
  active,
}) {
  return (
    <Link
      to={to}
      className={`
        flex items-center gap-4 px-3 py-3 rounded-xl
        transition whitespace-nowrap
        ${
          active
            ? "bg-white/15 text-white"
            : "text-gray-300 hover:bg-white/10 hover:text-white"
        }
      `}
    >
      <span className="text-2xl flex-shrink-0">
        {icon}
      </span>

      {open && (
        <span className="text-sm font-medium">
          {label}
        </span>
      )}
    </Link>
  );
}