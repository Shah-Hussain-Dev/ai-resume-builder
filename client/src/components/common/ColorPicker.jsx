import { Check, Palette } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Emerald", value: "#10B981" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Cyan", value: "#06B6D4" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Fuchsia", value: "#D946EF" },
    { name: "Pink", value: "#EC4899" },
    { name: "Rose", value: "#F43F5E" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F97316" },
    { name: "Amber", value: "#F59E0B" },
    { name: "Slate", value: "#64748B" },
  ];
  
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative' ref={pickerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-1.5 text-xs sm:text-sm font-medium text-emerald-400 bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-500/60 transition-all px-3 py-2 rounded-xl shadow-md'
      >
        <Palette className="size-4" />
        <span className='max-sm:hidden'>Accent Color</span>
        <span
          className="size-3.5 rounded-full border border-white/20 ml-1"
          style={{ backgroundColor: selectedColor || "#10B981" }}
        />
      </button>

      {isOpen && (
        <div className='absolute top-full left-0 w-64 p-3 mt-2 z-50 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl max-h-64 overflow-y-auto flex flex-wrap gap-2.5 animate-in zoom-in-95'>
          {colors.map((color) => (
            <div key={color.value} className='flex flex-col items-center gap-1'>
              <div
                onClick={() => {
                  onChange(color.value);
                  setIsOpen(false);
                }}
                className={`size-8 cursor-pointer rounded-full transition-all duration-200 border-2 flex items-center justify-center ${
                  selectedColor === color.value
                    ? 'border-white scale-110 shadow-lg shadow-emerald-500/20'
                    : 'border-transparent hover:scale-110'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {selectedColor === color.value && (
                  <Check className='size-4 text-white drop-shadow-md' />
                )}
              </div>
              <span className='text-[10px] text-slate-400 font-mono'>{color.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;