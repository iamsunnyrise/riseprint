import React from 'react';
import {
  FileText,
  Palette,
  Hash,
  Phone,
  MapPin,
  Building,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  Layers,
  FileCheck
} from 'lucide-react';
import { BILL_TEMPLATES, PAPER_TINTS } from '../../utils/defaultData';

export default function BillBookForm({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const activeTemplate = data.billTemplate || 'school-fee';

  const handleSelectTemplate = (tmpl) => {
    onChange({
      ...data,
      ...tmpl.defaults
    });
  };

  const isSchoolFee = activeTemplate === 'school-fee';

  // Fee items helper
  const feeItems = data.schoolFeeItems || [];

  const updateFeeItem = (index, field, val) => {
    const updated = [...feeItems];
    updated[index] = { ...updated[index], [field]: val };
    
    // Calculate new total automatically if amounts are numbers
    let autoTotal = 0;
    updated.forEach(item => {
      const num = parseFloat(item.amountRs);
      if (!isNaN(num)) autoTotal += num;
    });

    onChange({
      ...data,
      schoolFeeItems: updated,
      schoolTotalAmount: autoTotal > 0 ? String(autoTotal) : data.schoolTotalAmount
    });
  };

  const addFeeItem = () => {
    const nextId = feeItems.length + 1;
    const newItem = { id: nextId, name: `New Fee Item ${nextId}`, amountRs: '', amountP: '' };
    onChange({
      ...data,
      schoolFeeItems: [...feeItems, newItem]
    });
  };

  const removeFeeItem = (index) => {
    if (feeItems.length <= 1) return;
    const updated = feeItems.filter((_, idx) => idx !== index);
    onChange({
      ...data,
      schoolFeeItems: updated
    });
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. Header Banner & Template Switcher */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-stone-900 text-white p-3 rounded-xl shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold">
              {isSchoolFee ? '🏫' : '📑'}
            </div>
            <div>
              <div className="font-bold text-white text-xs">
                {isSchoolFee ? 'स्कूल फीस डिमांड बिल व रसीद बुक' : 'दुकान व फर्म बिल बुक मास्टर'}
              </div>
              <div className="text-[10.5px] text-blue-200">
                {isSchoolFee
                  ? 'देव इंटरनेशनल स्कूल (नालन्दा) स्टाइल - 14 फीस मदें व रसीद कट्टा'
                  : 'सिंगल कलर ऑफसेट व स्क्रीन प्रिंटिंग मास्टर (Navy Blue / Black)'}
              </div>
            </div>
          </div>
          <span className="bg-blue-400/20 text-blue-200 text-[10px] px-2 py-0.5 rounded-full font-bold border border-blue-400/30">
            DTP रेडी
          </span>
        </div>

        {/* 5-Template Quick Switcher Tabs */}
        <div>
          <div className="text-[10px] text-blue-200 font-semibold mb-1.5 flex items-center gap-1">
            <Layers className="w-3 h-3 text-blue-300" />
            <span>रसीद व बिल टेम्पलेट चुनें (1-Click Templates):</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {BILL_TEMPLATES.map((tmpl) => {
              const isSelected = activeTemplate === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`px-2 py-1.5 rounded-lg text-left transition border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-400 shadow-sm font-bold'
                      : 'bg-white/10 hover:bg-white/20 text-stone-200 border-white/10'
                  }`}
                >
                  <span className="text-[11px] font-bold truncate">{tmpl.shortName}</span>
                  <span className="text-[9px] opacity-80 truncate">{tmpl.badge}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Paper Color Tint & Ink Selector */}
      <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between border-b pb-1">
          <span className="font-bold text-stone-900 text-xs flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-blue-600" />
            <span>कागज़ का रंग (Paper Tint) व स्याही</span>
          </span>
          <span className="text-[10.5px] text-stone-500 font-medium">रसीद बुक पेपर</span>
        </div>

        {/* Paper Tints */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          {PAPER_TINTS.map((tint) => {
            const isSelected = (data.billPaperTint || 'pink') === tint.id;
            return (
              <button
                key={tint.id}
                type="button"
                onClick={() => {
                  updateField('billPaperTint', tint.id);
                  if (tint.ink) updateField('billInkColor', tint.ink);
                }}
                className={`p-1.5 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                  isSelected
                    ? 'ring-2 ring-blue-600 font-bold shadow-xs'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
                style={{ backgroundColor: tint.color }}
              >
                <div
                  className="w-4 h-4 rounded-full border border-stone-300"
                  style={{ backgroundColor: tint.color }}
                />
                <span className="text-[10px] text-stone-800 leading-tight">{tint.name.split(' ')[0]} {tint.name.split(' ')[1]}</span>
              </button>
            );
          })}
        </div>

        {/* Ink Color Picker */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">छपाई स्याही का रंग (Print Ink)</label>
            <select
              value={data.billInkColor || '#1a237e'}
              onChange={(e) => updateField('billInkColor', e.target.value)}
              className="w-full px-2 py-1.5 border rounded text-xs bg-white font-bold"
            >
              <option value="#1a237e">🔵 नेवी ब्लू (#1a237e - फोटो मैच)</option>
              <option value="#0d47a1">🔷 रॉयल ब्लू (#0d47a1)</option>
              <option value="#000000">⚫ जेट ब्लैक (#000000 - बटर पेपर)</option>
              <option value="#b71c1c">🔴 क्लासिक रेड (#b71c1c)</option>
              <option value="#1b5e20">🟢 डार्क ग्रीन (#1b5e20)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">मोड (खाली बुक या भरा हुआ)</label>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => updateField('schoolBlankMode', false)}
                className={`flex-1 py-1 rounded border text-[10.5px] font-bold transition ${
                  !data.schoolBlankMode
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
                title="सैंपल भरा हुआ डेटा (रागिनी, II, ₹4200)"
              >
                📋 भरा हुआ
              </button>
              <button
                type="button"
                onClick={() => updateField('schoolBlankMode', true)}
                className={`flex-1 py-1 rounded border text-[10.5px] font-bold transition ${
                  data.schoolBlankMode
                    ? 'bg-blue-600 text-white border-blue-700'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
                title="छपाई हेतु खाली डॉटेड लाइनें"
              >
                ✏️ खाली कट्टा
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= CONDITION 1: SCHOOL FEE DEMAND BILL FORM ================= */}
      {isSchoolFee && (
        <>
          {/* 3. School Details */}
          <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <div className="font-bold text-stone-900 text-xs border-b pb-1 flex items-center justify-between">
              <span>🏫 स्कूल / संस्थान की जानकारी</span>
              <span className="text-[10px] text-stone-500 font-mono">हेडर विवरण</span>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">स्कूल / कॉलेज / संस्थान का नाम</label>
              <input
                type="text"
                value={data.schoolName || ''}
                onChange={(e) => updateField('schoolName', e.target.value)}
                className="w-full px-2.5 py-1.5 border rounded font-black text-xs uppercase"
                placeholder="DEV INTERNATIONAL PUBLIC SCHOOL"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">रिकॉर्ड कोड / U-DISE / Reg. Code</label>
                <input
                  type="text"
                  value={data.schoolRecCode || ''}
                  onChange={(e) => updateField('schoolRecCode', e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded text-xs font-mono"
                  placeholder="Rec. Code - 22913842023611104706"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">बिल शीर्षक (Demand Bill / रसीद)</label>
                <input
                  type="text"
                  value={data.schoolBillTitle || ''}
                  onChange={(e) => updateField('schoolBillTitle', e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded text-xs font-bold"
                  placeholder="Demand Bill"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">मोबाइल नंबर (शीर्ष दायां कोना)</label>
              <textarea
                rows={2}
                value={data.schoolPhone || ''}
                onChange={(e) => updateField('schoolPhone', e.target.value)}
                className="w-full px-2.5 py-1.5 border rounded text-xs font-mono resize-none leading-tight"
                placeholder="Mob.: 8969997450, 9128350273&#10;9741111766"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">स्कूल का पता (डार्क रिबन पट्टी)</label>
              <input
                type="text"
                value={data.schoolAddress || ''}
                onChange={(e) => updateField('schoolAddress', e.target.value)}
                className="w-full px-2.5 py-1.5 border rounded text-xs"
                placeholder="Dev Colony, SH-78, Sarmera, Nalanda 811104"
              />
            </div>
          </div>

          {/* 4. Student Meta (Name, Class, Adm No, Month) */}
          <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <div className="font-bold text-stone-900 text-xs border-b pb-1 flex items-center justify-between">
              <span>👨‍🎓 छात्र व रसीद विवरण</span>
              <span className="text-[10.5px] text-stone-500">डॉटेड लाइन्स</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">रसीद क्रमांक (No.-)</label>
                <input
                  type="text"
                  value={data.schoolReceiptNo || ''}
                  onChange={(e) => updateField('schoolReceiptNo', e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded text-xs font-mono"
                  placeholder="रिक्त या 1042"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">दिनांक (Date)</label>
                <input
                  type="text"
                  value={data.schoolDate || ''}
                  onChange={(e) => updateField('schoolDate', e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded text-xs font-mono font-bold"
                  placeholder="2/2 या रिक्त"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">छात्र का नाम (Name)</label>
                <input
                  type="text"
                  value={data.schoolStudentName || ''}
                  onChange={(e) => updateField('schoolStudentName', e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded text-xs font-bold"
                  placeholder="Ragini"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">नामांकन संख्या (Adm. No.)</label>
                <input
                  type="text"
                  value={data.schoolAdmNo || ''}
                  onChange={(e) => updateField('schoolAdmNo', e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded text-xs font-mono font-bold"
                  placeholder="T 1485"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">कक्षा (Class)</label>
                <input
                  type="text"
                  value={data.schoolClass || ''}
                  onChange={(e) => updateField('schoolClass', e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded text-xs font-bold"
                  placeholder="II"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">महीना व विवरण (Month)</label>
                <input
                  type="text"
                  value={data.schoolMonth || ''}
                  onChange={(e) => updateField('schoolMonth', e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded text-xs font-bold"
                  placeholder="Feb + Dues"
                />
              </div>
            </div>
          </div>

          {/* 5. 14 Fee Heads Table Manager */}
          <div className="p-3 bg-white rounded-xl border border-stone-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b pb-1">
              <span className="font-bold text-stone-900 text-xs">
                📋 14 मानक फीस मदें (Fee Heads Table)
              </span>
              <button
                type="button"
                onClick={addFeeItem}
                className="text-[10.5px] bg-blue-50 text-blue-800 hover:bg-blue-100 font-bold px-2 py-0.5 rounded border border-blue-200 flex items-center gap-1 transition"
              >
                <Plus className="w-3 h-3" />
                <span>मद जोड़ें</span>
              </button>
            </div>

            <p className="text-[10.5px] text-stone-500 leading-tight">
              स्कूल की आवश्यकता अनुसार फीस मदों के नाम बदलें, जोड़ें या डिफ़ॉल्ट राशि दर्ज करें।
            </p>

            <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
              {feeItems.map((item, idx) => (
                <div key={item.id || idx} className="flex items-center gap-1.5 bg-stone-50 p-1.5 rounded border border-stone-200">
                  <span className="w-5 text-[10px] font-bold font-mono text-stone-500 text-center">
                    {idx + 1}.
                  </span>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateFeeItem(idx, 'name', e.target.value)}
                    className="flex-1 px-2 py-1 bg-white border rounded text-xs font-medium"
                    placeholder="फीस मद का नाम"
                  />
                  <div className="w-20">
                    <input
                      type="text"
                      value={item.amountRs || ''}
                      onChange={(e) => updateFeeItem(idx, 'amountRs', e.target.value)}
                      className="w-full px-1.5 py-1 bg-white border rounded text-xs font-mono text-right"
                      placeholder="₹ राशि"
                    />
                  </div>
                  <div className="w-12">
                    <input
                      type="text"
                      value={item.amountP || ''}
                      onChange={(e) => updateFeeItem(idx, 'amountP', e.target.value)}
                      className="w-full px-1 py-1 bg-white border rounded text-[11px] font-mono text-center"
                      placeholder="पैसे"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFeeItem(idx)}
                    className="p-1 text-stone-400 hover:text-red-600 rounded"
                    title="हटाएं"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Total Row Summary */}
            <div className="flex items-center justify-between p-2 bg-blue-50/70 border border-blue-200 rounded-lg">
              <span className="font-black text-xs text-blue-950 uppercase">कुल योग (TOTAL):</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={data.schoolTotalAmount || '4200'}
                  onChange={(e) => updateField('schoolTotalAmount', e.target.value)}
                  className="w-24 px-2 py-1 bg-white border border-blue-300 rounded text-right font-black font-mono text-xs"
                  placeholder="कुल रुपये"
                />
                <span className="font-bold text-stone-500">.</span>
                <input
                  type="text"
                  value={data.schoolTotalPaise || '0'}
                  onChange={(e) => updateField('schoolTotalPaise', e.target.value)}
                  className="w-12 px-1 py-1 bg-white border border-blue-300 rounded text-center font-black font-mono text-xs"
                  placeholder="पैसे"
                />
              </div>
            </div>

            {/* Amount in words */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">रुपये शब्दों में (Amount in words)</label>
              <input
                type="text"
                value={data.schoolAmountInWords || ''}
                onChange={(e) => updateField('schoolAmountInWords', e.target.value)}
                className="w-full px-2.5 py-1.5 border rounded text-xs italic font-serif"
                placeholder="Four Thousand Two Hundred Rupees Only (या खाली छोड़ें)"
              />
            </div>
          </div>
        </>
      )}

      {/* ================= CONDITION 2: GENERAL RETAIL BILL BOOK FORM ================= */}
      {!isSchoolFee && (
        <>
          {/* Firm Identity */}
          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-3">
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

          {/* Bill Format & Ink */}
          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-3">
            <div className="font-bold text-stone-800 text-xs border-b pb-1">
              बिल प्रारूप व सेटिंग्स
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
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">बिल क्रमांक प्रीफिक्स</label>
                <input
                  type="text"
                  value={data.billNoPrefix || 'No. 1042'}
                  onChange={(e) => updateField('billNoPrefix', e.target.value)}
                  className="w-full px-2.5 py-1.5 border rounded text-xs font-mono font-bold"
                  placeholder="No. 1042"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-600 mb-1">आइटम टेबल में पंक्तियाँ</label>
                <div className="flex gap-1">
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
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Signature */}
          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-3">
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
        </>
      )}
    </div>
  );
}
