import React, { useState } from 'react';
import { ChevronDown, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { EventDetails } from '../types';
import { templeAudio } from '../utils/audioSynth';
import { RealisticToran } from './RealisticToran';
import { FloatingPetals } from './FloatingPetals';

interface GopuramHeroProps {
  event: EventDetails;
  canPersonalize?: boolean;
  onOpenInvitation: () => void;
  onOpenPersonalize: () => void;
}

export const GopuramHero: React.FC<GopuramHeroProps> = ({
  event,
  canPersonalize = false,
  onOpenInvitation,
  onOpenPersonalize,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [bellRung, setBellRung] = useState(false);

  const handleAudioToggle = () => {
    const newState = templeAudio.toggle();
    setIsPlayingAudio(newState);
  };

  const handleRingBell = () => {
    templeAudio.ringTempleBell(880);
    setBellRung(true);
    setTimeout(() => setBellRung(false), 1200);
  };

  return (
    <header className="relative min-h-[96vh] sm:min-h-screen w-full flex flex-col justify-between items-center text-center overflow-hidden bg-[#1A0B05]">
      <FloatingPetals />

      {/* Background: portrait crop on phones, landscape crop from 768px up.
          The browser picks one source and downloads only that file. */}
      <div className="absolute inset-0 z-0">
        <picture className="block w-full h-full">
          <source
            media="(min-width: 768px)"
            srcSet={`${import.meta.env.BASE_URL}assets/hero_wide.webp`}
          />
          <img
            src={`${import.meta.env.BASE_URL}assets/hero_tall.webp`}
            alt={`Sakharpuda stage backdrop for ${event.groomName} and ${event.brideName} — floral arrangements and candlelight around a lit V&H monogram`}
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-cover object-center brightness-[0.95]"
          />
        </picture>

        {/* Scrim: dark only where text sits, clear across the florals and monogram */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(26,11,5,0.40)_0%,rgba(26,11,5,0.04)_30%,rgba(26,11,5,0.40)_58%,rgba(26,11,5,0.93)_100%)]" />
      </div>

      {/* Realistic Marigold & Mango Leaf Toran (झेंडू व आम्रपल्लव तोरण) */}
      {/*<RealisticToran /> */}

      {/* Hanging Ornate Brass Temple Bells (Left & Right) */}
      {/*<div className="absolute top-10 left-3 sm:left-8 z-30 flex flex-col items-center">
        <div className="w-0.5 h-16 sm:h-28 bg-gradient-to-b from-[#8B6508] to-[#D4AF37]" />
        <button
          onClick={handleRingBell}
          title="Ring Auspicious Temple Bell"
          className={`group -mt-1 p-2 rounded-full cursor-pointer focus:outline-none transition-transform ${
            bellRung ? 'scale-125' : 'animate-bell'
          }`}
        >
          <svg width="34" height="42" viewBox="0 0 32 40" className="drop-shadow-lg">
            <path d="M16 2 L16 8" stroke="#D4AF37" strokeWidth="2" />
            <path
              d="M8 12 C8 8 24 8 24 12 C24 24 29 27 29 30 C29 32 26 33 16 33 C6 33 3 32 3 30 C3 27 8 24 8 12 Z"
              fill="url(#brassGold)"
              stroke="#B8860B"
              strokeWidth="1.2"
            />
            <circle cx="16" cy="35" r="3.5" fill="#8B6508" />
            <defs>
              <linearGradient id="brassGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D77F" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#996515" />
              </linearGradient>
            </defs>
          </svg>
          <span className="sr-only">Ring Sacred Bell</span>
        </button>
      </div> 

      <div className="absolute top-10 right-3 sm:right-8 z-30 flex flex-col items-center">
        <div className="w-0.5 h-20 sm:h-32 bg-gradient-to-b from-[#8B6508] to-[#D4AF37]" />
        <button
          onClick={handleRingBell}
          title="Ring Auspicious Temple Bell"
          className={`group -mt-1 p-2 rounded-full cursor-pointer focus:outline-none transition-transform ${
            bellRung ? 'scale-125' : 'animate-bell'
          }`}
          style={{ animationDelay: '1.2s' }}
        >
          <svg width="30" height="38" viewBox="0 0 32 40" className="drop-shadow-lg">
            <path d="M16 2 L16 8" stroke="#D4AF37" strokeWidth="2" />
            <path
              d="M8 12 C8 8 24 8 24 12 C24 24 29 27 29 30 C29 32 26 33 16 33 C6 33 3 32 3 30 C3 27 8 24 8 12 Z"
              fill="url(#brassGold2)"
              stroke="#B8860B"
              strokeWidth="1.2"
            />
            <circle cx="16" cy="35" r="3" fill="#8B6508" />
            <defs>
              <linearGradient id="brassGold2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F5D77F" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#996515" />
              </linearGradient>
            </defs>
          </svg>
          <span className="sr-only">Ring Sacred Bell</span>
        </button>
      </div> */}

      {/* Floating Audio / Atmospheric Sound Control Button */}
      <div className="absolute top-4 right-14 sm:right-20 z-40 flex items-center gap-2">
        <button
          onClick={handleAudioToggle}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF7F2]/90 hover:bg-white text-[#1a1a1a] border border-[#D4AF37]/40 text-xs font-bold uppercase tracking-wider transition-all shadow-sm backdrop-blur-md active:scale-95 cursor-pointer"
          title={isPlayingAudio ? 'Mute Temple Chimes' : 'Play Temple Chimes & Tanpura'}
        >
          {isPlayingAudio ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#9E2A2B] animate-pulse" />
              <span className="hidden sm:inline text-[#9E2A2B]">Chimes Active</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden sm:inline">Play Chimes</span>
            </>
          )}
        </button>
      </div>

      {/* Core Hero Content Container.
          mt-auto pushes the stack into the lower third so it clears the
          lit V&H monogram, which now carries the couple's names visually. */}
      <div className="relative z-20 max-w-3xl px-4 sm:px-6 pt-4 pb-8 flex flex-col items-center mt-auto">
        {/* Sanskrit & Auspicious Invocations */}
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#FAF7F2]/90 border border-[#D4AF37]/40 backdrop-blur-md mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[#9E2A2B] tracking-[0.35em] uppercase text-xs font-bold">
            ॥ श्री गणेशाय नमः ॥
          </span>
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        </div>

        {/* Main Event Title */}
        <h1 className="font-cormorant font-light uppercase text-3xl sm:text-5xl md:text-6xl text-white tracking-widest leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          साखरपुडा • Sakharpuda
        </h1>

        {/* Golden Kalasam & Lotus Motif Divider */}
        <div className="flex items-center justify-center gap-3 my-4 sm:my-5 w-full max-w-xs">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#D4AF37]/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#D4AF37]/60" />
        </div>

        {/* Key Event Badges: Date & Venue */}
        <div className="mt-1 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
          <div className="px-5 py-2 rounded-full bg-[#FAF7F2]/90 border border-[#D4AF37]/30 backdrop-blur-md text-[#1a1a1a] shadow-sm flex items-center gap-2">
            <span className="text-[#9E2A2B] font-bold">21</span>
            <span className="font-bold tracking-wider uppercase text-[11px] text-[#9E2A2B]">September 2026</span>
          </div>
          <div className="px-5 py-2 rounded-full bg-[#FAF7F2]/90 border border-[#D4AF37]/30 backdrop-blur-md text-[#1a1a1a] shadow-sm flex items-center gap-2">
            <span className="text-[#E07A5F] font-bold">📍</span>
            <span className="font-bold tracking-wider uppercase text-[11px] text-[#1a1a1a]">Hotel Regenta, Goa</span>
          </div>
        </div>

        {/* Action Button: Earthy Olive Rounded-Full Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onOpenInvitation}
            className="group px-8 py-4 rounded-full bg-[#5A5A40] hover:bg-[#4a4a30] text-white text-xs sm:text-sm font-bold uppercase tracking-widest shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-2.5"
          >
            <span>VIEW SAKHARPUDA INVITATION</span>
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </button>

          {canPersonalize && (
            <button
              onClick={onOpenPersonalize}
              className="text-xs text-[#FAF7F2]/80 hover:text-[#F5D77F] uppercase tracking-wider underline underline-offset-4 decoration-[#D4AF37]/50 transition-colors py-1 px-3"
              title="Personalize Bride & Groom names"
            >
              Customize Names
            </button>
          )}
        </div>
      </div>

      {/* Auspicious Glowing Diyas at Bottom Left and Right */}
      <div className="relative z-20 w-full px-6 pb-4 flex justify-between items-end pointer-events-none">
        {/* Left Diya */}
        <div className="flex flex-col items-center">
          <div className="w-3.5 h-6 bg-gradient-to-t from-[#E07A5F] via-[#F5A623] to-[#FFF9E6] rounded-full animate-diya" />
          <svg width="38" height="18" viewBox="0 0 40 20" className="drop-shadow-md">
            <path
              d="M2 4 C10 16 30 16 38 4 C38 12 30 18 20 18 C10 18 2 12 2 4 Z"
              fill="#D4AF37"
              stroke="#996515"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Center Scroll Prompt */}
        <button
          onClick={onOpenInvitation}
          className="pointer-events-auto flex flex-col items-center text-[#F5D77F]/80 hover:text-[#FFF9E6] transition-colors cursor-pointer group mb-1"
        >
          <span className="font-cinzel text-[10px] tracking-widest uppercase opacity-75 group-hover:opacity-100">
            Scroll to Enter
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce mt-1" />
        </button>

        {/* Right Diya */}
        <div className="flex flex-col items-center">
          <div className="w-3.5 h-6 bg-gradient-to-t from-[#E07A5F] via-[#F5A623] to-[#FFF9E6] rounded-full animate-diya" />
          <svg width="38" height="18" viewBox="0 0 40 20" className="drop-shadow-md">
            <path
              d="M2 4 C10 16 30 16 38 4 C38 12 30 18 20 18 C10 18 2 12 2 4 Z"
              fill="#D4AF37"
              stroke="#996515"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </header>
  );
};
