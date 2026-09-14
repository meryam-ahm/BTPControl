import React, { useState } from "react";
import axios from "axios";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/auth/login",
                {
                    email: loginData.email,
                    password: loginData.password,
                }
            );

            const user = response.data.user;

            if (user.role !== "chef_chantier") {
                setError(
                    "This account is not a Chef de chantier account."
                );
                return;
            }

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            window.location.href = "/";
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/auth/register",
                {
                    name: registerData.name,
                    email: registerData.email,
                    phone: registerData.phone,
                    password: registerData.password,
                    password_confirmation:
                        registerData.password_confirmation,
                    role: "chef_chantier",
                }
            );

            const user = response.data.user;

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            window.location.href = "/";
        } catch (error) {
            const errors =
                error.response?.data?.errors;

            if (errors) {
                const firstError =
                    Object.values(errors)[0]?.[0];

                setError(
                    firstError ||
                    "Registration failed."
                );
            } else {
                setError(
                    error.response?.data?.message ||
                    "Registration failed."
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
                            Manage your construction
                            projects with confidence.
                        </h1>

                        <p className="mt-5 text-slate-400">
                            Access your Chef de chantier
                            workspace and manage workers,
                            tasks, resources and incidents.
                        </p>
                    </div>

                    <div className="text-sm text-slate-500">
                        BTPControl © 2026
                    </div>

                </div>

                <div className="p-8 md:p-10">

                    <div className="mb-8">

                        <h2 className="text-3xl font-bold text-slate-900">
                            {isLogin
                                ? "Welcome back"
                                : "Create account"}
                        </h2>

                        <p className="text-slate-500 mt-2">
                            {isLogin
                                ? "Sign in to your Chef de chantier account."
                                : "Create your Chef de chantier account."}
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

                    {isLogin ? (

                        <form
                            onSubmit={handleLogin}
                            className="space-y-5"
                        >

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    placeholder="••••••••"
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

                    ) : (

                        <form
                            onSubmit={handleRegister}
                            className="space-y-4"
                        >

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Full name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    required
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
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Phone
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={registerData.phone}
                                    onChange={handleRegisterChange}
                                    required
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
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    required
                                    minLength={8}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Confirm password
                                </label>

                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={
                                        registerData.password_confirmation
                                    }
                                    onChange={handleRegisterChange}
                                    required
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
                    )}

                    <div className="mt-7 text-center">

                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError("");
                                setSuccess("");
                            }}
                            className="text-sm font-semibold text-slate-700 hover:text-yellow-600"
                        >
                            {isLogin
                                ? "Don't have an account? Create one"
                                : "Already have an account? Sign in"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}