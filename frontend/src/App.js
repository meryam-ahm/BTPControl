
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import WorkerHome from './travailleur/WorkerHome';
import WorkerTasks from './travailleur/WorkerTasks';
import WorkerActivity from './travailleur/WorkerActivity';

import {
  Home,
  Briefcase,
  ListTodo,
  User,
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');

  const [projects, setProjects] = useState([]);

  const [currentProject, setCurrentProject] =
    useState(null);

  const [taskProgress, setTaskProgress] =
    useState(60);

  // Attendance comes from Laravel.
  // Do not put fake check-in data here.
  const [attendance, setAttendance] =
    useState(null);

  /*
  |--------------------------------------------------------------------------
  | LOAD WORKER PROJECTS
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    axios
      .get(
        'http://127.0.0.1:8000/api/Worker/getProjects'
      )
      .then((response) => {
        const workerProjects =
          response.data.projects || [];

        console.log(
          'Worker Projects:',
          workerProjects
        );

        setProjects(workerProjects);

        if (workerProjects.length > 0) {
          setCurrentProject(
            workerProjects[0]
          );
        }
      })
      .catch((error) => {
        console.error(
          'Error loading worker projects:',
          error
        );
      });
  }, []);

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="w-full min-h-screen bg-slate-900 flex items-center justify-center">

      {/* PHONE */}
      <div className="relative w-[390px] h-[844px] max-w-[390px] max-h-[844px] overflow-hidden bg-slate-50 rounded-[42px] border-4 border-slate-800 shadow-2xl flex flex-col">

        {/* APP CONTENT */}
        <div className="relative flex-1 min-h-0 overflow-hidden">

          <div className="h-full overflow-y-auto pb-24 scrollbar-none">

            {/* HOME */}
            {currentTab === 'home' && (
              <WorkerHome
                projects={projects}
                currentProject={currentProject}
                setCurrentProject={
                  setCurrentProject
                }
                onNavigate={setCurrentTab}
              />
            )}

            {/* WORK */}
            {currentTab === 'work' && (
              <WorkerTasks
                currentProject={currentProject}
                progress={taskProgress}
                setProgress={
                  setTaskProgress
                }
                onNavigate={setCurrentTab}
              />
            )}

            {/* ACTIVITY */}
            {currentTab === 'activity' && (
              <WorkerActivity
                projectId={
                  currentProject?.project_id
                }
                attendance={attendance}
                setAttendance={
                  setAttendance
                }
                onNavigate={setCurrentTab}
              />
            )}

            {/* PROFILE */}
            {currentTab === 'profile' && (
              <div className="p-6 text-center text-gray-400 mt-32 font-semibold text-sm">
                Profile Management Page
                Coming Soon...
              </div>
            )}

          </div>

          {/* BOTTOM NAV */}
          <div className="absolute bottom-4 left-4 right-4 h-[62px] bg-white/95 backdrop-blur-md rounded-2xl px-6 shadow-lg border border-gray-100 flex justify-between items-center z-40">

            {/* HOME */}
            <button
              onClick={() =>
                setCurrentTab('home')
              }
              className={`flex flex-col items-center gap-0.5 ${
                currentTab === 'home'
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-400'
              }`}
            >
              <Home
                size={19}
                strokeWidth={
                  currentTab === 'home'
                    ? 2.5
                    : 2
                }
              />

              <span className="text-[10px]">
                Home
              </span>
            </button>

            {/* WORK */}
            <button
              onClick={() =>
                setCurrentTab('work')
              }
              className={`flex flex-col items-center gap-0.5 ${
                currentTab === 'work'
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-400'
              }`}
            >
              <Briefcase
                size={19}
                strokeWidth={
                  currentTab === 'work'
                    ? 2.5
                    : 2
                }
              />

              <span className="text-[10px]">
                Work
              </span>
            </button>

            {/* ACTIVITY */}
            <button
              onClick={() =>
                setCurrentTab('activity')
              }
              className={`flex flex-col items-center gap-0.5 ${
                currentTab === 'activity'
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-400'
              }`}
            >
              <ListTodo
                size={19}
                strokeWidth={
                  currentTab === 'activity'
                    ? 2.5
                    : 2
                }
              />

              <span className="text-[10px]">
                Activity
              </span>
            </button>

            {/* PROFILE */}
            <button
              onClick={() =>
                setCurrentTab('profile')
              }
              className={`flex flex-col items-center gap-0.5 ${
                currentTab === 'profile'
                  ? 'text-blue-600 font-bold'
                  : 'text-gray-400'
              }`}
            >
              <User
                size={19}
                strokeWidth={
                  currentTab === 'profile'
                    ? 2.5
                    : 2
                }
              />

              <span className="text-[10px]">
                Profile
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
 