import React from 'react';
import { Bookmark, MapPin, Sparkles, Building2, ArrowRight, Zap, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Opportunity } from '../../types';
import { MatchBadge, DeadlineBadge } from './Badge';
import { useApp } from '../../context/AppContext';

interface OpportunityCardProps {
  opportunity: Opportunity;
  layout?: 'default' | 'compact' | 'horizontal';
  showApplyButton?: boolean;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ 
  opportunity, 
  layout = 'default',
  showApplyButton = false 
}) => {
  const { navigateTo, toggleSave, openCompanyProfile } = useApp();

  const handleCardClick = () => {
    navigateTo('opportunity-details', { opportunityId: opportunity.id });
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSave(opportunity.id);
  };

  const handleCompanyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openCompanyProfile(opportunity.company);
  };

  const isVerified = opportunity.verificationStatus !== 'Needs Verification';

  if (layout === 'compact') {
    return (
      <div 
        onClick={handleCardClick}
        className="group relative bg-white rounded-2xl border border-slate-200/80 p-4 hover:border-lavender-300 hover:shadow-card-hover transition-all duration-200 cursor-pointer flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div 
            onClick={handleCompanyClick}
            title={`View ${opportunity.company} profile`}
            className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 flex-shrink-0 group-hover:scale-105 transition-transform hover:ring-2 hover:ring-lavender-400"
          >
            <img 
              src={opportunity.companyLogo} 
              alt={opportunity.company} 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4 className="font-bold text-sm text-slate-800 truncate group-hover:text-lavender-700 transition-colors">
                {opportunity.title}
              </h4>
              {isVerified ? (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.2 rounded-md">
                  <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                  Verified
                </span>
              ) : (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-1.5 py-0.2 rounded-md">
                  <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
                  Needs Verification
                </span>
              )}
              {opportunity.isDirectCompanyPost && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-lavender-50 text-lavender-700 border border-lavender-200 shrink-0">
                  ⚡ Direct
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
              <button 
                onClick={handleCompanyClick}
                className="hover:text-lavender-700 hover:underline font-medium text-slate-700 truncate"
              >
                {opportunity.company}
              </button>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                {opportunity.location}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <DeadlineBadge days={opportunity.deadlineDays} />
            <div className="mt-1">
              <span className="text-xs font-semibold text-emerald-600">{opportunity.matchPercentage}% match</span>
            </div>
          </div>
          <button
            onClick={handleBookmarkClick}
            className={`p-2 rounded-lg transition-colors ${
              opportunity.saved 
                ? 'text-lavender-700 bg-lavender-50' 
                : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${opportunity.saved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl border border-lavender-200/70 hover:border-lavender-400 p-5 hover:shadow-card-hover transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Header: Logo, Title, Bookmark */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <div 
              onClick={handleCompanyClick}
              title={`View ${opportunity.company} profile`}
              className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 flex-shrink-0 group-hover:scale-105 transition-transform shadow-sm hover:ring-2 hover:ring-lavender-400"
            >
              <img 
                src={opportunity.companyLogo} 
                alt={opportunity.company} 
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-lavender-700 transition-colors line-clamp-1">
                  {opportunity.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                <button 
                  onClick={handleCompanyClick}
                  className="text-slate-700 hover:text-lavender-700 hover:underline font-bold text-xs"
                >
                  {opportunity.company}
                </button>
                <span>•</span>
                {isVerified ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.2 rounded-md">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                    ✓ Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-1.5 py-0.2 rounded-md">
                    <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
                    ⚠ Needs Verification
                  </span>
                )}
                {opportunity.isDirectCompanyPost && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-lavender-50 text-lavender-700 border border-lavender-200 inline-flex items-center gap-0.5">
                    <Zap className="w-2.5 h-2.5" />
                    Direct Post
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleBookmarkClick}
            className={`p-2 rounded-xl border transition-all ${
              opportunity.saved 
                ? 'text-lavender-700 bg-lavender-50/80 border-lavender-200' 
                : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50'
            }`}
            title={opportunity.saved ? 'Saved' : 'Save Opportunity'}
          >
            <Bookmark className={`w-4 h-4 ${opportunity.saved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Location and Meta */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mt-2.5 font-medium">
          <span className="flex items-center gap-0.5 text-slate-600">
            <MapPin className="w-3 h-3 text-lavender-500" />
            {opportunity.location} ({opportunity.workMode})
          </span>
          <span>•</span>
          <span className="text-slate-600">{opportunity.type}</span>
        </div>

        {/* Tags / Badges */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <MatchBadge percentage={opportunity.matchPercentage} />
          <DeadlineBadge days={opportunity.deadlineDays} />
          {opportunity.tags?.slice(0, 1).map((tag, idx) => (
            <span key={idx} className="text-xs px-2.5 py-0.5 rounded-full bg-lavender-50 text-lavender-800 font-semibold border border-lavender-200/70">
              {tag}
            </span>
          ))}
        </div>

        {/* Brief description */}
        <p className="text-xs text-slate-600 line-clamp-2 mt-3 leading-relaxed">
          {opportunity.about || opportunity.overview}
        </p>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="font-semibold text-slate-700">
          {opportunity.stipend || opportunity.duration || 'Open application'}
        </div>

        <div className="flex items-center gap-1 text-lavender-700 font-bold group-hover:translate-x-0.5 transition-transform">
          <span>View details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
