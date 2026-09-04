import React from 'react';
import { ArrowUp, Heart, MessageCircle } from 'lucide-react';
import { EventDetails } from '../types';

interface InvitationFooterProps {
  event: EventDetails;
  onScrollToTop: () => void;
}

export const InvitationFooter: React.FC<InvitationFooterProps> = ({
  event,
  onScrollToTop,
}) => {
  return (
    <footer className="relative bg-[#FAF7F2] text-[#1a1a1a] py-16 px-4 sm:px-6 border-t border-[#D4AF37]/20">
      <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto mb-6" />

      <div className="max-w-3xl mx-auto text-center space-y-4">
        <p className="text-[#9E2A2B] tracking-[0.4em] uppercase text-xs font-bold">
          ॥ श्री गणेशाय नमः ॥ • शुभमस्तु
        </p>

        <h3 className="font-cormorant italic text-3xl sm:text-5xl text-[#1a1a1a]">
          {event.groomName} <span className="font-serif not-italic text-2xl sm:text-4xl text-[#E07A5F]">&amp;</span> {event.brideName}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
          We eagerly await your gracious presence and warm blessings for the couple on their auspicious Sakharpuda ceremony in Goa.
        </p>

        <div className="pt-3 flex items-center justify-center gap-5 text-xs font-bold uppercase tracking-wider">
          <a
            href={event.whatsappGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#5A5A40] hover:underline"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Join Celebration WhatsApp Group</span>
          </a>
        </div>

        {/* Scroll To Top Button */}
        <div className="pt-6">
          <button
            onClick={onScrollToTop}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#D4AF37]/30 text-xs font-bold uppercase tracking-widest text-[#5A5A40] transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Return to Top</span>
          </button>
        </div>

        <p className="text-[11px] uppercase tracking-widest text-gray-400 pt-4">
          September 21, 2026 • Hotel Regenta, Vasco-da-Gama, Goa
        </p>
      </div>
    </footer>
  );
};
