import React from "react";
import { X, Phone, Mail, Briefcase, Calendar, Circle } from "lucide-react";

const WorkerProfileModal = ({ worker, onClose }) => {
  if (!worker) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Worker Profile</h2>
            <p className="mt-1 text-xs text-gray-400">Worker information</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col items-center px-6 py-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-200 bg-gray-100">
            <span className="text-2xl font-bold text-gray-500">
              {worker.name?.charAt(0)?.toUpperCase()}
            </span>
          </div>
          <h3 className="mt-3 text-xl font-bold text-gray-900">{worker.name}</h3>
          <p className="mt-1 text-sm font-medium text-gray-500">{worker.role}</p>

          <div className="mt-3 flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5">
            <Circle
              className={`h-2.5 w-2.5 fill-current ${
                worker.statusColor || "text-gray-400"
              }`}
            />
            <span
              className={`text-xs font-bold ${
                worker.statusColor || "text-gray-500"
              }`}
            >
              {worker.status || "Unknown"}
            </span>
          </div>
        </div>

        <div className="space-y-3 px-6 pb-6">
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <Briefcase className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Project</p>
              <p className="text-sm font-semibold text-gray-800">
                {worker.project_name || "Not available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <Phone className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Phone</p>
              <p className="text-sm font-semibold text-gray-800">
                {worker.phone || "Not available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <Mail className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Email</p>
              <p className="text-sm font-semibold text-gray-800">
                {worker.email || "Not available"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white">
              <Calendar className="h-5 w-5 text-gray-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400">Joined Project</p>
              <p className="text-sm font-semibold text-gray-800">
                {worker.joined_at || "Not available"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfileModal;