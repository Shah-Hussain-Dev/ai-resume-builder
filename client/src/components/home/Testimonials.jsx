import React from "react";
import { Star, Quote, Award } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Marcus Chen",
      role: "Senior Software Engineer @ Google",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      quote:
        "The AI bullet point generator turned my basic project descriptions into quantifiable metrics. I received 4 interview callbacks within my first week of applying!",
      atsScore: "99% ATS Match",
    },
    {
      name: "Sarah Jenkins",
      role: "Lead Product Manager @ Meta",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      quote:
        "I was getting auto-rejected by ATS parsers for months. After optimizing my keywords with this tool, my response rate jumped by over 300%.",
      atsScore: "98% ATS Match",
    },
    {
      name: "David Ross",
      role: "DevOps Engineer @ AWS",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      quote:
        "Instant PDF export with exact vector formatting. No broken line breaks, no weird spacing. It's easily the best AI resume builder available.",
      atsScore: "100% ATS Match",
    },
    {
      name: "Emily Watson",
      role: "UX Director @ Stripe",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      quote:
        "Clean, elegant templates that ATS systems parse seamlessly. The matching cover letter feature saved me hours during my job hunt.",
      atsScore: "97% ATS Match",
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white relative scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">
            Real Candidate Results
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
            Loved by 10,000+ Professionals
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-4">
            See how job seekers landed offers at top tech and global companies.
          </p>
        </div>

        <div className="marquee-row w-full overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-slate-50 dark:from-[#090D16] to-transparent" />
          <div className="marquee-inner flex gap-6 pt-4 pb-6 min-w-[200%]">
            {[...reviews, ...reviews].map((rev, index) => (
              <div
                key={index}
                className="w-80 sm:w-96 glass-card glass-card-hover rounded-2xl p-6 border border-slate-200 dark:border-white/10 shrink-0 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-4 fill-amber-500" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 px-2 py-0.5 rounded font-semibold">
                      {rev.atsScore}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-white/10">
                  <img
                    src={rev.image}
                    alt={rev.name}
                    className="size-10 rounded-full object-cover border border-indigo-500/30"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{rev.name}</h4>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-slate-50 dark:from-[#090D16] to-transparent" />
        </div>
      </div>
    </section>
  );
}
