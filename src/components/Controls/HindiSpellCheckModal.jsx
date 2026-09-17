import React, { useState, useEffect } from 'react';
import {
  Check,
  CheckCheck,
  Sparkles,
  AlertTriangle,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  X,
  BookMarked,
  ShieldCheck,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  scanCardText,
  applySingleCorrection,
  applyAllCorrections,
  addToCustomDictionary
} from '../../utils/hindiProofingEngine';

export default function HindiSpellCheckModal({ isOpen, onClose, data, onChange }) {
  const [errors, setErrors] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDtpGuide, setShowDtpGuide] = useState(false);
  const [fixedCount, setFixedCount] = useState(0);

  // Scan document whenever modal opens or data changes
  useEffect(() => {
    if (isOpen) {
      const detected = scanCardText(data);
      setErrors(detected);
      setCurrentIndex(0);
      if (detected.length === 0) {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
      }
    }
  }, [isOpen, data]);

  if (!isOpen) return null;

  const currentError = errors[currentIndex] || null;

  // 1. Fix single active error
  const handleFixCurrent = () => {
    if (!currentError) return;
    const updatedData = applySingleCorrection(data, currentError);
    onChange(updatedData);
    setFixedCount(prev => prev + 1);

    // Re-scan
    const remaining = scanCardText(updatedData);
    setErrors(remaining);
    if (currentIndex >= remaining.length && remaining.length > 0) {
      setCurrentIndex(remaining.length - 1);
    }
    if (remaining.length === 0) {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.5 } });
    }
  };

  // 2. Fix all errors across document at once
  const handleFixAll = () => {
    if (errors.length === 0) return;
    const updatedData = applyAllCorrections(data, errors);
    onChange(updatedData);
    setFixedCount(prev => prev + errors.length);
    setErrors([]);
    confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
  };

  // 3. Ignore current error once
  const handleIgnore = () => {
    if (currentIndex < errors.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else if (errors.length > 1) {
      setCurrentIndex(0);
    }
  };

  // 4. Add word to Custom Dictionary
  const handleAddToDictionary = () => {
    if (!currentError) return;
    addToCustomDictionary(currentError.wrongWord);
    // Remove all instances of this word from current errors
    const remaining = errors.filter(e => e.wrongWord !== currentError.wrongWord);
    setErrors(remaining);
    if (currentIndex >= remaining.length && remaining.length > 0) {
      setCurrentIndex(remaining.length - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="bg-white rounded-xl shadow-2xl border border-stone-300 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-150">
        
        {/* 1. Modal Top Bar (Office Word Style) */}
        <div className="bg-[#380606] text-amber-100 px-4 py-3 flex items-center justify-between border-b border-amber-600/40">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-amber-400 text-red-950 font-black flex items-center justify-center text-sm shadow-xs">
              ✍️
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                <span>हिंदी वर्तनी व व्याकरण समीक्षक</span>
                <span className="text-[10.5px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                  Proofing Engine
                </span>
              </h2>
              <p className="text-[10.5px] text-amber-200/80">
                प्रिंटिंग प्रेस एवं DTP ऑपरेटरों हेतु मात्रा, व्याकरण एवं अर्थ-भेद जांच
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowDtpGuide(prev => !prev)}
              className={`p-1.5 rounded text-xs font-bold transition flex items-center gap-1 ${
                showDtpGuide ? 'bg-amber-400 text-red-950' : 'text-amber-200 hover:bg-white/10'
              }`}
              title="सामान्य DTP गलतियों की सूची"
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden sm:inline text-[11px]">शुद्ध शब्द गाइड</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-full text-stone-300 hover:text-white transition"
              title="बंद करें"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. DTP Common Words Reference Drawer (Collapsible) */}
        {showDtpGuide && (
          <div className="bg-amber-50 border-b border-amber-200 p-3 max-h-48 overflow-y-auto text-xs text-amber-950">
            <div className="font-bold flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-amber-900">
                <BookMarked className="w-4 h-4 text-amber-700" />
                <span>प्रेस में होने वाली 10 बड़ी गलतियां व उनका शुद्ध रूप :</span>
              </span>
              <button
                type="button"
                onClick={() => setShowDtpGuide(false)}
                className="text-amber-800 hover:underline text-[10px]"
              >
                छुपाएं ✕
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-1.5 bg-white rounded border border-amber-200">
                <span className="text-red-600 line-through mr-1 font-bold">आशिर्वाद</span> ➔{' '}
                <span className="text-emerald-700 font-bold">आशीर्वाद</span> (रेफ 'व' पर)
              </div>
              <div className="p-1.5 bg-white rounded border border-amber-200">
                <span className="text-red-600 line-through mr-1 font-bold">ग्रह प्रवेश</span> ➔{' '}
                <span className="text-emerald-700 font-bold">गृह प्रवेश</span> ('गृह' = मकान)
              </div>
              <div className="p-1.5 bg-white rounded border border-amber-200">
                <span className="text-red-600 line-through mr-1 font-bold">श्रद्धांजली</span> ➔{' '}
                <span className="text-emerald-700 font-bold">श्रद्धांजलि</span> (ह्रस्व 'लि')
              </div>
              <div className="p-1.5 bg-white rounded border border-amber-200">
                <span className="text-red-600 line-through mr-1 font-bold">श्रीमति</span> ➔{' '}
                <span className="text-emerald-700 font-bold">श्रीमती</span> (दीर्घ 'ती')
              </div>
              <div className="p-1.5 bg-white rounded border border-amber-200">
                <span className="text-red-600 line-through mr-1 font-bold">उपलक्ष</span> ➔{' '}
                <span className="text-emerald-700 font-bold">उपलक्ष्य</span> (आधा क्ष + य)
              </div>
              <div className="p-1.5 bg-white rounded border border-amber-200">
                <span className="text-red-600 line-through mr-1 font-bold">कनिष्ट</span> ➔{' '}
                <span className="text-emerald-700 font-bold">कनिष्ठ</span> (अंत में 'ठ')
              </div>
            </div>
          </div>
        )}

        {/* 3. Main Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          
          {/* STATE A: ERRORS FOUND */}
          {errors.length > 0 && currentError && (
            <div className="space-y-4">
              
              {/* Status & Stepper Header */}
              <div className="flex items-center justify-between bg-stone-100 px-3 py-2 rounded-lg border border-stone-200 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 font-bold rounded-full text-[11px] flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                    <span>कुल {errors.length} अशुद्धियां मिलीं</span>
                  </span>
                  <span className="text-stone-500 hidden sm:inline">|</span>
                  <span className="text-stone-700 font-semibold hidden sm:inline">
                    स्थान: <span className="text-stone-900 font-bold">{currentError.fieldLabel}</span>
                  </span>
                </div>

                {/* Next / Prev Error Stepper */}
                <div className="flex items-center gap-1.5">
                  <span className="text-stone-500 font-mono text-[11px]">
                    त्रुटि {currentIndex + 1} / {errors.length}
                  </span>
                  <div className="flex items-center border rounded bg-white overflow-hidden shadow-2xs">
                    <button
                      type="button"
                      onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                      disabled={currentIndex === 0}
                      className="p-1 hover:bg-stone-100 disabled:opacity-30"
                      title="पिछली त्रुटि"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentIndex(prev => Math.min(errors.length - 1, prev + 1))}
                      disabled={currentIndex === errors.length - 1}
                      className="p-1 hover:bg-stone-100 disabled:opacity-30"
                      title="अगली त्रुटि"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Error Context Box (The sentence containing the mistake) */}
              <div className="p-3.5 bg-stone-50 rounded-lg border border-stone-300">
                <div className="text-[11px] font-bold text-stone-500 mb-1 flex items-center justify-between">
                  <span>वाक्य में अशुद्ध शब्द (Sentence Excerpt) :</span>
                  <span className="px-1.5 py-0.2 bg-red-100 text-red-700 text-[10px] font-bold rounded">
                    {currentError.category}
                  </span>
                </div>
                <div className="text-sm sm:text-base text-stone-800 leading-relaxed font-serif bg-white p-3 rounded border border-stone-200">
                  {currentError.fullText ? (
                    <span>
                      {currentError.fullText.split(currentError.wrongWord).map((chunk, i, arr) => (
                        <React.Fragment key={i}>
                          <span>{chunk}</span>
                          {i < arr.length - 1 && (
                            <span className="bg-red-100 text-red-700 font-bold px-1.5 py-0.5 rounded underline decoration-wavy decoration-red-500 mx-0.5 shadow-2xs">
                              {currentError.wrongWord}
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </span>
                  ) : (
                    <span>{currentError.contextSentence}</span>
                  )}
                </div>
              </div>

              {/* Suggestion Card (Recommended Correction & Explanation) */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-lg space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-800">
                      शुद्ध व्याकरणिक सुझाव (Recommended Correction)
                    </span>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xl sm:text-2xl font-black text-emerald-900 font-serif tracking-wide">
                        {currentError.correctWord}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-700" />
                        <span>शुद्ध मानक</span>
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleFixCurrent}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer hover:scale-102"
                  >
                    <Check className="w-4 h-4" />
                    <span>यह सुधारें (Change)</span>
                  </button>
                </div>

                {/* Detailed Explanation */}
                <div className="pt-2 border-t border-emerald-200/80 text-xs text-emerald-900/90 leading-relaxed">
                  <span className="font-bold mr-1">कारण:</span>
                  <span>{currentError.reason}</span>
                </div>
              </div>

            </div>
          )}

          {/* STATE B: NO ERRORS / ALL FIXED CELEBRATION */}
          {errors.length === 0 && (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-3xl shadow-sm">
                <ShieldCheck className="w-9 h-9 text-emerald-600" />
              </div>

              <h3 className="text-xl font-black text-stone-900">
                बधाई! आपका कार्ड 100% शुद्ध व प्रिंट रेडी है।
              </h3>

              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                कार्ड में कोई भी वर्तनी या मात्रा की अशुद्धि नहीं पाई गई है। अब आप बिना किसी संकोच के बटर पेपर, स्क्रीन प्रिंट या डिजिटल कार्ड एक्सपोर्ट कर सकते हैं।
              </p>

              {fixedCount > 0 && (
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full border border-amber-300">
                  ✨ इस सत्र में कुल {fixedCount} अशुद्धियां शुद्ध की गईं!
                </div>
              )}

              <div className="pt-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-lg shadow-md transition cursor-pointer"
                >
                  समीक्षा पूर्ण (Done)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4. Bottom Action Footer */}
        {errors.length > 0 && (
          <div className="bg-stone-100 px-4 py-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {/* Ignore Button */}
              <button
                type="button"
                onClick={handleIgnore}
                className="px-3 py-1.5 bg-white hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded border border-stone-300 transition"
                title="इस बार के लिए छोड़ें और अगला देखें"
              >
                ⏭️ छोड़ें (Ignore)
              </button>

              {/* Add to Custom Dictionary Button */}
              <button
                type="button"
                onClick={handleAddToDictionary}
                className="px-3 py-1.5 bg-white hover:bg-stone-200 text-stone-700 font-semibold text-xs rounded border border-stone-300 transition flex items-center gap-1"
                title="यदि यह आपके क्षेत्र का कोई नाम, गोत्र या गांव है तो इसे शब्दकोश में जोड़ें"
              >
                <BookOpen className="w-3.5 h-3.5 text-stone-500" />
                <span>शब्दकोश में जोड़ें</span>
              </button>
            </div>

            {/* Change All Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFixAll}
                className="px-4 py-1.5 bg-red-800 hover:bg-red-900 text-white font-bold text-xs rounded shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                title="कार्ड की सभी वर्तनी त्रुटियों को एक साथ शुद्ध करें"
              >
                <CheckCheck className="w-4 h-4 text-amber-300" />
                <span>सभी {errors.length} सुधारें (Change All)</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
