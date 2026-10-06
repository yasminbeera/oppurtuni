import React from 'react';

interface MatchBadgeProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
}

export const MatchBadge: React.FC<MatchBadgeProps> = ({ percentage, size = 'sm' }) => {
  const isHigh = percentage >= 85;
  const isMed = percentage >= 70 && percentage < 85;

  const colorClass = isHigh
    ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
    : isMed
    ? 'bg-sky-50 text-sky-600 border-sky-200'
    : 'bg-amber-50 text-amber-600 border-amber-200';

  const sizeClass = size === 'sm' ? 'text-xs px-2.5 py-0.5' : size === 'md' ? 'text-sm px-3 py-1' : 'text-base px-3.5 py-1.5 font-bold';

  return (
    <span className={`inline-flex items-center font-semibold rounded-full border ${colorClass} ${sizeClass}`}>
      {percentage}% match
    </span>
  );
};

interface DeadlineBadgeProps {
  days: number;
  size?: 'sm' | 'md';
}

export const DeadlineBadge: React.FC<DeadlineBadgeProps> = ({ days, size = 'sm' }) => {
  const isUrgent = days <= 3;
  const isMed = days <= 7;

  const colorClass = isUrgent
    ? 'text-rose-500 bg-rose-50/80 border-rose-100'
    : isMed
    ? 'text-amber-600 bg-amber-50/80 border-amber-100'
    : 'text-slate-500 bg-slate-50 border-slate-200';

  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1 font-medium rounded-full border ${colorClass} ${sizeClass}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
      {days} {days === 1 ? 'day' : 'days'} left
    </span>
  );
};

interface StatusBadgeProps {
  status: 'Saved' | 'Applying' | 'Applied' | 'Interview' | 'Selected' | 'Rejected';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<StatusBadgeProps['status'], string> = {
    Saved: 'bg-slate-100 text-slate-700 border-slate-200',
    Applying: 'bg-amber-50 text-amber-700 border-amber-200',
    Applied: 'bg-blue-50 text-blue-700 border-blue-200',
    Interview: 'bg-purple-50 text-purple-700 border-purple-200',
    Selected: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Rejected: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      {status}
    </span>
  );
};
