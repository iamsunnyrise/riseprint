import React from 'react';

export default function StarburstBadge({
  line1 = "के पावन परिणय",
  line2 = "की मधुर बेला में आपकी सपरिवार उपस्थिति",
  line3 = "एवं आशीर्वचनों के प्रार्थी",
  color = "#a61515",
  className = "w-full max-w-lg mx-auto my-3"
}) {
  // Generate multi-point sawtooth burst path for oval/capsule shape
  const points = 52;
  const rxOuter = 222;
  const ryOuter = 46;
  const rxInner = 202;
  const ryInner = 36;
  const cx = 230;
  const cy = 50;

  let pathData = '';
  for (let i = 0; i < points; i++) {
    const angleOuter = (i * 2 * Math.PI) / points;
    const angleInner = ((i + 0.5) * 2 * Math.PI) / points;

    const xOuter = cx + rxOuter * Math.cos(angleOuter);
    const yOuter = cy + ryOuter * Math.sin(angleOuter);

    const xInner = cx + rxInner * Math.cos(angleInner);
    const yInner = cy + ryInner * Math.sin(angleInner);

    if (i === 0) {
      pathData += `M ${xOuter.toFixed(1)} ${yOuter.toFixed(1)} `;
    } else {
      pathData += `L ${xOuter.toFixed(1)} ${yOuter.toFixed(1)} `;
    }
    pathData += `L ${xInner.toFixed(1)} ${yInner.toFixed(1)} `;
  }
  pathData += 'Z';

  return (
    <div className={`relative flex items-center justify-center select-none ${className} drop-shadow-sm`}>
      <svg viewBox="0 0 460 100" className="w-full h-auto">
        <defs>
          <radialGradient id="starburstFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor={color === '#000000' ? '#ffffff' : '#fffcf0'} />
            <stop offset="100%" stopColor={color === '#000000' ? '#ffffff' : '#fef3c7'} />
          </radialGradient>
        </defs>

        {/* Outer Sawtooth Spiky Starburst Border */}
        <path
          d={pathData}
          fill="url(#starburstFill)"
          stroke={color}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Inner Decorative Ellipse Border */}
        <ellipse
          cx={cx}
          cy={cy}
          rx="188"
          ry="30"
          fill="none"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="4 2"
        />

        {/* Text Inside Starburst */}
        <g textAnchor="middle" fill={color}>
          <text
            x={cx}
            y={cy - 10}
            fontSize="15.5"
            fontWeight="900"
            fontFamily="'Rozha One', 'Noto Serif Devanagari', serif"
            letterSpacing="0.8"
          >
            {line1}
          </text>
          <text
            x={cx}
            y={cy + 7}
            fontSize="13"
            fontWeight="700"
            fontFamily="'Noto Serif Devanagari', 'Poppins', serif"
            letterSpacing="0.3"
          >
            {line2}
          </text>
          <text
            x={cx}
            y={cy + 22}
            fontSize="13"
            fontWeight="900"
            fontFamily="'Rozha One', 'Noto Serif Devanagari', serif"
            letterSpacing="0.5"
          >
            {line3}
          </text>
        </g>
      </svg>
    </div>
  );
}
