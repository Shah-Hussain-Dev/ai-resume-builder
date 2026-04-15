import { Globe, Linkedin, User,Mail,Phone,MapPin,Briefcase } from 'lucide-react'
import React from 'react'

const PersonalnfoForm = ({
  data, onChange,removeBackground,setRemoveBackground
}) => {
  const handleChange = (field,value)=>{
    onChange({...data,[field]:value});
  }

  const fields = [
    {
      key:"full_name",
      label:"Full Name",
      type:"text",
      placeholder:"John Doe",
      required:true,
      icon:User
    },
    {
      key:"email",
      label:"Email",
      type:"email",
      placeholder:"Email",
      required:true,
      icon:Mail
    },
    {
      key:"phone",
      label:"Phone",
      type:"text",
      placeholder:"1234567890",
      required:true,
      icon:Phone
    },
    {
      key:"location",
      label:"Location",
      type:"text",
      placeholder:"123 Main St",
      required:true,
      icon:MapPin
    },
    {
      key:"profession",
      label:"Profession",
      type:"text",
      placeholder:"Software Engineer",
      required:true,
      icon:Briefcase
    },
    {
      key:"linkedin",
      label:"LinkedIn",
      type:"text",
      placeholder:"linkedin.com/in/john-doe",
      required:false,
      icon:Linkedin
    },
    {
      key:"website",
      label:"Website",
      type:"text",
      placeholder:"12345",
      required:false,
      icon:Globe
    },
    
  ]
  return (
    <div className='animate-in fade-in duration-500'>
      <div>
        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
        <p className="text-sm text-gray-500 mt-1">Tell us about yourself and how recruiters can reach you</p>
      </div>
      <div className='flex gap-2 items-center'>

        <label>
          
            {data.image ? (
              <img src={typeof data.image ==="string" ? data.image : URL.createObjectURL(data.image)} alt="user-image" className="w-16 h-16 rounded-full object-cover mt-5" />
            ):(<div className="inline-flex items-center justify-center rounded-full mt-5 bg-gray-200 cursor-pointer hover:bg-gray-300 transition-all duration-200">
              <User className="size-10 border rounded-full cursor-pointer " />
              Upload User Image
            </div>)}
            <input type="file" accept="image/*" className="hidden" onChange={(e)=>handleChange("image",e.target.files[0])} />
          
        </label>
        {
          typeof data.image ==="object" && (
            <div className='mt-2'>
             <p>Remove Background</p>
             <label  className='relative inline-flex items-center cursor-pointer text-gray-900 gap-3'>
              <input type="checkbox" className='sr-only peer' checked={removeBackground} onChange={(e)=>setRemoveBackground((prev)=>!prev)} />
             <div className='w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-600'></div>
             <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition-all duration-200'></span>
             </label>
            </div>
          )
        }
      </div>
      {/* List of Input Fields */}
      {
        fields.map((field)=>(
          <div key={field.key} className="space-y-2 mt-4">
            <label className="text-sm font-medium text-gray-900">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
            <div className="relative mt-1">
              <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                  type={field.type || 'text'} 
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all text-sm"
                  placeholder={field.placeholder} 
                  required={field.required}
                  value={data[field.key] || ""} 
                  onChange={(e) => onChange({...data, [field.key]: e.target.value})}
              />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default PersonalnfoForm