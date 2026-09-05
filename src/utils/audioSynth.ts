// Background music for the hero: a single looped instrumental track.
//
// Two behaviours beyond simple play/pause:
//   1. Autoplay is attempted on load and, when the browser refuses (which it
//      almost always will, and always on iOS), armed to start on the
//      visitor's first tap or keypress instead.
//   2. Playback suspends whenever the tab is hidden or the window minimised,
//      and resumes when the visitor comes back.

const TRACK = `${import.meta.env.BASE_URL}assets/tere_bina_instrumental.mp3`;
const TARGET_VOLUME = 0.28;
const FADE_MS = 2500;

// Scroll and wheel events do NOT satisfy the autoplay gesture requirement in
// Chrome. Only pointer, touch and key events do.
const GESTURE_EVENTS = ['pointerdown', 'touchend', 'keydown'] as const;

class BackgroundMusic {
  private el: HTMLAudioElement | null = null;
  private fadeTimer: number | null = null;
  private listeners = new Set<(playing: boolean) => void>();

  /** Whether the visitor wants music. Stays true while suspended by hiding. */
  private playing = false;
  /** Suspended because the tab went away, as opposed to being muted. */
  private pausedByVisibility = false;

  private armed = false;
  private disarm: (() => void) | null = null;

  // ---------------------------------------------------------------- element

  private ensureElement(): HTMLAudioElement {
    if (!this.el) {
      const el = new Audio(TRACK);
      el.loop = true;
      el.preload = 'auto'; // ready the moment a gesture lands
      el.volume = 0;
      this.el = el;
    }
    return this.el;
  }

  // ------------------------------------------------------------ subscribers

  public subscribe(fn: (playing: boolean) => void) {
    this.listeners.add(fn);
    fn(this.playing); // sync the caller immediately
    return () => {
      this.listeners.delete(fn);
    };
  }

  private emit() {
    this.listeners.forEach((fn) => fn(this.playing));
  }

  // ------------------------------------------------------------------ fades

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

  // -------------------------------------------------------- play / stop

  private attemptPlay(): Promise<void> {
    return this.ensureElement()
      .play()
      .then(() => {
        this.playing = true;
        this.fadeTo(TARGET_VOLUME);
        this.emit();
      });
  }

  public start() {
    this.cancelArm();
    this.attemptPlay().catch(() => {
      this.playing = false;
      this.emit();
    });
  }

  public stop() {
    this.cancelArm();
    this.pausedByVisibility = false;
    this.playing = false;
    this.emit();
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

  // --------------------------------------------------------------- autoplay

  private cancelArm() {
    this.disarm?.();
    this.disarm = null;
  }

  /**
   * Start now if allowed; otherwise start on the first genuine interaction.
   * Safe to call more than once — only the first call does anything.
   */
  public armAutoplay() {
    if (this.armed) return;
    this.armed = true;

    this.attemptPlay().catch(() => {
      const onFirstGesture = () => {
        this.cancelArm();
        this.start();
      };

      this.disarm = () => {
        GESTURE_EVENTS.forEach((e) =>
          window.removeEventListener(e, onFirstGesture)
        );
      };

      GESTURE_EVENTS.forEach((e) =>
        window.addEventListener(e, onFirstGesture, { passive: true })
      );
    });
  }

  // ------------------------------------------------------------- visibility

  /**
   * Pause hard when the tab is hidden rather than fading — background timers
   * are throttled to about once a second, so a fade would stall part-way and
   * leave the track audible. Returns an unsubscribe function.
   */
  public watchVisibility() {
    const onChange = () => {
      if (document.hidden) {
        if (this.playing && this.el && !this.el.paused) {
          this.clearFade();
          this.el.pause();
          this.el.volume = 0; // so the return fade starts from silence
          this.pausedByVisibility = true;
        }
        return;
      }

      if (!this.pausedByVisibility) return;
      this.pausedByVisibility = false;
      if (this.playing) {
        this.attemptPlay().catch(() => {
          this.playing = false;
          this.emit();
        });
      }
    };

    document.addEventListener('visibilitychange', onChange);
    return () => document.removeEventListener('visibilitychange', onChange);
  }

  /** Retired with the temple bells; kept so any stray call is harmless. */
  public ringTempleBell(_baseFreq?: number) {}
}

export const templeAudio = new BackgroundMusic();
