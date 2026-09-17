import React from 'react';
import { PAPER_TINTS } from '../../utils/defaultData';

/**
 * 🏫 School Fee Demand Bill & Receipt Master View
 * Faithfully reproduces the user's authentic printed sample:
 * "DEV INTERNATIONAL PUBLIC SCHOOL, Sarmera, Nalanda - Demand Bill"
 */
export default function SchoolFeeReceiptView({ data, isScreenPrint }) {
  const selectedTint = PAPER_TINTS.find(t => t.id === (data?.billPaperTint || 'pink')) || PAPER_TINTS[0];

  // Paper & Ink Colors:
  // When in Screen Print mode -> 100% Solid Black on Pure White (for butter paper)
  // When in Preview / Print mode -> Authentic Paper Tint (Pink, Yellow, Blue, etc.)
  const paperColor = isScreenPrint ? '#ffffff' : selectedTint.color;
  const inkColor = isScreenPrint ? '#000000' : (data?.billInkColor || selectedTint.ink || '#1a237e');
  const borderColor = isScreenPrint ? '#000000' : inkColor;

  const schoolName = data?.schoolName || 'DEV INTERNATIONAL PUBLIC SCHOOL';
  const recCode = data?.schoolRecCode || 'Rec. Code - 22913842023611104706';
  const billTitle = data?.schoolBillTitle || 'Demand Bill';
  const schoolPhone = data?.schoolPhone || 'Mob.: 8969997450, 9128350273\n9741111766';
  const schoolAddress = data?.schoolAddress || 'Dev Colony, SH-78, Sarmera, Nalanda 811104';

  const receiptNo = data?.schoolReceiptNo || '';
  const dateVal = data?.schoolDate || '2/2';
  const studentName = data?.schoolStudentName || 'Ragini';
  const admNo = data?.schoolAdmNo || 'T 1485';
  const studentClass = data?.schoolClass || 'II';
  const feeMonth = data?.schoolMonth || 'Feb + Dues';

  const feeItems = data?.schoolFeeItems || [
    { id: 1, name: 'Tuition Fee', amountRs: '2100', amountP: '0' },
    { id: 2, name: 'Examination Fee', amountRs: '', amountP: '' },
    { id: 3, name: 'Medical Fee', amountRs: '', amountP: '' },
    { id: 4, name: 'Maintenance', amountRs: '', amountP: '' },
    { id: 5, name: 'Library', amountRs: '', amountP: '' },
    { id: 6, name: 'Transport Fee', amountRs: '', amountP: '' },
    { id: 7, name: 'Dues', amountRs: '2100', amountP: '0' },
    { id: 8, name: 'Laboratory', amountRs: '', amountP: '' },
    { id: 9, name: 'Stationary', amountRs: '', amountP: '' },
    { id: 10, name: 'Identity Card', amountRs: '', amountP: '' },
    { id: 11, name: 'Computer', amountRs: '', amountP: '' },
    { id: 12, name: 'Excursion', amountRs: '', amountP: '' },
    { id: 13, name: 'Birthday Celebration', amountRs: '', amountP: '' },
    { id: 14, name: 'Games & Sports', amountRs: '', amountP: '' }
  ];

  const totalRs = data?.schoolTotalAmount || '4200';
  const totalP = data?.schoolTotalPaise || '0';
  const amountWords = data?.schoolAmountInWords || '';
  const isBlankMode = Boolean(data?.schoolBlankMode);

  return (
    <div
      className="w-full h-full p-3 sm:p-4 flex flex-col justify-between select-none relative font-serif"
      style={{ color: inkColor }}
    >
      {/* Outer Border (Authentic letterpress printed boundary) */}
      <div
        className="w-full h-full p-2.5 sm:p-3 flex flex-col justify-between border-[1.5px] rounded-xs"
        style={{ borderColor: borderColor }}
      >
        {/* ================= 1. HEADER SECTION ================= */}
        <div>
          {/* Top Line: Circular Logo, Rec Code, Demand Bill Box, Mobiles */}
          <div className="flex items-start justify-between gap-1.5 pb-1 border-b" style={{ borderColor: borderColor }}>
            {/* Circular School Logo */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <div
                className="w-12 h-12 rounded-full border-2 flex flex-col items-center justify-center p-0.5 relative overflow-hidden"
                style={{ borderColor: borderColor }}
              >
                {/* SVG School Emblem (Tree of Knowledge + Book) */}
                <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: inkColor }}>
                  <circle cx="50" cy="50" r="46" fill="none" stroke={inkColor} strokeWidth="3" strokeDasharray="3 2" />
                  <circle cx="50" cy="50" r="41" fill="none" stroke={inkColor} strokeWidth="1.5" />
                  {/* Tree Foliage */}
                  <path d="M50 16 C38 16 32 26 35 34 C28 38 28 50 36 54 C34 60 40 66 50 66 C60 66 66 60 64 54 C72 50 72 38 65 34 C68 26 62 16 50 16 Z" opacity="0.85" />
                  {/* Tree Trunk */}
                  <path d="M48 62 L48 76 L52 76 L52 62 Z" />
                  {/* Open Book at Base */}
                  <path d="M36 78 C42 76 48 78 50 80 C52 78 58 76 64 78 L64 84 C58 82 52 84 50 86 C48 84 42 82 36 84 Z" fill="none" stroke={inkColor} strokeWidth="2" />
                  {/* Circular Banner Text Arc */}
                  <path id="circleTextPath" d="M 18,50 A 32,32 0 1,1 82,50" fill="none" />
                </svg>
              </div>

              <div className="text-[9.5px] font-bold tracking-tight">
                <span>{recCode}</span>
              </div>
            </div>

            {/* Center: Demand Bill Pill / Box */}
            <div className="text-center pt-0.5">
              <div
                className="inline-block px-3 py-0.5 border text-xs font-black tracking-wide uppercase shadow-2xs"
                style={{ borderColor: borderColor, backgroundColor: isScreenPrint ? 'transparent' : 'rgba(255,255,255,0.7)' }}
              >
                <u>{billTitle}</u>
              </div>
            </div>

            {/* Right: Phone Numbers */}
            <div className="text-right text-[9px] sm:text-[9.5px] font-mono font-bold leading-tight flex-shrink-0">
              {schoolPhone.split('\n').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </div>
          </div>

          {/* School Name (Large, Bold, Serif, Letterpress Style) */}
          <div className="text-center mt-1.5 mb-1">
            <h1
              className="text-xl sm:text-2xl md:text-[25px] font-black uppercase tracking-wider leading-none"
              style={{
                fontFamily: "'Times New Roman', 'Noto Serif Devanagari', Georgia, serif",
                textShadow: isScreenPrint ? 'none' : '0.5px 0.5px 0px rgba(0,0,0,0.15)'
              }}
            >
              {schoolName}
            </h1>
          </div>

          {/* Solid Address Banner (Dark bar with reverse white text - Exact Photo Match!) */}
          <div
            className="w-full py-0.5 px-2 text-center rounded-xs mb-2"
            style={{
              backgroundColor: borderColor,
              color: '#ffffff'
            }}
          >
            <div className="text-[10px] sm:text-[11px] font-bold tracking-wide">
              {schoolAddress}
            </div>
          </div>

          {/* Student & Receipt Meta Grid with Dotted Lines */}
          <div className="text-[11px] sm:text-xs font-bold space-y-1.5 my-1.5 px-0.5">
            {/* Row 1: No. & Date */}
            <div className="flex items-end justify-between gap-4">
              <div className="flex items-end flex-1">
                <span className="whitespace-nowrap pr-1">No.-</span>
                <span className="flex-1 border-b border-dotted font-mono font-bold pl-1 min-h-[16px]" style={{ borderColor: borderColor }}>
                  {!isBlankMode ? receiptNo : ''}
                </span>
              </div>
              <div className="flex items-end w-36 sm:w-44">
                <span className="whitespace-nowrap pr-1">Date........</span>
                <span className="flex-1 border-b border-dotted font-mono font-black text-center min-h-[16px]" style={{ borderColor: borderColor }}>
                  {!isBlankMode ? dateVal : ''}
                </span>
              </div>
            </div>

            {/* Row 2: Name & Adm. No. */}
            <div className="flex items-end justify-between gap-4">
              <div className="flex items-end flex-1">
                <span className="whitespace-nowrap pr-1">Name................</span>
                <span
                  className="flex-1 border-b border-dotted font-black pl-1 min-h-[16px] text-sm sm:text-base italic"
                  style={{ borderColor: borderColor, fontFamily: "'Caveat', cursive, serif" }}
                >
                  {!isBlankMode ? studentName : ''}
                </span>
              </div>
              <div className="flex items-end w-44 sm:w-52">
                <span className="whitespace-nowrap pr-1">Adm. No.</span>
                <span className="flex-1 border-b border-dotted font-mono font-black text-center min-h-[16px]" style={{ borderColor: borderColor }}>
                  {!isBlankMode ? admNo : ''}
                </span>
              </div>
            </div>

            {/* Row 3: Class & Month */}
            <div className="flex items-end justify-between gap-4">
              <div className="flex items-end flex-1">
                <span className="whitespace-nowrap pr-1">Class................</span>
                <span
                  className="flex-1 border-b border-dotted font-black pl-1 min-h-[16px] text-sm sm:text-base italic"
                  style={{ borderColor: borderColor, fontFamily: "'Caveat', cursive, serif" }}
                >
                  {!isBlankMode ? studentClass : ''}
                </span>
              </div>
              <div className="flex items-end w-44 sm:w-52">
                <span className="whitespace-nowrap pr-1">Month........</span>
                <span
                  className="flex-1 border-b border-dotted font-black text-center min-h-[16px] text-xs sm:text-sm italic"
                  style={{ borderColor: borderColor, fontFamily: "'Caveat', cursive, serif" }}
                >
                  {!isBlankMode ? feeMonth : ''}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 2. FEE HEADS TABLE (4 COLUMNS) ================= */}
        <div className="my-1 border" style={{ borderColor: borderColor }}>
          {/* Table Header: Sl. No. | DESCRIPTION | Amount Rs. | P. */}
          <div
            className="grid grid-cols-12 text-[10.5px] sm:text-[11px] font-black border-b text-center tracking-tight"
            style={{ borderColor: borderColor, backgroundColor: isScreenPrint ? 'transparent' : 'rgba(0,0,0,0.03)' }}
          >
            <div className="col-span-1 border-r py-1" style={{ borderColor: borderColor }}>
              Sl.<br />No.
            </div>
            <div className="col-span-7 border-r py-1 uppercase tracking-wider flex items-center justify-center font-bold" style={{ borderColor: borderColor }}>
              DESCRIPTION
            </div>
            <div className="col-span-4 grid grid-cols-5">
              <div className="col-span-4 border-r py-1 font-bold" style={{ borderColor: borderColor }}>
                Amount<br />Rs.
              </div>
              <div className="col-span-1 py-1 font-bold">
                P.
              </div>
            </div>
          </div>

          {/* 14 Standard Fee Rows */}
          {feeItems.map((item, idx) => {
            const hasAmount = Boolean(item.amountRs);
            return (
              <div
                key={item.id || idx}
                className="grid grid-cols-12 text-[10.5px] sm:text-[11px] border-b last:border-b-0 leading-tight"
                style={{ borderColor: borderColor, minHeight: '21px' }}
              >
                {/* 1. Sl No */}
                <div
                  className="col-span-1 border-r text-center py-0.5 font-bold font-mono text-[10px]"
                  style={{ borderColor: borderColor }}
                >
                  {idx + 1}.
                </div>

                {/* 2. Description */}
                <div
                  className="col-span-7 border-r px-2 py-0.5 font-semibold flex items-center justify-between"
                  style={{ borderColor: borderColor }}
                >
                  <span>{item.name}</span>
                  {/* Subtle indication for handwritten month or note if any */}
                  {!isBlankMode && idx === 0 && item.amountRs && (
                    <span className="italic text-[10px] pr-2 opacity-80" style={{ fontFamily: "'Caveat', cursive" }}>
                      Feb
                    </span>
                  )}
                  {!isBlankMode && idx === 6 && item.amountRs && (
                    <span className="italic text-[10px] pr-2 opacity-80 font-mono">
                      —
                    </span>
                  )}
                </div>

                {/* 3 & 4. Amount Rs. & P. */}
                <div className="col-span-4 grid grid-cols-5 font-mono">
                  <div
                    className="col-span-4 border-r px-2 py-0.5 text-right font-black text-xs sm:text-[13px] flex items-center justify-end"
                    style={{ borderColor: borderColor, fontFamily: !isBlankMode && hasAmount ? "'Caveat', cursive, monospace" : 'monospace' }}
                  >
                    {!isBlankMode ? item.amountRs : ''}
                  </div>
                  <div
                    className="col-span-1 py-0.5 text-center font-bold text-[11px] flex items-center justify-center"
                    style={{ fontFamily: !isBlankMode && hasAmount ? "'Caveat', cursive, monospace" : 'monospace' }}
                  >
                    {!isBlankMode && hasAmount ? (item.amountP || '0') : ''}
                  </div>
                </div>
              </div>
            );
          })}

          {/* TOTAL ROW (Exact Match to Photo) */}
          <div
            className="grid grid-cols-12 text-xs sm:text-[13px] font-black border-t"
            style={{ borderColor: borderColor, backgroundColor: isScreenPrint ? 'transparent' : 'rgba(0,0,0,0.04)' }}
          >
            <div
              className="col-span-8 border-r py-1 px-3 text-right uppercase tracking-widest font-black"
              style={{ borderColor: borderColor }}
            >
              TOTAL-
            </div>
            <div className="col-span-4 grid grid-cols-5 font-mono">
              <div
                className="col-span-4 border-r px-2 py-1 text-right font-black text-sm sm:text-base flex items-center justify-end"
                style={{ borderColor: borderColor, fontFamily: !isBlankMode ? "'Caveat', cursive, monospace" : 'monospace' }}
              >
                {!isBlankMode ? totalRs : ''}
              </div>
              <div
                className="col-span-1 py-1 text-center font-black text-xs sm:text-sm flex items-center justify-center"
                style={{ fontFamily: !isBlankMode ? "'Caveat', cursive, monospace" : 'monospace' }}
              >
                {!isBlankMode ? totalP : ''}
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. FOOTER SECTION ================= */}
        <div className="mt-1 pt-1">
          {/* Amount in words line */}
          <div className="flex items-end text-[10.5px] sm:text-xs font-bold gap-1 mb-1">
            <span className="whitespace-nowrap">Amount in words (Rupees)</span>
            <span className="flex-1 border-b border-dotted min-h-[14px] pl-2 italic font-serif" style={{ borderColor: borderColor }}>
              {!isBlankMode && amountWords ? amountWords : ''}
            </span>
          </div>

          {/* Secondary dotted note line */}
          <div className="w-full border-b border-dotted my-1" style={{ borderColor: borderColor }}></div>

          {/* Signature & Press watermark */}
          <div className="flex items-end justify-between pt-2">
            <div className="text-[8.5px] text-stone-500 font-mono">
              <span>{data?.pressLine || 'राइज प्रिंटर्स, 7739553339'}</span>
            </div>

            {/* Signature Area */}
            <div className="flex flex-col items-center">
              {/* Handwritten checkmark / pen stroke simulation */}
              {!isBlankMode && (
                <div className="text-xl sm:text-2xl leading-none -mb-1 text-emerald-800" style={{ fontFamily: "'Caveat', cursive" }}>
                  ✓
                </div>
              )}
              <div className="border-t border-dotted pt-0.5 px-4 text-center text-xs font-black tracking-wide">
                Signature
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
