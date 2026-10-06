import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Loader2, 
  Circle, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Bot, 
  Cpu, 
  Check, 
  Search,
  ExternalLink,
  TrendingUp,
  Layers,
  Database,
  Radio,
  Zap,
  Activity
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { aiAgentsList } from '../data/mockData';
import { AgentStatus } from '../types';

export const AiSearchPage: React.FC = () => {
  const { navigateTo, goBack } = useApp();

  const [agents, setAgents] = useState<AgentStatus[]>(aiAgentsList);
  const [currentStage, setCurrentStage] = useState<number>(2);
  const [overallProgress, setOverallProgress] = useState<number>(55);
  const [isSearchingComplete, setIsSearchingComplete] = useState<boolean>(false);
  const [scannedCount, setScannedCount] = useState<number>(248);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAgents(prev => [
        { ...prev[0], status: 'Completed', progressPercent: 100 },
        { ...prev[1], status: 'Completed', progressPercent: 100 },
        { ...prev[2], status: 'In Progress', progressPercent: 50 },
        { ...prev[3], status: 'Pending', progressPercent: 0 }
      ]);
      setCurrentStage(3);
      setOverallProgress(72);
      setScannedCount(512);
    }, 2000);

    const timer2 = setTimeout(() => {
      setAgents(prev => [
        { ...prev[0], status: 'Completed', progressPercent: 100 },
        { ...prev[1], status: 'Completed', progressPercent: 100 },
        { ...prev[2], status: 'Completed', progressPercent: 100 },
        { ...prev[3], status: 'In Progress', progressPercent: 60 }
      ]);
      setCurrentStage(4);
      setOverallProgress(90);
      setScannedCount(680);
    }, 3600);

    const timer3 = setTimeout(() => {
      setAgents(prev => [
        { ...prev[0], status: 'Completed', progressPercent: 100 },
        { ...prev[1], status: 'Completed', progressPercent: 100 },
        { ...prev[2], status: 'Completed', progressPercent: 100 },
        { ...prev[3], status: 'Completed', progressPercent: 100 }
      ]);
      setCurrentStage(5);
      setOverallProgress(100);
      setIsSearchingComplete(true);
      setScannedCount(740);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const platformSources = [
    { name: 'LinkedIn', color: 'bg-blue-500', count: '184 roles' },
    { name: 'Internshala', color: 'bg-softblue-500', count: '142 roles' },
    { name: 'Wellfound', color: 'bg-lavender-500', count: '96 roles' },
    { name: 'Devfolio', color: 'bg-mint-500', count: '48 hackathons' },
    { name: 'Unstop', color: 'bg-amber-500', count: '112 contests' },
    { name: 'Meetup', color: 'bg-rose-500', count: '34 events' },
    { name: 'Naukri', color: 'bg-indigo-500', count: '89 roles' },
    { name: 'Handshake', color: 'bg-emerald-500', count: '35 fellowships' },
  ];

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header */}
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
              <span>AI Multi-Agent Pipeline</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">Autonomous discovery across 8 connected platforms</p>
          </div>
        </div>

        {isSearchingComplete ? (
          <button
            onClick={() => navigateTo('opportunities')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-mint-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-emerald-500/25 animate-bounce"
          >
            <span>View 12 High Matches</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-lavender-100 text-lavender-800 text-xs font-bold border border-lavender-200">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-lavender-600" />
            <span>Scanning Platforms ({scannedCount} items)...</span>
          </div>
        )}
      </div>

      {/* Main Full-Width 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Center Column (7 Cols): 4 Agents Progression List */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-lavender-200/80 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-lavender-100 pb-3.5">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-lavender-600" />
              <span>Active Agent Pipeline</span>
            </h2>
            <span className="text-xs font-bold text-lavender-700 bg-lavender-100 px-3 py-1 rounded-full">
              {overallProgress}% Complete
            </span>
          </div>

          <div className="space-y-6">
            {/* Agent 1: Profile Agent */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-mint-50/50 border border-mint-200/60 transition-all">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
                1
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Profile Agent</h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                    <Check className="w-3 h-3 stroke-[3]" />
                    Completed
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  Extracted student profile, 8 verified skills, B.Tech CSE background, and internship preferences.
                </p>
              </div>
            </div>

            {/* Agent 2: Scout Agents */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-lavender-50/50 border border-lavender-200/60 transition-all">
              <div className="w-9 h-9 rounded-2xl bg-lavender-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
                2
              </div>
              <div className="flex-1 space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Scout Agents (Multi-Crawler)</h3>
                  {agents[1].status === 'Completed' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-lavender-700 bg-lavender-100 px-2.5 py-0.5 rounded-full">
                      <Loader2 className="w-3 h-3 animate-spin text-lavender-600" />
                      Crawling 8 Platforms
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600">
                  Real-time scanning across public job boards, hackathon portals, and fellowship directories ({scannedCount} postings parsed).
                </p>

                {/* Connected Platforms Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {platformSources.map((plat, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-white rounded-xl border border-slate-200 text-slate-700 flex items-center justify-between text-[11px]"
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className={`w-2 h-2 rounded-full ${plat.color} animate-pulse`} />
                        <span className="font-semibold truncate">{plat.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">{plat.count.split(' ')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Agent 3: Matching Agent */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-purple-50/50 border border-purple-200/60 transition-all">
              <div className="w-9 h-9 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
                3
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Matching Agent (Semantic Ranking)</h3>
                  {agents[2].status === 'Completed' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" />
                      Completed
                    </span>
                  ) : agents[2].status === 'In Progress' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                      <Loader2 className="w-3 h-3 animate-spin text-purple-600" />
                      Computing Fit %
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      <Circle className="w-2.5 h-2.5 fill-current" />
                      Pending
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600">
                  Evaluating tech stacks, removing expired listings, and scoring applicant match coefficients.
                </p>
              </div>
            </div>

            {/* Agent 4: Insight Agent */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-softpink-50/50 border border-softpink-200/60 transition-all">
              <div className="w-9 h-9 rounded-2xl bg-pink-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-sm">
                4
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Insight Agent (Strategic Guidance)</h3>
                  {agents.length > 3 && agents[3].status === 'Completed' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" />
                      Completed
                    </span>
                  ) : agents.length > 3 && agents[3].status === 'In Progress' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-pink-700 bg-pink-100 px-2.5 py-0.5 rounded-full">
                      <Loader2 className="w-3 h-3 animate-spin text-pink-600" />
                      Generating Tips
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      <Circle className="w-2.5 h-2.5 fill-current" />
                      Pending
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600">
                  Formulating targeted skill gap roadmaps and application readiness advisories.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Interactive Orbital AI Center & Metrics */}
        <div className="lg:col-span-5 bg-gradient-to-br from-lavender-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col justify-between items-center text-center space-y-6 relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-mint-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-lavender-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-mint-300 text-xs font-bold backdrop-blur-xs">
              <Zap className="w-3.5 h-3.5 text-mint-400" />
              <span>Autonomous Neural Scout</span>
            </span>
            <h3 className="text-xl font-extrabold tracking-tight mt-1">Live Intelligence Hub</h3>
          </div>

          {/* Big Glowing Orbital Graphic */}
          <div className="relative w-44 h-44 flex items-center justify-center my-2">
            <div className="absolute inset-0 rounded-full border border-lavender-400/30 animate-spin-slow" />
            <div className="absolute -inset-4 rounded-full border border-dashed border-mint-400/40 animate-pulse-ring" />
            <div className="absolute -inset-8 rounded-full border border-lavender-500/20" />

            {/* Glowing Center Core */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-lavender-500 via-purple-600 to-mint-400 p-1 shadow-2xl shadow-purple-500/50 flex items-center justify-center animate-pulse">
              <div className="w-full h-full bg-slate-900 rounded-[22px] flex flex-col items-center justify-center p-3">
                <Bot className="w-10 h-10 text-mint-300 animate-bounce" />
              </div>
            </div>

            {/* Floating Orbital Node Badges */}
            <div className="absolute -top-1 bg-emerald-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
              Scout
            </div>
            <div className="absolute -bottom-1 bg-purple-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
              Match
            </div>
            <div className="absolute -left-3 bg-pink-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
              Insight
            </div>
            <div className="absolute -right-3 bg-blue-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-md">
              Profile
            </div>
          </div>

          {/* Progress & Live Results */}
          <div className="relative z-10 w-full space-y-3">
            <div className="space-y-1">
              <p className="text-base font-bold text-white">
                {isSearchingComplete ? '🎉 12 High-Intent Opportunities Found!' : 'Synthesizing recommendations...'}
              </p>
              <p className="text-xs text-lavender-200">
                {scannedCount} postings evaluated • 94% highest fit score
              </p>
            </div>

            <div className="w-full bg-white/15 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-mint-400 via-lavender-400 to-pink-400 h-full rounded-full transition-all duration-700 ease-out"
                style={{ width: `${overallProgress}%` }}
              />
            </div>

            <button
              onClick={() => navigateTo('opportunities')}
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-lavender-500 via-purple-500 to-mint-500 hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-purple-900/50 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>{isSearchingComplete ? 'Explore Top Matches' : 'Skip To Opportunities'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
