// Auspicious Instrumental Chime & Tanpura Web Audio Synthesizer
// Produces gentle, meditative acoustic wind chimes (Raga Bhupali / Pentatonic)
// with soft attack, warm resonance, and soothing ambient tanpura drone.

class TempleAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private tanpuraInterval: number | null = null;
  private chimeInterval: number | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      // Soothing, calm master volume
      this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Plays a single soothing instrumental chime note with soft attack,
   * warm low-pass filtering, and a long resonant acoustic tail.
   */
  private playSoothingChimeNote(freq: number, startDelay = 0, gainLevel = 0.08) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + startDelay;
    const duration = 4.5;

    // Filter to remove any harsh digital highs and keep the tone warm and wooden/brass
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, now);
    filter.frequency.exponentialRampToValueAtTime(750, now + duration);

    // Warm harmonics for an acoustic, instrumental chime / vibraphone bell tone
    const partials = [
      { ratio: 1.0, gain: 0.6, decay: 4.2 },
      { ratio: 2.004, gain: 0.25, decay: 3.5 },
      { ratio: 2.76, gain: 0.08, decay: 2.2 },
      { ratio: 0.5, gain: 0.15, decay: 4.0 }, // Sub-harmonic undertone for depth
    ];

    partials.forEach(({ ratio, gain, decay }) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * ratio, now);

      // Soft rounded attack (no sharp clicks) and peaceful exponential shimmer
      oscGain.gain.setValueAtTime(0.0001, now);
      oscGain.gain.linearRampToValueAtTime(gain * gainLevel, now + 0.06);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + decay);
    });
  }

  /**
   * Auspicious, gentle cascading instrumental chime.
   * Plays a graceful arpeggio across traditional melodic notes (D5, A4, F#4, D4).
   */
  public ringTempleBell(baseFreq = 587.33) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    // Gentle cascading arpeggio in Raga Bhupali (D major pentatonic)
    // Notes: D4 (293.66), F#4 (369.99), A4 (440.0), D5 (587.33), E5 (659.25)
    const chimeArpeggio = [
      { freq: 440.0, delay: 0.0, vol: 0.08 },
      { freq: 587.33, delay: 0.14, vol: 0.09 },
      { freq: 369.99, delay: 0.32, vol: 0.06 },
    ];

    chimeArpeggio.forEach(({ freq, delay, vol }) => {
      this.playSoothingChimeNote(freq, delay, vol);
    });
  }

  // Sacred, warm Tanpura acoustic string resonance (Sa - Pa - Sa)
  private playTanpuraPluck(freq: number, duration = 4.8) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Warm, deep low-pass for a soothing string resonance
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 2.8, now);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.2, now + duration);

    // Gentle pluck envelope
    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.linearRampToValueAtTime(0.065, now + 0.12);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration);
  }

  public startAtmosphere() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Auspicious soothing scale in D (Pa, Sa, Sa, Mandra Sa)
    const notes = [220, 293.66, 293.66, 146.83];
    let noteIdx = 0;

    // Leisurely, peaceful Tanpura cycle
    this.tanpuraInterval = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.playTanpuraPluck(notes[noteIdx % notes.length], 5.0);
      noteIdx++;
    }, 2200);

    // Initial soft greeting chime
    this.ringTempleBell();

    // Occasional gentle breeze chime every 18-22 seconds
    this.chimeInterval = window.setInterval(() => {
      if (!this.isPlaying) return;
      this.ringTempleBell();
    }, 19000);
  }

  public stopAtmosphere() {
    this.isPlaying = false;
    if (this.tanpuraInterval) {
      clearInterval(this.tanpuraInterval);
      this.tanpuraInterval = null;
    }
    if (this.chimeInterval) {
      clearInterval(this.chimeInterval);
      this.chimeInterval = null;
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stopAtmosphere();
      return false;
    } else {
      this.startAtmosphere();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const templeAudio = new TempleAudioEngine();
