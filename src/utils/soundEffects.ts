// Web Audio API-based subtle sound effects system for the immersive cybersecurity simulation
// Zero external file dependencies - synthesizes high-fidelity audio procedurally

class SoundEffectManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGainNode: GainNode | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with browser autoplay policies
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        try {
          this.ctx = new AudioCtxClass();
          this.masterGainNode = this.ctx.createGain();
          this.masterGainNode.gain.setValueAtTime(0.28, this.ctx.currentTime); // Gentle, subtle baseline
          this.masterGainNode.connect(this.ctx.destination);
        } catch (e) {
          console.warn('Web Audio API not supported or blocked:', e);
        }
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {
        // Ignored if user hasn't interacted yet
      });
    }

    return this.ctx;
  }

  public setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (this.masterGainNode && this.ctx) {
      this.masterGainNode.gain.setValueAtTime(muted ? 0 : 0.28, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  /**
   * 1. 'message received' Sound:
   * A modern, crisp, authentic smartphone notification chime (two harmonized rising glass pings)
   */
  public playMessageReceived(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGainNode) return;

    try {
      const now = ctx.currentTime;

      // Note 1: E5 (659.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(659.25, now);

      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.35, now + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc1.connect(gain1);
      gain1.connect(this.masterGainNode);

      osc1.start(now);
      osc1.stop(now + 0.36);

      // Note 2: A5 (880.00 Hz) - staggered slightly
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880.0, now + 0.09);

      // Add high overtone sparkle for realism
      const oscSparkle = ctx.createOscillator();
      const gainSparkle = ctx.createGain();
      oscSparkle.type = 'triangle';
      oscSparkle.frequency.setValueAtTime(1760.0, now + 0.09);

      gain2.gain.setValueAtTime(0, now + 0.09);
      gain2.gain.linearRampToValueAtTime(0.4, now + 0.11);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      gainSparkle.gain.setValueAtTime(0, now + 0.09);
      gainSparkle.gain.linearRampToValueAtTime(0.08, now + 0.11);
      gainSparkle.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc2.connect(gain2);
      oscSparkle.connect(gainSparkle);
      gain2.connect(this.masterGainNode);
      gainSparkle.connect(this.masterGainNode);

      osc2.start(now + 0.09);
      osc2.stop(now + 0.66);
      oscSparkle.start(now + 0.09);
      oscSparkle.stop(now + 0.46);
    } catch (err) {
      console.warn('Error playing message sound:', err);
    }
  }

  /**
   * 2. 'tapping the link' Sound:
   * A tactile, crisp glass-tap click with subtle low-end resonance and pitch-decay
   */
  public playTapLink(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGainNode) return;

    try {
      const now = ctx.currentTime;

      // Click transient (high-to-low fast frequency sweep)
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2800, now);
      filter.Q.setValueAtTime(1.2, now);

      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(1400, now);
      clickOsc.frequency.exponentialRampToValueAtTime(240, now + 0.045);

      clickGain.gain.setValueAtTime(0.5, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      clickOsc.connect(filter);
      filter.connect(clickGain);
      clickGain.connect(this.masterGainNode);

      clickOsc.start(now);
      clickOsc.stop(now + 0.05);

      // Subtle body thud for tactile realism
      const thudOsc = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thudOsc.type = 'sine';
      thudOsc.frequency.setValueAtTime(220, now);
      thudOsc.frequency.exponentialRampToValueAtTime(60, now + 0.035);

      thudGain.gain.setValueAtTime(0.35, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      thudOsc.connect(thudGain);
      thudGain.connect(this.masterGainNode);

      thudOsc.start(now);
      thudOsc.stop(now + 0.04);
    } catch (err) {
      console.warn('Error playing tap sound:', err);
    }
  }

  /**
   * 3. 'consequence event' Sound:
   * A heavy, ominous descending bass impact swell + dissonant alert harmonic,
   * signaling the severe psychological and financial shock of account compromise
   */
  public playConsequenceEvent(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGainNode) return;

    try {
      const now = ctx.currentTime;

      // Heavy sub-bass impact
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(160, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 1.2);

      subGain.gain.setValueAtTime(0.7, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);

      subOsc.connect(subGain);
      subGain.connect(this.masterGainNode);

      subOsc.start(now);
      subOsc.stop(now + 1.45);

      // Dissonant minor-second tension chord for psychological compromise
      const discord1 = ctx.createOscillator();
      const discord2 = ctx.createOscillator();
      const discordGain = ctx.createGain();
      const lowpass = ctx.createBiquadFilter();

      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(800, now);
      lowpass.frequency.exponentialRampToValueAtTime(200, now + 1.5);

      discord1.type = 'sawtooth';
      discord2.type = 'sawtooth';
      discord1.frequency.setValueAtTime(220.0, now); // A3
      discord2.frequency.setValueAtTime(233.08, now); // Bb3 (dissonant semitone)

      discordGain.gain.setValueAtTime(0.22, now);
      discordGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      discord1.connect(lowpass);
      discord2.connect(lowpass);
      lowpass.connect(discordGain);
      discordGain.connect(this.masterGainNode);

      discord1.start(now);
      discord2.start(now);
      discord1.stop(now + 1.5);
      discord2.stop(now + 1.5);
    } catch (err) {
      console.warn('Error playing consequence event sound:', err);
    }
  }

  /**
   * 4. Haptic Buzz / Screen Shake Vibration:
   * A mechanical dual-pulse vibration hum simulating a smartphone vibrating against a desk
   */
  public playHapticTremor(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGainNode) return;

    try {
      const now = ctx.currentTime;

      // Pulse 1
      const vib1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      vib1.type = 'square';
      vib1.frequency.setValueAtTime(130, now);

      const filter1 = ctx.createBiquadFilter();
      filter1.type = 'lowpass';
      filter1.frequency.setValueAtTime(240, now);

      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      vib1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(this.masterGainNode);

      vib1.start(now);
      vib1.stop(now + 0.15);

      // Pulse 2 (staggered slightly)
      const vib2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      vib2.type = 'square';
      vib2.frequency.setValueAtTime(135, now + 0.18);

      const filter2 = ctx.createBiquadFilter();
      filter2.type = 'lowpass';
      filter2.frequency.setValueAtTime(240, now + 0.18);

      gain2.gain.setValueAtTime(0.22, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.36);

      vib2.connect(filter2);
      filter2.connect(gain2);
      gain2.connect(this.masterGainNode);

      vib2.start(now + 0.18);
      vib2.stop(now + 0.38);
    } catch (err) {
      console.warn('Error playing haptic tremor sound:', err);
    }
  }

  /**
   * 5. Financial Balance Counter Drain & Cash Sound:
   * Authentic cash register sound and metallic coin drops with descending pitch as money decreases
   */
  public playMoneyDecreasing(fractionRemaining: number = 0.5): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGainNode) return;

    try {
      const now = ctx.currentTime;

      // 1. Descending drain tone (pitch drops as wallet empties from ~1000Hz down to ~220Hz)
      const pitchOsc = ctx.createOscillator();
      const pitchGain = ctx.createGain();
      const startFreq = Math.max(220, 220 + fractionRemaining * 780);
      const endFreq = Math.max(120, startFreq * 0.72);

      pitchOsc.type = 'sine';
      pitchOsc.frequency.setValueAtTime(startFreq, now);
      pitchOsc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.11);

      pitchGain.gain.setValueAtTime(0.18, now);
      pitchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      pitchOsc.connect(pitchGain);
      pitchGain.connect(this.masterGainNode);

      pitchOsc.start(now);
      pitchOsc.stop(now + 0.13);

      // 2. Metallic coin clink 1 (crisp high coin resonance)
      const coinOsc1 = ctx.createOscillator();
      const coinGain1 = ctx.createGain();
      coinOsc1.type = 'triangle';
      coinOsc1.frequency.setValueAtTime(2480, now);
      coinOsc1.frequency.exponentialRampToValueAtTime(1950, now + 0.08);

      coinGain1.gain.setValueAtTime(0.24, now);
      coinGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      coinOsc1.connect(coinGain1);
      coinGain1.connect(this.masterGainNode);

      coinOsc1.start(now);
      coinOsc1.stop(now + 0.09);

      // 3. Metallic coin clink 2 (harmonic overtone)
      const coinOsc2 = ctx.createOscillator();
      const coinGain2 = ctx.createGain();
      coinOsc2.type = 'sine';
      coinOsc2.frequency.setValueAtTime(3520, now + 0.015);
      coinOsc2.frequency.exponentialRampToValueAtTime(2900, now + 0.07);

      coinGain2.gain.setValueAtTime(0.15, now + 0.015);
      coinGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      coinOsc2.connect(coinGain2);
      coinGain2.connect(this.masterGainNode);

      coinOsc2.start(now + 0.015);
      coinOsc2.stop(now + 0.075);

      // 4. Paper cash count flick / currency rustle
      const bufferSize = Math.floor(ctx.sampleRate * 0.04);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1400, now);
      bandpass.Q.setValueAtTime(2.0, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.12, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      whiteNoise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(this.masterGainNode);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.045);
    } catch (err) {
      // AudioContext fallback handling
    }
  }

  /**
   * Cash Register Drawer & "Cha-Ching" Drain Sound:
   * Dual bright resonant bells + metallic drawer spring release
   */
  public playCashRegisterChime(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGainNode) return;

    try {
      const now = ctx.currentTime;

      // Bell 1: E6 (1318.5 Hz)
      const bell1 = ctx.createOscillator();
      const bellGain1 = ctx.createGain();
      bell1.type = 'sine';
      bell1.frequency.setValueAtTime(1318.5, now);

      bellGain1.gain.setValueAtTime(0.35, now);
      bellGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      bell1.connect(bellGain1);
      bellGain1.connect(this.masterGainNode);
      bell1.start(now);
      bell1.stop(now + 0.46);

      // Bell 2: G#6 (1661.2 Hz) - staggered slightly for the iconic "cha-ching" dual chime
      const bell2 = ctx.createOscillator();
      const bellGain2 = ctx.createGain();
      bell2.type = 'sine';
      bell2.frequency.setValueAtTime(1661.2, now + 0.07);

      bellGain2.gain.setValueAtTime(0.4, now + 0.07);
      bellGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      bell2.connect(bellGain2);
      bellGain2.connect(this.masterGainNode);
      bell2.start(now + 0.07);
      bell2.stop(now + 0.66);

      // Metallic Drawer Clatter / Coin Rattle
      const clatterTimes = [0.03, 0.06, 0.1, 0.14];
      clatterTimes.forEach((offset, idx) => {
        const rattleOsc = ctx.createOscillator();
        const rattleGain = ctx.createGain();
        rattleOsc.type = 'triangle';
        rattleOsc.frequency.setValueAtTime(2800 + idx * 400, now + offset);

        rattleGain.gain.setValueAtTime(0.12, now + offset);
        rattleGain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.04);

        rattleOsc.connect(rattleGain);
        rattleGain.connect(this.masterGainNode);
        rattleOsc.start(now + offset);
        rattleOsc.stop(now + offset + 0.045);
      });
    } catch (err) {
      console.warn('Error playing cash register sound:', err);
    }
  }

  /**
   * Cash Empty / Drawer Slams Closed
   */
  public playCashEmpty(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGainNode) return;

    try {
      const now = ctx.currentTime;
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thud.type = 'sine';
      thud.frequency.setValueAtTime(120, now);
      thud.frequency.exponentialRampToValueAtTime(40, now + 0.25);

      thudGain.gain.setValueAtTime(0.35, now);
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      thud.connect(thudGain);
      thudGain.connect(this.masterGainNode);
      thud.start(now);
      thud.stop(now + 0.26);
    } catch (e) {
      // Ignored
    }
  }

  /**
   * Backward-compatible counter tick (now maps directly to cash decreasing)
   */
  public playCounterTick(): void {
    this.playMoneyDecreasing(0.5);
  }

  /**
   * 6. Signal Recognition / Success Chime:
   * Bright, reassuring major chord when the user pauses and spots the red flag
   */
  public playSignalRecognized(): void {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGainNode) return;

    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5

      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + index * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.22, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

        osc.connect(gain);
        gain.connect(this.masterGainNode);

        osc.start(startTime);
        osc.stop(startTime + 0.52);
      });
    } catch (err) {
      console.warn('Error playing success chime:', err);
    }
  }
}

export const soundEffects = new SoundEffectManager();
