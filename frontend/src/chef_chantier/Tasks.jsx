import React, { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  ClipboardList,
  CalendarDays,
  UserRound,
  CheckCircle2,
  Clock3,
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import WorkerTaskForm from './WorkerTaskForm';
import axios from 'axios';

const Tasks = ({ currentProject }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');

  const projectId = currentProject?.project_id;

  const filters = [
    'All',
    'pending',
    'in progress',
    'review',
    'completed',
    'cancelled'
  ];

  useEffect(() => {
    if (!projectId) {
      setTasks([]);
      return;
    }

    axios
      .get(
        `http://127.0.0.1:8000/api/SiteManager/projects/${projectId}/tasks`
      )
      .then((res) => {
        const tasksArray = Array.isArray(res.data)
          ? res.data
          : res.data.tasks || [];

        const tasksData = tasksArray.map((task) => ({
          id: task.id,
          title: task.title,
          worker: task.worker,
          deadline: task.due_date,
          progress: Number(task.progress) || 0,
          status: task.status?.toLowerCase() || 'pending'
        }));

        setTasks(tasksData);
      })
      .catch((error) => {
        console.error('Tasks error:', error);
        setTasks([]);
      });
  }, [projectId]);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      activeFilter === 'All' ||
      task.status === activeFilter;

    const searchValue = search.toLowerCase();

    const matchesSearch =
      task.title?.toLowerCase().includes(searchValue) ||
      task.worker?.toLowerCase().includes(searchValue);

    return matchesFilter && matchesSearch;
  });

  const getStatus = (status) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Completed',
          bg: 'bg-green-50',
          text: 'text-green-700',
          icon: <CheckCircle2 className="w-3.5 h-3.5" />
        };

      case 'in progress':
        return {
          label: 'In Progress',
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          icon: <Clock3 className="w-3.5 h-3.5" />
        };

      case 'review':
        return {
          label: 'Review',
          bg: 'bg-purple-50',
          text: 'text-purple-700',
          icon: <AlertCircle className="w-3.5 h-3.5" />
        };

      case 'cancelled':
        return {
          label: 'Cancelled',
          bg: 'bg-red-50',
          text: 'text-red-700',
          icon: <AlertCircle className="w-3.5 h-3.5" />
        };

      default:
        return {
          label: 'Pending',
          bg: 'bg-amber-50',
          text: 'text-amber-700',
          icon: <Clock3 className="w-3.5 h-3.5" />
        };
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in progress':
        return 'bg-blue-500';
      case 'review':
        return 'bg-purple-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-amber-400';
    }
  };

  return (
    <div className="max-w-[1180px] mx-auto min-h-[calc(100vh-120px)] bg-[#F7F8FA] font-sans">
      {!currentProject ? (
        <div className="min-h-[600px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
              <ClipboardList className="w-7 h-7 text-blue-500" />
            </div>

            <h2 className="text-lg font-bold text-gray-900">
              No project selected
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Select a project from the header to view its tasks.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* ================= PAGE HEADER ================= */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-start gap-3">
              {/* BACK ARROW */}
              <button
                onClick={() => window.history.back()}
                className="mt-1 w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
                title="Go back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ClipboardList className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    Project Tasks
                  </span>
                </div>

                <h1 className="text-2xl font-black text-gray-900">
                  Tasks
                </h1>

                <p className="text-sm text-gray-400 mt-1">
                  Manage and monitor work assigned to your team.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowTaskForm(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-sm transition"
            >
              <Plus className="w-4 h-4" />
              New Task
            </button>
          </div>

          {/* ================= SUMMARY ================= */}
          <div className="grid grid-cols-4 gap-4 mb-5">
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-medium text-gray-400">
                Total Tasks
              </p>
              <p className="text-2xl font-black text-gray-900 mt-2">
                {tasks.length}
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-medium text-gray-400">
                In Progress
              </p>
              <p className="text-2xl font-black text-blue-600 mt-2">
                {tasks.filter(
                  (task) => task.status === 'in progress'
                ).length}
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-medium text-gray-400">
                Completed
              </p>
              <p className="text-2xl font-black text-green-600 mt-2">
                {tasks.filter(
                  (task) => task.status === 'completed'
                ).length}
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <p className="text-xs font-medium text-gray-400">
                Needs Review
              </p>
              <p className="text-2xl font-black text-purple-600 mt-2">
                {tasks.filter(
                  (task) => task.status === 'review'
                ).length}
              </p>
            </div>
          </div>

          {/* ================= TOOLBAR ================= */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-5">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search task or worker..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                      activeFilter === filter
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {filter === 'All'
                      ? 'All'
                      : filter === 'in progress'
                      ? 'In Progress'
                      : filter.charAt(0).toUpperCase() +
                        filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ================= TASK LIST ================= */}
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-black text-gray-900">
                  Task Overview
                </h2>

                <p className="text-xs text-gray-400 mt-0.5">
                  {filteredTasks.length} task
                  {filteredTasks.length !== 1 ? 's' : ''} displayed
                </p>
              </div>
            </div>

            {filteredTasks.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {filteredTasks.map((task) => {
                  const status = getStatus(task.status);

                  return (
                    <div
                      key={task.id}
                      className="px-5 py-4 hover:bg-gray-50/70 transition"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
                          <ClipboardList className="w-5 h-5 text-gray-500" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1.5">
                            <h3 className="text-sm font-bold text-gray-900 truncate">
                              {task.title}
                            </h3>

                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-bold ${status.bg} ${status.text}`}
                            >
                              {status.icon}
                              {status.label}
                            </span>
                          </div>

                          <div className="flex items-center gap-5 text-xs text-gray-400">
                            <span className="flex items-center gap-1.5">
                              <UserRound className="w-3.5 h-3.5" />
                              {task.worker || 'Not assigned'}
                            </span>

                            <span className="flex items-center gap-1.5">
                              <CalendarDays className="w-3.5 h-3.5" />
                              {task.deadline || 'No deadline'}
                            </span>
                          </div>
                        </div>

                        <div className="w-40 shrink-0">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                              Progress
                            </span>

                            <span className="text-xs font-black text-gray-900">
                              {task.progress}%
                            </span>
                          </div>

                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${getProgressColor(
                                task.status
                              )}`}
                              style={{
                                width: `${Math.min(
                                  task.progress,
                                  100
                                )}%`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-20 text-center">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-3">
                  <ClipboardList className="w-7 h-7 text-gray-300" />
                </div>

                <p className="text-sm font-semibold text-gray-500">
                  No tasks found
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Try changing your search or filter.
                </p>
              </div>
            )}
          </div>

          {/* ================= NEW TASK ================= */}
          {showTaskForm && (
            <WorkerTaskForm
              currentProject={projectId}
              setShowTaskForm={setShowTaskForm}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Tasks;