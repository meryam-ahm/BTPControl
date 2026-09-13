
import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Users, CalendarDays, ClipboardList } from "lucide-react";
import TaskList from "./PlanningGanttComponenets/TaskList";
import StatCard from "./PlanningGanttComponenets/Statcard";
import TimelineOverview from "./PlanningGanttComponenets/TimelineOverview";
import TaskForm from "./PlanningGanttComponenets/TaskForm";
import TaskDetails from "./PlanningGanttComponenets/TaskDetails";
import Header from "./PlanningGanttComponenets/Header";

const PlanningGantt = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [stats, setStats] = useState([]);
  const [timelineTasks, setTimelineTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/engineer/getProjects")
      .then((res) => {
        setProjects(res.data);
        if (res.data.length > 0) {
          setCurrentProject(res.data[0]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (!currentProject?.id) return;

    Promise.all([
      axios.get(
        `http://127.0.0.1:8000/api/engineer/projects/${currentProject.id}/tasks`
      ),
      axios.get(
        `http://127.0.0.1:8000/api/engineer/projects/${currentProject.id}/workers`
      ),
      axios.get(
        `http://127.0.0.1:8000/api/projects/${currentProject.id}/stats`
      ),
      axios.get(
        `http://127.0.0.1:8000/api/projects/${currentProject.id}/timeline`
      ),
    ])
      .then(([tasksRes, workersRes, statsRes, timelineRes]) => {
        setTasks(tasksRes.data);
        setWorkers(workersRes.data);
        setStats(statsRes.data);
        setTimelineTasks(timelineRes.data);
      })
      .catch((err) => console.error(err));
  }, [currentProject]);

  return (
    <div className="min-h-screen bg-gray-50">
      {showTaskForm && (
        <TaskForm setShowTaskForm={setShowTaskForm} />
      )}

      <Header
        projects={projects}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* PAGE HEADER */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Planning & Gantt
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Track project timeline, task progress, and resource allocation
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
          {stats.map((item, idx) => (
            <StatCard key={idx} item={item} />
          ))}
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-4">
            {/* TASKS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <ClipboardList className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      All Tasks
                    </h2>
                    <p className="text-xs text-gray-400">
                      {tasks.length} tasks
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowTaskForm(true)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition"
                  title="Add task"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-[540px] overflow-y-auto">
                <TaskList
                  tasks={tasks}
                  selectedTask={selectedTask}
                  setSelectedTask={setSelectedTask}
                />
              </div>
            </div>

            {/* WORKERS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      Workers On Site
                    </h2>
                    <p className="text-xs text-gray-400">
                      {workers.length} workers assigned
                    </p>
                  </div>
                </div>
              </div>

              {workers.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {workers.map((worker) => (
                    <div
                      key={worker.id}
                      className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-semibold">
                          {worker.name?.charAt(0)?.toUpperCase()}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {worker.name}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {worker.pivot?.role_on_proj || "Worker"}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-50 text-green-600 text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        On Site
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <Users className="w-7 h-7 mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-500">
                    No workers assigned
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-3 space-y-4">
            {/* TIMELINE */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-blue-600" />
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Project Timeline
                  </h2>
                  <p className="text-xs text-gray-400">
                    Project schedule overview
                  </p>
                </div>
              </div>

              <div className="p-4">
                <TimelineOverview tasks={timelineTasks} />
              </div>
            </div>

            {/* TASK DETAILS */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">
                  Task Details
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Select a task to view its information
                </p>
              </div>

              <div className="p-4">
                <TaskDetails task={selectedTask} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlanningGantt