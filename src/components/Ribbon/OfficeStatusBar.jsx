import React from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  Mail,
  Printer,
  ShieldAlert,
  ShieldCheck,
  Users,
  Layers
} from 'lucide-react';
import { CARD_SIZES, ENVELOPE_SIZES } from '../../utils/defaultData';

export default function OfficeStatusBar({
  cardData,
  previewMode,
  setPreviewMode,
  zoomScale,
  setZoomScale
}) {
  const currentCardSize = CARD_SIZES[cardData.sizeKey] || CARD_SIZES['7x9'];
  const currentEnvelopeSize = ENVELOPE_SIZES[cardData.envelopeSizeKey] || ENVELOPE_SIZES['standard'];

  const guestCount = cardData.guestList?.length || 0;

  return (
    <footer className="bg-[#2b2a29] text-stone-300 border-t border-stone-700/60 px-3 py-1 flex items-center justify-between text-[11px] select-none shadow-inner no-print z-40">
      {/* Left: Document Info & Dimensions */}
      <div className="flex items-center gap-3 overflow-x-auto scrollbar-none">
        {/* Page / Document Indicator */}
        <div className="flex items-center gap-1.5 font-medium text-stone-200">
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {previewMode === 'envelope' ? 'पेज 1/1 (लिफाफा)' : 'पेज 1/1 (विवाह कार्ड)'}
          </span>
        </div>

        <span className="text-stone-600">|</span>

        {/* Real Millimeter / Inch Dimensions */}
        <div className="flex items-center gap-1 font-mono text-stone-300">
          <span>📐</span>
          <span>
            {previewMode === 'envelope'
              ? `${currentEnvelopeSize.widthMm} × ${currentEnvelopeSize.heightMm} mm (${currentEnvelopeSize.name})`
              : `${currentCardSize.widthMm} × ${currentCardSize.heightMm} mm (${currentCardSize.name})`}
          </span>
        </div>

        <span className="text-stone-600 hidden sm:inline">|</span>

        {/* DPI Resolution */}
        <div className="hidden sm:flex items-center gap-1 text-stone-400 font-mono">
          <span>🖨️</span>
          <span>{cardData.screenPrintMode ? '600 DPI (बटर)' : '300 DPI (HD)'}</span>
        </div>

        {/* Guests Count */}
        {guestCount > 0 && (
          <>
            <span className="text-stone-600 hidden md:inline">|</span>
            <div className="hidden md:flex items-center gap-1 text-stone-300">
              <Users className="w-3 h-3 text-indigo-400" />
              <span>{guestCount} मेहमान</span>
            </div>
          </>
        )}
      </div>

      {/* Center: Live Status Indicator */}
      <div className="hidden lg:flex items-center gap-2">
        {cardData.screenPrintMode ? (
          <div className="flex items-center gap-1 text-amber-300 bg-black/40 px-2 py-0.5 rounded border border-amber-500/40 text-[10.5px] font-bold">
            <span>🖨️ बटर मास्टर:</span>
            <span>{cardData.screenPrintImposition?.toUpperCase() || '1-UP'}</span>
            {cardData.screenPrintPlate !== 'all' && (
              <span className="text-amber-400">
                ({cardData.screenPrintPlate === 'text' ? 'प्लेट 1 टेक्स्ट' : 'प्लेट 2 बॉर्डर्स'})
              </span>
            )}
          </div>
        ) : cardData.isDraftProofMode ? (
          <div className="flex items-center gap-1 text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-600/40 text-[10.5px] font-semibold">
            <ShieldAlert className="w-3 h-3 text-amber-400" />
            <span>कच्चा प्रूफ (जांच हेतु)</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-emerald-400 text-[10.5px]">
            <ShieldCheck className="w-3 h-3" />
            <span>100% प्रिंट रेडी</span>
          </div>
        )}
      </div>

      {/* Right: Layout Switchers & MS Word Zoom Slider */}
      <div className="flex items-center gap-3">
        {/* Quick View Modes */}
        <div className="flex items-center bg-black/30 rounded p-0.5 border border-stone-700">
          <button
            type="button"
            onClick={() => setPreviewMode('card')}
            className={`px-1.5 py-0.5 rounded text-[10.5px] font-bold transition ${
              previewMode === 'card'
                ? 'bg-red-800 text-white shadow-2xs'
                : 'text-stone-400 hover:text-white'
            }`}
            title="मुख्य कार्ड दृश्य"
          >
            कार्ड
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('envelope')}
            className={`px-1.5 py-0.5 rounded text-[10.5px] font-bold transition ${
              previewMode === 'envelope'
                ? 'bg-red-800 text-white shadow-2xs'
                : 'text-stone-400 hover:text-white'
            }`}
            title="लिफाफा दृश्य"
          >
            लिफाफा
          </button>
        </div>

        {/* Word Style Zoom Slider */}
        <div className="flex items-center gap-1 bg-black/30 px-2 py-0.5 rounded border border-stone-700">
          <button
            type="button"
            onClick={() => setZoomScale((prev) => Math.max(0.4, Number((prev - 0.05).toFixed(2))))}
            className="hover:text-white text-stone-400 p-0.5 transition"
            title="ज़ूम कम करें (Zoom Out)"
          >
            <ZoomOut className="w-3 h-3" />
          </button>

          <input
            type="range"
            min="0.4"
            max="1.5"
            step="0.05"
            value={zoomScale}
            onChange={(e) => setZoomScale(parseFloat(e.target.value))}
            className="w-16 sm:w-20 accent-amber-500 h-1 bg-stone-600 rounded cursor-pointer"
            title={`ज़ूम स्तर: ${Math.round(zoomScale * 100)}%`}
          />

          <button
            type="button"
            onClick={() => setZoomScale((prev) => Math.min(1.5, Number((prev + 0.05).toFixed(2))))}
            className="hover:text-white text-stone-400 p-0.5 transition"
            title="ज़ूम बढ़ाएं (Zoom In)"
          >
            <ZoomIn className="w-3 h-3" />
          </button>

          <span className="font-mono text-[10px] w-9 text-right text-stone-200">
            {Math.round(zoomScale * 100)}%
          </span>

          <button
            type="button"
            onClick={() => setZoomScale(0.95)}
            className="ml-1 hover:text-amber-400 text-stone-400 p-0.5 transition"
            title="रीसेट ज़ूम (100% Fit)"
          >
            <Maximize2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
