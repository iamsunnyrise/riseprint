import React from 'react';

export default function RingCeremonyMotif({ color = '#a61515', className = 'w-16 h-16' }) {
  return (
    <div className={`inline-block select-none ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={color}>
        {/* Interlocking Wedding Rings */}
        {/* Left Ring (Groom's Ring) */}
        <circle cx="40" cy="55" r="22" stroke={color} strokeWidth="3.5" />
        <circle cx="40" cy="55" r="18" stroke={color} strokeWidth="1" strokeDasharray="2,2" />

        {/* Right Ring (Bride's Ring with Diamond) */}
        <circle cx="60" cy="50" r="22" stroke={color} strokeWidth="3.5" />
        <circle cx="60" cy="50" r="18" stroke={color} strokeWidth="1" strokeDasharray="2,2" />

        {/* Solitaire Diamond on Bride's Ring */}
        <g transform="translate(60, 24)">
          {/* Prongs */}
          <line x1="-5" y1="5" x2="-3" y2="0" stroke={color} strokeWidth="2" />
          <line x1="5" y1="5" x2="3" y2="0" stroke={color} strokeWidth="2" />
          
          {/* Diamond Gem */}
          <polygon
            points="0,-8 7,-2 4,5 -4,5 -7,-2"
            fill="#fffdf7"
            stroke={color}
            strokeWidth="2"
          />
          <polygon points="0,-8 0,5" stroke={color} strokeWidth="1" />
          <polygon points="-4,-2 4,-2" stroke={color} strokeWidth="1" />

          {/* Diamond Sparkle Rays */}
          <line x1="0" y1="-10" x2="0" y2="-15" stroke={color} strokeWidth="1.5" />
          <line x1="-8" y1="-8" x2="-12" y2="-12" stroke={color} strokeWidth="1.5" />
          <line x1="8" y1="-8" x2="12" y2="-12" stroke={color} strokeWidth="1.5" />
        </g>

        {/* Floral sprigs underneath */}
        <path d="M 22 78 Q 50 88 78 78" stroke={color} strokeWidth="2" fill="none" />
        <circle cx="50" cy="85" r="2.5" fill={color} />
        <circle cx="36" cy="81" r="2" fill={color} />
        <circle cx="64" cy="81" r="2" fill={color} />
      </svg>
    </div>
  );
}
