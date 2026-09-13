 import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: "",
    type: "",
    location: "",
    start_date: "",
    end_date: "",
    budget: "",
    status: "planned",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/engineer/projects/${projectId}`
        );

        const project = res.data.project || res.data;

        setForm({
          name: project.name || "",
          type: project.type || "",
          location: project.location || "",
          start_date: project.start_date || "",
          end_date: project.end_date || "",
          budget: project.budget || "",
          status: project.status || "planned",
        });
      } catch (error) {
        console.error("Fetch project error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await axios.put(
        `http://127.0.0.1:8000/api/engineer/projects/${projectId}`,
        form
      );

      navigate(-1);
    } catch (error) {
      console.error("Update project error:", error);
      alert(
        error.response?.data?.message || "Failed to update project."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500">Loading project...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            Edit Project
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Update project information.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Project Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full h-11 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Project Type
              </label>
              <input
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full h-11 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full h-11 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                className="w-full h-11 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                className="w-full h-11 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Budget
              </label>
              <input
                type="number"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                min="0"
                className="w-full h-11 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full h-11 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="planned">Planned</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-7 pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
 
