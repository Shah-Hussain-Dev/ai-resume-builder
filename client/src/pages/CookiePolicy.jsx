import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft, Cookie, Info, CheckCircle2 } from "lucide-react";
import ThemeToggle from "../components/common/ThemeToggle";

const CookiePolicy = () => {
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20 text-xs font-bold">
              <Cookie className="size-4 text-amber-600" /> Cookie Transparency
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Cookie Policy
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Last Updated: September 5, 2026 • Effective Date: January 1, 2026
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pt-2">
              This Cookie Policy explains how AI Resume Builder uses cookies, local storage, and similar web technologies to recognize you when you visit our web application, keep you signed in securely, and improve your user experience.
            </p>
          </div>

          {/* Sections List */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600">1.</span> What Are Cookies & Local Storage?
              </h2>
              <p>
                Cookies are small text files stored on your browser or device by web applications. Local storage (`localStorage` and `sessionStorage`) allows web apps to remember user preferences and authentication state locally across page refreshes.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600">2.</span> Types of Cookies & Storage We Use
              </h2>
              
              <div className="space-y-4 pt-1">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/10 space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-emerald-500" /> Essential / Authentication Tokens
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    We use secure JSON Web Tokens (JWT) stored in browser storage to authenticate your account session and prevent unauthorized access to your resume dashboard.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/10 space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-blue-500" /> Preference & Appearance Cookies
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    We save your dark mode/light mode theme selection and active builder preferences so your custom setup remains saved when you return.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/10 space-y-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-indigo-500" /> Performance & Analytics
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    We may collect anonymous session telemetry to measure site load performance, error rates, and feature usage to improve application speed.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600">3.</span> How to Control & Clear Cookies
              </h2>
              <p>
                You can manage or disable cookies and local storage through your web browser settings at any time:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data.</li>
                <li><strong>Mozilla Firefox:</strong> Options → Privacy & Security → Cookies and Site Data.</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data.</li>
              </ul>
              <p className="text-xs text-slate-500 italic pt-1">
                Note: Clearing essential cookies will log you out of your active account session.
              </p>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Questions & Assistance</h2>
              <p>
                If you have questions about how we handle cookies or data privacy, please contact:
              </p>
              <p className="font-semibold text-blue-600 dark:text-blue-400">
                cookies@airesumebuilder.com
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

export default CookiePolicy;
