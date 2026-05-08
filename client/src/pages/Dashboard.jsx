import {
  FilePenLineIcon,
  Pencil,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  UploadIcon,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../components/dashboard/ConfirmModal";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import API from "../config/api";
import pdfToText from "react-pdftotext"

const Dashboard = () => {
  const [allResumes, setAllResumes] = useState([]);
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
      console.log("error", error); toast.error("Failed to load resumes");
    }
  };
  useEffect(() => {
    loadAllResumes();
  }, []);
  const colors = [
    "#9333ea",
    "#fb923c",
    "#2563eb",
    "#14b8a6",
    "#ef4444",
    "#f59e0b",
    "#60a5fa",
    "#f97316",
    "#ec4899",
    "#10b981",
  ];
  // Create resume and upload resume
  const createResume = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (editId) {
        const { data } = await API.put(`api/resumes/update-title/${editId}`, { title: resumeTitle }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data?.success) {
          setAllResumes((prev) => prev.map((resume) => resume._id === editId ? data.data.resume : resume));
          setResumeTitle("");
          setShowCreateResumeModal(false);
          setEditId("");
          toast.success("Resume title updated successfully");
        }
      } else {
        const { data } = await API.post("api/resumes/create", { title: resumeTitle }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
      setLoading(true);
      const resumeText = await pdfToText(resume);

      const { data } = await API.post("api/ai/upload-resume", { title: resumeTitle, resumeText }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResumeTitle("");
      setResume(null);
      setShowUploadResumeModal(false);
      setLoading(false);
      toast.success("Resume uploaded successfully");
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
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setResume(file);
      };
      reader.readAsDataURL(file);
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
        setAllResumes((prev) => prev.filter((resume) => resume._id !== deletingId));
        setShowConfirmModal(false);
        toast.success("Resume deleted successfully");
      }

    } catch (error) {
      console.log("error", error);
      toast.error(error.response?.data?.message || "Failed to delete resume");
    }
  };

  const editResumeTitle = (resume) => {
    setEditId(resume._id);
    setResumeTitle(resume.title);
    setShowCreateResumeModal(true);
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Welcome, John Doe</h1>
      </div>
      <div className="flex gap-4 py-4">
        <button
          onClick={() => setShowCreateResumeModal(true)}
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <PlusIcon className="size-11 transition-all duration-300 group-hover:text-white p-2.5 bg-gradient-to-br from-green-500 to-green-600 rounded-full text-white" />
          <p className="text-sm font-medium  group-hover:text-green-500 transition-all duration-300">
            Create Resume
          </p>
        </button>
        <button
          onClick={() => setShowUploadResumeModal(true)}
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <UploadCloudIcon className="size-11 transition-all duration-300 group-hover:text-white p-2.5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full text-white" />
          <p className="text-sm font-medium  group-hover:text-purple-500 transition-all duration-300">
            Upload Resume
          </p>
        </button>
      </div>
      <hr className="border-slate-300 my-6 sm:w-[305px] w-full" />
      <div className="py-4">
        <h2 className="text-2xl font-bold">Your Resumes</h2>
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4 mt-6">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            const darkColor = colors[(index + 1) % colors.length];
            return (
              <div
                key={resume._id}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg,${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + 40,
                }}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
              >
                <div className="flex flex-col items-center justify-center gap-2 ">
                  <FilePenLineIcon
                    className="size-11 transition-all duration-300 group-hover:text-white p-2.5 rounded-full"
                    style={{ color: baseColor }}
                  />
                  <p className=" text-sm group-hover:text-slate-500 transition-all duration-300 px-2 text-center">
                    {resume.title}
                  </p>
                  <p
                    className="absolute bottom-2 text-xs text-slate-400 group-hover:text-slate-500 px-2 text-center transition-all duration-300"
                    style={{ color: baseColor + 90 }}
                  >
                    Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                  {/* delete and edit resume icons */}
                  <div
                    className="absolute top-1.5 right-1   group-hover:flex items-center hidden "
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Pencil
                      onClick={() => editResumeTitle(resume)}
                      className="size-7 transition-all duration-300 hover:bg-white/50 p-1.5 rounded-full"
                      style={{ color: baseColor }}
                    />
                    <TrashIcon
                      onClick={() => deleteResume(resume._id)}
                      className="size-7 transition-all duration-300 hover:bg-white/50 p-1.5 rounded-full"
                      style={{ color: baseColor }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Create and upload resume modals */}
        {showCreateResumeModal && (
          <form
            onSubmit={createResume}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              className="flex relative flex-col gap-2 p-4 bg-white rounded "
              style={{ width: "400px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <label htmlFor="resume-title" className="text-xl font-medium">
                {editId ? "Edit Resume Title" : "Create Resume Title"}
              </label>
              <input
                required
                type="text"
                id="resume-title"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                className="w-full px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 rounded border border-slate-300"
              />
              <button disabled={loading} className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "Creating..." : (editId ? "Edit Resume" : "Create Resume")}
              </button>
              <XIcon
                className="absolute top-2 right-2 cursor-pointer transition-colors text-slate-400 hover:text-slate-600"
                onClick={handleClose}
              />
            </div>
          </form>
        )}
        {showUploadResumeModal && (
          <form
            onSubmit={uploadResume}
            onClick={handleClose}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              className="flex relative flex-col gap-2 p-4 bg-white rounded "
              style={{ width: "400px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <label htmlFor="resume-title" className="text-xl font-medium">
                Upload Resume
              </label>
              <input
                required
                type="text"
                id="resume-title"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                placeholder="Enter resume title"
                className="w-full px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 rounded border border-slate-300"
              />
              {/* Upload icon and text */}
              <div className="flex items-center gap-2  ">
                <label
                  htmlFor="resume-input"
                  className="block text-sm text-slate-700 w-full"
                >
                  Select Resume File
                  <div className="flex  flex-col items-center gap-2 justify-center border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-500 transition-colors w-full">
                    <UploadIcon className="size-5 text-green-500" />
                    {resume ? (
                      <p className="text-sm text-slate-400 group-hover:text-green-500 transition-colors">
                        {resume?.name}
                      </p>
                    ) : (
                      <p className="text-sm text-slate-400 group-hover:text-green-500 transition-colors">
                        Upload Resume
                      </p>
                    )}
                  </div>
                </label>
                <input
                  required
                  type="file"
                  id="resume-input"
                  onChange={handleResumeChange}
                  className="hidden"
                />
              </div>
              <button disabled={loading} className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "Uploading..." : "Upload Resume"}
              </button>
              <XIcon
                className="absolute top-2 right-2 cursor-pointer transition-colors text-slate-400 hover:text-slate-600"
                onClick={handleClose}
              />
            </div>
          </form>
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
    </div>
  );
};

export default Dashboard;
