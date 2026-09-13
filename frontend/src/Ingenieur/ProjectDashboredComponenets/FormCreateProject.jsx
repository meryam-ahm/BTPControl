import { useEffect, useState } from "react";
import axios from "axios";
import {
  X,
  Building2,
  MapPin,
  Wallet,
  CalendarDays,
  UserPlus,
  Plus,
  Loader2,
  Users,
} from "lucide-react";

export default function CreateProject({ onClose, onCreated }) {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientLoading, setClientLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    client_id: "",
    location: "",
    budget: "",
    status: "planned",
    start_date: "",
    end_date: "",
  });

  const [newClient, setNewClient] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/engineer/dashbored/clients"
      );
      setClients(res.data);
    } catch (err) {
      console.error("Failed to load clients:", err);
      setError("Unable to load clients.");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Project name is required.");
      return;
    }

    if (!form.client_id) {
      setError("Please select a client.");
      return;
    }

    if (!form.start_date || !form.end_date) {
      setError("Please select the project dates.");
      return;
    }

    if (new Date(form.end_date) < new Date(form.start_date)) {
      setError("End date cannot be before start date.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://127.0.0.1:8000/api/engineer/dashbored/createproject",
        form
      );

      setForm({
        name: "",
        client_id: "",
        location: "",
        budget: "",
        status: "planned",
        start_date: "",
        end_date: "",
      });

      if (onCreated) {
        onCreated();
      } else if (onClose) {
        onClose();
      }
    } catch (err) {
      console.error("Create project error:", err);
      setError(
        err.response?.data?.message ||
          "Something went wrong while creating the project."
      );
    } finally {
      setLoading(false);
    }
  };

  const createClient = async () => {
    if (!newClient.name.trim()) {
      return;
    }

    try {
      setClientLoading(true);
      setError("");

      const res = await axios.post(
        "http://127.0.0.1:8000/api/engineer/dashbored/createClient",
        newClient
      );

      const created = res.data;

      const updated = await axios.get(
        "http://127.0.0.1:8000/api/engineer/dashbored/clients"
      );

      setClients(updated.data);

      setForm({
        ...form,
        client_id: created.id,
      });

      setNewClient({
        name: "",
        phone: "",
        email: "",
        address: "",
      });

      setShowModal(false);
    } catch (err) {
      console.error("Create client error:", err);
      setError(
        err.response?.data?.message ||
          "Unable to create the client."
      );
    } finally {
      setClientLoading(false);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200">
      {/* HEADER */}
      <div className="relative overflow-hidden bg-slate-950 px-7 py-6 text-white">
        <div className="absolute -right-10 -top-16 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500 shadow-lg shadow-blue-500/20">
              <Building2 size={23} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-300">
                Project Management
              </p>
              <h2 className="mt-1 text-2xl font-bold">
                Create New Project
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Set up the project information and timeline.
              </p>
            </div>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              <X size={21} />
            </button>
          )}
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="p-7">
        {error && (
          <div className="mb-5 flex items-center rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* PROJECT NAME */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Project Name
            </label>

            <div className="relative">
              <Building2
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="name"
                placeholder="e.g. Residential Villa — Nador"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* CLIENT */}
          <div className="md:col-span-2">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Client
            </label>

            <div className="flex gap-2">
              <div className="relative flex-1">
                <Users
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  name="client_id"
                  value={form.client_id}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="">Select a client</option>

                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white transition hover:bg-blue-600"
              >
                <Plus size={17} />
                New
              </button>
            </div>
          </div>

          {/* LOCATION */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Location
            </label>

            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="location"
                placeholder="Project location"
                value={form.location}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* BUDGET */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Budget
            </label>

            <div className="relative">
              <Wallet
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="budget"
                type="number"
                min="0"
                placeholder="Project budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* STATUS */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Status
            </label>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="planned">Planned</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* START DATE */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Start Date
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          {/* END DATE */}
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              End Date
            </label>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm font-medium outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-7 flex items-center justify-between border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400">
            All project details can be updated later.
          </p>

          <div className="flex gap-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex min-w-[170px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={17} />
                  Create Project
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* NEW CLIENT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-slate-950/70 p-4 pt-20 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl animate-[slideDown_0.2s_ease-out]">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between bg-slate-950 px-6 py-5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                  <UserPlus size={19} />
                </div>

                <div>
                  <h3 className="font-bold">New Client</h3>
                  <p className="text-xs text-slate-400">
                    Add a client to this project
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <input
                placeholder="Client name"
                value={newClient.name}
                onChange={(e) =>
                  setNewClient({
                    ...newClient,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />

              <input
                placeholder="Phone number"
                value={newClient.phone}
                onChange={(e) =>
                  setNewClient({
                    ...newClient,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />

              <input
                type="email"
                placeholder="Email address"
                value={newClient.email}
                onChange={(e) =>
                  setNewClient({
                    ...newClient,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />

              <input
                placeholder="Address"
                value={newClient.address}
                onChange={(e) =>
                  setNewClient({
                    ...newClient,
                    address: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />

              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={createClient}
                  disabled={clientLoading}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-60"
                >
                  {clientLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Save Client
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
