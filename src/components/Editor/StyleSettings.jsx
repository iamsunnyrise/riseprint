import React, { useRef } from 'react';
import {
  Palette,
  Layout,
  Type,
  CheckCircle,
  Image as ImageIcon,
  Scroll,
  Sparkles,
  Upload,
  Trash2,
  Sliders,
  ShieldCheck,
  Eye
} from 'lucide-react';
import {
  CARD_SIZES,
  COLOR_THEMES,
  PAPER_TEXTURE_PRESETS,
  WATERMARK_PRESETS
} from '../../utils/defaultData';

export default function StyleSettings({ data, onChange }) {
  const watermarkFileInputRef = useRef(null);

  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const applyTheme = (theme) => {
    onChange({
      ...data,
      themeId: theme.id,
      inkColor: theme.inkColor,
      paperColor: theme.paperColor,
      borderColor: theme.borderColor
    });
  };

  // Handle Custom Watermark Image Upload
  const handleWatermarkUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('कृपया 5MB से छोटी इमेज चुनें।');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange({
        ...data,
        watermarkCustomUrl: event.target?.result,
        watermarkPreset: 'custom',
        enableWatermark: true
      });
    };
    reader.readAsDataURL(file);
  };

  const handleClearCustomWatermark = () => {
    onChange({
      ...data,
      watermarkCustomUrl: null,
      watermarkPreset: 'radha-krishna'
    });
  };

  const fonts = [
    { id: 'Rozha One', name: 'Rozha One (पारम्परिक शादी फॉन्ट - Bold Calligraphy)', style: "'Rozha One', serif" },
    { id: 'Yatra One', name: 'Yatra One (विंटेज भारतीय प्रेस शैली)', style: "'Yatra One', cursive" },
    { id: 'Tiro Devanagari Hindi', name: 'Tiro Devanagari (क्लासिक एलिगेंट सेरिफ)', style: "'Tiro Devanagari Hindi', serif" },
    { id: 'Noto Serif Devanagari', name: 'Noto Serif (साफ-सुथरा व गरिमापूर्ण)', style: "'Noto Serif Devanagari', serif" },
    { id: 'Gotu', name: 'Gotu (मॉडर्न राउंडेड देवनागरी)', style: "'Gotu', sans-serif" }
  ];

  const watermarkTintOptions = [
    { id: 'gold-tint', name: 'शाही स्वर्ण', color: '#cda339', subtitle: 'Royal Gold' },
    { id: 'sindoor-tint', name: 'सिन्दूरी लाल', color: '#a61515', subtitle: 'Sindoor Red' },
    { id: 'ink-tint', name: 'इंक मैचिंग', color: data.inkColor || '#a61515', subtitle: 'Card Ink' },
    { id: 'monochrome', name: 'चारकोल', color: '#555555', subtitle: 'Charcoal' }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Standard Indian Card Sizes */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Layout className="w-4 h-4 text-red-600" />
          <span>कार्ड प्रिंट साइज़ (Standard Print Size)</span>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(CARD_SIZES).map(([key, size]) => {
            const isSelected = data.sizeKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => updateField('sizeKey', key)}
                className={`flex items-start justify-between p-3 rounded-xl border text-left transition ${
                  isSelected
                    ? 'border-red-600 bg-red-50/70 shadow-sm ring-1 ring-red-600'
                    : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                    {size.name}
                    {key === '7x9' && (
                      <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded font-semibold">
                        फोटो मैच
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">{size.description}</div>
                </div>
                {isSelected && <CheckCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Color Themes & Inks */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Palette className="w-4 h-4 text-amber-600" />
          <span>पारम्परिक प्रेस रंग योजना (Ink & Paper Themes)</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {COLOR_THEMES.map((theme) => {
            const isSelected = data.themeId === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => applyTheme(theme)}
                className={`p-2.5 rounded-lg border text-left transition flex items-center gap-2.5 ${
                  isSelected
                    ? 'border-red-600 bg-red-50/70 ring-1 ring-red-600'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div
                  className="w-7 h-7 rounded-full border shadow-inner flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: theme.paperColor, borderColor: theme.inkColor }}
                >
                  <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: theme.inkColor }} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold truncate text-stone-800">{theme.name}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Ink Color Picker */}
        <div className="pt-2 border-t flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-700">कस्टम इंक रंग (Custom Ink):</span>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={data.inkColor}
              onChange={(e) => updateField('inkColor', e.target.value)}
              className="w-8 h-8 rounded border cursor-pointer"
            />
            <span className="text-xs font-mono text-stone-500 uppercase">{data.inkColor}</span>
          </div>
        </div>
      </div>

      {/* 3. 🪔 Authentic Indian Paper Textures */}
      <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Scroll className="w-4 h-4 text-amber-700" />
            <span>पारम्परिक पेपर टेक्सचर (Paper Stocks)</span>
          </div>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
            5 प्रेस वैरायटी
          </span>
        </div>
        <p className="text-xs text-stone-500">
          भारतीय प्रिंटिंग प्रेस में उपयोग होने वाले खादी, जरी सिल्क व डैमास्क पेपर का वास्तविक अहसास:
        </p>

        <div className="grid grid-cols-1 gap-2.5">
          {PAPER_TEXTURE_PRESETS.map((stock) => {
            const isSelected = (data.paperTexture || 'smooth-matte') === stock.id;
            return (
              <button
                key={stock.id}
                type="button"
                onClick={() => updateField('paperTexture', stock.id)}
                className={`p-3 rounded-xl border text-left transition flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/80 ring-2 ring-amber-500/40 shadow-sm'
                    : 'border-stone-200 hover:border-amber-300 bg-stone-50/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Swatch Circle */}
                  <div
                    className="w-9 h-9 rounded-lg border border-amber-300 shadow-inner flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: stock.color }}
                  >
                    <div className="text-amber-800 font-serif font-bold text-xs opacity-70">
                      {stock.badge}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900">{stock.name}</span>
                      <span className="text-[9.5px] bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded font-semibold">
                        {stock.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 truncate mt-0.5">{stock.subtitle}</div>
                  </div>
                </div>
                {isSelected && <CheckCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Sync Texture with Envelope Toggle */}
        <label className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/60 cursor-pointer text-xs mt-2">
          <div className="flex items-center gap-2 text-stone-800 font-medium">
            <span>✉️ शादी के लिफाफे पर भी यही पेपर टेक्सचर लागू करें</span>
          </div>
          <input
            type="checkbox"
            checked={data.syncTextureToEnvelope !== false}
            onChange={(e) => updateField('syncTextureToEnvelope', e.target.checked)}
            className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
          />
        </label>
      </div>

      {/* 4. 🕉️ Sacred Central Watermark (पावन पृष्ठभूमि वॉटरमार्क) */}
      <div className="bg-white p-4 rounded-xl border border-red-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span>पावन पृष्ठभूमि वॉटरमार्क (Central Watermark)</span>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={data.enableWatermark !== false}
              onChange={(e) => updateField('enableWatermark', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        {data.enableWatermark !== false ? (
          <div className="space-y-4 pt-1">
            <p className="text-xs text-stone-500">
              कार्ड के केंद्र में अत्यंत सूक्ष्म (Subtle) मांगलिक रेखाचित्र, जो अक्षरों को पढ़े जाने में बाधा दिए बिना कार्ड को राजसी रूप देता है:
            </p>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 gap-2">
              {WATERMARK_PRESETS.map((wm) => {
                const isSelected = (data.watermarkPreset || 'radha-krishna') === wm.id;
                return (
                  <button
                    key={wm.id}
                    type="button"
                    onClick={() => updateField('watermarkPreset', wm.id)}
                    className={`p-2.5 rounded-xl border text-left transition flex flex-col justify-between ${
                      isSelected
                        ? 'border-red-600 bg-red-50/80 ring-2 ring-red-500/30 shadow-sm'
                        : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-base">{wm.icon}</span>
                      {isSelected && <CheckCircle className="w-3.5 h-3.5 text-red-600" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900 leading-tight">{wm.name}</div>
                      <div className="text-[10px] text-stone-500 truncate mt-0.5">{wm.subtitle}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom Watermark Upload UI if preset is 'custom' */}
            {(data.watermarkPreset === 'custom' || data.watermarkCustomUrl) && (
              <div className="p-3 bg-red-50/50 rounded-xl border border-red-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                  <span>कस्टम इमेज या मोनोग्राम अपलोड:</span>
                  {data.watermarkCustomUrl && (
                    <button
                      type="button"
                      onClick={handleClearCustomWatermark}
                      className="text-red-700 hover:text-red-800 text-[11px] flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>हटाएं</span>
                    </button>
                  )}
                </div>

                <input
                  type="file"
                  ref={watermarkFileInputRef}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleWatermarkUpload}
                  className="hidden"
                />

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => watermarkFileInputRef.current?.click()}
                    className="flex-1 py-2 px-3 border-2 border-dashed border-red-300 rounded-lg hover:border-red-500 bg-white text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                  >
                    <Upload className="w-3.5 h-3.5 text-red-600" />
                    <span>इमेज चुनें (JPG/PNG)</span>
                  </button>

                  {data.watermarkCustomUrl && (
                    <div className="w-10 h-10 rounded-lg border border-red-300 overflow-hidden bg-white p-0.5 flex-shrink-0">
                      <img
                        src={data.watermarkCustomUrl}
                        alt="Watermark Preview"
                        className="w-full h-full object-contain filter grayscale"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Watermark Opacity Slider */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-red-600" />
                  <span>पारदर्शिता (Opacity):</span>
                </span>
                <span className="font-bold font-mono text-red-700 bg-red-100/70 px-2 py-0.5 rounded text-[11px]">
                  {Math.round((data.watermarkOpacity ?? 0.06) * 100)}% {Math.round((data.watermarkOpacity ?? 0.06) * 100) <= 8 ? '(सर्वोत्तम)' : ''}
                </span>
              </div>
              <input
                type="range"
                min="0.03"
                max="0.15"
                step="0.01"
                value={data.watermarkOpacity ?? 0.06}
                onChange={(e) => updateField('watermarkOpacity', parseFloat(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>3% (अति सूक्ष्म)</span>
                <span className="text-amber-700 font-semibold">6% (सुझावित आदर्श)</span>
                <span>15% (गहरा)</span>
              </div>
            </div>

            {/* Watermark Scale Slider */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-700 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                  <span>आकार व ज़ूम (Scale):</span>
                </span>
                <span className="font-bold font-mono text-stone-800 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                  {data.watermarkScale ?? 100}%
                </span>
              </div>
              <input
                type="range"
                min="60"
                max="140"
                step="5"
                value={data.watermarkScale ?? 100}
                onChange={(e) => updateField('watermarkScale', parseInt(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>60% (छोटा)</span>
                <span>100% (सामान्य)</span>
                <span>140% (विशाल)</span>
              </div>
            </div>

            {/* Watermark Color Tint Selection */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-semibold text-stone-700">वॉटरमार्क शेड (Color Tint):</span>
              <div className="grid grid-cols-2 gap-2">
                {watermarkTintOptions.map((tint) => {
                  const isSelected = (data.watermarkColor || 'gold-tint') === tint.id;
                  return (
                    <button
                      key={tint.id}
                      type="button"
                      onClick={() => updateField('watermarkColor', tint.id)}
                      className={`p-2 rounded-lg border text-left transition flex items-center gap-2 ${
                        isSelected
                          ? 'border-red-600 bg-red-50/70 ring-1 ring-red-600 font-bold'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0 border"
                        style={{ backgroundColor: tint.color }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs text-stone-800 truncate">{tint.name}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Screen print safety note */}
            <div className="flex items-center gap-1.5 p-2 bg-stone-100 rounded-lg text-[10.5px] text-stone-600">
              <ShieldCheck className="w-3.5 h-3.5 text-stone-500 flex-shrink-0" />
              <span>बटर पेपर मोड ऑन करने पर वॉटरमार्क स्वतः हट जाता है ताकि स्क्रीन प्रिंटिंग 100% साफ निकले।</span>
            </div>
          </div>
        ) : (
          <p className="text-xs text-stone-400 italic">
            वॉटरमार्क बंद है। सक्रिय करने हेतु ऊपर का स्विच ऑन करें।
          </p>
        )}
      </div>

      {/* 5. Typography Selection */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Type className="w-4 h-4 text-purple-600" />
          <span>शीर्षक फॉन्ट (Devanagari Heading Typography)</span>
        </div>

        <div className="space-y-1.5">
          {fonts.map((f) => {
            const isSelected = data.headingFont === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => updateField('headingFont', f.id)}
                className={`w-full p-2.5 rounded-lg border text-left transition flex items-center justify-between ${
                  isSelected
                    ? 'border-red-600 bg-red-50/70 ring-1 ring-red-600'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <span className="text-xs font-medium text-stone-800" style={{ fontFamily: f.style }}>
                  {f.name}
                </span>
                {isSelected && <CheckCircle className="w-4 h-4 text-red-600" />}
              </button>
            );
          })}
        </div>

        <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-[11.5px] text-amber-900 leading-relaxed">
          ⚡ <b>प्रेस ऑपरेटर व CorelDRAW यूजर्स:</b> यदि आप अपनी प्रिंटिंग प्रेस में <b>Kruti Dev 010</b>, <b>Chanakya</b> या <b>ShreeLipi</b> फॉन्ट का प्रयोग करते हैं, तो ऊपर हेडर में दिए गए <b>'कृतिदेव / DTP कनवर्टर'</b> बटन से पूरा शादी कार्ड 1-क्लिक में कनवर्ट कर कॉपी कर सकते हैं।
        </div>
      </div>

      {/* 6. Traditional Motif Toggles */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <ImageIcon className="w-4 h-4 text-teal-600" />
          <span>पारम्परिक मोटिफ्स ऑन/ऑफ (Motif Elements)</span>
        </div>

        <div className="space-y-2">
          {[
            { key: 'showGaneshaBadge', label: 'श्री गणेश जी का रंगीन बैज (Top-Left Badge)' },
            { key: 'showBananaTrees', label: 'कदली स्तम्भ (केले के पेड़ - Left & Right)' },
            { key: 'showGroomHorseMotif', label: 'घोड़ी पर दूल्हा (Baraat Horse Motif)' },
            { key: 'showSangKalashMotif', label: 'संग शहनाई एवं कलश (Sang Kalash)' },
            { key: 'showMandapMotif', label: 'विवाह मंडप एवं फेरे (Mandap Motif)' },
            { key: 'showSwastik', label: 'स्वास्तिक चिह्न (卐)' }
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between p-2 rounded-lg bg-stone-50 hover:bg-stone-100 cursor-pointer text-xs"
            >
              <span className="font-medium text-stone-800">{item.label}</span>
              <input
                type="checkbox"
                checked={data[item.key]}
                onChange={(e) => updateField(item.key, e.target.checked)}
                className="w-4 h-4 text-red-600 rounded focus:ring-red-500 cursor-pointer"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
