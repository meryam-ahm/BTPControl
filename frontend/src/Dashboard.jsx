import React from "react";
import {
  FiSearch,
  FiBell,
  FiCalendar,
  FiPlus,
  FiShield,
  FiAlertTriangle,
} from "react-icons/fi";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const safetyData = [
  { name: "Without Injury", value: 7, color: "#22c55e" },
  { name: "Minor Injury", value: 3, color: "#f59e0b" },
  { name: "Major Injury", value: 1, color: "#ef4444" },
  { name: "Near Miss", value: 1, color: "#3b82f6" },
];

const phases = [
  ["Terrassement", 100],
  ["Foundations", 100],
  ["Elevation", 75],
  ["Dalle & Planchers", 50],
  ["Cloisons", 20],
  ["Electricité", 0],
  ["Finitions", 0],
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* HEADER */}
      <div className="bg-white rounded-xl px-6 py-4 shadow-sm flex justify-between items-center mb-6">
        <div>
          <p className="text-xs text-slate-400">Project</p>
          <h2 className="font-semibold text-slate-700">
            Résidence Les Oliviers
          </h2>
        </div>

        <div className="flex items-center gap-5">
          <FiSearch size={20} />
          <FiCalendar size={20} />
          <div className="relative">
            <FiBell size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              3
            </span>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2">
            <FiPlus />
            Add Report
          </button>
        </div>
      </div>

      {/* TITLE */}
      <div className="mb-5">
        <h1 className="text-3xl font-bold text-slate-800">
          Execution Monitoring
        </h1>
        <p className="text-slate-500">
          Follow up phases, quality, safety and compliance.
        </p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        {[
          ["Global Progress", "68%", "+5% vs last week"],
          ["Completed Phases", "4 / 7", ""],
          ["Quality Checklists", "82%", "+12% vs last week"],
          ["Safety Score", "90 /100", "Good"],
          ["Non-Conformities", "6", "2 critical"],
          ["Open Inspections", "4", "This week"],
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-4"
          >
            <p className="text-sm text-slate-500">{item[0]}</p>
            <h2 className="text-2xl font-bold mt-2">{item[1]}</h2>
            <p className="text-green-500 text-xs mt-1">{item[2]}</p>
          </div>
        ))}
      </div>

      {/* ROW 1 */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Progress */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-5">
            Project Phases Progress
          </h3>

          {phases.map(([name, value]) => (
            <div key={name} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{name}</span>
                <span>{value}%</span>
              </div>

              <div className="h-2 bg-slate-200 rounded-full">
                <div
                  className="h-2 bg-green-500 rounded-full"
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Quality */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">
              Quality Control (Checklists)
            </h3>
            <button className="text-blue-500 text-sm">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {[
              ["Foundation reinforcement", "Conforme"],
              ["Concrete foundations", "Conforme"],
              ["RDC walls", "Non Conforme"],
              ["Slab formwork", "Conforme"],
              ["Roof waterproofing", "Pending"],
            ].map((row, i) => (
              <div
                key={i}
                className="flex justify-between border-b pb-2"
              >
                <span>{row[0]}</span>
                <span
                  className={`text-sm ${
                    row[1] === "Conforme"
                      ? "text-green-600"
                      : row[1] === "Pending"
                      ? "text-orange-500"
                      : "text-red-500"
                  }`}
                >
                  {row[1]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Safety */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-4">
            Safety Summary
          </h3>

          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={safetyData}
                  dataKey="value"
                  innerRadius={55}
                  outerRadius={85}
                >
                  {safetyData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <button className="w-full border rounded-lg py-2 text-blue-600">
            Report an Incident
          </button>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-3 gap-4">
        {/* Inspection */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-4">
            Inspection History
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border rounded-lg overflow-hidden"
              >
                <img
                  src={`https://picsum.photos/300/200?random=${i}`}
                  alt=""
                  className="h-24 w-full object-cover"
                />

                <div className="p-2">
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                    Conforme
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Non Conformities */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-4">
            Non-Conformities
          </h3>

          <div className="space-y-4">
            {[
              "Cracks on external wall",
              "Bad reinforcement alignment",
              "Missing guard rail",
              "Material storage issue",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3"
              >
                <FiAlertTriangle className="text-red-500 mt-1" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold mb-4">
            Quick Actions
          </h3>

          <div className="space-y-3">
            {[
              "Add Quality Checklist",
              "Schedule Inspection",
              "Report Safety Incident",
              "Add Non-Conformity",
              "Upload Photos",
            ].map((action) => (
              <button
                key={action}
                className="w-full text-left border rounded-lg px-4 py-3 hover:bg-slate-50"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}