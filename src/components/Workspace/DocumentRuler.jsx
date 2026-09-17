import React from 'react';

export default function DocumentRuler({
  widthMm = 178,
  heightMm = 229,
  scale = 1,
  showRuler = true,
  onToggleRuler
}) {
  if (!showRuler) return null;

  // We generate mm tick marks up to widthMm + some margin
  const maxMm = Math.ceil(widthMm / 10) * 10 + 10;
  const majorTicks = [];
  for (let mm = 0; mm <= maxMm; mm += 10) {
    majorTicks.push(mm);
  }

  return (
    <div className="w-full bg-[#e1dfdd] border-b border-stone-300 text-stone-600 select-none no-print overflow-hidden flex items-center h-6 text-[9.5px] font-mono shadow-2xs">
      {/* Corner Origin Box */}
      <div
        className="w-8 h-full bg-[#d2d0ce] border-r border-stone-400 flex items-center justify-center cursor-pointer text-stone-500 hover:text-stone-800 flex-shrink-0 font-sans text-[10px]"
        onClick={onToggleRuler}
        title="रूलर ऑन/ऑफ करें"
      >
        📐
      </div>

      {/* Top Millimeter Ruler Track */}
      <div className="flex-1 h-full relative overflow-hidden flex items-end">
        {/* Repeating millimeter tick pattern */}
        <div
          className="h-full flex items-end w-full"
          style={{
            backgroundImage: `
              repeating-linear-gradient(to right, #8a8886 0, #8a8886 1px, transparent 1px, transparent 10px),
              repeating-linear-gradient(to right, #b3b0ad 0, #b3b0ad 1px, transparent 1px, transparent 2px)
            `,
            backgroundSize: '10px 10px, 2px 5px',
            backgroundPosition: '0 bottom, 0 bottom',
            backgroundRepeat: 'repeat-x'
          }}
        >
          {/* Major labels every 20 or 25 mm */}
          <div className="flex w-full justify-between px-2 text-[8.5px] text-stone-700 font-bold mb-1">
            <span>0 mm</span>
            <span>{Math.round(widthMm * 0.25)} mm</span>
            <span className="bg-amber-200/90 text-red-950 px-1 rounded shadow-2xs">
              {widthMm} mm ({((widthMm / 25.4)).toFixed(1)}″)
            </span>
            <span className="hidden sm:inline">ऊंचाई: {heightMm} mm ({((heightMm / 25.4)).toFixed(1)}″)</span>
          </div>
        </div>
      </div>

      {/* Right Corner Dimension Pill */}
      <div className="px-2 h-full bg-[#d2d0ce] border-l border-stone-400 flex items-center text-[10px] font-sans font-semibold text-stone-700 flex-shrink-0">
        <span>300 DPI</span>
      </div>
    </div>
  );
}
