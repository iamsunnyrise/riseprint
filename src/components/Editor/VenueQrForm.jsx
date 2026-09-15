import React from 'react';
import {
  MapPin,
  QrCode,
  ExternalLink,
  Wand2,
  CheckCircle,
  Eye,
  Sliders,
  Compass,
  Palette,
  Layout
} from 'lucide-react';
import VenueQrCode from '../Motifs/VenueQrCode';

const VENUE_TITLE_PRESETS = [
  'विवाह स्थल',
  'शुभ विवाह एवं प्रीतिभोज स्थल',
  'पावन परिणय स्थल',
  'जयमाला एवं वरमाला स्थल',
  'स्वागत एवं प्रीतिभोज स्थल'
];

const QR_LABEL_PRESETS = [
  'मानचित्र हेतु स्कैन करें',
  'Google Maps Location',
  'विवाह स्थल हेतु स्कैन करें',
  'रास्ता देखने हेतु स्कैन करें',
  'स्मार्टफोन से स्कैन करें'
];

export default function VenueQrForm({ data, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  // 1-Click Auto-Generate Google Maps Search URL from Venue Name & Address
  const handleGenerateMapsUrl = () => {
    const queryParts = [data.venueName, data.venueAddress].filter(Boolean).join(' ');
    if (!queryParts.trim()) {
      alert('कृपया पहले विवाह स्थल का नाम या पता दर्ज करें।');
      return;
    }
    const generatedUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryParts)}`;
    handleChange('venueMapsUrl', generatedUrl);
  };

  // Test current location in Google Maps
  const handleTestMapsUrl = () => {
    const targetUrl = data.venueMapsUrl || 'https://maps.google.com';
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-5 text-sm text-stone-700">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-red-50 to-amber-50 p-3.5 rounded-xl border border-amber-200">
        <div className="flex items-center gap-2 mb-1 text-red-900 font-bold text-base">
          <MapPin className="w-5 h-5 text-red-700 flex-shrink-0" />
          <span>विवाह स्थल एवं Google Maps QR कोड</span>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          शादी कार्ड और लिफाफे पर स्कैन करने योग्य क्यूआर कोड जोड़ें। मेहमान अपने स्मार्टफोन से सीधे विवाह स्थल (होटल, विवाह भवन, मैरिज हॉल) का सही नेविगेशन देख सकेंगे।
        </p>
      </div>

      {/* Live QR Preview Badge & Quick Test */}
      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <VenueQrCode
            url={data.venueMapsUrl || 'https://maps.google.com'}
            size={data.qrSize || 64}
            inkColor={data.inkColor || '#a61515'}
            colorMode={data.qrColorMode || 'theme'}
            centerIcon={data.qrCenterIcon || 'pin'}
            label={data.qrLabel || 'मानचित्र हेतु स्कैन करें'}
            showLabel={true}
            showBorder={true}
          />
          <div>
            <div className="text-xs font-bold text-stone-800 flex items-center gap-1">
              <span>लाइव क्यूआर प्रीव्यू</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold">
                सक्रिय (Active)
              </span>
            </div>
            <div className="text-[11px] text-stone-500 mt-0.5 leading-snug">
              {data.venueName || 'विवाह स्थल का नाम'}
            </div>
            <div className="text-[10px] text-stone-400 truncate max-w-[190px]">
              {data.venueMapsUrl || 'लिंक सेट नहीं है'}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleTestMapsUrl}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-100 text-red-800 border border-red-300 rounded-lg text-xs font-bold transition shadow-xs whitespace-nowrap"
          title="गूगल मैप्स में नया टैब खोलें"
        >
          <ExternalLink className="w-3.5 h-3.5 text-red-600" />
          <span>मैप पर टेस्ट करें</span>
        </button>
      </div>

      {/* Section 1: Toggles (Card & Envelope) */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3 shadow-xs">
        <h3 className="font-bold text-stone-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-red-700" />
          <span>प्रदर्शन सेटिंग्स (Display Toggles)</span>
        </h3>

        <div className="space-y-2.5">
          {/* Toggle 1: Show Venue on Wedding Card */}
          <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-stone-50 transition border border-transparent hover:border-stone-200">
            <div>
              <div className="text-xs font-bold text-stone-800">
                शादी कार्ड पर विवाह स्थल विवरण दिखाएं
              </div>
              <div className="text-[11px] text-stone-500">
                कार्ड पर स्थल का नाम व पता प्रदर्शित होगा
              </div>
            </div>
            <input
              type="checkbox"
              checked={data.showVenueDetails !== false}
              onChange={(e) => handleChange('showVenueDetails', e.target.checked)}
              className="w-4 h-4 text-red-700 rounded accent-red-700 cursor-pointer"
            />
          </label>

          {/* Toggle 2: Show QR on Card */}
          <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-stone-50 transition border border-transparent hover:border-stone-200">
            <div>
              <div className="text-xs font-bold text-stone-800">
                कार्ड पर Google Maps QR कोड दिखाएं
              </div>
              <div className="text-[11px] text-stone-500">
                कार्ड पर 300 DPI में स्कैन करने योग्य क्यूआर कोड छपेगा
              </div>
            </div>
            <input
              type="checkbox"
              checked={data.showVenueQr !== false}
              onChange={(e) => handleChange('showVenueQr', e.target.checked)}
              className="w-4 h-4 text-red-700 rounded accent-red-700 cursor-pointer"
            />
          </label>

          {/* Toggle 3: Show QR on Envelope */}
          <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-stone-50 transition border border-transparent hover:border-stone-200">
            <div>
              <div className="text-xs font-bold text-stone-800">
                शादी के लिफाफे (Envelope Cover) पर भी QR कोड दिखाएं
              </div>
              <div className="text-[11px] text-stone-500">
                लिफाफे के प्रेषक बॉक्स में छोटा वेन्यू क्यूआर कोड जुड़ेगा
              </div>
            </div>
            <input
              type="checkbox"
              checked={data.showVenueOnEnvelope !== false}
              onChange={(e) => handleChange('showVenueOnEnvelope', e.target.checked)}
              className="w-4 h-4 text-red-700 rounded accent-red-700 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Section 2: Venue Name, Address & Maps Link */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3.5 shadow-xs">
        <h3 className="font-bold text-stone-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-red-700" />
          <span>स्थल की जानकारी (Venue Information)</span>
        </h3>

        {/* Venue Title with Presets */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            स्थल शीर्षक (Venue Heading)
          </label>
          <div className="flex gap-1.5 mb-1.5 overflow-x-auto pb-1 scrollbar-none">
            {VENUE_TITLE_PRESETS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleChange('venueTitle', t)}
                className={`text-[10px] px-2 py-0.5 rounded-full border transition whitespace-nowrap ${
                  data.venueTitle === t
                    ? 'bg-red-700 text-white border-red-700 font-bold'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={data.venueTitle || ''}
            onChange={(e) => handleChange('venueTitle', e.target.value)}
            placeholder="उदा. विवाह स्थल"
            className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-red-600 focus:outline-none"
          />
        </div>

        {/* Venue Name */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            विवाह भवन / होटल / स्थल का नाम
          </label>
          <input
            type="text"
            value={data.venueName || ''}
            onChange={(e) => handleChange('venueName', e.target.value)}
            placeholder="उदा. होटल उत्सव पैलेस / मां जानकी विवाह भवन / निज निवास"
            className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-red-600 focus:outline-none font-semibold text-stone-800"
          />
        </div>

        {/* Venue Address */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            स्थल का पता (Address / Landmark)
          </label>
          <input
            type="text"
            value={data.venueAddress || ''}
            onChange={(e) => handleChange('venueAddress', e.target.value)}
            placeholder="उदा. मेन रोड, निकट स्टेशन चौराहा, नालन्दा (बिहार)"
            className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-red-600 focus:outline-none"
          />
        </div>

        {/* Google Maps Link & Auto-Generate Button */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-bold text-stone-700">
              Google Maps लिंक (URL)
            </label>
            <button
              type="button"
              onClick={handleGenerateMapsUrl}
              className="text-[11px] text-red-700 hover:text-red-900 font-bold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <Wand2 className="w-3 h-3 text-red-600" />
              <span>नाम व पते से लिंक बनाएं</span>
            </button>
          </div>
          <input
            type="url"
            value={data.venueMapsUrl || ''}
            onChange={(e) => handleChange('venueMapsUrl', e.target.value)}
            placeholder="https://maps.app.goo.gl/... या https://maps.google.com/?q=..."
            className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-red-600 focus:outline-none font-mono text-[11px]"
          />
          <p className="text-[10px] text-stone-500 mt-1">
            💡 आप गूगल मैप्स से अपनी लोकेशन का शेयर लिंक (उदा. <code>https://maps.app.goo.gl/xxx</code>) भी सीधे पेस्ट कर सकते हैं।
          </p>
        </div>
      </div>

      {/* Section 3: QR Styling & Center Motif */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-4 shadow-xs">
        <h3 className="font-bold text-stone-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-red-700" />
          <span>क्यूआर कोड डिज़ाइन व प्लेसमेंट (QR Style & Placement)</span>
        </h3>

        {/* Card Placement */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1">
            <Layout className="w-3 h-3 text-stone-500" />
            <span>शादी कार्ड पर स्थान (Placement on Card)</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'footer', label: 'फ़ुटर में (Footer)', desc: 'दर्शनाभिलाषी व आकांक्षी के साथ' },
              { id: 'dedicated-banner', label: 'समर्पित बॉक्स', desc: 'भव्य तोरणदार अलंकृत बैनर' },
              { id: 'below-program', label: 'कार्यक्रम के नीचे', desc: 'कार्यक्रम तालिका के ठीक बाद' }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleChange('qrPlacement', p.id)}
                className={`p-2 rounded-lg border text-left transition flex flex-col justify-between ${
                  data.qrPlacement === p.id
                    ? 'bg-red-50 border-red-600 text-red-950 font-bold shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <div className="text-xs leading-tight">{p.label}</div>
                <div className="text-[9.5px] opacity-75 font-normal mt-0.5 leading-tight">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Center Motif Selection */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1">
            <Compass className="w-3 h-3 text-stone-500" />
            <span>क्यूआर के केंद्र का चिन्ह (Center Icon Badge)</span>
          </label>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { id: 'pin', icon: '📍', label: 'लोकेशन पिन' },
              { id: 'swastik', icon: '卐', label: 'शुभ स्वास्तिक' },
              { id: 'mandap', icon: '🛕', label: 'विवाह मंडप' },
              { id: 'none', icon: '⬛', label: 'सादा (Plain)' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleChange('qrCenterIcon', item.id)}
                className={`p-2 rounded-lg border flex flex-col items-center justify-center transition ${
                  data.qrCenterIcon === item.id
                    ? 'bg-red-50 border-red-600 text-red-900 font-bold shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <span className="text-base select-none">{item.icon}</span>
                <span className="text-[10.5px] mt-0.5">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Color Mode */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1">
            <Palette className="w-3 h-3 text-stone-500" />
            <span>क्यूआर कोड का रंग (Color Scheme)</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleChange('qrColorMode', 'theme')}
              className={`p-2 rounded-lg border text-left flex items-center gap-2 transition ${
                data.qrColorMode !== 'dark'
                  ? 'bg-red-50 border-red-600 text-red-950 font-bold shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <div
                className="w-4 h-4 rounded-full border border-stone-400 flex-shrink-0"
                style={{ backgroundColor: data.inkColor || '#a61515' }}
              />
              <div className="text-xs">
                <div>कार्ड थीम रंग (Theme Ink)</div>
                <div className="text-[10px] opacity-75 font-normal">कार्ड के लाल/मैरून रंग से मैच</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleChange('qrColorMode', 'dark')}
              className={`p-2 rounded-lg border text-left flex items-center gap-2 transition ${
                data.qrColorMode === 'dark'
                  ? 'bg-red-50 border-red-600 text-red-950 font-bold shadow-xs'
                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-stone-900 border border-stone-400 flex-shrink-0" />
              <div className="text-xs">
                <div>डार्क चारकोल (High Contrast)</div>
                <div className="text-[10px] opacity-75 font-normal">कैमरा स्कैन हेतु अधिकतम कंट्रास्ट</div>
              </div>
            </button>
          </div>
        </div>

        {/* QR Scan Label Text */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            क्यूआर के नीचे का लेबल (Scan Helper Text)
          </label>
          <div className="flex gap-1.5 mb-1.5 overflow-x-auto pb-1 scrollbar-none">
            {QR_LABEL_PRESETS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => handleChange('qrLabel', l)}
                className={`text-[10px] px-2 py-0.5 rounded-full border transition whitespace-nowrap ${
                  data.qrLabel === l
                    ? 'bg-red-700 text-white border-red-700 font-bold'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={data.qrLabel || ''}
            onChange={(e) => handleChange('qrLabel', e.target.value)}
            placeholder="उदा. मानचित्र हेतु स्कैन करें"
            className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-red-600 focus:outline-none"
          />
        </div>

        {/* QR Size Slider */}
        <div>
          <div className="flex items-center justify-between text-xs font-bold text-stone-700 mb-1">
            <span>क्यूआर कोड साइज़ (Card QR Size)</span>
            <span className="text-red-700 font-mono">{data.qrSize || 58}px</span>
          </div>
          <input
            type="range"
            min="48"
            max="80"
            step="2"
            value={data.qrSize || 58}
            onChange={(e) => handleChange('qrSize', parseInt(e.target.value, 10))}
            className="w-full accent-red-700 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
            <span>कॉम्पैक्ट (48px)</span>
            <span>मानक (58px)</span>
            <span>बड़ा (80px)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
