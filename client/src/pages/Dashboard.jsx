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
  Clock
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
    "#6366f1",
    "#3b82f6",
    "#8b5cf6",
    "#14b8a6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#4f46e5",
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

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white py-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto transition-colors duration-300">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 mb-3">
            <Sparkles className="size-3.5 text-amber-500" />
            AI Resume Dashboard
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Welcome back, <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">{user?.name || "Candidate"}</span> 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Create, edit, and optimize your ATS-compliant resumes with AI.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search resumes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900/90 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 focus:border-indigo-500 outline-none transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {/* Create Resume Card */}
        <div
          onClick={() => {
            setEditId("");
            setResumeTitle("");
            setShowCreateResumeModal(true);
          }}
          className="glass-card glass-card-hover rounded-3xl p-6 border border-indigo-500/30 hover:border-indigo-500/60 cursor-pointer group relative overflow-hidden flex flex-col justify-between min-h-[160px]"
        >
          <div className="flex items-start justify-between">
            <div className="size-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <PlusIcon className="size-6 text-indigo-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 px-2 py-0.5 rounded font-semibold">
              Start Fresh
            </span>
          </div>

          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              Create New Resume
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Build a custom resume step-by-step with AI assistant suggestions.
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
          className="glass-card glass-card-hover rounded-3xl p-6 border border-purple-500/30 hover:border-purple-500/60 cursor-pointer group relative overflow-hidden flex flex-col justify-between min-h-[160px]"
        >
          <div className="flex items-start justify-between">
            <div className="size-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 p-0.5 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <UploadCloudIcon className="size-6 text-purple-400" />
              </div>
            </div>
            <span className="text-[10px] font-mono uppercase bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 px-2 py-0.5 rounded font-semibold">
              PDF AI Parser
            </span>
          </div>

          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              Upload Existing Resume
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Upload your PDF file to extract details automatically into fields.
            </p>
          </div>
        </div>
      </div>

      {/* Resumes Grid */}
      <div className="pt-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="size-5 text-indigo-600 dark:text-indigo-400" /> Your Saved Resumes
            <span className="text-xs font-mono bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-400 px-2 py-0.5 rounded-full border border-slate-300 dark:border-white/10 ml-1">
              {allResumes.length}
            </span>
          </h2>
        </div>

        {filteredResumes.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center space-y-4">
            <div className="size-16 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400">
              <FilePenLineIcon className="size-8" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">No Resumes Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
              {searchQuery ? "No resumes matched your search query." : "You haven't created any resumes yet. Click above to create or upload one."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredResumes.map((resumeItem, index) => {
              const baseColor = colors[index % colors.length];
              return (
                <div
                  key={resumeItem._id}
                  onClick={() => navigate(`/app/builder/${resumeItem._id}`)}
                  className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-200 dark:border-white/10 hover:border-indigo-500/40 cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[200px]"
                >
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: baseColor }}
                  />

                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10"
                        style={{ backgroundColor: `${baseColor}20`, color: baseColor }}
                      >
                        <FilePenLineIcon className="size-5" />
                      </div>

                      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950/80 p-1 rounded-lg border border-slate-200 dark:border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            editResumeTitle(resumeItem);
                          }}
                          className="p-1 rounded text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
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
                          className="p-1 rounded text-rose-500 dark:text-rose-400 hover:text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition"
                          title="Delete resume"
                        >
                          <TrashIcon className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {resumeItem.title || "Untitled Resume"}
                    </h3>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="size-3 text-slate-400" />
                      {new Date(resumeItem.updatedAt).toLocaleDateString()}
                    </span>

                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Open <ArrowRight className="size-3" />
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
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl relative bg-white dark:bg-slate-900/95 text-slate-900 dark:text-white animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {editId ? "Rename Resume Title" : "Create New Resume"}
              </h3>
              <button
                onClick={handleClose}
                className="p-1 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <form onSubmit={createResume} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Resume Title
                </label>
                <input
                  type="text"
                  required
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  placeholder="e.g. Software Engineer Resume 2026"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 focus:border-indigo-500 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50"
              >
                {loading
                  ? "Saving..."
                  : editId
                  ? "Update Resume Title"
                  : "Create & Open Builder"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Upload PDF Modal */}
      {showUploadResumeModal && (
        <div
          onClick={handleClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-2xl relative bg-white dark:bg-slate-900/95 text-slate-900 dark:text-white animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Upload Resume PDF</h3>
              <button
                onClick={handleClose}
                className="p-1 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <XIcon className="size-5" />
              </button>
            </div>

            <form onSubmit={uploadResume} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Resume Title
                </label>
                <input
                  type="text"
                  required
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  placeholder="e.g. Imported Senior Resume"
                  className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-xs sm:text-sm px-4 py-3 rounded-xl border border-slate-300 dark:border-white/10 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Resume File (.pdf)
                </label>
                <label
                  htmlFor="resume-file-input"
                  className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-white/10 hover:border-purple-500 rounded-2xl p-6 bg-slate-50 dark:bg-slate-950/60 cursor-pointer transition-colors group text-center"
                >
                  <UploadIcon className="size-8 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform mb-2" />
                  {resume ? (
                    <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                      {resume.name}
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-300">
                      Click to browse or drop your PDF here
                    </span>
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
                className="w-full py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-lg shadow-purple-500/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Parsing PDF with AI..." : "Parse & Create Resume"}
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
