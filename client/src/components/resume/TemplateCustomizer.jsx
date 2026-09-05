import React, { useState, useRef, useEffect } from "react";
import { Sliders, Type, AlignLeft, MoveVertical, Maximize2, Check, RotateCcw } from "lucide-react";

const TemplateCustomizer = ({ customSettings = {}, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fonts = [
    { id: "Plus Jakarta Sans", name: "Jakarta Sans (Modern)" },
    { id: "Inter", name: "Inter (Clean & Professional)" },
    { id: "Roboto", name: "Roboto (Standard ATS)" },
    { id: "Outfit", name: "Outfit (Geometric)" },
    { id: "Merriweather", name: "Merriweather (Serif)" },
    { id: "Courier Prime", name: "Courier (Monospace)" },
  ];

  const fontSizes = [
    { id: "small", label: "Small", desc: "Compact layout" },
    { id: "normal", label: "Normal", desc: "Standard size" },
    { id: "large", label: "Large", desc: "Highly readable" },
  ];

  const lineHeights = [
    { id: "compact", label: "Compact (1.35)" },
    { id: "normal", label: "Normal (1.5)" },
    { id: "relaxed", label: "Relaxed (1.75)" },
  ];

  const sectionSpacings = [
    { id: "compact", label: "Tight" },
    { id: "normal", label: "Standard" },
    { id: "spacious", label: "Spacious" },
  ];

  const paperPaddings = [
    { id: "compact", label: "Narrow" },
    { id: "normal", label: "Standard" },
    { id: "wide", label: "Wide" },
  ];

  const settings = {
    font_family: customSettings.font_family || "Plus Jakarta Sans",
    font_size: customSettings.font_size || "normal",
    line_height: customSettings.line_height || "normal",
    section_spacing: customSettings.section_spacing || "normal",
    paper_padding: customSettings.paper_padding || "normal",
  };

  const handleUpdate = (key, val) => {
    onChange({
      ...settings,
      [key]: val,
    });
  };

  const handleReset = () => {
    onChange({
      font_family: "Plus Jakarta Sans",
      font_size: "normal",
      line_height: "normal",
      section_spacing: "normal",
      paper_padding: "normal",
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full text-left p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-blue-500/60 dark:hover:border-blue-500/60 transition-all duration-300 shadow-sm hover:shadow-md group cursor-pointer flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Sliders className="size-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Typography & Layout</span>
            <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {settings.font_family} • {settings.font_size.toUpperCase()}
            </span>
          </div>
        </div>

        <span className="px-3.5 py-1.5 rounded-full btn-royal-outline text-xs font-bold shadow-xs flex items-center gap-1 shrink-0">
          Configure Layout
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 text-slate-900 dark:text-white">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-slate-950 shrink-0">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Sliders className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                    Typography & Layout Settings
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Adjust font styles, sizes, line heights, and margins
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition flex items-center gap-1"
                >
                  <RotateCcw className="size-3.5" /> Reset
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 flex-1">
              {/* Font Family */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                  <Type className="size-4 text-blue-600 dark:text-blue-400" /> Font Family
                </label>
                <select
                  value={settings.font_family}
                  onChange={(e) => handleUpdate("font_family", e.target.value)}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                >
                  {fonts.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Font Size */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                  <Type className="size-4 text-blue-600 dark:text-blue-400" /> Font Size
                </label>
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-white/10 shadow-xs">
                  {fontSizes.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => handleUpdate("font_size", s.id)}
                      className={`py-2 rounded-lg text-xs font-bold transition ${
                        settings.font_size === s.id
                          ? "btn-royal-gradient text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Line Height */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                  <AlignLeft className="size-4 text-blue-600 dark:text-blue-400" /> Line Height
                </label>
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-white/10 shadow-xs">
                  {lineHeights.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => handleUpdate("line_height", l.id)}
                      className={`py-2 rounded-lg text-xs font-bold transition ${
                        settings.line_height === l.id
                          ? "btn-royal-gradient text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section Spacing */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                  <MoveVertical className="size-4 text-blue-600 dark:text-blue-400" /> Section Spacing
                </label>
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-white/10 shadow-xs">
                  {sectionSpacings.map((sp) => (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => handleUpdate("section_spacing", sp.id)}
                      className={`py-2 rounded-lg text-xs font-bold transition ${
                        settings.section_spacing === sp.id
                          ? "btn-royal-gradient text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {sp.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Paper Margins */}
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                  <Maximize2 className="size-4 text-blue-600 dark:text-blue-400" /> Paper Margins
                </label>
                <div className="grid grid-cols-3 gap-2 p-1.5 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-white/10 shadow-xs">
                  {paperPaddings.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleUpdate("paper_padding", p.id)}
                      className={`py-2 rounded-lg text-xs font-bold transition ${
                        settings.paper_padding === p.id
                          ? "btn-royal-gradient text-white shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn-royal-gradient px-6 py-2.5 rounded-xl font-bold text-xs shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Check className="size-4 stroke-[3]" /> Done Customizing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TemplateCustomizer;
