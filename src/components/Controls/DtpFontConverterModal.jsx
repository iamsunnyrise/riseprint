import React, { useState, useEffect } from 'react';
import { X, Copy, Check, ArrowRightLeft, Sparkles, Printer, FileText, Download } from 'lucide-react';
import { convertText, exportAllCardTextToDtp } from '../../utils/dtpFontConverters';

export default function DtpFontConverterModal({ isOpen, onClose, cardData }) {
  const [sourceFormat, setSourceFormat] = useState('unicode');
  const [targetFormat, setTargetFormat] = useState('krutidev');
  const [inputText, setInputText] = useState('शुभ विवाह - चि० बिट्टू संग सौ० पूजा');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [allCardCopied, setAllCardCopied] = useState(false);

  // Auto convert when inputs change
  useEffect(() => {
    if (!inputText) {
      setOutputText('');
      return;
    }
    const converted = convertText(inputText, sourceFormat, targetFormat);
    setOutputText(converted);
  }, [inputText, sourceFormat, targetFormat]);

  if (!isOpen) return null;

  const handleSwap = () => {
    const tempFormat = sourceFormat;
    setSourceFormat(targetFormat);
    setTargetFormat(tempFormat);
    setInputText(outputText);
  };

  const handleCopyOutput = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAllCardText = (format) => {
    const fullText = exportAllCardTextToDtp(cardData, format);
    navigator.clipboard.writeText(fullText);
    setAllCardCopied(true);
    setTimeout(() => setAllCardCopied(false), 2200);
  };

  const handleLoadCurrentCard = () => {
    const sample = `${cardData?.subTitle || 'शुभ विवाह'}\nवर: ${cardData?.groomName || 'बिट्टू कुमार'}\nपिता: ${cardData?.groomFather || 'श्री मन्नु पासवान'}\nवधू: ${cardData?.brideName || 'पूजा कुमारी'}\nपिता: ${cardData?.brideFather || 'श्री रमेश प्रसाद'}\nग्राम: ${cardData?.groomVillage || 'चेरों'} ${cardData?.groomThana || 'नालंदा'}`;
    setSourceFormat('unicode');
    setInputText(sample);
  };

  const formatLabels = {
    unicode: 'यूनिकोड (Unicode / मंगल / सामान्य हिंदी)',
    krutidev: 'कृतिदेव 010 (Kruti Dev 010 - CorelDRAW)',
    chanakya: 'चाणक्य (Chanakya - DTP Font)',
    shreelipi: 'श्रीलिपि (ShreeLipi / Shree-Dev)'
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-300 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950 via-stone-900 to-red-950 text-amber-100 px-5 py-3.5 flex items-center justify-between border-b border-amber-600/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 font-bold">
              ⚡
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>DTP प्रेस फॉन्ट कनवर्टर (Font Converter)</span>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  CorelDRAW & Press Tool
                </span>
              </h2>
              <p className="text-[11px] text-amber-200/80">
                कृतिदेव (KrutiDev 010) ⇄ चाणक्य (Chanakya) ⇄ श्रीलिपि (ShreeLipi) ⇄ यूनिकोड
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-stone-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs sm:text-sm">
          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200">
            <div className="flex items-center gap-1.5 text-amber-950 font-semibold">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>प्रेस ऑपरेटर क्विक एक्शन:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleLoadCurrentCard}
                className="bg-white hover:bg-stone-50 border border-amber-300 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-2xs transition"
              >
                📝 कार्ड का डेटा यहाँ लाएं
              </button>
              <button
                type="button"
                onClick={() => handleCopyAllCardText('krutidev')}
                className="bg-red-800 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-xs transition flex items-center gap-1"
                title="पूरा कार्ड KrutiDev 010 में कन्वर्ट कर क्लिपबोर्ड में कॉपी करें"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{allCardCopied ? '✓ पूरा कार्ड कॉपी हुआ!' : 'पूरा कार्ड KrutiDev में कॉपी'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleCopyAllCardText('chanakya')}
                className="bg-stone-800 hover:bg-stone-700 text-stone-100 px-2.5 py-1 rounded-lg text-xs font-semibold shadow-xs transition"
              >
                चाणक्य में कॉपी
              </button>
            </div>
          </div>

          {/* Format Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
            {/* From Format */}
            <div className="sm:col-span-2">
              <label className="block text-stone-600 font-semibold mb-1 text-xs">स्रोत फॉन्ट (इनपुट):</label>
              <select
                value={sourceFormat}
                onChange={(e) => setSourceFormat(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg font-semibold text-stone-900 focus:ring-2 focus:ring-red-500"
              >
                <option value="unicode">{formatLabels.unicode}</option>
                <option value="krutidev">{formatLabels.krutidev}</option>
                <option value="chanakya">{formatLabels.chanakya}</option>
                <option value="shreelipi">{formatLabels.shreelipi}</option>
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center sm:pt-4">
              <button
                type="button"
                onClick={handleSwap}
                className="p-2 rounded-full bg-stone-100 hover:bg-amber-100 border border-stone-300 hover:border-amber-400 text-stone-700 transition"
                title="अदला-बदली करें (Swap)"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* To Format */}
            <div className="sm:col-span-2">
              <label className="block text-stone-600 font-semibold mb-1 text-xs">लक्षित फॉन्ट (आउटपुट):</label>
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-300 rounded-lg font-semibold text-stone-900 focus:ring-2 focus:ring-red-500"
              >
                <option value="krutidev">{formatLabels.krutidev}</option>
                <option value="chanakya">{formatLabels.chanakya}</option>
                <option value="shreelipi">{formatLabels.shreelipi}</option>
                <option value="unicode">{formatLabels.unicode}</option>
              </select>
            </div>
          </div>

          {/* Textareas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Input Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700">मूल टेक्स्ट (यहाँ लिखें या पेस्ट करें):</span>
                <span className="text-[10px] text-stone-500 font-mono">{inputText.length} अक्षर</span>
              </div>
              <textarea
                rows={6}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full p-3 text-xs sm:text-sm font-mono bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="यहाँ टेक्स्ट पेस्ट करें..."
              />
            </div>

            {/* Output Box */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700">कनवर्ट किया हुआ टेक्स्ट ({targetFormat.toUpperCase()}):</span>
                <button
                  type="button"
                  onClick={handleCopyOutput}
                  className="flex items-center gap-1 text-xs text-red-700 hover:text-red-900 font-bold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'कॉपी हो गया!' : 'कॉपी करें'}</span>
                </button>
              </div>
              <textarea
                readOnly
                rows={6}
                value={outputText}
                className="w-full p-3 text-xs sm:text-sm font-mono bg-stone-100 border border-stone-300 rounded-xl focus:outline-none text-stone-900"
                placeholder="कनवर्टेड टेक्स्ट यहाँ आएगा..."
              />
            </div>
          </div>

          {/* CorelDRAW Printing Press Instructions Card */}
          <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-xl space-y-1.5 text-xs text-stone-700">
            <div className="font-bold text-stone-900 flex items-center gap-1.5">
              <Printer className="w-4 h-4 text-red-700" />
              <span>CorelDRAW / PageMaker / Photoshop में उपयोग की विधि:</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-[11.5px] leading-relaxed text-stone-600">
              <li>यहाँ से कनवर्ट किया हुआ <b>कृतिदेव 010 (Kruti Dev)</b> टेक्स्ट कॉपी करें।</li>
              <li>CorelDRAW या PageMaker में टेक्स्ट टूल लेकर पेस्ट (Ctrl+V) करें।</li>
              <li>पेस्ट किए गए टेक्स्ट को सेलेक्ट करें और फॉन्ट लिस्ट में <b>"Kruti Dev 010"</b> या <b>"Chanakya"</b> फॉन्ट सेट करें।</li>
              <li>आपका टेक्स्ट बिल्कुल सही भारतीय शैली में शादी कार्ड स्क्रीन प्रिंटिंग के लिए तैयार हो जाएगा!</li>
            </ol>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-100 border-t border-stone-200 px-5 py-3 flex items-center justify-between">
          <span className="text-[11px] text-stone-500 hidden sm:inline">
            शॉर्टकट: <b>Ctrl+G</b> दबाकर आप सीधे फॉर्म में इंग्लिश से हिंदी टाइप कर सकते हैं।
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-900 text-white font-semibold text-xs transition ml-auto"
          >
            बंद करें
          </button>
        </div>
      </div>
    </div>
  );
}
