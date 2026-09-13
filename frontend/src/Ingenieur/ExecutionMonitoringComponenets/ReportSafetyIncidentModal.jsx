import { useEffect, useState } from "react";
import axios from "axios";

export default function ReportSafetyIncidentModal({
  open,
  onClose,
  projectId,
}) {
  const [managers, setManagers] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    severity: "medium",
    assigned_to: "",
    due_date: "",
  });

  useEffect(() => {
    if (!open || !projectId) return;

    axios
      .get(`http://127.0.0.1:8000/api/projects/${projectId}/site-managers`)
      .then((res) => setManagers(res.data))
      .catch(console.log);
  }, [open, projectId]);

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/non-conformities",
        {
          project_id: projectId,
          inspection_check_id: null,
          title: form.title,
          description: form.description,
          severity: form.severity,
          assigned_to: form.assigned_to,
          due_date: form.due_date,
        }
      );

      alert("Safety Incident Reported");

      setForm({
        title: "",
        description: "",
        severity: "medium",
        assigned_to: "",
        due_date: "",
      });

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-[650px] rounded-2xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Report Safety Incident
          </h2>

          <button onClick={onClose}>
            ✕
          </button>

        </div>

        <div className="space-y-4">

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Incident Title"
            value={form.title}
            onChange={(e)=>
              setForm({
                ...form,
                title:e.target.value
              })
            }
          />

          <textarea
            rows={5}
            className="w-full border rounded-lg p-3"
            placeholder="Describe the incident..."
            value={form.description}
            onChange={(e)=>
              setForm({
                ...form,
                description:e.target.value
              })
            }
          />

          <select
            className="w-full border rounded-lg p-3"
            value={form.severity}
            onChange={(e)=>
              setForm({
                ...form,
                severity:e.target.value
              })
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            className="w-full border rounded-lg p-3"
            value={form.assigned_to}
            onChange={(e)=>
              setForm({
                ...form,
                assigned_to:e.target.value
              })
            }
          >
            <option value="">
              Assign Site Manager
            </option>

            {managers.map((m)=>(
              <option
                key={m.id}
                value={m.id}
              >
                {m.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="w-full border rounded-lg p-3"
            value={form.due_date}
            onChange={(e)=>
              setForm({
                ...form,
                due_date:e.target.value
              })
            }
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-red-600 text-white px-5 py-2 rounded-lg"
          >
            Report Incident
          </button>

        </div>

      </div>

    </div>
  );
}