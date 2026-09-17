import React from 'react';
import {
  Printer,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Layers,
  FileCheck,
  Eye,
  Info,
  Scissors,
  Palette,
  Flame,
  FileDown
} from 'lucide-react';
import { SCREEN_PRINT_PRESETS } from '../../utils/defaultData';

/**
 * Screen Print & Butter Paper Mode Editor Form (स्क्रीन प्रिंटिंग / बटर पेपर सेटिंग्स)
 */
export default function ScreenPrintForm({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const applyPreset = (preset) => {
    onChange({
      ...data,
      ...preset.settings
    });
  };

  const isScreenPrint = Boolean(data.screenPrintMode);

  return (
    <div className="space-y-6">
      {/* 1. Master Toggle Hero Card */}
      <div
        className={`p-4 rounded-xl border transition-all ${
          isScreenPrint
            ? 'bg-stone-900 border-stone-800 text-white shadow-md'
            : 'bg-white border-stone-200 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-black ${
                isScreenPrint
                  ? 'bg-amber-400 text-stone-950'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold flex items-center gap-2">
                <span>बटर पेपर / स्क्रीन प्रिंटिंग मोड</span>
                {isScreenPrint && (
                  <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    सक्रिय (Active)
                  </span>
                )}
              </div>
              <p className={`text-xs mt-0.5 ${isScreenPrint ? 'text-stone-300' : 'text-stone-500'}`}>
                लेज़र प्रिंटर से 90 GSM गेटवे बटर पेपर पर स्क्रीन जाली एक्सपोज़र हेतु 100% सॉलिड ब्लैक मास्टर
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input
              type="checkbox"
              checked={isScreenPrint}
              onChange={(e) => updateField('screenPrintMode', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>
      </div>

      {/* 2. ✂️ 2-Up / 4-Up बटर पेपर लेआउट (Imposition Sheet Suite) */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Scissors className="w-4 h-4 text-emerald-600" />
            <span>2-Up / 4-Up बटर पेपर लेआउट (Imposition Sheet)</span>
          </div>
          <span className="text-[10.5px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
            50% लागत बचत
          </span>
        </div>

        <p className="text-[11px] text-stone-600 leading-snug">
          A4 या 12×18 इंच बटर पेपर पर एक साथ 2 या 4 कार्ड सेंटर कटिंग मार्क (✂️) के साथ प्रिंट करें। इससे बटर पेपर और स्क्रीन मेकिंग का 50% से 75% खर्च बचता है।
        </p>

        {/* Imposition Mode Selector */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              if (!isScreenPrint) updateField('screenPrintMode', true);
              updateField('screenPrintImposition', '1-up');
            }}
            className={`p-2.5 rounded-xl border text-center transition ${
              (data.screenPrintImposition || '1-up') === '1-up'
                ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/30 font-bold shadow-xs'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
            }`}
          >
            <div className="text-xs font-bold text-stone-900">1-Up</div>
            <div className="text-[10px] text-stone-500">सिंगल कार्ड</div>
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isScreenPrint) updateField('screenPrintMode', true);
              updateField('screenPrintImposition', '2-up');
            }}
            className={`p-2.5 rounded-xl border text-center transition ${
              data.screenPrintImposition === '2-up'
                ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/30 font-bold shadow-xs'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
            }`}
          >
            <div className="text-xs font-bold text-emerald-900 flex items-center justify-center gap-1">
              <span>2-Up</span>
              <span className="text-[9px] bg-amber-200 text-amber-900 px-1 rounded font-black">50% बचत</span>
            </div>
            <div className="text-[10px] text-stone-500">2 कार्ड + ✂️ कटिंग</div>
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isScreenPrint) updateField('screenPrintMode', true);
              updateField('screenPrintImposition', '4-up');
            }}
            className={`p-2.5 rounded-xl border text-center transition ${
              data.screenPrintImposition === '4-up'
                ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/30 font-bold shadow-xs'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
            }`}
          >
            <div className="text-xs font-bold text-emerald-900 flex items-center justify-center gap-1">
              <span>4-Up</span>
              <span className="text-[9px] bg-red-200 text-red-900 px-1 rounded font-black">क्वाड</span>
            </div>
            <div className="text-[10px] text-stone-500">4 कार्ड (12×18/A4)</div>
          </button>
        </div>

        {/* Sheet Size & Cut Guide Toggle */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-stone-100">
          <div>
            <label className="block text-[11px] font-bold text-stone-700 mb-1">
              मास्टर कागज़ साइज़ (Sheet Size):
            </label>
            <select
              value={data.screenPrintSheetSize || 'a4'}
              onChange={(e) => updateField('screenPrintSheetSize', e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-stone-200 bg-stone-50 font-bold text-stone-800"
            >
              <option value="a4">A4 शीट (210 × 297 mm)</option>
              <option value="12x18">12 × 18 इंच मास्टर (305 × 457 mm)</option>
              <option value="natural">फिट टू कार्ड (Natural Card Bounds)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-200">
            <div>
              <div className="text-xs font-bold text-stone-800">✂️ कटिंग मार्क</div>
              <div className="text-[10px] text-stone-500">सेंटर डैश व कैंची निशान</div>
            </div>
            <input
              type="checkbox"
              checked={data.screenPrintShowCutMarks !== false}
              onChange={(e) => updateField('screenPrintShowCutMarks', e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 3. 🎨 2-रंग स्क्रीन प्रिंटिंग प्लेट सेपरेशन (Color Separation) */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Palette className="w-4 h-4 text-red-600" />
            <span>2-रंग स्क्रीन प्रिंटिंग प्लेट्स (Color Separation)</span>
          </div>
          <span className="text-[10.5px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full">
            2-Color Screen
          </span>
        </div>

        <p className="text-[11px] text-stone-600 leading-snug">
          लाल टेक्स्ट और गोल्डन बॉर्डर/गणेश जी को अलग-अलग स्क्रीन जाली पर एक्सपोज़ करने हेतु एक-क्लिक सेपरेशन। दोनों स्क्रीनों के रजिस्ट्रेशन क्रॉसहेयर्स `⌖` 100% सटीक अलाइन रहेंगे।
        </p>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              if (!isScreenPrint) updateField('screenPrintMode', true);
              updateField('screenPrintPlate', 'all');
            }}
            className={`p-2 rounded-xl border text-center transition ${
              (data.screenPrintPlate || 'all') === 'all'
                ? 'border-stone-900 bg-stone-900 text-white font-bold shadow-xs'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
            }`}
          >
            <div className="text-xs font-bold">🔘 सभी तत्व</div>
            <div className={`text-[9.5px] ${data.screenPrintPlate === 'all' ? 'text-stone-300' : 'text-stone-500'}`}>
              फुल मास्टर (1-Color)
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isScreenPrint) updateField('screenPrintMode', true);
              updateField('screenPrintPlate', 'text');
            }}
            className={`p-2 rounded-xl border text-center transition ${
              data.screenPrintPlate === 'text'
                ? 'border-red-700 bg-red-50 text-red-950 font-bold ring-2 ring-red-500/30 shadow-xs'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
            }`}
          >
            <div className="text-xs font-bold text-red-700">🔴 प्लेट 1 (टेक्स्ट)</div>
            <div className="text-[9.5px] text-stone-500">रेड इंक स्क्रीन मास्टर</div>
          </button>

          <button
            type="button"
            onClick={() => {
              if (!isScreenPrint) updateField('screenPrintMode', true);
              updateField('screenPrintPlate', 'motifs');
            }}
            className={`p-2 rounded-xl border text-center transition ${
              data.screenPrintPlate === 'motifs'
                ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold ring-2 ring-amber-500/30 shadow-xs'
                : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
            }`}
          >
            <div className="text-xs font-bold text-amber-800">🟡 प्लेट 2 (मोटिफ)</div>
            <div className="text-[9.5px] text-stone-500">गोल्ड बॉर्डर व गणेश जी</div>
          </button>
        </div>
      </div>

      {/* 4. ⬛ हॉट फॉयल स्टैम्पिंग व ब्लॉक मेकिंग (Hot Foil Die Master) */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Flame className="w-4 h-4 text-amber-600" />
            <span>हॉट फॉयल स्टैम्पिंग व ब्लॉक मेकिंग (Negative Master)</span>
          </div>
          <span className="text-[10.5px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
            Foil Die Ready
          </span>
        </div>

        <p className="text-[11px] text-stone-600 leading-snug">
          गोल्ड/सिल्वर फॉयल डाई (Zinc/Magnesium Hot Stamping Block) और Spot UV कोटिंग हेतु 100% सॉलिड ब्लैक बैकग्राउंड और व्हाइट टेक्स्ट/मोटिफ्स वाला रिवर्स मास्टर।
        </p>

        <div className="flex items-center justify-between p-3 rounded-xl bg-stone-950 text-white">
          <div>
            <div className="text-xs font-bold text-amber-300">⬛ रिवर्स डाई ब्लॉक मोड (Negative Film)</div>
            <div className="text-[10px] text-stone-400">100% D-Max ब्लैक बैकग्राउंड + 0% व्हाइट आर्टवर्क</div>
          </div>
          <input
            type="checkbox"
            checked={Boolean(data.screenPrintFoilMode)}
            onChange={(e) => {
              if (!isScreenPrint && e.target.checked) updateField('screenPrintMode', true);
              updateField('screenPrintFoilMode', e.target.checked);
              updateField('screenPrintInvert', e.target.checked);
            }}
            className="w-5 h-5 text-amber-500 rounded focus:ring-amber-400 cursor-pointer"
          />
        </div>
      </div>

      {/* 5. ⚡ CorelDRAW रेडी SVG एक्सपोर्ट (Text to Path / Curves) */}
      <div className="bg-gradient-to-r from-stone-900 to-red-950 text-white p-4 rounded-xl shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-200">
            <FileDown className="w-4 h-4 text-amber-400" />
            <span>CorelDRAW रेडी SVG (Text to Path / Curves)</span>
          </div>
          <span className="text-[10px] bg-amber-400 text-stone-950 font-black px-2 py-0.5 rounded-full uppercase">
            No Missing Fonts
          </span>
        </div>

        <p className="text-[11px] text-stone-300 leading-relaxed">
          कार्ड के सभी हिंदी शब्द, मात्राएं, श्लोक व मोटिफ्स 100% शुद्ध SVG <code>&lt;path&gt;</code> वेक्टर्स (Ctrl+Q) में एक्सपोर्ट होते हैं। कोरल ड्रॉ (CorelDRAW 12, X3, X7, 2024) में खोलने पर फॉन्ट मिसिंग की समस्या कभी नहीं आएगी।
        </p>

        <div className="text-[10.5px] bg-black/40 p-2.5 rounded-lg border border-white/10 text-amber-100 flex items-center gap-2">
          <span>💡</span>
          <span>सुझाव: CorelDRAW में <code>File &gt; Import (Ctrl+I)</code> करें, फिर <code>Ctrl+U</code> दबाकर किसी भी अक्षर या बॉर्डर को अलग-अलग एडिट कर सकते हैं।</span>
        </div>
      </div>

      {/* 6. 1-Click Master Presets */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>त्वरित प्रेस प्रोफाइल्स (1-Click Presets)</span>
          </div>
          <span className="text-[11px] text-stone-500">रेफरेंस सेटिंग्स</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {SCREEN_PRINT_PRESETS.map((preset) => {
            const isCurrent =
              isScreenPrint &&
              data.screenPrintInvert === preset.settings.screenPrintInvert &&
              data.screenPrintMirror === preset.settings.screenPrintMirror;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`p-3 rounded-xl border text-left transition flex items-start justify-between ${
                  isCurrent
                    ? 'border-amber-500 bg-amber-50/60 ring-1 ring-amber-500 shadow-sm'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50 hover:bg-stone-50'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900">{preset.name}</span>
                    <span className="bg-stone-200 text-stone-700 text-[9.5px] px-1.5 py-0.5 rounded font-semibold">
                      {preset.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                    {preset.description}
                  </p>
                </div>
                {isCurrent && <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Screen Printing Press Controls */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Sliders className="w-4 h-4 text-red-600" />
          <span>प्रेस मास्टर ऑप्शन्स (Screen & Offset Controls)</span>
        </div>

        <div className="space-y-3">
          {/* Mirror Image Toggle */}
          <div className="flex items-start justify-between p-3 rounded-lg bg-stone-50 border border-stone-200">
            <div className="pr-2">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <span>🪞 शीशा प्रभाव (Mirror Image / Flip Horizontal)</span>
                {data.screenPrintMirror && (
                  <span className="bg-red-100 text-red-700 text-[9.5px] px-1.5 py-0.2 rounded font-bold">
                    उल्टा प्रिंट
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                बटर पेपर पर उल्टा प्रिंट निकालें। एक्सपोज़र के समय टोनर सीधे स्क्रीन जाली (केमिकल) को छुएगा, जिससे लाइट लीकेज 0% हो जाएगी।
              </p>
            </div>
            <input
              type="checkbox"
              checked={Boolean(data.screenPrintMirror)}
              onChange={(e) => updateField('screenPrintMirror', e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer mt-1"
            />
          </div>

          {/* Registration & Crop Marks */}
          <div className="flex items-start justify-between p-3 rounded-lg bg-stone-50 border border-stone-200">
            <div className="pr-2">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <span>⌖ रजिस्ट्रेशन व कटिंग मार्क्स (Crop Marks & Crosshairs)</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                स्क्रीन प्रिंटिंग टेबल (अड्डा) पर कार्ड की सटीक अलाइनमेंट हेतु 4 कोनों पर L-मार्क्स और 4 दिशाओं में सेंटर क्रॉसहेयर्स `⌖` दिखाएं।
              </p>
            </div>
            <input
              type="checkbox"
              checked={data.screenPrintCropMarks !== false}
              onChange={(e) => updateField('screenPrintCropMarks', e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer mt-1"
            />
          </div>

          {/* Technical Master Information Header */}
          <div className="flex items-start justify-between p-3 rounded-lg bg-stone-50 border border-stone-200">
            <div className="pr-2">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <span>📄 प्रिंट मास्टर तकनीकी हेडर (Job & Scale Info)</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                कागज़ के शीर्ष पर जॉब नाम, कार्ड साइज़ (mm), 100% स्केल (Do Not Scale) और 600 DPI प्रिंट गाइड दिखाएं।
              </p>
            </div>
            <input
              type="checkbox"
              checked={data.screenPrintMasterInfo !== false}
              onChange={(e) => updateField('screenPrintMasterInfo', e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer mt-1"
            />
          </div>

          {/* Toner Density Boost */}
          <div className="flex items-start justify-between p-3 rounded-lg bg-stone-50 border border-stone-200">
            <div className="pr-2">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <span>⬛ डार्क टोनर बूस्ट (Maximum Black Density - D-Max)</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                बारीक अक्षरों और रेखाओं को एक्स्ट्रा डार्क बनाता है ताकि 120/140 मेश की स्क्रीन जाली में पिनहोल न बनें।
              </p>
            </div>
            <input
              type="checkbox"
              checked={data.screenPrintTonerBoost !== false}
              onChange={(e) => updateField('screenPrintTonerBoost', e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer mt-1"
            />
          </div>

          {/* Negative Mode */}
          <div className="flex items-start justify-between p-3 rounded-lg bg-stone-50 border border-stone-200">
            <div className="pr-2">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <span>🎞️ नेगेटिव फिल्म मोड (White on Black Film)</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                रिवर्स एक्सपोज़र अथवा स्पेशल ऑफसेट प्लेटों हेतु सफेद टेक्स्ट व काला बैकग्राउंड।
              </p>
            </div>
            <input
              type="checkbox"
              checked={Boolean(data.screenPrintInvert)}
              onChange={(e) => updateField('screenPrintInvert', e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer mt-1"
            />
          </div>

          {/* Butter Paper Preview Texture */}
          <div className="flex items-start justify-between p-3 rounded-lg bg-stone-50 border border-stone-200">
            <div className="pr-2">
              <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <span>📜 बटर पेपर टेक्सचर प्रीव्यू (Gateway Paper Tint)</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                स्क्रीन पर असली पारभासी 90 GSM गेटवे बटर पेपर का लुक दिखाता है। (प्रिंट/एक्सपोज़र के समय शुद्ध व्हाइट रहेगा)।
              </p>
            </div>
            <input
              type="checkbox"
              checked={data.screenPrintPaperEffect !== false}
              onChange={(e) => updateField('screenPrintPaperEffect', e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer mt-1"
            />
          </div>
        </div>
      </div>

      {/* 4. Motif Rendering Options */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Layers className="w-4 h-4 text-purple-600" />
          <span>स्क्रीन प्रिंटिंग मोटिफ रेंडरिंग (Motif Stencil Style)</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => updateField('screenPrintMotifStyle', 'silhouette')}
            className={`p-2.5 rounded-lg border text-left transition ${
              data.screenPrintMotifStyle !== 'lineart'
                ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-500 font-bold'
                : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            <div className="text-xs text-stone-900 font-bold">सॉलिड सिलुएट (Solid Black)</div>
            <div className="text-[10.5px] text-stone-500 mt-0.5">100% शुद्ध काला ब्लॉक (शून्य लाइट लीकेज)</div>
          </button>

          <button
            type="button"
            onClick={() => updateField('screenPrintMotifStyle', 'lineart')}
            className={`p-2.5 rounded-lg border text-left transition ${
              data.screenPrintMotifStyle === 'lineart'
                ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-500 font-bold'
                : 'border-stone-200 hover:border-stone-300'
            }`}
          >
            <div className="text-xs text-stone-900 font-bold">क्लासिक रेखाचित्र (High Contrast)</div>
            <div className="text-[10.5px] text-stone-500 mt-0.5">विस्तृत बारीक लाइन्स व हाई कंट्रास्ट</div>
          </button>
        </div>
      </div>

      {/* 5. Professional Printing Press Tips Card */}
      <div className="bg-amber-50/80 border border-amber-200/80 p-4 rounded-xl space-y-2.5">
        <div className="flex items-center gap-2 text-amber-950 font-bold text-xs">
          <Info className="w-4 h-4 text-amber-700" />
          <span>स्क्रीन प्रिंटिंग प्रेस कारीगरों हेतु आवश्यक सुझाव:</span>
        </div>

        <ul className="text-[11.5px] text-amber-900 space-y-1.5 list-disc list-inside leading-relaxed">
          <li><strong>कागज़ का चयन:</strong> हमेशा असली 90 GSM या 95 GSM गेटवे बटर पेपर (Gateway Tracing Paper) का ही उपयोग करें।</li>
          <li><strong>प्रिंटर सेटिंग्स:</strong> लेज़र प्रिंटर सेटिंग्स में <em>Paper Type = Transparency/Heavy</em> एवं <em>Toner Density = Darkest (1200 DPI)</em> रखें।</li>
          <li><strong>स्क्रीन मेश:</strong> शादी कार्ड के बारीक अक्षरों हेतु 120 मेश (No. 12) या 140 मेश (No. 14) नायलॉन जाली उपयुक्त होती है।</li>
          <li><strong>मिरर प्रिंटिंग:</strong> यदि आपने <em>शीशा प्रभाव (Mirror)</em> चुना है, तो प्रिंट निकलने के बाद टोनर वाली साइड को सीधे स्क्रीन की केमिकल कोटिंग पर रखकर एक्सपोज़ करें ताकि प्रकाश से धारदार किनारा बने।</li>
        </ul>
      </div>
    </div>
  );
}
