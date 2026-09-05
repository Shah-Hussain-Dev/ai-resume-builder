import React from "react";
import { Mail, Phone, MapPin, Linkedin, Globe, Code2 } from "lucide-react";

const TechnicalTemplate = ({ data, accentColor = "#2563EB" }) => {
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
    <div className="max-w-4xl mx-auto bg-white text-slate-900 shadow-sm leading-normal">
      {/* Top Accent Accent Line */}
      <div className="h-2 w-full rounded-t mb-6" style={{ backgroundColor: accentColor }} />

      {/* Header */}
      <header className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b pb-4 border-slate-200">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-1">
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            {data.personal_info?.profession && (
              <p className="text-base font-semibold" style={{ color: accentColor }}>
                {data.personal_info.profession}
              </p>
            )}
          </div>

          <div className="mt-3 sm:mt-0 text-xs sm:text-sm text-slate-600 space-y-1 sm:text-right">
            {data.personal_info?.email && (
              <div className="flex sm:justify-end items-center gap-1.5">
                <Mail className="size-3.5" style={{ color: accentColor }} />
                <span>{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex sm:justify-end items-center gap-1.5">
                <Phone className="size-3.5" style={{ color: accentColor }} />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex sm:justify-end items-center gap-1.5">
                <MapPin className="size-3.5" style={{ color: accentColor }} />
                <span>{data.personal_info.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Links row */}
        {(data.personal_info?.linkedin || data.personal_info?.website) && (
          <div className="flex flex-wrap gap-4 text-xs font-mono mt-2 text-slate-600">
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-1">
                <Linkedin className="size-3.5 text-slate-400" />
                <span className="break-all">{data.personal_info.linkedin}</span>
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-1">
                <Globe className="size-3.5 text-slate-400" />
                <span className="break-all">{data.personal_info.website}</span>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-2 flex items-center gap-2" style={{ color: accentColor }}>
            <Code2 className="size-4" /> // TECHNICAL SUMMARY
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">{data.professional_summary}</p>
        </section>
      )}

      {/* Technical Skills & Stack */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: accentColor }}>
            <Code2 className="size-4" /> // TECHNICAL SKILLS & STACK
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2.5 py-1 text-xs font-mono rounded bg-slate-100 text-slate-800 border border-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: accentColor }}>
            <Code2 className="size-4" /> // EXPERIENCE
          </h2>
          <div className="space-y-5">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative pl-4 border-l-2" style={{ borderColor: accentColor }}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{exp.position}</h3>
                    <p className="text-xs font-semibold" style={{ color: accentColor }}>
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                {exp.description && (
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line mt-2">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projectsList.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: accentColor }}>
            <Code2 className="size-4" /> // PROJECTS
          </h2>
          <div className="space-y-3">
            {projectsList.map((proj, index) => (
              <div key={index} className="p-3 bg-slate-50 rounded border border-slate-200">
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
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: accentColor }}>
            <Code2 className="size-4" /> // EDUCATION
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start text-xs sm:text-sm">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className="text-slate-600 font-medium">{edu.institution}</p>
                </div>
                <span className="font-mono text-slate-500">{formatDate(edu.graduation_date)}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default TechnicalTemplate;
