import React from 'react';
import { Sparkles } from 'lucide-react';

const Loader = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300">
      {/* Ambient Radial Glow Backdrop */}
      <div className="absolute size-96 bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-blue-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-5">
        {/* Animated Brand Badge */}
        <div className="size-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 p-0.5 shadow-xl shadow-blue-600/30 animate-pulse">
          <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Sparkles className="size-8 text-blue-600 dark:text-blue-400 animate-spin duration-3000" />
          </div>
        </div>

        {/* Dual Ring Spinner */}
        <div className="relative flex items-center justify-center mt-2">
          <div className="size-12 animate-spin rounded-full border-3 border-blue-500/20 border-t-blue-600 dark:border-t-blue-400" />
        </div>

        {/* Text Status */}
        <div className="text-center space-y-1">
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            AI Resume Builder
          </h3>
          <p className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold animate-pulse">
            Loading AI Engine...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
