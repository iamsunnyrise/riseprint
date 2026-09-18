import React, { forwardRef } from 'react';
import { CARD_SIZES, ENVELOPE_SIZES, INDIAN_PRINTER_PRESETS, getCardEffectiveDimensions } from '../../utils/defaultData';

/**
 * Screen Print Master Wrapper (स्क्रीन व ऑफसेट प्रिंटिंग मास्टर रैपर)
 * 
 * Provides professional printing press features:
 * - Corner L-Crop Marks for trimming and screen positioning
 * - Center 4-way Registration Marks (⌖) for multi-color alignment and screen table stops
 * - Technical Print Master Metadata Header (Job, Size, Date, Scale 100%, 600 DPI Laser Ready)
 * - Mirror Image Flip (scaleX(-1)) for direct toner-to-emulsion contact
 * - Negative Inversion Mode (White on Pure Solid Black)
 * - Gateway 90 GSM Translucent Butter Paper texture simulation in preview
 * - 100% Toner Density Presets for popular Indian printers (HP 1020, Canon 2900B, Epson L805, etc.)
 * - Micro-Matra Stroke Protection (+0.25pt) preventing Devanagari ligature water washouts
 */
const ScreenPrintMasterWrapper = forwardRef(({
  children,
  data,
  type = 'card', // 'card' or 'envelope'
  className = ''
}, ref) => {
  const isScreenPrint = Boolean(data?.screenPrintMode);

  if (!isScreenPrint) {
    return <div ref={ref} className={`relative ${className}`}>{children}</div>;
  }

  const isFoilMode = Boolean(data.screenPrintFoilMode);
  const isMirror = Boolean(data.screenPrintMirror);
  const isInvert = Boolean(data.screenPrintInvert || isFoilMode);
  const plate = data.screenPrintPlate || 'all'; // 'all', 'text', 'motifs'
  const imposition = data.screenPrintImposition || '1-up'; // '1-up', '2-up', '4-up'
  const sheetSize = data.screenPrintSheetSize || 'a4'; // 'natural', 'a4', '12x18'
  const showCutMarks = data.screenPrintShowCutMarks !== false;
  const showCropMarks = data.screenPrintCropMarks !== false;
  const showMasterInfo = data.screenPrintMasterInfo !== false;
  const showPaperEffect = data.screenPrintPaperEffect !== false && !isFoilMode && !isInvert;

  const printerId = data.selectedPrinterPreset || 'hp-1020';
  const currentPrinter =
    INDIAN_PRINTER_PRESETS.find((p) => p.id === printerId) ||
    INDIAN_PRINTER_PRESETS[0];
  const tonerLevel = data.tonerDensityLevel || '100';
  const isMatraProtection = data.matraProtectionStroke !== false;

  const currentSize =
    type === 'envelope'
      ? ENVELOPE_SIZES[data.envelopeSizeKey] || ENVELOPE_SIZES['standard']
      : getCardEffectiveDimensions(data);

  const today = new Date().toLocaleDateString('hi-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const jobName =
    type === 'envelope'
      ? `लिफाफा (${data.envelopeTitle || 'शुभ विवाह'})`
      : `${data.groomName || 'वर'} संग ${data.brideName || 'वधू'} (विवाह कार्ड)`;

  return (
    <div
      ref={ref}
      className={`screen-print-master-container relative select-none mx-auto transition-all ${className}`}
      style={{
        padding: showCropMarks ? '30px 24px 24px 24px' : '10px',
        backgroundColor: isInvert
          ? '#000000'
          : showPaperEffect
          ? '#faf8f2' // Gateway 90 GSM Translucent Butter Paper Warm Ivory Tint
          : '#ffffff',
        backgroundImage:
          !isInvert && showPaperEffect
            ? 'radial-gradient(#e5dec9 0.75px, transparent 0.75px), radial-gradient(#d8ceb3 0.75px, #faf8f2 0.75px)'
            : undefined,
        backgroundSize: '16px 16px',
        backgroundPosition: '0 0, 8px 8px',
        boxShadow: isInvert
          ? '0 10px 30px rgba(0, 0, 0, 0.8), 0 0 0 1px #333'
          : '0 10px 30px rgba(120, 100, 60, 0.2), 0 0 0 1px rgba(0,0,0,0.1)',
        color: isInvert ? '#ffffff' : '#000000'
      }}
    >
      {/* 1. Technical Print Master Info Strip (Header) */}
      {showMasterInfo && (
        <div
          className="screen-print-master-header mb-2 px-1 flex flex-wrap items-center justify-between gap-1 text-[10px] font-mono tracking-tight border-b pb-1"
          style={{
            borderColor: isInvert ? '#333333' : '#000000',
            color: isInvert ? '#cccccc' : '#111111'
          }}
        >
          <div className="flex items-center gap-1.5 font-bold flex-wrap">
            <span className="inline-block px-1 rounded bg-black text-white text-[9px] font-sans">
              MASTER
            </span>

            {/* Mode / Plate Status Badge */}
            {isFoilMode ? (
              <span className="bg-amber-400 text-stone-950 px-2 py-0.5 rounded text-[10px] font-black">
                ⬛ हॉट फॉयल ब्लॉक डाई मास्टर (Negative Reverse)
              </span>
            ) : plate === 'text' ? (
              <span className="bg-red-700 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                🔴 प्लेट 1: केवल टेक्स्ट मास्टर (Red Ink Screen)
              </span>
            ) : plate === 'motifs' ? (
              <span className="bg-amber-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                🟡 प्लेट 2: केवल मोटिफ व बॉर्डर (Gold Ink Screen)
              </span>
            ) : (
              <span>{isMirror ? '🪞 बटर पेपर (मिरर एक्सपोज़र)' : '🖨️ बटर पेपर (पॉजिटिव मास्टर)'}</span>
            )}

            <span className="opacity-60">|</span>
            <span>जॉब: {jobName}</span>

            {/* Imposition Badge */}
            {imposition !== '1-up' && (
              <span className="bg-emerald-800 text-emerald-100 px-1.5 py-0.5 rounded text-[9.5px] font-bold">
                ✂️ {imposition === '2-up' ? '2-Up लेआउट (50% बचत)' : '4-Up लेआउट (75% बचत)'} ({sheetSize.toUpperCase()})
              </span>
            )}

            {/* Printer Profile & D-Max Badge */}
            <span className="opacity-60">|</span>
            <span
              className="px-1.5 py-0.5 rounded font-bold text-[9.5px]"
              style={{
                backgroundColor: isInvert ? '#222222' : '#f0ece1',
                color: isInvert ? '#ffffff' : '#000000',
                border: '1px solid',
                borderColor: isInvert ? '#444444' : '#d5cebe'
              }}
              title={currentPrinter.description}
            >
              🖨️ {currentPrinter.shortName} ({currentPrinter.cartridge})
            </span>

            <span
              className="px-1.5 py-0.5 rounded font-bold text-[9.5px]"
              style={{
                backgroundColor: isInvert ? '#333333' : '#000000',
                color: '#fef08a'
              }}
            >
              {currentPrinter.dMaxLevel.split(' ')[0]} {tonerLevel === 'extreme' ? '150% MAX' : tonerLevel === 'boost' ? '120% D-Max' : '100% Solid'}
            </span>

            {isMatraProtection && (
              <span className="bg-emerald-900 text-emerald-100 px-1.5 py-0.5 rounded text-[9.5px] font-bold">
                🛡️ मात्रा कवच ON
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span>कार्ड: {currentSize.name.split('(')[0].trim()} ({currentSize.widthMm}×{currentSize.heightMm}mm)</span>
            <span className="opacity-60">|</span>
            {imposition !== '1-up' && (
              <>
                <span>शीट: {sheetSize === '12x18' ? '12×18 इंच' : 'A4 (210×297mm)'}</span>
                <span className="opacity-60">|</span>
              </>
            )}
            <span className="font-bold text-red-600">स्केल: 100% (Do Not Scale)</span>
            <span className="opacity-60">|</span>
            <span>{currentPrinter.resolution.split(' ')[0]}</span>
            <span className="opacity-60">|</span>
            <span>{today}</span>
          </div>
        </div>
      )}

      {/* 2. Main Target Container with Crop Marks & Registration Crosshairs */}
      <div className="relative inline-block w-full">
        {/* Registration Marks & Crop Marks */}
        {showCropMarks && (
          <>
            {/* Top-Left Crop Mark (L-Shape) */}
            <div className="absolute -top-4 -left-4 w-4 h-4 pointer-events-none">
              <div
                className="absolute right-0 bottom-0 w-3.5 h-[1px]"
                style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
              />
              <div
                className="absolute right-0 bottom-0 w-[1px] h-3.5"
                style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
              />
            </div>

            {/* Top-Right Crop Mark (L-Shape) */}
            <div className="absolute -top-4 -right-4 w-4 h-4 pointer-events-none">
              <div
                className="absolute left-0 bottom-0 w-3.5 h-[1px]"
                style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
              />
              <div
                className="absolute left-0 bottom-0 w-[1px] h-3.5"
                style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
              />
            </div>

            {/* Bottom-Left Crop Mark (L-Shape) */}
            <div className="absolute -bottom-4 -left-4 w-4 h-4 pointer-events-none">
              <div
                className="absolute right-0 top-0 w-3.5 h-[1px]"
                style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
              />
              <div
                className="absolute right-0 top-0 w-[1px] h-3.5"
                style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
              />
            </div>

            {/* Bottom-Right Crop Mark (L-Shape) */}
            <div className="absolute -bottom-4 -right-4 w-4 h-4 pointer-events-none">
              <div
                className="absolute left-0 top-0 w-3.5 h-[1px]"
                style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
              />
              <div
                className="absolute left-0 top-0 w-[1px] h-3.5"
                style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
              />
            </div>

            {/* Top-Center Registration Crosshair (⌖) */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-4 h-4 pointer-events-none flex items-center justify-center">
              <div
                className="w-3 h-3 rounded-full border border-current flex items-center justify-center relative"
                style={{ borderColor: isInvert ? '#ffffff' : '#000000' }}
              >
                <div
                  className="w-4 h-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
                />
                <div
                  className="h-4 w-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
                />
              </div>
            </div>

            {/* Bottom-Center Registration Crosshair (⌖) */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4 h-4 pointer-events-none flex items-center justify-center">
              <div
                className="w-3 h-3 rounded-full border border-current flex items-center justify-center relative"
                style={{ borderColor: isInvert ? '#ffffff' : '#000000' }}
              >
                <div
                  className="w-4 h-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
                />
                <div
                  className="h-4 w-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
                />
              </div>
            </div>

            {/* Left-Center Registration Crosshair (⌖) */}
            <div className="absolute -left-5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none flex items-center justify-center">
              <div
                className="w-3 h-3 rounded-full border border-current flex items-center justify-center relative"
                style={{ borderColor: isInvert ? '#ffffff' : '#000000' }}
              >
                <div
                  className="w-4 h-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
                />
                <div
                  className="h-4 w-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
                />
              </div>
            </div>

            {/* Right-Center Registration Crosshair (⌖) */}
            <div className="absolute -right-5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none flex items-center justify-center">
              <div
                className="w-3 h-3 rounded-full border border-current flex items-center justify-center relative"
                style={{ borderColor: isInvert ? '#ffffff' : '#000000' }}
              >
                <div
                  className="w-4 h-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
                />
                <div
                  className="h-4 w-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ backgroundColor: isInvert ? '#ffffff' : '#000000' }}
                />
              </div>
            </div>
          </>
        )}

        {/* 3. Inner Content Layout (1-Up, 2-Up, or 4-Up Imposition) */}
        <div
          className={`screen-print-inner-flip transition-transform duration-200 ${
            isMatraProtection ? 'printer-matra-protection' : ''
          } ${
            tonerLevel === 'extreme'
              ? 'toner-density-extreme'
              : tonerLevel === 'boost'
              ? 'toner-density-boost'
              : 'toner-density-100'
          }`}
          style={{
            transform: isMirror ? 'scaleX(-1)' : 'none'
          }}
        >
          {imposition === '1-up' ? (
            /* Standard 1-Up Single Card Master */
            <div>{children}</div>
          ) : imposition === '2-up' ? (
            /* 2-Up Dual Card Imposition Layout (Side-by-Side with ✂️ Center Cut Line) */
            <div className="imposition-2up-layout flex flex-col md:flex-row items-center justify-center gap-4 relative">
              {/* Card Copy 1 */}
              <div className="relative">
                {children}
              </div>

              {/* Center Cutting Mark Divider */}
              {showCutMarks && (
                <div className="flex md:flex-col items-center justify-between self-stretch py-2 px-2 select-none pointer-events-none">
                  <div className="w-6 h-6 rounded-full bg-white border border-stone-400 flex items-center justify-center text-xs shadow-xs z-20">
                    ✂️
                  </div>
                  <div className="flex-1 border-t-2 md:border-t-0 md:border-l-2 border-dashed border-stone-500 my-1 min-h-[50px] min-w-[30px]" />
                  <div className="text-[9.5px] font-mono tracking-widest uppercase md:rotate-90 my-2 bg-white px-1.5 py-0.5 border border-stone-300 rounded font-bold shadow-xs text-stone-800 z-20">
                    ✂️ CUT LINE ✂️
                  </div>
                  <div className="flex-1 border-t-2 md:border-t-0 md:border-l-2 border-dashed border-stone-500 my-1 min-h-[50px] min-w-[30px]" />
                  <div className="w-6 h-6 rounded-full bg-white border border-stone-400 flex items-center justify-center text-xs shadow-xs z-20">
                    ✂️
                  </div>
                </div>
              )}

              {/* Card Copy 2 (Clone) */}
              <div className="relative">
                {React.cloneElement(children, { key: 'imposition-clone-1' })}
              </div>
            </div>
          ) : (
            /* 4-Up Quad Card Imposition Layout (2x2 Grid with Cross Cut Lines) */
            <div className="imposition-4up-layout relative grid grid-cols-1 md:grid-cols-2 gap-5 p-1 justify-items-center">
              {/* Card 1 (Top-Left) */}
              <div className="relative">{children}</div>

              {/* Card 2 (Top-Right) */}
              <div className="relative">{React.cloneElement(children, { key: 'imposition-clone-1' })}</div>

              {/* Card 3 (Bottom-Left) */}
              <div className="relative">{React.cloneElement(children, { key: 'imposition-clone-2' })}</div>

              {/* Card 4 (Bottom-Right) */}
              <div className="relative">{React.cloneElement(children, { key: 'imposition-clone-3' })}</div>

              {/* Horizontal & Vertical Cross Cut Guides */}
              {showCutMarks && (
                <>
                  <div className="imposition-cut-line-v left-1/2 hidden md:block" />
                  <div className="imposition-cut-line-h top-1/2 hidden md:block" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border-2 border-stone-400 hidden md:flex items-center justify-center text-xs font-bold shadow-sm z-30 pointer-events-none">
                    ✂️
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 4. Warning Ribbons */}
      {isMirror && (
        <div className="mt-2 text-center text-[10px] font-sans font-bold text-amber-900 bg-amber-100/90 py-1 px-2 rounded border border-amber-300">
          ⚠️ ध्यान दें: यह शीशा प्रभाव (Mirror Image) है। प्रिंटर से निकलने के बाद टोनर सीधे स्क्रीन जाली (इमल्शन) पर रखा जाएगा।
        </div>
      )}

      {isFoilMode && (
        <div className="mt-2 text-center text-[10.5px] font-sans font-bold text-white bg-red-950 py-1.5 px-3 rounded border border-amber-400 flex items-center justify-center gap-2">
          <span>⬛ हॉट डाई ब्लॉक मेकर गाइड:</span>
          <span className="font-normal text-amber-200">
            100% सॉलिड ब्लैक बैकग्राउंड • केवल व्हाइट आर्टवर्क नाइट्रिक एसिड में इच (Etch) होगा।
          </span>
        </div>
      )}
    </div>
  );
});

ScreenPrintMasterWrapper.displayName = 'ScreenPrintMasterWrapper';

export default ScreenPrintMasterWrapper;

