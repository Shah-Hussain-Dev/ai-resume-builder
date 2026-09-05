import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft, FileText, CheckCircle2, AlertOctagon } from "lucide-react";
import ThemeToggle from "../components/common/ThemeToggle";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white transition-colors duration-300 flex flex-col">
      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#090D16]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 p-0.5 shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="size-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">AI Resume Builder</span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-200/80 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition"
            >
              <ArrowLeft className="size-3.5" /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="space-y-8">
          
          {/* Hero Banner */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 text-xs font-bold">
              <FileText className="size-4 text-indigo-600" /> Legal Terms
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Last Updated: September 5, 2026 • Effective Date: January 1, 2026
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pt-2">
              Welcome to AI Resume Builder. By accessing or using our services, websites, and application builder, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>
          </div>

          {/* Sections List */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600">1.</span> Acceptance of Terms
              </h2>
              <p>
                By creating an account, building resumes, or utilizing our AI ATS scoring services, you acknowledge that you have read, understood, and agree to adhere to these Terms of Service and our Privacy Policy.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600">2.</span> Account Responsibilities & Security
              </h2>
              <p>When creating an account on AI Resume Builder:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>You must provide accurate, current, and complete registration credentials.</li>
                <li>You are solely responsible for maintaining the confidentiality of your account login details.</li>
                <li>You are responsible for all activities occurring under your account.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600">3.</span> Intellectual Property & Ownership
              </h2>
              <p>
                <strong>Your Content:</strong> You retain 100% full ownership of all resume text, professional history, personal details, and documents you create on our platform.
              </p>
              <p>
                <strong>Platform IP:</strong> All code, design templates, UI layouts, AI prompt workflows, brand assets, and software functionality remain the exclusive property of AI Resume Builder.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600">4.</span> Acceptable Use & Prohibited Conduct
              </h2>
              <p>You agree not to engage in any prohibited actions, including:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Submitting false, deceptive, or fraudulent identity information.</li>
                <li>Attempting to reverse engineer, scrape, or extract source code from the platform.</li>
                <li>Abusing AI endpoints or executing automated spam / denial of service attacks.</li>
                <li>Using the service for illegal or unauthorized purposes.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600">5.</span> Disclaimer of Warranties & Limitation of Liability
              </h2>
              <p>
                The platform and AI tools are provided on an "as is" and "as available" basis. While our AI algorithms and ATS templates aim to maximize resume quality, we do not guarantee job placement, interview calls, or hiring results.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contact Support</h2>
              <p>
                For legal inquiries or questions regarding our Terms of Service, please contact us at:
              </p>
              <p className="font-semibold text-blue-600 dark:text-blue-400">
                terms@airesumebuilder.com
              </p>
            </section>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-white/10 py-6 px-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
      </footer>
    </div>
  );
};

export default TermsOfService;
