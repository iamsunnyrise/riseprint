import React, { forwardRef } from 'react';
import ScreenPrintMasterWrapper from './ScreenPrintMasterWrapper';
import { CARD_SIZES } from '../../utils/defaultData';
import { OuterCardBorder } from '../Motifs/TraditionalBorders';

const SanskarCard = forwardRef(({ data, scale = 1 }, ref) => {
  const isScreenPrint = Boolean(data?.screenPrintMode);
  const currentSize = CARD_SIZES[data?.sizeKey] || CARD_SIZES['7x9'];
  const widthInches = currentSize.widthInches || 7;
  const heightInches = currentSize.heightInches || 9;

  const baseWidth = 650;
  const calculatedHeight = Math.max(540, (baseWidth * heightInches) / widthInches);

  const inkColor = isScreenPrint ? '#000000' : (data?.inkColor || '#a61515');
  const paperColor = isScreenPrint ? '#ffffff' : (data?.paperColor || '#fffef9');

  const sanskarTitleMap = {
    'mundan': 'शुभ मुंडन संस्कार निमंत्रण',
    'janeu': 'पवित्र यज्ञोपवीत (जनेऊ) संस्कार',
    'griha-pravesh': 'शुभ गृह प्रवेश एवं वास्तु शांति',
    'kuan-pujan': 'शुभ कुआं पूजन (जलवा) निमंत्रण',
    'birthday': 'शुभ जन्मोत्सव एवं वर्षगांठ'
  };

  const title = data?.sanskarHeading || sanskarTitleMap[data?.sanskarType] || 'मांगलिक संस्कार निमंत्रण';

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
          padding: '24px'
        }}
      >
        <OuterCardBorder color={inkColor} goldColor={isScreenPrint ? '#000000' : '#cda339'}>
          <div className="w-full h-full p-4 flex flex-col justify-between">
            
            {/* 1. Top Section: Invocation & Gayatri Mantra */}
            <div className="text-center pb-2 border-b border-stone-200">
              <div className="text-xs font-bold tracking-widest uppercase">
                {data?.sanskarInvocation || '॥ श्री गणेशाय नमः ॥'}
              </div>
              <div className="text-base font-bold mt-1 text-amber-700" style={{ color: isScreenPrint ? '#000000' : '#b45309' }}>
                🪔 卐 🪔
              </div>
              <p className="text-[11px] mt-1 font-semibold italic max-w-lg mx-auto opacity-90 leading-relaxed">
                {data?.sanskarMantra || '॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥'}
              </p>
            </div>

            {/* 2. Ceremony Banner */}
            <div className="my-3 text-center">
              <div
                className="inline-block px-5 py-1.5 rounded-full border-2 font-black text-xl md:text-2xl tracking-wide shadow-xs"
                style={{
                  borderColor: inkColor,
                  color: inkColor,
                  backgroundColor: isScreenPrint ? 'transparent' : '#fff8e7',
                  fontFamily: data?.headingFont || 'Rozha One'
                }}
              >
                {title}
              </div>

              {data?.sanskarHouseName && (
                <div className="text-xs font-bold text-stone-600 mt-1">
                  ( {data.sanskarHouseName} )
                </div>
              )}
            </div>

            {/* 3. Child or Host Central Details */}
            <div className="my-2 p-3 bg-amber-50/40 rounded-lg border border-amber-200/60 text-center">
              <div className="text-xs font-bold text-stone-700">
                {data?.sanskarGraceText || 'परमपिता परमेश्वर एवं कुलदेवी के असीम आशीर्वाद से हमारे सुपुत्र के मुंडन संस्कार के पावन अवसर पर,'}
              </div>

              <div className="my-2 flex items-center justify-center gap-2">
                <span className="text-lg font-bold" style={{ color: inkColor }}>
                  {data?.sanskarChildPrefix || 'चि०'}
                </span>
                <span
                  className="text-2xl md:text-3xl font-black tracking-wide"
                  style={{ fontFamily: data?.headingFont || 'Rozha One', color: inkColor }}
                >
                  {data?.sanskarChildName || 'आरव कुमार'}
                </span>
                <span className="text-xs font-bold text-stone-700">
                  ( {data?.sanskarChildRelation || 'प्रथम सुपुत्र'} )
                </span>
              </div>

              <div className="text-xs font-bold text-stone-800 space-y-0.5">
                <div>माता-पिता: {data?.sanskarParents || 'श्रीमती नीतू देवी एवं श्री अमित कुमार'}</div>
                {data?.sanskarGrandParents && (
                  <div className="text-stone-600 font-medium">दादा-दादी: {data.sanskarGrandParents}</div>
                )}
              </div>
            </div>

            {/* 4. Auspicious Program Schedule */}
            <div className="my-2 border border-stone-300 rounded overflow-hidden">
              <div
                className="py-1 px-3 text-center text-xs font-bold text-white tracking-wide"
                style={{ backgroundColor: inkColor }}
              >
                मांगलिक कार्यक्रम विवरण
              </div>
              <div className="p-3 bg-white space-y-2">
                {data?.sanskarEvents?.map((evt, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pb-1.5 border-b border-stone-100 last:border-none last:pb-0"
                  >
                    <span className="font-bold flex items-center gap-1.5" style={{ color: inkColor }}>
                      <span>🪔</span>
                      <span>{evt.event}</span>
                    </span>
                    <span className="text-stone-700 font-semibold flex items-center gap-2">
                      <span>{evt.date}</span>
                      {evt.day && <span className="text-stone-500">{evt.day}</span>}
                      {evt.time && <span className="text-amber-900 font-bold">({evt.time})</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Venue Address */}
            <div className="text-center py-2 px-3 border border-dashed border-stone-300 rounded bg-stone-50/80 my-1">
              <span className="text-xs font-bold" style={{ color: inkColor }}>
                📍 कार्यक्रम स्थल :{' '}
              </span>
              <span className="text-xs font-semibold text-stone-800">
                {data?.sanskarVenue || 'निज निवास, ग्राम चेरों, थाना- सरमेरा (नालन्दा)'}
              </span>
            </div>

            {/* 6. Family Footer */}
            <div className="mt-2 pt-2 border-t border-stone-300 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div>
                <div className="font-bold border-b pb-0.5 mb-1" style={{ color: inkColor }}>
                  दर्शनाभिलाषी
                </div>
                <div className="text-stone-700 font-medium whitespace-pre-line leading-tight">
                  {data?.sanskarDarshanabhilashi || 'समस्त परिवार व इष्ट-मित्र'}
                </div>
              </div>
              <div>
                <div className="font-bold border-b pb-0.5 mb-1" style={{ color: inkColor }}>
                  स्वागतोत्सुक
                </div>
                <div className="text-stone-700 font-medium whitespace-pre-line leading-tight">
                  {data?.sanskarSwagat || 'विकास, राहुल, सन्नी\nएवं समस्त मित्र मण्डली'}
                </div>
              </div>
              <div>
                <div className="font-bold border-b pb-0.5 mb-1" style={{ color: inkColor }}>
                  विनीत
                </div>
                <div className="text-stone-700 font-medium whitespace-pre-line leading-tight">
                  {data?.sanskarAakankshi || 'अमित कुमार एवं समस्त परिवार'}
                </div>
              </div>
            </div>

            {/* 7. Bottom Press Line */}
            <div className="text-center text-[9px] text-stone-400 mt-2 pt-1 border-t border-stone-200">
              {data?.pressLine || 'पवन प्रिंटिंग प्रेस, सरमेरा, नालन्दा, 7739553339'}
            </div>

          </div>
        </OuterCardBorder>
      </div>
    </ScreenPrintMasterWrapper>
  );
});

export default SanskarCard;
