import React, { useState } from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OpportunityCategory } from '../../types';

export const FilterModal: React.FC = () => {
  const { 
    isFilterModalOpen, 
    setIsFilterModalOpen, 
    activeCategory, 
    setActiveCategory,
    sortBy,
    setSortBy,
    showToast
  } = useApp();

  const [selectedModes, setSelectedModes] = useState<string[]>(['Remote', 'Hybrid', 'On-site', 'Online']);
  const [minMatch, setMinMatch] = useState<number>(60);

  const categories: OpportunityCategory[] = [
    'All', 
    'Internships', 
    'Jobs', 
    'Hackathons', 
    'Meetups', 
    'Fellowships', 
    'Competitions', 
    'Scholarships', 
    'Workshops'
  ];

  if (!isFilterModalOpen) return null;

  const toggleMode = (mode: string) => {
    setSelectedModes(prev => 
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    );
  };

  const handleReset = () => {
    setSelectedModes(['Remote', 'Hybrid', 'On-site', 'Online']);
    setMinMatch(60);
    setActiveCategory('All');
    setSortBy('match');
    showToast('Filters reset to default', 'info');
  };

  const handleApply = () => {
    setIsFilterModalOpen(false);
    showToast('Filters applied successfully', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-lavender-100 p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-lavender-100">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-lavender-600" />
            <h2 className="text-base font-bold text-slate-900">Filter Opportunities</h2>
          </div>
          <button
            onClick={() => setIsFilterModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-5">
          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Category</label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-lavender-700 to-indigo-600 text-white border-lavender-600 shadow-xs'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-lavender-50 hover:border-lavender-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Work Mode */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Work Mode / Location</label>
            <div className="grid grid-cols-2 gap-2">
              {['Remote', 'Hybrid', 'On-site', 'Online'].map(mode => {
                const isSelected = selectedModes.includes(mode);
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => toggleMode(mode)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-lavender-50 text-lavender-700 border-lavender-300'
                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {mode}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Match Score Slider */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700">Minimum Match Percentage</label>
              <span className="text-xs font-bold text-lavender-600">{minMatch}%+</span>
            </div>
            <input
              type="range"
              min="50"
              max="95"
              step="5"
              value={minMatch}
              onChange={(e) => setMinMatch(Number(e.target.value))}
              className="w-full accent-lavender-600 cursor-pointer"
            />
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">Sort Results By</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'match', label: 'Best Match' },
                { id: 'deadline', label: 'Deadline' },
                { id: 'stipend', label: 'Highest Pay' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSortBy(item.id as any)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                    sortBy === item.id
                      ? 'bg-gradient-to-r from-lavender-700 to-indigo-600 text-white border-lavender-600'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-lavender-100 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleApply}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 hover:opacity-90 text-white text-xs font-bold shadow-md shadow-lavender-500/25 transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
