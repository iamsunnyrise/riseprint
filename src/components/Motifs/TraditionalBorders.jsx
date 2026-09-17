import React from 'react';
import dividerRibbonHdImg from '../../assets/divider-ribbon-hd.png';

/**
 * Traditional Kangura / Scalloped Floral Divider Ribbon
 * High-definition 3D traditional Indian printing press ribbon banner
 * featuring repeating arched ivory blocks, crimson 4-petal floral rosettes,
 * dual beaded golden rims, and carved end-cap finials.
 */
export function DividerRibbon({ color = '#a61515', isScreenPrint = false, className = 'w-full my-2' }) {
  if (isScreenPrint) {
    return (
      <div className={`dtp-plate-motif flex items-center justify-center select-none overflow-hidden my-1.5 ${className}`}>
        {/* Authentic Indian Screen Printing Kangura Ribbon (Pure Vector Black) */}
        <div className="w-full border-y-[1.5px] border-black py-0.5 flex flex-col items-center">
          <div className="w-full flex items-center justify-between px-1 text-[11px] font-bold text-black select-none tracking-widest">
            <span>❖</span>
            <span className="h-[1px] flex-1 bg-black mx-1" />
            <span>卐</span>
            <span className="mx-2 text-xs">❦ ════════ ❖ शुभ विवाह ❖ ════════ ❦</span>
            <span>卐</span>
            <span className="h-[1px] flex-1 bg-black mx-1" />
            <span>❖</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`dtp-plate-motif flex items-center justify-center select-none overflow-hidden ${className}`}>
      <img
        src={dividerRibbonHdImg}
        alt="पारम्परिक कंगूरा बॉर्डर रिबन"
        className="w-full h-7 sm:h-8 object-fill pointer-events-none select-none transition-transform duration-200"
        style={{
          filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.18))'
        }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}


/**
 * Ornate Pillars for Event Box (वैवाहिक कार्यक्रम स्तम्भ व तोरण)
 */
export function PillarArchFrame({ color = '#a61515', children }) {
  return (
    <div
      className="relative px-7 py-3 my-1.5 rounded-sm"
      style={{
        borderTop: `2.5px solid ${color}`,
        borderBottom: `2.5px solid ${color}`,
        backgroundColor: '#ffffff60'
      }}
    >
      {/* Top and Bottom Decorative Toran lines (Motif Plate) */}
      <div
        className="dtp-plate-motif absolute top-1 left-6 right-6 h-0.5"
        style={{ borderTop: `1px dashed ${color}80` }}
      />
      <div
        className="dtp-plate-motif absolute bottom-1 left-6 right-6 h-0.5"
        style={{ borderBottom: `1px dashed ${color}80` }}
      />

      {/* Left Pillar (पारम्परिक नक्काशीदार खंभा) */}
      <div
        className="dtp-plate-motif absolute left-0 top-0 bottom-0 w-6 flex flex-col items-center justify-between pointer-events-none select-none"
        style={{ borderRight: `2.5px solid ${color}` }}
      >
        {/* Pillar Capital (शीर्षक तोरण) */}
        <div className="w-full h-5 flex flex-col items-center justify-center border-b" style={{ borderColor: color, backgroundColor: `${color}18` }}>
          <div className="w-4 h-1 bg-current rounded-full" style={{ color }} />
          <div className="w-2.5 h-1 bg-current mt-0.5" style={{ color }} />
        </div>

        {/* Pillar Shaft detailing */}
        <div className="flex-1 w-full flex flex-col justify-around items-center py-2 opacity-90">
          <div className="w-3.5 h-3.5 border-2 rounded-full flex items-center justify-center" style={{ borderColor: color }}>
            <div className="w-1.5 h-1.5 rounded-full bg-current" style={{ color }} />
          </div>
          {/* Vertical flutes */}
          <div className="w-3.5 h-10 border-x-2 border-y flex justify-center items-center" style={{ borderColor: color, backgroundColor: `${color}10` }}>
            <div className="w-0.5 h-8 bg-current" style={{ color }} />
          </div>
          <div className="w-3.5 h-3.5 border-2 rounded-full flex items-center justify-center" style={{ borderColor: color }}>
            <div className="w-1.5 h-1.5 rounded-full bg-current" style={{ color }} />
          </div>
        </div>

        {/* Pillar Base (आधार) */}
        <div className="w-full h-5 flex flex-col items-center justify-center border-t" style={{ borderColor: color, backgroundColor: `${color}18` }}>
          <div className="w-2.5 h-1 bg-current mb-0.5" style={{ color }} />
          <div className="w-4 h-1 bg-current rounded-full" style={{ color }} />
        </div>
      </div>

      {/* Right Pillar */}
      <div
        className="dtp-plate-motif absolute right-0 top-0 bottom-0 w-6 flex flex-col items-center justify-between pointer-events-none select-none"
        style={{ borderLeft: `2.5px solid ${color}` }}
      >
        {/* Pillar Capital */}
        <div className="w-full h-5 flex flex-col items-center justify-center border-b" style={{ borderColor: color, backgroundColor: `${color}18` }}>
          <div className="w-4 h-1 bg-current rounded-full" style={{ color }} />
          <div className="w-2.5 h-1 bg-current mt-0.5" style={{ color }} />
        </div>

        {/* Pillar Shaft */}
        <div className="flex-1 w-full flex flex-col justify-around items-center py-2 opacity-90">
          <div className="w-3.5 h-3.5 border-2 rounded-full flex items-center justify-center" style={{ borderColor: color }}>
            <div className="w-1.5 h-1.5 rounded-full bg-current" style={{ color }} />
          </div>
          <div className="w-3.5 h-10 border-x-2 border-y flex justify-center items-center" style={{ borderColor: color, backgroundColor: `${color}10` }}>
            <div className="w-0.5 h-8 bg-current" style={{ color }} />
          </div>
          <div className="w-3.5 h-3.5 border-2 rounded-full flex items-center justify-center" style={{ borderColor: color }}>
            <div className="w-1.5 h-1.5 rounded-full bg-current" style={{ color }} />
          </div>
        </div>

        {/* Pillar Base */}
        <div className="w-full h-5 flex flex-col items-center justify-center border-t" style={{ borderColor: color, backgroundColor: `${color}18` }}>
          <div className="w-2.5 h-1 bg-current mb-0.5" style={{ color }} />
          <div className="w-4 h-1 bg-current rounded-full" style={{ color }} />
        </div>
      </div>

      {/* Inner Children (Text Plate) */}
      <div className="dtp-plate-text">
        {children}
      </div>
    </div>
  );
}

/**
 * Outer Vintage Scalloped & Lace Indian Offset Press Border
 */
export function OuterCardBorder({ color = '#a61515', goldColor = '#cda339', children }) {
  return (
    <div
      className="relative w-full h-full p-4 sm:p-6 flex flex-col transition-all duration-300"
      style={{
        boxShadow: 'inset 0 0 25px rgba(180, 140, 60, 0.12)'
      }}
    >
      {/* Traditional Frame & Corner Ornaments Container (Motif Plate) */}
      <div className="dtp-plate-motif pointer-events-none">
        {/* 1. Outermost Traditional Scalloped Lace / Die-cut border */}
        <div
          className="absolute inset-1.5 sm:inset-2.5 pointer-events-none border-2 rounded-sm"
          style={{ borderColor: color }}
        />

        {/* 2. Middle Thin Border */}
        <div
          className="absolute inset-2 sm:inset-3.5 pointer-events-none border"
          style={{ borderColor: color, opacity: 0.5 }}
        />

        {/* 3. Inner Solid Bold Frame */}
        <div
          className="absolute inset-3 sm:inset-4.5 pointer-events-none border-2"
          style={{ borderColor: color }}
        />

        {/* 4. Fine Beaded Inset Line */}
        <div
          className="absolute inset-3.5 sm:inset-5 pointer-events-none border"
          style={{ borderColor: `${color}50`, borderStyle: 'dotted' }}
        />

        {/* 4 Majestic Indian Wedding Vintage Corner Ornaments */}
        {/* Top-Left Corner */}
        <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 w-10 h-10 pointer-events-none">
          <svg viewBox="0 0 50 50" className="w-full h-full" fill="none" stroke={color}>
            <path d="M 0 0 L 32 0 C 18 0 0 18 0 32 Z" fill={color} />
            <circle cx="10" cy="10" r="3.5" fill="#fff" />
            <circle cx="10" cy="10" r="1.5" fill={color} />
            <path d="M 4 45 Q 4 4 45 4" stroke={color} strokeWidth="2" fill="none" />
            <path d="M 12 40 Q 12 12 40 12" stroke={color} strokeWidth="1" fill="none" />
            <circle cx="25" cy="6" r="2" fill={color} />
            <circle cx="6" cy="25" r="2" fill={color} />
          </svg>
        </div>

        {/* Top-Right Corner */}
        <div className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 w-10 h-10 pointer-events-none rotate-90">
          <svg viewBox="0 0 50 50" className="w-full h-full" fill="none" stroke={color}>
            <path d="M 0 0 L 32 0 C 18 0 0 18 0 32 Z" fill={color} />
            <circle cx="10" cy="10" r="3.5" fill="#fff" />
            <circle cx="10" cy="10" r="1.5" fill={color} />
            <path d="M 4 45 Q 4 4 45 4" stroke={color} strokeWidth="2" fill="none" />
            <path d="M 12 40 Q 12 12 40 12" stroke={color} strokeWidth="1" fill="none" />
            <circle cx="25" cy="6" r="2" fill={color} />
            <circle cx="6" cy="25" r="2" fill={color} />
          </svg>
        </div>

        {/* Bottom-Left Corner */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-4 sm:left-4 w-10 h-10 pointer-events-none -rotate-90">
          <svg viewBox="0 0 50 50" className="w-full h-full" fill="none" stroke={color}>
            <path d="M 0 0 L 32 0 C 18 0 0 18 0 32 Z" fill={color} />
            <circle cx="10" cy="10" r="3.5" fill="#fff" />
            <circle cx="10" cy="10" r="1.5" fill={color} />
            <path d="M 4 45 Q 4 4 45 4" stroke={color} strokeWidth="2" fill="none" />
            <path d="M 12 40 Q 12 12 40 12" stroke={color} strokeWidth="1" fill="none" />
            <circle cx="25" cy="6" r="2" fill={color} />
            <circle cx="6" cy="25" r="2" fill={color} />
          </svg>
        </div>

        {/* Bottom-Right Corner */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-4 sm:right-4 w-10 h-10 pointer-events-none rotate-180">
          <svg viewBox="0 0 50 50" className="w-full h-full" fill="none" stroke={color}>
            <path d="M 0 0 L 32 0 C 18 0 0 18 0 32 Z" fill={color} />
            <circle cx="10" cy="10" r="3.5" fill="#fff" />
            <circle cx="10" cy="10" r="1.5" fill={color} />
            <path d="M 4 45 Q 4 4 45 4" stroke={color} strokeWidth="2" fill="none" />
            <path d="M 12 40 Q 12 12 40 12" stroke={color} strokeWidth="1" fill="none" />
            <circle cx="25" cy="6" r="2" fill={color} />
            <circle cx="6" cy="25" r="2" fill={color} />
          </svg>
        </div>
      </div>

      {/* Inner Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-1 sm:p-2">
        {children}
      </div>
    </div>
  );
}
