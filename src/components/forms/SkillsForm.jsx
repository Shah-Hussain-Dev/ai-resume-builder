import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'

const SkillsForm = ({ data = [], onChange }) => {
  const [skillInput, setSkillInput] = useState('');

  const addSkill = (e) => {
    e.preventDefault();
    const trimmedSkill = skillInput.trim();
    if (trimmedSkill && !data.includes(trimmedSkill)) {
      onChange([...data, trimmedSkill]);
      setSkillInput('');
    }
  }

  const removeSkill = (skillToRemove) => {
    onChange(data.filter(skill => skill !== skillToRemove));
  }

  return (
    <div className='space-y-6 animate-in fade-in duration-500'>
      <div className='px-1'>
        <h3 className="text-xl font-bold text-gray-900">Skills</h3>
        <p className="text-xs text-gray-500 mt-1">Add your technical and soft skills</p>
      </div>

      <form onSubmit={addSkill} className='flex gap-3'>
        <input 
          type='text' 
          className='flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none text-sm transition-all'
          placeholder='Enter a skill (e.g., JavaScript, Project Management)'
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
        <button 
          type="submit"
          className='px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-bold flex items-center gap-2 shadow-sm'
        >
          <Plus size={18} /> Add
        </button>
      </form>

      <div className='flex flex-wrap gap-x-2 gap-y-3'>
        {data.map((skill, index) => (
          <div 
            key={index} 
            className='flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-100 group hover:bg-blue-100 transition-all cursor-default'
          >
            <span className='text-sm font-medium tracking-tight whitespace-nowrap'>{skill}</span>
            <button 
              onClick={() => removeSkill(skill)}
              className='text-blue-400 hover:text-red-500 transition-colors'
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          </div>
        ))}
      </div>

      <div className='p-4 bg-sky-50/50 rounded-xl border border-sky-100 mt-2'>
        <p className='text-xs leading-relaxed text-blue-800'>
            <span className='font-bold'>Tip:</span> Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).
        </p>
      </div>
    </div>
  )
}

export default SkillsForm
