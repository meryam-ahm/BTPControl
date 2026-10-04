 import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Login from "./Login";
import Register from "./Register";
import ProjectChat from "./ProjectChat";
import TaskInbox from "./Site_Manager/TaskInbox";
import Sidebar from "./Site_Manager/Sidebar";
import Header from "./Ingenieur/PlanningGanttComponenets/Header";

import Dashboard from "./Site_Manager/Dashboard";
import Workers from "./Site_Manager/Workers";
import Tasks from "./Site_Manager/Tasks";
import Resources from "./Site_Manager/Resources";
import Incidents from "./Site_Manager/Incidents";

import SidebarComponent from "./Components/SidebarComponent";
import ProjectDashbored from "./Ingenieur/ProjectDashbored";
import ExecutionMonitoring from "./Ingenieur/ExecutionMonitoring";
import PlanningGantt from "./Ingenieur/PlanningGantt";
import EditProject from "./Ingenieur/EditProject";

import WorkerHome from "./Worker/WorkerHome";
import WorkerTasks from "./Worker/WorkerTasks";
import WorkerActivity from "./Worker/WorkerActivity";

import {
    Home,
    Briefcase,
    ListTodo,
    User,
    ClipboardList
} from "lucide-react";

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);

    const [taskProgress, setTaskProgress] = useState(60);

    const [attendance, setAttendance] = useState({
        checkIn: "07:58 AM",
        checkOut: "--:-- --",
        status: "PRESENT"
    });

    // TASK INBOX POPUP
    const [showTaskInbox, setShowTaskInbox] = useState(false);

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";

    // LOAD SITE MANAGER PROJECTS
    useEffect(() => {
        if (!token || isLoginPage || isRegisterPage) return;
        if (user?.role !== "site_manager") return;

        axios.get(
            "http://127.0.0.1:8000/api/SiteManager/Projects",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        )
            .then((res) => {
                console.log("Site Manager Projects Response:", res.data);

                const siteManagerProjects = Array.isArray(res.data)
                    ? res.data
                    : res.data?.projects || [];

                console.log("Site Manager Projects:", siteManagerProjects);

                setProjects(siteManagerProjects);

                const savedProjectId = Number(
                    localStorage.getItem("currentProject")
                );

                const savedProject = siteManagerProjects.find(
                    (project) =>
                        Number(project.project_id) === savedProjectId
                );

                const selectedProject =
                    savedProject ||
                    siteManagerProjects[0] ||
                    null;

                console.log("SELECTED PROJECT:", selectedProject);
                console.log(
                    "SELECTED PROJECT NAME:",
                    selectedProject?.project_name
                );

                setCurrentProject(selectedProject);

                if (selectedProject) {
                    localStorage.setItem(
                        "currentProject",
                        String(selectedProject.project_id)
                    );
                } else {
                    localStorage.removeItem("currentProject");
                }
            })
            .catch((error) => {
                console.error(
                    "Failed to load site manager projects:",
                    error.response?.status,
                    error.response?.data || error
                );

                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("currentProject");

                    window.location.href = "/login";
                }
            });
    }, [token, isLoginPage, isRegisterPage]);

    // LOAD WORKER PROJECTS
    useEffect(() => {
        if (!token || isLoginPage || isRegisterPage) return;
        if (user?.role !== "worker") return;

        axios.get(
            "http://127.0.0.1:8000/api/Worker/getProjects",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json"
                }
            }
        )
            .then((res) => {
                console.log("Worker Projects Response:", res.data);

                const workerProjects = res.data?.projects || [];

                console.log("Worker Projects:", workerProjects);

                setProjects(workerProjects);

                const savedProjectId = Number(
                    localStorage.getItem("currentProject")
                );

                const savedProject = workerProjects.find(
                    project =>
                        Number(project.project_id) === savedProjectId
                );

                const selectedProject =
                    savedProject ||
                    workerProjects[0] ||
                    null;

                setCurrentProject(selectedProject);

                if (selectedProject) {
                    localStorage.setItem(
                        "currentProject",
                        String(selectedProject.project_id)
                    );

                    console.log(
                        "Worker Current Project:",
                        selectedProject
                    );
                } else {
                    localStorage.removeItem("currentProject");
                }
            })
            .catch((error) => {
                console.error(
                    "Failed to load worker projects:",
                    error.response?.status,
                    error.response?.data || error
                );

                if (error.response?.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    localStorage.removeItem("currentProject");
                    window.location.href = "/login";
                }
            });
    }, [token, isLoginPage, isRegisterPage]);

    // WORKER PROJECT CHANGE
    const handleWorkerProjectChange = (project) => {
        if (!project) {
            setCurrentProject(null);
            localStorage.removeItem("currentProject");
            return;
        }

        console.log("Worker selected project:", project);

        setCurrentProject(project);

        if (project.project_id) {
            localStorage.setItem(
                "currentProject",
                String(project.project_id)
            );
        }
    };

    // NOT LOGGED IN
    if (!token) {
        return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
        );
    }

    // ROLE PROTECTION
    if (!user?.role) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("currentProject");

        return <Navigate to="/login" replace />;
    }

    // LOGIN / REGISTER WHEN ALREADY LOGGED IN
    if (isLoginPage || isRegisterPage) {
        if (user.role === "site_manager") {
            return <Navigate to="/" replace />;
        }

        if (user.role === "worker") {
            return <Navigate to="/worker" replace />;
        }

        if (user.role === "engineer") {
            return <Navigate to="/engineer" replace />;
        }

        return <Navigate to="/login" replace />;
    }

    // WORKER UI
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
                                        projects={projects}
                                        currentProject={currentProject}
                                        setCurrentProject={handleWorkerProjectChange}
                                        progress={taskProgress}
                                        attendance={attendance}
                                        onNavigate={(page) => {
                                            if (page === "work") {
                                                navigate("/worker/tasks");
                                            } else if (page === "activity") {
                                                navigate("/worker/activity");
                                            } else {
                                                navigate("/worker");
                                            }
                                        }}
                                    />
                                }
                            />

                            <Route
                                path="/worker/tasks"
                                element={
                                    <WorkerTasks
                                        currentProject={currentProject}
                                        progress={taskProgress}
                                        setProgress={setTaskProgress}
                                        onNavigate={() => navigate("/worker")}
                                    />
                                }
                            />

                            <Route
                                path="/worker/activity"
                                element={
                                    <WorkerActivity
                                        projectId={currentProject?.project_id}
                                        attendance={attendance}
                                        setAttendance={setAttendance}
                                        onNavigate={() => navigate("/worker")}
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
                                    <Navigate to="/worker" replace />
                                }
                            />
                        </Routes>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl py-2.5 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex justify-between items-center z-50">
                        <button
                            onClick={() => navigate("/worker")}
                            className={`flex flex-col items-center space-y-0.5 transition ${
                                location.pathname === "/worker"
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-400"
                            }`}
                        >
                            <Home
                                size={19}
                                strokeWidth={
                                    location.pathname === "/worker"
                                        ? 2.5
                                        : 2
                                }
                            />
                            <span className="text-[10px]">Home</span>
                        </button>

                        <button
                            onClick={() => navigate("/worker/tasks")}
                            className={`flex flex-col items-center space-y-0.5 transition ${
                                location.pathname === "/worker/tasks"
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-400"
                            }`}
                        >
                            <Briefcase
                                size={19}
                                strokeWidth={
                                    location.pathname === "/worker/tasks"
                                        ? 2.5
                                        : 2
                                }
                            />
                            <span className="text-[10px]">Work</span>
                        </button>

                        <button
                            onClick={() => navigate("/worker/activity")}
                            className={`flex flex-col items-center space-y-0.5 transition ${
                                location.pathname === "/worker/activity"
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-400"
                            }`}
                        >
                            <ListTodo
                                size={19}
                                strokeWidth={
                                    location.pathname === "/worker/activity"
                                        ? 2.5
                                        : 2
                                }
                            />
                            <span className="text-[10px]">Activity</span>
                        </button>

                        <button
                            onClick={() => navigate("/worker/profile")}
                            className={`flex flex-col items-center space-y-0.5 transition ${
                                location.pathname === "/worker/profile"
                                    ? "text-blue-600 font-bold"
                                    : "text-gray-400"
                            }`}
                        >
                            <User
                                size={19}
                                strokeWidth={
                                    location.pathname === "/worker/profile"
                                        ? 2.5
                                        : 2
                                }
                            />
                            <span className="text-[10px]">Profile</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ENGINEER UI
    if (user.role === "engineer") {
        return (
            <div className="flex h-screen w-screen overflow-hidden">
                <SidebarComponent />

                <div className="flex-1 h-full overflow-y-auto bg-gray-50">
                    <Routes>
                        <Route
                            path="/engineer"
                            element={<ProjectDashbored />}
                        />

                        <Route
                            path="/engineer/ProjectDashboard"
                            element={<ProjectDashbored />}
                        />

                        <Route
                            path="/engineer/execution"
                            element={<ExecutionMonitoring />}
                        />

                        <Route
                            path="/engineer/planning"
                            element={<PlanningGantt />}
                        />

                        <Route
                            path="/engineer/projects/:projectId/edit"
                            element={<EditProject />}
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

    // SITE MANAGER UI
    if (user.role === "site_manager") {
        const handleProjectChange = (value) => {
            const projectId =
                typeof value === "object"
                    ? value?.project_id
                    : value;

            const selectedProject = projects.find(
                project =>
                    Number(project.project_id) === Number(projectId)
            );

            if (!selectedProject) return;

            console.log(
                "Site Manager selected project:",
                selectedProject
            );

            setCurrentProject(selectedProject);

            localStorage.setItem(
                "currentProject",
                String(selectedProject.project_id)
            );
        };

        return (
            <div className="flex min-h-screen bg-[#F7F8FA]">
                <Sidebar />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center bg-white border-b border-gray-100">
                        <div className="flex-1 min-w-0">
                            <Header
                                projects={projects}
                                currentProject={currentProject}
                                setCurrentProject={handleProjectChange}
                            />
                        </div>

                        {/* TASK INBOX + PROJECT CHAT */}
                        <div className="flex items-center gap-2 pr-4">
                            <button
                                type="button"
                                onClick={() => setShowTaskInbox(true)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
                            >
                                <ClipboardList size={18} />
                                <span>Task Inbox</span>
                            </button>

                            <ProjectChat
                                currentProject={currentProject}
                            />
                        </div>
                    </div>

                    <main className="p-6">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Dashboard
                                        currentProject={currentProject}
                                    />
                                }
                            />

                            <Route
                                path="/workers"
                                element={
                                    <Workers
                                        currentProject={currentProject}
                                    />
                                }
                            />

                            <Route
                                path="/tasks"
                                element={
                                    <Tasks
                                        currentProject={currentProject}
                                    />
                                }
                            />

                            <Route
                                path="/resources"
                                element={
                                    <Resources
                                        currentProject={currentProject}
                                    />
                                }
                            />

                            <Route
                                path="/incidents"
                                element={
                                    <Incidents
                                        currentProject={currentProject}
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

                    {/* TASK INBOX POPUP */}
                    {showTaskInbox && (
                        <div
                            className="fixed inset-0 z-[9999] bg-black/20"
                            onClick={() => setShowTaskInbox(false)}
                        >
                            <div
                                className="absolute top-[72px] right-6 w-[700px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-100px)] overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                                            <ClipboardList
                                                size={19}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <div>
                                            <h2 className="text-sm font-black text-gray-900">
                                                Task Inbox
                                            </h2>

                                            <p className="text-xs text-gray-400 mt-0.5">
                                                Instructions received from the Engineer
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowTaskInbox(false)}
                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="max-h-[calc(100vh-170px)] overflow-y-auto">
                                    <TaskInbox />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // INVALID ROLE
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("currentProject");

    return <Navigate to="/login" replace />;
}