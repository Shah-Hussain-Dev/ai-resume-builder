import React, { useState } from "react";
import { Sparkles, ArrowRight, X } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);
  const { theme } = useTheme();

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-950 dark:from-indigo-950 dark:via-slate-900 dark:to-purple-950 text-indigo-200 text-xs sm:text-sm py-2 px-4 border-b border-indigo-500/20 shadow-inner z-50 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 animate-pulse">
            <Sparkles className="size-3.5 text-amber-300" />
            AI 2.0 Engine Active
          </span>
          <p className="hidden md:inline font-medium text-slate-100">
            Generate ATS-tailored bullet points and optimize keywords in seconds.
          </p>
          <p className="md:hidden font-medium text-slate-100">
            Create ATS-ready resumes with AI!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#features"
            className="inline-flex items-center gap-1 text-indigo-300 hover:text-white font-semibold underline underline-offset-4 transition"
          >
            Explore Features <ArrowRight className="size-3.5" />
          </a>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-md text-indigo-300 hover:text-white hover:bg-white/10 transition"
            aria-label="Dismiss banner"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
