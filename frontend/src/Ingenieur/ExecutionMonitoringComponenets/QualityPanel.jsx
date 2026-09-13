import { useEffect, useState } from "react";
import axios from "axios";

const statusStyle = (status) => {
  switch (status) {
    case "ok":
    case "Conforme":
      return "text-green-600 bg-green-100";
    case "Non Conforme":
      return "text-red-600 bg-red-100";
    case "En Attente":
    case "pending":
      return "text-orange-500 bg-orange-100";
    default:
      return "text-gray-500 bg-gray-100";
  }
};

export default function QualityPanel({ inspectionId }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!inspectionId) return;

    setLoading(true);

    axios
      .get(
        `http://localhost:8000/api/inspections/${inspectionId}/getquality`
      )
      .then((res) => {
        setRows(res.data || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [inspectionId]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5 h-[420px]">
        <h3 className="font-semibold mb-4">Quality Control</h3>
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 w-full h-[420px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">
          Quality Control
        </h2>

        {/* <span className="text-blue-500 text-sm cursor-pointer">
          View All
        </span> */}
      </div>

      {/* Scrollable list */}
      <div className="space-y-4 overflow-y-auto flex-1 pr-2">
        {rows.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No checks found
          </p>
        ) : (
          rows.map((row) => (
            <div
              key={row.id}
              className="border-b pb-2 last:border-b-0"
            >
              <div className="flex justify-between">
                <span className="text-sm text-gray-700">
                  {row.check_name}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${statusStyle(
                    row.status
                  )}`}
                >
                  {row.status}
                </span>
              </div>

              <div className="text-xs text-gray-500 flex justify-between mt-1">
                <span>Required: {row.required_value}</span>
                <span>Actual: {row.actual_value}</span>
              </div>
            </div>
          ))
        )}
      </div>

 
    </div>
  );
}