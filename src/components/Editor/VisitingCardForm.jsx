import React from 'react';
import { CreditCard, Scissors, Eye, Phone, Mail, Globe, MapPin } from 'lucide-react';

export default function VisitingCardForm({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const is10Up = data.bizCardViewMode === '10-up-sheet';

  return (
    <div className="space-y-4 text-xs">
      {/* 1. View Mode Switcher (Single ⇄ 10-Up A4 Sheet) */}
      <div className="p-3 bg-stone-900 text-white rounded-lg shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-xs text-amber-300 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>विज़िटिंग कार्ड प्रीव्यू मोड</span>
          </span>
          <span className="text-[10px] text-stone-400 font-mono">3.5" × 2" (89×51 mm)</span>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => updateField('bizCardViewMode', 'single')}
            className={`p-2 rounded border text-center font-bold text-xs transition flex items-center justify-center gap-1.5 ${
              !is10Up
                ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-xs'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>सिंगल कार्ड (1 Card)</span>
          </button>

          <button
            type="button"
            onClick={() => updateField('bizCardViewMode', '10-up-sheet')}
            className={`p-2 rounded border text-center font-bold text-xs transition flex items-center justify-center gap-1.5 ${
              is10Up
                ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-xs'
                : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
            }`}
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>10-Up A4 शीट (✂️)</span>
          </button>
        </div>
        <div className="text-[10.5px] text-stone-400 text-center leading-tight">
          {is10Up
            ? 'A4 पेपर पर 10 कार्ड्स कटिंग मार्क के साथ सज चुके हैं। PDF डाउनलोड करें।'
            : 'सिंगल कार्ड पर फॉन्ट और विवरण एडिट करें।'}
        </div>
      </div>

      {/* 2. Shop & Owner Details */}
      <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-3">
        <div className="font-bold text-stone-800 text-xs border-b pb-1">
          दुकान / कंपनी का नाम व पहचान
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">दुकान / कंपनी का नाम</label>
          <input
            type="text"
            value={data.bizCardShopName || ''}
            onChange={(e) => updateField('bizCardShopName', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded font-black text-xs"
            placeholder="शिवम डिजिटल स्टूडियो & प्रिंटिंग प्रेस"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">टैगलाइन / स्लोगन</label>
          <input
            type="text"
            value={data.bizCardTagline || ''}
            onChange={(e) => updateField('bizCardTagline', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs"
            placeholder="मल्टीकलर ऑफसेट, स्क्रीन प्रिंटिंग एवं शादी कार्ड विशेषज्ञ"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">संचालक / प्रोपराइटर</label>
            <input
              type="text"
              value={data.bizCardOwnerName || ''}
              onChange={(e) => updateField('bizCardOwnerName', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded font-bold text-xs"
              placeholder="सनी राज"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">पद (Designation)</label>
            <input
              type="text"
              value={data.bizCardDesignation || ''}
              onChange={(e) => updateField('bizCardDesignation', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs"
              placeholder="ग्राफिक डिजाइनर व प्रोपराइटर"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">इंक / थीम रंग</label>
            <select
              value={data.inkColor || '#0a2540'}
              onChange={(e) => updateField('inkColor', e.target.value)}
              className="w-full px-2 py-1.5 border rounded text-xs bg-white font-bold"
            >
              <option value="#0a2540">🔵 रॉयल नेवी (#0a2540)</option>
              <option value="#000000">⚫ क्लासिक ब्लैक (#000000)</option>
              <option value="#7a0c18">🍷 गहरा महरून (#7a0c18)</option>
              <option value="#1b5e20">🌲 फॉरेस्ट ग्रीन (#1b5e20)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">कार्ड पेपर रंग</label>
            <select
              value={data.paperColor || '#ffffff'}
              onChange={(e) => updateField('paperColor', e.target.value)}
              className="w-full px-2 py-1.5 border rounded text-xs bg-white"
            >
              <option value="#ffffff">⚪ ब्राइट व्हाइट</option>
              <option value="#fffef9">📜 हल्का आइवरी</option>
              <option value="#fffbf0">🪔 गोल्डन टिंट</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Contact & Services */}
      <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-3">
        <div className="font-bold text-stone-800 text-xs border-b pb-1">
          संपर्क विवरण एवं सेवाएँ (Services)
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">मोबाइल नंबर 1</label>
            <input
              type="text"
              value={data.bizCardPhone1 || ''}
              onChange={(e) => updateField('bizCardPhone1', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs font-mono"
              placeholder="7739553339"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">मोबाइल नंबर 2</label>
            <input
              type="text"
              value={data.bizCardPhone2 || ''}
              onChange={(e) => updateField('bizCardPhone2', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs font-mono"
              placeholder="9876543210"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">ईमेल</label>
            <input
              type="text"
              value={data.bizCardEmail || ''}
              onChange={(e) => updateField('bizCardEmail', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs font-mono"
              placeholder="riseprint77@gmail.com"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">वेबसाइट</label>
            <input
              type="text"
              value={data.bizCardWebsite || ''}
              onChange={(e) => updateField('bizCardWebsite', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs font-mono"
              placeholder="www.riseprint.in"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">दुकान का पूरा पता</label>
          <input
            type="text"
            value={data.bizCardAddress || ''}
            onChange={(e) => updateField('bizCardAddress', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs"
            placeholder="मेन मार्केट चौराहा, चेरों मोड़, सरमेरा (नालन्दा) बिहार"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">मुख्य सेवाएँ / डीलिंग इन (Services)</label>
          <input
            type="text"
            value={data.bizCardServices || ''}
            onChange={(e) => updateField('bizCardServices', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs"
            placeholder="शादी कार्ड • बिल बुक • फ्लेक्स बैनर • विज़िटिंग कार्ड • स्क्रीन प्रिंटिंग"
          />
        </div>
      </div>
    </div>
  );
}
