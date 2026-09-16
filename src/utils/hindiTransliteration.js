/**
 * Hindi Phonetic Transliteration Engine
 * Converts Hinglish (English alphabet) to Devanagari Hindi.
 * Features:
 * 1. Rich offline wedding dictionary (names, rituals, relatives, places).
 * 2. Pure offline rule-based phonetic engine (zero latency, offline fallback).
 * 3. Asynchronous Google Input Tools API fetcher with memory & localStorage caching for dictionary-grade accuracy.
 */

// Cache for suggestions: word -> array of hindi suggestions
const transliterationCache = new Map();

// High frequency Indian wedding words, common names, surnames, places, and kinship terms
const OFFLINE_DICTIONARY = {
  // Wedding terms & ceremonies
  shubh: ['शुभ', 'शुभर', 'शुभा'],
  vivah: ['विवाह', 'विवाहों'],
  shubharambh: ['शुभारंभ'],
  sangeet: ['संगीत'],
  haldi: ['हल्दी'],
  kalash: ['कलश'],
  mandap: ['मंडप'],
  vanshropan: ['वंशरोपन'],
  ghritdhari: ['घृतढारी'],
  tilak: ['तिलक'],
  tilakotsav: ['तिलकोत्सव'],
  barat: ['बारात', 'बरात'],
  prasthan: ['प्रस्थान'],
  aagman: ['आगमन'],
  vidai: ['विदाई'],
  pratibhoj: ['प्रीतिभोज'],
  pritibhoj: ['प्रीतिभोज'],
  bhoj: ['भोज'],
  shadi: ['शादी'],
  lagan: ['लगन'],
  lagnotsev: ['लग्नोत्सव'],
  matrimilan: ['मातृमिलन'],
  manglik: ['मांगलिक'],
  karyakram: ['कार्यक्रम'],
  tithi: ['तिथि'],
  din: ['दिन'],
  samay: ['समय'],
  sayankal: ['सायंकाल'],
  subah: ['सुबह'],
  dopahar: ['दोपहर'],
  ratri: ['रात्रि'],

  // Honorifics & Kinship
  shri: ['श्री'],
  shree: ['श्री'],
  shrimati: ['श्रीमती'],
  swargiya: ['स्वर्गीय', 'स्व०'],
  chi: ['चि०', 'चि'],
  sau: ['सौ०', 'सौ'],
  su: ['सु०', 'सु'],
  aayu: ['आयु०', 'आयु'],
  suputra: ['सुपुत्र'],
  suputri: ['सुपुत्री'],
  pratham: ['प्रथम'],
  dwitiya: ['द्वितीय'],
  tritiya: ['तृतीय'],
  kanishtha: ['कनिष्ठ'],
  jyeshtha: ['ज्येष्ठ'],
  pautra: ['पौत्र'],
  pautri: ['पौत्री'],
  dharampatni: ['धर्मपत्नी'],
  pitaji: ['पिताजी'],
  mataji: ['माताजी'],
  bhai: ['भाई'],
  bhabhi: ['भाभी'],
  chacha: ['चाचा'],
  chachi: ['चाची'],
  mama: ['मामा'],
  mami: ['मामी'],
  fufa: ['फूफा'],
  bua: ['बुआ'],
  jija: ['जीजा'],
  didi: ['दीदी'],
  mitra: ['मित्र'],
  parivar: ['परिवार'],

  // Invitation titles
  darshanabhilashi: ['दर्शनाभिलाषी'],
  swagatotsuk: ['स्वागतोत्सुक'],
  swagatakankshi: ['स्वागताकांक्षी'],
  swagat: ['स्वागत'],
  aakankshi: ['आकांक्षी'],
  bal: ['बाल'],
  manuhar: ['मनुहार'],
  snehi: ['स्नेही'],
  swajan: ['स्वजन'],
  sadar: ['सादर'],
  nimantran: ['निमंत्रण'],
  patra: ['पत्र'],
  saparivar: ['सपरिवार'],
  upsthiti: ['उपस्थिति'],
  prarthana: ['प्रार्थना'],
  kripa: ['कृपा'],
  vinamra: ['विनम्र'],
  nivedan: ['निवेदन'],
  anurodh: ['अनुरोध'],

  // Press & Locations
  pess: ['प्रेस'],
  press: ['प्रेस'],
  mudrak: ['मुद्रक'],
  prakashak: ['प्रकाशक'],
  offset: ['ऑफसेट'],
  printers: ['प्रिंटर्स'],
  print: ['प्रिंट'],
  gram: ['ग्राम', 'ग्राम+पो०'],
  post: ['पोस्ट', 'पो०'],
  thana: ['थाना'],
  jila: ['जिला'],
  district: ['जिला'],
  rajya: ['राज्य'],
  bihar: ['बिहार'],
  patna: ['पटना'],
  nalanda: ['नालंदा', 'नालन्दा'],
  sarmera: ['सरमेरा'],
  cheron: ['चेरों'],
  delhi: ['दिल्ली'],
  mumbai: ['मुंबई'],
  varanasi: ['वाराणसी'],
  prayagraj: ['प्रयागराज'],
  gaya: ['गया'],
  bhagalpur: ['भागलपुर'],
  muzaffarpur: ['मुजफ्फरपुर'],
  ranchi: ['राँची', 'रांची'],
  lucknow: ['लखनऊ'],
  kanpur: ['कानपुर'],
  gorakhpur: ['गोरखपुर'],
  ayodhya: ['अयोध्या'],
  kolkata: ['कोलकाता'],

  // Common Names
  bittu: ['बिट्टू', 'बिट्टु', 'बिटटू'],
  kumar: ['कुमार', 'कुमर'],
  kumari: ['कुमारी'],
  devi: ['देवी'],
  mannu: ['मन्नू', 'मन्नु'],
  paswan: ['पासवान'],
  pooja: ['पूजा', 'पुजा'],
  rahul: ['राहुल'],
  amit: ['अमित'],
  priya: ['प्रिया'],
  anjali: ['अंजलि', 'अञ्जलि'],
  neha: ['नेहा'],
  rohit: ['रोहित'],
  rajesh: ['राजेश'],
  suresh: ['सुरेश'],
  mukesh: ['मुकेश'],
  dinesh: ['दिनेश'],
  mahesh: ['महेश'],
  sunil: ['सुनील'],
  anil: ['अनिल'],
  manoj: ['मनोज'],
  sanjay: ['संजय'],
  santosh: ['संतोष'],
  alok: ['आलोक'],
  vikas: ['विकास'],
  deepak: ['दीपक'],
  pawan: ['पवन'],
  ramesh: ['रमेश'],
  geeta: ['गीता'],
  sunita: ['सुनीता'],
  anita: ['अनीता'],
  rekha: ['रेखा'],
  mamta: ['ममता'],
  shobha: ['शोभा'],
  manju: ['मंजू'],
  radha: ['राधा'],
  sita: ['सीता'],
  ram: ['राम'],
  krishna: ['कृष्ण'],
  ganesh: ['गणेश'],
  shiva: ['शिव'],
  hanuman: ['हनुमान'],
  lakshmi: ['लक्ष्मी'],
  saraswati: ['सरस्वती'],

  // Common Surnames
  singh: ['सिंह'],
  sharma: ['शर्मा'],
  verma: ['वर्मा'],
  yadav: ['यादव'],
  gupta: ['गुप्ता'],
  pandey: ['पांडेय', 'पाण्डेय'],
  tiwari: ['तिवारी'],
  mishra: ['मिश्रा', 'मिश्र'],
  dubey: ['दुबे'],
  chaubey: ['चौबे'],
  thakur: ['ठाकुर'],
  choudhary: ['चौधरी'],
  patel: ['पटेल'],
  shah: ['शाह'],
  jha: ['झा'],
  prasad: ['प्रसाद'],
  sinha: ['सिन्हा'],
  kashyap: ['कश्यप'],
  rajput: ['राजपूत'],
  maurya: ['मौर्य'],
  kushwaha: ['कुशवाहा'],
  das: ['दास'],
  roy: ['रॉय'],
  pal: ['पाल']
};

/**
 * Pure offline rule-based transliteration engine (fallback when offline or instant 0ms preview).
 */
export function transliterateWordOffline(inputWord) {
  if (!inputWord) return '';

  const clean = inputWord.toLowerCase().trim();
  if (OFFLINE_DICTIONARY[clean]) {
    return OFFLINE_DICTIONARY[clean][0];
  }

  // Multi-character consonant patterns
  const consonants = {
    ksh: 'क्ष',
    chh: 'छ',
    shh: 'ष',
    shr: 'श्र',
    tr: 'त्र',
    gy: 'ज्ञ',
    jny: 'ज्ञ',
    kh: 'ख',
    gh: 'घ',
    ch: 'च',
    jh: 'झ',
    th: 'थ',
    dh: 'ध',
    ph: 'फ',
    bh: 'भ',
    sh: 'श',
    tt: 'ट्ट',
    dd: 'ड्ड',
    nn: 'न्न',
    mm: 'म्म',
    ll: 'ल्ल',
    ss: 'स्स',
    pp: 'प्प',
    bb: 'ब्ब',
    kk: 'क्क',
    k: 'क',
    g: 'ग',
    c: 'क',
    j: 'ज',
    t: 'त',
    d: 'द',
    n: 'न',
    p: 'प',
    f: 'फ',
    b: 'ब',
    m: 'म',
    y: 'य',
    r: 'र',
    l: 'ल',
    v: 'व',
    w: 'व',
    s: 'स',
    h: 'ह',
    q: 'क',
    z: 'ज़',
    x: 'क्स'
  };

  const initialVowels = {
    aa: 'आ',
    ee: 'ई',
    oo: 'ऊ',
    ai: 'ऐ',
    au: 'औ',
    ou: 'औ',
    a: 'अ',
    i: 'इ',
    u: 'उ',
    e: 'ए',
    o: 'ओ'
  };

  const matras = {
    aa: 'ा',
    ee: 'ी',
    oo: 'ू',
    ai: 'ै',
    au: 'ौ',
    ou: 'ौ',
    a: '', // Inherent vowel
    i: 'ि',
    u: 'ु',
    e: 'े',
    o: 'ो'
  };

  let result = '';
  let i = 0;
  let prevWasConsonant = false;

  while (i < clean.length) {
    // Check 3-letter, 2-letter, 1-letter consonants
    let matchedConsonant = null;
    for (const len of [3, 2, 1]) {
      const slice = clean.substr(i, len);
      if (consonants[slice]) {
        matchedConsonant = { token: slice, glyph: consonants[slice], len };
        break;
      }
    }

    if (matchedConsonant) {
      if (prevWasConsonant) {
        // Halant between two consonants
        result += '्';
      }
      result += matchedConsonant.glyph;
      i += matchedConsonant.len;
      prevWasConsonant = true;
      continue;
    }

    // Check 2-letter, 1-letter vowels
    let matchedVowel = null;
    for (const len of [2, 1]) {
      const slice = clean.substr(i, len);
      if (matras[slice] !== undefined) {
        matchedVowel = { token: slice, len };
        break;
      }
    }

    if (matchedVowel) {
      if (prevWasConsonant) {
        result += matras[matchedVowel.token];
      } else {
        result += initialVowels[matchedVowel.token] || matchedVowel.token;
      }
      i += matchedVowel.len;
      prevWasConsonant = false;
      continue;
    }

    // Numbers, punctuation, non-alphabet characters
    result += clean[i];
    i++;
    prevWasConsonant = false;
  }

  return result;
}

/**
 * Fetch top transliteration suggestions from Google Input Tools API with offline fallback.
 * Returns a Promise that resolves to array of strings (top 3-5 suggestions).
 */
export async function fetchHindiSuggestions(word) {
  if (!word || typeof word !== 'string') return [];
  const clean = word.trim();
  if (!clean) return [];

  const lower = clean.toLowerCase();

  // 1. Check in-memory cache
  if (transliterationCache.has(lower)) {
    return transliterationCache.get(lower);
  }

  // 2. Check offline dictionary
  if (OFFLINE_DICTIONARY[lower]) {
    const dictSuggestions = OFFLINE_DICTIONARY[lower];
    transliterationCache.set(lower, dictSuggestions);
    return dictSuggestions;
  }

  // 3. Fallback baseline from offline algorithm
  const offlineFallback = transliterateWordOffline(clean);
  const fallbackList = [offlineFallback];

  // 4. Try fetching from Google Input Tools API (cached in localStorage & memory)
  try {
    const storageKey = `hi_translit_${lower}`;
    const stored = typeof window !== 'undefined' ? window.localStorage?.getItem(storageKey) : null;
    if (stored) {
      const parsed = JSON.parse(stored);
      transliterationCache.set(lower, parsed);
      return parsed;
    }

    // Request Google Input Tools
    const url = `https://inputtools.google.com/request?text=${encodeURIComponent(
      clean
    )}&itc=hi-t-i0-und&num=5`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1800); // 1.8s timeout

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data[0] === 'SUCCESS' && data[1] && data[1][0] && Array.isArray(data[1][0][1])) {
        const results = data[1][0][1];
        if (results.length > 0) {
          transliterationCache.set(lower, results);
          try {
            window.localStorage?.setItem(storageKey, JSON.stringify(results));
          } catch (_) {}
          return results;
        }
      }
    }
  } catch (err) {
    // Offline or network error - gracefully fall back
  }

  // Fallback to offline rule-based result
  transliterationCache.set(lower, fallbackList);
  return fallbackList;
}

/**
 * Synchronously get best current transliteration (from cache, dictionary, or offline engine).
 */
export function getQuickTransliteration(word) {
  if (!word) return '';
  const lower = word.trim().toLowerCase();
  if (transliterationCache.has(lower)) {
    return transliterationCache.get(lower)[0];
  }
  if (OFFLINE_DICTIONARY[lower]) {
    return OFFLINE_DICTIONARY[lower][0];
  }
  return transliterateWordOffline(word);
}
