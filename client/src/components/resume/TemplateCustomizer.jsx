import React, { useState } from "react";
import { Sliders, Type, RotateCcw, ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";

const SliderRow = ({ label, value, unit = "pt", showPlusPrefix = false, min = 0, max = 20, step = 1, onChange }) => {
  const formattedValue = showPlusPrefix
    ? (value >= 0 ? `+${value}${unit}` : `${value}${unit}`)
    : `${value}${unit}`;

  const decrement = () => {
    const newVal = Math.max(min, Math.round((value - step) * 100) / 100);
    onChange(newVal);
  };

  const increment = () => {
    const newVal = Math.min(max, Math.round((value + step) * 100) / 100);
    onChange(newVal);
  };

  const progressPct = Math.min(100, Math.max(4, ((value - min) / (max - min)) * 100));

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
        <span>{label}</span>
        <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">{formattedValue}</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Custom Track with Tick Marks & Progress Fill */}
        <div className="relative flex-1 h-9 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-white/10 flex items-center px-1.5 overflow-hidden group">
          {/* Vertical tick lines in background */}
          <div className="absolute inset-x-3 inset-y-0 flex items-center justify-between pointer-events-none opacity-25">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-[1px] h-3 bg-slate-500 dark:bg-slate-400" />
            ))}
          </div>

          {/* Progress fill bar */}
          <div
            className="h-6 rounded-lg bg-blue-600 dark:bg-blue-500 transition-all duration-75 relative z-0"
            style={{ width: `${progressPct}%` }}
          />

          {/* Native transparent range input overlay */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
        </div>

        {/* Decrement Button */}
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="size-8 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 flex items-center justify-center font-bold text-sm shadow-2xs transition cursor-pointer shrink-0"
        >
          <Minus className="size-3.5 stroke-[2.5]" />
        </button>

        {/* Increment Button */}
        <button
          type="button"
          onClick={increment}
          disabled={value >= max}
          className="size-8 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 flex items-center justify-center font-bold text-sm shadow-2xs transition cursor-pointer shrink-0"
        >
          <Plus className="size-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

const TemplateCustomizer = ({ customSettings = {}, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const fonts = [
    { id: "Plus Jakarta Sans", name: "Jakarta Sans (Modern)" },
    { id: "Inter", name: "Inter (Clean & Professional)" },
    { id: "Roboto", name: "Roboto (Standard ATS)" },
    { id: "Outfit", name: "Outfit (Geometric)" },
    { id: "Merriweather", name: "Merriweather (Serif)" },
    { id: "Courier Prime", name: "Courier (Monospace)" },
  ];

  const settings = {
    font_family: customSettings?.font_family || "Plus Jakarta Sans",
    base_font_size: customSettings?.base_font_size ?? 10,
    name_font_size: customSettings?.name_font_size ?? 5,
    title_font_size: customSettings?.title_font_size ?? 2,
    heading_font_size: customSettings?.heading_font_size ?? 1,
    entry_header_font_size: customSettings?.entry_header_font_size ?? 0,
    line_height_val: customSettings?.line_height_val ?? 1.3,
    space_between_elements: customSettings?.space_between_elements ?? 10,
    margin_lr: customSettings?.margin_lr ?? 10,
    margin_tb: customSettings?.margin_tb ?? 10,
  };

  const handleUpdate = (key, val) => {
    if (onChange) {
      onChange({
        ...settings,
        [key]: val,
      });
    }
  };

  const handleReset = () => {
    if (onChange) {
      onChange({
        font_family: "Plus Jakarta Sans",
        base_font_size: 10,
        name_font_size: 5,
        title_font_size: 2,
        heading_font_size: 1,
        entry_header_font_size: 0,
        line_height_val: 1.3,
        space_between_elements: 10,
        margin_lr: 10,
        margin_tb: 10,
      });
    }
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs overflow-hidden text-slate-900 dark:text-white transition-all">
      {/* Accordion Toggle Bar */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-2xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Sliders className="size-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
              Typography & Layout Controls
            </span>
            <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {settings.font_family} • {settings.base_font_size}pt
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-950 group-hover:text-blue-600 dark:group-hover:text-blue-400 text-xs font-bold transition flex items-center gap-1">
            {isExpanded ? "Hide Settings" : "Configure"}
            {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </span>
        </div>
      </button>

      {/* Expandable Section Body */}
      {isExpanded && (
        <div className="p-5 pt-3 border-t border-slate-100 dark:border-white/10 space-y-6 bg-slate-50/40 dark:bg-slate-950/40 animate-in slide-in-from-top-2 duration-200">
          {/* Header Bar with Font Selection & Reset */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-white/10">
            <div className="w-full sm:w-auto flex-1 max-w-xs">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-1">
                <Type className="size-3.5 text-blue-600 dark:text-blue-400" /> Primary Font Family
              </label>
              <select
                value={settings.font_family}
                onChange={(e) => handleUpdate("font_family", e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-900 dark:text-white focus:border-blue-600 outline-none transition cursor-pointer"
              >
                {fonts.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1.5 rounded-full hover:bg-slate-200/70 dark:hover:bg-slate-800 transition flex items-center gap-1 cursor-pointer self-end sm:self-center"
              title="Reset all font sizes and margins to default"
            >
              <RotateCcw className="size-3.5" /> Reset Defaults
            </button>
          </div>

          {/* CARD 1: Font Size Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-white/10 p-5 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Font Size
            </h3>

            <div className="space-y-3.5">
              <SliderRow
                label="Base Font Size"
                value={settings.base_font_size}
                unit="pt"
                min={7}
                max={14}
                onChange={(val) => handleUpdate("base_font_size", val)}
              />
              <SliderRow
                label="Full Name"
                value={settings.name_font_size}
                unit="pt"
                showPlusPrefix
                min={0}
                max={14}
                onChange={(val) => handleUpdate("name_font_size", val)}
              />
              <SliderRow
                label="Professional Title"
                value={settings.title_font_size}
                unit="pt"
                showPlusPrefix
                min={0}
                max={10}
                onChange={(val) => handleUpdate("title_font_size", val)}
              />
              <SliderRow
                label="Section Headings"
                value={settings.heading_font_size}
                unit="pt"
                showPlusPrefix
                min={0}
                max={10}
                onChange={(val) => handleUpdate("heading_font_size", val)}
              />
              <SliderRow
                label="Entry Header"
                value={settings.entry_header_font_size}
                unit="pt"
                showPlusPrefix
                min={-2}
                max={8}
                onChange={(val) => handleUpdate("entry_header_font_size", val)}
              />
            </div>
          </div>

          {/* CARD 2: Spacing Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-white/10 p-5 shadow-xs space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Spacing
            </h3>

            <div className="space-y-3.5">
              <SliderRow
                label="Line Height"
                value={settings.line_height_val}
                unit=""
                min={1.0}
                max={2.0}
                step={0.05}
                onChange={(val) => handleUpdate("line_height_val", val)}
              />
              <SliderRow
                label="Space Between Elements"
                value={settings.space_between_elements}
                unit="px"
                min={4}
                max={28}
                step={1}
                onChange={(val) => handleUpdate("space_between_elements", val)}
              />
              <SliderRow
                label="Left & Right Margin"
                value={settings.margin_lr}
                unit="mm"
                min={4}
                max={28}
                step={1}
                onChange={(val) => handleUpdate("margin_lr", val)}
              />
              <SliderRow
                label="Top & Bottom Margin"
                value={settings.margin_tb}
                unit="mm"
                min={4}
                max={28}
                step={1}
                onChange={(val) => handleUpdate("margin_tb", val)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateCustomizer;
