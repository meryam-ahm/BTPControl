import React, { useEffect, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  HardHat,
  Package,
  CalendarDays,
  ArrowUpRight,
  Clock3,
  Wrench,
  Users,
  UserCheck,
  UserX
} from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = ({ currentProject }) => {
  const [stats, setStats] = useState({});
  const [timelineTasks, setTimelineTasks] = useState([]);
  const [resources, setResources] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [projectPhoto, setProjectPhoto] = useState(null);

  const projectId = currentProject?.project_id;
  const project = currentProject;
  const progress = stats.globalProgress ?? 0;

  useEffect(() => {
    if (!projectId) {
      setStats({});
      setTimelineTasks([]);
      setResources([]);
      setWorkers([]);
      setProjectPhoto(null);
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No authentication token found.');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json'
    };

    Promise.all([
      axios.get(
        `http://127.0.0.1:8000/api/projects/${projectId}/statsSiteManager`,
        { headers }
      ),

      axios.get(
        `http://127.0.0.1:8000/api/projects/${projectId}/photo`,
        { headers }
      ),

      axios.get(
        `http://127.0.0.1:8000/api/engineer/projects/${projectId}/timeline`,
        { headers }
      ),

      axios.get(
        `http://127.0.0.1:8000/api/projects/${projectId}/resources`,
        { headers }
      ),

      axios.get(
        `http://127.0.0.1:8000/api/projects/${projectId}/workers`,
        { headers }
      )
    ])
      .then(
        ([
          statsRes,
          photoRes,
          timelineRes,
          resourcesRes,
          workersRes
        ]) => {
          setStats(statsRes.data || {});
          setProjectPhoto(photoRes.data.photo || null);
          setTimelineTasks(timelineRes.data || []);
          setResources(resourcesRes.data.resources || []);

          const workersArray = Array.isArray(workersRes.data)
            ? workersRes.data
            : workersRes.data?.workers || [];

          setWorkers(workersArray);
        }
      )
      .catch((error) => {
        console.error('Dashboard error:', error);

        if (error.response) {
          console.error('Status:', error.response.status);
          console.error('Response:', error.response.data);
        }

        setStats({});
        setProjectPhoto(null);
        setTimelineTasks([]);
        setResources([]);
        setWorkers([]);
      });
  }, [projectId]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700';

      case 'in_progress':
      case 'in progress':
        return 'bg-blue-50 text-blue-700';

      case 'review':
        return 'bg-amber-50 text-amber-700';

      case 'cancelled':
        return 'bg-red-50 text-red-700';

      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const normalizeStatus = (status) =>
    status?.toLowerCase()?.trim();

  const totalWorkers = workers.length;

  const presentWorkers = workers.filter(
    (worker) => normalizeStatus(worker.status) === 'present'
  ).length;

  const lateWorkers = workers.filter(
    (worker) => normalizeStatus(worker.status) === 'late'
  ).length;

  const absentWorkers = workers.filter(
    (worker) => normalizeStatus(worker.status) === 'absent'
  ).length;

  const halfDayWorkers = workers.filter(
    (worker) => normalizeStatus(worker.status) === 'half_day'
  ).length;

  const attendancePercentage =
    totalWorkers > 0
      ? Math.round((presentWorkers / totalWorkers) * 100)
      : 0;

  return (
    <div className="max-w-[1180px] mx-auto min-h-screen bg-[#F7F8FA] font-sans border border-gray-200 rounded-2xl shadow-sm overflow-hidden my-4">

      {!currentProject ? (
        <div className="min-h-[700px] flex items-center justify-center">
          <div className="text-center">
            <HardHat className="w-10 h-10 text-gray-300 mx-auto mb-3" />

            <p className="text-sm font-semibold text-gray-500">
              Select a project from the header.
            </p>
          </div>
        </div>
      ) : (
        <main className="p-6 space-y-6">

          {/* ================= PROJECT OVERVIEW ================= */}

          <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="grid grid-cols-[1fr_250px] min-h-[210px]">

              <div className="p-6 flex flex-col justify-between">

                <div>
                  <div className="flex items-center gap-2 mb-2">

                    <span className="text-[11px] uppercase tracking-wider font-bold text-blue-600">
                      Active Project
                    </span>

                    <span className="w-1 h-1 rounded-full bg-gray-300" />

                    <span className="text-[11px] text-gray-400">
                      Site Management
                    </span>

                  </div>

                  <h1 className="text-2xl font-black text-gray-900">
                    {project?.project_name || 'Active Project'}
                  </h1>

                  <p className="text-sm text-gray-500 mt-2">
                    Construction site overview and daily operations
                  </p>
                </div>

                <div className="max-w-xl">

                  <div className="flex items-center justify-between mb-2">

                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      Overall Progress
                    </span>

                    <span className="text-sm font-black text-gray-900">
                      {progress}%
                    </span>

                  </div>

                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(progress, 100)}%`
                      }}
                    />
                  </div>

                </div>

              </div>

              <div className="relative bg-gray-100">

                {projectPhoto?.url ? (
                  <img
                    src={projectPhoto.url}
                    alt={project?.name || 'Project'}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <HardHat className="w-12 h-12 text-gray-300" />
                  </div>
                )}

              </div>

            </div>
          </section>

          {/* ================= TODAY AT A GLANCE ================= */}

          <section>

            <div className="mb-3">

              <h2 className="text-sm font-black text-gray-900">
                Today at a glance
              </h2>

              <p className="text-xs text-gray-400 mt-0.5">
                Current project activity
              </p>

            </div>

            <div className="grid grid-cols-4 gap-4">

              {/* ================= WORKERS ================= */}

              <Link
                to="/workers"
                className="block"
              >
                <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition">

                  <div className="flex items-center justify-between">

                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                      <HardHat className="w-4 h-4 text-blue-600" />
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-gray-300" />

                  </div>

                  <p className="text-2xl font-black text-gray-900 mt-4">
                    {stats.workers ?? 0}
                  </p>

                  <p className="text-xs font-bold text-gray-700 mt-1">
                    Workers
                  </p>

                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Assigned to project
                  </p>

                </div>
              </Link>

              {/* ================= TASKS ================= */}

              <Link
                to="/tasks"
                className="block"
              >
                <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-sm transition">

                  <div className="flex items-center justify-between">

                    <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                      <ClipboardList className="w-4 h-4 text-green-600" />
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-gray-300" />

                  </div>

                  <p className="text-2xl font-black text-gray-900 mt-4">
                    {stats.tasks ?? 0}
                  </p>

                  <p className="text-xs font-bold text-gray-700 mt-1">
                    Tasks
                  </p>

                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Total project tasks
                  </p>

                </div>
              </Link>

              {/* ================= INCIDENTS ================= */}

              <Link
                to="/incidents"
                className="block"
              >
                <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-sm transition">

                  <div className="flex items-center justify-between">

                    <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-gray-300" />

                  </div>

                  <p className="text-2xl font-black text-gray-900 mt-4">
                    {stats.incidents ?? 0}
                  </p>

                  <p className="text-xs font-bold text-gray-700 mt-1">
                    Incidents
                  </p>

                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Require attention
                  </p>

                </div>
              </Link>

              {/* ================= RESOURCES ================= */}

              <Link
                to="/resources"
                className="block"
              >
                <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-sm transition">

                  <div className="flex items-center justify-between">

                    <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center">
                      <Package className="w-4 h-4 text-purple-600" />
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-gray-300" />

                  </div>

                  <p className="text-2xl font-black text-gray-900 mt-4">
                    {resources.length}
                  </p>

                  <p className="text-xs font-bold text-gray-700 mt-1">
                    Resources
                  </p>

                  <p className="text-[11px] text-gray-400 mt-0.5">
                    Available on site
                  </p>

                </div>
              </Link>

            </div>
          </section>

          {/* ================= WORKERS + RESOURCES ================= */}

          <section className="grid grid-cols-[1.35fr_1fr] gap-4">

            {/* ================= WORKERS OVERVIEW ================= */}

            <Link
              to="/workers"
              className="block"
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-5 h-full hover:border-blue-200 hover:shadow-sm transition">

                <div className="flex items-center justify-between mb-5">

                  <div>

                    <h2 className="text-sm font-black text-gray-900">
                      Workers Overview
                    </h2>

                    <p className="text-xs text-gray-400 mt-0.5">
                      Team attendance and site presence
                    </p>

                  </div>

                  <ArrowUpRight className="w-4 h-4 text-gray-300" />

                </div>

                {/* WORKER STATS */}

                <div className="grid grid-cols-4 gap-3">

                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">

                    <div className="flex items-center gap-2">

                      <Users className="w-4 h-4 text-blue-600" />

                      <span className="text-[10px] font-bold text-gray-500">
                        Total
                      </span>

                    </div>

                    <p className="text-xl font-black text-gray-900 mt-2">
                      {totalWorkers}
                    </p>

                  </div>

                  <div className="p-3 rounded-xl bg-green-50 border border-green-100">

                    <div className="flex items-center gap-2">

                      <UserCheck className="w-4 h-4 text-green-600" />

                      <span className="text-[10px] font-bold text-gray-500">
                        Present
                      </span>

                    </div>

                    <p className="text-xl font-black text-gray-900 mt-2">
                      {presentWorkers}
                    </p>

                  </div>

                  <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-100">

                    <div className="flex items-center gap-2">

                      <Clock3 className="w-4 h-4 text-yellow-600" />

                      <span className="text-[10px] font-bold text-gray-500">
                        Late
                      </span>

                    </div>

                    <p className="text-xl font-black text-gray-900 mt-2">
                      {lateWorkers}
                    </p>

                  </div>

                  <div className="p-3 rounded-xl bg-red-50 border border-red-100">

                    <div className="flex items-center gap-2">

                      <UserX className="w-4 h-4 text-red-600" />

                      <span className="text-[10px] font-bold text-gray-500">
                        Absent
                      </span>

                    </div>

                    <p className="text-xl font-black text-gray-900 mt-2">
                      {absentWorkers}
                    </p>

                  </div>

                </div>

                {/* ATTENDANCE */}

                <div className="mt-5">

                  <div className="flex items-center justify-between mb-2">

                    <span className="text-xs font-bold text-gray-500">
                      Today's attendance
                    </span>

                    <span className="text-xs font-black text-gray-900">
                      {attendancePercentage}%
                    </span>

                  </div>

                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{
                        width: `${attendancePercentage}%`
                      }}
                    />

                  </div>

                </div>

                {/* STATUS */}

                <div className="flex items-center gap-5 mt-5 pt-4 border-t border-gray-50">

                  <div className="flex items-center gap-1.5">

                    <span className="w-2 h-2 rounded-full bg-green-500" />

                    <span className="text-[10px] font-semibold text-gray-500">
                      Present
                    </span>

                  </div>

                  <div className="flex items-center gap-1.5">

                    <span className="w-2 h-2 rounded-full bg-yellow-500" />

                    <span className="text-[10px] font-semibold text-gray-500">
                      Late
                    </span>

                  </div>

                  <div className="flex items-center gap-1.5">

                    <span className="w-2 h-2 rounded-full bg-red-500" />

                    <span className="text-[10px] font-semibold text-gray-500">
                      Absent
                    </span>

                  </div>

                  {halfDayWorkers > 0 && (
                    <div className="flex items-center gap-1.5">

                      <span className="w-2 h-2 rounded-full bg-orange-500" />

                      <span className="text-[10px] font-semibold text-gray-500">
                        {halfDayWorkers} Half Day
                      </span>

                    </div>
                  )}

                </div>

              </div>
            </Link>

            {/* ================= RESOURCES ================= */}

            <div className="bg-white rounded-2xl border border-gray-100 p-5">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h2 className="text-sm font-black text-gray-900">
                    Site Resources
                  </h2>

                  <p className="text-xs text-gray-400 mt-0.5">
                    Current resource availability
                  </p>

                </div>

                <Link
                  to="/resources"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  View all
                </Link>

              </div>

              <div className="space-y-2">

                {resources.length > 0 ? (
                  resources.slice(0, 5).map((resource) => (

                    <div
                      key={resource.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100"
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-gray-100">

                          {resource.type === 'equipment' ||
                            resource.type === 'tool' ? (
                            <Wrench className="w-4 h-4 text-gray-500" />
                          ) : (
                            <Package className="w-4 h-4 text-gray-500" />
                          )}

                        </div>

                        <div>

                          <p className="text-xs font-bold text-gray-800">
                            {resource.name}
                          </p>

                          <p className="text-[11px] text-gray-400 capitalize mt-0.5">
                            {resource.quantity} {resource.unit} · {resource.type}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-md ${resource.status === 'available'
                          ? 'bg-green-50 text-green-700'
                          : resource.status === 'in_use'
                            ? 'bg-blue-50 text-blue-700'
                            : resource.status === 'damaged'
                              ? 'bg-red-50 text-red-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                      >
                        {resource.status === 'out_of_stock'
                          ? 'Out of Stock'
                          : resource.status === 'in_use'
                            ? 'In Use'
                            : resource.status === 'damaged'
                              ? 'Damaged'
                              : 'Available'}
                      </span>

                    </div>

                  ))
                ) : (
                  <div className="py-10 text-center">

                    <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />

                    <p className="text-xs text-gray-400">
                      No resources available
                    </p>

                  </div>
                )}

              </div>

            </div>

          </section>

          {/* ================= TODAY'S TASKS + ALERTS ================= */}

          <section className="grid grid-cols-[1.35fr_1fr] gap-4">

            {/* ================= TODAY'S TASKS ================= */}

            <div className="bg-white rounded-2xl border border-gray-100 p-5">

              <div className="flex items-center justify-between mb-4">

                <div>

                  <h2 className="text-sm font-black text-gray-900">
                    Today's Tasks
                  </h2>

                  <p className="text-xs text-gray-400 mt-0.5">
                    Tasks currently scheduled
                  </p>

                </div>

                <Clock3 className="w-4 h-4 text-gray-400" />

              </div>

              {timelineTasks.length > 0 ? (
                <div className="space-y-1">

                  {timelineTasks.slice(0, 4).map((task) => (

                    <div
                      key={task.id}
                      className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
                    >

                      <div className="flex items-center gap-3">

                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">

                          <CalendarDays className="w-4 h-4 text-gray-500" />

                        </div>

                        <div>

                          <p className="text-xs font-bold text-gray-800">
                            {task.title}
                          </p>

                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {task.due_date || 'No due date'}
                          </p>

                        </div>

                      </div>

                      <span
                        className={`px-2 py-1 rounded-md text-[10px] font-bold capitalize ${getStatusStyle(
                          task.status
                        )}`}
                      >
                        {task.status || 'pending'}
                      </span>

                    </div>

                  ))}

                </div>
              ) : (
                <div className="py-10 text-center">

                  <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />

                  <p className="text-xs text-gray-400">
                    No tasks scheduled.
                  </p>

                </div>
              )}

              <Link
                to="/tasks"
                className="block mt-3 pt-3 border-t border-gray-50 text-center text-[11px] font-bold text-blue-600 uppercase tracking-wide"
              >
                View all tasks
              </Link>

            </div>

            {/* ================= SITE ALERTS ================= */}

            <div className="bg-white rounded-2xl border border-gray-100 p-5">

              <div className="flex items-center justify-between mb-4">

                <div>

                  <h2 className="text-sm font-black text-gray-900">
                    Site Alerts
                  </h2>

                  <p className="text-xs text-gray-400 mt-0.5">
                    Items requiring attention
                  </p>

                </div>

                <AlertTriangle className="w-4 h-4 text-amber-500" />

              </div>

              {stats.incidents > 0 ? (
                <div className="p-4 rounded-xl bg-red-50 border border-red-100">

                  <div className="flex gap-3">

                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0">

                      <AlertTriangle className="w-4 h-4 text-red-500" />

                    </div>

                    <div>

                      <p className="text-sm font-bold text-gray-900">
                        {stats.incidents} active incident
                        {stats.incidents > 1 ? 's' : ''}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Review and resolve site issues requiring attention.
                      </p>

                    </div>

                  </div>

                </div>
              ) : (
                <div className="p-6 rounded-xl bg-green-50 border border-green-100 text-center">

                  <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />

                  <p className="text-sm font-bold text-gray-900">
                    No active incidents
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Everything looks clear on site.
                  </p>

                </div>
              )}

              <Link
                to="/incidents"
                className="block mt-3 pt-3 border-t border-gray-50 text-center text-[11px] font-bold text-blue-600 uppercase tracking-wide"
              >
                View incidents
              </Link>

            </div>

          </section>

        </main>
      )}

    </div>
  );
};

export default Dashboard;