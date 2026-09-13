import React, { useEffect, useState } from "react";
import { X, Plus, Trash2, AlertTriangle } from "lucide-react";
import axios from "axios";

const ReportIncident = ({ projectId, onClose, onCreated }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    type: "safety",
    task_id: "",
    inspection_date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [checks, setChecks] = useState([
    {
      check_name: "",
      required_value: "",
      actual_value: "",
      unit: "",
      status: "fail",
      severity: "medium",
      comment: "",
    },
  ]);

  useEffect(() => {
    if (!projectId) return;

    axios
      .get(`http://127.0.0.1:8000/api/SiteManager/projects/${projectId}/tasks`)
      .then((res) => {
        setTasks(res.data.tasks || res.data || []);
      })
      .catch((err) => {
        console.error("Error loading tasks:", err);
      });
  }, [projectId]);

  const handleFormChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckChange = (index, field, value) => {
    const updated = [...checks];
    updated[index][field] = value;

    if (field === "status" && value !== "fail") {
      updated[index].severity = "";
    }

    setChecks(updated);
  };

  const addCheck = () => {
    setChecks([
      ...checks,
      {
        check_name: "",
        required_value: "",
        actual_value: "",
        unit: "",
        status: "fail",
        severity: "medium",
        comment: "",
      },
    ]);
  };

  const removeCheck = (index) => {
    if (checks.length === 1) return;

    setChecks(checks.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Please enter an incident title.");
      return;
    }

    if (checks.length === 0) {
      setError("Please add at least one inspection check.");
      return;
    }

    for (const check of checks) {
      if (!check.check_name.trim()) {
        setError("Every check must have a check name.");
        return;
      }

      if (check.status === "fail" && !check.severity) {
        setError("Please select a severity for failed checks.");
        return;
      }
    }

    const payload = {
      title: form.title,
      type: form.type,
      task_id: form.task_id || null,
      inspection_date: form.inspection_date,
      notes: form.notes || null,
      checks: checks.map((check) => ({
        check_name: check.check_name,
        required_value: check.required_value || null,
        actual_value: check.actual_value || null,
        unit: check.unit || null,
        status: check.status,
        severity: check.status === "fail" ? check.severity : null,
        comment: check.comment || null,
      })),
    };

    try {
      setLoading(true);

      const res = await axios.post(
        `http://127.0.0.1:8000/api/projects/${projectId}/incidents`,
        payload
      );

      console.log("Incident created:", res.data);

      if (onCreated) {
        onCreated(res.data.incident);
      }

      onClose();
    } catch (err) {
      console.error("Error creating incident:", err);

      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0];
        setError(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to report incident."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900">
                Report Incident
              </h2>

              <p className="text-xs text-gray-400 mt-1">
                Create an inspection and record its checks
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-5"
        >
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Inspection information */}
          <div className="mb-7">
            <h3 className="text-sm font-black text-gray-900 mb-4">
              Inspection Information
            </h3>

            <div className="grid grid-cols-2 gap-4">

              {/* Title */}
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-600 mb-2">
                  Incident Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="e.g. Fall Protection Failure"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2">
                  Inspection Type
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleFormChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:border-blue-500"
                >
                  <option value="safety">Safety</option>
                  <option value="quality">Quality</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-2">
                  Inspection Date
                </label>

                <input
                  type="date"
                  name="inspection_date"
                  value={form.inspection_date}
                  onChange={handleFormChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              {/* Task */}
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-600 mb-2">
                  Related Task
                  <span className="text-gray-400 font-normal">
                    {" "} (optional)
                  </span>
                </label>

                <select
                  name="task_id"
                  value={form.task_id}
                  onChange={handleFormChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:border-blue-500"
                >
                  <option value="">Select a task</option>

                  {tasks.map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-600 mb-2">
                  Notes
                </label>

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleFormChange}
                  rows="3"
                  placeholder="Describe what happened..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Checks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-black text-gray-900">
                  Inspection Checks
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  Define what was checked and what was found
                </p>
              </div>

              <button
                type="button"
                onClick={addCheck}
                className="flex items-center gap-1.5 text-blue-600 text-xs font-bold hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add Check
              </button>
            </div>

            <div className="space-y-4">
              {checks.map((check, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-2xl p-4 bg-gray-50/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black text-gray-500 uppercase">
                      Check {index + 1}
                    </span>

                    {checks.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeCheck(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Check name */}
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-600 mb-2">
                      Check Name
                    </label>

                    <input
                      type="text"
                      value={check.check_name}
                      onChange={(e) =>
                        handleCheckChange(
                          index,
                          "check_name",
                          e.target.value
                        )
                      }
                      placeholder="e.g. Scaffold stability"
                      className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Values */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2">
                        Required Value
                      </label>

                      <input
                        type="text"
                        value={check.required_value}
                        onChange={(e) =>
                          handleCheckChange(
                            index,
                            "required_value",
                            e.target.value
                          )
                        }
                        placeholder="e.g. 2m"
                        className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2">
                        Actual Value
                      </label>

                      <input
                        type="text"
                        value={check.actual_value}
                        onChange={(e) =>
                          handleCheckChange(
                            index,
                            "actual_value",
                            e.target.value
                          )
                        }
                        placeholder="e.g. 1m"
                        className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2">
                        Unit
                      </label>

                      <input
                        type="text"
                        value={check.unit}
                        onChange={(e) =>
                          handleCheckChange(index, "unit", e.target.value)
                        }
                        placeholder="e.g. m"
                        className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Status + Severity */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2">
                        Result
                      </label>

                      <select
                        value={check.status}
                        onChange={(e) =>
                          handleCheckChange(
                            index,
                            "status",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                      >
                        <option value="fail">Fail</option>
                        <option value="ok">OK</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-2">
                        Severity
                      </label>

                      <select
                        value={check.severity}
                        onChange={(e) =>
                          handleCheckChange(
                            index,
                            "severity",
                            e.target.value
                          )
                        }
                        disabled={check.status !== "fail"}
                        className="w-full border border-gray-200 bg-white rounded-xl px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
                      >
                        <option value="">Select severity</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-2">
                      Comment
                    </label>

                    <textarea
                      value={check.comment}
                      onChange={(e) =>
                        handleCheckChange(
                          index,
                          "comment",
                          e.target.value
                        )
                      }
                      rows="2"
                      placeholder="Explain what was found..."
                      className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 text-sm font-bold hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-[#1A73E8] text-white text-sm font-bold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Reporting..." : "Report Incident"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportIncident;