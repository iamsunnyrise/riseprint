import React from 'react';
import VenueQrCode from '../Motifs/VenueQrCode';
import BaalManuharBadge from '../Motifs/BaalManuharBadge';

export default function CardFooter({ data }) {
  const {
    inkColor,
    headingFont,
    darshanabhilashiTitle = 'दर्शनाभिलाषी',
    darshanabhilashiNames,
    showSwagatotsuk = true,
    swagatotsukTitle = 'स्वागतोत्सुक',
    swagatotsukNames,
    aakankshiTitle = 'आकांक्षी',
    aakankshiNames,
    pressLine,
    showVenueDetails = true,
    showVenueQr = true,
    venueTitle = 'विवाह स्थल',
    venueName,
    venueAddress,
    venueMapsUrl,
    qrLabel = 'मानचित्र हेतु स्कैन करें',
    qrCenterIcon = 'pin',
    qrPlacement = 'footer',
    qrColorMode = 'theme',
    qrSize = 58,
    showBaalManuhar = true,
    baalManuharTitle = 'बाल मनुहार',
    baalManuharQuote,
    baalManuharKids
  } = data;

  const isDedicatedBanner = showVenueDetails && qrPlacement === 'dedicated-banner';
  const isFooterPlacement = showVenueDetails && qrPlacement === 'footer';

  return (
    <div className="w-full pt-1.5">
      {/* 1. Dedicated Venue Banner Option (If placement is dedicated-banner) */}
      {isDedicatedBanner && (
        <div className="w-full mb-2 px-3">
          <div
            className="px-3 py-1.5 rounded-lg border-2 flex items-center justify-between gap-3 shadow-sm relative overflow-hidden"
            style={{
              borderColor: `${inkColor}60`,
              backgroundColor: `${inkColor}06`
            }}
          >
            {/* Subtle background motif watermark */}
            <div className="absolute -right-2 -bottom-2 text-4xl opacity-5 select-none pointer-events-none">
              卐
            </div>

            <div className="flex-1 text-left min-w-0" style={{ color: inkColor }}>
              <div
                className="flex items-center gap-1.5 font-black text-xs sm:text-[13px] tracking-wide"
                style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
              >
                <span className="text-sm select-none">📍</span>
                <span className="underline underline-offset-2">{venueTitle} :-</span>
                <span className="text-sm sm:text-[15px] font-black">{venueName}</span>
              </div>
              {venueAddress && (
                <div className="text-[11px] sm:text-xs font-semibold opacity-90 pl-5 mt-0.5 leading-snug">
                  {venueAddress}
                </div>
              )}
            </div>

            {/* QR Code in dedicated banner */}
            {showVenueQr && (
              <div className="flex-shrink-0">
                <VenueQrCode
                  url={venueMapsUrl}
                  size={qrSize || 62}
                  inkColor={inkColor}
                  colorMode={qrColorMode}
                  centerIcon={qrCenterIcon}
                  label={qrLabel}
                  showLabel={true}
                  showBorder={true}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Family & Venue Section in Footer */}
      {isFooterPlacement ? (
        /* 3-Column Layout: Left (दर्शनाभिलाषी + स्वागतोत्सुक) | Center (विवाह स्थल & QR) | Right (आकांक्षी) */
        <div className="grid grid-cols-12 gap-2 px-3 text-xs sm:text-[13px] leading-tight items-start">
          {/* Left Side: दर्शनाभिलाषी & स्वागतोत्सुक (col-span-4) */}
          <div className="col-span-4 text-left space-y-2" style={{ color: inkColor }}>
            <div>
              <div
                className="font-black underline decoration-1 underline-offset-2 mb-1 text-xs sm:text-[13px] tracking-wide"
                style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
              >
                {darshanabhilashiTitle}
              </div>
              <div className="whitespace-pre-line font-semibold leading-relaxed text-[10.5px] sm:text-[11.5px] opacity-95">
                {darshanabhilashiNames}
              </div>
            </div>

            {/* स्वागतोत्सुक in Left column */}
            {showSwagatotsuk && swagatotsukNames && (
              <div className="pt-1.5 border-t border-dashed" style={{ borderColor: `${inkColor}30` }}>
                <div
                  className="font-black underline decoration-1 underline-offset-2 mb-0.5 text-xs sm:text-[12.5px] tracking-wide"
                  style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
                >
                  {swagatotsukTitle}
                </div>
                <div className="whitespace-pre-line font-semibold leading-relaxed text-[10px] sm:text-[11px] opacity-95">
                  {swagatotsukNames}
                </div>
              </div>
            )}
          </div>

          {/* Center: विवाह स्थल & QR Code (col-span-4) */}
          <div className="col-span-4 text-center flex flex-col items-center justify-center px-1" style={{ color: inkColor }}>
            <div
              className="font-black underline decoration-1 underline-offset-2 mb-0.5 text-xs sm:text-[13px] tracking-wide"
              style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
            >
              📍 {venueTitle}
            </div>
            <div className="font-extrabold text-[11px] sm:text-xs leading-tight mb-0.5 line-clamp-2">
              {venueName}
            </div>
            {venueAddress && (
              <div className="text-[9.5px] sm:text-[10px] font-medium opacity-90 leading-tight mb-1">
                {venueAddress}
              </div>
            )}
            {showVenueQr && (
              <VenueQrCode
                url={venueMapsUrl}
                size={qrSize || 56}
                inkColor={inkColor}
                colorMode={qrColorMode}
                centerIcon={qrCenterIcon}
                label={qrLabel}
                showLabel={true}
                showBorder={true}
              />
            )}
          </div>

          {/* Right Side: आकांक्षी (col-span-4) */}
          <div className="col-span-4 text-right" style={{ color: inkColor }}>
            <div
              className="font-black underline decoration-1 underline-offset-2 mb-1 text-xs sm:text-[13px] tracking-wide"
              style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
            >
              {aakankshiTitle}
            </div>
            <div className="whitespace-pre-line font-semibold leading-relaxed text-[10.5px] sm:text-[11.5px] opacity-95">
              {aakankshiNames}
            </div>
          </div>
        </div>
      ) : showSwagatotsuk && swagatotsukNames ? (
        /* 3-Column Layout: Left (दर्शनाभिलाषी) | Center (स्वागतोत्सुक) | Right (आकांक्षी) */
        <div className="grid grid-cols-3 gap-3 px-3 text-xs sm:text-[13px] leading-tight items-start">
          {/* Col 1: दर्शनाभिलाषी */}
          <div className="text-left" style={{ color: inkColor }}>
            <div
              className="font-black underline decoration-1 underline-offset-2 mb-1.5 text-xs sm:text-sm tracking-wide"
              style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
            >
              {darshanabhilashiTitle}
            </div>
            <div className="whitespace-pre-line font-semibold leading-relaxed text-[11px] sm:text-xs opacity-95">
              {darshanabhilashiNames}
            </div>
          </div>

          {/* Col 2: स्वागतोत्सुक */}
          <div className="text-center" style={{ color: inkColor }}>
            <div
              className="font-black underline decoration-1 underline-offset-2 mb-1.5 text-xs sm:text-sm tracking-wide"
              style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
            >
              {swagatotsukTitle}
            </div>
            <div className="whitespace-pre-line font-semibold leading-relaxed text-[11px] sm:text-xs opacity-95">
              {swagatotsukNames}
            </div>
          </div>

          {/* Col 3: आकांक्षी */}
          <div className="text-right" style={{ color: inkColor }}>
            <div
              className="font-black underline decoration-1 underline-offset-2 mb-1.5 text-xs sm:text-sm tracking-wide"
              style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
            >
              {aakankshiTitle}
            </div>
            <div className="whitespace-pre-line font-semibold leading-relaxed text-[11px] sm:text-xs opacity-95">
              {aakankshiNames}
            </div>
          </div>
        </div>
      ) : (
        /* Classic 2-Column Layout */
        <div className="grid grid-cols-2 gap-4 px-3 text-xs sm:text-[13px] leading-tight">
          {/* Left Side: दर्शनाभिलाषी */}
          <div className="text-left" style={{ color: inkColor }}>
            <div
              className="font-black underline decoration-1 underline-offset-2 mb-1.5 text-sm sm:text-base tracking-wide"
              style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
            >
              {darshanabhilashiTitle}
            </div>
            <div className="whitespace-pre-line font-semibold leading-relaxed opacity-95">
              {darshanabhilashiNames}
            </div>
          </div>

          {/* Right Side: आकांक्षी */}
          <div className="text-right" style={{ color: inkColor }}>
            <div
              className="font-black underline decoration-1 underline-offset-2 mb-1.5 text-sm sm:text-base tracking-wide"
              style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
            >
              {aakankshiTitle}
            </div>
            <div className="whitespace-pre-line font-semibold leading-relaxed opacity-95">
              {aakankshiNames}
            </div>
          </div>
        </div>
      )}

      {/* 3. Baal Manuhar (बाल मनुहार) Badge */}
      {showBaalManuhar && (baalManuharQuote || baalManuharKids) && (
        <BaalManuharBadge
          title={baalManuharTitle}
          quote={baalManuharQuote}
          kids={baalManuharKids}
          color={inkColor}
          headingFont={headingFont}
        />
      )}

      {/* 4. Printing Press Footer Line */}
      {pressLine && (
        <div
          className="text-center text-[9.5px] sm:text-[10.5px] font-semibold tracking-wider mt-1.5 pt-1 border-t"
          style={{ color: inkColor, borderColor: `${inkColor}35` }}
        >
          {pressLine}
        </div>
      )}
    </div>
  );
}


