import React, { forwardRef } from 'react';
import { CARD_SIZES, ENVELOPE_SIZES } from '../../utils/defaultData';

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

  const isMirror = Boolean(data.screenPrintMirror);
  const isInvert = Boolean(data.screenPrintInvert);
  const showCropMarks = data.screenPrintCropMarks !== false;
  const showMasterInfo = data.screenPrintMasterInfo !== false;
  const showPaperEffect = data.screenPrintPaperEffect !== false;

  const currentSize =
    type === 'envelope'
      ? ENVELOPE_SIZES[data.envelopeSizeKey] || ENVELOPE_SIZES['standard']
      : CARD_SIZES[data.sizeKey] || CARD_SIZES['7x9'];

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
          <div className="flex items-center gap-1.5 font-bold">
            <span className="inline-block px-1 rounded bg-black text-white text-[9px] font-sans">
              MASTER
            </span>
            <span>{isMirror ? '🪞 बटर पेपर (मिरर एक्सपोज़र)' : '🖨️ बटर पेपर (पॉजिटिव मास्टर)'}</span>
            <span className="opacity-60">|</span>
            <span>जॉब: {jobName}</span>
          </div>

          <div className="flex items-center gap-2">
            <span>साइज़: {currentSize.name.split('(')[0].trim()} ({currentSize.widthMm}×{currentSize.heightMm}mm)</span>
            <span className="opacity-60">|</span>
            <span className="font-bold text-red-600">स्केल: 100% (Do Not Scale)</span>
            <span className="opacity-60">|</span>
            <span>600 DPI</span>
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

        {/* 3. Inner Flippable / Invertible Card Content */}
        <div
          className="screen-print-inner-flip transition-transform duration-200"
          style={{
            transform: isMirror ? 'scaleX(-1)' : 'none'
          }}
        >
          {children}
        </div>
      </div>

      {/* 4. Mirror Warning Ribbon (Only when mirror is ON) */}
      {isMirror && (
        <div className="mt-2 text-center text-[10px] font-sans font-bold text-amber-900 bg-amber-100/90 py-1 px-2 rounded border border-amber-300">
          ⚠️ ध्यान दें: यह शीशा प्रभाव (Mirror Image) है। प्रिंटर से निकलने के बाद टोनर सीधे स्क्रीन जाली (इमल्शन) पर रखा जाएगा।
        </div>
      )}
    </div>
  );
});

ScreenPrintMasterWrapper.displayName = 'ScreenPrintMasterWrapper';

export default ScreenPrintMasterWrapper;

