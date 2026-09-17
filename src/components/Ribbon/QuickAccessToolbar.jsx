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
  onExportPDF,
  onExportPNG,
  onExportCorelDrawSVG,
  onPrint
}) {
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);

  const docTitle = cardData.groomName && cardData.brideName
    ? `${cardData.groomName} संग ${cardData.brideName} — विवाह निमंत्रण पत्र.rdtp`
    : 'श्री गणेशाय नमः — शुभ विवाह निमंत्रण पत्र.rdtp';

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
            विवाह कार्ड मेकर
          </span>
          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30 hidden lg:inline font-mono">
            DTP Studio
          </span>
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
