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
          profession: "VP of Engineering & Technology Strategy",
          email: "marcus.vance@example.com",
          phone: "+1 (555) 019-2834",
          location: "San Francisco, CA",
          linkedin: "linkedin.com/in/marcusvance",
          website: "marcusvance.exec.com",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
        },
        professional_summary:
          "Visionary Technology Executive with 12+ years of experience leading multi-disciplinary engineering organizations (100+ engineers), scaling cloud infrastructure, and driving product roadmaps that delivered $45M+ ARR growth.",
        experience: [
          {
            position: "VP of Engineering",
            company: "Apex Cloud Systems, San Francisco, CA",
            start_date: "2021-04",
            end_date: "Present",
            is_current: true,
            description:
              "• Managed 80+ software engineers across 6 globally distributed product teams.\n• Spearheaded cloud migration cutting operating infrastructure costs by $2.3M annually.\n• Scaled platform architecture to process 50M+ daily active API transactions with 99.99% uptime.",
          },
          {
            position: "Director of Software Engineering",
            company: "Enterprise Logic Tech, San Jose, CA",
            start_date: "2017-02",
            end_date: "2021-03",
            is_current: false,
            description:
              "• Built and mentored engineering department from 15 to 45 developers.\n• Championed microservices refactoring and automated CI/CD deployment pipelines.",
          },
        ],
        projects: [
          {
            name: "Global Enterprise Cloud Migration",
            description: "Led multi-region AWS cloud migration for legacy enterprise platform with zero downtime.",
          },
          {
            name: "AI-Powered Analytics Suite",
            description: "Engineered predictive analytics engine processing 200GB+ telemetry data daily.",
          },
        ],
        education: [
          {
            degree: "M.S. Computer Science & Systems",
            institution: "UC Berkeley",
            graduation_date: "2013-05",
            gpa: "3.9",
          },
          {
            degree: "B.S. Electrical Engineering & CS",
            institution: "Stanford University",
            graduation_date: "2011-05",
            gpa: "3.8",
          },
        ],
        skills: ["Executive Leadership", "Cloud Architecture", "Product Strategy", "P&L Management", "Team Scaling", "Microservices", "DevOps & Security"],
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
          phone: "+1 (555) 892-1049",
          location: "Seattle, WA",
          linkedin: "linkedin.com/in/davidchen-arch",
          website: "davidchen.dev",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
        },
        professional_summary:
          "Full Stack Architect specialized in microservices, distributed system design, high-concurrency Node.js / React platforms, and cloud DevOps infrastructure.",
        experience: [
          {
            position: "Lead Software Architect",
            company: "CloudScale Tech, Seattle, WA",
            start_date: "2020-08",
            end_date: "Present",
            is_current: true,
            description:
              "• Designed event-driven messaging pipelines using Kafka & Redis processing 10M+ events daily.\n• Reduced p99 API latency from 450ms to 65ms through query optimization & distributed caching.\n• Architected automated Kubernetes deployment pipelines with zero-downtime rolling updates.",
          },
          {
            position: "Senior Full Stack Engineer",
            company: "Nexus Data Labs, Bellevue, WA",
            start_date: "2017-06",
            end_date: "2020-07",
            is_current: false,
            description:
              "• Developed real-time dashboard applications using React, TypeScript, GraphQL, and WebSockets.\n• Refactored legacy monolithic backend into decoupled Node.js microservices.",
          },
        ],
        projects: [
          {
            name: "High-Throughput Stream Pipeline",
            description: "Built scalable streaming ingestion pipeline handling 100k requests/sec using Kafka & Go.",
          },
          {
            name: "Multi-Tenant Developer SaaS Platform",
            description: "Created developer portal and REST API gateway with OAuth2 & rate limiting.",
          },
        ],
        education: [
          {
            degree: "B.S. Software Engineering",
            institution: "University of Washington",
            graduation_date: "2017-05",
            gpa: "3.85",
          },
        ],
        skills: ["TypeScript", "Node.js", "React.js", "Docker", "Kubernetes", "GraphQL", "AWS", "Kafka", "System Design"],
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
          profession: "Operations & Project Management Lead",
          email: "casey.clark@example.com",
          phone: "+1 (555) 456-7890",
          location: "Philadelphia, PA",
          linkedin: "linkedin.com/in/caseyclark-ops",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
        },
        professional_summary:
          "Results-driven Operations Specialist with 6+ years of experience streamlining business processes, managing cross-functional project teams, and delivering operational efficiency gains.",
        experience: [
          {
            position: "Senior Operations Lead",
            company: "Apex Business Solutions, Philadelphia, PA",
            start_date: "2020-12",
            end_date: "Present",
            is_current: true,
            description:
              "• Managed daily business operations across 4 regional departments serving 300+ enterprise clients.\n• Reduced operational overhead by 22% through workflow automation and vendor renegotiations.\n• Led cross-functional Agile project sprints involving engineering, sales, and customer success teams.",
          },
          {
            position: "Project Manager",
            company: "Keystone Logistics, Pittsburgh, PA",
            start_date: "2017-08",
            end_date: "2020-11",
            is_current: false,
            description:
              "• Coordinated logistics software implementation reducing order fulfillment cycle times by 35%.\n• Managed project budgets totaling $1.2M with 100% on-time milestone delivery.",
          },
        ],
        projects: [
          {
            name: "Supply Chain Process Optimization",
            description: "Automated inventory tracking system reducing stock discrepancies by 40%.",
          },
          {
            name: "Customer Onboarding Portal",
            description: "Redesigned client onboarding workflow, shortening time-to-value from 14 to 4 days.",
          },
        ],
        education: [
          {
            degree: "B.S. Business Administration & Management",
            institution: "University of Pennsylvania",
            graduation_date: "2017-05",
            gpa: "3.75",
          },
        ],
        skills: ["Operations Management", "Process Optimization", "Agile & Scrum", "Cross-Functional Leadership", "Vendor Relations", "Budgeting"],
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
          profession: "Senior Account Executive & Sales Director",
          email: "drew.miller@example.com",
          phone: "+1 (555) 019-7890",
          location: "Philadelphia, PA",
          linkedin: "linkedin.com/in/drewmiller-sales",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
        },
        professional_summary:
          "High-performing Enterprise Sales Executive with 7+ years of experience driving B2B SaaS ARR growth, closing $1.5M+ contract deals, and managing key enterprise accounts.",
        experience: [
          {
            position: "Senior Account Executive",
            company: "Enterprise Software Corp, Philadelphia, PA",
            start_date: "2021-01",
            end_date: "Present",
            is_current: true,
            description:
              "• Exceeded FY23 quota by 145%, generating $2.4M in Net New ARR across Fortune 500 accounts.\n• Led strategic product demonstrations, contract negotiations, and C-suite stakeholder presentations.\n• Mentored team of 6 junior Account Executives on consultative selling methodologies.",
          },
          {
            position: "B2B SaaS Sales Manager",
            company: "GrowthStack Systems, New York, NY",
            start_date: "2018-03",
            end_date: "2020-12",
            is_current: false,
            description:
              "• Managed outbound sales pipeline yielding 35% growth in quarterly deal closures.\n• Implemented Salesforce CRM automation workflows increasing rep productivity by 25%.",
          },
        ],
        projects: [
          {
            name: "Global Enterprise Deal Acquisition",
            description: "Closed $1.2M 3-year multi-product contract with leading financial enterprise.",
          },
          {
            name: "Salesenablement Playbook",
            description: "Authored sales playbook adopted across 50-person global sales department.",
          },
        ],
        education: [
          {
            degree: "B.S. Marketing & Finance",
            institution: "Penn State University",
            graduation_date: "2018-05",
            gpa: "3.7",
          },
        ],
        skills: ["B2B SaaS Sales", "Enterprise Account Management", "Contract Negotiations", "Salesforce & HubSpot CRM", "Revenue Growth"],
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
          profession: "Senior Full Stack Engineer",
          email: "alex.morgan@example.com",
          phone: "+1 (555) 019-2834",
          location: "San Francisco, CA",
          linkedin: "linkedin.com/in/alexmorgan-dev",
          website: "alexmorgan.tech",
          image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80",
        },
        professional_summary:
          "Results-oriented Software Engineer with 6+ years of experience developing high-performance web applications, scalable cloud API backends, and responsive user interfaces.",
        experience: [
          {
            position: "Senior Full Stack Engineer",
            company: "TechFlow Inc, San Francisco, CA",
            start_date: "2022-01",
            end_date: "Present",
            is_current: true,
            description:
              "• Engineered cloud microservices serving 2M+ daily active users using React, Node.js, and PostgreSQL.\n• Accelerated frontend application page load speeds by 45% through code splitting & image optimization.\n• Led team of 5 developers building real-time collaboration features using WebSockets.",
          },
          {
            position: "Frontend Software Engineer",
            company: "WebCraft Solutions, San Jose, CA",
            start_date: "2019-06",
            end_date: "2021-12",
            is_current: false,
            description:
              "• Built responsive Web applications using React, Redux Toolkit, and Tailwind CSS.\n• Integrated REST APIs, state management, and automated unit testing suites.",
          },
        ],
        projects: [
          {
            name: "AI Resume Builder Platform",
            description: "Created full-stack AI platform enabling instant resume generation and ATS score audit.",
          },
          {
            name: "Real-Time Kanban Board",
            description: "Developed drag-and-drop project board app supporting concurrent multi-user editing.",
          },
        ],
        education: [
          {
            degree: "B.S. Computer Science",
            institution: "Stanford University",
            graduation_date: "2019-05",
            gpa: "3.9",
          },
        ],
        skills: ["React.js", "TypeScript", "Node.js", "Next.js", "Tailwind CSS", "PostgreSQL", "REST APIs", "Git & CI/CD"],
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
          profession: "Lead UI/UX & Product Designer",
          email: "sarah.jenkins@example.com",
          phone: "+1 (555) 321-9876",
          location: "Austin, TX",
          linkedin: "linkedin.com/in/sarahjenkins-design",
          website: "sarahjenkins.design",
          image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
        },
        professional_summary:
          "Creative Product Design Lead with 8+ years designing intuitive mobile and web applications, building comprehensive multi-platform design systems, and driving user research.",
        experience: [
          {
            position: "Staff UI/UX Designer",
            company: "PixelCraft Studio, Austin, TX",
            start_date: "2021-03",
            end_date: "Present",
            is_current: true,
            description:
              "• Redesigned e-commerce checkout workflow boosting user checkout completion rates by 28%.\n• Built design system component library used across 12 product engineering teams.\n• Conducted 50+ user interviews and usability tests to guide product strategy.",
          },
          {
            position: "Senior UX Designer",
            company: "Interactive Digital, Dallas, TX",
            start_date: "2017-06",
            end_date: "2021-02",
            is_current: false,
            description:
              "• Designed iOS & Android mobile banking app rated 4.8 stars with 500k+ downloads.\n• Collaborated with product managers and engineers on wireframes, interactive prototypes, and UI handoffs.",
          },
        ],
        projects: [
          {
            name: "Global Mobile Design System",
            description: "Created accessible, dark-mode ready UI design system component kit in Figma.",
          },
          {
            name: "SaaS Analytics Web App Redesign",
            description: "Overhauled complex data visualization dashboard, reducing task completion time by 35%.",
          },
        ],
        education: [
          {
            degree: "B.F.A. Interactive Design & HCI",
            institution: "University of Texas at Austin",
            graduation_date: "2017-05",
            gpa: "3.85",
          },
        ],
        skills: ["Figma & Design Systems", "User Research & Usability Testing", "Wireframing & Prototyping", "UI/UX Design", "HCI & Accessibility"],
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-6xl h-[420px] bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-blue-600/15 dark:from-blue-900/20 dark:via-indigo-950/25 dark:to-blue-900/20 rounded-full blur-[110px] pointer-events-none" />

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
                  {/* Inner Full Page Resume Preview Box (Scaled cleanly & centered without side white bars) */}
                  <div className="w-full h-[430px] sm:h-[470px] overflow-hidden rounded-2xl bg-white shadow-md relative pointer-events-none select-none border border-slate-200/80 flex justify-center">
                    <div className="w-[794px] shrink-0 transform scale-[0.34] sm:scale-[0.39] origin-top center">
                      <ReusmePreview
                        resumeData={tpl.sampleData}
                        template={tpl.templateId}
                        accentColor={tpl.color}
                        hideOuterWrapper={true}
                        showFooter={false}
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
                  <div className="absolute inset-0 rounded-3xl bg-slate-950/60 backdrop-blur-[3px] opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-6 z-30">
                    <button
                      onClick={() => setPreviewModalTemplate(tpl)}
                      className="w-full max-w-[200px] py-2.5 px-4 rounded-full bg-white hover:bg-slate-100 active:scale-95 text-slate-900 font-bold text-xs shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform translate-y-2 group-hover/card:translate-y-0 cursor-pointer"
                    >
                      <Eye className="size-4 text-blue-600" />
                      Preview Template
                    </button>
                    <Link
                      to={`/app?state=register&template=${tpl.templateId}`}
                      className="w-full max-w-[200px] py-2.5 px-4 rounded-full btn-royal-gradient active:scale-95 font-bold text-xs shadow-xl transition-all duration-300 flex items-center justify-center gap-2 transform translate-y-2 group-hover/card:translate-y-0"
                    >
                      <Sparkles className="size-4 text-blue-200" />
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
                      ? "w-3 h-3 bg-blue-600 ring-4 ring-blue-600/20"
                      : "w-2 h-2 bg-slate-300 dark:bg-slate-700 hover:bg-blue-400"
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
              className="px-8 py-3.5 rounded-full btn-royal-outline font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-lg inline-flex items-center gap-2"
            >
              See All Resume Templates
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* FULL TEMPLATE PREVIEW MODAL */}
      {previewModalTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl max-w-4xl w-full h-[92vh] max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-950 shrink-0">
              <div className="flex items-center gap-3">
                <div className="size-3.5 rounded-full ring-4 ring-blue-500/20" style={{ backgroundColor: previewModalTemplate.color }} />
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
                  className="px-5 py-2.5 rounded-full btn-royal-gradient text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition active:scale-95"
                >
                  <Sparkles className="size-3.5 text-blue-200" /> Use This Template
                </Link>

                <button
                  onClick={() => setPreviewModalTemplate(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                  title="Close Preview"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Body - Full A4 Resume Preview Scrollable */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-8 bg-slate-100 dark:bg-slate-950 flex justify-center items-start">
              <ReusmePreview
                resumeData={previewModalTemplate.sampleData}
                template={previewModalTemplate.templateId}
                accentColor={previewModalTemplate.color}
                hideOuterWrapper={true}
                showFooter={true}
                classes="bg-white text-slate-900 p-6 sm:p-10"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


