import { Globe, Linkedin, User, Mail, Phone, MapPin, Briefcase, Camera, X } from 'lucide-react'
import React from 'react'

const PersonalnfoForm = ({
  data, onChange, removeBackground, setRemoveBackground
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleChange("image", file);
    }
  };

  const removeImage = () => {
    handleChange("image", "");
    setRemoveBackground(false);
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      type: "text",
      placeholder: "John Doe",
      required: true,
      icon: User
    },
    {
      key: "email",
      label: "Email",
      type: "email",
      placeholder: "john@example.com",
      required: true,
      icon: Mail
    },
    {
      key: "phone",
      label: "Phone",
      type: "text",
      placeholder: "+1 234 567 890",
      required: true,
      icon: Phone
    },
    {
      key: "location",
      label: "Location",
      type: "text",
      placeholder: "New York, USA",
      required: true,
      icon: MapPin
    },
    {
      key: "profession",
      label: "Profession",
      type: "text",
      placeholder: "Software Engineer",
      required: true,
      icon: Briefcase
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      type: "text",
      placeholder: "linkedin.com/in/john-doe",
      required: false,
      icon: Linkedin
    },
    {
      key: "website",
      label: "Website",
      type: "text",
      placeholder: "johndoe.com",
      required: false,
      icon: Globe
    },
  ];

  return (
    <div className='animate-in fade-in duration-500'>
      <div>
        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
        <p className="text-sm text-gray-500 mt-1">Tell us about yourself and how recruiters can reach you</p>
      </div>

      {/* Image Upload Section */}
      <div className="mt-6">
        <div className="flex flex-col items-center justify-center">
          <label className="cursor-pointer">
            <div className="flex flex-col items-center justify-center">
              {data.image ? (
                <div className="relative group">
                  <img
                    src={typeof data.image === "string" ? data.image : URL.createObjectURL(data.image)}
                    alt="user-image"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-md"
                  />
                  <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <Camera className="text-white size-6" />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removeImage();
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-lg hover:bg-red-600 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all duration-300 group">
                  <User className="size-10 text-gray-400 group-hover:text-green-500 transition-colors" />
                </div>
              )}
            </div>
          </label>
          <span className="text-sm text-gray-500 mt-3">
            {data.image ? "Click to change photo" : "Upload Profile Photo"}
          </span>
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />

        {/* Remove Background Toggle */}
        {data.image && (
          <div className="mt-4 flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-900">Remove Background</p>
              <p className="text-xs text-gray-500">Automatically remove photo background</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={removeBackground}
                onChange={(e) => setRemoveBackground(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-100 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        )}
      </div>

      {/* List of Input Fields */}
      {
        fields.map((field) => (
          <div key={field.key} className="space-y-2 mt-4">
            <label className="text-sm font-medium text-gray-900">{field.label} {field.required && <span className="text-red-500">*</span>}</label>
            <div className="relative mt-1">
              <field.icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={field.type || 'text'}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:border-green-400 focus:ring-4 focus:ring-green-50 transition-all text-sm"
                placeholder={field.placeholder}
                required={field.required}
                value={data[field.key] || ""}
                onChange={(e) => onChange({ ...data, [field.key]: e.target.value })}
              />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default PersonalnfoForm