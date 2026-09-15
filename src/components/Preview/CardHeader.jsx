import React from 'react';
import GaneshaColorBadge from '../Motifs/GaneshaColorBadge';
import GaneshaLineArt from '../Motifs/GaneshaLineArt';

export default function CardHeader({ data }) {
  const {
    inkColor,
    headingFont,
    showGaneshaBadge,
    topInvocation,
    showSwastik,
    shlokaLeft,
    shlokaRight,
    shayariLeft1,
    shayariLeft2,
    shayariRight1,
    shayariRight2
  } = data;

  return (
    <div className="relative w-full pt-1 pb-2">
      {/* Top Left Lord Ganesha / Custom Deity Badge */}
      {showGaneshaBadge && (
        <div className="absolute top-0.5 left-1 z-20">
          <GaneshaColorBadge
            isScreenPrint={data.screenPrintMode}
            customImage={data.customDeityImage}
            alt={data.topInvocation || "इष्टदेवता / कुलदेवी"}
          />
        </div>
      )}

      {/* Center Invocation & Shlokas (Well padded from corners) */}
      <div className="text-center px-18 sm:px-20">
        {/* Shree Ganeshay Namah */}
        <div
          className="text-sm sm:text-base font-extrabold tracking-wider mb-1"
          style={{ color: inkColor, fontFamily: `'${headingFont}', 'Rozha One', serif` }}
        >
          {topInvocation}
        </div>

        {/* Mangalam Shloka with Swastik & Center Ganesha Line Art */}
        <div
          className="flex items-center justify-center gap-2 text-[11px] sm:text-[12px] font-bold tracking-tight my-0.5"
          style={{ color: inkColor }}
        >
          {showSwastik && (
            <span className="text-sm sm:text-base font-black select-none">卐</span>
          )}

          <span className="text-right leading-tight whitespace-nowrap">
            {shlokaLeft}
          </span>

          <div className="flex-shrink-0 mx-1">
            <GaneshaLineArt color={inkColor} className="w-6 h-6" />
          </div>

          <span className="text-left leading-tight whitespace-nowrap">
            {shlokaRight}
          </span>

          {showSwastik && (
            <span className="text-sm sm:text-base font-black select-none">卐</span>
          )}
        </div>
      </div>

      {/* Side-by-Side Wedding Poetry / Shayari (Safe margin below badge) */}
      <div className="grid grid-cols-2 gap-3 mt-2 px-2 text-[10.5px] sm:text-[11.5px] font-medium leading-snug">
        {/* Left Shayari */}
        <div
          className="text-left pl-3 border-l-2"
          style={{ borderColor: `${inkColor}40`, color: inkColor }}
        >
          <p>{shayariLeft1}</p>
          <p>{shayariLeft2}</p>
        </div>

        {/* Right Shayari */}
        <div
          className="text-right pr-3 border-r-2"
          style={{ borderColor: `${inkColor}40`, color: inkColor }}
        >
          <p>{shayariRight1}</p>
          <p>{shayariRight2}</p>
        </div>
      </div>
    </div>
  );
}
