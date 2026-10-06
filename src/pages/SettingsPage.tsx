import React, { useState } from 'react';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Lock, 
  Eye, 
  Palette, 
  LogOut, 
  Check, 
  Sliders, 
  Sparkles, 
  ShieldCheck,
  Globe,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { userProfile, updateUserProfile, theme, setTheme, logout, showToast, goBack } = useApp();

  const [activeTab, setActiveTab] = useState<'account' | 'preferences' | 'notifications' | 'privacy' | 'appearance'>('preferences');

  // Form states
  const [userName, setUserName] = useState(userProfile.name);
  const [userEmail, setUserEmail] = useState(userProfile.email);
  const [userCollege, setUserCollege] = useState(userProfile.college);
  const [prefLocation, setPrefLocation] = useState(userProfile.preferredLocation);
  
  // Preferences
  const [workMode, setWorkMode] = useState<'Remote' | 'Hybrid' | 'On-site' | 'All'>('All');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState(true);

  const handleSave = () => {
    updateUserProfile({
      name: userName,
      email: userEmail,
      college: userCollege,
      preferredLocation: prefLocation
    });
    showToast('Settings saved successfully!', 'success');
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2 rounded-2xl bg-white border border-lavender-200 text-slate-600 hover:text-slate-900 hover:bg-lavender-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Settings & Preferences
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage your discovery engine, privacy protocols, and notification alerts
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-lavender-700 hover:bg-lavender-800 text-white text-xs font-bold shadow-md shadow-lavender-500/25 transition-all"
        >
          <Check className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Main Grid: Tabs on Left, Content on Right (Laptop Full Viewport layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Navigation Tabs Pill Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-3 border border-lavender-200/80 shadow-card space-y-1">
          {[
            { id: 'preferences', label: 'Discovery Preferences', icon: <Sliders className="w-4 h-4" /> },
            { id: 'account', label: 'Account Information', icon: <User className="w-4 h-4" /> },
            { id: 'notifications', label: 'Notification Alerts', icon: <Bell className="w-4 h-4" /> },
            { id: 'privacy', label: 'Data & Privacy', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'appearance', label: 'UI Appearance', icon: <Palette className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-lavender-100 text-lavender-900 font-bold shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span className={activeTab === tab.id ? 'text-lavender-700' : 'text-slate-400'}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
            </button>
          ))}

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <LogOut className="w-4 h-4 text-rose-500" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-lavender-200/80 shadow-card space-y-6">
          
          {/* DISCOVERY PREFERENCES */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Opportunity Scout Parameters</h3>
                <p className="text-xs text-slate-500">Fine-tune which opportunities Oppurtuni AI agents prioritize</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Target Location</label>
                  <input
                    type="text"
                    value={prefLocation}
                    onChange={(e) => setPrefLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                    placeholder="e.g. Hyderabad, Bangalore, Remote"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Work Mode Preference</label>
                  <select
                    value={workMode}
                    onChange={(e) => setWorkMode(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500"
                  >
                    <option value="All">All (Remote + Hybrid + On-site)</option>
                    <option value="Remote">Remote Only</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <span className="block text-xs font-bold text-slate-700">Active Search Domains</span>
                <div className="flex flex-wrap gap-2">
                  {['Internships', 'Jobs', 'Hackathons', 'Meetups', 'Fellowships', 'Competitions', 'Scholarships', 'Workshops'].map((cat) => (
                    <span 
                      key={cat}
                      className="px-3 py-1.5 rounded-full bg-lavender-50 border border-lavender-200 text-lavender-800 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Check className="w-3 h-3 text-lavender-600" />
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ACCOUNT TAB */}
          {activeTab === 'account' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Personal & Academic Details</h3>
                <p className="text-xs text-slate-500">Your profile is visible to recruiters when applying</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">College / Institution</label>
                  <input
                    type="text"
                    value={userCollege}
                    onChange={(e) => setUserCollege(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Notification Alerts</h3>
                <p className="text-xs text-slate-500">Choose when Oppurtuni pings you</p>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'High-Match Opportunity Alerts', desc: 'Notify when opportunities with ≥ 85% match are scouted', checked: emailAlerts, toggle: () => setEmailAlerts(!emailAlerts) },
                  { title: 'Approaching Deadlines (Urgency Alerts)', desc: 'Reminder 3 days and 24 hours before opportunities close', checked: deadlineReminders, toggle: () => setDeadlineReminders(!deadlineReminders) },
                  { title: 'AI Skill Gap Recommendations', desc: 'Weekly curated learning roadmaps and skill market reports', checked: aiRecommendations, toggle: () => setAiRecommendations(!aiRecommendations) }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-900">{item.title}</p>
                      <p className="text-[11px] text-slate-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={item.toggle}
                      className={`w-11 h-6 rounded-full transition-colors relative ${item.checked ? 'bg-lavender-600' : 'bg-slate-300'}`}
                    >
                      <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${item.checked ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRIVACY TAB */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Data Privacy & Resume Controls</h3>
                <p className="text-xs text-slate-500">Oppurtuni puts student privacy first</p>
              </div>

              <div className="p-4 rounded-2xl bg-mint-50 border border-mint-200 space-y-1.5">
                <span className="text-xs font-bold text-mint-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-mint-600" />
                  End-to-End Encrypted Resume Parser
                </span>
                <p className="text-xs text-mint-700 leading-relaxed">
                  Your uploaded resume is never sold to third-party data brokers. Only verified recruiters on sponsored opportunities receive your application materials upon explicit submission.
                </p>
              </div>
            </div>
          )}

          {/* APPEARANCE TAB */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Visual Theme & Aesthetics</h3>
                <p className="text-xs text-slate-500">Oppurtuni's soft gradient design language</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Soft Lavender', color: 'from-lavender-100 to-softblue-100', active: theme === 'Soft Lavender' },
                  { name: 'Pure White', color: 'from-white to-slate-100', active: theme === 'Pure White' },
                  { name: 'Midnight Indigo', color: 'from-slate-900 to-indigo-950', active: theme === 'Midnight Indigo' },
                ].map((th) => (
                  <div
                    key={th.name}
                    onClick={() => setTheme(th.name as any)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      th.active ? 'border-lavender-600 ring-2 ring-lavender-400/40 bg-lavender-50/50' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-full h-12 rounded-xl bg-gradient-to-r ${th.color} mb-2 shadow-2xs`} />
                    <span className="text-xs font-bold text-slate-800 block text-center flex items-center justify-center gap-1">
                      {th.active && <Check className="w-3.5 h-3.5 text-lavender-600" />}
                      <span>{th.name}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
