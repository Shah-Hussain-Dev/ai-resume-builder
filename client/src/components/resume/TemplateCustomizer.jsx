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
    <div className="relative" ref={modalRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-400 bg-slate-900/90 hover:bg-slate-800 border border-purple-500/30 hover:border-purple-500/60 transition-all px-3.5 py-2 rounded-xl shadow-md"
        title="Customize Font & Template Settings"
      >
        <Sliders className="size-4 text-purple-400" />
        <span className="hidden sm:inline">Typography & Layout</span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-80 sm:w-96 p-4 mt-2 space-y-4 z-50 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto animate-in zoom-in-95 text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-bold text-sm flex items-center gap-2 text-purple-300">
              <Sliders className="size-4" /> Template & Font Settings
            </h3>
            <button
              onClick={handleReset}
              className="text-[11px] font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition"
            >
              <RotateCcw className="size-3" /> Reset
            </button>
          </div>

          {/* Font Family Selection */}
          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <Type className="size-3.5 text-purple-400" /> Font Family
            </label>
            <select
              value={settings.font_family}
              onChange={(e) => handleUpdate("font_family", e.target.value)}
              className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs font-medium text-white focus:border-purple-500 outline-none transition"
            >
              {fonts.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <Type className="size-3.5 text-purple-400" /> Font Size
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-xl border border-white/10">
              {fontSizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleUpdate("font_size", s.id)}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition ${
                    settings.font_size === s.id
                      ? "bg-purple-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Line Height Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <AlignLeft className="size-3.5 text-purple-400" /> Line Height
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-xl border border-white/10">
              {lineHeights.map((l) => (
                <button
                  key={l.id}
                  onClick={() => handleUpdate("line_height", l.id)}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition ${
                    settings.line_height === l.id
                      ? "bg-purple-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {l.label.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Section Spacing */}
          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <MoveVertical className="size-3.5 text-purple-400" /> Section Spacing
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-xl border border-white/10">
              {sectionSpacings.map((sp) => (
                <button
                  key={sp.id}
                  onClick={() => handleUpdate("section_spacing", sp.id)}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition ${
                    settings.section_spacing === sp.id
                      ? "bg-purple-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Paper Padding / Margins */}
          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 mb-2">
              <Maximize2 className="size-3.5 text-purple-400" /> Paper Margins
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-950 rounded-xl border border-white/10">
              {paperPaddings.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleUpdate("paper_padding", p.id)}
                  className={`py-1.5 rounded-lg text-xs font-semibold transition ${
                    settings.paper_padding === p.id
                      ? "bg-purple-600 text-white shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateCustomizer;
