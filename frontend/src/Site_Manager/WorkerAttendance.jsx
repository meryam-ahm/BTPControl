import React, { useEffect, useState } from "react";
import { X, Clock, Calendar } from "lucide-react";
import axios from "axios";

const ATTENDANCE_STYLES = {
  present: "bg-green-50 text-green-600 border-green-200",
  late: "bg-yellow-50 text-yellow-600 border-yellow-200",
  half_day: "bg-orange-50 text-orange-600 border-orange-200",
  absent: "bg-red-50 text-red-600 border-red-200",
  default: "bg-gray-50 text-gray-600 border-gray-200",
};

const WorkerAttendance = ({ worker, onClose }) => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!worker?.id) return;
    const token = localStorage.getItem("token");
    const authHeaders = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/workers/${worker.id}/attendance`,authHeaders)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data?.history || [];
        setAttendance(data);
      })
      .catch((error) => console.error("Error fetching attendance history:", error))
      .finally(() => setLoading(false));
  }, [worker]);

  if (!worker) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Attendance History</h2>
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

        <div className="h-[calc(100%-73px)] overflow-y-auto p-6">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm font-medium text-gray-400">Loading history...</p>
            </div>
          ) : attendance.length > 0 ? (
            <div className="space-y-3">
              {attendance.map((entry) => {
                const statusStyle =
                  ATTENDANCE_STYLES[entry.status?.toLowerCase()] ||
                  ATTENDANCE_STYLES.default;

                return (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50">
                        <Clock className="h-5 w-5 text-gray-500" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Calendar className="h-3.5 w-3.5" />
                          {entry.date}
                        </div>
                        <p className="mt-0.5 text-xs font-medium text-gray-400">
                          Check-in: {entry.check_in || "N/A"}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize ${statusStyle}`}
                    >
                      {entry.status || "N/A"}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm font-medium text-gray-400">
                No attendance logs recorded
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerAttendance;