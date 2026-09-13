
import { useState, useEffect } from "react";
import axios from "axios";
import {
  X,
  ClipboardList,
  User,
  Layers,
  Flag,
  Clock,
  CalendarDays,
  FileText,
  ChevronDown
} from "lucide-react";

export default function TaskForm({ setShowTaskForm }) {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [form, setForm] = useState({
    project_id: "",
    assigned_to: "",
    parent_task_id: "",
    title: "",
    description: "",
    priority: "medium",
    estimated_hours: "",
    begin_date: "",
    due_date: ""
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/engineer/TaskController/task-form-data")
      .then((res) => {
        setProjects(res.data.projects || []);
        setUsers(res.data.users || []);
        setTasks(res.data.tasks || []);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        project_id: form.project_id || null,
        assigned_to: form.assigned_to || null,
        parent_task_id: form.parent_task_id || null,
        estimated_hours: form.estimated_hours || null,
        begin_date: form.begin_date || null,
        due_date: form.due_date || null
      };

      await axios.post(
        "http://127.0.0.1:8000/api/engineer/TaskController/CreateTask",
        payload
      );

      setShowTaskForm(false);
    } catch (err) {
      console.log("ERROR:", err.response?.data || err.message);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  const selectClass =
    "w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 pr-9 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-950/45 px-4 py-8 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
              <ClipboardList className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Create New Task
              </h2>
              <p className="text-xs text-gray-400">
                Add a task to your project planning
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowTaskForm(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* PROJECT */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Project
              </label>
              <div className="relative">
                <ClipboardList className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  name="project_id"
                  value={form.project_id}
                  onChange={handleChange}
                  className={`${selectClass} pl-9`}
                >
                  <option value="">Select project</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* CHEF */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Chef de chantier
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  name="assigned_to"
                  value={form.assigned_to}
                  onChange={handleChange}
                  className={`${selectClass} pl-9`}
                >
                  <option value="">Select user</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* PHASE */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Phase
              </label>
              <div className="relative">
                <Layers className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  name="parent_task_id"
                  value={form.parent_task_id}
                  onChange={handleChange}
                  className={`${selectClass} pl-9`}
                >
                  <option value="">No phase</option>
                  {tasks.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* TITLE */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Task Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter task title"
                className={inputClass}
              />
            </div>

            {/* PRIORITY */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Priority
              </label>
              <div className="relative">
                <Flag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className={`${selectClass} pl-9`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* HOURS */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Estimated Hours
              </label>
              <div className="relative">
                <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="estimated_hours"
                  value={form.estimated_hours}
                  onChange={handleChange}
                  placeholder="e.g. 8"
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            {/* BEGIN DATE */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Begin Date
              </label>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="begin_date"
                  value={form.begin_date}
                  onChange={handleChange}
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            {/* DUE DATE */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Due Date
              </label>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  name="due_date"
                  value={form.due_date}
                  onChange={handleChange}
                  className={`${inputClass} pl-9`}
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Description
              </label>
              <div className="relative">
                <FileText className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Describe the task..."
                  className={`${inputClass} resize-none pl-9`}
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-5 flex items-center justify-end gap-2 border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={() => setShowTaskForm(false)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )}
