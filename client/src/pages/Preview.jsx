import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReusmePreview from '../components/resume/ReusmePreview';
import Loader from '../components/loader/Loader';
import API from '../config/api';

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
        setError('Resume not found');
      }
    } catch (err) {
      console.error('Error loading resume:', err);
      setError('Resume not found');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadResumeData();
  }, [resumeId]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : resumeData ? (
        <div className='bg-slate-100 min-h-screen'>
          <div className='max-w-3xl mx-auto py-10'>
            <ReusmePreview 
              resumeData={resumeData} 
              template={resumeData.template || 'minimal-image'} 
              accentColor={resumeData.accent_color || '#14B8A6'} 
              classes='py-4 bg-white' 
            />
          </div>
        </div>
      ) : (
        <div className='h-screen flex flex-col items-center justify-center'>
          <h1 className='text-2xl font-bold text-center mt-10'>Resume not found</h1>
          <Link to='/' className='text-blue-500 text-center block mt-4'>Go back to home</Link>
        </div>
      )}
    </div>
  )
}

export default Preview