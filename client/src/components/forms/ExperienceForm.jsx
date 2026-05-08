import React from 'react'
import { Plus, Trash2, Sparkles } from 'lucide-react'
import { useAiEnhance } from '../../hooks/useAiEnhance'
import toast from 'react-hot-toast'

const parseDate = (dateStr) => {
  if (!dateStr) return '';
  if (dateStr.includes('/')) {
    const [month, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-01`;
  }
  if (dateStr.includes('-') && dateStr.length >= 7) {
    const parts = dateStr.split('-');
    if (parts.length === 3) return dateStr;
    return `${parts[0]}-${parts[1].padStart(2, '0')}-01`;
  }
  return '';
}

const formatDate = (dateStr) => {
  if (!dateStr || !dateStr.includes('-')) return '';
  const parts = dateStr.split('-');
  if (parts.length >= 2) {
    return `${parts[1]}/${parts[0]}`;
  }
  return '';
}

const ExperienceForm = ({ data = [], onChange }) => {
  const { enhanceText } = useAiEnhance();
  const [enhancingIndex, setEnhancingIndex] = React.useState(null);
  
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

  const handleDateChange = (index, field, value) => {
    handleChange(index, field, formatDate(value));
  }

  const handleAiEnhance = async (index) => {
    const description = data[index]?.description;
    if (!description) {
      toast.error('Please enter a job description first');
      return;
    }

    const enhanced = await enhanceText(description, 'job-description');
    if (enhanced) {
      handleChange(index, 'description', enhanced);
    }
  }

  const handleAiEnhanceWithIndex = async (index) => {
    setEnhancingIndex(index);
    await handleAiEnhance(index);
    setEnhancingIndex(null);
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
                <div>
                  <label className='text-xs font-medium text-gray-500 mb-1 block'>Company</label>
                  <input 
                  type='text' 
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none text-sm transition-all'
                  placeholder='Company Name'
                  value={exp.company}
                  onChange={(e) => handleChange(index, 'company', e.target.value)}
                  />
                </div>
                <div>
                  <label className='text-xs font-medium text-gray-500 mb-1 block'>Position</label>
                  <input 
                  type='text' 
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none text-sm transition-all'
                  placeholder='Job Title'
                  value={exp.position}
                  onChange={(e) => handleChange(index, 'position', e.target.value)}
                  />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='text-xs font-medium text-gray-500 mb-1 block'>Start Date</label>
                  <input
                  type='date'
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none text-sm transition-all'
                  value={parseDate(exp.start_date)}
                  onChange={(e) => handleDateChange(index, 'start_date', e.target.value)}
                  />
                </div>
                <div>
                  <label className='text-xs font-medium text-gray-500 mb-1 block'>End Date</label>
                  <input
                  type='date'
                  className='w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-300 focus:ring-4 focus:ring-blue-50 outline-none text-sm transition-all disabled:bg-gray-50'
                  disabled={exp.is_current}
                  placeholder={exp.is_current ? 'Present' : ''}
                  value={exp.is_current ? '' : parseDate(exp.end_date)}
                  onChange={(e) => handleDateChange(index, 'end_date', e.target.value)}
                  />
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
                <button
                  onClick={() => handleAiEnhanceWithIndex(index)}
                  disabled={enhancingIndex === index}
                  className='flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-all text-xs font-bold border border-purple-100 shadow-sm group disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  <Sparkles size={14} className={`${enhancingIndex === index ? 'animate-pulse' : ''} group-hover:scale-110 transition-transform text-purple-600`} />
                  <span>{enhancingIndex === index ? 'Enhancing...' : 'Enhance with AI'}</span>
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

