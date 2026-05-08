import React from 'react'
import { Sparkles } from 'lucide-react'
import { useAiEnhance } from '../../hooks/useAiEnhance'

const ProfessionalSummaryForm = ({ data, onChange }) => {
  const { enhanceText, enhancing } = useAiEnhance();

  const handleAiEnhance = async () => {
    const enhanced = await enhanceText(data, 'professional-summary');
    if (enhanced) {
      onChange(enhanced);
      // Auto-select the enhanced text
      const textarea = document.querySelector('textarea[name="professional-summary"]');
      if (textarea) {
        textarea.select();
      }
    }
  };

  return (
    <div className='space-y-5 animate-in fade-in duration-500'>
      <div className='flex justify-between items-start'>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Professional Summary</h3>
          <p className="text-sm text-gray-500 mt-1">Add summary for your resume here</p>
        </div>
        <button
          onClick={handleAiEnhance}
          disabled={enhancing || !data}
          className='flex items-center gap-2 px-4 py-1.5 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-all text-sm font-semibold border border-purple-100 shadow-sm group disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <Sparkles size={16} className={`${enhancing ? 'animate-pulse' : ''} group-hover:scale-110 transition-transform text-purple-600`} />
          <span>{enhancing ? 'Enhancing...' : 'AI Enhance'}</span>
        </button>
      </div>

      <div className="space-y-3">
        <textarea
          name="professional-summary"
          className="w-full p-6 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 transition-all min-h-[180px] resize-none text-gray-700 bg-white shadow-sm placeholder:text-gray-300"
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
        />

        <p className='text-xs text-gray-500 text-center px-4 leading-relaxed'>
          Tip: Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
        </p>
      </div>
    </div>
  )
}

export default ProfessionalSummaryForm
