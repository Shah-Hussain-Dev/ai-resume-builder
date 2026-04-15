import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets';
import ReusmePreview from '../components/resume/ReusmePreview';
import Loader from '../components/loader/Loader';

const Preview = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const loadResumeData = async () => {
    setResumeData(dummyResumeData.find(resume => resume._id === resumeId || null));
    setIsLoading(false);
  }

  useEffect(() => {
    loadResumeData();
  }, [resumeId]);

  return resumeData ? (
    <div className='bg-slate-100'>
      <div className='max-w-3xl mx-auto py-10'>
        <ReusmePreview resumeData={resumeData} template={resumeData.template} accentColor={resumeData.accentColor} classes='py-4 bg-white' />
      </div>
    </div>
  ) : (
    <div>
      {
        isLoading ? (<Loader />) : (
          <div className='h-screen flex flex-col items-center justify-center'>
            <h1 className='text-2xl font-bold text-center mt-10'>Resume not found</h1>
            <Link to='/' className='text-blue-500 text-center block mt-4'>Go back to home</Link>
          </div>)
      }
    </div>
  )
}

export default Preview