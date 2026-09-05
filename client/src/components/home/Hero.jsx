import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ReusmePreview from "../resume/ReusmePreview";
import ThemeToggle from "../common/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Star,
  Bot,
  ShieldCheck,
  Eye,
  Edit3,
  Menu,
  X,
  Palette,
  Layout
} from "lucide-react";

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { theme } = useTheme();

  const [activeTemplate, setActiveTemplate] = useState("modern");
  const [accentColor, setAccentColor] = useState("#6366F1");
  const [isEditing, setIsEditing] = useState(false);

  const [demoData, setDemoData] = useState({
    personal_info: {
      full_name: "Alex Morgan",
      profession: "Senior Full Stack Engineer",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 019-2834",
      location: "San Francisco, CA",
      linkedin: "https://linkedin.com/in/alexmorgan",
      website: "https://alexmorgan.dev",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    },
    professional_summary:
      "Results-driven Senior Full Stack Engineer with 6+ years of experience building high-throughput microservices, cloud applications, and AI integrations. Reduced API latency by 45% and led cross-functional teams to launch 12+ enterprise features.",
    experience: [
      {
        position: "Senior Full Stack Engineer",
        company: "TechFlow Solutions",
        start_date: "2022-01",
        end_date: "Present",
        is_current: true,
        description:
          "• Architected microservices handling 2M+ daily requests with 99.99% SLA.\n• Led cross-functional team of 6 engineers to launch AI recommendation pipeline (+32% retention).",
      },
      {
        position: "Frontend Engineer",
        company: "Apex Digital Labs",
        start_date: "2019-06",
        end_date: "2021-12",
        is_current: false,
        description:
          "• Developed responsive web applications visited by 500k+ monthly users.\n• Optimized Core Web Vitals, decreasing bundle size by 40%.",
      },
    ],
    project: [
      {
        name: "AI Resume & ATS Keyword Optimizer",
        description:
          "Full-stack web application leveraging GPT-4 for automated bullet point optimization and real-time keyword matching.",
      },
    ],
    education: [
      {
        degree: "B.S. in Computer Science",
        field: "Software Engineering",
        institution: "Stanford University",
        graduation_date: "2019-05",
        gpa: "3.9",
      },
    ],
    skills: ["React.js", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS", "AWS Lambda", "MongoDB", "Python"],
    atsScore: 98,
  });

  const templates = [
    { id: "modern", name: "Modern Template" },
    { id: "classic", name: "Classic Template" },
    { id: "minimal", name: "Minimal Template" },
    { id: "minimal-image", name: "Minimal Image Template" },
  ];

  const colors = [
    { name: "Electric Indigo", value: "#6366F1" },
    { name: "Cyber Violet", value: "#8B5CF6" },
    { name: "Royal Blue", value: "#3B82F6" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Rose", value: "#F43F5E" },
    { name: "Slate Dark", value: "#334155" },
  ];

  const handlePersonalField = (field, val) => {
    setDemoData((prev) => ({
      ...prev,
      personal_info: {
        ...prev.personal_info,
        [field]: val,
      },
    }));
  };

  const logos = ["Google", "Microsoft", "Meta", "Amazon", "Netflix", "Spotify", "Apple"];

  return (
    <div className="relative overflow-hidden bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-80 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[160px] rounded-full pointer-events-none" />

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#090D16]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-4 sm:px-8 lg:px-16 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-violet-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="size-5 text-indigo-400" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-indigo-700 via-purple-600 to-violet-600 dark:from-white dark:via-slate-200 dark:to-indigo-400 bg-clip-text text-transparent">
                AI Resume
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono tracking-widest uppercase -mt-1 font-semibold">
                Builder Pro
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700 dark:text-slate-300">
            <a href="#demo-section" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Templates Demo
            </a>
            <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              How It Works
            </a>
            <a href="#templates" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Gallery
            </a>
            <a href="#testimonials" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              Reviews
            </a>
            <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              FAQ
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <Link
                to="/app"
                className="px-5 py-2.5 rounded-full text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-all shadow-md shadow-indigo-500/20 active:scale-95 flex items-center gap-2"
              >
                Go to Dashboard <ArrowRight className="size-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/app?state=login"
                  className="px-5 py-2.5 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-white/10 transition-all"
                >
                  Log in
                </Link>
                <Link
                  to="/app?state=register"
                  className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition-all shadow-lg shadow-indigo-500/25 active:scale-95 flex items-center gap-1.5"
                >
                  Get Started Free <ArrowRight className="size-4" />
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-2xl flex flex-col p-6 md:hidden text-white">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Sparkles className="size-6 text-indigo-400" />
              <span className="font-bold text-lg text-white">AI Resume Builder</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 rounded-full bg-slate-800 text-slate-400"
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="flex flex-col gap-6 text-lg font-medium text-slate-200 mt-8">
            <a href="#demo-section" onClick={() => setMenuOpen(false)} className="hover:text-indigo-400">
              Live Template Demo
            </a>
            <a href="#features" onClick={() => setMenuOpen(false)} className="hover:text-indigo-400">
              Features
            </a>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="hover:text-indigo-400">
              How It Works
            </a>
            <a href="#templates" onClick={() => setMenuOpen(false)} className="hover:text-indigo-400">
              Templates
            </a>
            <a href="#testimonials" onClick={() => setMenuOpen(false)} className="hover:text-indigo-400">
              Testimonials
            </a>
            <a href="#faq" onClick={() => setMenuOpen(false)} className="hover:text-indigo-400">
              FAQ
            </a>
          </div>

          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-white/10">
            {user ? (
              <Link
                to="/app"
                onClick={() => setMenuOpen(false)}
                className="w-full py-3 rounded-full text-center font-semibold bg-indigo-600 text-white"
              >
                Open Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/app?state=register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3 rounded-full text-center font-semibold bg-indigo-600 text-white"
                >
                  Create Free Account
                </Link>
                <Link
                  to="/app?state=login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full py-3 rounded-full text-center font-medium bg-slate-800 text-white border border-white/10"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      {/* Main Hero Header */}
      <section className="pt-12 sm:pt-20 pb-16 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/30 text-xs sm:text-sm text-indigo-700 dark:text-indigo-300 mb-8 backdrop-blur-md">
          <div className="flex -space-x-2">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="User"
              className="size-6 rounded-full border border-white dark:border-slate-900 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              alt="User"
              className="size-6 rounded-full border border-white dark:border-slate-900 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
              alt="User"
              className="size-6 rounded-full border border-white dark:border-slate-900 object-cover"
            />
          </div>
          <div className="flex items-center gap-1">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3.5 fill-amber-500" />
              ))}
            </div>
            <span className="font-semibold text-slate-900 dark:text-white ml-1">4.9/5 Rating</span>
          </div>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-600 dark:text-slate-300 font-medium hidden sm:inline">
            Used by 10,000+ Candidates
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl text-balance leading-[1.15]">
          Craft ATS-Ready Resumes That <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
            Land Interviews 10x Faster
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed text-balance">
          Choose from professional dashboard templates. Enhance bullet points with AI, optimize keywords, and download ATS-compliant PDFs instantly.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            to="/app?state=register"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition-all shadow-xl shadow-indigo-500/25 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
          >
            Create Resume Free
            <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#demo-section"
            className="w-full sm:w-auto px-7 py-4 rounded-full text-base font-semibold bg-white dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 hover:border-indigo-500/40 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Play className="size-4 text-indigo-600 dark:text-indigo-400 fill-indigo-600/20" />
            Try Live Dashboard Templates
          </a>
        </div>
      </section>

      {/* Real Dashboard Prebuilt Templates Live Showcase Demo */}
      <section id="demo-section" className="px-4 sm:px-8 max-w-6xl mx-auto pb-24 scroll-mt-24">
        <div className="relative glass-card rounded-3xl p-4 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl">
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

          {/* Playground Controls Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <Layout className="size-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                  Dashboard Prebuilt Template Showcase
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Switch between prebuilt dashboard templates and custom accent colors live!
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 gap-1 overflow-x-auto w-full sm:w-auto">
                {templates.map((tpl) => (
                  <button
                    key={tpl.id}
                    onClick={() => setActiveTemplate(tpl.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      activeTemplate === tpl.id
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {tpl.name}
                  </button>
                ))}
              </div>

              {/* Accent Color picker */}
              <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10">
                <Palette className="size-3.5 text-slate-500 dark:text-slate-400 ml-1" />
                {colors.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => setAccentColor(c.value)}
                    title={c.name}
                    className={`size-5 rounded-full transition-transform ${
                      accentColor === c.value ? "scale-125 ring-2 ring-indigo-500" : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>

              {/* Edit Toggle */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
                  isEditing
                    ? "bg-indigo-50 text-indigo-700 border-indigo-300 dark:bg-indigo-950/60 dark:border-indigo-500/40 dark:text-indigo-300"
                    : "bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300"
                }`}
              >
                {isEditing ? (
                  <>
                    <Eye className="size-3.5" /> Close Editor
                  </>
                ) : (
                  <>
                    <Edit3 className="size-3.5" /> Edit Personal Info
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Playground Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6">
            {isEditing && (
              <div className="lg:col-span-4 bg-slate-100 dark:bg-slate-950/90 p-4 rounded-2xl border border-slate-200 dark:border-indigo-500/30 space-y-4 text-xs animate-in fade-in">
                <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 font-semibold border-b border-slate-200 dark:border-white/10 pb-2">
                  <span>Live Field Editor</span>
                  <span className="text-[10px] bg-indigo-100 dark:bg-indigo-950 px-2 py-0.5 rounded text-indigo-700 dark:text-indigo-300">
                    Live Sync
                  </span>
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={demoData.personal_info.full_name}
                    onChange={(e) => handlePersonalField("full_name", e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg px-3 py-2 border border-slate-300 dark:border-white/10 focus:border-indigo-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Profession / Position</label>
                  <input
                    type="text"
                    value={demoData.personal_info.profession}
                    onChange={(e) => handlePersonalField("profession", e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg px-3 py-2 border border-slate-300 dark:border-white/10 focus:border-indigo-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Email ID</label>
                  <input
                    type="text"
                    value={demoData.personal_info.email}
                    onChange={(e) => handlePersonalField("email", e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg px-3 py-2 border border-slate-300 dark:border-white/10 focus:border-indigo-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-400 mb-1">Summary</label>
                  <textarea
                    rows={3}
                    value={demoData.professional_summary}
                    onChange={(e) =>
                      setDemoData((prev) => ({ ...prev, professional_summary: e.target.value }))
                    }
                    className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg px-3 py-2 border border-slate-300 dark:border-white/10 focus:border-indigo-500 outline-none text-xs leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* Dashboard ReusmePreview Component Rendered Directly */}
            <div
              className={`${
                isEditing ? "lg:col-span-8" : "lg:col-span-12"
              } bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200 transition-all max-h-[700px] overflow-y-auto`}
            >
              <div className="bg-slate-100 dark:bg-slate-900 p-2 text-slate-600 dark:text-slate-400 text-xs border-b border-slate-200 dark:border-slate-800 flex items-center justify-between font-mono">
                <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-bold">
                  <ShieldCheck className="size-4" /> Live Dashboard Template Engine: {activeTemplate}
                </span>
                <span className="text-[11px] text-slate-500">Accent: {accentColor}</span>
              </div>

              <ReusmePreview
                resumeData={demoData}
                template={activeTemplate}
                accentColor={accentColor}
                classes="bg-white text-slate-800"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Company Logos */}
      <div className="border-y border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-slate-950/60 py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6">
            Candidates Landed Offers At Top Tech & Enterprise Leaders
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 hover:opacity-100 transition-opacity">
            {logos.map((logo, index) => (
              <span
                key={index}
                className="text-lg sm:text-xl font-extrabold tracking-wider text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
