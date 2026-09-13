import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateNonConformityModal({
  open,
  onClose,
  inspectionCheck,
  projectId,
}) {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: "medium",
    assigned_to: "",
    due_date: "",
  });

  // RESET FORM
  useEffect(() => {
    if (!inspectionCheck) return;

    setForm({
      title: inspectionCheck?.check_name || "",
      description: inspectionCheck?.comment || "",
      severity: inspectionCheck?.severity || "medium",
      assigned_to: "",
      due_date: "",
    });
  }, [inspectionCheck]);

  // FETCH MANAGERS
  useEffect(() => {
    if (!open || !projectId) return;

    const fetchManagers = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("➡ Fetching managers...");

        const res = await axios.get(
          `http://127.0.0.1:8000/api/projects/${projectId}/site-managers`
        );

        console.log("RAW API RESPONSE:", res.data);

        if (!Array.isArray(res.data)) {
          setError("API did not return an array");
          setManagers([]);
          return;
        }

        // remove duplicates
        const unique = Array.from(
          new Map(res.data.map((m) => [m.id, m])).values()
        );

        setManagers(unique);
      } catch (err) {
        console.log("API ERROR:", err);
        setError("Failed to load managers (check backend/CORS)");
        setManagers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchManagers();
  }, [open, projectId]);

  // SUBMIT
  const handleSubmit = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/non-conformities", {
        project_id: projectId,
        inspection_check_id: inspectionCheck.id,
        title: form.title,
        description: form.description,
        severity: form.severity,
        assigned_to: form.assigned_to,
        due_date: form.due_date,
      });

      alert("Created successfully");
      onClose();
    } catch (err) {
      console.log("Submit error:", err);
      alert("Submit failed");
    }
    console.log("===== DEBUG =====");
console.log("projectId:", projectId);
console.log("inspectionCheck:", inspectionCheck);
console.log("form:", form);
console.log("=================");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[550px] p-6">

        <h2 className="text-xl font-bold mb-5">
          Create Non-Conformity
        </h2>

        {/* ERROR DISPLAY */}
        {error && (
          <div className="mb-3 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">

          <input
            className="w-full border p-2 rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <select
            className="w-full border p-2 rounded"
            value={form.severity}
            onChange={(e) =>
              setForm({ ...form, severity: e.target.value })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {/* MANAGERS */}
          <select
            className="w-full border p-2 rounded"
            value={form.assigned_to}
            onChange={(e) =>
              setForm({ ...form, assigned_to: e.target.value })
            }
          >
            <option value="">
              {loading ? "Loading managers..." : "Select Site Manager"}
            </option>

            {managers.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="w-full border p-2 rounded"
            value={form.due_date}
            onChange={(e) =>
              setForm({ ...form, due_date: e.target.value })
            }
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Create
          </button>

        </div>

      </div>
    </div>
  );
}