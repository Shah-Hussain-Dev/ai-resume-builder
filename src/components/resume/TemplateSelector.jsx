import { Check, Layout } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react'

const TemplateSelector = ({selectedTemplate,onChange}) => {
    const [isOpen,setIsOpen] = useState(false);
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
            name: "Classic",
            preview:"A clean, traditional resume format with clear sections and profession typography",
            image: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",
        },
        {
            id: "modern",
            name: "Modern",
            preview:"A modern, stylish resume format with clean sections and professional typography",
            image: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",
        },
        {
            id: "minimal",
            name: "Minimal",
            preview:"A minimal, elegant resume format with clean sections and professional typography",
            image: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",
        },
        {
            id: "minimal-image",
            name: "Minimal Image",
            preview:"A modern, stylish resume format with clean sections and professional typography",
            image: "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600",
        },
    ];
  return (
    <div className='relative' ref={selectorRef}>
        <button onClick={()=>setIsOpen(!isOpen)} className='flex items-center gap-1 text-sm text-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 ring-blue-300 hover:ring transition-all px-3 py-2 rounded-lg'>
            <Layout size={14}/> <span className='max-sm:hidden'>Template</span>
        </button>
        {isOpen && (
            <div className='absolute top-full w-xs p-3 mt-2 space-y-3 z-10 bg-white rounded-md h-auto max-h-80 overflow-y-auto border border-gray-200 shadow-sm'>
                {templates.map((template)=>(
                    <div key={template.id} onClick={()=>onChange(template.id)} className={`
                    relative p-3 border rounded-md cursor-pointer transition-all duration-200
                    ${selectedTemplate === template.id ? 'border-blue-400 bg-blue-100' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-100'}
                    `}>
                        {
                            selectedTemplate ===template.id && (
                                <div className='absolute top-2 right-2'>
                                   <div className='size-5 bg-blue-400 rounded-full flex items-center justify-center'>
                                     <Check size={14} className='h-3 w-3 text-white'/>
                                   </div>
                                </div>
                            ) 
                        }
                        <div className='space-y-1'>
                            <h4 className='font-medium text-gray-800'>{template.name}</h4>
                            <p className='mt-2 p-2 bg-blue-50 rounded text-xs text-gray-500 italic'>{template.preview}</p>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default TemplateSelector