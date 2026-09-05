import React, { useState, useEffect } from 'react';
import { EventDetails } from './types';
import { DEFAULT_EVENT_DETAILS } from './data/eventData';
import { GopuramHero } from './components/GopuramHero';
import { FormalInvitation } from './components/FormalInvitation';
import { LocationSection } from './components/LocationSection';
import { WhatsAppCommunity } from './components/WhatsAppCommunity';
import { GuestWishes } from './components/GuestWishes';
import { PersonalizeModal } from './components/PersonalizeModal';
import { InvitationFooter } from './components/InvitationFooter';
import { MapPin, MessageCircle, Sparkles, Calendar } from 'lucide-react';
import { getGoogleCalendarUrl } from './utils/calendar';
import { useHeroZoom } from './hooks/useHeroZoom';

export default function App() {
    const [eventDetails, setEventDetails] = useState<EventDetails>(() => {
    try {
      localStorage.removeItem('engagement_event_details');
      localStorage.removeItem('sakharpuda_event_details_v2');
      const params = new URLSearchParams(window.location.search);
      const isEditor =
        params.get('edit') === 'true' ||
        params.get('personalize') === 'true' ||
        params.get('admin') === 'true';
      if (isEditor) {
        const saved = localStorage.getItem('sakharpuda_event_details_v3');
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...DEFAULT_EVENT_DETAILS,
            ...parsed,
          };
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_EVENT_DETAILS;
  });

  const [isPersonalizeOpen, setIsPersonalizeOpen] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [canPersonalize, setCanPersonalize] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (
        params.get('edit') === 'true' ||
        params.get('personalize') === 'true' ||
        params.get('admin') === 'true'
      ) {
        setCanPersonalize(true);
      }
    }
  }, []);

   useEffect(() => {
    if (!canPersonalize) return;
    try {
      localStorage.setItem('sakharpuda_event_details_v3', JSON.stringify(eventDetails));
    } catch {
      // ignore
    }
  }, [eventDetails, canPersonalize]);

  // Monitor scroll position to show sticky mobile action bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsScrolledPastHero(true);
      } else {
        setIsScrolledPastHero(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenInvitation = () => {
    const el = document.getElementById('invitation-details');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLocation = () => {
    const el = document.getElementById('venue-location');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRsvp = () => {
    const el = document.getElementById('ashirvad-wall');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#2C1810] selection:bg-[#E07A5F]/20 selection:text-[#9E2A2B] silk-bg">
      {/* Gentle Floating Jasmine & Marigold Petals */}
    

      {/* Hero Section: The Grand Gopuram Entrance */}
      <GopuramHero
        event={eventDetails}
        canPersonalize={canPersonalize}
        onOpenInvitation={handleOpenInvitation}
        onOpenPersonalize={() => setIsPersonalizeOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-20">
        {/* Section 1: The Formal Invitation & Details */}
        <FormalInvitation
          event={eventDetails}
          canPersonalize={canPersonalize}
          onOpenRsvp={handleOpenRsvp}
          onOpenPersonalize={() => setIsPersonalizeOpen(true)}
        />

        {/* Section 2: Location & Directions */}
        <LocationSection event={eventDetails} />

        {/* Section 3: WhatsApp Community & Celebrations */}
        <WhatsAppCommunity event={eventDetails} />

        {/* Section 4: Ashirvad Wall */}
        <GuestWishes event={eventDetails} />
      </main>

      {/* Footer */}
      <InvitationFooter
        event={eventDetails}
        onScrollToTop={handleScrollToTop}
      />

      {/* Personalize Names & Event Details Modal */}
      <PersonalizeModal
        isOpen={isPersonalizeOpen}
        onClose={() => setIsPersonalizeOpen(false)}
        event={eventDetails}
        onSave={(updated) => setEventDetails(updated)}
      />

      {/* Sticky Mobile Quick Action Bar (visible on mobile after scrolling past hero) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-[#D4AF37]/50 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex items-center justify-around gap-2 transition-transform duration-300 md:hidden ${
          isScrolledPastHero ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button
          onClick={handleOpenRsvp}
          aria-label="View Ashirvad Wall and send blessings"
          className="flex-1 py-2 px-2.5 rounded-lg bg-[#9E2A2B] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#F5D77F]" />
          <span>Ashirvad</span>
        </button>

        <button
          onClick={handleOpenLocation}
          aria-label="View venue location and map"
          className="flex-1 py-2 px-2.5 rounded-lg bg-[#FAF7F2] border border-[#D4AF37] text-[#2C1810] text-xs font-semibold flex items-center justify-center gap-1.5"
        >
          <MapPin className="w-3.5 h-3.5 text-[#9E2A2B]" />
          <span>Venue</span>
        </button>

        <a
          href={getGoogleCalendarUrl(eventDetails)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Add Sakharpuda Ceremony to Google Calendar"
          className="flex-1 py-2 px-2.5 rounded-lg bg-[#FAF7F2] border border-[#D4AF37] text-[#2C1810] text-xs font-semibold flex items-center justify-center gap-1.5 text-center"
        >
          <Calendar className="w-3.5 h-3.5 text-[#5A5A40]" />
          <span>Calendar</span>
        </a>

        <a
          href={eventDetails.whatsappGroupLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-[#25D366]/15 border border-[#25D366]/40 text-[#075E54] flex items-center justify-center"
          title="Join Celebration WhatsApp Group"
          aria-label="Join Celebration WhatsApp Group"
        >
          <MessageCircle className="w-4 h-4 fill-[#25D366]" />
        </a>
      </div>
    </div>
  );
}

