import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Music,
  Play,
  Pause,
  Volume2,
  Sparkles,
  MapPin,
  Heart,
  Mail,
  Layers,
  Send,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import WeddingCard from './WeddingCard';
import WeddingEnvelope from './WeddingEnvelope';
import WeddingCountdownWidget from '../Controls/WeddingCountdownWidget';
import { shehnaiAudioEngine } from '../../utils/shehnaiAudioEngine';

export default function DigitalInviteModal({
  isOpen,
  onClose,
  cardData,
  setCardData
}) {
  const [activeView, setActiveView] = useState('card'); // 'card' or 'envelope'
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showPetals, setShowPetals] = useState(cardData.flowerShowerAnimation ?? true);
  const [selectedGuestId, setSelectedGuestId] = useState(cardData.activeGuestId || '');

  const canvasRef = useRef(null);
  const petalsRef = useRef([]);
  const animRef = useRef(null);

  // Sync music state with engine
  useEffect(() => {
    if (isOpen && cardData.enableMusic) {
      // Auto-start music when opening modal
      shehnaiAudioEngine.setVolume(cardData.musicVolume || 0.7);
      shehnaiAudioEngine.play(cardData.musicTrackId, cardData.customAudioUrl);
      setIsPlayingMusic(true);

      // Welcome celebratory flower burst
      confetti({
        particleCount: 40,
        spread: 60,
        colors: ['#e11d48', '#fb7185', '#d4af37', '#f43f5e'],
        origin: { y: 0.3 }
      });
    }

    return () => {
      // Don't stop engine immediately if user just closed modal, but sync
    };
  }, [isOpen]);

  // Rose Petals Falling Canvas Animation (पुष्प वर्षा)
  useEffect(() => {
    if (!isOpen || !showPetals) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Generate 45 realistic falling rose petals
    const petalColors = [
      { fill: '#c8102e', shadow: '#7a0010' }, // Deep Crimson Rose
      { fill: '#e62446', shadow: '#960d25' }, // Auspicious Sindoor Red
      { fill: '#ff4d6d', shadow: '#b31032' }, // Pinkish Rose
      { fill: '#ffd166', shadow: '#b8860b' }, // Marigold Golden Yellow
      { fill: '#ff758f', shadow: '#c9184a' }  // Soft Velvet Rose
    ];

    petalsRef.current = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height * 0.8,
      size: 10 + Math.random() * 16,
      speedY: 1.2 + Math.random() * 2.2,
      speedX: -0.8 + Math.random() * 1.6,
      rotation: Math.random() * 360,
      rotationSpeed: -1.8 + Math.random() * 3.6,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.02 + Math.random() * 0.03
    }));

    const renderPetals = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petalsRef.current.forEach((p) => {
        p.y += p.speedY;
        p.sway += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.sway) * 1.2;
        p.rotation += p.rotationSpeed;

        // Reset when falling beyond screen
        if (p.y > canvas.height + 30) {
          p.y = -30;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        // Draw organic petal curvature
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.7);
        ctx.bezierCurveTo(
          p.size * 0.7, -p.size * 0.5,
          p.size * 0.8, p.size * 0.6,
          0, p.size
        );
        ctx.bezierCurveTo(
          -p.size * 0.8, p.size * 0.6,
          -p.size * 0.7, -p.size * 0.5,
          0, -p.size * 0.7
        );

        ctx.fillStyle = p.color.fill;
        ctx.shadowColor = p.color.shadow;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(renderPetals);
    };

    animRef.current = requestAnimationFrame(renderPetals);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isOpen, showPetals]);

  if (!isOpen) return null;

  // Music toggle in modal
  const handleToggleMusic = () => {
    if (isPlayingMusic) {
      shehnaiAudioEngine.stop();
      setIsPlayingMusic(false);
    } else {
      shehnaiAudioEngine.setVolume(cardData.musicVolume || 0.7);
      shehnaiAudioEngine.play(cardData.musicTrackId, cardData.customAudioUrl);
      setIsPlayingMusic(true);
    }
  };

  // Find active guest details
  const activeGuest = cardData.guestList?.find((g) => g.id === selectedGuestId);

  // Generate pristine Hindi WhatsApp Invitation Text
  const generateWhatsAppMessage = () => {
    const isLadkiWale = cardData.templateCategory === 'ladki-wale' || cardData.cardHeading?.includes('वधू');
    const coupleText = isLadkiWale
      ? `सुपुत्री ${cardData.brideName || 'सौ० साक्षी'} संग आयुष्मान ${cardData.groomName || 'चि० अभिषेक'}`
      : `आयुष्मान ${cardData.groomName || 'चि० अभिषेक'} संग सुपुत्री ${cardData.brideName || 'सौ० साक्षी'}`;

    const mainEvent = cardData.events?.[cardData.events.length - 1] || {
      tithi: 'वैशाख शुक्ल पक्ष पंचमी',
      date: 'दिनांक 22-04-2026',
      day: '( बुधवार )',
      event: 'शुभ विवाह'
    };

    let guestGreeting = 'मान्यवर,';
    if (activeGuest) {
      guestGreeting = `मान्यवर श्री ${activeGuest.name} जी (${activeGuest.relation || 'सपरिवार सादर आमंत्रण'}),`;
    }

    let msg = `🌺 ॥ श्री गणेशाय नमः ॥ 🌺\n\n`;
    msg += `${guestGreeting}\n\n`;
    msg += `परमपिता परमात्मा एवं कुलदेवी के असीम आशीर्वाद से हमारे परिवार में:\n\n`;
    msg += `✨ *${coupleText}* ✨\n`;
    msg += `का पावन शुभ विवाह संस्कार सम्पन्न होना निश्चित हुआ है।\n\n`;

    msg += `📅 *शुभ विवाह तिथि:* ${mainEvent.tithi}, ${mainEvent.date} ${mainEvent.day}\n`;
    if (cardData.includeCountdownInWhatsapp !== false && cardData.weddingDateTime) {
      try {
        const target = new Date(cardData.weddingDateTime).getTime();
        const diff = target - new Date().getTime();
        if (diff > 0) {
          const d = Math.floor(diff / (1000 * 60 * 60 * 24));
          const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
          msg += `⏳ *शुभ विवाह में शेष समय:* केवल ${d} दिन और ${h} घंटे!\n`;
        }
      } catch (e) {
        // fallback
      }
    }
    msg += `📍 *विवाह स्थल:* ${cardData.venueName || 'होटल उत्सव पैलेस'}, ${cardData.venueAddress || 'नालन्दा (बिहार)'}\n`;

    if (cardData.includeMapInWhatsapp && cardData.venueGoogleMapsUrl) {
      msg += `🗺️ *गूगल मैप्स लोकेशन:* ${cardData.venueGoogleMapsUrl}\n`;
    }

    if (cardData.includeBaalManuharInWhatsapp && cardData.baalManuharPoem) {
      msg += `\n👦 *बाल मनुहार:* _"${cardData.baalManuharPoem}"_`;
      if (cardData.baalManuharChildren) {
        msg += ` — ${cardData.baalManuharChildren}`;
      }
      msg += `\n`;
    }

    msg += `\nअतः आपसे करबद्ध प्रार्थना है कि सपरिवार पधारकर नव-दंपति को अपना स्नेह व शुभाशीर्वाद प्रदान कर हमें अनुगृहीत करें।\n\n`;
    msg += `🌸 *दर्शनाभिलाषी:* ${cardData.darshanabhilashi || 'मन्नु पासवान एवं समस्त परिवार'}\n`;
    if (cardData.swagatamMembers) {
      msg += `💐 *${cardData.swagatamTitle || 'स्वागतोत्सुक'}:* ${cardData.swagatamMembers}\n`;
    }
    msg += `📞 *सम्पर्क:* ${cardData.phone || '9876543210'}\n`;

    return msg;
  };

  // Direct WhatsApp Share
  const handleShareToWhatsApp = () => {
    const text = generateWhatsAppMessage();
    const encoded = encodeURIComponent(text);
    const phone = activeGuest?.phone ? activeGuest.phone.replace(/[^0-9]/g, '') : '';
    const url = phone
      ? `https://api.whatsapp.com/send?phone=91${phone}&text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;

    window.open(url, '_blank');
  };

  // Copy Invitation Text
  const handleCopyMessage = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  // Copy Digital Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/95 backdrop-blur-xl flex flex-col font-sans select-none animate-in fade-in duration-300">
      {/* Falling Rose Petals Canvas (पुष्प वर्षा) */}
      {showPetals && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-10 w-full h-full"
        />
      )}

      {/* Top Floating Control Bar */}
      <header className="sticky top-0 z-30 bg-stone-900/90 border-b border-amber-500/40 px-4 py-3 flex flex-wrap items-center justify-between gap-3 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-base">
            卐
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-amber-100 flex items-center gap-2">
              <span>डिजिटल विवाह निमंत्रण पत्र</span>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full border border-amber-500/30">
                Interactive Viewer
              </span>
            </h2>
            <p className="text-[11px] text-amber-300/70 hidden sm:block">
              मंगल शहनाई संगीत, पुष्प वर्षा एवं WhatsApp शेयरिंग सुइट
            </p>
          </div>
        </div>

        {/* Center Mode Switcher: Card vs Envelope */}
        <div className="flex items-center bg-stone-950/80 p-1 rounded-xl border border-amber-500/30">
          <button
            type="button"
            onClick={() => setActiveView('card')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeView === 'card'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-amber-200 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>🎴 मुख्य शादी कार्ड</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView('envelope')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
              activeView === 'envelope'
                ? 'bg-amber-500 text-stone-950 shadow-md'
                : 'text-amber-200 hover:text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>💌 शादी का लिफाफा</span>
          </button>
        </div>

        {/* Action Controls: Music, Petals & Close */}
        <div className="flex items-center gap-2">
          {/* Countdown Toggle */}
          <button
            type="button"
            onClick={() =>
              setCardData((prev) => ({
                ...prev,
                enableCountdownTimer: prev.enableCountdownTimer === false ? true : false
              }))
            }
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 ${
              cardData.enableCountdownTimer !== false
                ? 'bg-amber-950/80 border-amber-500/60 text-amber-200'
                : 'bg-stone-800/80 border-stone-700 text-stone-400'
            }`}
            title="शादी का लाइव काउंटडाउन टाइमर ऑन/ऑफ"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">काउंटडाउन:</span>
            <span>{cardData.enableCountdownTimer !== false ? 'चालू' : 'बंद'}</span>
          </button>

          {/* Petals Toggle */}
          <button
            type="button"
            onClick={() => setShowPetals(!showPetals)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 ${
              showPetals
                ? 'bg-rose-950/80 border-rose-500/60 text-rose-200'
                : 'bg-stone-800/80 border-stone-700 text-stone-400'
            }`}
            title="गुलाब की पंखुड़ियों की पुष्प वर्षा ऑन/ऑफ"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden md:inline">पुष्प वर्षा:</span>
            <span>{showPetals ? 'चालू' : 'बंद'}</span>
          </button>

          {/* Music Play/Pause */}
          <button
            type="button"
            onClick={handleToggleMusic}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition flex items-center gap-1.5 ${
              isPlayingMusic
                ? 'bg-amber-500 text-red-950 border-amber-400 shadow-amber-500/30 shadow-md'
                : 'bg-stone-800 border-amber-500/40 text-amber-200 hover:bg-stone-700'
            }`}
            title="मंगल शहनाई संगीत"
          >
            {isPlayingMusic ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>संगीत रोकें</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>🎵 शहनाई बजाएं</span>
              </>
            )}
          </button>

          {/* Close Modal Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-stone-800 text-amber-300 hover:text-white hover:bg-red-900 border border-stone-700 transition"
            title="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Split Layout: Left Card Viewport | Right WhatsApp Sharing Panel */}
      <div className="flex-1 flex flex-col lg:flex-row relative z-20 overflow-hidden">
        {/* Left Side: Scaled Card Canvas Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col items-center justify-start gap-4">
          
          {/* ⏳ Royal Auspicious Wedding Live Countdown Widget */}
          {cardData.enableCountdownTimer !== false && (
            <div className="w-full max-w-md">
              <WeddingCountdownWidget
                weddingDateTime={cardData.weddingDateTime || '2026-04-24T19:00'}
                theme={cardData.countdownTimerTheme || 'royal-gold'}
              />
            </div>
          )}

          <div className="max-w-full transform transition-all duration-300">
            {activeView === 'card' ? (
              <div
                className="rounded-2xl p-2 bg-gradient-to-br from-amber-500/20 to-amber-700/10 border-2 border-amber-500/40"
                style={{
                  boxShadow: '0 0 45px rgba(212, 175, 55, 0.35)'
                }}
              >
                <WeddingCard data={cardData} scale={0.9} />
              </div>
            ) : (
              <div
                className="rounded-2xl p-2 bg-gradient-to-br from-amber-500/20 to-amber-700/10 border-2 border-amber-500/40"
                style={{
                  boxShadow: '0 0 45px rgba(212, 175, 55, 0.35)'
                }}
              >
                <WeddingEnvelope data={cardData} scale={0.9} />
              </div>
            )}
          </div>
        </div>

        {/* Right Side: WhatsApp Suite & Sharing Options */}
        <aside className="w-full lg:w-96 bg-stone-900/95 border-t lg:border-t-0 lg:border-l border-amber-500/30 p-4 sm:p-6 flex flex-col justify-between gap-4 backdrop-blur-md overflow-y-auto">
          <div>
            {/* Panel Heading */}
            <div className="flex items-center gap-2 pb-3 border-b border-amber-500/20">
              <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400">
                <Share2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">WhatsApp आमंत्रण सुइट</h3>
                <p className="text-[11px] text-amber-300/70">
                  1-क्लिक व्यक्तिगत डिजिटल संदेश
                </p>
              </div>
            </div>

            {/* Guest Personalization Selector */}
            <div className="mt-4">
              <label className="text-xs font-bold text-amber-200 block mb-1">
                अतिथि चुनें (Personalized Name):
              </label>
              <select
                value={selectedGuestId}
                onChange={(e) => {
                  setSelectedGuestId(e.target.value);
                  setCardData((prev) => ({
                    ...prev,
                    activeGuestId: e.target.value || null
                  }));
                }}
                className="w-full bg-stone-950 border border-amber-500/40 text-xs text-white rounded-lg px-3 py-2 focus:outline-none focus:border-amber-400"
              >
                <option value="">✏️ सामान्य आमंत्रण (सभी हेतु)</option>
                {cardData.guestList?.map((g, idx) => (
                  <option key={g.id} value={g.id}>
                    #{idx + 1} {g.name} ({g.relation || 'सपरिवार'})
                  </option>
                ))}
              </select>
            </div>

            {/* WhatsApp Message Preview Box */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-amber-300/80">
                  संदेश पूर्वावलोकन (Preview):
                </label>
                <span className="text-[10px] text-green-400 font-mono">
                  WhatsApp Format
                </span>
              </div>
              <div className="bg-stone-950/80 rounded-xl p-3 border border-stone-800 text-stone-300 font-mono text-[11px] leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap select-text">
                {generateWhatsAppMessage()}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 space-y-2.5">
              {/* Main Green WhatsApp Share Button */}
              <button
                type="button"
                onClick={handleShareToWhatsApp}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-green-950/50 transition transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4 fill-current" />
                <span>WhatsApp पर सीधे भेजें</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                {/* Copy Text Button */}
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="py-2 px-3 bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/30 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
                >
                  {copiedText ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">कॉपी हुआ!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>संदेश कॉपी करें</span>
                    </>
                  )}
                </button>

                {/* Copy Link Button */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="py-2 px-3 bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/30 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">लिंक कॉपी हुआ!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>कार्ड लिंक कॉपी</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Audio Track Quick Selector in Panel */}
          <div className="p-3 bg-black/40 rounded-xl border border-amber-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-200 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-amber-400" />
                <span>पृष्ठभूमि संगीत धुन:</span>
              </span>
              <span className="text-[10px] text-amber-400 font-mono">
                {isPlayingMusic ? 'बज रहा है 🎶' : 'शांत'}
              </span>
            </div>
            <select
              value={cardData.musicTrackId}
              onChange={(e) => {
                const trackId = e.target.value;
                setCardData((prev) => ({ ...prev, musicTrackId: trackId }));
                if (isPlayingMusic) {
                  shehnaiAudioEngine.play(trackId, cardData.customAudioUrl);
                }
              }}
              className="mt-2 w-full bg-stone-900 border border-amber-500/30 text-xs text-amber-100 rounded-lg px-2.5 py-1.5 focus:outline-none"
            >
              <option value="shehnai-bilawal">🎷 उस्ताद बिस्मिल्लाह खां शैली मंगल शहनाई</option>
              <option value="shehnai-nagada">🥁 मंगल शहनाई व उत्सव नगाड़ा/ढोलक</option>
              <option value="vedic-shloka">🔔 वैदिक स्वस्तिवाचन व मंदिर शंख-घंटा</option>
              {cardData.customAudioUrl && (
                <option value="custom">📤 कस्टम पारिवारिक शादी संगीत (Uploaded MP3)</option>
              )}
            </select>
          </div>
        </aside>
      </div>
    </div>
  );
}
