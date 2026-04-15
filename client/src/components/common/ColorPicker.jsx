import { Check, Palette } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react'

const ColorPicker = ({selectedColor,onChange,selectedTemplate }) => {
    const colors = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Green", value: "#10B981" },
  { name: "Red", value: "#EF4444" },
  { name: "Yellow", value: "#F59E0B" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Indigo", value: "#6366F1" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Cyan", value: "#06B6D4" },
  { name: "Orange", value: "#F97316" },
  { name: "Lime", value: "#84CC16" },
  { name: "Amber", value: "#FBBF24" },
  { name: "Emerald", value: "#059669" },
  { name: "Rose", value: "#F43F5E" },
  { name: "Sky", value: "#0EA5E9" },
  { name: "Fuchsia", value: "#D946EF" },
  { name: "Slate", value: "#64748B" },
  { name: "Zinc", value: "#71717A" },
  { name: "Brown", value: "#A16207" }
];
    const [isOpen,setIsOpen] = useState(false);
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
    return(
        <div className='relative' ref={pickerRef}>
            <button onClick={()=>setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-blue-600 bg-linear-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'>
                <Palette size={14}/> <span className='max-sm:hidden'>Accent</span>
            </button>
            {isOpen && (
                <div className='absolute top-full w-xs p-3 mt-2 z-10 bg-white rounded-xl border border-gray-200 shadow-xl max-sm:w-full h-auto max-h-60 overflow-y-auto flex flex-wrap gap-3'>
                    {colors.map((color)=>(  
                      <div className='flex flex-col items-center'>
                          <div 
                            key={color.value} 
                            onClick={()=>onChange(color.value)} 
                            className={`relative h-9 w-9 cursor-pointer rounded-full transition-all duration-200 border-2 flex items-center justify-center
                                ${selectedColor === color.value ? 'border-white scale-110 z-10' : 'border-transparent hover:scale-110 shadow-sm'}
                            `} 
                            style={{
                                backgroundColor: color.value,
                                boxShadow: selectedColor === color.value ? `0 0 0 1px white, 0 0 0 2px ${color.value}` : ''
                            }}
                            title={color.name}
                        >
                            {selectedColor === color.value && (
                                <Check size={18} className='text-white drop-shadow-md'/>
                            )}
                            
                        </div>
                        <span className='text-xs mt-1 text-gray-500 text-center'>{color.name}</span>
                      </div>
                        
                    ))}
                </div>
            )}
          
        </div>
    )
}

export default ColorPicker