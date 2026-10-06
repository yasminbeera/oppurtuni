import React, { useState } from 'react';
import { X, Plus, Trash2, Save, User, BookOpen, MapPin, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EditProfileModal: React.FC = () => {
  const { 
    isEditProfileModalOpen, 
    setIsEditProfileModalOpen, 
    userProfile, 
    updateUserProfile 
  } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [college, setCollege] = useState(userProfile.college);
  const [year, setYear] = useState(userProfile.year);
  const [preferredLocation, setPreferredLocation] = useState(userProfile.preferredLocation);
  const [skills, setSkills] = useState<string[]>([...userProfile.skills]);
  const [newSkill, setNewSkill] = useState('');
  const [interests, setInterests] = useState<string[]>([...userProfile.interests]);
  const [newInterest, setNewInterest] = useState('');

  if (!isEditProfileModalOpen) return null;

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter(i => i !== interestToRemove));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      college,
      year,
      preferredLocation,
      skills,
      interests
    });
    setIsEditProfileModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-lavender-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-lavender-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Edit Your Profile</h2>
            <p className="text-xs text-slate-500">Keep your details updated for optimal AI opportunity matches</p>
          </div>
          <button
            onClick={() => setIsEditProfileModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Basic info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Preferred Location</label>
              <input
                type="text"
                value={preferredLocation}
                onChange={(e) => setPreferredLocation(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">College / University</label>
              <input
                type="text"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Current Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500 cursor-pointer"
              >
                <option>1st Year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year</option>
                <option>Graduate / Alumni</option>
              </select>
            </div>
          </div>

          {/* Skills Management */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Skills ({skills.length}/10)
            </label>
            <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 mb-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 text-xs bg-white text-lavender-700 border border-lavender-200 font-medium px-2.5 py-1 rounded-full shadow-xs"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a skill and click Add (e.g. Docker, Tailwind)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
                className="flex-1 text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3.5 py-2 bg-lavender-100 hover:bg-lavender-200 text-lavender-700 rounded-xl text-xs font-bold border border-lavender-200 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Interests Management */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Interests & Domains
            </label>
            <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 mb-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 text-xs bg-white text-periwinkle-700 border border-periwinkle-200 font-medium px-2.5 py-1 rounded-full shadow-xs"
                >
                  {interest}
                  <button
                    type="button"
                    onClick={() => handleRemoveInterest(interest)}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add interest (e.g. Blockchain, Cloud, Robotics)"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddInterest();
                  }
                }}
                className="flex-1 text-xs px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
              />
              <button
                type="button"
                onClick={handleAddInterest}
                className="px-3.5 py-2 bg-periwinkle-100 hover:bg-periwinkle-200 text-periwinkle-700 rounded-xl text-xs font-bold border border-periwinkle-200 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-lavender-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditProfileModalOpen(false)}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 hover:opacity-90 text-white rounded-xl text-xs font-bold shadow-md shadow-lavender-500/25 flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
