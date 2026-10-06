import React from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ApplicationSuccessModal: React.FC = () => {
  const { 
    isSuccessModalOpen, 
    setIsSuccessModalOpen, 
    appliedOpportunity, 
    navigateTo 
  } = useApp();

  if (!isSuccessModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-lavender-100 p-8 text-center overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Animated Radial Checkmark Badge */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 border border-mint-300/40 rounded-full animate-ping opacity-25" />
            <div className="absolute w-28 h-28 rounded-full border border-dashed border-mint-400/50 animate-spin-slow" />
          </div>

          <div className="w-20 h-20 bg-gradient-to-tr from-mint-600 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-mint-500/30 ring-8 ring-mint-100">
            <Check className="w-10 h-10 text-white stroke-[3]" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Application Submitted!
        </h2>
        
        <p className="text-sm text-slate-600 mt-2.5 max-w-xs mx-auto leading-relaxed">
          Your application for <strong className="text-slate-900 font-semibold">{appliedOpportunity?.title || 'this opportunity'}</strong> at {appliedOpportunity?.company || 'the company'} has been successfully submitted.
        </p>

        <div className="mt-4 p-3 bg-lavender-50/80 rounded-2xl border border-lavender-100 flex items-center justify-center gap-2 text-xs text-lavender-700 font-medium">
          <Sparkles className="w-4 h-4 text-lavender-600" />
          <span>We'll notify you automatically on status updates!</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          <button
            onClick={() => {
              setIsSuccessModalOpen(false);
              navigateTo('application-tracker');
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-lavender-700 via-indigo-600 to-softblue-600 hover:opacity-90 active:opacity-95 text-white font-bold text-sm shadow-md shadow-lavender-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>View Journey Tracker</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsSuccessModalOpen(false);
              navigateTo('opportunities');
            }}
            className="w-full py-3 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors"
          >
            Back to Opportunities
          </button>
        </div>
      </div>
    </div>
  );
};
