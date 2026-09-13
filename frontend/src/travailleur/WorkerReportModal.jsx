import React, { useState } from "react";
import {
  X,
  Send,
  Camera,
  ChevronDown,
  ShieldAlert,
  Package,
  Wrench,
  AlertTriangle,
  Clock,
  MapPin,
} from "lucide-react";
import axios from "axios";

export default function WorkerReportModal({
  projectId,
  tasks,
  selectedTask,
  onClose,
  onCreated,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    category: "Safety",
    description: "",
    task_id: selectedTask?.id || "",
    urgency: "medium",
    required_value: "",
    actual_value: "",
    unit: "",
    photo: null,
  });

  const [unitOpen, setUnitOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);

  const units = [
    "bags",
    "kg",
    "tonnes",
    "liters",
    "m",
    "m²",
    "m³",
    "units",
    "pieces",
    "hours",
    "days",
  ];

  const categories = [
    {
      value: "Safety",
      label: "Safety",
      icon: ShieldAlert,
    },
    {
      value: "Material",
      label: "Material",
      icon: Package,
    },
    {
      value: "Equipment",
      label: "Equipment",
      icon: Wrench,
    },
    {
      value: "Quality",
      label: "Quality",
      icon: AlertTriangle,
    },
    {
      value: "Delay",
      label: "Delay",
      icon: Clock,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      photo: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.description.trim()) {
      setError("Please describe what you noticed.");
      return;
    }

    if (
      (form.required_value && !form.actual_value) ||
      (!form.required_value && form.actual_value)
    ) {
      setError(
        "Please provide both required and actual values."
      );
      return;
    }

    if (
      (form.required_value || form.actual_value) &&
      !form.unit
    ) {
      setError("Please select a unit.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        project_id: projectId,
        task_id: form.task_id || null,
        title: `${form.category} Report`,
        type:
          form.category === "Safety"
            ? "safety"
            : "quality",
        inspection_date: new Date()
          .toISOString()
          .split("T")[0],
        notes: form.description,

        checks: [
          {
            check_name: form.category,
            required_value:
              form.required_value || null,
            actual_value:
              form.actual_value || null,
            unit: form.unit || null,
            status:
              form.urgency === "high"
                ? "fail"
                : "pending",
            severity:
              form.urgency === "high"
                ? "high"
                : form.urgency === "medium"
                ? "medium"
                : "low",
            comment: form.description,
          },
        ],
      };

      const response = await axios.post(
        `http://127.0.0.1:8000/api/Worker/projects/${projectId}/report`,
        payload
      );

      console.log("Worker report created:", response.data);

      if (onCreated) {
        onCreated(response.data);
      }

      onClose();
    } catch (err) {
      console.error("Report error:", err);

      if (err.response?.data?.errors) {
        const firstError = Object.values(
          err.response.data.errors
        )[0];

        setError(
          Array.isArray(firstError)
            ? firstError[0]
            : firstError
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Failed to submit report."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedCategory = categories.find(
    (item) => item.value === form.category
  );

  return (
    <div className="absolute inset-0 z-[200] flex items-end justify-center">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-h-[94%] bg-white rounded-t-[28px] shadow-2xl overflow-hidden flex flex-col">

        {/* TOP HANDLE */}
        <div className="flex justify-center pt-2.5">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* HEADER */}
        <div className="px-5 pt-3 pb-4 border-b border-gray-100 shrink-0">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Send
                  size={18}
                  className="text-emerald-600"
                />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-wider font-semibold text-gray-400">
                  Worker Report
                </p>

                <h2 className="text-lg font-black text-gray-800">
                  Report Something
                </h2>
              </div>

            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center"
            >
              <X
                size={17}
                className="text-gray-600"
              />
            </button>

          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-5 py-4 space-y-4"
        >

          {/* ERROR */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-3 py-2.5 text-[10px] font-semibold">
              {error}
            </div>
          )}

          {/* =================================================
              CATEGORY
          ================================================== */}

          <div>
            <label className="block text-[10px] font-bold text-gray-600 mb-2">
              Report Type
            </label>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">

              {categories.map((category) => {
                const Icon = category.icon;
                const selected =
                  form.category === category.value;

                return (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        category: category.value,
                      }));
                    }}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[10px] font-bold transition ${
                      selected
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-white text-gray-500 border-gray-200"
                    }`}
                  >
                    <Icon size={13} />
                    {category.label}
                  </button>
                );
              })}

            </div>
          </div>

          {/* =================================================
              WHAT HAPPENED
          ================================================== */}

          <div>
            <label className="block text-[10px] font-bold text-gray-600 mb-2">
              What did you notice?
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              placeholder={
                form.category === "Material"
                  ? "Example: Cement stock is too low for Zone A..."
                  : form.category === "Safety"
                  ? "Example: Scaffold guardrail is missing..."
                  : form.category === "Equipment"
                  ? "Example: Concrete mixer stopped working..."
                  : form.category === "Quality"
                  ? "Example: Actual wall thickness is different..."
                  : form.category === "Delay"
                  ? "Example: Material delivery is delayed..."
                  : "Describe what you noticed on site..."
              }
              className="w-full border border-gray-200 rounded-xl px-3 py-3 text-xs resize-none outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100"
            />
          </div>

          {/* =================================================
              MEASUREMENTS
          ================================================== */}

          <div>
            <div className="flex items-center justify-between mb-2">

              <label className="text-[10px] font-bold text-gray-600">
                Measurements
              </label>

              <span className="text-[9px] text-gray-400">
                Optional
              </span>

            </div>

            <div className="grid grid-cols-[1fr_1fr_92px] gap-2">

              {/* REQUIRED */}
              <input
                type="number"
                name="required_value"
                value={form.required_value}
                onChange={handleChange}
                min="0"
                step="any"
                placeholder="Required"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-emerald-400"
              />

              {/* ACTUAL */}
              <input
                type="number"
                name="actual_value"
                value={form.actual_value}
                onChange={handleChange}
                min="0"
                step="any"
                placeholder="Actual"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-emerald-400"
              />

              {/* UNIT */}
              <div className="relative">

                <button
                  type="button"
                  onClick={() =>
                    setUnitOpen((prev) => !prev)
                  }
                  className="w-full h-full min-h-[42px] border border-gray-200 rounded-xl px-3 text-left text-[10px] font-semibold text-gray-700 bg-white flex items-center justify-between"
                >
                  <span className="truncate">
                    {form.unit || "Unit"}
                  </span>

                  <ChevronDown
                    size={13}
                    className={`text-gray-400 transition ${
                      unitOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {unitOpen && (
                  <div className="absolute right-0 bottom-[calc(100%+6px)] w-[150px] bg-white border border-gray-200 rounded-2xl shadow-xl p-2 z-30">

                    <div className="grid grid-cols-2 gap-1">

                      {units.map((unit) => (
                        <button
                          key={unit}
                          type="button"
                          onClick={() => {
                            setForm((prev) => ({
                              ...prev,
                              unit,
                            }));

                            setUnitOpen(false);
                          }}
                          className={`px-2 py-2 rounded-lg text-[9px] font-semibold ${
                            form.unit === unit
                              ? "bg-emerald-50 text-emerald-700"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {unit}
                        </button>
                      ))}

                    </div>

                  </div>
                )}

              </div>

            </div>
          </div>

          {/* =================================================
              RELATED TASK
          ================================================== */}

          <div>
            <label className="block text-[10px] font-bold text-gray-600 mb-2">
              Related Task
            </label>

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setTaskOpen((prev) => !prev)
                }
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 bg-white flex items-center justify-between text-left"
              >

                <span className="text-xs font-semibold text-gray-700 truncate pr-2">
                  {form.task_id
                    ? tasks.find(
                        (task) =>
                          Number(task.id) ===
                          Number(form.task_id)
                      )?.title || "Select task"
                    : "No specific task"}
                </span>

                <ChevronDown
                  size={14}
                  className={`text-gray-400 shrink-0 transition ${
                    taskOpen ? "rotate-180" : ""
                  }`}
                />

              </button>

              {taskOpen && (
                <div className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white border border-gray-200 rounded-2xl shadow-xl p-2 z-20 max-h-40 overflow-y-auto">

                  <button
                    type="button"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        task_id: "",
                      }));

                      setTaskOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-[10px] font-semibold ${
                      !form.task_id
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    No specific task
                  </button>

                  {tasks.map((task) => {
                    const selected =
                      Number(form.task_id) ===
                      Number(task.id);

                    return (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => {
                          setForm((prev) => ({
                            ...prev,
                            task_id: task.id,
                          }));

                          setTaskOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-[10px] font-semibold truncate ${
                          selected
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {task.title}
                      </button>
                    );
                  })}

                </div>
              )}

            </div>
          </div>

          {/* =================================================
              URGENCY
          ================================================== */}

          <div>
            <label className="block text-[10px] font-bold text-gray-600 mb-2">
              Urgency
            </label>

            <div className="grid grid-cols-3 gap-2">

              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    urgency: "low",
                  }))
                }
                className={`py-2 rounded-xl text-[10px] font-bold border ${
                  form.urgency === "low"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-white text-gray-500 border-gray-200"
                }`}
              >
                Low
              </button>

              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    urgency: "medium",
                  }))
                }
                className={`py-2 rounded-xl text-[10px] font-bold border ${
                  form.urgency === "medium"
                    ? "bg-amber-50 text-amber-700 border-amber-200"
                    : "bg-white text-gray-500 border-gray-200"
                }`}
              >
                Medium
              </button>

              <button
                type="button"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    urgency: "high",
                  }))
                }
                className={`py-2 rounded-xl text-[10px] font-bold border ${
                  form.urgency === "high"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-white text-gray-500 border-gray-200"
                }`}
              >
                High
              </button>

            </div>
          </div>

          {/* =================================================
              PHOTO
          ================================================== */}

          <div>

            <label className="block text-[10px] font-bold text-gray-600 mb-2">
              Photo
              <span className="font-normal text-gray-400">
                {" "} optional
              </span>
            </label>

            <label className="w-full border border-dashed border-gray-300 rounded-xl px-3 py-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition">

              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <Camera
                  size={15}
                  className="text-emerald-600"
                />
              </div>

              <div className="flex-1 min-w-0">

                <p className="text-[10px] font-bold text-gray-700 truncate">
                  {form.photo
                    ? form.photo.name
                    : "Add site photo"}
                </p>

                <p className="text-[9px] text-gray-400">
                  Camera or gallery
                </p>

              </div>

              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoChange}
                className="hidden"
              />

            </label>

          </div>

          {/* =================================================
              SUBMIT
          ================================================== */}

          <div className="pt-1 pb-1">

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition"
            >
              <Send size={15} />

              {loading
                ? "Submitting..."
                : "Submit Report"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}