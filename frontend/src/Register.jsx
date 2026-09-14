import React, { useState } from "react";
import axios from "axios";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        role: "worker",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/auth/register",
                formData
            );

            const user = response.data.user;
            const token = response.data.token;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setSuccess("Account created successfully.");

            if (user.role === "chef_chantier") {
                window.location.href = "/";
                return;
            }

            if (user.role === "worker") {
                window.location.href = "/worker";
                return;
            }

            if (user.role === "engineer") {
                window.location.href = "/engineer";
                return;
            }

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setError("Your account does not have a valid role.");
        } catch (error) {
            if (error.response?.status === 422) {
                const errors = error.response?.data?.errors;

                if (errors) {
                    const firstError = Object.values(errors)[0];

                    setError(
                        Array.isArray(firstError)
                            ? firstError[0]
                            : firstError
                    );
                } else {
                    setError(
                        error.response?.data?.message ||
                        "Please check the information you entered."
                    );
                }
            } else {
                setError(
                    error.response?.data?.message ||
                    "Something went wrong while creating your account."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
                <div className="hidden md:flex bg-slate-900 text-white p-10 flex-col justify-between">
                    <div>
                        <div className="text-yellow-400 text-2xl font-black">
                            BTPControl
                        </div>

                        <p className="mt-2 text-slate-400">
                            Construction Management Platform
                        </p>
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold leading-tight">
                            Manage construction
                            projects with confidence.
                        </h1>

                        <p className="mt-5 text-slate-400">
                            Create your account and access
                            your BTPControl workspace.
                        </p>
                    </div>

                    <div className="text-sm text-slate-500">
                        BTPControl © 2026
                    </div>
                </div>

                <div className="p-8 md:p-10">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-slate-900">
                            Create your account
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Sign up to start using BTPControl.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-5 rounded-xl bg-green-50 border border-green-200 text-green-600 px-4 py-3 text-sm">
                            {success}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                autoComplete="name"
                                placeholder="Your full name"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Phone
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                autoComplete="tel"
                                placeholder="+212 6 XX XX XX XX"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Role
                            </label>

                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            >
                                <option value="worker">
                                    Worker
                                </option>

                                <option value="chef_chantier">
                                    Site Manager
                                </option>

                                <option value="engineer">
                                    Engineer
                                </option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={8}
                                autoComplete="new-password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                required
                                minLength={8}
                                autoComplete="new-password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold transition disabled:opacity-50"
                        >
                            {loading
                                ? "Creating account..."
                                : "Create Account"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={() =>
                                window.location.href = "/login"
                            }
                            className="font-semibold text-slate-900 hover:text-yellow-500 transition"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}