import React from 'react';
import { Bell, AlertTriangle } from 'lucide-react';
 
const Dashboard = () => {
  return (
    // Cleaned container optimized for tablet bounds without a sidebar
    <div className="max-w-[1024px] mx-auto min-h-[768px] bg-[#F8F9FA] font-sans shadow-2xl border border-gray-200 overflow-hidden my-4 rounded-2xl flex flex-col">
      
      {/* Main Content Area - Expands to take 100% full width */}
      <main className="flex-1 p-6 overflow-y-auto flex flex-col justify-between">
        <div>
          {/* Header */}
          <header className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard</h2>
            <div className="relative p-2 hover:bg-gray-200/50 rounded-xl cursor-pointer transition">
              <Bell size={22} className="text-gray-700"/>
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div>
          </header>

          {/* Active Project Banner */}
          <section className="bg-white rounded-2xl p-5 shadow-sm mb-6 border border-gray-100 flex gap-6 items-center justify-between">
            <div className="flex-1">
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">Active Project</p>
              <h3 className="text-xl font-bold text-gray-950 mb-4">Résidence Al Kawtar</h3>
              <div className="flex items-center gap-4 max-w-md">
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[75%] rounded-full"></div>
                </div>
                <span className="font-extrabold text-sm text-gray-800">75%</span>
              </div>
            </div>
            <div className="w-24 h-24 bg-blue-50 rounded-xl flex items-center justify-center text-4xl shrink-0">
              🏢
            </div>
          </section>

          {/* Stats Grid: Clean 4-column row expanding across the full screen width */}
          <section className="grid grid-cols-4 gap-4 mb-6">
            {[
              { val: 42, label: 'Workers', sub: 'Present', text: 'text-blue-600' },
              { val: 18, label: 'Tasks', sub: 'In Progress', text: 'text-green-600' },
              { val: 3, label: 'Incidents', sub: 'Open', text: 'text-red-600' },
              { val: 120, label: 'Materials', sub: 'In Stock', text: 'text-purple-600' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[110px]">
                <div>
                  <p className="font-bold text-gray-800 text-xs tracking-wide">{stat.label}</p>
                  <p className="text-xs text-gray-400 font-medium mt-0.5">{stat.sub}</p>
                </div>
                <p className={`text-3xl font-black ${stat.text} mt-2`}>{stat.val}</p>
              </div>
            ))}
          </section>
        </div>

        {/* Bottom Tasks & Alerts - Side-by-Side Split */}
        <div className="grid grid-cols-2 gap-4">
          {/* Tasks Column */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <h4 className="font-bold mb-3 text-gray-900 text-sm">Today's Tasks</h4>
              <div className="space-y-3">
                 <div className="flex justify-between items-center text-sm border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="font-semibold text-gray-950">Concrete Foundation</p>
                      <p className="text-gray-400 text-xs mt-0.5">08:00 - 12:00</p>
                    </div>
                    <span className="bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-xs font-bold">Done</span>
                 </div>
              </div>
            </div>
            <button className="w-full text-blue-600 mt-4 font-bold text-xs pt-2 tracking-wide uppercase border-t border-gray-50 text-center">
              View All Tasks
            </button>
          </div>

          {/* Alerts Column */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
            <div>
              <h4 className="font-bold mb-3 text-gray-900 text-sm">Active Alerts</h4>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <div className="p-1.5 bg-red-50 rounded-lg text-red-500 shrink-0">
                    <AlertTriangle size={16}/>
                  </div>
                  <div>
                     <p className="text-sm font-semibold text-gray-950">Cement running low</p>
                     <p className="text-gray-400 text-xs mt-0.5">Today, 09:30</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full text-blue-600 mt-4 font-bold text-xs pt-2 tracking-wide uppercase border-t border-gray-50 text-center">
              View All Alerts
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
