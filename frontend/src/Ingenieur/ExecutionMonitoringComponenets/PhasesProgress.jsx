import { useEffect, useState } from "react";
import axios from "axios";

export default function PhaseProgress({ projectId }) {
  const [phases, setPhases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 axios.get(`http://127.0.0.1:8000/api/projects/${projectId}/execution`)
    .then((res) => {
        setPhases(res.data.phases);
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-5 shadow-sm">
        Loading phases...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold mb-5">
        Project Phases Progress
      </h3>

      {phases.map((phase) => (
        <div key={phase.id} className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-700">{phase.title}</span>
            <span className="font-medium">{phase.progress}%</span>
          </div>

          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                phase.progress === 100
                  ? "bg-green-500"
                  : phase.progress > 50
                  ? "bg-blue-500"
                  : phase.progress > 20
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${phase.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
