import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Is AI Resume Builder free to use?",
      a: "Yes! You can create, edit, and download high-quality ATS-friendly PDF resumes completely free with full access to our AI bullet generator and prebuilt templates."
    },
    {
      q: "How does the ATS keyword scanner and optimization work?",
      a: "Our scanner analyzes your target job description against your resume content. It detects missing technical skills, soft skills, and key terminology required by ATS engines like Workday, Taleo, and Greenhouse, giving you actionable recommendations to reach a 95%+ match score."
    },
    {
      q: "Can I import my existing PDF or Word resume?",
      a: "Absolutely! Our smart PDF parser extracts your existing work experience, education, skills, and summary directly into editable structured fields so you don't have to start from scratch."
    },
    {
      q: "Is my personal data kept secure and private?",
      a: "Yes, 100%. We take security very seriously. Your resume data is encrypted in transit and at rest. We never sell or share your personal contact information with recruiters or third parties."
    },
    {
      q: "Can I export high-resolution vector PDFs without watermarks?",
      a: "Yes! All exported PDFs are clean, high-resolution vector documents with no watermark, ready to submit directly to employers or application portals."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/10 scroll-mt-20 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        <div className="text-center mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-4">
            Everything you need to know about building your ATS resume with AI.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-indigo-500/40 bg-white dark:bg-slate-900/90 shadow-lg"
                    : "border-slate-200 dark:border-white/10"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="size-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`size-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-white/5 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
