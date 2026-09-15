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
  Info
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

      {/* 2. 1-Click Master Presets */}
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
