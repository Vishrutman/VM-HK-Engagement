import React from 'react';
import { Calendar, Sparkles, Download } from 'lucide-react';
import { EventDetails } from '../types';
import { CountdownTimer } from './CountdownTimer';
import { getGoogleCalendarUrl, downloadIcsFile } from '../utils/calendar';

interface FormalInvitationProps {
  event: EventDetails;
  canPersonalize?: boolean;
  onOpenRsvp: () => void;
  onOpenPersonalize: () => void;
}

export const FormalInvitation: React.FC<FormalInvitationProps> = ({
  event,
  canPersonalize = false,
  onOpenRsvp,
  onOpenPersonalize,
}) => {
  const googleCalUrl = getGoogleCalendarUrl(event);

  return (
    <section id="invitation-details" className="relative py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Warm Organic Cultural Card Frame */}
      <div className="relative rounded-3xl bg-[#FAF7F2] sm:bg-white/80 border border-[#D4AF37]/25 p-6 sm:p-12 shadow-sm overflow-hidden backdrop-blur-sm">
        
        {/* Subtle Background Radial Dot Matrix */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none warm-organic-dots" />

        {/* Traditional Ornate Golden Corner Ornaments */}
        <div className="absolute top-4 left-4 w-8 h-8 sm:w-10 sm:h-10 border-t border-l border-[#D4AF37]/40 pointer-events-none" />
        <div className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 border-t border-r border-[#D4AF37]/40 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-8 h-8 sm:w-10 sm:h-10 border-b border-l border-[#D4AF37]/40 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-8 h-8 sm:w-10 sm:h-10 border-b border-r border-[#D4AF37]/40 pointer-events-none" />

        {/* Sacred Vedic Inscription */}
        <div className="text-center relative z-10">
          <div className="text-[#9E2A2B] text-xs tracking-[0.4em] uppercase font-bold mb-2">
            ॥ श्री गणेशाय नमः ॥
          </div>
          <p className="font-cinzel text-xs tracking-[0.2em] text-[#D4AF37] font-semibold uppercase mb-4">
            Shree Ganeshay Namah
          </p>

                   {/* Sacred Lord Ganesha Motif */}
          <div className="flex justify-center mb-4">
            <img
              src={`${import.meta.env.BASE_URL}assets/ganesha.png`}
              alt="Lord Ganesha"
              width={115}
              height={115}
              className="w-[115px] h-[115px] object-contain"
              loading="lazy"
            />
          </div>

          {/* Couple Names in Classic Georgian / Cormorant Serif */}
          <h2 className="font-cormorant italic text-[38px] sm:text-[54px] md:text-[62px] text-[#9E2A2B] leading-tight text-center mb-1">
            {event.groomName} &amp; {event.brideName}
          </h2>

          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto my-4" />

          {/* Host Families Invocation */}
          <p className="text-center uppercase tracking-[0.2em] text-xs sm:text-sm text-[#D4AF37] font-semibold mb-3">
            Together with their families<br />Invite you to celebrate their
          </p>

          <h1 className="font-cormorant text-2xl sm:text-4xl text-[#1a1a1a] font-light tracking-wide uppercase mb-2">
            साखरपुडा • Sakharpuda
          </h1>
        </div>

        {/* Traditional Host & Family Copy */}
        <div className="my-6 text-center relative z-10 max-w-xl mx-auto space-y-3">
          <p className="text-sm leading-relaxed text-[#4a4a4a]">
            With the divine blessings of Lord Ganesha, families of{' '}
            <span className="font-semibold text-[#1a1a1a]">{event.groomParents}</span> and{' '}
            <span className="font-semibold text-[#1a1a1a]">{event.brideParents}</span> request the honour of your gracious presence and blessings.
          </p>
        </div>

        {/* Large Date & Countdown Feature */}
        <div className="my-8 relative z-10">
          <div className="text-center mb-4">
            <span className="block text-[54px] sm:text-[68px] font-light leading-none mb-1 font-cormorant text-[#1a1a1a]">
              21
            </span>
            <span className="block text-xs uppercase tracking-[0.5em] text-[#D4AF37] font-bold">
              September 2026
            </span>
            <span className="block text-xs text-[#E07A5F] italic mt-1">
              {event.timeString} • {event.muhurthamTime}
            </span>
          </div>
<p className="text-center text-[#9E2A2B] font-medium italic text-base sm:text-lg mb-6 tracking-wide">
            शुभमस्तु: • Sakharpuda &amp; Ring Ceremony
          </p>
          {/* Countdown Module */}
          <CountdownTimer targetTimestamp={event.targetTimestamp} />
        </div>

        {/* Event Key Highlights: Venue & Dress Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 relative z-10">
          {/* Venue card */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#D4AF37]/15 flex items-start space-x-4">
            <div className="w-8 h-8 flex-shrink-0 mt-1">
              <svg viewBox="0 0 24 24" className="fill-[#D4AF37] w-7 h-7">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm tracking-widest uppercase text-[#1a1a1a]">
                {event.venueName}
              </div>
              <div className="text-sm text-gray-500">
                {event.venueAddress}, {event.city}, {event.state}
              </div>
              <a
                href={event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-[10px] uppercase font-bold text-[#E07A5F] border-b border-[#E07A5F]/40 pb-1"
              >
                Get Directions
              </a>
            </div>
          </div>

          {/* Dress code card */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#D4AF37]/15 flex items-start space-x-4">
            <div className="w-8 h-8 flex-shrink-0 mt-1">
              <svg viewBox="0 0 24 24" className="fill-[#D4AF37] w-7 h-7">
                <path d="M20 6h-1V4c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM7 4h10v2H7V4zm13 15H4V8h16v11z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-sm tracking-widest uppercase text-[#1a1a1a]">
                Dress Code
              </div>
              <div className="text-sm font-semibold text-[#1a1a1a] mt-1">
                {event.dressCodeDescription || event.dressCodeTitle}
              </div>
            </div>
          </div>
        </div>

        {/* Action CTAs in Warm Organic Cultural Style */}
        <div className="mt-8 pt-6 border-t border-[#D4AF37]/20 relative z-10 flex flex-wrap items-center justify-center gap-3">
          {/* Add to Calendar - Earthy Olive Theme */}
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[160px] py-3.5 sm:py-4 px-5 bg-[#5A5A40] text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#4a4a30] transition-colors shadow-sm text-center flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            <span>Add to Calendar</span>
          </a>

          {/* Download iCal */}
          <button
            onClick={() => downloadIcsFile(event)}
            className="flex-1 min-w-[160px] py-3.5 sm:py-4 px-5 bg-white hover:bg-[#FAF7F2] border border-[#D4AF37]/40 text-[#4a4a4a] rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4 text-[#9E2A2B]" />
            <span>Download iCal</span>
          </button>

          {/* Ashirvad Wall Button */}
          <button
            onClick={onOpenRsvp}
            className="flex-1 min-w-[160px] py-3.5 sm:py-4 px-5 bg-[#9E2A2B] hover:bg-[#851F20] text-white rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[#F5D77F]" />
            <span>Ashirvad Wall</span>
          </button>
        </div>

        {/* Personalize link (visible if canPersonalize is true) */}
        {canPersonalize && (
          <div className="text-center mt-6">
            <button
              onClick={onOpenPersonalize}
              className="text-[11px] text-gray-500 hover:text-[#9E2A2B] uppercase tracking-wider underline decoration-[#D4AF37]/40 cursor-pointer"
            >
              Edit couple or host names
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
