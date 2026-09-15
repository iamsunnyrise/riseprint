import React, { useRef, useState } from 'react';
import {
  Music,
  Play,
  Pause,
  Volume2,
  Upload,
  Sparkles,
  Trash2,
  Share2,
  FileAudio,
  CheckCircle2,
  ExternalLink,
  Clock,
  Calendar
} from 'lucide-react';
import { MUSIC_TRACK_PRESETS } from '../../utils/defaultData';
import { shehnaiAudioEngine } from '../../utils/shehnaiAudioEngine';
import WeddingCountdownWidget from '../Controls/WeddingCountdownWidget';

export default function MusicSettingsForm({
  cardData,
  setCardData,
  onOpenDigitalInvite
}) {
  const [isPlayingTest, setIsPlayingTest] = useState(false);
  const fileInputRef = useRef(null);

  // Auto-sync date from card schedule events
  const handleSyncDateFromEvents = () => {
    const vivahEvent =
      cardData.events?.find(e => e.event?.includes('विवाह')) ||
      cardData.events?.[cardData.events.length - 1];

    if (vivahEvent && vivahEvent.date) {
      const match = vivahEvent.date.match(/(\d{2})[-/.](\d{2})[-/.](\d{4})/);
      if (match) {
        const [, day, month, year] = match;
        const newDateTime = `${year}-${month}-${day}T19:00`;
        setCardData(prev => ({ ...prev, weddingDateTime: newDateTime }));
        alert(`विवाह तिथि सफलतापूर्वक सेट की गई: ${day}-${month}-${year} (सायं 07:00 बजे)`);
        return;
      }
    }
    alert('कार्यक्रम तालिका में विवाह की तारीख (DD-MM-YYYY) प्रारूप में नहीं मिली। कृपया नीचे मैन्युअल सेट करें।');
  };

  // Handle Custom Audio File Upload
  const handleAudioFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (15MB)
    if (file.size > 15 * 1024 * 1024) {
      alert('ऑडियो फाइल का आकार 15 MB से कम होना चाहिए।');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const audioUrl = event.target?.result;
      setCardData((prev) => ({
        ...prev,
        customAudioUrl: audioUrl,
        customAudioFileName: file.name,
        musicTrackId: 'custom'
      }));
      if (isPlayingTest) {
        shehnaiAudioEngine.play('custom', audioUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  // Remove Custom Audio
  const handleRemoveCustomAudio = () => {
    setCardData((prev) => ({
      ...prev,
      customAudioUrl: null,
      customAudioFileName: '',
      musicTrackId: 'shehnai-bilawal'
    }));
    if (isPlayingTest) {
      shehnaiAudioEngine.play('shehnai-bilawal');
    }
  };

  // Test Play/Pause in form
  const handleToggleTestAudio = () => {
    if (isPlayingTest) {
      shehnaiAudioEngine.stop();
      setIsPlayingTest(false);
    } else {
      shehnaiAudioEngine.setVolume(cardData.musicVolume || 0.7);
      shehnaiAudioEngine.play(cardData.musicTrackId, cardData.customAudioUrl);
      setIsPlayingTest(true);
    }
  };

  // Switch Track
  const handleSelectTrack = (trackId) => {
    setCardData((prev) => ({ ...prev, musicTrackId: trackId }));
    if (isPlayingTest) {
      shehnaiAudioEngine.play(trackId, cardData.customAudioUrl);
    }
  };

  return (
    <div className="space-y-6 select-none font-sans">
      {/* Top Banner */}
      <div className="p-3.5 bg-gradient-to-r from-red-950 via-red-900 to-amber-950 rounded-xl text-amber-100 border border-amber-600/40 shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-lg flex-shrink-0">
            🎷
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-1.5">
              <span>मंगल शहनाई संगीत व डिजिटल आमंत्रण</span>
              <span className="bg-amber-500/30 text-amber-300 text-[10px] px-1.5 py-0.5 rounded border border-amber-400/30">
                फ़ीचर 8
              </span>
            </h3>
            <p className="text-[11px] text-amber-200/70">
              वेब ऑडियो सिंथेसाइज़र, पुष्प वर्षा एवं WhatsApp शेयरिंग
            </p>
          </div>
        </div>

        {/* Quick Launch Digital Card Button */}
        {onOpenDigitalInvite && (
          <button
            type="button"
            onClick={onOpenDigitalInvite}
            className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs rounded-lg shadow-md flex items-center gap-1.5 transition flex-shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>डिजिटल कार्ड देखें</span>
          </button>
        )}
      </div>

      {/* 1. Music Master Toggle & Volume */}
      <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-red-700" />
            <div>
              <span className="text-sm font-bold text-stone-900 block">
                मांगलिक पृष्ठभूमि संगीत (Background Music)
              </span>
              <span className="text-xs text-stone-500">
                कार्ड खोलते ही पारंपरिक शहनाई व तानपूरा की मधुर धुन
              </span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={cardData.enableMusic !== false}
              onChange={(e) =>
                setCardData((prev) => ({ ...prev, enableMusic: e.target.checked }))
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-700"></div>
          </label>
        </div>

        {cardData.enableMusic !== false && (
          <>
            {/* Audio Volume & Live Test Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Volume Slider */}
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-stone-700 flex items-center gap-1">
                    <Volume2 className="w-3.5 h-3.5 text-stone-500" />
                    <span>संगीत वॉल्यूम (Volume):</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-red-900">
                    {Math.round((cardData.musicVolume || 0.7) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={cardData.musicVolume || 0.7}
                  onChange={(e) => {
                    const vol = parseFloat(e.target.value);
                    setCardData((prev) => ({ ...prev, musicVolume: vol }));
                    shehnaiAudioEngine.setVolume(vol);
                  }}
                  className="w-full h-2 accent-red-700 bg-stone-200 rounded-lg cursor-pointer"
                />
              </div>

              {/* Test Audio Button */}
              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-amber-950 block">
                    धुन की जाँच करें:
                  </span>
                  <span className="text-[11px] text-amber-800/80 block">
                    {isPlayingTest ? 'संगीत बज रहा है...' : 'प्ले बटन दबाएं'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleToggleTestAudio}
                  className={`py-2 px-3.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition shadow-sm ${
                    isPlayingTest
                      ? 'bg-red-700 hover:bg-red-800 text-white'
                      : 'bg-amber-500 hover:bg-amber-600 text-stone-950'
                  }`}
                >
                  {isPlayingTest ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>रोकें</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>चलाएं</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 2. Track Presets Selection */}
            <div>
              <label className="text-xs font-bold text-stone-800 mb-2 block">
                पारम्परिक मांगलिक धुन का चयन करें:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MUSIC_TRACK_PRESETS.map((track) => {
                  const isSelected = cardData.musicTrackId === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => handleSelectTrack(track.id)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition text-left relative ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50/80 shadow-2xs'
                          : 'border-stone-200 hover:border-amber-400 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xl flex-shrink-0">{track.icon}</span>
                          <div>
                            <span className="text-xs font-bold text-stone-900 block leading-tight">
                              {track.name}
                            </span>
                            <span className="text-[10.5px] text-stone-500 block mt-0.5 leading-tight">
                              {track.subtitle}
                            </span>
                          </div>
                        </div>

                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                        )}
                      </div>

                      <span className="mt-2 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                        {track.badge}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Custom Audio File Upload Section */}
            {cardData.musicTrackId === 'custom' && (
              <div className="p-3.5 bg-stone-50 border-2 border-dashed border-amber-400 rounded-xl">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="audio/*"
                  onChange={handleAudioFileUpload}
                  className="hidden"
                />

                {cardData.customAudioUrl ? (
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileAudio className="w-5 h-5 text-red-700 flex-shrink-0" />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-stone-900 truncate block">
                          {cardData.customAudioFileName || 'कस्टम ऑडियो फाइल'}
                        </span>
                        <span className="text-[10px] text-green-700 font-semibold">
                          ✓ ऑडियो सफलतापूर्वक लोड हुआ
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs px-2.5 py-1 bg-white border border-stone-300 hover:bg-stone-100 rounded-md font-medium text-stone-700"
                      >
                        बदलें
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveCustomAudio}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition"
                        title="ऑडियो हटाएं"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-2">
                    <Upload className="w-6 h-6 text-amber-600 mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-stone-800">
                      अपनी पसंदीदा MP3 / ऑडियो फाइल अपलोड करें
                    </p>
                    <p className="text-[11px] text-stone-500 mb-2">
                      पारिवारिक शादी का गाना, शहनाई रिकॉर्डिंग या भजन (Max 15MB)
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-1.5 bg-red-800 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
                    >
                      फाइल चुनें
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* 2. ⏳ Wedding Live Countdown Timer Settings */}
      <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-red-700" />
            <div>
              <span className="text-sm font-bold text-stone-900 block">
                शादी का लाइव काउंटडाउन टाइमर (Wedding Countdown)
              </span>
              <span className="text-xs text-stone-500">
                डिजिटल कार्ड में दिन, घंटे, मिनट व सेकंड की सजीव उल्टी गिनती
              </span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={cardData.enableCountdownTimer !== false}
              onChange={(e) =>
                setCardData((prev) => ({
                  ...prev,
                  enableCountdownTimer: e.target.checked
                }))
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
          </label>
        </div>

        {cardData.enableCountdownTimer !== false && (
          <div className="space-y-3.5 pt-1">
            {/* Date & Time Picker with Auto Sync button */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-stone-800 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>विवाह तिथि एवं शुभ लग्न समय:</span>
                </label>
                <button
                  type="button"
                  onClick={handleSyncDateFromEvents}
                  className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded border border-amber-300 transition cursor-pointer"
                  title="मुख्य वैवाहिक कार्यक्रम तालिका से शादी की तारीख स्वतः लें"
                >
                  कार्यक्रम से सिंक करें ↻
                </button>
              </div>

              <input
                type="datetime-local"
                value={cardData.weddingDateTime || '2026-04-24T19:00'}
                onChange={(e) =>
                  setCardData((prev) => ({
                    ...prev,
                    weddingDateTime: e.target.value
                  }))
                }
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono"
              />
              <span className="text-[10.5px] text-stone-500 block mt-1">
                विवाह की तिथि और वह समय चुनें जब पावन फेरे या बारात आगमन का समय हो।
              </span>
            </div>

            {/* Countdown Theme Presets */}
            <div>
              <label className="text-xs font-bold text-stone-800 mb-1.5 block">
                काउंटडाउन थीम (Locket Theme):
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'royal-gold', name: '👑 रॉयल गोल्ड', desc: 'स्वर्ण नक्काशी' },
                  { id: 'sindoor-red', name: '🪔 सिन्दूरी लाल', desc: 'वैदिक लाल' },
                  { id: 'festive-glow', name: '✨ दीपक आभामंडल', desc: 'उत्सव रोशनी' }
                ].map((th) => {
                  const isSelected = (cardData.countdownTimerTheme || 'royal-gold') === th.id;
                  return (
                    <button
                      key={th.id}
                      type="button"
                      onClick={() =>
                        setCardData((prev) => ({
                          ...prev,
                          countdownTimerTheme: th.id
                        }))
                      }
                      className={`p-2 rounded-lg border text-left transition text-xs ${
                        isSelected
                          ? 'border-amber-600 bg-amber-50 font-bold text-stone-900 shadow-2xs ring-1 ring-amber-500'
                          : 'border-stone-200 hover:border-amber-300 bg-white text-stone-700'
                      }`}
                    >
                      <span className="block leading-tight">{th.name}</span>
                      <span className="text-[10px] text-stone-500 block mt-0.5">{th.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Interactive Mini-Preview inside form */}
            <div className="p-3 bg-stone-900 rounded-xl border border-stone-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>लाइव टाइमर पूर्वावलोकन (Live Preview):</span>
                </span>
                <span className="text-[10px] text-green-400 font-mono">
                  Real-time Active
                </span>
              </div>
              <WeddingCountdownWidget
                weddingDateTime={cardData.weddingDateTime || '2026-04-24T19:00'}
                theme={cardData.countdownTimerTheme || 'royal-gold'}
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Digital Card & WhatsApp Settings */}
      <div className="bg-white rounded-xl p-4 border border-stone-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-stone-100">
          <Share2 className="w-4 h-4 text-red-700" />
          <h4 className="text-sm font-bold text-stone-900">
            डिजिटल कार्ड व WhatsApp आमंत्रण सेटिंग्स
          </h4>
        </div>

        {/* Flower Shower Toggle */}
        <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200">
          <div className="flex items-center gap-2">
            <span className="text-base">🌸</span>
            <div>
              <span className="text-xs font-bold text-stone-900 block">
                पुष्प वर्षा (गुलाब की पंखुड़ियाँ) एनिमेशन
              </span>
              <span className="text-[11px] text-stone-500">
                डिजिटल कार्ड खुलने पर स्क्रीन पर गिरती हुई सजीव पंखुड़ियाँ
              </span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={cardData.flowerShowerAnimation !== false}
              onChange={(e) =>
                setCardData((prev) => ({
                  ...prev,
                  flowerShowerAnimation: e.target.checked
                }))
              }
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
          </label>
        </div>

        {/* WhatsApp Content Checkboxes */}
        <div className="space-y-2 pt-1">
          <label className="text-xs font-bold text-stone-800 block">
            WhatsApp निमंत्रण संदेश में क्या-क्या शामिल करें:
          </label>

          <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={cardData.includeCountdownInWhatsapp !== false}
              onChange={(e) =>
                setCardData((prev) => ({
                  ...prev,
                  includeCountdownInWhatsapp: e.target.checked
                }))
              }
              className="w-4 h-4 accent-red-700 rounded"
            />
            <span>⏳ WhatsApp आमंत्रण संदेश में शेष दिन व घंटे शामिल करें</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={cardData.includeMapInWhatsapp !== false}
              onChange={(e) =>
                setCardData((prev) => ({
                  ...prev,
                  includeMapInWhatsapp: e.target.checked
                }))
              }
              className="w-4 h-4 accent-red-700 rounded"
            />
            <span>🗺️ विवाह स्थल का Google Maps लिंक जोड़ें</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={cardData.includeBaalManuharInWhatsapp !== false}
              onChange={(e) =>
                setCardData((prev) => ({
                  ...prev,
                  includeBaalManuharInWhatsapp: e.target.checked
                }))
              }
              className="w-4 h-4 accent-red-700 rounded"
            />
            <span>👦 बच्चों का बाल मनुहार दोहा जोड़ें</span>
          </label>
        </div>

        {/* Launch Digital Card Fullscreen Button */}
        {onOpenDigitalInvite && (
          <button
            type="button"
            onClick={onOpenDigitalInvite}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-red-900 to-amber-900 hover:from-red-800 hover:to-amber-800 text-amber-100 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
          >
            <ExternalLink className="w-4 h-4 text-amber-300" />
            <span>फुल-स्क्रीन डिजिटल शादी कार्ड व WhatsApp शेयर खोलें</span>
          </button>
        )}
      </div>
    </div>
  );
}
