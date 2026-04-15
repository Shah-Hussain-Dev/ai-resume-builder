import React from 'react'
import { Plus, Trash2, Calendar } from 'lucide-react'

const EducationForm = ({ data = [], onChange }) => {
  const addEducation = () => {
    onChange([...data, {
      institution: '',
      degree: '',
      field: '',
      graduation_date: '',
      gpa: ''
    }]);
  }

  const removeEducation = (index) => {
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
          <h3 className="text-xl font-bold text-gray-900">Education</h3>
          <p className="text-xs text-gray-500 mt-1">Add your education details</p>
        </div>
        <button 
          onClick={addEducation}
          className='flex items-center gap-2 px-6 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-all text-sm font-bold border border-emerald-100 shadow-sm'
        >
          <Plus size={18} /> Add Education
        </button>
      </div>

      <div className='space-y-6'>
        {data.map((edu, index) => (
          <div key={index} className='p-6 border border-gray-100 rounded-2xl space-y-5 relative bg-white shadow-sm'>
            <div className='flex justify-between items-center'>
                <h4 className='font-bold text-gray-800 tracking-tight'>Education #{index + 1}</h4>
                <button 
                onClick={() => removeEducation(index)}
                className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                >
                <Trash2 size={18} />
                </button>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <input 
                type='text' 
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none text-sm transition-all'
                placeholder='Institution Name'
                value={edu.institution}
                onChange={(e) => handleChange(index, 'institution', e.target.value)}
                />
                <input 
                type='text' 
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none text-sm transition-all'
                placeholder="Degree (e.g., Bachelor's, Master's)"
                value={edu.degree}
                onChange={(e) => handleChange(index, 'degree', e.target.value)}
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <input 
                type='text' 
                className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none text-sm transition-all'
                placeholder='Field of Study'
                value={edu.field}
                onChange={(e) => handleChange(index, 'field', e.target.value)}
                />
                <div className='relative'>
                    <input 
                    type='month' 
                    className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none text-sm cursor-pointer transition-all pr-12'
                    value={edu.graduation_date}
                    onChange={(e) => handleChange(index, 'graduation_date', e.target.value)}
                    placeholder='----------, ----'
                    />
                    <Calendar size={18} className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none' />
                </div>
            </div>

            <div className='w-full md:w-1/2 pr-2'>
                <input 
                  type='text' 
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none text-sm transition-all'
                  placeholder='GPA (optional)'
                  value={edu.gpa}
                  onChange={(e) => handleChange(index, 'gpa', e.target.value)}
                />
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className='text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200'>
            <p className='text-gray-400 text-sm'>No education added yet. Click the button above to start.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EducationForm
