import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Plus, 
  X, 
  Check, 
  Sparkles, 
  FileText,
  Building2,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CreateProfilePage: React.FC = () => {
  const { userProfile, updateUserProfile, navigateTo, goBack } = useApp();

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState(userProfile.name);
  const [college, setCollege] = useState(userProfile.college);
  const [year, setYear] = useState(userProfile.year);
  const [skills, setSkills] = useState<string[]>([...userProfile.skills]);
  const [newSkill, setNewSkill] = useState('');
  const [interests, setInterests] = useState<string[]>([...userProfile.interests]);
  const [newInterest, setNewInterest] = useState('');
  const [preferredLocation, setPreferredLocation] = useState(userProfile.preferredLocation);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([...userProfile.opportunityTypes]);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeFileName, setResumeFileName] = useState(userProfile.resumeName || 'Yasmin_Beera_Resume_2025.pdf');

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim()) && skills.length < 10) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const toggleOpportunityType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setResumeFileName(file.name);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: fullName,
      college,
      year,
      skills,
      interests,
      preferredLocation,
      opportunityTypes: selectedTypes,
      resumeName: resumeFileName
    });

    // Lead into AI search matching reference workflow
    navigateTo('ai-search');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header with back button matching reference */}
      <div className="flex items-center gap-3">
        <button
          onClick={goBack}
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Create Profile
          </h1>
          <p className="text-xs text-slate-500">Step 1 of 4 • Onboarding</p>
        </div>
      </div>

      {/* Step Indicator Progress matching reference */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between relative">
        <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-slate-100 -z-0" />
        
        {[1, 2, 3, 4].map((s) => {
          const isDone = s < step;
          const isCurrent = s === step;
          return (
            <div key={s} className="relative z-10 flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-4 ring-blue-100'
                    : isDone
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : s}
              </div>
              <span className="text-[10px] font-semibold text-slate-600 hidden sm:block">
                {s === 1 ? 'About You' : s === 2 ? 'AI Search' : s === 3 ? 'Matching' : 'Ready'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Profile Form Card matching reference */}
      <form onSubmit={handleNext} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
        
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900">Tell us about yourself</h2>
          <p className="text-xs text-slate-500 mt-0.5">This helps us find the best opportunities for you.</p>
        </div>

        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Yasmin Beera"
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            required
          />
        </div>

        {/* College & Year */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">College / University</label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="Dr. B.R. Ambedkar, Konaseema"
              className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Year</label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full text-xs sm:text-sm px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
            >
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
              <option>Graduate</option>
            </select>
          </div>
        </div>

        {/* Skills Management matching reference */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Skills (Add up to 10)
          </label>
          <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 text-xs bg-white text-blue-700 border border-blue-200 font-semibold px-3 py-1 rounded-full shadow-xs"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-rose-600 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="+ Add skill (e.g. Next.js, Java, Figma)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddSkill();
                }
              }}
              className="flex-1 text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold border border-blue-200 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Interests matching reference */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Interests ({interests.length})
          </label>
          <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 text-xs bg-white text-purple-700 border border-purple-200 font-semibold px-3 py-1 rounded-full shadow-xs"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => handleRemoveInterest(interest)}
                  className="hover:text-rose-600 ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="+ Add interest (e.g. FinTech, Robotics)"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddInterest();
                }
              }}
              className="flex-1 text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddInterest}
              className="px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-600 rounded-xl text-xs font-bold border border-purple-200 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Preferred Location */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-slate-700">Preferred Location</label>
          <input
            type="text"
            value={preferredLocation}
            onChange={(e) => setPreferredLocation(e.target.value)}
            placeholder="Hyderabad, Bangalore, Remote"
            className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            required
          />
        </div>

        {/* Opportunity Types matching reference checkboxes */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">Opportunity Types</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {['Internships', 'Jobs', 'Hackathons', 'Meetups'].map((type) => {
              const isChecked = selectedTypes.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleOpportunityType(type)}
                  className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-between transition-all ${
                    isChecked
                      ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{type}</span>
                  <div
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Upload Resume (optional) matching reference */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700">
            Upload Resume <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <label className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-50 hover:bg-blue-50/40 transition-all group">
            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-slate-800">
              {resumeFileName ? resumeFileName : 'Click to upload or drag and drop'}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              PDF, DOC, DOCX (Max 5MB)
            </p>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Action button matching reference */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs"
          >
            Back
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25 transition-all hover:scale-[1.01]"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
