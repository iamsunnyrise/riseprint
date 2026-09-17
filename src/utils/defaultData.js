import { DEITY_PRESETS, DEMO_COUPLE_PHOTO } from './deityAndPhotoPresets';
export { DEITY_PRESETS, DEMO_COUPLE_PHOTO };

export const CARD_SIZES = {
  '7x9': {
    name: '7" × 9" (पारम्परिक शादी कार्ड - Exact Photo Match)',
    widthInches: 7,
    heightInches: 9,
    widthMm: 178,
    heightMm: 228,
    aspectRatio: '7/9',
    description: 'भारतीय प्रिंटिंग प्रेस का सबसे लोकप्रिय शादी कार्ड साइज'
  },
  '5x7': {
    name: '5" × 7" (कम्पैक्ट / इनविटेशन कार्ड)',
    widthInches: 5,
    heightInches: 7,
    widthMm: 127,
    heightMm: 178,
    aspectRatio: '5/7',
    description: 'मॉडर्न कॉम्पैक्ट साइज़'
  },
  '8x10': {
    name: '8" × 10" (रॉयल / बड़ा साइज)',
    widthInches: 8,
    heightInches: 10,
    widthMm: 203,
    heightMm: 254,
    aspectRatio: '8/10',
    description: 'प्रीमियम एवं विस्तृत कार्ड साइज़'
  },
  '4x9': {
    name: '4" × 9" (लिफाफा / स्लिम फॉर्मेट)',
    widthInches: 4,
    heightInches: 9,
    widthMm: 102,
    heightMm: 228,
    aspectRatio: '4/9',
    description: 'पारम्परिक लम्बा लिफाफा कार्ड'
  },
  'a4': {
    name: 'A4 (210 × 297 mm)',
    widthInches: 8.27,
    heightInches: 11.69,
    widthMm: 210,
    heightMm: 297,
    aspectRatio: '210/297',
    description: 'स्टैंडर्ड प्रिंट शीट / फोल्डर'
  },
  'bi-fold-book': {
    name: '12" × 8.5" (2-पल्ला बुक स्टाइल - Bi-Fold)',
    widthInches: 12,
    heightInches: 8.5,
    widthMm: 305,
    heightMm: 216,
    aspectRatio: '12/8.5',
    foldType: 'bi-fold',
    panels: 2,
    description: 'भारतीय थोक कार्ड का लोकप्रिय 2-पल्ला खुला बुक फॉर्मेट'
  },
  'tri-fold-classic': {
    name: '15" × 8.5" (3-पल्ला गेटफोल्ड - चावड़ी बाजार)',
    widthInches: 15,
    heightInches: 8.5,
    widthMm: 381,
    heightMm: 216,
    aspectRatio: '15/8.5',
    foldType: 'tri-fold',
    panels: 3,
    description: '3-पल्ले वाला क्लासिक गेटफोल्ड थोक कार्ड'
  },
  'tri-fold-jumbo': {
    name: '18" × 9" (3-पल्ला रॉयल जंबो बॉक्स इनर)',
    widthInches: 18,
    heightInches: 9,
    widthMm: 457,
    heightMm: 228,
    aspectRatio: '18/9',
    foldType: 'tri-fold',
    panels: 3,
    description: 'प्रीमियम बड़े बॉक्स कार्ड का 3-पल्ला इनर शीट'
  },
  'pocket-slim': {
    name: '4.5" × 8.5" (स्लिम पॉकेट / डोरी वाला इनर)',
    widthInches: 4.5,
    heightInches: 8.5,
    widthMm: 114,
    heightMm: 216,
    aspectRatio: '4.5/8.5',
    foldType: 'single',
    panels: 1,
    description: 'पॉकेट या डोरी वाले कार्ड का इनर पेपर'
  },
  'custom': {
    name: '📐 कस्टम पटरी नाप (Custom Calibration)',
    widthInches: 7,
    heightInches: 9,
    widthMm: 178,
    heightMm: 228,
    aspectRatio: '7/9',
    foldType: 'single',
    panels: 1,
    description: 'दुकानदार द्वारा स्केल से नापी गई सटीक इनर शीट'
  }
};

export const ENVELOPE_SIZES = {
  'standard': {
    id: 'standard',
    name: '9.5" × 7.5" (मानक लिफाफा - 7"×9" कार्ड हेतु)',
    widthInches: 9.5,
    heightInches: 7.5,
    widthMm: 241,
    heightMm: 190,
    aspectRatio: '9.5/7.5',
    description: '7" × 9" मुख्य शादी कार्ड का सटीक मैचिंग कवर लिफाफा'
  },
  'slim': {
    id: 'slim',
    name: '9.5" × 4.5" (स्लिम लिफाफा - 4"×9" कार्ड हेतु)',
    widthInches: 9.5,
    heightInches: 4.5,
    widthMm: 241,
    heightMm: 114,
    aspectRatio: '9.5/4.5',
    description: 'पारंपरिक लम्बा लिफाफा'
  },
  'compact': {
    id: 'compact',
    name: '7.5" × 5.5" (कॉम्पैक्ट लिफाफा - 5"×7" कार्ड हेतु)',
    widthInches: 7.5,
    heightInches: 5.5,
    widthMm: 190,
    heightMm: 140,
    aspectRatio: '7.5/5.5',
    description: 'छोटे व डिजिटल इनविटेशन कार्ड्स हेतु'
  }
};

export const COLOR_THEMES = [
  {
    id: 'traditional-red',
    name: 'पारम्परिक सिन्दूरी लाल (Exact Reference)',
    inkColor: '#a61515',
    paperColor: '#fffef9',
    borderColor: '#a61515',
    goldAccent: '#d4af37'
  },
  {
    id: 'royal-maroon',
    name: 'रॉयल मैरून & आइवरी',
    inkColor: '#7a0c18',
    paperColor: '#fcf8ee',
    borderColor: '#7a0c18',
    goldAccent: '#c59b27'
  },
  {
    id: 'deep-crimson',
    name: 'डार्क क्रिमसन प्रेस इंक',
    inkColor: '#8a1111',
    paperColor: '#faf6eb',
    borderColor: '#8a1111',
    goldAccent: '#b8860b'
  },
  {
    id: 'golden-glory',
    name: 'गोल्डन & रेड डुअल टोन',
    inkColor: '#961212',
    paperColor: '#fffbf0',
    borderColor: '#c69214',
    goldAccent: '#d4af37'
  }
];

export const SHLOKA_PRESETS = [
  {
    title: 'मंगलम् भगवान विष्णुः',
    left: 'मंगलम् भगवान विष्णुः मंगलम् पुण्डरीकाक्षः',
    right: 'मंगलम् गरुड़ध्वजः। मंगलाय तनोहरिः॥'
  },
  {
    title: 'वक्रतुण्ड महाकाय',
    left: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।',
    right: 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥'
  },
  {
    title: 'सर्वमंगल मांगल्ये',
    left: 'सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके।',
    right: 'शरण्ये त्र्यम्बके गौरी नारायणि नमोऽस्तुते॥'
  },
  {
    title: 'कन्यां वरयते रूपं',
    left: 'कन्यां वरयते रूपं माता वित्तं पिता श्रुतम्।',
    right: 'बान्धवाः कुलमिच्छन्ति मिष्टान्नमितरे जनाः॥'
  }
];

export const MIDDLE_SHLOKA_PRESETS = [
  {
    title: 'सर्व मंगल मांगल्ये (पारंपरिक/अनुशंसित)',
    line1: 'सर्व मंगल मांगल्ये, शिवे सर्वार्थ साधिके ।',
    line2: 'शरण्ये त्र्यम्बके गौरी, नारायणी नमोस्तुते ॥'
  },
  {
    title: 'वक्रतुण्ड महाकाय (श्री गणेश वंदना)',
    line1: 'वक्रतुण्ड महाकाय, सूर्यकोटि समप्रभ ।',
    line2: 'निर्विघ्नं कुरु मे देव, सर्वकार्येषु सर्वदा ॥'
  },
  {
    title: 'मंगलम् भगवान विष्णुः (विष्णु मंगल श्लोक)',
    line1: 'मंगलम् भगवान विष्णुः, मंगलम् गरुड़ध्वजः ।',
    line2: 'मंगलम् पुण्डरीकाक्षः, मंगलाय तनो हरिः ॥'
  },
  {
    title: 'विघ्नेश्वराय वरदाय (विघ्नहर्ता गणेश)',
    line1: 'विघ्नेश्वराय वरदाय, सुरप्रियाय लम्बोदराय ।',
    line2: 'सकलार्थ फलप्रदाय, विघ्नेश नमोस्तुते ॥'
  }
];

export const SHAYARI_PRESETS = [
  {
    title: 'सिन्दूर दान & दो फूल खिले (Reference Photo)',
    left1: 'सिन्दूर दान की मधुर बेला में, झिलमिल हो यह मांग की रेखा।',
    left2: 'परिणय सूत्र में बंधे सुहाग, अमर रहे यह विधि की लेखा॥',
    right1: 'दो फूल खिले दो सुमन मिले, दो सपना ने श्रृंगार किया।',
    right2: 'दो दूर देश के पथिको ने संग-संग चलना स्वीकार किया॥'
  },
  {
    title: 'हल्दी की महक & शहनाई की धुन',
    left1: 'हल्दी की महक, मेंहदी का रंग, संग सात फेरों का बंधन।',
    left2: 'आशीर्वाद देने पधारें आप, हर्षित होगा हमारा मन॥',
    right1: 'शहनाईयों की गूंज से महक रहा सारा संसार।',
    right2: 'शुभ विवाह में पधारकर दें नव दंपत्ति को प्यार॥'
  },
  {
    title: 'बेटी की विदाई (वधू पक्ष विशेष)',
    left1: 'बाबुल का आँगन छोड़ पिया के देश चली, खुशियों की बगिया महकाने बेटी चली।',
    left2: 'दुआओं के साथ विदा होती है लाडली, सदा सुहागिन रहे यह कामना हमारी॥',
    right1: 'मंगल बेला में पधारें आप देकर आशीर्वचन।',
    right2: 'धन्य होगा हमारा यह पावन गृह-प्रांगण॥'
  }
];

export const BAAL_MANUHAR_PRESETS = [
  {
    id: 'bm-1',
    title: 'स्नेह निमंत्रण & राजहंस (सर्वप्रिय क्लासिक)',
    quote: 'भेज रहे हैं स्नेह निमंत्रण प्यारे तुम्हें बुलाने को।\nहे मानस के राजहंस तुम भूल न जाना आने को॥',
    kids: 'कान्हा, लड्डू, परी, आरव एवं समस्त बाल गोपाल'
  },
  {
    id: 'bm-2',
    title: "चाचू की शादी में 'जलूल-जलूल' आना",
    quote: "मेरे चाचू की शादी में 'जलूल-जलूल' आना।\nखुशियों के इस उत्सव में संग मिलकर खुशियां मनाना॥",
    kids: 'परी, आरव, गुड़िया, चीकू'
  },
  {
    id: 'bm-3',
    title: 'हल्दी है, चन्दन है, रिश्तों का बंधन है',
    quote: 'हल्दी है, चन्दन है, रिश्तों का पावन बन्धन है।\nहमारे भैया की शादी में, आपका हार्दिक अभिनन्दन है॥',
    kids: 'लड्डू, कान्हा, गोलू, शोनू'
  },
  {
    id: 'bm-4',
    title: 'नन्हें-नन्हें पाँव हमारे',
    quote: 'नन्हें-नन्हें पाँव हमारे, कैसे आएं हम बुलाने को।\nइस पाती को मान निमंत्रण, भूल न जाना आने को॥',
    kids: 'गुड़िया, आरव, मीठी एवं समस्त बाल मण्डली'
  },
  {
    id: 'bm-5',
    title: 'चाचा की शादी में पतंग उड़ाएंगे',
    quote: 'चाचा की शादी में पतंग उड़ाएंगे, गीत खुशी के गाएंगे।\nआप नहीं आओगे तो हम सचमुच रूठ जाएंगे॥',
    kids: 'चीकू, पीहू, काव्या, शिवांश'
  },
  {
    id: 'bm-6',
    title: 'बुआ / दीदी की शादी (वधू पक्ष विशेष)',
    quote: 'मेरी प्यारी बुआ की शादी में आप जरूर आना।\nसंग बैठकर खाना खाना और बहुत सारा प्यार लुटाना॥',
    kids: 'लाडो, कान्हा, परी एवं समस्त नटखट टोली'
  }
];

export const SWAGATOTSUK_TITLE_PRESETS = [
  'स्वागतोत्सुक',
  'स्वागताकांक्षी',
  'स्नेहाकांक्षी',
  'भ्रातृ मण्डली',
  'मित्र मण्डली एवं भ्रातृगण',
  'ननिहाल पक्ष',
  'ससुराल पक्ष'
];

export const DEFAULT_CARD_DATA = {

  // Theme & Size
  sizeKey: '7x9',
  themeId: 'traditional-red',
  inkColor: '#a61515',
  paperColor: '#fffef9',
  fontFamily: 'Noto Serif Devanagari',
  headingFont: 'Rozha One',
  borderStyle: 'traditional',

  // Top Section
  showGaneshaBadge: true,
  topInvocation: '॥ श्री गणेशाय नमः ॥',
  showSwastik: true,
  shlokaLeft: 'मंगलम् भगवान विष्णुः मंगलम् पुण्डरीकाक्षः',
  shlokaRight: 'मंगलम् गरुड़ध्वजः। मंगलाय तनोहरिः॥',

  // Poetry / Shayari
  shayariLeft1: 'सिन्दूर दान की मधुर बेला में, झिलमिल हो यह मांग की रेखा।',
  shayariLeft2: 'परिणय सूत्र में बंधे सुहाग, अमर रहे यह विधि की लेखा॥',
  shayariRight1: 'दो फूल खिले दो सुमन मिले, दो सपना ने श्रृंगार किया।',
  shayariRight2: 'दो दूर देश के पथिको ने संग-संग चलना स्वीकार किया॥',

  // Program Box
  programTitle: 'वैवाहिक कार्यक्रम',
  showBananaTrees: true,
  events: [
    {
      tithi: 'अगहन शुक्ल पक्ष अष्टमी',
      date: 'दिनांक 28-11-2025',
      day: '( शुक्रवार )',
      event: 'वंशरोपन एवं मण्डप ।'
    },
    {
      tithi: 'अगहन शुक्ल पक्ष नवमी',
      date: 'दिनांक 29-11-2025',
      day: '( शनिवार )',
      event: 'हल्दी कलश ।'
    },
    {
      tithi: 'अगहन शुक्ल पक्ष दशमी',
      date: 'दिनांक 30-11-2025',
      day: '( रविवार )',
      event: 'घृतढारी'
    },
    {
      tithi: '',
      date: '',
      day: '',
      event: 'बारात प्रस्थान एवं रात्री में शुभ विवाह ।'
    }
  ],
  noteText: 'नोट :- बारात शाम 07 बजे अपने निवास स्थान :- ग्राम चेरों से वाहन द्वारा महम्मदपुर के लिए प्रस्थान करेगी।',

  // Middle Invitation Section
  hostSide: 'groom', // 'groom' (वर पक्ष - वर पहले) or 'bride' (वधू पक्ष - वधू पहले)
  salutation: 'मान्यवर,',
  graceText: 'परम पिता परमेश्वर की असीम अनुकम्पा से,',
  middleShlokaLine1: 'सर्व मंगल मांगल्ये, शिवे सर्वार्थ साधिके ।',
  middleShlokaLine2: 'शरण्ये त्र्यम्बके गौरी, नारायणी नमोस्तुते ॥',
  middleShlokaAlignment: 'balanced', // 'balanced' (flush left & right), 'center', 'justify'

  // Groom Details (Left)
  groomPrefix: 'चि०',
  groomName: 'बिट्टू कुमार',
  groomRelation: 'प्रथम सुपुत्र:-',
  groomFather: 'श्री मन्नु पासवान',
  groomVillage: 'ग्राम+पो०- चेरों',
  groomThana: 'थाना-सरमेरा ( नालन्दा )',
  showGroomHorseMotif: true,
  showDoliMotif: false,
  showRingMotif: false,

  // Bride Details (Right)
  bridePrefix: 'आयु०',
  brideName: 'सिम्पी कुमारी',
  brideRelation: 'प्रथम सुपुत्री:-',
  brideFather: 'श्री शिवशंकर पासवान',
  brideVillage: 'ग्राम+पो०- महम्मदपुर',
  brideThana: 'थाना-अस्थावाँ ( नालन्दा )',

  // Center Wedding Motifs
  showSangKalashMotif: true,
  showMandapMotif: true,

  // Center Starburst Badge
  starburstLine1: 'के पावन परिणय',
  starburstLine2: 'की मधुर बेला में आपकी सपरिवार उपस्थिति',
  starburstLine3: 'एवं आशीर्वचनों के प्रार्थी',

  // Footer Family
  darshanabhilashiTitle: 'दर्शनाभिलाषी',
  darshanabhilashiNames: 'संजय पासवान, सुधीर पासवान, पवन पासवान\nसन्नि कुमार एवं समस्त परिवार।',

  // स्वागतोत्सुक (Swagatotsuk)
  showSwagatotsuk: true,
  swagatotsukTitle: 'स्वागतोत्सुक',
  swagatotsukNames: 'विकास पासवान, अमित, राहुल, सन्नी\nएवं समस्त मित्र मण्डली व भ्रातृगण।',

  aakankshiTitle: 'आकांक्षी',
  aakankshiNames: 'मन्नु पासवान\nग्राम चेरों, सरमेरा ( नालन्दा )',

  // बाल मनुहार (Baal Manuhar)
  showBaalManuhar: true,
  baalManuharTitle: 'बाल मनुहार',
  baalManuharQuote: 'भेज रहे हैं स्नेह निमंत्रण प्यारे तुम्हें बुलाने को।\nहे मानस के राजहंस तुम भूल न जाना आने को॥',
  baalManuharKids: 'कान्हा, लड्डू, परी, आरव एवं समस्त बाल गोपाल',
  showBaalManuharOnEnvelope: true,


  // Printing Press line
  pressLine: 'पवन प्रिंटिंग प्रेस, सरमेरा, नालन्दा, 7739553339',

  // Venue & Google Maps QR Settings (विवाह स्थल व गूगल मैप्स क्यूआर)
  showVenueDetails: true,
  showVenueQr: true,
  venueTitle: 'विवाह स्थल',
  venueName: 'होटल उत्सव पैलेस (विवाह भवन)',
  venueAddress: 'मेन रोड, निकट स्टेशन चौराहा, बिहार शरीफ (नालन्दा)',
  venueMapsUrl: 'https://maps.google.com/?q=Bihar+Sharif+Nalanda',
  qrLabel: 'मानचित्र हेतु स्कैन करें',
  qrCenterIcon: 'pin', // 'pin' (📍), 'swastik' (卐), 'mandap' (🛕), 'none'
  qrPlacement: 'footer', // 'footer' (फ़ुटर में), 'dedicated-banner' (समर्पित तोरणदार बॉक्स), 'below-program' (कार्यक्रम के नीचे)
  qrColorMode: 'theme', // 'theme' (मैचिंग कार्ड इंक), 'dark' (हाई-कंट्रास्ट चारकोल)
  showVenueOnEnvelope: true,
  envelopeQrSize: 52,

  // Guest List & Bulk Personalization (अतिथि सूची एवं वैयक्तिक आमंत्रण - फीचर 3)
  activeGuestId: null,
  personalizedCardSalutation: true,
  guestList: [
    {
      id: 'g_1',
      name: 'श्री अशोक शर्मा जी',
      relation: 'सपरिवार सादर आमंत्रण',
      city: 'ग्राम- चेरों, नालन्दा',
      phone: '9876543210'
    },
    {
      id: 'g_2',
      name: 'श्री रामेश्वर प्रसाद जी',
      relation: 'सपरिवार',
      city: 'कंकड़बाग, पटना (बिहार)',
      phone: ''
    },
    {
      id: 'g_3',
      name: 'श्री विनोद कुमार जी',
      relation: 'सपत्निक सादर',
      city: 'स्टेशन रोड, बिहार शरीफ',
      phone: ''
    },
    {
      id: 'g_4',
      name: 'श्री संजय सिंह जी',
      relation: 'सपरिवार',
      city: 'हरनौत (नालन्दा)',
      phone: ''
    }
  ],

  // Envelope (शादी का लिफाफा) Data
  envelopeSizeKey: 'standard',

  envelopeTopInvocation: '॥ श्री गणेशाय नमः ॥',
  envelopeTitle: 'शुभ विवाह',
  envelopeSubTitle: 'मांगलिक निमंत्रण पत्र',
  envelopeShowGanesha: true,
  envelopeShowSwastik: true,
  envelopeSenderTitle: 'प्रेषक :-',
  envelopeSenderName: 'मन्नु पासवान एवं समस्त परिवार',
  envelopeSenderAddress: 'ग्राम+पो०- चेरों, थाना-सरमेरा ( नालन्दा )',
  envelopeSenderMobile: 'मो० - 9876543210',
  envelopeRecipientTitle: 'प्रति / सेवा में :-',
  envelopeRecipientLine1: 'श्रीमान ................................................................',
  envelopeRecipientLine2: 'सपरिवार / सादर आमंत्रण',
  envelopeRecipientAddress: 'स्थान ................................................................',
  envelopeNote: 'कृपया सपरिवार पधारकर वर-वधू को अपना शुभाशीर्वाद प्रदान करें।',

  // 🖨️ Screen Printing & Butter Paper Mode (स्क्रीन प्रिंटिंग / बटर पेपर सेटिंग्स - फीचर 4)
  screenPrintMode: false,          // बटर पेपर मोड ऑन/ऑफ
  screenPrintInvert: false,        // पॉजिटिव (Black on White) vs नेगेटिव (White on Black)
  screenPrintMirror: false,        // शीशा प्रभाव (Mirror Image for direct emulsion contact)
  screenPrintCropMarks: true,      // रजिस्ट्रेशन व कटिंग मार्क्स (L-marks & ⌖ crosshairs)
  screenPrintMasterInfo: true,     // मास्टर जानकारी स्ट्रिप (साइज़, जॉब, रेज़ोल्यूशन, स्केल 100%)
  screenPrintMotifStyle: 'silhouette', // 'silhouette' (100% Solid Black) | 'lineart' (क्लासिक रेखाचित्र)
  screenPrintTonerBoost: true,     // डार्क टोनर बूस्ट (पिनहोल रोकने हेतु एक्स्ट्रा डार्क ब्लैक)
  screenPrintPaperEffect: true,    // एडिटर प्रीव्यू में पारभासी बटर पेपर टेक्सचर दिखाना
  screenPrintGaneshaStyle: 'lineart', // 'lineart' (क्लासिक रेखाचित्र) | 'silhouette' (सॉलिड गोल्ड बैज सिलुएट)
  // ✂️ Pre-Press 2-Up/4-Up Imposition & 2-Color Screen Plate Separation Suite
  screenPrintImposition: '1-up',   // '1-up' (सिंगल) | '2-up' (डबल - 50% बटर पेपर बचत) | '4-up' (क्वाड)
  screenPrintSheetSize: 'a4',      // 'natural' (कार्ड साइज़) | 'a4' (210x297mm) | '12x18' (305x457mm)
  screenPrintPlate: 'all',         // 'all' (फुल कंपोजिट) | 'text' (प्लेट 1: केवल टेक्स्ट) | 'motifs' (प्लेट 2: केवल बॉर्डर व मोटिफ)
  screenPrintFoilMode: false,      // हॉट फॉयल डाई व जिंक ब्लॉक मेकिंग मास्टर (रिवर्स नेगेटिव)
  screenPrintShowCutMarks: true,   // सेंटर कटिंग गाइड (✂️ व डैश लाइन)

  // 📤 Custom Images & Photos (कस्टम फोटो सेटिंग्स - फीचर 7)
  // 1. Deity / Kuldevi Photo (इष्टदेवता / कुलदेवी)
  customDeityImage: null,          // Base64 Data URL or preset SVG
  deityPresetId: 'ganesha',        // 'ganesha', 'khatu-shyam', 'balaji', 'radha-krishna', 'shiv-parvati', 'ram-darbar', 'durga'
  showDeityBadge: true,            // शीर्ष देव चित्र ऑन/ऑफ

  // 2. Couple Photo (वर-वधू युगल तस्वीर)
  showCouplePhoto: false,          // वर-वधू फोटो ऑन/ऑफ
  couplePhotoUrl: DEMO_COUPLE_PHOTO, // Base64 Data URL or demo couple photo
  couplePhotoFrame: 'royal-oval',  // 'royal-oval', 'jharokha', 'circle-floral'
  couplePhotoPlacement: 'center-motif', // 'center-motif', 'dedicated-banner'
  couplePhotoScale: 100,           // 80% to 150% ज़ूम/स्केल
  couplePhotoBorderColor: '#d4af37', // गोल्ड, लाल, मैरून
  hidePhotosInScreenPrint: true,   // बटर पेपर मोड में फोटो स्वतः छुपाएं

  // 🎵 Digital Card & Auspicious Music (डिजिटल कार्ड व संगीत - फीचर 8)
  enableMusic: true,                // बैकग्राउंड संगीत सक्रिय
  musicTrackId: 'shehnai-bilawal',  // 'shehnai-bilawal', 'shehnai-nagada', 'vedic-shloka', 'custom'
  musicVolume: 0.7,                 // 0.1 to 1.0 (70% डिफॉल्ट)
  customAudioUrl: null,             // यूज़र द्वारा अपलोड की गई ऑडियो फाइल
  customAudioFileName: '',          // फाइल का नाम
  flowerShowerAnimation: true,      // गुलाब की पंखुड़ियों की पुष्प वर्षा
  digitalCardTheme: 'royal-glow',   // 'royal-glow', 'festive-gold'
  includeMapInWhatsapp: true,       // WhatsApp में मैप्स लिंक जोड़ें
  includeBaalManuharInWhatsapp: true, // WhatsApp में बाल मनुहार जोड़ें
  customWhatsappGreeting: '',       // कस्टम आमंत्रण संदेश

  // ⏳ Wedding Live Countdown Timer (लाइव काउंटडाउन सेटिंग्स)
  enableCountdownTimer: true,         // लाइव काउंटडाउन ऑन/ऑफ
  weddingDateTime: '2026-04-24T19:00', // सटीक विवाह तिथि व समय (YYYY-MM-DDTHH:mm)
  countdownTimerTheme: 'royal-gold',  // 'royal-gold' (शाही स्वर्ण), 'sindoor-red' (सिन्दूरी लाल), 'festive-glow' (दीपक आभामंडल)
  showCountdownInModal: true,         // डिजिटल कार्ड में दिखाएं
  includeCountdownInWhatsapp: true,   // WhatsApp संदेश में शेष दिन शामिल करें

  // 🪔 Paper Textures & Background Watermarks (पेपर टेक्सचर व वॉटरमार्क सेटिंग्स)
  paperTexture: 'smooth-matte',       // 'smooth-matte', 'khadi-handmade', 'golden-zari-silk', 'royal-velvet', 'vintage-parchment'
  enableWatermark: true,              // पृष्ठभूमि वॉटरमार्क ऑन/ऑफ
  watermarkPreset: 'radha-krishna',   // 'radha-krishna', 'ganesha', 'swastik-sun', 'flute-morpankh', 'mandap-kalash', 'custom'
  watermarkCustomUrl: null,           // यूज़र द्वारा अपलोड किया गया कस्टम वॉटरमार्क
  watermarkOpacity: 0.08,             // 0.03 to 0.15 (डिफ़ॉल्ट 8%)
  watermarkScale: 100,                // 60% to 140%
  watermarkColor: 'full-color',       // 'full-color' (दिव्य सजीव रंग), 'gold-tint' (शाही स्वर्ण), 'sindoor-tint' (सिन्दूरी लाल), 'monochrome' (चारकोल)
  syncTextureToEnvelope: true,        // लिफाफे पर भी यही पेपर टेक्सचर लागू करें

  // 📑 Draft Proof & Client Approval Workflow (कच्चा प्रूफ व ग्राहक सत्यापन)
  isDraftProofMode: false,            // कच्चा प्रूफ वॉटरमार्क ऑन/ऑफ
  proofStatus: 'draft',               // 'draft' (कच्चा प्रूफ - केवल जांच हेतु) or 'approved' (अंतिम स्वीकृत)
  draftWatermarkText: 'कच्चा प्रूफ • केवल जांच हेतु',
  clientProofName: '',                // ग्राहक का नाम
  clientProofPhone: '',               // ग्राहक का WhatsApp मोबाइल नंबर
  pressShopName: 'राइज प्रिंटर्स एंड ग्राफिक्स',
  pressShopPhone: '',

  // 🎴 Wholesale Blank Card & Multi-Fold Inner Settings (थोक ब्लैंक कार्ड व मल्टी-फोल्ड इनर)
  cardFoldType: 'single', // 'single' (1-पल्ला), 'bi-fold' (2-पल्ला बुक स्टाइल), 'tri-fold' (3-पल्ला गेटफोल्ड)
  showFoldCreaseGuides: true, // फोल्डिंग क्रीज गाइड्स ऑन/ऑफ
  wholesaleMarketPreset: 'chawri-7x9', // 'chawri-7x9', 'chawri-bi-fold', 'chawri-tri-fold', 'custom'
  customWidthMm: 178,
  customHeightMm: 228,
  customWidthInches: 7,
  customHeightInches: 9,

  // 📋 Digital Job Slip, Token & Billing Defaults (जॉब स्लिप व बिलिंग)
  jobCardId: 'JOB-1082',
  jobCardOrderDate: new Date().toISOString().split('T')[0],
  jobCardDeliveryDate: '2026-04-22',
  jobCardDeliveryTime: 'शाम 05:00 बजे',
  jobCardModelCode: 'शाही मॉडल #502 (महरून)',
  jobCardQuantity: 250,
  jobCardEnvelopeQuantity: 250,
  jobCardRatePerUnit: 18,
  jobCardScreenMakingCharge: 200,
  jobCardExtraCharge: 0,
  jobCardAdvancePaid: 1500,
  jobCardPaymentMode: 'UPI', // 'UPI', 'Cash', 'GPay', 'PhonePe', 'Due'
  jobCardStatus: 'received', // 'received', 'proof_sent', 'proof_approved', 'butter_printed', 'screen_printing', 'ready_delivered'
  jobCardSpecialInstructions: '25 लिफाफों पर VIP नाम अलग से प्रिंट होगा। बटर शीट 600 DPI डार्क टोनर पर निकालें।',

  // 🖨️ Multi-Product Suite (प्रिंटिंग शॉप उत्पाद सुइट)
  productType: 'wedding', // 'wedding', 'shok-sandesh', 'sanskar', 'bill-book', 'visiting-card'

  // 🕊️ 1. Shok Sandesh & Tehravin Defaults (शोक संदेश व उठावनी)
  shokType: 'shok-sandesh', // 'shok-sandesh', 'tehravin', 'uthavani', 'shradhanjali'
  shokInvocation: '॥ ॐ शांति ॥',
  shokSubHeading: 'अत्यंत दुःख के साथ सूचित करना पड़ रहा है कि हमारे पूज्य',
  shokPersonPrefix: 'स्वर्गवासी',
  shokPersonName: 'श्री रामेश्वर दयाल शर्मा',
  shokGotra: 'कौशिक गोत्र',
  shokAge: '78 वर्ष',
  shokBirthDate: '15 अगस्त 1948',
  shokDeathDate: 'दिनांक 12 अक्टूबर 2026',
  shokPhotoUrl: '',
  shokDescription: 'का आकस्मिक देवलोक गमन दिनांक 12-10-2026 को हो गया है। दिवंगत पुण्यात्मा की आत्मिक शांति एवं मोक्ष प्राप्ति हेतु निम्नलिखित कार्यक्रम निर्धारित हैं:',
  shokEvents: [
    {
      name: 'तीजा / पीपल पानी',
      date: 'दिनांक 15-10-2026',
      time: 'प्रातः 09:00 बजे',
      location: 'गंगा तट / निज निवास'
    },
    {
      name: 'रस्म उठावनी / शोक सभा',
      date: 'दिनांक 18-10-2026',
      time: 'अपराह्न 03:00 से 04:00 बजे तक',
      location: 'कम्युनिटी हॉल, मेन रोड, सरमेरा'
    },
    {
      name: 'ब्रह्मभोज एवं तेरहवीं संस्कार',
      date: 'दिनांक 24-10-2026',
      time: 'दोपहर 12:00 बजे से प्रभु इच्छा तक',
      location: 'निज निवास स्थान'
    }
  ],
  shokFamilyGrieving: 'शोकाकुल: श्री राजेश शर्मा (पुत्र), रमेश शर्मा (पुत्र), अमित, राहुल (पौत्र) एवं समस्त शोक संतप्त शर्मा परिवार',
  shokFamilyVineet: 'विनीत: समस्त भ्रातृगण एवं निकट सम्बन्धी',
  shokEstablishment: 'प्रतिष्ठान: मेसर्स शर्मा प्रोविजन स्टोर, सरमेरा',
  shokContact: 'मो० 9876543210, 9431000000',
  shokBorderTone: 'black-traditional', // 'black-traditional', 'charcoal-floral', 'subtle-grey'

  // 🪔 2. Sanskar Ceremonies Defaults (मांगलिक संस्कार: मुंडन / जनेऊ / गृह प्रवेश)
  sanskarType: 'mundan', // 'mundan', 'janeu', 'griha-pravesh', 'kuan-pujan', 'birthday'
  sanskarHeading: 'शुभ मुंडन संस्कार निमंत्रण',
  sanskarInvocation: '॥ श्री गणेशाय नमः ॥',
  sanskarMantra: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥',
  sanskarChildPrefix: 'चि०',
  sanskarChildName: 'आरव कुमार',
  sanskarChildRelation: 'प्रथम सुपुत्र',
  sanskarParents: 'श्रीमती नीतू देवी एवं श्री अमित कुमार',
  sanskarGrandParents: 'श्रीमती शान्ति देवी एवं श्री मन्नु पासवान',
  sanskarHouseName: 'आनन्द कुटीर',
  sanskarGraceText: 'परमपिता परमेश्वर एवं कुलदेवी के असीम आशीर्वाद से हमारे सुपुत्र के मुंडन संस्कार के पावन अवसर पर आपकी गरिमामयी उपस्थिति एवं आशीर्वचन सादर प्रार्थनीय हैं।',
  sanskarEvents: [
    {
      event: 'हवन एवं वेदारंभ / मुंडन रस्म',
      date: 'दिनांक 14-05-2026',
      time: 'प्रातः 08:30 बजे',
      day: '( गुरुवार )'
    },
    {
      event: 'प्रीतिभोज (भण्डारा)',
      date: 'दिनांक 14-05-2026',
      time: 'सायं 06:30 बजे से प्रभु इच्छा तक',
      day: '( गुरुवार )'
    }
  ],
  sanskarVenue: 'निज निवास, ग्राम चेरों, थाना- सरमेरा, नालन्दा',
  sanskarDarshanabhilashi: 'समस्त परिवार, इष्ट-मित्र एवं स्नेहीजन',
  sanskarSwagat: 'विकास, राहुल, सन्नी एवं समस्त मित्र मण्डली',
  sanskarAakankshi: 'अमित कुमार एवं समस्त परिवार',

  // 📑 3. Bill Book / Cash Memo Defaults (बिल बुक व कैश मेमो)
  billFirmName: 'श्री श्याम गारमेंट्स & साड़ी केंद्र',
  billTagline: 'फैंसी साड़ियाँ, सूट, लहंगा एवं कटपीस के थोक व फुटकर विक्रेता',
  billProprietor: 'पवन कुमार अग्रवाल',
  billPhone1: '9876543210',
  billPhone2: '9431234567',
  billAddress: 'मेन मार्केट, निकट महावीर मंदिर, बिहार शरीफ (नालन्दा)',
  billGstNumber: '10ABCDE1234F1Z5',
  billType: 'cash-memo', // 'cash-memo', 'bill-book', 'challan', 'estimate'
  billCopyType: 'मूल प्रति (Original)', // 'मूल प्रति (Original)', 'दुकानदार प्रति (Duplicate)', 'ग्राहक प्रति (Customer Copy)'
  billNoPrefix: 'No. 1042',
  billDateDefault: 'दिनांक: ........................ 202...',
  billCustomerName: 'श्री / मेसर्स: ..........................................................................',
  billCustomerAddress: 'पता: ......................................................................................',
  billInkColor: '#0d47a1', // '#0d47a1' (प्रेस ब्लू), '#000000' (ब्लैक), '#b71c1c' (रेड)
  billTerms: '1. बिका हुआ माल 7 दिन के अंदर सही स्थिति में ही बदला जाएगा, नकद वापसी नहीं होगी।\n2. माल की डिलीवरी लेने के बाद किसी टूट-फूट की जिम्मेदारी हमारी नहीं होगी।\n3. सभी विवाद स्थानीय न्यायालय के क्षेत्राधिकार के अधीन होंगे।\n4. भूल-चूक लेनी-देनी (E. & O.E.)',
  billSignTitle: 'हस्ताक्षर विक्रेता / For श्री श्याम गारमेंट्स',
  billRowsCount: 8,

  // 💳 4. Visiting Card (10-Up A4 Master Sheet) Defaults
  bizCardShopName: 'शिवम डिजिटल स्टूडियो & प्रिंटिंग प्रेस',
  bizCardTagline: 'हाई क्वालिटी मल्टीकलर ऑफसेट, स्क्रीन प्रिंटिंग एवं शादी कार्ड विशेषज्ञ',
  bizCardOwnerName: 'सनी राज',
  bizCardDesignation: 'ग्राफिक डिजाइनर व प्रोपराइटर',
  bizCardPhone1: '7739553339',
  bizCardPhone2: '9876543210',
  bizCardEmail: 'riseprint77@gmail.com',
  bizCardWebsite: 'www.riseprint.in',
  bizCardAddress: 'मेन मार्केट चौराहा, चेरों मोड़, सरमेरा (नालन्दा) बिहार',
  bizCardServices: 'शादी कार्ड • बिल बुक • फ्लेक्स बैनर • विज़िटिंग कार्ड • स्क्रीन प्रिंटिंग • पोस्टर व पैम्फलेट',
  bizCardTheme: 'royal-navy', // 'royal-navy', 'classic-gold', 'crimson-bold', 'press-monochrome'
  bizCardViewMode: 'single', // 'single' (1 Card View), '10-up-sheet' (A4 Sheet 10 Cards with ✂️)
  bizCardShowBack: false
};

/**
 * 🖨️ Indian Printing Shop Product Suite Definitions
 */
export const PRODUCT_TYPES = [
  {
    id: 'wedding',
    name: 'विवाह निमंत्रण पत्र (Wedding Card)',
    shortName: 'विवाह कार्ड',
    icon: '🎴',
    tag: 'शाही शादी कार्ड',
    description: 'भारतीय पारम्परिक व आधुनिक 1-पल्ला, 2-पल्ला व 3-पल्ला शादी कार्ड'
  },
  {
    id: 'shok-sandesh',
    name: 'शोक संदेश / उठावनी / तेरहवीं',
    shortName: 'शोक संदेश',
    icon: '🕊️',
    tag: '1-घंटे की फास्ट छपाई',
    description: 'आकस्मिक छपाई, दिवंगत की तस्वीर, पुष्पमाला, कार्यक्रम व शोकाकुल'
  },
  {
    id: 'sanskar',
    name: 'मांगलिक संस्कार (मुंडन / जनेऊ / गृह प्रवेश)',
    shortName: 'मांगलिक संस्कार',
    icon: '🪔',
    tag: 'संस्कार निमंत्रण',
    description: 'मुंडन, यज्ञोपवीत, गृह प्रवेश, कुआं पूजन व जन्मोत्सव निमंत्रण'
  },
  {
    id: 'bill-book',
    name: 'बिल बुक व कैश मेमो (Bill Book / Cash Memo)',
    shortName: 'बिल बुक',
    icon: '📑',
    tag: 'दुकान व फर्म खाता',
    description: 'दुकानों व व्यापारियों हेतु GSTIN, आइटम तालिका, नियम व शर्तें'
  },
  {
    id: 'visiting-card',
    name: 'विज़िटिंग कार्ड (10-Up A4 मास्टर)',
    shortName: 'विज़िटिंग कार्ड',
    icon: '💳',
    tag: '10 कार्ड प्रति A4 शीट',
    description: 'प्रोफेशनल बिज़नेस कार्ड एवं 10-Up A4 शीट सेंटर कटिंग मार्क सहित'
  }
];

/**
 * 🎴 Wholesale Ready-Made Blank Card Presets (भारतीय थोक मंडी कार्ड्स)
 */
export const WHOLESALE_CARD_PRESETS = [
  {
    id: 'chawri-7x9',
    name: 'चावड़ी बाजार क्लासिक (7" × 9")',
    foldType: 'single',
    sizeKey: '7x9',
    widthMm: 178,
    heightMm: 228,
    panels: 1,
    description: 'भारत का सबसे लोकप्रिय सिंगल इनर शादी कार्ड'
  },
  {
    id: 'chawri-bi-fold',
    name: 'रॉयल बुक फोल्ड 12" × 8.5" (2-पल्ला)',
    foldType: 'bi-fold',
    sizeKey: 'bi-fold-book',
    widthMm: 305,
    heightMm: 216,
    panels: 2,
    description: 'खुली किताब जैसा 2 पल्लों वाला कार्ड (बाएं कार्यक्रम, दाएं वर-वधू)'
  },
  {
    id: 'chawri-tri-fold',
    name: '3-पल्ला गेटफोल्ड 15" × 8.5" (त्रिफोल्ड)',
    foldType: 'tri-fold',
    sizeKey: 'tri-fold-classic',
    widthMm: 381,
    heightMm: 216,
    panels: 3,
    description: 'चावड़ी बाजार का 3-पल्ले वाला भव्य निमंत्रण पत्र'
  },
  {
    id: 'jumbo-tri-fold',
    name: 'शाही 3-पल्ला जंबो (18" × 9")',
    foldType: 'tri-fold',
    sizeKey: 'tri-fold-jumbo',
    widthMm: 457,
    heightMm: 228,
    panels: 3,
    description: 'प्रीमियम बड़े बॉक्स कार्ड का 3-पल्ला इनर शीट'
  },
  {
    id: 'pocket-slim',
    name: 'स्लिम पॉकेट इनर (4.5" × 8.5")',
    foldType: 'single',
    sizeKey: 'pocket-slim',
    widthMm: 114,
    heightMm: 216,
    panels: 1,
    description: 'पॉकेट या डोरी वाले कार्ड का इनर पेपर'
  },
  {
    id: 'custom-calibrated',
    name: '📐 कस्टम पटरी नाप (Custom Calibration)',
    foldType: 'custom',
    sizeKey: 'custom',
    widthMm: 178,
    heightMm: 228,
    panels: 1,
    description: 'दुकानदार द्वारा स्केल से नापी गई सटीक इनर शीट'
  }
];

/**
 * 🪔 Authentic Indian Wedding Paper Texture Presets
 */
export const PAPER_TEXTURE_PRESETS = [
  {
    id: 'smooth-matte',
    name: 'स्मूथ मैट आइवरी',
    subtitle: 'पारम्परिक प्रेस ऑफ-व्हाइट मैट फिनिश',
    badge: 'मूल रूप',
    color: '#fffef9'
  },
  {
    id: 'khadi-handmade',
    name: 'खड्डी हैंडमेड कॉटन',
    subtitle: 'हस्तनिर्मित खादी फाइबर व सॉफ्ट ग्रेन',
    badge: 'लोकप्रिय',
    color: '#fffdf5'
  },
  {
    id: 'golden-zari-silk',
    name: 'गोल्डन जरी सिल्क शिमर',
    subtitle: 'रेशमी बुनावट व सोने की चमक',
    badge: 'रॉयल',
    color: '#fffcf0'
  },
  {
    id: 'royal-velvet',
    name: 'रॉयल वेलवेट डैमास्क',
    subtitle: 'मखमली डैमास्क फ्लोरल फिनिश',
    badge: 'शाही',
    color: '#fdf8f0'
  },
  {
    id: 'vintage-parchment',
    name: 'विंटेज रॉयल पर्चमेंट',
    subtitle: 'प्राचीन पाण्डुलिपि व मार्बल आइवरी',
    badge: 'विंटेज',
    color: '#fdfbf3'
  }
];

/**
 * 🕉️ Auspicious Background Watermark Presets
 */
export const WATERMARK_PRESETS = [
  {
    id: 'radha-krishna',
    name: 'श्री राधा-कृष्ण युगल',
    subtitle: 'पावन युगल प्रेम व बांसुरी (सजीव दिव्य चित्र)',
    icon: '🦚'
  },
  {
    id: 'ganesha',
    name: 'भगवान श्री गणेश',
    subtitle: 'विघ्नहर्ता मंगल स्वरूप (सजीव दिव्य चित्र)',
    icon: '🐘'
  },
  {
    id: 'swastik-sun',
    name: 'मांगलिक स्वास्तिक व सूर्य',
    subtitle: 'वैदिक सौर्य किरणें व स्वास्तिक',
    icon: '卐'
  },
  {
    id: 'flute-morpankh',
    name: 'बांसुरी व मयूरपंख',
    subtitle: 'भगवान श्री कृष्ण की मुरली',
    icon: '🪈'
  },
  {
    id: 'mandap-kalash',
    name: 'विवाह मंडप व कलश',
    subtitle: 'सप्तपदी व पावन फेरे',
    icon: '🛕'
  },
  {
    id: 'custom',
    name: 'कस्टम वॉटरमार्क',
    subtitle: 'अपनी खुद की फोटो या लोगो',
    icon: '📤'
  }
];

/**
 * 🎵 Auspicious Wedding Music Track Presets (पारम्परिक मांगलिक संगीत)
 */
export const MUSIC_TRACK_PRESETS = [
  {
    id: 'shehnai-bilawal',
    name: 'उस्ताद बिस्मिल्लाह खां शैली मंगल शहनाई',
    subtitle: 'राग बिलावल व भैरवी (शास्त्रीय शहनाई व तानपूरा श्रुति)',
    icon: '🎷',
    badge: 'पारम्परिक विवाह'
  },
  {
    id: 'shehnai-nagada',
    name: 'मंगल शहनाई व उत्सव नगाड़ा/ढोलक',
    subtitle: 'बारात व लग्न की मांगलिक ताल (कहरवा व दादरा)',
    icon: '🥁',
    badge: 'उत्सव व बारात'
  },
  {
    id: 'vedic-shloka',
    name: 'वैदिक स्वस्तिवाचन व मंदिर शंख-घंटा',
    subtitle: 'पावन शंख ध्वनि, कांस्य घंटा व मंगल शांति मंत्र',
    icon: '🔔',
    badge: 'दिव्य आशीर्वाद'
  },
  {
    id: 'custom',
    name: 'कस्टम पारिवारिक शादी संगीत (MP3 Upload)',
    subtitle: 'अपने कंप्यूटर या फोन से अपनी पसंद का गाना बजाएं',
    icon: '📤',
    badge: 'अपनी पसंद'
  }
];

/**
 * Screen Printing & Butter Paper Presets
 */
export const SCREEN_PRINT_PRESETS = [
  {
    id: 'positive-master',
    name: 'मानक पॉजिटिव मास्टर (Positive Master)',
    badge: 'सबसे लोकप्रिय',
    description: '100% शुद्ध काला (`#000000`) सफेद पृष्ठभूमि पर। फोटो-इमल्शन स्क्रीन जाली बनाने हेतु आदर्श।',
    settings: {
      screenPrintMode: true,
      screenPrintInvert: false,
      screenPrintMirror: false,
      screenPrintCropMarks: true,
      screenPrintMasterInfo: true,
      screenPrintMotifStyle: 'silhouette',
      screenPrintTonerBoost: true,
      screenPrintPaperEffect: true
    }
  },
  {
    id: 'mirror-exposure',
    name: 'मिरर एक्सपोज़र मास्टर (Direct Emulsion Contact)',
    badge: 'प्रेस एक्सपर्ट',
    description: 'उल्टा (Mirror/शीशा प्रभाव) प्रिंट। टोनर सीधे जाली के केमिकल को छूता है, जिससे लाइट लीकेज 0% हो जाती है।',
    settings: {
      screenPrintMode: true,
      screenPrintInvert: false,
      screenPrintMirror: true,
      screenPrintCropMarks: true,
      screenPrintMasterInfo: true,
      screenPrintMotifStyle: 'silhouette',
      screenPrintTonerBoost: true,
      screenPrintPaperEffect: true
    }
  },
  {
    id: 'negative-film',
    name: 'नेगेटिव फिल्म मास्टर (White on Black)',
    badge: 'रिवर्स / डार्क मोड',
    description: 'काले बैकग्राउंड पर सफेद टेक्स्ट। रिवर्स एक्सपोज़र अथवा स्पेशल ऑफसेट प्लेटों हेतु प्रयुक्त।',
    settings: {
      screenPrintMode: true,
      screenPrintInvert: true,
      screenPrintMirror: false,
      screenPrintCropMarks: true,
      screenPrintMasterInfo: true,
      screenPrintMotifStyle: 'silhouette',
      screenPrintTonerBoost: true,
      screenPrintPaperEffect: false
    }
  }
];


/**
 * Rich Pre-built Hindi Wedding Card Templates
 */
export const CARD_TEMPLATES = [
  {
    id: 'template-groom-classic',
    name: 'वर पक्ष - पारम्परिक शुभ विवाह (Reference Photo)',
    category: 'वर पक्ष (Ladke Wale)',
    badge: 'मूल संदर्भ कार्ड',
    description: 'दूल्हे की ओर से संपूर्ण विवाह संस्कार - मण्डप, हल्दी कलश, घृतढारी, बारात प्रस्थान एवं शुभ विवाह।',
    accentColor: '#a61515',
    data: {
      ...DEFAULT_CARD_DATA
    }
  },
  {
    id: 'template-bride-kanyadaan',
    name: 'वधू पक्ष - पावन परिणय एवं शुभ विदाई',
    category: 'वधू पक्ष (Ladki Wale)',
    badge: 'कन्यादान व विदाई',
    description: 'दुल्हन पक्ष हेतु द्वारपूजा, वरमाला, पाणिग्रहण, कन्यादान एवं शुभ विदाई (पालकी/डोली मोटिफ सहित)।',
    accentColor: '#9e1b32',
    data: {
      ...DEFAULT_CARD_DATA,
      hostSide: 'bride',
      themeId: 'royal-maroon',
      inkColor: '#7a0c18',
      paperColor: '#fffef9',
      topInvocation: '॥ श्री गणेशाय नमः ॥',
      shlokaLeft: 'कन्यां वरयते रूपं माता वित्तं पिता श्रुतम्।',
      shlokaRight: 'बान्धवाः कुलमिच्छन्ति मिष्टान्नमितरे जनाः॥',
      shayariLeft1: 'बाबुल का आँगन छोड़ पिया के देश चली, खुशियों की बगिया महकाने बेटी चली।',
      shayariLeft2: 'दुआओं के साथ विदा होती है लाडली, सदा सुहागिन रहे यह कामना हमारी॥',
      shayariRight1: 'मंगल बेला में पधारें आप देकर आशीर्वचन।',
      shayariRight2: 'धन्य होगा हमारा यह पावन गृह-प्रांगण॥',
      programTitle: 'शुभ परिणय कार्यक्रम',
      showBananaTrees: true,
      events: [
        {
          tithi: 'माघ शुक्ल पक्ष नवमी',
          date: 'दिनांक 08-02-2026',
          day: '( रविवार )',
          event: 'मण्डपाच्छादन एवं हल्दी कलश ।'
        },
        {
          tithi: 'माघ शुक्ल पक्ष दशमी',
          date: 'दिनांक 09-02-2026',
          day: '( सोमवार )',
          event: 'मातृका पूजन एवं मटकोर ।'
        },
        {
          tithi: 'माघ शुक्ल पक्ष एकादशी',
          date: 'दिनांक 10-02-2026',
          day: '( मंगलवार )',
          event: 'बारात स्वागत, द्वारपूजा एवं शुभ विवाह ।'
        },
        {
          tithi: '',
          date: '',
          day: '',
          event: 'कन्यादान एवं प्रातः शुभ विदाई ।'
        }
      ],
      noteText: 'नोट :- बारात का शुभ आगमन सायं 07:30 बजे हमारे निज निवास प्रांगण में होगा।',
      salutation: 'मान्यवर / स्नेही स्वजन,',
      graceText: 'परम पिता परमेश्वर की असीम अनुकम्पा से हमारी कुलभूषण सुपुत्री,',
      middleShlokaLine1: 'सर्व मंगल मांगल्ये, शिवे सर्वार्थ साधिके ।',
      middleShlokaLine2: 'शरण्ये त्र्यम्बके गौरी, नारायणी नमोस्तुते ॥',
      groomPrefix: 'चि०',
      groomName: 'अभिषेक कुमार',
      groomRelation: 'सुयोग्य सुपुत्र:-',
      groomFather: 'श्री ब्रजकिशोर शर्मा',
      groomVillage: 'ग्राम- रामपुर',
      groomThana: 'थाना- मसौढ़ी ( पटना )',
      bridePrefix: 'आयु०',
      brideName: 'रोहिणी कुमारी',
      brideRelation: 'प्रथम सुपुत्री:-',
      brideFather: 'श्री रामेश्वर शर्मा',
      brideVillage: 'ग्राम- हरनौत',
      brideThana: 'थाना- हरनौत ( नालन्दा )',
      showGroomHorseMotif: false,
      showDoliMotif: true,
      showRingMotif: false,
      showSangKalashMotif: true,
      showMandapMotif: true,
      starburstLine1: 'के पावन परिणय संस्कार',
      starburstLine2: 'की मंगल बेला में आपकी सपरिवार उपस्थिति',
      starburstLine3: 'एवं शुभाशीर्वाद के अभिलाषी',
      darshanabhilashiTitle: 'दर्शनाभिलाषी',
      darshanabhilashiNames: 'राजेन्द्र शर्मा, वीरेन्द्र शर्मा, मुकेश शर्मा\nएवं समस्त शर्मा परिवार।',
      aakankshiTitle: 'विनीत',
      aakankshiNames: 'रामेश्वर शर्मा\nग्राम- हरनौत ( नालन्दा )',
      pressLine: 'शर्मा प्रिंटर्स, हरनौत, नालन्दा',
      envelopeTitle: 'पावन परिणय',
      envelopeSenderName: 'रामेश्वर शर्मा एवं समस्त परिवार',
      envelopeSenderAddress: 'ग्राम- हरनौत, थाना- हरनौत ( नालन्दा )',
      envelopeSenderMobile: 'मो० - 9431234567'
    }
  },
  {
    id: 'template-tilak-sagai',
    name: 'तिलकोत्सव एवं शुभ सगाई (Ring Ceremony)',
    category: 'सगाई / तिलक',
    badge: 'सगाई विशेष',
    description: 'तिलक, फलदान, रिंग सेरेमनी एवं स्नेह भोज हेतु अंगूठी व कलश मोटिफ युक्त विशेष कार्ड।',
    accentColor: '#b45309',
    data: {
      ...DEFAULT_CARD_DATA,
      themeId: 'golden-glory',
      inkColor: '#961212',
      paperColor: '#fffbf0',
      headingFont: 'Rozha One',
      topInvocation: '॥ श्री गणेशाय नमः ॥',
      shlokaLeft: 'वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।',
      shlokaRight: 'निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
      shayariLeft1: 'स्नेह का यह पावन बंधन सदा महकता रहे।',
      shayariLeft2: 'खुशियों से आपका आँगन चहकता रहे॥',
      right1: 'तिलक की पावन बेला में पधारें आप।',
      right2: 'आपके आगमन से बढ़ेगा हमारे कुल का मान॥',
      programTitle: 'तिलकोत्सव एवं सगाई कार्यक्रम',
      showBananaTrees: true,
      events: [
        {
          tithi: 'फाल्गुन शुक्ल पक्ष तृतीया',
          date: 'दिनांक 20-02-2026',
          day: '( शुक्रवार )',
          event: 'श्री गणेश पूजन एवं कुलदेवता स्मरण'
        },
        {
          tithi: 'फाल्गुन शुक्ल पक्ष तृतीया',
          date: 'दिनांक 20-02-2026',
          day: '( शुक्रवार )',
          event: 'शुभ तिलक, फलदान एवं सगाई रस्म'
        },
        {
          tithi: '',
          date: '',
          day: '',
          event: 'प्रीतिभोज एवं आशीर्वचन (सायं 7:00 बजे से)'
        }
      ],
      noteText: 'स्थान :- उत्सव मैरिज हॉल, स्टेशन रोड, बिहारशरीफ।',
      salutation: 'मान्यवर,',
      graceText: 'ईश्वर की असीम अनुकम्पा एवं पूज्य बुजुर्गों के आशीर्वाद से,',
      middleShlokaLine1: 'मंगलम् भगवान विष्णुः मंगलम् पुण्डरीकाक्षः ।',
      middleShlokaLine2: 'मंगलम् गरुड़ध्वजः मंगलाय तनोहरिः ॥',
      showGroomHorseMotif: false,
      showDoliMotif: false,
      showRingMotif: true,
      showSangKalashMotif: true,
      showMandapMotif: false,
      starburstLine1: 'के शुभ तिलकोत्सव एवं सगाई',
      starburstLine2: 'समारोह में आपकी सपरिवार गरिमामयी उपस्थिति',
      starburstLine3: 'एवं आशीर्वचनों के सादर प्रार्थी',
      darshanabhilashiTitle: 'स्वागताकांक्षी',
      darshanabhilashiNames: 'अशोक कुमार, रवि कुमार, विकास कुमार\nएवं समस्त मित्र मण्डली।',
      aakankshiTitle: 'आकांक्षी',
      aakankshiNames: 'मन्नु पासवान\nग्राम चेरों, सरमेरा ( नालन्दा )',
      pressLine: 'पवन प्रिंटिंग प्रेस, सरमेरा, 7739553339'
    }
  },
  {
    id: 'template-reception-preetibhoj',
    name: 'शुभ प्रीतिभोज एवं स्वागत समारोह (Reception)',
    category: 'प्रीतिभोज / रिसेप्शन',
    badge: 'रिसेप्शन',
    description: 'विवाह उपरांत नव दंपत्ति के गृह प्रवेश, स्वागत एवं आशीर्वाद हेतु आयोजित स्नेह भोज कार्ड।',
    accentColor: '#7a0c18',
    data: {
      ...DEFAULT_CARD_DATA,
      themeId: 'royal-maroon',
      inkColor: '#7a0c18',
      paperColor: '#fcf8ee',
      headingFont: 'Rozha One',
      topInvocation: '॥ श्री गणेशाय नमः ॥',
      shlokaLeft: 'मंगलम् भगवान विष्णुः मंगलम् पुण्डरीकाक्षः',
      shlokaRight: 'मंगलम् गरुड़ध्वजः। मंगलाय तनोहरिः॥',
      shayariLeft1: 'परिणय सूत्र में बंधे नव युगल को दें अपना आशीर्वाद।',
      shayariLeft2: 'अमर रहे यह पावन संगम, सुख-समृद्धि मिले अपार॥',
      shayariRight1: 'आप पधारें हमारे द्वार लेकर शुभाशीष की धार।',
      shayariRight2: 'हर्षित होगा हृदय हमारा, बढ़ेगा कुल का सत्कार॥',
      programTitle: 'शुभ प्रीतिभोज एवं स्वागत समारोह',
      showBananaTrees: true,
      events: [
        {
          tithi: 'अगहन शुक्ल पक्ष द्वादशी',
          date: 'दिनांक 02-12-2025',
          day: '( मंगलवार )',
          event: 'नव दंपत्ति का गृह प्रवेश एवं कुलदेवता दर्शन'
        },
        {
          tithi: 'अगहन शुक्ल पक्ष द्वादशी',
          date: 'दिनांक 02-12-2025',
          day: '( मंगलवार )',
          event: 'वर-वधू स्वागत एवं आशीर्वचन (सायं 06:30 बजे से)'
        },
        {
          tithi: '',
          date: '',
          day: '',
          event: 'स्नेह प्रीतिभोज (संध्या 7:30 बजे से प्रभु इच्छा तक)'
        }
      ],
      noteText: 'स्थान :- निज निवास स्थान, ग्राम- चेरों, थाना- सरमेरा, नालन्दा।',
      salutation: 'मान्यवर,',
      graceText: 'शुभ विवाह के पावन संस्कार उपरांत नव दंपत्ति के स्वागतार्थ,',
      middleShlokaLine1: 'सर्व मंगल मांगल्ये, शिवे सर्वार्थ साधिके ।',
      middleShlokaLine2: 'शरण्ये त्र्यम्बके गौरी, नारायणी नमोस्तुते ॥',
      showGroomHorseMotif: false,
      showDoliMotif: false,
      showRingMotif: false,
      showSangKalashMotif: true,
      showMandapMotif: true,
      starburstLine1: 'के पावन वैवाहिक प्रीतिभोज',
      starburstLine2: 'की संध्या में आपकी सपरिवार गरिमामयी उपस्थिति',
      starburstLine3: 'एवं आशीर्वचनों के सादर आकांक्षी',
      darshanabhilashiTitle: 'दर्शनाभिलाषी',
      darshanabhilashiNames: 'संजय पासवान, सुधीर पासवान, पवन पासवान\nसमस्त सगे-संबंधी एवं परिवार।',
      aakankshiTitle: 'विनीत',
      aakankshiNames: 'मन्नु पासवान एवं समस्त परिवार\nग्राम चेरों ( नालन्दा )',
      pressLine: 'पवन प्रिंटिंग प्रेस, सरमेरा, नालन्दा'
    }
  },
  {
    id: 'template-royal-heritage',
    name: 'रॉयल हेरिटेज विवाह (Royal Gold & Maroon)',
    category: 'रॉयल हेरिटेज',
    badge: 'रॉयल गोल्ड',
    description: 'राजसी ठाठ-बाट, Yatra One फॉन्ट, गोल्डन-रेड टोन एवं शाही परंपराओं पर आधारित कार्ड।',
    accentColor: '#961212',
    data: {
      ...DEFAULT_CARD_DATA,
      themeId: 'golden-glory',
      inkColor: '#961212',
      paperColor: '#fffbf0',
      headingFont: 'Yatra One',
      topInvocation: '॥ श्री गणेशाय नमः ॥ श्री कुलदेव्यै नमः ॥',
      shlokaLeft: 'सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके।',
      shlokaRight: 'शरण्ये त्र्यम्बके गौरी नारायणि नमोऽस्तुते॥',
      shayariLeft1: 'शहनाइयों की मधुर धुन पर गूंज रहा मंगलगान।',
      shayariLeft2: 'वर-वधू के पावन बंधन को दें अपना आशीष दान॥',
      shayariRight1: 'केसरिया बालम पधारो म्हारे देस का भाव लिए।',
      shayariRight2: 'सपरिवार पधारें आप हमारे नयनों में सत्कार लिए॥',
      programTitle: 'शाही वैवाहिक कार्यक्रम',
      showBananaTrees: true,
      events: [
        {
          tithi: 'वैशाख शुक्ल पक्ष पंचमी',
          date: 'दिनांक 22-04-2026',
          day: '( बुधवार )',
          event: 'मण्डप प्रतिष्ठा एवं तेल-हल्दी रस्म'
        },
        {
          tithi: 'वैशाख शुक्ल पक्ष षष्ठी',
          date: 'दिनांक 23-04-2026',
          day: '( गुरुवार )',
          event: 'भात एवं मायरा संस्कार'
        },
        {
          tithi: 'वैशाख शुक्ल पक्ष सप्तमी',
          date: 'दिनांक 24-04-2026',
          day: '( शुक्रवार )',
          event: 'शाही बारात प्रस्थान, तोरण एवं शुभ पाणिग्रहण'
        }
      ],
      noteText: 'नोट :- शाही बारात सायं 06:00 बजे निज निवास से प्रस्थान करेगी।',
      salutation: 'परम आदरणीय महानुभाव,',
      graceText: 'परमपिता परमात्मा एवं कुलदेवी के असीम आशीर्वाद से,',
      showGroomHorseMotif: true,
      showDoliMotif: false,
      showRingMotif: false,
      showSangKalashMotif: true,
      showMandapMotif: true,
      starburstLine1: 'के पावन पाणिग्रहण संस्कार',
      starburstLine2: 'की राजसी बेला में आपकी सपरिवार गरिमामयी उपस्थिति',
      starburstLine3: 'एवं आशीर्वचनों के सादर आकांक्षी',
      pressLine: 'रॉयल प्रेस, पटना'
    }
  },
  {
    id: 'template-purvanchal-matkor',
    name: 'पूर्वांचल पारम्परिक विवाह (मटकोर व हल्दी विशेष)',
    category: 'पूर्वांचल / बिहार-यूपी',
    badge: 'मटकोर विशेष',
    description: 'बिहार व पूर्वी यूपी के लोक संस्कारों - मटकोर, कुलदेवी पूजन, हल्दी कलश, घृतढारी व शुभ विवाह हेतु।',
    accentColor: '#a61515',
    data: {
      ...DEFAULT_CARD_DATA,
      programTitle: 'पारम्परिक वैवाहिक कार्यक्रम',
      showBananaTrees: true,
      events: [
        {
          tithi: 'अगहन शुक्ल पक्ष सप्तमी',
          date: 'दिनांक 27-11-2025',
          day: '( गुरुवार )',
          event: 'मटकोर एवं कुलदेवी पूजन ।'
        },
        {
          tithi: 'अगहन शुक्ल पक्ष अष्टमी',
          date: 'दिनांक 28-11-2025',
          day: '( शुक्रवार )',
          event: 'वंशरोपन एवं मण्डपच्छादन ।'
        },
        {
          tithi: 'अगहन शुक्ल पक्ष नवमी',
          date: 'दिनांक 29-11-2025',
          day: '( शनिवार )',
          event: 'हल्दी कलश एवं घृतढारी ।'
        },
        {
          tithi: 'अगहन शुक्ल पक्ष दशमी',
          date: 'दिनांक 30-11-2025',
          day: '( रविवार )',
          event: 'बारात प्रस्थान एवं शुभ विवाह ।'
        }
      ],
      noteText: 'नोट :- बारात सायं 07 बजे वाहन द्वारा महम्मदपुर के लिए प्रस्थान करेगी।'
    }
  }
];
