import React from 'react';
import {
  Layers,
  Columns,
  Scissors,
  Ruler,
  CheckCircle2,
  Sparkles,
  Info,
  Sliders,
  Maximize2
} from 'lucide-react';
import { WHOLESALE_CARD_PRESETS, CARD_SIZES } from '../../utils/defaultData';

export default function BlankCardMatcherForm({ data, onChange }) {
  const currentFoldType = data.cardFoldType || 'single';
  const showCreases = data.showFoldCreaseGuides !== false;

  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleSelectPreset = (preset) => {
    const sizeConfig = CARD_SIZES[preset.sizeKey] || CARD_SIZES['7x9'];
    onChange({
      ...data,
      wholesaleMarketPreset: preset.id,
      sizeKey: preset.sizeKey,
      cardFoldType: preset.foldType === 'custom' ? data.cardFoldType || 'single' : preset.foldType,
      customWidthMm: preset.widthMm,
      customHeightMm: preset.heightMm,
      customWidthInches: Number((preset.widthMm / 25.4).toFixed(2)),
      customHeightInches: Number((preset.heightMm / 25.4).toFixed(2))
    });
  };

  const handleFoldChange = (foldType) => {
    // If switching fold type, pick an appropriate default size if needed
    let newSizeKey = data.sizeKey;
    let newWidthMm = data.customWidthMm || 178;
    let newHeightMm = data.customHeightMm || 228;

    if (foldType === 'bi-fold' && data.cardFoldType !== 'bi-fold') {
      newSizeKey = 'bi-fold-book';
      newWidthMm = 305;
      newHeightMm = 216;
    } else if (foldType === 'tri-fold' && data.cardFoldType !== 'tri-fold') {
      newSizeKey = 'tri-fold-classic';
      newWidthMm = 381;
      newHeightMm = 216;
    } else if (foldType === 'single' && data.cardFoldType !== 'single') {
      newSizeKey = '7x9';
      newWidthMm = 178;
      newHeightMm = 228;
    }

    onChange({
      ...data,
      cardFoldType: foldType,
      sizeKey: newSizeKey,
      customWidthMm: newWidthMm,
      customHeightMm: newHeightMm,
      customWidthInches: Number((newWidthMm / 25.4).toFixed(2)),
      customHeightInches: Number((newHeightMm / 25.4).toFixed(2))
    });
  };

  const handleWidthMmChange = (val) => {
    const mm = Math.max(50, Math.min(600, Number(val) || 178));
    const inches = Number((mm / 25.4).toFixed(2));
    onChange({
      ...data,
      sizeKey: 'custom',
      customWidthMm: mm,
      customWidthInches: inches
    });
  };

  const handleHeightMmChange = (val) => {
    const mm = Math.max(50, Math.min(600, Number(val) || 228));
    const inches = Number((mm / 25.4).toFixed(2));
    onChange({
      ...data,
      sizeKey: 'custom',
      customHeightMm: mm,
      customHeightInches: inches
    });
  };

  return (
    <div className="space-y-4 text-xs select-none">
      {/* Introduction Card */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300/80 rounded-xl p-3 shadow-xs">
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-900 font-bold flex items-center justify-center text-base flex-shrink-0">
            🎴
          </div>
          <div>
            <h3 className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
              <span>थोक ब्लैंक कार्ड साइज व इनर लेआउट</span>
              <span className="bg-red-700 text-white text-[9px] px-1.5 py-0.2 rounded font-mono">
                Press Pro
              </span>
            </h3>
            <p className="text-[11px] text-amber-900/80 mt-0.5 leading-relaxed">
              थोक मंडी (चावड़ी बाजार आदि) से खरीदे गए रेडीमेड कार्ड के इनर बटर पेपर का सही नाप सेट करें।
            </p>
          </div>
        </div>
      </div>

      {/* 1. Wholesale Preset Cards */}
      <div className="bg-white border border-stone-200 rounded-xl p-3 shadow-xs space-y-2.5">
        <label className="font-bold text-stone-800 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-red-700" />
            <span>थोक मार्केट रेडीमेड प्रीसेट्स:</span>
          </span>
          <span className="text-[10px] text-stone-500">6 लोकप्रिय साइज</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {WHOLESALE_CARD_PRESETS.map((preset) => {
            const isSelected =
              data.sizeKey === preset.sizeKey ||
              data.wholesaleMarketPreset === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`flex flex-col text-left p-2 rounded-lg border transition ${
                  isSelected
                    ? 'border-red-700 bg-red-50/60 ring-2 ring-red-400/50'
                    : 'border-stone-200 hover:border-amber-400 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-xs truncate">
                    {preset.name}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-700 flex-shrink-0" />
                  )}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-stone-600 mt-1 font-mono">
                  <span>📐 {preset.widthMm} × {preset.heightMm} mm</span>
                  <span className="text-stone-400">|</span>
                  <span className="text-amber-800 font-semibold">
                    {preset.panels === 3
                      ? '3-पल्ला'
                      : preset.panels === 2
                      ? '2-पल्ला'
                      : 'सिंगल'}
                  </span>
                </div>
                <p className="text-[9.5px] text-stone-500 mt-1 line-clamp-1">
                  {preset.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Fold Type Selector (1-पल्ला, 2-पल्ला, 3-पल्ला) */}
      <div className="bg-white border border-stone-200 rounded-xl p-3 shadow-xs space-y-2.5">
        <label className="font-bold text-stone-800 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5">
            <Columns className="w-3.5 h-3.5 text-red-700" />
            <span>पल्ला शैली (Fold Type):</span>
          </span>
          <span className="text-[10px] text-amber-700 font-semibold font-mono">
            {currentFoldType === 'tri-fold'
              ? '3 पल्ले (गेटफोल्ड)'
              : currentFoldType === 'bi-fold'
              ? '2 पल्ले (बुक स्टाइल)'
              : '1 पल्ला (सिंगल)'}
          </span>
        </label>

        <div className="grid grid-cols-3 gap-1.5">
          {/* 1-Fold */}
          <button
            type="button"
            onClick={() => handleFoldChange('single')}
            className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition ${
              currentFoldType === 'single'
                ? 'border-red-700 bg-red-700 text-white font-bold shadow-xs'
                : 'border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700'
            }`}
          >
            <span className="text-base mb-0.5">📄</span>
            <span className="text-[11px] font-bold">1-पल्ला</span>
            <span className={`text-[9px] mt-0.5 ${currentFoldType === 'single' ? 'text-amber-200' : 'text-stone-500'}`}>
              एकल कार्ड
            </span>
          </button>

          {/* 2-Fold */}
          <button
            type="button"
            onClick={() => handleFoldChange('bi-fold')}
            className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition ${
              currentFoldType === 'bi-fold'
                ? 'border-red-700 bg-red-700 text-white font-bold shadow-xs'
                : 'border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700'
            }`}
          >
            <span className="text-base mb-0.5">📖</span>
            <span className="text-[11px] font-bold">2-पल्ला</span>
            <span className={`text-[9px] mt-0.5 ${currentFoldType === 'bi-fold' ? 'text-amber-200' : 'text-stone-500'}`}>
              बुक स्टाइल
            </span>
          </button>

          {/* 3-Fold */}
          <button
            type="button"
            onClick={() => handleFoldChange('tri-fold')}
            className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition ${
              currentFoldType === 'tri-fold'
                ? 'border-red-700 bg-red-700 text-white font-bold shadow-xs'
                : 'border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-700'
            }`}
          >
            <span className="text-base mb-0.5">📜</span>
            <span className="text-[11px] font-bold">3-पल्ला</span>
            <span className={`text-[9px] mt-0.5 ${currentFoldType === 'tri-fold' ? 'text-amber-200' : 'text-stone-500'}`}>
              गेटफोल्ड
            </span>
          </button>
        </div>

        {/* Panel Content Distribution Legend */}
        <div className="bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-[10.5px] text-stone-700 space-y-1">
          <div className="font-bold text-red-950 flex items-center gap-1">
            <Info className="w-3 h-3 text-red-700" />
            <span>सामग्री वितरण (Content Layout):</span>
          </div>
          {currentFoldType === 'single' && (
            <p className="text-stone-600 pl-4">
              • <strong>एकल पेज:</strong> हेडर (गणेश जी) ➔ मांगलिक कार्यक्रम ➔ वर-वधू निमंत्रण ➔ परिवार व मुद्रक।
            </p>
          )}
          {currentFoldType === 'bi-fold' && (
            <div className="pl-4 space-y-0.5 text-stone-600">
              <p>• <strong>बायां पल्ला:</strong> गणेश वंदना, शुभ लग्न, कार्यक्रम तालिका, विवाह स्थल व QR।</p>
              <p>• <strong>दायां पल्ला:</strong> मुख्य निमंत्रण, वर-वधू, माता-पिता, दर्शनाभिलाषी, विनीत व मुद्रक।</p>
            </div>
          )}
          {currentFoldType === 'tri-fold' && (
            <div className="pl-4 space-y-0.5 text-stone-600">
              <p>• <strong>पल्ला 1 (बायां):</strong> श्री गणेशाय नमः, मांगलिक श्लोक, शुभ विवाह लग्न विवरण।</p>
              <p>• <strong>पल्ला 2 (मध्य):</strong> मुख्य निमंत्रण, वर-वधू (रोहन संग प्रिया), कुल गोत्र व निवास।</p>
              <p>• <strong>पल्ला 3 (दायां):</strong> कार्यक्रम (हल्दी, बारात), विवाह स्थल व QR, दर्शनाभिलाषी व मुद्रक।</p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Custom Scale / Ruler Calibration */}
      <div className="bg-white border border-stone-200 rounded-xl p-3 shadow-xs space-y-2.5">
        <label className="font-bold text-stone-800 flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-red-700" />
            <span>कस्टम पटरी नाप (Scale Calibrator):</span>
          </span>
          <span className="text-[10px] text-stone-500 font-mono">mm / inch</span>
        </label>

        <p className="text-[10.5px] text-stone-500">
          दुकान में रखी पटरी से अपने खाली इनर पेपर की कुल चौड़ाई और ऊंचाई नापकर नीचे डालें:
        </p>

        <div className="grid grid-cols-2 gap-3">
          {/* Width Input */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-stone-700 flex items-center justify-between">
              <span>कुल चौड़ाई:</span>
              <span className="text-red-700 font-mono">
                {((data.customWidthMm || 178) / 25.4).toFixed(1)}″
              </span>
            </span>
            <div className="relative flex items-center">
              <input
                type="number"
                min="50"
                max="600"
                value={data.customWidthMm || 178}
                onChange={(e) => handleWidthMmChange(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 font-mono text-xs font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-600 pr-10"
              />
              <span className="absolute right-2 text-[10px] text-stone-500 font-mono">
                mm
              </span>
            </div>
          </div>

          {/* Height Input */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-stone-700 flex items-center justify-between">
              <span>कुल ऊंचाई:</span>
              <span className="text-red-700 font-mono">
                {((data.customHeightMm || 228) / 25.4).toFixed(1)}″
              </span>
            </span>
            <div className="relative flex items-center">
              <input
                type="number"
                min="50"
                max="600"
                value={data.customHeightMm || 228}
                onChange={(e) => handleHeightMmChange(e.target.value)}
                className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 font-mono text-xs font-bold text-stone-900 focus:outline-none focus:ring-1 focus:ring-red-600 pr-10"
              />
              <span className="absolute right-2 text-[10px] text-stone-500 font-mono">
                mm
              </span>
            </div>
          </div>
        </div>

        {/* Quick presets for shopkeepers */}
        <div className="flex items-center gap-1.5 pt-1 overflow-x-auto scrollbar-none">
          <span className="text-[10px] text-stone-500 font-semibold flex-shrink-0">
            त्वरित नाप:
          </span>
          <button
            type="button"
            onClick={() => {
              handleWidthMmChange(178);
              handleHeightMmChange(228);
            }}
            className="px-1.5 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-mono text-[10px] whitespace-nowrap"
          >
            7×9" (178×228)
          </button>
          <button
            type="button"
            onClick={() => {
              handleWidthMmChange(305);
              handleHeightMmChange(216);
            }}
            className="px-1.5 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-mono text-[10px] whitespace-nowrap"
          >
            12×8.5" (305×216)
          </button>
          <button
            type="button"
            onClick={() => {
              handleWidthMmChange(381);
              handleHeightMmChange(216);
            }}
            className="px-1.5 py-0.5 rounded bg-stone-100 hover:bg-stone-200 text-stone-700 font-mono text-[10px] whitespace-nowrap"
          >
            15×8.5" (381×216)
          </button>
        </div>
      </div>

      {/* 4. Fold Crease Guidelines Toggle */}
      <div className="bg-white border border-stone-200 rounded-xl p-3 shadow-xs flex items-center justify-between">
        <div className="space-y-0.5">
          <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5 text-red-700" />
            <span>मोड़ क्रीज लाइन्स (Fold Guides):</span>
          </span>
          <p className="text-[10.5px] text-stone-500">
            कार्ड मुड़ने के स्थान पर डॉटेड क्रीज रेखाएं दिखाएं ताकि टेक्स्ट न कटे।
          </p>
        </div>
        <button
          type="button"
          onClick={() => updateField('showFoldCreaseGuides', !showCreases)}
          className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
            showCreases ? 'bg-red-700' : 'bg-stone-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
              showCreases ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
