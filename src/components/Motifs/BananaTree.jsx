import React from 'react';
import kadliStambhHdImg from '../../assets/kadli-stambh-hd.png';

/**
 * Traditional Kadli Stambh (केले का स्तम्भ) Motif
 * High-definition 3D traditional Indian wedding motif featuring
 * sacred banana fronds, hanging mocha blossom, auspicious marigold & jasmine garlands,
 * sanctified crimson silk wrap, and ornate Kalash base.
 */
export default function BananaTree({
  color = '#a61515',
  className = '',
  style = {},
  flip = false,
  alt = 'कदली स्तम्भ (केले का पेड़)'
}) {
  return (
    <div
      className={`inline-block select-none flex-shrink-0 relative transition-transform duration-200 ${className}`}
      style={{
        transform: flip ? 'scaleX(-1)' : 'none',
        ...style
      }}
    >
      <img
        src={kadliStambhHdImg}
        alt={alt}
        className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md"
        loading="eager"
        decoding="async"
      />
    </div>
  );
}
