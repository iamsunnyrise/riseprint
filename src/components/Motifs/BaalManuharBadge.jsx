import React from 'react';

export default function BaalManuharBadge({
  title = 'बाल मनुहार',
  quote = 'भेज रहे हैं स्नेह निमंत्रण प्यारे तुम्हें बुलाने को।\nहे मानस के राजहंस तुम भूल न जाना आने को॥',
  kids = 'कान्हा, लड्डू, परी, आरव एवं समस्त बाल गोपाल',
  color = '#a61515',
  headingFont = 'Rozha One',
  className = ''
}) {
  if (!quote && !kids) return null;

  return (
    <div className={`w-full my-1 px-3 ${className}`}>
      <div
        className="relative px-3 py-1.5 rounded-lg border text-center overflow-hidden shadow-2xs"
        style={{
          borderColor: `${color}55`,
          backgroundColor: `${color}06`
        }}
      >
        {/* Subtle decorative side accents */}
        <div
          className="absolute left-2 top-1/2 -translate-y-1/2 text-xs opacity-40 select-none hidden sm:block"
          style={{ color }}
        >
          ❦
        </div>
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 text-xs opacity-40 select-none hidden sm:block"
          style={{ color }}
        >
          ❦
        </div>

        {/* Heading: 👦 बाल मनुहार */}
        <div className="flex items-center justify-center gap-1.5 mb-0.5">
          <span className="h-[1px] w-8 bg-current opacity-30" style={{ color }} />
          <span
            className="font-black text-[11px] sm:text-[12px] tracking-wide flex items-center gap-1"
            style={{
              color,
              fontFamily: `'${headingFont}', 'Rozha One', serif`
            }}
          >
            <span>👦</span>
            <span>{title}</span>
            <span>👧</span>
          </span>
          <span className="h-[1px] w-8 bg-current opacity-30" style={{ color }} />
        </div>

        {/* Couplet / Quote */}
        {quote && (
          <div
            className="text-[10px] sm:text-[11px] font-semibold leading-snug whitespace-pre-line tracking-tight opacity-95"
            style={{ color }}
          >
            {quote}
          </div>
        )}

        {/* Children Names */}
        {kids && (
          <div
            className="text-[9.5px] sm:text-[10.5px] font-bold mt-0.5 tracking-tight flex items-center justify-center gap-1"
            style={{ color }}
          >
            <span className="opacity-70">—</span>
            <span>{kids}</span>
          </div>
        )}
      </div>
    </div>
  );
}
