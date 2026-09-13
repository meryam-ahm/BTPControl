import {
  TrendingUp,
  CheckCircle,
  Layers,
  Grid3x3,
  Activity,
  AlertTriangle,
} from "lucide-react";

const icons = {
  TrendingUp,
  CheckCircle,
  Layers,
  Grid3x3,
  Activity,
  AlertTriangle,
};

const colorMap = {
  blue: "bg-blue-50 text-blue-600 bg-blue-600",
  emerald: "bg-emerald-50 text-emerald-600 bg-emerald-500",
  indigo: "bg-indigo-50 text-indigo-600 bg-indigo-500",
};

export default function StatCard({ item }) {
  const Icon = icons[item.icon];
  const colors = colorMap[item.color] || colorMap.blue;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${colors.split(" ")[0]}`}>
          <Icon className={`w-4 h-4 ${colors.split(" ")[1]}`} />
        </div>

        {item.trend && (
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            {item.trend}
          </span>
        )}
      </div>

      <h3 className="text-sm font-medium text-gray-500">{item.title}</h3>

      <div className="flex items-baseline space-x-2 mt-1">
        <span className="text-2xl font-bold text-gray-900">
          {item.value}%
        </span>
      </div>

      <div className="mt-3">
        <div className="w-full bg-gray-100 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${colors.split(" ")[2]}`}
            style={{ width: `${item.value}%` }}
          />
        </div>
      </div>
    </div>
  );
}