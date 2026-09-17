import React, { useState } from 'react';
import {
  Printer,
  CheckCircle2,
  X,
  Sliders,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Zap,
  Info,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { INDIAN_PRINTER_PRESETS } from '../../utils/defaultData';

/**
 * 🖨️ Indian Popular Printers & 100% Toner Density Calibration Modal
 * Provides hardware/driver presets and micro-matra protection for:
 * HP 1020 Plus, Canon LBP2900B, Epson L805, Brother L2321D, and Konica/Xerox 12x18.
 */
export default function PrinterCalibrationModal({
  isOpen,
  onClose,
  data,
  onChange
}) {
  const currentPresetId = data?.selectedPrinterPreset || 'hp-1020';
  const [activePresetId, setActivePresetId] = useState(currentPresetId);

  if (!isOpen) return null;

  const activePreset =
    INDIAN_PRINTER_PRESETS.find((p) => p.id === activePresetId) ||
    INDIAN_PRINTER_PRESETS[0];

  const tonerDensity = data?.tonerDensityLevel || '100';
  const isMatraProtection = data?.matraProtectionStroke !== false;

  const handleApplyPreset = (presetToApply = activePreset) => {
    onChange({
      ...data,
      screenPrintMode: true,
      selectedPrinterPreset: presetToApply.id,
      tonerDensityLevel: presetToApply.recommendedSettings?.tonerDensityLevel || '100',
      matraProtectionStroke: presetToApply.recommendedSettings?.matraProtectionStroke ?? true,
      screenPrintTonerBoost: presetToApply.recommendedSettings?.screenPrintTonerBoost ?? true
    });
    onClose();
  };

  const handlePrintTestStrip = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-stone-900">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 text-white p-4 sm:px-6 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-black text-xl shadow-md">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  भारतीय प्रिंटर्स हेतु 100% टोनर डेंसिटी प्रीसेट्स
                </h2>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                  D-Max 3.5+
                </span>
              </div>
              <p className="text-xs text-stone-300 mt-0.5">
                HP, Canon, Epson, Brother व डिजिटल प्रेस हेतु शुद्ध काला (`#000000`) व सूक्ष्म मात्रा सुरक्षा कवच
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
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-stone-50/60">
          
          {/* 1. Printer Model Selection Cards */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <span>1. अपनी दुकान का प्रिंटर मॉडल चुनें:</span>
              </label>
              <span className="text-[11px] text-stone-500 font-medium">
                भारत के शीर्ष 5 सर्वाधिक प्रयुक्त प्रिंटर्स
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {INDIAN_PRINTER_PRESETS.map((preset) => {
                const isSelected = activePresetId === preset.id;
                const isCurrentActive = currentPresetId === preset.id;

                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setActivePresetId(preset.id)}
                    className={`p-3.5 rounded-xl border text-left transition relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-500/30 shadow-sm'
                        : 'border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/80'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 text-stone-700">
                          {preset.brand} • {preset.cartridge}
                        </span>
                        {isCurrentActive && (
                          <span className="text-[9.5px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                            सक्रिय
                          </span>
                        )}
                      </div>

                      <h3 className="text-xs font-bold text-stone-900 leading-snug">
                        {preset.shortName}
                      </h3>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                        {preset.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[10px]">
                      <span className="text-amber-700 font-bold">{preset.dMaxLevel}</span>
                      <span className="text-stone-500 font-mono">{preset.resolution.split(' ')[0]}</span>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2 text-amber-600">
                        <CheckCircle2 className="w-4 h-4 fill-amber-500 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Active Printer Profile Specifications */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-stone-900">
                    {activePreset.name}
                  </h3>
                  <span className="bg-stone-900 text-amber-300 text-[10.5px] px-2 py-0.5 rounded-full font-bold">
                    {activePreset.badge}
                  </span>
                </div>
                <div className="text-xs text-stone-500 mt-0.5">
                  प्रौद्योगिकी: {activePreset.techType} | कार्ट्रिज: {activePreset.cartridge}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleApplyPreset(activePreset)}
                className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition shadow-xs flex items-center gap-1.5"
              >
                <span>यह प्रोफाइल लागू करें</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Hardware Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <span className="text-[10.5px] text-stone-500 block">ऑप्टिकल डेंसिटी:</span>
                <span className="font-bold text-stone-900 text-xs">{activePreset.dMaxLevel}</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <span className="text-[10.5px] text-stone-500 block">प्रिंट रेज़ोल्यूशन:</span>
                <span className="font-bold text-stone-900 text-xs">{activePreset.resolution}</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <span className="text-[10.5px] text-stone-500 block">कागज़ टाइप (Driver):</span>
                <span className="font-bold text-stone-900 text-xs truncate block" title={activePreset.mediaType}>
                  {activePreset.mediaType}
                </span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <span className="text-[10.5px] text-stone-500 block">अनुशंसित स्क्रीन जाली:</span>
                <span className="font-bold text-stone-900 text-xs">{activePreset.recommendedMesh}</span>
              </div>
            </div>

            {/* Windows Driver Steps */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950">
                <Sliders className="w-4 h-4 text-amber-700" />
                <span>विंडोज ड्राइवर कैलिब्रेशन निर्देश (Windows Print Setup):</span>
              </div>

              <ol className="text-xs text-amber-900 space-y-1.5 list-decimal list-inside leading-relaxed">
                {activePreset.driverSteps.map((step, idx) => (
                  <li key={idx} className="pl-1">
                    <span className="text-stone-800 font-medium">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="text-[10.5px] text-amber-800/90 pt-1 flex items-center gap-1 border-t border-amber-200/60">
                <span>💡</span>
                <span>
                  <strong>महत्वपूर्ण:</strong> बटर पेपर निकालते समय प्रिंटर ड्राइवर में <em>EconoMode / Toner Save</em> हमेशा <strong>OFF</strong> रखें ताकि बारीक अक्षर फटे नहीं।
                </span>
              </div>
            </div>
          </div>

          {/* 3. Micro-Matra Protection (सूक्ष्म मात्रा सुरक्षा कवच) */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900">
                    सूक्ष्म मात्रा सुरक्षा कवच (+0.25pt Micro-Matra Protection)
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    स्क्रीन जाली की पानी धुलाई के समय 'ि', 'ी', 'ु', 'ू', '्', '्र', 'र्' जैसी बारीक मात्राओं को कटने से बचाता है
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={isMatraProtection}
                  onChange={(e) =>
                    onChange({
                      ...data,
                      matraProtectionStroke: e.target.checked
                    })
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>

            {/* Live Matra Comparison Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Without Protection */}
              <div className="p-3 rounded-lg border border-stone-200 bg-stone-50/50">
                <div className="flex items-center justify-between text-[11px] font-bold text-stone-600 mb-1.5">
                  <span>सामान्य टेक्स्ट (बिना सुरक्षा):</span>
                  <span className="text-red-600 text-[10px]">⚠️ पानी धुलाई में कटने का जोखिम</span>
                </div>
                <div className="bg-white p-2.5 rounded border border-stone-200 font-serif text-sm tracking-wide text-stone-900 select-none">
                  ॥ श्री गणेशाय नमः ॥ • आशीर्वाद • प्रीतिभोज • सिन्दूर
                </div>
                <p className="text-[10px] text-stone-500 mt-1">
                  रेफ (र्) व छोटी-इ (ि) की डंडी अत्यधिक पतली होने से 140 मेश जाली में लाइट लीकेज हो सकती है।
                </p>
              </div>

              {/* With Protection */}
              <div className="p-3 rounded-lg border border-emerald-300 bg-emerald-50/40">
                <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 mb-1.5">
                  <span className="flex items-center gap-1">
                    <span>🛡️ मात्रा सुरक्षा कवच सक्रिय:</span>
                  </span>
                  <span className="text-emerald-700 text-[10px] font-black">100% मजबूत जाली</span>
                </div>
                <div
                  className="bg-white p-2.5 rounded border border-emerald-300 font-serif text-sm tracking-wide text-stone-950 select-none"
                  style={{
                    WebkitTextStroke: '0.25px #000000',
                    textRendering: 'geometricPrecision'
                  }}
                >
                  ॥ श्री गणेशाय नमः ॥ • आशीर्वाद • प्रीतिभोज • सिन्दूर
                </div>
                <p className="text-[10px] text-emerald-800 mt-1">
                  +0.25pt सूक्ष्म स्ट्रोक से सभी मात्राएं मजबूत रहती हैं। पानी के फव्वारे से कोई अक्षर नहीं धुलेगा।
                </p>
              </div>
            </div>
          </div>

          {/* 4. Toner Density Level Selector */}
          <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>टोनर डेंसिटी स्तर (Toner Optical Darkness):</span>
              </label>
              <span className="text-[10.5px] bg-stone-100 text-stone-700 font-mono px-2 py-0.5 rounded font-bold">
                {tonerDensity === 'extreme' ? '150% सुपर बोल्ड' : tonerDensity === 'boost' ? '120% अल्ट्रा डार्क' : '100% मानक सॉलिड'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => onChange({ ...data, tonerDensityLevel: '100' })}
                className={`p-2.5 rounded-xl border text-center transition ${
                  tonerDensity === '100'
                    ? 'border-stone-900 bg-stone-900 text-white font-bold shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                <div className="text-xs font-bold">100% सॉलिड D-Max</div>
                <div className={`text-[10px] mt-0.5 ${tonerDensity === '100' ? 'text-stone-300' : 'text-stone-500'}`}>
                  मानक ब्लैक (D-Max 3.4)
                </div>
              </button>

              <button
                type="button"
                onClick={() => onChange({ ...data, tonerDensityLevel: 'boost' })}
                className={`p-2.5 rounded-xl border text-center transition ${
                  tonerDensity === 'boost'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/30 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                <div className="text-xs font-bold text-amber-900 flex items-center justify-center gap-1">
                  <span>120% बूस्ट</span>
                  <span className="text-[9px] bg-amber-200 text-amber-950 px-1 rounded font-black">डार्क</span>
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5">
                  140 मेश जाली हेतु
                </div>
              </button>

              <button
                type="button"
                onClick={() => onChange({ ...data, tonerDensityLevel: 'extreme' })}
                className={`p-2.5 rounded-xl border text-center transition ${
                  tonerDensity === 'extreme'
                    ? 'border-red-700 bg-red-50 text-red-950 font-bold ring-2 ring-red-500/30 shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                <div className="text-xs font-bold text-red-700 flex items-center justify-center gap-1">
                  <span>150% सुपर बोल्ड</span>
                  <span className="text-[9px] bg-red-200 text-red-900 px-1 rounded font-black">मैक्स</span>
                </div>
                <div className="text-[10px] text-stone-500 mt-0.5">
                  पुरानी 12A कार्ट्रिज हेतु
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-stone-200 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>चयनित: <strong>{activePreset.shortName}</strong> ({activePreset.cartridge})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintTestStrip}
              className="px-3 py-2 rounded-lg border border-stone-300 hover:bg-stone-100 text-xs font-bold text-stone-800 transition flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-stone-600" />
              <span>प्रिंट टेस्ट (Ctrl+P)</span>
            </button>

            <button
              type="button"
              onClick={() => handleApplyPreset(activePreset)}
              className="px-4 py-2 rounded-lg bg-stone-950 hover:bg-black text-amber-300 text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>लागू करें एवं बंद करें</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
