import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Trash2,
  Edit2,
  Check,
  Send,
  FileSpreadsheet,
  Share2,
  Sparkles,
  Search,
  CheckCircle2,
  Copy,
  ChevronRight,
  Printer
} from 'lucide-react';

const RELATION_PRESETS = [
  'सपरिवार सादर आमंत्रण',
  'सपरिवार',
  'सपत्निक सादर',
  'सस्नेह निमंत्रण',
  'मित्र मण्डली',
  'सादर आमंत्रण'
];

export default function GuestListForm({ data, onChange, onExportBulkEnvelopes }) {
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkInputText, setBulkInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingGuestId, setEditingGuestId] = useState(null);

  // New Guest Form State
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestRelation, setNewGuestRelation] = useState('सपरिवार सादर आमंत्रण');
  const [newGuestCity, setNewGuestCity] = useState('');
  const [newGuestPhone, setNewGuestPhone] = useState('');

  const guestList = data.guestList || [];
  const activeGuestId = data.activeGuestId;

  const handleUpdateField = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  // Add a single guest
  const handleAddGuest = (e) => {
    e?.preventDefault();
    if (!newGuestName.trim()) {
      alert('कृपया अतिथि का नाम दर्ज करें।');
      return;
    }

    const newGuest = {
      id: `g_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      name: newGuestName.trim(),
      relation: newGuestRelation.trim() || 'सपरिवार सादर आमंत्रण',
      city: newGuestCity.trim(),
      phone: newGuestPhone.replace(/\D/g, '')
    };

    const updatedList = [...guestList, newGuest];
    handleUpdateField('guestList', updatedList);
    handleUpdateField('activeGuestId', newGuest.id);

    // Reset inputs
    setNewGuestName('');
    setNewGuestCity('');
    setNewGuestPhone('');
  };

  // Delete guest
  const handleDeleteGuest = (id) => {
    const updatedList = guestList.filter((g) => g.id !== id);
    const newActiveId = activeGuestId === id ? (updatedList[0]?.id || null) : activeGuestId;
    onChange({
      ...data,
      guestList: updatedList,
      activeGuestId: newActiveId
    });
  };

  // Save edited guest
  const handleSaveEdit = (id, updatedFields) => {
    const updatedList = guestList.map((g) => (g.id === id ? { ...g, ...updatedFields } : g));
    handleUpdateField('guestList', updatedList);
    setEditingGuestId(null);
  };

  // Bulk Paste Parsing
  const handleBulkParse = () => {
    if (!bulkInputText.trim()) return;

    const lines = bulkInputText
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);

    const parsedGuests = lines.map((line, idx) => {
      // Split by comma or tab or hyphen
      const parts = line.split(/[,;\t|]+/).map((p) => p.trim());
      const name = parts[0] || `अतिथि ${guestList.length + idx + 1}`;
      const relation = parts[1] || 'सपरिवार सादर आमंत्रण';
      const city = parts[2] || '';
      const phone = (parts[3] || '').replace(/\D/g, '');

      return {
        id: `g_bulk_${Date.now()}_${idx}`,
        name,
        relation,
        city,
        phone
      };
    });

    const updatedList = [...guestList, ...parsedGuests];
    onChange({
      ...data,
      guestList: updatedList,
      activeGuestId: parsedGuests[0]?.id || activeGuestId
    });

    setBulkInputText('');
    setIsBulkModalOpen(false);
  };

  // Load sample relatives
  const handleLoadSampleGuests = () => {
    const samples = [
      { id: `g_s1`, name: 'श्री अशोक शर्मा जी (चाचा जी)', relation: 'सपरिवार सादर आमंत्रण', city: 'ग्राम- चेरों, नालन्दा', phone: '' },
      { id: `g_s2`, name: 'श्री रामेश्वर प्रसाद जी (मामा जी)', relation: 'सपरिवार', city: 'कंकड़बाग, पटना (बिहार)', phone: '' },
      { id: `g_s3`, name: 'श्री विनोद कुमार जी (फूफा जी)', relation: 'सपत्निक सादर', city: 'स्टेशन रोड, बिहार शरीफ', phone: '' },
      { id: `g_s4`, name: 'श्री संजय सिंह जी (मौसा जी)', relation: 'सपरिवार', city: 'हरनौत, नालन्दा', phone: '' },
      { id: `g_s5`, name: 'श्री राहुल वर्मा जी (मित्र मण्डली)', relation: 'सस्नेह आमंत्रण', city: 'बोरिंग रोड, पटना', phone: '' }
    ];

    onChange({
      ...data,
      guestList: samples,
      activeGuestId: samples[0].id
    });
  };

  // WhatsApp Invite Link Generator
  const handleShareWhatsApp = (guest) => {
    const coupleText = data.hostSide === 'bride'
      ? `आयु० ${data.brideName} संग चि० ${data.groomName}`
      : `चि० ${data.groomName} संग आयु० ${data.brideName}`;

    const venueText = data.venueName ? `\n📍 विवाह स्थल :- ${data.venueName}${data.venueAddress ? `, ${data.venueAddress}` : ''}` : '';
    const mapsText = data.venueMapsUrl ? `\n🌐 लोकेशन मैप :- ${data.venueMapsUrl}` : '';

    const message = `सादर प्रणाम 🙏\n\nआदरणीय ${guest.name} (${guest.relation || 'सपरिवार'}),\n\nपरम पिता परमेश्वर की असीम अनुकम्पा से हमारे परिवार में ${coupleText} के शुभ पावन विवाह के मांगलिक अवसर पर आप सपरिवार सादर आमंत्रित हैं।${venueText}${mapsText}\n\nकृपया सपरिवार पधारकर वर-वधू को अपना शुभाशीर्वाद प्रदान कर हमें अनुगृहीत करें।\n\nविनीत / दर्शनाभिलाषी:\n${data.darshanabhilashiNames || data.aakankshiNames || 'समस्त परिवार'}`;

    const cleanPhone = guest.phone ? guest.phone.replace(/\D/g, '') : '';
    const waUrl = cleanPhone.length >= 10
      ? `https://wa.me/91${cleanPhone.slice(-10)}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(waUrl, '_blank');
  };

  // Filtered guest list
  const filteredGuests = guestList.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (g.city && g.city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-5 text-sm text-stone-700">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-50 to-amber-50 p-3.5 rounded-xl border border-amber-200">
        <div className="flex items-center gap-2 mb-1 text-red-900 font-bold text-base">
          <Users className="w-5 h-5 text-red-700 flex-shrink-0" />
          <span>अतिथि सूची एवं वैयक्तिक निमंत्रण पत्र</span>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          सैकड़ों लिफाफों पर पेन से नाम लिखने की झंझट खत्म! अपने मेहमानों के नाम डालें और एक क्लिक में प्रत्येक मेहमान का व्यक्तिगत लिफाफा तैयार करें या सीधे WhatsApp पर व्यक्तिगत निमंत्रण भेजें।
        </p>
      </div>

      {/* Active Guest Preview Switcher Banner */}
      <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>वर्तमान चयनित अतिथि (Active Guest in Preview)</span>
          </span>
          <span className="text-xs font-mono font-bold text-red-700">
            कुल: {guestList.length} मेहमान
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Default Blank Template Option */}
          <button
            type="button"
            onClick={() => handleUpdateField('activeGuestId', null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              activeGuestId === null
                ? 'bg-red-700 text-white border-red-700 shadow-xs'
                : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
            }`}
          >
            ✏️ साधारण (डॉटेड लाइन्स)
          </button>

          {/* Quick guest list chips */}
          {guestList.slice(0, 4).map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => handleUpdateField('activeGuestId', g.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition truncate max-w-[150px] ${
                activeGuestId === g.id
                  ? 'bg-red-700 text-white border-red-700 shadow-xs'
                  : 'bg-stone-50 text-stone-700 border-stone-300 hover:bg-stone-100'
              }`}
              title={g.name}
            >
              👤 {g.name}
            </button>
          ))}
        </div>

        {/* Personalized Card Salutation Toggle */}
        <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-stone-100">
          <div>
            <div className="text-xs font-bold text-stone-800">
              शादी कार्ड पर भी व्यक्तिगत अभिवादन दिखाएं
            </div>
            <div className="text-[10.5px] text-stone-500">
              "मान्यवर," के स्थान पर "मान्यवर [अतिथि का नाम] सपरिवार," छपेगा
            </div>
          </div>
          <input
            type="checkbox"
            checked={data.personalizedCardSalutation !== false}
            onChange={(e) => handleUpdateField('personalizedCardSalutation', e.target.checked)}
            className="w-4 h-4 text-red-700 rounded accent-red-700 cursor-pointer"
          />
        </label>
      </div>

      {/* Action Buttons: Bulk Paste & Sample Data */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setIsBulkModalOpen(true)}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 rounded-lg text-xs font-bold transition shadow-2xs"
        >
          <FileSpreadsheet className="w-4 h-4 text-red-600" />
          <span>सूची बल्क पेस्ट करें (Excel / WhatsApp)</span>
        </button>

        <button
          type="button"
          onClick={handleLoadSampleGuests}
          className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 rounded-lg text-xs font-semibold transition"
          title="उदाहरण स्वरूप 5 रिश्तेदारों की लिस्ट जोड़ें"
        >
          रिश्तेदार उदाहरण लोड करें
        </button>
      </div>

      {/* Bulk Paste Dialog Modal */}
      {isBulkModalOpen && (
        <div className="p-4 bg-amber-50/90 border border-amber-300 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-red-950 uppercase tracking-wide">
              📋 मेहमानों की लिस्ट एक साथ पेस्ट करें
            </h4>
            <button
              type="button"
              onClick={() => setIsBulkModalOpen(false)}
              className="text-stone-500 hover:text-stone-800 text-xs font-bold"
            >
              ✕ बंद करें
            </button>
          </div>
          <p className="text-[11px] text-stone-600">
            प्रत्येक पंक्ति (Line) में एक नाम लिखें। आप कॉमा (,) लगाकर आमंत्रण प्रकार व शहर भी लिख सकते हैं:<br />
            <code className="text-[10px] bg-white px-1 py-0.5 rounded text-red-700">
              श्री अशोक शर्मा जी, सपरिवार, ग्राम चेरों नालन्दा
            </code>
          </p>
          <textarea
            rows={5}
            value={bulkInputText}
            onChange={(e) => setBulkInputText(e.target.value)}
            placeholder="श्री अशोक शर्मा जी, सपरिवार, ग्राम चेरों&#10;श्री रामेश्वर प्रसाद जी, सपरिवार, पटना&#10;श्री विनोद कुमार जी, सपत्निक, बिहार शरीफ"
            className="w-full text-xs p-2.5 rounded-lg border border-amber-300 focus:ring-1 focus:ring-red-600 focus:outline-none bg-white font-mono"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsBulkModalOpen(false)}
              className="px-3 py-1 text-xs text-stone-600 hover:bg-stone-200 rounded"
            >
              रद्द करें
            </button>
            <button
              type="button"
              onClick={handleBulkParse}
              className="px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded text-xs font-bold shadow-xs"
            >
              सूची में जोड़ें
            </button>
          </div>
        </div>
      )}

      {/* Section: Add New Guest Form */}
      <form onSubmit={handleAddGuest} className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3">
        <h3 className="font-bold text-stone-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
          <UserPlus className="w-3.5 h-3.5 text-red-700" />
          <span>नया अतिथि जोड़ें (Add Single Guest)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Guest Name */}
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-stone-700 mb-1">
              अतिथि का नाम (मान्यवर / श्रीमान सहित) *
            </label>
            <input
              type="text"
              value={newGuestName}
              onChange={(e) => setNewGuestName(e.target.value)}
              placeholder="उदा. श्री अशोक शर्मा जी"
              className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-red-600 focus:outline-none font-semibold text-stone-800"
            />
          </div>

          {/* Relation / Status with Presets */}
          <div>
            <label className="block text-[11px] font-bold text-stone-700 mb-1">
              आमंत्रण प्रकार (Relation / Invitee)
            </label>
            <select
              value={newGuestRelation}
              onChange={(e) => setNewGuestRelation(e.target.value)}
              className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-red-600 focus:outline-none bg-white font-medium cursor-pointer"
            >
              {RELATION_PRESETS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* City / Address */}
          <div>
            <label className="block text-[11px] font-bold text-stone-700 mb-1">
              स्थान / शहर / ग्राम
            </label>
            <input
              type="text"
              value={newGuestCity}
              onChange={(e) => setNewGuestCity(e.target.value)}
              placeholder="उदा. ग्राम- चेरों, नालन्दा"
              className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-red-600 focus:outline-none"
            />
          </div>

          {/* WhatsApp Phone */}
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-stone-700 mb-1">
              मोबाइल नंबर (WhatsApp इनवाइट हेतु - वैकल्पिक)
            </label>
            <input
              type="tel"
              value={newGuestPhone}
              onChange={(e) => setNewGuestPhone(e.target.value)}
              placeholder="उदा. 9876543210"
              className="w-full text-xs p-2 rounded-lg border border-stone-300 focus:ring-1 focus:ring-red-600 focus:outline-none font-mono text-[11px]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-2 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold text-xs rounded-lg transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>अतिथि को सूची में जोड़ें</span>
        </button>
      </form>

      {/* Guest List Search & Items */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-stone-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-red-700" />
            <span>अतिथियों की सूची ({guestList.length})</span>
          </h3>

          {/* Search Box */}
          <div className="relative w-40 sm:w-48">
            <Search className="w-3 h-3 absolute left-2 top-2.5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="नाम या शहर खोजें..."
              className="w-full text-[11px] pl-6 pr-2 py-1 rounded-md border border-stone-200 focus:outline-none focus:ring-1 focus:ring-red-600"
            />
          </div>
        </div>

        {guestList.length === 0 ? (
          <div className="text-center py-6 text-stone-400 text-xs">
            सूची में कोई अतिथि नहीं है। ऊपर से जोड़ें या उदाहरण लोड करें।
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {filteredGuests.map((guest, idx) => {
              const isSelected = activeGuestId === guest.id;
              const isEditing = editingGuestId === guest.id;

              return (
                <div
                  key={guest.id}
                  className={`p-2.5 rounded-lg border transition flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-red-50/80 border-red-500 shadow-xs'
                      : 'bg-stone-50 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {/* Left Info / Select for Preview */}
                  <div
                    onClick={() => handleUpdateField('activeGuestId', guest.id)}
                    className="flex-1 min-w-0 cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-stone-400 font-bold select-none">
                        #{idx + 1}
                      </span>
                      <span className="font-extrabold text-xs text-stone-900 truncate">
                        {guest.name}
                      </span>
                      {isSelected && (
                        <span className="text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.2 rounded-full">
                          प्रीव्यू सक्रिय
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                      <span className="font-semibold text-red-800">{guest.relation}</span>
                      {guest.city && <span>• {guest.city}</span>}
                      {guest.phone && <span className="font-mono text-[10px]">📞 {guest.phone}</span>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {/* WhatsApp Direct Invite */}
                    <button
                      type="button"
                      onClick={() => handleShareWhatsApp(guest)}
                      className="p-1.5 text-emerald-700 hover:bg-emerald-100 rounded transition"
                      title="WhatsApp पर व्यक्तिगत आमंत्रण भेजें"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Preview Button */}
                    <button
                      type="button"
                      onClick={() => handleUpdateField('activeGuestId', guest.id)}
                      className={`px-2 py-1 text-[10.5px] rounded font-bold transition ${
                        isSelected
                          ? 'bg-red-700 text-white'
                          : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
                      }`}
                      title="इस अतिथि का लिफाफा व कार्ड देखें"
                    >
                      {isSelected ? 'सक्रिय' : 'देखें'}
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDeleteGuest(guest.id)}
                      className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                      title="हटाएं"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
