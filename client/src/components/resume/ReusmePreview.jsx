import React from 'react'
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import MinimalImageTemplate from '../templates/MinimalImageTemplate';

const ReusmePreview = ({resumeData, template, accentColor, classes=""}) => {
    if (!resumeData) return null;

    const renderTemplate = () => {
        switch (template) {
            case "modern":
                return <ModernTemplate data={resumeData} accentColor={accentColor} />;
            case "minimal-image":
                return <MinimalImageTemplate data={resumeData} accentColor={accentColor} />;
            case "minimal":
                return <MinimalTemplate data={resumeData} accentColor={accentColor} />;
            default:
                return <ClassicTemplate data={resumeData} accentColor={accentColor} />;
        }
    }
  return (
    <div className='w-full bg-gray-100'>
        <style>{`
            @media print {
                body * {
                    visibility: hidden;
                }
                #resume-preview, #resume-preview * {
                    visibility: visible;
                }
                #resume-preview {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    padding: 20px;
                    box-shadow: none !important;
                    border: none !important;
                    background: white !important;
                }
                body {
                    background: white !important;
                }
            }
        `}</style>
        <div id='resume-preview' className={`${classes} border border-gray-200 print:shadow-none print-border-none`}>
            {renderTemplate()}
        </div>
    </div>
  )
}

export default ReusmePreview