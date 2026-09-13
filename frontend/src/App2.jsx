// import React, { useState } from 'react';
// import WorkerHome from './travailleur/WorkerHome';
// import WorkerTasks from './travailleur/WorkerTasks';
// import WorkerActivity from './travailleur/WorkerActivity';
// import { Home, Briefcase, ListTodo, User } from 'lucide-react';

// export default function App() {
//   const [currentTab, setCurrentTab] = useState('home');
//   const [taskProgress, setTaskProgress] = useState(60);
//   const [attendance, setAttendance] = useState({
//     checkIn: "07:58 AM",
//     checkOut: "--:-- --",
//     status: "PRESENT"
//   });

//   return (
//     <div className="flex justify-center items-center bg-slate-900 min-h-screen p-0 sm:p-6 select-none">
      
//       {/* REAL-WORLD PHONE SIZE CONSTRAINTS */}
//       <div className="w-full max-w-[390px] h-screen sm:h-[844px] bg-slate-50 sm:rounded-[48px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden border-4 border-slate-900/10 flex flex-col justify-between relative font-sans">
        
//         {/* Dynamic Mobile Screen View Injection Layer */}
//         <div className="flex-1 overflow-y-auto pb-24 scrollbar-none">
//           {currentTab === 'home' && (
//             <WorkerHome 
//               progress={taskProgress} 
//               attendance={attendance} 
//               onNavigate={setCurrentTab} 
//             />
//           )}
//           {currentTab === 'work' && (
//             <WorkerTasks 
//               progress={taskProgress} 
//               setProgress={setTaskProgress} 
//               onNavigate={setCurrentTab}
//             />
//           )}
//           {currentTab === 'activity' && (
//             <WorkerActivity 
//               attendance={attendance} 
//               setAttendance={setAttendance} 
//               onNavigate={setCurrentTab}
//             />
//           )}
//           {currentTab === 'profile' && (
//             <div className="p-6 text-center text-gray-400 mt-32 font-semibold text-sm">
//               Profile Management Page Coming Soon...
//             </div>
//           )}
//         </div>

//         {/* STICKY BOTTOM FIXED MOBILE FOOTER NAV */}
//         <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl py-2.5 px-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex justify-between items-center z-50">
//           <button 
//             onClick={() => setCurrentTab('home')}
//             className={`flex flex-col items-center space-y-0.5 transition ${currentTab === 'home' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}
//           >
//             <Home size={19} strokeWidth={currentTab === 'home' ? 2.5 : 2} />
//             <span className="text-[10px]">Home</span>
//           </button>

//           <button 
//             onClick={() => setCurrentTab('work')}
//             className={`flex flex-col items-center space-y-0.5 transition ${currentTab === 'work' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}
//           >
//             <Briefcase size={19} strokeWidth={currentTab === 'work' ? 2.5 : 2} />
//             <span className="text-[10px]">Work</span>
//           </button>

//           <button 
//             onClick={() => setCurrentTab('activity')}
//             className={`flex flex-col items-center space-y-0.5 transition ${currentTab === 'activity' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}
//           >
//             <ListTodo size={19} strokeWidth={currentTab === 'activity' ? 2.5 : 2} />
//             <span className="text-[10px]">Activity</span>
//           </button>

//           <button 
//             onClick={() => setCurrentTab('profile')}
//             className={`flex flex-col items-center space-y-0.5 transition ${currentTab === 'profile' ? 'text-blue-600 font-bold' : 'text-gray-400'}`}
//           >
//             <User size={19} strokeWidth={currentTab === 'profile' ? 2.5 : 2} />
//             <span className="text-[10px]">Profile</span>
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }