import React, { useState } from 'react';
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Briefcase, 
  GraduationCap, 
  Trophy, 
  Users, 
  Code2, 
  Search, 
  Layers,
  ChevronRight,
  ShieldCheck,
  Star,
  Compass
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OpportuniLogo } from '../components/common/OpportuniLogo';
import { OpportunityCategory } from '../types';

export const LandingPage: React.FC = () => {
  const { navigateTo, setActiveCategory } = useApp();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleCategoryClick = (cat: OpportunityCategory) => {
    setActiveCategory(cat);
    navigateTo('opportunities', { category: cat });
  };

  return (
    <div className="min-h-screen bg-oppurtuni-canvas flex flex-col selection:bg-lavender-100 selection:text-lavender-700">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-lavender-200/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <OpportuniLogo size="md" />

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-lavender-700 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-lavender-700 transition-colors">How It Works</a>
            <a href="#categories" className="hover:text-lavender-700 transition-colors">Categories</a>
            <a href="#about" className="hover:text-lavender-700 transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('auth')}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-lavender-700 rounded-xl transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => navigateTo('auth')}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 hover:opacity-90 active:opacity-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-lavender-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 px-4 sm:px-6 lg:px-8 gradient-hero">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lavender-100 border border-lavender-300 text-lavender-800 text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-lavender-600" />
              <span>AI-Powered Discovery Engine for Students</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              All Your Opportunities. <br />
              <span className="bg-gradient-to-r from-lavender-700 via-periwinkle-600 to-mint-600 bg-clip-text text-transparent">
                One Platform.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Internships, jobs, hackathons, fellowships &amp; more – discovered in one place. Powered by AI agents, made for students.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigateTo('auth')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 hover:opacity-90 text-white font-bold text-sm shadow-lg shadow-lavender-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-lavender-50 text-slate-700 font-semibold text-sm border border-lavender-200 shadow-sm transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-lavender-100 text-lavender-600 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-mint-500" />
                <span>Free for students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-mint-500" />
                <span>60+ Platforms unified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-mint-500" />
                <span>No spam, zero junk</span>
              </div>
            </div>
          </div>

          {/* Right Hero Illustration */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-lavender-400/20 via-periwinkle-300/20 to-mint-400/20 rounded-full blur-2xl pointer-events-none" />

            {/* Illustration Canvas */}
            <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border border-lavender-200/90 flex flex-col items-center">
              {/* Floating badges */}
              <div className="absolute -top-3 -left-3 bg-white px-3 py-1.5 rounded-xl shadow-md border border-lavender-100 flex items-center gap-2 animate-float">
                <div className="w-6 h-6 rounded-lg bg-lavender-100 text-lavender-600 flex items-center justify-center font-bold text-xs">
                  &lt;/&gt;
                </div>
                <span className="text-xs font-bold text-slate-800">Coding Internships</span>
              </div>

              <div className="absolute -top-3 -right-3 bg-white px-3 py-1.5 rounded-xl shadow-md border border-lavender-100 flex items-center gap-2 animate-float [animation-delay:1.5s]">
                <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Trophy className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-800">Hackathons</span>
              </div>

              <div className="absolute -bottom-3 -right-3 bg-white px-3 py-1.5 rounded-xl shadow-md border border-lavender-100 flex items-center gap-2 animate-float [animation-delay:0.8s]">
                <div className="w-6 h-6 rounded-lg bg-lavender-100 text-lavender-600 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-mint-600">92% Best Match</span>
              </div>

              {/* Student visual card */}
              <div className="w-full bg-gradient-to-b from-lavender-50/70 to-periwinkle-50/50 rounded-2xl p-6 flex flex-col items-center text-center">
                <div className="relative w-28 h-28 mb-4">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-lavender-600 to-periwinkle-500 p-1 shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
                      alt="Student"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="absolute bottom-1 right-1 w-6 h-6 bg-mint-500 border-2 border-white rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    ✓
                  </span>
                </div>

                <div className="bg-white/90 backdrop-blur-xs rounded-xl p-3.5 shadow-sm border border-lavender-100 w-full text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-lavender-700">AI Scout Active</span>
                    <span className="text-[10px] text-slate-400">Live</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-mint-500 animate-ping" />
                    <span className="text-xs font-semibold text-slate-800">Scanning 60+ Platforms...</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-lavender-600 to-mint-500 h-full w-3/4 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-white border-y border-lavender-200/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-lavender-100">
          <div className="space-y-1">
            <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-lavender-700 to-periwinkle-600 bg-clip-text text-transparent tracking-tight">60+</p>
            <p className="text-sm font-semibold text-slate-800">Platforms Unified</p>
            <p className="text-xs text-slate-500">LinkedIn, Unstop, Naukri, Handshake &amp; more</p>
          </div>

          <div className="pt-6 md:pt-0 space-y-1">
            <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">10K+</p>
            <p className="text-sm font-semibold text-slate-800">Opportunities Daily</p>
            <p className="text-xs text-slate-500">Fresh internships, fresher jobs &amp; contests</p>
          </div>

          <div className="pt-6 md:pt-0 space-y-1">
            <p className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-mint-600 to-softblue-600 bg-clip-text text-transparent tracking-tight">100%</p>
            <p className="text-sm font-semibold text-slate-800">AI Powered</p>
            <p className="text-xs text-slate-500">Personalized matching and skill gap guidance</p>
          </div>
        </div>
      </section>

      {/* Why oppurtuni? Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Why <span className="bg-gradient-to-r from-lavender-700 to-mint-600 bg-clip-text text-transparent">oppurtuni</span>?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Say goodbye to fragmented job hunting. Discover, track, and upskill effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-6 border border-lavender-200/80 shadow-card hover:shadow-card-hover transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-lavender-100 text-lavender-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Saves Time</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  No more checking 60+ apps. We aggregate listings into a single smart feed.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-6 border border-softblue-200/80 shadow-card hover:shadow-card-hover transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-softblue-100 text-softblue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">AI-Powered</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Personalized matches calculated against your unique skills and career goals.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-6 border border-periwinkle-200/80 shadow-card hover:shadow-card-hover transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-periwinkle-100 text-periwinkle-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Track &amp; Apply</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Manage applications, interviews, and deadlines seamlessly in one visual tracker.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-3xl p-6 border border-mint-200/80 shadow-card hover:shadow-card-hover transition-all space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-mint-100 text-mint-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Grow Your Skills</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Get intelligent guidance with AI skill gap analysis and step-by-step learning paths.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white border-y border-lavender-200/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Three simple steps to unlock high-intent opportunities tailored for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-lavender-50 rounded-3xl p-8 border border-lavender-200 text-center space-y-4 relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-lavender-700 to-indigo-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto shadow-md shadow-lavender-500/30">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900">Tell us about you</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Add your skills, interests, year, preferred location and opportunity preferences.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-softblue-50 rounded-3xl p-8 border border-softblue-200 text-center space-y-4 relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-softblue-600 to-periwinkle-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto shadow-md shadow-softblue-500/30">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900">AI Agents Search</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                Our Profile, Scout, Matching &amp; Insight agents search across multiple platforms in parallel.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-mint-50 rounded-3xl p-8 border border-mint-200 text-center space-y-4 relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-mint-600 to-softblue-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto shadow-md shadow-mint-500/30">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900">Get Matched</h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                See the best opportunities ranked with match percentages and clear skill requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Opportunities Section */}
      <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Explore Opportunities
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Discover opportunities across 8 categories designed for college students and graduates.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Internships */}
            <div 
              onClick={() => handleCategoryClick('Internships')}
              className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-mint-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-mint-50 text-mint-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-mint-600 transition-colors">
                    Internships
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Gain real-world experience</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-bold text-mint-600">
                <span>Browse 4,200+</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Jobs */}
            <div 
              onClick={() => handleCategoryClick('Jobs')}
              className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-softblue-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-softblue-50 text-softblue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-softblue-600 transition-colors">
                    Jobs
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Build your career</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-bold text-softblue-600">
                <span>Browse 3,800+</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Hackathons */}
            <div 
              onClick={() => handleCategoryClick('Hackathons')}
              className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-rose-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                    Hackathons
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Showcase your skills</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-bold text-rose-600">
                <span>Browse 1,200+</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Meetups */}
            <div 
              onClick={() => handleCategoryClick('Meetups')}
              className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-periwinkle-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-periwinkle-100 text-periwinkle-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-periwinkle-600 transition-colors">
                    Meetups
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Network &amp; grow</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-bold text-periwinkle-600">
                <span>Browse 850+</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Fellowships */}
            <div 
              onClick={() => handleCategoryClick('Fellowships')}
              className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-lavender-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-lavender-100 text-lavender-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-lavender-600 transition-colors">
                    Fellowships
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Elite programs &amp; funding</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-bold text-lavender-600">
                <span>Browse 320+</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Competitions */}
            <div 
              onClick={() => handleCategoryClick('Competitions')}
              className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-amber-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    Competitions
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Win prizes &amp; recognition</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-bold text-amber-600">
                <span>Browse 580+</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Scholarships */}
            <div 
              onClick={() => handleCategoryClick('Scholarships')}
              className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-emerald-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Scholarships
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Fund your education</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>Browse 1,100+</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Workshops */}
            <div 
              onClick={() => handleCategoryClick('Workshops')}
              className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-card hover:shadow-card-hover hover:border-softpink-300 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-softpink-100 text-softpink-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-softpink-600 transition-colors">
                    Workshops
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">Learn hands-on skills</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-bold text-softpink-600">
                <span>Browse 760+</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Banner CTA */}
      <section className="py-16 bg-gradient-to-br from-lavender-700 via-indigo-600 to-softblue-600 text-white px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to find your next big opportunity?
          </h2>
          <p className="text-lavender-200 text-sm sm:text-base leading-relaxed">
            Join thousands of ambitious students landing top internships and tech jobs with oppurtuni AI.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('auth')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-lavender-700 hover:bg-lavender-50 font-bold text-sm shadow-lg transition-all"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigateTo('auth')}
              className="text-xs text-lavender-200 hover:text-white underline font-semibold"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-lavender-200/60 py-8 px-4 sm:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <OpportuniLogo size="sm" />
          <p>&copy; {new Date().getFullYear()} oppurtuni Platform Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-lavender-600">Privacy Policy</a>
            <a href="#terms" className="hover:text-lavender-600">Terms of Service</a>
            <a href="#contact" className="hover:text-lavender-600">Contact Support</a>
          </div>
        </div>
      </footer>

      {/* Video Demo Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-lavender-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">oppurtuni Platform Tour</h3>
              <button onClick={() => setIsVideoModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-lavender-900 via-indigo-900 to-slate-900 rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-lavender-600/80 flex items-center justify-center ring-8 ring-lavender-500/20">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
              <p className="font-bold text-base">oppurtuni AI Demo Walkthrough</p>
              <p className="text-xs text-lavender-200 max-w-sm">
                Watch how our multi-agent crawler matches you with 60+ platforms in seconds.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
