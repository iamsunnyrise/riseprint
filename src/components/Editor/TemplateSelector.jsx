import React, { useState } from 'react';
import { Layers, CheckCircle2, Sparkles, Heart, Crown, Bell, Calendar, ArrowRight } from 'lucide-react';
import { CARD_TEMPLATES } from '../../utils/defaultData';

export default function TemplateSelector({ currentData, onSelectTemplate }) {
  const [selectedId, setSelectedId] = useState('template-groom-classic');
  const [appliedNotice, setAppliedNotice] = useState('');

  const handleApply = (template) => {
    setSelectedId(template.id);
    onSelectTemplate(template.data);
    setAppliedNotice(`"${template.name}" सफलतापूर्वक लागू हो गया!`);
    setTimeout(() => setAppliedNotice(''), 3000);
  };

  const getTemplateIcon = (category) => {
    if (category.includes('वधू')) return Heart;
    if (category.includes('सगाई') || category.includes('तिलक')) return Bell;
    if (category.includes('रॉयल')) return Crown;
    if (category.includes('प्रीतिभोज')) return Sparkles;
    return Calendar;
  };

  return (
    <div className="space-y-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-900 to-amber-900 text-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-5 h-5 text-amber-300" />
          <h3 className="font-bold text-base text-amber-100">रेडीमेड हिंदी शादी कार्ड टेम्पलेट्स</h3>
        </div>
        <p className="text-xs text-amber-200/80">
          अपनी आवश्यकतानुसार टेम्पलेट चुनें। इसमें सभी श्लोक, शायरी, कार्यक्रम व फॉर्मेट पहले से सेट हैं।
        </p>
      </div>

      {appliedNotice && (
        <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-2 shadow-sm animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{appliedNotice}</span>
        </div>
      )}

      {/* Templates Grid */}
      <div className="space-y-3">
        {CARD_TEMPLATES.map((tpl) => {
          const Icon = getTemplateIcon(tpl.category);
          const isSelected = selectedId === tpl.id;

          return (
            <div
              key={tpl.id}
              className={`p-4 rounded-xl border transition-all duration-200 bg-white relative shadow-sm ${
                isSelected
                  ? 'border-red-600 ring-2 ring-red-600/30 shadow-md bg-red-50/20'
                  : 'border-stone-200 hover:border-red-300 hover:shadow'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                    style={{ backgroundColor: tpl.accentColor }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900 leading-tight">
                      {tpl.name}
                    </h4>
                    <span className="text-[10px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full mt-0.5 inline-block">
                      {tpl.category}
                    </span>
                  </div>
                </div>

                <span
                  className="text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white flex-shrink-0"
                  style={{ backgroundColor: tpl.accentColor }}
                >
                  {tpl.badge}
                </span>
              </div>

              <p className="text-xs text-stone-600 mb-3 leading-relaxed">
                {tpl.description}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tpl.accentColor }} />
                  <span>{tpl.data.headingFont} फॉन्ट</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleApply(tpl)}
                  className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-sm ${
                    isSelected
                      ? 'bg-red-700 hover:bg-red-800 text-white'
                      : 'bg-stone-100 hover:bg-red-50 text-stone-800 hover:text-red-700 border border-stone-300'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>लागू है (Active)</span>
                    </>
                  ) : (
                    <>
                      <span>यह टेम्पलेट चुनें</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
