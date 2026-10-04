 import { useState, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function WorkerTaskForm({
    setShowTaskForm,
    currentProject,
}) {
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
        due_date: "",
    });

    // ============================================================
    // AUTHENTICATION HEADERS
    // ============================================================
    const getAuthHeaders = () => {
        const token = localStorage.getItem("token");

        return {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
        };
    };

    // ============================================================
    // FETCH DROPDOWN DATA
    // ============================================================
    useEffect(() => {
        if (!currentProject) return;

        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No authentication token found.");
            return;
        }

        axios
            .get(
                `http://127.0.0.1:8000/api/SiteManager/${currentProject}/task-form-data`,
                {
                    headers: getAuthHeaders(),
                }
            )
            .then((res) => {
                console.log("FORM DATA:", res.data);

                setProjects(res.data.projects || []);
                setUsers(res.data.users || []);
                setTasks(res.data.tasks || []);
            })
            .catch((err) => {
                console.error("FORM DATA ERROR:", err);
                console.error("Status:", err.response?.status);
                console.error("Response:", err.response?.data);

                if (err.response?.status === 401) {
                    console.error(
                        "Authentication failed. Token may be missing, expired, or invalid."
                    );
                }
            });
    }, [currentProject]);

    // ============================================================
    // HANDLE INPUT CHANGE
    // ============================================================
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // ============================================================
    // CREATE TASK
    // ============================================================
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            console.error("Authentication token not found.");
            return;
        }

        try {
            const payload = {
                ...form,
                project_id: form.project_id || null,
                assigned_to: form.assigned_to || null,
                title: form.title || null,
                parent_task_id: form.parent_task_id || null,
                estimated_hours: form.estimated_hours || null,
                begin_date: form.begin_date || null,
                due_date: form.due_date || null,
            };

            const response = await axios.post(
                "http://127.0.0.1:8000/api/SiteManager/CreateTask",
                payload,
                {
                    headers: getAuthHeaders(),
                }
            );

            console.log("TASK CREATED:", response.data);
            console.log(
                "The task",
                payload.title,
                "has been created"
            );

            setShowTaskForm(false);
        } catch (err) {
            console.error(
                "CREATE TASK ERROR:",
                err.response?.data || err.message
            );

            console.error("Status:", err.response?.status);

            if (err.response?.status === 401) {
                console.error(
                    "Authentication failed. Please log in again."
                );
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8 relative max-h-[90vh] overflow-y-auto border border-gray-100">

                {/* CLOSE */}
                <button
                    onClick={() => setShowTaskForm(false)}
                    className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100"
                >
                    <X size={20} className="text-gray-500" />
                </button>

                {/* TITLE */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Create New Task
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="grid md:grid-cols-2 gap-5"
                >

                    {/* PROJECT */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 mb-1">
                            Project
                        </label>

                        <select
                            name="project_id"
                            value={form.project_id}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-green-400"
                        >
                            <option value="">Select project</option>

                            {projects.map((p) => (
                                <option
                                    key={p.project.id}
                                    value={p.project.id}
                                >
                                    {p.project.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* USER */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 mb-1">
                            Worker
                        </label>

                        <select
                            name="assigned_to"
                            value={form.assigned_to}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-green-400"
                        >
                            <option value="">Select user</option>

                            {users.map((u) => (
                                <option
                                    key={u.user.id}
                                    value={u.user.id}
                                >
                                    {u.user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* PARENT TASK */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 mb-1">
                            Phase
                        </label>

                        <select
                            name="parent_task_id"
                            value={form.parent_task_id}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-green-400"
                        >
                            <option value="">No phase</option>

                            {tasks.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* TITLE */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 mb-1">
                            Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-xl p-3"
                        />
                    </div>

                    {/* PRIORITY */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 mb-1">
                            Priority
                        </label>

                        <select
                            name="priority"
                            value={form.priority}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-xl p-3"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>

                    {/* HOURS */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 mb-1">
                            Estimated Hours
                        </label>

                        <input
                            type="number"
                            name="estimated_hours"
                            value={form.estimated_hours}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-xl p-3"
                        />
                    </div>

                    {/* BEGIN DATE */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 mb-1">
                            Begin Date
                        </label>

                        <input
                            type="date"
                            name="begin_date"
                            value={form.begin_date}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-xl p-3"
                        />
                    </div>

                    {/* DUE DATE */}
                    <div className="flex flex-col">
                        <label className="text-sm text-gray-500 mb-1">
                            Due Date
                        </label>

                        <input
                            type="date"
                            name="due_date"
                            value={form.due_date}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-xl p-3"
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div className="md:col-span-2 flex flex-col">
                        <label className="text-sm text-gray-500 mb-1">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            className="border border-gray-200 rounded-xl p-3"
                        />
                    </div>

                    {/* BUTTONS */}
                    <div className="md:col-span-2 flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={() => setShowTaskForm(false)}
                            className="px-5 py-2 rounded-xl bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2 rounded-xl bg-green-600 text-white"
                        >
                            Create Task
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}
 