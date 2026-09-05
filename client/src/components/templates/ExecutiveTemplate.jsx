import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ExecutiveTemplate = ({ data, accentColor = "#1E3A8A" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr || dateStr === "Present") return "";
    let year, month;
    if (dateStr.includes("/")) {
      [month, year] = dateStr.split("/");
    } else if (dateStr.includes("-")) {
      [year, month] = dateStr.split("-");
    } else {
      return dateStr;
    }
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const projectsList = data.projects || data.project || [];

  return (
    <div className="max-w-4xl mx-auto bg-white text-slate-800 p-8 shadow-sm leading-normal font-sans">
      {/* Executive Header Banner */}
      <header className="border-b-2 pb-6 mb-6" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight uppercase mb-1" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Full Name"}
        </h1>
        {data.personal_info?.profession && (
          <p className="text-base sm:text-lg font-semibold text-slate-600 uppercase tracking-wide mb-4">
            {data.personal_info.profession}
          </p>
        )}

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-sm font-medium text-slate-600">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1.5">
              <Mail className="size-3.5" style={{ color: accentColor }} />
              <span>{data.personal_info.email}</span>
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1.5">
              <Phone className="size-3.5" style={{ color: accentColor }} />
              <span>{data.personal_info.phone}</span>
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="size-3.5" style={{ color: accentColor }} />
              <span>{data.personal_info.location}</span>
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1.5">
              <Linkedin className="size-3.5" style={{ color: accentColor }} />
              <span className="break-all">{data.personal_info.linkedin}</span>
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1.5">
              <Globe className="size-3.5" style={{ color: accentColor }} />
              <span className="break-all">{data.personal_info.website}</span>
            </div>
          )}
        </div>
      </header>

      {/* Executive Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-200" style={{ color: accentColor }}>
            EXECUTIVE SUMMARY
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed font-normal">{data.professional_summary}</p>
        </section>
      )}

      {/* Core Competencies / Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b border-slate-200" style={{ color: accentColor }}>
            CORE COMPETENCIES & SKILLS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 px-3 py-1.5 rounded border border-slate-200">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-4 pb-1 border-b border-slate-200" style={{ color: accentColor }}>
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp, index) => (
              <div key={index} className="space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{exp.position}</h3>
                    <p className="font-semibold text-sm" style={{ color: accentColor }}>
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded w-fit mt-1 sm:mt-0">
                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line pl-2 border-l-2 border-slate-200">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Projects */}
      {projectsList.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b border-slate-200" style={{ color: accentColor }}>
            KEY PROJECTS
          </h2>
          <div className="space-y-3">
            {projectsList.map((proj, index) => (
              <div key={index} className="bg-slate-50/70 p-3 rounded border border-slate-200">
                <h3 className="font-bold text-sm text-slate-900">{proj.name}</h3>
                {proj.description && <p className="text-xs text-slate-600 mt-1 leading-relaxed">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b border-slate-200" style={{ color: accentColor }}>
            EDUCATION & CREDENTIALS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.education.map((edu, index) => (
              <div key={index} className="space-y-0.5">
                <h3 className="font-bold text-sm text-slate-900">
                  {edu.degree} {edu.field && `in ${edu.field}`}
                </h3>
                <p className="text-xs text-slate-600 font-medium">{edu.institution}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                  <span>{formatDate(edu.graduation_date)}</span>
                  {edu.gpa && <span>GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ExecutiveTemplate;
