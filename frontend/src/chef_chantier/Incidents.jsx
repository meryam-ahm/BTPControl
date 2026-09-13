import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Search,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import axios from "axios";
import ReportIncident from "./ReportIncident";

const Incidents = ({ currentProject }) => {
  const projectId = currentProject?.project_id;

  const [incidents, setIncidents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);

  const fetchIncidents = async () => {
    if (!projectId) {
      setIncidents([]);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/projects/${projectId}/incidents`
      );

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.incidents || [];

      setIncidents(data);
    } catch (err) {
      console.error("Error fetching incidents:", err);
      setIncidents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, [projectId]);

  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return {
          text: "text-[#EA4335]",
          bg: "bg-[#FCE8E6]",
          icon: "text-[#EA4335]",
        };

      case "medium":
        return {
          text: "text-[#FA7B17]",
          bg: "bg-[#FEF1E6]",
          icon: "text-[#FA7B17]",
        };

      default:
        return {
          text: "text-[#34A853]",
          bg: "bg-[#E6F4EA]",
          icon: "text-[#34A853]",
        };
    }
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "closed":
        return "bg-green-50 text-green-600";

      case "draft":
        return "bg-gray-100 text-gray-500";

      case "open":
        return "bg-red-50 text-red-600";

      default:
        return "bg-blue-50 text-blue-600";
    }
  };

  const filteredIncidents = incidents.filter((incident) => {
    const value = search.toLowerCase();

    return (
      incident.title?.toLowerCase().includes(value) ||
      incident.type?.toLowerCase().includes(value) ||
      incident.severity?.toLowerCase().includes(value) ||
      incident.check_name?.toLowerCase().includes(value)
    );
  });

  const handleCreated = (newIncident) => {
    setIncidents((prev) => [newIncident, ...prev]);
    setShowReportForm(false);
  };

  if (!currentProject) {
    return (
      <div className="max-w-[1180px] mx-auto min-h-[650px] flex items-center justify-center bg-[#F7F8FA]">
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-red-50 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7 text-red-500" />
          </div>

          <h2 className="text-lg font-bold text-gray-900">
            No project selected
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Select a project from the header to view its incidents.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1180px] mx-auto min-h-[calc(100vh-120px)] bg-[#F7F8FA] font-sans">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-start gap-3">
          {/* BACK ARROW */}
          <button
            type="button"
            onClick={() => window.history.back()}
            className="mt-1 w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition shadow-sm"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-5 h-5 text-red-500" />

              <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                Safety & Quality
              </span>
            </div>

            <h1 className="text-2xl font-black text-gray-900">
              Incidents
            </h1>

            <p className="text-sm text-gray-400 mt-1">
              Track and report safety and quality issues.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* REFRESH */}
          <button
            type="button"
            onClick={fetchIncidents}
            disabled={loading}
            className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition shadow-sm"
            title="Refresh"
          >
            <RefreshCw
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
          </button>

          {/* REPORT */}
          <button
            type="button"
            onClick={() => setShowReportForm(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            Report Incident
          </button>
        </div>
      </div>

      {/* ================= PROJECT INFO ================= */}
      <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 mb-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Current Project
            </p>

            <h2 className="text-sm font-bold text-gray-900 mt-1">
              {currentProject?.project?.name || "Unnamed Project"}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Incidents
            </p>

            <p className="text-xl font-black text-gray-900">
              {incidents.length}
            </p>
          </div>
        </div>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-5">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search incidents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
        </div>
      </div>

      {/* ================= INCIDENTS ================= */}
      {loading ? (
        <div className="bg-white border border-gray-100 rounded-2xl py-20 flex flex-col items-center justify-center">
          <RefreshCw className="w-7 h-7 text-blue-500 animate-spin mb-3" />

          <p className="text-sm text-gray-400">
            Loading incidents...
          </p>
        </div>
      ) : filteredIncidents.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredIncidents.map((incident) => {
            const style = getSeverityStyle(incident.severity);

            return (
              <div
                key={incident.id}
                className="bg-white p-5 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  {/* ICON */}
                  <div
                    className={`w-12 h-12 ${style.bg} ${style.icon} rounded-xl flex items-center justify-center shrink-0`}
                  >
                    <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-bold text-gray-900 text-sm leading-tight">
                        {incident.title || "Untitled Incident"}
                      </h3>

                      <span
                        className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${getStatusStyle(
                          incident.status
                        )}`}
                      >
                        {incident.status || "Open"}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <p
                        className={`${style.text} font-black text-xs uppercase`}
                      >
                        {incident.severity || "Low"} Severity
                      </p>

                      <p className="text-xs text-gray-400">
                        {incident.dateTime ||
                          incident.inspection_date ||
                          "No date"}
                      </p>

                      {incident.type && (
                        <p className="text-xs text-gray-500">
                          Type:{" "}
                          <span className="text-gray-900 font-semibold capitalize">
                            {incident.type}
                          </span>
                        </p>
                      )}

                      {incident.check_name && (
                        <p className="text-xs text-gray-500">
                          Check:{" "}
                          <span className="text-gray-900 font-semibold">
                            {incident.check_name}
                          </span>
                        </p>
                      )}
                    </div>

                    {incident.notes && (
                      <p className="text-xs text-gray-400 mt-3 line-clamp-2">
                        {incident.notes}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl py-20 text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
            <AlertTriangle className="w-8 h-8 text-gray-300" />
          </div>

          <p className="text-gray-500 text-sm font-bold">
            No incidents found
          </p>

          <p className="text-gray-400 text-xs mt-1">
            Report an incident when a safety or quality issue occurs.
          </p>

          <button
            type="button"
            onClick={() => setShowReportForm(true)}
            className="mt-4 text-blue-600 text-sm font-bold hover:text-blue-700"
          >
            + Report your first incident
          </button>
        </div>
      )}

      {/* ================= REPORT INCIDENT ================= */}
      {showReportForm && (
        <ReportIncident
          projectId={projectId}
          onClose={() => setShowReportForm(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
};

export default Incidents;