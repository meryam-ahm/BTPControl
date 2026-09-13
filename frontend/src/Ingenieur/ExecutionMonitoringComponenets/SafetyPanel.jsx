import { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const getTotal = (data) =>
  data.reduce((sum, item) => sum + (item.value || 0), 0);

export default function SafetyPanel({ projectId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    setLoading(true);

    axios
      .get(
        `http://localhost:8000/api/projects/${projectId}/getsafety`
      )
      .then((res) => {
        setData(res.data || []);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [projectId]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-5 h-[420px]">
        <h3 className="font-semibold mb-4">Safety Summary</h3>
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  const total = getTotal(data);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 w-full h-[420px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-800">
          Safety Summary
        </h2>
        {/* <span className="text-blue-500 text-sm cursor-pointer">
          View All
        </span> */}
      </div>

      {/* Chart */}
      <div className="relative h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={80}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">{total}</p>
          <p className="text-xs text-gray-500">Incidents</p>
        </div>
      </div>

      {/* Scrollable Legend */}
      <div className="space-y-2 mt-4 overflow-y-auto flex-1 pr-2">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex justify-between text-sm text-gray-600"
          >
            <span className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>

 
    </div>
  );
}