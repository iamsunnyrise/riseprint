import { PANCH } from '@mera-vansh/ms-panchang';

// Traditional North Indian wedding card month names mapping
const POPULAR_MONTH_NAMES = {
  1: 'चैत्र',
  2: 'वैशाख',
  3: 'ज्येष्ठ',
  4: 'आषाढ़',
  5: 'सावन', // or श्रावण
  6: 'भाद्रपद', // or भादो
  7: 'आश्विन', // or क्वार
  8: 'कार्तिक',
  9: 'अगहन', // Traditional card name for Margashirsha
  10: 'पौष',
  11: 'माघ',
  12: 'फाल्गुन'
};

const HINDI_DAYS = {
  0: 'रविवार',
  1: 'सोमवार',
  2: 'मंगलवार',
  3: 'बुधवार',
  4: 'गुरुवार',
  5: 'शुक्रवार',
  6: 'शनिवार'
};

/**
 * Calculates Indian Panchang Tithi, Day and Formatted Date from a Date string or Date object
 * @param {string|Date} dateInput e.g. "2025-11-28"
 * @param {boolean} useTraditionalAgahan Whether to use "अगहन" for Margashirsha (default: true)
 * @returns {{ tithiText: string, dayText: string, dateText: string, fullTithiString: string }}
 */
export function getPanchangDetails(dateInput, useTraditionalAgahan = true) {
  try {
    if (!dateInput) return null;
    
    // Parse date parts safely to avoid timezone shifting
    let dateObj;
    if (typeof dateInput === 'string') {
      const parts = dateInput.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        dateObj = new Date(year, month, day, 12, 0, 0); // Midday to ensure accurate tithi
      } else {
        dateObj = new Date(dateInput);
      }
    } else {
      dateObj = dateInput;
    }

    if (isNaN(dateObj.getTime())) return null;

    // Call astronomical Panchang engine
    const res = PANCH.call({
      date: dateObj,
      cityName: 'Patna', // Central North Indian reference coordinates
      lang: 'hi',
      region: 'north'
    });

    const monthNum = res.month?.number || 9;
    const monthName = useTraditionalAgahan
      ? (POPULAR_MONTH_NAMES[monthNum] || res.month?.name || 'अगहन')
      : (res.month?.name || 'मार्गशीर्ष');

    const pakshaName = res.tithi?.pakshaName || (res.tithi?.paksha === 'shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष');
    const tithiName = res.tithi?.name || 'अष्टमी';

    // Constructed Tithi text: "अगहन शुक्ल पक्ष अष्टमी"
    const tithiText = `${monthName} ${pakshaName} ${tithiName}`;

    // Day: "( शुक्रवार )"
    const dayName = res.vara?.name || HINDI_DAYS[dateObj.getDay()] || 'शुक्रवार';
    const dayText = `( ${dayName} )`;

    // Date formatted: "दिनांक 28-11-2025"
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    const dateText = `दिनांक ${dd}-${mm}-${yyyy}`;

    return {
      tithiText,
      dayText,
      dateText,
      rawMonth: res.month?.name,
      monthName,
      pakshaName,
      tithiName,
      dayName
    };
  } catch (err) {
    console.error('Panchang calculation error:', err);
    return null;
  }
}
