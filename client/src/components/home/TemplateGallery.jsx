import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ReusmePreview from "../resume/ReusmePreview";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Eye, X } from "lucide-react";

export default function TemplateGallery() {
  const [activeDotIndex, setActiveDotIndex] = useState(0);
  const [previewModalTemplate, setPreviewModalTemplate] = useState(null);
  const marqueeRef = useRef(null);

  const templateCards = [
    {
      id: "executive-template",
      templateId: "executive",
      name: "Marcus Vance",
      role: "Executive Leadership Layout",
      color: "#1E3A8A",
      frameBg: "bg-[#EAEFF8] dark:bg-[#131B2B] border-[#D0DDF4] dark:border-blue-950/40",
      sampleData: {
        personal_info: {
          full_name: "Marcus Vance",
          profession: "VP of Engineering & Strategy",
          email: "marcus@example.com",
          phone: "(555) 019-2834",
          location: "San Francisco, CA",
          linkedin: "https://linkedin.com/in/marcusvance",
        },
        professional_summary:
          "Visionary Technology Executive with 12+ years of experience leading multi-disciplinary engineering organizations, scaling cloud infrastructure, and driving product roadmaps.",
        experience: [
          {
            position: "VP of Engineering",
            company: "Apex Cloud Systems, San Francisco, CA",
            start_date: "2021-04",
            end_date: "Present",
            is_current: true,
            description:
              "• Managed 80+ software engineers across 6 globally distributed product teams.\n• Spearheaded cloud migration cutting operating costs by $2.3M annually.",
          },
        ],
        education: [
          {
            degree: "M.S. Computer Science",
            institution: "UC Berkeley",
            graduation_date: "2013-05",
          },
        ],
        skills: ["Executive Leadership", "Cloud Architecture", "Product Strategy", "P&L Management", "Team Scaling"],
      },
    },
    {
      id: "technical-template",
      templateId: "technical",
      name: "David Chen",
      role: "Technical Developer Layout",
      color: "#2563EB",
      frameBg: "bg-[#E6F0FA] dark:bg-[#121E2C] border-[#CDE1F7] dark:border-sky-950/40",
      sampleData: {
        personal_info: {
          full_name: "David Chen",
          profession: "Lead Software Architect",
          email: "david.chen@example.com",
          phone: "(555) 892-1049",
          location: "Seattle, WA",
          website: "https://davidchen.dev",
        },
        professional_summary:
          "Full Stack Architect specialized in microservices, distributed systems, high-concurrency Node.js / React platforms, and cloud DevOps.",
        experience: [
          {
            position: "Lead Software Architect",
            company: "CloudScale Tech, Seattle, WA",
            start_date: "2020-08",
            end_date: "Present",
            is_current: true,
            description:
              "• Designed event-driven messaging pipelines processing 10M+ events daily.\n• Reduced API latency from 450ms to 65ms using Redis caching.",
          },
        ],
        education: [
          {
            degree: "B.S. Software Engineering",
            institution: "University of Washington",
            graduation_date: "2017-05",
          },
        ],
        skills: ["TypeScript", "Node.js", "React.js", "Docker", "Kubernetes", "GraphQL", "AWS"],
      },
    },
    {
      id: "classic-template",
      templateId: "classic",
      name: "Casey Clark",
      role: "Classic ATS Standard Layout",
      color: "#003366",
      frameBg: "bg-[#F3ECE6] dark:bg-[#1C1714] border-[#E5DAD0] dark:border-amber-950/40",
      sampleData: {
        personal_info: {
          full_name: "Casey Clark",
          profession: "Hospitality & Operations Lead",
          email: "casey@example.com",
          phone: "(123) 456-7890",
          location: "Philadelphia, PA",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
        },
        professional_summary:
          "A results-driven bartender with five years of experience specializing in bar strategy, operations management, and guest relations.",
        experience: [
          {
            position: "Head Bartender",
            company: "Triangle Spirits, Philadelphia, PA",
            start_date: "2020-12",
            end_date: "Present",
            is_current: true,
            description:
              "• Designed high-margin holiday cocktail menu.\n• Delivered service to 250+ guests daily.\n• Managed inventory and schedules.",
          },
        ],
        education: [
          {
            degree: "Associate of Science in Hospitality",
            institution: "University of Nevada",
            graduation_date: "2017-05",
          },
        ],
        skills: ["Bar operations", "Mixology", "Event relations", "Team leadership"],
      },
    },
    {
      id: "minimal-image-template",
      templateId: "minimal-image",
      name: "Drew Miller",
      role: "Minimal Sidebar Image Layout",
      color: "#4E7828",
      frameBg: "bg-[#E3EBE1] dark:bg-[#141C15] border-[#CEE0CB] dark:border-emerald-950/40",
      sampleData: {
        personal_info: {
          full_name: "Drew Miller",
          profession: "Senior Account Executive",
          email: "drew@example.com",
          phone: "(555) 019-7890",
          location: "Philadelphia, PA",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
        },
        professional_summary:
          "Sales executive with 7+ years of experience in enterprise software, specializing in B2B SaaS growth and client retention.",
        experience: [
          {
            position: "Account Executive",
            company: "Mobility Corp",
            start_date: "2021-01",
            end_date: "Present",
            is_current: true,
            description:
              "• Closed $1.4M ARR in new business in FY23.\n• Spearheaded key account strategies and high-conversion client demos.",
          },
        ],
        education: [
          {
            degree: "B.S. Business Administration",
            institution: "Penn State University",
            graduation_date: "2019-05",
          },
        ],
        skills: ["B2B SaaS Sales", "Account Management", "CRM & Salesforce"],
      },
    },
    {
      id: "modern-template",
      templateId: "modern",
      name: "Alex Morgan",
      role: "Modern Header Banner Layout",
      color: "#6366F1",
      frameBg: "bg-[#EEE7F7] dark:bg-[#1D1426] border-[#D9CAF1] dark:border-purple-950/40",
      sampleData: {
        personal_info: {
          full_name: "Alex Morgan",
          profession: "Senior Software Engineer",
          email: "alex.morgan@example.com",
          phone: "+1 (555) 019-2834",
          location: "San Francisco, CA",
          linkedin: "https://linkedin.com/in/alexmorgan",
        },
        professional_summary:
          "Results-oriented Software Engineer with 6+ years of experience developing high-performance web applications and cloud architecture.",
        experience: [
          {
            position: "Senior Full Stack Engineer",
            company: "TechFlow Inc",
            start_date: "2022-01",
            end_date: "Present",
            is_current: true,
            description:
              "• Engineered cloud microservices serving 2M+ daily active users.\n• Accelerated application load speeds by 45%.",
          },
        ],
        education: [
          {
            degree: "B.S. Computer Science",
            institution: "Stanford University",
            graduation_date: "2019-05",
          },
        ],
        skills: ["React.js", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS"],
      },
    },
    {
      id: "minimal-template",
      templateId: "minimal",
      name: "Sarah Jenkins",
      role: "Minimal Clean Typography Layout",
      color: "#DB2777",
      frameBg: "bg-[#F7E7EE] dark:bg-[#24141E] border-[#EFCAD8] dark:border-pink-950/40",
      sampleData: {
        personal_info: {
          full_name: "Sarah Jenkins",
          profession: "Lead UX/UI Designer",
          email: "sarah@example.com",
          phone: "(555) 321-9876",
          location: "Austin, TX",
        },
        professional_summary:
          "Creative Lead with 8+ years designing intuitive digital products, design systems, and mobile applications.",
        experience: [
          {
            position: "Staff UI/UX Designer",
            company: "PixelCraft Studio",
            start_date: "2021-03",
            end_date: "Present",
            is_current: true,
            description:
              "• Redesigned checkout workflow boosting conversion by 28%.\n• Built design system used across 12 product teams.",
          },
        ],
        education: [
          {
            degree: "B.F.A. Interactive Design",
            institution: "UT Austin",
            graduation_date: "2016-05",
          },
        ],
        skills: ["Figma", "User Research", "Design Systems", "Prototyping"],
      },
    },
  ];

  // Duplicated list for infinite seamless marquee loop
  const marqueeTemplates = [...templateCards, ...templateCards];

  const handleScroll = (direction) => {
    if (!marqueeRef.current) return;
    const scrollAmount = direction === "left" ? -350 : 350;
    marqueeRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleDotClick = (index) => {
    setActiveDotIndex(index);
    if (!marqueeRef.current) return;
    const cardWidth = 350;
    marqueeRef.current.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  };

  return (
    <section
      id="templates"
      className="relative py-24 bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white border-t border-slate-200 dark:border-white/10 scroll-mt-20 overflow-hidden transition-colors"
    >
      {/* Soft Ambient Radial Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-6xl h-[420px] bg-gradient-to-r from-rose-300/35 via-pink-300/30 to-purple-200/35 dark:from-pink-900/15 dark:via-rose-950/20 dark:to-purple-950/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-tight">
            Pick From Our {templateCards.length} Free Resume Templates and Build Your Resume in Minutes
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-4 max-w-2xl mx-auto">
            Choose from our {templateCards.length} professionally designed, ATS-friendly resume templates. Customize layout, colors, and content in seconds.
          </p>
        </div>

        {/* Continuous Auto Scroll Marquee Showcase */}
        <div className="relative group w-full">
          {/* Edge Blur Overlays for Smooth Marquee Fading */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 dark:from-[#090D16] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 dark:from-[#090D16] to-transparent z-20 pointer-events-none" />

          {/* Marquee Track Container */}
          <div
            ref={marqueeRef}
            className="flex gap-6 overflow-x-auto no-scrollbar py-6 px-4 scroll-smooth marquee-container"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-6 shrink-0 marquee-inner">
              {marqueeTemplates.map((tpl, idx) => (
                <div
                  key={`${tpl.id}-${idx}`}
                  className={`w-[310px] sm:w-[350px] shrink-0 rounded-3xl p-4 sm:p-5 border transition-all duration-500 shadow-lg hover:shadow-2xl relative group/card flex flex-col justify-between ${tpl.frameBg}`}
                >
                  {/* Inner Full Page Resume Preview Box (Proportioned Scale so entire template is visible) */}
                  <div className="w-full h-[440px] sm:h-[480px] overflow-hidden rounded-2xl bg-white shadow-md relative pointer-events-none select-none border border-slate-200/80 flex justify-center">
                    <div className="w-[794px] transform scale-[0.40] sm:scale-[0.43] origin-top-left">
                      <ReusmePreview
                        resumeData={tpl.sampleData}
                        template={tpl.templateId}
                        accentColor={tpl.color}
                        classes="bg-white text-slate-900 shadow-none border-none p-6"
                      />
                    </div>
                  </div>

                  {/* Card Header Label below preview inside frame */}
                  <div className="mt-3.5 flex items-center justify-between px-1">
                    <div>
                      <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">{tpl.name}</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{tpl.role}</p>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/80 dark:bg-black/40 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                      ATS Ready
                    </span>
                  </div>

                  {/* Hover Overlay with Preview and Use This Template Buttons */}
                  <div className="absolute inset-0 rounded-3xl bg-slate-950/50 backdrop-blur-[3px] opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-6 z-30">
                    <button
                      onClick={() => setPreviewModalTemplate(tpl)}
                      className="w-full max-w-[200px] py-2.5 px-4 rounded-full bg-white hover:bg-slate-100 active:scale-95 text-slate-900 font-bold text-xs shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform translate-y-2 group-hover/card:translate-y-0"
                    >
                      <Eye className="size-4 text-indigo-600" />
                      Preview Template
                    </button>
                    <Link
                      to={`/app?state=register&template=${tpl.templateId}`}
                      className="w-full max-w-[200px] py-2.5 px-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white font-bold text-xs shadow-xl shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2 transform translate-y-2 group-hover/card:translate-y-0"
                    >
                      <Sparkles className="size-4 text-orange-100" />
                      Use This Template
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Pagination & Manual Navigation Controls */}
        <div className="flex flex-col items-center gap-8 mt-8">
          {/* Arrow & Dot Indicators */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handleScroll("left")}
              aria-label="Previous Template"
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            >
              <ChevronLeft className="size-5" />
            </button>

            <div className="flex items-center gap-2">
              {templateCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  aria-label={`Go to template ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    activeDotIndex === i
                      ? "w-3 h-3 bg-orange-500 ring-4 ring-orange-500/20"
                      : "w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-orange-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => handleScroll("right")}
              aria-label="Next Template"
              className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          {/* Primary Action CTA Button: "See All Resume Templates" */}
          <div>
            <Link
              to="/app?state=register"
              className="px-8 py-3.5 rounded-full border-2 border-rose-400 text-rose-500 dark:border-rose-400/80 dark:text-rose-400 hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-rose-500/20 inline-flex items-center gap-2"
            >
              See All Resume Templates
            </Link>
          </div>
        </div>
      </div>

      {/* FULL TEMPLATE PREVIEW MODAL */}
      {previewModalTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full" style={{ backgroundColor: previewModalTemplate.color }} />
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                    {previewModalTemplate.name} — {previewModalTemplate.role}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    100% ATS Friendly • {previewModalTemplate.templateId.toUpperCase()} Layout
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to={`/app?state=register&template=${previewModalTemplate.templateId}`}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition"
                >
                  <Sparkles className="size-3.5 text-orange-100" /> Use This Template
                </Link>

                <button
                  onClick={() => setPreviewModalTemplate(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                  title="Close Preview"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Body - Full A4 Resume Preview */}
            <div className="p-6 sm:p-8 overflow-y-auto bg-slate-100 dark:bg-slate-950 flex justify-center">
              <div className="w-full max-w-3xl bg-white shadow-2xl rounded-lg overflow-hidden">
                <ReusmePreview
                  resumeData={previewModalTemplate.sampleData}
                  template={previewModalTemplate.templateId}
                  accentColor={previewModalTemplate.color}
                  classes="bg-white text-slate-900 p-8"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


