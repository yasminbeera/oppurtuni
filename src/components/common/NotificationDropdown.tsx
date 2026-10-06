import React from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Bookmark, 
  Clock, 
  Sparkles, 
  X, 
  Check, 
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    dismissNotification, 
    navigateTo,
    userProfile 
  } = useApp();

  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'profile':
        return <Sparkles className="w-4 h-4 text-blue-600" />;
      case 'saved':
        return <Bookmark className="w-4 h-4 text-emerald-600" />;
      case 'match':
        return <Sparkles className="w-4 h-4 text-cyan-600" />;
      case 'deadline':
        return <Clock className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-500" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'profile':
        return 'bg-blue-50 border-blue-100';
      case 'saved':
        return 'bg-emerald-50 border-emerald-100';
      case 'match':
        return 'bg-cyan-50 border-cyan-100';
      case 'deadline':
        return 'bg-amber-50 border-amber-100';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 z-40 bg-black/10 backdrop-blur-xs md:hidden"
        onClick={onClose}
      />

      <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
        <div className="px-4 pb-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {notifications.filter(n => !n.read).length} new
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline"
            >
              Mark all read
            </button>
            <button 
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Complete Profile banner inside notification if not 100% */}
        {userProfile.profileCompleted < 100 && (
          <div className="m-3 p-3.5 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 rounded-xl border border-blue-100/80 flex items-center gap-3">
            <div className="relative w-11 h-11 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-blue-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-blue-600"
                  strokeDasharray={`${userProfile.profileCompleted}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[11px] font-bold text-blue-800">
                {userProfile.profileCompleted}%
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 leading-snug">Complete Your Profile</p>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">Add a resume and skills for 10x better AI matches.</p>
              <button
                onClick={() => {
                  onClose();
                  navigateTo('create-profile');
                }}
                className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 bg-white px-2.5 py-1 rounded-md border border-blue-200 shadow-xs"
              >
                <span>Complete Now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        <div className="max-h-72 overflow-y-auto px-2 space-y-1.5">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No notifications right now
            </div>
          ) : (
            notifications.map(item => (
              <div 
                key={item.id}
                onClick={() => {
                  markAsRead(item.id);
                  if (item.actionPage) {
                    onClose();
                    navigateTo(item.actionPage);
                  }
                }}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 relative group ${
                  item.read 
                    ? 'bg-white border-transparent hover:bg-slate-50' 
                    : `${getBg(item.type)} hover:brightness-98`
                }`}
              >
                <div className={`p-2 rounded-lg ${getBg(item.type)} border flex-shrink-0 mt-0.5`}>
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className={`text-xs font-semibold ${item.read ? 'text-slate-800' : 'text-slate-900 font-bold'}`}>
                      {item.title}
                    </p>
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-tight line-clamp-2">
                    {item.message}
                  </p>
                  {item.actionLabel && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 mt-1.5">
                      {item.actionLabel}
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  )}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissNotification(item.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-slate-600 hover:bg-white rounded transition-opacity"
                  title="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="px-3 pt-2.5 mt-2 border-t border-slate-100 text-center">
          <button
            onClick={() => {
              onClose();
              navigateTo('profile-settings');
            }}
            className="text-xs font-medium text-slate-500 hover:text-slate-800"
          >
            Notification Preferences
          </button>
        </div>
      </div>
    </>
  );
};
