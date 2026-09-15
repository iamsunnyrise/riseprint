import React from 'react';
import ganeshaHdImg from '../../assets/ganesha-hd-transparent.png';

export default function GaneshaColorBadge({
  className = "",
  isScreenPrint = false,
  customImage = null,
  alt = "भगवान श्री गणेश"
}) {
  if (isScreenPrint) {
    return (
      <div
        className={`relative flex items-center justify-center select-none flex-shrink-0 ${className}`}
        style={{
          width: '58px',
          height: '74px'
        }}
      >
        {/* Screen Printing Monochrome Black Beaded Medallion */}
        <svg
          viewBox="0 0 120 150"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {/* 24 Black Beaded Petals around rim */}
          {[...Array(24)].map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const cx = 60 + 50 * Math.cos(rad);
            const cy = 75 + 62 * Math.sin(rad);
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r="6.5"
                fill="#000000"
              />
            );
          })}

          {/* Main Black Oval Border Ring */}
          <ellipse
            cx="60"
            cy="75"
            rx="49"
            ry="61"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="2.5"
          />

          {/* Inner Dashed Beaded Ring */}
          <ellipse
            cx="60"
            cy="75"
            rx="44"
            ry="55"
            fill="none"
            stroke="#000000"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
        </svg>

        {/* Crisp Silhouette/Black Lord Ganesha or Custom Deity */}
        <img
          src={customImage || ganeshaHdImg}
          alt={alt}
          className="relative z-10 object-contain select-none pointer-events-none"
          style={{
            width: '42px',
            height: '54px',
            filter: 'brightness(0) saturate(100%)',
            borderRadius: customImage ? '40% / 40%' : undefined
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center select-none flex-shrink-0 ${className}`}
      style={{
        width: '58px',
        height: '74px'
      }}
    >
      {/* 1. Golden Medallion Frame (SVG) */}
      <svg
        viewBox="0 0 120 150"
        className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md"
      >
        <defs>
          {/* Metallic Gold Gradient */}
          <radialGradient id="goldMedalGrad" cx="45%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#fffdf0" />
            <stop offset="25%" stopColor="#fde047" />
            <stop offset="60%" stopColor="#ca8a04" />
            <stop offset="90%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#713f12" />
          </radialGradient>

          {/* Divine Radiant Background Aura */}
          <radialGradient id="divineAuraGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fef08a" />
            <stop offset="75%" stopColor="#facc15" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#eab308" stopOpacity="0.4" />
          </radialGradient>
        </defs>

        {/* 24 Golden Beaded Petals around rim */}
        {[...Array(24)].map((_, i) => {
          const angle = (i * 360) / 24;
          const rad = (angle * Math.PI) / 180;
          const cx = 60 + 50 * Math.cos(rad);
          const cy = 75 + 62 * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r="7"
              fill="url(#goldMedalGrad)"
              stroke="#713f12"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Main Gold Oval Border Ring */}
        <ellipse
          cx="60"
          cy="75"
          rx="49"
          ry="61"
          fill="url(#goldMedalGrad)"
          stroke="#78350f"
          strokeWidth="2.5"
        />

        {/* Inner Raised 3D Gold Rim */}
        <ellipse
          cx="60"
          cy="75"
          rx="44"
          ry="56"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.2"
          opacity="0.8"
        />

        {/* Inner Beaded Ring (पारम्परिक दाना किनारी) */}
        <ellipse
          cx="60"
          cy="75"
          rx="42"
          ry="53"
          fill="none"
          stroke="#854d0e"
          strokeWidth="1.5"
          strokeDasharray="2.5 2"
        />

        {/* Divine Radiant Background Aura */}
        <ellipse
          cx="60"
          cy="75"
          rx="39"
          ry="50"
          fill="url(#divineAuraGlow)"
        />
      </svg>

      {/* 2. Embedded HD Lord Ganesha or Custom Deity Image */}
      <img
        src={customImage || ganeshaHdImg}
        alt={alt}
        className="relative z-10 object-contain select-none pointer-events-none"
        style={{
          width: '42px',
          height: '54px',
          filter: 'drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3))',
          borderRadius: customImage ? '40% / 40%' : undefined
        }}
      />
    </div>
  );
}

