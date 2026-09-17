import React from 'react';
import { FileText, Palette, Hash, Phone, MapPin, Building, ShieldCheck } from 'lucide-react';

export default function BillBookForm({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. Notice Strip */}
      <div className="bg-blue-900 text-blue-100 p-2.5 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-300" />
          <div>
            <div className="font-bold text-white text-xs">दुकान व फर्म बिल बुक / कैश मेमो मास्टर</div>
            <div className="text-[10px] text-blue-200">सिंगल कलर ऑफसेट व स्क्रीन प्रिंटिंग मास्टर (Navy Blue / Black)</div>
          </div>
        </div>
      </div>

      {/* 2. Firm Identity */}
      <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-3">
        <div className="font-bold text-stone-800 text-xs border-b pb-1">
          दुकान / फर्म की पहचान
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">फर्म / दुकान का पूरा नाम</label>
          <input
            type="text"
            value={data.billFirmName || ''}
            onChange={(e) => updateField('billFirmName', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded font-black text-xs"
            placeholder="श्री श्याम गारमेंट्स & साड़ी केंद्र"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">व्यवसाय / टैगलाइन (Nature of Business)</label>
          <input
            type="text"
            value={data.billTagline || ''}
            onChange={(e) => updateField('billTagline', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs"
            placeholder="फैंसी साड़ियाँ, सूट, लहंगा एवं कटपीस के थोक व फुटकर विक्रेता"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">प्रोपराइटर (Proprietor)</label>
            <input
              type="text"
              value={data.billProprietor || ''}
              onChange={(e) => updateField('billProprietor', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs"
              placeholder="पवन कुमार अग्रवाल"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">GSTIN / TIN (वैकल्पिक)</label>
            <input
              type="text"
              value={data.billGstNumber || ''}
              onChange={(e) => updateField('billGstNumber', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs font-mono uppercase"
              placeholder="10ABCDE1234F1Z5"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">मोबाइल नंबर 1</label>
            <input
              type="text"
              value={data.billPhone1 || ''}
              onChange={(e) => updateField('billPhone1', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs font-mono"
              placeholder="9876543210"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">मोबाइल नंबर 2</label>
            <input
              type="text"
              value={data.billPhone2 || ''}
              onChange={(e) => updateField('billPhone2', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs font-mono"
              placeholder="9431234567"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">दुकान / गोदाम का पता</label>
          <input
            type="text"
            value={data.billAddress || ''}
            onChange={(e) => updateField('billAddress', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs"
            placeholder="मेन मार्केट, निकट महावीर मंदिर, बिहार शरीफ (नालन्दा)"
          />
        </div>
      </div>

      {/* 3. Bill Format & Screen Ink */}
      <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-3">
        <div className="font-bold text-stone-800 text-xs border-b pb-1">
          बिल प्रारूप व छपाई इंक (Ink & Format)
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">बिल का प्रकार</label>
            <select
              value={data.billType || 'cash-memo'}
              onChange={(e) => updateField('billType', e.target.value)}
              className="w-full px-2 py-1.5 border rounded text-xs bg-white font-bold"
            >
              <option value="cash-memo">कैश मेमो (CASH MEMO)</option>
              <option value="bill-book">बिल बुक (BILL / INVOICE)</option>
              <option value="challan">चालान (CHALLAN)</option>
              <option value="estimate">कच्चा एस्टीमेट (ESTIMATE)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">कॉपी स्टाम्प</label>
            <select
              value={data.billCopyType || 'मूल प्रति (Original)'}
              onChange={(e) => updateField('billCopyType', e.target.value)}
              className="w-full px-2 py-1.5 border rounded text-xs bg-white"
            >
              <option value="मूल प्रति (Original)">मूल प्रति (Original)</option>
              <option value="दुकानदार प्रति (Duplicate)">दुकानदार प्रति (Duplicate)</option>
              <option value="ग्राहक प्रति (Customer Copy)">ग्राहक प्रति (Customer Copy)</option>
              <option value="ट्रिप्लिकेट प्रति (Triplicate)">ट्रिप्लिकेट प्रति (Triplicate)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">छपाई इंक रंग (Screen Ink)</label>
            <select
              value={data.billInkColor || '#0d47a1'}
              onChange={(e) => updateField('billInkColor', e.target.value)}
              className="w-full px-2 py-1.5 border rounded text-xs bg-white font-bold"
            >
              <option value="#0d47a1">🔵 क्लासिक नेवी ब्लू (#0d47a1)</option>
              <option value="#000000">⚫ जेट ब्लैक (#000000)</option>
              <option value="#b71c1c">🔴 क्लासिक रेड (#b71c1c)</option>
              <option value="#1b5e20">🟢 डार्क ग्रीन (#1b5e20)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">बिल क्रमांक प्रीफिक्स</label>
            <input
              type="text"
              value={data.billNoPrefix || 'No. 1042'}
              onChange={(e) => updateField('billNoPrefix', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs font-mono font-bold"
              placeholder="No. 1042"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">आइटम टेबल में खाली पंक्तियाँ (Rows)</label>
          <div className="flex gap-2">
            {[6, 8, 10, 12].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => updateField('billRowsCount', num)}
                className={`flex-1 py-1 rounded border text-center font-bold ${
                  (data.billRowsCount || 8) === num
                    ? 'bg-blue-800 text-white border-blue-900'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700'
                }`}
              >
                {num} पंक्तियाँ
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Terms & Signature */}
      <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-3">
        <div className="font-bold text-stone-800 text-xs border-b pb-1">
          नियम, शर्तें एवं हस्ताक्षर
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">दुकान के नियम व शर्तें (Terms & Conditions)</label>
          <textarea
            rows={4}
            value={data.billTerms || ''}
            onChange={(e) => updateField('billTerms', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs resize-none leading-relaxed"
            placeholder="1. बिका हुआ माल 7 दिन के अंदर ही बदला जाएगा..."
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">हस्ताक्षर टाइटल (Signature Text)</label>
          <input
            type="text"
            value={data.billSignTitle || ''}
            onChange={(e) => updateField('billSignTitle', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs"
            placeholder="हस्ताक्षर विक्रेता / For श्री श्याम गारमेंट्स"
          />
        </div>
      </div>
    </div>
  );
}
