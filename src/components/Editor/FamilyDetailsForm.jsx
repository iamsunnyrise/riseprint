import React from 'react';
import { Users, Printer, Sparkles, Heart, Smile } from 'lucide-react';
import { BAAL_MANUHAR_PRESETS, SWAGATOTSUK_TITLE_PRESETS } from '../../utils/defaultData';
import HindiInput from '../Controls/HindiInput';
import HindiTextarea from '../Controls/HindiTextarea';

export default function FamilyDetailsForm({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleApplyBaalManuharPreset = (preset) => {
    onChange({
      ...data,
      baalManuharQuote: preset.quote,
      baalManuharKids: preset.kids
    });
  };

  return (
    <div className="space-y-5 text-sm text-stone-700">
      {/* 1. दर्शनाभिलाषी (Darshanabhilashi) */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider">
          <Users className="w-4 h-4 text-red-600" />
          <span>दर्शनाभिलाषी (Well-Wishers)</span>
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">शीर्षक (Title)</label>
          <HindiInput
            type="text"
            value={data.darshanabhilashiTitle || ''}
            onChange={(e) => updateField('darshanabhilashiTitle', e.target.value)}
            className="w-full px-3 py-1.5 text-xs font-bold border rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none"
            placeholder="darshanabhilashi -> दर्शनाभिलाषी"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            सदस्यों व परिजनों के नाम (एक पंक्ति में अथवा कॉमा लगाकर)
          </label>
          <HindiTextarea
            rows={3}
            value={data.darshanabhilashiNames || ''}
            onChange={(e) => updateField('darshanabhilashiNames', e.target.value)}
            className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none leading-relaxed"
            placeholder="sanjay paswan, sudhir paswan, pawan paswan..."
          />
        </div>
      </div>

      {/* 2. स्वागतोत्सुक (Swagatotsuk - Welcoming Relatives / Friends) */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider">
            <Heart className="w-4 h-4 text-red-600" />
            <span>स्वागतोत्सुक (Welcoming Relatives / Hosts)</span>
          </div>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <span className="text-[11px] font-semibold text-stone-600">दिखाएं</span>
            <input
              type="checkbox"
              checked={data.showSwagatotsuk !== false}
              onChange={(e) => updateField('showSwagatotsuk', e.target.checked)}
              className="w-3.5 h-3.5 text-red-600 rounded accent-red-600 cursor-pointer"
            />
          </label>
        </div>

        {data.showSwagatotsuk !== false && (
          <div className="space-y-3 pt-1 border-t border-stone-100">
            {/* Title with Presets */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">शीर्षक (Title)</label>
              <div className="flex gap-1.5 mb-1.5 overflow-x-auto pb-1 scrollbar-none">
                {SWAGATOTSUK_TITLE_PRESETS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => updateField('swagatotsukTitle', t)}
                    className={`text-[10px] px-2 py-0.5 rounded-full border transition whitespace-nowrap ${
                      data.swagatotsukTitle === t
                        ? 'bg-red-700 text-white border-red-700 font-bold'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <HindiInput
                type="text"
                value={data.swagatotsukTitle || ''}
                onChange={(e) => updateField('swagatotsukTitle', e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-bold border rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none"
                placeholder="swagatotsuk -> स्वागतोत्सुक"
              />
            </div>

            {/* Names */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                स्वागतकर्ताओं / भ्रातृगण / मित्र मण्डली के नाम
              </label>
              <HindiTextarea
                rows={2}
                value={data.swagatotsukNames || ''}
                onChange={(e) => updateField('swagatotsukNames', e.target.value)}
                className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none leading-relaxed"
                placeholder="vikas paswan, amit, rahul, sunny evam samast mitra mandali"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. आकांक्षी (Aakankshi) */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider">
          <Users className="w-4 h-4 text-red-600" />
          <span>आकांक्षी / विनीत (Host / Family Head)</span>
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">शीर्षक</label>
          <HindiInput
            type="text"
            value={data.aakankshiTitle || ''}
            onChange={(e) => updateField('aakankshiTitle', e.target.value)}
            className="w-full px-3 py-1.5 text-xs font-bold border rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none"
            placeholder="aakankshi -> आकांक्षी"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            आकांक्षी नाम एवं पता
          </label>
          <HindiTextarea
            rows={3}
            value={data.aakankshiNames || ''}
            onChange={(e) => updateField('aakankshiNames', e.target.value)}
            className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none leading-relaxed"
            placeholder="mannu paswan, gram cheron, sarmera (nalanda)"
          />
        </div>
      </div>

      {/* 4. बाल मनुहार (Baal Manuhar - Cute Children's Request) */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider">
            <Smile className="w-4 h-4 text-amber-600" />
            <span>👦 बाल मनुहार (Children's Affectionate Quotes)</span>
          </div>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <span className="text-[11px] font-semibold text-stone-600">कार्ड पर दिखाएं</span>
            <input
              type="checkbox"
              checked={data.showBaalManuhar !== false}
              onChange={(e) => updateField('showBaalManuhar', e.target.checked)}
              className="w-3.5 h-3.5 text-red-600 rounded accent-red-600 cursor-pointer"
            />
          </label>
        </div>

        {data.showBaalManuhar !== false && (
          <div className="space-y-3 pt-1 border-t border-stone-100">
            {/* Toggle for Envelope */}
            <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg bg-amber-50/60 border border-amber-200">
              <div>
                <div className="text-xs font-bold text-stone-800">
                  शादी के लिफाफे (Envelope) पर भी बाल मनुहार दिखाएं
                </div>
                <div className="text-[10.5px] text-stone-500">
                  "शादी में 'जलूल-जलूल' आना — बच्चे"
                </div>
              </div>
              <input
                type="checkbox"
                checked={data.showBaalManuharOnEnvelope !== false}
                onChange={(e) => updateField('showBaalManuharOnEnvelope', e.target.checked)}
                className="w-4 h-4 text-red-600 rounded accent-red-600 cursor-pointer"
              />
            </label>

            {/* Presets */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>पारंपरिक बाल शायरी प्रेसेट्स (1-Click Presets)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {BAAL_MANUHAR_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleApplyBaalManuharPreset(preset)}
                    className="text-left p-2 rounded-lg border border-stone-200 hover:border-red-500 hover:bg-red-50/50 transition text-xs flex flex-col justify-between group"
                  >
                    <div className="font-bold text-stone-800 group-hover:text-red-900 flex items-center gap-1">
                      <span>✨</span>
                      <span>{preset.title}</span>
                    </div>
                    <div className="text-[10.5px] text-stone-500 line-clamp-1 mt-0.5">
                      {preset.quote}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">शीर्षक</label>
              <HindiInput
                type="text"
                value={data.baalManuharTitle || 'बाल मनुहार'}
                onChange={(e) => updateField('baalManuharTitle', e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-bold border rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none"
                placeholder="bal manuhar -> बाल मनुहार"
              />
            </div>

            {/* Quote / Couplet */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                बाल मनुहार दोहा / कविता
              </label>
              <HindiTextarea
                rows={2}
                value={data.baalManuharQuote || ''}
                onChange={(e) => updateField('baalManuharQuote', e.target.value)}
                className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none leading-relaxed font-medium"
                placeholder="भेज रहे हैं स्नेह निमंत्रण प्यारे तुम्हें बुलाने को..."
              />
            </div>

            {/* Children Names */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                बाल गोपाल / बच्चों के नाम
              </label>
              <HindiInput
                type="text"
                value={data.baalManuharKids || ''}
                onChange={(e) => updateField('baalManuharKids', e.target.value)}
                className="w-full px-3 py-1.5 text-xs border rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none font-semibold"
                placeholder="kanha, laddu, pari, aarav evam samast bal gopal"
              />
            </div>
          </div>
        )}
      </div>

      {/* 5. Printing Press Line */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
        <div className="flex items-center gap-2 text-stone-800 font-bold text-xs uppercase tracking-wider">
          <Printer className="w-4 h-4 text-stone-600" />
          <span>प्रिंटिंग प्रेस विवरण (Press Line)</span>
        </div>
        <HindiInput
          type="text"
          value={data.pressLine || ''}
          onChange={(e) => updateField('pressLine', e.target.value)}
          className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none font-semibold"
          placeholder="pawan printing press, sarmera, nalanda, 7739553339"
        />
        <p className="text-[11px] text-stone-500">
          कार्ड के सबसे नीचे बारीक अक्षरों में पारंपरिक प्रेस की मुहर / विवरण
        </p>
      </div>
    </div>
  );
}
