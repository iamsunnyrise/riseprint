import React from 'react';

export default function GaneshaLineArt({ color = '#a61515', className = 'w-9 h-9 sm:w-10 sm:h-10' }) {
  return (
    <div className={`inline-block select-none ${className} drop-shadow-sm`}>
      <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke={color}>
        {/* Crown (मुकुट) */}
        <path d="M 23 17 L 27 6 L 32 2 L 37 6 L 41 17 Z" fill={color} stroke={color} strokeWidth="1" />
        <circle cx="32" cy="7" r="1.8" fill="#fff" />
        <circle cx="32" cy="13" r="1.5" fill="#fff" />

        {/* Ears */}
        <path
          d="M 23 18 C 13 16 11 28 20 33 C 24 35 26 27 25 22 Z"
          fill={color}
          stroke={color}
          strokeWidth="1"
        />
        <path
          d="M 41 18 C 51 16 53 28 44 33 C 40 35 38 27 39 22 Z"
          fill={color}
          stroke={color}
          strokeWidth="1"
        />

        {/* Head */}
        <path
          d="M 23 19 C 23 14 41 14 41 19 C 43 25 42 30 38 33 C 32 36 31 35 26 33 C 22 30 22 25 23 19 Z"
          fill={color}
          stroke={color}
          strokeWidth="1"
        />

        {/* Tilak / Trishul */}
        <path d="M 30.5 12 L 33.5 12 L 32 17 Z" fill="#fff" />
        <circle cx="32" cy="18.5" r="1.2" fill="#fff" />

        {/* Eyes */}
        <ellipse cx="27.5" cy="22" rx="1.5" ry="1" fill="#fff" />
        <ellipse cx="36.5" cy="22" rx="1.5" ry="1" fill="#fff" />

        {/* Trunk (सोंड) */}
        <path
          d="M 30 27 C 29 34 24 40 20 43 C 16 46 13 44 14 41 C 16 38 19 39 22 36 C 26 32 28 29 30 26 Z"
          fill={color}
          stroke={color}
          strokeWidth="0.8"
        />

        {/* Tusk */}
        <polygon points="36,28 40,31 38,32" fill="#fff" />

        {/* Modak in Bowl */}
        <ellipse cx="14" cy="40" rx="3.5" ry="2.2" fill={color} />
        <circle cx="14" cy="38" r="1.8" fill="#fff" />
        <circle cx="14" cy="38" r="1" fill={color} />

        {/* Body & Pitambar */}
        <path
          d="M 22 38 C 18 43 17 53 24 58 C 30 61 38 61 44 58 C 49 53 48 43 44 38 C 39 41 27 41 22 38 Z"
          fill={color}
          stroke={color}
          strokeWidth="1"
        />

        {/* Right Blessing Hand (अभय मुद्रा) */}
        <circle cx="45" cy="36" r="3.5" fill={color} />
        <circle cx="45" cy="36" r="1.2" fill="#fff" />

        {/* Base Lotus Petals */}
        <path d="M 16 60 Q 32 64 48 60" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="62" x2="44" y2="62" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
