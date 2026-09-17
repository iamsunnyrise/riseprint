import React, { forwardRef } from 'react';
import ScreenPrintMasterWrapper from './ScreenPrintMasterWrapper';
import { CARD_SIZES } from '../../utils/defaultData';

const ShokSandeshCard = forwardRef(({ data, scale = 1 }, ref) => {
  const isScreenPrint = Boolean(data?.screenPrintMode);
  const currentSize = CARD_SIZES[data?.sizeKey] || CARD_SIZES['7x9'];
  const widthInches = currentSize.widthInches || 7;
  const heightInches = currentSize.heightInches || 9;

  const baseWidth = 650;
  const calculatedHeight = Math.max(540, (baseWidth * heightInches) / widthInches);

  const inkColor = isScreenPrint ? '#000000' : (data?.inkColor || '#1f1f1f');
  const paperColor = isScreenPrint ? '#ffffff' : (data?.paperColor || '#fdfcfb');

  return (
    <ScreenPrintMasterWrapper data={data} type="card">
      <div
        ref={ref}
        id="wedding-card-element"
        className={`wedding-card-print-target relative transition-all duration-200 select-none overflow-hidden mx-auto bg-cover ${
          isScreenPrint ? 'screen-print-active border border-black' : ''
        }`}
        style={{
          width: `${baseWidth}px`,
          minHeight: `${calculatedHeight}px`,
          backgroundColor: paperColor,
          color: inkColor,
          fontFamily: data?.fontFamily || "'Noto Serif Devanagari', serif",
          boxShadow: isScreenPrint
            ? 'none'
            : '0 10px 30px -5px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.08)',
          transform: scale !== 1 ? `scale(${scale})` : undefined,
          transformOrigin: 'top center',
          padding: '28px'
        }}
      >
        {/* Double Classic Shradhanjali Ornamental Border */}
        <div
          className="w-full h-full p-6 flex flex-col justify-between relative border-4 border-double"
          style={{ borderColor: inkColor }}
        >
          {/* Corner Floral Ornaments */}
          <div className="absolute top-1.5 left-1.5 text-xs select-none opacity-80" style={{ color: inkColor }}>❖</div>
          <div className="absolute top-1.5 right-1.5 text-xs select-none opacity-80" style={{ color: inkColor }}>❖</div>
          <div className="absolute bottom-1.5 left-1.5 text-xs select-none opacity-80" style={{ color: inkColor }}>❖</div>
          <div className="absolute bottom-1.5 right-1.5 text-xs select-none opacity-80" style={{ color: inkColor }}>❖</div>

          {/* 1. Top Sacred Invocation */}
          <div className="text-center pt-2 pb-3">
            <div className="text-2xl font-bold tracking-wider" style={{ fontFamily: data?.headingFont || 'Rozha One' }}>
              {data?.shokInvocation || '॥ ॐ शांति ॥'}
            </div>
            <div className="text-xs mt-1 text-stone-600 font-semibold tracking-wide">
              {data?.shokSubHeading || 'अत्यंत दुःख के साथ सूचित करना पड़ रहा है कि हमारे पूज्य'}
            </div>
          </div>

          {/* 2. Photo of Deceased with Floral Garland Frame */}
          <div className="flex flex-col items-center my-2">
            <div
              className="relative w-28 h-36 border-2 border-dashed p-1 flex items-center justify-center bg-white shadow-xs rounded-sm"
              style={{ borderColor: inkColor }}
            >
              {data?.shokPhotoUrl ? (
                <img
                  src={data.shokPhotoUrl}
                  alt="दिवंगत पुण्यात्मा"
                  className="w-full h-full object-cover rounded-xs"
                />
              ) : (
                <div className="text-center p-2 text-stone-400">
                  <div className="text-3xl">🕊️</div>
                  <div className="text-[10px] mt-1 font-semibold leading-tight">दिवंगत की तस्वीर</div>
                </div>
              )}

              {/* Ornamental Garland Bottom Arch */}
              <div
                className="absolute -bottom-3 left-0 right-0 text-center text-[10px] font-bold px-1.5 py-0.5 bg-white border border-stone-400 rounded-full shadow-2xs"
                style={{ color: inkColor }}
              >
                श्रद्धांजलि
              </div>
            </div>

            {/* Deceased Details */}
            <div className="mt-4 text-center">
              <div className="text-xs font-bold tracking-wide" style={{ color: inkColor }}>
                {data?.shokPersonPrefix || 'स्वर्गवासी'}
              </div>
              <h2
                className="text-2xl md:text-3xl font-black mt-0.5 tracking-wide"
                style={{ fontFamily: data?.headingFont || 'Rozha One', color: inkColor }}
              >
                {data?.shokPersonName || 'श्री रामेश्वर दयाल शर्मा'}
              </h2>

              <div className="flex items-center justify-center gap-3 text-xs mt-1 font-bold text-stone-700">
                {data?.shokGotra && <span>गोत्र: {data.shokGotra}</span>}
                {data?.shokAge && <span>• आयु: {data.shokAge}</span>}
              </div>

              <div className="text-xs mt-1 text-stone-600 font-semibold">
                स्वर्गवास: {data?.shokDeathDate || 'दिनांक 12-10-2026'}
              </div>
            </div>
          </div>

          {/* 3. Description Note */}
          <div className="text-center text-xs px-6 py-2 leading-relaxed text-stone-800 font-medium">
            {data?.shokDescription ||
              'का आकस्मिक देवलोक गमन हो गया है। जिनकी आत्मा की शांति एवं मोक्ष प्राप्ति हेतु निम्नलिखित कार्यक्रम निर्धारित हैं:'}
          </div>

          {/* 4. Schedule of Rites (तीजा, उठावनी, तेरहवीं) */}
          <div className="my-2 border border-stone-300 rounded overflow-hidden">
            <div
              className="py-1 px-3 text-center text-xs font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: inkColor }}
            >
              कार्यक्रम तालिका (अंतिम संस्कार एवं शांति पाठ)
            </div>
            <div className="p-3 space-y-2.5 bg-stone-50/60">
              {data?.shokEvents?.map((evt, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pb-2 border-b border-stone-200/80 last:border-none last:pb-0"
                >
                  <div className="font-bold flex items-center gap-1.5" style={{ color: inkColor }}>
                    <span>❖</span>
                    <span>{evt.name}</span>
                  </div>
                  <div className="text-stone-700 font-semibold mt-0.5 sm:mt-0 flex items-center gap-2">
                    <span>{evt.date}</span>
                    {evt.time && <span className="text-stone-500">({evt.time})</span>}
                  </div>
                  {evt.location && (
                    <div className="text-[11px] text-stone-600 italic">स्थान: {evt.location}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 5. Mourning Family (शोकाकुल व विनीत) */}
          <div className="mt-3 pt-2 border-t border-stone-300 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Left: शोकाकुल */}
            <div>
              <div className="font-bold border-b border-stone-200 pb-0.5 mb-1" style={{ color: inkColor }}>
                शोकाकुल:
              </div>
              <div className="text-[11px] text-stone-800 leading-relaxed font-semibold whitespace-pre-line">
                {data?.shokFamilyGrieving || 'श्री राजेश शर्मा (पुत्र), रमेश शर्मा (पुत्र)\nएवं समस्त शोक संतप्त शर्मा परिवार।'}
              </div>
            </div>

            {/* Right: विनीत व प्रतिष्ठान */}
            <div>
              <div className="font-bold border-b border-stone-200 pb-0.5 mb-1" style={{ color: inkColor }}>
                विनीत एवं प्रतिष्ठान:
              </div>
              <div className="text-[11px] text-stone-800 leading-relaxed font-semibold">
                <div>{data?.shokFamilyVineet || 'समस्त भ्रातृगण एवं निकट सम्बन्धी'}</div>
                {data?.shokEstablishment && <div className="mt-1 font-bold">{data.shokEstablishment}</div>}
                {data?.shokContact && (
                  <div className="mt-1 text-[10.5px] text-stone-600">संपर्क: {data.shokContact}</div>
                )}
              </div>
            </div>
          </div>

          {/* 6. Press Line */}
          <div className="text-center text-[9.5px] text-stone-400 mt-3 pt-1 border-t border-stone-200">
            {data?.pressLine || 'राइज प्रिंटर्स एंड ग्राफिक्स, 7739553339'}
          </div>
        </div>
      </div>
    </ScreenPrintMasterWrapper>
  );
});

export default ShokSandeshCard;
