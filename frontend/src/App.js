import React, { useEffect, useState } from "react";
import {
    Routes,
    Route,
    Navigate,
    useLocation,
} from "react-router-dom";
import axios from "axios";

// =========================
// LOGIN / REGISTER
// =========================

import Login from "./Login";
import Register from "./Register";

// =========================
// SITE MANAGER
// =========================

import Sidebar from "./chef_chantier/Sidebar";
import Header from "./Ingenieur/PlanningGanttComponenets/Header";
import Dashboard from "./chef_chantier/Dashboard";
import Workers from "./chef_chantier/Workers";
import Tasks from "./chef_chantier/Tasks";
import Resources from "./chef_chantier/Resources";
import Incidents from "./chef_chantier/Incidents";

// =========================
// ENGINEER
// =========================

import SidebarComponent from "./Components/SidebarComponent";
import ProjectDashbored from "./Ingenieur/ProjectDashbored";
import ExecutionMonitoring from "./Ingenieur/ExecutionMonitoring";
import PlanningGantt from "./Ingenieur/PlanningGantt";
import EditProject from "./Ingenieur/EditProject";

// =========================
// WORKER
// =========================

import WorkerHome from "./travailleur/WorkerHome";
import WorkerTasks from "./travailleur/WorkerTasks";
import WorkerActivity from "./travailleur/WorkerActivity";

import {
    Home,
    Briefcase,
    ListTodo,
    User,
} from "lucide-react";

export default function App() {
    const location = useLocation();

    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] =
        useState(null);

    const [taskProgress, setTaskProgress] =
        useState(60);

    const [attendance, setAttendance] =
        useState({
            checkIn: "07:58 AM",
            checkOut: "--:-- --",
            status: "PRESENT",
        });

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );

    // =========================
    // LOGIN / REGISTER PAGE
    // =========================

    const isLoginPage =
        location.pathname === "/login";

    const isRegisterPage =
        location.pathname === "/register";

    // =========================
    // LOAD SITE MANAGER PROJECTS
    // =========================

    useEffect(() => {
        if (
            !token ||
            isLoginPage ||
            isRegisterPage
        ) {
            return;
        }

        if (user?.role !== "chef_chantier") {
            return;
        }

        axios
            .get(
                "http://127.0.0.1:8000/api/SiteManager/getProjects",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            )
            .then((res) => {
                const data = res.data || [];

                setProjects(data);

                if (data.length > 0) {
                    setCurrentProject(data[0]);
                }
            })
            .catch((error) => {
                console.error(
                    "Failed to load projects:",
                    error
                );

                if (
                    error.response?.status === 401
                ) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    window.location.href = "/login";
                }
            });
    }, [token, isLoginPage, isRegisterPage]);

    // =========================
    // NOT LOGGED IN
    // =========================

    if (!token) {
        return (
            <Routes>
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                            replace
                        />
                    }
                />
            </Routes>
        );
    }

    // =========================
    // ROLE PROTECTION
    // =========================

    if (!user?.role) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    // =========================
    // LOGIN / REGISTER WHEN
    // ALREADY LOGGED IN
    // =========================

    if (isLoginPage || isRegisterPage) {
        if (user.role === "chef_chantier") {
            return (
                <Navigate
                    to="/"
                    replace
                />
            );
        }

        if (user.role === "worker") {
            return (
                <Navigate
                    to="/worker"
                    replace
                />
            );
        }

        if (user.role === "engineer") {
            return (
                <Navigate
                    to="/engineer"
                    replace
                />
            );
        }

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    // =========================================================
    // WORKER UI
    // =========================================================

    if (user.role === "worker") {
        return (
            <div className="flex justify-center items-center bg-slate-900 min-h-screen p-0 sm:p-6 select-none">
                <div className="w-full max-w-[390px] h-screen sm:h-[844px] bg-slate-50 sm:rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden border-4 border-slate-900/10 flex flex-col justify-between relative font-sans">

                    <div className="flex-1 overflow-y-auto pb-24 scrollbar-none">
                        <Routes>
                            <Route
                                path="/worker"
                                element={
                                    <WorkerHome
                                        progress={taskProgress}
                                        attendance={attendance}
                                        onNavigate={() =>
                                            window.location.href =
                                                "/worker"
                                        }
                                    />
                                }
                            />

                            <Route
                                path="/worker/tasks"
                                element={
                                    <WorkerTasks
                                        progress={taskProgress}
                                        setProgress={
                                            setTaskProgress
                                        }
                                        onNavigate={() =>
                                            window.location.href =
                                                "/worker"
                                        }
                                    />
                                }
                            />

                            <Route
                                path="/worker/activity"
                                element={
                                    <WorkerActivity
                                        attendance={
                                            attendance
                                        }
                                        setAttendance={
                                            setAttendance
                                        }
                                        onNavigate={() =>
                                            window.location.href =
                                                "/worker"
                                        }
                                    />
                                }
                            />

                            <Route
                                path="/worker/profile"
                                element={
                                    <div className="p-6 text-center text-gray-400 mt-32 font-semibold text-sm">
                                        Profile Management Page Coming Soon...
                                    </div>
                                }
                            />

                            <Route
                                path="*"
                                element={
                                    <Navigate
                                        to="/worker"
                                        replace
                                    />
                                }
                            />
                        </Routes>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl py-2.5 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex justify-between items-center z-50">

                        <button
                            onClick={() =>
                                window.location.href =
                                    "/worker"
                            }
                            className={`flex flex-col items-center space-y-0.5 transition ${
                                location.pathname ===
                                "/worker"
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-400"
                            }`}
                        >
                            <Home
                                size={19}
                                strokeWidth={
                                    location.pathname ===
                                    "/worker"
                                        ? 2.5
                                        : 2
                                }
                            />

                            <span className="text-[10px]">
                                Home
                            </span>
                        </button>

                        <button
                            onClick={() =>
                                window.location.href =
                                    "/worker/tasks"
                            }
                            className={`flex flex-col items-center space-y-0.5 transition ${
                                location.pathname ===
                                "/worker/tasks"
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-400"
                            }`}
                        >
                            <Briefcase
                                size={19}
                                strokeWidth={
                                    location.pathname ===
                                    "/worker/tasks"
                                        ? 2.5
                                        : 2
                                }
                            />

                            <span className="text-[10px]">
                                Work
                            </span>
                        </button>

                        <button
                            onClick={() =>
                                window.location.href =
                                    "/worker/activity"
                            }
                            className={`flex flex-col items-center space-y-0.5 transition ${
                                location.pathname ===
                                "/worker/activity"
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-400"
                            }`}
                        >
                            <ListTodo
                                size={19}
                                strokeWidth={
                                    location.pathname ===
                                    "/worker/activity"
                                        ? 2.5
                                        : 2
                                }
                            />

                            <span className="text-[10px]">
                                Activity
                            </span>
                        </button>

                        <button
                            onClick={() =>
                                window.location.href =
                                    "/worker/profile"
                            }
                            className={`flex flex-col items-center space-y-0.5 transition ${
                                location.pathname ===
                                "/worker/profile"
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-400"
                            }`}
                        >
                            <User
                                size={19}
                                strokeWidth={
                                    location.pathname ===
                                    "/worker/profile"
                                        ? 2.5
                                        : 2
                                }
                            />

                            <span className="text-[10px]">
                                Profile
                            </span>
                        </button>

                    </div>
                </div>
            </div>
        );
    }

    // =========================================================
    // ENGINEER UI
    // =========================================================

    if (user.role === "engineer") {
        return (
            <div className="flex h-screen w-screen overflow-hidden">

                <SidebarComponent />

                <div className="flex-1 h-full overflow-y-auto bg-gray-50">
                    <Routes>

                        <Route
                            path="/engineer"
                            element={
                                <ProjectDashbored />
                            }
                        />

                        <Route
                            path="/engineer/ProjectDashboard"
                            element={
                                <ProjectDashbored />
                            }
                        />

                        <Route
                            path="/engineer/execution"
                            element={
                                <ExecutionMonitoring />
                            }
                        />

                        <Route
                            path="/engineer/planning"
                            element={
                                <PlanningGantt />
                            }
                        />

                        <Route
                            path="/engineer/projects/:projectId/edit"
                            element={
                                <EditProject />
                            }
                        />

                        <Route
                            path="*"
                            element={
                                <Navigate
                                    to="/engineer"
                                    replace
                                />
                            }
                        />

                    </Routes>
                </div>
            </div>
        );
    }

    // =========================================================
    // SITE MANAGER UI
    // =========================================================

    if (user.role === "chef_chantier") {

        const getProjectIdFromPath = () => {
            const match =
                location.pathname.match(
                    /^\/(workers|tasks|resources|incidents)\/(\d+)$/
                );

            return match
                ? Number(match[2])
                : null;
        };

        const routeProjectId =
            getProjectIdFromPath();

        const routeProject =
            routeProjectId
                ? projects.find(
                    (project) =>
                        Number(
                            project.project_id
                        ) ===
                        Number(
                            routeProjectId
                        )
                )
                : null;

        const activeProject =
            routeProject ||
            currentProject;

        const isProjectRoute =
            Boolean(routeProjectId);

        const handleProjectChange = (
            value
        ) => {
            const projectId =
                typeof value === "object"
                    ? value?.project_id
                    : value;

            const selectedProject =
                projects.find(
                    (project) =>
                        Number(
                            project.project_id
                        ) ===
                        Number(projectId)
                );

            setCurrentProject(
                selectedProject || null
            );
        };

        return (
            <div className="flex min-h-screen bg-[#F7F8FA]">

                <Sidebar />

                <div className="flex-1 min-w-0">

                    {!isProjectRoute && (
                        <Header
                            projects={projects}
                            currentProject={
                                currentProject?.project_id ||
                                null
                            }
                            setCurrentProject={
                                handleProjectChange
                            }
                        />
                    )}

                    <main className="p-6">
                        <Routes>

                            <Route
                                path="/"
                                element={
                                    <Dashboard
                                        currentProject={
                                            activeProject
                                        }
                                    />
                                }
                            />

                            <Route
                                path="/workers"
                                element={
                                    <Workers
                                        currentProject={
                                            activeProject
                                        }
                                    />
                                }
                            />

                            <Route
                                path="/workers/:projectId"
                                element={
                                    <Workers
                                        currentProject={
                                            activeProject
                                        }
                                    />
                                }
                            />

                            <Route
                                path="/tasks"
                                element={
                                    <Tasks
                                        currentProject={
                                            activeProject
                                        }
                                    />
                                }
                            />

                            <Route
                                path="/tasks/:projectId"
                                element={
                                    <Tasks
                                        currentProject={
                                            activeProject
                                        }
                                    />
                                }
                            />

                            <Route
                                path="/resources"
                                element={
                                    <Resources
                                        currentProject={
                                            activeProject
                                        }
                                    />
                                }
                            />

                            <Route
                                path="/resources/:projectId"
                                element={
                                    <Resources
                                        currentProject={
                                            activeProject
                                        }
                                    />
                                }
                            />

                            <Route
                                path="/incidents"
                                element={
                                    <Incidents
                                        currentProject={
                                            activeProject
                                        }
                                    />
                                }
                            />

                            <Route
                                path="/incidents/:projectId"
                                element={
                                    <Incidents
                                        currentProject={
                                            activeProject
                                        }
                                    />
                                }
                            />

                            <Route
                                path="*"
                                element={
                                    <Navigate
                                        to="/"
                                        replace
                                    />
                                }
                            />

                        </Routes>
                    </main>
                </div>
            </div>
        );
    }

    // =========================================================
    // INVALID ROLE
    // =========================================================

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return (
        <Navigate
            to="/login"
            replace
        />
    );
}