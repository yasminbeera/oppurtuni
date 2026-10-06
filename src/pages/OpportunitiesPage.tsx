import React from 'react';
import { 
  ArrowLeft, 
  Search, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  Filter,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/common/OpportunityCard';
import { Opportunity, OpportunityCategory } from '../types';

export const OpportunitiesPage: React.FC = () => {
  const { 
    opportunities, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery,
    sortBy,
    setSortBy,
    setIsFilterModalOpen,
    navigateTo,
    goBack 
  } = useApp();

  const categories: OpportunityCategory[] = ['All', 'Internships', 'Jobs', 'Hackathons', 'Meetups', 'Fellowships', 'Competitions', 'Scholarships', 'Workshops'];

  // Filtered list based on category & search
  const filteredOpportunities = opportunities.filter((opp: Opportunity) => {
    const matchesCat = 
      activeCategory === 'All' || 
      (activeCategory === 'Internships' && opp.type === 'Internship') || 
      (activeCategory === 'Jobs' && opp.type === 'Job') || 
      (activeCategory === 'Hackathons' && opp.type === 'Hackathon') || 
      (activeCategory === 'Meetups' && opp.type === 'Meetup') ||
      (activeCategory === 'Fellowships' && opp.type === 'Fellowship') ||
      (activeCategory === 'Competitions' && opp.type === 'Competition') ||
      (activeCategory === 'Scholarships' && opp.type === 'Scholarship') ||
      (activeCategory === 'Workshops' && opp.type === 'Workshop');

    const matchesSearch = 
      !searchQuery.trim() ||
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.requiredSkills.some((skill: string) => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  }).sort((a: Opportunity, b: Opportunity) => {
    if (sortBy === 'match') {
      return b.matchPercentage - a.matchPercentage;
    } else if (sortBy === 'deadline') {
      return a.deadlineDays - b.deadlineDays;
    } else {
      return (b.stipend || '').localeCompare(a.stipend || '');
    }
  });

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-lavender-200/80 shadow-card">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2.5 rounded-2xl bg-slate-50 border border-lavender-200 text-slate-600 hover:text-slate-900 hover:bg-lavender-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Find Opportunities</span>
              <span className="text-xs bg-lavender-100 text-lavender-800 px-2.5 py-0.5 rounded-full font-bold">
                {filteredOpportunities.length} Available
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              AI-ranked listings unified across top platforms & direct employer postings
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <button
            onClick={() => navigateTo('post-opportunity')}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-lavender-50 hover:bg-lavender-100 text-lavender-800 border border-lavender-200 font-bold text-xs shadow-2xs transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-lavender-600" />
            <span>Post Opportunity</span>
          </button>

          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-lavender-200 hover:bg-lavender-50 text-xs font-bold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-lavender-600" />
            <span className="hidden sm:inline">Advanced Filters</span>
          </button>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-lavender-700 to-indigo-600 text-white shadow-sm shadow-lavender-500/25'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-lavender-50 hover:text-slate-900 hover:border-lavender-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search Bar & Sort Dropdown Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-lavender-200/80 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-lavender-500" />
          <input
            type="text"
            placeholder="Search by title, role, skill, company or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500 transition-all placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center justify-end gap-2 flex-shrink-0">
          <span className="text-xs text-slate-500 font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lavender-500/20 cursor-pointer"
          >
            <option value="match">Best Match</option>
            <option value="deadline">Closest Deadline</option>
            <option value="stipend">Highest Stipend</option>
          </select>
        </div>
      </div>

      {/* Opportunities Grid / List (Multi-column responsive) */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-lavender-200 space-y-4 shadow-card">
          <div className="w-14 h-14 rounded-2xl bg-lavender-100 text-lavender-600 flex items-center justify-center mx-auto shadow-sm">
            <Search className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No matching opportunities</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find any opportunities matching "{searchQuery}". Try adjusting your filters or search keywords.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-lavender-700 to-indigo-600 text-white text-xs font-bold shadow-xs hover:opacity-90"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredOpportunities.map((opp: Opportunity) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      )}
    </div>
  );
};
