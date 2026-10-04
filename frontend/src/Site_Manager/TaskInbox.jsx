import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Search,
  ClipboardList,
  CalendarDays,
  Clock,
  Flag,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

const API_URL = "http://127.0.0.1:8000/api";

export default function TaskInbox({ onNewTasks }) {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };

  const normalizeStatus = (status) => {
    if (!status) return "pending";

    return status
      .toLowerCase()
      .replace(/\s+/g, "_");
  };

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API_URL}/tasks/task-inbox`,
        authorization
      );

      const data = response.data;

      const taskList = Array.isArray(data)
        ? data
        : data?.tasks || [];

      setTasks(taskList);

      /*
       * Red notification:
       * Show it when there is at least one pending task.
       */
      const hasNew = taskList.some(
        (task) =>
          normalizeStatus(task.status) === "pending"
      );

      if (onNewTasks) {
        onNewTasks(hasNew);
      }
    } catch (err) {
      console.error("TASK INBOX ERROR:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load assigned tasks."
      );

      if (onNewTasks) {
        onNewTasks(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    const term = search.toLowerCase().trim();

    return tasks.filter((task) => {
      const matchesSearch =
        !term ||
        task.title?.toLowerCase().includes(term) ||
        task.description?.toLowerCase().includes(term) ||
        task.project?.name?.toLowerCase().includes(term) ||
        task.project_name?.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === "all" ||
        normalizeStatus(task.status) === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, search, statusFilter]);

  const getStatusStyle = (status) => {
    switch (normalizeStatus(status)) {
      case "completed":
        return "bg-emerald-50 text-emerald-700";

      case "in_progress":
        return "bg-blue-50 text-blue-700";

      case "review":
        return "bg-purple-50 text-purple-700";

      case "cancelled":
        return "bg-red-50 text-red-700";

      default:
        return "bg-amber-50 text-amber-700";
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "urgent":
        return "text-red-600";

      case "high":
        return "text-orange-600";

      case "medium":
        return "text-amber-600";

      default:
        return "text-gray-500";
    }
  };

  const formatStatus = (status) => {
    if (!status) return "Pending";

    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full bg-white">

      {/* Header */}
      <div className="px-5 pt-5 pb-4">

        <div className="flex items-center justify-between gap-3 mb-4">

          <div>
            <h2 className="text-base font-bold text-gray-900">
              Task Inbox
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Instructions received from the Engineer
            </p>
          </div>

          <button
            type="button"
            onClick={loadTasks}
            disabled={loading}
            className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition disabled:opacity-50"
            title="Refresh"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
          </button>

        </div>

        {/* Search */}
        <div className="relative mb-3">

          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="w-full h-10 pl-9 pr-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
          />

        </div>

        {/* Status filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">

          {[
            { value: "all", label: "All" },
            { value: "pending", label: "Pending" },
            { value: "in_progress", label: "In Progress" },
            { value: "review", label: "Review" },
            { value: "completed", label: "Completed" },
          ].map((filter) => (

            <button
              key={filter.value}
              type="button"
              onClick={() => setStatusFilter(filter.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                statusFilter === filter.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>

          ))}

        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="mx-5 mb-4 p-3 rounded-lg bg-red-50 border border-red-100 flex items-start gap-2">

          <AlertCircle
            size={17}
            className="text-red-500 mt-0.5 flex-shrink-0"
          />

          <div className="flex-1">

            <p className="text-sm font-semibold text-red-700">
              Unable to load tasks
            </p>

            <p className="text-xs text-red-600 mt-1">
              {error}
            </p>

          </div>

          <button
            type="button"
            onClick={loadTasks}
            className="text-xs font-semibold text-red-600 hover:text-red-800"
          >
            Retry
          </button>

        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="px-5 py-10 flex flex-col items-center justify-center">

          <RefreshCw
            size={24}
            className="text-blue-500 animate-spin"
          />

          <p className="text-sm text-gray-500 mt-3">
            Loading tasks...
          </p>

        </div>
      )}

      {/* Empty */}
      {!loading && !error && filteredTasks.length === 0 && (
        <div className="px-5 py-12 flex flex-col items-center justify-center text-center">

          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-3">

            <ClipboardList
              size={22}
              className="text-gray-400"
            />

          </div>

          <p className="text-sm font-semibold text-gray-700">
            No tasks found
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {tasks.length === 0
              ? "You have no instructions from the Engineer yet."
              : "Try changing your search or status filter."}
          </p>

        </div>
      )}

      {/* Task cards */}
      {!loading && filteredTasks.length > 0 && (
        <div className="px-5 pb-5 space-y-3">

          {filteredTasks.map((task) => {

            const projectName =
              task.project?.name ||
              task.project_name ||
              "Unknown project";

            return (
              <div
                key={task.id}
                className="border border-gray-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition"
              >

                {/* Top */}
                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-start gap-3 min-w-0">

                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">

                      <ClipboardList
                        size={18}
                        className="text-blue-600"
                      />

                    </div>

                    <div className="min-w-0">

                      <h3 className="text-sm font-bold text-gray-900">
                        {task.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {projectName}
                      </p>

                    </div>

                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap ${getStatusStyle(
                      task.status
                    )}`}
                  >
                    {formatStatus(task.status)}
                  </span>

                </div>

                {/* Description */}
                {task.description && (
                  <p className="text-xs text-gray-600 mt-3 leading-5">
                    {task.description}
                  </p>
                )}

                {/* Information */}
                <div className="grid grid-cols-2 gap-3 mt-4">

                  {/* Priority */}
                  <div className="flex items-center gap-2">

                    <Flag
                      size={14}
                      className={getPriorityStyle(task.priority)}
                    />

                    <div>

                      <p className="text-[10px] text-gray-400 uppercase font-semibold">
                        Priority
                      </p>

                      <p className="text-xs font-semibold text-gray-700 capitalize">
                        {task.priority || "—"}
                      </p>

                    </div>

                  </div>

                  {/* Estimated */}
                  <div className="flex items-center gap-2">

                    <Clock
                      size={14}
                      className="text-gray-400"
                    />

                    <div>

                      <p className="text-[10px] text-gray-400 uppercase font-semibold">
                        Estimated
                      </p>

                      <p className="text-xs font-semibold text-gray-700">
                        {task.estimated_hours
                          ? `${task.estimated_hours} h`
                          : "—"}
                      </p>

                    </div>

                  </div>

                  {/* Begin */}
                  <div className="flex items-center gap-2">

                    <CalendarDays
                      size={14}
                      className="text-gray-400"
                    />

                    <div>

                      <p className="text-[10px] text-gray-400 uppercase font-semibold">
                        Begin
                      </p>

                      <p className="text-xs font-semibold text-gray-700">
                        {formatDate(task.begin_date)}
                      </p>

                    </div>

                  </div>

                  {/* Due */}
                  <div className="flex items-center gap-2">

                    <CalendarDays
                      size={14}
                      className="text-gray-400"
                    />

                    <div>

                      <p className="text-[10px] text-gray-400 uppercase font-semibold">
                        Due
                      </p>

                      <p className="text-xs font-semibold text-gray-700">
                        {formatDate(task.due_date)}
                      </p>

                    </div>

                  </div>

                </div>

                {/* Progress */}
                <div className="mt-4">

                  <div className="flex items-center justify-between mb-1.5">

                    <span className="text-[10px] font-semibold text-gray-400 uppercase">
                      Progress
                    </span>

                    <span className="text-xs font-bold text-gray-700">
                      {task.progress ?? 0}%
                    </span>

                  </div>

                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">

                    <div
                      className="h-full bg-blue-500 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(0, task.progress ?? 0)
                        )}%`,
                      }}
                    />

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}