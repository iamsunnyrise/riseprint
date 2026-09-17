import React from 'react';
import { PRODUCT_TYPES } from '../../utils/defaultData';
import { Check, Sparkles } from 'lucide-react';

export default function ProductSuiteSelector({ currentProductType = 'wedding', onSelectProduct }) {
  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-900">
        <div className="font-bold flex items-center gap-1.5 text-amber-950">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>ऑल-इन-वन प्रिंटिंग शॉप उत्पाद सुइट (Multi-Product Suite)</span>
        </div>
        <p className="mt-1 text-[11px] text-amber-800 leading-relaxed">
          अपनी दुकान पर आने वाले किसी भी प्रिंटिंग आर्डर के लिए नीचे से उत्पाद चुनें। सभी उत्पादों के लिए 300 DPI PDF, PNG और 600 DPI बटर पेपर एक्सपोर्ट तुरंत उपलब्ध हैं।
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {PRODUCT_TYPES.map((prod) => {
          const isSelected = (currentProductType || 'wedding') === prod.id;
          return (
            <div
              key={prod.id}
              onClick={() => onSelectProduct(prod.id)}
              className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-start justify-between group ${
                isSelected
                  ? 'border-red-700 bg-red-50/70 shadow-xs ring-1 ring-red-700/30'
                  : 'border-stone-200 bg-white hover:border-stone-400 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`text-2xl p-2 rounded-md ${
                    isSelected ? 'bg-red-800 text-white shadow-xs' : 'bg-stone-100 group-hover:scale-105 transition-transform'
                  }`}
                >
                  {prod.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-stone-900">
                      {prod.name}
                    </h3>
                    <span
                      className={`text-[9.5px] px-1.5 py-0.2 rounded font-bold ${
                        isSelected
                          ? 'bg-amber-400 text-red-950'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {prod.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="ml-2 flex-shrink-0 mt-1">
                {isSelected ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-red-700 bg-white px-2 py-0.5 rounded-full border border-red-200 shadow-2xs">
                    <Check className="w-3 h-3 text-red-700" />
                    <span>सक्रिय</span>
                  </span>
                ) : (
                  <span className="text-[10.5px] font-semibold text-stone-400 group-hover:text-stone-700">
                    चुनें →
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
