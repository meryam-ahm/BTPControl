
import React, { useState } from "react";
import axios from "axios";

const CreateWorker = ({ currentProject, projectName, onClose, onWorkerCreated }) => {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(
                `http://127.0.0.1:8000/api/SiteManager/projects/${currentProject}/CreateWorker`,
                formData
            );
            onWorkerCreated?.(response.data.worker);
            onClose();
        } catch (err) {
            const errors = err.response?.data?.errors;
            setError(errors ? Object.values(errors).flat().join(" ") : err.response?.data?.message || "Unable to create worker.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">
                <div className="flex justify-between items-center mb-5">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Create Worker</h2>
                        <p className="text-sm text-gray-500">Add a worker to this project</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
                </div>

                {error && <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-lg p-3 text-sm">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter worker name" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="worker@example.com" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                        <input type="text" value={projectName || `Project #${currentProject}`} disabled className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-600" />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input type="text" value="Worker" disabled className="w-full bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-gray-600" />
                    </div>

                    <div className="flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button type="submit" disabled={loading} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                            {loading ? "Creating..." : "Create Worker"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateWorker;

