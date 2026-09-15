import React from 'react';
import mandapHdImg from '../../assets/mandap-hd.png';

/**
 * Royal Hindu Vivah Mandap (विवाह मंडप एवं फेरे) Motif
 * High-definition 3D traditional wedding mandap featuring
 * auspicious carved golden dome, draped red silk curtains,
 * bride & groom performing havan with sacred Agni Kund,
 * and decorative brass lamps with floral garlands.
 */
export default function MandapMotif({
  color = '#a61515',
  className = '',
  style = {},
  alt = 'विवाह मंडप एवं फेरे (Wedding Mandap)'
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
        src={mandapHdImg}
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
