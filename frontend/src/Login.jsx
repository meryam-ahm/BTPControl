import React, { useState } from "react";
import axios from "axios";

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/auth/login",
                {
                    email: formData.email,
                    password: formData.password,
                }
            );

            const user = response.data.user;
            const token = response.data.token;

            localStorage.setItem("token", token);
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

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

            setError(
                "Your account does not have a valid role."
            );

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "The email or password is incorrect."
            );
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
                            One secure platform for engineers,
                            site managers and workers.
                        </p>
                    </div>

                    <div className="text-sm text-slate-500">
                        BTPControl © 2026
                    </div>
                </div>

                <div className="p-8 md:p-10">

                    <div className="mb-8">

                        <h2 className="text-3xl font-bold text-slate-900">
                            Welcome back
                        </h2>

                        <p className="text-slate-500 mt-2">
                            Sign in to your BTPControl account.
                        </p>

                    </div>

                    {error && (
                        <div className="mb-5 rounded-xl bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

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
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                autoComplete="current-password"
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
                                ? "Signing in..."
                                : "Sign In"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}