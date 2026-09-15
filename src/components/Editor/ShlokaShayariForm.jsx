import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { SHLOKA_PRESETS, SHAYARI_PRESETS } from '../../utils/defaultData';

export default function ShlokaShayariForm({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const applyShlokaPreset = (preset) => {
    onChange({
      ...data,
      shlokaLeft: preset.left,
      shlokaRight: preset.right
    });
  };

  const applyShayariPreset = (preset) => {
    onChange({
      ...data,
      shayariLeft1: preset.left1,
      shayariLeft2: preset.left2,
      shayariRight1: preset.right1,
      shayariRight2: preset.right2
    });
  };

  return (
    <div className="space-y-5">
      {/* Top Invocation */}
      <div className="bg-red-50/50 p-4 rounded-xl border border-red-200">
        <label className="block text-xs font-semibold text-stone-700 mb-1">
          शीर्ष आह्वान (Top Invocation)
        </label>
        <input
          type="text"
          value={data.topInvocation}
          onChange={(e) => updateField('topInvocation', e.target.value)}
          className="w-full px-3 py-2 text-sm font-bold border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
        />
      </div>

      {/* Top Shloka (विष्णु / गणेश श्लोक) */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
            <BookOpen className="w-4 h-4 text-red-600" />
            <span>शीर्ष मंगलाचरण श्लोक</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-stone-500">प्रीसेट:</span>
            <select
              className="text-xs bg-stone-50 border rounded px-2 py-1"
              onChange={(e) => {
                const selected = SHLOKA_PRESETS.find((p) => p.title === e.target.value);
                if (selected) applyShlokaPreset(selected);
              }}
            >
              <option value="">श्लोक चुनें...</option>
              {SHLOKA_PRESETS.map((p) => (
                <option key={p.title} value={p.title}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">बायाँ श्लोक</label>
            <textarea
              rows={2}
              value={data.shlokaLeft}
              onChange={(e) => updateField('shlokaLeft', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border rounded-md focus:ring-1 focus:ring-red-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-1">दायाँ श्लोक</label>
            <textarea
              rows={2}
              value={data.shlokaRight}
              onChange={(e) => updateField('shlokaRight', e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border rounded-md focus:ring-1 focus:ring-red-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Wedding Shayari (वैवाहिक शायरी / दोहे) */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>वैवाहिक शायरी (Side-by-side Poetry)</span>
          </div>
          <select
            className="text-xs bg-stone-50 border rounded px-2 py-1"
            onChange={(e) => {
              const selected = SHAYARI_PRESETS.find((p) => p.title === e.target.value);
              if (selected) applyShayariPreset(selected);
            }}
          >
            <option value="">शायरी प्रीसेट...</option>
            {SHAYARI_PRESETS.map((p) => (
              <option key={p.title} value={p.title}>
                {p.title}
              </option>
            ))}
          </select>
        </div>

        {/* Left Shayari */}
        <div className="bg-stone-50/70 p-3 rounded-lg border">
          <span className="text-xs font-bold text-stone-700 block mb-1.5">बाईं शायरी</span>
          <input
            type="text"
            value={data.shayariLeft1}
            onChange={(e) => updateField('shayariLeft1', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs border rounded-md mb-2 focus:ring-1 focus:ring-red-500 focus:outline-none"
            placeholder="लाइन 1"
          />
          <input
            type="text"
            value={data.shayariLeft2}
            onChange={(e) => updateField('shayariLeft2', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs border rounded-md focus:ring-1 focus:ring-red-500 focus:outline-none"
            placeholder="लाइन 2"
          />
        </div>

        {/* Right Shayari */}
        <div className="bg-stone-50/70 p-3 rounded-lg border">
          <span className="text-xs font-bold text-stone-700 block mb-1.5">दाईं शायरी</span>
          <input
            type="text"
            value={data.shayariRight1}
            onChange={(e) => updateField('shayariRight1', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs border rounded-md mb-2 focus:ring-1 focus:ring-red-500 focus:outline-none"
            placeholder="लाइन 1"
          />
          <input
            type="text"
            value={data.shayariRight2}
            onChange={(e) => updateField('shayariRight2', e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs border rounded-md focus:ring-1 focus:ring-red-500 focus:outline-none"
            placeholder="लाइन 2"
          />
        </div>
      </div>

      {/* Middle Shloka (सर्व मंगल मांगल्ये...) */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
        <label className="block text-xs font-bold text-stone-700">
          मध्य श्लोक (Middle Shloka - सर्व मंगल मांगल्ये...)
        </label>
        <input
          type="text"
          value={data.middleShlokaLine1}
          onChange={(e) => updateField('middleShlokaLine1', e.target.value)}
          className="w-full px-2.5 py-1.5 text-xs border rounded-md mb-1 focus:ring-1 focus:ring-red-500 focus:outline-none"
        />
        <input
          type="text"
          value={data.middleShlokaLine2}
          onChange={(e) => updateField('middleShlokaLine2', e.target.value)}
          className="w-full px-2.5 py-1.5 text-xs border rounded-md focus:ring-1 focus:ring-red-500 focus:outline-none"
        />
      </div>
    </div>
  );
}
