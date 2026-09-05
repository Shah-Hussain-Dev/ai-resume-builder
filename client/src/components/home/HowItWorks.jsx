import React, { useState } from "react";
import { Upload, Sparkles, Target, Download, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 0,
      icon: Upload,
      title: "1. Upload Existing Resume or Start Fresh",
      subtitle: "Import your current PDF resume or enter your details in guided fields.",
      description: "Our intelligent parser automatically extracts your work history, education, skills, and projects in seconds with 99% accuracy.",
      badge: "Instant Parser",
      demoPreview: (
        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-white/10 text-xs space-y-3">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 pb-3">
            <span className="font-semibold text-slate-900 dark:text-white">Import Resume.pdf</span>
            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1"><CheckCircle2 className="size-3.5"/> Upload Complete</span>
          </div>
          <div className="bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-white/5 space-y-2">
            <div className="h-2.5 w-1/3 bg-indigo-500/30 rounded animate-pulse"/>
            <div className="h-2 w-2/3 bg-slate-300 dark:bg-slate-800 rounded"/>
            <div className="h-2 w-1/2 bg-slate-300 dark:bg-slate-800 rounded"/>
          </div>
        </div>
      )
    },
    {
      id: 1,
      icon: Sparkles,
      title: "2. Generate AI Quantified Bullet Points",
      subtitle: "Turn basic job duties into high-impact metric-backed achievement statements.",
      description: "Click 'Generate AI Bullet' to turn 'Managed sales team' into 'Spearheaded 12-person enterprise sales team generating $4.2M in annual recurring revenue (+38% YoY)'.",
      badge: "GPT-4 Powered",
      demoPreview: (
        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-purple-500/30 text-xs space-y-3">
          <div className="text-purple-600 dark:text-purple-400 font-semibold flex items-center gap-1.5">
            <Sparkles className="size-4" /> Before & After AI Optimization
          </div>
          <div className="p-3 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/20 rounded-xl text-slate-500 line-through">
            "Responsible for building front-end user interfaces."
          </div>
          <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/40 rounded-xl text-purple-900 dark:text-purple-200 font-medium">
            "Architected 14+ responsive React components reducing page load time by 340ms and elevating web accessibility score to 100%."
          </div>
        </div>
      )
    },
    {
      id: 2,
      icon: Target,
      title: "3. Align Keywords with Target Job Description",
      subtitle: "Paste the job posting URL or text to run instant ATS match checks.",
      description: "Our ATS scanner analyzes required skills, certifications, and key terminology, highlighting missing keywords to ensure your resume bypasses automated filters.",
      badge: "Real-Time Scan",
      demoPreview: (
        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-white/10 text-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-900 dark:text-white">ATS Keyword Scanner</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/30">98% Match</span>
          </div>
          <div className="flex flex-wrap gap-1.5 pt-2">
            <span className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-500/30">React.js ✓</span>
            <span className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-500/30">TypeScript ✓</span>
            <span className="bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-500/30">GraphQL ✓</span>
            <span className="bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-md border border-amber-200 dark:border-amber-500/30">AWS Lambda (Added +4%)</span>
          </div>
        </div>
      )
    },
    {
      id: 3,
      icon: Download,
      title: "4. One-Click Pixel-Perfect PDF Export",
      subtitle: "Download high-resolution ATS compliant PDFs ready to send to recruiters.",
      description: "Export clean, standard single or multi-page resumes formatted with proper margins, typography, and structure that recruiters and applicant tracking systems love.",
      badge: "Clean Export",
      demoPreview: (
        <div className="bg-slate-100 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-white/10 text-xs flex flex-col items-center justify-center text-center space-y-3">
          <div className="size-12 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30">
            <Download className="size-6" />
          </div>
          <p className="font-bold text-slate-900 dark:text-white text-sm">Resume_Alex_Morgan.pdf</p>
          <span className="text-slate-500 dark:text-slate-400 text-[11px]">Ready for Workday, Greenhouse & Taleo</span>
          <Link
            to="/app?state=register"
            className="mt-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition"
          >
            Export Your Resume Free
          </Link>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white relative scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            How AI Resume Builder Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-4">
            From raw experience to an interview-ready resume in under 5 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "glass-card border-indigo-500/50 bg-indigo-50/50 dark:bg-indigo-950/20 shadow-lg"
                      : "bg-white dark:bg-slate-900/50 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl transition-colors ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <Icon className="size-6" />
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-bold text-base sm:text-lg ${isActive ? "text-slate-900 dark:text-white" : "text-slate-700 dark:text-slate-300"}`}>
                          {step.title}
                        </h3>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-white/5">
                          {step.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {step.subtitle}
                      </p>
                      {isActive && (
                        <p className="text-xs text-slate-700 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-white/10 mt-2 leading-relaxed animate-in fade-in">
                          {step.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-6">
            <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-red-500/80" />
                  <div className="size-3 rounded-full bg-amber-500/80" />
                  <div className="size-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  Step {activeStep + 1} Preview Stage
                </span>
              </div>

              <div className="min-h-[280px] flex items-center justify-center">
                {steps[activeStep].demoPreview}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
