import { useEffect, useState } from "react";
import axios from "axios";
import { FiAlertTriangle } from "react-icons/fi";

export default function NonConformities({ projectId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!projectId) return;
  const authHeader = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    };
    axios
      .get(`http://127.0.0.1:8000/api/engineer/projects/${projectId}/non-conformities`,authHeader)
      .then(res => setItems(res.data))
      .catch(err => console.log(err));
  }, [projectId]);

  return (
  <div className="bg-white rounded-xl p-5 shadow-sm h-[420px] flex flex-col">
    <h3 className="font-semibold mb-4">Non-Conformities</h3>

    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
      {items.length > 0 ? (
        items.map(item => (
          <div key={item.id} className="flex items-start gap-3">
            <FiAlertTriangle className="text-red-500 mt-1 flex-shrink-0" />
            <span>{item.title}</span>
          </div>
        ))
      ) : (
        <p className="text-gray-400">No non-conformities found.</p>
      )}
    </div>
  </div>
);
}