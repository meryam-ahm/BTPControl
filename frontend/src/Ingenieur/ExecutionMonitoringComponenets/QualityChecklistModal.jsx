 import { useEffect, useState } from "react";
import axios from "axios";

export default function QualityChecklistModal({
  open,
  onClose,
  projectId,
}) {
  const [inspections, setInspections] = useState([]);

  const [form, setForm] = useState({
    inspection_id: "",
    check_name: "",
    required_value: "",
    actual_value: "",
    unit: "",
    status: "pending",
    severity: "low",
    comment: "",
  });

  useEffect(() => {
    if (!open || !projectId) return;

    axios
      .get(`http://127.0.0.1:8000/api/projects/${projectId}/inspections`)
      .then((res) => setInspections(res.data))
      .catch(console.log);
  }, [open, projectId]);

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/inspection-checks",
        form
      );

      alert("Checklist Added");

      setForm({
        inspection_id: "",
        check_name: "",
        required_value: "",
        actual_value: "",
        unit: "",
        status: "pending",
        severity: "low",
        comment: "",
      });

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-[650px] p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Add Quality Checklist
          </h2>

          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4">

          <select
            className="w-full border rounded-lg p-3"
            value={form.inspection_id}
            onChange={(e) =>
              setForm({
                ...form,
                inspection_id: e.target.value,
              })
            }
          >
            <option value="">
              Select Inspection
            </option>

            {inspections.map((i) => (
              <option key={i.id} value={i.id}>
                {i.title}
              </option>
            ))}
          </select>

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Check Name"
            value={form.check_name}
            onChange={(e) =>
              setForm({
                ...form,
                check_name: e.target.value,
              })
            }
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Required Value"
            value={form.required_value}
            onChange={(e) =>
              setForm({
                ...form,
                required_value: e.target.value,
              })
            }
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Actual Value"
            value={form.actual_value}
            onChange={(e) =>
              setForm({
                ...form,
                actual_value: e.target.value,
              })
            }
          />

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Unit"
            value={form.unit}
            onChange={(e) =>
              setForm({
                ...form,
                unit: e.target.value,
              })
            }
          />

          <select
            className="w-full border rounded-lg p-3"
            value={form.status}
            onChange={(e) =>
              setForm({
                ...form,
                status: e.target.value,
              })
            }
          >
            <option value="pending">Pending</option>
            <option value="ok">OK</option>
            <option value="fail">Fail</option>
          </select>

          <select
            className="w-full border rounded-lg p-3"
            value={form.severity}
            onChange={(e) =>
              setForm({
                ...form,
                severity: e.target.value,
              })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <textarea
            rows={4}
            className="w-full border rounded-lg p-3"
            placeholder="Comment"
            value={form.comment}
            onChange={(e) =>
              setForm({
                ...form,
                comment: e.target.value,
              })
            }
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Save Checklist
          </button>

        </div>

      </div>

    </div>
  );
}