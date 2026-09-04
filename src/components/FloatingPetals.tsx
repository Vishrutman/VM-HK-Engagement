import React, { useEffect, useState } from 'react';

type FallingElementType =
  | 'marigold-flower'
  | 'marigold-petal'
  | 'jasmine-flower'
  | 'rose-petal'
  | 'heart-crimson'
  | 'heart-gold'
  | 'heart-rose'
  | 'sparkle';

interface FallingItem {
  id: number;
  x: number; // percentage 0-98
  initialY: number; // percentage 0-100 for immediate appearance on mount
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  type: FallingElementType;
  rotation: number;
  swayType: 'sway-left' | 'sway-right' | 'sway-wide';
  opacity: number;
}

export const FloatingPetals: React.FC = () => {
  const [items, setItems] = useState<FallingItem[]>([]);

  useEffect(() => {
    const types: FallingElementType[] = [
      'marigold-flower',
      'marigold-petal',
      'jasmine-flower',
      'rose-petal',
      'heart-crimson',
      'heart-gold',
      'heart-rose',
      'sparkle',
    ];

    const swayTypes: ('sway-left' | 'sway-right' | 'sway-wide')[] = [
      'sway-left',
      'sway-right',
      'sway-wide',
    ];

        // Generate falling items with staggered positions so the screen is immediately alive
    const COUNT = 18;
    const newItems: FallingItem[] = Array.from({ length: COUNT }).map((_, i) => {
      const type = types[i % types.length];
      const isHeart = type.startsWith('heart');
      const isFlower = type.includes('flower');
      
      return {
        id: i,
        x: Math.round(((i * 3.1) % 94) + 3), // well-distributed across horizontal width
        initialY: Math.round((i * 13) % 95), // distributed down the screen so it's not empty on load
        size: isFlower ? 24 + (i % 8) : isHeart ? 18 + (i % 7) : 16 + (i % 6),
        duration: 9 + (i % 7) * 1.5, // 9s to 18s
        delay: -(i * 0.7), // negative delay so animation is already mid-flight
        type,
        rotation: (i * 47) % 360,
        swayType: swayTypes[i % swayTypes.length],
        opacity: isHeart ? 0.85 : 0.8,
      };
    });

    setItems(newItems);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={`absolute will-change-transform ${item.swayType}`}
          style={{
            left: `${item.x}%`,
            top: '-30px',
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            opacity: item.opacity,
          }}
        >
          {/* 1. Marigold Whole Blossom (झेंडू फूल) */}
          {item.type === 'marigold-flower' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 32 32"
              className="drop-shadow-[0_2px_4px_rgba(216,67,21,0.35)]"
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <defs>
                <radialGradient id={`marigold-grad-${item.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFF176" />
                  <stop offset="35%" stopColor="#FFB300" />
                  <stop offset="70%" stopColor="#F57C00" />
                  <stop offset="100%" stopColor="#D84315" />
                </radialGradient>
              </defs>
              {/* Layered Ruffled Petals */}
              <circle cx="16" cy="16" r="14" fill={`url(#marigold-grad-${item.id})`} opacity="0.9" />
              <circle cx="16" cy="16" r="10" fill="#FFA000" />
              <circle cx="16" cy="16" r="6" fill="#FF6F00" />
              <circle cx="16" cy="16" r="2.5" fill="#FFE082" />
              {/* Petal serrations */}
              <path
                d="M16 2 L18 8 L24 4 L22 10 L28 10 L23 14 L29 17 L23 19 L28 23 L22 22 L24 28 L18 24 L16 30 L14 24 L8 28 L10 22 L4 23 L9 19 L3 17 L9 14 L4 10 L10 10 L8 4 L14 8 Z"
                fill="#FF8F00"
                opacity="0.8"
              />
            </svg>
          )}

          {/* 2. Marigold Curved Petal Blade */}
          {item.type === 'marigold-petal' && (
            <svg
              width={item.size * 0.9}
              height={item.size * 0.9}
              viewBox="0 0 28 28"
              className="drop-shadow-[0_2px_4px_rgba(245,124,0,0.3)]"
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <defs>
                <linearGradient id={`mPetal-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFE082" />
                  <stop offset="40%" stopColor="#FFA000" />
                  <stop offset="85%" stopColor="#F57C00" />
                  <stop offset="100%" stopColor="#D84315" />
                </linearGradient>
              </defs>
              <path
                d="M14 2 C19 5, 25 11, 23 18 C21 23, 17 26, 14 26 C11 26, 7 23, 5 18 C3 11, 9 5, 14 2 Z"
                fill={`url(#mPetal-${item.id})`}
              />
              <path d="M14 4 C16 9, 16 18, 14 23" stroke="#FF8F00" strokeWidth="0.8" fill="none" opacity="0.6" />
            </svg>
          )}

          {/* 3. Jasmine Star Blossom (मोगरा / चमेली) */}
          {item.type === 'jasmine-flower' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 28 28"
              className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.15)]"
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <defs>
                <radialGradient id={`jasGrad-${item.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#FFFDE7" />
                  <stop offset="100%" stopColor="#FFE082" />
                </radialGradient>
              </defs>
              {/* Five delicate white petals */}
              <g fill={`url(#jasGrad-${item.id})`} stroke="#E6DFD3" strokeWidth="0.5">
                <ellipse cx="14" cy="7" rx="3.5" ry="6" />
                <ellipse cx="21" cy="12" rx="6" ry="3.5" transform="rotate(35 21 12)" />
                <ellipse cx="18" cy="20" rx="3.5" ry="6" transform="rotate(70 18 20)" />
                <ellipse cx="10" cy="20" rx="3.5" ry="6" transform="rotate(-70 10 20)" />
                <ellipse cx="7" cy="12" rx="6" ry="3.5" transform="rotate(-35 7 12)" />
              </g>
              {/* Golden Yellow Stamen Center */}
              <circle cx="14" cy="14" r="2.8" fill="#FFC107" />
              <circle cx="14" cy="14" r="1.4" fill="#FF8F00" />
            </svg>
          )}

          {/* 4. Auspicious Crimson Rose Petal */}
          {item.type === 'rose-petal' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 26 26"
              className="drop-shadow-[0_2px_5px_rgba(158,42,43,0.35)]"
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <defs>
                <radialGradient id={`roseGrad-${item.id}`} cx="45%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#FF5252" />
                  <stop offset="45%" stopColor="#D32F2F" />
                  <stop offset="85%" stopColor="#9E2A2B" />
                  <stop offset="100%" stopColor="#671112" />
                </radialGradient>
              </defs>
              <path
                d="M13 2 C18 1, 24 6, 23 13 C22 19, 17 24, 13 25 C9 24, 4 19, 3 13 C2 6, 8 1, 13 2 Z"
                fill={`url(#roseGrad-${item.id})`}
              />
              <path d="M13 5 C15 10, 15 17, 13 22" stroke="#FFCDD2" strokeWidth="0.5" opacity="0.6" fill="none" />
            </svg>
          )}

          {/* 5. Auspicious Royal Crimson Engagement Heart */}
          {item.type === 'heart-crimson' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              className="drop-shadow-[0_2px_6px_rgba(158,42,43,0.4)]"
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <defs>
                <linearGradient id={`heartCrimson-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF4D4D" />
                  <stop offset="50%" stopColor="#9E2A2B" />
                  <stop offset="100%" stopColor="#671112" />
                </linearGradient>
              </defs>
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={`url(#heartCrimson-${item.id})`}
              />
              {/* Gentle inner gleam */}
              <circle cx="7.5" cy="7.5" r="1.5" fill="#FFFFFF" opacity="0.4" />
            </svg>
          )}

          {/* 6. Shimmering Gold Celebration Heart */}
          {item.type === 'heart-gold' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              className="drop-shadow-[0_2px_6px_rgba(212,175,55,0.45)]"
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <defs>
                <linearGradient id={`heartGold-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF3B0" />
                  <stop offset="40%" stopColor="#F5D77F" />
                  <stop offset="80%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#996515" />
                </linearGradient>
              </defs>
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={`url(#heartGold-${item.id})`}
                stroke="#FAF7F2"
                strokeWidth="0.5"
              />
              <circle cx="7.5" cy="7.5" r="1.4" fill="#FFFFFF" opacity="0.6" />
            </svg>
          )}

          {/* 7. Romantic Rose Coral Heart */}
          {item.type === 'heart-rose' && (
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              className="drop-shadow-[0_2px_5px_rgba(224,122,95,0.35)]"
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <defs>
                <linearGradient id={`heartRose-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFA07A" />
                  <stop offset="50%" stopColor="#E07A5F" />
                  <stop offset="100%" stopColor="#C45A40" />
                </linearGradient>
              </defs>
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill={`url(#heartRose-${item.id})`}
              />
              <circle cx="7.5" cy="7.5" r="1.3" fill="#FFFFFF" opacity="0.4" />
            </svg>
          )}

          {/* 8. Auspicious Golden Sparkle */}
          {item.type === 'sparkle' && (
            <svg
              width={item.size * 0.8}
              height={item.size * 0.8}
              viewBox="0 0 24 24"
              className="drop-shadow-[0_0_6px_rgba(245,215,127,0.8)]"
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <path
                d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
                fill="#F5D77F"
              />
              <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
            </svg>
          )}
        </div>
      ))}

      <style>{`
        .sway-left {
          animation-name: fallAndSwayLeft;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .sway-right {
          animation-name: fallAndSwayRight;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .sway-wide {
          animation-name: fallAndSwayWide;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes fallAndSwayLeft {
          0% {
            transform: translateY(-40px) translateX(0) rotate(0deg) scale(0.9);
            opacity: 0;
          }
          8% {
            opacity: 0.9;
          }
          30% {
            transform: translateY(30vh) translateX(-28px) rotate(110deg) scale(1);
          }
          65% {
            transform: translateY(65vh) translateX(22px) rotate(240deg) scale(0.95);
            opacity: 0.9;
          }
          92% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(105vh) translateX(-20px) rotate(360deg) scale(0.85);
            opacity: 0;
          }
        }

        @keyframes fallAndSwayRight {
          0% {
            transform: translateY(-40px) translateX(0) rotate(0deg) scale(0.85);
            opacity: 0;
          }
          8% {
            opacity: 0.95;
          }
          35% {
            transform: translateY(35vh) translateX(32px) rotate(130deg) scale(1);
          }
          70% {
            transform: translateY(70vh) translateX(-26px) rotate(260deg) scale(0.92);
            opacity: 0.9;
          }
          92% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(105vh) translateX(25px) rotate(390deg) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes fallAndSwayWide {
          0% {
            transform: translateY(-40px) translateX(0) rotate(0deg) scale(0.95);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          25% {
            transform: translateY(25vh) translateX(-38px) rotate(90deg) scale(1.05);
          }
          55% {
            transform: translateY(55vh) translateX(42px) rotate(210deg) scale(0.95);
          }
          80% {
            transform: translateY(80vh) translateX(-20px) rotate(310deg) scale(1);
            opacity: 0.85;
          }
          100% {
            transform: translateY(105vh) translateX(30px) rotate(420deg) scale(0.85);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
