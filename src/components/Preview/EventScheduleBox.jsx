import React from 'react';
import BananaTree from '../Motifs/BananaTree';
import { PillarArchFrame, DividerRibbon } from '../Motifs/TraditionalBorders';
import VenueQrCode from '../Motifs/VenueQrCode';

export default function EventScheduleBox({ data }) {
  const {
    inkColor,
    headingFont,
    programTitle,
    showBananaTrees,
    events,
    noteText
  } = data;

  return (
    <div className="w-full my-2 relative">
      {/* Container with Banana Trees flanking left and right */}
      <div className="flex items-center justify-between gap-1 sm:gap-2">
        {/* Left Banana Tree (कदली स्तम्भ) (Motif Plate) */}
        {showBananaTrees && (
          <div className="dtp-plate-motif flex-shrink-0 flex items-center justify-center pl-0.5">
            <BananaTree
              color={inkColor}
              style={{ width: '82px', height: '165px' }}
            />
          </div>
        )}

        {/* Center Pillared Program Box */}
        <div className="flex-1 min-w-0">
          <PillarArchFrame color={inkColor}>
            {/* Header: वैवाहिक कार्यक्रम with traditional flourish */}
            <div className="text-center mb-1.5">
              <div
                className="inline-block px-4 py-0.5 text-lg sm:text-xl font-black tracking-wide"
                style={{ color: inkColor, fontFamily: `'${headingFont}', 'Rozha One', serif` }}
              >
                {programTitle}
              </div>
              {/* Floral flourish underline */}
              <div className="flex items-center justify-center gap-2 -mt-0.5 mb-2 opacity-85">
                <span className="h-[2px] w-14 bg-current" style={{ color: inkColor }} />
                <span className="text-sm font-bold" style={{ color: inkColor }}>❦</span>
                <span className="h-[2px] w-14 bg-current" style={{ color: inkColor }} />
              </div>
            </div>

            {/* List of Events */}
            <div className="space-y-1.5 sm:space-y-2 text-center text-xs sm:text-[13.5px] font-bold">
              {events.map((item, index) => {
                const hasDetails = item.tithi || item.date || item.day;
                return (
                  <div
                    key={index}
                    className="leading-snug tracking-normal py-0.5"
                    style={{ color: inkColor }}
                  >
                    {hasDetails ? (
                      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
                        {item.tithi && <span className="font-semibold">{item.tithi}</span>}
                        {item.date && <span className="font-black underline decoration-1 underline-offset-2">{item.date}</span>}
                        {item.day && <span className="font-semibold">{item.day}</span>}
                        {item.event && (
                          <span
                            className="font-black tracking-wide"
                            style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
                          >
                            {item.event}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div
                        className="font-black text-sm tracking-wide"
                        style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
                      >
                        {item.event}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </PillarArchFrame>

          {/* Special Note */}
          {noteText && (
            <div
              className="text-center text-[11px] sm:text-[12px] font-semibold mt-1.5 px-3 leading-tight tracking-wide"
              style={{ color: inkColor }}
            >
              {noteText}
            </div>
          )}

          {/* Venue & QR Code (If placed below program) */}
          {data.showVenueDetails && data.qrPlacement === 'below-program' && (
            <div
              className="mt-2 mx-1 p-1.5 rounded border flex items-center justify-between gap-2 text-left"
              style={{
                borderColor: `${inkColor}60`,
                backgroundColor: `${inkColor}05`
              }}
            >
              <div className="flex-1 min-w-0" style={{ color: inkColor }}>
                <div
                  className="font-black text-xs sm:text-[12.5px] flex items-center gap-1 tracking-wide"
                  style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
                >
                  <span className="text-sm">📍</span>
                  <span>{data.venueTitle || 'विवाह स्थल'} :-</span>
                  <span className="text-xs sm:text-sm font-black">{data.venueName}</span>
                </div>
                {data.venueAddress && (
                  <div className="text-[10px] sm:text-[11px] font-semibold opacity-90 pl-4 mt-0.5 leading-tight">
                    {data.venueAddress}
                  </div>
                )}
              </div>
              {data.showVenueQr && (
                <div className="dtp-plate-motif flex-shrink-0">
                  <VenueQrCode
                    url={data.venueMapsUrl}
                    size={48}
                    inkColor={inkColor}
                    colorMode={data.qrColorMode}
                    centerIcon={data.qrCenterIcon}
                    label="स्कैन करें"
                    showLabel={true}
                    showBorder={true}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Banana Tree (कदली स्तम्भ) - Mirrored (Motif Plate) */}
        {showBananaTrees && (
          <div className="dtp-plate-motif flex-shrink-0 flex items-center justify-center pr-0.5">
            <BananaTree
              color={inkColor}
              style={{ width: '82px', height: '165px' }}
              flip={true}
            />
          </div>
        )}
      </div>

      {/* Scalloped Divider Ribbon (कंगूरा पट्टी) */}
      <DividerRibbon color={inkColor} isScreenPrint={data.screenPrintMode} className="w-full mt-2 mb-1" />
    </div>
  );
}

