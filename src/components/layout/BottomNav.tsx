import React from 'react';
import { Home, Search, Bookmark, FileText, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageType } from '../../types';

export const BottomNav: React.FC = () => {
  const { currentPage, navigateTo, opportunities } = useApp();

  const savedCount = opportunities.filter(o => o.saved).length;

  const items: { id: PageType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'opportunities', label: 'Search', icon: <Search className="w-5 h-5" /> },
    { id: 'saved-opportunities', label: 'Saved', icon: <Bookmark className="w-5 h-5" />, badge: savedCount },
    { id: 'application-tracker', label: 'Applications', icon: <FileText className="w-5 h-5" /> },
    { id: 'profile-settings', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-lavender-200 px-2 py-2 flex items-center justify-around shadow-lg">
      {items.map(item => {
        const isActive = currentPage === item.id || (item.id === 'opportunities' && (currentPage === 'opportunity-details' || currentPage === 'ai-search'));

        return (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              isActive ? 'text-lavender-700 font-bold scale-105' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <div className="relative">
              {item.icon}
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1 -right-2 bg-gradient-to-r from-lavender-700 to-indigo-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-1">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
