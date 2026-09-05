import { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import API from '../config/api';

export const useAtsScore = () => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [atsResult, setAtsResult] = useState(null);

  const calculateAtsScore = async ({ resumeData, resumeText, jobDescription, jobTitle }) => {
    if (!resumeData && !resumeText) {
      toast.error('Resume data is required for ATS scoring');
      return null;
    }

    try {
      setLoading(true);

      const payload = {
        resumeData,
        resumeText,
        jobDescription: jobDescription || '',
        jobTitle: jobTitle || '',
      };

      const { data } = await API.post('api/ai/ats-score', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data?.success && data?.data) {
        setAtsResult(data.data);
        toast.success(data.message || 'ATS Score generated successfully!');
        return data.data;
      } else {
        toast.error('Failed to get valid ATS evaluation');
        return null;
      }
    } catch (error) {
      console.error('ATS Scoring error:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to calculate ATS score';
      toast.error(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearResult = () => {
    setAtsResult(null);
  };

  return { calculateAtsScore, loading, atsResult, setAtsResult, clearResult };
};

export default useAtsScore;
