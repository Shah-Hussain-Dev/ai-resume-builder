import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  ChevronDown,
  ChevronUp,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkles,
  User,
  EyeIcon,
  EyeOffIcon,
  Share2Icon,
  Download,
  Save,
  CheckCircle2,
  LayoutGrid,
  Sliders,
  Wand2,
  MoreVertical,
  Edit2,
  Plus,
  Trash2,
  GripVertical,
  Calendar,
  Camera,
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  X,
  Maximize2
} from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import API from "../config/api";
import PersonalnfoForm from "../components/forms/PersonalnfoForm";
import ProfessionalSummaryForm from "../components/forms/ProfessionalSummaryForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import EducationForm from "../components/forms/EducationForm";
import SkillsForm from "../components/forms/SkillsForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import ReusmePreview from "../components/resume/ReusmePreview";
import TemplateSelector from "../components/resume/TemplateSelector";
import TemplateCustomizer from "../components/resume/TemplateCustomizer";
import ColorPicker from "../components/common/ColorPicker";
import Loader from "../components/loader/Loader";
import AtsScoreModal from "../components/resume/AtsScoreModal";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("content"); // overview, content, customize, ai_tools
  const [saving, setSaving] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showAtsModal, setShowAtsModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    accent_color: "#003366",
    template: "classic",
    public: false,
    custom_settings: {
      font_family: "Plus Jakarta Sans",
      base_font_size: 10,
      name_font_size: 5,
      title_font_size: 2,
      heading_font_size: 1,
      entry_header_font_size: 0,
      line_height_val: 1.3,
      space_between_elements: 10,
      margin_lr: 10,
      margin_tb: 10,
    },
  });

  // Section Expansion State
  const [expandedSection, setExpandedSection] = useState({
    personal: false,
    summary: false,
    experience: true,
    education: false,
    skills: false,
    projects: false,
  });

  // Active editing sub-form item
  const [editingItem, setEditingItem] = useState(null); // { type: 'experience', index: 0 }
  const [removeBackground, setRemoveBackground] = useState(false);

  const loadExistingData = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`api/resumes/get/${resumeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data?.success && data?.data?.resume) {
        const resume = data.data.resume;
        setResumeData({
          _id: resume._id,
          title: resume.title || "Untitled Resume",
          personal_info: resume.personal_info || {},
          professional_summary: resume.professional_summary || "",
          experience: resume.experience || [],
          education: resume.education || [],
          skills: resume.skills || [],
          projects: resume.projects || resume.project || [],
          certifications: resume.certifications || [],
          languages: resume.languages || [],
          accent_color: resume.accent_color || "#003366",
          template: resume.template || "classic",
          public: resume.public || false,
          custom_settings: resume.custom_settings || {
            font_family: "Plus Jakarta Sans",
            font_size: "normal",
            line_height: "normal",
            section_spacing: "normal",
            paper_padding: "normal",
          },
        });
        document.title = resume.title ? `${resume.title} - AI Resume Builder` : "Resume Builder";
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to load resume data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExistingData();
  }, [resumeId, token]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showPreviewModal) {
        setShowPreviewModal(false);
      }
    };

    if (showPreviewModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPreviewModal]);

  const handleDownload = () => {
    const printContent = document.getElementById("resume-preview");
    if (!printContent) {
      toast.error("Resume preview not found");
      return;
    }

    const styles = Array.from(document.querySelectorAll("style")).map((s) => s.outerHTML).join("");
    const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
      .map((l) => l.outerHTML)
      .join("");

    const printWindow = window.open("", "", "width=900,height=700");
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resumeData.title || "Resume"}</title>
          ${linkTags}
          ${styles}
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; background: white; }
            @media print {
              body * { visibility: hidden; }
              #resume-preview, #resume-preview * { visibility: visible; }
              #resume-preview { position: absolute; left: 0; top: 0; width: 100%; padding: 20px; }
              body { background: white !important; }
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const changeResumeVisibility = async () => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify({ public: !resumeData?.public }));

      const { data } = await API.put("api/resumes/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setResumeData((prev) => ({ ...prev, public: !prev.public }));
      if (data?.success) {
        toast.success(`Resume is now ${!resumeData.public ? "Public" : "Private"}`);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Failed to change resume visibility");
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app/")[0];
    const resumeUrl = frontendUrl + "/view/" + resumeId;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, title: resumeData.title || "My Resume" });
    } else {
      navigator.clipboard.writeText(resumeUrl);
      toast.success("Public link copied to clipboard!");
    }
  };

  const saveResume = async () => {
    try {
      setSaving(true);
      const updateResumeData = structuredClone(resumeData);
      if (typeof updateResumeData.personal_info?.image === "object") {
        delete updateResumeData.personal_info.image;
      }

      const formData = new FormData();
      formData.append("resumeData", JSON.stringify(updateResumeData));
      formData.append("resumeId", resumeId);
      if (removeBackground) formData.append("removeBackground", "yes");
      if (typeof resumeData.personal_info?.image === "object") {
        formData.append("image", resumeData.personal_info.image);
      }

      const { data } = await API.put("api/resumes/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (data?.success) {
        toast.success(data.message || "Resume saved successfully!");
        if (data?.data?.resume) {
          setResumeData(data.data.resume);
        }
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const toggleSection = (sectionKey) => {
    setExpandedSection((prev) => ({ ...prev, [sectionKey]: !prev[sectionKey] }));
  };

  const toggleItemVisibility = (sectionKey, index) => {
    const list = [...(resumeData[sectionKey] || [])];
    if (list[index]) {
      list[index] = { ...list[index], hidden: !list[index].hidden };
      setResumeData({ ...resumeData, [sectionKey]: list });
    }
  };

  const deleteSectionItem = (sectionKey, index) => {
    const list = [...(resumeData[sectionKey] || [])];
    list.splice(index, 1);
    setResumeData({ ...resumeData, [sectionKey]: list });
  };

  const addSectionEntry = (sectionKey) => {
    const list = [...(resumeData[sectionKey] || [])];
    if (sectionKey === "experience") {
      list.push({ position: "New Position", company: "Company Name", start_date: "", end_date: "", description: "" });
    } else if (sectionKey === "education") {
      list.push({ degree: "Degree / Course", institution: "Institution Name", graduation_date: "", field: "" });
    } else if (sectionKey === "projects") {
      list.push({ name: "New Project", description: "Project summary description", link: "" });
    }
    setResumeData({ ...resumeData, [sectionKey]: list });
    setEditingItem({ type: sectionKey, index: list.length - 1 });
  };

  if (loading) {
    return <Loader />;
  }

  const pInfo = resumeData.personal_info || {};

  return (
    <div className="min-h-screen bg-[#f4f5f8] dark:bg-[#090D16] text-slate-900 dark:text-white pb-16 transition-colors duration-300">
      {/* Top Header Navigation Bar matching Screenshot */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 sm:px-8 py-2.5">
        <div className="max-w-[1650px] mx-auto flex items-center justify-between gap-4">
          
          {/* Left Navigation Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/app"
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition mr-1"
              title="Back to Dashboard"
            >
              <ArrowLeft className="size-4" />
            </Link>

            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "overview"
                  ? "bg-blue-50 text-blue-600 border border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              }`}
            >
              <LayoutGrid className="size-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("content")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "content"
                  ? "bg-blue-50 text-blue-600 border border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              }`}
            >
              <FileText className="size-4" />
              <span>Content</span>
            </button>

            <button
              onClick={() => setActiveTab("customize")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "customize"
                  ? "bg-blue-50 text-blue-600 border border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              }`}
            >
              <Sliders className="size-4" />
              <span>Customize</span>
            </button>

            <button
              onClick={() => setActiveTab("ai_tools")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeTab === "ai_tools"
                  ? "bg-blue-50 text-blue-600 border border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              }`}
            >
              <Wand2 className="size-4 text-blue-500" />
              <span>AI Tools</span>
            </button>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Resume Name / Selector */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300">
              <span className="max-w-[120px] truncate">{resumeData.title || "Resume 1"}</span>
            </div>

            {/* ATS Score Button */}
            <button
              onClick={() => setShowAtsModal(true)}
              className="btn-royal-ai flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold shadow-sm"
              title="Check ATS Score with Gemini AI"
            >
              <Sparkles className="size-3.5 text-amber-300 animate-pulse" />
              <span>ATS Score</span>
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="btn-royal-gradient flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm"
            >
              <span>Download</span>
              <Download className="size-3.5" />
            </button>

            {/* Kebab / Options Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className="p-2 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
              >
                <MoreVertical className="size-4" />
              </button>

              {showMoreMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl z-50 p-1.5 space-y-1">
                  <button
                    onClick={() => {
                      saveResume();
                      setShowMoreMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                  >
                    <Save className="size-4 text-indigo-600" /> Save Changes
                  </button>
                  <button
                    onClick={() => {
                      changeResumeVisibility();
                      setShowMoreMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                  >
                    {resumeData.public ? <EyeIcon className="size-4 text-emerald-500" /> : <EyeOffIcon className="size-4 text-slate-400" />}
                    <span>{resumeData.public ? "Make Private" : "Make Public"}</span>
                  </button>
                  {resumeData.public && (
                    <button
                      onClick={() => {
                        handleShare();
                        setShowMoreMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-cyan-600 hover:bg-cyan-50 dark:hover:bg-slate-800 rounded-xl"
                    >
                      <Share2Icon className="size-4" /> Share Link
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Main Container Grid */}
      <div className="max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* Left Column Builder Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">

            {/* TAB: CONTENT VIEW */}
            {activeTab === "content" && (
              <>
                {/* 1. PERSONAL INFO SUMMARY CARD (Matching Screenshot) */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-white/10 p-5 shadow-sm relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 pr-2">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                        {pInfo.full_name || "Shah Hussain"}
                      </h2>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {pInfo.profession || "Full Stack Developer (Web & Mobile)"}
                      </p>

                      <div className="pt-2 space-y-1 text-xs text-slate-600 dark:text-slate-400 font-medium">
                        {pInfo.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="size-3.5 text-slate-400" />
                            <span>{pInfo.email}</span>
                          </div>
                        )}
                        {pInfo.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="size-3.5 text-slate-400" />
                            <span>{pInfo.phone}</span>
                          </div>
                        )}
                        {pInfo.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="size-3.5 text-slate-400" />
                            <span>{pInfo.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Avatar Circle with Pink Edit Button */}
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center overflow-hidden">
                        {pInfo.image ? (
                          <img
                            src={
                              typeof pInfo.image === "string"
                                ? pInfo.image
                                : pInfo.image instanceof File || pInfo.image instanceof Blob
                                ? URL.createObjectURL(pInfo.image)
                                : ""
                            }
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Camera className="size-8 text-slate-300 dark:text-slate-600" />
                        )}
                      </div>
                      <button
                        onClick={() => toggleSection("personal")}
                        className="absolute -top-1 -right-1 bg-pink-500 hover:bg-pink-600 text-white rounded-full p-2 shadow-md transition"
                        title="Edit Personal Information"
                      >
                        <Edit2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Personal Info Form */}
                  {expandedSection.personal && (
                    <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10">
                      <PersonalnfoForm
                        data={pInfo}
                        onChange={(val) => setResumeData({ ...resumeData, personal_info: val })}
                        removeBackground={removeBackground}
                        setRemoveBackground={setRemoveBackground}
                      />
                    </div>
                  )}
                </div>

                {/* 2. PROFESSIONAL SUMMARY SECTION */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm overflow-hidden">
                  <div
                    onClick={() => toggleSection("summary")}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="size-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        Professional Summary
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection("summary");
                        }}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs px-2.5 py-1 rounded-lg hover:bg-slate-200 transition flex items-center gap-1"
                      >
                        <Edit2 className="size-3" /> Edit Heading
                      </button>
                      {expandedSection.summary ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
                    </div>
                  </div>

                  {expandedSection.summary && (
                    <div className="p-4 pt-0 border-t border-slate-100 dark:border-white/5 mt-2">
                      <ProfessionalSummaryForm
                        data={resumeData.professional_summary}
                        onChange={(val) => setResumeData({ ...resumeData, professional_summary: val })}
                      />
                    </div>
                  )}
                </div>

                {/* 3. PROFESSIONAL EXPERIENCE SECTION */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm overflow-hidden">
                  <div
                    onClick={() => toggleSection("experience")}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase className="size-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        Professional Experience
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection("experience");
                        }}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs px-2.5 py-1 rounded-lg hover:bg-slate-200 transition flex items-center gap-1"
                      >
                        <Edit2 className="size-3" /> Edit Heading
                      </button>
                      {expandedSection.experience ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
                    </div>
                  </div>

                  {expandedSection.experience && (
                    <div className="p-4 pt-2 space-y-3 border-t border-slate-100 dark:border-white/5">
                      {/* Item list pills matching Screenshot */}
                      {resumeData.experience?.map((exp, idx) => (
                        <div
                          key={idx}
                          className={`rounded-xl border p-3 flex items-center justify-between gap-3 transition ${
                            exp.hidden
                              ? "bg-slate-50 opacity-60 border-slate-200"
                              : "bg-slate-50/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-white/10"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <GripVertical className="size-4 text-slate-400 cursor-grab shrink-0" />
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                                {exp.position || "Untitled Position"}
                              </h4>
                              {exp.company && (
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                  {exp.company}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => setEditingItem(editingItem?.index === idx ? null : { type: "experience", index: idx })}
                              className="p-1 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                              title="Edit Entry"
                            >
                              <Edit2 className="size-3.5" />
                            </button>
                            <button
                              onClick={() => toggleItemVisibility("experience", idx)}
                              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
                              title="Toggle Visibility"
                            >
                              {exp.hidden ? <EyeOffIcon className="size-3.5 text-slate-400" /> : <EyeIcon className="size-3.5 text-slate-600" />}
                            </button>
                            <button
                              onClick={() => deleteSectionItem("experience", idx)}
                              className="p-1 text-slate-400 hover:text-red-600 transition"
                              title="Delete Entry"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Inline Edit Form if an item is selected */}
                      {editingItem?.type === "experience" && (
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/90 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 my-3 space-y-3">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-white/10">
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                              Editing Position #{editingItem.index + 1}
                            </span>
                            <button
                              onClick={() => setEditingItem(null)}
                              className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
                            >
                              Done
                            </button>
                          </div>
                          <ExperienceForm
                            data={resumeData.experience}
                            onChange={(val) => setResumeData({ ...resumeData, experience: val })}
                          />
                        </div>
                      )}

                      {/* Bottom Section Action Bar matching screenshot */}
                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                        <button className="p-2 text-slate-400 hover:text-slate-600 transition">
                          <Calendar className="size-4" />
                        </button>

                        <button
                          onClick={() => addSectionEntry("experience")}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-50 shadow-sm flex items-center gap-1.5 transition"
                        >
                          <Plus className="size-3.5" />
                          <span>Add Entry</span>
                        </button>

                        <button
                          onClick={() => setResumeData({ ...resumeData, experience: [] })}
                          className="p-2 text-slate-400 hover:text-red-500 transition"
                          title="Clear Experience Section"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. EDUCATION SECTION */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm overflow-hidden">
                  <div
                    onClick={() => toggleSection("education")}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <GraduationCap className="size-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        Education
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection("education");
                        }}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs px-2.5 py-1 rounded-lg hover:bg-slate-200 transition flex items-center gap-1"
                      >
                        <Edit2 className="size-3" /> Edit Heading
                      </button>
                      {expandedSection.education ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
                    </div>
                  </div>

                  {expandedSection.education && (
                    <div className="p-4 pt-2 space-y-3 border-t border-slate-100 dark:border-white/5">
                      {resumeData.education?.map((edu, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/80 dark:bg-slate-800/60 p-3 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <GripVertical className="size-4 text-slate-400 cursor-grab shrink-0" />
                            <div className="min-w-0">
                              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                                {edu.degree || "Degree Name"}
                              </h4>
                              {edu.institution && (
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                  {edu.institution}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => setEditingItem(editingItem?.index === idx ? null : { type: "education", index: idx })}
                              className="p-1 text-slate-500 hover:text-indigo-600 transition"
                            >
                              <Edit2 className="size-3.5" />
                            </button>
                            <button
                              onClick={() => deleteSectionItem("education", idx)}
                              className="p-1 text-slate-400 hover:text-red-600 transition"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {editingItem?.type === "education" && (
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/90 rounded-2xl border border-indigo-200 dark:border-indigo-500/30 my-3">
                          <EducationForm
                            data={resumeData.education}
                            onChange={(val) => setResumeData({ ...resumeData, education: val })}
                          />
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5">
                        <button
                          onClick={() => addSectionEntry("education")}
                          className="px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white hover:bg-slate-50 shadow-sm flex items-center gap-1.5 transition mx-auto"
                        >
                          <Plus className="size-3.5" />
                          <span>Add Entry</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. SKILLS SECTION */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm overflow-hidden">
                  <div
                    onClick={() => toggleSection("skills")}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="size-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="font-bold text-base text-slate-900 dark:text-white uppercase tracking-wider">
                        SKILLS
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection("skills");
                        }}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs px-2.5 py-1 rounded-lg hover:bg-slate-200 transition flex items-center gap-1"
                      >
                        <Edit2 className="size-3" /> Edit Heading
                      </button>
                      {expandedSection.skills ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
                    </div>
                  </div>

                  {expandedSection.skills && (
                    <div className="p-4 pt-2 border-t border-slate-100 dark:border-white/5">
                      <SkillsForm
                        data={resumeData.skills}
                        onChange={(val) => setResumeData({ ...resumeData, skills: val })}
                      />
                    </div>
                  )}
                </div>

                {/* 6. PROJECTS SECTION */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-white/10 shadow-sm overflow-hidden">
                  <div
                    onClick={() => toggleSection("projects")}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <FolderIcon className="size-5 text-indigo-600 dark:text-indigo-400" />
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        Projects
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection("projects");
                        }}
                        className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs px-2.5 py-1 rounded-lg hover:bg-slate-200 transition flex items-center gap-1"
                      >
                        <Edit2 className="size-3" /> Edit Heading
                      </button>
                      {expandedSection.projects ? <ChevronUp className="size-4 text-slate-400" /> : <ChevronDown className="size-4 text-slate-400" />}
                    </div>
                  </div>

                  {expandedSection.projects && (
                    <div className="p-4 pt-2 space-y-3 border-t border-slate-100 dark:border-white/5">
                      <ProjectsForm
                        data={resumeData.projects || resumeData.project}
                        onChange={(val) => setResumeData({ ...resumeData, projects: val, project: val })}
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            {/* TAB: CUSTOMIZE VIEW */}
            {activeTab === "customize" && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-white/10 p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1 flex items-center gap-2.5">
                    <Sliders className="size-5 text-blue-600 dark:text-blue-400" /> Resume Appearance & Design
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Choose a layout template, accent theme color, and configure typography & margins.
                  </p>
                </div>

                {/* 1. Template Selector Card */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    1. Choose Resume Template Layout
                  </label>
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(val) => setResumeData({ ...resumeData, template: val })}
                    sampleResumeData={resumeData}
                    accentColor={resumeData.accent_color}
                  />
                </div>

                {/* 2. Color Picker Card */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    2. Accent Theme Color
                  </label>
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) => setResumeData({ ...resumeData, accent_color: color })}
                  />
                </div>

                {/* 3. Typography Customizer Card */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                    3. Typography & Page Layout
                  </label>
                  <TemplateCustomizer
                    customSettings={resumeData.custom_settings}
                    onChange={(settings) => setResumeData({ ...resumeData, custom_settings: settings })}
                  />
                </div>
              </div>
            )}

            {/* TAB: OVERVIEW VIEW */}
            {activeTab === "overview" && (() => {
              let score = 50;
              if (pInfo.full_name && pInfo.email) score += 10;
              if (resumeData.professional_summary && resumeData.professional_summary.trim().length > 15) score += 15;
              if (resumeData.experience && resumeData.experience.length > 0) score += 10;
              if (resumeData.education && resumeData.education.length > 0) score += 8;
              if (resumeData.skills && resumeData.skills.length > 0) score += 7;
              return (
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-white/10 p-5 shadow-sm space-y-4">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <LayoutGrid className="size-5 text-blue-600 dark:text-blue-400" /> Resume Strength & Completeness
                  </h3>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/30 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">ATS Optimization Readiness</p>
                      <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">100% Single-Column Layout Ready</p>
                    </div>
                    <span className="text-2xl font-black text-emerald-600">{score}%</span>
                  </div>

                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Section Completion:</p>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-500" /> Personal Info ({pInfo.full_name ? "Complete" : "Incomplete"})</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-500" /> Professional Summary ({resumeData.professional_summary ? "Provided" : "Empty"})</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-500" /> Professional Experience ({resumeData.experience?.length || 0} entries)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-500" /> Education ({resumeData.education?.length || 0} entries)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-emerald-500" /> Skills ({resumeData.skills?.length || 0} listed)</li>
                    </ul>
                  </div>
                </div>
              );
            })()}

            {/* TAB: AI TOOLS VIEW */}
            {activeTab === "ai_tools" && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-white/10 p-5 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Wand2 className="size-5 text-blue-600 dark:text-blue-400" /> AI Resume Tools
                </h3>
                <p className="text-xs text-slate-500">Enhance bullet points, generate summaries, and calculate ATS scores using Gemini AI.</p>
                
                {/* ATS Score Card */}
                <div className="p-4 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-2xl space-y-3 shadow-md border border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="size-4" /> ATS Score Calculator
                    </span>
                    <span className="text-[10px] bg-blue-500/30 text-blue-300 font-bold px-2 py-0.5 rounded-full border border-blue-400/30">
                      Gemini 2.5 AI
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Evaluate your resume against target Job Descriptions, uncover missing keywords, and get high-priority recommendations to pass ATS screening.
                  </p>
                  <button
                    onClick={() => setShowAtsModal(true)}
                    className="w-full btn-royal-ai py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Sparkles className="size-4 text-amber-300" />
                    <span>Launch ATS Score & AI Optimizer</span>
                  </button>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-500/30 rounded-xl space-y-2">
                  <p className="text-xs font-bold text-blue-900 dark:text-blue-300">Smart AI Enhancer</p>
                  <p className="text-xs text-blue-700 dark:text-blue-400">Inline AI enhancement buttons are also available inside Professional Summary, Experience, and Projects sections.</p>
                </div>
              </div>
            )}

            {/* Bottom Save Action */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <CheckCircle2 className="size-3.5 text-emerald-500" /> Saved automatically
              </span>
              <button
                onClick={saveResume}
                disabled={saving}
                className="btn-royal-gradient px-6 py-2.5 rounded-xl text-xs font-bold shadow-md disabled:opacity-50 flex items-center gap-1.5"
              >
                <Save className="size-3.5" />
                <span>{saving ? "Saving..." : "Save Changes"}</span>
              </button>
            </div>
          </div>

          {/* Right Column Sticky Live Resume Preview (7 Cols) */}
          <div className="lg:col-span-7 sticky top-20">
            <div
              onClick={() => setShowPreviewModal(true)}
              className="relative group cursor-pointer max-h-[calc(100vh-6rem)] overflow-y-auto pr-1"
              title="Click to open full resume preview modal"
            >
              {/* Hover Badge Indicator */}
              <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-slate-900/90 text-white backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 pointer-events-none">
                <Maximize2 className="size-3.5 text-blue-400" />
                <span>Expand Full Preview</span>
              </div>

              <ReusmePreview
                resumeData={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
                customSettings={resumeData.custom_settings}
                classes="bg-white text-slate-800"
              />
            </div>
          </div>

        </div>
      </div>

      {/* ATS Score Modal */}
      <AtsScoreModal
        isOpen={showAtsModal}
        onClose={() => setShowAtsModal(false)}
        resumeData={resumeData}
        onUpdateSkills={(newSkills) => setResumeData({ ...resumeData, skills: newSkills })}
      />

      {/* Full Resume Preview Modal */}
      {showPreviewModal && (
        <div
          onClick={() => setShowPreviewModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-slate-100 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
          >
            {/* Modal Header */}
            <div className="px-6 py-3.5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-white dark:bg-slate-950 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Maximize2 className="size-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                    Full Resume Preview
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {resumeData.title || "Untitled Resume"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownload}
                  className="btn-royal-gradient px-4 py-2 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="size-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  title="Close Modal (Esc)"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Modal Body - Smooth Independent Scrollable Container */}
            <div className="p-4 sm:p-8 overflow-y-auto bg-slate-200/50 dark:bg-slate-950/70 flex-1 flex justify-center items-start">
              <ReusmePreview
                resumeData={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
                customSettings={resumeData.custom_settings}
                classes="bg-white text-slate-800"
                containerId="modal-resume-preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;

