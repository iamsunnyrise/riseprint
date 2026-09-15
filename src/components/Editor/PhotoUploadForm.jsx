import React, { useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  RotateCcw,
  Trash2,
  ZoomIn,
  Layout,
  CheckCircle2,
  ShieldCheck,
  Palette,
  Heart
} from 'lucide-react';
import { DEITY_PRESETS, DEMO_COUPLE_PHOTO } from '../../utils/deityAndPhotoPresets';

/**
 * Custom Image & Deity Photo Upload Editor Form
 */
export default function PhotoUploadForm({ data, onChange }) {
  const deityFileInputRef = useRef(null);
  const coupleFileInputRef = useRef(null);

  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // Handle Deity Photo Upload
  const handleDeityFileChange = (e) => {
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
        customDeityImage: event.target?.result,
        deityPresetId: 'custom',
        showGaneshaBadge: true
      });
    };
    reader.readAsDataURL(file);
  };

  // Reset Deity to Default Ganesha
  const handleResetDeity = () => {
    onChange({
      ...data,
      customDeityImage: null,
      deityPresetId: 'ganesha',
      showGaneshaBadge: true
    });
  };

  // Select Deity Preset
  const handleSelectDeityPreset = (preset) => {
    onChange({
      ...data,
      customDeityImage: preset.image,
      deityPresetId: preset.id,
      showGaneshaBadge: true
    });
  };

  // Handle Couple Photo Upload
  const handleCoupleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('कृपया 8MB से छोटी फोटो चुनें।');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange({
        ...data,
        couplePhotoUrl: event.target?.result,
        showCouplePhoto: true
      });
    };
    reader.readAsDataURL(file);
  };

  // Load Demo Couple Photo
  const handleLoadDemoCouplePhoto = () => {
    onChange({
      ...data,
      couplePhotoUrl: DEMO_COUPLE_PHOTO,
      showCouplePhoto: true
    });
  };

  const frames = [
    {
      id: 'royal-oval',
      name: 'स्वर्णिम अंडाकार (Royal Oval Locket)',
      desc: 'मोती दाना किनारी व विंटेज गोल्ड बॉर्डर (सर्वाधिक लोकप्रिय)'
    },
    {
      id: 'jharokha',
      name: 'शाही झरोखा (Rajasthani Arch)',
      desc: 'कलश व नक्काशीदार तोरण मेहराब'
    },
    {
      id: 'circle-floral',
      name: 'पुष्प चक्र (Floral Wreath)',
      desc: 'गेंदा व चमेली की शुभ मालाओं से सुसज्जित'
    }
  ];

  const frameColors = [
    { id: '#d4af37', name: 'शाही गोल्ड (Gold)' },
    { id: '#a61515', name: 'सिन्दूरी लाल (Red)' },
    { id: '#7a0c18', name: 'रॉयल मैरून (Maroon)' },
    { id: '#94a3b8', name: 'सिल्वर जरी (Silver)' }
  ];

  return (
    <div className="space-y-6">
      {/* 1. KULDEVI / ISHTA-DEVATA SECTION */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <span className="text-base">🛕</span>
            <span>इष्टदेवता / कुलदेवी चित्र (Top Deity Medallion)</span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={data.showGaneshaBadge !== false}
              onChange={(e) => updateField('showGaneshaBadge', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>

        <p className="text-[11.5px] text-stone-600 leading-snug">
          कार्ड व शादी के लिफाफे के शीर्ष कोने में 3D स्वर्ण मेडलियन के भीतर अपने इष्टदेव, कुलदेवी या भगवान की फोटो लगाएं।
        </p>

        {/* Upload Custom Deity Image Button */}
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="file"
            ref={deityFileInputRef}
            onChange={handleDeityFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => deityFileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold px-3 py-2 rounded-lg text-xs transition shadow-sm"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>अपनी कुलदेवी / भगवान की फोटो अपलोड करें</span>
          </button>

          {data.customDeityImage && (
            <button
              type="button"
              onClick={handleResetDeity}
              className="flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold px-3 py-2 rounded-lg text-xs transition"
              title="मूल गणेश जी पर रीसेट करें"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>रीसेट</span>
            </button>
          )}
        </div>

        {/* 7 Sacred Deity Presets */}
        <div className="space-y-2 pt-2 border-t">
          <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>पवित्र देव प्रेसेट्स (Quick Deity Presets):</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {DEITY_PRESETS.map((preset) => {
              const isSelected =
                (!data.customDeityImage && preset.id === 'ganesha') ||
                data.deityPresetId === preset.id;

              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectDeityPreset(preset)}
                  className={`p-2 rounded-lg border text-left transition flex items-center justify-between ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-500 font-bold'
                      : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-xs text-stone-900 font-bold truncate">
                      {preset.name}
                    </div>
                    <div className="text-[10px] text-stone-500 truncate">
                      {preset.badge}
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. BRIDE & GROOM COUPLE PHOTO SECTION */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
            <Heart className="w-4 h-4 text-red-600" />
            <span>वर-वधू युगल फोटो (Bride & Groom Photo)</span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={Boolean(data.showCouplePhoto)}
              onChange={(e) => updateField('showCouplePhoto', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        <p className="text-[11.5px] text-stone-600 leading-snug">
          शादी कार्ड में वर-वधू की खूबसूरत फोटो लगाएं। पारम्परिक भारतीय स्वर्णिम लॉकेट फ्रेम या राजस्थानी झरोखे में बिल्कुल परफेक्ट बैठती है।
        </p>

        {/* Upload Couple Photo Controls */}
        <div className="space-y-2.5">
          <input
            type="file"
            ref={coupleFileInputRef}
            onChange={handleCoupleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => coupleFileInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800 text-white font-bold px-3 py-2 rounded-lg text-xs transition shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>दूल्हा-दुल्हन की फोटो अपलोड करें</span>
            </button>

            <button
              type="button"
              onClick={handleLoadDemoCouplePhoto}
              className="flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold px-2.5 py-2 rounded-lg text-xs transition"
              title="डेमो वर-वधू चित्र लोड करें"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>डेमो फोटो</span>
            </button>

            {data.showCouplePhoto && (
              <button
                type="button"
                onClick={() => updateField('showCouplePhoto', false)}
                className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-700 font-semibold px-2.5 py-2 rounded-lg text-xs transition"
                title="फोटो छुपाएं"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>हटाएं</span>
              </button>
            )}
          </div>
        </div>

        {/* Framing & Positioning (Visible when couple photo is active) */}
        {data.showCouplePhoto && (
          <div className="space-y-4 pt-2 border-t">
            {/* Frame Style Selection */}
            <div>
              <div className="text-xs font-bold text-stone-800 mb-1.5 flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5 text-purple-600" />
                <span>पारम्परिक फोटो फ्रेम (Frame Style):</span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {frames.map((f) => {
                  const isSelected = (data.couplePhotoFrame || 'royal-oval') === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => updateField('couplePhotoFrame', f.id)}
                      className={`p-2.5 rounded-lg border text-left transition flex items-start justify-between ${
                        isSelected
                          ? 'border-red-600 bg-red-50/70 ring-1 ring-red-600'
                          : 'border-stone-200 hover:border-stone-300 bg-stone-50/50'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-stone-900">{f.name}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5">{f.desc}</div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Placement Options */}
            <div>
              <div className="text-xs font-bold text-stone-800 mb-1.5 flex items-center gap-1.5">
                <Layout className="w-3.5 h-3.5 text-teal-600" />
                <span>कार्ड पर स्थान (Placement on Card):</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateField('couplePhotoPlacement', 'center-motif')}
                  className={`p-2 rounded-lg border text-left transition ${
                    data.couplePhotoPlacement !== 'dedicated-banner'
                      ? 'border-red-600 bg-red-50/70 ring-1 ring-red-600 font-bold'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="text-xs text-stone-900">वर-वधू के मध्य</div>
                  <div className="text-[10px] text-stone-500">दूल्हा-दुल्हन विवरण के बीच (संतुलित)</div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField('couplePhotoPlacement', 'dedicated-banner')}
                  className={`p-2 rounded-lg border text-left transition ${
                    data.couplePhotoPlacement === 'dedicated-banner'
                      ? 'border-red-600 bg-red-50/70 ring-1 ring-red-600 font-bold'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="text-xs text-stone-900">समर्पित शाही बैनर</div>
                  <div className="text-[10px] text-stone-500">बड़ी तस्वीर (सील के ऊपर)</div>
                </button>
              </div>
            </div>

            {/* Zoom / Scale Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-1">
                <span className="flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-600" />
                  <span>फोटो ज़ूम / स्केल (Face Alignment):</span>
                </span>
                <span className="font-mono text-stone-600">{data.couplePhotoScale || 100}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="160"
                step="5"
                value={data.couplePhotoScale || 100}
                onChange={(e) => updateField('couplePhotoScale', Number(e.target.value))}
                className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                <span>80% (छोटा)</span>
                <span>100% (सामान्य)</span>
                <span>160% (बड़ा ज़ूम)</span>
              </div>
            </div>

            {/* Frame Color Selection */}
            <div>
              <div className="text-xs font-bold text-stone-800 mb-1.5 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-600" />
                <span>फ्रेम बॉर्डर रंग (Frame Color):</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {frameColors.map((c) => {
                  const isSelected = (data.couplePhotoBorderColor || '#d4af37') === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => updateField('couplePhotoBorderColor', c.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border transition ${
                        isSelected
                          ? 'border-red-600 bg-red-50 text-red-900 ring-1 ring-red-600'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: c.id }} />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. SCREEN PRINTING COMPATIBILITY */}
      <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-stone-800 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>स्क्रीन प्रिंटिंग / बटर पेपर सुरक्षा:</span>
          </div>

          <input
            type="checkbox"
            checked={data.hidePhotosInScreenPrint !== false}
            onChange={(e) => updateField('hidePhotosInScreenPrint', e.target.checked)}
            className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
          />
        </div>

        <p className="text-[11px] text-stone-600 leading-snug">
          बटर पेपर मोड सक्रिय होने पर युगल फोटो को स्वतः छुपाएं ताकि स्क्रीन जाली पर काली स्याही का धब्बा न बने। (डिजिटल व रंगीन कार्ड में फोटो हमेशा दिखेगी)।
        </p>
      </div>
    </div>
  );
}
