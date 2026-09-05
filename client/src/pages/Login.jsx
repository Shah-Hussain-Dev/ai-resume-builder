import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../config/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";
import ThemeToggle from "../components/common/ThemeToggle";
import { Sparkles, Mail, Lock, User, ArrowLeft, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [searchParams] = useSearchParams();
  const initialState = searchParams.get("state") === "register" ? "register" : "login";
  const [state, setState] = React.useState(initialState);
  const [submitting, setSubmitting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state === "register" && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      setSubmitting(true);
      const payload =
        state === "register"
          ? { name: formData.name, email: formData.email, password: formData.password }
          : { email: formData.email, password: formData.password };

      const { data } = await API.post(`api/users/${state}`, payload);
      if (data.success && data.data?.token) {
        localStorage.setItem("token", data.data.token);
        toast.success(data.message || "Successfully logged in!");
        dispatch(login({ user: data.data?.user, token: data.data.token }));
        window.location.href = "/app";
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = error.response?.data?.message || "Something went wrong";
      if (error.response?.status === 409) {
        toast.error("Email already registered. Please login instead.");
      } else if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      {/* Background Radial Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-purple-500/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Top Header Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 px-4 py-2 rounded-full transition-all shadow-sm"
        >
          <ArrowLeft className="size-4" /> Back to Home
        </Link>
        <ThemeToggle />
      </div>

      {/* Main Auth Glass Card */}
      <div className="w-full max-w-md glass-card rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-white/10 shadow-2xl relative z-10 my-16">
        {/* Logo Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link to="/" className="flex items-center gap-3 mb-4 group">
            <div className="size-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-violet-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="size-6 text-indigo-400" />
              </div>
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {state === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {state === "login"
              ? "Sign in to access your AI resume dashboard"
              : "Build ATS-ready resumes in minutes"}
          </p>

          {/* Toggle Tabs */}
          <div className="flex p-1 bg-slate-100 dark:bg-slate-950 rounded-full border border-slate-200 dark:border-white/10 w-full mt-6">
            <button
              type="button"
              onClick={() => setState("login")}
              className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all ${
                state === "login"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setState("register")}
              className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all ${
                state === "register"
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {state !== "login" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full bg-white dark:bg-slate-950/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 focus:border-indigo-500 outline-none transition-all"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="w-full bg-white dark:bg-slate-950/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 focus:border-indigo-500 outline-none transition-all"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              {state === "login" && (
                <button
                  type="button"
                  onClick={() => toast.error("Password reset link sent if account exists")}
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full bg-white dark:bg-slate-950/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm pl-10 pr-11 py-3 rounded-xl border border-slate-300 dark:border-white/10 focus:border-indigo-500 outline-none transition-all"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {state === "register" && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="w-full bg-white dark:bg-slate-950/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm pl-10 pr-11 py-3 rounded-xl border border-slate-300 dark:border-white/10 focus:border-indigo-500 outline-none transition-all"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span>Processing...</span>
            ) : state === "login" ? (
              <>
                Sign In to Dashboard <ArrowRight className="size-4" />
              </>
            ) : (
              <>
                Create Free Account <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 text-center flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <ShieldCheck className="size-4 text-indigo-600 dark:text-indigo-400" />
          <span>Encrypted & Secure Candidate Authentication</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

