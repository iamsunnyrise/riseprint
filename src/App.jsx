import React, { useState, useRef } from 'react';
import {
  Download,
  Printer,
  FileText,
  Sparkles,
  RefreshCw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Heart,
  Calendar,
  BookOpen,
  Users,
  Palette,
  Check,
  Layers,
  Mail,
  Files,
  MapPin,
  Image as ImageIcon,
  Music
} from 'lucide-react';
import confetti from 'canvas-confetti';

import WeddingCard from './components/Preview/WeddingCard';
import WeddingEnvelope from './components/Preview/WeddingEnvelope';
import DigitalInviteModal from './components/Preview/DigitalInviteModal';
import ShehnaiMusicPlayer from './components/Audio/ShehnaiMusicPlayer';
import TemplateSelector from './components/Editor/TemplateSelector';
import BasicDetailsForm from './components/Editor/BasicDetailsForm';
import EventScheduleForm from './components/Editor/EventScheduleForm';
import VenueQrForm from './components/Editor/VenueQrForm';
import GuestListForm from './components/Editor/GuestListForm';
import MusicSettingsForm from './components/Editor/MusicSettingsForm';
import ShlokaShayariForm from './components/Editor/ShlokaShayariForm';
import FamilyDetailsForm from './components/Editor/FamilyDetailsForm';
import EnvelopeEditorForm from './components/Editor/EnvelopeEditorForm';
import StyleSettings from './components/Editor/StyleSettings';
import ScreenPrintForm from './components/Editor/ScreenPrintForm';
import PhotoUploadForm from './components/Editor/PhotoUploadForm';

import HindiKeyboardHelper from './components/Controls/HindiKeyboardHelper';
import DtpFontConverterModal from './components/Controls/DtpFontConverterModal';
import DraftProofModal from './components/Controls/DraftProofModal';
import { useHindiTyping } from './context/HindiTypingContext';

import { DEFAULT_CARD_DATA, CARD_SIZES, ENVELOPE_SIZES, CARD_TEMPLATES } from './utils/defaultData';
import {
  downloadCardPDF,
  downloadCardPNG,
  downloadEnvelopePDF,
  downloadEnvelopePNG,
  downloadCombinedCardAndEnvelopePDF,
  downloadBulkPersonalizedEnvelopesPDF,
  downloadScreenPrintPDF,
  downloadScreenPrintPNG,
  triggerBrowserPrint
} from './utils/pdfExport';


export default function App() {
  const [cardData, setCardData] = useState(DEFAULT_CARD_DATA);
  const [activeTab, setActiveTab] = useState('templates'); // templates, basic, schedule, shloka, family, envelope, style
  const [previewMode, setPreviewMode] = useState('card'); // 'card' or 'envelope'
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState('');
  const [zoomScale, setZoomScale] = useState(0.95);
  const [isDigitalModalOpen, setIsDigitalModalOpen] = useState(false);
  const [isDtpModalOpen, setIsDtpModalOpen] = useState(false);
  const [isDraftProofModalOpen, setIsDraftProofModalOpen] = useState(false);
  const { isHindiTyping, toggleHindiTyping } = useHindiTyping();

  const cardRef = useRef(null);
  const envelopeRef = useRef(null);

  const handleResetToDefault = () => {
    if (window.confirm('क्या आप कार्ड को मूल टेम्पलेट (Reference Photo) पर रीसेट करना चाहते हैं?')) {
      setCardData(DEFAULT_CARD_DATA);
    }
  };

  const handleSelectTemplate = (templateData) => {
    setCardData(templateData);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 }
    });
  };

  // Export Card / Envelope PDF based on active preview
  const handleExportPDF = async () => {
    try {
      setIsExporting(true);
      const cardEl = cardRef.current || document.getElementById('wedding-card-element');
      const envEl = envelopeRef.current || document.getElementById('wedding-envelope-element');

      if (cardData.screenPrintMode) {
        setExportMessage('600 DPI बटर पेपर / स्क्रीन प्रिंट मास्टर PDF तैयार हो रही है...');
        const targetRef = previewMode === 'envelope' ? envEl : cardEl;
        const sizeKey = previewMode === 'envelope' ? cardData.envelopeSizeKey : cardData.sizeKey;
        await downloadScreenPrintPDF(targetRef, sizeKey, previewMode, cardData.screenPrintMirror, cardData.screenPrintInvert);
      } else if (previewMode === 'envelope') {
        setExportMessage('300 DPI लिफाफा PDF तैयार हो रही है...');
        await downloadEnvelopePDF(envEl, cardData.envelopeSizeKey, cardData.envelopeTitle || 'Vivah_Lifafa');
      } else {
        setExportMessage('300 DPI शादी कार्ड PDF तैयार हो रही है...');
        await downloadCardPDF(cardEl, cardData.sizeKey, cardData.groomName, cardData.brideName);
      }
      
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setExportMessage(
        cardData.screenPrintMode
          ? '600 DPI बटर पेपर PDF सफलतापूर्वक डाउनलोड हो गई!'
          : 'PDF सफलतापूर्वक डाउनलोड हो गई!'
      );
      setTimeout(() => setExportMessage(''), 3500);
    } catch (err) {
      console.error(err);
      setExportMessage(err?.message || 'डाउनलोड में त्रुटि हुई, कृपया पुनः प्रयास करें।');
      setTimeout(() => setExportMessage(''), 5000);
    } finally {
      setIsExporting(false);
    }
  };

  // Export Combined Card + Envelope PDF
  const handleExportCombinedPDF = async () => {
    try {
      setIsExporting(true);
      setExportMessage('कार्ड + लिफाफा दोनों की संयुक्त 2-पेज PDF तैयार हो रही है...');
      const cardEl = cardRef.current || document.getElementById('wedding-card-element');
      const envEl = envelopeRef.current || document.getElementById('wedding-envelope-element');

      await downloadCombinedCardAndEnvelopePDF(
        cardEl,
        envEl,
        cardData.sizeKey,
        cardData.envelopeSizeKey,
        cardData.groomName
      );

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
      setExportMessage('संयुक्त PDF सफलतापूर्वक डाउनलोड हो गई!');
      setTimeout(() => setExportMessage(''), 3500);
    } catch (err) {
      console.error(err);
      setExportMessage(err?.message || 'संयुक्त PDF डाउनलोड में त्रुटि हुई');
      setTimeout(() => setExportMessage(''), 5000);
    } finally {
      setIsExporting(false);
    }
  };

  // Export PNG based on active preview
  const handleExportPNG = async () => {
    try {
      setIsExporting(true);
      const cardEl = cardRef.current || document.getElementById('wedding-card-element');
      const envEl = envelopeRef.current || document.getElementById('wedding-envelope-element');

      if (cardData.screenPrintMode) {
        setExportMessage('600 DPI बटर पेपर अल्ट्रा-एचडी इमेज तैयार हो रही है...');
        const targetRef = previewMode === 'envelope' ? envEl : cardEl;
        const sizeKey = previewMode === 'envelope' ? cardData.envelopeSizeKey : cardData.sizeKey;
        await downloadScreenPrintPNG(targetRef, sizeKey, previewMode, cardData.screenPrintMirror, cardData.screenPrintInvert);
      } else if (previewMode === 'envelope') {
        setExportMessage('WhatsApp हेतु लिफाफा HD इमेज तैयार हो रही है...');
        await downloadEnvelopePNG(envEl, cardData.envelopeSizeKey, cardData.envelopeTitle || 'Vivah_Lifafa');
      } else {
        setExportMessage('WhatsApp हेतु शादी कार्ड HD इमेज तैयार हो रही है...');
        await downloadCardPNG(cardEl, cardData.sizeKey, cardData.groomName);
      }
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      setExportMessage(
        cardData.screenPrintMode
          ? 'बटर पेपर इमेज सफलतापूर्वक डाउनलोड हो गई!'
          : 'इमेज सफलतापूर्वक डाउनलोड हो गई!'
      );
      setTimeout(() => setExportMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setExportMessage(err?.message || 'डाउनलोड में त्रुटि हुई');
      setTimeout(() => setExportMessage(''), 5000);
    } finally {
      setIsExporting(false);
    }
  };

  // Export Draft Proof Image (WhatsApp Ready with Security Watermark)
  const handleExportDraftPNG = async () => {
    try {
      setIsExporting(true);
      setExportMessage('कच्चा प्रूफ (Draft Proof) HD इमेज तैयार हो रही है...');

      // Ensure draft proof mode is active
      if (!cardData.isDraftProofMode) {
        setCardData(prev => ({ ...prev, isDraftProofMode: true, proofStatus: 'draft' }));
        await new Promise(r => setTimeout(r, 120));
      }

      const cardEl = cardRef.current || document.getElementById('wedding-card-element');
      const envEl = envelopeRef.current || document.getElementById('wedding-envelope-element');
      const clientName = cardData.clientProofName || cardData.groomName || 'Client';

      if (previewMode === 'envelope') {
        await downloadEnvelopePNG(envEl, cardData.envelopeSizeKey, `Draft_Proof_Lifafa_${clientName}`);
      } else {
        await downloadCardPNG(cardEl, cardData.sizeKey, `Draft_Proof_Card_${clientName}`);
      }

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
      setExportMessage('कच्चा प्रूफ इमेज सफलतापूर्वक डाउनलोड हो गई!');
      setTimeout(() => setExportMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setExportMessage('ड्राफ्ट इमेज डाउनलोड में त्रुटि हुई');
      setTimeout(() => setExportMessage(''), 5000);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    triggerBrowserPrint(previewMode, cardData.sizeKey, cardData.envelopeSizeKey);
  };

  // Bulk Multi-Page PDF Export for all guests (Feature 3)
  const handleExportBulkEnvelopes = async () => {
    if (!envelopeRef.current) return;
    if (!cardData.guestList || cardData.guestList.length === 0) {
      alert('कृपया पहले "अतिथि सूची" में मेहमान जोड़ें।');
      return;
    }
    try {
      setIsExporting(true);
      setExportMessage(`सभी ${cardData.guestList.length} मेहमानों के लिफाफे तैयार हो रहे हैं...`);
      await downloadBulkPersonalizedEnvelopesPDF(
        envelopeRef.current,
        cardData.guestList,
        cardData.envelopeSizeKey,
        (current, total, name) => {
          setExportMessage(`लिफाफा ${current}/${total} (${name}) PDF में जोड़ा जा रहा है...`);
        }
      );
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
      setExportMessage(`कुल ${cardData.guestList.length} मेहमानों के लिफाफे की संयुक्त PDF डाउनलोड हो गई!`);
      setTimeout(() => setExportMessage(''), 4000);
    } catch (err) {
      console.error(err);
      setExportMessage('बल्क PDF एक्सपोर्ट में त्रुटि हुई');
    } finally {
      setIsExporting(false);
    }
  };

  // Guest Switcher Next / Prev
  const handlePrevGuest = () => {
    const list = cardData.guestList || [];
    if (list.length === 0) return;
    const currentIndex = list.findIndex((g) => g.id === cardData.activeGuestId);
    if (currentIndex <= 0) {
      setCardData({ ...cardData, activeGuestId: list[list.length - 1].id });
    } else {
      setCardData({ ...cardData, activeGuestId: list[currentIndex - 1].id });
    }
  };

  const handleNextGuest = () => {
    const list = cardData.guestList || [];
    if (list.length === 0) return;
    const currentIndex = list.findIndex((g) => g.id === cardData.activeGuestId);
    if (currentIndex === -1 || currentIndex >= list.length - 1) {
      setCardData({ ...cardData, activeGuestId: list[0].id });
    } else {
      setCardData({ ...cardData, activeGuestId: list[currentIndex + 1].id });
    }
  };

  const currentCardSize = CARD_SIZES[cardData.sizeKey] || CARD_SIZES['7x9'];
  const currentEnvelopeSize = ENVELOPE_SIZES[cardData.envelopeSizeKey] || ENVELOPE_SIZES['standard'];

  const tabs = [
    { id: 'templates', label: 'टेम्पलेट्स', icon: Layers, badge: '6' },
    { id: 'basic', label: 'वर-वधू विवरण', icon: Heart },
    { id: 'schedule', label: 'कार्यक्रम तालिका', icon: Calendar },
    { id: 'venue', label: 'विवाह स्थल व QR', icon: MapPin },
    { id: 'envelope', label: 'शादी का लिफाफा', icon: Mail },
    { id: 'guests', label: 'अतिथि सूची', icon: Users, badge: `${cardData.guestList?.length || 0}` },
    {
      id: 'music',
      label: 'संगीत व WhatsApp',
      icon: Music,
      badge: cardData.enableMusic ? '🎵' : undefined
    },
    { id: 'shloka', label: 'श्लोक व शायरी', icon: BookOpen },
    { id: 'family', label: 'परिवार व प्रेस', icon: Users },
    {
      id: 'style',
      label: 'थीम, पेपर व वॉटरमार्क',
      icon: Palette,
      badge: cardData.enableWatermark ? '🪔' : undefined
    },
    {
      id: 'photos',
      label: 'फोटो व देव चित्र',
      icon: ImageIcon,
      badge: cardData.showCouplePhoto || cardData.customDeityImage ? '✓' : undefined
    },
    {
      id: 'screenprint',
      label: 'बटर पेपर मोड',
      icon: Printer,
      badge: cardData.screenPrintMode ? 'ON' : undefined
    }
  ];



  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-red-950 text-amber-100 border-b-2 border-amber-600 px-3 py-2 sm:px-6 flex flex-wrap items-center justify-between gap-3 shadow-md no-print sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-lg flex-shrink-0">
            卐
          </div>
          <div>
            <h1 className="text-sm sm:text-base md:text-lg font-bold tracking-wide text-white flex items-center gap-2">
              <span>विवाह निमंत्रण पत्र निर्माता</span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full font-medium hidden md:inline">
                Professional Print Engine
              </span>
            </h1>
            <p className="text-[10px] sm:text-[11px] text-amber-200/70 hidden sm:block">
              पारम्परिक भारतीय शादी कार्ड व मैचिंग लिफाफा (Wedding Card & Envelope Suite)
            </p>
          </div>
        </div>

        {/* Quick Actions & Export Controls */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Top Quick Template Dropdown */}
          <div className="hidden xl:flex items-center gap-1.5 bg-red-900/80 border border-amber-500/40 px-2.5 py-1 rounded-lg">
            <span className="text-xs font-semibold text-amber-200 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>टेम्पलेट:</span>
            </span>
            <select
              onChange={(e) => {
                const found = CARD_TEMPLATES.find((t) => t.id === e.target.value);
                if (found) handleSelectTemplate(found.data);
              }}
              className="bg-transparent text-xs font-bold text-white cursor-pointer focus:outline-none"
            >
              {CARD_TEMPLATES.map((t) => (
                <option key={t.id} value={t.id} className="bg-stone-900 text-white">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* English to Hindi Phonetic Typing Toggle */}
          <button
            type="button"
            onClick={toggleHindiTyping}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg font-bold transition shadow-sm border ${
              isHindiTyping
                ? 'bg-amber-400 text-stone-950 border-amber-300 ring-2 ring-amber-300/60'
                : 'bg-red-900/60 hover:bg-red-900 text-amber-200 border-amber-500/30'
            }`}
            title="इंग्लिश ➔ हिंदी टाइपिंग (शॉर्टकट: Ctrl+G)"
          >
            <span className="text-xs font-extrabold bg-stone-900 text-amber-300 px-1 rounded">
              {isHindiTyping ? 'अ' : 'A'}
            </span>
            <span className="hidden sm:inline">
              {isHindiTyping ? 'हिंदी टाइपिंग: चालू' : 'हिंदी टाइपिंग: बंद'}
            </span>
            <span className="sm:hidden">
              {isHindiTyping ? 'हिंदी ON' : 'हिंदी OFF'}
            </span>
          </button>

          {/* DTP Press Font Converter Modal Trigger */}
          <button
            type="button"
            onClick={() => setIsDtpModalOpen(true)}
            className="flex items-center gap-1 text-xs bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-500/40 px-2 py-1.5 rounded-lg transition font-semibold"
            title="कृतिदेव 010 / चाणक्य / श्रीलिपि DTP फॉन्ट कनवर्टर (CorelDRAW हेतु)"
          >
            <span className="text-amber-400 font-bold">⚡</span>
            <span className="hidden lg:inline">कृतिदेव / DTP कनवर्टर</span>
            <span className="lg:hidden">DTP</span>
          </button>

          <button
            type="button"
            onClick={handleResetToDefault}
            className="flex items-center gap-1 text-xs bg-red-900/60 hover:bg-red-900 text-amber-200 border border-amber-500/30 px-2 py-1.5 rounded-lg transition"
            title="मूल टेम्पलेट पर रीसेट करें"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">रीसेट</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1 text-xs bg-stone-800 hover:bg-stone-700 text-white px-2.5 py-1.5 rounded-lg border border-stone-600 transition shadow-sm"
            title={previewMode === 'envelope' ? 'लिफाफा सीधे प्रिंट करें' : 'कार्ड सीधे प्रिंट करें'}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>प्रिंट ({previewMode === 'envelope' ? 'लिफाफा' : 'कार्ड'})</span>
          </button>

          <button
            type="button"
            onClick={handleExportPNG}
            disabled={isExporting}
            className="flex items-center gap-1 text-xs bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-1.5 rounded-lg transition shadow-sm font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>इमेज (WhatsApp)</span>
          </button>

          {/* Combined Card + Envelope Export */}
          <button
            type="button"
            onClick={handleExportCombinedPDF}
            disabled={isExporting}
            className="hidden sm:flex items-center gap-1.5 text-xs bg-purple-800 hover:bg-purple-700 text-purple-100 font-bold px-2.5 py-1.5 rounded-lg transition shadow-sm border border-purple-500/40"
            title="कार्ड और लिफाफा दोनों को 2-पेज की संयुक्त PDF में डाउनलोड करें"
          >
            <Files className="w-3.5 h-3.5 text-amber-300" />
            <span>कार्ड + लिफाफा PDF</span>
          </button>

          {/* Bulk Envelopes for All Guests */}
          <button
            type="button"
            onClick={handleExportBulkEnvelopes}
            disabled={isExporting}
            className="hidden md:flex items-center gap-1.5 text-xs bg-indigo-800 hover:bg-indigo-700 text-indigo-100 font-bold px-2.5 py-1.5 rounded-lg transition shadow-sm border border-indigo-500/40"
            title="सभी मेहमानों के नाम का अलग-अलग लिफाफा 1 ही PDF में डाउनलोड करें"
          >
            <Users className="w-3.5 h-3.5 text-indigo-300" />
            <span>सभी लिफाफे PDF ({cardData.guestList?.length || 0})</span>
          </button>

          {/* 🎵 Fullscreen Digital Card & WhatsApp Viewer */}
          <button
            type="button"
            onClick={() => setIsDigitalModalOpen(true)}
            className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold px-3 py-1.5 rounded-lg shadow-md transition border border-amber-300 cursor-pointer"
            title="फुल-स्क्रीन डिजिटल शादी कार्ड, मंगल शहनाई व WhatsApp शेयर"
          >
            <Sparkles className="w-3.5 h-3.5 fill-current text-red-950" />
            <span>🎵 डिजिटल कार्ड</span>
          </button>

          {/* 📑 Draft Proof & Client WhatsApp Approval Modal Trigger */}
          <button
            type="button"
            onClick={() => {
              if (!cardData.isDraftProofMode) {
                setCardData(prev => ({
                  ...prev,
                  isDraftProofMode: true,
                  proofStatus: prev.proofStatus || 'draft'
                }));
              }
              setIsDraftProofModalOpen(true);
            }}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition border cursor-pointer ${
              cardData.isDraftProofMode
                ? cardData.proofStatus === 'approved'
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 ring-2 ring-emerald-400/50'
                  : 'bg-amber-400 hover:bg-amber-300 text-stone-950 border-amber-300 ring-2 ring-amber-300/60'
                : 'bg-stone-800 hover:bg-stone-700 text-amber-200 border-amber-500/40'
            }`}
            title="कच्चा प्रूफ (Draft Approval) मोड, सुरक्षा वॉटरमार्क व सीधा WhatsApp शेयरिंग"
          >
            <span className="text-sm">📑</span>
            <span>
              {cardData.isDraftProofMode
                ? cardData.proofStatus === 'approved'
                  ? 'स्वीकृत (Approved)'
                  : 'कच्चा प्रूफ (Draft)'
                : 'कच्चा प्रूफ (WhatsApp)'}
            </span>
          </button>

          {/* Quick Screen Print / Butter Paper Mode Toggle */}
          <button
            type="button"
            onClick={() => setCardData(prev => ({ ...prev, screenPrintMode: !prev.screenPrintMode }))}
            className={`flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg font-bold transition shadow-sm border ${
              cardData.screenPrintMode
                ? 'bg-amber-400 text-stone-950 border-amber-300 ring-2 ring-amber-300/60'
                : 'bg-red-900/60 hover:bg-red-900 text-amber-200 border-amber-500/30'
            }`}
            title="स्क्रीन प्रिंटिंग व बटर पेपर मास्टर मोड (100% सॉलिड ब्लैक)"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {cardData.screenPrintMode ? 'बटर पेपर: सक्रिय' : 'बटर पेपर मोड'}
            </span>
            <span className="sm:hidden">
              {cardData.screenPrintMode ? 'बटर ऑन' : 'बटर मोड'}
            </span>
          </button>

          {/* Active View PDF Download */}
          <button
            type="button"
            onClick={handleExportPDF}
            disabled={isExporting}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition shadow-md ${
              cardData.screenPrintMode
                ? 'bg-stone-900 hover:bg-black text-amber-300 border border-amber-400'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-red-950'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>
              {cardData.screenPrintMode
                ? 'बटर पेपर PDF (600 DPI)'
                : previewMode === 'envelope'
                ? 'लिफाफा PDF (300 DPI)'
                : 'कार्ड PDF (300 DPI)'}
            </span>
          </button>
        </div>
      </header>

      {/* Export Status Banner */}
      {exportMessage && (
        <div className="bg-amber-600 text-white text-xs py-1.5 px-4 text-center font-semibold shadow-inner transition flex items-center justify-center gap-2 no-print">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{exportMessage}</span>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Side: Customization & Form Controls */}
        <aside className="w-full lg:w-[460px] xl:w-[500px] flex-shrink-0 bg-white border-r border-stone-200 flex flex-col h-[420px] lg:h-[calc(100vh-58px)] no-print">
          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto border-b border-stone-200 bg-stone-50 p-1.5 gap-1 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === 'envelope') {
                      setPreviewMode('envelope');
                    }
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition relative ${
                    isActive
                      ? 'bg-red-700 text-white shadow-sm'
                      : 'text-stone-600 hover:bg-stone-200/70'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-amber-400 text-red-950' : 'bg-red-100 text-red-700'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Content Panels */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === 'templates' && (
              <TemplateSelector
                currentData={cardData}
                onSelectTemplate={handleSelectTemplate}
              />
            )}
            {activeTab === 'basic' && (
              <BasicDetailsForm data={cardData} onChange={setCardData} />
            )}
            {activeTab === 'schedule' && (
              <EventScheduleForm data={cardData} onChange={setCardData} />
            )}
            {activeTab === 'venue' && (
              <VenueQrForm data={cardData} onChange={setCardData} />
            )}
            {activeTab === 'envelope' && (
              <EnvelopeEditorForm data={cardData} onChange={setCardData} />
            )}
            {activeTab === 'guests' && (
              <GuestListForm
                data={cardData}
                onChange={setCardData}
                onExportBulkEnvelopes={handleExportBulkEnvelopes}
              />
            )}
            {activeTab === 'music' && (
              <MusicSettingsForm
                cardData={cardData}
                setCardData={setCardData}
                onOpenDigitalInvite={() => setIsDigitalModalOpen(true)}
              />
            )}

            {activeTab === 'shloka' && (
              <ShlokaShayariForm data={cardData} onChange={setCardData} />
            )}
            {activeTab === 'family' && (
              <FamilyDetailsForm data={cardData} onChange={setCardData} />
            )}
            {activeTab === 'style' && (
              <StyleSettings data={cardData} onChange={setCardData} />
            )}
            {activeTab === 'photos' && (
              <PhotoUploadForm data={cardData} onChange={setCardData} />
            )}
            {activeTab === 'screenprint' && (
              <ScreenPrintForm data={cardData} onChange={setCardData} />
            )}

            {/* Quick Hindi Typing & Copy Tool */}
            <div className="pt-2 border-t">
              <HindiKeyboardHelper onOpenDtpConverter={() => setIsDtpModalOpen(true)} />
            </div>
          </div>
        </aside>

        {/* Right Side: Live Interactive Canvas (Card vs Envelope) */}
        <main className="flex-1 flex flex-col bg-stone-200/80 overflow-hidden relative print-container">
          {/* Canvas Toolbar with View Switcher */}
          <div className="bg-stone-100/95 backdrop-blur border-b border-stone-300 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-stone-700 no-print gap-2">
            
            <div className="flex items-center flex-wrap gap-2">
              {/* View Mode Switcher: Card ⇄ Envelope */}
              <div className="flex items-center bg-stone-200/90 p-0.5 rounded-lg border border-stone-300 shadow-inner">
                <button
                  type="button"
                  onClick={() => setPreviewMode('card')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition ${
                    previewMode === 'card'
                      ? 'bg-red-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/50'
                  }`}
                >
                  <span>🎴 मुख्य शादी कार्ड</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPreviewMode('envelope');
                    if (activeTab !== 'envelope') setActiveTab('envelope');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-md transition ${
                    previewMode === 'envelope'
                      ? 'bg-red-800 text-white shadow-sm'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/50'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>💌 शादी का लिफाफा (Cover)</span>
                </button>
              </div>

              {/* Screen Print Quick Toolbar Controls */}
              {cardData.screenPrintMode && (
                <div className="flex items-center gap-1.5 bg-stone-900 text-amber-300 px-2.5 py-1 rounded-lg border border-stone-700 shadow-xs">
                  <span className="text-[11px] font-bold">🖨️ बटर पेपर:</span>
                  <button
                    type="button"
                    onClick={() => setCardData(prev => ({ ...prev, screenPrintMirror: !prev.screenPrintMirror }))}
                    className={`px-2 py-0.5 rounded text-[10.5px] font-bold transition ${
                      cardData.screenPrintMirror
                        ? 'bg-red-600 text-white'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-600'
                    }`}
                    title="शीशा प्रभाव / उल्टा प्रिंट (डायरेक्ट इमल्शन एक्सपोज़र हेतु)"
                  >
                    🪞 शीशा प्रभाव: {cardData.screenPrintMirror ? 'चालू' : 'बंद'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCardData(prev => ({ ...prev, screenPrintInvert: !prev.screenPrintInvert }))}
                    className={`px-1.5 py-0.5 rounded text-[10.5px] font-bold transition ${
                      cardData.screenPrintInvert
                        ? 'bg-amber-400 text-stone-950'
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                    }`}
                    title="नेगेटिव / रिवर्स फिल्म मोड"
                  >
                    {cardData.screenPrintInvert ? 'नेगेटिव' : 'पॉजिटिव'}
                  </button>
                </div>
              )}
            </div>

            {/* Guest Quick Switcher in Toolbar */}
            <div className="flex items-center gap-1.5 bg-white border border-stone-300 px-2.5 py-1 rounded-lg shadow-2xs">
              <Users className="w-3.5 h-3.5 text-red-700 flex-shrink-0" />
              <span className="text-[11px] font-bold text-stone-700 hidden md:inline">अतिथि:</span>
              <select
                value={cardData.activeGuestId || ''}
                onChange={(e) => setCardData({ ...cardData, activeGuestId: e.target.value || null })}
                className="bg-transparent text-xs font-bold text-stone-900 cursor-pointer focus:outline-none max-w-[130px] sm:max-w-[160px] truncate"
              >
                <option value="">✏️ साधारण (डॉटेड)</option>
                {cardData.guestList?.map((g, idx) => (
                  <option key={g.id} value={g.id}>
                    #{idx + 1} {g.name}
                  </option>
                ))}
              </select>

              {/* Prev / Next buttons */}
              <div className="flex items-center border-l border-stone-200 pl-1.5 gap-0.5">
                <button
                  type="button"
                  onClick={handlePrevGuest}
                  className="px-1.5 py-0.5 hover:bg-stone-100 rounded text-stone-700 font-bold text-xs"
                  title="पिछला अतिथि"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={handleNextGuest}
                  className="px-1.5 py-0.5 hover:bg-stone-100 rounded text-stone-700 font-bold text-xs"
                  title="अगला अतिथि"
                >
                  ›
                </button>
              </div>
            </div>


            {/* Current Size Label */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="font-bold text-red-950">
                {previewMode === 'envelope' ? currentEnvelopeSize.name : currentCardSize.name}
              </span>
              <span className="text-stone-400">|</span>
              <span className="font-mono text-stone-500">
                {previewMode === 'envelope'
                  ? `${currentEnvelopeSize.widthMm} × ${currentEnvelopeSize.heightMm} mm`
                  : `${currentCardSize.widthMm} × ${currentCardSize.heightMm} mm`}
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-stone-200 shadow-sm">
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.max(0.4, prev - 0.1))}
                className="p-1 hover:bg-stone-100 rounded text-stone-600 transition"
                title="ज़ूम कम करें"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] w-12 text-center">
                {Math.round(zoomScale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.min(1.4, prev + 0.1))}
                className="p-1 hover:bg-stone-100 rounded text-stone-600 transition"
                title="ज़ूम बढ़ाएं"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomScale(0.95)}
                className="p-1 hover:bg-stone-100 rounded text-stone-600 transition"
                title="रीसेट ज़ूम"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Canvas Viewport Container */}
          <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
            
            {/* 1. Main Wedding Card View */}
            <div
              className={`transition-transform duration-200 origin-top ${
                previewMode === 'card' ? 'block' : 'hidden'
              }`}
            >
              <WeddingCard ref={cardRef} data={cardData} scale={zoomScale} />
            </div>

            {/* 2. Matching Envelope View */}
            <div
              className={`transition-transform duration-200 origin-top ${
                previewMode === 'envelope' ? 'block' : 'hidden'
              }`}
            >
              <WeddingEnvelope ref={envelopeRef} data={cardData} scale={zoomScale} />
            </div>

          </div>
        </main>
      </div>

      {/* 🎵 Auspicious Mangal Shehnai Music Player (Floating) */}
      <ShehnaiMusicPlayer
        cardData={cardData}
        setCardData={setCardData}
        onOpenDigitalInvite={() => setIsDigitalModalOpen(true)}
      />

      {/* 🌺 Interactive Full-Screen Digital Wedding Card Modal */}
      <DigitalInviteModal
        isOpen={isDigitalModalOpen}
        onClose={() => setIsDigitalModalOpen(false)}
        cardData={cardData}
        setCardData={setCardData}
      />

      {/* ⚡ DTP Press Font Converter Modal (KrutiDev 010 / Chanakya / ShreeLipi) */}
      <DtpFontConverterModal
        isOpen={isDtpModalOpen}
        onClose={() => setIsDtpModalOpen(false)}
        cardData={cardData}
      />

      {/* 📑 Pre-Press Draft Proof & Client WhatsApp Approval Modal */}
      <DraftProofModal
        isOpen={isDraftProofModalOpen}
        onClose={() => setIsDraftProofModalOpen(false)}
        data={cardData}
        onChange={setCardData}
        onExportDraftPNG={handleExportDraftPNG}
        isExporting={isExporting}
      />
    </div>
  );
}
