import React, { forwardRef } from 'react';
import ScreenPrintMasterWrapper from './ScreenPrintMasterWrapper';
import { Phone, Mail, Globe, MapPin, Scissors } from 'lucide-react';

// Single Visiting Card Graphic
export function SingleVisitingCard({ data, isScreenPrint = false, compact = false }) {
  const inkColor = isScreenPrint ? '#000000' : (data?.inkColor || '#0a2540');
  const paperColor = isScreenPrint ? '#ffffff' : (data?.paperColor || '#ffffff');

  return (
    <div
      className={`relative overflow-hidden flex flex-col justify-between border select-none transition-all ${
        compact ? 'p-3 w-[330px] h-[190px]' : 'p-5 w-[520px] h-[300px]'
      }`}
      style={{
        backgroundColor: paperColor,
        color: inkColor,
        borderColor: inkColor,
        fontFamily: data?.fontFamily || "'Noto Serif Devanagari', serif",
        boxShadow: compact || isScreenPrint ? 'none' : '0 10px 25px -5px rgba(0,0,0,0.15)'
      }}
    >
      {/* Top Auspicious & Contact Strip */}
      <div className="flex justify-between items-center border-b pb-1 text-[10px] font-bold" style={{ borderColor: inkColor }}>
        <span>॥ श्री गणेशाय नमः ॥</span>
        <div className="flex items-center gap-2 font-mono">
          <span className="flex items-center gap-0.5">
            <Phone className="w-2.5 h-2.5" />
            <span>{data?.bizCardPhone1 || '7739553339'}</span>
          </span>
          {data?.bizCardPhone2 && (
            <span className="hidden sm:inline">, {data.bizCardPhone2}</span>
          )}
        </div>
      </div>

      {/* Center Main Firm & Owner Identity */}
      <div className="my-auto py-1">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1
              className={`${compact ? 'text-base font-black' : 'text-2xl font-black'} tracking-wide leading-tight`}
              style={{ fontFamily: data?.headingFont || 'Rozha One', color: inkColor }}
            >
              {data?.bizCardShopName || 'शिवम डिजिटल स्टूडियो & प्रिंटिंग प्रेस'}
            </h1>
            <div className={`${compact ? 'text-[9.5px]' : 'text-xs'} font-semibold mt-0.5 opacity-90`} style={{ color: inkColor }}>
              {data?.bizCardTagline || 'मल्टीकलर ऑफसेट, स्क्रीन प्रिंटिंग एवं शादी कार्ड विशेषज्ञ'}
            </div>
          </div>
          {/* Logo or Motif Icon */}
          <div className={`${compact ? 'w-8 h-8 text-xl' : 'w-12 h-12 text-3xl'} flex items-center justify-center border rounded-full font-bold ml-2`} style={{ borderColor: inkColor }}>
            🖨️
          </div>
        </div>

        {/* Proprietor / Owner Name */}
        <div className="mt-2 pt-1.5 border-t border-dashed flex items-center justify-between" style={{ borderColor: inkColor }}>
          <div>
            <div className={`${compact ? 'text-xs' : 'text-sm'} font-black`} style={{ color: inkColor }}>
              {data?.bizCardOwnerName || 'सनी राज'}
            </div>
            <div className="text-[9px] font-semibold text-stone-600">
              {data?.bizCardDesignation || 'ग्राफिक डिजाइनर व प्रोपराइटर'}
            </div>
          </div>

          {data?.bizCardEmail && (
            <div className="text-right text-[8.5px] font-mono text-stone-600 hidden sm:block">
              {data.bizCardEmail}
            </div>
          )}
        </div>
      </div>

      {/* Services Bullet Strip */}
      {data?.bizCardServices && (
        <div className="my-1 py-1 px-2 bg-stone-100/70 border rounded text-[9px] font-bold text-center leading-tight truncate" style={{ borderColor: inkColor, color: inkColor }}>
          {data.bizCardServices}
        </div>
      )}

      {/* Footer Address */}
      <div className="pt-1 border-t text-[9px] font-medium flex items-center justify-between text-stone-700" style={{ borderColor: inkColor }}>
        <div className="flex items-center gap-1 truncate max-w-[80%]">
          <MapPin className="w-2.5 h-2.5 flex-shrink-0" style={{ color: inkColor }} />
          <span className="truncate">{data?.bizCardAddress || 'मेन मार्केट चौराहा, चेरों मोड़, सरमेरा (नालन्दा)'}</span>
        </div>
        {data?.bizCardWebsite && (
          <span className="font-mono text-[8px] text-stone-500 hidden sm:inline">
            {data.bizCardWebsite}
          </span>
        )}
      </div>
    </div>
  );
}

const VisitingCardMaster = forwardRef(({ data, scale = 1 }, ref) => {
  const isScreenPrint = Boolean(data?.screenPrintMode);
  const is10UpSheet = data?.bizCardViewMode === '10-up-sheet';

  return (
    <ScreenPrintMasterWrapper data={data} type="card">
      <div
        ref={ref}
        id="wedding-card-element"
        className={`wedding-card-print-target relative transition-all duration-200 select-none overflow-hidden mx-auto bg-cover ${
          isScreenPrint ? 'screen-print-active border border-black' : ''
        }`}
        style={{
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top center'
        }}
      >
        {/* VIEW MODE 1: SINGLE CARD (बड़ा व विस्तृत डिज़ाइन) */}
        {!is10UpSheet && (
          <div className="p-4 flex flex-col items-center">
            <SingleVisitingCard data={data} isScreenPrint={isScreenPrint} compact={false} />
            
            {/* View Switcher Tip */}
            <div className="mt-3 text-center text-xs text-stone-600 bg-white/80 px-3 py-1 rounded-full border border-stone-300 no-print flex items-center gap-1.5 shadow-2xs">
              <Scissors className="w-3.5 h-3.5 text-amber-700" />
              <span>A4 शीट पर 10 कार्ड्स एक साथ निकालने के लिए <b>"10-Up A4 शीट"</b> मोड चुनें।</span>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: 10-UP A4 IMPOSITION SHEET (2 कॉलम × 5 रो) */}
        {is10UpSheet && (
          <div
            className="w-[794px] min-h-[1123px] bg-white p-6 relative border border-stone-300 shadow-xl flex flex-col justify-between"
            style={{ fontFamily: data?.fontFamily || "'Noto Serif Devanagari', serif" }}
          >
            {/* A4 Sheet Header Info (No Print / Crop Header) */}
            <div className="flex justify-between items-center text-[10px] text-stone-500 border-b border-stone-200 pb-1 mb-2 font-mono">
              <span className="font-bold text-stone-700">A4 विज़िटिंग कार्ड 10-Up मास्टर शीट (10 Cards Imposition)</span>
              <span>साइज: 3.5" × 2" (89×51 mm) • 300/600 DPI</span>
            </div>

            {/* 10-Card Grid (2 columns × 5 rows) */}
            <div className="grid grid-cols-2 gap-2 flex-1 relative">
              {/* Cutting guides indicator */}
              <div className="absolute inset-0 pointer-events-none border border-dashed border-stone-300 z-10" />

              {Array.from({ length: 10 }).map((_, idx) => (
                <div key={idx} className="relative flex items-center justify-center p-0.5">
                  {/* Corner crop tick marks */}
                  <span className="absolute -top-1 -left-1 text-[8px] text-stone-400 select-none">┌</span>
                  <span className="absolute -top-1 -right-1 text-[8px] text-stone-400 select-none">┐</span>
                  <span className="absolute -bottom-1 -left-1 text-[8px] text-stone-400 select-none">└</span>
                  <span className="absolute -bottom-1 -right-1 text-[8px] text-stone-400 select-none">┘</span>

                  <SingleVisitingCard data={data} isScreenPrint={isScreenPrint} compact={true} />
                </div>
              ))}
            </div>

            {/* A4 Sheet Footer with Cutting Guide Line */}
            <div className="mt-2 pt-1 border-t border-dashed border-stone-300 flex justify-between items-center text-[9px] text-stone-500 font-mono">
              <span className="flex items-center gap-1">
                <Scissors className="w-3 h-3" />
                <span>✂️ कटिंग मार्क के साथ सीधे A4 शीट पर प्रिंट करें व कटर से काटें</span>
              </span>
              <span>राइज प्रिंट 10-Up A4 इम्पोज़िशन मास्टर</span>
            </div>
          </div>
        )}
      </div>
    </ScreenPrintMasterWrapper>
  );
});

export default VisitingCardMaster;
