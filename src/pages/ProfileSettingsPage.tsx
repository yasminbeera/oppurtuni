import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Sparkles, 
  GraduationCap, 
  MapPin, 
  Briefcase, 
  Bell, 
  Lock, 
  HelpCircle, 
  LogOut, 
  ChevronRight, 
  Edit3, 
  Check, 
  ShieldCheck,
  FileText,
  BadgeCheck,
  Sliders
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileSettingsPage: React.FC = () => {
  const { 
    userProfile, 
    setIsEditProfileModalOpen, 
    navigateTo,
    logout, 
    showToast,
    goBack 
  } = useApp();

  const settingsSections = [
    {
      id: 'personal',
      title: 'Personal Information & Verification',
      description: `${userProfile.name} • ${userProfile.email} (${userProfile.emailVerified ? 'Verified' : 'Unverified'})`,
      icon: <User className="w-5 h-5 text-lavender-600" />,
      action: () => navigateTo('create-profile')
    },
    {
      id: 'skills',
      title: 'Skills & Domain Interests',
      description: `${userProfile.skills.length} skills • ${userProfile.interests.length} domains`,
      icon: <Sparkles className="w-5 h-5 text-lavender-600" />,
      action: () => navigateTo('create-profile')
    },
    {
      id: 'education',
      title: 'Education & Academic Details',
      description: `${userProfile.college} (${userProfile.year} • CGPA: ${userProfile.cgpa || '9.2'})`,
      icon: <GraduationCap className="w-5 h-5 text-mint-600" />,
      action: () => navigateTo('create-profile')
    },
    {
      id: 'projects',
      title: 'Projects & Certifications',
      description: `${userProfile.projects?.length || 3} projects • ${userProfile.certifications?.length || 3} credentials`,
      icon: <Briefcase className="w-5 h-5 text-softblue-600" />,
      action: () => navigateTo('create-profile')
    },
    {
      id: 'notifications',
      title: 'Notifications & Alerts',
      description: 'Daily digests, deadline reminders, match alerts',
      icon: <Bell className="w-5 h-5 text-amber-600" />,
      action: () => navigateTo('notifications')
    },
    {
      id: 'security',
      title: 'Account & Security',
      description: 'Password, two-factor auth & connected devices',
      icon: <Lock className="w-5 h-5 text-cyan-600" />,
      action: () => navigateTo('account-security')
    },
    {
      id: 'help',
      title: 'Help & Support',
      description: 'Frequently asked questions, live chat & guides',
      icon: <HelpCircle className="w-5 h-5 text-slate-600" />,
      action: () => navigateTo('help-support')
    },
  ];

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-lavender-200/80 shadow-card">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2.5 rounded-2xl bg-slate-50 border border-lavender-200 text-slate-600 hover:text-slate-900 hover:bg-lavender-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Profile & Account Settings</span>
              <BadgeCheck className="w-5 h-5 text-emerald-500" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">Manage your credentials, preferences, and matching profile</p>
          </div>
        </div>

        <button
          onClick={() => setIsEditProfileModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-lavender-700 to-indigo-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-lavender-500/25 transition-all"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 Cols): Profile Identity Card & Skills Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-lavender-200/80 shadow-card space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-18 h-18 rounded-3xl object-cover ring-4 ring-lavender-500/20 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  ✓
                </span>
              </div>
              <div className="space-y-0.5">
                <h2 className="text-lg font-extrabold text-slate-900">{userProfile.name}</h2>
                <p className="text-xs text-slate-500 font-medium">{userProfile.email}</p>
                <p className="text-xs text-lavender-700 font-bold">{userProfile.year} • {userProfile.college}</p>
              </div>
            </div>

            {/* Profile Completion Bar */}
            <div className="p-4 rounded-2xl bg-lavender-50/70 border border-lavender-200/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-800">Profile Match Strength</span>
                <span className="text-lavender-700">{userProfile.profileCompleted}% Complete</span>
              </div>
              <div className="w-full bg-white h-2.5 rounded-full overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-lavender-600 via-purple-600 to-mint-500 h-full rounded-full transition-all duration-700"
                  style={{ width: `${userProfile.profileCompleted}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Your profile is optimized for <strong className="text-slate-800">Software, Frontend & AI roles</strong>.
              </p>
            </div>

            {/* Skills Pills */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Your Active Skills</span>
              <div className="flex flex-wrap gap-1.5">
                {userProfile.skills.map((s, idx) => (
                  <span key={idx} className="text-xs font-semibold px-3 py-1 bg-lavender-50 text-lavender-800 rounded-xl border border-lavender-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Logout Action */}
            <div className="pt-2 border-t border-lavender-100">
              <button
                onClick={logout}
                className="w-full py-2.5 px-4 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out of Session</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (7 Cols): Settings Sections List */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl border border-lavender-200/80 shadow-card divide-y divide-lavender-100 overflow-hidden">
          {settingsSections.map(section => (
            <button
              key={section.id}
              onClick={section.action}
              className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-lavender-50/60 transition-colors text-left group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-white border border-slate-100 shadow-2xs transition-colors flex-shrink-0">
                  {section.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-lavender-700 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-xs text-slate-500 truncate mt-0.5">{section.description}</p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-lavender-700 group-hover:translate-x-1 transition-all flex-shrink-0" />
            </button>
          ))}
        </div>

      </div>

    </div>
  );
};
