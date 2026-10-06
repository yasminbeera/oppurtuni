import React from 'react';
import { X, Building2, MapPin, Globe, Users, CheckCircle, Sparkles, ArrowRight, ExternalLink, Briefcase } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CompanyProfileModal: React.FC = () => {
  const { selectedCompany, setSelectedCompany, opportunities, navigateTo } = useApp();

  if (!selectedCompany) return null;

  const companyOpps = opportunities.filter(
    o => o.company.toLowerCase() === selectedCompany.name.toLowerCase()
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-lavender-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header Cover Banner */}
        <div className="bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 h-28 p-6 text-white relative">
          <button
            onClick={() => setSelectedCompany(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Company Header Info Card */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-12 mb-5">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 rounded-2xl bg-white p-2.5 shadow-xl border-2 border-white flex items-center justify-center">
                <img
                  src={selectedCompany.logo}
                  alt={selectedCompany.name}
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900">{selectedCompany.name}</h2>
                  {selectedCompany.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Verified Employer
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{selectedCompany.industry} • {selectedCompany.type}</p>
              </div>
            </div>

            {selectedCompany.website && (
              <a
                href={selectedCompany.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-lavender-50 hover:bg-lavender-100 text-lavender-700 font-bold text-xs border border-lavender-200 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Visit Website</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Quick Meta Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-lavender-100/60 text-lavender-700 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Location</p>
                <p className="text-xs font-semibold text-slate-700 truncate">{selectedCompany.location}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-mint-100/60 text-mint-700 flex items-center justify-center shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Company Size</p>
                <p className="text-xs font-semibold text-slate-700 truncate">{selectedCompany.size || '1,000+ staff'}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-2.5 col-span-2 sm:col-span-1">
              <div className="w-8 h-8 rounded-xl bg-amber-100/60 text-amber-700 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Active Postings</p>
                <p className="text-xs font-semibold text-slate-700">{companyOpps.length} opportunities</p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">About Company</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
              {selectedCompany.about}
            </p>
          </div>

          {/* Commonly Sought Skills */}
          {selectedCompany.commonlySoughtSkills && selectedCompany.commonlySoughtSkills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-lavender-600" />
                Frequently Requested Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedCompany.commonlySoughtSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-lavender-50 border border-lavender-200/70 text-lavender-800 font-bold text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Active Opportunities from this company */}
          <div>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Active Opportunities from {selectedCompany.name} ({companyOpps.length})
            </h3>
            
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {companyOpps.length > 0 ? (
                companyOpps.map(opp => (
                  <div
                    key={opp.id}
                    onClick={() => {
                      setSelectedCompany(null);
                      navigateTo('opportunity-details', { opportunityId: opp.id });
                    }}
                    className="p-3.5 rounded-2xl bg-white hover:bg-lavender-50/50 border border-slate-200 hover:border-lavender-300 transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-lavender-700 transition-colors">
                          {opp.title}
                        </span>
                        {opp.isDirectCompanyPost && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                            ⚡ Direct Post
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {opp.type} • {opp.location} • {opp.stipend || opp.duration}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-600">{opp.matchPercentage}% match</span>
                      <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-lavender-600 group-hover:text-white flex items-center justify-center transition-colors text-slate-500">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  No other active opportunities currently listed for this company.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={() => setSelectedCompany(null)}
            className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 font-bold text-xs text-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
