import React from 'react'
import { Plus, Trash2, Calendar, Sparkles } from 'lucide-react'

const ExperienceForm = ({ data = [], onChange }) => {
  const addExperience = () => {
    onChange([...data, {
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      description: '',
      is_current: false
    }]);
  }

  const removeExperience = (index) => {
    const newData = data.filter((_, i) => i !== index);
    onChange(newData);
  }

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  }

  return (
    <div className='space-y-6 animate-in fade-in duration-500'>
      <div className='flex justify-between items-center px-1'>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Professional Experience</h3>
          <p className="text-xs text-gray-500 mt-1">Add your job experience</p>
        </div>
        <button 
          onClick={addExperience}
          className='flex items-center gap-2 px-6 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all text-sm font-bold border border-blue-100'
        >
          <Plus size={18} /> Add Experience
        </button>
      </div>

      <div className='space-y-6'>
        {data.map((exp, index) => (
          <div key={index} className='p-6 border border-gray-100 rounded-2xl space-y-5 relative bg-white shadow-sm'>
            <div className='flex justify-between items-center'>
                <h4 className='font-bold text-gray-800 tracking-tight'>Experience #{index + 1}</h4>
                <button 
                onClick={() => removeExperience(index)}
                className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                >
                <Trash2 size={18} />
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <input 
                type='text' 
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none text-sm transition-all'
                placeholder='Example Technologies.'
                value={exp.company}
                onChange={(e) => handleChange(index, 'company', e.target.value)}
                />
                <input 
                type='text' 
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none text-sm transition-all'
                placeholder='Full Stack Developer'
                value={exp.position}
                onChange={(e) => handleChange(index, 'position', e.target.value)}
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='relative'>
                    <input 
                    type='month' 
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none text-sm cursor-pointer transition-all pr-12'
                    value={exp.start_date}
                    onChange={(e) => handleChange(index, 'start_date', e.target.value)}
                    />
                    <Calendar size={18} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' />
                </div>
                <div className='relative'>
                    <input 
                    type='month' 
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none text-sm disabled:bg-gray-50 disabled:text-gray-300 transition-all pr-12'
                    disabled={exp.is_current}
                    value={exp.is_current ? '' : exp.end_date}
                    onChange={(e) => handleChange(index, 'end_date', e.target.value)}
                    placeholder='----------, ----'
                    />
                     <Calendar size={18} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' />
                </div>
            </div>

            <div className='flex items-center gap-2'>
              <input 
                type='checkbox' 
                id={`current-${index}`}
                className='w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer'
                checked={exp.is_current}
                onChange={(e) => handleChange(index, 'is_current', e.target.checked)}
              />
              <label htmlFor={`current-${index}`} className='text-sm font-medium text-gray-600 cursor-pointer'>Currently working here</label>
            </div>

            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <label className='text-sm font-bold text-gray-700 font-medium'>Job Description</label>
                <button className='flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-all text-xs font-bold border border-purple-100 shadow-sm group'>
                  <Sparkles size={14} className='group-hover:scale-110 transition-transform text-purple-600' />
                  <span>Enhance with AI</span>
                </button>
              </div>
              <textarea 
                className='w-full p-5 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all min-h-[140px] resize-none text-sm text-gray-700'
                placeholder='Describe your achievements and responsibilities...'
                value={exp.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className='text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200'>
            <p className='text-gray-400 text-sm'>No experience added yet. Click the button above to start.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ExperienceForm

