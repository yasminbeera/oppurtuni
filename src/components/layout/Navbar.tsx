import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown,
  User,
  Settings,
  Bookmark,
  FileText,
  LogOut,
  BrainCircuit,
  Home
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OpportuniLogo } from '../common/OpportuniLogo';
import { NotificationDropdown } from '../common/NotificationDropdown';

export const Navbar: React.FC = () => {
  const { 
    userProfile, 
    unreadCount, 
    navigateTo, 
    searchQuery, 
    setSearchQuery,
    isLoggedIn,
    logout,
    currentPage
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('opportunities');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-lavender-200/80 px-4 sm:px-6 lg:px-8 py-3">
      <div className="w-full flex items-center justify-between gap-4">
        {/* Left: Mobile Logo & Menu toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-2 rounded-2xl text-slate-600 hover:text-slate-900 hover:bg-lavender-50 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div 
            onClick={() => navigateTo('dashboard')}
            className="cursor-pointer lg:hidden flex items-center"
          >
            <OpportuniLogo size="sm" />
          </div>
        </div>

        {/* Center: Search Bar with soft lavender glow */}
        <div className="flex-1 max-w-2xl mx-2 sm:mx-4">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-lavender-500" />
            <input
              type="text"
              placeholder="Search opportunities, roles, skills, companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 sm:py-2.5 text-xs sm:text-sm bg-slate-50/90 border border-lavender-200/90 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500 transition-all placeholder:text-slate-400 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Search CTA pill */}
          <button
            onClick={() => navigateTo('ai-search')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-lavender-100 to-purple-100 hover:from-lavender-200 hover:to-purple-200 text-lavender-800 text-xs font-bold border border-lavender-300/80 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-lavender-600 animate-pulse" />
            <span>AI Search</span>
          </button>

          {/* Notification Icon */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className={`p-2.5 rounded-2xl border transition-all relative ${
                isNotifOpen 
                  ? 'bg-lavender-100 border-lavender-300 text-lavender-800' 
                  : 'bg-white border-lavender-200 text-slate-600 hover:text-slate-900 hover:bg-lavender-50/70'
              }`}
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 text-lavender-700" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white font-bold text-[9px] rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            <NotificationDropdown 
              isOpen={isNotifOpen} 
              onClose={() => setIsNotifOpen(false)} 
            />
          </div>

          {/* User Profile avatar & dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1 pl-1.5 sm:pr-2.5 rounded-2xl border border-lavender-200 hover:border-lavender-300 bg-white hover:bg-lavender-50/50 transition-all shadow-2xs"
            >
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl object-cover ring-1 ring-lavender-400/40"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-tight">
                  {userProfile.name.split(' ')[0]}
                </p>
                <p className="text-[10px] text-emerald-600 font-semibold leading-none mt-0.5">
                  {userProfile.profileCompleted}% Ready
                </p>
              </div>
              <ChevronDown className="hidden md:block w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Profile Menu Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-lavender-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2.5 border-b border-lavender-100">
                  <p className="text-xs font-bold text-slate-900">{userProfile.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{userProfile.email}</p>
                  <p className="text-[10px] text-lavender-600 font-medium mt-1">{userProfile.college}</p>
                </div>

                <div className="p-1 space-y-0.5">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigateTo('profile-settings');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-lavender-50 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4 text-lavender-600" />
                    <span>View Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigateTo('saved-opportunities');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-lavender-50 rounded-xl transition-colors"
                  >
                    <Bookmark className="w-4 h-4 text-pink-600" />
                    <span>Saved Opportunities</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigateTo('application-tracker');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-lavender-50 rounded-xl transition-colors"
                  >
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>My Applications</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigateTo('skill-gap');
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-700 hover:bg-lavender-50 rounded-xl transition-colors"
                  >
                    <BrainCircuit className="w-4 h-4 text-teal-600" />
                    <span>Skill Gap AI</span>
                  </button>
                </div>

                <div className="border-t border-lavender-100 mt-1 pt-1 px-1">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 mt-3 pt-3 pb-2 space-y-1">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('dashboard');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 font-medium rounded-xl hover:bg-slate-50"
          >
            <Home className="w-4 h-4 text-slate-400" />
            <span>Home Dashboard</span>
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('opportunities');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 font-medium rounded-xl hover:bg-slate-50"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Find Opportunities</span>
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('saved-opportunities');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 font-medium rounded-xl hover:bg-slate-50"
          >
            <Bookmark className="w-4 h-4 text-slate-400" />
            <span>Saved Opportunities</span>
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('application-tracker');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 font-medium rounded-xl hover:bg-slate-50"
          >
            <FileText className="w-4 h-4 text-slate-400" />
            <span>Applications Tracker</span>
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('skill-gap');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 font-medium rounded-xl hover:bg-slate-50"
          >
            <BrainCircuit className="w-4 h-4 text-slate-400" />
            <span>Skill Gap AI</span>
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigateTo('create-profile');
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 font-medium rounded-xl hover:bg-slate-50"
          >
            <User className="w-4 h-4 text-slate-400" />
            <span>Edit Profile</span>
          </button>
        </div>
      )}
    </header>
  );
};
