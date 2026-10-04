import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  MoreVertical,
  MapPin,
  Calendar,
  Check,
  Camera,
  Image as ImageIcon,
  AlertCircle,
  ChevronDown,
  ClipboardList,
  Send,
} from "lucide-react";

import WorkerReportModal from "./WorkerReportModal";

export default function WorkerTasks({
  currentProject,
  progress,
  setProgress,
  onNavigate,
}) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [reportOpen, setReportOpen] = useState(false);

  const projectId = currentProject?.project_id;

  /*
  |--------------------------------------------------------------------------
  | Load tasks for selected project
  |--------------------------------------------------------------------------
  */
  useEffect(() => {
    if (!projectId) {
      setTasks([]);
      setSelectedTask(null);
      setProgress(0);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found.");
      setTasks([]);
      setSelectedTask(null);
      setProgress(0);
      return;
    }

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
        console.log("Worker Tasks:", response.data);

        const workerTasks = Array.isArray(response.data?.tasks)
          ? response.data.tasks
          : [];

        setTasks(workerTasks);

        if (workerTasks.length > 0) {
          setSelectedTask(workerTasks[0]);
          setProgress(workerTasks[0].progress ?? 0);
        } else {
          setSelectedTask(null);
          setProgress(0);
        }
      })
      .catch((error) => {
        console.error(
          "Error loading worker tasks:",
          error.response?.status,
          error.response?.data || error.message
        );

        setTasks([]);
        setSelectedTask(null);
        setProgress(0);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId, setProgress]);

  /*
  |--------------------------------------------------------------------------
  | Current progress
  |--------------------------------------------------------------------------
  */
  const currentProgress =
    selectedTask?.progress ?? progress ?? 0;

  /*
  |--------------------------------------------------------------------------
  | Adjust progress
  |--------------------------------------------------------------------------
  */
  const handleProgressAdjustment = (amount) => {
    if (!selectedTask) return;

    const newProgress = Math.max(
      0,
      Math.min(100, currentProgress + amount)
    );

    setProgress(newProgress);

    setSelectedTask((prev) => ({
      ...prev,
      progress: newProgress,
    }));

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              progress: newProgress,
            }
          : task
      )
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Mark task as completed
  |--------------------------------------------------------------------------
  */
  const handleMarkDone = async () => {
    if (!selectedTask) return;

    if (selectedTask.status === "completed") {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/Worker/tasks/${selectedTask.id}/done`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Task completed:", response.data);

      const updatedTask = response.data?.task || {};

      const finalTask = {
        ...selectedTask,
        ...updatedTask,
        status: updatedTask.status || "completed",
        progress:
          updatedTask.progress !== undefined
            ? updatedTask.progress
            : 100,
      };

      setSelectedTask(finalTask);

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === selectedTask.id
            ? finalTask
            : task
        )
      );

      setProgress(finalTask.progress);
    } catch (error) {
      console.error(
        "Error marking task as done:",
        error.response?.status,
        error.response?.data || error.message
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Select task
  |--------------------------------------------------------------------------
  */
  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setProgress(task.progress ?? 0);
  };

  /*
  |--------------------------------------------------------------------------
  | Format status
  |--------------------------------------------------------------------------
  */
  const formatStatus = (status) => {
    if (!status) return "Pending";

    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  /*
  |--------------------------------------------------------------------------
  | No project
  |--------------------------------------------------------------------------
  */
  if (!currentProject) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-6">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center"
          >
            <ArrowLeft
              size={18}
              className="text-gray-700"
            />
          </button>

          <span>Back to Home</span>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <AlertCircle
              size={22}
              className="text-gray-400"
            />
          </div>

          <h2 className="text-sm font-bold text-gray-800">
            No Project Selected
          </h2>

          <p className="text-[11px] text-gray-400 mt-1">
            Select a project from the menu first.
          </p>

          <button
            onClick={() => onNavigate("home")}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */
  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-2 text-gray-500 text-xs font-medium mb-6">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center"
          >
            <ArrowLeft
              size={18}
              className="text-gray-700"
            />
          </button>

          <span>Back to Home</span>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center">
          <div className="w-8 h-8 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mx-auto" />

          <p className="text-xs font-semibold text-gray-700 mt-3">
            Loading your tasks...
          </p>

          <p className="text-[10px] text-gray-400 mt-1 truncate">
            {currentProject?.project?.name}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-5">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-gray-500 text-xs font-medium">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center"
          >
            <ArrowLeft
              size={18}
              className="text-gray-700 hover:scale-110 transition"
            />
          </button>

          <span>Back to Home</span>
        </div>

        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* =====================================================
          CURRENT PROJECT
      ====================================================== */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
          <MapPin
            size={15}
            className="text-emerald-600"
          />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-wide text-gray-400 font-semibold">
            Current Project
          </p>

          <p className="text-xs font-bold text-gray-800 truncate">
            {currentProject?.project?.name ||
              `Project #${projectId}`}
          </p>
        </div>
      </div>

      {/* =====================================================
          TASK SELECTOR
      ====================================================== */}
      {tasks.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3">

          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
              <ClipboardList
                size={14}
                className="text-emerald-600"
              />
            </div>

            <p className="text-[11px] font-bold text-gray-700">
              My Tasks
            </p>

            <span className="ml-auto text-[9px] font-bold text-gray-400">
              {tasks.length} task
              {tasks.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="relative">
            <select
              value={selectedTask?.id || ""}
              onChange={(e) => {
                const task = tasks.find(
                  (item) =>
                    Number(item.id) ===
                    Number(e.target.value)
                );

                if (task) {
                  handleTaskSelect(task);
                }
              }}
              className="w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 pr-9 text-xs font-semibold text-gray-700 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100"
            >
              {tasks.map((task) => (
                <option
                  key={task.id}
                  value={task.id}
                >
                  {task.title}
                </option>
              ))}
            </select>

            <ChevronDown
              size={15}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
        </div>
      )}

      {/* =====================================================
          NO TASKS
      ====================================================== */}
      {tasks.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 text-center border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <ClipboardList
              size={22}
              className="text-emerald-500"
            />
          </div>

          <h2 className="text-sm font-bold text-gray-800">
            No tasks assigned
          </h2>

          <p className="text-[11px] text-gray-400 mt-1">
            You currently have no tasks in this project.
          </p>
        </div>
      ) : (
        <>
          {/* =================================================
              TASK DETAILS
          ================================================== */}
          <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm space-y-3">

            <div>

              {/* STATUS */}
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  selectedTask?.status === "completed"
                    ? "text-emerald-700 bg-emerald-50"
                    : selectedTask?.status === "in_progress"
                    ? "text-green-700 bg-green-50"
                    : selectedTask?.status === "review"
                    ? "text-teal-700 bg-teal-50"
                    : "text-gray-600 bg-gray-100"
                }`}
              >
                {formatStatus(selectedTask?.status)}
              </span>

              {/* TITLE */}
              <h2 className="text-lg font-bold text-gray-800 mt-1">
                {selectedTask?.title}
              </h2>

              {/* DESCRIPTION */}
              {selectedTask?.description && (
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                  {selectedTask.description}
                </p>
              )}

              {/* PROJECT */}
              <div className="flex items-center text-gray-400 text-[11px] mt-2 font-medium">
                <MapPin
                  size={12}
                  className="mr-1 text-emerald-500"
                />

                <span className="truncate">
                  {currentProject?.project?.name ||
                    `Project #${projectId}`}
                </span>
              </div>
            </div>

            {/* PRIORITY */}
            {selectedTask?.priority && (
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2">
                <span className="text-[10px] font-semibold text-gray-500">
                  Priority
                </span>

                <span
                  className={`text-[10px] font-bold capitalize ${
                    selectedTask.priority === "urgent"
                      ? "text-red-600"
                      : selectedTask.priority === "high"
                      ? "text-orange-600"
                      : selectedTask.priority === "medium"
                      ? "text-amber-600"
                      : "text-emerald-600"
                  }`}
                >
                  {selectedTask.priority}
                </span>
              </div>
            )}

            {/* DEADLINE */}
            <div className="bg-emerald-50/60 rounded-xl p-2.5 flex justify-between items-center text-xs font-medium">
              <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                <Calendar size={13} />
                Deadline
              </div>

              <span className="text-gray-700 font-bold">
                {selectedTask?.due_date || "No deadline"}
              </span>
            </div>

            {/* PROGRESS */}
            <div>
              <div className="flex justify-between text-[11px] font-bold text-gray-700 mb-1">
                <span>Overall Progress</span>

                <span className="text-emerald-600">
                  {currentProgress}%
                </span>
              </div>

              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(0, currentProgress)
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* PROGRESS BUTTONS */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() =>
                  handleProgressAdjustment(10)
                }
                className="bg-emerald-50 text-emerald-600 text-xs font-bold py-2 rounded-xl border border-emerald-100 active:scale-95 transition"
              >
                +10%
              </button>

              <button
                onClick={() =>
                  handleProgressAdjustment(-10)
                }
                className="bg-gray-50 text-gray-500 text-xs font-bold py-2 rounded-xl border border-gray-200 active:scale-95 transition"
              >
                -10%
              </button>
            </div>

          </div>

          {/* =================================================
              UPLOAD PROGRESS PROOF
          ================================================== */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 space-y-3">

            <h4 className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
              <Camera
                size={14}
                className="text-emerald-600"
              />

              Upload Progress Proof
            </h4>

            <div className="grid grid-cols-2 gap-2">

              {/* CAMERA */}
              <label className="bg-emerald-50 text-emerald-700 py-2.5 rounded-xl font-bold text-xs border border-emerald-100 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-emerald-100 transition">

                <Camera size={14} />

                Camera

                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />
              </label>

              {/* GALLERY */}
              <label className="bg-green-50 text-green-700 py-2.5 rounded-xl font-bold text-xs border border-green-100 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-green-100 transition">

                <ImageIcon size={14} />

                Gallery

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
              </label>

            </div>
          </div>

          {/* =================================================
              REPORT + DONE
          ================================================== */}
          <div className="grid grid-cols-2 gap-3">

            {/* REPORT */}
            <button
              onClick={() => setReportOpen(true)}
              className="flex items-center justify-center gap-2 bg-white text-gray-700 rounded-2xl py-3 shadow-sm border border-gray-100 font-bold text-xs hover:bg-emerald-50 transition"
            >
              <Send
                size={15}
                className="text-emerald-600"
              />

              Report Something
            </button>

            {/* MARK DONE */}
            <button
              onClick={handleMarkDone}
              disabled={
                !selectedTask ||
                selectedTask.status === "completed"
              }
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl py-3 shadow-md font-bold text-xs transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Check size={15} />

              {selectedTask?.status === "completed"
                ? "Completed"
                : "Mark Done"}
            </button>

          </div>
        </>
      )}

      {/* =====================================================
          REPORT MODAL
      ====================================================== */}
      {reportOpen && (
        <WorkerReportModal
          projectId={projectId}
          tasks={tasks}
          selectedTask={selectedTask}
          onClose={() => setReportOpen(false)}
          onCreated={(response) => {
            console.log("Report created:", response);
          }}
        />
      )}

    </div>
  );
}