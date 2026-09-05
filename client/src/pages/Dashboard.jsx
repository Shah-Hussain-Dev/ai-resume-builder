import {
  FilePenLineIcon,
  Pencil,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  UploadIcon,
  XIcon,
  Search,
  Sparkles,
  ArrowRight,
  FileText,
  Clock,
  LayoutGrid,
  List,
  CheckCircle2,
  TrendingUp,
  Award,
  FileCheck,
  RotateCcw,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/dashboard/ConfirmModal";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import API from "../config/api";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const [allResumes, setAllResumes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const [showCreateResumeModal, setShowCreateResumeModal] = useState(false);
  const [showUploadResumeModal, setShowUploadResumeModal] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadAllResumes = async () => {
    try {
      const { data } = await API.get("api/users/resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllResumes(data.data || []);
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to load resumes");
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  const colors = [
    "#2563EB", // Royal Blue
    "#3B82F6", // Bright Blue
    "#4F46E5", // Indigo
    "#0284C7", // Sky Blue
    "#7C3AED", // Violet
    "#059669", // Emerald
    "#D97706", // Amber
    "#DB2777", // Pink
  ];

  const createResume = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (editId) {
        const { data } = await API.put(
          `api/resumes/update-title/${editId}`,
          { title: resumeTitle },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data?.success) {
          setAllResumes((prev) =>
            prev.map((r) => (r._id === editId ? data.data.resume : r))
          );
          setResumeTitle("");
          setShowCreateResumeModal(false);
          setEditId("");
          toast.success("Resume title updated successfully");
        }
      } else {
        const { data } = await API.post(
          "api/resumes/create",
          { title: resumeTitle },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data?.success) {
          setAllResumes((prev) => [...prev, data.data]);
          setResumeTitle("");
          setShowCreateResumeModal(false);
          toast.success("Resume created successfully");
          navigate(`/app/builder/${data?.data?.resume?._id}`);
        }
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Failed to save resume");
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async (e) => {
    try {
      e.preventDefault();
      if (!resume) {
        toast.error("Please select a PDF file first");
        return;
      }
      setLoading(true);
      const resumeText = await pdfToText(resume);

      const { data } = await API.post(
        "api/ai/upload-resume",
        { title: resumeTitle, resumeText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResumeTitle("");
      setResume(null);
      setShowUploadResumeModal(false);
      toast.success("Resume parsed & created successfully");
      navigate(`/app/builder/${data?.data?.resumeId}`);
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Failed to upload resume");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowCreateResumeModal(false);
    setShowUploadResumeModal(false);
    setResumeTitle("");
    setResume(null);
    setLoading(false);
    setEditId("");
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
    }
  };

  const deleteResume = (id) => {
    setDeletingId(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deletingId) {
        await API.delete(`api/resumes/delete/${deletingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllResumes((prev) => prev.filter((r) => r._id !== deletingId));
        setShowConfirmModal(false);
        toast.success("Resume deleted successfully");
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Failed to delete resume");
    }
  };

  const editResumeTitle = (resumeItem) => {
    setEditId(resumeItem._id);
    setResumeTitle(resumeItem.title);
    setShowCreateResumeModal(true);
  };

  const filteredResumes = allResumes.filter((r) =>
    r.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAverageAtsScore = () => {
    if (!allResumes || allResumes.length === 0) return "N/A";
    let totalScore = 0;
    allResumes.forEach((r) => {
      let score = 50; // Base ATS single column score
      if (r.professional_summary && r.professional_summary.trim().length > 15) score += 15;
      if (r.experience && r.experience.length > 0) score += 15;
      if (r.education && r.education.length > 0) score += 10;
      if (r.skills && r.skills.length > 0) score += 10;
      totalScore += score;
    });
    return `${Math.round(totalScore / allResumes.length)}% Avg Score`;
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white py-8 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto relative overflow-hidden transition-colors duration-300">
      {/* Soft Radial Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-blue-500/15 blur-[140px] pointer-events-none rounded-full" />

      {/* Header Banner */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50 mb-3 shadow-xs">
            <Sparkles className="size-3.5 text-blue-600 dark:text-blue-400" />
            <span>AI Resume Dashboard • 100% ATS Ready</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome back, <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-500 bg-clip-text text-transparent">{user?.name || "Candidate"}</span> 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Create, edit, and optimize your ATS-compliant resumes with AI.
          </p>
        </div>

        {/* Search Bar & View Mode Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search resumes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <XIcon className="size-3.5" />
              </button>
            )}
          </div>

          <div className="flex p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 shadow-xs shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="size-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
              title="List View"
            >
              <List className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Summary Strip */}
      <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4 py-6">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3.5">
          <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <FileText className="size-5" />
          </div>
          <div>
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Resumes</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{allResumes.length} Saved</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3.5">
          <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <FileCheck className="size-5" />
          </div>
          <div>
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">ATS Score</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">{getAverageAtsScore()}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3.5">
          <div className="size-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Sparkles className="size-5" />
          </div>
          <div>
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">AI Assistant</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">Active Writer</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 shadow-xs flex items-center gap-3.5">
          <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800/40 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <Award className="size-5" />
          </div>
          <div>
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Export Formats</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">PDF & Print</span>
          </div>
        </div>
      </div>

      {/* Primary Quick Action Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
        {/* Create Resume Card */}
        <div
          onClick={() => {
            setEditId("");
            setResumeTitle("");
            setShowCreateResumeModal(true);
          }}
          className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 border border-blue-500/30 hover:border-blue-600 cursor-pointer group relative overflow-hidden flex flex-col justify-between min-h-[170px] transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-blue-500/10"
        >
          <div className="flex items-start justify-between">
            <div className="size-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 p-0.5 shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[14px] flex items-center justify-center">
                <PlusIcon className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/50 px-2.5 py-1 rounded-full font-bold tracking-wider">
              Start Fresh
            </span>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-2">
              Create New Resume
              <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-600 dark:text-blue-400" />
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Build a custom resume step-by-step with AI bullet point writer suggestions.
            </p>
          </div>
        </div>

        {/* Upload Resume Card */}
        <div
          onClick={() => {
            setResumeTitle("");
            setResume(null);
            setShowUploadResumeModal(true);
          }}
          className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 border border-sky-500/30 hover:border-sky-600 cursor-pointer group relative overflow-hidden flex flex-col justify-between min-h-[170px] transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-sky-500/10"
        >
          <div className="flex items-start justify-between">
            <div className="size-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-700 p-0.5 shadow-lg shadow-sky-500/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[14px] flex items-center justify-center">
                <UploadCloudIcon className="size-6 text-sky-600 dark:text-sky-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800/50 px-2.5 py-1 rounded-full font-bold tracking-wider">
              PDF AI Parser
            </span>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-xl text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center gap-2">
              Upload Existing Resume
              <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-sky-600 dark:text-sky-400" />
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Upload your PDF file to extract details automatically into builder fields.
            </p>
          </div>
        </div>
      </div>

      {/* Saved Resumes Grid / List Section */}
      <div className="relative z-10 pt-6 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="size-5 text-blue-600 dark:text-blue-400" /> Your Saved Resumes
            <span className="text-xs font-mono bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800/50 font-bold">
              {filteredResumes.length}
            </span>
          </h2>
        </div>

        {filteredResumes.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center space-y-4 shadow-sm">
            <div className="size-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <FilePenLineIcon className="size-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">No Resumes Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              {searchQuery ? "No resumes matched your search query." : "You haven't created any resumes yet. Click above to create or upload your first resume."}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowCreateResumeModal(true)}
                className="btn-royal-gradient px-6 py-2.5 rounded-full font-bold text-xs shadow-md mt-2 flex items-center gap-2 cursor-pointer"
              >
                <PlusIcon className="size-4" /> Create Your First Resume
              </button>
            )}
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredResumes.map((resumeItem, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <div
                  key={resumeItem._id}
                  onClick={() => navigate(`/app/builder/${resumeItem._id}`)}
                  className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-200 dark:border-white/10 hover:border-blue-500/60 cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[210px] shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  {/* Top Color Accent Line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: baseColor }}
                  />

                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 shadow-xs"
                        style={{ backgroundColor: `${baseColor}15`, color: baseColor }}
                      >
                        <FilePenLineIcon className="size-5" />
                      </div>

                      {/* Action Icon Toolbar */}
                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950/80 p-1 rounded-xl border border-slate-200 dark:border-white/10 opacity-90 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            editResumeTitle(resumeItem);
                          }}
                          className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                          title="Rename title"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteResume(resumeItem._id);
                          }}
                          className="p-1.5 rounded-lg text-rose-500 dark:text-rose-400 hover:text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition"
                          title="Delete resume"
                        >
                          <TrashIcon className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                      {resumeItem.title || "Untitled Resume"}
                    </h3>

                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-900 text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10">
                      <CheckCircle2 className="size-3 text-emerald-500" /> ATS Ready
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="size-3 text-slate-400" />
                      {new Date(resumeItem.updatedAt).toLocaleDateString()}
                    </span>

                    <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Open <ArrowRight className="size-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* LIST VIEW */
          <div className="space-y-3">
            {filteredResumes.map((resumeItem, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <div
                  key={resumeItem._id}
                  onClick={() => navigate(`/app/builder/${resumeItem._id}`)}
                  className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-white/10 hover:border-blue-500/60 cursor-pointer group flex items-center justify-between gap-4 shadow-sm transition-all duration-300"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className="p-3 rounded-xl border border-slate-200 dark:border-white/10 shrink-0"
                      style={{ backgroundColor: `${baseColor}15`, color: baseColor }}
                    >
                      <FilePenLineIcon className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                        {resumeItem.title || "Untitled Resume"}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3 text-slate-400" /> Updated {new Date(resumeItem.updatedAt).toLocaleDateString()}
                        </span>
                        <span className="hidden sm:inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                          <CheckCircle2 className="size-3" /> ATS Ready
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        editResumeTitle(resumeItem);
                      }}
                      className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="Rename title"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteResume(resumeItem._id);
                      }}
                      className="p-2 rounded-xl text-rose-500 dark:text-rose-400 hover:text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition"
                      title="Delete resume"
                    >
                      <TrashIcon className="size-4" />
                    </button>
                    <span className="px-4 py-2 rounded-full btn-royal-gradient text-white text-xs font-bold flex items-center gap-1 shadow-sm group-hover:scale-105 transition-transform">
                      Open <ArrowRight className="size-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create / Edit Title Modal */}
      {showCreateResumeModal && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl relative bg-white dark:bg-slate-900/95 text-slate-900 dark:text-white animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-5">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <FilePenLineIcon className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-snug">
                    {editId ? "Rename Resume Title" : "Create New Resume"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {editId ? "Update your resume label" : "Give your new resume a clear title"}
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <form onSubmit={createResume} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Resume Title
                </label>
                <input
                  type="text"
                  required
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  placeholder="e.g. Senior Software Engineer Resume 2026"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-royal-gradient w-full py-3.5 rounded-xl font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-[0.99] cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Saving...
                  </span>
                ) : editId ? (
                  "Update Resume Title"
                ) : (
                  <>
                    Create & Open Builder <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Upload PDF Modal */}
      {showUploadResumeModal && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl relative bg-white dark:bg-slate-900/95 text-slate-900 dark:text-white animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-5">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-sky-50 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800/50 flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <UploadCloudIcon className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-snug">Upload Resume PDF</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Extract content automatically with AI</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <form onSubmit={uploadResume} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Resume Title
                </label>
                <input
                  type="text"
                  required
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  placeholder="e.g. Imported Senior Engineer Resume"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Resume File (.pdf)
                </label>
                <label
                  htmlFor="resume-file-input"
                  className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-white/15 hover:border-blue-600 dark:hover:border-blue-500 rounded-2xl p-6 bg-slate-50 dark:bg-slate-950/60 cursor-pointer transition-all group text-center"
                >
                  <UploadIcon className="size-8 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform mb-2" />
                  {resume ? (
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                      <CheckCircle2 className="size-4" /> {resume.name}
                    </span>
                  ) : (
                    <>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        Click to browse or drop your PDF here
                      </span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">Supports standard PDF files up to 10MB</span>
                    </>
                  )}
                </label>
                <input
                  id="resume-file-input"
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeChange}
                  className="hidden"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !resume}
                className="btn-royal-ai w-full py-3.5 rounded-xl font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20 active:scale-[0.99] cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Parsing PDF with AI...
                  </span>
                ) : (
                  <>
                    Parse & Create Resume <Sparkles className="size-4 text-blue-200" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Resume"
        message="Are you sure you want to delete this resume? This action cannot be undone."
      />
    </div>
  );
};

export default Dashboard;

