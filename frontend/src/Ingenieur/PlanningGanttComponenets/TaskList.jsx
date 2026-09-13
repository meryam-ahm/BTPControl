import { useEffect, useState } from "react";
import axios from "axios";
import {
  Clock,
  PlayCircle,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function TaskList(  {tasks,
  selectedTask,
  setSelectedTask}) {
    const [search, setSearch] = useState("");

 
   const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-700";

      case "medium":
        return "bg-yellow-100 text-yellow-700";

      case "high":
        return "bg-orange-100 text-orange-700";

      case "urgent":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-3">

      {/* SEARCH */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks or phase by name..."
        className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* TASKS */}
      {tasks
        .filter((task) =>
          task.title
            ?.toLowerCase()
            .startsWith(search.toLowerCase())
        )
        .map((task) => (
          <div
            key={task.id}
            onClick={() => setSelectedTask(task)}
            className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
              selectedTask?.id === task.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >

            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">

                {task.status === "pending" && (
                  <Clock className="w-4 h-4 text-gray-500" />
                )}
                {task.status === "in_progress" && (
                  <PlayCircle className="w-4 h-4 text-blue-500" />
                )}
                {task.status === "review" && (
                  <Eye className="w-4 h-4 text-amber-500" />
                )}
                {task.status === "completed" && (
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                )}
                {task.status === "cancelled" && (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}

                <h3 className="font-semibold text-gray-800">
                  {task.title}
                </h3>
              </div>

              {/* PRIORITY BADGE (UPDATED) */}
              <span
                className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
            </div>

            {/* DESCRIPTION */}
            {task.description && (
              <p className="text-sm text-gray-500 mb-3">
                {task.description}
              </p>
            )}

            {/* PROGRESS */}
            <div className="mb-3">
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{task.progress}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between text-xs text-gray-500">
              <span>
                Due:{" "}
                {task.due_date
                  ? new Date(task.due_date).toLocaleDateString()
                  : "--"}
              </span>

              <span>
                {task.assigned_user?.name || "Unassigned"}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}