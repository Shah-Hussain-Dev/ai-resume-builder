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
    containerId = "resume-preview",
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

    const fontFamilyStyle = fontMap[customSettings?.font_family] || fontMap["Plus Jakarta Sans"];

    // Base & Heading font sizes (pt)
    const baseFontSizePt = customSettings?.base_font_size ?? 10;
    const nameFontSizePt = baseFontSizePt + (customSettings?.name_font_size ?? 5);
    const titleFontSizePt = baseFontSizePt + (customSettings?.title_font_size ?? 2);
    const headingFontSizePt = baseFontSizePt + (customSettings?.heading_font_size ?? 1);
    const entryHeaderSizePt = baseFontSizePt + (customSettings?.entry_header_font_size ?? 0);

    // Spacing & Margins
    const lineHeightVal = customSettings?.line_height_val ?? 1.3;
    const spaceBetweenPx = customSettings?.space_between_elements ?? 10;
    const marginLRPx = customSettings?.margin_lr ?? 10;
    const marginTBPx = customSettings?.margin_tb ?? 10;

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
            <style>{`
                #${containerId}, #${containerId} * {
                    font-family: ${fontFamilyStyle} !important;
                }
                #${containerId} {
                    line-height: ${lineHeightVal} !important;
                    font-size: ${baseFontSizePt}pt !important;
                    padding: ${marginTBPx}mm ${marginLRPx}mm !important;
                }
                #${containerId} h1 {
                    font-size: ${nameFontSizePt}pt !important;
                }
                #${containerId} p.profession, #${containerId} .profession-title {
                    font-size: ${titleFontSizePt}pt !important;
                }
                #${containerId} h2 {
                    font-size: ${headingFontSizePt}pt !important;
                    margin-bottom: ${Math.max(2, spaceBetweenPx * 0.4)}px !important;
                }
                #${containerId} h3, #${containerId} h4, #${containerId} .entry-header {
                    font-size: ${entryHeaderSizePt}pt !important;
                }
                #${containerId} section, #${containerId} header {
                    margin-bottom: ${spaceBetweenPx}px !important;
                }
            `}</style>
            <div
                id={containerId}
                className={`${classes} transition-all duration-200`}
                style={{
                    fontFamily: fontFamilyStyle,
                    lineHeight: lineHeightVal,
                    fontSize: `${baseFontSizePt}pt`,
                    padding: `${marginTBPx}mm ${marginLRPx}mm`,
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
        <div className="w-full flex justify-center items-start overflow-x-auto">
            <style>{`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #${containerId}, #${containerId} * {
                        visibility: visible;
                    }
                    #${containerId} {
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