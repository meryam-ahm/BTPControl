// import React, { useEffect, useState } from 'react';
// import { Routes, Route, useLocation } from 'react-router-dom';
// import axios from 'axios';

// import Sidebar from './chef_chantier/Sidebar';
// import Header from './Ingenieur/PlanningGanttComponenets/Header';

// import Dashboard from './chef_chantier/Dashboard';
// import Workers from './chef_chantier/Workers';
// import Tasks from './chef_chantier/Tasks';
// import Resources from './chef_chantier/Resources';
// import Incidents from './chef_chantier/Incidents';

// export default function App() {
//   const [projects, setProjects] = useState([]);
//   const [currentProject, setCurrentProject] = useState(null);

//   const location = useLocation();

//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8000/api/SiteManager/getProjects')
//       .then((res) => {
//         const data = res.data || [];

//         setProjects(data);

//         if (data.length > 0) {
//           setCurrentProject(data[0]);
//         }
//       })
//       .catch((error) => {
//         console.error('Failed to load projects:', error);
//       });
//   }, []);

//   /*
//    * Detect project routes coming from Dashboard:
//    *
//    * /workers/11
//    * /tasks/11
//    * /resources/11
//    * /incidents/11
//    */
//   const getProjectIdFromPath = () => {
//     const match = location.pathname.match(
//       /^\/(workers|tasks|resources|incidents)\/(\d+)$/
//     );

//     return match ? Number(match[2]) : null;
//   };

//   const routeProjectId = getProjectIdFromPath();

//   /*
//    * Find the project corresponding to the ID in the URL.
//    */
//   const routeProject = routeProjectId
//     ? projects.find(
//         (project) =>
//           Number(project.project_id) === Number(routeProjectId)
//       )
//     : null;

//   /*
//    * If the URL contains a project ID,
//    * that project has priority.
//    *
//    * Otherwise use the project selected
//    * from the Header.
//    */
//   const activeProject = routeProject || currentProject;

//   /*
//    * Header is hidden when we are on:
//    *
//    * /workers/11
//    * /tasks/11
//    * /resources/11
//    * /incidents/11
//    */
//   const isProjectRoute = Boolean(routeProjectId);

//   /*
//    * Called by Header when the user selects
//    * a project from the dropdown.
//    */
//   const handleProjectChange = (value) => {
//     const projectId =
//       typeof value === 'object'
//         ? value?.project_id
//         : value;

//     const selectedProject = projects.find(
//       (project) =>
//         Number(project.project_id) === Number(projectId)
//     );

//     setCurrentProject(selectedProject || null);
//   };

//   return (
//     <div className="flex min-h-screen bg-[#F7F8FA]">

//       <Sidebar />

//       <div className="flex-1 min-w-0">

//         {/* HEADER ONLY FOR SIDEBAR ROUTES */}
//         {!isProjectRoute && (
//           <Header
//             projects={projects}
//             currentProject={currentProject?.project_id || null}
//             setCurrentProject={handleProjectChange}
//           />
//         )}

//         <main className="p-6">
//           <Routes>

//             {/* ================= DASHBOARD ================= */}

//             <Route
//               path="/"
//               element={
//                 <Dashboard
//                   currentProject={activeProject}
//                 />
//               }
//             />

//             {/* ================= SIDEBAR ROUTES ================= */}

//             <Route
//               path="/workers"
//               element={
//                 <Workers
//                   currentProject={activeProject}
//                 />
//               }
//             />

//             <Route
//               path="/tasks"
//               element={
//                 <Tasks
//                   currentProject={activeProject}
//                 />
//               }
//             />

//             <Route
//               path="/resources"
//               element={
//                 <Resources
//                   currentProject={activeProject}
//                 />
//               }
//             />

//             <Route
//               path="/incidents"
//               element={
//                 <Incidents
//                   currentProject={activeProject}
//                 />
//               }
//             />

//             {/* ================= DASHBOARD ROUTES ================= */}

//             <Route
//               path="/workers/:projectId"
//               element={
//                 <Workers
//                   currentProject={activeProject}
//                 />
//               }
//             />

//             <Route
//               path="/tasks/:projectId"
//               element={
//                 <Tasks
//                   currentProject={activeProject}
//                 />
//               }
//             />

//             <Route
//               path="/resources/:projectId"
//               element={
//                 <Resources
//                   currentProject={activeProject}
//                 />
//               }
//             />

//             <Route
//               path="/incidents/:projectId"
//               element={
//                 <Incidents
//                   currentProject={activeProject}
//                 />
//               }
//             />

//           </Routes>
//         </main>

//       </div>
//     </div>
//   );
// }