import React from "react";

export default function TimelineOverview({ timelineTasks = [] }) {
  const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct"];

  if (!timelineTasks || timelineTasks.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg text-gray-500">
        No timeline data
      </div>
    );
  }

   return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

      {/* HEADER */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex justify-between">
        <h2 className="font-semibold text-gray-900">Timeline Overview</h2>

        <div className="flex space-x-2 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Done
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-sm"></div> Progress
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 bg-amber-500 rounded-sm"></div> Planned
          </span>
        </div>
      </div>

      {/* SCROLL AREA */}
      <div className="overflow-x-auto">

        <div className="min-w-[1000px]">

          {/* MONTH HEADER */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            <div className="w-64 px-4 py-2 text-xs font-bold text-gray-500">
              Task
            </div>

            <div className="flex-1 flex">
              {months.map((m) => (
                <div
                  key={m}
                  className="flex-1 text-center text-xs py-2 border-l border-gray-200"
                >
                  {m}
                </div>
              ))}
            </div>
          </div>

          {/* ROWS */}
          <div className="divide-y divide-gray-100">

            {timelineTasks.map((task, index) => (
              <div key={task.id} className="flex h-14 hover:bg-gray-50">

                {/* LEFT TASK NAME */}
                <div className="w-64 px-4 flex flex-col justify-center border-r border-gray-100">
                  <div className="text-sm font-medium text-gray-800 truncate">
                    {task.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {task.assigned_to_name}
                  </div>
                </div>

                {/* RIGHT TIMELINE */}
                <div className="flex-1 relative">

                  {/* GRID LINES */}
                  <div className="absolute inset-0 flex">
                    {months.map((_, i) => (
                      <div
                        key={i}
                        className="flex-1 border-l border-gray-100"
                      />
                    ))}
                  </div>

                  {/* BAR */}
                  <div
                    className={`absolute top-3 h-7 rounded-md text-white text-xs flex items-center px-3 shadow-sm ${task.color}`}
                    style={{
                      left: `${task.start * 120}px`,
                      width: `${Math.max(task.duration * 120, 90)}px`,
                    }}
                  >
                    {task.progress}%
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}