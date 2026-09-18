import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CARD_SIZES, ENVELOPE_SIZES, getCardEffectiveDimensions } from './defaultData';

/**
 * Robust helper to resolve the print target element in the DOM.
 * Works even if React ref is null, timing is delayed, or view is toggled.
 */
function resolvePrintElement(element, type = 'card') {
  const targetId = type === 'envelope' ? 'wedding-envelope-element' : 'wedding-card-element';
  const targetClass = type === 'envelope' ? '.wedding-envelope-print-target' : '.wedding-card-print-target';

  if (element) {
    if (element.id === targetId) return element;
    if (element.current && element.current.id === targetId) return element.current;

    const inner = (element.current || element).querySelector?.(`#${targetId}`)
      || (element.current || element).querySelector?.(targetClass);
    if (inner) return inner;

    if (element.nodeType === Node.ELEMENT_NODE && !element.querySelector?.(`#${targetId}`)) {
      // If it's already an element without the inner ID, use it
      return element;
    }
  }

  return (
    document.getElementById(targetId) ||
    document.querySelector(targetClass) ||
    (element?.current || element)
  );
}

/**
 * Universal safe PDF saver with Blob download fallback.
 */
function savePdfSafely(pdf, filename) {
  try {
    pdf.save(filename);
  } catch (err) {
    console.warn('pdf.save failed, falling back to Blob download:', err);
    const blob = pdf.output('blob');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 2500);
  }
}

/**
 * Universal high-resolution html2canvas capture helper.
 * - Resets CSS scale/zoom in cloned DOM so capture is at 100% true print resolution.
 * - Strips drop shadow so no dirty shadow borders are captured in print.
 * - Unhides all parent elements in cloned DOM cleanly without destroying flexbox.
 * - Enforces CORS, image loading and clean backgrounds.
 */
async function captureElementToCanvas(targetElement, options = {}) {
  if (!targetElement) {
    throw new Error('प्रिंट हेतु लक्ष्य तत्व (Target Element) नहीं मिला।');
  }

  // Scale 3 = 300 DPI true printing press fidelity
  const scale = options.scale || 3;
  const backgroundColor = options.backgroundColor || '#ffffff';

  const canvas = await html2canvas(targetElement, {
    scale: scale,
    useCORS: true,
    allowTaint: true,
    logging: false,
    backgroundColor: backgroundColor,
    onclone: (clonedDoc) => {
      // 1. Reset scale, drop shadow, and margin on wedding card
      const cardEl = clonedDoc.getElementById('wedding-card-element');
      if (cardEl) {
        cardEl.style.transform = 'none';
        cardEl.style.boxShadow = 'none';
        cardEl.style.margin = '0';
        
        // Only unhide ancestors that are actually hidden
        let parent = cardEl.parentElement;
        while (parent && parent !== clonedDoc.body) {
          if (parent.classList.contains('hidden') || parent.style.display === 'none') {
            parent.classList.remove('hidden');
            parent.style.display = 'block';
          }
          parent = parent.parentElement;
        }
      }

      // 2. Reset scale, drop shadow, and margin on wedding envelope
      const envEl = clonedDoc.getElementById('wedding-envelope-element');
      if (envEl) {
        envEl.style.transform = 'none';
        envEl.style.boxShadow = 'none';
        envEl.style.margin = '0';
        
        let parent = envEl.parentElement;
        while (parent && parent !== clonedDoc.body) {
          if (parent.classList.contains('hidden') || parent.style.display === 'none') {
            parent.classList.remove('hidden');
            parent.style.display = 'block';
          }
          parent = parent.parentElement;
        }
      }

      if (typeof options.onclone === 'function') {
        options.onclone(clonedDoc);
      }
    }
  });

  if (!canvas || canvas.width === 0 || canvas.height === 0) {
    throw new Error('कैनवास जनरेशन असफल रहा (0x0 size)।');
  }

  return canvas;
}

/**
 * High-Resolution 300 DPI PDF Generation for Wedding Card
 */
export async function downloadCardPDF(cardElement, sizeKey = '7x9', groomName = '', brideName = '', customDimensions = null) {
  const element = resolvePrintElement(cardElement, 'card');
  if (!element) {
    throw new Error('शादी कार्ड का तत्व (wedding-card-element) नहीं मिला।');
  }

  const cardConfig = CARD_SIZES[sizeKey] || CARD_SIZES['7x9'];
  const widthMm = (sizeKey === 'custom' && customDimensions?.widthMm) ? Number(customDimensions.widthMm) : cardConfig.widthMm;
  const heightMm = (sizeKey === 'custom' && customDimensions?.heightMm) ? Number(customDimensions.heightMm) : cardConfig.heightMm;

  const canvas = await captureElementToCanvas(element, { scale: 3 });
  const imgData = canvas.toDataURL('image/jpeg', 0.98);

  // Exact 1:1 user-specified size for custom cards, or aspect-ratio preserved height for templates
  let finalWidthMm = widthMm;
  let finalHeightMm = heightMm;

  if (sizeKey === 'custom') {
    // 100% Exact User-Calibrated Physical Dimensions (e.g. 6.5x9.5" = 165x241mm)
    finalWidthMm = widthMm;
    finalHeightMm = heightMm;
  } else {
    // For standard templates, maintain aspect ratio if optional sections lengthen the card
    const renderedAspect = canvas.height / canvas.width;
    const nominalAspect = heightMm / widthMm;
    finalHeightMm = Math.abs(renderedAspect - nominalAspect) < 0.03
      ? heightMm
      : Math.round((widthMm * renderedAspect) * 10) / 10;
  }

  const pdf = new jsPDF({
    orientation: finalWidthMm > finalHeightMm ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [finalWidthMm, finalHeightMm]
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, finalWidthMm, finalHeightMm, undefined, 'FAST');

  const namePart = groomName ? groomName.replace(/\s+/g, '_') : 'Card';
  const sizeLabel = sizeKey === 'custom' ? `${finalWidthMm}x${finalHeightMm}mm` : sizeKey;
  const filename = `Vivah_Nimantran_${namePart}_${sizeLabel}.pdf`;
  savePdfSafely(pdf, filename);
}

/**
 * High-Definition Image (PNG) Export for Card
 */
export async function downloadCardPNG(cardElement, sizeKey = '7x9', groomName = '') {
  const element = resolvePrintElement(cardElement, 'card');
  if (!element) {
    throw new Error('शादी कार्ड का तत्व नहीं मिला।');
  }

  const canvas = await captureElementToCanvas(element, { scale: 3 });
  const namePart = groomName ? groomName.replace(/\s+/g, '_') : 'Card';
  const link = document.createElement('a');
  link.download = `Vivah_Nimantran_${namePart}_${sizeKey}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  setTimeout(() => document.body.removeChild(link), 1000);
}

/**
 * High-Resolution 300 DPI PDF Generation for Envelope (शादी का लिफाफा)
 */
export async function downloadEnvelopePDF(envelopeElement, envelopeSizeKey = 'standard', title = 'Vivah_Lifafa') {
  const element = resolvePrintElement(envelopeElement, 'envelope');
  if (!element) {
    throw new Error('शादी लिफाफा का तत्व (wedding-envelope-element) नहीं मिला।');
  }

  const envelopeConfig = ENVELOPE_SIZES[envelopeSizeKey] || ENVELOPE_SIZES['standard'];
  const { widthMm, heightMm } = envelopeConfig;

  const canvas = await captureElementToCanvas(element, { scale: 3 });
  const imgData = canvas.toDataURL('image/jpeg', 0.98);

  const renderedAspect = canvas.height / canvas.width;
  const nominalAspect = heightMm / widthMm;
  const actualHeightMm = Math.abs(renderedAspect - nominalAspect) < 0.03
    ? heightMm
    : Math.round((widthMm * renderedAspect) * 10) / 10;

  const pdf = new jsPDF({
    orientation: widthMm > actualHeightMm ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [widthMm, actualHeightMm]
  });

  pdf.addImage(imgData, 'JPEG', 0, 0, widthMm, actualHeightMm, undefined, 'FAST');

  const filename = `${title.replace(/\s+/g, '_')}_Envelope_${envelopeSizeKey}.pdf`;
  savePdfSafely(pdf, filename);
}

/**
 * High-Definition Image (PNG) Export for Envelope
 */
export async function downloadEnvelopePNG(envelopeElement, envelopeSizeKey = 'standard', title = 'Vivah_Lifafa') {
  const element = resolvePrintElement(envelopeElement, 'envelope');
  if (!element) {
    throw new Error('शादी लिफाफा का तत्व नहीं मिला।');
  }

  const canvas = await captureElementToCanvas(element, { scale: 3 });
  const link = document.createElement('a');
  link.download = `${title.replace(/\s+/g, '_')}_Envelope_${envelopeSizeKey}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  setTimeout(() => document.body.removeChild(link), 1000);
}

/**
 * Combined PDF: Page 1 Wedding Card + Page 2 Matching Envelope
 */
export async function downloadCombinedCardAndEnvelopePDF(cardElement, envelopeElement, sizeKey = '7x9', envelopeSizeKey = 'standard', groomName = '', customDimensions = null) {
  const cardTarget = resolvePrintElement(cardElement, 'card');
  const envTarget = resolvePrintElement(envelopeElement, 'envelope');

  if (!cardTarget) {
    throw new Error('संयुक्त PDF हेतु मुख्य शादी कार्ड नहीं मिला।');
  }
  if (!envTarget) {
    throw new Error('संयुक्त PDF हेतु शादी का लिफाफा नहीं मिला।');
  }

  const cardConfig = (sizeKey === 'custom' && customDimensions) ? customDimensions : (CARD_SIZES[sizeKey] || CARD_SIZES['7x9']);
  const envelopeConfig = ENVELOPE_SIZES[envelopeSizeKey] || ENVELOPE_SIZES['standard'];

  // 1. Render Card Canvas (Scale 3)
  const cardCanvas = await captureElementToCanvas(cardTarget, { scale: 3 });
  const cardImg = cardCanvas.toDataURL('image/jpeg', 0.98);

  const cardAspect = cardCanvas.height / cardCanvas.width;
  const cardNominalAspect = cardConfig.heightMm / cardConfig.widthMm;
  const cardActualHeightMm = sizeKey === 'custom'
    ? cardConfig.heightMm
    : (Math.abs(cardAspect - cardNominalAspect) < 0.03
        ? cardConfig.heightMm
        : Math.round((cardConfig.widthMm * cardAspect) * 10) / 10);

  // 2. Render Envelope Canvas (Scale 3)
  const envCanvas = await captureElementToCanvas(envTarget, { scale: 3 });
  const envImg = envCanvas.toDataURL('image/jpeg', 0.98);

  const envAspect = envCanvas.height / envCanvas.width;
  const envNominalAspect = envelopeConfig.heightMm / envelopeConfig.widthMm;
  const envActualHeightMm = Math.abs(envAspect - envNominalAspect) < 0.03
    ? envelopeConfig.heightMm
    : Math.round((envelopeConfig.widthMm * envAspect) * 10) / 10;

  // 3. Create Multi-Page PDF
  // Page 1: Card
  const pdf = new jsPDF({
    orientation: cardConfig.widthMm > cardActualHeightMm ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [cardConfig.widthMm, cardActualHeightMm]
  });
  pdf.addImage(cardImg, 'JPEG', 0, 0, cardConfig.widthMm, cardActualHeightMm, undefined, 'FAST');

  // Page 2: Envelope
  pdf.addPage([envelopeConfig.widthMm, envActualHeightMm], envelopeConfig.widthMm > envActualHeightMm ? 'landscape' : 'portrait');
  pdf.addImage(envImg, 'JPEG', 0, 0, envelopeConfig.widthMm, envActualHeightMm, undefined, 'FAST');

  const namePart = groomName ? groomName.replace(/\s+/g, '_') : 'Card';
  const filename = `Vivah_Complete_${namePart}_Card_And_Envelope.pdf`;
  savePdfSafely(pdf, filename);
}

/**
 * Bulk Multi-Page PDF: Generates 1 page per guest envelope (फीचर 3)
 */
export async function downloadBulkPersonalizedEnvelopesPDF(
  envelopeElement,
  guestList = [],
  envelopeSizeKey = 'standard',
  onProgress
) {
  const element = resolvePrintElement(envelopeElement, 'envelope');
  if (!element || !guestList || guestList.length === 0) return;

  const envelopeConfig = ENVELOPE_SIZES[envelopeSizeKey] || ENVELOPE_SIZES['standard'];
  const { widthMm, heightMm } = envelopeConfig;
  const isLandscape = widthMm > heightMm;

  const pdf = new jsPDF({
    orientation: isLandscape ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [widthMm, heightMm]
  });

  // Create an offscreen clone of the envelope element to mutate guest names safely
  const clone = element.cloneNode(true);
  clone.id = 'bulk-envelope-clone-exporter';
  clone.style.position = 'fixed';
  clone.style.left = '-9999px';
  clone.style.top = '0';
  clone.style.transform = 'none'; // Unscaled for crisp 300 DPI capture
  clone.style.opacity = '1';
  document.body.appendChild(clone);

  try {
    for (let i = 0; i < guestList.length; i++) {
      const guest = guestList[i];
      if (onProgress) {
        onProgress(i + 1, guestList.length, guest.name);
      }

      // Update recipient text nodes in the clone
      const nameEl = clone.querySelector('[data-recipient-name="true"]');
      const relEl = clone.querySelector('[data-recipient-relation="true"]');
      const cityEl = clone.querySelector('[data-recipient-city="true"]');

      if (nameEl) nameEl.textContent = guest.name;
      if (relEl) relEl.textContent = guest.relation || 'सपरिवार सादर आमंत्रण';
      if (cityEl) cityEl.textContent = guest.city ? `स्थान :- ${guest.city}` : '';

      // Capture high-res canvas
      const canvas = await html2canvas(clone, {
        scale: 2.2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      if (i > 0) {
        pdf.addPage([widthMm, heightMm], isLandscape ? 'landscape' : 'portrait');
      }
      pdf.addImage(imgData, 'JPEG', 0, 0, widthMm, heightMm, undefined, 'FAST');
    }

    const filename = `Vivah_All_Envelopes_${guestList.length}_Guests.pdf`;
    savePdfSafely(pdf, filename);
  } finally {
    if (document.body.contains(clone)) {
      document.body.removeChild(clone);
    }
  }
}

/**
 * Trigger Browser Print with Dynamic Page Dimensions
 */
export function triggerBrowserPrint(targetType = 'card', sizeKey = '7x9', envelopeSizeKey = 'standard', customDimensions = null) {
  const config = targetType === 'envelope'
    ? (ENVELOPE_SIZES[envelopeSizeKey] || ENVELOPE_SIZES['standard'])
    : ((sizeKey === 'custom' && customDimensions) ? customDimensions : (CARD_SIZES[sizeKey] || CARD_SIZES['7x9']));

  const widthInches = config.widthInches || Number(((config.widthMm || 178) / 25.4).toFixed(2));
  const heightInches = config.heightInches || Number(((config.heightMm || 228) / 25.4).toFixed(2));

  let styleEl = document.getElementById('dynamic-print-style');
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'dynamic-print-style';
    document.head.appendChild(styleEl);
  }

  styleEl.innerHTML = `
    @media print {
      @page {
        size: ${widthInches}in ${heightInches}in;
        margin: 0mm;
      }
      body {
        margin: 0;
        padding: 0;
      }
    }
  `;

  setTimeout(() => {
    window.print();
  }, 100);
}

/**
 * Ultra-High Resolution Pure Black PDF for Screen Printing / Butter Paper
 */
export async function downloadScreenPrintPDF(element, sizeKey = '7x9', type = 'card', isMirror = false, isInvert = false, customDimensions = null) {
  const target = resolvePrintElement(element, type);
  if (!target) {
    throw new Error('स्क्रीन प्रिंट मास्टर तत्व नहीं मिला।');
  }

  const masterContainer = target.closest('.screen-print-master-container') || target;
  const config = type === 'envelope'
    ? (ENVELOPE_SIZES[sizeKey] || ENVELOPE_SIZES['standard'])
    : ((sizeKey === 'custom' && customDimensions) ? customDimensions : (CARD_SIZES[sizeKey] || CARD_SIZES['7x9']));

  // Add margin for crop marks and registration crosshairs
  const paddingMm = 14;
  const widthMm = (config.widthMm || 178) + (paddingMm * 2);
  const heightMm = (config.heightMm || 228) + (paddingMm * 2);

  const canvas = await captureElementToCanvas(masterContainer, {
    scale: 3.5,
    backgroundColor: isInvert ? '#000000' : '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: widthMm > heightMm ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [widthMm, heightMm]
  });

  pdf.addImage(imgData, 'PNG', 0, 0, widthMm, heightMm, undefined, 'FAST');

  const modeStr = isMirror ? 'Mirror_Tracing' : 'Positive_Master';
  const sizeLabel = (sizeKey === 'custom' && customDimensions) ? `${config.widthMm}x${config.heightMm}mm` : sizeKey;
  const filename = `ScreenPrint_${modeStr}_${type}_${sizeLabel}.pdf`;
  savePdfSafely(pdf, filename);
}

/**
 * Ultra-High Resolution PNG for Screen Printing Master
 */
export async function downloadScreenPrintPNG(element, sizeKey = '7x9', type = 'card', isMirror = false, isInvert = false) {
  const target = resolvePrintElement(element, type);
  if (!target) {
    throw new Error('स्क्रीन प्रिंट मास्टर तत्व नहीं मिला।');
  }

  const masterContainer = target.closest('.screen-print-master-container') || target;
  const canvas = await captureElementToCanvas(masterContainer, {
    scale: 3.5,
    backgroundColor: isInvert ? '#000000' : '#ffffff'
  });

  const modeStr = isMirror ? 'Mirror_Tracing' : 'Positive_Master';
  const link = document.createElement('a');
  link.download = `ScreenPrint_${modeStr}_${type}_${sizeKey}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  setTimeout(() => document.body.removeChild(link), 1000);
}

/**
 * ✂️ Pre-Press Imposition Sheet PDF Export (2-Up / 4-Up Butter Paper Master)
 * Saves 50% to 75% on Gateway Tracing Paper and Screen Making Costs.
 */
export async function downloadImpositionPDF(element, options = {}) {
  const type = options.type || 'card';
  const target = resolvePrintElement(element, type);
  if (!target) {
    throw new Error('इम्पोज़िशन मास्टर तत्व नहीं मिला।');
  }

  const masterContainer = target.closest('.screen-print-master-container') || target;
  const sheetSize = options.sheetSize || 'a4';
  const imposition = options.imposition || '2-up';
  const isInvert = Boolean(options.isInvert);

  // Standard Paper Dimensions in millimeters
  let sheetWidthMm = 210;
  let sheetHeightMm = 297;
  if (sheetSize === '12x18') {
    sheetWidthMm = 305; // 12 inches
    sheetHeightMm = 457; // 18 inches
  }

  const canvas = await captureElementToCanvas(masterContainer, {
    scale: 3.5,
    backgroundColor: isInvert ? '#000000' : '#ffffff'
  });

  const imgData = canvas.toDataURL('image/png');
  const isLandscape = canvas.width > canvas.height;

  const pdfWidth = isLandscape ? Math.max(sheetWidthMm, sheetHeightMm) : Math.min(sheetWidthMm, sheetHeightMm);
  const pdfHeight = isLandscape ? Math.min(sheetWidthMm, sheetHeightMm) : Math.max(sheetWidthMm, sheetHeightMm);

  const pdf = new jsPDF({
    orientation: isLandscape ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [pdfWidth, pdfHeight]
  });

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
  const filename = `Imposition_${imposition.toUpperCase()}_Sheet_${sheetSize.toUpperCase()}_Master.pdf`;
  savePdfSafely(pdf, filename);
}

/**
 * 🎨 2-Color Screen Printing Plate Separation PDF Export (2-Page Multi-Screen Master)
 * Page 1: Plate 1 (Red Ink Screen - Text Only)
 * Page 2: Plate 2 (Gold Ink Screen - Motifs & Borders Only)
 * Both pages share identical coordinates and registration crosshairs for 100% precision.
 */
export async function downloadTwoPlateSeparationPDF(element, cardData, options = {}) {
  const type = options.type || 'card';
  const target = resolvePrintElement(element, type);
  if (!target) {
    throw new Error('स्क्रीन प्रिंट मास्टर तत्व नहीं मिला।');
  }

  const masterContainer = target.closest('.screen-print-master-container') || target;
  const config = type === 'envelope'
    ? (ENVELOPE_SIZES[cardData.envelopeSizeKey] || ENVELOPE_SIZES['standard'])
    : getCardEffectiveDimensions(cardData);

  const paddingMm = 14;
  const widthMm = (config.widthMm || 178) + (paddingMm * 2);
  const heightMm = (config.heightMm || 228) + (paddingMm * 2);

  const pdf = new jsPDF({
    orientation: widthMm > heightMm ? 'landscape' : 'portrait',
    unit: 'mm',
    format: [widthMm, heightMm]
  });

  // Target element reference for toggling classes
  const cardEl = target.id === 'wedding-card-element' || target.id === 'wedding-envelope-element'
    ? target
    : target.querySelector('#wedding-card-element, #wedding-envelope-element') || target;

  // --- Page 1: Plate 1 (Text Only / Red Ink Screen) ---
  cardEl.classList.remove('screen-plate-motifs-only');
  cardEl.classList.add('screen-plate-text-only');
  await new Promise(r => setTimeout(r, 60));

  const canvasPlate1 = await captureElementToCanvas(masterContainer, {
    scale: 3.5,
    backgroundColor: '#ffffff'
  });
  const imgPlate1 = canvasPlate1.toDataURL('image/png');
  pdf.addImage(imgPlate1, 'PNG', 0, 0, widthMm, heightMm, undefined, 'FAST');

  // --- Page 2: Plate 2 (Motifs & Borders Only / Gold Ink Screen) ---
  cardEl.classList.remove('screen-plate-text-only');
  cardEl.classList.add('screen-plate-motifs-only');
  await new Promise(r => setTimeout(r, 60));

  const canvasPlate2 = await captureElementToCanvas(masterContainer, {
    scale: 3.5,
    backgroundColor: '#ffffff'
  });
  const imgPlate2 = canvasPlate2.toDataURL('image/png');
  
  pdf.addPage([widthMm, heightMm], widthMm > heightMm ? 'landscape' : 'portrait');
  pdf.addImage(imgPlate2, 'PNG', 0, 0, widthMm, heightMm, undefined, 'FAST');

  // Reset classes back to original state
  cardEl.classList.remove('screen-plate-text-only', 'screen-plate-motifs-only');
  if (cardData.screenPrintPlate === 'text') cardEl.classList.add('screen-plate-text-only');
  if (cardData.screenPrintPlate === 'motifs') cardEl.classList.add('screen-plate-motifs-only');

  const filename = `2_Color_Screen_Plates_Plate1_Text_Plate2_Gold.pdf`;
  savePdfSafely(pdf, filename);
}

