import React from 'react';
import { User, Heart, ArrowLeftRight } from 'lucide-react';
import HindiInput from '../Controls/HindiInput';

export default function BasicDetailsForm({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const isBrideSide = data.hostSide === 'bride';

  // Groom Details Form Block
  const renderGroomSection = () => (
    <div className="bg-red-50/60 p-4 rounded-xl border border-red-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between text-red-900 font-bold text-base border-b border-red-200/60 pb-2">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-red-700" />
          <span>वर (दूल्हा) का विवरण</span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 border border-red-200">
          {isBrideSide ? 'कार्ड में दाईं ओर (Right Side)' : 'कार्ड में बाईं ओर (Left Side)'}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">संबोधन (चि० / सौ०)</label>
          <HindiInput
            type="text"
            value={data.groomPrefix}
            onChange={(e) => updateField('groomPrefix', e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-stone-700 mb-1">वर का नाम</label>
          <HindiInput
            type="text"
            value={data.groomName}
            onChange={(e) => updateField('groomName', e.target.value)}
            className="w-full px-3 py-2 text-sm font-bold border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="bittu kumar -> बिट्टू कुमार"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">सम्बन्ध (सुपुत्र / प्रथम सुपुत्र)</label>
          <HindiInput
            type="text"
            value={data.groomRelation}
            onChange={(e) => updateField('groomRelation', e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">पिता का नाम</label>
          <HindiInput
            type="text"
            value={data.groomFather}
            onChange={(e) => updateField('groomFather', e.target.value)}
            className="w-full px-3 py-2 text-sm font-bold border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="shri mannu paswan -> श्री मन्नु पासवान"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">ग्राम + पोस्ट</label>
          <HindiInput
            type="text"
            value={data.groomVillage}
            onChange={(e) => updateField('groomVillage', e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="gram+po cheron -> ग्राम+पो०- चेरों"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">थाना एवं जिला</label>
          <HindiInput
            type="text"
            value={data.groomThana}
            onChange={(e) => updateField('groomThana', e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="thana sarmera (nalanda)"
          />
        </div>
      </div>
    </div>
  );

  // Bride Details Form Block
  const renderBrideSection = () => (
    <div className="bg-rose-50/60 p-4 rounded-xl border border-rose-200 shadow-sm space-y-3">
      <div className="flex items-center justify-between text-rose-900 font-bold text-base border-b border-rose-200/60 pb-2">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-600" />
          <span>वधू (दुल्हन) का विवरण</span>
        </div>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
          {isBrideSide ? 'कार्ड में बाईं ओर (Left Side)' : 'कार्ड में दाईं ओर (Right Side)'}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">संबोधन (आयु० / सु०)</label>
          <HindiInput
            type="text"
            value={data.bridePrefix}
            onChange={(e) => updateField('bridePrefix', e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-stone-700 mb-1">वधू का नाम</label>
          <HindiInput
            type="text"
            value={data.brideName}
            onChange={(e) => updateField('brideName', e.target.value)}
            className="w-full px-3 py-2 text-sm font-bold border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="pooja kumari -> पूजा कुमारी"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">सम्बन्ध (सुपुत्री / प्रथम सुपुत्री)</label>
          <HindiInput
            type="text"
            value={data.brideRelation}
            onChange={(e) => updateField('brideRelation', e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">पिता का नाम</label>
          <HindiInput
            type="text"
            value={data.brideFather}
            onChange={(e) => updateField('brideFather', e.target.value)}
            className="w-full px-3 py-2 text-sm font-bold border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="shri ramesh prasad"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">ग्राम + पोस्ट</label>
          <HindiInput
            type="text"
            value={data.brideVillage}
            onChange={(e) => updateField('brideVillage', e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="ग्राम+पो०- महम्मदपुर"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">थाना एवं जिला</label>
          <HindiInput
            type="text"
            value={data.brideThana}
            onChange={(e) => updateField('brideThana', e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="थाना-अस्थावाँ ( नालन्दा )"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* 1. Host Side Selector (वर पक्ष vs वधू पक्ष) */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
            <ArrowLeftRight className="w-3.5 h-3.5 text-stone-600" />
            कार्ड का मुख्य पक्ष (Host Family Side):
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
            {isBrideSide ? 'वधू (लड़की वाले) पहले' : 'वर (लड़के वाले) पहले'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => updateField('hostSide', 'groom')}
            className={`p-2.5 rounded-lg border text-center transition flex items-center justify-center gap-2 ${
              !isBrideSide
                ? 'border-red-600 bg-red-50 text-red-900 font-bold ring-2 ring-red-600/30'
                : 'border-stone-200 text-stone-600 hover:border-stone-300'
            }`}
          >
            <User className="w-4 h-4 text-red-600" />
            <span className="text-xs">वर पक्ष (लड़के वाले)</span>
          </button>

          <button
            type="button"
            onClick={() => updateField('hostSide', 'bride')}
            className={`p-2.5 rounded-lg border text-center transition flex items-center justify-center gap-2 ${
              isBrideSide
                ? 'border-rose-600 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-600/30'
                : 'border-stone-200 text-stone-600 hover:border-stone-300'
            }`}
          >
            <Heart className="w-4 h-4 text-rose-600" />
            <span className="text-xs">वधू पक्ष (लड़की वाले)</span>
          </button>
        </div>

        <div className="text-[11.5px] pt-1 leading-normal">
          {isBrideSide ? (
            <div className="p-2 rounded-lg bg-rose-50 border border-rose-200/70 text-rose-800 font-medium">
              ✓ <strong>वधू पक्ष सक्रिय:</strong> कार्ड में बाईं ओर (Left) पहले <strong>वधू (दुल्हन)</strong> का नाम व पता प्रदर्शित होगा, और दाईं ओर (Right) <strong>वर (दूल्हा)</strong> का विवरण रहेगा।
            </div>
          ) : (
            <div className="p-2 rounded-lg bg-red-50 border border-red-200/70 text-red-800 font-medium">
              ✓ <strong>वर पक्ष सक्रिय:</strong> कार्ड में बाईं ओर (Left) पहले <strong>वर (दूल्हा)</strong> का नाम व पता प्रदर्शित होगा, और दाईं ओर (Right) <strong>वधू (दुल्हन)</strong> का विवरण रहेगा।
            </div>
          )}
        </div>
      </div>

      {/* 2. Couple Information Form Sections */}
      {isBrideSide ? (
        <>
          {renderBrideSection()}
          {renderGroomSection()}
        </>
      ) : (
        <>
          {renderGroomSection()}
          {renderBrideSection()}
        </>
      )}

      {/* 3. Salutation & Starburst Seal */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3 shadow-sm">
        <div className="font-bold text-stone-800 text-sm">आमंत्रण उद्घोषणा (Starburst Badge)</div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">लाइन 1</label>
          <HindiInput
            type="text"
            value={data.starburstLine1}
            onChange={(e) => updateField('starburstLine1', e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">लाइन 2</label>
          <HindiInput
            type="text"
            value={data.starburstLine2}
            onChange={(e) => updateField('starburstLine2', e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">लाइन 3</label>
          <HindiInput
            type="text"
            value={data.starburstLine3}
            onChange={(e) => updateField('starburstLine3', e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
