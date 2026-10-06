import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Briefcase, 
  Trophy, 
  Users, 
  ChevronRight, 
  Clock, 
  TrendingUp,
  BrainCircuit,
  MapPin,
  CheckCircle2,
  Calendar,
  Star,
  ShieldCheck,
  Compass,
  FileCheck,
  Flame,
  Globe2,
  Zap,
  Target
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OpportunityCard } from '../components/common/OpportunityCard';
import { MatchBadge, DeadlineBadge } from '../components/common/Badge';
import { Opportunity, OpportunityCategory } from '../types';

export const DashboardPage: React.FC = () => {
  const { 
    userProfile, 
    opportunities, 
    navigateTo, 
    setActiveCategory, 
    setSelectedSkillGapOppId 
  } = useApp();

  // Recommended opportunities (top matches)
  const recommendedOpps = opportunities.slice(0, 4);

  // Deadlines
  const deadlineItems = opportunities
    .filter((o: Opportunity) => o.deadlineDays <= 7)
    .sort((a: Opportunity, b: Opportunity) => a.deadlineDays - b.deadlineDays)
    .slice(0, 4);

  // 8 Colorful Categories
  const categories: { 
    id: OpportunityCategory; 
    title: string; 
    subtitle: string; 
    count: string;
    icon: React.ReactNode; 
    color: string; 
    bg: string;
    border: string;
    iconBg: string;
  }[] = [
    { 
      id: 'Internships', 
      title: 'Internships', 
      subtitle: 'Summer & Fall roles', 
      count: '4,200+',
      icon: <GraduationCap className="w-5 h-5 text-emerald-600" />,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50/70 hover:bg-emerald-50',
      border: 'border-emerald-200/80 hover:border-emerald-300',
      iconBg: 'bg-emerald-100/90 text-emerald-700'
    },
    { 
      id: 'Jobs', 
      title: 'Jobs', 
      subtitle: 'Early career & full-time', 
      count: '3,800+',
      icon: <Briefcase className="w-5 h-5 text-softblue-600" />,
      color: 'text-softblue-700',
      bg: 'bg-softblue-50/70 hover:bg-softblue-50',
      border: 'border-softblue-200/80 hover:border-softblue-300',
      iconBg: 'bg-softblue-100/90 text-softblue-700'
    },
    { 
      id: 'Hackathons', 
      title: 'Hackathons', 
      subtitle: 'Build & innovate', 
      count: '1,200+',
      icon: <Trophy className="w-5 h-5 text-rose-600" />,
      color: 'text-rose-700',
      bg: 'bg-rose-50/70 hover:bg-rose-50',
      border: 'border-rose-200/80 hover:border-rose-300',
      iconBg: 'bg-rose-100/90 text-rose-700'
    },
    { 
      id: 'Fellowships', 
      title: 'Fellowships', 
      subtitle: 'Elite funded programs', 
      count: '320+',
      icon: <Star className="w-5 h-5 text-lavender-600" />,
      color: 'text-lavender-700',
      bg: 'bg-lavender-50/70 hover:bg-lavender-50',
      border: 'border-lavender-200/80 hover:border-lavender-300',
      iconBg: 'bg-lavender-100/90 text-lavender-700'
    },
    { 
      id: 'Competitions', 
      title: 'Competitions', 
      subtitle: 'Win prizes & badges', 
      count: '580+',
      icon: <Flame className="w-5 h-5 text-amber-600" />,
      color: 'text-amber-700',
      bg: 'bg-amber-50/70 hover:bg-amber-50',
      border: 'border-amber-200/80 hover:border-amber-300',
      iconBg: 'bg-amber-100/90 text-amber-700'
    },
    { 
      id: 'Scholarships', 
      title: 'Scholarships', 
      subtitle: 'Financial grants', 
      count: '1,100+',
      icon: <ShieldCheck className="w-5 h-5 text-teal-600" />,
      color: 'text-teal-700',
      bg: 'bg-teal-50/70 hover:bg-teal-50',
      border: 'border-teal-200/80 hover:border-teal-300',
      iconBg: 'bg-teal-100/90 text-teal-700'
    },
    { 
      id: 'Meetups', 
      title: 'Meetups', 
      subtitle: 'Network with pros', 
      count: '850+',
      icon: <Users className="w-5 h-5 text-indigo-600" />,
      color: 'text-indigo-700',
      bg: 'bg-indigo-50/70 hover:bg-indigo-50',
      border: 'border-indigo-200/80 hover:border-indigo-300',
      iconBg: 'bg-indigo-100/90 text-indigo-700'
    },
    { 
      id: 'Workshops', 
      title: 'Workshops', 
      subtitle: 'Hands-on masterclasses', 
      count: '760+',
      icon: <Compass className="w-5 h-5 text-pink-600" />,
      color: 'text-pink-700',
      bg: 'bg-pink-50/70 hover:bg-pink-50',
      border: 'border-pink-200/80 hover:border-pink-300',
      iconBg: 'bg-pink-100/90 text-pink-700'
    },
  ];

  const handleCategorySelect = (cat: OpportunityCategory) => {
    setActiveCategory(cat);
    navigateTo('opportunities', { category: cat });
  };

  return (
    <div className="w-full space-y-6 sm:space-y-7 animate-in fade-in duration-200">
      
      {/* Top Greeting & Live Stats Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-lavender-200/80 shadow-card">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-lavender-600 to-indigo-600 flex items-center justify-center text-white text-xl shadow-md shadow-lavender-500/20">
            👋
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Good morning, {userProfile.name.split(' ')[0]}!</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              <span className="text-lavender-700 font-bold">12 new opportunities</span> matched your profile today across 8 platforms.
            </p>
          </div>
        </div>

        {/* Quick KPI badges */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>AI Scout Active</span>
          </div>

          <button
            onClick={() => navigateTo('ai-search')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-lavender-700 via-purple-600 to-softblue-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-lavender-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 text-mint-200" />
            <span>Launch Multi-Agent Crawler</span>
          </button>
        </div>
      </div>

      {/* Row 1: Find My Opportunities Hero (8 Cols) + Profile Strength Card (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        
        {/* Find My Opportunities Hero Action Card (8 Cols) */}
        <div 
          onClick={() => navigateTo('ai-search')}
          className="lg:col-span-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-lavender-50/90 to-lavender-100/70 p-6 sm:p-7 text-slate-900 border border-lavender-200/90 shadow-md shadow-lavender-200/40 hover:border-lavender-300 transition-all cursor-pointer group flex flex-col justify-between"
        >
          {/* Subtle Ambient Pastel Blobs */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-lavender-200/30 to-transparent pointer-events-none" />
          <div className="absolute -right-6 -bottom-6 w-48 h-48 bg-mint-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-2 right-12 w-24 h-24 bg-lavender-400/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-lavender-100 text-lavender-800 border border-lavender-200 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-lavender-600" />
              <span>Multi-Platform AI Discovery Engine</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-slate-900">
              Find My Best Opportunities
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Our 4 intelligent AI agents crawl LinkedIn, Unstop, Naukri, Wellfound, Devfolio & Handshake to match high-intent roles customized to your skills.
            </p>

            {/* Platform source chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {['LinkedIn', 'Unstop', 'Internshala', 'Wellfound', 'Devfolio', 'Meetup'].map((src, i) => (
                <span key={i} className="text-[11px] font-semibold bg-white/90 border border-lavender-200/80 px-2.5 py-0.5 rounded-lg text-slate-700 shadow-2xs">
                  {src}
                </span>
              ))}
              <span className="text-[11px] font-bold text-lavender-700 ml-1">+60 others</span>
            </div>
          </div>

          <div className="relative z-10 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-600">Live multi-platform scanner ready</span>
            </div>

            {/* Prominent Start Discovery CTA */}
            <div className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 hover:from-lavender-800 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-lavender-500/30 group-hover:scale-105 transition-all">
              <span>Start Discovery</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Profile Strength & Goal Card (4 Cols) */}
        <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-lavender-200/80 shadow-card flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-13 h-13 rounded-2xl object-cover ring-2 ring-lavender-500/30 shadow-md"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  ✓
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{userProfile.name}</h3>
                <p className="text-xs text-slate-500">{userProfile.year} • {userProfile.college}</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-lavender-100 text-lavender-800 text-xs font-bold">
              Level 4
            </span>
          </div>

          {/* Profile Progress Meter */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-lavender-50/60 border border-lavender-100">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Profile Match Power</span>
              <span className="text-lavender-700">{userProfile.profileCompleted}%</span>
            </div>
            <div className="w-full bg-white h-2.5 rounded-full overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-lavender-600 via-purple-600 to-mint-500 h-full rounded-full transition-all duration-700"
                style={{ width: `${userProfile.profileCompleted}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Add 2 more skills to reach <span className="font-bold text-emerald-600">95% Match Power</span>.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => navigateTo('profile-settings')}
              className="flex-1 py-2.5 px-3 rounded-xl bg-lavender-100 hover:bg-lavender-200 text-lavender-800 text-xs font-bold transition-all text-center"
            >
              Edit Profile
            </button>
            <button
              onClick={() => navigateTo('career-insights')}
              className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
            >
              <span>Insights</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Row 2: 8 Quick Category Exploration Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Compass className="w-4 h-4 text-lavender-600" />
            <span>Explore Opportunities by Category</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">8 Categories curated for students</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-3 sm:gap-3.5">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`p-3.5 sm:p-4 rounded-2xl border ${cat.bg} ${cat.border} transition-all duration-200 cursor-pointer group flex flex-col justify-between hover:shadow-card hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className={`p-2 rounded-xl ${cat.iconBg} shadow-2xs group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <ChevronRight className={`w-3.5 h-3.5 ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-slate-950">{cat.title}</h3>
                <p className="text-[10px] text-slate-500 truncate mt-0.5">{cat.subtitle}</p>
                <p className={`text-[11px] font-extrabold ${cat.color} mt-1.5`}>{cat.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 3: Main Body Split — Recommended Opportunities (8 Cols) & Right Side Insights/Deadlines (4 Cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 pt-1">
        
        {/* Left / Center: Recommended Opportunities (8 Cols) */}
        <div className="xl:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" />
                <span>AI Recommended For You</span>
              </h2>
              <p className="text-xs text-slate-500">Ranked by skill match score, preferred location & deadline</p>
            </div>
            <button
              onClick={() => navigateTo('opportunities')}
              className="text-xs font-bold text-lavender-700 hover:text-lavender-800 flex items-center gap-1 bg-lavender-100/80 hover:bg-lavender-100 px-3 py-1.5 rounded-xl transition-colors"
            >
              <span>View all ({opportunities.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedOpps.map((opp: Opportunity) => (
              <OpportunityCard key={opp.id} opportunity={opp} />
            ))}
          </div>
        </div>

        {/* Right Side Column (4 Cols): Upcoming Deadlines + AI Career Insight */}
        <div className="xl:col-span-4 space-y-5">
          
          {/* Upcoming Deadlines Widget with Bright Badges */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-lavender-200/80 shadow-card space-y-3.5">
            <div className="flex items-center justify-between border-b border-lavender-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">Upcoming Deadlines</h3>
              </div>
              <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                4 closing soon
              </span>
            </div>

            <div className="space-y-2.5">
              {deadlineItems.map((item: Opportunity) => (
                <div
                  key={item.id}
                  onClick={() => navigateTo('opportunity-details', { opportunityId: item.id })}
                  className="p-3 rounded-2xl border border-lavender-100 hover:border-lavender-300 hover:bg-lavender-50/50 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 p-1.5 flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <img
                        src={item.companyLogo}
                        alt={item.company}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate group-hover:text-lavender-700 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">{item.company} • {item.location}</p>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <DeadlineBadge days={item.deadlineDays} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Career Insights & Readiness Widget */}
          <div className="bg-gradient-to-br from-lavender-50/90 via-purple-50/60 to-white rounded-3xl p-5 border border-lavender-200 shadow-card flex flex-col justify-between space-y-3.5">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lavender-200/80 text-lavender-800 text-xs font-bold">
                  <BrainCircuit className="w-3.5 h-3.5 text-lavender-700" />
                  <span>AI Career Intelligence</span>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  84/100 Readiness
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  You're 76% matched with Frontend Roles.
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Adding <strong className="text-lavender-700">TypeScript</strong> & <strong className="text-lavender-700">Next.js</strong> boosts match rate to <strong className="text-emerald-600">94%</strong>.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-lavender-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500">3 recommended roadmap modules</span>
              <button
                onClick={() => {
                  setSelectedSkillGapOppId('opp-2');
                  navigateTo('skill-gap');
                }}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-lavender-700 to-indigo-600 hover:opacity-90 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>Skill Gap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
