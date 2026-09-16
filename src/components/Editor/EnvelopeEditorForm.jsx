import React from 'react';
import { Mail, Send, UserCheck, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ENVELOPE_SIZES } from '../../utils/defaultData';
import HindiInput from '../Controls/HindiInput';

export default function EnvelopeEditorForm({ data, onChange }) {
  const updateField = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  // Auto-sync sender details from the main card
  const handleSyncFromCard = () => {
    const isBrideSide = data.hostSide === 'bride';
    const senderName = isBrideSide
      ? `${data.brideFather || 'पिताजी का नाम'} एवं समस्त परिवार`
      : `${data.groomFather || data.aakankshiNames?.split('\n')[0] || 'पिताजी का नाम'} एवं समस्त परिवार`;

    const senderAddress = isBrideSide
      ? `${data.brideVillage || ''}, ${data.brideThana || ''}`
      : `${data.groomVillage || ''}, ${data.groomThana || ''}`;

    onChange({
      ...data,
      envelopeTitle: isBrideSide ? 'पावन परिणय' : 'शुभ विवाह',
      envelopeSenderName: senderName,
      envelopeSenderAddress: senderAddress
    });
  };

  return (
    <div className="space-y-5">
      {/* 1. Banner & Quick Sync */}
      <div className="bg-gradient-to-r from-red-900 to-amber-950 text-white p-4 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-base text-amber-100">शादी का लिफाफा (Matching Envelope)</h3>
          </div>
          <button
            type="button"
            onClick={handleSyncFromCard}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-300/40 rounded-lg transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>कार्ड से ऑटो-सिंक</span>
          </button>
        </div>
        <p className="text-xs text-amber-200/80 leading-relaxed">
          यह लिफाफा आपके मुख्य शादी कार्ड के रंग, थीम और टाइपोग्राफी से 100% मैच करता है।
        </p>
      </div>

      {/* 2. Envelope Standard Size Selector */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
        <label className="block text-xs font-bold text-stone-900">
          लिफाफा आकार (Envelope Standard Sizes):
        </label>
        <div className="space-y-2">
          {Object.values(ENVELOPE_SIZES).map((size) => {
            const isSelected = (data.envelopeSizeKey || 'standard') === size.id;
            return (
              <label
                key={size.id}
                className={`flex items-start justify-between p-3 rounded-xl border cursor-pointer transition ${
                  isSelected
                    ? 'border-red-600 bg-red-50/50 ring-1 ring-red-600'
                    : 'border-stone-200 hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-stone-900">{size.name}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">{size.description}</div>
                </div>
                <input
                  type="radio"
                  name="envelopeSize"
                  checked={isSelected}
                  onChange={() => updateField('envelopeSizeKey', size.id)}
                  className="w-4 h-4 text-red-600 mt-0.5 cursor-pointer"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Envelope Header & Auspicious Titles */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>शीर्ष शीर्षक व आह्वान (Envelope Heading)</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">शीर्ष आह्वान</label>
            <HindiInput
              type="text"
              value={data.envelopeTopInvocation || '॥ श्री गणेशाय नमः ॥'}
              onChange={(e) => updateField('envelopeTopInvocation', e.target.value)}
              className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">मुख्य शीर्षक</label>
            <HindiInput
              type="text"
              value={data.envelopeTitle || 'शुभ विवाह'}
              onChange={(e) => updateField('envelopeTitle', e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="shubh vivah / pawan parinay"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">उप-शीर्षक (Sub-Title)</label>
          <HindiInput
            type="text"
            value={data.envelopeSubTitle || 'मांगलिक निमंत्रण पत्र'}
            onChange={(e) => updateField('envelopeSubTitle', e.target.value)}
            className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        {/* Motifs toggles */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t">
          <label className="flex items-center justify-between p-2 rounded-lg bg-stone-50 text-xs font-medium text-stone-800 cursor-pointer">
            <span>श्री गणेश जी बैज</span>
            <input
              type="checkbox"
              checked={data.envelopeShowGanesha !== false}
              onChange={(e) => updateField('envelopeShowGanesha', e.target.checked)}
              className="w-4 h-4 text-red-600 rounded cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-lg bg-stone-50 text-xs font-medium text-stone-800 cursor-pointer">
            <span>स्वास्तिक डाक सील</span>
            <input
              type="checkbox"
              checked={data.envelopeShowSwastik !== false}
              onChange={(e) => updateField('envelopeShowSwastik', e.target.checked)}
              className="w-4 h-4 text-red-600 rounded cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* 4. प्रेषक (Sender Details - Left Side) */}
      <div className="bg-red-50/60 p-4 rounded-xl border border-red-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-red-900 font-bold text-sm border-b border-red-200/60 pb-2">
          <Send className="w-4 h-4 text-red-700" />
          <span>प्रेषक विवरण (Sender Details - बाईं ओर)</span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">शीर्षक</label>
            <HindiInput
              type="text"
              value={data.envelopeSenderTitle || 'प्रेषक :-'}
              onChange={(e) => updateField('envelopeSenderTitle', e.target.value)}
              className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none font-bold"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-stone-700 mb-1">प्रेषक का नाम / परिवार</label>
            <HindiInput
              type="text"
              value={data.envelopeSenderName || ''}
              onChange={(e) => updateField('envelopeSenderName', e.target.value)}
              className="w-full px-3 py-2 text-xs font-bold border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              placeholder="mannu paswan evam samast parivar"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">ग्राम, पोस्ट, थाना व जिला</label>
          <HindiInput
            type="text"
            value={data.envelopeSenderAddress || ''}
            onChange={(e) => updateField('envelopeSenderAddress', e.target.value)}
            className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="gram+po cheron, thana sarmera (nalanda)"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">मोबाइल नंबर</label>
          <HindiInput
            enableHindi={false}
            type="text"
            value={data.envelopeSenderMobile || ''}
            onChange={(e) => updateField('envelopeSenderMobile', e.target.value)}
            className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="9876543210"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">शुभ नोट / आग्रह पंक्ति</label>
          <HindiInput
            type="text"
            value={data.envelopeNote || ''}
            onChange={(e) => updateField('envelopeNote', e.target.value)}
            className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            placeholder="kripya saparivar padharkar var-vadhu ko shubhashirwad pradan karein"
          />
        </div>
      </div>

      {/* 5. प्रति / सेवा में (Recipient Section - Right Side) */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-sm border-b pb-2">
          <UserCheck className="w-4 h-4 text-emerald-700" />
          <span>प्रति / सेवा में (Recipient Guide Lines - दाईं ओर)</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">संबोधन शीर्षक</label>
          <HindiInput
            type="text"
            value={data.envelopeRecipientTitle || 'प्रति / सेवा में :-'}
            onChange={(e) => updateField('envelopeRecipientTitle', e.target.value)}
            className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none font-bold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">पंक्ति 1 (अतिथि का नाम लिखने हेतु डॉटेड गाइड)</label>
          <HindiInput
            type="text"
            value={data.envelopeRecipientLine1 || 'श्रीमान ................................................................'}
            onChange={(e) => updateField('envelopeRecipientLine1', e.target.value)}
            className="w-full px-3 py-2 text-xs font-bold border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">पंक्ति 2 (सपरिवार / सादर आमंत्रण)</label>
          <HindiInput
            type="text"
            value={data.envelopeRecipientLine2 || 'सपरिवार / सादर आमंत्रण'}
            onChange={(e) => updateField('envelopeRecipientLine2', e.target.value)}
            className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">पंक्ति 3 (स्थान / पता डॉटेड गाइड)</label>
          <HindiInput
            type="text"
            value={data.envelopeRecipientAddress || 'स्थान ................................................................'}
            onChange={(e) => updateField('envelopeRecipientAddress', e.target.value)}
            className="w-full px-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
