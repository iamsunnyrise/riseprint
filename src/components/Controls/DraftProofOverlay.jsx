import React from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

/**
 * 📑 DraftProofOverlay
 * Professional pre-press draft watermark & legal disclaimer overlay.
 * Protects printing presses from unauthorized usage and ensures client verifies all details before final printing.
 */
export default function DraftProofOverlay({ data, isEnvelope = false }) {
  if (!data?.isDraftProofMode || data?.screenPrintMode) {
    return null;
  }

  const isApproved = data.proofStatus === 'approved';
  const watermarkText = data.draftWatermarkText || 'कच्चा प्रूफ • केवल जांच हेतु';

  if (isApproved) {
    return (
      <div className="absolute top-2 right-2 z-30 pointer-events-none select-none">
        <div className="flex items-center gap-1.5 bg-emerald-700/90 text-white px-3 py-1 rounded-full shadow-md border-2 border-emerald-400 text-xs font-bold tracking-wide backdrop-blur-xs animate-in fade-in duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
          <span>अंतिम स्वीकृत • APPROVED</span>
        </div>
      </div>
    );
  }

  // Draft Mode Active: Render multi-layer security watermarks & bottom legal disclaimer
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-30 overflow-hidden flex flex-col justify-between"
      aria-hidden="true"
    >
      {/* Top subtle repeating diagonal watermark line */}
      <div className="w-[160%] -ml-[30%] pt-8 opacity-30 transform -rotate-12 flex justify-around text-[13px] font-black tracking-widest text-red-700 uppercase">
        <span>{watermarkText}</span>
        <span>• DRAFT FOR APPROVAL •</span>
        <span>{watermarkText}</span>
      </div>

      {/* Central High-Visibility Diagonal Warning Ribbon */}
      <div className="relative my-auto w-[180%] -ml-[40%] transform -rotate-25 shadow-lg">
        <div className="bg-red-600/80 text-white py-2 px-6 border-y-2 border-amber-300 flex items-center justify-center gap-4 text-sm sm:text-base font-black tracking-wider uppercase backdrop-blur-[1px]">
          <ShieldAlert className="w-5 h-5 text-amber-300 animate-pulse flex-shrink-0" />
          <span className="drop-shadow-sm">{watermarkText}</span>
          <span className="hidden sm:inline text-amber-200">|</span>
          <span className="hidden sm:inline text-amber-100 text-xs">DRAFT PROOF • NOT FOR FINAL PRINT</span>
          <AlertTriangle className="w-5 h-5 text-amber-300 animate-pulse flex-shrink-0" />
        </div>
        <div className="bg-red-950/75 text-amber-200 text-[10px] sm:text-[11px] py-1 text-center font-bold tracking-wide">
          कृपया नाम, दिनांक, वार, पता व वर्तनी की बारीकी से जांच करें • सुधार हेतु बताएं
        </div>
      </div>

      {/* Lower subtle repeating diagonal watermark line */}
      <div className="w-[160%] -ml-[30%] pb-6 opacity-30 transform -rotate-12 flex justify-around text-[13px] font-black tracking-widest text-red-700 uppercase">
        <span>• DRAFT FOR APPROVAL •</span>
        <span>{watermarkText}</span>
        <span>• DRAFT FOR APPROVAL •</span>
      </div>

      {/* Bottom Fixed Press Legal Disclaimer Bar */}
      <div className="w-full bg-stone-900/90 text-amber-200 text-[9.5px] sm:text-[10.5px] px-3 py-1 text-center font-medium border-t border-amber-500/40 shadow-inner flex items-center justify-center gap-1.5 leading-tight backdrop-blur-xs">
        <span className="text-amber-400 font-bold">⚠️ अस्वीकरण (Press Disclaimer):</span>
        <span>छपाई से पूर्व सभी विवरण भली-भाँति जांच लें। अंतिम मुद्रणोपरांत किसी भी त्रुटि हेतु प्रेस उत्तरदायी नहीं होगा।</span>
      </div>
    </div>
  );
}
