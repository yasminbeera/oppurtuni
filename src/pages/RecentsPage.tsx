import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  MapPin, 
  Bookmark, 
  ArrowRight, 
  ExternalLink,
  Filter,
  Check,
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Opportunity, OpportunityCategory } from '../types';
import { MatchBadge, DeadlineBadge } from '../components/common/Badge';

export const RecentsPage: React.FC = () => {
  const { opportunities, navigateTo, toggleSave, goBack, showToast, setIsApplyModalOpen, setSelectedOpportunityId } = useApp();

  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Ongoing' | 'Ended'>('Ongoing');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const categories = ['All', 'Internships', 'Jobs', 'Hackathons', 'Meetups', 'Competitions', 'Fellowships', 'Scholarships', 'Workshops'];

  // Filter opportunities for Recents
  const filteredList = opportunities.filter(opp => {
    // Tab filtering
    const tabMatch = opp.eventStatus ? opp.eventStatus === activeTab : (activeTab === 'Ongoing' ? (opp.deadlineDays > 0) : activeTab === 'Ended' ? (opp.deadlineDays <= 0) : false);

    // Search query
    const searchMatch = !searchQuery.trim() || 
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    // Category filter
    const catMatch = categoryFilter === 'All' || opp.type === categoryFilter;

    return tabMatch && searchMatch && catMatch;
  });

  const counts = {
    Upcoming: opportunities.filter(o => o.eventStatus === 'Upcoming').length,
    Ongoing: opportunities.filter(o => o.eventStatus === 'Ongoing' || (!o.eventStatus && o.deadlineDays > 0)).length,
    Ended: opportunities.filter(o => o.eventStatus === 'Ended' || (!o.eventStatus && o.deadlineDays <= 0)).length
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-lavender-200/80 shadow-card">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2.5 rounded-2xl bg-slate-50 border border-lavender-200 text-slate-600 hover:text-slate-900 hover:bg-lavender-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Recents & Live Feeds</span>
              <span className="text-xs bg-lavender-100 text-lavender-800 px-2.5 py-0.5 rounded-full font-bold">
                {filteredList.length} Items
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Track recently scouted opportunities, upcoming events, and closed sessions
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-100 p-1 rounded-2xl flex items-center gap-1 border border-slate-200/80">
          {(['Upcoming', 'Ongoing', 'Ended'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 text-white shadow-sm shadow-lavender-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <span>{tab === 'Ongoing' ? 'Ongoing / Active' : tab}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeTab === tab ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Category Filter Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white/90 p-3 rounded-2xl border border-lavender-200/80 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-lavender-500" />
          <input
            type="text"
            placeholder="Search recent listings by role, skill, company, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none no-scrollbar">
          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap hidden sm:inline">Filter:</span>
          {categories.slice(0, 5).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-lavender-100 text-lavender-900 border border-lavender-300'
                  : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-lavender-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunity / Event Cards Grid */}
      {filteredList.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-lavender-200 shadow-card space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-lavender-100 text-lavender-600 flex items-center justify-center mx-auto">
            <Clock className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No {activeTab.toLowerCase()} opportunities found</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              There are currently no listings matching your search or filters in the {activeTab} section.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('All');
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white text-xs font-bold cursor-pointer hover:opacity-95"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredList.map(opp => {
            const isEnded = activeTab === 'Ended' || opp.eventStatus === 'Ended';
            const isVerified = opp.verificationStatus !== 'Needs Verification';

            return (
              <div
                key={opp.id}
                className={`group relative bg-white rounded-3xl border transition-all duration-200 flex flex-col justify-between p-5 sm:p-6 ${
                  isEnded 
                    ? 'opacity-70 bg-slate-50/80 border-slate-200' 
                    : 'border-lavender-200/80 hover:border-lavender-300 hover:shadow-card-hover'
                }`}
              >
                <div>
                  {/* Card Header: Company, Logo, Badges, Bookmark */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center shadow-xs flex-shrink-0">
                        <img
                          src={opp.companyLogo}
                          alt={opp.company}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug truncate group-hover:text-lavender-700 transition-colors">
                          {opp.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5 font-medium">
                          <span className="text-slate-800 font-bold">{opp.company}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-lavender-500" />
                            {opp.location}
                          </span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleSave(opp.id)}
                      className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                        opp.saved
                          ? 'bg-lavender-50 border-lavender-200 text-lavender-700'
                          : 'bg-slate-50 border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${opp.saved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Trust & Category Badges */}
                  <div className="flex flex-wrap items-center gap-2 mt-3.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-lavender-50 text-lavender-800 font-bold text-xs border border-lavender-200/70">
                      {opp.type}
                    </span>

                    {isVerified ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-md">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        ✓ Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-md">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        ⚠ Needs Verification
                      </span>
                    )}

                    {opp.startDate && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {opp.startDate}
                      </span>
                    )}
                  </div>

                  {/* Match & Deadline Row */}
                  <div className="flex items-center gap-2 mt-3">
                    <MatchBadge percentage={opp.matchPercentage} />
                    {isEnded ? (
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                        Ended / Closed
                      </span>
                    ) : (
                      <DeadlineBadge days={opp.deadlineDays} />
                    )}
                  </div>

                  {/* Skills Pills */}
                  <div className="mt-3.5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Required Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {opp.requiredSkills.slice(0, 4).map((skill, i) => (
                        <span key={i} className="text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 font-medium">
                          {skill}
                        </span>
                      ))}
                      {opp.requiredSkills.length > 4 && (
                        <span className="text-xs px-2 py-0.5 rounded-lg bg-slate-50 text-slate-400 font-medium">
                          +{opp.requiredSkills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Short description */}
                  <p className="text-xs text-slate-600 line-clamp-2 mt-3.5 leading-relaxed">
                    {opp.about || opp.overview}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-700">
                    {opp.stipend || opp.duration || 'Open application'}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigateTo('opportunity-details', { opportunityId: opp.id })}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-lavender-50 hover:text-lavender-800 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                    >
                      View Details
                    </button>

                    {!isEnded && (
                      <button
                        onClick={() => {
                          setSelectedOpportunityId(opp.id);
                          setIsApplyModalOpen(true);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-lavender-700 to-indigo-600 hover:opacity-95 text-white text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1"
                      >
                        <span>{opp.applied ? 'Applied ✓' : 'Apply'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
