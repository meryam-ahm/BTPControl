 import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Menu,
  Bell,
  User,
  ClipboardList,
  TrendingUp,
  CheckCircle2,
  Clock,
  Building2,
  Check,
  X,
  LogOut,
} from "lucide-react";

export default function WorkerHome({
  projects,
  currentProject,
  setCurrentProject,
  onNavigate,
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const projectId = currentProject?.project_id;

  /*
  |--------------------------------------------------------------------------
  | LOAD CURRENT PROJECT HOME
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!projectId) {
      setData(null);
      return;
    }

    const token = localStorage.getItem("token");

    setLoading(true);

    axios
      .get(
        `http://127.0.0.1:8000/api/Worker/projects/${projectId}/home`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Worker Home:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(
          "Error loading worker home:",
          error.response?.data || error
        );

        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId]);

  /*
  |--------------------------------------------------------------------------
  | DATA
  |--------------------------------------------------------------------------
  */

  const workerName =
    data?.worker?.name || "Worker";

  const activeTasks =
    data?.stats?.active_tasks ?? 0;

  const inProgress =
    data?.stats?.in_progress ?? 0;

  const completed =
    data?.stats?.completed ?? 0;

  const progress =
    data?.stats?.progress ?? 0;

  const projectName =
    data?.project?.name ||
    currentProject?.project?.name ||
    "Select a project";

  /*
  |--------------------------------------------------------------------------
  | PROJECT SELECT
  |--------------------------------------------------------------------------
  */

  const handleProjectSelect = (project) => {
    setCurrentProject(project);
    setMenuOpen(false);
  };

  /*
  |--------------------------------------------------------------------------
  | LOGOUT
  |--------------------------------------------------------------------------
  */

  const handleLogout = async () => {
    if (loggingOut) {
      return;
    }

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
      console.error(
        "Logout error:",
        error.response?.data || error
      );
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }
  };

  return (
    <div className="relative w-full min-h-full bg-slate-50 px-4 py-4">

      {/* =====================================================
          NORMAL HOME SCREEN
      ====================================================== */}

      {!menuOpen && (
        <>
          {/* HEADER */}

          <div className="flex items-center justify-between">

            {/* BURGER */}

            <button
              onClick={() => setMenuOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-emerald-50 active:scale-95 transition"
            >
              <Menu
                size={23}
                strokeWidth={2.5}
                className="text-gray-700"
              />
            </button>

            {/* TITLE */}

            <h1 className="text-base font-bold text-gray-800">
              Worker Home
            </h1>

            {/* RIGHT SIDE */}

            <div className="flex items-center gap-2">

              {/* NOTIFICATIONS */}

              <button className="relative p-1">
                <Bell
                  size={21}
                  className="text-gray-700"
                />

                <span className="absolute -top-0.5 -right-0.5 bg-emerald-500 text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center border border-white">
                  3
                </span>
              </button>

              {/* PROFILE */}

              <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-emerald-500 flex items-center justify-center overflow-hidden">

                {data?.worker?.profile_image ? (
                  <img
                    src={data.worker.profile_image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User
                    size={17}
                    className="text-gray-500"
                    strokeWidth={2}
                  />
                )}

              </div>

            </div>
          </div>

          {/* CURRENT PROJECT */}

          <button
            onClick={() => setMenuOpen(true)}
            className="w-full mt-3 flex items-center gap-2 px-1 text-left"
          >
            <Building2
              size={14}
              className="text-emerald-600 shrink-0"
            />

            <span className="text-[11px] font-medium text-gray-500">
              Current project:
            </span>

            <span className="text-[11px] font-bold text-gray-800 truncate">
              {projectName}
            </span>
          </button>

          {/* =====================================================
              NO PROJECT
          ====================================================== */}

          {!currentProject ? (

            <div className="mt-4 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-400 rounded-3xl p-6 shadow-md">

              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                <Building2
                  size={22}
                  className="text-white"
                />
              </div>

              <h2 className="text-xl font-black text-white">
                Welcome back 👋
              </h2>

              <p className="text-white/80 text-[11px] mt-2 leading-relaxed">
                Open the menu and select a project to access
                your workspace.
              </p>

              <button
                onClick={() => setMenuOpen(true)}
                className="mt-4 bg-white text-emerald-600 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <Building2 size={15} />
                Select Project
              </button>

            </div>

          ) : loading ? (

            /* =====================================================
                LOADING
            ====================================================== */

            <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-8 text-center">

              <div className="w-8 h-8 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mx-auto mb-3" />

              <p className="text-xs font-semibold text-gray-700">
                Loading workspace...
              </p>

              <p className="text-[10px] text-gray-400 mt-1 truncate">
                {projectName}
              </p>

            </div>

          ) : (

            <>
              {/* =====================================================
                  WELCOME BANNER
              ====================================================== */}

              <div className="mt-4 relative bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-400 rounded-3xl p-5 shadow-lg overflow-hidden min-h-[140px] flex flex-col justify-center">

                <div className="z-10 max-w-[60%]">

                  <p className="text-white/80 text-xs font-medium mb-1">
                    Good morning,
                  </p>

                  <h2 className="text-2xl font-black text-white flex items-center gap-1 leading-tight">
                    {workerName}
                    <span>👋</span>
                  </h2>

                  <p className="text-white/90 text-[11px] mt-2">
                    Stay safe and keep going!
                  </p>

                  <p className="text-white/70 text-[10px] mt-1 truncate">
                    {projectName}
                  </p>

                </div>

                {/* NEUTRAL HUMAN PLACEHOLDER */}

                <div className="absolute bottom-4 right-5 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
                  <User
                    size={42}
                    className="text-white/80"
                    strokeWidth={1.5}
                  />
                </div>

              </div>

              {/* =====================================================
                  QUICK STATS
              ====================================================== */}

              <div className="grid grid-cols-3 gap-2.5 mt-4">

                {/* ACTIVE TASKS */}

                <div className="bg-white p-3 rounded-2xl shadow-sm text-center border border-gray-100">

                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-1.5">
                    <ClipboardList size={16} />
                  </div>

                  <span className="text-lg font-extrabold text-gray-800">
                    {activeTasks}
                  </span>

                  <span className="block text-[9px] font-semibold text-gray-500">
                    Active Tasks
                  </span>

                </div>

                {/* IN PROGRESS */}

                <div className="bg-white p-3 rounded-2xl shadow-sm text-center border border-gray-100">

                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mx-auto mb-1.5">
                    <Clock size={16} />
                  </div>

                  <span className="text-lg font-extrabold text-gray-800">
                    {inProgress}
                  </span>

                  <span className="block text-[9px] font-semibold text-gray-500">
                    In Progress
                  </span>

                </div>

                {/* COMPLETED */}

                <div className="bg-white p-3 rounded-2xl shadow-sm text-center border border-gray-100">

                  <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 mx-auto mb-1.5">
                    <CheckCircle2 size={16} />
                  </div>

                  <span className="text-lg font-extrabold text-gray-800">
                    {completed}
                  </span>

                  <span className="block text-[9px] font-semibold text-gray-500">
                    Completed
                  </span>

                </div>

              </div>

              {/* =====================================================
                  WORK PROGRESS
              ====================================================== */}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mt-4">

                <div className="flex items-center justify-between mb-2">

                  <div className="flex items-center gap-2">

                    <TrendingUp
                      size={16}
                      className="text-emerald-600"
                    />

                    <p className="text-xs font-bold text-gray-700">
                      Work Progress
                    </p>

                  </div>

                  <span className="text-xs font-extrabold text-emerald-600">
                    {progress}%
                  </span>

                </div>

                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        progress,
                        100
                      )}%`,
                    }}
                  />

                </div>

              </div>

              {/* =====================================================
                  ACTIONS
              ====================================================== */}

              <div className="grid grid-cols-2 gap-3 mt-4">

                <button
                  onClick={() =>
                    onNavigate("work")
                  }
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-2xl py-3 shadow-md font-bold text-xs transition"
                >
                  <ClipboardList size={15} />
                  <span>View Tasks</span>
                </button>

                <button
                  onClick={() =>
                    onNavigate("activity")
                  }
                  className="flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 active:scale-[0.98] text-gray-700 rounded-2xl py-3 shadow-sm border border-gray-100 font-bold text-xs transition"
                >
                  <TrendingUp
                    size={15}
                    className="text-emerald-600"
                  />
                  <span>Activity</span>
                </button>

              </div>
            </>
          )}
        </>
      )}

      {/* =====================================================
          PROJECT DRAWER
          300PX WIDTH - INSIDE PHONE
      ====================================================== */}

      {menuOpen && (
        <>
          {/* DARK OVERLAY */}

          <div
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/30 z-[90]"
          />

          {/* WHITE DRAWER */}

          <div className="absolute top-0 left-0 bottom-0 w-[300px] max-w-[82%] bg-white z-[100] shadow-2xl flex flex-col">

            {/* DRAWER HEADER */}

            <div className="px-5 py-5 border-b border-gray-100">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-400">
                    Worker Workspace
                  </p>

                  <h2 className="text-lg font-bold text-gray-800 mt-1">
                    My Projects
                  </h2>

                </div>

                <button
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-emerald-50 transition"
                >
                  <X
                    size={17}
                    className="text-gray-600"
                  />
                </button>

              </div>
            </div>

            {/* PROJECTS */}

            <div className="flex-1 overflow-y-auto p-3">

              {projects?.length > 0 ? (

                <div className="space-y-2">

                  {projects.map(
                    (projectUser) => {

                      const isSelected =
                        Number(
                          currentProject?.project_id
                        ) ===
                        Number(
                          projectUser?.project_id
                        );

                      return (
                        <button
                          key={
                            projectUser.id
                          }
                          onClick={() =>
                            handleProjectSelect(
                              projectUser
                            )
                          }
                          className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition ${
                            isSelected
                              ? "bg-emerald-50 border border-emerald-100"
                              : "hover:bg-gray-50 border border-transparent"
                          }`}
                        >

                          {/* PROJECT ICON */}

                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                              isSelected
                                ? "bg-emerald-100"
                                : "bg-gray-100"
                            }`}
                          >
                            <Building2
                              size={18}
                              className={
                                isSelected
                                  ? "text-emerald-600"
                                  : "text-gray-500"
                              }
                            />
                          </div>

                          {/* PROJECT INFO */}

                          <div className="flex-1 min-w-0">

                            <p
                              className={`text-sm font-semibold truncate ${
                                isSelected
                                  ? "text-emerald-700"
                                  : "text-gray-800"
                              }`}
                            >
                              {projectUser
                                ?.project
                                ?.name ||
                                "Unnamed Project"}
                            </p>

                            <p className="text-[10px] text-gray-400 mt-0.5">
                              Project #
                              {
                                projectUser?.project_id
                              }
                            </p>

                          </div>

                          {/* SELECTED */}

                          {isSelected && (
                            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">

                              <Check
                                size={14}
                                className="text-emerald-600"
                                strokeWidth={3}
                              />

                            </div>
                          )}

                        </button>
                      );
                    }
                  )}

                </div>

              ) : (

                <div className="text-center py-10">

                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Building2
                      size={22}
                      className="text-gray-400"
                    />
                  </div>

                  <p className="text-sm font-semibold text-gray-700">
                    No projects
                  </p>

                  <p className="text-[11px] text-gray-400 mt-1">
                    You are not assigned to any project yet.
                  </p>

                </div>

              )}

            </div>

            {/* FOOTER */}

            <div className="p-4 border-t border-gray-100">

              {/* LOGOUT BUTTON */}

              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className={`
                  w-full flex items-center justify-center gap-2
                  py-3 rounded-xl
                  text-xs font-bold
                  transition
                  ${
                    loggingOut
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-red-50 text-red-600 hover:bg-red-100"
                  }
                `}
              >

                <LogOut size={15} />

                {loggingOut
                  ? "Logging out..."
                  : "Logout"}

              </button>

              <p className="text-[10px] text-gray-400 text-center mt-3">
                Select a project to view your tasks and activity.
              </p>

            </div>

          </div>
        </>
      )}

    </div>
  );
}
 

 