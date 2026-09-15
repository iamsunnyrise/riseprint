import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';

export default function HindiKeyboardHelper() {
  const [copiedText, setCopiedText] = useState('');

  const symbols = ['卐', 'ॐ', '॥', '❦', '✿', '❖', '✦', '🚩', 'चि०', 'आयु०', 'सौ०', 'सु०', 'श्री'];

  const weddingWords = [
    'शुभ विवाह',
    'विवाह संस्कार',
    'हल्दी कलश',
    'मंडप एवं वंशरोपन',
    'घृतढारी',
    'बारात प्रस्थान',
    'तिलकोत्सव',
    'प्रीतिभोज',
    'विदाई',
    'दर्शनाभिलाषी',
    'आकांक्षी',
    'स्वागताकांक्षी',
    'बाल मनुहार',
    'स्नेही स्वजन',
    'सादर निमंत्रण',
    'सपरिवार उपस्थिति'
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 1800);
  };

  return (
    <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-xs space-y-2.5">
      <div className="flex items-center justify-between text-amber-950 font-bold">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>हिंदी शब्द व चिह्न त्वरित कॉपी टूल (Quick Copy)</span>
        </div>
        {copiedText && (
          <span className="text-[11px] text-green-700 font-semibold flex items-center gap-1">
            <Check className="w-3 h-3" /> कॉपी हो गया: "{copiedText}"
          </span>
        )}
      </div>

      {/* Special Symbols */}
      <div>
        <div className="text-[11px] font-semibold text-stone-600 mb-1">विशेष वैवाहिक प्रतीक:</div>
        <div className="flex flex-wrap gap-1.5">
          {symbols.map((sym) => (
            <button
              key={sym}
              type="button"
              onClick={() => copyToClipboard(sym)}
              className="bg-white hover:bg-amber-100 border border-stone-200 hover:border-amber-400 px-2 py-1 rounded text-stone-800 font-bold text-xs transition"
              title="क्लिक करके कॉपी करें"
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      {/* Common Wedding Words */}
      <div>
        <div className="text-[11px] font-semibold text-stone-600 mb-1">अक्सर प्रयुक्त होने वाले शब्द:</div>
        <div className="flex flex-wrap gap-1.5">
          {weddingWords.map((word) => (
            <button
              key={word}
              type="button"
              onClick={() => copyToClipboard(word)}
              className="bg-white hover:bg-red-50 border border-stone-200 hover:border-red-300 px-2 py-0.5 rounded text-stone-700 text-[11px] font-medium transition"
              title="क्लिक करके कॉपी करें"
            >
              {word}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
