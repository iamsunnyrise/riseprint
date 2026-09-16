/**
 * DTP & Printing Press Font Converters
 * Supports:
 * 1. Kruti Dev 010 (The #1 Indian printing press font for CorelDRAW & PageMaker)
 * 2. Chanakya (Popular Hindi DTP publication font)
 * 3. ShreeLipi (Shree-Dev Devanagari standard)
 */

import { unicodeToKrutidev, krutidevToUnicode } from './krutidev-converter.js';
import { unicodeToChanakya, chanakyaToUnicode } from './chanakya-converter.js';

export { unicodeToKrutidev, krutidevToUnicode, unicodeToChanakya, chanakyaToUnicode };

// ShreeLipi conversion maps (Standard Shree-Dev 0714/0708)
const SHREELIPI_PAIRS = [
  ['Am¡', 'औ'],
  ['Amo', 'ओ'],
  ['Am|', 'ओं'],
  ['Am', 'आ'],
  ['A', 'अ'],
  ['B©', 'ई'],
  ['B', 'इ'],
  ['C', 'उ'],
  ['D', 'ऊ'],
  ['Eo', 'ऐ'],
  ['E', 'ए'],
  ['F', 'ऋ'],
  ['m°', 'ॉ'],
  ['mo', 'ो'],
  ['m|', 'ों'],
  ['o', 'े'],
  ['|', 'ें'],
  ['m¡', 'ौ'],
  ['m¢', 'ौं'],
  ['¡', 'ै'],
  ['¢', 'ैं'],
  ['m', 'ा'],
  ['r', 'ी'],
  ['s', 'ी'],
  ['t', 'ीं'],
  ['w', 'ु'],
  ['þ', 'ु'],
  ['y', 'ू'],
  ['§', 'ं'],
  ['±', 'ँ'],
  ['•', 'ः'],
  ['¥', 'ृ'],
  ['²', '्'],
  ['H', 'क'],
  ['³', 'क्'],
  ['I', 'ख'],
  ['»', 'ख्'],
  ['J', 'ग'],
  ['½', 'ग्'],
  ['K', 'घ'],
  ['M', 'च'],
  ['À', 'च्'],
  ['N', 'छ'],
  ['O', 'ज'],
  ['Á', 'ज्'],
  ['P', 'झ'],
  ['Q', 'ट'],
  ['R', 'ठ'],
  ['S', 'ड'],
  ['T', 'ढ'],
  ['U', 'ण'],
  ['Ê', 'ण्'],
  ['W', 'थ'],
  ['Ï', 'थ्'],
  ['V', 'त'],
  ['Ë', 'त्'],
  ['Y', 'ध'],
  ['Ü', 'ध्'],
  ['X', 'द'],
  ['Z', 'न'],
  ['Ý', 'न्'],
  ['a', 'फ'],
  ['c', 'फ्'],
  ['ë', 'प'],
  ['d', 'प्'],
  ['ì', 'भ'],
  ['e', 'भ्'],
  ['û', 'ब'],
  ['í', 'ब्'],
  ['f', 'म'],
  ['î', 'म्'],
  ['g', 'य'],
  ['ñ', 'र'],
  ['h', 'ल'],
  ['j', 'ल्'],
  ['ú', 'व'],
  ['k', 'व्'],
  ['Ô', 'श'],
  ['Û', 'श्'],
  ['Ú', 'ष'],
  ['à', 'ष्'],
  ['Þ', 'स'],
  ['l', 'स्'],
  ['Ì', 'ह'],
  ['Ð', 'क्ष'],
  ['Õ', 'क्ष्'],
  ['œ', 'ज्ञ'],
  ['Å', 'त्र'],
  ['&', 'श्र'],
  ['$', 'त्त'],
  ['>', 'क्क']
];

export function unicodeToShreelipi(text) {
  if (!text) return '';
  let result = text;
  // Sort by unicode length descending to replace multi-char conjuncts first
  const sorted = [...SHREELIPI_PAIRS].sort((a, b) => b[1].length - a[1].length);
  for (const [shree, uni] of sorted) {
    if (!uni) continue;
    result = result.split(uni).join(shree);
  }
  return result;
}

export function shreelipiToUnicode(text) {
  if (!text) return '';
  let result = text;
  const sorted = [...SHREELIPI_PAIRS].sort((a, b) => b[0].length - a[0].length);
  for (const [shree, uni] of sorted) {
    if (!shree) continue;
    result = result.split(shree).join(uni);
  }
  return result;
}

/**
 * Universal text converter between formats
 * @param {string} text - Input text
 * @param {'unicode'|'krutidev'|'chanakya'|'shreelipi'} fromFormat
 * @param {'unicode'|'krutidev'|'chanakya'|'shreelipi'} toFormat
 */
export function convertText(text, fromFormat, toFormat) {
  if (!text) return '';
  if (fromFormat === toFormat) return text;

  // First convert to Unicode as pivot
  let unicode = text;
  if (fromFormat === 'krutidev') {
    unicode = krutidevToUnicode(text);
  } else if (fromFormat === 'chanakya') {
    unicode = chanakyaToUnicode(text);
  } else if (fromFormat === 'shreelipi') {
    unicode = shreelipiToUnicode(text);
  }

  // If destination is Unicode, return
  if (toFormat === 'unicode') {
    return unicode;
  }

  // Convert from Unicode to target
  if (toFormat === 'krutidev') {
    return unicodeToKrutidev(unicode);
  } else if (toFormat === 'chanakya') {
    return unicodeToChanakya(unicode);
  } else if (toFormat === 'shreelipi') {
    return unicodeToShreelipi(unicode);
  }

  return unicode;
}

/**
 * Exports all card text content into a structured DTP block (in KrutiDev 010, Chanakya, or Unicode)
 * Ideal for copying directly into CorelDRAW / PageMaker / Illustrator.
 */
export function exportAllCardTextToDtp(cardData, targetFormat = 'krutidev') {
  if (!cardData) return '';

  const conv = (txt) => (txt ? convertText(txt, 'unicode', targetFormat) : '');

  const lines = [
    `=== विवाह निमंत्रण पत्र डेटा (${targetFormat.toUpperCase()}) ===`,
    '',
    `[शीर्ष श्लोक व मंगल मंत्र]`,
    conv(cardData.mangalShloka || '॥ श्री गणेशाय नमः ॥'),
    conv(cardData.subTitle || 'शुभ विवाह'),
    '',
    `[वर (दूल्हा) का विवरण]`,
    `${conv(cardData.groomPrefix || 'चि०')} ${conv(cardData.groomName || '')}`,
    `आत्मज: ${conv(cardData.groomFather || '')}`,
    `पौत्र: ${conv(cardData.groomGrandFather || '')}`,
    `ग्राम/पता: ${conv(cardData.groomVillage || '')} ${conv(cardData.groomThana || '')}`,
    '',
    `[वधू (दुल्हन) का विवरण]`,
    `${conv(cardData.bridePrefix || 'सौ०')} ${conv(cardData.brideName || '')}`,
    `आत्मजा: ${conv(cardData.brideFather || '')}`,
    `पौत्री: ${conv(cardData.brideGrandFather || '')}`,
    `ग्राम/पता: ${conv(cardData.brideVillage || '')} ${conv(cardData.brideThana || '')}`,
    '',
    `[कार्यक्रम विवरण]`,
    ...(cardData.events || []).map(
      (ev) =>
        `• ${conv(ev.name)}: ${conv(ev.dateHindi || ev.date)} (${conv(ev.timeHindi || ev.time || '')})`
    ),
    '',
    `[विवाह स्थल]`,
    conv(cardData.venueName || ''),
    conv(cardData.venueAddress || ''),
    '',
    `[निमंत्रक व परिवार]`,
    `दर्शनाभिलाषी: ${conv((cardData.darshanabhilashi || []).map((d) => d.name).join(', '))}`,
    `स्वागताकांक्षी: ${conv((cardData.swagatotsuk || []).map((s) => s.name).join(', '))}`,
    `आकांक्षी: ${conv((cardData.aakankshi || []).map((a) => a.name).join(', '))}`,
    `बाल मनुहार: ${conv(cardData.balManuharText || '')}`,
    '',
    `[प्रेस पंक्ति]`,
    conv(cardData.pressLine || '')
  ];

  return lines.join('\n');
}
