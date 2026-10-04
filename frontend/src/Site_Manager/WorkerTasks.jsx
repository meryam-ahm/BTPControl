import React from "react";
import { X, ClipboardList, CalendarDays, Circle } from "lucide-react";

// Status color mapping for individual tasks
const TASK_STATUS_STYLES = {
  pending: "bg-yellow-50 text-yellow-600 border-yellow-200",
  "in_progress": "bg-blue-50 text-blue-600 border-blue-200",
  in_progress: "bg-blue-50 text-blue-600 border-blue-200",
  completed: "bg-green-50 text-green-600 border-green-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
  default: "bg-gray-50 text-gray-600 border-gray-200",
};

const getTaskStatusStyle = (status) => {
  const normalized = status?.toLowerCase()?.replace(" ", "_");
  return TASK_STATUS_STYLES[normalized] || TASK_STATUS_STYLES.default;
};

const WorkerTasks = ({ worker, onClose }) => {
  if (!worker) return null;

  const tasks = worker.tasks || worker.Workertasks || worker.workerTasks || [];

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Worker Tasks</h2>
            <p className="mt-1 text-xs text-gray-400">
              {worker.name} · {worker.role}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tasks List */}
        <div className="h-[calc(100%-73px)] overflow-y-auto p-6">
          {tasks.length > 0 ? (
            <div className="space-y-3">
              {tasks.map((task) => {
                const statusStyle = getTaskStatusStyle(task.status);

                return (
                  <div
                    key={task.id}
                    className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50">
                          <ClipboardList className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-gray-900">
                            {task.title}
                          </h3>
                          <p className="mt-1 text-xs text-gray-400">
                            {task.description || "No description"}
                          </p>
                        </div>
                      </div>
                      <Circle className="h-3 w-3 fill-current text-blue-500" />
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <CalendarDays className="h-4 w-4" />
                        {task.due_date || task[" due_date"] || "No due date"}
                      </div>

                      {/* Dynamic status badge styling */}
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize border ${statusStyle}`}
                      >
                        {task.status || "Pending"}
                      </span>
                    </div>

                    {task.progress !== undefined && (
                      <div className="mt-4">
                        <div className="mb-1 flex justify-between text-xs">
                          <span className="font-medium text-gray-400">
                            Progress
                          </span>
                          <span className="font-bold text-gray-700">
                            {task.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-100">
                          <div
                            className="h-1.5 rounded-full bg-blue-600"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm font-medium text-gray-400">
                No tasks assigned to this worker
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerTasks;