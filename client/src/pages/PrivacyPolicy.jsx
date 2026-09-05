import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react";
import ThemeToggle from "../components/common/ThemeToggle";

const PrivacyPolicy = () => {
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 text-xs font-bold">
              <Shield className="size-4 text-blue-600" /> Privacy & Data Protection
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Last Updated: September 5, 2026 • Effective Date: January 1, 2026
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed pt-2">
              At AI Resume Builder, we are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, store, and protect your data when you use our website, mobile interface, and AI-powered resume enhancement tools.
            </p>
          </div>

          {/* Sections List */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-white/10 shadow-sm space-y-8 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            
            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600">1.</span> Information We Collect
              </h2>
              <p>We collect information that you voluntarily provide to us when registering for an account or using our resume builder platform:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li><strong>Account Credentials:</strong> Full name, email address, password hash, and account preferences.</li>
                <li><strong>Resume Data:</strong> Professional experience, education history, skills, contact details, profile photo, and project descriptions.</li>
                <li><strong>AI Prompt Inputs:</strong> Job descriptions, target job titles, and text provided for ATS scoring or content enhancement.</li>
                <li><strong>Technical & Device Data:</strong> IP address, browser type, operating system, and session timestamps.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600">2.</span> How We Use Your Information
              </h2>
              <p>We process your data strictly to deliver and improve our AI Resume Builder services:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>To generate, format, edit, and store your ATS-friendly resume documents.</li>
                <li>To process AI enhancement requests and calculate ATS match scores using Google Gemini AI.</li>
                <li>To authenticate user logins and maintain secure session tokens.</li>
                <li>To optimize site performance and troubleshoot technical issues.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600">3.</span> AI Data Processing & Google Gemini AI
              </h2>
              <p>
                Our AI content features utilize Google Gemini AI API endpoints. When you request summary enhancements or ATS score generation:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Your submitted resume text and job descriptions are transmitted via encrypted HTTPS channels to the Gemini API.</li>
                <li>Inputs are processed ephemerally solely to return real-time structured JSON scoring and text improvements.</li>
                <li>Your private resume data is <strong>never used to train public AI models</strong>.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600">4.</span> Data Security & Retention
              </h2>
              <p>
                We implement industry-standard security measures including SSL/TLS encryption for data in transit and secure hashed storage for passwords. Your resume data is stored securely in dedicated MongoDB databases.
              </p>
              <p>
                You retain full control over your stored resumes and can edit or permanently delete them at any time from your Dashboard.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="text-blue-600">5.</span> Your Privacy Rights
              </h2>
              <p>Depending on your location, you have the right to:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Access, download, or request a copy of your personal data.</li>
                <li>Request correction of inaccurate or incomplete information.</li>
                <li>Request permanent deletion of your account and all associated resumes.</li>
                <li>Opt out of non-essential marketing communications.</li>
              </ul>
            </section>

            <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contact Privacy Team</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to our privacy compliance team at:
              </p>
              <p className="font-semibold text-blue-600 dark:text-blue-400">
                privacy@airesumebuilder.com
              </p>
            </section>

          </div>

        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-200 dark:border-white/10 py-6 px-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
