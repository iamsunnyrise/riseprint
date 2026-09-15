import React from 'react';
import doliHdImg from '../../assets/doli-hd.png';

/**
 * Royal Bridal Doli / Palanquin (डोली / पालकी / विदाई) Motif
 * High-definition 3D traditional royal palanquin featuring
 * the bride adorned in traditional wedding jewelry and veil,
 * auspicious golden carved dome with finial, draped red silk curtains,
 * and ornate carrying poles.
 */
export default function DoliMotif({
  color = '#a61515',
  className = '',
  style = {},
  alt = 'डोली / पालकी (Bridal Doli)'
}) {
  return (
    <div
      className={`inline-block select-none flex-shrink-0 relative transition-transform duration-200 ${className}`}
      style={{
        width: '72px',
        height: '46px',
        ...style
      }}
    >
      <img
        src={doliHdImg}
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
