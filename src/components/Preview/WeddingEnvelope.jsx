import React, { forwardRef } from 'react';
import GaneshaColorBadge from '../Motifs/GaneshaColorBadge';
import ShehnaiKalash from '../Motifs/ShehnaiKalash';
import VenueQrCode from '../Motifs/VenueQrCode';
import ScreenPrintMasterWrapper from './ScreenPrintMasterWrapper';
import DraftProofOverlay from '../Controls/DraftProofOverlay';
import { ENVELOPE_SIZES } from '../../utils/defaultData';
import shubhVivahSealHd from '../../assets/shubh-vivah-seal-hd.png';
import { getPaperTextureStyle, getPaperVignetteStyle } from '../../utils/paperTextures';

/**
 * Traditional Indian Wedding Envelope (शादी का लिफाफा / Cover)
 * Matching authentic offset printing press envelopes with:
 * - 3D Lord Ganesha medallion badge
 * - Auspicious "शुभ विवाह" calligraphic heading
 * - "प्रेषक" (Sender) details with contact & address
 * - "प्रति / सेवा में" (Recipient) formal invitation guidelines
 * - Ornate traditional press border & postage seal
 */
const WeddingEnvelope = forwardRef(({ data, scale = 1 }, ref) => {
  const isScreenPrint = Boolean(data?.screenPrintMode);
  const currentSize = ENVELOPE_SIZES[data.envelopeSizeKey] || ENVELOPE_SIZES['standard'];
  
  // Base width for envelope display
  const baseWidth = 720;
  const heightInches = currentSize.heightInches;
  const widthInches = currentSize.widthInches;
  const calculatedHeight = (baseWidth * heightInches) / widthInches;

  const inkColor = isScreenPrint ? '#000000' : (data.inkColor || '#a61515');
  const paperColor = isScreenPrint ? '#ffffff' : (data.paperColor || '#fffef9');
  const headingFont = data.headingFont || 'Rozha One';

  const envelopeTextureId = data?.syncTextureToEnvelope !== false 
    ? (data?.paperTexture || 'smooth-matte') 
    : 'smooth-matte';

  const paperTextureStyle = getPaperTextureStyle(
    envelopeTextureId,
    isScreenPrint,
    paperColor
  );

  const paperVignetteStyle = getPaperVignetteStyle(
    envelopeTextureId,
    isScreenPrint
  );

  return (
    <ScreenPrintMasterWrapper data={data} type="envelope">
      <div
        ref={ref}
        id="wedding-envelope-element"
        className={`wedding-envelope-print-target relative transition-all duration-200 select-none overflow-hidden mx-auto bg-cover ${
          isScreenPrint ? 'screen-print-active border border-black' : ''
        } ${
          isScreenPrint && data.screenPrintMotifStyle === 'silhouette'
            ? 'screen-print-motif-silhouette'
            : ''
        } ${
          isScreenPrint && data.screenPrintTonerBoost ? 'screen-print-toner-boost' : ''
        } ${
          isScreenPrint && data.screenPrintPlate === 'text' ? 'screen-plate-text-only' : ''
        } ${
          isScreenPrint && data.screenPrintPlate === 'motifs' ? 'screen-plate-motifs-only' : ''
        }`}
        style={{
          width: `${baseWidth}px`,
          minHeight: `${calculatedHeight}px`,
          color: inkColor,
          fontFamily: data.fontFamily || "'Noto Serif Devanagari', serif",
          boxShadow: isScreenPrint
            ? 'none'
            : '0 10px 30px -5px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
          ...paperTextureStyle
        }}
      >
        {/* Background Vintage Paper Vignette effect */}
        {!isScreenPrint && (
          <div
            className="absolute inset-0 pointer-events-none transition-all duration-300"
            style={paperVignetteStyle}
          />
        )}

      {/* Traditional Ornate Outer Envelope Border (Motif Plate) */}
      <div className="dtp-plate-motif absolute inset-3 border-2 pointer-events-none" style={{ borderColor: inkColor }}>
        <div className="absolute inset-1 border" style={{ borderColor: `${inkColor}60` }} />
        {/* Corner Flourish Ornaments */}
        <div className="absolute top-1 left-1 text-sm font-bold" style={{ color: inkColor }}>❖</div>
        <div className="absolute top-1 right-1 text-sm font-bold" style={{ color: inkColor }}>❖</div>
        <div className="absolute bottom-1 left-1 text-sm font-bold" style={{ color: inkColor }}>❖</div>
        <div className="absolute bottom-1 right-1 text-sm font-bold" style={{ color: inkColor }}>❖</div>
      </div>

      {/* Main Inner Container */}
      <div className="relative p-6 sm:p-8 flex flex-col justify-between h-full" style={{ minHeight: `${calculatedHeight}px` }}>
        
        {/* 1. Auspicious Envelope Header */}
        <div className="flex items-center justify-between border-b pb-3 mb-3" style={{ borderColor: `${inkColor}40` }}>
          {/* Top-Left: Divine 3D Ganesha or Custom Deity Badge (Motif Plate) */}
          {data.envelopeShowGanesha !== false && (
            <div className="dtp-plate-motif flex-shrink-0">
              <GaneshaColorBadge
                isScreenPrint={isScreenPrint}
                customImage={data.customDeityImage}
                alt={data.envelopeTopInvocation || "इष्टदेवता / कुलदेवी"}
              />
            </div>
          )}

          {/* Top-Center: Invocations & Grand Title (Text Plate) */}
          <div className="dtp-plate-text flex-1 text-center px-4">
            <div className="text-xs sm:text-sm font-black tracking-widest mb-0.5">
              {data.envelopeTopInvocation || '॥ श्री गणेशाय नमः ॥'}
            </div>

            <div
              className="text-2xl sm:text-3xl font-black tracking-wider leading-tight drop-shadow-sm"
              style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
            >
              {data.envelopeTitle || 'शुभ विवाह'}
            </div>

            {/* Floral Embellishment */}
            <div className="flex items-center justify-center gap-2 mt-0.5 opacity-90">
              <span className="h-[1.5px] w-12 bg-current" />
              <span className="text-xs">卐</span>
              <span className="text-xs font-semibold tracking-wide">
                {data.envelopeSubTitle || 'मांगलिक निमंत्रण पत्र'}
              </span>
              <span className="text-xs">卐</span>
              <span className="h-[1.5px] w-12 bg-current" />
            </div>
          </div>

          {/* Top-Right: 3D Royal Shubh Vivah Postal Seal / Ornament (Motif Plate) */}
          <div className="dtp-plate-motif flex-shrink-0 flex items-center justify-center">
            {data.envelopeShowSwastik !== false ? (
              <div
                className="select-none relative flex items-center justify-center transition-transform duration-200 hover:scale-105 flex-shrink-0"
                style={{
                  width: '62px',
                  height: '82px'
                }}
              >
                <img
                  src={shubhVivahSealHd}
                  alt="शुभ विवाह डाक सील"
                  className="w-full h-full object-contain pointer-events-none select-none"
                  style={{
                    filter: isScreenPrint
                      ? 'grayscale(100%) contrast(250%) brightness(0%)'
                      : 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.22))'
                  }}
                />
              </div>
            ) : (
              <ShehnaiKalash />
            )}
          </div>
        </div>

        {/* 2. Main Middle Section: Sender (Left) & Recipient (Right) */}
        <div className="grid grid-cols-12 gap-6 my-auto py-2">
          
          {/* Left Side: प्रेषक (Sender Details - 48% width) */}
          <div
            className="col-span-6 p-4 rounded-lg text-left relative flex flex-col justify-between"
            style={{
              backgroundColor: `${inkColor}06`,
              borderLeft: `3px solid ${inkColor}`
            }}
          >
            <div>
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="text-xs font-extrabold tracking-wider underline underline-offset-2">
                  {data.envelopeSenderTitle || 'प्रेषक :-'}
                </span>
                <span className="text-[10px] font-bold">❧</span>
              </div>

              {/* Sender Name */}
              <div
                className="text-base sm:text-lg font-black tracking-wide mb-1 leading-snug"
                style={{ fontFamily: `'${headingFont}', 'Rozha One', serif` }}
              >
                {data.envelopeSenderName || 'मन्नु पासवान एवं समस्त परिवार'}
              </div>

              {/* Sender Address */}
              <div className="text-xs sm:text-[12.5px] font-semibold opacity-95 leading-relaxed">
                {data.envelopeSenderAddress || 'ग्राम+पो०- चेरों, थाना-सरमेरा ( नालन्दा )'}
              </div>

              {/* Mobile Number */}
              {data.envelopeSenderMobile && (
                <div className="text-xs font-bold mt-1 tracking-tight">
                  {data.envelopeSenderMobile.startsWith('मो') ? data.envelopeSenderMobile : `मो० - ${data.envelopeSenderMobile}`}
                </div>
              )}

              {/* Venue & Location QR on Envelope */}
              {data.showVenueOnEnvelope !== false && data.showVenueQr !== false && data.venueMapsUrl && (
                <div
                  className="mt-2.5 pt-2 border-t flex items-center gap-2.5 bg-white/60 p-1.5 rounded border shadow-2xs"
                  style={{ borderColor: `${inkColor}30` }}
                >
                  <div className="flex-shrink-0">
                    <VenueQrCode
                      url={data.venueMapsUrl}
                      size={data.envelopeQrSize || 46}
                      inkColor={inkColor}
                      colorMode={data.qrColorMode || 'theme'}
                      centerIcon={data.qrCenterIcon || 'pin'}
                      label=""
                      showLabel={false}
                      showBorder={true}
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-left" style={{ color: inkColor }}>
                    <div className="text-[10.5px] font-black flex items-center gap-0.5 tracking-tight">
                      <span>📍 {data.venueTitle || 'विवाह स्थल'} :-</span>
                    </div>
                    <div className="text-[10px] font-black truncate">{data.venueName}</div>
                    {data.venueAddress && (
                      <div className="text-[9px] font-medium opacity-85 truncate mt-0.5">
                        {data.venueAddress}
                      </div>
                    )}
                    <div className="text-[8.5px] font-bold mt-0.5 text-red-700 tracking-tight">
                      (स्कैन कर गूगल मैप्स पर रास्ता देखें)
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Auspicious Note at bottom of sender box */}
            {data.envelopeNote && (
              <div className="text-[11px] font-medium italic mt-2.5 pt-1.5 border-t opacity-90 leading-tight" style={{ borderColor: `${inkColor}30` }}>
                {data.envelopeNote}
              </div>
            )}
          </div>


          {/* Right Side: प्रति / सेवा में (Recipient Section - 52% width) */}
          <div
            className="col-span-6 p-4 rounded-lg text-left relative flex flex-col justify-between"
            style={{
              backgroundColor: '#ffffff80',
              borderRight: `3px solid ${inkColor}`
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold tracking-wider underline underline-offset-2">
                  {data.envelopeRecipientTitle || 'प्रति / सेवा में :-'}
                </span>
                <span className="text-xs font-bold select-none">ॐ</span>
              </div>

              {/* Recipient Lines: Dynamic Personalized Guest or Traditional Blank Guides */}
              {(() => {
                const activeGuest = data.activeGuestId && data.guestList
                  ? data.guestList.find((g) => g.id === data.activeGuestId)
                  : null;

                const line1 = activeGuest ? activeGuest.name : (data.envelopeRecipientLine1 || 'श्रीमान ................................................................');
                const line2 = activeGuest ? (activeGuest.relation || 'सपरिवार सादर आमंत्रण') : (data.envelopeRecipientLine2 || 'सपरिवार / सादर आमंत्रण');
                const line3 = activeGuest ? (activeGuest.city ? `स्थान :- ${activeGuest.city}` : '') : (data.envelopeRecipientAddress || 'स्थान ................................................................');

                return (
                  <div className="space-y-3 pt-1">
                    <div>
                      <div
                        data-recipient-name="true"
                        className="text-base sm:text-lg font-black tracking-wide leading-none pb-1"
                        style={{ fontFamily: activeGuest ? `'${headingFont}', 'Rozha One', serif` : undefined }}
                      >
                        {line1}
                      </div>
                      <div className="h-[1px] w-full border-b border-dotted" style={{ borderColor: `${inkColor}70` }} />
                    </div>

                    <div>
                      <div className="text-xs sm:text-[13.5px] font-bold tracking-wide leading-none pb-1 flex items-center justify-between">
                        <span data-recipient-relation="true">{line2}</span>
                        {activeGuest && (
                          <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded font-semibold no-print">
                            वैयक्तिक आमंत्रण
                          </span>
                        )}
                      </div>
                      <div className="h-[1px] w-full border-b border-dotted" style={{ borderColor: `${inkColor}70` }} />
                    </div>

                    {line3 && (
                      <div>
                        <div
                          data-recipient-city="true"
                          className="text-xs sm:text-[13px] font-semibold opacity-90 leading-none pb-1"
                        >
                          {line3}
                        </div>
                        <div className="h-[1px] w-full border-b border-dotted" style={{ borderColor: `${inkColor}70` }} />
                      </div>
                    )}

                  </div>
                );
              })()}
            </div>

            {/* Bottom Invitation Badge & Baal Manuhar on Envelope */}
            <div className="flex items-center justify-between text-[11px] font-bold mt-3 pt-2 border-t opacity-90" style={{ borderColor: `${inkColor}30` }}>
              {data.showBaalManuharOnEnvelope !== false && data.baalManuharKids && (
                <div className="flex items-center gap-1 text-[10px] font-extrabold tracking-tight">
                  <span className="select-none">👦</span>
                  <span className="italic font-bold">"शादी में 'जलूल-जलूल' आना"</span>
                  <span className="text-[9px] font-semibold opacity-85">— {data.baalManuharKids.split('एवं')[0].trim()}</span>
                </div>
              )}
              <span className="ml-auto text-[10.5px]">॥ दर्शनाभिलाषी : समस्त स्नेही स्वजन ॥</span>
            </div>


          </div>
        </div>

        {/* 3. Footer Printing Press Line */}
        <div className="flex items-center justify-between pt-2 border-t text-[10px] sm:text-[10.5px] font-medium opacity-80" style={{ borderColor: `${inkColor}30` }}>
          <span>卐 शुभ विवाह 卐</span>
          <span className="tracking-tight">{data.pressLine || 'पवन प्रिंटिंग प्रेस, 7739553339'}</span>
          <span>卐 मंगल परिणय 卐</span>
        </div>

        {/* Pre-Press Draft Proof Watermark & Disclaimer Overlay */}
        <DraftProofOverlay data={data} isEnvelope={true} />
      </div>
    </div>
    </ScreenPrintMasterWrapper>
  );
});

WeddingEnvelope.displayName = 'WeddingEnvelope';

export default WeddingEnvelope;
