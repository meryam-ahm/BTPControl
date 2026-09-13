import { useEffect, useState } from "react";
import axios from "axios";

export default function ScheduleInspectionModal({
  open,
  onClose,
  projectId,
}) {
  const [managers, setManagers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    type: "quality",
    inspection_date: "",
    inspected_by: "",
    notes: "",
  });

  useEffect(() => {
    if (!open || !projectId) return;

    axios
      .get(
        `http://127.0.0.1:8000/api/projects/${projectId}/site-managers`
      )
      .then((res) => setManagers(res.data))
      .catch(console.log);
  }, [open, projectId]);

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/inspections",
        {
          project_id: projectId,
          title: form.title,
          type: form.type,
          inspection_date: form.inspection_date,
          inspected_by: form.inspected_by,
          notes: form.notes,
        }
      );

      alert("Inspection Created");

      setForm({
        title: "",
        type: "quality",
        inspection_date: "",
        inspected_by: "",
        notes: "",
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
            Schedule Inspection
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>

        </div>

        <div className="space-y-5">

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Inspection Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          <select
            className="w-full border rounded-lg p-3"
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value,
              })
            }
          >
            <option value="quality">
              Quality Inspection
            </option>

            <option value="safety">
              Safety Inspection
            </option>

          </select>

          <input
            type="date"
            className="w-full border rounded-lg p-3"
            value={form.inspection_date}
            onChange={(e) =>
              setForm({
                ...form,
                inspection_date: e.target.value,
              })
            }
          />

          <select
            className="w-full border rounded-lg p-3"
            value={form.inspected_by}
            onChange={(e) =>
              setForm({
                ...form,
                inspected_by: e.target.value,
              })
            }
          >
            <option value="">
              Select Site Manager
            </option>

            {managers.map((m) => (
              <option
                key={m.id}
                value={m.id}
              >
                {m.name}
              </option>
            ))}
          </select>

          <textarea
            rows={5}
            className="w-full border rounded-lg p-3"
            placeholder="Notes..."
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-blue-600 text-white"
          >
            Create Inspection
          </button>

        </div>

      </div>

    </div>
  );
}