import React from 'react';
import { Upload, Trash2, Plus, Calendar, Clock, MapPin, User, Image as ImageIcon } from 'lucide-react';

export default function ShokSandeshForm({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateField('shokPhotoUrl', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEvent = () => {
    const newEvents = [
      ...(data.shokEvents || []),
      { name: 'नया कार्यक्रम', date: 'दिनांक: ...', time: 'समय: ...', location: 'स्थान: ...' }
    ];
    updateField('shokEvents', newEvents);
  };

  const handleUpdateEvent = (index, key, value) => {
    const updated = [...(data.shokEvents || [])];
    updated[index] = { ...updated[index], [key]: value };
    updateField('shokEvents', updated);
  };

  const handleRemoveEvent = (index) => {
    const updated = (data.shokEvents || []).filter((_, i) => i !== index);
    updateField('shokEvents', updated);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. Urgent Fast Print Notice Banner */}
      <div className="bg-stone-900 text-amber-200 p-2.5 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">🕊️</span>
          <div>
            <div className="font-bold text-white text-xs">शोक संदेश व तेरहवीं (1-घंटे की त्वरित छपाई)</div>
            <div className="text-[10px] text-stone-300">ब्लैक-एंड-व्हाइट व स्क्रीन प्रिंटिंग मास्टर के लिए पूरी तरह अनुकूलित</div>
          </div>
        </div>
      </div>

      {/* 2. Invocation & Subheading */}
      <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-3">
        <div className="font-bold text-stone-800 text-xs border-b pb-1">
          शीर्ष मंगलाचरण एवं भूमिका
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">शीर्षक / मंत्र</label>
            <input
              type="text"
              value={data.shokInvocation || ''}
              onChange={(e) => updateField('shokInvocation', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded font-bold text-xs"
              placeholder="॥ ॐ शांति ॥"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">इंक रंग</label>
            <select
              value={data.inkColor || '#1f1f1f'}
              onChange={(e) => updateField('inkColor', e.target.value)}
              className="w-full px-2 py-1.5 border rounded text-xs font-semibold bg-white"
            >
              <option value="#000000">जेट ब्लैक (प्योर ब्लैक - स्क्रीन प्रिंट)</option>
              <option value="#1f1f1f">डार्क चारकोल (सॉफ्ट प्रिंट)</option>
              <option value="#374151">ग्रे-ब्लैक</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">सूचना वाक्य</label>
          <input
            type="text"
            value={data.shokSubHeading || ''}
            onChange={(e) => updateField('shokSubHeading', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs"
            placeholder="अत्यंत दुःख के साथ सूचित करना पड़ रहा है कि हमारे पूज्य"
          />
        </div>
      </div>

      {/* 3. Deceased Photo & Details */}
      <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-3">
        <div className="font-bold text-stone-800 text-xs border-b pb-1 flex items-center justify-between">
          <span>दिवंगत पुण्यात्मा का विवरण</span>
          <span className="text-[10.5px] text-stone-500 font-normal">तस्वीर व जीवन परिचय</span>
        </div>

        {/* Photo Upload Box */}
        <div className="flex items-center gap-3 p-2 bg-stone-50 rounded border border-dashed border-stone-300">
          <div className="w-16 h-20 bg-white border border-stone-300 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
            {data.shokPhotoUrl ? (
              <img src={data.shokPhotoUrl} alt="दिवंगत" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-6 h-6 text-stone-400" />
            )}
          </div>
          <div className="flex-1 space-y-1.5">
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 bg-stone-800 hover:bg-black text-white text-[11px] font-bold rounded shadow-2xs">
              <Upload className="w-3 h-3" />
              <span>फोटो अपलोड करें</span>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
            {data.shokPhotoUrl && (
              <button
                type="button"
                onClick={() => updateField('shokPhotoUrl', '')}
                className="block text-[10.5px] text-red-600 hover:underline font-semibold"
              >
                फोटो हटाएं
              </button>
            )}
            <div className="text-[10px] text-stone-500">पासपोर्ट साइज या साफ चेहरा फोटो</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">संबोधन (Prefix)</label>
            <select
              value={data.shokPersonPrefix || 'स्वर्गवासी'}
              onChange={(e) => updateField('shokPersonPrefix', e.target.value)}
              className="w-full px-2 py-1.5 border rounded text-xs bg-white"
            >
              <option value="स्वर्गवासी">स्वर्गवासी</option>
              <option value="स्व०">स्व०</option>
              <option value="कैलाशवासी">कैलाशवासी</option>
              <option value="वैकुंठवासी">वैकुंठवासी</option>
              <option value="परम पूज्य स्व०">परम पूज्य स्व०</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">दिवंगत का नाम</label>
            <input
              type="text"
              value={data.shokPersonName || ''}
              onChange={(e) => updateField('shokPersonName', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded font-bold text-xs"
              placeholder="श्री रामेश्वर दयाल शर्मा"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">गोत्र (Gotra)</label>
            <input
              type="text"
              value={data.shokGotra || ''}
              onChange={(e) => updateField('shokGotra', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs"
              placeholder="कौशिक गोत्र"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">आयु (Age)</label>
            <input
              type="text"
              value={data.shokAge || ''}
              onChange={(e) => updateField('shokAge', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs"
              placeholder="78 वर्ष"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">स्वर्गवास दिनांक</label>
          <input
            type="text"
            value={data.shokDeathDate || ''}
            onChange={(e) => updateField('shokDeathDate', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs"
            placeholder="दिनांक 12 अक्टूबर 2026"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">विवरण संदेश</label>
          <textarea
            rows={2}
            value={data.shokDescription || ''}
            onChange={(e) => updateField('shokDescription', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs resize-none"
            placeholder="का आकस्मिक देवलोक गमन हो गया है..."
          />
        </div>
      </div>

      {/* 4. Rites Schedule Table */}
      <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-3">
        <div className="flex items-center justify-between border-b pb-1">
          <span className="font-bold text-stone-800 text-xs">कार्यक्रम तालिका (तीजा, उठावनी, तेरहवीं)</span>
          <button
            type="button"
            onClick={handleAddEvent}
            className="flex items-center gap-1 text-[11px] font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 px-2 py-0.5 rounded border"
          >
            <Plus className="w-3 h-3" />
            <span>कार्यक्रम जोड़ें</span>
          </button>
        </div>

        <div className="space-y-2">
          {data.shokEvents?.map((evt, idx) => (
            <div key={idx} className="p-2.5 bg-stone-50 rounded border border-stone-200 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] text-stone-700">#{idx + 1} कार्यक्रम</span>
                <button
                  type="button"
                  onClick={() => handleRemoveEvent(idx)}
                  className="text-stone-400 hover:text-red-600 p-0.5 rounded"
                  title="कार्यक्रम हटाएं"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={evt.name || ''}
                  onChange={(e) => handleUpdateEvent(idx, 'name', e.target.value)}
                  className="px-2 py-1 border rounded text-xs font-bold"
                  placeholder="कार्यक्रम का नाम"
                />
                <input
                  type="text"
                  value={evt.date || ''}
                  onChange={(e) => handleUpdateEvent(idx, 'date', e.target.value)}
                  className="px-2 py-1 border rounded text-xs"
                  placeholder="दिनांक"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={evt.time || ''}
                  onChange={(e) => handleUpdateEvent(idx, 'time', e.target.value)}
                  className="px-2 py-1 border rounded text-xs"
                  placeholder="समय (उदा. दोपहर 12:00 बजे से)"
                />
                <input
                  type="text"
                  value={evt.location || ''}
                  onChange={(e) => handleUpdateEvent(idx, 'location', e.target.value)}
                  className="px-2 py-1 border rounded text-xs"
                  placeholder="स्थान (उदा. निज निवास)"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Grieving Family & Contact */}
      <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-3">
        <div className="font-bold text-stone-800 text-xs border-b pb-1">
          शोकाकुल परिवार व विनीत
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">शोकाकुल (Grieving Family)</label>
          <textarea
            rows={2}
            value={data.shokFamilyGrieving || ''}
            onChange={(e) => updateField('shokFamilyGrieving', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs resize-none"
            placeholder="शोकाकुल: श्री राजेश शर्मा (पुत्र)..."
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">विनीत (Vineet)</label>
          <input
            type="text"
            value={data.shokFamilyVineet || ''}
            onChange={(e) => updateField('shokFamilyVineet', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs"
            placeholder="विनीत: समस्त भ्रातृगण एवं सम्बन्धी"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">प्रतिष्ठान (Firm Name)</label>
            <input
              type="text"
              value={data.shokEstablishment || ''}
              onChange={(e) => updateField('shokEstablishment', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs"
              placeholder="प्रतिष्ठान: मेसर्स शर्मा स्टोर"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">संपर्क मोबाइल</label>
            <input
              type="text"
              value={data.shokContact || ''}
              onChange={(e) => updateField('shokContact', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs font-mono"
              placeholder="9876543210, 9431000000"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">प्रेस लाइन (दुकान का नाम)</label>
          <input
            type="text"
            value={data.pressLine || ''}
            onChange={(e) => updateField('pressLine', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs text-stone-500"
            placeholder="प्रेस का नाम व फोन"
          />
        </div>
      </div>
    </div>
  );
}
