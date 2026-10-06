import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationToast: React.FC = () => {
  const { toast, hideToast } = useApp();

  if (!toast?.show) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />,
    warning: <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />,
    info: <Info className="w-4 h-4 text-blue-600 flex-shrink-0" />
  };

  const bgs = {
    success: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    warning: 'bg-amber-50 text-amber-900 border-amber-200',
    info: 'bg-blue-50 text-blue-900 border-blue-200'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-lg ${bgs[toast.type]} max-w-md`}>
        {icons[toast.type]}
        <span className="text-xs font-semibold">{toast.message}</span>
        <button 
          onClick={hideToast}
          className="ml-2 p-1 hover:opacity-75 rounded transition-opacity"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
