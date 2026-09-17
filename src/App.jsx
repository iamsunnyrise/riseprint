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
  Music,
  Scissors,
  FileDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Eye,
  PanelLeftClose,
  PanelLeftOpen
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
import BlankCardMatcherForm from './components/Editor/BlankCardMatcherForm';
import ProductSuiteSelector from './components/Editor/ProductSuiteSelector';
import ShokSandeshForm from './components/Editor/ShokSandeshForm';
import SanskarForm from './components/Editor/SanskarForm';
import BillBookForm from './components/Editor/BillBookForm';
import VisitingCardForm from './components/Editor/VisitingCardForm';

import HindiKeyboardHelper from './components/Controls/HindiKeyboardHelper';
import DtpFontConverterModal from './components/Controls/DtpFontConverterModal';
import DraftProofModal from './components/Controls/DraftProofModal';
import JobSlipModal from './components/Controls/JobSlipModal';
import HindiSpellCheckModal from './components/Controls/HindiSpellCheckModal';
import { useHindiTyping } from './context/HindiTypingContext';

// Office Ribbon & Workspace Suite
import QuickAccessToolbar from './components/Ribbon/QuickAccessToolbar';
import OfficeRibbonBar from './components/Ribbon/OfficeRibbonBar';
import OfficeStatusBar from './components/Ribbon/OfficeStatusBar';
import DocumentRuler from './components/Workspace/DocumentRuler';

import { DEFAULT_CARD_DATA, CARD_SIZES, ENVELOPE_SIZES, CARD_TEMPLATES, PRODUCT_TYPES } from './utils/defaultData';
import {
  downloadCardPDF,
  downloadCardPNG,
  downloadEnvelopePDF,
  downloadEnvelopePNG,
  downloadCombinedCardAndEnvelopePDF,
  downloadBulkPersonalizedEnvelopesPDF,
  downloadScreenPrintPDF,
  downloadScreenPrintPNG,
  downloadImpositionPDF,
  downloadTwoPlateSeparationPDF,
  triggerBrowserPrint
} from './utils/pdfExport';
import { downloadCorelDrawSVG } from './utils/svgExport';

export default function App() {
  const [cardData, setCardData] = useState(DEFAULT_CARD_DATA);
  const [activeRibbonTab, setActiveRibbonTab] = useState('home'); // file, home, insert, layout, typography, mailings, prepress, export
  const [isRibbonCollapsed, setIsRibbonCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('basic'); // templates, basic, schedule, venue, envelope, guests, music, shloka, family, style, photos, screenprint
  const [isTaskPaneOpen, setIsTaskPaneOpen] = useState(true);
  const [showRuler, setShowRuler] = useState(true);

  const [previewMode, setPreviewMode] = useState('card'); // 'card' or 'envelope'
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState('');
  const [zoomScale, setZoomScale] = useState(0.95);
  const [isDigitalModalOpen, setIsDigitalModalOpen] = useState(false);
  const [isDtpModalOpen, setIsDtpModalOpen] = useState(false);
  const [isDraftProofModalOpen, setIsDraftProofModalOpen] = useState(false);
  const [isJobSlipModalOpen, setIsJobSlipModalOpen] = useState(false);
  const [isSpellCheckModalOpen, setIsSpellCheckModalOpen] = useState(false);
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

  // Open Task Pane for specific sub-form
  const handleOpenTaskPane = (tabKey) => {
    setActiveTab(tabKey);
    setIsTaskPaneOpen(true);
  };

  // Switch Printing Product (Multi-Product Suite)
  const handleSelectProduct = (type) => {
    setCardData((prev) => ({
      ...prev,
      productType: type
    }));
    setActiveTab(type === 'wedding' ? 'basic' : 'product-form');
    setIsTaskPaneOpen(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.4 }
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
        const pType = cardData.productType || 'wedding';
        let name1 = cardData.groomName || 'Card';
        let name2 = cardData.brideName || '';
        if (pType === 'shok-sandesh') {
          name1 = cardData.shokPersonName || 'Shok_Sandesh';
          name2 = 'Tehravin';
        } else if (pType === 'sanskar') {
          name1 = cardData.sanskarChildName || 'Sanskar';
          name2 = cardData.sanskarType || 'Nimantran';
        } else if (pType === 'bill-book') {
          name1 = cardData.billFirmName || 'BillBook';
          name2 = 'Master';
        } else if (pType === 'visiting-card') {
          name1 = cardData.bizCardShopName || 'VisitingCard';
          name2 = cardData.bizCardViewMode === '10-up-sheet' ? '10Up_A4' : 'Single';
        }

        const productLabels = {
          'wedding': 'शादी कार्ड',
          'shok-sandesh': 'शोक संदेश',
          'sanskar': 'संस्कार कार्ड',
          'bill-book': 'बिल बुक',
          'visiting-card': 'विज़िटिंग कार्ड'
        };
        setExportMessage(`300 DPI ${productLabels[pType] || 'कार्ड'} PDF तैयार हो रही है...`);
        await downloadCardPDF(cardEl, cardData.sizeKey, name1, name2, {
          widthMm: cardData.customWidthMm,
          heightMm: cardData.customHeightMm
        });
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

  // CorelDRAW Ready SVG (Convert to Curves / Text to Path) Export
  const handleExportCorelDrawSVG = async () => {
    try {
      setIsExporting(true);
      setExportMessage('CorelDRAW रेडी SVG (Convert to Curves) तैयार हो रहा है...');
      const targetEl = previewMode === 'envelope'
        ? (envelopeRef.current || document.getElementById('wedding-envelope-element'))
        : (cardRef.current || document.getElementById('wedding-card-element'));
      const clientName = cardData.groomName || 'Wedding_Card';
      await downloadCorelDrawSVG(targetEl, `${clientName}_CorelDRAW_Curves`, {
        type: previewMode,
        sizeKey: cardData.sizeKey,
        envelopeSizeKey: cardData.envelopeSizeKey,
        title: clientName
      });
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      setExportMessage('CorelDRAW SVG (100% Curves) सफलतापूर्वक डाउनलोड हो गया!');
      setTimeout(() => setExportMessage(''), 4000);
    } catch (err) {
      console.error(err);
      setExportMessage('CorelDRAW SVG एक्सपोर्ट में त्रुटि हुई');
      setTimeout(() => setExportMessage(''), 5000);
    } finally {
      setIsExporting(false);
    }
  };

  // 2-Up / 4-Up Imposition Butter Paper PDF Export
  const handleExportImpositionPDF = async () => {
    try {
      setIsExporting(true);
      const imp = cardData.screenPrintImposition || '2-up';
      const sheet = cardData.screenPrintSheetSize || 'a4';
      setExportMessage(`${imp.toUpperCase()} बटर पेपर (${sheet.toUpperCase()}) PDF तैयार हो रहा है...`);
      const targetEl = previewMode === 'envelope'
        ? (envelopeRef.current || document.getElementById('wedding-envelope-element'))
        : (cardRef.current || document.getElementById('wedding-card-element'));
      await downloadImpositionPDF(targetEl, {
        type: previewMode,
        imposition: imp,
        sheetSize: sheet,
        isInvert: cardData.screenPrintInvert || cardData.screenPrintFoilMode
      });
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      setExportMessage(`${imp.toUpperCase()} बटर पेपर शीट PDF सफलतापूर्वक डाउनलोड हो गई!`);
      setTimeout(() => setExportMessage(''), 4000);
    } catch (err) {
      console.error(err);
      setExportMessage('इम्पोज़िशन PDF एक्सपोर्ट में त्रुटि हुई');
      setTimeout(() => setExportMessage(''), 5000);
    } finally {
      setIsExporting(false);
    }
  };

  // 2-Color Screen Printing Plates (2-Page Combined PDF)
  const handleExportTwoPlatePDF = async () => {
    try {
      setIsExporting(true);
      setExportMessage('2-रंग स्क्रीन प्लेट्स (Plate 1 Text + Plate 2 Motifs) PDF तैयार हो रही है...');
      const targetEl = previewMode === 'envelope'
        ? (envelopeRef.current || document.getElementById('wedding-envelope-element'))
        : (cardRef.current || document.getElementById('wedding-card-element'));
      await downloadTwoPlateSeparationPDF(targetEl, cardData, {
        type: previewMode
      });
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      setExportMessage('2-रंग स्क्रीन प्लेट्स PDF (दोनों प्लेट्स एक साथ) डाउनलोड हो गई!');
      setTimeout(() => setExportMessage(''), 4000);
    } catch (err) {
      console.error(err);
      setExportMessage('स्क्रीन प्लेट्स PDF एक्सपोर्ट में त्रुटि हुई');
      setTimeout(() => setExportMessage(''), 5000);
    } finally {
      setIsExporting(false);
    }
  };

  // Bulk Multi-Page PDF Export for all guests
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

  const productType = cardData.productType || 'wedding';

  let tabs = [];
  if (productType === 'wedding') {
    tabs = [
      { id: 'product-suite', label: 'उत्पाद सुइट', icon: Layers, badge: '5' },
      { id: 'templates', label: 'टेम्पलेट्स', icon: BookOpen, badge: '6' },
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
      },
      {
        id: 'blankcard',
        label: 'थोक कार्ड नाप',
        icon: Columns,
        badge: cardData.cardFoldType !== 'single' ? cardData.cardFoldType : undefined
      }
    ];
  } else if (productType === 'shok-sandesh') {
    tabs = [
      { id: 'product-suite', label: 'उत्पाद सुइट', icon: Layers, badge: '5' },
      { id: 'product-form', label: 'शोक संदेश विवरण', icon: FileText, badge: '🕊️' },
      { id: 'style', label: 'थीम व पेपर', icon: Palette },
      { id: 'screenprint', label: 'बटर पेपर मोड', icon: Printer, badge: cardData.screenPrintMode ? 'ON' : undefined }
    ];
  } else if (productType === 'sanskar') {
    tabs = [
      { id: 'product-suite', label: 'उत्पाद सुइट', icon: Layers, badge: '5' },
      { id: 'product-form', label: 'संस्कार विवरण', icon: Sparkles, badge: '🪔' },
      { id: 'style', label: 'थीम व पेपर', icon: Palette },
      { id: 'screenprint', label: 'बटर पेपर मोड', icon: Printer, badge: cardData.screenPrintMode ? 'ON' : undefined }
    ];
  } else if (productType === 'bill-book') {
    tabs = [
      { id: 'product-suite', label: 'उत्पाद सुइट', icon: Layers, badge: '5' },
      { id: 'product-form', label: 'बिल बुक विवरण', icon: FileText, badge: '📑' },
      { id: 'screenprint', label: 'बटर पेपर मोड', icon: Printer, badge: cardData.screenPrintMode ? 'ON' : undefined }
    ];
  } else if (productType === 'visiting-card') {
    tabs = [
      { id: 'product-suite', label: 'उत्पाद सुइट', icon: Layers, badge: '5' },
      { id: 'product-form', label: 'विज़िटिंग कार्ड', icon: SlidersHorizontal, badge: '💳' },
      { id: 'style', label: 'थीम व पेपर', icon: Palette },
      { id: 'screenprint', label: 'बटर पेपर मोड', icon: Printer, badge: cardData.screenPrintMode ? 'ON' : undefined }
    ];
  }

  const currentActiveTabMeta = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <div className="min-h-screen bg-[#ece9e6] flex flex-col font-sans select-text">
      
      {/* 1. Word / Office 365 Quick Access Toolbar & Title Bar */}
      <QuickAccessToolbar
        cardData={cardData}
        previewMode={previewMode}
        isExporting={isExporting}
        isHindiTyping={isHindiTyping}
        toggleHindiTyping={toggleHindiTyping}
        onReset={handleResetToDefault}
        onOpenDtpModal={() => setIsDtpModalOpen(true)}
        onOpenDigitalModal={() => setIsDigitalModalOpen(true)}
        onOpenDraftProofModal={() => {
          if (!cardData.isDraftProofMode) {
            setCardData(prev => ({
              ...prev,
              isDraftProofMode: true,
              proofStatus: prev.proofStatus || 'draft'
            }));
          }
          setIsDraftProofModalOpen(true);
        }}
        onOpenJobSlipModal={() => setIsJobSlipModalOpen(true)}
        onOpenSpellCheckModal={() => setIsSpellCheckModalOpen(true)}
        onSelectProduct={handleSelectProduct}
        onExportPDF={handleExportPDF}
        onExportPNG={handleExportPNG}
        onExportCorelDrawSVG={handleExportCorelDrawSVG}
        onPrint={handlePrint}
      />

      {/* 2. Office 365 Ribbon Bar (Collapsible with Tabs & Tool Groups) */}
      <OfficeRibbonBar
        activeRibbonTab={activeRibbonTab}
        onSelectRibbonTab={setActiveRibbonTab}
        activeTaskPaneTab={activeTab}
        onOpenTaskPane={handleOpenTaskPane}
        onSelectProduct={handleSelectProduct}
        isRibbonCollapsed={isRibbonCollapsed}
        toggleRibbonCollapsed={() => setIsRibbonCollapsed(prev => !prev)}
        cardData={cardData}
        onChangeCardData={setCardData}
        onSelectTemplate={handleSelectTemplate}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        onExportPDF={handleExportPDF}
        onExportPNG={handleExportPNG}
        onExportCombinedPDF={handleExportCombinedPDF}
        onExportBulkEnvelopes={handleExportBulkEnvelopes}
        onExportImpositionPDF={handleExportImpositionPDF}
        onExportTwoPlatePDF={handleExportTwoPlatePDF}
        onExportCorelDrawSVG={handleExportCorelDrawSVG}
        onPrint={handlePrint}
        onOpenDraftProofModal={() => setIsDraftProofModalOpen(true)}
        onOpenDigitalModal={() => setIsDigitalModalOpen(true)}
        onOpenDtpModal={() => setIsDtpModalOpen(true)}
        onOpenJobSlipModal={() => setIsJobSlipModalOpen(true)}
        onOpenSpellCheckModal={() => setIsSpellCheckModalOpen(true)}
        isExporting={isExporting}
      />

      {/* Export Status Notification Banner */}
      {exportMessage && (
        <div className="bg-amber-600 text-white text-xs py-1.5 px-4 text-center font-semibold shadow-inner transition flex items-center justify-center gap-2 no-print z-50">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{exportMessage}</span>
        </div>
      )}

      {/* 3. Main Workspace Area: Split Screen (Task Pane + Document Canvas) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Left Side: Collapsible Office Task Pane / Inspector (कार्य फलक) */}
        <aside
          className={`transition-all duration-200 ease-in-out bg-white border-r border-stone-300 flex flex-col flex-shrink-0 z-20 no-print shadow-sm ${
            isTaskPaneOpen
              ? 'w-full lg:w-[460px] xl:w-[490px] h-[440px] lg:h-auto'
              : 'w-0 h-0 lg:h-auto overflow-hidden border-none'
          }`}
        >
          {/* Task Pane Header with Title & Collapse Icon */}
          <div className="bg-stone-100 border-b border-stone-200 px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-red-800 font-bold text-xs flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-red-700" />
                <span>कार्य फलक (Inspector):</span>
              </span>
              <span className="text-xs font-semibold text-stone-700 bg-white px-2 py-0.5 rounded border border-stone-300">
                {currentActiveTabMeta.label}
              </span>
            </div>

            {/* Close / Collapse Task Pane button */}
            <button
              type="button"
              onClick={() => setIsTaskPaneOpen(false)}
              className="p-1 hover:bg-stone-200 rounded text-stone-500 hover:text-stone-800 transition"
              title="टास्क पैन छुपाएं (Hide Task Pane)"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Sub-Tab Switcher inside Task Pane */}
          <div className="flex overflow-x-auto border-b border-stone-200 bg-stone-50 p-1 gap-1 scrollbar-none">
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
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded text-[11px] font-semibold whitespace-nowrap transition relative ${
                    isActive
                      ? 'bg-red-800 text-white shadow-xs'
                      : 'text-stone-600 hover:bg-stone-200/70'
                  }`}
                  title={tab.label}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label.split(' ')[0]}</span>
                  {tab.badge && (
                    <span className={`text-[9px] px-1 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-amber-400 text-red-950' : 'bg-red-100 text-red-700'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Form Content Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeTab === 'product-suite' && (
              <ProductSuiteSelector
                currentProductType={cardData.productType || 'wedding'}
                onSelectProduct={handleSelectProduct}
              />
            )}
            {activeTab === 'product-form' && (
              <>
                {cardData.productType === 'shok-sandesh' && (
                  <ShokSandeshForm data={cardData} onChange={setCardData} />
                )}
                {cardData.productType === 'sanskar' && (
                  <SanskarForm data={cardData} onChange={setCardData} />
                )}
                {cardData.productType === 'bill-book' && (
                  <BillBookForm data={cardData} onChange={setCardData} />
                )}
                {cardData.productType === 'visiting-card' && (
                  <VisitingCardForm data={cardData} onChange={setCardData} />
                )}
              </>
            )}
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
            {activeTab === 'blankcard' && (
              <BlankCardMatcherForm data={cardData} onChange={setCardData} />
            )}

            {/* Quick Hindi Typing & Copy Tool */}
            <div className="pt-2 border-t">
              <HindiKeyboardHelper onOpenDtpConverter={() => setIsDtpModalOpen(true)} />
            </div>
          </div>
        </aside>

        {/* Center / Right: Word Style Document Canvas Viewport */}
        <main className="flex-1 flex flex-col bg-[#e8e6e3] overflow-hidden relative print-container">
          
          {/* Document Canvas Top Toolbar (MS Word Document Header) */}
          <div className="bg-[#f3f2f1] border-b border-stone-300 px-3 py-1.5 flex flex-wrap items-center justify-between text-xs text-stone-700 no-print gap-2 shadow-2xs">
            
            <div className="flex items-center flex-wrap gap-2">
              {/* Task Pane Re-Open Toggle if closed */}
              {!isTaskPaneOpen && (
                <button
                  type="button"
                  onClick={() => setIsTaskPaneOpen(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-stone-100 text-red-950 font-bold text-xs rounded border border-stone-300 shadow-2xs transition"
                  title="कार्य फलक खोलें (Open Inspector)"
                >
                  <PanelLeftOpen className="w-3.5 h-3.5 text-red-700" />
                  <span>कार्य फलक खोलें</span>
                </button>
              )}

              {/* View Mode Switcher: Card ⇄ Envelope */}
              <div className="flex items-center bg-stone-200/90 p-0.5 rounded-md border border-stone-300 shadow-inner">
                <button
                  type="button"
                  onClick={() => setPreviewMode('card')}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded transition ${
                    previewMode === 'card'
                      ? 'bg-red-800 text-white shadow-2xs'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/50'
                  }`}
                >
                  <span>🎴 मुख्य कार्ड</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPreviewMode('envelope');
                    if (activeTab !== 'envelope') setActiveTab('envelope');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded transition ${
                    previewMode === 'envelope'
                      ? 'bg-red-800 text-white shadow-2xs'
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100/50'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>💌 लिफाफा</span>
                </button>
              </div>

              {/* Screen Print & Pre-Press Quick Status Strip */}
              {cardData.screenPrintMode && (
                <div className="flex items-center gap-1 bg-stone-900 text-amber-300 px-2 py-0.5 rounded border border-stone-700 text-[11px] flex-wrap">
                  <span className="font-bold">🖨️ बटर:</span>
                  <span className="font-mono bg-stone-800 px-1 rounded text-amber-200 font-bold">
                    {cardData.screenPrintImposition?.toUpperCase() || '1-UP'}
                  </span>
                  {cardData.screenPrintPlate !== 'all' && (
                    <span className="font-bold text-amber-400">
                      [{cardData.screenPrintPlate === 'text' ? 'प्लेट 1: टेक्स्ट' : 'प्लेट 2: बॉर्डर्स'}]
                    </span>
                  )}
                  {cardData.screenPrintFoilMode && (
                    <span className="bg-amber-400 text-stone-950 px-1 rounded text-[10px] font-bold">
                      हॉट फॉइल डाई
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Guest Quick Selector in Document Header */}
            <div className="flex items-center gap-1.5 bg-white border border-stone-300 px-2 py-0.5 rounded shadow-2xs">
              <Users className="w-3.5 h-3.5 text-red-700 flex-shrink-0" />
              <span className="text-[10.5px] font-bold text-stone-600 hidden md:inline">अतिथि:</span>
              <select
                value={cardData.activeGuestId || ''}
                onChange={(e) => setCardData({ ...cardData, activeGuestId: e.target.value || null })}
                className="bg-transparent text-xs font-bold text-stone-900 cursor-pointer focus:outline-none max-w-[120px] sm:max-w-[150px] truncate"
              >
                <option value="">✏️ साधारण (डॉटेड)</option>
                {cardData.guestList?.map((g, idx) => (
                  <option key={g.id} value={g.id}>
                    #{idx + 1} {g.name}
                  </option>
                ))}
              </select>

              {/* Prev / Next buttons */}
              <div className="flex items-center border-l border-stone-200 pl-1 gap-0.5">
                <button
                  type="button"
                  onClick={handlePrevGuest}
                  className="px-1 py-0.5 hover:bg-stone-100 rounded text-stone-700 font-bold text-xs"
                  title="पिछला अतिथि"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={handleNextGuest}
                  className="px-1 py-0.5 hover:bg-stone-100 rounded text-stone-700 font-bold text-xs"
                  title="अगला अतिथि"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Ruler Toggle Button */}
            <button
              type="button"
              onClick={() => setShowRuler(prev => !prev)}
              className={`px-2 py-1 rounded text-[11px] font-semibold border transition flex items-center gap-1 ${
                showRuler ? 'bg-amber-100 text-amber-950 border-amber-300' : 'bg-white text-stone-600 border-stone-300'
              }`}
              title="रूलर स्केल ऑन/ऑफ करें"
            >
              <span>📐</span>
              <span className="hidden sm:inline">रूलर {showRuler ? 'चालू' : 'बंद'}</span>
            </button>
          </div>

          {/* Top Millimeter / Inch Ruler */}
          <DocumentRuler
            widthMm={previewMode === 'envelope' ? currentEnvelopeSize.widthMm : currentCardSize.widthMm}
            heightMm={previewMode === 'envelope' ? currentEnvelopeSize.heightMm : currentCardSize.heightMm}
            scale={zoomScale}
            showRuler={showRuler}
            onToggleRuler={() => setShowRuler(prev => !prev)}
          />

          {/* Interactive Document Workspace Canvas */}
          <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start">
            
            {/* 1. Main Wedding Card View */}
            <div
              className={`transition-transform duration-150 origin-top shadow-2xl rounded-sm ${
                previewMode === 'card' ? 'block' : 'hidden'
              }`}
            >
              <WeddingCard ref={cardRef} data={cardData} scale={zoomScale} />
            </div>

            {/* 2. Matching Envelope View */}
            <div
              className={`transition-transform duration-150 origin-top shadow-2xl rounded-sm ${
                previewMode === 'envelope' ? 'block' : 'hidden'
              }`}
            >
              <WeddingEnvelope ref={envelopeRef} data={cardData} scale={zoomScale} />
            </div>

          </div>
        </main>
      </div>

      {/* 4. MS Word / Windows Style Bottom Status Bar */}
      <OfficeStatusBar
        cardData={cardData}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        zoomScale={zoomScale}
        setZoomScale={setZoomScale}
      />

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

      {/* 📋 Digital Job Slip, Token & Billing System Modal */}
      <JobSlipModal
        isOpen={isJobSlipModalOpen}
        onClose={() => setIsJobSlipModalOpen(false)}
        data={cardData}
        onChange={setCardData}
      />

      {/* ✍️ Hindi Matra & Spell Auto-Check Modal */}
      <HindiSpellCheckModal
        isOpen={isSpellCheckModalOpen}
        onClose={() => setIsSpellCheckModalOpen(false)}
        data={cardData}
        onChange={setCardData}
      />
    </div>
  );
}
