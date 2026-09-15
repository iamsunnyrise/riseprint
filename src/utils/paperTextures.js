/**
 * 🪔 Authentic Indian Wedding Paper Texture Generator
 * Procedural SVG & CSS background styles for printing press paper stocks:
 * 1. smooth-matte: Smooth Ivory Matte (पारम्परिक प्रेस ऑफ-व्हाइट)
 * 2. khadi-handmade: Khadi Handmade Cotton (हस्तनिर्मित खादी फाइबर)
 * 3. golden-zari-silk: Golden Zari Silk Shimmer (रेशमी जरी बुनावट)
 * 4. royal-velvet: Royal Velvet Damask (मखमली डैमास्क फ्लोरल)
 * 5. vintage-parchment: Vintage Royal Parchment (प्राचीन पाण्डुलिपि व मार्बल)
 * 
 * 100% Offline, Zero CORS, Ultra-crisp in 300 DPI PDF Exports!
 */

// Procedural SVG Patterns encoded as clean Data URIs

// 1. Khadi Handmade Paper (Organic cotton fiber slubs & pulp specks)
const KHADI_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><filter id="f"><feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="3" result="noise"/><feColorMatrix type="matrix" values="0 0 0 0 0.7  0 0 0 0 0.55  0 0 0 0 0.35  0 0 0 0 0.07 0"/></filter><rect width="60" height="60" filter="url(%23f)"/><path d="M5 12 Q 15 14 25 11 T 45 13" stroke="%23b89758" stroke-width="0.5" stroke-opacity="0.12" fill="none"/><path d="M12 40 Q 22 38 38 42 T 55 39" stroke="%23b89758" stroke-width="0.4" stroke-opacity="0.1" fill="none"/><path d="M30 5 Q 32 20 28 35 T 32 55" stroke="%238a6d3b" stroke-width="0.3" stroke-opacity="0.08" fill="none"/><circle cx="18" cy="24" r="0.6" fill="%23a88b50" opacity="0.15"/><circle cx="48" cy="18" r="0.8" fill="%238c6f37" opacity="0.12"/><circle cx="34" cy="46" r="0.5" fill="%23a88b50" opacity="0.15"/></svg>`;

// 2. Golden Zari Silk Weave (Interlocking warp & weft micro-threads with metallic glimmer)
const ZARI_SILK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 6h24 M0 12h24 M0 18h24" stroke="%23d4af37" stroke-width="0.75" stroke-opacity="0.12"/><path d="M6 0v24 M12 0v24 M18 0v24" stroke="%23d4af37" stroke-width="0.75" stroke-opacity="0.12"/><path d="M3 3l18 18 M3 21L21 3" stroke="%23f7e7a9" stroke-width="0.3" stroke-opacity="0.15"/></svg>`;

// 3. Royal Damask / Paisley Floral Pattern (Embossed velvet motif)
const VELVET_DAMASK_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><g fill="none" stroke="%23cda339" stroke-opacity="0.11" stroke-width="0.8"><path d="M40 10 C30 20 30 35 40 45 C50 35 50 20 40 10 Z"/><path d="M40 22 C36 28 36 34 40 38 C44 34 44 28 40 22 Z"/><circle cx="40" cy="28" r="1.5" fill="%23cda339" fill-opacity="0.12"/><path d="M25 25 C15 35 20 45 28 40 C34 36 30 26 25 25 Z"/><path d="M55 25 C65 35 60 45 52 40 C46 36 50 26 55 25 Z"/><path d="M10 40 C20 30 35 30 45 40"/><path d="M40 50 C32 60 20 62 15 52 C12 46 22 42 28 48"/><path d="M40 50 C48 60 60 62 65 52 C68 46 58 42 52 48"/><circle cx="40" cy="70" r="2.5"/><circle cx="0" cy="40" r="2"/><circle cx="80" cy="40" r="2"/></g></svg>`;

// 4. Vintage Royal Parchment (Antique handmade paper with aged grain swirls)
const PARCHMENT_SVG = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><filter id="p"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="marble"/><feColorMatrix type="matrix" values="0 0 0 0 0.65  0 0 0 0 0.5  0 0 0 0 0.3  0 0 0 0.08 0"/></filter><rect width="100" height="100" filter="url(%23p)"/><path d="M0 30 Q 30 25 60 35 T 100 28" stroke="%239e7d3b" stroke-width="0.5" stroke-opacity="0.07" fill="none"/><path d="M0 75 Q 40 85 70 70 T 100 80" stroke="%239e7d3b" stroke-width="0.5" stroke-opacity="0.07" fill="none"/></svg>`;

/**
 * Returns complete CSS background properties for the selected paper texture.
 * 
 * @param {string} textureId - 'smooth-matte' | 'khadi-handmade' | 'golden-zari-silk' | 'royal-velvet' | 'vintage-parchment'
 * @param {boolean} isScreenPrint - When true, forces flat pure #ffffff for screen printing
 * @param {string} baseColor - User's chosen paper color (fallback #fffef9)
 */
export function getPaperTextureStyle(textureId = 'smooth-matte', isScreenPrint = false, baseColor = '#fffef9') {
  if (isScreenPrint) {
    return {
      backgroundColor: '#ffffff',
      backgroundImage: 'none',
      backgroundSize: 'auto',
      backgroundPosition: '0 0'
    };
  }

  const paperBg = baseColor || '#fffef9';

  switch (textureId) {
    case 'khadi-handmade':
      return {
        backgroundColor: paperBg,
        backgroundImage: `url("${KHADI_SVG}"), repeating-linear-gradient(45deg, rgba(184, 151, 88, 0.02) 0px, rgba(184, 151, 88, 0.02) 2px, transparent 2px, transparent 6px)`,
        backgroundSize: '60px 60px, 12px 12px',
        backgroundPosition: '0 0, 0 0'
      };

    case 'golden-zari-silk':
      return {
        backgroundColor: paperBg,
        backgroundImage: `url("${ZARI_SILK_SVG}"), linear-gradient(135deg, rgba(255, 248, 220, 0.3) 0%, rgba(212, 175, 55, 0.05) 50%, rgba(255, 248, 220, 0.2) 100%)`,
        backgroundSize: '24px 24px, 100% 100%',
        backgroundPosition: '0 0, 0 0'
      };

    case 'royal-velvet':
      return {
        backgroundColor: paperBg,
        backgroundImage: `url("${VELVET_DAMASK_SVG}"), radial-gradient(circle at 50% 50%, rgba(205, 163, 57, 0.06) 0%, transparent 80%)`,
        backgroundSize: '80px 80px, 100% 100%',
        backgroundPosition: '0 0, center center'
      };

    case 'vintage-parchment':
      return {
        backgroundColor: paperBg,
        backgroundImage: `url("${PARCHMENT_SVG}"), radial-gradient(ellipse at center, transparent 40%, rgba(180, 130, 50, 0.08) 100%)`,
        backgroundSize: '100px 100px, 100% 100%',
        backgroundPosition: '0 0, center center'
      };

    case 'smooth-matte':
    default:
      return {
        backgroundColor: paperBg,
        backgroundImage: `radial-gradient(#d4af3715 1px, transparent 1px), radial-gradient(#a6151508 1px, transparent 1px)`,
        backgroundSize: '20px 20px, 20px 20px',
        backgroundPosition: '0 0, 10px 10px'
      };
  }
}

/**
 * Returns inner vignette shadow style matching the texture.
 */
export function getPaperVignetteStyle(textureId = 'smooth-matte', isScreenPrint = false) {
  if (isScreenPrint) return { display: 'none' };

  switch (textureId) {
    case 'vintage-parchment':
      return {
        boxShadow: 'inset 0 0 55px rgba(160, 115, 45, 0.2), inset 0 0 15px rgba(120, 80, 30, 0.1)'
      };
    case 'royal-velvet':
      return {
        boxShadow: 'inset 0 0 45px rgba(166, 21, 21, 0.08), inset 0 0 25px rgba(205, 163, 57, 0.12)'
      };
    case 'golden-zari-silk':
      return {
        boxShadow: 'inset 0 0 40px rgba(212, 175, 55, 0.15)'
      };
    case 'khadi-handmade':
      return {
        boxShadow: 'inset 0 0 35px rgba(170, 135, 75, 0.12)'
      };
    case 'smooth-matte':
    default:
      return {
        boxShadow: 'inset 0 0 40px rgba(180, 140, 60, 0.12)'
      };
  }
}
