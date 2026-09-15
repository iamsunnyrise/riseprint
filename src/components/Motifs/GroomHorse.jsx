import React from 'react';
import groomHorseHdImg from '../../assets/groom-horse-hd.png';

/**
 * Royal Indian Groom on Decorated Horse (घोड़ी पर दूल्हा / बारात) Motif
 * High-definition 3D royal groom holding ceremonial red umbrella (छत्र),
 * wearing royal sherwani, turban (साफा), embroidered cape, riding an ornate
 * royal white horse adorned with golden jewelry and tassels.
 */
export default function GroomHorse({
  color = '#a61515',
  className = '',
  style = {},
  alt = 'घोड़ी पर दूल्हा (Baraat Horse)'
}) {
  return (
    <div
      className={`inline-block select-none flex-shrink-0 relative transition-transform duration-200 ${className}`}
      style={{
        width: '64px',
        height: '60px',
        ...style
      }}
    >
      <img
        src={groomHorseHdImg}
        alt={alt}
        className="w-full h-full object-contain pointer-events-none select-none transition-transform duration-200 hover:scale-105"
        style={{
          filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.20))'
        }}
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
