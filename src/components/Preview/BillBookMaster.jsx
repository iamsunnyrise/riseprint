import React, { forwardRef } from 'react';
import ScreenPrintMasterWrapper from './ScreenPrintMasterWrapper';
import { CARD_SIZES, PAPER_TINTS } from '../../utils/defaultData';
import SchoolFeeReceiptView from './SchoolFeeReceiptView';

const BillBookMaster = forwardRef(({ data, scale = 1 }, ref) => {
  const isScreenPrint = Boolean(data?.screenPrintMode);
  const isSchoolFee = (data?.billTemplate || 'school-fee') === 'school-fee';

  const currentSize = CARD_SIZES[data?.sizeKey] || CARD_SIZES['7x9'];
  const widthInches = currentSize.widthInches || 7;
  const heightInches = currentSize.heightInches || 9;

  const baseWidth = isSchoolFee ? 580 : 650;
  const calculatedHeight = Math.max(isSchoolFee ? 760 : 560, (baseWidth * heightInches) / widthInches);

  const selectedTint = PAPER_TINTS.find(t => t.id === (data?.billPaperTint || 'pink')) || PAPER_TINTS[0];
  const paperColor = isScreenPrint ? '#ffffff' : (isSchoolFee ? selectedTint.color : (data?.paperColor || '#fcfbf7'));
  const inkColor = isScreenPrint ? '#000000' : (data?.billInkColor || (isSchoolFee ? selectedTint.ink : '#0d47a1'));

  const rowsCount = data?.billRowsCount || 8;
  const emptyRows = Array.from({ length: rowsCount });

  const billTypeLabels = {
    'cash-memo': 'कैश मेमो (CASH MEMO)',
    'bill-book': 'बिल बुक (INVOICE / BILL)',
    'challan': 'डिलिवरी चालान (DELIVERY CHALLAN)',
    'estimate': 'कच्चा एस्टीमेट (ESTIMATE)'
  };

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
          padding: isSchoolFee ? '16px' : '24px'
        }}
      >
        {isSchoolFee ? (
          <SchoolFeeReceiptView data={data} isScreenPrint={isScreenPrint} />
        ) : (
          /* Border Frame for Retail Cash Memo */
          <div
            className="w-full h-full p-4 flex flex-col justify-between border-2 rounded-sm"
            style={{ borderColor: inkColor }}
          >
          {/* 1. Header: GSTIN, Invocation, Contact */}
          <div>
            <div className="flex justify-between items-center text-[10.5px] font-bold border-b pb-1" style={{ borderColor: inkColor }}>
              <div>
                {data?.billGstNumber ? (
                  <span>GSTIN: <span className="font-mono">{data.billGstNumber}</span></span>
                ) : (
                  <span>॥ श्री गणेशाय नमः ॥</span>
                )}
              </div>
              <div className="text-center font-bold tracking-wider">
                ॥ श्री श्याम शरणं ममः ॥
              </div>
              <div className="text-right font-mono">
                मो० {data?.billPhone1 || '9876543210'}{data?.billPhone2 ? `, ${data.billPhone2}` : ''}
              </div>
            </div>

            {/* Firm Name & Business Description */}
            <div className="text-center my-2">
              <h1
                className="text-2xl md:text-3xl font-black tracking-wide"
                style={{ fontFamily: data?.headingFont || 'Rozha One', color: inkColor }}
              >
                {data?.billFirmName || 'श्री श्याम गारमेंट्स & साड़ी केंद्र'}
              </h1>
              <div className="text-xs font-semibold mt-0.5" style={{ color: inkColor }}>
                {data?.billTagline || 'फैंसी साड़ियाँ, सूट, लहंगा एवं कटपीस के थोक व फुटकर विक्रेता'}
              </div>
              <div className="text-[11px] mt-1 text-stone-700 font-medium">
                {data?.billAddress || 'मेन मार्केट, निकट महावीर मंदिर, बिहार शरीफ (नालन्दा)'}
              </div>
              {data?.billProprietor && (
                <div className="text-[10px] text-stone-600 font-bold mt-0.5">
                  प्रोपराइटर: {data.billProprietor}
                </div>
              )}
            </div>

            {/* Title Badge & Copy Type */}
            <div className="flex justify-between items-center my-2 border-y py-1 text-xs font-bold" style={{ borderColor: inkColor }}>
              <div className="bg-white px-2 py-0.5 border rounded" style={{ borderColor: inkColor }}>
                {billTypeLabels[data?.billType] || 'कैश मेमो (CASH MEMO)'}
              </div>
              <div className="text-[11px] tracking-wide" style={{ color: inkColor }}>
                [ {data?.billCopyType || 'मूल प्रति (Original)'} ]
              </div>
            </div>

            {/* Meta: Bill No, Date, Customer details */}
            <div className="text-xs space-y-1 my-2">
              <div className="flex justify-between items-center">
                <div className="font-bold flex items-center gap-1">
                  <span>क्रमांक / Bill No:</span>
                  <span className="font-mono underline font-black">{data?.billNoPrefix || 'No. 1042'}</span>
                </div>
                <div className="font-semibold">
                  {data?.billDateDefault || 'दिनांक: ........................ 202...'}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <span className="font-bold whitespace-nowrap">मेसर्स / श्री :</span>
                <span className="flex-1 border-b border-dotted" style={{ borderColor: inkColor }}>
                  {data?.billCustomerName?.replace('श्री / मेसर्स:', '') || ''}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="font-bold whitespace-nowrap">पता / Address :</span>
                <span className="flex-1 border-b border-dotted" style={{ borderColor: inkColor }}>
                  {data?.billCustomerAddress?.replace('पता:', '') || ''}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Items Table Grid */}
          <div className="my-2 border" style={{ borderColor: inkColor }}>
            {/* Table Header */}
            <div className="grid grid-cols-12 text-center text-xs font-black border-b" style={{ borderColor: inkColor, backgroundColor: isScreenPrint ? 'transparent' : '#f4f4f4' }}>
              <div className="col-span-1 border-r py-1" style={{ borderColor: inkColor }}>क्र०</div>
              <div className="col-span-6 border-r py-1" style={{ borderColor: inkColor }}>विवरण (Description)</div>
              <div className="col-span-1 border-r py-1" style={{ borderColor: inkColor }}>मात्रा</div>
              <div className="col-span-2 border-r py-1" style={{ borderColor: inkColor }}>दर (Rate ₹)</div>
              <div className="col-span-2 py-1">राशि (Amount ₹)</div>
            </div>

            {/* Empty Table Rows for Shopkeeper writing */}
            {emptyRows.map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-12 text-xs border-b last:border-none"
                style={{ borderColor: inkColor, minHeight: '26px' }}
              >
                <div className="col-span-1 border-r text-center py-1 text-[11px] text-stone-500 font-mono" style={{ borderColor: inkColor }}>
                  {i + 1}
                </div>
                <div className="col-span-6 border-r px-2 py-1" style={{ borderColor: inkColor }} />
                <div className="col-span-1 border-r" style={{ borderColor: inkColor }} />
                <div className="col-span-2 border-r" style={{ borderColor: inkColor }} />
                <div className="col-span-2" />
              </div>
            ))}

            {/* Total Row */}
            <div className="grid grid-cols-12 text-xs font-black border-t" style={{ borderColor: inkColor, backgroundColor: isScreenPrint ? 'transparent' : '#f9f9f9' }}>
              <div className="col-span-8 border-r py-1.5 px-2 text-right font-bold" style={{ borderColor: inkColor }}>
                कुल योग (Total ₹) :
              </div>
              <div className="col-span-2 border-r" style={{ borderColor: inkColor }} />
              <div className="col-span-2 py-1.5 text-center font-mono">₹</div>
            </div>
          </div>

          {/* 3. Footer: Amount in words, Terms & Signature */}
          <div>
            <div className="text-xs mb-2 flex items-center gap-1">
              <span className="font-bold whitespace-nowrap">रुपये शब्दों में :</span>
              <span className="flex-1 border-b border-dotted" style={{ borderColor: inkColor }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t" style={{ borderColor: inkColor }}>
              {/* Left: Terms */}
              <div className="text-[9.5px] leading-tight text-stone-700">
                <div className="font-bold underline mb-0.5" style={{ color: inkColor }}>नियम व शर्तें:</div>
                <div className="whitespace-pre-line font-medium opacity-90">
                  {data?.billTerms || '1. बिका हुआ माल 7 दिन के अंदर ही बदला जाएगा।\n2. माल डिलीवरी के बाद किसी क्षति की जिम्मेदारी हमारी नहीं होगी।\n3. सभी विवाद स्थानीय न्यायालय के क्षेत्राधिकार के अधीन।\n4. भूल-चूक लेनी-देनी (E. & O.E.)'}
                </div>
              </div>

              {/* Right: Signatures */}
              <div className="flex flex-col justify-between text-right text-xs">
                <div className="font-bold text-[10.5px]" style={{ color: inkColor }}>
                  {data?.billSignTitle || `For ${data?.billFirmName || 'श्री श्याम गारमेंट्स'}`}
                </div>
                <div className="mt-8 pt-1 border-t border-dotted inline-block ml-auto text-[10px] font-bold text-stone-600">
                  अधिकृत हस्ताक्षर (Authorized Signatory)
                </div>
              </div>
            </div>

            {/* Bottom Press Line */}
            <div className="text-center text-[8.5px] text-stone-400 mt-2 pt-1 border-t border-stone-200 flex justify-between">
              <span>{data?.pressLine || 'राइज प्रिंटर्स, 7739553339'}</span>
              <span>कंप्यूटर जनरेटेड / स्क्रीन प्रिंट मास्टर</span>
            </div>
          </div>
        </div>
      )}
    </div>
  </ScreenPrintMasterWrapper>
  );
});

export default BillBookMaster;
