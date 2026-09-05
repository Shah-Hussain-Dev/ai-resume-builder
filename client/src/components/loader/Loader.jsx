import React from 'react';
import { Sparkles } from 'lucide-react';

const Loader = () => {
    return (
        <div className='min-h-screen bg-[#0B0F17] flex flex-col items-center justify-center text-white relative overflow-hidden'>
            <div className="absolute size-72 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="relative flex flex-col items-center gap-4">
                <div className="size-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-xl shadow-emerald-500/20 animate-bounce">
                    <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                        <Sparkles className="size-7 text-emerald-400" />
                    </div>
                </div>

                <div className="size-10 animate-spin rounded-full border-3 border-emerald-500/20 border-t-emerald-400" />
                <p className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 animate-pulse mt-2">
                    Loading AI Engine...
                </p>
            </div>
        </div>
    );
};

export default Loader;
