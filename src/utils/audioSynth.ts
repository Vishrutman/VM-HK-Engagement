// Background music: a single looped instrumental track with gentle fades.

const TRACK = `${import.meta.env.BASE_URL}assets/tere_bina_instrumental.mp3`;
const TARGET_VOLUME = 0.28;
const FADE_MS = 1200;

class BackgroundMusic {
  private el: HTMLAudioElement | null = null;
  private fadeTimer: number | null = null;
  private playing = false;

  private ensureElement(): HTMLAudioElement {
    if (!this.el) {
      const el = new Audio(TRACK);
      el.loop = true;
      el.preload = 'none'; // don't spend a visitor's data until they ask for it
      el.volume = 0;
      this.el = el;
    }
    return this.el;
  }

  private clearFade() {
    if (this.fadeTimer !== null) {
      clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }
  }

  private fadeTo(target: number, onDone?: () => void) {
    const el = this.ensureElement();
    this.clearFade();
    const start = el.volume;
    const startedAt = performance.now();

    this.fadeTimer = window.setInterval(() => {
      const t = Math.min(1, (performance.now() - startedAt) / FADE_MS);
      el.volume = start + (target - start) * t;
      if (t >= 1) {
        this.clearFade();
        onDone?.();
      }
    }, 40);
  }

  public start() {
    const el = this.ensureElement();
    this.playing = true;
    el.play()
      .then(() => this.fadeTo(TARGET_VOLUME))
      .catch(() => {
        // Autoplay policy or a missing file — fail silently, stay muted.
        this.playing = false;
      });
  }

  public stop() {
    this.playing = false;
    if (!this.el) return;
    const el = this.el;
    this.fadeTo(0, () => el.pause());
  }

  public toggle(): boolean {
    if (this.playing) {
      this.stop();
      return false;
    }
    this.start();
    return true;
  }

  public getIsPlaying(): boolean {
    return this.playing;
  }

  /** Retired with the temple bells; kept so any stray call is harmless. */
  public ringTempleBell(_baseFreq?: number) {}
}

export const templeAudio = new BackgroundMusic();
