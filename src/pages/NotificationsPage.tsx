import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  CheckCheck, 
  Clock, 
  Sparkles, 
  Bookmark, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  Sliders, 
  Trash2,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NotificationItem } from '../types';

export const NotificationsPage: React.FC = () => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    dismissNotification, 
    navigateTo, 
    goBack,
    showToast 
  } = useApp();

  const [filterType, setFilterType] = useState<string>('all');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [aiScoutAlerts, setAiScoutAlerts] = useState(true);

  const filteredNotifications = notifications.filter(n => {
    if (filterType === 'all') return true;
    if (filterType === 'unread') return !n.read;
    return n.type === filterType;
  });

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'match':
        return <Sparkles className="w-4 h-4 text-lavender-600" />;
      case 'deadline':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'saved':
        return <Bookmark className="w-4 h-4 text-pink-600" />;
      case 'profile':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      default:
        return <Bell className="w-4 h-4 text-softblue-600" />;
    }
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-lavender-200/80 shadow-card">
        <div className="flex items-center gap-3">
          <button
            onClick={goBack}
            className="p-2.5 rounded-2xl bg-slate-50 border border-lavender-200 text-slate-600 hover:text-slate-900 hover:bg-lavender-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Notifications & Alerts</span>
              <span className="text-xs bg-lavender-100 text-lavender-800 px-2.5 py-0.5 rounded-full font-bold">
                {notifications.filter(n => !n.read).length} Unread
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Opportunity matches, deadline reminders, application updates & AI recommendations
            </p>
          </div>
        </div>

        <button
          onClick={markAllAsRead}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-lavender-50 hover:bg-lavender-100 text-lavender-800 border border-lavender-200 font-bold text-xs shadow-2xs transition-all cursor-pointer"
        >
          <CheckCheck className="w-4 h-4 text-lavender-600" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* 12-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 Cols): Notification Items List */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Segmented Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {[
              { id: 'all', label: 'All Alerts' },
              { id: 'unread', label: 'Unread Only' },
              { id: 'match', label: 'AI Matches' },
              { id: 'deadline', label: 'Deadlines' },
              { id: 'profile', label: 'Applications' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  filterType === tab.id
                    ? 'bg-gradient-to-r from-lavender-700 to-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-lavender-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* List of Notification Cards */}
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-lavender-200 shadow-card space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-lavender-100 text-lavender-600 flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">All caught up!</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                No new notifications matching your current filter. Check back soon for scouted opportunities.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map(notif => (
                <div
                  key={notif.id}
                  onClick={() => markAsRead(notif.id)}
                  className={`p-4 sm:p-5 rounded-3xl border transition-all flex items-start justify-between gap-4 cursor-pointer ${
                    notif.read
                      ? 'bg-white/90 border-slate-200/80 hover:border-lavender-300'
                      : 'bg-lavender-50/70 border-lavender-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-lavender-200 flex items-center justify-center shadow-xs flex-shrink-0 mt-0.5">
                      {getIcon(notif.type)}
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900 leading-snug">{notif.title}</h4>
                        {!notif.read && (
                          <span className="w-2 h-2 rounded-full bg-lavender-600 ring-2 ring-lavender-200" />
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-[11px] text-slate-400 font-medium">{notif.time}</span>
                        {notif.actionPage && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notif.id);
                              navigateTo(notif.actionPage!);
                            }}
                            className="text-xs font-bold text-lavender-700 hover:text-lavender-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>{notif.actionLabel || 'View'}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dismissNotification(notif.id);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer flex-shrink-0"
                    title="Dismiss"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (4 Cols): Preferences & Digest Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-lavender-200/80 shadow-card space-y-5">
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-lavender-600" />
              <span>Alert Preferences</span>
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">High-Match Alerts</p>
                  <p className="text-[11px] text-slate-500">Matches ≥ 85% score</p>
                </div>
                <button
                  onClick={() => {
                    setEmailAlerts(!emailAlerts);
                    showToast('Alert preference saved', 'info');
                  }}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                    emailAlerts ? 'bg-lavender-600' : 'bg-slate-300'
                  }`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    emailAlerts ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">Deadline Reminders</p>
                  <p className="text-[11px] text-slate-500">Urgent closing alerts</p>
                </div>
                <button
                  onClick={() => {
                    setDeadlineReminders(!deadlineReminders);
                    showToast('Alert preference saved', 'info');
                  }}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                    deadlineReminders ? 'bg-lavender-600' : 'bg-slate-300'
                  }`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    deadlineReminders ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <p className="text-xs font-bold text-slate-800">AI Scout Summaries</p>
                  <p className="text-[11px] text-slate-500">Weekly agent sync digests</p>
                </div>
                <button
                  onClick={() => {
                    setAiScoutAlerts(!aiScoutAlerts);
                    showToast('Alert preference saved', 'info');
                  }}
                  className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${
                    aiScoutAlerts ? 'bg-lavender-600' : 'bg-slate-300'
                  }`}
                >
                  <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                    aiScoutAlerts ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-lavender-50 border border-lavender-200 space-y-2">
              <span className="text-xs font-bold text-lavender-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-lavender-600" />
                Live Agent Sync
              </span>
              <p className="text-xs text-lavender-700 leading-relaxed">
                Oppurtuni syncs active opportunities from 8+ platforms every 4 hours to ensure you never miss an application deadline.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
