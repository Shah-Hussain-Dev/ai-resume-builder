import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter, Linkedin } from "lucide-react";
import toast from "react-hot-toast";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    toast.success("Thank you for subscribing to AI Resume updates!");
    setEmail("");
  };

  return (
    <footer className="bg-slate-100 dark:bg-[#060911] text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/10 pt-16 pb-8 px-4 sm:px-8 lg:px-16 text-sm transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-200 dark:border-white/10">
        {/* Brand Info */}
        <div className="lg:col-span-4 space-y-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.jpg" alt="BoltCV AI Logo" className="size-9 rounded-xl object-cover shadow-md shadow-amber-500/20" />
            <span className="font-extrabold text-lg text-slate-900 dark:text-white">BoltCV AI</span>
          </Link>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            Empowering job seekers worldwide to create ATS-optimized, professional resumes powered by AI. Land your next role with confidence.
          </p>

          <div className="flex items-center gap-3 pt-2 text-slate-500 dark:text-slate-400">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:text-blue-600 dark:hover:text-blue-400 transition"
              aria-label="GitHub"
            >
              <Github className="size-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:text-blue-600 dark:hover:text-blue-400 transition"
              aria-label="Twitter"
            >
              <Twitter className="size-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:text-blue-600 dark:hover:text-blue-400 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Product</h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li>
              <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                AI Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                How It Works
              </a>
            </li>
            <li>
              <a href="#templates" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Resume Templates
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Success Stories
              </a>
            </li>
          </ul>
        </div>

        {/* App Links */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Account</h4>
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
            <li>
              <Link to="/app?state=login" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Sign In
              </Link>
            </li>
            <li>
              <Link to="/app?state=register" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Create Free Account
              </Link>
            </li>
            <li>
              <Link to="/app" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Form */}
        <div className="lg:col-span-4 space-y-4">
          <h4 className="font-bold text-slate-900 dark:text-white text-sm">Subscribe to Career Insights</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Get monthly ATS tips, resume hacks, and interview strategies sent directly to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 focus:border-blue-500 outline-none flex-1"
            />
            <button
              type="submit"
              className="btn-royal-gradient px-4 py-2.5 rounded-xl font-bold text-xs shadow-md"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
        <p>© {new Date().getFullYear()} BoltCV AI. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/privacy-policy" className="hover:text-slate-800 dark:hover:text-slate-300 transition">
            Privacy Policy
          </Link>
          <Link to="/terms-of-service" className="hover:text-slate-800 dark:hover:text-slate-300 transition">
            Terms of Service
          </Link>
          <Link to="/cookie-policy" className="hover:text-slate-800 dark:hover:text-slate-300 transition">
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
