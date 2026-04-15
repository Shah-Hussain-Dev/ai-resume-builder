import React from 'react'
import { Plus, Trash2, Folder, Link as LinkIcon } from 'lucide-react'

const ProjectsForm = ({ data = [], onChange }) => {
  const addProject = () => {
    onChange([...data, {
      name: '',
      type: '',
      description: '',
      link: ''
    }]);
  }

  const removeProject = (index) => {
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
      <div className='flex justify-between items-center'>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Projects</h3>
          <p className="text-sm text-gray-500 mt-1">Showcase your best work and personal projects</p>
        </div>
        <button 
          onClick={addProject}
          className='flex items-center gap-2 px-6 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-all text-sm font-bold border border-blue-100'
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      <div className='space-y-6'>
        {data.map((project, index) => (
          <div key={index} className='p-5 border border-gray-200 rounded-xl space-y-4 relative bg-white shadow-sm hover:shadow-md transition-shadow'>
            <button 
              onClick={() => removeProject(index)}
              className='absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors'
            >
              <Trash2 size={18} />
            </button>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <label className='text-xs font-semibold uppercase text-gray-500'>Project Name</label>
                <div className='relative'>
                  <Folder size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input 
                    type='text' 
                    className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm'
                    placeholder='Project Name'
                    value={project.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)}
                  />
                </div>
              </div>
              <div className='space-y-2'>
                <label className='text-xs font-semibold uppercase text-gray-500'>Project Type</label>
                <input 
                  type='text' 
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm'
                  placeholder='Full Stack App / Design'
                  value={project.type}
                  onChange={(e) => handleChange(index, 'type', e.target.value)}
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-xs font-semibold uppercase text-gray-500'>Project Link (Optional)</label>
              <div className='relative'>
                <LinkIcon size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                <input 
                  type='text' 
                  className='w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm'
                  placeholder='https://github.com/yourproject'
                  value={project.link || ''}
                  onChange={(e) => handleChange(index, 'link', e.target.value)}
                />
              </div>
            </div>

            <div className='space-y-2'>
              <label className='text-xs font-semibold uppercase text-gray-500'>Description</label>
              <textarea 
                className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm min-h-[100px] resize-none'
                placeholder='Tell us about what you built and the technologies used...'
                value={project.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
              />
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className='text-center py-10 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200'>
            <p className='text-gray-500 text-sm'>No projects added yet. Click the button above to start.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectsForm
