import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReusmePreview from '../components/resume/ReusmePreview';
import Loader from '../components/loader/Loader';
import API from '../config/api';
import ThemeToggle from '../components/common/ThemeToggle';
import { Sparkles, ArrowLeft, Download, ShieldCheck } from 'lucide-react';

const Preview = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const loadResumeData = async () => {
    try {
      setIsLoading(true);
      const { data } = await API.post(`api/resumes/public/${resumeId}`);
      if (data?.success && data?.data?.resume) {
        setResumeData(data.data.resume);
      } else {
        setError('Resume not found or private');
      }
    } catch (err) {
      console.error('Error loading resume:', err);
      setError('Resume not found or private');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResumeData();
  }, [resumeId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white flex flex-col transition-colors duration-300">
      {/* Top Glassmorphic Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-[#090D16]/90 backdrop-blur-xl border-b border-slate-200 dark:border-blue-500/15 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-9 rounded-xl bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 p-0.5 shadow-md shadow-blue-600/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="size-4 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">AI Resume</span>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20">
              <ShieldCheck className="size-3.5 text-blue-600 dark:text-blue-400" /> Verified Public Resume
            </span>

            {resumeData && (
              <button
                onClick={handlePrint}
                className="btn-royal-gradient flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
              >
                <Download className="size-3.5" />
                <span>Download PDF</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-10 px-4 max-w-4xl mx-auto w-full">
        {isLoading ? (
          <Loader />
        ) : resumeData ? (
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
            <ReusmePreview
              resumeData={resumeData}
              template={resumeData.template || 'minimal-image'}
              accentColor={resumeData.accent_color || '#2563EB'}
              classes="bg-white text-slate-900"
            />
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-12 text-center border border-slate-200 dark:border-white/10 max-w-md mx-auto my-20 flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Resume Not Found</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              This resume might be private or may have been deleted by the owner.
            </p>
            <Link
              to="/"
              className="btn-royal-gradient inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold"
            >
              <ArrowLeft className="size-4" /> Return to Home
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Preview;