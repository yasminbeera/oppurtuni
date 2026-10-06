import React from 'react';
import { 
  ArrowLeft, 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  Check, 
  ChevronDown, 
  BookOpen, 
  Clock, 
  Star,
  ExternalLink,
  Award,
  ArrowRight,
  TrendingUp,
  Target
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LearningItem, Opportunity } from '../types';

export const SkillGapPage: React.FC = () => {
  const { 
    currentSkillGapData, 
    selectedSkillGapOppId, 
    setSelectedSkillGapOppId, 
    opportunities, 
    updateLearningItemProgress,
    navigateTo,
    goBack 
  } = useApp();

  // Compute completed courses
  const totalCourses = currentSkillGapData.learningItems.length;
  const completedCourses = currentSkillGapData.learningItems.filter((c: LearningItem) => c.status === 'Completed').length;
  const inProgressCourses = currentSkillGapData.learningItems.filter((c: LearningItem) => c.status === 'In Progress').length;

  const handleStartCourse = (courseId: string, currentProgress: number) => {
    if (currentProgress === 0) {
      updateLearningItemProgress(courseId, 50);
    } else if (currentProgress < 100) {
      updateLearningItemProgress(courseId, 100);
    } else {
      updateLearningItemProgress(courseId, 0);
    }
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
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
              <span>Skill Gap & Roadmap Engine</span>
              <span className="text-xs font-bold bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full">
                AI Powered
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">Personalized micro-learning path to maximize your match percentage</p>
          </div>
        </div>

        {/* Opportunity Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">Target:</span>
          <select
            value={selectedSkillGapOppId}
            onChange={(e) => setSelectedSkillGapOppId(e.target.value)}
            className="text-xs font-bold text-slate-800 bg-white border border-lavender-300 rounded-2xl px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-lavender-500/20 cursor-pointer"
          >
            {opportunities.map((o: Opportunity) => (
              <option key={o.id} value={o.id}>
                {o.company} • {o.title.slice(0, 28)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Opportunity Overview Banner */}
      <div className="bg-gradient-to-r from-lavender-700 via-purple-700 to-indigo-700 rounded-3xl p-6 sm:p-7 text-white shadow-xl shadow-lavender-600/20 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md p-2 flex items-center justify-center flex-shrink-0 shadow-md">
            <BrainCircuit className="w-7 h-7 text-mint-300" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-mint-300 uppercase tracking-wider">Target Opportunity Analysis</span>
            <h2 className="text-xl sm:text-2xl font-extrabold leading-snug">
              {currentSkillGapData.roleTitle}
            </h2>
            <p className="text-xs sm:text-sm text-lavender-100">{currentSkillGapData.company} • Verified Partner</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
          <div className="text-right">
            <span className="text-xs text-lavender-200 font-semibold">Current Fit Score</span>
            <p className="text-2xl font-black text-mint-300 leading-none mt-0.5">
              {currentSkillGapData.matchPercentage}%
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-mint-400 text-slate-900 flex items-center justify-center font-extrabold shadow-sm">
            <Sparkles className="w-5 h-5 text-slate-900" />
          </div>
        </div>
      </div>

      {/* 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (7 Cols): Course Curriculum & Interactive Steps */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-lavender-200/80 shadow-card space-y-5">
          <div className="flex items-center justify-between border-b border-lavender-100 pb-3.5">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-lavender-600" />
                <span>Recommended Learning Curriculum</span>
              </h3>
              <p className="text-xs text-slate-500">Handpicked tutorials and projects to close skill gaps.</p>
            </div>
            <span className="text-xs font-bold text-lavender-800 bg-lavender-100 px-3 py-1 rounded-full">
              {completedCourses}/{totalCourses} Modules Done
            </span>
          </div>

          {/* Course Cards List */}
          <div className="space-y-3">
            {currentSkillGapData.learningItems.map((item: LearningItem) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl border border-lavender-100 hover:border-lavender-300 hover:bg-lavender-50/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-2xs ${
                    item.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : item.status === 'In Progress'
                      ? 'bg-lavender-100 text-lavender-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.status === 'Completed' ? <Check className="w-5 h-5 stroke-[3]" /> : <BookOpen className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-lavender-700 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                      <span>{item.duration}</span>
                      <span>•</span>
                      <span className="font-semibold text-lavender-600">{item.provider}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3 h-3 fill-current" />
                        {item.rating}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    {item.status === 'In Progress' && (
                      <div className="flex items-center gap-2 pt-1 max-w-xs">
                        <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-lavender-600 to-mint-500 h-full rounded-full" style={{ width: `${item.progress}%` }} />
                        </div>
                        <span className="text-[10px] font-bold text-lavender-700">{item.progress}%</span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleStartCourse(item.id, item.progress)}
                  className={`self-start sm:self-center px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs ${
                    item.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                      : item.status === 'In Progress'
                      ? 'bg-gradient-to-r from-lavender-700 to-indigo-600 text-white shadow-xs hover:opacity-90'
                      : 'bg-slate-100 hover:bg-lavender-100 text-slate-800'
                  }`}
                >
                  {item.status === 'Completed' ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Completed</span>
                    </>
                  ) : item.status === 'In Progress' ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Continue</span>
                    </>
                  ) : (
                    <>
                      <span>Start Module</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Learning Path Progress Bar */}
          <div className="pt-4 border-t border-lavender-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-800 uppercase tracking-wider">Curriculum Mastery</span>
              <span className="text-lavender-700">{Math.round((completedCourses / Math.max(1, totalCourses)) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-lavender-600 to-mint-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${(completedCourses / Math.max(1, totalCourses)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Skills Comparison & Upskill Strategic Forecast */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Verified Current Skills */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-lavender-200/80 shadow-card space-y-3">
            <div className="flex items-center justify-between border-b border-lavender-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Your Verified Skills</span>
              </h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                {currentSkillGapData.currentSkills.length} Matched
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {currentSkillGapData.currentSkills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs flex items-center gap-1.5"
                >
                  <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills to Target */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-lavender-200/80 shadow-card space-y-3">
            <div className="flex items-center justify-between border-b border-lavender-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>Missing High-Priority Skills</span>
              </h3>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">
                {currentSkillGapData.missingSkills.length} Needed
              </span>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {currentSkillGapData.missingSkills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Score Booster Forecast Widget */}
          <div className="bg-gradient-to-br from-mint-50/80 via-emerald-50/50 to-white rounded-3xl p-5 border border-mint-200 shadow-card space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Predicted Match Improvement
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Completing the remaining <strong className="text-slate-900">{totalCourses - completedCourses} modules</strong> will elevate your overall candidate ranking to the <strong className="text-emerald-700">Top 5% of applicants</strong>.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
