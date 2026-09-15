import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { shehnaiAudioEngine } from '../../utils/shehnaiAudioEngine';
import { MUSIC_TRACK_PRESETS } from '../../utils/defaultData';

export default function ShehnaiMusicPlayer({
  cardData,
  setCardData,
  onOpenDigitalInvite
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [visualBars, setVisualBars] = useState([20, 45, 75, 30, 60, 40]);
  const animFrameRef = useRef(null);

  const currentTrack = MUSIC_TRACK_PRESETS.find(t => t.id === cardData.musicTrackId) || MUSIC_TRACK_PRESETS[0];

  // Live visualizer bars loop
  useEffect(() => {
    const updateVisualizer = () => {
      if (isPlaying) {
        const data = shehnaiAudioEngine.getVisualizerData();
        // Sample 6 points for bars
        const bars = [
          Math.max(15, (data[0] / 255) * 100),
          Math.max(20, (data[2] / 255) * 100),
          Math.max(30, (data[4] / 255) * 100),
          Math.max(15, (data[6] / 255) * 100),
          Math.max(25, (data[8] / 255) * 100),
          Math.max(10, (data[10] / 255) * 100)
        ];
        setVisualBars(bars);
      } else {
        setVisualBars([15, 20, 25, 18, 22, 16]);
      }
      animFrameRef.current = requestAnimationFrame(updateVisualizer);
    };

    animFrameRef.current = requestAnimationFrame(updateVisualizer);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Handle Track Play / Stop
  const handleTogglePlay = () => {
    if (isPlaying) {
      shehnaiAudioEngine.stop();
      setIsPlaying(false);
    } else {
      shehnaiAudioEngine.setVolume(isMuted ? 0 : (cardData.musicVolume || 0.7));
      shehnaiAudioEngine.play(cardData.musicTrackId, cardData.customAudioUrl);
      setIsPlaying(true);
    }
  };

  // Handle Volume Change
  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setCardData(prev => ({ ...prev, musicVolume: vol }));
    if (!isMuted) {
      shehnaiAudioEngine.setVolume(vol);
    }
  };

  // Handle Mute
  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      shehnaiAudioEngine.setVolume(cardData.musicVolume || 0.7);
    } else {
      setIsMuted(true);
      shehnaiAudioEngine.setVolume(0);
    }
  };

  // Handle Track Selection
  const handleSelectTrack = (trackId) => {
    setCardData(prev => ({ ...prev, musicTrackId: trackId }));
    if (isPlaying) {
      shehnaiAudioEngine.play(trackId, cardData.customAudioUrl);
    }
  };

  // If user disabled music completely in settings, hide the player
  if (cardData.enableMusic === false) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none font-sans no-print">
      {/* Expanded Control Box */}
      {isExpanded ? (
        <div className="bg-gradient-to-br from-stone-900 via-red-950 to-stone-900 border-2 border-amber-500/80 rounded-2xl shadow-2xl p-4 w-80 text-amber-100 backdrop-blur-md animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-amber-500/30">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-300 text-xs border border-amber-400/40">
                🎷
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-200 tracking-wide">
                  ॥ मंगल शहनाई संगीत ॥
                </h4>
                <p className="text-[10px] text-amber-300/70">पारम्परिक वैवाहिक धुन</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="p-1 text-amber-400 hover:text-white rounded-lg hover:bg-white/10 transition"
              title="छोटा करें"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Current Track Banner */}
          <div className="mt-3 p-2.5 rounded-xl bg-black/40 border border-amber-500/20 flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-sm">{currentTrack.icon}</span>
                <span className="text-xs font-bold text-white truncate block">
                  {currentTrack.name}
                </span>
              </div>
              <span className="text-[10px] text-amber-300/60 block truncate mt-0.5">
                {currentTrack.subtitle}
              </span>
            </div>

            {/* Live Equalizer Animation */}
            <div className="flex items-end gap-1 h-6 px-1 flex-shrink-0">
              {visualBars.map((height, i) => (
                <div
                  key={i}
                  className="w-1 bg-amber-400 rounded-full transition-all duration-100"
                  style={{
                    height: `${height}%`,
                    opacity: isPlaying ? 0.9 : 0.3
                  }}
                />
              ))}
            </div>
          </div>

          {/* Track Selector Dropdown */}
          <div className="mt-3">
            <label className="text-[10px] font-semibold text-amber-300/80 mb-1 block">
              धुन का चयन करें:
            </label>
            <select
              value={cardData.musicTrackId}
              onChange={(e) => handleSelectTrack(e.target.value)}
              className="w-full bg-stone-900/90 border border-amber-500/40 text-xs text-amber-100 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-amber-400"
            >
              {MUSIC_TRACK_PRESETS.map((t) => (
                <option key={t.id} value={t.id} className="bg-stone-900 text-amber-100">
                  {t.icon} {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Controls: Play, Volume, Mute */}
          <div className="mt-4 flex items-center justify-between gap-3">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition shadow-lg ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-400 text-red-950 shadow-amber-500/30 ring-2 ring-amber-400'
                  : 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-red-900/40'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>संगीत रोकें</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>शहनाई बजाएं</span>
                </>
              )}
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-1.5 bg-black/30 px-2 py-1.5 rounded-lg border border-amber-500/20">
              <button
                type="button"
                onClick={handleToggleMute}
                className="text-amber-300 hover:text-white transition"
                title={isMuted ? 'अनम्यूट' : 'म्यूट'}
              >
                {isMuted || cardData.musicVolume === 0 ? (
                  <VolumeX className="w-4 h-4 text-red-400" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : (cardData.musicVolume || 0.7)}
                onChange={handleVolumeChange}
                className="w-16 h-1.5 accent-amber-400 bg-stone-700 rounded-lg cursor-pointer"
                title={`वॉल्यूम: ${Math.round((cardData.musicVolume || 0.7) * 100)}%`}
              />
            </div>
          </div>

          {/* Footer Quick Action: Open Digital Card */}
          {onOpenDigitalInvite && (
            <button
              type="button"
              onClick={() => {
                setIsExpanded(false);
                onOpenDigitalInvite();
              }}
              className="mt-3 w-full py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>डिजिटल कार्ड व पुष्प वर्षा देखें</span>
            </button>
          )}
        </div>
      ) : (
        /* Collapsed Floating Widget */
        <div className="flex items-center gap-2">
          {/* Main Round Spinning Gold Vinyl Disc Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            className="group relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
            title={isPlaying ? 'मंगल शहनाई रोकें' : 'मंगल शहनाई संगीत बजाएं'}
            style={{
              background: 'radial-gradient(circle, #2b0000 0%, #150000 100%)',
              border: '2.5px solid #d4af37',
              boxShadow: isPlaying
                ? '0 0 20px rgba(212, 175, 55, 0.6), inset 0 0 10px rgba(212, 175, 55, 0.4)'
                : '0 4px 12px rgba(0, 0, 0, 0.4)'
            }}
          >
            {/* Concentric Vinyl Grooves */}
            <div
              className={`absolute inset-1 rounded-full border border-amber-500/30 ${
                isPlaying ? 'animate-[spin_6s_linear_infinite]' : ''
              }`}
            >
              <div className="absolute inset-1.5 rounded-full border border-amber-400/20" />
              <div className="absolute inset-3 rounded-full border border-amber-300/15" />
            </div>

            {/* Center Auspicious Kalash / Shehnai Badge */}
            <div className="relative z-10 w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-red-950 shadow-md">
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </div>

            {/* Auspicious Pulsing Ring when playing */}
            {isPlaying && (
              <span className="absolute -inset-1 rounded-full border-2 border-amber-400/60 animate-ping pointer-events-none" />
            )}
          </button>

          {/* Quick Expand Pill */}
          <div
            onClick={() => setIsExpanded(true)}
            className="cursor-pointer bg-red-950/90 hover:bg-red-900 text-amber-200 border border-amber-500/50 shadow-lg px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-md transition hover:scale-102"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs">🎷</span>
              <span className="text-xs font-bold text-white">
                {isPlaying ? 'शहनाई चालू' : 'मंगल संगीत'}
              </span>
            </div>

            {/* Mini equalizer */}
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-3.5">
                <span className="w-0.5 bg-amber-400 h-full animate-pulse" />
                <span className="w-0.5 bg-amber-300 h-2/3 animate-pulse delay-75" />
                <span className="w-0.5 bg-amber-400 h-4/5 animate-pulse delay-150" />
              </div>
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
