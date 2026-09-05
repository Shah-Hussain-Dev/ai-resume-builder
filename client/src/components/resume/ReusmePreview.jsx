import React from 'react'
import ClassicTemplate from '../templates/ClassicTemplate';
import ModernTemplate from '../templates/ModernTemplate';
import MinimalTemplate from '../templates/MinimalTemplate';
import MinimalImageTemplate from '../templates/MinimalImageTemplate';
import ExecutiveTemplate from '../templates/ExecutiveTemplate';
import TechnicalTemplate from '../templates/TechnicalTemplate';

const ReusmePreview = ({
    resumeData,
    template,
    accentColor,
    customSettings = {},
    classes = "",
    hideOuterWrapper = false,
    showFooter = true,
}) => {
    if (!resumeData) return null;

    const fontMap = {
        "Plus Jakarta Sans": "'Plus Jakarta Sans', sans-serif",
        "Inter": "'Inter', sans-serif",
        "Roboto": "'Roboto', sans-serif",
        "Outfit": "'Outfit', sans-serif",
        "Merriweather": "'Merriweather', serif",
        "Georgia": "'Georgia', serif",
        "Courier Prime": "'Courier Prime', monospace",
    };

    const fontFamilyStyle = fontMap[customSettings.font_family] || fontMap["Plus Jakarta Sans"];

    const fontSizeClass =
        customSettings.font_size === "small"
            ? "text-[12px]"
            : customSettings.font_size === "large"
            ? "text-[15px]"
            : "text-[13.5px]";

    const lineHeightStyle =
        customSettings.line_height === "compact"
            ? "1.35"
            : customSettings.line_height === "relaxed"
            ? "1.75"
            : "1.5";

    const paddingClass =
        customSettings.paper_padding === "compact"
            ? "p-4 sm:p-6"
            : customSettings.paper_padding === "wide"
            ? "p-8 sm:p-14"
            : "p-6 sm:p-10";

    const renderTemplate = () => {
        switch (template) {
            case "executive":
                return <ExecutiveTemplate data={resumeData} accentColor={accentColor} />;
            case "technical":
                return <TechnicalTemplate data={resumeData} accentColor={accentColor} />;
            case "modern":
                return <ModernTemplate data={resumeData} accentColor={accentColor} />;
            case "minimal-image":
                return <MinimalImageTemplate data={resumeData} accentColor={accentColor} />;
            case "minimal":
                return <MinimalTemplate data={resumeData} accentColor={accentColor} />;
            default:
                return <ClassicTemplate data={resumeData} accentColor={accentColor} />;
        }
    };

    const paperContent = (
        <div className="w-full max-w-[210mm] min-h-[297mm] bg-white text-slate-900 shadow-2xl shadow-slate-950/30 ring-1 ring-slate-900/10 rounded-sm relative transition-all duration-300 mx-auto">
            <div
                id="resume-preview"
                className={`${classes} ${paddingClass} ${fontSizeClass} transition-all duration-200`}
                style={{
                    fontFamily: fontFamilyStyle,
                    lineHeight: lineHeightStyle,
                }}
            >
                {renderTemplate()}
            </div>

            {showFooter && (
                <div className="print:hidden border-t border-slate-100 px-6 py-2.5 bg-slate-50 text-[11px] text-slate-400 font-mono flex items-center justify-between rounded-b-sm">
                    <span className="flex items-center gap-1.5 font-medium text-slate-500">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" /> A4 Standard Printable Page
                    </span>
                    <span>Page 1 of 1</span>
                </div>
            )}
        </div>
    );

    if (hideOuterWrapper) {
        return paperContent;
    }

    return (
        <div className="w-full bg-slate-200/80 dark:bg-slate-950/90 p-4 sm:p-8 flex justify-center items-start min-h-[900px] overflow-x-auto">
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
            {paperContent}
        </div>
    );
};

export default ReusmePreview;