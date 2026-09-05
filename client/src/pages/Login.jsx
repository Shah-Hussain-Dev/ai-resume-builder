import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../config/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";
import ThemeToggle from "../components/common/ThemeToggle";
import {
  Sparkles,
  Mail,
  Lock,
  User,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  Star,
  Zap,
  FileCheck,
  Award,
} from "lucide-react";

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
        toast.success(data.message || "Successfully authenticated!");
        dispatch(login({ user: data.data?.user, token: data.data.token }));
        window.location.href = "/app";
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = error.response?.data?.message || "Something went wrong";
      if (error.response?.status === 409) {
        toast.error("Email already registered. Please sign in instead.");
      } else if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error(errorMsg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const features = [
    { icon: Zap, label: "AI Powered Bullet Point Writer" },
    { icon: FileCheck, label: "100% ATS Friendly PDF Downloads" },
    { icon: Award, label: "6 Professionally Designed Templates" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white flex flex-col justify-between relative overflow-hidden transition-colors duration-300">
      {/* Background Radial Glow Backdrop */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[450px] bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-blue-500/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[350px] bg-blue-700/15 blur-[140px] rounded-full pointer-events-none" />

      {/* Navigation Header */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-white/10 px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="size-4" /> Back to Home
        </Link>
        <ThemeToggle />
      </header>

      {/* Main Grid Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT SIDE: Visual Showcase Panel (Desktop) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center pr-8 space-y-8">
            {/* Brand Title Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-300 text-xs font-semibold w-fit shadow-xs">
              <Sparkles className="size-3.5 text-blue-600 dark:text-blue-400" />
              <span>Next-Gen AI Resume Builder</span>
            </div>

            <div>
              <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-white">
                Land your dream job with <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">AI-optimized</span> resumes.
              </h1>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg">
                Join over 50,000+ professionals who created interview-ready, ATS-compliant resumes in under 5 minutes.
              </p>
            </div>

            {/* Feature Bullet List */}
            <div className="space-y-3.5 pt-2">
              {features.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-medium text-sm">
                  <div className="size-8 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                    <item.icon className="size-4" />
                  </div>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Social Proof Badge Card */}
            <div className="p-5 rounded-2xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-lg max-w-md">
              <div className="flex items-center gap-1 text-amber-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400" />
                ))}
                <span className="ml-2 text-xs font-bold text-slate-800 dark:text-slate-200">4.9 / 5.0</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                “Created my resume in 4 minutes and landed 3 interviews in the first week. The AI bullet writer is game-changing!”
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="size-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">
                  SK
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Sarah K. — Senior Full-Stack Engineer</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Auth Card (Form) */}
          <div className="col-span-1 lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md glass-card rounded-3xl p-7 sm:p-9 border border-slate-200/90 dark:border-blue-500/20 shadow-2xl relative z-10 transition-all duration-300">
              
              {/* Header & Logo */}
              <div className="flex flex-col items-center text-center mb-6">
                <Link to="/" className="flex items-center gap-3 mb-3 group">
                  <div className="size-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 p-0.5 shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
                    <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[13px] flex items-center justify-center">
                      <Sparkles className="size-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </Link>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {state === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {state === "login"
                    ? "Sign in to manage and download your AI resumes"
                    : "Build recruiter-ready resumes in minutes"}
                </p>

                {/* Interactive Segmented Switcher Tabs */}
                <div className="flex p-1 bg-slate-100 dark:bg-slate-950/90 rounded-full border border-slate-200 dark:border-white/10 w-full mt-6 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setState("login")}
                    className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                      state === "login"
                        ? "btn-royal-gradient text-white shadow-md"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setState("register")}
                    className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                      state === "register"
                        ? "btn-royal-gradient text-white shadow-md"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>
              </div>

              {/* Form Input Controls */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {state === "register" && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-blue-600 dark:text-blue-400" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Sarah Jenkins"
                        className="w-full bg-white dark:bg-slate-950/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
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
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-blue-600 dark:text-blue-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="name@example.com"
                      className="w-full bg-white dark:bg-slate-950/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
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
                        className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-blue-600 dark:text-blue-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className="w-full bg-white dark:bg-slate-950/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm pl-10 pr-11 py-3 rounded-xl border border-slate-300 dark:border-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1"
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
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-blue-600 dark:text-blue-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="••••••••"
                        className="w-full bg-white dark:bg-slate-950/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm pl-10 pr-11 py-3 rounded-xl border border-slate-300 dark:border-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1"
                        aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                      >
                        {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-royal-gradient w-full mt-6 py-3.5 rounded-xl font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-[0.99] cursor-pointer"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <div className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      Processing...
                    </span>
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

              {/* Secure Security Badge */}
              <div className="mt-7 pt-5 border-t border-slate-200 dark:border-white/10 text-center flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck className="size-4 text-blue-600 dark:text-blue-400" />
                <span>256-bit Encrypted Candidate Authentication</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer Bar */}
      <footer className="relative z-20 w-full py-4 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-white/5">
        &copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.
      </footer>
    </div>
  );
};

export default Login;


