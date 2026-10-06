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
  Megaphone,
  PlusCircle
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
    colorBg: string;
    colorText: string;
    badgeColor?: string;
  }[] = [
    { 
      id: 'dashboard', 
      label: 'Home', 
      icon: <Home className="w-4 h-4" />,
      colorBg: 'bg-lavender-100/90 text-lavender-700',
      colorText: 'group-hover:text-lavender-700'
    },
    { 
      id: 'opportunities', 
      label: 'Find Opportunities', 
      icon: <Search className="w-4 h-4" />,
      colorBg: 'bg-emerald-100/90 text-emerald-700',
      colorText: 'group-hover:text-emerald-700'
    },
    { 
      id: 'ai-search', 
      label: 'AI Search', 
      icon: <Sparkles className="w-4 h-4" />, 
      ai: true,
      colorBg: 'bg-fuchsia-100/90 text-fuchsia-700',
      colorText: 'group-hover:text-fuchsia-700'
    },
    { 
      id: 'application-tracker', 
      label: 'Applications', 
      icon: <FileText className="w-4 h-4" />, 
      badge: appliedCount,
      colorBg: 'bg-amber-100/90 text-amber-700',
      colorText: 'group-hover:text-amber-700'
    },
    { 
      id: 'saved-opportunities', 
      label: 'Saved', 
      icon: <Bookmark className="w-4 h-4" />, 
      badge: savedCount,
      colorBg: 'bg-pink-100/90 text-pink-700',
      colorText: 'group-hover:text-pink-700'
    },
    { 
      id: 'skill-gap', 
      label: 'Skill Gap', 
      icon: <BrainCircuit className="w-4 h-4" />,
      colorBg: 'bg-teal-100/90 text-teal-700',
      colorText: 'group-hover:text-teal-700'
    },
    { 
      id: 'career-insights', 
      label: 'Career Insights', 
      icon: <TrendingUp className="w-4 h-4" />,
      colorBg: 'bg-indigo-100/90 text-indigo-700',
      colorText: 'group-hover:text-indigo-700'
    },
    { 
      id: 'post-opportunity', 
      label: 'Post Opportunity', 
      icon: <Megaphone className="w-4 h-4" />,
      colorBg: 'bg-rose-100/90 text-rose-600',
      colorText: 'group-hover:text-rose-600',
      badgeColor: 'bg-rose-100 text-rose-700'
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: <Settings className="w-4 h-4" />,
      colorBg: 'bg-violet-100/90 text-violet-700',
      colorText: 'group-hover:text-violet-700'
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white/90 backdrop-blur-md border-r border-lavender-200/80 min-h-screen sticky top-0 h-screen py-5 px-3.5 justify-between z-30 select-none shadow-xs">
      {/* Top Logo & AI Action */}
      <div>
        <div 
          onClick={() => navigateTo('dashboard')}
          className="cursor-pointer px-3 pb-5 flex items-center justify-between"
        >
          <OpportuniLogo size="md" />
        </div>

        {/* AI Action pill button in sidebar */}
        <div className="px-1 mb-4">
          <button
            onClick={() => navigateTo('ai-search')}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-lavender-700 via-purple-600 to-softblue-600 text-white text-xs font-bold shadow-md shadow-lavender-500/30 hover:shadow-lavender-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all group"
          >
            <Sparkles className="w-4 h-4 text-mint-200 animate-spin-slow group-hover:rotate-45 transition-transform" />
            <span>AI Scout Agent</span>
            <span className="text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold ml-auto">
              Live
            </span>
          </button>
        </div>

        {/* Main Nav links: exactly Home, Find Opportunities, AI Search, Applications, Saved, Skill Gap, Career Insights, Post Opportunity, Settings */}
        <nav className="space-y-1 px-0.5">
          {navItems.map(item => {
            const isActive = 
              currentPage === item.id || 
              (item.id === 'opportunities' && currentPage === 'opportunity-details');

            return (
              <button
                key={item.id + item.label}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-2xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-lavender-700 via-purple-600 to-indigo-600 text-white font-bold shadow-md shadow-lavender-500/25'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-lavender-50/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                    isActive 
                      ? 'bg-white/20 text-white shadow-xs' 
                      : `${item.colorBg} group-hover:scale-110 shadow-2xs`
                  }`}>
                    {item.icon}
                  </div>
                  <span className={isActive ? 'text-white font-bold' : 'group-hover:text-slate-900'}>
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.id === 'post-opportunity' && !isActive && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-700 border border-rose-200">
                      Post
                    </span>
                  )}
                  {item.ai && (
                    <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
                      isActive 
                        ? 'bg-white/25 text-white' 
                        : 'bg-fuchsia-100 text-fuchsia-700 border border-fuchsia-200'
                    }`}>
                      AI
                    </span>
                  )}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
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
      <div className="border-t border-lavender-100 pt-3 px-1 space-y-1">
        <button
          onClick={() => navigateTo('profile-settings')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-semibold transition-all group ${
            currentPage === 'profile-settings'
              ? 'bg-lavender-100 text-lavender-900 font-bold'
              : 'text-slate-700 hover:text-slate-900 hover:bg-lavender-50/60'
          }`}
        >
          <div className="w-7 h-7 rounded-xl bg-mint-100/90 text-mint-700 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
            <User className="w-4 h-4" />
          </div>
          <span>My Profile</span>
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-2xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50/80 transition-all group"
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
