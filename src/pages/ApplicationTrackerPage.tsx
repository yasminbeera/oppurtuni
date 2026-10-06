import React, { useState } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  ChevronRight, 
  Plus, 
  SlidersHorizontal, 
  ExternalLink, 
  Building2, 
  Sparkles,
  Check,
  X,
  AlertCircle,
  HelpCircle,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/common/Badge';
import { Opportunity, ApplicationStage } from '../types';
import confetti from 'canvas-confetti';

export const ApplicationTrackerPage: React.FC = () => {
  const { 
    opportunities, 
    updateApplicationStatus, 
    navigateTo, 
    goBack 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'All' | ApplicationStage>('All');
  const [selectedApp, setSelectedApp] = useState<Opportunity | null>(null);

  // Defined career journey stages according to prompt specification
  const threadStages: ApplicationStage[] = [
    'Opportunity',
    'Saved',
    'Applying',
    'Applied',
    'Assessment',
    'Interview',
    'Selected'
  ];

  // Applications list from opportunities
  const trackedApps: Opportunity[] = opportunities.filter((opp: Opportunity) => {
    if (activeFilter === 'All') {
      return opp.applied || opp.applicationStatus !== undefined;
    }
    return opp.applicationStatus === activeFilter;
  });

  const getStageIndex = (stage?: ApplicationStage) => {
    if (!stage) return 0;
    if (stage === 'Rejected') return -1;
    return threadStages.indexOf(stage);
  };

  const handleStageAdvance = (oppId: string, currentStatus?: ApplicationStage) => {
    const currentIndex = getStageIndex(currentStatus);
    if (currentIndex >= 0 && currentIndex < threadStages.length - 1) {
      const nextStage = threadStages[currentIndex + 1];
      updateApplicationStatus(oppId, nextStage);
      
      if (nextStage === 'Selected') {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      }
    }
  };

  return (
    <div className="w-full space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2 rounded-2xl bg-white border border-lavender-200 text-slate-600 hover:text-slate-900 hover:bg-lavender-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Application Journey Tracker
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-mint-50 border border-mint-200 text-mint-800 text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-mint-600" />
                Thread Architecture
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Visual career thread connecting opportunities from initial discovery to offer selection
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('opportunities')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-lavender-700 hover:bg-lavender-800 text-white text-xs font-bold shadow-md shadow-lavender-500/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Track New Opportunity</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        {(['All', ...threadStages, 'Rejected'] as ('All' | ApplicationStage)[]).map((st) => {
          const count = opportunities.filter((o: Opportunity) => 
            st === 'All' ? (o.applied || o.applicationStatus !== undefined) : o.applicationStatus === st
          ).length;

          return (
            <button
              key={st}
              onClick={() => setActiveFilter(st)}
              className={`px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeFilter === st
                  ? 'bg-lavender-700 text-white shadow-sm shadow-lavender-500/25'
                  : 'bg-white text-slate-600 border border-lavender-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>{st}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                activeFilter === st ? 'bg-lavender-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* THREAD JOURNEY LIST (Full Viewport Multi-Column Layout) */}
      <div className="space-y-4">
        {trackedApps.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-lavender-200 shadow-card space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-lavender-100 text-lavender-600 mx-auto flex items-center justify-center">
              <FileText className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">No applications in this thread stage</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Discover curated internships, jobs and hackathons matched to your skills to begin tracking.
              </p>
            </div>
            <button
              onClick={() => navigateTo('opportunities')}
              className="px-5 py-2.5 rounded-2xl bg-lavender-600 text-white text-xs font-bold shadow-md shadow-lavender-500/20"
            >
              Explore Opportunities
            </button>
          </div>
        ) : (
          trackedApps.map((opp) => {
            const currentStageIndex = getStageIndex(opp.applicationStatus);
            const isRejected = opp.applicationStatus === 'Rejected';
            const isSelected = opp.applicationStatus === 'Selected';

            return (
              <div 
                key={opp.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-lavender-200/80 shadow-card hover:border-lavender-300 transition-all space-y-5"
              >
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center flex-shrink-0 shadow-2xs">
                      <img 
                        src={opp.companyLogo} 
                        alt={opp.company} 
                        className="w-full h-full object-contain"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 hover:text-lavender-700 cursor-pointer transition-colors"
                        onClick={() => setSelectedApp(opp)}
                      >
                        {opp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-semibold text-slate-700">{opp.company}</span>
                        <span>•</span>
                        <span>{opp.location} ({opp.workMode})</span>
                        <span>•</span>
                        <span className="text-mint-600 font-bold">{opp.matchPercentage}% Match</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => setSelectedApp(opp)}
                      className="px-3.5 py-1.5 rounded-xl bg-lavender-50 hover:bg-lavender-100 text-lavender-800 text-xs font-bold transition-colors"
                    >
                      View Details
                    </button>
                    {currentStageIndex < threadStages.length - 1 && !isRejected && (
                      <button
                        onClick={() => handleStageAdvance(opp.id, opp.applicationStatus)}
                        className="px-3.5 py-1.5 rounded-xl bg-lavender-700 hover:bg-lavender-800 text-white text-xs font-bold shadow-2xs transition-all flex items-center gap-1"
                      >
                        <span>Advance Stage →</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* THE THREAD VISUAL PATH (Core Prompt Requirement) */}
                <div className="pt-2 pb-1 overflow-x-auto scrollbar-none no-scrollbar">
                  <div className="min-w-[650px] relative flex items-center justify-between px-6 py-4 bg-lavender-50/40 rounded-2xl border border-lavender-100">
                    
                    {/* Connecting Thread Line */}
                    <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0">
                      <div 
                        className="h-full bg-gradient-to-r from-lavender-600 via-softblue-500 to-mint-500 transition-all duration-500"
                        style={{
                          width: isRejected 
                            ? '100%' 
                            : `${Math.max(0, (currentStageIndex / (threadStages.length - 1)) * 100)}%`
                        }}
                      />
                    </div>

                    {/* Nodes along the thread */}
                    {threadStages.map((stageName, sIdx) => {
                      const isCompleted = currentStageIndex > sIdx;
                      const isCurrent = currentStageIndex === sIdx;

                      let nodeStyle = 'bg-white border-2 border-slate-300 text-slate-400';
                      let icon = <span className="text-[10px] font-bold">{sIdx + 1}</span>;

                      if (isCompleted) {
                        nodeStyle = 'bg-mint-500 border-2 border-mint-600 text-white shadow-xs';
                        icon = <Check className="w-3.5 h-3.5 stroke-[3]" />;
                      } else if (isCurrent) {
                        if (isRejected) {
                          nodeStyle = 'bg-rose-500 border-2 border-rose-600 text-white animate-pulse shadow-sm';
                          icon = <X className="w-3.5 h-3.5 stroke-[3]" />;
                        } else if (isSelected) {
                          nodeStyle = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-mint-glow ring-4 ring-emerald-100';
                          icon = <Award className="w-3.5 h-3.5" />;
                        } else {
                          nodeStyle = 'bg-lavender-600 border-2 border-lavender-700 text-white shadow-soft-glow ring-4 ring-lavender-200 animate-pulse';
                          icon = <Sparkles className="w-3 h-3 text-cyan-200" />;
                        }
                      }

                      return (
                        <div key={stageName} className="relative z-10 flex flex-col items-center group cursor-pointer"
                          onClick={() => updateApplicationStatus(opp.id, stageName)}
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${nodeStyle}`}>
                            {icon}
                          </div>
                          <span className={`text-[11px] font-bold mt-2 whitespace-nowrap transition-colors ${
                            isCurrent ? 'text-lavender-900 font-extrabold' : isCompleted ? 'text-mint-700' : 'text-slate-400'
                          }`}>
                            {stageName}
                          </span>
                        </div>
                      );
                    })}

                  </div>
                </div>

                {/* AI Stage Context Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200/60 text-slate-600 gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-lavender-600 flex-shrink-0" />
                    <span>
                      {opp.applicationStatus === 'Interview' && 'Interview scheduled! Practice core Data Structures and React concurrency hooks.'}
                      {opp.applicationStatus === 'Assessment' && 'Online test link active. Complete before deadline date.'}
                      {opp.applicationStatus === 'Applied' && 'Application submitted to recruitment queue. Tracking response status.'}
                      {opp.applicationStatus === 'Saved' && 'Saved to your watchlist. Review qualifications and apply before deadline.'}
                      {opp.applicationStatus === 'Selected' && '🎉 Congratulations! You have received an offer for this role.'}
                      {(!opp.applicationStatus || opp.applicationStatus === 'Opportunity') && 'Discovered by AI Scout. Ready to begin application.'}
                    </span>
                  </div>
                  <span className="font-semibold text-slate-500">
                    {opp.deadlineDays} days until close
                  </span>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* APPLICATION DETAIL DRAWER MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedApp(null)}
          />

          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col z-10 border-l border-lavender-200">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-lavender-100 to-softblue-50 border-b border-lavender-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white border border-lavender-200 p-2 flex items-center justify-center shadow-2xs">
                  <img src={selectedApp.companyLogo} alt={selectedApp.company} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{selectedApp.title}</h3>
                  <p className="text-xs text-slate-600">{selectedApp.company} • {selectedApp.location}</p>
                </div>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-2 rounded-xl text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Change Journey Stage</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Saved', 'Applying', 'Applied', 'Assessment', 'Interview', 'Selected', 'Rejected'] as ApplicationStage[]).map(st => (
                    <button
                      key={st}
                      onClick={() => {
                        updateApplicationStatus(selectedApp.id, st);
                        setSelectedApp(prev => prev ? { ...prev, applicationStatus: st } : null);
                        if (st === 'Selected') {
                          confetti({ particleCount: 100, spread: 70 });
                        }
                      }}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        selectedApp.applicationStatus === st
                          ? 'bg-lavender-700 text-white border-lavender-700 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* AI Preparation Suggestions */}
              <div className="p-4 rounded-2xl bg-lavender-50 border border-lavender-200/80 space-y-2">
                <div className="flex items-center gap-2 text-lavender-800 font-bold text-xs">
                  <Sparkles className="w-4 h-4 text-lavender-600" />
                  <span>AI Copilot Preparation Tips</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  "Ensure your GitHub projects prominently display clean Readmes and test suites. Review {selectedApp.requiredSkills.slice(0, 3).join(', ')} before meeting with engineering managers."
                </p>
              </div>

              {/* Overview */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Opportunity Overview</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{selectedApp.about}</p>
              </div>

              {/* Required Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApp.requiredSkills.map(sk => (
                    <span key={sk} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-[11px] font-semibold">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => {
                  navigateTo('opportunity-details', { opportunityId: selectedApp.id });
                  setSelectedApp(null);
                }}
                className="text-xs font-bold text-lavender-700 hover:text-lavender-900"
              >
                View Full Posting →
              </button>
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
