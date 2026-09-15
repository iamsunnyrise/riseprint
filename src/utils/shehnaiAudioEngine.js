/**
 * 🎵 Shehnai & Auspicious Indian Wedding Audio Synthesizer Engine
 * 
 * Pure Web Audio API procedural synthesis:
 * - 100% Offline & Reliable (Zero external CDN, Zero CORS issues, Zero broken mp3s)
 * - Tanpura Drone (Sa-Pa-Sa harmonic shimmer)
 * - Mangal Shehnai (Double-reed bandpass harmonics, natural meend/portamento glides, vibrato)
 * - Dholak & Nagada Percussion (Resonant membrane synthesis in Kaharwa/Dadra tal)
 * - Vedic Temple Bells & Conch (Shankhnaad & Ghantanaad)
 * - Custom Audio Element support for user-uploaded MP3 files
 * - Web Audio AnalyserNode for real-time visualizer waveform bars
 */

class ShehnaiAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.masterGain = null;
    this.analyser = null;
    this.isPlaying = false;
    this.currentTrackId = null;
    this.volume = 0.7;

    // Sequence timer handles
    this.loopTimers = [];
    this.activeNodes = [];

    // Custom Audio Element for uploaded files
    this.customAudioEl = null;
    this.customSourceNode = null;
  }

  // Ensure AudioContext is initialized and active
  initContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        console.warn('Web Audio API not supported in this browser.');
        return false;
      }
      this.audioCtx = new AudioContextClass();

      // Analyser for real-time waveform bars
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      // Master Gain
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
    }

    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }

    return true;
  }

  /**
   * Set Master Volume (0.0 to 1.0)
   */
  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.audioCtx.currentTime, 0.05);
    }
    if (this.customAudioEl) {
      this.customAudioEl.volume = this.volume;
    }
  }

  /**
   * Get Real-time Audio Frequency Data for Equalizer / Spinning Disk Visualizer
   */
  getVisualizerData() {
    if (!this.analyser || !this.isPlaying) {
      return new Uint8Array(16).fill(0);
    }
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray.slice(0, 16);
  }

  /**
   * Stop all playback and clear timers
   */
  stop() {
    this.isPlaying = false;

    // Clear all loops & intervals
    this.loopTimers.forEach(id => clearTimeout(id));
    this.loopTimers = [];

    // Stop active audio nodes
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {
        // already stopped
      }
    });
    this.activeNodes = [];

    // Stop custom audio if playing
    if (this.customAudioEl) {
      this.customAudioEl.pause();
      this.customAudioEl.currentTime = 0;
    }
  }

  /**
   * Play Selected Track
   * @param {string} trackId - 'shehnai-bilawal' | 'shehnai-nagada' | 'vedic-shloka' | 'custom'
   * @param {string} [customAudioUrl] - Base64 Data URL or Blob URL
   */
  async play(trackId = 'shehnai-bilawal', customAudioUrl = null) {
    if (!this.initContext()) return;

    this.stop();
    this.currentTrackId = trackId;
    this.isPlaying = true;

    if (trackId === 'custom' && customAudioUrl) {
      this.playCustomAudio(customAudioUrl);
      return;
    }

    switch (trackId) {
      case 'shehnai-nagada':
        this.startTanpuraDrone();
        this.startShehnaiMelody(true); // with nagada percussion
        this.startNagadaPercussion();
        break;

      case 'vedic-shloka':
        this.startVedicAmbient();
        break;

      case 'shehnai-bilawal':
      default:
        this.startTanpuraDrone();
        this.startShehnaiMelody(false);
        break;
    }
  }

  /**
   * 1. 🪕 TANPURA DRONE (तानपूरा श्रुति स्वर)
   * Authentic Sa-Pa-Sa rich drone tuned to D3 (approx 146.83 Hz)
   */
  startTanpuraDrone() {
    if (!this.audioCtx || !this.isPlaying) return;

    const baseFreq = 146.83; // D3 Sa
    const strings = [
      { freq: baseFreq * 1.5, detune: -4, gain: 0.12 }, // Pa (A3 ~ 220Hz)
      { freq: baseFreq * 2.0, detune: 2, gain: 0.08 },  // High Sa (D4 ~ 293.66Hz)
      { freq: baseFreq * 2.0, detune: -2, gain: 0.08 }, // Second High Sa (shimmer)
      { freq: baseFreq, detune: 0, gain: 0.16 }          // Kharaj Sa (D3 ~ 146.83Hz)
    ];

    strings.forEach(s => {
      const osc = this.audioCtx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(s.freq, this.audioCtx.currentTime);
      osc.detune.setValueAtTime(s.detune, this.audioCtx.currentTime);

      // Warm low-pass filter to sound like gourds and wooden resonance
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, this.audioCtx.currentTime);
      filter.Q.setValueAtTime(1.5, this.audioCtx.currentTime);

      // Subtle LFO modulation for breathing acoustic presence
      const lfo = this.audioCtx.createOscillator();
      lfo.frequency.setValueAtTime(0.25, this.audioCtx.currentTime);
      const lfoGain = this.audioCtx.createGain();
      lfoGain.gain.setValueAtTime(s.gain * 0.25, this.audioCtx.currentTime);
      lfo.connect(lfoGain);

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(s.gain * 0.7, this.audioCtx.currentTime);
      lfoGain.connect(gain.gain);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      lfo.start();

      this.activeNodes.push(osc, lfo, gain, filter);
    });
  }

  /**
   * 2. 🎷 MANGAL SHEHNAI MELODY (उस्ताद बिस्मिल्लाह खां शैली मंगल शहनाई)
   * Synthesizes double-reed acoustics with bandpass resonance, portamento glide & vibrato
   */
  startShehnaiMelody(withNagada = false) {
    if (!this.audioCtx || !this.isPlaying) return;

    // Frequencies for D-based Bilawal / Kalyan wedding scale
    // Sa=293.66, Re=329.63, Ga=369.99, Ma=392.00, Pa=440.00, Dha=493.88, Ni=554.37, HighSa=587.33
    const NOTES = {
      PA_LOW: 220.00,
      DHA_LOW: 246.94,
      NI_LOW: 277.18,
      SA: 293.66,
      RE: 329.63,
      GA: 369.99,
      MA: 392.00,
      PA: 440.00,
      DHA: 493.88,
      NI: 554.37,
      SA_HIGH: 587.33,
      RE_HIGH: 659.25,
      GA_HIGH: 739.99,
      PA_HIGH: 880.00
    };

    // Authentic Traditional Indian Wedding Shehnai Composition
    const weddingMelody = [
      // Alap / Auspicious Opening
      { note: NOTES.SA, duration: 1.2, glide: 0.15, gain: 0.22 },
      { note: NOTES.RE, duration: 0.8, glide: 0.2, gain: 0.24 },
      { note: NOTES.GA, duration: 1.4, glide: 0.25, gain: 0.28 },
      { note: NOTES.PA, duration: 1.8, glide: 0.3, gain: 0.30 },
      { note: NOTES.MA, duration: 0.6, glide: 0.15, gain: 0.25 },
      { note: NOTES.GA, duration: 1.0, glide: 0.2, gain: 0.26 },
      { note: NOTES.RE, duration: 0.8, glide: 0.15, gain: 0.24 },
      { note: NOTES.SA, duration: 2.0, glide: 0.3, gain: 0.22 },

      // Wedding Swasti Flourish (दूल्हा-दुल्हन स्वागत धुन)
      { note: NOTES.PA, duration: 0.6, glide: 0.1, gain: 0.28 },
      { note: NOTES.DHA, duration: 0.6, glide: 0.1, gain: 0.28 },
      { note: NOTES.SA_HIGH, duration: 1.5, glide: 0.25, gain: 0.32 },
      { note: NOTES.NI, duration: 0.5, glide: 0.1, gain: 0.28 },
      { note: NOTES.DHA, duration: 0.6, glide: 0.15, gain: 0.26 },
      { note: NOTES.PA, duration: 1.4, glide: 0.2, gain: 0.30 },

      // Celebratory Taan (फेरे व वरमाला बेला)
      { note: NOTES.GA, duration: 0.4, glide: 0.08, gain: 0.26 },
      { note: NOTES.MA, duration: 0.4, glide: 0.08, gain: 0.26 },
      { note: NOTES.PA, duration: 0.5, glide: 0.08, gain: 0.28 },
      { note: NOTES.DHA, duration: 0.5, glide: 0.08, gain: 0.28 },
      { note: NOTES.SA_HIGH, duration: 1.2, glide: 0.2, gain: 0.32 },
      { note: NOTES.RE_HIGH, duration: 0.8, glide: 0.15, gain: 0.30 },
      { note: NOTES.SA_HIGH, duration: 2.2, glide: 0.35, gain: 0.32 },

      // Peaceful resolution
      { note: NOTES.DHA, duration: 0.6, glide: 0.15, gain: 0.26 },
      { note: NOTES.PA, duration: 0.8, glide: 0.2, gain: 0.25 },
      { note: NOTES.GA, duration: 0.9, glide: 0.2, gain: 0.24 },
      { note: NOTES.RE, duration: 0.9, glide: 0.2, gain: 0.22 },
      { note: NOTES.SA, duration: 2.8, glide: 0.4, gain: 0.22 }
    ];

    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      const item = weddingMelody[noteIndex];
      const now = this.audioCtx.currentTime;

      // Double-reed Oscillator 1 (Sawtooth - reed buzz)
      const reedOsc1 = this.audioCtx.createOscillator();
      reedOsc1.type = 'sawtooth';
      reedOsc1.frequency.setValueAtTime(item.note, now);

      // Double-reed Oscillator 2 (Triangle - body warmth, slightly detuned +5 cents)
      const reedOsc2 = this.audioCtx.createOscillator();
      reedOsc2.type = 'triangle';
      reedOsc2.frequency.setValueAtTime(item.note * 1.002, now);

      // Shehnai Bell Horn Formant Filter (Bandpass resonance around 1750 Hz)
      const hornFilter = this.audioCtx.createBiquadFilter();
      hornFilter.type = 'bandpass';
      hornFilter.frequency.setValueAtTime(1750, now);
      hornFilter.Q.setValueAtTime(3.2, now);

      // High-frequency warmth lowpass
      const warmthFilter = this.audioCtx.createBiquadFilter();
      warmthFilter.type = 'lowpass';
      warmthFilter.frequency.setValueAtTime(3600, now);

      // Vibrato LFO (Traditional Indian Gamak / Meend vibrato at 5.5 Hz)
      const vibrato = this.audioCtx.createOscillator();
      vibrato.frequency.setValueAtTime(5.4, now);
      const vibratoGain = this.audioCtx.createGain();
      vibratoGain.gain.setValueAtTime(item.note * 0.02, now);
      vibrato.connect(vibratoGain);
      vibratoGain.connect(reedOsc1.frequency);
      vibratoGain.connect(reedOsc2.frequency);

      // Articulation Envelope (Smooth attack & expressive release)
      const noteGain = this.audioCtx.createGain();
      const attackTime = Math.min(0.18, item.duration * 0.25);
      const releaseTime = Math.min(0.35, item.duration * 0.35);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(item.gain, now + attackTime);
      noteGain.gain.setValueAtTime(item.gain, now + item.duration - releaseTime);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + item.duration);

      // Wire up
      reedOsc1.connect(hornFilter);
      reedOsc2.connect(hornFilter);
      hornFilter.connect(warmthFilter);
      warmthFilter.connect(noteGain);
      noteGain.connect(this.masterGain);

      reedOsc1.start(now);
      reedOsc2.start(now);
      vibrato.start(now);

      const stopTime = now + item.duration + 0.05;
      reedOsc1.stop(stopTime);
      reedOsc2.stop(stopTime);
      vibrato.stop(stopTime);

      noteIndex = (noteIndex + 1) % weddingMelody.length;

      const timerId = setTimeout(playNextNote, item.duration * 1000);
      this.loopTimers.push(timerId);
    };

    playNextNote();
  }

  /**
   * 3. 🥁 NAGADA & DHOLAK PERCUSSION (उत्सव नगाड़ा व ढोलक की मांगलिक थाप)
   * Synthesizes resonant membrane percussion in rhythmic wedding cycle
   */
  startNagadaPercussion() {
    if (!this.audioCtx || !this.isPlaying) return;

    // 8-step Kaharwa rhythm pattern
    const rhythmPattern = [
      { type: 'dha', gain: 0.32 },
      { type: 'ge', gain: 0.24 },
      { type: 'na', gain: 0.20 },
      { type: 'ti', gain: 0.14 },
      { type: 'na', gain: 0.22 },
      { type: 'ka', gain: 0.14 },
      { type: 'dhi', gain: 0.28 },
      { type: 'na', gain: 0.24 }
    ];

    let beat = 0;
    const stepInterval = 280; // ~107 BPM wedding tempo

    const playBeat = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      const current = rhythmPattern[beat];
      const now = this.audioCtx.currentTime;

      if (current.type === 'dha' || current.type === 'ge' || current.type === 'dhi') {
        // Deep resonant bass drum (Dhama / Bayan)
        const bassOsc = this.audioCtx.createOscillator();
        bassOsc.type = 'sine';
        const startPitch = current.type === 'dha' ? 145 : 125;
        bassOsc.frequency.setValueAtTime(startPitch, now);
        bassOsc.frequency.exponentialRampToValueAtTime(52, now + 0.18);

        const bassGain = this.audioCtx.createGain();
        bassGain.gain.setValueAtTime(current.gain * 0.9, now);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);

        bassOsc.connect(bassGain);
        bassGain.connect(this.masterGain);

        bassOsc.start(now);
        bassOsc.stop(now + 0.35);
      }

      if (current.type === 'dha' || current.type === 'na' || current.type === 'ti' || current.type === 'ka') {
        // Crisp treble rim / skin slap (Dayan / Tasha)
        const trebleOsc = this.audioCtx.createOscillator();
        trebleOsc.type = 'triangle';
        trebleOsc.frequency.setValueAtTime(current.type === 'ti' ? 950 : 780, now);
        trebleOsc.frequency.exponentialRampToValueAtTime(320, now + 0.08);

        const trebleGain = this.audioCtx.createGain();
        trebleGain.gain.setValueAtTime(current.gain * 0.45, now);
        trebleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        trebleOsc.connect(trebleGain);
        trebleGain.connect(this.masterGain);

        trebleOsc.start(now);
        trebleOsc.stop(now + 0.15);
      }

      beat = (beat + 1) % rhythmPattern.length;

      const timerId = setTimeout(playBeat, stepInterval);
      this.loopTimers.push(timerId);
    };

    const initTimer = setTimeout(playBeat, 1400);
    this.loopTimers.push(initTimer);
  }

  /**
   * 4. 🔔 VEDIC SWASTIVACHAN & TEMPLE BELLS (वैदिक स्वस्तिवाचन व मंदिर घंटानाद)
   * Ambient temple bells, Shankhnaad resonance, and sacred Om drone
   */
  startVedicAmbient() {
    if (!this.audioCtx || !this.isPlaying) return;

    // Sacred Om / Tanpura base drone (108 Hz)
    const droneOsc = this.audioCtx.createOscillator();
    droneOsc.type = 'sawtooth';
    droneOsc.frequency.setValueAtTime(108, this.audioCtx.currentTime);

    const droneFilter = this.audioCtx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(380, this.audioCtx.currentTime);

    const droneGain = this.audioCtx.createGain();
    droneGain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);

    droneOsc.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.masterGain);

    droneOsc.start();
    this.activeNodes.push(droneOsc, droneGain, droneFilter);

    // Periodic Auspicious Temple Bell (घंटानाद)
    const playTempleBell = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const partials = [
        { f: 880, gain: 0.15 },
        { f: 1760, gain: 0.10 },
        { f: 2420, gain: 0.08 },
        { f: 3100, gain: 0.05 }
      ];

      partials.forEach(p => {
        const osc = this.audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(p.f, now);

        const gain = this.audioCtx.createGain();
        gain.gain.setValueAtTime(p.gain, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + 3.3);
      });

      const nextTime = 4000 + Math.random() * 3000;
      const timerId = setTimeout(playTempleBell, nextTime);
      this.loopTimers.push(timerId);
    };

    // Conch Shell (शंखनाद) swell
    const playConchSwell = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const conchOsc = this.audioCtx.createOscillator();
      conchOsc.type = 'sawtooth';
      conchOsc.frequency.setValueAtTime(260, now);
      conchOsc.frequency.linearRampToValueAtTime(310, now + 2.5);
      conchOsc.frequency.linearRampToValueAtTime(290, now + 5.0);

      const conchFilter = this.audioCtx.createBiquadFilter();
      conchFilter.type = 'bandpass';
      conchFilter.frequency.setValueAtTime(850, now);
      conchFilter.Q.setValueAtTime(4.0, now);

      const conchGain = this.audioCtx.createGain();
      conchGain.gain.setValueAtTime(0.001, now);
      conchGain.gain.linearRampToValueAtTime(0.20, now + 1.8);
      conchGain.gain.linearRampToValueAtTime(0.001, now + 5.2);

      conchOsc.connect(conchFilter);
      conchFilter.connect(conchGain);
      conchGain.connect(this.masterGain);

      conchOsc.start(now);
      conchOsc.stop(now + 5.3);

      const timerId = setTimeout(playConchSwell, 16000);
      this.loopTimers.push(timerId);
    };

    playTempleBell();
    playConchSwell();
  }

  /**
   * 5. 📤 USER CUSTOM AUDIO
   */
  playCustomAudio(url) {
    if (!this.customAudioEl) {
      this.customAudioEl = new Audio();
      this.customAudioEl.loop = true;
      this.customAudioEl.crossOrigin = 'anonymous';

      try {
        if (this.audioCtx) {
          this.customSourceNode = this.audioCtx.createMediaElementSource(this.customAudioEl);
          this.customSourceNode.connect(this.masterGain);
        }
      } catch (e) {
        console.warn('MediaElementSource fallback', e);
      }
    }

    this.customAudioEl.src = url;
    this.customAudioEl.volume = this.volume;
    this.customAudioEl.play().catch(err => {
      console.warn('Audio playback error:', err);
    });
  }
}

// Global Singleton Instance for app-wide state
export const shehnaiAudioEngine = new ShehnaiAudioEngine();
