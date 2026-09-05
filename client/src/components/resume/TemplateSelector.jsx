import React, { useState, useRef, useEffect } from 'react';
import { Check, Layout } from 'lucide-react';

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const templates = [
    {
      id: "classic",
      name: "Classic ATS",
      preview: "Traditional 100% ATS-friendly single column layout",
    },
    {
      id: "executive",
      name: "Executive Leadership",
      preview: "High-impact layout with executive summary & core competencies",
    },
    {
      id: "technical",
      name: "Technical Developer",
      preview: "Single-column format optimized for engineering & tech stack highlights",
    },
    {
      id: "modern",
      name: "Modern Banner",
      preview: "Clean header banner with structured timeline and skills tags",
    },
    {
      id: "minimal",
      name: "Minimal Clean",
      preview: "Minimalist layout focused on typography & achievements",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Two-column sidebar template with profile image header",
    },
  ];

  return (
    <div className='relative' ref={selectorRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-400 bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-500/60 transition-all px-3 py-2 rounded-xl shadow-md'
      >
        <Layout className="size-4" />
        <span className='max-sm:hidden'>Template</span>
        <span className="text-[10px] uppercase font-mono bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30 ml-1">
          {selectedTemplate || "classic"}
        </span>
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 w-72 p-3 mt-2 space-y-2 z-50 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-h-80 overflow-y-auto animate-in zoom-in-95'>
          <p className="text-xs font-semibold text-slate-400 px-1 mb-2">Select Prebuilt Template</p>
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`relative p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                selectedTemplate === template.id
                  ? 'border-emerald-500 bg-emerald-950/30 shadow-md shadow-emerald-950/50'
                  : 'border-white/10 bg-slate-950/50 hover:border-white/20 hover:bg-slate-900'
              }`}
            >
              {selectedTemplate === template.id && (
                <div className='absolute top-3 right-3'>
                  <div className='size-5 bg-emerald-500 rounded-full flex items-center justify-center text-slate-950'>
                    <Check className='size-3.5 stroke-[3]' />
                  </div>
                </div>
              )}
              <div className='space-y-1 pr-6'>
                <h4 className='font-bold text-sm text-white'>{template.name}</h4>
                <p className='text-xs text-slate-400 leading-normal'>{template.preview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;