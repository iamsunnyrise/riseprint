import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Download,
  Copy,
  Check,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  MessageSquare,
  User,
  Phone,
  Building2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DraftProofModal({
  isOpen,
  onClose,
  data,
  onChange,
  onExportDraftPNG,
  isExporting = false
}) {
  const [copiedText, setCopiedText] = useState(false);
  const [checklist, setChecklist] = useState({
    names: true,
    dates: true,
    venue: true,
    family: true,
    shlokas: true
  });

  const clientName = data?.clientProofName || data?.groomFather || data?.groomName || 'आदरणीय ग्राहक';
  const pressName = data?.pressShopName || data?.pressName || 'राइज प्रिंटर्स एंड ग्राफिक्स';
  const pressPhone = data?.pressShopPhone || data?.pressPhone || '';
  const clientPhone = data?.clientProofPhone || '';

  // Generate standardized professional Hindi WhatsApp message
  const defaultMessage = `*श्री गणेशाय नमः* 🪔\n*विवाह निमंत्रण पत्र - कच्चा प्रूफ (Draft Proof)*\n\nसादर प्रणाम ${clientName} जी,\nआपके विवाह निमंत्रण पत्र का कच्चा प्रूफ (Draft Proof) अवलोकन हेतु तैयार है।\n\n⚠️ *कृपया निम्नलिखित ५ मुख्य बिंदुओं की विशेष जांच करें:*\n1. वर-वधू एवं माता-पिता के नाम व उपनाम\n2. मांगलिक तिथियां, दिनांक एवं वार (दिन)\n3. ग्राम, थाना, जिला व विवाह स्थल का पता\n4. दर्शनाभिलाषी, स्वागताकांक्षी व बाल मनुहार\n5. श्लोक, शायरी एवं हिंदी वर्तनी (Spellings)\n\n✅ *कार्ड देखने के उपरांत यदि कोई सुधार हो तो बताएं, अथवा 'OK / APPROVED' लिखकर भेजें ताकि फाइनल छपाई (Printing) प्रारंभ की जा सके।*\n\n⚠️ _नोट: छपाई पूर्ण होने के बाद किसी भी त्रुटि की जिम्मेदारी ग्राहक की होगी।_\n\nभवदीय,\n*${pressName}*${pressPhone ? `\n📞 संपर्क: ${pressPhone}` : ''}`;

  const [customMessage, setCustomMessage] = useState(defaultMessage);

  useEffect(() => {
    setCustomMessage(defaultMessage);
  }, [clientName, pressName, pressPhone]);

  if (!isOpen) return null;

  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const toggleChecklist = (key) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(customMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
    confetti({
      particleCount: 35,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  const handleOpenWhatsApp = () => {
    const cleanPhone = clientPhone.replace(/\D/g, '');
    const encoded = encodeURIComponent(customMessage);
    let url = '';
    if (cleanPhone.length >= 10) {
      const fullNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
      url = `https://api.whatsapp.com/send?phone=${fullNumber}&text=${encoded}`;
    } else {
      url = `https://api.whatsapp.com/send?text=${encoded}`;
    }
    window.open(url, '_blank');
  };

  const isApproved = data.proofStatus === 'approved';
  const isDraftMode = data.isDraftProofMode;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-stone-300 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-950 via-red-900 to-amber-950 text-white px-5 py-3.5 flex items-center justify-between border-b border-amber-500/40 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold">
              📑
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-amber-100 flex items-center gap-2">
                <span>कच्चा प्रूफ (Draft Approval) व WhatsApp</span>
                <span className="text-[10px] bg-amber-400 text-stone-950 font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Press Suite
                </span>
              </h2>
              <p className="text-[11px] text-amber-200/70">
                ग्राहक सत्यापन, सुरक्षा वॉटरमार्क एवं सीधा WhatsApp अप्रूवल इंजन
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-stone-800 text-xs">
          {/* 1. Status Switcher Card */}
          <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-stone-900 text-xs sm:text-sm flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-red-700" />
                <span>प्रूफ स्थिति व वॉटरमार्क नियंत्रण (Proof Status):</span>
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.isDraftProofMode}
                  onChange={(e) => updateField('isDraftProofMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-700"></div>
                <span className="ml-2 text-xs font-semibold text-stone-700">
                  {data.isDraftProofMode ? 'वॉटरमार्क चालू' : 'वॉटरमार्क बंद'}
                </span>
              </label>
            </div>

            {/* Status Selection Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  onChange({ ...data, isDraftProofMode: true, proofStatus: 'draft' });
                }}
                className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 ${
                  data.isDraftProofMode && !isApproved
                    ? 'border-red-600 bg-red-50/80 ring-2 ring-red-500/30 font-bold shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">🟡 कच्चा प्रूफ (Draft)</div>
                  <div className="text-[10.5px] text-stone-500">सुरक्षा वॉटरमार्क व अस्वीकरण सक्रिय</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onChange({ ...data, isDraftProofMode: true, proofStatus: 'approved' });
                }}
                className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2.5 ${
                  data.isDraftProofMode && isApproved
                    ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/30 font-bold shadow-xs'
                    : 'border-stone-200 hover:border-stone-300 bg-white'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">🟢 अंतिम स्वीकृत (Approved)</div>
                  <div className="text-[10.5px] text-stone-500">वॉटरमार्क मुक्त • 100% प्रिंट रेडी</div>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Client & Press Contact Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs">
            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-stone-500" />
                <span>ग्राहक का नाम (Client Name):</span>
              </label>
              <input
                type="text"
                value={data.clientProofName || ''}
                onChange={(e) => updateField('clientProofName', e.target.value)}
                placeholder="उदा. श्री मन्नु पासवान"
                className="w-full px-2.5 py-1.5 text-xs border rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>ग्राहक का WhatsApp नंबर (10 अंक):</span>
              </label>
              <input
                type="tel"
                value={data.clientProofPhone || ''}
                onChange={(e) => updateField('clientProofPhone', e.target.value)}
                placeholder="उदा. 9876543210"
                maxLength={13}
                className="w-full px-2.5 py-1.5 text-xs border rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-stone-500" />
                <span>आपकी प्रेस/दुकान का नाम:</span>
              </label>
              <input
                type="text"
                value={data.pressShopName || ''}
                onChange={(e) => updateField('pressShopName', e.target.value)}
                placeholder="उदा. राइज प्रिंटर्स एंड ग्राफिक्स"
                className="w-full px-2.5 py-1.5 text-xs border rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-stone-500" />
                <span>प्रेस का संपर्क नंबर:</span>
              </label>
              <input
                type="tel"
                value={data.pressShopPhone || ''}
                onChange={(e) => updateField('pressShopPhone', e.target.value)}
                placeholder="उदा. 9876543210"
                className="w-full px-2.5 py-1.5 text-xs border rounded-lg focus:ring-1 focus:ring-red-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* 3. 5-Point Verification Checklist */}
          <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/80 space-y-1.5">
            <div className="flex items-center justify-between text-amber-950 font-bold text-xs">
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>ग्राहक सत्यापन चेकलिस्ट (Verification Checklist):</span>
              </span>
              <span className="text-[10px] text-amber-800">WhatsApp संदेश में शामिल</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11.5px] text-stone-700 pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.names}
                  onChange={() => toggleChecklist('names')}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span>वर-वधू एवं माता-पिता के नाम व उपनाम</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.dates}
                  onChange={() => toggleChecklist('dates')}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span>मांगलिक तिथियां, दिनांक एवं वार (दिन)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.venue}
                  onChange={() => toggleChecklist('venue')}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span>ग्राम, थाना, जिला व विवाह स्थल का पता</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist.family}
                  onChange={() => toggleChecklist('family')}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span>दर्शनाभिलाषी, स्वागताकांक्षी व बाल मनुहार</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer sm:col-span-2">
                <input
                  type="checkbox"
                  checked={checklist.shlokas}
                  onChange={() => toggleChecklist('shlokas')}
                  className="rounded text-red-600 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span>श्लोक, शायरी एवं हिंदी व्याकरण/मात्राएँ</span>
              </label>
            </div>
          </div>

          {/* 4. Live WhatsApp Message Preview & Editor */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-stone-800 text-xs flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>तैयार WhatsApp संदेश (संदेश में संपादन कर सकते हैं):</span>
              </label>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 transition cursor-pointer"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>कॉपी हो गया!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>मैसेज कॉपी करें</span>
                  </>
                )}
              </button>
            </div>
            <textarea
              rows={6}
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full px-3 py-2 text-xs border rounded-xl font-sans bg-stone-50/80 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none leading-relaxed resize-none"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-100 p-3.5 sm:px-5 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2.5 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-200 transition cursor-pointer"
          >
            बंद करें
          </button>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Download Watermarked Draft Image Button */}
            <button
              type="button"
              onClick={onExportDraftPNG}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white text-stone-800 border border-stone-300 hover:bg-stone-50 hover:border-stone-400 transition shadow-xs cursor-pointer"
              title="वॉटरमार्क सहित कच्चा प्रूफ इमेज (JPG/PNG) डाउनलोड करें"
            >
              <Download className="w-3.5 h-3.5 text-red-700" />
              <span>{isExporting ? 'इमेज बन रही है...' : 'ड्राफ्ट इमेज डाउनलोड करें'}</span>
            </button>

            {/* Direct Open WhatsApp Button */}
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition cursor-pointer border border-emerald-500"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {clientPhone ? `WhatsApp भेजें (${clientPhone})` : 'WhatsApp पर भेजें'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
