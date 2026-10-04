import { useEffect, useState } from "react";
import axios from "axios";
import InspectionModal from "./InspectionModal";

export default function InspectionList({ projectId }) {
  const [list, setList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (!projectId) return;
  const authHeader = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    };
    axios
      .get(`http://127.0.0.1:8000/api/engineer/projects/${projectId}/inspections`,authHeader)
      .then((res) => {
        console.log("PROJECT ID =", projectId);
        console.log("Inspection List =", res.data);
        setList(res.data);
      })
      .catch((err) => console.log(err));
  }, [projectId]);

  return (
    <>
      <div className="bg-white rounded-xl shadow p-5 h-[500px] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Inspections</h2>

        {list.length === 0 ? (
          <p className="text-gray-500">No inspections found.</p>
        ) : (
          list.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-3 mb-3 hover:bg-gray-50"
            >
              <h3 className="font-semibold">{item.title}</h3>

              <p className="text-sm text-gray-500">
                {item.inspection_date}
              </p>

              <p className="text-sm mb-2">
                Status: {item.status}
              </p>

              <button
                onClick={() => setSelectedId(item.id)}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Open
              </button>
            </div>
          ))
        )}
      </div>

      {selectedId && (
        <InspectionModal
          inspectionId={selectedId}
          projectId={projectId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </>
  );
}