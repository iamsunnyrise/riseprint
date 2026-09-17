import React, { forwardRef } from 'react';
import CardHeader from './CardHeader';
import EventScheduleBox from './EventScheduleBox';
import InvitationBody from './InvitationBody';
import CardFooter from './CardFooter';
import { OuterCardBorder } from '../Motifs/TraditionalBorders';
import ScreenPrintMasterWrapper from './ScreenPrintMasterWrapper';
import CardBackgroundWatermark from '../Motifs/CardBackgroundWatermark';
import DraftProofOverlay from '../Controls/DraftProofOverlay';
import StarburstBadge from '../Motifs/StarburstBadge';
import BaalManuharBadge from '../Motifs/BaalManuharBadge';
import GaneshaColorBadge from '../Motifs/GaneshaColorBadge';
import GaneshaLineArt from '../Motifs/GaneshaLineArt';
import { QRCodeSVG } from 'qrcode.react';
import { CARD_SIZES } from '../../utils/defaultData';
import { getPaperTextureStyle, getPaperVignetteStyle } from '../../utils/paperTextures';
import { Scissors } from 'lucide-react';

const WeddingCard = forwardRef(({ data, scale = 1 }, ref) => {
  const isScreenPrint = Boolean(data?.screenPrintMode);
  const foldType = data?.cardFoldType || 'single';
  const showCreases = data?.showFoldCreaseGuides !== false;

  // Resolve current size
  const currentSize = CARD_SIZES[data.sizeKey] || {
    widthInches: (data.customWidthMm || 178) / 25.4,
    heightInches: (data.customHeightMm || 228) / 25.4,
    widthMm: data.customWidthMm || 178,
    heightMm: data.customHeightMm || 228
  };

  const widthInches = currentSize.widthInches || 7;
  const heightInches = currentSize.heightInches || 9;

  // Determine base rendering width based on fold type
  let baseWidth = 650;
  if (foldType === 'bi-fold') {
    baseWidth = 960;
  } else if (foldType === 'tri-fold') {
    baseWidth = 1140;
  }

  // Calculate proportional height based on dimensions
  const calculatedHeight = Math.max(500, (baseWidth * heightInches) / widthInches);

  const effectiveData = isScreenPrint
    ? {
        ...data,
        inkColor: '#000000',
        paperColor: '#ffffff',
        borderColor: '#000000'
      }
    : data;

  const paperTextureStyle = getPaperTextureStyle(
    data?.paperTexture || 'smooth-matte',
    isScreenPrint,
    data?.paperColor
  );

  const paperVignetteStyle = getPaperVignetteStyle(
    data?.paperTexture || 'smooth-matte',
    isScreenPrint
  );

  return (
    <ScreenPrintMasterWrapper data={data} type="card">
      <div
        ref={ref}
        id="wedding-card-element"
        className={`wedding-card-print-target relative transition-all duration-200 select-none overflow-hidden mx-auto bg-cover ${
          isScreenPrint ? 'screen-print-active border border-black' : ''
        } ${
          isScreenPrint && data.screenPrintMotifStyle === 'silhouette'
            ? 'screen-print-motif-silhouette'
            : ''
        } ${
          isScreenPrint && data.screenPrintMotifStyle === 'lineart'
            ? 'screen-print-motif-lineart'
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
          color: isScreenPrint ? '#000000' : (data.inkColor || '#a61515'),
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
            className="absolute inset-0 pointer-events-none z-0 transition-all duration-300"
            style={paperVignetteStyle}
          />
        )}

        {/* Auspicious Central Background Watermark */}
        <CardBackgroundWatermark data={effectiveData} isScreenPrint={isScreenPrint} />

        {/* LAYOUT OPTION 1: STANDARD SINGLE LEAF (1-पल्ला) */}
        {foldType === 'single' && (
          <OuterCardBorder
            color={effectiveData.inkColor}
            goldColor={isScreenPrint ? '#000000' : '#cda339'}
          >
            {/* 1. Header Section */}
            <CardHeader data={effectiveData} />

            {/* 2. Program Box (वैवाहिक कार्यक्रम with Banana Trees) */}
            <EventScheduleBox data={effectiveData} />

            {/* 3. Invitation Body (Groom, Bride, Sang, Mandap, Starburst) */}
            <InvitationBody data={effectiveData} />

            {/* 4. Footer Section (Family & Press) */}
            <CardFooter data={effectiveData} />
          </OuterCardBorder>
        )}

        {/* LAYOUT OPTION 2: 2-FOLD BOOK STYLE (2-पल्ला खुली किताब) */}
        {foldType === 'bi-fold' && (
          <div className="relative flex flex-row w-full h-full min-h-[inherit]">
            {/* Center Folding Crease Guideline */}
            {showCreases && (
              <div className="absolute top-0 bottom-0 left-1/2 -ml-[1px] w-[2px] z-30 pointer-events-none flex flex-col items-center justify-between py-2">
                <span className="bg-stone-800/80 text-amber-200 text-[8.5px] px-1 py-0.2 rounded font-mono shadow-xs border border-amber-500/40">
                  ✂️ मोड़ क्रीज (Center Fold)
                </span>
                <div className="w-full h-full border-l-2 border-dashed border-stone-400/80 my-1" />
                <span className="bg-stone-800/80 text-amber-200 text-[8.5px] px-1 py-0.2 rounded font-mono shadow-xs border border-amber-500/40">
                  50% केंद्र
                </span>
              </div>
            )}

            {/* Left Panel: Program, Schedule & Venue (बायां पल्ला) */}
            <div className="w-1/2 p-2 relative flex flex-col justify-between">
              <OuterCardBorder
                color={effectiveData.inkColor}
                goldColor={isScreenPrint ? '#000000' : '#cda339'}
              >
                {/* Panel Header */}
                <div className="text-center pt-2 pb-1 border-b border-amber-700/30">
                  <div className="dtp-plate-motif flex justify-center mb-1">
                    {isScreenPrint ? (
                      <GaneshaLineArt className="w-12 h-12" color="#000000" />
                    ) : (
                      <GaneshaColorBadge className="w-14 h-14" />
                    )}
                  </div>
                  <div className="dtp-plate-text font-bold text-sm tracking-wide">
                    {effectiveData.invitationInvocation || '॥ श्री गणेशाय नमः ॥'}
                  </div>
                  <p className="dtp-plate-text text-[11px] italic text-stone-700 mt-0.5 px-2">
                    {effectiveData.ganeshaVandana || 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥'}
                  </p>
                </div>

                {/* Auspicious Marriage Muhurta / Lagna Box */}
                <div className="dtp-plate-text my-2 bg-amber-500/10 border border-amber-600/30 rounded p-2 text-center">
                  <div className="text-[11px] font-bold text-red-900 mb-0.5">
                    🌺 शुभ विवाह लग्न वेला 🌺
                  </div>
                  <div className="font-bold text-xs">
                    {effectiveData.weddingDateFormatted || 'शुक्रवार, 24 अप्रैल 2026'}
                  </div>
                  <div className="text-[10.5px] text-stone-700 mt-0.5">
                    {effectiveData.auspiciousLagnaText || 'शुभ लग्न वेला: रात्रि 08:15 बजे'}
                  </div>
                </div>

                {/* Program Events Schedule */}
                <div className="flex-1 my-1">
                  <EventScheduleBox data={effectiveData} />
                </div>

                {/* Venue Details & QR */}
                {effectiveData.showVenueDetails && (
                  <div className="mt-2 pt-2 border-t border-amber-700/30 text-center">
                    <div className="dtp-plate-text font-bold text-xs text-red-950">
                      📍 {effectiveData.venueTitle || 'विवाह स्थल'}: {effectiveData.venueName}
                    </div>
                    <div className="dtp-plate-text text-[10.5px] text-stone-700 mt-0.5">
                      {effectiveData.venueAddress}
                    </div>

                    {effectiveData.showVenueQr && effectiveData.venueMapsUrl && (
                      <div className="dtp-plate-motif mt-2 flex items-center justify-center gap-2">
                        <div className="p-1 bg-white border border-stone-300 rounded shadow-xs">
                          <QRCodeSVG
                            value={effectiveData.venueMapsUrl}
                            size={52}
                            level="M"
                            fgColor={isScreenPrint ? '#000000' : effectiveData.inkColor}
                          />
                        </div>
                        <span className="text-[9.5px] font-bold text-stone-600">
                          {effectiveData.qrLabel || 'मानचित्र हेतु स्कैन करें'}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </OuterCardBorder>
            </div>

            {/* Right Panel: Invitation Body, Groom-Bride & Family (दायां पल्ला) */}
            <div className="w-1/2 p-2 relative flex flex-col justify-between">
              <OuterCardBorder
                color={effectiveData.inkColor}
                goldColor={isScreenPrint ? '#000000' : '#cda339'}
              >
                {/* Top Badge */}
                <div className="dtp-plate-motif flex justify-center pt-2">
                  <StarburstBadge text="शुभ विवाह" color={effectiveData.inkColor} />
                </div>

                {/* Main Invitation Content */}
                <div className="flex-1 my-1">
                  <InvitationBody data={effectiveData} />
                </div>

                {/* Family, Baal Manuhar & Press Footer */}
                <div className="mt-1">
                  <CardFooter data={effectiveData} />
                </div>
              </OuterCardBorder>
            </div>
          </div>
        )}

        {/* LAYOUT OPTION 3: 3-FOLD GATEFOLD (3-पल्ला गेटफोल्ड) */}
        {foldType === 'tri-fold' && (
          <div className="relative flex flex-row w-full h-full min-h-[inherit]">
            {/* Crease Line 1 (Between Panel 1 & 2) */}
            {showCreases && (
              <div className="absolute top-0 bottom-0 left-[33.33%] -ml-[1px] w-[2px] z-30 pointer-events-none flex flex-col items-center justify-between py-2">
                <span className="bg-stone-800/80 text-amber-200 text-[8px] px-1 py-0.2 rounded font-mono shadow-xs border border-amber-500/40">
                  ✂️ मोड़ 1
                </span>
                <div className="w-full h-full border-l-2 border-dashed border-stone-400/80 my-1" />
                <span className="bg-stone-800/80 text-amber-200 text-[8px] px-1 py-0.2 rounded font-mono shadow-xs border border-amber-500/40">
                  33.3%
                </span>
              </div>
            )}

            {/* Crease Line 2 (Between Panel 2 & 3) */}
            {showCreases && (
              <div className="absolute top-0 bottom-0 left-[66.66%] -ml-[1px] w-[2px] z-30 pointer-events-none flex flex-col items-center justify-between py-2">
                <span className="bg-stone-800/80 text-amber-200 text-[8px] px-1 py-0.2 rounded font-mono shadow-xs border border-amber-500/40">
                  ✂️ मोड़ 2
                </span>
                <div className="w-full h-full border-l-2 border-dashed border-stone-400/80 my-1" />
                <span className="bg-stone-800/80 text-amber-200 text-[8px] px-1 py-0.2 rounded font-mono shadow-xs border border-amber-500/40">
                  66.6%
                </span>
              </div>
            )}

            {/* Panel 1 (Left Flap): Ganesha, Shlokas, Muhurta & Introductions */}
            <div className="w-[33.33%] p-2 relative flex flex-col justify-between">
              <OuterCardBorder
                color={effectiveData.inkColor}
                goldColor={isScreenPrint ? '#000000' : '#cda339'}
              >
                <div className="text-center pt-2 pb-1 border-b border-amber-700/30">
                  <div className="dtp-plate-motif flex justify-center mb-1">
                    {isScreenPrint ? (
                      <GaneshaLineArt className="w-12 h-12" color="#000000" />
                    ) : (
                      <GaneshaColorBadge className="w-14 h-14" />
                    )}
                  </div>
                  <div className="dtp-plate-text font-bold text-xs tracking-wide">
                    {effectiveData.invitationInvocation || '॥ श्री गणेशाय नमः ॥'}
                  </div>
                  <div className="dtp-plate-text text-[10px] font-semibold text-amber-800 mt-0.5">
                    ॥ श्री कुलदेवतायै नमः ॥
                  </div>
                </div>

                {/* Shlokas */}
                <div className="dtp-plate-text text-center py-2 px-1 text-[10.5px] italic text-stone-700 space-y-1.5">
                  <p>{effectiveData.ganeshaVandana || 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥'}</p>
                  <p className="border-t border-amber-700/20 pt-1">
                    {effectiveData.manglikShloka || 'मंगलम् भगवान विष्णुः मंगलम् गरुड़ध्वजः।\nमंगलम् पुण्डरीकाक्षो मंगलायतनो हरिः॥'}
                  </p>
                </div>

                {/* Auspicious Muhurta Box */}
                <div className="dtp-plate-text my-2 bg-amber-500/10 border border-amber-600/30 rounded p-2 text-center">
                  <div className="text-[10.5px] font-bold text-red-950 mb-0.5">
                    🌺 शुभ विवाह लग्न वेला 🌺
                  </div>
                  <div className="font-bold text-xs">
                    {effectiveData.weddingDateFormatted || 'शुक्रवार, 24 अप्रैल 2026'}
                  </div>
                  <div className="text-[10px] text-stone-700 mt-0.5">
                    {effectiveData.auspiciousLagnaText || 'शुभ लग्न वेला: रात्रि 08:15 बजे'}
                  </div>
                </div>

                {/* Auspicious Welcome Shayari */}
                {effectiveData.showWelcomeShayari && (
                  <div className="dtp-plate-text text-center text-[10px] italic text-stone-600 bg-stone-50 border border-stone-200 rounded p-1.5 mt-auto">
                    {effectiveData.welcomeShayariText || 'सनेह भरा निमंत्रण है, भूल न जाना आने को।'}
                  </div>
                )}
              </OuterCardBorder>
            </div>

            {/* Panel 2 (Center Main): Prime Invitation, Groom & Bride Grand Display */}
            <div className="w-[33.34%] p-2 relative flex flex-col justify-between">
              <OuterCardBorder
                color={effectiveData.inkColor}
                goldColor={isScreenPrint ? '#000000' : '#cda339'}
              >
                {/* Top Badge */}
                <div className="dtp-plate-motif flex justify-center pt-2">
                  <StarburstBadge text="शुभ विवाह" color={effectiveData.inkColor} />
                </div>

                {/* Main Invitation Content */}
                <div className="flex-1 my-1">
                  <InvitationBody data={effectiveData} />
                </div>

                {/* Vineet & Family Introduction */}
                <div className="dtp-plate-text text-center pt-2 border-t border-amber-700/30 text-[11px]">
                  <div className="font-bold text-red-950">विनीत:</div>
                  <div className="font-medium text-stone-800 whitespace-pre-line">
                    {effectiveData.vineetNames || effectiveData.fatherName}
                  </div>
                </div>
              </OuterCardBorder>
            </div>

            {/* Panel 3 (Right Flap): Program Schedule, Venue, Family & Press */}
            <div className="w-[33.33%] p-2 relative flex flex-col justify-between">
              <OuterCardBorder
                color={effectiveData.inkColor}
                goldColor={isScreenPrint ? '#000000' : '#cda339'}
              >
                {/* Header */}
                <div className="dtp-plate-text text-center pt-2 pb-1 border-b border-amber-700/30 font-bold text-xs text-red-950">
                  📅 वैवाहिक कार्यक्रम तालिका
                </div>

                {/* Program Events Schedule */}
                <div className="flex-1 my-1">
                  <EventScheduleBox data={effectiveData} />
                </div>

                {/* Venue Details */}
                {effectiveData.showVenueDetails && (
                  <div className="my-1.5 p-1.5 bg-amber-500/10 border border-amber-600/30 rounded text-center">
                    <div className="dtp-plate-text font-bold text-[11px] text-red-950">
                      📍 {effectiveData.venueTitle || 'विवाह स्थल'}: {effectiveData.venueName}
                    </div>
                    <div className="dtp-plate-text text-[10px] text-stone-700 mt-0.5 truncate">
                      {effectiveData.venueAddress}
                    </div>

                    {effectiveData.showVenueQr && effectiveData.venueMapsUrl && (
                      <div className="dtp-plate-motif mt-1.5 flex items-center justify-center gap-2">
                        <div className="p-0.5 bg-white border border-stone-300 rounded shadow-2xs">
                          <QRCodeSVG
                            value={effectiveData.venueMapsUrl}
                            size={44}
                            level="M"
                            fgColor={isScreenPrint ? '#000000' : effectiveData.inkColor}
                          />
                        </div>
                        <span className="text-[9px] font-bold text-stone-600">
                          {effectiveData.qrLabel || 'मानचित्र'}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Darshanabhilashi & Baal Manuhar */}
                <div className="mt-auto">
                  <CardFooter data={effectiveData} />
                </div>
              </OuterCardBorder>
            </div>
          </div>
        )}

        {/* 5. Pre-Press Draft Proof Watermark & Disclaimer Overlay */}
        <DraftProofOverlay data={effectiveData} />
      </div>
    </ScreenPrintMasterWrapper>
  );
});

WeddingCard.displayName = 'WeddingCard';

export default WeddingCard;
