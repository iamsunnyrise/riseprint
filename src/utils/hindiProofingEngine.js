/**
 * ✍️ Hindi Matra & Spell Proofing Engine (हिंदी वर्तनी व व्याकरण रक्षक)
 * 
 * Specifically calibrated for Indian Printing Presses, DTP Operators,
 * Screen Printers, and Cyber Cafes to eliminate costly reprinting mistakes.
 */

// 1. Database of 100+ Common Printing & DTP Errors
export const DTP_SPELL_RULES = [
  // --- Class 1: Critical Auspicious Wedding & Invitation Errors ---
  {
    wrong: 'आशिर्वाद',
    correct: 'आशीर्वाद',
    category: 'मात्रा दोष',
    reason: "रेफ (र्) का उच्चारण 'शी' के बाद होता है, इसलिए यह 'व' के ऊपर (आशीर्वाद) लगता है।"
  },
  {
    wrong: 'ग्रह प्रवेश',
    correct: 'गृह प्रवेश',
    category: 'अर्थ-भेद (गंभीर)',
    reason: "'ग्रह' का अर्थ आकाशीय पिंड (मंगल/शनि) है, जबकि मकान/घर के लिए 'गृह' शुद्ध है।"
  },
  {
    wrong: 'श्रीमति',
    correct: 'श्रीमती',
    category: 'मात्रा दोष',
    reason: "महिलाओं के आदरसूचक संबोधन में दीर्घ 'ती' (श्रीमती) शुद्ध व्याकरण है।"
  },
  {
    wrong: 'उपलक्ष',
    correct: 'उपलक्ष्य',
    category: 'वर्ण लोप',
    reason: "किसी अवसर के निमित्त 'उपलक्ष्य' (आधा क्ष + य) शुद्ध शब्द है।"
  },
  {
    wrong: 'उपलक्छ',
    correct: 'उपलक्ष्य',
    category: 'वर्ण लोप',
    reason: "'उपलक्छ' अशुद्ध है, शुद्ध शब्द 'उपलक्ष्य' है।"
  },
  {
    wrong: 'श्रद्धांजली',
    correct: 'श्रद्धांजलि',
    category: 'मात्रा दोष',
    reason: "'अंजलि' शब्द के योग से बना है, अतः अंत में ह्रस्व 'लि' (श्रद्धांजलि) शुद्ध है।"
  },
  {
    wrong: 'पुज्य',
    correct: 'पूज्य',
    category: 'मात्रा दोष',
    reason: "आदरणीय जनों हेतु दीर्घ 'पू' (पूज्य / पूजनीय) शुद्ध शब्द है।"
  },
  {
    wrong: 'पुजन',
    correct: 'पूजन',
    category: 'मात्रा दोष',
    reason: "देव अर्चना हेतु दीर्घ 'पू' (पूजन) शुद्ध शब्द है।"
  },
  {
    wrong: 'कनिष्ट',
    correct: 'कनिष्ठ',
    category: 'वर्ण भ्रम',
    reason: "छोटे भाई या सुपुत्र हेतु अंत में 'ठ' (कनिष्ठ) होता है, 'ट' नहीं।"
  },
  {
    wrong: 'जेष्ठ',
    correct: 'ज्येष्ठ',
    category: 'वर्ण लोप',
    reason: "बड़े भ्राता या सुपुत्र हेतु आधा 'ज' एवं 'ठ' (ज्येष्ठ) शुद्ध है।"
  },
  {
    wrong: 'उज्वल',
    correct: 'उज्ज्वल',
    category: 'व्यंजन द्वित्व',
    reason: "उद् + ज्वल के योग से दो बार आधा 'ज' (उज्ज्वल) बनता है।"
  },
  {
    wrong: 'दर्शनाभिलाशि',
    correct: 'दर्शनाभिलाषी',
    category: 'मात्रा व वर्ण',
    reason: "दर्शन की अभिलाषा रखने वाले हेतु मूर्धन्य 'षी' (दर्शनाभिलाषी) शुद्ध है।"
  },
  {
    wrong: 'दर्शनाभिलाशी',
    correct: 'दर्शनाभिलाषी',
    category: 'वर्ण भ्रम',
    reason: "अंत में मूर्धन्य 'ष' की मात्रा 'षी' (दर्शनाभिलाषी) शुद्ध है।"
  },
  {
    wrong: 'स्वागताकांक्षी',
    correct: 'स्वागतोत्सुक',
    category: 'शब्द चयन',
    reason: "स्वागत के लिए उत्सुक हेतु पारंपरिक व शुद्ध शब्द 'स्वागतोत्सुक' है।"
  },
  {
    wrong: 'आमंत्रन',
    correct: 'आमंत्रण',
    category: 'ण/न भेद',
    reason: "संस्कृत तत्सम शब्दों में 'ण' (आमंत्रण) शुद्ध मानक है।"
  },
  {
    wrong: 'निमंत्रन',
    correct: 'निमंत्रण',
    category: 'ण/न भेद',
    reason: "कार्ड हेतु 'निमंत्रण' (ण के साथ) शुद्ध रूप है।"
  },
  {
    wrong: 'प्रार्थि',
    correct: 'प्रार्थी',
    category: 'मात्रा दोष',
    reason: "प्रार्थना करने वाले हेतु दीर्घ 'र्थी' (प्रार्थी) शुद्ध है।"
  },
  {
    wrong: 'सहनाई',
    correct: 'शहनाई',
    category: 'वर्ण भेद',
    reason: "मंगल वाद्य यंत्र हेतु तालव्य 'श' (शहनाई) शुद्ध है।"
  },
  {
    wrong: 'तिथी',
    correct: 'तिथि',
    category: 'मात्रा दोष',
    reason: "पंचांग तिथि में दोनों मात्राएं छोटी (ह्रस्व 'ति' और 'थि') होती हैं।"
  },
  {
    wrong: 'दिपावली',
    correct: 'दीपावली',
    category: 'मात्रा दोष',
    reason: "दीपों की पंक्ति होने के कारण दीर्घ 'दी' (दीपावली) शुद्ध है।"
  },
  {
    wrong: 'सप्ताहिक',
    correct: 'साप्ताहिक',
    category: 'प्रत्यय वृद्धि',
    reason: "'इक' प्रत्यय लगने से प्रथम स्वर दीर्घ होकर 'साप्ताहिक' बनता है।"
  },
  {
    wrong: 'सानिध्य',
    correct: 'सांनिध्य',
    category: 'अनुस्वार लोप',
    reason: "समीप रहने के भाव में 'सांनिध्य' (अनुस्वार सहित) शुद्ध है।"
  },
  {
    wrong: 'कवित्री',
    correct: 'कवयित्री',
    category: 'व्याकरण दोष',
    reason: "कवि का स्त्रीलिंग रूप 'कवयित्री' शुद्ध होता है।"
  },
  {
    wrong: 'प्रीतिभोज',
    correct: 'प्रीतिभोज',
    category: 'मात्रा',
    reason: "स्नेह भोज हेतु 'प्रीतिभोज' शुद्ध है।"
  },
  {
    wrong: 'प्रितिभोज',
    correct: 'प्रीतिभोज',
    category: 'मात्रा दोष',
    reason: "प्रेम/प्रीति हेतु दीर्घ 'प्री' (प्रीतिभोज) शुद्ध है।"
  },
  {
    wrong: 'पाणीग्रहण',
    correct: 'पाणिग्रहण',
    category: 'मात्रा दोष',
    reason: "हाथ पकड़ने के संस्कार हेतु ह्रस्व 'णि' (पाणिग्रहण) शुद्ध है।"
  },
  {
    wrong: 'वैवाहीक',
    correct: 'वैवाहिक',
    category: 'मात्रा दोष',
    reason: "विवाह से संबंधित हेतु ह्रस्व 'हि' (वैवाहिक) शुद्ध है।"
  },
  {
    wrong: 'परिनय',
    correct: 'परिणय',
    category: 'ण/न भेद',
    reason: "विवाह बंधन हेतु 'ण' (परिणय) शुद्ध है।"
  },
  {
    wrong: 'मुहुर्त',
    correct: 'मुहूर्त',
    category: 'मात्रा दोष',
    reason: "शुभ मुहूर्त में 'हु' दीर्घ (मुहूर्त) होता है।"
  },
  {
    wrong: 'मुहुरत',
    correct: 'मुहूर्त',
    category: 'तद्भव लोप',
    reason: "कार्ड छपाई में मानक तत्सम शब्द 'मुहूर्त' लिखा जाता है।"
  },
  {
    wrong: 'वधु',
    correct: 'वधू',
    category: 'मात्रा दोष',
    reason: "दुल्हन हेतु दीर्घ 'धू' (वधू) शुद्ध शब्द है।"
  },
  {
    wrong: 'बिवाह',
    correct: 'विवाह',
    category: 'व/ब भेद',
    reason: "कार्ड छपाई में शुद्ध मानक 'विवाह' (व से) लिखा जाता है।"
  },
  {
    wrong: 'अछत',
    correct: 'अक्षत',
    category: 'वर्ण भेद',
    reason: "मांगलिक अक्षत हेतु संयुक्त वर्ण 'क्ष' (अक्षत) शुद्ध है।"
  },
  {
    wrong: 'मन्डप',
    correct: 'मंडप',
    category: 'मानक वर्तनी',
    reason: "मानक हिंदी वर्तनी में पंचमाक्षर के स्थान पर अनुस्वार 'मंडप' मान्य है।"
  },
  {
    wrong: 'कुलदेवि',
    correct: 'कुलदेवी',
    category: 'मात्रा दोष',
    reason: "भगवती हेतु दीर्घ 'वी' (कुलदेवी) शुद्ध रूप है।"
  },
  {
    wrong: 'गणेसाय',
    correct: 'गणेशाय',
    category: 'वर्ण भेद',
    reason: "श्री गणेश में तालव्य 'श' (श्री गणेशाय नमः) शुद्ध है।"
  },
  {
    wrong: 'स्वस्तिक',
    correct: 'स्वास्तिक',
    category: 'प्रचलित रूप',
    reason: "कार्ड छपाई में दीर्घ 'स्वास्तिक' बहुप्रचलित व शुद्ध माना जाता है।"
  },
  {
    wrong: 'सान्ति',
    correct: 'शांति',
    category: 'वर्ण भेद',
    reason: "तालव्य 'श' के साथ 'शांति' शुद्ध शब्द है।"
  },
  {
    wrong: 'स्नेहिजन',
    correct: 'स्नेहीजन',
    category: 'मात्रा दोष',
    reason: "स्नेह रखने वाले हेतु दीर्घ 'ही' (स्नेहीजन) शुद्ध है।"
  },
  {
    wrong: 'आकांक्षि',
    correct: 'आकांक्षी',
    category: 'मात्रा दोष',
    reason: "शुभ की कामना करने वाले हेतु दीर्घ 'क्षी' (आकांक्षी) शुद्ध है।"
  },

  // --- Class 2: Shok Sandesh & Memorial Terms ---
  {
    wrong: 'तेरहवी',
    correct: 'तेरहवीं',
    category: 'मात्रा व चंद्रबिंदु',
    reason: "श्राद्ध संस्कार हेतु दीर्घ 'वीं' (तेरहवीं) शुद्ध है।"
  },
  {
    wrong: 'उठावनि',
    correct: 'उठावनी',
    category: 'मात्रा दोष',
    reason: "शोक सभा की रस्म हेतु दीर्घ 'नी' (उठावनी) शुद्ध है।"
  },
  {
    wrong: 'ब्रम्हभोज',
    correct: 'ब्रह्मभोज',
    category: 'वर्ण क्रम',
    reason: "'ह' के नीचे 'म' जुड़कर 'ब्रह्म' बनता है, 'ब्रम्ह' अशुद्ध है।"
  },
  {
    wrong: 'बैकुंठ',
    correct: 'वैकुंठ',
    category: 'व/ब भेद',
    reason: "मोक्ष धाम हेतु 'व' (वैकुंठवासी) मानक व शुद्ध है।"
  },
  {
    wrong: 'शोककुल',
    correct: 'शोकाकुल',
    category: 'संधि दोष',
    reason: "शोक + आकुल की दीर्घ संधि से 'शोकाकुल' बनता है।"
  },
  {
    wrong: 'सोकाकुल',
    correct: 'शोकाकुल',
    category: 'वर्ण भेद',
    reason: "शोक हेतु तालव्य 'श' (शोकाकुल) शुद्ध है।"
  },
  {
    wrong: 'पुण्यात्मा',
    correct: 'पुण्यात्मा',
    category: 'मानक',
    reason: "पुण्य आत्मा हेतु 'पुण्यात्मा' शुद्ध है।"
  },
  {
    wrong: 'पुन्य',
    correct: 'पुण्य',
    category: 'ण/न भेद',
    reason: "'पुण्य' में 'ण' शुद्ध रूप है।"
  },

  // --- Class 3: Bill Book & Commercial Shop Terms ---
  {
    wrong: 'प्रतिष्टान',
    correct: 'प्रतिष्ठान',
    category: 'वर्ण भ्रम',
    reason: "दुकान/फर्म हेतु 'ष्ठ' (प्रतिष्ठान) शुद्ध शब्द है।"
  },
  {
    wrong: 'प्रोपराईटर',
    correct: 'प्रोपराइटर',
    category: 'मात्रा दोष',
    reason: "मालिक हेतु मानक हिंदी में 'प्रोपराइटर' लिखा जाता है।"
  },
  {
    wrong: 'बिक्रेता',
    correct: 'विक्रेता',
    category: 'व/ब भेद',
    reason: "व्यापारिक विक्रेता में 'वि' (विक्रेता) शुद्ध है।"
  },
  {
    wrong: 'हस्ताछर',
    correct: 'हस्ताक्षर',
    category: 'वर्ण भेद',
    reason: "दस्तखत हेतु संयुक्त वर्ण 'क्ष' (हस्ताक्षर) शुद्ध है।"
  },
  {
    wrong: 'न्यायलय',
    correct: 'न्यायालय',
    category: 'मात्रा दोष',
    reason: "न्याय + आलय मिलकर 'न्यायालय' बनता है।"
  },
  {
    wrong: 'छेत्राधिकार',
    correct: 'क्षेत्राधिकार',
    category: 'वर्ण भेद',
    reason: "कानूनी अधिकार हेतु 'क्ष' (क्षेत्राधिकार) शुद्ध है।"
  },
  {
    wrong: 'गारन्टी',
    correct: 'गारंटी',
    category: 'मानक वर्तनी',
    reason: "मानक हिंदी में अनुस्वार 'गारंटी' शुद्ध है।"
  },
  {
    wrong: 'वारन्टी',
    correct: 'वारंटी',
    category: 'मानक वर्तनी',
    reason: "मानक हिंदी में अनुस्वार 'वारंटी' शुद्ध है।"
  },

  // --- Class 4: Sanskars & Sacred Rites ---
  {
    wrong: 'मुण्डन',
    correct: 'मुंडन',
    category: 'मानक वर्तनी',
    reason: "मानक हिंदी में अनुस्वार 'मुंडन' शुद्ध है।"
  },
  {
    wrong: 'यज्ञोपवित',
    correct: 'यज्ञोपवीत',
    category: 'मात्रा दोष',
    reason: "जनेऊ संस्कार हेतु दीर्घ 'वी' (यज्ञोपवीत) शुद्ध है।"
  },
  {
    wrong: 'कुआ पूजन',
    correct: 'कुआं पूजन',
    category: 'चंद्रबिंदु',
    reason: "जलवा पूजन हेतु 'कुआं पूजन' चंद्रबिंदु सहित शुद्ध है।"
  },
  {
    wrong: 'जन्मोत्सव',
    correct: 'जन्मोत्सव',
    category: 'मानक',
    reason: "जन्म + उत्सव = जन्मोत्सव।"
  }
];

/**
 * 2. Get Custom User Dictionary from LocalStorage
 */
export function getCustomDictionary() {
  try {
    const saved = localStorage.getItem('rise_print_custom_dictionary');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to read custom dictionary', e);
  }
  return [];
}

/**
 * Add a word to Custom Dictionary
 */
export function addToCustomDictionary(word) {
  if (!word || typeof word !== 'string') return;
  const trimmed = word.trim();
  const dict = getCustomDictionary();
  if (!dict.includes(trimmed)) {
    dict.push(trimmed);
    try {
      localStorage.setItem('rise_print_custom_dictionary', JSON.stringify(dict));
    } catch (e) {
      console.error('Failed to save word to custom dictionary', e);
    }
  }
}

/**
 * Remove word from Custom Dictionary
 */
export function removeFromCustomDictionary(word) {
  const dict = getCustomDictionary().filter(w => w !== word);
  try {
    localStorage.setItem('rise_print_custom_dictionary', JSON.stringify(dict));
  } catch (e) {
    console.error(e);
  }
}

/**
 * 3. Deep Scanner: Scans all string and text array fields in cardData
 * Returns an array of detected errors.
 */
export function scanCardText(cardData) {
  if (!cardData) return [];

  const customDict = getCustomDictionary();
  const detectedErrors = [];

  // Helper to scan a single text string
  const checkString = (text, fieldName, fieldLabel, path = null) => {
    if (!text || typeof text !== 'string') return;

    DTP_SPELL_RULES.forEach((rule, ruleIdx) => {
      // If word is in user's custom dictionary, skip
      if (customDict.includes(rule.wrong)) return;

      // Check if text contains wrong word as a substring / word boundary
      // We check literal inclusion
      if (text.includes(rule.wrong)) {
        // Find sentence context around the error
        const startIndex = text.indexOf(rule.wrong);
        const excerptStart = Math.max(0, startIndex - 25);
        const excerptEnd = Math.min(text.length, startIndex + rule.wrong.length + 25);
        const contextSentence = (excerptStart > 0 ? '...' : '') +
          text.substring(excerptStart, excerptEnd) +
          (excerptEnd < text.length ? '...' : '');

        detectedErrors.push({
          id: `err_${fieldName}_${ruleIdx}_${Date.now()}_${Math.random()}`,
          fieldName,
          fieldLabel,
          path,
          wrongWord: rule.wrong,
          correctWord: rule.correct,
          category: rule.category,
          reason: rule.reason,
          contextSentence,
          fullText: text
        });
      }
    });
  };

  // Scan Top & Shloka Section
  checkString(cardData.topInvocation, 'topInvocation', 'शीर्ष मंगलाचरण');
  checkString(cardData.shlokaLeft, 'shlokaLeft', 'बायां श्लोक');
  checkString(cardData.shlokaRight, 'shlokaRight', 'दायां श्लोक');
  checkString(cardData.middleShlokaLine1, 'middleShlokaLine1', 'मध्य श्लोक पंक्ति 1');
  checkString(cardData.middleShlokaLine2, 'middleShlokaLine2', 'मध्य श्लोक पंक्ति 2');

  // Scan Shayari
  checkString(cardData.shayariLeft1, 'shayariLeft1', 'शायरी बायां 1');
  checkString(cardData.shayariLeft2, 'shayariLeft2', 'शायरी बायां 2');
  checkString(cardData.shayariRight1, 'shayariRight1', 'शायरी दायां 1');
  checkString(cardData.shayariRight2, 'shayariRight2', 'शायरी दायां 2');

  // Scan Invitation Main Body
  checkString(cardData.salutation, 'salutation', 'संबोधन (मान्यवर)');
  checkString(cardData.graceText, 'graceText', 'अनुग्रह वाक्य');
  checkString(cardData.groomName, 'groomName', 'वर का नाम');
  checkString(cardData.groomRelation, 'groomRelation', 'वर संबंध');
  checkString(cardData.groomFather, 'groomFather', 'वर पिता का नाम');
  checkString(cardData.groomVillage, 'groomVillage', 'वर ग्राम व पता');
  checkString(cardData.groomThana, 'groomThana', 'वर थाना व जिला');
  checkString(cardData.brideName, 'brideName', 'वधू का नाम');
  checkString(cardData.brideRelation, 'brideRelation', 'वधू संबंध');
  checkString(cardData.brideFather, 'brideFather', 'वधू पिता का नाम');
  checkString(cardData.brideVillage, 'brideVillage', 'वधू ग्राम व पता');
  checkString(cardData.brideThana, 'brideThana', 'वधू थाना व जिला');

  // Scan Starburst Badge
  checkString(cardData.starburstLine1, 'starburstLine1', 'परिणय बैज पंक्ति 1');
  checkString(cardData.starburstLine2, 'starburstLine2', 'परिणय बैज पंक्ति 2');
  checkString(cardData.starburstLine3, 'starburstLine3', 'परिणय बैज पंक्ति 3');

  // Scan Events List
  if (Array.isArray(cardData.events)) {
    cardData.events.forEach((evt, idx) => {
      checkString(evt.event, 'events', `कार्यक्रम #${idx + 1} विवरण`, { type: 'events', index: idx, key: 'event' });
      checkString(evt.tithi, 'events', `कार्यक्रम #${idx + 1} तिथि`, { type: 'events', index: idx, key: 'tithi' });
    });
  }
  checkString(cardData.noteText, 'noteText', 'कार्यक्रम नोट');

  // Scan Footer
  checkString(cardData.darshanabhilashiNames, 'darshanabhilashiNames', 'दर्शनाभिलाषी नाम');
  checkString(cardData.swagatotsukNames, 'swagatotsukNames', 'स्वागतोत्सुक नाम');
  checkString(cardData.aakankshiNames, 'aakankshiNames', 'आकांक्षी / विनीत');
  checkString(cardData.baalManuharQuote, 'baalManuharQuote', 'बाल मनुहार');
  checkString(cardData.venueName, 'venueName', 'विवाह स्थल');
  checkString(cardData.venueAddress, 'venueAddress', 'विवाह स्थल पता');
  checkString(cardData.pressLine, 'pressLine', 'प्रिंटिंग प्रेस लाइन');

  // Scan Shok Sandesh
  if (cardData.productType === 'shok-sandesh') {
    checkString(cardData.shokInvocation, 'shokInvocation', 'शोक मंगलाचरण');
    checkString(cardData.shokSubHeading, 'shokSubHeading', 'शोक सूचना वाक्य');
    checkString(cardData.shokPersonName, 'shokPersonName', 'दिवंगत का नाम');
    checkString(cardData.shokDescription, 'shokDescription', 'शोक विवरण संदेश');
    checkString(cardData.shokFamilyGrieving, 'shokFamilyGrieving', 'शोकाकुल परिवार');
    checkString(cardData.shokFamilyVineet, 'shokFamilyVineet', 'विनीत');
    checkString(cardData.shokEstablishment, 'shokEstablishment', 'प्रतिष्ठान');

    if (Array.isArray(cardData.shokEvents)) {
      cardData.shokEvents.forEach((evt, idx) => {
        checkString(evt.name, 'shokEvents', `शोक कार्यक्रम #${idx + 1}`, { type: 'shokEvents', index: idx, key: 'name' });
      });
    }
  }

  // Scan Sanskar
  if (cardData.productType === 'sanskar') {
    checkString(cardData.sanskarHeading, 'sanskarHeading', 'संस्कार मुख्य शीर्षक');
    checkString(cardData.sanskarInvocation, 'sanskarInvocation', 'संस्कार आह्वान');
    checkString(cardData.sanskarMantra, 'sanskarMantra', 'संस्कार पावन मंत्र');
    checkString(cardData.sanskarGraceText, 'sanskarGraceText', 'संस्कार निमंत्रण वाक्य');
    checkString(cardData.sanskarChildName, 'sanskarChildName', 'बालक/गृहस्वामी नाम');
    checkString(cardData.sanskarParents, 'sanskarParents', 'माता-पिता');
    checkString(cardData.sanskarGrandParents, 'sanskarGrandParents', 'दादा-दादी');
    checkString(cardData.sanskarVenue, 'sanskarVenue', 'संस्कार कार्यक्रम स्थल');
    checkString(cardData.sanskarDarshanabhilashi, 'sanskarDarshanabhilashi', 'दर्शनाभिलाषी');
    checkString(cardData.sanskarSwagat, 'sanskarSwagat', 'स्वागतोत्सुक');
    checkString(cardData.sanskarAakankshi, 'sanskarAakankshi', 'विनीत');

    if (Array.isArray(cardData.sanskarEvents)) {
      cardData.sanskarEvents.forEach((evt, idx) => {
        checkString(evt.event, 'sanskarEvents', `संस्कार रस्म #${idx + 1}`, { type: 'sanskarEvents', index: idx, key: 'event' });
      });
    }
  }

  // Scan Bill Book
  if (cardData.productType === 'bill-book') {
    checkString(cardData.billFirmName, 'billFirmName', 'बिल बुक फर्म नाम');
    checkString(cardData.billTagline, 'billTagline', 'फर्म व्यवसाय टैगलाइन');
    checkString(cardData.billProprietor, 'billProprietor', 'प्रोपराइटर');
    checkString(cardData.billAddress, 'billAddress', 'दुकान पता');
    checkString(cardData.billTerms, 'billTerms', 'बिल बुक नियम व शर्तें');
    checkString(cardData.billSignTitle, 'billSignTitle', 'हस्ताक्षर टाइटल');
  }

  // Scan Visiting Card
  if (cardData.productType === 'visiting-card') {
    checkString(cardData.bizCardShopName, 'bizCardShopName', 'विज़िटिंग कार्ड दुकान नाम');
    checkString(cardData.bizCardTagline, 'bizCardTagline', 'स्लोगन / टैगलाइन');
    checkString(cardData.bizCardOwnerName, 'bizCardOwnerName', 'संचालक नाम');
    checkString(cardData.bizCardDesignation, 'bizCardDesignation', 'पद');
    checkString(cardData.bizCardAddress, 'bizCardAddress', 'पता');
    checkString(cardData.bizCardServices, 'bizCardServices', 'मुख्य सेवाएँ');
  }

  return detectedErrors;
}

/**
 * 4. Apply a Single Correction to cardData
 */
export function applySingleCorrection(cardData, errorItem) {
  if (!cardData || !errorItem) return cardData;

  const { fieldName, path, wrongWord, correctWord } = errorItem;

  // If error is inside an array object (like events or shokEvents)
  if (path && path.type && typeof path.index === 'number' && path.key) {
    const list = [...(cardData[path.type] || [])];
    if (list[path.index]) {
      const currentVal = list[path.index][path.key] || '';
      const newVal = currentVal.replaceAll(wrongWord, correctWord);
      list[path.index] = {
        ...list[path.index],
        [path.key]: newVal
      };
      return {
        ...cardData,
        [path.type]: list
      };
    }
  }

  // Normal top-level string field
  const currentVal = cardData[fieldName];
  if (typeof currentVal === 'string') {
    const newVal = currentVal.replaceAll(wrongWord, correctWord);
    return {
      ...cardData,
      [fieldName]: newVal
    };
  }

  return cardData;
}

/**
 * 5. Apply All Corrections across cardData
 */
export function applyAllCorrections(cardData, errorsList) {
  if (!cardData || !Array.isArray(errorsList)) return cardData;

  let updated = { ...cardData };
  errorsList.forEach((err) => {
    updated = applySingleCorrection(updated, err);
  });
  return updated;
}
