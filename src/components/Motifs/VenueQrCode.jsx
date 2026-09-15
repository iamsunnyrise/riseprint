import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

// Pin, Swastik, and Mandap SVG Data URIs for QR center excavation
const PIN_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc2626">
    <circle cx="12" cy="12" r="11" fill="#ffffff"/>
    <path d="M12 4a5 5 0 0 0-5 5c0 3.75 5 9 5 9s5-5.25 5-9a5 5 0 0 0-5-5zm0 6.75a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5z" fill="#dc2626"/>
  </svg>
`)}`;

const SWASTIK_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill="#fffdf8" stroke="#d4af37" stroke-width="1"/>
    <text x="12" y="17.5" font-family="'Noto Serif Devanagari', serif" font-size="16" font-weight="900" fill="#b8860b" text-anchor="middle">卐</text>
  </svg>
`)}`;

const MANDAP_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="11" fill="#ffffff"/>
    <path d="M12 4l-6 4h12l-6-4zm-4 5v7h1.5V9H8zm3.25 0v7h1.5V9h-1.5zm3.25 0v7H16V9h-1.5zM6 17h12v1.5H6V17z" fill="#b45309"/>
  </svg>
`)}`;

export default function VenueQrCode({
  url = 'https://maps.google.com',
  size = 72,
  inkColor = '#a61515',
  colorMode = 'theme', // 'theme' or 'dark'
  centerIcon = 'pin', // 'pin', 'swastik', 'mandap', 'none'
  label = 'मानचित्र हेतु स्कैन करें',
  showLabel = true,
  showBorder = true,
  className = ''
}) {
  const safeUrl = url && url.trim().length > 0 ? url.trim() : 'https://maps.google.com';
  
  // High-contrast color choices
  const fgColor = colorMode === 'dark' ? '#1c1917' : inkColor;
  
  // Icon settings for center excavation
  let imageSettings = undefined;
  const iconPixelSize = Math.round(size * 0.26);

  if (centerIcon === 'pin') {
    imageSettings = {
      src: PIN_SVG,
      height: iconPixelSize,
      width: iconPixelSize,
      excavate: true
    };
  } else if (centerIcon === 'swastik') {
    imageSettings = {
      src: SWASTIK_SVG,
      height: iconPixelSize,
      width: iconPixelSize,
      excavate: true
    };
  } else if (centerIcon === 'mandap') {
    imageSettings = {
      src: MANDAP_SVG,
      height: iconPixelSize,
      width: iconPixelSize,
      excavate: true
    };
  }

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      {/* Decorative Traditional Indian Outer Container */}
      <div
        className="p-1 rounded bg-white shadow-sm relative flex flex-col items-center justify-center"
        style={{
          border: showBorder ? `1.5px solid ${inkColor}80` : 'none',
          boxShadow: showBorder ? `0 0 0 1px #d4af3740, 0 1px 3px rgba(0,0,0,0.1)` : undefined
        }}
      >
        {/* Ornate corner micro brackets if border enabled */}
        {showBorder && (
          <>
            <span
              className="absolute -top-1 -left-1 text-[8px] font-bold select-none leading-none"
              style={{ color: '#d4af37' }}
            >
              ❖
            </span>
            <span
              className="absolute -top-1 -right-1 text-[8px] font-bold select-none leading-none"
              style={{ color: '#d4af37' }}
            >
              ❖
            </span>
            <span
              className="absolute -bottom-1 -left-1 text-[8px] font-bold select-none leading-none"
              style={{ color: '#d4af37' }}
            >
              ❖
            </span>
            <span
              className="absolute -bottom-1 -right-1 text-[8px] font-bold select-none leading-none"
              style={{ color: '#d4af37' }}
            >
              ❖
            </span>
          </>
        )}

        {/* Crisp Vector QR Code */}
        <QRCodeSVG
          value={safeUrl}
          size={size}
          fgColor={fgColor}
          bgColor="#ffffff"
          level="H" // High error correction (30%)
          imageSettings={imageSettings}
          className="block"
        />
      </div>

      {/* Label underneath */}
      {showLabel && label && (
        <div
          className="mt-1 text-center font-bold tracking-tight leading-none text-[9px] sm:text-[9.5px] whitespace-nowrap"
          style={{ color: inkColor }}
        >
          <span className="inline-flex items-center gap-0.5 opacity-90">
            <span>{label}</span>
            <span className="text-[8px]">📍</span>
          </span>
        </div>
      )}
    </div>
  );
}
