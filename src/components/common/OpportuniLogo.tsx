import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const OpportuniLogo: React.FC<LogoProps> = ({ size = 'md', showText = true, className = '' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none group cursor-pointer ${className}`}>
      {/* 
        DIAGONAL SQUARE / DIAMOND structure with 4 corner joints/nodes:
        - 2 Blue (Student: top, Opportunity: bottom)
        - 2 Sea Green (AI: right, Career: left)
        - Full-span geometric connecting lines covering the square
        - High contrast, modern & geometric
      */}
      <div className={`relative ${iconSizes[size]} flex-shrink-0 flex items-center justify-center`}>
        <svg 
          viewBox="0 0 40 40" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md transition-all duration-300 group-hover:scale-105 group-hover:rotate-3"
        >
          <defs>
            <linearGradient id="logoDiamondGrad" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="40%" stopColor="#8B5CF6" />
              <stop offset="70%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="logoInnerGrad" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
            </linearGradient>
            <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#8B5CF6" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Background subtle diamond fill */}
          <polygon 
            points="20,6 34,20 20,34 6,20" 
            fill="#F5F3FF" 
            fillOpacity="0.7"
          />

          {/* Diamond boundary frame connecting 4 corner joints */}
          <polygon
            points="20,6 34,20 20,34 6,20"
            stroke="url(#logoDiamondGrad)"
            strokeWidth="3.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Inner connecting cross network (Student -> Career, AI -> Opportunity) */}
          <line x1="20" y1="6" x2="20" y2="34" stroke="url(#logoInnerGrad)" strokeWidth="1.6" strokeDasharray="2 2" strokeOpacity="0.6" />
          <line x1="6" y1="20" x2="34" y2="20" stroke="url(#logoInnerGrad)" strokeWidth="1.6" strokeDasharray="2 2" strokeOpacity="0.6" />

          {/* Center AI Intelligence Core */}
          <circle cx="20" cy="20" r="3" fill="#8B5CF6" filter="url(#logoGlow)" />
          <circle cx="20" cy="20" r="1.2" fill="#FFFFFF" />

          {/* 1. TOP NODE: Blue (Student) */}
          <circle cx="20" cy="6" r="4.8" fill="#2563EB" filter="url(#logoGlow)" />
          <circle cx="20" cy="6" r="2.2" fill="#DBEAFE" />

          {/* 2. RIGHT NODE: Sea Green (AI Agent) */}
          <circle cx="34" cy="20" r="4.8" fill="#10B981" filter="url(#logoGlow)" />
          <circle cx="34" cy="20" r="2.2" fill="#D1FAE5" />

          {/* 3. BOTTOM NODE: Blue (Opportunity) */}
          <circle cx="20" cy="34" r="4.8" fill="#3B82F6" filter="url(#logoGlow)" />
          <circle cx="20" cy="34" r="2.2" fill="#DBEAFE" />

          {/* 4. LEFT NODE: Sea Green (Career) */}
          <circle cx="6" cy="20" r="4.8" fill="#059669" filter="url(#logoGlow)" />
          <circle cx="6" cy="20" r="2.2" fill="#D1FAE5" />
        </svg>
      </div>

      {showText && (
        <span className={`font-extrabold tracking-tight text-slate-900 ${textSizes[size]} font-sans lowercase flex items-center`}>
          <span>oppurtuni</span>
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 ml-1 mb-0.5 animate-pulse shadow-xs shadow-emerald-400" />
        </span>
      )}
    </div>
  );
};
