import React, { useState, useEffect } from 'react';
import {
  Maximize2,
  Sliders,
  Ruler,
  X,
  CheckCircle2,
  Link2,
  Unlink2,
  Info,
  Sparkles,
  Columns,
  Layers
} from 'lucide-react';
import { MARGIN_PRESETS, WHOLESALE_CARD_PRESETS } from '../../utils/defaultData';

export default function CustomSizeModal({ isOpen, onClose, data, onChange }) {
  // Local working state
  const [widthMm, setWidthMm] = useState(data.customWidthMm || 178);
  const [heightMm, setHeightMm] = useState(data.customHeightMm || 228);
  const [widthInches, setWidthInches] = useState(data.customWidthInches || 7);
  const [heightInches, setHeightInches] = useState(data.customHeightInches || 9);

  const [marginTopMm, setMarginTopMm] = useState(typeof data.cardMarginTopMm === 'number' ? data.cardMarginTopMm : 8);
  const [marginBottomMm, setMarginBottomMm] = useState(typeof data.cardMarginBottomMm === 'number' ? data.cardMarginBottomMm : 8);
  const [marginLeftMm, setMarginLeftMm] = useState(typeof data.cardMarginLeftMm === 'number' ? data.cardMarginLeftMm : 8);
  const [marginRightMm, setMarginRightMm] = useState(typeof data.cardMarginRightMm === 'number' ? data.cardMarginRightMm : 8);
  const [marginLinked, setMarginLinked] = useState(data.cardMarginLinked !== false);
  const [marginPreset, setMarginPreset] = useState(data.cardMarginPreset || 'normal');
  const [foldType, setFoldType] = useState(data.cardFoldType || 'single');

  // Sync with prop data when modal opens
  useEffect(() => {
    if (isOpen) {
      const wMm = data.customWidthMm || 178;
      const hMm = data.customHeightMm || 228;
      setWidthMm(wMm);
      setHeightMm(hMm);
      setWidthInches(data.customWidthInches || Number((wMm / 25.4).toFixed(2)));
      setHeightInches(data.customHeightInches || Number((hMm / 25.4).toFixed(2)));

      const tMm = typeof data.cardMarginTopMm === 'number' ? data.cardMarginTopMm : 8;
      setMarginTopMm(tMm);
      setMarginBottomMm(typeof data.cardMarginBottomMm === 'number' ? data.cardMarginBottomMm : tMm);
      setMarginLeftMm(typeof data.cardMarginLeftMm === 'number' ? data.cardMarginLeftMm : tMm);
      setMarginRightMm(typeof data.cardMarginRightMm === 'number' ? data.cardMarginRightMm : tMm);
      setMarginLinked(data.cardMarginLinked !== false);
      setMarginPreset(data.cardMarginPreset || 'normal');
      setFoldType(data.cardFoldType || 'single');
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  // Handlers for Width
  const handleWidthInchesChange = (val) => {
    const inches = Math.max(2, Math.min(30, Number(val) || 7));
    const mm = Math.round(inches * 25.4);
    setWidthInches(inches);
    setWidthMm(mm);
  };

  const handleWidthMmChange = (val) => {
    const mm = Math.max(50, Math.min(762, Number(val) || 178));
    const inches = Number((mm / 25.4).toFixed(2));
    setWidthMm(mm);
    setWidthInches(inches);
  };

  // Handlers for Height
  const handleHeightInchesChange = (val) => {
    const inches = Math.max(2, Math.min(30, Number(val) || 9));
    const mm = Math.round(inches * 25.4);
    setHeightInches(inches);
    setHeightMm(mm);
  };

  const handleHeightMmChange = (val) => {
    const mm = Math.max(50, Math.min(762, Number(val) || 228));
    const inches = Number((mm / 25.4).toFixed(2));
    setHeightMm(mm);
    setHeightInches(inches);
  };

  // Handlers for Margins
  const handleMarginPreset = (preset) => {
    setMarginPreset(preset.id);
    if (preset.valueMm !== null) {
      setMarginTopMm(preset.valueMm);
      setMarginBottomMm(preset.valueMm);
      setMarginLeftMm(preset.valueMm);
      setMarginRightMm(preset.valueMm);
    }
  };

  const handleMarginChange = (side, val) => {
    const num = Math.max(0, Math.min(50, Number(val) || 0));
    setMarginPreset('custom');
    if (marginLinked) {
      setMarginTopMm(num);
      setMarginBottomMm(num);
      setMarginLeftMm(num);
      setMarginRightMm(num);
    } else {
      if (side === 'top') setMarginTopMm(num);
      if (side === 'bottom') setMarginBottomMm(num);
      if (side === 'left') setMarginLeftMm(num);
      if (side === 'right') setMarginRightMm(num);
    }
  };

  const handleApply = () => {
    onChange({
      ...data,
      sizeKey: 'custom',
      customWidthMm: widthMm,
      customHeightMm: heightMm,
      customWidthInches: widthInches,
      customHeightInches: heightInches,
      cardMarginTopMm: marginTopMm,
      cardMarginBottomMm: marginBottomMm,
      cardMarginLeftMm: marginLeftMm,
      cardMarginRightMm: marginRightMm,
      cardMarginLinked: marginLinked,
      cardMarginPreset: marginPreset,
      cardFoldType: foldType
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn select-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden text-stone-900">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-950 via-red-900 to-amber-950 text-white p-4 sm:px-6 flex items-center justify-between border-b border-amber-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-red-950 flex items-center justify-center font-black text-xl shadow-md">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  कस्टम कार्ड साइज व मार्जिन कैलिब्रेटर
                </h2>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                  100% 1:1 PDF Ready
                </span>
              </div>
              <p className="text-xs text-amber-200/80 mt-0.5">
                दुकान के ब्लैंक इनर कार्ड का सटीक नाप सेट करें — PDF उसी वास्तविक आकार में डाउनलोड होगा।
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-stone-50/70 text-xs">
          
          {/* 1. Dimensions: Width & Height Inputs (Inches & MM) */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5">
              <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-red-700" />
                <span>1. कार्ड का कुल भौतिक नाप (Page Dimensions):</span>
              </span>
              <span className="text-[11px] font-mono font-bold text-red-700">
                {widthInches}″ × {heightInches}″ ({widthMm} × {heightMm} mm)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Width Card */}
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-2">
                <label className="font-bold text-stone-700 flex items-center justify-between">
                  <span>कुल चौड़ाई (Width):</span>
                  <span className="text-[10px] text-stone-500">Left to Right</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-stone-500 block mb-0.5">इंच (Inches ″)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="2"
                      max="30"
                      value={widthInches}
                      onChange={(e) => handleWidthInchesChange(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded px-2 py-1.5 font-mono font-bold text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-500 block mb-0.5">मिलीमीटर (mm)</label>
                    <input
                      type="number"
                      min="50"
                      max="762"
                      value={widthMm}
                      onChange={(e) => handleWidthMmChange(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded px-2 py-1.5 font-mono font-bold text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                  </div>
                </div>
              </div>

              {/* Height Card */}
              <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-2">
                <label className="font-bold text-stone-700 flex items-center justify-between">
                  <span>कुल ऊंचाई (Height):</span>
                  <span className="text-[10px] text-stone-500">Top to Bottom</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-stone-500 block mb-0.5">इंच (Inches ″)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="2"
                      max="30"
                      value={heightInches}
                      onChange={(e) => handleHeightInchesChange(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded px-2 py-1.5 font-mono font-bold text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-stone-500 block mb-0.5">मिलीमीटर (mm)</label>
                    <input
                      type="number"
                      min="50"
                      max="762"
                      value={heightMm}
                      onChange={(e) => handleHeightMmChange(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded px-2 py-1.5 font-mono font-bold text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Popular Press Sizes */}
            <div className="pt-2 border-t">
              <span className="text-[10.5px] font-bold text-stone-600 block mb-1.5">
                लोकप्रिय भारतीय थोक कार्ड नाप (1-Click Presets):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: '7×9" (178×228mm)', wIn: 7, hIn: 9, wMm: 178, hMm: 228 },
                  { label: '5×7" (127×178mm)', wIn: 5, hIn: 7, wMm: 127, hMm: 178 },
                  { label: '8×10" (203×254mm)', wIn: 8, hIn: 10, wMm: 203, hMm: 254 },
                  { label: '6.5×9.5" (165×241mm)', wIn: 6.5, hIn: 9.5, wMm: 165, hMm: 241 },
                  { label: '12×8.5" (305×216mm 2-पल्ला)', wIn: 12, hIn: 8.5, wMm: 305, hMm: 216, fold: 'bi-fold' },
                  { label: '15×8.5" (381×216mm 3-पल्ला)', wIn: 15, hIn: 8.5, wMm: 381, hMm: 216, fold: 'tri-fold' },
                  { label: '18×9" (457×228mm जंबो)', wIn: 18, hIn: 9, wMm: 457, hMm: 228, fold: 'tri-fold' }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setWidthInches(item.wIn);
                      setHeightInches(item.hIn);
                      setWidthMm(item.wMm);
                      setHeightMm(item.hMm);
                      if (item.fold) setFoldType(item.fold);
                    }}
                    className="px-2 py-1 bg-stone-100 hover:bg-red-50 hover:text-red-800 border border-stone-200 rounded text-[10px] font-mono font-semibold transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Fold Type Selector */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-2.5">
            <label className="font-bold text-stone-900 text-xs flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Columns className="w-4 h-4 text-red-700" />
                <span>2. पल्ला शैली (Fold Panels):</span>
              </span>
              <span className="text-[10.5px] text-amber-800 font-bold">
                {foldType === 'tri-fold' ? '3-पल्ला (गेटफोल्ड)' : foldType === 'bi-fold' ? '2-पल्ला (बुक स्टाइल)' : '1-पल्ला (एकल कार्ड)'}
              </span>
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFoldType('single')}
                className={`py-2 px-3 rounded-lg border text-center transition flex flex-col items-center ${
                  foldType === 'single'
                    ? 'bg-red-700 text-white font-bold shadow-xs border-red-800'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span className="text-base mb-0.5">📄</span>
                <span className="text-[11px] font-bold">1-पल्ला (सिंगल)</span>
              </button>

              <button
                type="button"
                onClick={() => setFoldType('bi-fold')}
                className={`py-2 px-3 rounded-lg border text-center transition flex flex-col items-center ${
                  foldType === 'bi-fold'
                    ? 'bg-red-700 text-white font-bold shadow-xs border-red-800'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span className="text-base mb-0.5">📖</span>
                <span className="text-[11px] font-bold">2-पल्ला (बुक स्टाइल)</span>
              </button>

              <button
                type="button"
                onClick={() => setFoldType('tri-fold')}
                className={`py-2 px-3 rounded-lg border text-center transition flex flex-col items-center ${
                  foldType === 'tri-fold'
                    ? 'bg-red-700 text-white font-bold shadow-xs border-red-800'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span className="text-base mb-0.5">📜</span>
                <span className="text-[11px] font-bold">3-पल्ला (गेटफोल्ड)</span>
              </button>
            </div>
          </div>

          {/* 3. Margins: Left, Right, Top, Bottom */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b pb-1.5">
              <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-red-700" />
                <span>3. प्रिसिजन प्रिंट मार्जिन (Safe Print Margins):</span>
              </span>
              <button
                type="button"
                onClick={() => setMarginLinked(!marginLinked)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 border transition ${
                  marginLinked
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-stone-100 text-stone-600 border-stone-200'
                }`}
                title={marginLinked ? 'चारों ओर समान मार्जिन लॉक है' : 'अलग-अलग मार्जिन अनलॉक'}
              >
                {marginLinked ? <Link2 className="w-3 h-3" /> : <Unlink2 className="w-3 h-3" />}
                <span>{marginLinked ? 'समान लॉक (Linked)' : 'स्वतंत्र (Unlinked)'}</span>
              </button>
            </div>

            {/* Margin Quick Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
              {MARGIN_PRESETS.slice(0, 5).map((preset) => {
                const isSelected = marginPreset === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleMarginPreset(preset)}
                    className={`py-1.5 px-2 rounded-lg border text-center transition flex flex-col items-center ${
                      isSelected
                        ? 'bg-red-50 text-red-950 font-bold border-red-600 ring-1 ring-red-400'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    <span className="text-[10.5px] font-bold">{preset.shortName}</span>
                    <span className="text-[9px] text-stone-500 mt-0.5">{preset.description}</span>
                  </button>
                );
              })}
            </div>

            {/* 4-Sided Margin Sliders / Inputs */}
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Top */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-stone-600 block">ऊपरी (Top)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={marginTopMm}
                      onChange={(e) => handleMarginChange('top', e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded px-1.5 py-1 text-center font-mono font-bold text-xs"
                    />
                    <span className="text-[10px] text-stone-500 font-mono">mm</span>
                  </div>
                </div>

                {/* Bottom */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-stone-600 block">निचला (Bottom)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={marginBottomMm}
                      onChange={(e) => handleMarginChange('bottom', e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded px-1.5 py-1 text-center font-mono font-bold text-xs"
                    />
                    <span className="text-[10px] text-stone-500 font-mono">mm</span>
                  </div>
                </div>

                {/* Left */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-stone-600 block">बायां (Left)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={marginLeftMm}
                      onChange={(e) => handleMarginChange('left', e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded px-1.5 py-1 text-center font-mono font-bold text-xs"
                    />
                    <span className="text-[10px] text-stone-500 font-mono">mm</span>
                  </div>
                </div>

                {/* Right */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-stone-600 block">दायां (Right)</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={marginRightMm}
                      onChange={(e) => handleMarginChange('right', e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded px-1.5 py-1 text-center font-mono font-bold text-xs"
                    />
                    <span className="text-[10px] text-stone-500 font-mono">mm</span>
                  </div>
                </div>
              </div>

              {/* Visual Margin Diagram Preview */}
              <div className="pt-2 border-t flex items-center justify-center">
                <div className="relative w-48 h-32 bg-amber-100/50 border-2 border-dashed border-stone-400 rounded flex items-center justify-center">
                  <span className="absolute top-1 text-[8.5px] font-mono text-stone-500">
                    Top: {marginTopMm}mm
                  </span>
                  <span className="absolute bottom-1 text-[8.5px] font-mono text-stone-500">
                    Bottom: {marginBottomMm}mm
                  </span>
                  <span className="absolute left-1 text-[8.5px] font-mono text-stone-500 -rotate-90">
                    Left: {marginLeftMm}mm
                  </span>
                  <span className="absolute right-1 text-[8.5px] font-mono text-stone-500 rotate-90">
                    Right: {marginRightMm}mm
                  </span>

                  {/* Inner Print Area Box */}
                  <div
                    className="bg-white/90 border border-red-600 rounded flex items-center justify-center shadow-2xs"
                    style={{
                      width: `calc(100% - ${marginLeftMm + marginRightMm + 12}px)`,
                      height: `calc(100% - ${marginTopMm + marginBottomMm + 12}px)`
                    }}
                  >
                    <span className="text-[9.5px] font-bold text-red-900">
                      सुरक्षित छपाई क्षेत्र
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between">
          <div className="text-[11px] text-stone-600">
            <span>PDF पेज आयाम: </span>
            <strong className="font-mono text-stone-900">{widthMm} mm × {heightMm} mm ({widthInches}″ × {heightInches}″)</strong>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-200 text-stone-700 font-semibold text-xs transition"
            >
              रद्द करें
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-1.5 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow-md transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>लागू करें (Apply Size & Margins)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
