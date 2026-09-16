import React, { useState } from 'react';
import { Copy, Check, Sparkles, Keyboard, Zap } from 'lucide-react';
import { useHindiTyping } from '../../context/HindiTypingContext';

export default function HindiKeyboardHelper({ onOpenDtpConverter }) {
  const { isHindiTyping, toggleHindiTyping } = useHindiTyping();
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
    <div className="bg-gradient-to-br from-amber-50/90 to-orange-50/70 p-3.5 rounded-xl border border-amber-200 text-xs space-y-3 shadow-xs">
      {/* Phonetic Typing Highlight Banner */}
      <div className="bg-white/90 p-2.5 rounded-lg border border-amber-300 shadow-2xs space-y-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-amber-950 font-bold">
            <Keyboard className="w-4 h-4 text-amber-700" />
            <span>स्मार्ट इंग्लिश ➔ हिंदी टाइपिंग (Phonetic Typing):</span>
          </div>
          <button
            type="button"
            onClick={toggleHindiTyping}
            className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] transition shadow-2xs border ${
              isHindiTyping
                ? 'bg-green-600 text-white border-green-700'
                : 'bg-stone-200 text-stone-700 border-stone-300 hover:bg-stone-300'
            }`}
          >
            {isHindiTyping ? '✓ चालू (ON)' : 'बंद (OFF)'}
          </button>
        </div>
        <p className="text-[11px] text-stone-600 leading-snug">
          अगर आपको हिंदी टाइपिंग नहीं आती, तो सीधे <b>English</b> में लिखें (जैसे: <code className="bg-amber-100 text-amber-900 px-1 py-0.2 rounded font-mono font-bold">bittu kumar</code>), Space दबाते ही वह तुरंत <span className="font-bold text-red-700">"बिट्टू कुमार"</span> बन जाएगा! (शॉर्टकट: <kbd className="bg-stone-200 px-1 rounded text-[10px] font-mono">Ctrl+G</kbd>)
        </p>
      </div>

      {/* DTP Press Converter Quick Access Button */}
      {onOpenDtpConverter && (
        <button
          type="button"
          onClick={onOpenDtpConverter}
          className="w-full bg-gradient-to-r from-red-900 via-red-800 to-red-900 hover:from-red-800 hover:to-red-700 text-amber-200 font-bold py-1.5 px-3 rounded-lg border border-amber-500/40 shadow-xs flex items-center justify-center gap-2 transition"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>DTP फॉन्ट कनवर्टर (कृतिदेव 010 / चाणक्य / श्रीलिपि)</span>
        </button>
      )}

      {/* Special Symbols & Copy */}
      <div className="flex items-center justify-between text-amber-950 font-bold pt-1">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>त्वरित कॉपी प्रतीक व शब्द:</span>
        </div>
        {copiedText && (
          <span className="text-[10.5px] text-green-700 font-semibold flex items-center gap-1">
            <Check className="w-3 h-3" /> कॉपी: "{copiedText}"
          </span>
        )}
      </div>

      <div>
        <div className="text-[10.5px] font-semibold text-stone-600 mb-1">विशेष वैवाहिक प्रतीक:</div>
        <div className="flex flex-wrap gap-1.5">
          {symbols.map((sym) => (
            <button
              key={sym}
              type="button"
              onClick={() => copyToClipboard(sym)}
              className="bg-white hover:bg-amber-100 border border-stone-200 hover:border-amber-400 px-2 py-0.5 rounded text-stone-800 font-bold text-xs transition"
              title="क्लिक करके कॉपी करें"
            >
              {sym}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[10.5px] font-semibold text-stone-600 mb-1">अक्सर प्रयुक्त होने वाले शब्द:</div>
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
