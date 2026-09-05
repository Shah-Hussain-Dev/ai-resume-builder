import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/features/authSlice";
import ThemeToggle from "../common/ThemeToggle";
import { Sparkles, LogOut, Home } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#090D16]/90 backdrop-blur-xl border-b border-slate-200 dark:border-blue-500/15 px-4 sm:px-8 py-3.5 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/app" className="flex items-center gap-3 group">
          <img
            src="/logo.jpg"
            alt="BoltCV AI Logo"
            className="size-9 rounded-xl object-cover shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              BoltCV <span className="text-amber-500 text-xs px-1.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">AI</span>
            </span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono tracking-widest uppercase -mt-0.5 font-semibold">
              Instant Builder
            </span>
          </div>
        </Link>

        {/* User Badge & Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition"
          >
            <Home className="size-3.5" />  Home
          </Link>

          {/* User Info Badge */}
          <div className="flex items-center gap-2.5 bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-full">
            <div className="size-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-blue-600/30">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[120px] truncate">
              {user?.name || "User"}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 hover:bg-rose-600 hover:text-white transition-all shadow-sm"
          >
            <LogOut className="size-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
