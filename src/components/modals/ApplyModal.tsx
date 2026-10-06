import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Building2, Sparkles, Send } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ApplyModal: React.FC = () => {
  const { 
    isApplyModalOpen, 
    setIsApplyModalOpen, 
    selectedOpportunity, 
    applyToOpportunity, 
    userProfile 
  } = useApp();

  const [coverNote, setCoverNote] = useState('');
  const [useProfileResume, setUseProfileResume] = useState(true);
  const [customResumeName, setCustomResumeName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isApplyModalOpen || !selectedOpportunity) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      applyToOpportunity(selectedOpportunity.id);
    }, 600);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomResumeName(e.target.files[0].name);
      setUseProfileResume(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-lavender-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 p-6 text-white relative">
          <button
            onClick={() => setIsApplyModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white p-2 flex items-center justify-center shadow-md">
              <img
                src={selectedOpportunity.companyLogo}
                alt={selectedOpportunity.company}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-lavender-200 font-bold">Fast-Track Application</span>
              <h2 className="text-lg font-bold leading-snug">{selectedOpportunity.title}</h2>
              <p className="text-xs text-lavender-100 mt-0.5">{selectedOpportunity.company} • {selectedOpportunity.location}</p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-mint-50 border border-mint-200/80 rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-mint-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
              {selectedOpportunity.matchPercentage}%
            </div>
            <div>
              <p className="text-xs font-bold text-mint-900">Great Match Profile!</p>
              <p className="text-[11px] text-mint-700">
                Your profile matches {selectedOpportunity.matchPercentage}% of the role requirements.
              </p>
            </div>
          </div>

          {/* Applicant Summary */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Applicant Details</label>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <p className="font-semibold text-slate-900">{userProfile.name}</p>
              <p className="text-slate-500">{userProfile.email} • {userProfile.phone || '+91 98765 43210'}</p>
              <p className="text-slate-500">{userProfile.college} ({userProfile.year})</p>
            </div>
          </div>

          {/* Resume Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Resume Attached</label>
            <div className="flex items-center justify-between p-3 rounded-xl border border-lavender-200 bg-lavender-50/50">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-5 h-5 text-lavender-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-800 truncate">
                  {customResumeName || userProfile.resumeName || 'Yasmin_Beera_Resume.pdf'}
                </span>
              </div>
              <label className="cursor-pointer text-[11px] font-bold text-lavender-600 hover:text-lavender-700 underline">
                Change
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
              </label>
            </div>
          </div>

          {/* Short Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Why are you interested? (Optional)</span>
              <span className="text-[10px] text-slate-400 font-normal">AI will format this note</span>
            </label>
            <textarea
              rows={3}
              value={coverNote}
              onChange={(e) => setCoverNote(e.target.value)}
              placeholder="I am passionate about software engineering and excited about the opportunity to contribute to..."
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-lavender-500/20 focus:border-lavender-500 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsApplyModalOpen(false)}
              className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 hover:opacity-90 text-white text-xs font-bold shadow-md shadow-lavender-500/25 hover:shadow-lavender-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
