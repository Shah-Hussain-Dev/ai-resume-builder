import React from "react";

const ClassicTemplate = ({ data, accentColor = "#003366" }) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === "Present") return "Present";
        let year, month;
        
        if (dateStr.includes("/")) {
            [month, year] = dateStr.split("/");
        } else if (dateStr.includes("-")) {
            [year, month] = dateStr.split("-");
        } else {
            return dateStr;
        }
        
        if (month && year) {
            const formattedMonth = month.padStart(2, "0");
            return `${formattedMonth}/${year}`;
        }
        return dateStr;
    };

    const projectsList = data.projects || data.project || [];

    // Helper to format bullets from description string
    const renderBullets = (text) => {
        if (!text) return null;
        const lines = text
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

        if (lines.length === 0) return null;

        return (
            <ul className="mt-1 space-y-1 text-sm text-gray-800">
                {lines.map((line, idx) => {
                    const cleanLine = line.replace(/^[•\-\*]\s*/, "");
                    return (
                        <li key={idx} className="flex items-start gap-2 leading-snug">
                            <span className="select-none font-bold text-gray-900">•</span>
                            <span>{cleanLine}</span>
                        </li>
                    );
                })}
            </ul>
        );
    };

    // Format contact items separated by pipes
    const contactItems = [];
    if (data.personal_info?.email) contactItems.push(data.personal_info.email);
    if (data.personal_info?.phone) contactItems.push(data.personal_info.phone);
    if (data.personal_info?.location) contactItems.push(data.personal_info.location);
    if (data.personal_info?.github) contactItems.push(data.personal_info.github);
    if (data.personal_info?.linkedin) contactItems.push(data.personal_info.linkedin);
    if (data.personal_info?.website) contactItems.push(data.personal_info.website);

    return (
        <div className="max-w-4xl mx-auto bg-white text-gray-900 leading-normal">
            {/* Header */}
            <header className="text-center mb-6 pb-3 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-3xl font-extrabold uppercase tracking-wide mb-1" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "YOUR NAME"}
                </h1>

                {data.personal_info?.profession && (
                    <p className="text-base font-bold text-gray-800 mb-1.5">
                        {data.personal_info.profession}
                    </p>
                )}

                {contactItems.length > 0 && (
                    <div className="text-xs sm:text-sm text-gray-700 font-medium flex flex-wrap justify-center items-center gap-x-2 gap-y-1">
                        {contactItems.map((item, idx) => (
                            <React.Fragment key={idx}>
                                {idx > 0 && <span className="text-gray-400 font-normal">|</span>}
                                <span>{item}</span>
                            </React.Fragment>
                        ))}
                    </div>
                )}
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-5">
                    <h2
                        className="text-base font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
                        style={{ color: accentColor, borderColor: accentColor }}
                    >
                        PROFESSIONAL SUMMARY
                    </h2>
                    <p className="text-sm text-gray-800 leading-relaxed text-justify">
                        {data.professional_summary}
                    </p>
                </section>
            )}

            {/* Technical Skills */}
            {data.skills && data.skills.length > 0 && (
                <section className="mb-5">
                    <h2
                        className="text-base font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
                        style={{ color: accentColor, borderColor: accentColor }}
                    >
                        TECHNICAL SKILLS
                    </h2>
                    <div className="space-y-1 text-sm text-gray-800">
                        {data.skills.map((skill, index) => {
                            if (typeof skill === "string" && skill.includes(":")) {
                                const [category, ...rest] = skill.split(":");
                                return (
                                    <div key={index} className="leading-snug">
                                        <span className="font-bold text-gray-900">{category.trim()}:</span>{" "}
                                        <span>{rest.join(":").trim()}</span>
                                    </div>
                                );
                            }
                            return (
                                <span key={index} className="inline-block mr-2 mb-1">
                                    <span className="font-semibold text-gray-900">{skill}</span>
                                    {index < data.skills.length - 1 && " •"}
                                </span>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Professional Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-5">
                    <h2
                        className="text-base font-bold uppercase tracking-wider pb-1 mb-3 border-b-2"
                        style={{ color: accentColor, borderColor: accentColor }}
                    >
                        PROFESSIONAL EXPERIENCE
                    </h2>

                    <div className="space-y-4">
                        {data.experience.map((exp, index) => {
                            const startDate = formatDate(exp.start_date);
                            const endDate = exp.is_current ? "Present" : formatDate(exp.end_date);
                            const dateRange = startDate || endDate ? `${startDate}${startDate && endDate ? " – " : ""}${endDate}` : "";

                            return (
                                <div key={index}>
                                    <div className="flex flex-wrap justify-between items-baseline text-sm">
                                        <div>
                                            <span className="font-bold text-gray-900">{exp.position}</span>
                                            {exp.company && (
                                                <span className="font-bold" style={{ color: accentColor }}>
                                                    {" "} | {exp.company}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs sm:text-sm italic text-gray-700">
                                            {dateRange}{exp.location ? ` | ${exp.location}` : ""}
                                        </div>
                                    </div>

                                    {renderBullets(exp.description)}
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Key Projects */}
            {projectsList.length > 0 && (
                <section className="mb-5">
                    <h2
                        className="text-base font-bold uppercase tracking-wider pb-1 mb-3 border-b-2"
                        style={{ color: accentColor, borderColor: accentColor }}
                    >
                        KEY PROJECTS
                    </h2>

                    <div className="space-y-3">
                        {projectsList.map((proj, index) => (
                            <div key={index}>
                                <div className="flex flex-wrap justify-between items-baseline text-sm">
                                    <div>
                                        <span className="font-bold text-gray-900">{proj.name}</span>
                                        {proj.description && <span className="text-gray-800">: {proj.description}</span>}
                                    </div>
                                    {proj.link && (
                                        <a
                                            href={proj.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-semibold underline"
                                            style={{ color: accentColor }}
                                        >
                                            Demo Link
                                        </a>
                                    )}
                                </div>
                                {proj.technologies && (
                                    <p className="text-xs text-gray-700 mt-0.5">
                                        <span className="font-bold text-gray-900">Technologies: </span>
                                        {Array.isArray(proj.technologies) ? proj.technologies.join(", ") : proj.technologies}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-5">
                    <h2
                        className="text-base font-bold uppercase tracking-wider pb-1 mb-3 border-b-2"
                        style={{ color: accentColor, borderColor: accentColor }}
                    >
                        EDUCATION
                    </h2>

                    <div className="space-y-2">
                        {data.education.map((edu, index) => {
                            const gradDate = formatDate(edu.graduation_date);
                            return (
                                <div key={index} className="flex flex-wrap justify-between items-baseline text-sm">
                                    <div>
                                        <span className="font-bold text-gray-900">
                                            {edu.degree}{edu.field ? ` (${edu.field})` : ""}
                                        </span>
                                        {edu.institution && <span className="text-gray-700"> — {edu.institution}</span>}
                                    </div>
                                    <div className="text-xs sm:text-sm italic text-gray-700">
                                        {gradDate}{edu.location ? ` | ${edu.location}` : ""}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Certifications & Awards */}
            {((data.certifications && data.certifications.length > 0) || (data.awards && data.awards.length > 0)) && (
                <section className="mb-5">
                    <h2
                        className="text-base font-bold uppercase tracking-wider pb-1 mb-2 border-b-2"
                        style={{ color: accentColor, borderColor: accentColor }}
                    >
                        CERTIFICATIONS & AWARDS
                    </h2>
                    <ul className="space-y-1 text-sm text-gray-800">
                        {data.certifications?.map((cert, idx) => (
                            <li key={`cert-${idx}`} className="flex items-start gap-2">
                                <span className="select-none font-bold text-gray-900">•</span>
                                <span>{typeof cert === "string" ? cert : `${cert.name || cert.title}${cert.issuer ? ` - ${cert.issuer}` : ""}`}</span>
                            </li>
                        ))}
                        {data.awards?.map((award, idx) => (
                            <li key={`award-${idx}`} className="flex items-start gap-2">
                                <span className="select-none font-bold text-gray-900">•</span>
                                <span>{typeof award === "string" ? award : `${award.title || award.name}${award.issuer ? ` - ${award.issuer}` : ""}`}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};

export default ClassicTemplate;