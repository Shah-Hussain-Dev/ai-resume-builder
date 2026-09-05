import React, { useState } from 'react';
import { Check, Layout, Sparkles, X, Eye } from 'lucide-react';
import ReusmePreview from './ReusmePreview';

const TemplateSelector = ({ selectedTemplate, onChange, sampleResumeData, accentColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultSampleData = {
    personal_info: {
      full_name: "Alex Morgan",
      profession: "Senior Full Stack Engineer",
      email: "alex.morgan@example.com",
      phone: "+1 (555) 019-2834",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexmorgan",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
    },
    professional_summary:
      "Results-oriented Software Engineer with 6+ years of experience developing high-performance web applications, cloud backends, and responsive UI components.",
    experience: [
      {
        position: "Senior Software Engineer",
        company: "TechFlow Inc",
        start_date: "2022-01",
        end_date: "Present",
        is_current: true,
        description: "• Engineered cloud microservices serving 2M+ daily active users.\n• Accelerated application load speeds by 45%.",
      },
      {
        position: "Full Stack Developer",
        company: "WebCraft Solutions",
        start_date: "2019-06",
        end_date: "2021-12",
        is_current: false,
        description: "• Built responsive web portals using React, Node.js, and PostgreSQL.\n• Reduced database query load times by 30%.",
      },
    ],
    projects: [
      {
        name: "AI Resume Builder Platform",
        description: "Full-stack AI platform enabling instant resume generation and ATS score audit.",
      },
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: "Stanford University",
        graduation_date: "2019-05",
      },
    ],
    skills: ["React.js", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS", "PostgreSQL"],
  };

  const activeData = sampleResumeData && sampleResumeData.personal_info?.full_name ? sampleResumeData : defaultSampleData;

  const templates = [
    {
      id: "classic",
      name: "Classic ATS Standard",
      tag: "ATS Standard",
      description: "Traditional 100% ATS-friendly single column layout favored by Fortune 500 recruiters.",
    },
    {
      id: "executive",
      name: "Executive Leadership",
      tag: "Executive",
      description: "High-impact layout with executive summary & core competencies emphasis.",
    },
    {
      id: "technical",
      name: "Technical Developer",
      tag: "Tech Stack",
      description: "Single-column format optimized for engineering projects & technical skills.",
    },
    {
      id: "modern",
      name: "Modern Header Banner",
      tag: "Modern",
      description: "Clean header banner with structured timeline and modern skills pills.",
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      tag: "Typography",
      description: "Minimalist layout focused on crisp typography & key achievements.",
    },
    {
      id: "minimal-image",
      name: "Minimal Sidebar Image",
      tag: "With Photo",
      description: "Two-column sidebar template with profile picture header.",
    },
  ];

  const currentTpl = templates.find((t) => t.id === selectedTemplate) || templates[0];

  return (
    <>
      {/* Trigger Button Card */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full text-left p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all duration-300 shadow-sm hover:shadow-md group cursor-pointer flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Layout className="size-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Active Layout</span>
            <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {currentTpl.name}
            </span>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-full btn-royal-gradient text-white text-xs font-bold shadow-xs flex items-center gap-1.5 shrink-0">
          <Eye className="size-3.5" /> Browse Templates
        </span>
      </button>

      {/* LARGE GRID PREVIEW MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl max-w-5xl w-full h-[92vh] max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 text-slate-900 dark:text-white">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-950 shrink-0">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 p-0.5 shadow-md flex items-center justify-center text-white">
                  <Layout className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                    Select Resume Template Layout
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    All templates are 100% ATS-friendly, fully customizable, and instant printable
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                title="Close"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Body: 3-Column Template Grid */}
            <div className="flex-1 min-h-0 overflow-y-auto p-6 bg-slate-100 dark:bg-slate-950">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((tpl) => {
                  const isSelected = selectedTemplate === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      onClick={() => {
                        onChange(tpl.id);
                        setIsOpen(false);
                      }}
                      className={`rounded-2xl p-4 border transition-all duration-300 cursor-pointer flex flex-col justify-between relative group ${
                        isSelected
                          ? 'border-blue-600 dark:border-blue-500 bg-white dark:bg-slate-900 shadow-xl ring-2 ring-blue-500/30'
                          : 'border-slate-200/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 hover:border-blue-400 hover:bg-white dark:hover:bg-slate-900 shadow-sm hover:shadow-md'
                      }`}
                    >
                      {/* Scaled Resume Live Preview Container */}
                      <div className="w-full h-[310px] overflow-hidden rounded-xl bg-white border border-slate-200 shadow-inner relative pointer-events-none select-none flex justify-center mb-3.5">
                        <div className="w-[794px] shrink-0 transform scale-[0.32] origin-top center">
                          <ReusmePreview
                            resumeData={activeData}
                            template={tpl.id}
                            accentColor={accentColor || "#2563EB"}
                            hideOuterWrapper={true}
                            showFooter={false}
                            classes="bg-white text-slate-900 p-6"
                          />
                        </div>
                      </div>

                      {/* Card Info */}
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {tpl.name}
                          </h4>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50">
                            {tpl.tag}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                          {tpl.description}
                        </p>
                      </div>

                      {/* Select Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChange(tpl.id);
                          setIsOpen(false);
                        }}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? 'btn-royal-gradient text-white shadow-md'
                            : 'border border-slate-300 dark:border-white/10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="size-4 stroke-[3]" /> Currently Selected
                          </>
                        ) : (
                          <>
                            <Sparkles className="size-3.5" /> Use This Template
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Showing all 6 free templates</span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateSelector;