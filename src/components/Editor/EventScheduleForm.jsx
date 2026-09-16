import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Sparkles, Check, Clock } from 'lucide-react';
import { getPanchangDetails } from '../../utils/panchang';
import HindiInput from '../Controls/HindiInput';
import HindiTextarea from '../Controls/HindiTextarea';

export default function EventScheduleForm({ data, onChange }) {
  const [useTraditionalMonth, setUseTraditionalMonth] = useState(true);
  const [autoFilledIndex, setAutoFilledIndex] = useState(null);

  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleEventChange = (index, key, value) => {
    const newEvents = [...data.events];
    newEvents[index] = { ...newEvents[index], [key]: value };
    onChange({ ...data, events: newEvents });
  };

  // Automatic Panchang calculation when user selects date from calendar
  const handleCalendarDateSelect = (index, isoDateStr) => {
    if (!isoDateStr) return;

    const panchang = getPanchangDetails(isoDateStr, useTraditionalMonth);
    if (!panchang) return;

    const newEvents = [...data.events];
    newEvents[index] = {
      ...newEvents[index],
      tithi: panchang.tithiText,
      date: panchang.dateText,
      day: panchang.dayText,
      isoDate: isoDateStr
    };

    onChange({ ...data, events: newEvents });
    setAutoFilledIndex(index);
    setTimeout(() => setAutoFilledIndex(null), 3000);
  };

  const addEvent = () => {
    onChange({
      ...data,
      events: [
        ...data.events,
        { tithi: '', date: 'दिनांक ', day: '', event: 'शुभ विवाह' }
      ]
    });
  };

  const removeEvent = (index) => {
    if (data.events.length <= 1) return;
    const newEvents = data.events.filter((_, i) => i !== index);
    onChange({ ...data, events: newEvents });
  };

  const quickEventNames = [
    'वंशरोपन एवं मण्डप ।',
    'हल्दी कलश ।',
    'घृतढारी ।',
    'बारात प्रस्थान एवं रात्री में शुभ विवाह ।',
    'मातृका पूजन / मटकोर ।',
    'तिलकोत्सव ।',
    'प्रीतिभोज (रिसेप्शन) ।',
    'शुभ विदाई ।'
  ];

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
        <div className="flex items-center gap-2 mb-2 text-amber-950 font-bold text-base">
          <Calendar className="w-5 h-5 text-amber-700" />
          <span>कार्यक्रम शीर्षक (Program Title)</span>
        </div>
        <HindiInput
          type="text"
          value={data.programTitle}
          onChange={(e) => updateField('programTitle', e.target.value)}
          className="w-full px-3 py-2 text-base font-bold border rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
          placeholder="vaivahik karyakram -> वैवाहिक कार्यक्रम"
        />
      </div>

      {/* Panchang Settings Helper Banner */}
      <div className="bg-gradient-to-r from-red-50 to-amber-50 p-3.5 rounded-xl border border-red-200 flex flex-wrap items-center justify-between gap-2 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">
            📅
          </div>
          <div>
            <div className="text-xs font-bold text-red-950 flex items-center gap-1">
              <span>भारतीय पंचांग ऑटो-कैलकुलेटर सक्रिय</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <p className="text-[11px] text-stone-600">
              नीचे किसी भी कार्यक्रम में कैलेंडर से तारीख चुनें, पंचांग (तिथि, पक्ष, दिन) स्वतः भर जाएगा।
            </p>
          </div>
        </div>

        {/* Traditional Month Name Style Toggle */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-stone-700 font-medium">मास शैली:</span>
          <select
            value={useTraditionalMonth ? 'traditional' : 'sanskrit'}
            onChange={(e) => setUseTraditionalMonth(e.target.value === 'traditional')}
            className="text-xs font-semibold bg-white border border-stone-300 rounded px-2 py-1 text-stone-800 focus:ring-1 focus:ring-red-500 focus:outline-none"
          >
            <option value="traditional">पारम्परिक प्रेस (अगहन, सावन, भादो)</option>
            <option value="sanskrit">संस्कृत नाम (मार्गशीर्ष, श्रावण, भाद्रपद)</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-stone-800 flex items-center gap-1.5">
            <span>विवाह संस्कार तिथियाँ व कार्यक्रम</span>
            <span className="text-xs font-normal text-stone-500">({data.events.length} कार्यक्रम)</span>
          </label>
          <button
            type="button"
            onClick={addEvent}
            className="flex items-center gap-1 text-xs bg-red-600 hover:bg-red-700 text-white font-semibold px-2.5 py-1.5 rounded-lg transition shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            कार्यक्रम जोड़ें
          </button>
        </div>

        {data.events.map((item, index) => (
          <div
            key={index}
            className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-sm space-y-3 relative transition hover:border-red-300"
          >
            {/* Header with Event Number and Calendar Picker */}
            <div className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-red-900 bg-red-100/70 px-2 py-0.5 rounded">
                  कार्यक्रम #{index + 1}
                </span>
                {autoFilledIndex === index && (
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
                    <Check className="w-3 h-3" /> पंचांग अनुसार अपडेट हुआ!
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Calendar Date Picker that triggers Indian Panchang calculation */}
                <div className="flex items-center gap-1 bg-amber-50 hover:bg-amber-100/80 border border-amber-300 px-2 py-1 rounded-lg transition cursor-pointer">
                  <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                    📅 कैलेंडर:
                  </span>
                  <input
                    type="date"
                    value={item.isoDate || ''}
                    onChange={(e) => handleCalendarDateSelect(index, e.target.value)}
                    className="bg-transparent text-xs font-semibold text-stone-800 cursor-pointer focus:outline-none"
                    title="कैलेंडर से तारीख चुनें - पंचांग स्वतः भर जाएगा"
                  />
                </div>

                {data.events.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEvent(index)}
                    className="text-stone-400 hover:text-red-600 p-1 transition"
                    title="हटाएँ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Inputs: Tithi & Date */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5 flex items-center justify-between">
                  <span>तिथि / पक्ष (Tithi)</span>
                  <span className="text-[10px] text-amber-700 font-normal">पंचांग स्वतः</span>
                </label>
                <HindiInput
                  type="text"
                  value={item.tithi}
                  onChange={(e) => handleEventChange(index, 'tithi', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-semibold border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none bg-stone-50/50"
                  placeholder="उदा. अगहन शुक्ल पक्ष अष्टमी"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5 flex items-center justify-between">
                  <span>तारीख (Date)</span>
                  <span className="text-[10px] text-amber-700 font-normal">कैलेंडर से</span>
                </label>
                <HindiInput
                  type="text"
                  value={item.date}
                  onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-bold border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="उदा. दिनांक 28-11-2025"
                />
              </div>
            </div>

            {/* Inputs: Day & Event */}
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                  दिन (Day)
                </label>
                <HindiInput
                  type="text"
                  value={item.day}
                  onChange={(e) => handleEventChange(index, 'day', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="उदा. ( शुक्रवार )"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[11px] font-bold text-stone-700 mb-0.5">
                  कार्यक्रम का नाम (Event)
                </label>
                <HindiInput
                  type="text"
                  value={item.event}
                  onChange={(e) => handleEventChange(index, 'event', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-bold border rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none text-red-900"
                  placeholder="shubh vivah -> शुभ विवाह"
                />
              </div>
            </div>

            {/* Quick Suggestions for Event Name */}
            <div className="pt-1 flex flex-wrap items-center gap-1">
              <span className="text-[10px] text-stone-400 font-semibold">सुझाव:</span>
              {quickEventNames.slice(0, 4).map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => handleEventChange(index, 'event', name)}
                  className="text-[10px] bg-stone-100 hover:bg-red-50 hover:text-red-700 border border-stone-200 px-1.5 py-0.5 rounded text-stone-600 transition"
                >
                  {name.replace(' ।', '')}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Note Section */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
        <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-stone-600" />
          <span>विशेष नोट (बारात प्रस्थान समय, स्थान, वाहन आदि)</span>
        </label>
        <HindiTextarea
          rows={3}
          value={data.noteText}
          onChange={(e) => updateField('noteText', e.target.value)}
          className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          placeholder="नोट :- बारात शाम 07 बजे अपने निवास स्थान से प्रस्थान करेगी।"
        />
      </div>
    </div>
  );
}
