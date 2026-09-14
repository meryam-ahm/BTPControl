 
import { useState } from "react";
import axios from "axios";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        role: "engineer",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const switchMode = (login) => {
        setIsLogin(login);
        setError("");
        setSuccess("");
    };

    // =========================
    // REDIRECT BY ROLE
    // =========================

    const redirectByRole = (user) => {
        switch (user.role) {
            case "chef_chantier":
                // Your current Chef de chantier dashboard
                window.location.href = "/";
                break;

            case "engineer":
                window.location.href = "/engineer";
                break;

            case "worker":
                window.location.href = "/worker";
                break;

            case "client":
                window.location.href = "/client";
                break;

            default:
                window.location.href = "/";
        }
    };

    // =========================
    // LOGIN / REGISTER
    // =========================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const url = isLogin
                ? "http://127.0.0.1:8000/api/auth/login"
                : "http://127.0.0.1:8000/api/auth/register";

            const data = isLogin
                ? {
                      email: form.email,
                      password: form.password,
                  }
                : {
                      name: form.name,
                      email: form.email,
                      phone: form.phone,
                      password: form.password,
                      password_confirmation:
                          form.password_confirmation,
                      role: form.role,
                  };

            const response = await axios.post(url, data);

            // =========================
            // SAVE TOKEN
            // =========================

            localStorage.setItem(
                "token",
                response.data.token
            );

            // =========================
            // SAVE USER
            // =========================

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            console.log(
                "Authenticated user:",
                response.data.user
            );

            // =========================
            // REDIRECT
            // =========================

            redirectByRole(response.data.user);

        } catch (err) {
            console.error("AUTH ERROR:", err);

            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;

                const firstError =
                    Object.values(errors)[0]?.[0];

                setError(
                    firstError ||
                        "Please check the information you entered."
                );
            } else if (err.response?.data?.message) {
                setError(
                    err.response.data.message
                );
            } else {
                setError(
                    "Unable to connect to the server."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex">

            {/* =========================
                LEFT SIDE
            ========================= */}

            <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden">

                <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=90"
                    alt="Construction project"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-900/50" />

                <div className="relative z-10 flex flex-col justify-between w-full p-12 xl:p-16">

                    {/* LOGO */}

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg">
                            B
                        </div>

                        <div className="text-white text-2xl font-extrabold tracking-tight">
                            BTP
                            <span className="text-amber-400">
                                Control
                            </span>
                        </div>

                    </div>

                    {/* HERO */}

                    <div className="max-w-xl pb-10">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="h-px w-10 bg-amber-400" />

                            <span className="text-amber-400 text-xs font-bold tracking-[0.25em]">
                                CONSTRUCTION MANAGEMENT
                            </span>

                        </div>

                        <h1 className="text-5xl xl:text-7xl font-black tracking-tight leading-[0.95] text-white">
                            Build smarter.
                            <br />

                            <span className="text-amber-400">
                                Manage better.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-lg text-slate-300 text-base xl:text-lg leading-7">
                            Manage construction projects,
                            coordinate teams, follow execution
                            and keep every detail under control.
                        </p>

                        {/* MINI STATS */}

                        <div className="flex gap-10 mt-10">

                            <div>
                                <div className="text-white text-2xl font-bold">
                                    01
                                </div>

                                <div className="text-slate-400 text-xs uppercase tracking-wider mt-1">
                                    Projects
                                </div>
                            </div>

                            <div>
                                <div className="text-white text-2xl font-bold">
                                    02
                                </div>

                                <div className="text-slate-400 text-xs uppercase tracking-wider mt-1">
                                    Teams
                                </div>
                            </div>

                            <div>
                                <div className="text-white text-2xl font-bold">
                                    03
                                </div>

                                <div className="text-slate-400 text-xs uppercase tracking-wider mt-1">
                                    Progress
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            {/* =========================
                RIGHT SIDE
            ========================= */}

            <div className="w-full lg:w-[48%] bg-white min-h-screen flex items-center justify-center px-6 py-10">

                <div className="w-full max-w-md">

                    {/* MOBILE LOGO */}

                    <div className="lg:hidden flex items-center gap-3 mb-10">

                        <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-slate-950 font-black text-lg">
                            B
                        </div>

                        <div className="text-xl font-extrabold text-slate-900">
                            BTP
                            <span className="text-amber-500">
                                Control
                            </span>
                        </div>

                    </div>

                    {/* HEADING */}

                    <div className="mb-7">

                        <p className="text-amber-500 text-xs font-bold tracking-[0.2em]">
                            {isLogin
                                ? "WELCOME BACK"
                                : "GET STARTED"}
                        </p>

                        <h2 className="text-3xl font-black tracking-tight text-slate-900 mt-2">
                            {isLogin
                                ? "Sign in to BTPControl"
                                : "Create your account"}
                        </h2>

                        <p className="text-sm text-slate-500 mt-2 leading-6">
                            {isLogin
                                ? "Access your projects and construction workspace."
                                : "Start managing your construction projects with confidence."}
                        </p>

                    </div>

                    {/* TABS */}

                    <div className="flex p-1 bg-slate-100 rounded-xl mb-7">

                        <button
                            type="button"
                            onClick={() =>
                                switchMode(true)
                            }
                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                                isLogin
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                switchMode(false)
                            }
                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition ${
                                !isLogin
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                            Sign Up
                        </button>

                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        {/* NAME */}

                        {!isLogin && (
                            <div>

                                <label className="block text-xs font-bold text-slate-700 mb-2">
                                    Full name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    required
                                    className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-white text-sm outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                                />

                            </div>
                        )}

                        {/* PHONE + ROLE */}

                        {!isLogin && (
                            <div className="grid grid-cols-2 gap-3">

                                <div>

                                    <label className="block text-xs font-bold text-slate-700 mb-2">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="06XXXXXXXX"
                                        required
                                        className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                                    />

                                </div>

                                <div>

                                    <label className="block text-xs font-bold text-slate-700 mb-2">
                                        Role
                                    </label>

                                    <select
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        className="w-full h-12 px-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                                    >
                                        <option value="engineer">
                                            Engineer
                                        </option>

                                        <option value="chef_chantier">
                                            Site Manager
                                        </option>

                                        <option value="worker">
                                            Worker
                                        </option>

                                        <option value="client">
                                            Client
                                        </option>
                                    </select>

                                </div>

                            </div>
                        )}

                        {/* EMAIL */}

                        <div>

                            <label className="block text-xs font-bold text-slate-700 mb-2">
                                Email address
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="name@example.com"
                                required
                                className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                            />

                        </div>

                        {/* PASSWORD */}

                        <div>

                            <label className="block text-xs font-bold text-slate-700 mb-2">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                            />

                        </div>

                        {/* CONFIRM PASSWORD */}

                        {!isLogin && (
                            <div>

                                <label className="block text-xs font-bold text-slate-700 mb-2">
                                    Confirm password
                                </label>

                                <input
                                    type="password"
                                    name="password_confirmation"
                                    value={
                                        form.password_confirmation
                                    }
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    required
                                    className="w-full h-12 px-4 rounded-xl border border-slate-200 text-sm outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10"
                                />

                            </div>
                        )}

                        {/* LOGIN OPTIONS */}

                        {isLogin && (
                            <div className="flex items-center justify-between pt-1">

                                <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer">

                                    <input
                                        type="checkbox"
                                        className="accent-amber-400"
                                    />

                                    Remember me

                                </label>

                                <button
                                    type="button"
                                    className="text-xs font-bold text-amber-600 hover:text-amber-700"
                                >
                                    Forgot password?
                                </button>

                            </div>
                        )}

                        {/* ERROR */}

                        {error && (
                            <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-xs font-medium text-red-600">
                                {error}
                            </div>
                        )}

                        {/* SUCCESS */}

                        {success && (
                            <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-xs font-medium text-emerald-600">
                                {success}
                            </div>
                        )}

                        {/* SUBMIT */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-800 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-slate-900/10"
                        >
                            {loading
                                ? "Please wait..."
                                : isLogin
                                ? "Sign In"
                                : "Create Account"}

                            {!loading && (
                                <span className="text-amber-400 text-lg">
                                    →
                                </span>
                            )}
                        </button>

                    </form>

                    {/* SWITCH */}

                    <div className="text-center mt-7 text-xs text-slate-500">

                        {isLogin
                            ? "Don't have an account?"
                            : "Already have an account?"}

                        <button
                            type="button"
                            onClick={() =>
                                switchMode(!isLogin)
                            }
                            className="ml-1.5 font-bold text-amber-600 hover:text-amber-700"
                        >
                            {isLogin
                                ? "Create one"
                                : "Sign in"}
                        </button>

                    </div>

                    <p className="text-center text-[10px] text-slate-400 mt-10">
                        © 2026 BTPControl · Construction
                        Management Platform
                    </p>

                </div>
            </div>
        </div>
    );
}

