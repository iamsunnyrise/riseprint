import React, { useState, useEffect } from 'react';
import { Clock, Sparkles, Heart } from 'lucide-react';

export default function WeddingCountdownWidget({
  weddingDateTime = '2026-04-24T19:00',
  theme = 'royal-gold',
  compact = false,
  className = ''
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    isPast: false
  });
  const [tickPulse, setTickPulse] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      let target;

      try {
        target = new Date(weddingDateTime).getTime();
        if (isNaN(target)) {
          // Fallback to April 24, 2026 19:00
          target = new Date('2026-04-24T19:00:00').getTime();
        }
      } catch (e) {
        target = new Date('2026-04-24T19:00:00').getTime();
      }

      const diff = target - now;

      // Check if it's the wedding day (within 24 hours after target or same calendar date)
      const targetDate = new Date(target);
      const todayDate = new Date();
      const isSameDate =
        targetDate.getDate() === todayDate.getDate() &&
        targetDate.getMonth() === todayDate.getMonth() &&
        targetDate.getFullYear() === todayDate.getFullYear();

      if (isSameDate || (diff <= 0 && diff > -24 * 60 * 60 * 1000)) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: true,
          isPast: false
        });
        return;
      }

      if (diff <= -24 * 60 * 60 * 1000) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isToday: false,
          isPast: true
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isToday: false,
        isPast: false
      });

      setTickPulse(prev => !prev);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [weddingDateTime]);

  // Pad numbers with leading zero
  const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

  // Theme styling configurations
  const themeStyles = {
    'royal-gold': {
      container: 'bg-gradient-to-b from-stone-900 via-red-950 to-stone-900 border-amber-500/80 text-amber-100',
      locket: 'bg-gradient-to-b from-amber-500/20 via-black/50 to-amber-600/10 border-amber-400/50 text-amber-300 shadow-amber-500/10',
      label: 'text-amber-300/80',
      heading: 'text-amber-200'
    },
    'sindoor-red': {
      container: 'bg-gradient-to-b from-red-950 via-red-900 to-red-950 border-amber-400/70 text-amber-100',
      locket: 'bg-gradient-to-b from-red-900/60 via-black/40 to-red-950/80 border-amber-400/60 text-amber-200 shadow-red-900/30',
      label: 'text-amber-200/90',
      heading: 'text-amber-100'
    },
    'festive-glow': {
      container: 'bg-gradient-to-b from-stone-950 via-amber-950/80 to-stone-950 border-amber-400 text-amber-100',
      locket: 'bg-gradient-to-b from-amber-400/20 via-black/60 to-amber-500/20 border-amber-300 text-amber-200 shadow-amber-400/20',
      label: 'text-amber-300',
      heading: 'text-amber-200'
    }
  };

  const activeTheme = themeStyles[theme] || themeStyles['royal-gold'];

  // 1. Wedding Day Celebration View (विवाह दिवस)
  if (timeLeft.isToday) {
    return (
      <div
        className={`rounded-2xl p-4 border-2 text-center select-none shadow-xl backdrop-blur-md animate-in fade-in duration-500 ${activeTheme.container} ${className}`}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-xl animate-bounce">🪔</span>
          <span className="text-sm sm:text-base font-black tracking-wider text-amber-300">
            ॥ आज शुभ विवाह की पावन बेला है ॥
          </span>
          <span className="text-xl animate-bounce">🪔</span>
        </div>
        <p className="text-xs sm:text-sm text-amber-100/90 font-medium">
          परमपिता परमात्मा एवं कुलदेवी के आशीर्वाद से आज पावन परिणय संस्कार सम्पन्न हो रहा है।
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-xs font-bold text-amber-200">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-current" />
          <span>वर-वधू को हार्दिक शुभाशीर्वाद!</span>
        </div>
      </div>
    );
  }

  // 2. Post-Wedding View (विवाह उपरांत)
  if (timeLeft.isPast) {
    return (
      <div
        className={`rounded-2xl p-3.5 border-2 text-center select-none shadow-lg backdrop-blur-md ${activeTheme.container} ${className}`}
      >
        <div className="text-xs sm:text-sm font-bold text-amber-300 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>शुभ विवाह सम्पन्न हुआ! नव-दंपति का जीवन मंगलमय हो।</span>
        </div>
      </div>
    );
  }

  // 3. Compact Mode (for toolbars or small cards)
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border bg-black/40 text-amber-200 text-xs font-bold shadow-md select-none ${className}`}>
        <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
        <span>शुभ घड़ी:</span>
        <span className="font-mono text-amber-300 bg-black/50 px-1.5 py-0.5 rounded border border-amber-500/30">
          {pad(timeLeft.days)}d : {pad(timeLeft.hours)}h : {pad(timeLeft.minutes)}m : {pad(timeLeft.seconds)}s
        </span>
      </div>
    );
  }

  // 4. Standard Full Auspicious Locket Countdown Display
  const timeBlocks = [
    { value: pad(timeLeft.days), label: 'दिन', sub: 'Days' },
    { value: pad(timeLeft.hours), label: 'घंटे', sub: 'Hours' },
    { value: pad(timeLeft.minutes), label: 'मिनट', sub: 'Mins' },
    { value: pad(timeLeft.seconds), label: 'सेकंड', sub: 'Secs', isSeconds: true }
  ];

  return (
    <div
      className={`rounded-2xl p-3.5 sm:p-4 border-2 shadow-2xl backdrop-blur-md select-none text-center transition-all duration-300 ${activeTheme.container} ${className}`}
      style={{
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(212, 175, 55, 0.15)'
      }}
    >
      {/* Auspicious Header */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-amber-400 text-xs sm:text-sm">卐</span>
        <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-amber-400" />
        <h4 className={`text-xs sm:text-sm font-bold tracking-wider ${activeTheme.heading} flex items-center gap-1.5`}>
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>मंगल परिणय में शेष शुभ समय</span>
        </h4>
        <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-amber-400" />
        <span className="text-amber-400 text-xs sm:text-sm">卐</span>
      </div>

      {/* 4 Ornate Lockets Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3.5 max-w-sm mx-auto">
        {timeBlocks.map((block, idx) => (
          <div
            key={idx}
            className={`relative rounded-xl border p-2 sm:p-2.5 flex flex-col items-center justify-center transition-all duration-300 shadow-md ${
              activeTheme.locket
            } ${block.isSeconds && tickPulse ? 'ring-1 ring-amber-400/50 scale-[1.02]' : ''}`}
          >
            {/* Top decorative dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60 mb-0.5" />

            {/* Time Number */}
            <span
              className="text-xl sm:text-2xl font-black font-serif tracking-wider leading-none drop-shadow-sm"
              style={{ fontFamily: "'Rozha One', 'Noto Serif Devanagari', serif" }}
            >
              {block.value}
            </span>

            {/* Hindi Label */}
            <span className={`text-[10px] sm:text-[11px] font-bold mt-1 leading-none ${activeTheme.label}`}>
              {block.label}
            </span>

            {/* Subtitle */}
            <span className="text-[8px] opacity-60 leading-none mt-0.5 uppercase tracking-wider font-mono">
              {block.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Subtle bottom note */}
      <div className="mt-2.5 flex items-center justify-center gap-1 text-[10px] text-amber-300/70">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>आपकी गरिमामयी उपस्थिति एवं शुभाशीर्वाद के सस्नेह आकांक्षी</span>
      </div>
    </div>
  );
}
