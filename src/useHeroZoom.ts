import { useEffect, useState } from 'react';

/**
 * Scroll-driven hero zoom, ported from the Claude Design export.
 *
 * The hero sits fixed and on top of the page. As you scroll the first
 * ~90% of a viewport it scales from 1x to 3.2x, drifts up 40px and
 * dissolves, revealing the invitation scrolling up underneath it.
 */
export function useHeroZoom() {
  const [scrollY, setScrollY] = useState(0);
  const [viewport, setViewport] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800
  );
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onPref = () => setReduced(mq.matches);
    mq.addEventListener('change', onPref);

    let frame = 0;
    const read = () => {
      frame = 0;
      setScrollY(window.scrollY || window.pageYOffset || 0);
      setViewport(window.innerHeight);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      mq.removeEventListener('change', onPref);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const progress = Math.max(0, Math.min(1, scrollY / (viewport * 0.9)));

  const scale = 1 + progress * 2.2;
  const translateY = -progress * 40;
  const opacity = Math.max(0, 1 - progress * 1.15);

  const heroStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100dvh',
    zIndex: 30,
    transform: reduced
      ? undefined
      : `scale(${scale}) translateY(${translateY}px)`,
    opacity,
    pointerEvents: progress > 0.05 ? 'none' : 'auto',
  };

  return { progress, heroStyle };
}
