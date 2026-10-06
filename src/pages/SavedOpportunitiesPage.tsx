import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bookmark, 
  Search, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Trash2,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MatchBadge, DeadlineBadge } from '../components/common/Badge';
import { Opportunity } from '../types';

export const SavedOpportunitiesPage: React.FC = () => {
  const { 
    opportunities, 
    toggleSave, 
    navigateTo, 
    goBack 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'All' | 'Saved' | 'Applying' | 'Interview' | 'Selected'>('All');

  const savedList = opportunities.filter((o: Opportunity) => o.saved && (activeTab === 'All' || o.applicationStatus === activeTab));

  const tabs: ('All' | 'Saved' | 'Applying' | 'Interview' | 'Selected')[] = [
    'All',
    'Saved',
    'Applying',
    'Interview',
    'Selected',
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
              <span>Saved Opportunities</span>
              <span className="text-xs bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full font-bold">
                {savedList.length} bookmarked
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">Review, organize, and apply to your saved listings</p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('opportunities')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-lavender-700 to-indigo-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-lavender-500/25 transition-all"
        >
          <span>Discover More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-gradient-to-r from-lavender-700 to-indigo-600 text-white shadow-sm shadow-lavender-500/25'
                : 'bg-white/90 text-slate-600 border border-lavender-200 hover:bg-lavender-50 hover:text-slate-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Saved Opportunity Cards (2-Column Grid on Wide Screens) */}
      {savedList.length === 0 ? (
        <div className="bg-white/90 rounded-3xl p-12 text-center border border-lavender-200 space-y-4 shadow-card">
          <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center mx-auto shadow-sm">
            <Bookmark className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No saved opportunities in this tab</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Click the bookmark icon on any opportunity card to save it for quick review and tracking.
            </p>
          </div>
          <button
            onClick={() => navigateTo('opportunities')}
            className="px-6 py-2.5 bg-gradient-to-r from-lavender-700 to-indigo-600 hover:opacity-90 text-white rounded-2xl text-xs font-bold shadow-md shadow-lavender-500/20"
          >
            Browse Opportunities
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedList.map((opp: Opportunity) => (
            <div
              key={opp.id}
              onClick={() => navigateTo('opportunity-details', { opportunityId: opp.id })}
              className="bg-white/95 rounded-3xl p-5 border border-lavender-200/90 hover:border-lavender-400 hover:shadow-card-hover transition-all cursor-pointer flex flex-col justify-between gap-4 group"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-13 h-13 rounded-2xl bg-slate-50 border border-slate-100 p-2.5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs">
                  <img
                    src={opp.companyLogo}
                    alt={opp.company}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0 space-y-1 flex-1">
                  <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-lavender-700 transition-colors">
                    {opp.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">{opp.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {opp.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Badges & Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-lavender-100">
                <div className="flex items-center gap-2">
                  <MatchBadge percentage={opp.matchPercentage} />
                  <DeadlineBadge days={opp.deadlineDays} />
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(opp.id);
                    }}
                    className="p-2 rounded-xl text-pink-600 bg-pink-50 hover:bg-rose-100 hover:text-rose-700 transition-colors"
                    title="Remove from saved"
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                  <span className="text-xs font-bold text-lavender-700 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
