import React, { useState } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Zap,
  Target,
  ArrowRight,
  TrendingUp,
  Layers,
  Copy,
  Plus,
  BarChart3,
  Award,
  RefreshCw,
  Briefcase
} from 'lucide-react';
import toast from 'react-hot-toast';
import useAtsScore from '../../hooks/useAtsScore';

const JOB_PRESETS = [
  { title: "Full Stack Engineer", desc: "React, Node.js, Express, MongoDB, REST APIs, TypeScript, Docker, AWS" },
  { title: "Frontend Developer", desc: "React.js, Next.js, Redux, Tailwind CSS, JavaScript, Web Vitals, HTML5/CSS3" },
  { title: "Backend Developer", desc: "Node.js, Express, PostgreSQL, MongoDB, System Design, Microservices, Redis, JWT" },
  { title: "Software Engineer", desc: "Data Structures, Algorithms, Object-Oriented Design, Git, CI/CD, Problem Solving" }
];

const AtsScoreModal = ({ isOpen, onClose, resumeData, onUpdateSkills }) => {
  const { calculateAtsScore, loading, atsResult, clearResult } = useAtsScore();
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // overview, keywords, suggestions

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    await calculateAtsScore({
      resumeData,
      jobTitle,
      jobDescription
    });
  };

  const handleApplyPreset = (preset) => {
    setJobTitle(preset.title);
    setJobDescription(`Looking for a ${preset.title} skilled in ${preset.desc}. Responsible for building scalable web applications, optimizing performance, collaborating with cross-functional teams, and maintaining clean code.`);
  };

  const copyKeyword = (keyword) => {
    navigator.clipboard.writeText(keyword);
    toast.success(`Copied "${keyword}" to clipboard!`);
  };

  const handleAddSkillToResume = (keyword) => {
    if (onUpdateSkills && resumeData) {
      const currentSkills = Array.isArray(resumeData.skills) ? resumeData.skills : [];
      if (!currentSkills.includes(keyword)) {
        onUpdateSkills([...currentSkills, keyword]);
        toast.success(`Added "${keyword}" to skills list!`);
      } else {
        toast.error(`"${keyword}" is already in your skills list.`);
      }
    }
  };

  // Helper for circular progress
  const getScoreColor = (score) => {
    if (score >= 80) return { text: 'text-emerald-500', bg: 'bg-emerald-500', border: 'border-emerald-500', gradient: 'from-emerald-500 to-teal-600', ring: '#10B981' };
    if (score >= 60) return { text: 'text-amber-500', bg: 'bg-amber-500', border: 'border-amber-500', gradient: 'from-amber-500 to-orange-600', ring: '#F59E0B' };
    return { text: 'text-rose-500', bg: 'bg-rose-500', border: 'border-rose-500', gradient: 'from-rose-500 to-red-600', ring: '#EF4444' };
  };

  const overallScore = atsResult?.overallScore || 0;
  const scoreTheme = getScoreColor(overallScore);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-500/20">
              <Award className="size-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                ATS Score & AI Optimizer
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white uppercase tracking-wider">
                  Gemini AI
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Check ATS compatibility, keyword density, and get actionable recommendations.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Target Job Setup Card */}
          <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-white/10 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Target className="size-4 text-blue-500" /> Target Job Details (Optional for Targeted Matching)
              </label>
              {atsResult && (
                <button
                  onClick={() => clearResult()}
                  className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="size-3" /> Re-run Scan
                </button>
              )}
            </div>

            {/* Quick Job Presets */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              <span className="text-[11px] font-semibold text-slate-500 shrink-0">Quick Presets:</span>
              {JOB_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPreset(preset)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-300 transition shrink-0"
                >
                  {preset.title}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Target Job Title (e.g. Senior Full Stack Developer)"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Paste Job Description / Requirements"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="md:col-span-2 w-full px-3.5 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="btn-royal-ai flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-md disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="size-4 animate-spin" />
                    <span>Analyzing Resume with Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    <span>{atsResult ? 'Re-Evaluate ATS Score' : 'Calculate ATS Score Now'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Dashboard */}
          {atsResult ? (
            <div className="space-y-6">
              
              {/* Top Summary Banner */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-3xl p-6 shadow-xl border border-white/10 items-center">
                
                {/* Score Gauge Circle */}
                <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
                  <div className="relative w-36 h-36 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-800"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={`${scoreTheme.text} transition-all duration-1000 ease-out`}
                        strokeDasharray={`${overallScore}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-4xl font-extrabold tracking-tight">{overallScore}</span>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">Out of 100</span>
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-gradient-to-r ${scoreTheme.gradient}`}>
                      {overallScore >= 80 ? 'Excellent ATS Ready' : overallScore >= 60 ? 'Good Match' : 'Needs Optimization'}
                    </span>
                  </div>
                </div>

                {/* Score Summary & Key Takeaways */}
                <div className="md:col-span-8 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    <TrendingUp className="size-4" /> AI Executive Summary
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-normal">
                    {atsResult.summary || "Your resume has been analyzed against ATS parser rules."}
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-xs">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                      <p className="text-slate-400 text-[10px] uppercase font-bold">Matched Keywords</p>
                      <p className="text-lg font-bold text-emerald-400">{atsResult.matchedKeywords?.length || 0}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
                      <p className="text-slate-400 text-[10px] uppercase font-bold">Missing Keywords</p>
                      <p className="text-lg font-bold text-amber-400">{atsResult.missingKeywords?.length || 0}</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 text-center col-span-2 sm:col-span-1">
                      <p className="text-slate-400 text-[10px] uppercase font-bold">Key Action Items</p>
                      <p className="text-lg font-bold text-blue-400">{atsResult.suggestions?.length || 0}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-Scores Breakdown Cards */}
              {atsResult.scoreBreakdown && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <BarChart3 className="size-4 text-blue-500" /> Metric Breakdown
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {Object.entries(atsResult.scoreBreakdown).map(([key, val]) => {
                      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                      return (
                        <div key={key} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-3 shadow-sm space-y-1.5">
                          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">{label}</p>
                          <div className="flex items-baseline justify-between">
                            <span className="text-xl font-black text-slate-900 dark:text-white">{val}%</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${val >= 80 ? 'bg-emerald-500' : val >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                              style={{ width: `${val}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Detail Tabs */}
              <div className="border-b border-slate-200 dark:border-white/10 flex gap-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2.5 text-xs font-bold border-b-2 transition ${
                    activeTab === 'overview'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  Strengths & Gaps
                </button>
                <button
                  onClick={() => setActiveTab('keywords')}
                  className={`pb-2.5 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
                    activeTab === 'keywords'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <span>Keyword Matrix</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    {(atsResult.matchedKeywords?.length || 0) + (atsResult.missingKeywords?.length || 0)}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('suggestions')}
                  className={`pb-2.5 text-xs font-bold border-b-2 transition flex items-center gap-1.5 ${
                    activeTab === 'suggestions'
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  <span>Action Plan</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">
                    {atsResult.suggestions?.length || 0}
                  </span>
                </button>
              </div>

              {/* Tab 1: Strengths & Gaps */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Strengths Card */}
                  <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-500/20 rounded-2xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-emerald-600" /> Resume Strengths
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      {atsResult.strengths?.map((str, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 mt-0.5">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses Card */}
                  <div className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-500/20 rounded-2xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wider flex items-center gap-2">
                      <AlertTriangle className="size-4 text-rose-600" /> Red Flags & Gaps
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      {atsResult.weaknesses?.map((weak, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-500 mt-0.5">•</span>
                          <span>{weak}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tab 2: Keyword Matrix */}
              {activeTab === 'keywords' && (
                <div className="space-y-4">
                  {/* Matched Keywords */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-4 space-y-2.5">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-2 text-emerald-600">
                        <CheckCircle2 className="size-4" /> Matched Industry Keywords
                      </span>
                      <span className="text-[11px] font-normal text-slate-500">
                        {atsResult.matchedKeywords?.length || 0} Found
                      </span>
                    </h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {atsResult.matchedKeywords?.map((kw, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-500/30 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="size-3 text-emerald-500" />
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing Keywords */}
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-4 space-y-2.5">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-2 text-amber-600">
                        <AlertTriangle className="size-4" /> Recommended Missing Keywords
                      </span>
                      <span className="text-[11px] font-normal text-slate-500">
                        Click '+' to add to skills or copy
                      </span>
                    </h4>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {atsResult.missingKeywords?.map((kw, idx) => (
                        <div
                          key={idx}
                          className="group px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-500/30 flex items-center gap-2 transition"
                        >
                          <span>{kw}</span>
                          <div className="flex items-center gap-1">
                            {onUpdateSkills && (
                              <button
                                onClick={() => handleAddSkillToResume(kw)}
                                title="Add to resume skills"
                                className="p-1 hover:bg-amber-200/60 dark:hover:bg-amber-900/60 rounded-md transition text-amber-900 dark:text-amber-200"
                              >
                                <Plus className="size-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => copyKeyword(kw)}
                              title="Copy keyword"
                              className="p-1 hover:bg-amber-200/60 dark:hover:bg-amber-900/60 rounded-md transition text-slate-500"
                            >
                              <Copy className="size-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Actionable Suggestions */}
              {activeTab === 'suggestions' && (
                <div className="space-y-3">
                  {atsResult.suggestions?.map((item, idx) => {
                    const isHigh = item.priority === 'high';
                    const isMed = item.priority === 'medium';
                    return (
                      <div
                        key={idx}
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-sm space-y-2 flex items-start gap-3"
                      >
                        <div
                          className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                            isHigh
                              ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400'
                              : isMed
                              ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400'
                              : 'bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                          }`}
                        >
                          <Zap className="size-4" />
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                              {item.category || 'Optimization'}
                            </span>
                            <span
                              className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${
                                isHigh
                                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/60 dark:text-rose-300'
                                  : isMed
                                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
                                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
                              }`}
                            >
                              {item.priority || 'Medium'} Priority
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {item.recommendation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          ) : (
            /* Initial State Before Evaluation */
            <div className="py-12 text-center space-y-3 bg-slate-50/50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-white/10">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <FileCheck className="size-8" />
              </div>
              <div className="max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Ready for ATS Optimization Scan</h3>
                <p className="text-xs text-slate-500">
                  Optional: Paste your target Job Description above or click "Calculate ATS Score Now" to perform a general ATS quality scan.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Powered by Google Gemini 2.5 AI
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

export default AtsScoreModal;
