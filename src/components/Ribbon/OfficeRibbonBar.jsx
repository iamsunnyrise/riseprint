import React from 'react';
import {
  Layers,
  Heart,
  Calendar,
  MapPin,
  Mail,
  Users,
  Music,
  BookOpen,
  Palette,
  Image as ImageIcon,
  Printer,
  FileDown,
  Download,
  FileText,
  Sparkles,
  Scissors,
  Check,
  ChevronUp,
  ChevronDown,
  Maximize2,
  ExternalLink,
  Sliders,
  Type,
  Grid,
  Columns,
  Eye,
  Settings
} from 'lucide-react';
import { CARD_SIZES, ENVELOPE_SIZES, CARD_TEMPLATES, COLOR_THEMES, PRODUCT_TYPES } from '../../utils/defaultData';

export default function OfficeRibbonBar({
  activeRibbonTab,
  onSelectRibbonTab,
  activeTaskPaneTab,
  onOpenTaskPane,
  isRibbonCollapsed,
  toggleRibbonCollapsed,
  cardData,
  onChangeCardData,
  onSelectTemplate,
  previewMode,
  setPreviewMode,
  onExportPDF,
  onExportPNG,
  onExportCombinedPDF,
  onExportBulkEnvelopes,
  onExportImpositionPDF,
  onExportTwoPlatePDF,
  onExportCorelDrawSVG,
  onPrint,
  onOpenDraftProofModal,
  onOpenDigitalModal,
  onOpenDtpModal,
  onOpenJobSlipModal,
  onOpenSpellCheckModal,
  isExporting
}) {
  const ribbonTabs = [
    { id: 'file', label: 'फ़ाइल (File)', icon: Layers },
    { id: 'home', label: 'होम (Home)', icon: Heart },
    { id: 'insert', label: 'इंसर्ट (Insert)', icon: ImageIcon },
    { id: 'layout', label: 'लेआउट (Layout)', icon: Columns },
    { id: 'typography', label: 'टाइपोग्राफी (Fonts)', icon: Type },
    { id: 'mailings', label: 'डाक व लिफाफा (Mailings)', icon: Mail, badge: cardData.guestList?.length ? `${cardData.guestList.length}` : undefined },
    { id: 'prepress', label: 'प्री-प्रेस व स्क्रीन (Pre-Press)', icon: Printer, badge: cardData.screenPrintMode ? 'ON' : undefined },
    { id: 'export', label: 'एक्सपोर्ट व शेयर (Export)', icon: Download }
  ];

  const updateCard = (patch) => {
    onChangeCardData({ ...cardData, ...patch });
  };

  return (
    <div className="bg-[#f3f2f1] border-b border-stone-300 text-stone-800 shadow-xs no-print select-none">
      {/* 1. Ribbon Tab Headers (Word Style Tabs) */}
      <div className="flex items-center justify-between px-2 pt-1 border-b border-stone-300/80 bg-[#edebe9]">
        <div className="flex items-center space-x-0.5 overflow-x-auto scrollbar-none">
          {ribbonTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeRibbonTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  onSelectRibbonTab(tab.id);
                  if (isRibbonCollapsed) toggleRibbonCollapsed();
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-t-md transition border-t border-x relative ${
                  isActive
                    ? 'bg-[#f3f2f1] text-red-950 border-stone-300 font-bold -mb-[1px] shadow-2xs'
                    : 'text-stone-700 hover:bg-white/60 border-transparent hover:text-black'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-700' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-amber-400 text-red-950' : 'bg-red-100 text-red-800'
                  }`}>
                    {tab.badge}
                  </span>
                )}
                {/* Active Underline Indicator like Office */}
                {isActive && (
                  <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-red-700 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Ribbon Pin / Collapse Button on Far Right */}
        <button
          type="button"
          onClick={toggleRibbonCollapsed}
          className="p-1.5 hover:bg-stone-200 rounded text-stone-600 hover:text-stone-900 transition flex items-center gap-1 text-[11px]"
          title={isRibbonCollapsed ? 'रिबन बार विस्तृत करें (Expand Ribbon)' : 'रिबन बार संकुचित करें (Collapse Ribbon)'}
        >
          <span className="hidden sm:inline text-[10px] text-stone-500 font-medium">
            {isRibbonCollapsed ? 'विस्तृत करें' : 'संकुचित'}
          </span>
          {isRibbonCollapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 2. Ribbon Action Groups (Visible when not collapsed) */}
      {!isRibbonCollapsed && (
        <div className="p-2 overflow-x-auto flex items-stretch gap-2 min-h-[96px] bg-[#f8f7f5]">
          
          {/* TAB: FILE (फ़ाइल) */}
          {activeRibbonTab === 'file' && (
            <>
              {/* Group 0: Multi-Product Suite Quick Switcher */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1">
                  {PRODUCT_TYPES.map((prod) => {
                    const isSelected = (cardData.productType || 'wedding') === prod.id;
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => {
                          updateCard({ productType: prod.id });
                          onOpenTaskPane('product-form');
                        }}
                        className={`flex flex-col items-center p-1 rounded border transition w-16 group ${
                          isSelected
                            ? 'bg-red-800 text-white border-red-900 shadow-xs'
                            : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-800'
                        }`}
                        title={prod.name}
                      >
                        <span className="text-sm">{prod.icon}</span>
                        <span className="text-[9.5px] font-bold truncate w-full mt-0.5">
                          {prod.shortName}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-stone-500 font-semibold">
                  <span className="text-red-900 font-bold">🖨️ उत्पाद सुइट</span>
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('product-suite')}
                    className="text-red-700 hover:underline flex items-center gap-0.5"
                  >
                    <span>सभी 5 उत्पाद</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              {/* Group 1: Templates Quick Picker */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  {CARD_TEMPLATES.slice(0, 4).map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => onSelectTemplate(tpl.data)}
                      className="flex flex-col items-center p-1.5 rounded hover:bg-amber-100/70 border border-stone-200 bg-white text-center transition w-20 group"
                    >
                      <span className="text-base group-hover:scale-110 transition-transform">🎴</span>
                      <span className="text-[10px] font-bold text-stone-800 truncate w-full mt-0.5">
                        {tpl.name.split('(')[0]}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px] text-stone-500 font-semibold">
                  <span>रॉयल टेम्पलेट्स</span>
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('templates')}
                    className="text-red-700 hover:underline flex items-center gap-0.5"
                  >
                    <span>सभी 6 देखें</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>

              {/* Group 2: Project / Data Actions */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('templates')}
                    className="flex flex-col items-center justify-center p-2 rounded hover:bg-stone-200/80 bg-white border border-stone-200 transition text-stone-800 min-w-[60px]"
                  >
                    <Layers className="w-4 h-4 text-red-700 mb-1" />
                    <span className="text-[10.5px] font-semibold">टेम्पलेट्स</span>
                  </button>
                  <button
                    type="button"
                    onClick={onPrint}
                    className="flex flex-col items-center justify-center p-2 rounded hover:bg-stone-200/80 bg-white border border-stone-200 transition text-stone-800 min-w-[60px]"
                  >
                    <Printer className="w-4 h-4 text-stone-700 mb-1" />
                    <span className="text-[10.5px] font-semibold">प्रिंट कार्ड</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenDtpModal}
                    className="flex flex-col items-center justify-center p-2 rounded hover:bg-stone-200/80 bg-white border border-stone-200 transition text-stone-800 min-w-[60px]"
                  >
                    <span className="text-amber-600 font-bold text-sm mb-0.5">⚡</span>
                    <span className="text-[10.5px] font-semibold">DTP कनवर्टर</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenJobSlipModal}
                    className="flex flex-col items-center justify-center p-2 rounded bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold transition min-w-[65px] shadow-2xs"
                    title="डिजिटल जॉब स्लिप, टोकन व बिलिंग सिस्टम"
                  >
                    <span className="text-sm mb-0.5">📋</span>
                    <span className="text-[10.5px]">जॉब स्लिप</span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  डॉक्यूमेंट टूल्स
                </span>
              </div>
            </>
          )}

          {/* TAB: HOME (मुख्य विवरण) */}
          {activeRibbonTab === 'home' && (
            <>
              {/* Group 1: Groom & Bride Details */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('basic')}
                    className={`flex flex-col items-center justify-center p-2 rounded border transition min-w-[70px] ${
                      activeTaskPaneTab === 'basic' ? 'bg-red-50 border-red-400 text-red-950 font-bold' : 'bg-white hover:bg-stone-100 border-stone-200'
                    }`}
                  >
                    <Heart className="w-4 h-4 text-rose-600 mb-1" />
                    <span className="text-[10.5px]">वर-वधू नाम</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('family')}
                    className={`flex flex-col items-center justify-center p-2 rounded border transition min-w-[70px] ${
                      activeTaskPaneTab === 'family' ? 'bg-red-50 border-red-400 text-red-950 font-bold' : 'bg-white hover:bg-stone-100 border-stone-200'
                    }`}
                  >
                    <Users className="w-4 h-4 text-amber-700 mb-1" />
                    <span className="text-[10.5px]">माता-पिता/परिवार</span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  विवाह विवरण
                </span>
              </div>

              {/* Group 2: Schedule & Venue */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('schedule')}
                    className={`flex flex-col items-center justify-center p-2 rounded border transition min-w-[70px] ${
                      activeTaskPaneTab === 'schedule' ? 'bg-red-50 border-red-400 text-red-950 font-bold' : 'bg-white hover:bg-stone-100 border-stone-200'
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-indigo-600 mb-1" />
                    <span className="text-[10.5px]">मांगलिक कार्यक्रम</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('venue')}
                    className={`flex flex-col items-center justify-center p-2 rounded border transition min-w-[70px] ${
                      activeTaskPaneTab === 'venue' ? 'bg-red-50 border-red-400 text-red-950 font-bold' : 'bg-white hover:bg-stone-100 border-stone-200'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-emerald-600 mb-1" />
                    <span className="text-[10.5px]">विवाह स्थल व QR</span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  समय व स्थान
                </span>
              </div>

              {/* Group 3: Quick Switch Card / Envelope */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('card')}
                    className={`px-3 py-2 rounded text-xs font-bold transition flex items-center gap-1 border ${
                      previewMode === 'card'
                        ? 'bg-red-800 text-white border-red-900 shadow-xs'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
                    }`}
                  >
                    <span>🎴 मुख्य कार्ड</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewMode('envelope');
                      onOpenTaskPane('envelope');
                    }}
                    className={`px-3 py-2 rounded text-xs font-bold transition flex items-center gap-1 border ${
                      previewMode === 'envelope'
                        ? 'bg-red-800 text-white border-red-900 shadow-xs'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>शादी लिफाफा</span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  सक्रिय दृश्य (View)
                </span>
              </div>
            </>
          )}

          {/* TAB: INSERT (प्रतीक व फोटो) */}
          {activeRibbonTab === 'insert' && (
            <>
              {/* Group 1: Deity Motifs */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('photos')}
                    className="flex flex-col items-center justify-center p-2 rounded bg-white hover:bg-amber-50 border border-stone-200 transition min-w-[70px]"
                  >
                    <span className="text-lg">🕉️</span>
                    <span className="text-[10.5px] font-semibold">श्री गणेश जी</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('photos')}
                    className="flex flex-col items-center justify-center p-2 rounded bg-white hover:bg-amber-50 border border-stone-200 transition min-w-[70px]"
                  >
                    <span className="text-lg">🪈</span>
                    <span className="text-[10.5px] font-semibold">राधा कृष्ण</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('photos')}
                    className="flex flex-col items-center justify-center p-2 rounded bg-white hover:bg-amber-50 border border-stone-200 transition min-w-[70px]"
                  >
                    <ImageIcon className="w-4 h-4 text-purple-600 mb-0.5" />
                    <span className="text-[10.5px] font-semibold">कस्टम फोटो</span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  देवी-देवता व युगल फोटो
                </span>
              </div>

              {/* Group 2: Watermark */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateCard({ enableWatermark: !cardData.enableWatermark })}
                    className={`flex flex-col items-center justify-center p-2 rounded border transition min-w-[75px] ${
                      cardData.enableWatermark
                        ? 'bg-amber-100 border-amber-400 text-amber-950 font-bold'
                        : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-600'
                    }`}
                  >
                    <span className="text-base">🪔</span>
                    <span className="text-[10.5px]">
                      {cardData.enableWatermark ? 'वॉटरमार्क चालू' : 'वॉटरमार्क बंद'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('style')}
                    className="flex flex-col items-center justify-center p-2 rounded bg-white hover:bg-stone-100 border border-stone-200 transition min-w-[70px]"
                  >
                    <Palette className="w-4 h-4 text-amber-600 mb-0.5" />
                    <span className="text-[10.5px] font-semibold">वॉटरमार्क शैली</span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  पावन पृष्ठभूमि वॉटरमार्क
                </span>
              </div>
            </>
          )}

          {/* TAB: LAYOUT (पेज आकार व थीम्स) */}
          {activeRibbonTab === 'layout' && (
            <>
              {/* Group 1: Wholesale Blank Card & Multi-Fold Inner */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('blankcard')}
                    className="flex flex-col items-center justify-center p-2 rounded bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold transition min-w-[85px] shadow-2xs"
                    title="थोक मार्केट रेडीमेड ब्लैंक कार्ड साइज व स्केल कैलिब्रेटर"
                  >
                    <span className="text-base">🎴</span>
                    <span className="text-[10px]">थोक कार्ड नाप</span>
                  </button>

                  {/* Fold Selector in Ribbon */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-stone-700">पल्ला फोल्ड:</span>
                    <div className="flex items-center bg-white border border-stone-300 rounded p-0.5">
                      <button
                        type="button"
                        onClick={() => updateCard({ cardFoldType: 'single', sizeKey: cardData.cardFoldType === 'single' ? cardData.sizeKey : '7x9' })}
                        className={`px-2 py-0.5 rounded text-[10.5px] font-bold transition ${
                          (cardData.cardFoldType || 'single') === 'single'
                            ? 'bg-red-800 text-white'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                        title="1-पल्ला (सिंगल कार्ड)"
                      >
                        1-पल्ला
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCard({ cardFoldType: 'bi-fold', sizeKey: 'bi-fold-book' })}
                        className={`px-2 py-0.5 rounded text-[10.5px] font-bold transition ${
                          cardData.cardFoldType === 'bi-fold'
                            ? 'bg-red-800 text-white'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                        title="2-पल्ला (बुक स्टाइल - 12×8.5 इंच)"
                      >
                        2-पल्ला
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCard({ cardFoldType: 'tri-fold', sizeKey: 'tri-fold-classic' })}
                        className={`px-2 py-0.5 rounded text-[10.5px] font-bold transition ${
                          cardData.cardFoldType === 'tri-fold'
                            ? 'bg-red-800 text-white'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                        title="3-पल्ला (गेटफोल्ड - 15×8.5 इंच)"
                      >
                        3-पल्ला
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-500 font-semibold mt-1">
                  <span>थोक कार्ड व फोल्ड</span>
                  <button
                    type="button"
                    onClick={() => updateCard({ showFoldCreaseGuides: !cardData.showFoldCreaseGuides })}
                    className="text-red-700 hover:underline flex items-center gap-0.5 font-bold"
                  >
                    <span>✂️ क्रीज {cardData.showFoldCreaseGuides !== false ? 'चालू' : 'बंद'}</span>
                  </button>
                </div>
              </div>

              {/* Group 2: Page Size */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10.5px] font-bold text-stone-700">कार्ड का आकार:</label>
                    <select
                      value={cardData.sizeKey || '7x9'}
                      onChange={(e) => updateCard({ sizeKey: e.target.value })}
                      className="text-xs bg-white border border-stone-300 rounded px-2 py-1 font-semibold focus:outline-none focus:ring-1 focus:ring-red-600 max-w-[150px] truncate"
                    >
                      {Object.entries(CARD_SIZES).map(([key, sz]) => (
                        <option key={key} value={key}>
                          {sz.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10.5px] font-bold text-stone-700">लिफाफा आकार:</label>
                    <select
                      value={cardData.envelopeSizeKey || 'standard'}
                      onChange={(e) => updateCard({ envelopeSizeKey: e.target.value })}
                      className="text-xs bg-white border border-stone-300 rounded px-2 py-1 font-semibold focus:outline-none focus:ring-1 focus:ring-red-600 max-w-[130px] truncate"
                    >
                      {Object.entries(ENVELOPE_SIZES).map(([key, sz]) => (
                        <option key={key} value={key}>
                          {sz.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  पृष्ठ आयाम (Dimensions)
                </span>
              </div>

              {/* Group 2: Royal Color Themes */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  {COLOR_THEMES.slice(0, 4).map((theme) => {
                    const isSelected = cardData.themeId === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => updateCard({
                          themeId: theme.id,
                          inkColor: theme.inkColor,
                          paperColor: theme.paperColor,
                          borderColor: theme.borderColor
                        })}
                        className={`flex flex-col items-center p-1 rounded border transition w-16 ${
                          isSelected ? 'border-red-700 ring-2 ring-red-400 bg-white' : 'border-stone-200 bg-white hover:bg-stone-50'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full border border-stone-300 shadow-2xs"
                          style={{ backgroundColor: theme.inkColor }}
                        />
                        <span className="text-[9.5px] font-bold text-stone-700 truncate w-full text-center mt-0.5">
                          {theme.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-500 font-semibold mt-1">
                  <span>शाही रंग थीम</span>
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('style')}
                    className="text-red-700 hover:underline"
                  >
                    अधिक...
                  </button>
                </div>
              </div>
            </>
          )}

          {/* TAB: TYPOGRAPHY (फॉन्ट व श्लोक) */}
          {activeRibbonTab === 'typography' && (
            <>
              {/* Group 1: Font Family */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10.5px] font-bold text-stone-700">मुख्य फॉन्ट:</label>
                    <select
                      value={cardData.fontFamily || 'Rozha One'}
                      onChange={(e) => updateCard({ fontFamily: e.target.value })}
                      className="text-xs bg-white border border-stone-300 rounded px-2.5 py-1 font-bold focus:outline-none focus:ring-1 focus:ring-red-600 min-w-[140px]"
                    >
                      <option value="Rozha One">Rozha One (शाही)</option>
                      <option value="Noto Serif Devanagari">Noto Serif (क्लासिक)</option>
                      <option value="Yatra One">Yatra One (पारम्परिक)</option>
                      <option value="Tiro Devanagari Hindi">Tiro Devanagari</option>
                      <option value="Gotu">Gotu (मॉडर्न)</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenDtpModal}
                    className="flex flex-col items-center justify-center p-2 rounded bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 transition font-bold"
                  >
                    <span className="text-sm">⚡</span>
                    <span className="text-[10px]">DTP कनवर्टर</span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  देवनागरी फॉन्ट परिवार
                </span>
              </div>

              {/* Group 1.5: Spell & Matra Proofing */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={onOpenSpellCheckModal}
                    className="flex flex-col items-center justify-center p-2 rounded bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-950 font-bold transition min-w-[75px] shadow-2xs group cursor-pointer"
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">✍️</span>
                    <span className="text-[10px] mt-0.5">वर्तनी जांच</span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  मात्रा व व्याकरण रक्षक
                </span>
              </div>

              {/* Group 2: Shloka & Shayari */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('shloka')}
                    className="flex flex-col items-center justify-center p-2 rounded bg-white hover:bg-stone-100 border border-stone-200 transition min-w-[75px]"
                  >
                    <BookOpen className="w-4 h-4 text-amber-700 mb-0.5" />
                    <span className="text-[10.5px] font-semibold">गणेश वंदना</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenTaskPane('shloka')}
                    className="flex flex-col items-center justify-center p-2 rounded bg-white hover:bg-stone-100 border border-stone-200 transition min-w-[75px]"
                  >
                    <Sparkles className="w-4 h-4 text-purple-600 mb-0.5" />
                    <span className="text-[10.5px] font-semibold">मांगलिक शायरी</span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  श्लोक, शायरी व दोहे
                </span>
              </div>
            </>
          )}

          {/* TAB: MAILINGS (डाक, लिफाफा व अतिथि) */}
          {activeRibbonTab === 'mailings' && (
            <>
              {/* Group 1: Envelope Editor */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewMode('envelope');
                      onOpenTaskPane('envelope');
                    }}
                    className="flex flex-col items-center justify-center p-2 rounded bg-white hover:bg-stone-100 border border-stone-200 transition min-w-[75px]"
                  >
                    <Mail className="w-4 h-4 text-red-700 mb-0.5" />
                    <span className="text-[10.5px] font-semibold">लिफाफा सामग्री</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewMode('envelope');
                      onOpenTaskPane('guests');
                    }}
                    className="flex flex-col items-center justify-center p-2 rounded bg-white hover:bg-stone-100 border border-stone-200 transition min-w-[75px]"
                  >
                    <Users className="w-4 h-4 text-indigo-700 mb-0.5" />
                    <span className="text-[10.5px] font-semibold">
                      अतिथि सूची ({cardData.guestList?.length || 0})
                    </span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  लिफाफा प्रेषक व पाने वाले
                </span>
              </div>

              {/* Group 2: Bulk Export for Guests */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={onExportBulkEnvelopes}
                    disabled={isExporting || !cardData.guestList?.length}
                    className="flex flex-col items-center justify-center p-2 rounded bg-indigo-700 hover:bg-indigo-600 disabled:opacity-50 text-white transition min-w-[90px] shadow-xs"
                  >
                    <Users className="w-4 h-4 mb-0.5 text-indigo-200" />
                    <span className="text-[10.5px] font-bold">सभी लिफाफे PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={onExportCombinedPDF}
                    disabled={isExporting}
                    className="flex flex-col items-center justify-center p-2 rounded bg-purple-700 hover:bg-purple-600 text-white transition min-w-[85px] shadow-xs"
                  >
                    <FileText className="w-4 h-4 mb-0.5 text-purple-200" />
                    <span className="text-[10.5px] font-bold">कार्ड + लिफाफा</span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  व्यक्तिगत बल्क मुद्रण
                </span>
              </div>
            </>
          )}

          {/* TAB: PRE-PRESS (प्री-प्रेस व स्क्रीन प्रिंट मास्टर) */}
          {activeRibbonTab === 'prepress' && (
            <>
              {/* Group 1: Screen Print Master Mode */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateCard({ screenPrintMode: !cardData.screenPrintMode })}
                    className={`flex flex-col items-center justify-center p-2 rounded border font-bold transition min-w-[80px] ${
                      cardData.screenPrintMode
                        ? 'bg-amber-400 text-stone-950 border-amber-500 shadow-xs'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-300'
                    }`}
                  >
                    <Printer className="w-4 h-4 mb-0.5" />
                    <span className="text-[10.5px]">
                      {cardData.screenPrintMode ? 'बटर मोड: सक्रिय' : 'बटर मोड ऑन'}
                    </span>
                  </button>

                  {/* Hot Foil Stamping Die Mode */}
                  <button
                    type="button"
                    onClick={() => updateCard({ screenPrintFoilMode: !cardData.screenPrintFoilMode })}
                    className={`flex flex-col items-center justify-center p-2 rounded border font-bold transition min-w-[75px] ${
                      cardData.screenPrintFoilMode
                        ? 'bg-black text-amber-300 border-black shadow-xs'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-300'
                    }`}
                    title="हॉट फॉइल स्टैम्पिंग व केमिकल ब्लॉक डाई मास्टर (100% ब्लैक बैकग्राउंड, व्हाइट आर्टवर्क)"
                  >
                    <span className="text-sm">⬛</span>
                    <span className="text-[10px]">हॉट फॉइल डाई</span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  स्क्रीन मास्टर व डाई
                </span>
              </div>

              {/* Group 2: Imposition Layout (2-Up / 4-Up) */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => updateCard({ screenPrintImposition: '1-up' })}
                    className={`px-2.5 py-1.5 rounded text-xs font-bold transition border ${
                      (cardData.screenPrintImposition || '1-up') === '1-up'
                        ? 'bg-stone-900 text-amber-300 border-stone-900'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
                    }`}
                  >
                    1-Up
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCard({ screenPrintImposition: '2-up' })}
                    className={`px-2.5 py-1.5 rounded text-xs font-bold transition border ${
                      cardData.screenPrintImposition === '2-up'
                        ? 'bg-amber-400 text-stone-950 border-amber-500'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
                    }`}
                    title="2-Up बटर पेपर (A4 शीट - 50% खर्च बचत ✂️)"
                  >
                    2-Up ✂️
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCard({ screenPrintImposition: '4-up' })}
                    className={`px-2.5 py-1.5 rounded text-xs font-bold transition border ${
                      cardData.screenPrintImposition === '4-up'
                        ? 'bg-amber-400 text-stone-950 border-amber-500'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
                    }`}
                    title="4-Up जंबो शीट (12×18 इंच - 75% खर्च बचत)"
                  >
                    4-Up (12×18)
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-500 font-semibold mt-1">
                  <span>इम्पोज़िशन लेआउट</span>
                  <button
                    type="button"
                    onClick={onExportImpositionPDF}
                    disabled={isExporting}
                    className="text-red-700 hover:underline font-bold"
                  >
                    PDF डाउनलोड ✂️
                  </button>
                </div>
              </div>

              {/* Group 3: 2-Color Plates */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => updateCard({ screenPrintPlate: 'all' })}
                    className={`px-2 py-1.5 rounded text-xs font-bold transition border ${
                      (cardData.screenPrintPlate || 'all') === 'all'
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-300'
                    }`}
                  >
                    फुल
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCard({ screenPrintPlate: 'text' })}
                    className={`px-2 py-1.5 rounded text-xs font-bold transition border ${
                      cardData.screenPrintPlate === 'text'
                        ? 'bg-red-700 text-white border-red-800'
                        : 'bg-white text-red-700 hover:bg-red-50 border-stone-300'
                    }`}
                    title="प्लेट 1: केवल टेक्स्ट मास्टर (लाल स्याही स्क्रीन)"
                  >
                    🔴 प्लेट 1 (टेक्स्ट)
                  </button>
                  <button
                    type="button"
                    onClick={() => updateCard({ screenPrintPlate: 'motifs' })}
                    className={`px-2 py-1.5 rounded text-xs font-bold transition border ${
                      cardData.screenPrintPlate === 'motifs'
                        ? 'bg-amber-500 text-stone-950 border-amber-600'
                        : 'bg-white text-amber-800 hover:bg-amber-50 border-stone-300'
                    }`}
                    title="प्लेट 2: केवल बॉर्डर्स व प्रतीक (गोल्डन स्याही स्क्रीन)"
                  >
                    🟡 प्लेट 2 (बॉर्डर)
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-500 font-semibold mt-1">
                  <span>2-रंग सेपरेशन</span>
                  <button
                    type="button"
                    onClick={onExportTwoPlatePDF}
                    disabled={isExporting}
                    className="text-red-700 hover:underline font-bold"
                  >
                    संयुक्त PDF 🎨
                  </button>
                </div>
              </div>

              {/* Group 4: CorelDRAW SVG Export */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <button
                  type="button"
                  onClick={onExportCorelDrawSVG}
                  disabled={isExporting}
                  className="flex flex-col items-center justify-center p-2 rounded bg-stone-900 hover:bg-black text-amber-300 transition border border-amber-400 min-w-[95px] shadow-xs"
                  title="CorelDRAW रेडी SVG (Convert to Curves / No Missing Fonts)"
                >
                  <FileDown className="w-4 h-4 text-amber-400 mb-0.5" />
                  <span className="text-[10.5px] font-bold">CorelDRAW SVG</span>
                </button>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  100% वेक्टर कर्व्स
                </span>
              </div>
            </>
          )}

          {/* TAB: EXPORT (एक्सपोर्ट व शेयर) */}
          {activeRibbonTab === 'export' && (
            <>
              {/* Group 1: Standard PDF & Image */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={onExportPDF}
                    disabled={isExporting}
                    className="flex flex-col items-center justify-center p-2 rounded bg-amber-500 hover:bg-amber-400 text-red-950 font-bold transition min-w-[75px] shadow-xs"
                  >
                    <FileText className="w-4 h-4 mb-0.5" />
                    <span className="text-[10.5px]">HD PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={onExportPNG}
                    disabled={isExporting}
                    className="flex flex-col items-center justify-center p-2 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold transition min-w-[75px] shadow-xs"
                  >
                    <Download className="w-4 h-4 mb-0.5" />
                    <span className="text-[10.5px]">HD इमेज</span>
                  </button>
                  <button
                    type="button"
                    onClick={onPrint}
                    className="flex flex-col items-center justify-center p-2 rounded bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 transition min-w-[65px]"
                  >
                    <Printer className="w-4 h-4 mb-0.5" />
                    <span className="text-[10.5px] font-semibold">सीधे प्रिंट</span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  300 DPI प्रिंट तैयार
                </span>
              </div>

              {/* Group 2: Proof & WhatsApp */}
              <div className="flex flex-col justify-between pr-2.5 border-r border-stone-300 flex-shrink-0">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={onOpenDraftProofModal}
                    className="flex flex-col items-center justify-center p-2 rounded bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-400 transition min-w-[85px] font-bold"
                  >
                    <span className="text-base">📑</span>
                    <span className="text-[10.5px]">कच्चा प्रूफ शेयर</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenDigitalModal}
                    className="flex flex-col items-center justify-center p-2 rounded bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold transition min-w-[85px] shadow-xs"
                  >
                    <Sparkles className="w-4 h-4 text-red-950 fill-current mb-0.5" />
                    <span className="text-[10.5px]">डिजिटल इनवाइट</span>
                  </button>
                  <button
                    type="button"
                    onClick={onOpenJobSlipModal}
                    className="flex flex-col items-center justify-center p-2 rounded bg-stone-900 hover:bg-black text-amber-300 font-bold transition min-w-[85px] shadow-xs border border-amber-400/50"
                  >
                    <span className="text-base">📋</span>
                    <span className="text-[10.5px]">जॉब स्लिप / बिल</span>
                  </button>
                </div>
                <span className="text-[10px] text-center text-stone-500 font-semibold mt-1">
                  WhatsApp शेयरिंग
                </span>
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
}
