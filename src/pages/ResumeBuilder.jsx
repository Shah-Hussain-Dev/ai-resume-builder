import React, { useState,useEffect  } from "react";
import html2pdf from 'html2pdf.js';
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { ArrowLeft, Briefcase, ChevronLeft, ChevronRight, FileText, FolderIcon, GraduationCap, Sparkles, User, EyeIcon, EyeOffIcon, Share2Icon, Download } from "lucide-react";
import PersonalnfoForm from "../components/forms/PersonalnfoForm";
import ProfessionalSummaryForm from "../components/forms/ProfessionalSummaryForm";
import ExperienceForm from "../components/forms/ExperienceForm";
import EducationForm from "../components/forms/EducationForm";
import SkillsForm from "../components/forms/SkillsForm";
import ProjectsForm from "../components/forms/ProjectsForm";
import ReusmePreview from "../components/resume/ReusmePreview";
import TemplateSelector from "../components/resume/TemplateSelector";
import ColorPicker from "../components/common/ColorPicker";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
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
    accent_color: "",
    public: false,
  });

  const [activeSectionIndex,setActiveSectionIndex] = useState(0);
  const [removeBackground,setRemoveBackground] = useState(false);
    const sections = [
    {
      id: "personal_info",
      name: "Personal Information",
      icon: User,
     
    },
    {
      id: "professional_summary",
      name: "Professional Summary",
      icon: FileText,
      
    },
    {
      id: "experience",
      name: "Experience",
      icon: Briefcase,
    },
    {
      id: "education",
      name: "Education",
      icon: GraduationCap,
    
    },
    {
      id: "skills",
      name: "Skills",
      icon: Sparkles,
    
    },
    {
      id: "projects",
      name: "Projects",
      icon: FolderIcon,
   
    },
   
  ];

  const acitiveSection = sections[activeSectionIndex];
  const loadExistingData = async () => {
    try {
      const resume = dummyResumeData?.find((resume) => resume._id === resumeId);
      if (resume) {
        setResumeData(resume);
        document.title = resume.title;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    loadExistingData();
  }, [resumeId]);

  const handleDownload = () => {
    const element = document.getElementById('resume-preview');
    const opt = {
      margin: 0,
      filename: `${resumeData.personal_info.full_name || 'Resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, letterRendering: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save();
  }

  const handleShare = () => {
    const frontendUrl = window.location.href.split('/app/')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;
    
    if(navigator.share){
        navigator.share({url: resumeUrl, text: "My Resume", })
    }else{
        alert('Share not supported on this browser.')
    }
  }

  const renderForm = () => {
    switch (acitiveSection.id) {
        case "personal_info":
            return (
                <PersonalnfoForm 
                    data={resumeData.personal_info} 
                    onChange={(e) => setResumeData({...resumeData, personal_info: e})} 
                    removeBackground={removeBackground} 
                    setRemoveBackground={setRemoveBackground}
                />
            );
        case "professional_summary":
            return (
                <ProfessionalSummaryForm 
                    data={resumeData.professional_summary} 
                    onChange={(e) => setResumeData({...resumeData, professional_summary: e})} 
                />
            );
        case "experience":
            return (
                <ExperienceForm 
                    data={resumeData.experience} 
                    onChange={(e) => setResumeData({...resumeData, experience: e})} 
                />
            );
        case "education":
            return (
                <EducationForm 
                    data={resumeData.education} 
                    onChange={(e) => setResumeData({...resumeData, education: e})} 
                />
            );
        case "skills":
            return (
                <SkillsForm 
                    data={resumeData.skills} 
                    onChange={(e) => setResumeData({...resumeData, skills: e})} 
                />
            );
        case "projects":
            return (
                <ProjectsForm 
                    data={resumeData.projects || resumeData.project} 
                    onChange={(e) => setResumeData({...resumeData, projects: e, project: e})} 
                />
            );
        default:
            return (
                <div className="p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <p className="text-gray-500">The {acitiveSection.name} form section is coming soon!</p>
                </div>
            );
    }
  }


  return <div>
    <div className="max-w-7xl mx-auto px-4 flex justify-between items-center mt-4 mb-6">
      <Link to="/dashboard" className="flex items-center gap-2 hover:text-gray-900 transition-all duration-300 cursor-pointer w-fit bg-slate-100 p-2 rounded-full px-4 hover:bg-slate-200">
        <ArrowLeft size={20} className="text-gray-500"/>
        <span className="text-gray-500">Back to Dashboard</span>
      </Link>
      
      <div className='flex items-center gap-3'>
          {resumeData.public && (
              <button 
                onClick={handleShare}
                className='flex items-center p-2.5 px-5 gap-2 text-xs bg-blue-50 text-blue-600 rounded-full border border-blue-100 hover:bg-blue-100 transition-all font-bold shadow-sm'
              >
                  <Share2Icon size={16}/>
                  <span>Share</span>
              </button>
          )}

          <button 
            onClick={handleDownload}
            className='flex items-center p-2.5 px-5 gap-2 text-xs bg-white text-gray-700 rounded-full border border-gray-200 hover:bg-gray-50 transition-all font-bold shadow-sm'
          >
              <Download size={16}/>
              <span>Download</span>
          </button>

          <button 
            onClick={() => setResumeData({...resumeData, public: !resumeData.public})}
            className={`flex items-center p-2.5 px-5 gap-2 text-xs rounded-full transition-all shadow-sm font-bold border ${resumeData.public ? "bg-blue-600 text-white border-blue-700" : "bg-white text-gray-500 border-gray-200"}`}
          >
              {resumeData.public ? <EyeIcon size={16}/> : <EyeOffIcon size={16}/>}
              {resumeData.public ? 'Public' : 'Private'}
          </button>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 pb-8">
     <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* left side */}
      <div className="lg:col-span-5 rounded-lg sticky top-6 h-fit">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 ">
          {/* Progress bar using activeSectionindex */}
          <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
          <hr className="absolute top-0 left-0 right-0  h-1 transition-all duration-300 bg-gradient-to-r from-green-500 to-green-600 border-none " style={{width:`${activeSectionIndex * 100/(sections?.length - 1)}%`}} />
          {/* Section navigation  */}
          <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-1 ">
           <div className="flex justify-between items-center gap-2">
            <TemplateSelector selectedTemplate={resumeData.template} onChange={(e) => setResumeData({...resumeData, template: e})}/>
              <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData((prev)=>({...prev,accent_color:color}))}/>
           </div>
           <div className="flex items-center gap-2">
            {
              activeSectionIndex !== 0 && (
                <button onClick={() => setActiveSectionIndex((prev) => Math.max(prev - 1,0))} className={` text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none  outline-none  flex items-center gap-2 px-4 py-2 rounded-full ${activeSectionIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={activeSectionIndex === 0}>
                  <ChevronLeft/> Previous
                </button>
              )
            }

            <button onClick={() => setActiveSectionIndex((prev) => Math.min(prev + 1, sections?.length - 1))} className={` text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none  outline-none  flex items-center gap-2 px-4 py-2 rounded-full ${activeSectionIndex === sections?.length - 1 ? "opacity-50 cursor-not-allowed" : ""}`} disabled={activeSectionIndex === sections?.length - 1}>
                  Next<ChevronRight/> 
                </button>
           </div>
          </div>
          {/* Form section */}
          <div className=" space-y-6">
            <div className="space-y-4">
              {renderForm()}
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex justify-start">
               <button 
                onClick={() => {
                  // In a real app, this would call an API. 
                  // For now, we'll show a satisfying feedback.
                  alert("Changes saved successfully!");
                }}
                className='px-8 py-3 bg-emerald-50 text-emerald-700 rounded-xl hover:bg-emerald-100 transition-all text-sm font-bold border border-emerald-400 shadow-sm flex items-center gap-2'
              >
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="lg:col-span-7 max-lg:mt-6">
        <div className="w-full">
            {/* resume preview */}
            <div className="rounded-lg overflow-hidden border border-gray-100 shadow-2xl">
              <ReusmePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
            </div>
        </div>
      </div>
     </div>
    </div>
  </div>;
};

export default ResumeBuilder;
