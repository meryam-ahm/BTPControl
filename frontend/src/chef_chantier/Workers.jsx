import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Search,
  MoreVertical,
  Users,
  UserCheck,
  Clock3,
  UserX,
  UserRound
} from "lucide-react";
import axios from "axios";

import CreateWorker from "./CreateWorker";
import WorkerMenu from "./WorkerMenu";
import WorkerProfileModal from "./WorkerProfileModal";
import WorkerTasks from "./WorkerTasks";
import WorkerAttendance from "./WorkerAttendance";

const FILTERS = ["All", "present", "late", "half_day", "absent"];

const STATUS_LABELS = {
  present: "Present",
  late: "Late",
  half_day: "Half Day",
  absent: "Absent"
};

const STATUS_STYLES = {
  present: {
    color: "text-green-700",
    bg: "bg-green-50",
    dot: "bg-green-500"
  },
  late: {
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    dot: "bg-yellow-500"
  },
  half_day: {
    color: "text-orange-700",
    bg: "bg-orange-50",
    dot: "bg-orange-500"
  },
  absent: {
    color: "text-red-700",
    bg: "bg-red-50",
    dot: "bg-red-500"
  },
  default: {
    color: "text-gray-600",
    bg: "bg-gray-50",
    dot: "bg-gray-400"
  }
};

const getStatusLabel = (status) =>
  STATUS_LABELS[status] || status || "Unknown";

const Workers = ({ currentProject }) => {
  const [workers, setWorkers] = useState([]);
  const [showCreateWorkerForm, setShowCreateWorkerForm] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [activeModal, setActiveModal] = useState({
    type: null,
    worker: null
  });

  const projectId = currentProject?.project_id;

  /* ================= CLOSE MENU ================= */

  useEffect(() => {
    const handleOutsideClick = () => {
      setOpenMenuId(null);
    };

    if (openMenuId !== null) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [openMenuId]);

  /* ================= FETCH WORKERS ================= */

  useEffect(() => {
    if (!projectId) {
      setWorkers([]);
      return;
    }

    axios
      .get(
        `http://127.0.0.1:8000/api/projects/${projectId}/workers`
      )
      .then((res) => {
        const workersArray = Array.isArray(res.data)
          ? res.data
          : res.data?.workers || [];

        const workersData = workersArray.map((worker) => {
          const status = worker.status?.toLowerCase();
          const style =
            STATUS_STYLES[status] || STATUS_STYLES.default;

          const rawTasks =
            worker.Workertasks ||
            worker.workerTasks ||
            worker.tasks ||
            [];

          return {
            id: worker.id,
            name: worker.name,
            role: worker.role,
            project_name: worker.project_name,
            phone: worker.phone,
            email: worker.email,
            joined_at:
              worker.joined_at || worker.created_at,
            status: status,
            statusColor: style.color,
            statusBg: style.bg,
            statusDot: style.dot,

            tasks: Array.isArray(rawTasks)
              ? rawTasks.map((task) => ({
                  id: task.id,
                  title: task.title,
                  description: task.description,
                  due_date:
                    task.due_date ||
                    task[" due_date"] ||
                    task.deadline,
                  status:
                    task.status ||
                    task.status_task ||
                    "Pending",
                  progress: task.progress ?? 0
                }))
              : []
          };
        });

        setWorkers(workersData);
      })
      .catch((error) => {
        console.error("Error fetching workers:", error);
        setWorkers([]);
      });
  }, [projectId]);

  /* ================= CREATE WORKER ================= */

  const handleWorkerCreated = (worker) => {
    setWorkers((prev) => [...prev, worker]);
    setShowCreateWorkerForm(false);
  };

  /* ================= WORKER ACTION ================= */

  const handleWorkerAction = (action, workerId) => {
    const worker = workers.find(
      (item) => item.id === workerId
    );

    if (!worker) return;

    setOpenMenuId(null);

    if (action === "remove") {
      const confirmed = window.confirm(
        `Are you sure you want to remove ${worker.name} from this project?`
      );

      if (!confirmed) return;

      axios
        .delete(
          `http://127.0.0.1:8000/api/projects/${projectId}/workers/${workerId}`
        )
        .then(() => {
          setWorkers((prevWorkers) =>
            prevWorkers.filter(
              (item) => item.id !== workerId
            )
          );
        })
        .catch((error) => {
          console.error(
            "Error removing worker:",
            error
          );
        });

      return;
    }

    setActiveModal({
      type: action,
      worker
    });
  };

  const closeModal = () => {
    setActiveModal({
      type: null,
      worker: null
    });
  };

  /* ================= FILTER ================= */

  const filteredWorkers = workers.filter((worker) => {
    const matchesFilter =
      activeFilter === "All" ||
      worker.status === activeFilter;

    const searchValue = search.toLowerCase().trim();

    const matchesSearch =
      worker.name?.toLowerCase().includes(searchValue) ||
      worker.role?.toLowerCase().includes(searchValue);

    return matchesFilter && matchesSearch;
  });

  /* ================= STATS ================= */

  const totalWorkers = workers.length;

  const presentWorkers = workers.filter(
    (worker) => worker.status === "present"
  ).length;

  const lateWorkers = workers.filter(
    (worker) => worker.status === "late"
  ).length;

  const absentWorkers = workers.filter(
    (worker) => worker.status === "absent"
  ).length;

  /* ================= NO PROJECT ================= */

  if (!currentProject) {
    return (
      <div className="min-h-[650px] flex items-center justify-center">
        <div className="text-center">

          <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-blue-500" />
          </div>

          <h2 className="text-lg font-black text-gray-900">
            No project selected
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Select a project from the header to view its workers.
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1180px] mx-auto min-h-[calc(100vh-120px)] font-sans">

      {/* ================= PAGE HEADER ================= */}

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-4">

          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>

            <div className="flex items-center gap-2">

              <Users className="w-4 h-4 text-blue-600" />

              <span className="text-[11px] font-black uppercase tracking-wider text-blue-600">
                Project Team
              </span>

            </div>

            <h1 className="text-2xl font-black text-gray-900 mt-1">
              Workers
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Manage workers assigned to this construction project.
            </p>

          </div>

        </div>

        <button
          onClick={() => setShowCreateWorkerForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add Worker
        </button>

      </div>

      {/* ================= PROJECT INFO ================= */}

      <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 mb-5 flex items-center justify-between">

        <div>

          <p className="text-[10px] uppercase tracking-wider font-black text-gray-400">
            Current Project
          </p>

          <h2 className="text-sm font-black text-gray-900 mt-1">
            {currentProject?.project?.name ||
              currentProject?.project_name ||
              `Project #${projectId}`}
          </h2>

        </div>

        <div className="flex items-center gap-2">

          <span className="w-2 h-2 rounded-full bg-green-500" />

          <span className="text-xs font-bold text-gray-500">
            Project active
          </span>

        </div>

      </div>

      {/* ================= STATS ================= */}

      <div className="grid grid-cols-4 gap-4 mb-5">

        <div className="bg-white border border-gray-100 rounded-2xl p-4">

          <div className="flex items-center justify-between">

            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="w-4 h-4 text-blue-600" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
              Team
            </span>

          </div>

          <p className="text-2xl font-black text-gray-900 mt-4">
            {totalWorkers}
          </p>

          <p className="text-xs font-semibold text-gray-400 mt-1">
            Total workers
          </p>

        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4">

          <div className="flex items-center justify-between">

            <div className="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-green-600" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
              Today
            </span>

          </div>

          <p className="text-2xl font-black text-gray-900 mt-4">
            {presentWorkers}
          </p>

          <p className="text-xs font-semibold text-gray-400 mt-1">
            Present
          </p>

        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4">

          <div className="flex items-center justify-between">

            <div className="w-9 h-9 rounded-xl bg-yellow-50 flex items-center justify-center">
              <Clock3 className="w-4 h-4 text-yellow-600" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
              Attention
            </span>

          </div>

          <p className="text-2xl font-black text-gray-900 mt-4">
            {lateWorkers}
          </p>

          <p className="text-xs font-semibold text-gray-400 mt-1">
            Late today
          </p>

        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-4">

          <div className="flex items-center justify-between">

            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
              <UserX className="w-4 h-4 text-red-600" />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
              Today
            </span>

          </div>

          <p className="text-2xl font-black text-gray-900 mt-4">
            {absentWorkers}
          </p>

          <p className="text-xs font-semibold text-gray-400 mt-1">
            Absent
          </p>

        </div>

      </div>

      {/* ================= CREATE WORKER ================= */}

      {showCreateWorkerForm && (
        <CreateWorker
          currentProject={projectId}
          projectName={
            workers[0]?.project_name ||
            currentProject?.project?.name
          }
          onClose={() =>
            setShowCreateWorkerForm(false)
          }
          onWorkerCreated={handleWorkerCreated}
        />
      )}

      {/* ================= WORKERS PANEL ================= */}

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">

        {/* TOOLBAR */}

        <div className="p-5 border-b border-gray-100">

          <div className="flex items-center justify-between gap-5">

            {/* SEARCH */}

            <div className="relative w-full max-w-md">

              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search workers or roles..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />

            </div>

            {/* RESULT COUNT */}

            <div className="hidden sm:block text-xs font-semibold text-gray-400 whitespace-nowrap">
              {filteredWorkers.length} of {workers.length} workers
            </div>

          </div>

          {/* FILTERS */}

          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">

            {FILTERS.map((filter) => {

              const isActive =
                activeFilter === filter;

              const count =
                filter === "All"
                  ? workers.length
                  : workers.filter(
                      (worker) =>
                        worker.status === filter
                    ).length;

              return (
                <button
                  key={filter}
                  onClick={() =>
                    setActiveFilter(filter)
                  }
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-100"
                  }`}
                >
                  {filter === "All"
                    ? "All"
                    : getStatusLabel(filter)}

                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-white text-gray-400"
                    }`}
                  >
                    {count}
                  </span>

                </button>
              );
            })}

          </div>

        </div>

        {/* ================= WORKERS LIST ================= */}

        <div className="p-5">

          {filteredWorkers.length > 0 ? (

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">

              {filteredWorkers.map((worker) => {

                const statusStyle =
                  STATUS_STYLES[worker.status] ||
                  STATUS_STYLES.default;

                return (

                  <div
                    key={worker.id}
                    className="group bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition"
                  >

                    <div className="flex items-center justify-between">

                      {/* WORKER */}

                      <div className="flex items-center gap-3 min-w-0">

                        <div className="relative shrink-0">

                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-gray-100 border border-gray-100 flex items-center justify-center">

                            <span className="text-sm font-black text-blue-600">
                              {worker.name
                                ?.charAt(0)
                                ?.toUpperCase() || "W"}
                            </span>

                          </div>

                          <span
                            className={`absolute -right-0.5 -bottom-0.5 w-3 h-3 rounded-full border-2 border-white ${worker.statusDot}`}
                          />

                        </div>

                        <div className="min-w-0">

                          <h3 className="text-sm font-black text-gray-900 truncate">
                            {worker.name}
                          </h3>

                          <div className="flex items-center gap-2 mt-1">

                            <UserRound className="w-3 h-3 text-gray-400" />

                            <p className="text-[11px] font-semibold text-gray-400 truncate">
                              {worker.role || "Worker"}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* MENU */}

                      <div className="relative shrink-0">

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();

                            setOpenMenuId(
                              openMenuId === worker.id
                                ? null
                                : worker.id
                            );
                          }}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {openMenuId === worker.id && (
                          <WorkerMenu
                            worker={worker}
                            setOpenMenuId={setOpenMenuId}
                            onAction={handleWorkerAction}
                          />
                        )}

                      </div>

                    </div>

                    {/* WORKER FOOTER */}

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">

                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-black ${statusStyle.bg} ${statusStyle.color}`}
                      >

                        <span
                          className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                        />

                        {getStatusLabel(worker.status)}

                      </span>

                      <span className="text-[10px] font-semibold text-gray-400">
                        {worker.tasks?.length || 0} task
                        {(worker.tasks?.length || 0) !== 1
                          ? "s"
                          : ""}
                      </span>

                    </div>

                  </div>

                );
              })}

            </div>

          ) : (

            <div className="py-20 text-center">

              <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-3">

                <Users className="w-7 h-7 text-gray-300" />

              </div>

              <p className="text-sm font-bold text-gray-600">
                No workers found
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Try changing your search or filter.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* ================= MODALS ================= */}

      {activeModal.type === "profile" && (
        <WorkerProfileModal
          worker={activeModal.worker}
          onClose={closeModal}
        />
      )}

      {activeModal.type === "tasks" && (
        <WorkerTasks
          worker={activeModal.worker}
          onClose={closeModal}
        />
      )}

      {activeModal.type === "attendance" && (
        <WorkerAttendance
          worker={activeModal.worker}
          onClose={closeModal}
        />
      )}

    </div>
  );
};

export default Workers;