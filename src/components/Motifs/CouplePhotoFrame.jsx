import React from 'react';
import { DEMO_COUPLE_PHOTO } from '../../utils/deityAndPhotoPresets';

/**
 * Royal Traditional Indian Couple Photo Frame (वर-वधू युगल फोटो फ्रेम)
 * Supports:
 * - 'royal-oval': Ornate Gold Oval Locket with Pearl Beads
 * - 'jharokha': Traditional Rajasthani Carved Arch Window Frame
 * - 'circle-floral': Marigold & Jasmine Floral Wreath Frame
 */
export default function CouplePhotoFrame({
  photoUrl = DEMO_COUPLE_PHOTO,
  frame = 'royal-oval',
  scale = 100,
  borderColor = '#d4af37',
  isScreenPrint = false,
  hideInScreenPrint = true,
  className = '',
  size = 'medium' // 'compact' (center-motif) or 'large' (dedicated-banner)
}) {
  // If in screen printing mode and printer wants to omit raster photos from butter paper
  if (isScreenPrint && hideInScreenPrint) {
    return null;
  }

  const effectivePhoto = photoUrl || DEMO_COUPLE_PHOTO;
  const zoomFactor = (scale || 100) / 100;

  const dims =
    size === 'compact'
      ? { width: 88, height: 108, imgW: 76, imgH: 94 }
      : { width: 130, height: 155, imgW: 112, imgH: 135 };

  // If in Screen Print mode but not hidden: render crisp high-contrast grayscale
  const filterStyle = isScreenPrint
    ? 'grayscale(100%) contrast(300%)'
    : undefined;

  return (
    <div
      className={`relative inline-flex flex-col items-center justify-center select-none flex-shrink-0 transition-transform ${className}`}
      style={{
        width: `${dims.width}px`,
        height: `${dims.height}px`
      }}
    >
      {/* 1. ROYAL OVAL FRAME (स्वर्णिम अंडाकार विंटेज लॉकेट) */}
      {frame === 'royal-oval' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Ornate Outer SVG Frame with Gold Pearl Beads */}
          <svg
            viewBox="0 0 130 160"
            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-10"
          >
            <defs>
              <radialGradient id="coupleGoldGrad" cx="45%" cy="35%" r="60%">
                <stop offset="0%" stopColor="#fffdf0" />
                <stop offset="30%" stopColor="#fde047" />
                <stop offset="70%" stopColor="#ca8a04" />
                <stop offset="100%" stopColor="#713f12" />
              </radialGradient>
            </defs>

            {/* 22 Beaded Pearls around rim */}
            {[...Array(22)].map((_, i) => {
              const angle = (i * 360) / 22;
              const rad = (angle * Math.PI) / 180;
              const cx = 65 + 56 * Math.cos(rad);
              const cy = 80 + 70 * Math.sin(rad);
              return (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="4"
                  fill={isScreenPrint ? '#000000' : 'url(#coupleGoldGrad)'}
                  stroke={isScreenPrint ? '#000000' : '#854d0e'}
                  strokeWidth="0.6"
                />
              );
            })}

            {/* Outer Gold Oval Border */}
            <ellipse
              cx="65"
              cy="80"
              rx="54"
              ry="68"
              fill="none"
              stroke={isScreenPrint ? '#000000' : 'url(#coupleGoldGrad)'}
              strokeWidth="3.5"
            />

            {/* Inner Raised Metallic Trim */}
            <ellipse
              cx="65"
              cy="80"
              rx="49"
              ry="63"
              fill="none"
              stroke={isScreenPrint ? '#000000' : '#ffffff'}
              strokeWidth="1.2"
              opacity={isScreenPrint ? '1' : '0.8'}
            />

            {/* Inner Dashed Ring */}
            <ellipse
              cx="65"
              cy="80"
              rx="47"
              ry="61"
              fill="none"
              stroke={isScreenPrint ? '#000000' : '#854d0e'}
              strokeWidth="1.2"
              strokeDasharray="3 2"
            />

            {/* Top Auspicious Crown Ornament */}
            <g transform="translate(65, 8)">
              <path
                d="M -12 0 Q 0 -8 12 0 Q 0 4 -12 0 Z"
                fill={isScreenPrint ? '#000000' : '#ca8a04'}
              />
              <circle cx="0" cy="-3" r="2.5" fill={isScreenPrint ? '#000000' : '#dc2626'} />
            </g>
          </svg>

          {/* Photo Masked Inside Oval */}
          <div
            className="overflow-hidden relative flex items-center justify-center bg-stone-100 shadow-inner"
            style={{
              width: `${dims.imgW}px`,
              height: `${dims.imgH}px`,
              borderRadius: '50% / 50%'
            }}
          >
            <img
              src={effectivePhoto}
              alt="वर-वधू युगल चित्र"
              className="w-full h-full object-cover transition-transform duration-200 pointer-events-none select-none"
              style={{
                transform: `scale(${zoomFactor})`,
                filter: filterStyle
              }}
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* 2. RAJASTHANI JHAROKHA FRAME (राजस्थानी मेहराबदार झरोखा) */}
      {frame === 'jharokha' && (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg
            viewBox="0 0 130 160"
            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-10"
          >
            {/* Crown Kalash Spire */}
            <path
              d="M 65 2 L 70 12 L 60 12 Z"
              fill={isScreenPrint ? '#000000' : '#ca8a04'}
            />
            <circle cx="65" cy="1" r="2" fill={isScreenPrint ? '#000000' : '#dc2626'} />

            {/* Arch Profile with Cusps / Toran */}
            <path
              d="M 15 145 L 15 55 Q 15 22 65 14 Q 115 22 115 55 L 115 145 Z"
              fill="none"
              stroke={isScreenPrint ? '#000000' : borderColor}
              strokeWidth="3.5"
            />
            {/* Inner Arch Line */}
            <path
              d="M 22 140 L 22 58 Q 22 28 65 20 Q 108 28 108 58 L 108 140 Z"
              fill="none"
              stroke={isScreenPrint ? '#000000' : '#fef08a'}
              strokeWidth="1.5"
            />
            {/* Arch Top Lotus Medallion */}
            <circle cx="65" cy="32" r="4.5" fill={isScreenPrint ? '#000000' : '#b91c1c'} />
          </svg>

          {/* Photo Masked Inside Arch */}
          <div
            className="overflow-hidden relative flex items-center justify-center bg-stone-100 shadow-inner"
            style={{
              width: `${dims.imgW}px`,
              height: `${dims.imgH}px`,
              borderRadius: '45% 45% 4px 4px'
            }}
          >
            <img
              src={effectivePhoto}
              alt="वर-वधू युगल चित्र"
              className="w-full h-full object-cover transition-transform duration-200 pointer-events-none select-none"
              style={{
                transform: `scale(${zoomFactor})`,
                filter: filterStyle
              }}
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* 3. CIRCLE FLORAL WREATH FRAME (गोलाकार पुष्प चक्र) */}
      {frame === 'circle-floral' && (
        <div className="relative w-full h-full flex items-center justify-center">
          <svg
            viewBox="0 0 140 140"
            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md z-10"
          >
            {/* 16 Floral Rosettes around circle */}
            {[...Array(16)].map((_, i) => {
              const angle = (i * 360) / 16;
              const rad = (angle * Math.PI) / 180;
              const cx = 70 + 58 * Math.cos(rad);
              const cy = 70 + 58 * Math.sin(rad);
              return (
                <g key={i} transform={`translate(${cx}, ${cy})`}>
                  <circle r="4.5" fill={isScreenPrint ? '#000000' : '#f59e0b'} />
                  <circle r="2.5" fill={isScreenPrint ? '#ffffff' : '#dc2626'} />
                </g>
              );
            })}

            {/* Concentric Gold Rings */}
            <circle
              cx="70"
              cy="70"
              r="52"
              fill="none"
              stroke={isScreenPrint ? '#000000' : '#ca8a04'}
              strokeWidth="2.5"
            />
            <circle
              cx="70"
              cy="70"
              r="48"
              fill="none"
              stroke={isScreenPrint ? '#000000' : '#fef08a'}
              strokeWidth="1.2"
              strokeDasharray="3 2"
            />
          </svg>

          {/* Photo Masked Inside Circle */}
          <div
            className="overflow-hidden relative flex items-center justify-center bg-stone-100 shadow-inner rounded-full"
            style={{
              width: `${Math.min(dims.imgW, dims.imgH)}px`,
              height: `${Math.min(dims.imgW, dims.imgH)}px`
            }}
          >
            <img
              src={effectivePhoto}
              alt="वर-वधू युगल चित्र"
              className="w-full h-full object-cover transition-transform duration-200 pointer-events-none select-none"
              style={{
                transform: `scale(${zoomFactor})`,
                filter: filterStyle
              }}
              loading="eager"
            />
          </div>
        </div>
      )}

      {/* Auspicious Ribbon Label at Base */}
      <div
        className="relative -mt-2 z-20 px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black tracking-wider border shadow-xs"
        style={{
          backgroundColor: isScreenPrint ? '#ffffff' : '#fffdf7',
          color: isScreenPrint ? '#000000' : borderColor,
          borderColor: isScreenPrint ? '#000000' : borderColor
        }}
      >
        <span>❦ वर - वधू ❦</span>
      </div>
    </div>
  );
}
