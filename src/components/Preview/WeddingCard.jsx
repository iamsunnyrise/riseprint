import React, { forwardRef } from 'react';
import CardHeader from './CardHeader';
import EventScheduleBox from './EventScheduleBox';
import InvitationBody from './InvitationBody';
import CardFooter from './CardFooter';
import { OuterCardBorder } from '../Motifs/TraditionalBorders';
import ScreenPrintMasterWrapper from './ScreenPrintMasterWrapper';
import CardBackgroundWatermark from '../Motifs/CardBackgroundWatermark';
import { CARD_SIZES } from '../../utils/defaultData';
import { getPaperTextureStyle, getPaperVignetteStyle } from '../../utils/paperTextures';

const WeddingCard = forwardRef(({ data, scale = 1 }, ref) => {
  const isScreenPrint = Boolean(data?.screenPrintMode);
  const currentSize = CARD_SIZES[data.sizeKey] || CARD_SIZES['7x9'];
  
  // Calculate aspect ratio dimensions for crisp printing & display
  // Base width 650px (scaled by card aspect ratio)
  const baseWidth = 650;
  const heightInches = currentSize.heightInches;
  const widthInches = currentSize.widthInches;
  const calculatedHeight = (baseWidth * heightInches) / widthInches;

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

        {/* Auspicious Central Background Watermark (पावन पृष्ठभूमि वॉटरमार्क) */}
        <CardBackgroundWatermark data={effectiveData} isScreenPrint={isScreenPrint} />

        {/* Traditional Multi-line Press Border */}
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
      </div>
    </ScreenPrintMasterWrapper>
  );
});

WeddingCard.displayName = 'WeddingCard';

export default WeddingCard;

