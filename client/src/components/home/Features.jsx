import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  ShieldCheck,
  FileCheck,
  Zap,
  Download,
  Layers,
  FileText
} from "lucide-react";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(0);

  const featureList = [
    {
      id: 0,
      icon: Sparkles,
      title: "AI Smart Bullet Generator",
      shortDesc: "Transform basic duty notes into quantified achievement statements.",
      fullDesc:
        "Input your role and responsibilities. Our AI engine generates action-oriented bullet points loaded with metrics, percentages, and business impact.",
      tag: "GPT-4 Powered",
      color: "bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-500/20 dark:border-indigo-500/40 dark:text-indigo-400"
    },
    {
      id: 1,
      icon: ShieldCheck,
      title: "ATS Keyword Optimizer & Checker",
      shortDesc: "Never get filtered out by Taleo, Workday, or Greenhouse.",
      fullDesc:
        "Pass target job descriptions into our scanner to detect missing skills and formatting errors. Get an instant score and 1-click recommendations.",
      tag: "Realtime Score",
      color: "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-500/20 dark:border-purple-500/40 dark:text-purple-400"
    },
    {
      id: 2,
      icon: Download,
      title: "1-Click PDF Resume Export",
      shortDesc: "Download high-resolution, pixel-perfect PDFs ready for applications.",
      fullDesc:
        "Generates clean ATS-standard PDF files formatted with exact margin spacing, embedded vectors, and no page-break bugs.",
      tag: "Vector PDF",
      color: "bg-violet-50 text-violet-600 border-violet-200 dark:bg-violet-500/20 dark:border-violet-500/40 dark:text-violet-400"
    },
    {
      id: 3,
      icon: FileText,
      title: "Matching AI Cover Letter Writer",
      shortDesc: "Generate targeted cover letters tailored to each job application.",
      fullDesc:
        "Create personalized, persuasive cover letters that complement your resume experience and align with company values in 30 seconds.",
      tag: "Tailored Copy",
      color: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/20 dark:border-amber-500/40 dark:text-amber-400"
    },
    {
      id: 4,
      icon: FileCheck,
      title: "PDF & DOCX Resume Parser",
      shortDesc: "Import existing resumes without retyping your work history.",
      fullDesc:
        "Upload your old PDF or Word document. Our parser extracts dates, titles, descriptions, and education into editable fields seamlessly.",
      tag: "Smart Extraction",
      color: "bg-cyan-50 text-cyan-600 border-cyan-200 dark:bg-cyan-500/20 dark:border-cyan-500/40 dark:text-cyan-400"
    },
    {
      id: 5,
      icon: Layers,
      title: "Pro Designer Templates & Layouts",
      shortDesc: "Switch between modern, executive, and minimal ATS templates.",
      fullDesc:
        "Choose from recruiter-approved template layouts designed to highlight your seniority and key qualifications effortlessly.",
      tag: "Multi-Layout",
      color: "bg-teal-50 text-teal-600 border-teal-200 dark:bg-teal-500/20 dark:border-teal-500/40 dark:text-teal-400"
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white relative scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
            Engineered for Job Search Success
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Powerful AI Features Built to Get You Hired
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-4">
            Everything you need to create ATS-compliant, recruiter-approved resumes in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureList.map((feat) => {
            const Icon = feat.icon;
            const isSelected = activeFeature === feat.id;
            return (
              <div
                key={feat.id}
                onClick={() => setActiveFeature(feat.id)}
                className={`p-6 sm:p-8 rounded-3xl glass-card glass-card-hover border cursor-pointer relative overflow-hidden transition-all duration-300 ${
                  isSelected
                    ? "border-indigo-500/50 bg-white dark:bg-slate-900/90 shadow-xl"
                    : "border-slate-200 dark:border-white/10"
                }`}
              >
                <div className={`size-12 rounded-2xl ${feat.color} flex items-center justify-center mb-6 border`}>
                  <Icon className="size-6" />
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                    {feat.title}
                  </h3>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    {feat.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mb-3">
                  {feat.shortDesc}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-3 border-t border-slate-200 dark:border-white/10">
                  {feat.fullDesc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
