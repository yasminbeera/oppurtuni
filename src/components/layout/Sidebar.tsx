import React from 'react';
import { 
  Home, 
  Search, 
  Bookmark, 
  FileText, 
  BrainCircuit, 
  User, 
  Settings,
  Sparkles,
  TrendingUp,
  LogOut,
  Clock
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OpportuniLogo } from '../common/OpportuniLogo';
import { PageType } from '../../types';

export const Sidebar: React.FC = () => {
  const { currentPage, navigateTo, opportunities, logout } = useApp();

  const savedCount = opportunities.filter(o => o.saved).length;
  const appliedCount = opportunities.filter(o => o.applied || o.applicationStatus !== undefined).length;

  const navItems: { 
    id: PageType; 
    label: string; 
    icon: React.ReactNode; 
    badge?: number; 
    ai?: boolean;
  }[] = [
    { 
      id: 'dashboard', 
      label: 'Home', 
      icon: <Home className="w-4 h-4" />
    },
    { 
      id: 'opportunities', 
      label: 'Find Opportunities', 
      icon: <Search className="w-4 h-4" />
    },
    { 
      id: 'ai-search', 
      label: 'AI Search', 
      icon: <Sparkles className="w-4 h-4" />, 
      ai: true
    },
    { 
      id: 'application-tracker', 
      label: 'Applications', 
      icon: <FileText className="w-4 h-4" />, 
      badge: appliedCount
    },
    { 
      id: 'saved-opportunities', 
      label: 'Saved', 
      icon: <Bookmark className="w-4 h-4" />, 
      badge: savedCount
    },
    { 
      id: 'skill-gap', 
      label: 'Skill Gap', 
      icon: <BrainCircuit className="w-4 h-4" />
    },
    { 
      id: 'career-insights', 
      label: 'Career Insights', 
      icon: <TrendingUp className="w-4 h-4" />
    },
    { 
      id: 'recents', 
      label: 'Recents', 
      icon: <Clock className="w-4 h-4" />
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: <Settings className="w-4 h-4" />
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white/95 backdrop-blur-md border-r border-lavender-200/80 min-h-screen sticky top-0 h-screen py-5 px-3.5 justify-between z-30 select-none shadow-xs">
      {/* Top Section: Logo & Direct Main Navigation */}
      <div>
        <div 
          onClick={() => navigateTo('dashboard')}
          className="cursor-pointer px-3 pb-5 pt-1 flex items-center justify-between"
        >
          <OpportuniLogo size="md" />
        </div>

        {/* Main Nav links: exactly 9 items */}
        <nav className="space-y-1 px-0.5 mt-1">
          {navItems.map(item => {
            const isActive = 
              currentPage === item.id || 
              (item.id === 'opportunities' && currentPage === 'opportunity-details');

            return (
              <button
                key={item.id + item.label}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 text-white font-bold shadow-md shadow-lavender-500/25'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-lavender-50/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-xs' 
                      : 'bg-lavender-100/70 text-lavender-700 group-hover:scale-110 group-hover:bg-lavender-200/80 shadow-2xs'
                  }`}>
                    {item.icon}
                  </div>
                  <span className={isActive ? 'text-white font-bold' : 'group-hover:text-slate-900'}>
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.ai && (
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
                      isActive 
                        ? 'bg-white/25 text-white' 
                        : 'bg-lavender-100 text-lavender-800 border border-lavender-200'
                    }`}>
                      AI
                    </span>
                  )}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-white text-lavender-800 shadow-2xs' 
                        : 'bg-lavender-100 text-lavender-800 font-extrabold'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Nav: My Profile & Log Out */}
      <div className="border-t border-lavender-100 pt-3 px-1 space-y-1.5">
        <button
          onClick={() => navigateTo('profile-settings')}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all group ${
            currentPage === 'profile-settings' || currentPage === 'notifications' || currentPage === 'account-security' || currentPage === 'help-support'
              ? 'bg-lavender-100 text-lavender-900 font-bold'
              : 'text-slate-700 hover:text-slate-900 hover:bg-lavender-50/70'
          }`}
        >
          <div className="w-7 h-7 rounded-xl bg-lavender-100/70 text-lavender-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
            <User className="w-4 h-4" />
          </div>
          <span>My Profile</span>
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-2xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50/80 transition-all group"
        >
          <div className="w-7 h-7 rounded-xl bg-rose-100/90 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
            <LogOut className="w-4 h-4" />
          </div>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
