import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="py-20 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="relative glass-card rounded-3xl p-8 sm:p-16 border border-blue-500/30 text-center overflow-hidden shadow-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/40">
            <Sparkles className="size-3.5 text-amber-500" />
            Ready to Upgrade Your Career?
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Build Your ATS Resume & Start Landing Interviews Today
          </h2>

          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Join 10,000+ candidates who built high-impact resumes and accelerated their job applications with AI.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/app?state=register"
              className="btn-royal-gradient w-full sm:w-auto px-8 py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 group"
            >
              Build My Free Resume Now
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-blue-600 dark:text-blue-400" />
              <span>100% Free Account</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="size-4 text-blue-600 dark:text-blue-400" />
              <span>No Credit Card</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
