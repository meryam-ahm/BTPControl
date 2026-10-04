import { useEffect, useState } from "react";
import axios from "axios";

export default function ReportSafetyIncidentModal({
  open,
  onClose,
  projectId,
}) {
  const [managers, setManagers] = useState([]);
  const [checks, setChecks] = useState([]);
  const [loadingChecks, setLoadingChecks] = useState(false);

  const [form, setForm] = useState({
    inspection_check_id: "",
    title: "",
    description: "",
    severity: "medium",
    assigned_to: "",
    due_date: "",
  });

  const authHeader = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      Accept: "application/json",
    },
  };

  // =========================
  // LOAD SITE MANAGERS
  // =========================
  useEffect(() => {
    if (!open || !projectId) return;

    axios
      .get(
        `http://127.0.0.1:8000/api/engineer/projects/${projectId}/site-managers`,
        authHeader
      )
      .then((res) => {
        console.log("SITE MANAGERS:", res.data);
        setManagers(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("SITE MANAGERS ERROR:", err);
        setManagers([]);
      });
  }, [open, projectId]);

  // =========================
  // LOAD INSPECTION CHECKS
  // =========================
  useEffect(() => {
    if (!open || !projectId) return;

    setLoadingChecks(true);

    axios
      .get(
        `http://127.0.0.1:8000/api/engineer/projects/${projectId}/inspection-checks`,
        authHeader
      )
      .then((res) => {
        console.log("INSPECTION CHECKS:", res.data);

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.checks || [];

        setChecks(data);
      })
      .catch((err) => {
        console.error("INSPECTION CHECKS ERROR:", err);
        console.error("SERVER RESPONSE:", err.response?.data);
        setChecks([]);
      })
      .finally(() => {
        setLoadingChecks(false);
      });
  }, [open, projectId]);

  // =========================
  // HANDLE INPUT
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {
    // Required inspection check
    if (!form.inspection_check_id) {
      alert("Please select an inspection check.");
      return;
    }

    if (!form.title.trim()) {
      alert("Please enter an incident title.");
      return;
    }

    try {
      console.log("SAFETY INCIDENT DATA:", {
        project_id: projectId,
        inspection_check_id: form.inspection_check_id,
        title: form.title,
        description: form.description,
        severity: form.severity,
        assigned_to: form.assigned_to || null,
        due_date: form.due_date || null,
      });

      await axios.post(
        "http://127.0.0.1:8000/api/engineer/non-conformities",
        {
          project_id: projectId,
          inspection_check_id: form.inspection_check_id,
          title: form.title,
          description: form.description,
          severity: form.severity,
          assigned_to: form.assigned_to || null,
          due_date: form.due_date || null,
        },
        authHeader
      );

      alert("Safety Incident Reported");

      setForm({
        inspection_check_id: "",
        title: "",
        description: "",
        severity: "medium",
        assigned_to: "",
        due_date: "",
      });

      onClose();
    } catch (err) {
      console.error("SAFETY INCIDENT ERROR:", err);
      console.error("STATUS:", err.response?.status);
      console.error("DATA:", err.response?.data);
      console.error("VALIDATION ERRORS:", err.response?.data?.errors);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[650px] rounded-2xl p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Report Safety Incident
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">

          {/* INSPECTION CHECK */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Inspection Check *
            </label>

            <select
              name="inspection_check_id"
              value={form.inspection_check_id}
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            >
              <option value="">
                {loadingChecks
                  ? "Loading inspection checks..."
                  : "Select inspection check"}
              </option>

              {checks.map((check) => (
                <option
                  key={check.id}
                  value={check.id}
                >
                  {check.check_name}
                </option>
              ))}
            </select>

            {!loadingChecks && checks.length === 0 && (
              <p className="text-sm text-red-500 mt-1">
                No inspection checks found for this project.
              </p>
            )}
          </div>

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Incident Title *
            </label>

            <input
              name="title"
              className="w-full border rounded-lg p-3"
              placeholder="Incident Title"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>

            <textarea
              name="description"
              rows={5}
              className="w-full border rounded-lg p-3"
              placeholder="Describe the incident..."
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* SEVERITY */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Severity
            </label>

            <select
              name="severity"
              className="w-full border rounded-lg p-3"
              value={form.severity}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* SITE MANAGER */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Assign Site Manager
            </label>

            <select
              name="assigned_to"
              className="w-full border rounded-lg p-3"
              value={form.assigned_to}
              onChange={handleChange}
            >
              <option value="">
                Assign Site Manager
              </option>

              {managers.map((manager) => (
                <option
                  key={manager.id}
                  value={manager.id}
                >
                  {manager.name}
                </option>
              ))}
            </select>
          </div>

          {/* DUE DATE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Due Date
            </label>

            <input
              name="due_date"
              type="date"
              className="w-full border rounded-lg p-3"
              value={form.due_date}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={
              loadingChecks ||
              checks.length === 0 ||
              !form.inspection_check_id
            }
            className="bg-red-600 text-white px-5 py-2 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Report Incident
          </button>

        </div>
      </div>
    </div>
  );
}