import React from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  TrendingUp, 
  Award, 
  BrainCircuit, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Briefcase, 
  Zap,
  BarChart3,
  Compass,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CareerInsightsPage: React.FC = () => {
  const { userProfile, navigateTo, goBack } = useApp();

  const careerReadinessScore = 84;

  const radarMetrics = [
    { label: 'Technical Depth', value: 85, color: 'bg-lavender-600' },
    { label: 'Problem Solving', value: 90, color: 'bg-softblue-600' },
    { label: 'Resume Impact', value: 78, color: 'bg-mint-500' },
    { label: 'Market Demand Fit', value: 92, color: 'bg-periwinkle-500' },
    { label: 'Domain Versatility', value: 75, color: 'bg-softpink-500' },
  ];

  const trendingSkills = [
    { skill: 'TypeScript', growth: '+42% this quarter', demand: 'High', fit: 'Top gap for your SDE matches' },
    { skill: 'Next.js 14 / App Router', growth: '+38% demand', demand: 'High', fit: 'Expands frontend roles' },
    { skill: 'Agentic Workflows / LLMs', growth: '+85% explosion', demand: 'Very High', fit: 'Differentiates internship applications' },
    { skill: 'Docker & Microservices', growth: '+24% steady', demand: 'Medium', fit: 'Boosts backend qualification' },
  ];

  const targetRoles = [
    { 
      title: 'Frontend Engineer', 
      match: 91, 
      openings: '340+ active student roles',
      badge: 'Best Match', 
      desc: 'Matches your React, Web Development & modern UI craftsmanship.'
    },
    { 
      title: 'Full-Stack Software Engineer', 
      match: 86, 
      openings: '510+ active student roles',
      badge: 'High Growth', 
      desc: 'Adding Node/Express or FastAPI will push your eligibility past 95%.'
    },
    { 
      title: 'AI Application Engineer', 
      match: 82, 
      openings: '190+ emerging roles',
      badge: 'Futuristic', 
      desc: 'High alignment with your AI/ML interest and Python foundations.'
    },
  ];

  return (
    <div className="w-full space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner & Header */}
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
                Career Insights & Readiness
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-lavender-100 text-lavender-800 text-[11px] font-bold">
                <Sparkles className="w-3 h-3 text-lavender-600" />
                AI Evaluated
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Comprehensive diagnostics on your market competitiveness and career trajectory
            </p>
          </div>
        </div>

        <button
          onClick={() => navigateTo('ai-search')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-lavender-600 to-indigo-600 hover:from-lavender-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-lavender-500/25 transition-all"
        >
          <BrainCircuit className="w-4 h-4 text-cyan-200" />
          <span>Sync Real-Time Markets</span>
        </button>
      </div>

      {/* Main Grid: Viewport Optimized for Laptop Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Readiness Score & Radar */}
        <div className="lg:col-span-5 space-y-6">
          {/* Circular Readiness Score Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-lavender-200/80 shadow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-lavender-100/50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-extrabold text-lavender-700 uppercase tracking-wider">
                Overall Competitiveness
              </span>
              <span className="text-xs font-bold text-mint-600 bg-mint-50 px-2.5 py-1 rounded-full border border-mint-200">
                Top 15% in Cohort
              </span>
            </div>

            <div className="flex items-center gap-6 my-2">
              {/* Circular Gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#F3F0FC"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#readinessGrad)"
                    strokeWidth="10"
                    strokeDasharray={`${careerReadinessScore * 2.51} 251`}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                  <defs>
                    <linearGradient id="readinessGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="50%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900">{careerReadinessScore}</span>
                  <span className="text-[10px] font-bold text-slate-400">/ 100</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  Career Readiness Score
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Based on 8 verified student skills, your project portfolio, and 126 active postings.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>+12 pts increase this month</span>
                </div>
              </div>
            </div>

            {/* Quick Skill Strength Breakdown */}
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Skill Dimension Strengths</span>
                <span className="text-slate-400 font-medium text-[11px]">AI Benchmarking</span>
              </h4>

              <div className="space-y-2.5">
                {radarMetrics.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-600">{item.label}</span>
                      <span className="text-slate-900 font-bold">{item.value}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${item.color} transition-all duration-700`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Career Direction Advice Card */}
          <div className="bg-gradient-to-br from-lavender-50 via-softblue-50/50 to-softpink-50/30 rounded-3xl p-6 border border-lavender-200/80 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-lavender-800 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-lavender-600" />
              <span>AI Strategic Guidance</span>
            </div>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              "Your profile strongly correlates with modern product engineering teams. Prioritizing one full-stack TypeScript project will immediately make you a tier-1 candidate for summer internships."
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('skill-gap')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-lavender-700 hover:text-lavender-900 transition-colors"
              >
                <span>View Recommended 4-Week Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Target Roles & Market Demand Trends */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Target Role Compatibility Cards */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-lavender-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Target Role Compatibility
                </h3>
                <p className="text-xs text-slate-500">Roles calculated from your skills and active demand</p>
              </div>
              <button
                onClick={() => navigateTo('opportunities')}
                className="text-xs font-bold text-softblue-600 hover:text-softblue-700"
              >
                View matching postings →
              </button>
            </div>

            <div className="space-y-3">
              {targetRoles.map((role, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:border-lavender-300 hover:bg-lavender-50/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{role.title}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lavender-100 text-lavender-800">
                        {role.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{role.desc}</p>
                    <span className="text-[11px] font-semibold text-mint-600 block">
                      {role.openings}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 sm:flex-col sm:items-end flex-shrink-0">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-slate-900">{role.match}%</span>
                      <span className="text-[10px] text-slate-500 font-semibold">Fit</span>
                    </div>
                    <button
                      onClick={() => navigateTo('opportunities')}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 text-xs font-bold shadow-2xs hover:border-indigo-300 transition-all"
                    >
                      Filter Roles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Demand & Emerging Skills */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-lavender-200/80 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Market Demand & Skill Growth</span>
                </h3>
                <p className="text-xs text-slate-500">Fastest growing student skills in Q2 2025</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {trendingSkills.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 hover:shadow-sm transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900">{item.skill}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {item.growth}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">{item.fit}</p>
                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                    <span>Demand: <strong className="text-slate-700">{item.demand}</strong></span>
                    <button 
                      onClick={() => navigateTo('skill-gap')}
                      className="text-indigo-600 hover:underline font-bold"
                    >
                      Add to path +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
