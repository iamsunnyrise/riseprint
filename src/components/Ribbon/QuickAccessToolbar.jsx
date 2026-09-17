import React, { useState } from 'react';
import {
  RefreshCw,
  Printer,
  Download,
  FileText,
  FileDown,
  Sparkles,
  ChevronDown,
  Save,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

import { PRODUCT_TYPES } from '../../utils/defaultData';
import { scanCardText } from '../../utils/hindiProofingEngine';

export default function QuickAccessToolbar({
  cardData,
  previewMode,
  isExporting,
  isHindiTyping,
  toggleHindiTyping,
  onReset,
  onOpenDtpModal,
  onOpenDigitalModal,
  onOpenDraftProofModal,
  onOpenJobSlipModal,
  onOpenSpellCheckModal,
  onSelectProduct,
  onExportPDF,
  onExportPNG,
  onExportCorelDrawSVG,
  onPrint
}) {
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const detectedErrors = scanCardText(cardData);
  const errorCount = detectedErrors.length;

  let docTitle = 'श्री गणेशाय नमः — शुभ विवाह निमंत्रण पत्र.rdtp';
  if (cardData.productType === 'shok-sandesh') {
    docTitle = `${cardData.shokPersonName || 'शोक संदेश'} — तेरहवीं संस्कार.rdtp`;
  } else if (cardData.productType === 'sanskar') {
    docTitle = `${cardData.sanskarChildName || 'संस्कार'} — ${cardData.sanskarHeading || 'मांगलिक निमंत्रण'}.rdtp`;
  } else if (cardData.productType === 'bill-book') {
    docTitle = `${cardData.billFirmName || 'बिल बुक'} — कैश मेमो मास्टर.rdtp`;
  } else if (cardData.productType === 'visiting-card') {
    docTitle = `${cardData.bizCardShopName || 'विज़िटिंग कार्ड'} — 10-Up A4 शीट.rdtp`;
  } else if (cardData.groomName && cardData.brideName) {
    docTitle = `${cardData.groomName} संग ${cardData.brideName} — विवाह निमंत्रण पत्र.rdtp`;
  }

  return (
    <div className="bg-[#380606] text-amber-100 border-b border-amber-600/40 px-3 py-1.5 flex items-center justify-between gap-2 text-xs select-none shadow-md no-print relative z-50">
      {/* Left: App Logo & Quick Access Icons (QAT) */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        {/* Brand Seal */}
        <div className="flex items-center gap-1.5 pr-2 border-r border-amber-700/50">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-red-950 font-black text-sm flex items-center justify-center shadow-sm">
            卐
          </div>
          <span className="font-bold text-white tracking-wide hidden sm:inline text-xs">
            राइज प्रिंट स्टूडियो
          </span>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30 hidden lg:inline font-mono">
            DTP Press
          </span>
        </div>

        {/* 🖨️ Product Switcher Dropdown */}
        <div className="flex items-center bg-black/40 border border-amber-500/40 rounded px-1.5 py-0.5">
          <span className="text-[10px] text-amber-300 font-bold hidden sm:inline mr-1">उत्पाद:</span>
          <select
            value={cardData.productType || 'wedding'}
            onChange={(e) => onSelectProduct && onSelectProduct(e.target.value)}
            className="bg-transparent text-amber-100 font-bold text-[11px] cursor-pointer focus:outline-none"
          >
            {PRODUCT_TYPES.map((p) => (
              <option key={p.id} value={p.id} className="bg-stone-900 text-white">
                {p.icon} {p.shortName}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Save / Reset Button */}
        <button
          type="button"
          onClick={onReset}
          className="p-1.5 hover:bg-white/10 text-amber-200/90 hover:text-white rounded transition"
          title="मूल टेम्पलेट पर रीसेट करें"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>

        {/* Direct Print Button */}
        <button
          type="button"
          onClick={onPrint}
          className="p-1.5 hover:bg-white/10 text-amber-200/90 hover:text-white rounded transition"
          title={`प्रिंट करें (${previewMode === 'envelope' ? 'लिफाफा' : 'कार्ड'})`}
        >
          <Printer className="w-3.5 h-3.5" />
        </button>

        {/* Phonetic Hindi Typing Toggle (Ctrl+G) */}
        <button
          type="button"
          onClick={toggleHindiTyping}
          className={`flex items-center gap-1 px-2 py-0.5 rounded font-bold text-[11px] transition border ${
            isHindiTyping
              ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-xs'
              : 'bg-black/25 hover:bg-black/40 text-amber-200 border-amber-500/30'
          }`}
          title="इंग्लिश ➔ हिंदी टाइपिंग (Ctrl+G)"
        >
          <span className="font-extrabold text-[10px] px-0.5 bg-stone-900 text-amber-300 rounded">
            {isHindiTyping ? 'अ' : 'A'}
          </span>
          <span className="hidden md:inline">
            {isHindiTyping ? 'हिंदी चालू' : 'हिंदी बंद'}
          </span>
        </button>

        {/* DTP Press Font Converter Modal Trigger */}
        <button
          type="button"
          onClick={onOpenDtpModal}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/25 hover:bg-black/40 text-amber-200 border border-amber-500/30 font-semibold text-[11px] transition"
          title="कृतिदेव 010 / चाणक्य / श्रीलिपि DTP कनवर्टर (CorelDRAW हेतु)"
        >
          <span className="text-amber-400 font-bold">⚡</span>
          <span className="hidden xl:inline">कृतिदेव DTP</span>
        </button>
      </div>

      {/* Center: Document Title Bar (Word style) */}
      <div className="hidden md:flex items-center gap-2 bg-black/30 border border-amber-600/30 px-3 py-0.5 rounded-full text-stone-200 text-[11px] max-w-md truncate">
        <FileText className="w-3 h-3 text-amber-400 flex-shrink-0" />
        <span className="font-medium text-amber-100 truncate">{docTitle}</span>
        <span className="text-stone-400 text-[10px] flex items-center gap-1 pl-1 border-l border-amber-600/30 flex-shrink-0">
          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
          <span>स्वतः सुरक्षित</span>
        </span>
      </div>

      {/* Right: Key Workflow Actions (Draft Proof, Digital Card, Quick Export) */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {/* ✍️ Spell & Matra Check Trigger */}
        <button
          type="button"
          onClick={onOpenSpellCheckModal}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold transition shadow-xs border cursor-pointer ${
            errorCount > 0
              ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300 ring-1 ring-amber-400/50'
              : 'bg-black/30 hover:bg-black/50 text-amber-200 border-amber-500/30'
          }`}
          title="हिंदी मात्रा व वर्तनी जांच (Hindi Matra & Spell Check)"
        >
          <span>✍️</span>
          <span className="hidden sm:inline">वर्तनी जांच</span>
          {errorCount > 0 ? (
            <span className="bg-red-700 text-white px-1.5 py-0.2 rounded-full text-[9.5px] font-bold animate-pulse">
              ⚠️ {errorCount}
            </span>
          ) : (
            <span className="text-emerald-400 text-[9px] font-bold">✓</span>
          )}
        </button>

        {/* 📋 Digital Job Slip & Billing Button */}
        <button
          type="button"
          onClick={onOpenJobSlipModal}
          className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 transition shadow-xs cursor-pointer"
          title="डिजिटल जॉब स्लिप, टोकन व बिलिंग सिस्टम (Job Card)"
        >
          <span>📋</span>
          <span className="hidden sm:inline">जॉब स्लिप / बिल</span>
        </button>

        {/* 📑 Draft Proof & WhatsApp Button */}
        <button
          type="button"
          onClick={onOpenDraftProofModal}
          className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold transition shadow-xs border cursor-pointer ${
            cardData.isDraftProofMode
              ? cardData.proofStatus === 'approved'
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400'
                : 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300'
              : 'bg-black/30 hover:bg-black/50 text-amber-200 border-amber-500/30'
          }`}
          title="कच्चा प्रूफ (Draft Approval) मोड व सीधा WhatsApp शेयरिंग"
        >
          <span className="text-xs">📑</span>
          <span className="hidden sm:inline">
            {cardData.isDraftProofMode
              ? cardData.proofStatus === 'approved'
                ? 'स्वीकृत (Approved)'
                : 'कच्चा प्रूफ'
              : 'कच्चा प्रूफ'}
          </span>
        </button>

        {/* 🎵 Digital Interactive Card */}
        <button
          type="button"
          onClick={onOpenDigitalModal}
          className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-stone-950 shadow-xs border border-amber-300 transition cursor-pointer"
          title="फुल-स्क्रीन डिजिटल शादी कार्ड, मंगल शहनाई व WhatsApp"
        >
          <Sparkles className="w-3 h-3 text-red-950 fill-current" />
          <span className="hidden sm:inline">डिजिटल कार्ड</span>
        </button>

        {/* ⚡ CorelDRAW Ready SVG (Convert to Curves) */}
        <button
          type="button"
          onClick={onExportCorelDrawSVG}
          disabled={isExporting}
          className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold bg-stone-900 hover:bg-black text-amber-300 border border-amber-500/60 shadow-xs transition cursor-pointer"
          title="CorelDRAW रेडी SVG (Convert to Curves) डाउनलोड करें"
        >
          <FileDown className="w-3 h-3 text-amber-400" />
          <span className="hidden lg:inline">CorelDRAW SVG</span>
        </button>

        {/* Direct PDF Export */}
        <button
          type="button"
          onClick={onExportPDF}
          disabled={isExporting}
          className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold bg-amber-500 hover:bg-amber-400 text-red-950 shadow-xs transition"
          title="सक्रिय दृश्य की उच्च-गुणवत्ता 300/600 DPI PDF डाउनलोड करें"
        >
          <Download className="w-3 h-3" />
          <span>
            {cardData.screenPrintMode
              ? 'बटर PDF'
              : previewMode === 'envelope'
              ? 'लिफाफा PDF'
              : 'कार्ड PDF'}
          </span>
        </button>
      </div>
    </div>
  );
}
