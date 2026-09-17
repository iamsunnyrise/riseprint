import React from 'react';
import { Plus, Trash2, Calendar, MapPin, Users, Sparkles } from 'lucide-react';

export default function SanskarForm({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleSanskarTypeChange = (type) => {
    const titles = {
      'mundan': 'शुभ मुंडन संस्कार निमंत्रण',
      'janeu': 'पवित्र यज्ञोपवीत (जनेऊ) संस्कार',
      'griha-pravesh': 'शुभ गृह प्रवेश एवं वास्तु शांति',
      'kuan-pujan': 'शुभ कुआं पूजन (जलवा) निमंत्रण',
      'birthday': 'शुभ जन्मोत्सव एवं वर्षगांठ'
    };
    const graceTexts = {
      'mundan': 'परमपिता परमेश्वर एवं कुलदेवी के असीम आशीर्वाद से हमारे सुपुत्र के मुंडन संस्कार के पावन अवसर पर आपकी गरिमामयी उपस्थिति एवं आशीर्वचन सादर प्रार्थनीय हैं।',
      'janeu': 'परमपिता परमात्मा के मंगलमय विधान से हमारे सुपुत्र के पावन यज्ञोपवीत (उपनयन) संस्कार के पुनीत अवसर पर आपका सपरिवार हार्दिक अभिनंदन है।',
      'griha-pravesh': 'परमपिता परमेश्वर एवं कुलदेवी की असीम अनुकम्पा से हमारे नवनिर्मित गृह के पावन गृह-प्रवेश एवं वास्तु-शांति पूजन के शुभ अवसर पर आपका सपरिवार आगमन प्रार्थनीय है।',
      'kuan-pujan': 'ईश्वर के आशीर्वाद से हमारे कुलदीपक के आगमन उपरांत शुभ कुआं पूजन (जलवा) एवं प्रीतिभोज के पावन अवसर पर आप सादर आमंत्रित हैं।',
      'birthday': 'हमारे प्रिय बालक/बालिका के शुभ जन्मोत्सव के आनंदमय अवसर पर आप सपरिवार पधारकर अपना स्नेहिल शुभाशीष प्रदान करें।'
    };

    onChange({
      ...data,
      sanskarType: type,
      sanskarHeading: titles[type] || 'मांगलिक संस्कार निमंत्रण',
      sanskarGraceText: graceTexts[type] || data.sanskarGraceText
    });
  };

  const handleAddEvent = () => {
    const newEvents = [
      ...(data.sanskarEvents || []),
      { event: 'नया कार्यक्रम', date: 'दिनांक: ...', time: 'समय: ...', day: '' }
    ];
    updateField('sanskarEvents', newEvents);
  };

  const handleUpdateEvent = (index, key, value) => {
    const updated = [...(data.sanskarEvents || [])];
    updated[index] = { ...updated[index], [key]: value };
    updateField('sanskarEvents', updated);
  };

  const handleRemoveEvent = (index) => {
    const updated = (data.sanskarEvents || []).filter((_, i) => i !== index);
    updateField('sanskarEvents', updated);
  };

  return (
    <div className="space-y-4 text-xs">
      {/* 1. Sanskar Type Picker */}
      <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200 space-y-2">
        <label className="block text-xs font-bold text-amber-950">
          मांगलिक संस्कार प्रकार चुनें
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { id: 'mundan', label: '🪔 मुंडन संस्कार', tag: 'चूड़ाकर्म' },
            { id: 'janeu', label: '🕉️ जनेऊ / उपनयन', tag: 'यज्ञोपवीत' },
            { id: 'griha-pravesh', label: '🏠 गृह प्रवेश', tag: 'वास्तु शांति' },
            { id: 'kuan-pujan', label: '🪣 कुआं पूजन', tag: 'जलवा पूजन' },
            { id: 'birthday', label: '🎂 जन्मोत्सव', tag: 'वर्षगांठ' }
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSanskarTypeChange(item.id)}
              className={`p-2 rounded border text-left transition flex flex-col justify-between ${
                data.sanskarType === item.id
                  ? 'bg-amber-800 text-white border-amber-900 shadow-xs'
                  : 'bg-white hover:bg-amber-100/50 border-stone-200 text-stone-800'
              }`}
            >
              <span className="font-bold text-[11px]">{item.label}</span>
              <span className={`text-[9.5px] ${data.sanskarType === item.id ? 'text-amber-200' : 'text-stone-500'}`}>
                {item.tag}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Heading & Mantra */}
      <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-3">
        <div className="font-bold text-stone-800 text-xs border-b pb-1">
          शीर्ष मंगलाचरण व मुख्य शीर्षक
        </div>
        
        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">कार्ड का मुख्य शीर्षक</label>
          <input
            type="text"
            value={data.sanskarHeading || ''}
            onChange={(e) => updateField('sanskarHeading', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded font-bold text-xs"
            placeholder="शुभ मुंडन संस्कार निमंत्रण"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">आह्वान मंत्र</label>
            <input
              type="text"
              value={data.sanskarInvocation || ''}
              onChange={(e) => updateField('sanskarInvocation', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs"
              placeholder="॥ श्री गणेशाय नमः ॥"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">गृह / प्रतिष्ठान का नाम</label>
            <input
              type="text"
              value={data.sanskarHouseName || ''}
              onChange={(e) => updateField('sanskarHouseName', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs"
              placeholder="उदा. आनन्द कुटीर / सद्गुरु कृपा"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">गायत्री / पावन मंत्र</label>
          <textarea
            rows={2}
            value={data.sanskarMantra || ''}
            onChange={(e) => updateField('sanskarMantra', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs resize-none"
            placeholder="॥ ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं..."
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">निमंत्रण भाव / वाक्य</label>
          <textarea
            rows={2}
            value={data.sanskarGraceText || ''}
            onChange={(e) => updateField('sanskarGraceText', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs resize-none"
            placeholder="परमपिता परमेश्वर एवं कुलदेवी के असीम आशीर्वाद से..."
          />
        </div>
      </div>

      {/* 3. Child / Host Details */}
      <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-3">
        <div className="font-bold text-stone-800 text-xs border-b pb-1">
          बालक / बालिका या गृहस्वामी का विवरण
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">संबोधन (Prefix)</label>
            <input
              type="text"
              value={data.sanskarChildPrefix || ''}
              onChange={(e) => updateField('sanskarChildPrefix', e.target.value)}
              className="w-full px-2 py-1.5 border rounded text-xs"
              placeholder="चि० / आयु० / श्री"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">नाम</label>
            <input
              type="text"
              value={data.sanskarChildName || ''}
              onChange={(e) => updateField('sanskarChildName', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded font-bold text-xs"
              placeholder="आरव कुमार"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">संबंध (Relation)</label>
            <input
              type="text"
              value={data.sanskarChildRelation || ''}
              onChange={(e) => updateField('sanskarChildRelation', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs"
              placeholder="प्रथम सुपुत्र / सुपुत्री"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">माता-पिता का नाम</label>
            <input
              type="text"
              value={data.sanskarParents || ''}
              onChange={(e) => updateField('sanskarParents', e.target.value)}
              className="w-full px-2.5 py-1.5 border rounded text-xs font-semibold"
              placeholder="श्रीमती नीतू देवी एवं श्री अमित कुमार"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">दादा-दादी का नाम</label>
          <input
            type="text"
            value={data.sanskarGrandParents || ''}
            onChange={(e) => updateField('sanskarGrandParents', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs"
            placeholder="श्रीमती शान्ति देवी एवं श्री मन्नु पासवान"
          />
        </div>
      </div>

      {/* 4. Auspicious Schedule Table */}
      <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-3">
        <div className="flex items-center justify-between border-b pb-1">
          <span className="font-bold text-stone-800 text-xs">मांगलिक कार्यक्रम तालिका</span>
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
          {data.sanskarEvents?.map((evt, idx) => (
            <div key={idx} className="p-2.5 bg-stone-50 rounded border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] text-stone-700">#{idx + 1} रस्म</span>
                <button
                  type="button"
                  onClick={() => handleRemoveEvent(idx)}
                  className="text-stone-400 hover:text-red-600 p-0.5"
                  title="कार्यक्रम हटाएं"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={evt.event || ''}
                  onChange={(e) => handleUpdateEvent(idx, 'event', e.target.value)}
                  className="px-2 py-1 border rounded text-xs font-bold"
                  placeholder="रस्म / कार्यक्रम (उदा. हवन एवं मुंडन)"
                />
                <input
                  type="text"
                  value={evt.date || ''}
                  onChange={(e) => handleUpdateEvent(idx, 'date', e.target.value)}
                  className="px-2 py-1 border rounded text-xs"
                  placeholder="दिनांक (उदा. 14-05-2026)"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={evt.time || ''}
                  onChange={(e) => handleUpdateEvent(idx, 'time', e.target.value)}
                  className="px-2 py-1 border rounded text-xs"
                  placeholder="समय (उदा. प्रातः 08:30 बजे)"
                />
                <input
                  type="text"
                  value={evt.day || ''}
                  onChange={(e) => handleUpdateEvent(idx, 'day', e.target.value)}
                  className="px-2 py-1 border rounded text-xs"
                  placeholder="दिन (उदा. गुरुवार)"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Venue & Family */}
      <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-3">
        <div className="font-bold text-stone-800 text-xs border-b pb-1">
          स्थान एवं पारिवारिक विवरण
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">कार्यक्रम स्थल (Venue Address)</label>
          <input
            type="text"
            value={data.sanskarVenue || ''}
            onChange={(e) => updateField('sanskarVenue', e.target.value)}
            className="w-full px-2.5 py-1.5 border rounded text-xs"
            placeholder="निज निवास, ग्राम चेरों, थाना- सरमेरा, नालन्दा"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">दर्शनाभिलाषी</label>
            <textarea
              rows={2}
              value={data.sanskarDarshanabhilashi || ''}
              onChange={(e) => updateField('sanskarDarshanabhilashi', e.target.value)}
              className="w-full px-2 py-1 border rounded text-xs resize-none"
              placeholder="समस्त परिवार व इष्ट-मित्र"
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">स्वागतोत्सुक</label>
            <textarea
              rows={2}
              value={data.sanskarSwagat || ''}
              onChange={(e) => updateField('sanskarSwagat', e.target.value)}
              className="w-full px-2 py-1 border rounded text-xs resize-none"
              placeholder="विकास, राहुल, सन्नी..."
            />
          </div>
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">विनीत / आकांक्षी</label>
            <textarea
              rows={2}
              value={data.sanskarAakankshi || ''}
              onChange={(e) => updateField('sanskarAakankshi', e.target.value)}
              className="w-full px-2 py-1 border rounded text-xs resize-none"
              placeholder="अमित कुमार एवं समस्त परिवार"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-stone-600 mb-1">प्रेस लाइन</label>
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
