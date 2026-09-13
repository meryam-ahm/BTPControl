 import React, { useState } from "react";
import "../App.css";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { GoHome } from "react-icons/go";
import { HiDocumentText } from "react-icons/hi";
import { MdMonitor } from "react-icons/md";

export default function SidebarComponent() {
  const [open, setOpen] = useState(true);
  const location = useLocation();

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
              <p className="font-bold text-lg">BTPControl</p>
              <p className="text-xs text-gray-300">Cloud-based platform</p>
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
          to="/"
          icon={<GoHome />}
          label="Dashboard"
          active={location.pathname === "/"}
        />

        <NavItem
          open={open}
          to="/planning"
          icon={<HiDocumentText />}
          label="Planning & Gantt"
          active={location.pathname.startsWith("/planning")}
        />

        <NavItem
          open={open}
          to="/execution"
          icon={<MdMonitor />}
          label="Execution"
          active={location.pathname.startsWith("/execution")}
        />
      </nav>
    </div>
  );
}

function NavItem({ open, to, icon, label, active }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-4 px-3 py-3 rounded-xl transition whitespace-nowrap ${
        active
          ? "bg-white/15 text-white"
          : "text-gray-300 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className="text-2xl flex-shrink-0">{icon}</span>
      {open && (
        <span className="text-sm font-medium">
          {label}
        </span>
      )}
    </Link>
  );
}
 