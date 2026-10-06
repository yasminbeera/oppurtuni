import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Share2, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  Building2, 
  Briefcase, 
  Sparkles, 
  GraduationCap, 
  Check, 
  ExternalLink,
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  Zap,
  Flame
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MatchBadge, DeadlineBadge } from '../components/common/Badge';

export const OpportunityDetailsPage: React.FC = () => {
  const { 
    selectedOpportunity, 
    toggleSave, 
    setIsApplyModalOpen, 
    navigateTo, 
    setSelectedSkillGapOppId,
    showToast,
    goBack 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'eligibility' | 'company'>('overview');

  if (!selectedOpportunity) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500">No opportunity selected</p>
        <button onClick={() => navigateTo('opportunities')} className="mt-4 text-lavender-600 font-bold">
          Browse Opportunities
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Opportunity link copied to clipboard!', 'info');
    }
  };

  const handleOpenSkillGap = () => {
    setSelectedSkillGapOppId(selectedOpportunity.id);
    navigateTo('skill-gap');
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-lavender-200/80 shadow-card">
        <button
          onClick={goBack}
          className="p-2.5 rounded-2xl bg-slate-50 border border-lavender-200 text-slate-700 hover:text-slate-900 hover:bg-lavender-50 transition-colors flex items-center gap-2 text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Opportunities</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleShare}
            className="p-2.5 rounded-2xl bg-slate-50 border border-lavender-200 text-slate-600 hover:text-slate-900 hover:bg-lavender-50 transition-colors"
            title="Share Opportunity"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleSave(selectedOpportunity.id)}
            className={`p-2.5 rounded-2xl border transition-colors ${
              selectedOpportunity.saved
                ? 'bg-pink-50 border-pink-200 text-pink-600'
                : 'bg-slate-50 border-lavender-200 text-slate-600 hover:text-slate-900 hover:bg-lavender-50'
            }`}
            title="Save Opportunity"
          >
            <Bookmark className={`w-4 h-4 ${selectedOpportunity.saved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Header Banner Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-lavender-200/80 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-slate-50 border border-slate-200/80 p-3 flex items-center justify-center shadow-sm flex-shrink-0">
              <img
                src={selectedOpportunity.companyLogo}
                alt={selectedOpportunity.company}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lavender-100 text-lavender-800 text-xs font-bold">
                  {selectedOpportunity.type}
                </span>
                {selectedOpportunity.verificationStatus !== 'Needs Verification' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ✓ Verified Employer
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/80 text-xs font-bold">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    ⚠ Needs Verification
                  </span>
                )}
                {selectedOpportunity.isDirectCompanyPost && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-lavender-50 text-lavender-800 border border-lavender-200 text-xs font-bold">
                    ⚡ Direct Company Post
                  </span>
                )}
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {selectedOpportunity.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2 font-medium">
                <span className="text-slate-800 font-semibold">{selectedOpportunity.company}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {selectedOpportunity.location} ({selectedOpportunity.workMode})
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2.5">
            <MatchBadge percentage={selectedOpportunity.matchPercentage} size="md" />
            <DeadlineBadge days={selectedOpportunity.deadlineDays} size="sm" />
          </div>
        </div>

        {/* Quick Attribute Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-lavender-100">
          <div className="p-3.5 bg-lavender-50/60 rounded-2xl border border-lavender-100">
            <span className="text-[11px] text-slate-400 font-medium">Location Mode</span>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{selectedOpportunity.location}</p>
          </div>
          <div className="p-3.5 bg-lavender-50/60 rounded-2xl border border-lavender-100">
            <span className="text-[11px] text-slate-400 font-medium">Commitment / Duration</span>
            <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{selectedOpportunity.duration || 'Flexible'}</p>
          </div>
          <div className="p-3.5 bg-lavender-50/60 rounded-2xl border border-lavender-100">
            <span className="text-[11px] text-slate-400 font-medium">Stipend / Compensation</span>
            <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-0.5">{selectedOpportunity.stipend || 'Competitive'}</p>
          </div>
          <div className="p-3.5 bg-lavender-50/60 rounded-2xl border border-lavender-100">
            <span className="text-[11px] text-slate-400 font-medium">Deadline Date</span>
            <p className="text-xs sm:text-sm font-bold text-amber-700 mt-0.5">{selectedOpportunity.deadlineDate}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-1.5 border border-lavender-200/80 shadow-xs flex items-center gap-1.5 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'skills', label: 'Skills & Fit Analysis' },
          { id: 'eligibility', label: 'Eligibility Requirements' },
          { id: 'company', label: 'About Company' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-lavender-700 to-indigo-600 text-white shadow-sm shadow-lavender-500/25'
                : 'text-slate-600 hover:text-slate-900 hover:bg-lavender-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 12-Column Responsive Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 Cols): Tab Specific Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Why This Fits You Box */}
              <div className="bg-gradient-to-br from-lavender-50 via-purple-50/40 to-mint-50/40 rounded-3xl p-6 border border-lavender-200 shadow-card space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-lavender-600" />
                    <h3 className="text-sm font-bold text-slate-900">Why this fits your profile</h3>
                  </div>
                  <button
                    onClick={handleOpenSkillGap}
                    className="text-xs font-bold text-lavender-700 hover:text-lavender-800 flex items-center gap-1 underline"
                  >
                    <span>Skill Gap Roadmap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {selectedOpportunity.whyFits.map((fit: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 leading-relaxed font-medium">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{fit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* About Opportunity */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-lavender-200/80 shadow-card space-y-4">
                <h3 className="text-base font-bold text-slate-900">About the Opportunity</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedOpportunity.about}
                </p>

                <h4 className="text-sm font-bold text-slate-900 pt-2">Role Overview & Responsibilities</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedOpportunity.overview}
                </p>
              </div>

              {/* Required Skills */}
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-lavender-200/80 shadow-card space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Required Skills & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedOpportunity.requiredSkills.map((skill: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-lavender-100 text-lavender-800 border border-lavender-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-lavender-200/80 shadow-card space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Skill Alignment Engine</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Automated comparison against your profile skills.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Skills You Match</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['Python', 'Web Development', 'Communication', 'React'].map((s, i) => (
                        <span key={i} className="text-xs bg-white text-emerald-800 font-semibold px-2.5 py-1 rounded-lg border border-emerald-200 shadow-xs">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                    <h4 className="text-xs font-bold text-amber-900 flex items-center gap-2">
                      <BrainCircuit className="w-4 h-4 text-amber-600" />
                      <span>Skills to Upskill</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {['System Design', 'C++', 'Git Workflow'].map((s, i) => (
                        <span key={i} className="text-xs bg-white text-amber-800 font-semibold px-2.5 py-1 rounded-lg border border-amber-200 shadow-xs">
                          + {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-lavender-50/70 border border-lavender-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-lavender-900">Personalized Step-by-Step Learning Roadmap</p>
                    <p className="text-[11px] text-lavender-700">Explore interactive lessons to boost your score to 95%.</p>
                  </div>
                  <button
                    onClick={handleOpenSkillGap}
                    className="px-4 py-2 bg-gradient-to-r from-lavender-700 to-indigo-600 hover:opacity-90 text-white rounded-xl text-xs font-bold"
                  >
                    View Roadmap
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Eligibility Tab */}
          {activeTab === 'eligibility' && (
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-lavender-200/80 shadow-card space-y-4">
              <h3 className="text-base font-bold text-slate-900">Eligibility Criteria</h3>
              <div className="space-y-3">
                <div className="p-4 bg-lavender-50/50 rounded-2xl border border-lavender-200 flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-lavender-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Academic Standing</p>
                    <p className="text-xs text-slate-600 mt-0.5">{selectedOpportunity.eligibility}</p>
                  </div>
                </div>

                <div className="p-4 bg-lavender-50/50 rounded-2xl border border-lavender-200 flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-lavender-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Work Authorization</p>
                    <p className="text-xs text-slate-600 mt-0.5">Eligible to work in India or Remote as applicable.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* About Company Tab */}
          {activeTab === 'company' && (
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-lavender-200/80 shadow-card space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border p-2 flex items-center justify-center">
                  <img src={selectedOpportunity.companyLogo} alt={selectedOpportunity.company} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedOpportunity.company}</h3>
                  <p className="text-xs text-slate-500">Verified Organization Partner</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedOpportunity.company} is a global pioneer in consumer technology, enterprise infrastructure, and software engineering. Their hiring programs are renowned for world-class mentorship, real production ownership, and career launchpads.
              </p>
            </div>
          )}
        </div>

        {/* Right Column (4 Cols): Application Action & Security Card */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-lavender-200/80 shadow-card space-y-5 sticky top-20">
            <div className="space-y-1 text-center">
              <span className="text-xs text-slate-400 font-semibold">Ready to apply?</span>
              <h3 className="text-lg font-extrabold text-slate-900">Fast-Track Application</h3>
              <p className="text-xs text-slate-500">Your profile is 84% pre-filled for instant submission</p>
            </div>

            <div className="p-4 rounded-2xl bg-lavender-50/70 border border-lavender-200 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Application Deadline:</span>
                <span className="font-bold text-rose-600">{selectedOpportunity.deadlineDays} days left</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">Verified Match:</span>
                <span className="font-bold text-emerald-600">{selectedOpportunity.matchPercentage}% Fit</span>
              </div>
            </div>

            <button
              onClick={() => setIsApplyModalOpen(true)}
              disabled={selectedOpportunity.applied}
              className={`w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
                selectedOpportunity.applied
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 hover:opacity-95 text-white shadow-lavender-500/30 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {selectedOpportunity.applied ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Applied ✓</span>
                </>
              ) : (
                <>
                  <span>Apply with 1-Click</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              onClick={() => toggleSave(selectedOpportunity.id)}
              className={`w-full py-2.5 px-4 rounded-2xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                selectedOpportunity.saved
                  ? 'bg-pink-50 border-pink-200 text-pink-600'
                  : 'border-slate-200 text-slate-600 hover:bg-lavender-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${selectedOpportunity.saved ? 'fill-current' : ''}`} />
              <span>{selectedOpportunity.saved ? 'Saved in Bookmarks' : 'Save for Later'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
