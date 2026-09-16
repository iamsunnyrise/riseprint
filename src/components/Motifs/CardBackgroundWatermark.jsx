import React from 'react';
import ganeshaWatermarkImg from '../../assets/ganesha-watermark-hd.png';
import radhaKrishnaWatermarkImg from '../../assets/radha-krishna-watermark-hd.png';

/**
 * Helper to compute CSS filter for watermark image based on selected color tint
 */
function getImageFilter(tint, inkColor = '#a61515') {
  switch (tint) {
    case 'full-color':
    case 'original':
      return 'none';
    case 'sindoor-tint':
      return 'sepia(100%) hue-rotate(330deg) saturate(380%) contrast(110%)';
    case 'monochrome':
      return 'grayscale(100%) contrast(120%)';
    case 'ink-tint':
      return 'sepia(100%) hue-rotate(330deg) saturate(320%) contrast(110%)';
    case 'gold-tint':
    default:
      return 'sepia(100%) hue-rotate(5deg) saturate(220%) contrast(110%)';
  }
}

/**
 * 🕉️ CardBackgroundWatermark
 * Sacred subtle background watermark for Indian wedding cards.
 * Renders user-provided divine HD images or vector SVGs with customizable opacity, tint & scale.
 * 
 * Presets:
 * 1. radha-krishna: Divine Radha & Krishna Yugal (HD Divine Color Image)
 * 2. ganesha: Auspicious Lord Shree Ganesha (HD Divine Color Image)
 * 3. swastik-sun: Vedic Surya Mandala & Swastik
 * 4. flute-morpankh: Krishna's Flute & Peacock Feather
 * 5. mandap-kalash: Sacred Wedding Mandap & Mangal Kalash
 * 6. custom: User uploaded image / logo
 */
export default function CardBackgroundWatermark({ data, isScreenPrint = false }) {
  // Completely disabled in Screen Printing mode to preserve pure black & white photo-emulsion film
  if (isScreenPrint || data.enableWatermark === false) {
    return null;
  }

  const preset = data.watermarkPreset || 'radha-krishna';
  const opacity = typeof data.watermarkOpacity === 'number' ? data.watermarkOpacity : 0.08;
  const scale = (data.watermarkScale ?? 100) / 100;
  const imageFilter = getImageFilter(data.watermarkColor || 'full-color', data.inkColor);

  // Determine stroke & fill color for SVG motifs
  let watermarkColor = '#cda339'; // default gold-tint
  if (data.watermarkColor === 'sindoor-tint') {
    watermarkColor = '#a61515';
  } else if (data.watermarkColor === 'ink-tint') {
    watermarkColor = data.inkColor || '#a61515';
  } else if (data.watermarkColor === 'monochrome') {
    watermarkColor = '#444444';
  }

  const containerStyle = {
    opacity: opacity,
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
    transition: 'opacity 0.25s ease, transform 0.25s ease'
  };

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="w-[430px] h-[430px] max-w-[88%] max-h-[78%] flex items-center justify-center"
        style={containerStyle}
      >
        {preset === 'custom' && data.watermarkCustomUrl ? (
          <img
            src={data.watermarkCustomUrl}
            alt="कस्टम वॉटरमार्क"
            className="w-full h-full object-contain filter grayscale contrast-125"
            style={{
              mixBlendMode: 'multiply'
            }}
          />
        ) : preset === 'ganesha' ? (
          <img
            src={ganeshaWatermarkImg}
            alt="भगवान श्री गणेश पावन वॉटरमार्क"
            className="w-full h-full object-contain"
            style={{
              filter: imageFilter,
              mixBlendMode: 'multiply'
            }}
          />
        ) : preset === 'swastik-sun' ? (
          <SwastikSunWatermarkSvg color={watermarkColor} />
        ) : preset === 'flute-morpankh' ? (
          <FluteMorpankhWatermarkSvg color={watermarkColor} />
        ) : preset === 'mandap-kalash' ? (
          <MandapKalashWatermarkSvg color={watermarkColor} />
        ) : (
          <img
            src={radhaKrishnaWatermarkImg}
            alt="श्री राधा-कृष्ण युगल पावन वॉटरमार्क"
            className="w-full h-full object-contain"
            style={{
              filter: imageFilter,
              mixBlendMode: 'multiply'
            }}
          />
        )}
      </div>
    </div>
  );
}

/**
 * 1. 🦚 Radha Krishna Divine Line-art Watermark
 */
function RadhaKrishnaWatermarkSvg({ color }) {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      {/* Outer Divine Aura / Halo Rings */}
      <circle cx="200" cy="200" r="190" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="200" cy="200" r="182" strokeWidth="0.8" opacity="0.4" />
      <circle cx="200" cy="200" r="174" strokeWidth="1" strokeDasharray="6 4" opacity="0.5" />

      {/* Decorative Lotus Petal Rim */}
      <g strokeWidth="0.75" opacity="0.5">
        {[...Array(24)].map((_, i) => (
          <path
            key={i}
            d="M 200 12 C 196 22 196 28 200 34 C 204 28 204 22 200 12 Z"
            transform={`rotate(${i * 15} 200 200)`}
          />
        ))}
      </g>

      {/* Inner Halo for the Divine Couple */}
      <circle cx="180" cy="130" r="70" strokeWidth="1" opacity="0.5" />
      <circle cx="230" cy="140" r="60" strokeWidth="1" opacity="0.4" />

      {/* Krishna's Crown (मुकुट) & Peacock Feather (मयूरपंख) */}
      <path d="M 155 95 C 165 75 195 75 205 95 Z" strokeWidth="1.5" />
      <path d="M 180 75 Q 185 45 200 35 Q 215 50 195 65" strokeWidth="1.2" />
      <ellipse cx="196" cy="48" rx="8" ry="12" transform="rotate(25 196 48)" strokeWidth="1.2" />
      <ellipse cx="196" cy="48" rx="4" ry="7" transform="rotate(25 196 48)" strokeWidth="1" fill={color} fillOpacity="0.2" />

      {/* Krishna's Face Profile & Divine Tilak */}
      <path d="M 175 95 Q 185 105 180 120 Q 188 128 178 135 Q 170 142 165 148" strokeWidth="1.5" />
      <path d="M 175 102 Q 178 112 175 116" strokeWidth="1" /> {/* Eye */}
      <path d="M 178 96 L 178 108" strokeWidth="1.5" /> {/* Tilak */}

      {/* Krishna's Hands Holding Bansuri (Flute) */}
      <path d="M 110 160 L 260 125" strokeWidth="3" />
      {/* Bansuri Tone Holes */}
      <circle cx="140" cy="153" r="1.5" fill={color} />
      <circle cx="155" cy="150" r="1.5" fill={color} />
      <circle cx="170" cy="146" r="1.5" fill={color} />
      <circle cx="185" cy="143" r="1.5" fill={color} />
      <circle cx="200" cy="139" r="1.5" fill={color} />
      {/* Tassels on Flute */}
      <path d="M 255 126 Q 265 135 260 150 M 255 150 L 265 150" strokeWidth="1" />
      <circle cx="260" cy="153" r="2.5" fill={color} fillOpacity="0.3" />

      {/* Krishna's Divine Body & Dhoti Flow */}
      <path d="M 165 148 Q 150 180 155 240 Q 150 280 145 330" strokeWidth="1.5" />
      <path d="M 185 155 Q 195 190 190 240 L 185 330" strokeWidth="1.5" />
      {/* Dhoti Pleats */}
      <path d="M 155 240 Q 170 260 185 240" strokeWidth="1" />
      <path d="M 150 270 Q 170 290 185 270" strokeWidth="1" />
      <path d="M 148 300 Q 168 320 183 300" strokeWidth="1" />

      {/* Radha's Divine Profile & Traditional Ghunghat */}
      <path d="M 215 105 Q 245 100 255 135 Q 265 170 250 210 Q 260 250 255 330" strokeWidth="1.5" />
      <path d="M 215 105 Q 228 115 224 130 Q 232 138 225 145 Q 218 152 212 158" strokeWidth="1.5" />
      <path d="M 222 120 Q 226 125 222 130" strokeWidth="1" /> {/* Radha Eye */}
      <circle cx="221" cy="115" r="1" fill={color} /> {/* Bindi */}
      {/* Radha's Ornaments & Hair Braid */}
      <path d="M 235 140 Q 248 180 240 230" strokeWidth="1" strokeDasharray="2 2" />
      {/* Dupatta/Ghunghat embroidery */}
      <path d="M 215 105 Q 235 125 242 160" strokeWidth="1" strokeDasharray="3 2" />

      {/* Lotus Flowers at the Divine Feet */}
      <g strokeWidth="1.2">
        <path d="M 200 350 C 185 335 160 340 150 355 C 165 365 190 360 200 350 Z" />
        <path d="M 200 350 C 215 335 240 340 250 355 C 235 365 210 360 200 350 Z" />
        <path d="M 200 350 C 190 330 210 330 200 350 Z" fill={color} fillOpacity="0.15" />
        <path d="M 130 360 C 145 350 170 352 180 365" strokeWidth="0.8" />
        <path d="M 270 360 C 255 350 230 352 220 365" strokeWidth="0.8" />
      </g>
    </svg>
  );
}

/**
 * 2. 🐘 Divine Ganesha Line-art Watermark
 */
function GaneshaWatermarkSvg({ color }) {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      {/* Outer Halo Rings */}
      <circle cx="200" cy="200" r="190" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.6" />
      <circle cx="200" cy="200" r="178" strokeWidth="0.8" opacity="0.4" />
      
      {/* Sun Ray Accents around Halo */}
      <g strokeWidth="0.8" opacity="0.5">
        {[...Array(32)].map((_, i) => (
          <line
            key={i}
            x1="200"
            y1="10"
            x2="200"
            y2="18"
            transform={`rotate(${i * 11.25} 200 200)`}
          />
        ))}
      </g>

      {/* Royal Mukut (Crown) */}
      <path d="M 160 115 L 200 45 L 240 115 Z" strokeWidth="2" />
      <path d="M 175 115 L 200 65 L 225 115 Z" strokeWidth="1" />
      <circle cx="200" cy="55" r="3" fill={color} fillOpacity="0.3" />
      <path d="M 150 115 Q 200 125 250 115" strokeWidth="2.5" />
      <circle cx="200" cy="85" r="4" fill={color} fillOpacity="0.2" />

      {/* Forehead & Trishul Tilak */}
      <path d="M 150 115 Q 120 160 145 190" strokeWidth="2" />
      <path d="M 250 115 Q 280 160 255 190" strokeWidth="2" />
      <path d="M 200 100 L 200 135" strokeWidth="2.5" />
      <path d="M 190 120 Q 200 135 210 120" strokeWidth="2" />
      <circle cx="200" cy="115" r="2.5" fill={color} />

      {/* Divine Eyes */}
      <path d="M 165 140 Q 175 135 185 142" strokeWidth="1.8" />
      <path d="M 235 140 Q 225 135 215 142" strokeWidth="1.8" />
      <circle cx="175" cy="142" r="1.5" fill={color} />
      <circle cx="225" cy="142" r="1.5" fill={color} />

      {/* Ears (विशाल कर्ण) */}
      <path d="M 145 135 C 90 130 80 190 130 220" strokeWidth="2" />
      <path d="M 130 155 C 105 155 100 190 130 205" strokeWidth="1" strokeDasharray="3 2" />
      <path d="M 255 135 C 310 130 320 190 270 220" strokeWidth="2" />
      <path d="M 270 155 C 295 155 300 190 270 205" strokeWidth="1" strokeDasharray="3 2" />

      {/* Tusk (दंत) */}
      <path d="M 170 205 L 155 220" strokeWidth="2.5" /> {/* Left Tusk */}
      <path d="M 230 205 L 240 215" strokeWidth="2.5" /> {/* Right Broken Tusk */}

      {/* Trunk (वक्रतुण्ड सूंड) with sacred Modak */}
      <path d="M 185 160 Q 185 240 210 270 Q 235 295 210 325 Q 180 340 160 310 Q 155 290 175 285" strokeWidth="2.5" />
      <path d="M 205 160 Q 205 230 225 255 Q 240 275 225 295 Q 205 315 185 295" strokeWidth="1.5" />
      {/* Trunk horizontal rings */}
      <path d="M 188 200 Q 197 205 204 200" strokeWidth="1" />
      <path d="M 193 225 Q 205 230 215 225" strokeWidth="1" />
      <path d="M 205 250 Q 218 255 225 250" strokeWidth="1" />

      {/* Modak in Trunk Tip */}
      <circle cx="168" cy="295" r="7" strokeWidth="1.5" fill={color} fillOpacity="0.2" />

      {/* Base Lotus Seat */}
      <path d="M 110 350 Q 200 375 290 350" strokeWidth="1.5" />
      <path d="M 130 360 Q 200 385 270 360" strokeWidth="1" />
    </svg>
  );
}

/**
 * 3. 卐 Vedic Surya Mandala & Swastik
 */
function SwastikSunWatermarkSvg({ color }) {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      {/* Outer Mandala Radiance */}
      <circle cx="200" cy="200" r="190" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <circle cx="200" cy="200" r="175" strokeWidth="1.5" />
      <circle cx="200" cy="200" r="165" strokeWidth="0.8" opacity="0.4" />

      {/* 24 Celestial Flame / Sun Rays */}
      <g strokeWidth="1.5">
        {[...Array(24)].map((_, i) => (
          <path
            key={i}
            d="M 200 25 Q 208 45 200 65 Q 192 45 200 25 Z"
            transform={`rotate(${i * 15} 200 200)`}
            fill={color}
            fillOpacity="0.08"
          />
        ))}
      </g>

      {/* Middle Concentric Lotus Petal Ring */}
      <circle cx="200" cy="200" r="125" strokeWidth="1.5" />
      <g strokeWidth="1">
        {[...Array(16)].map((_, i) => (
          <path
            key={i}
            d="M 200 75 C 190 90 190 105 200 120 C 210 105 210 90 200 75 Z"
            transform={`rotate(${i * 22.5} 200 200)`}
          />
        ))}
      </g>

      {/* Inner Mandala Shield */}
      <circle cx="200" cy="200" r="85" strokeWidth="2" />
      <circle cx="200" cy="200" r="77" strokeWidth="1" strokeDasharray="4 2" />

      {/* Auspicious Center Swastik (卐) */}
      <g strokeWidth="4.5">
        {/* Horizontal & Vertical Main Axis */}
        <line x1="155" y1="200" x2="245" y2="200" />
        <line x1="200" y1="155" x2="200" y2="245" />
        {/* 4 Swastik Arms */}
        <line x1="245" y1="200" x2="245" y2="235" />
        <line x1="155" y1="200" x2="155" y2="165" />
        <line x1="200" y1="155" x2="235" y2="155" />
        <line x1="200" y1="245" x2="165" y2="245" />
      </g>

      {/* 4 Sacred Dots (बिंदु) in quadrants */}
      <circle cx="220" cy="180" r="3.5" fill={color} />
      <circle cx="220" cy="220" r="3.5" fill={color} />
      <circle cx="180" cy="220" r="3.5" fill={color} />
      <circle cx="180" cy="180" r="3.5" fill={color} />
    </svg>
  );
}

/**
 * 4. 🪈 Krishna's Flute & Peacock Feather Watermark
 */
function FluteMorpankhWatermarkSvg({ color }) {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      {/* Subtle Circular Backdrop */}
      <circle cx="200" cy="200" r="185" strokeWidth="1" strokeDasharray="5 4" opacity="0.4" />
      <circle cx="200" cy="200" r="150" strokeWidth="0.8" opacity="0.3" />

      {/* Large Majestic Peacock Feather (मयूरपंख) */}
      <path d="M 210 80 Q 230 160 170 260" strokeWidth="2.5" />
      
      {/* Morpankh Outer Fan */}
      <path d="M 210 50 C 130 70 140 160 210 180 C 280 160 290 70 210 50 Z" strokeWidth="1.8" />
      
      {/* Morpankh Eye (चन्द्रिका) concentric ovals */}
      <ellipse cx="210" cy="115" rx="36" ry="45" strokeWidth="1.5" />
      <ellipse cx="210" cy="115" rx="24" ry="32" strokeWidth="1.5" fill={color} fillOpacity="0.08" />
      <ellipse cx="210" cy="120" rx="14" ry="18" strokeWidth="1.5" fill={color} fillOpacity="0.18" />
      <circle cx="210" cy="124" r="6" fill={color} fillOpacity="0.4" />

      {/* Feather Plumage Barbs (बारीक रेशे) */}
      <g strokeWidth="0.8" opacity="0.6">
        <path d="M 180 90 Q 150 70 135 60" />
        <path d="M 175 110 Q 140 100 120 95" />
        <path d="M 178 135 Q 145 135 125 135" />
        <path d="M 185 160 Q 155 170 140 180" />
        
        <path d="M 240 90 Q 270 70 285 60" />
        <path d="M 245 110 Q 280 100 300 95" />
        <path d="M 242 135 Q 275 135 295 135" />
        <path d="M 235 160 Q 265 170 280 180" />
      </g>

      {/* Diagonally Placed Krishna Flute (बांसुरी) */}
      <g transform="rotate(-25 200 230)">
        <rect x="70" y="222" width="260" height="16" rx="8" strokeWidth="2" fill="#ffffff20" />
        {/* Flute Mouthpiece & Tone Holes */}
        <ellipse cx="90" cy="230" rx="3" ry="5" fill={color} />
        <circle cx="140" cy="230" r="3" fill={color} />
        <circle cx="165" cy="230" r="3" fill={color} />
        <circle cx="190" cy="230" r="3" fill={color} />
        <circle cx="215" cy="230" r="3" fill={color} />
        <circle cx="240" cy="230" r="3" fill={color} />
        <circle cx="265" cy="230" r="3" fill={color} />
        <circle cx="290" cy="230" r="3" fill={color} />

        {/* Decorative Hanging Ghungroos & Silk Tassels */}
        <path d="M 320 230 Q 340 250 330 280" strokeWidth="1.5" />
        <circle cx="330" cy="285" r="4" fill={color} fillOpacity="0.3" />
        <path d="M 325 230 Q 350 260 345 295" strokeWidth="1.2" />
        <circle cx="345" cy="300" r="5" fill={color} fillOpacity="0.4" />
      </g>

      {/* Floating Flowers & Sparkles */}
      <g opacity="0.6">
        <path d="M 120 300 Q 130 290 140 300 Q 130 310 120 300 Z" strokeWidth="1" />
        <path d="M 280 320 Q 290 310 300 320 Q 290 330 280 320 Z" strokeWidth="1" />
      </g>
    </svg>
  );
}

/**
 * 5. 🛕 Wedding Mandap & Mangal Kalash Watermark
 */
function MandapKalashWatermarkSvg({ color }) {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" fill="none" stroke={color} strokeLinecap="round" strokeLinejoin="round">
      {/* Outer Halo */}
      <circle cx="200" cy="200" r="185" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
      <circle cx="200" cy="200" r="170" strokeWidth="0.8" opacity="0.3" />

      {/* Wedding Mandap Canopy (मंडप छत व कलगी) */}
      <path d="M 80 160 Q 200 90 320 160" strokeWidth="2.5" />
      <path d="M 90 170 Q 200 105 310 170" strokeWidth="1.5" />
      {/* Center Pinnacle / Kalash on top of Mandap */}
      <path d="M 200 90 L 200 60" strokeWidth="2" />
      <path d="M 190 70 L 200 50 L 210 70 Z" strokeWidth="1.5" fill={color} fillOpacity="0.2" />
      <circle cx="200" cy="45" r="3" fill={color} />

      {/* Hanging Floral Garlands (तोरण व वंदनवार) */}
      <path d="M 100 170 Q 130 190 160 170 Q 190 190 220 170 Q 250 190 280 170 Q 300 185 310 170" strokeWidth="1.2" />
      
      {/* 4 Mandap Pillars (स्तम्भ) */}
      <line x1="110" y1="170" x2="110" y2="340" strokeWidth="2.5" />
      <line x1="125" y1="170" x2="125" y2="340" strokeWidth="1.5" />
      <line x1="275" y1="170" x2="275" y2="340" strokeWidth="1.5" />
      <line x1="290" y1="170" x2="290" y2="340" strokeWidth="2.5" />

      {/* Central Sacred Homa Altar (हवन कुण्ड) with Holy Fire (अग्नि देव) */}
      <path d="M 170 340 L 180 300 L 220 300 L 230 340 Z" strokeWidth="2" />
      <line x1="165" y1="340" x2="235" y2="340" strokeWidth="2.5" />
      {/* Sacred Fire Flames */}
      <path d="M 200 295 Q 190 270 200 245 Q 210 270 200 295 Z" strokeWidth="1.8" fill={color} fillOpacity="0.2" />
      <path d="M 190 295 Q 180 275 190 260 Q 198 280 190 295 Z" strokeWidth="1.2" />
      <path d="M 210 295 Q 220 275 210 260 Q 202 280 210 295 Z" strokeWidth="1.2" />

      {/* Mangal Kalash with Coconut (नारियल व आम के पल्लव) */}
      <g transform="translate(0, -35)">
        {/* Kalash Pot Body */}
        <path d="M 185 240 C 170 260 170 280 185 290 L 215 290 C 230 280 230 260 215 240 Z" strokeWidth="2" />
        <ellipse cx="200" cy="240" rx="15" ry="4" strokeWidth="1.5" />
        {/* Swastik on Kalash */}
        <line x1="195" y1="265" x2="205" y2="265" strokeWidth="1.5" />
        <line x1="200" y1="260" x2="200" y2="270" strokeWidth="1.5" />
        {/* Mango Leaves (आम्र पल्लव) */}
        <path d="M 190 238 C 175 225 165 210 160 195 C 175 205 185 220 190 238 Z" strokeWidth="1.2" fill={color} fillOpacity="0.1" />
        <path d="M 210 238 C 225 225 235 210 240 195 C 225 205 215 220 210 238 Z" strokeWidth="1.2" fill={color} fillOpacity="0.1" />
        <path d="M 200 236 C 190 215 195 195 200 180 C 205 195 210 215 200 236 Z" strokeWidth="1.5" fill={color} fillOpacity="0.15" />
        {/* Coconut (श्रीफल) */}
        <ellipse cx="200" cy="225" rx="11" ry="13" strokeWidth="1.8" />
      </g>
    </svg>
  );
}
