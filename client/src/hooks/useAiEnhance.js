import { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import API from '../config/api';

export const useAiEnhance = () => {
  const { token } = useSelector((state) => state.auth);
  const [enhancing, setEnhancing] = useState(false);

  const enhanceText = async (content, type = 'professional-summary') => {
    if (!content || content.trim().length === 0) {
      toast.error('Please enter some content to enhance');
      return null;
    }

    try {
      setEnhancing(true);

      let endpoint;
      let payload;

      switch (type) {
        case 'job-description':
          endpoint = 'api/ai/enhance-job-desc';
          payload = { userContent: content };
          break;
        case 'project-description':
          endpoint = 'api/ai/enhance-project-desc';
          payload = { userContent: content };
          break;
        default:
          endpoint = 'api/ai/enhance-pro-sum';
          payload = { userContent: content };
      }

      const { data } = await API.post(endpoint, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data?.success) {
        toast.success(data.message || 'Content enhanced successfully');
        return data.data;
      }

      return null;
    } catch (error) {
      console.error('AI Enhancement error:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Failed to enhance content';
      
      if (errorMsg.includes('clipboard') || errorMsg.includes('image input')) {
        toast.error('Image input not supported. Please use text only.');
      } else {
        toast.error(errorMsg);
      }
      return null;
    } finally {
      setEnhancing(false);
    }
  };

  return { enhanceText, enhancing };
};

export default useAiEnhance;