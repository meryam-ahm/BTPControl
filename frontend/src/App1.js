// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import SidebarComponent from "./Components/SidebarComponent";
// import ProjectDashbored from "./Ingenieur/ProjectDashbored";
// import ExecutionMonitoring from "./Ingenieur/ExecutionMonitoring";
// import PlanningGantt from "./Ingenieur/PlanningGantt";
// import EditProject from "./Ingenieur/EditProject";
// function App() {
//   return (
//     <div className="flex h-screen w-screen overflow-hidden">

//       <SidebarComponent />

//       <div className="flex-1 h-full overflow-y-auto bg-gray-50">
//         <Routes>
//           <Route path="/" element={<ProjectDashbored />} />

//           <Route
//             path="/ProjectDashboard"
//             element={<ProjectDashbored />}
//           />

//           <Route
//             path="/execution"
//             element={<ExecutionMonitoring />}
//           />

//           <Route
//             path="/planning"
//             element={<PlanningGantt />}
//           />
//           <Route
//             path="/projects/:projectId/edit"
//             element={<EditProject />}
//           />
//         </Routes>
//       </div>

//     </div>
//   );
// }

// export default App;