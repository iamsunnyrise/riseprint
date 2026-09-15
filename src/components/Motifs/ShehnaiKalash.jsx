import React from 'react';
import sangKalashHdImg from '../../assets/sang-kalash-hd-transparent.png';

export default function ShehnaiKalash({ color = '#a61515', className = "" }) {
  return (
    <div
      className={`inline-block select-none flex-shrink-0 relative ${className}`}
      style={{
        width: '58px',
        height: '64px'
      }}
    >
      <img
        src={sangKalashHdImg}
        alt="संग मंगल कलश"
        className="w-full h-full object-contain select-none pointer-events-none transition-transform duration-200 hover:scale-105"
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.22))'
        }}
      />
    </div>
  );
}
