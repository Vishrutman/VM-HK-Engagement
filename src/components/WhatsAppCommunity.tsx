import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { EventDetails } from '../types';

interface WhatsAppCommunityProps {
  event: EventDetails;
}

export const WhatsAppCommunity: React.FC<WhatsAppCommunityProps> = ({ event }) => {
  return (
    <section id="whatsapp-celebration" className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="relative rounded-3xl bg-[#FAF7F2] sm:bg-white/80 border border-[#D4AF37]/20 p-6 sm:p-10 shadow-sm overflow-hidden backdrop-blur-sm">
        
        {/* Subtle Background Radial Dot Matrix */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none warm-organic-dots" />

        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="text-[#9E2A2B] text-xs tracking-[0.4em] uppercase font-bold mb-2">
            Celebration Community
          </div>
          <h2 className="font-cormorant font-light uppercase text-2xl sm:text-4xl text-[#1a1a1a] tracking-wide">
            Stay Connected on WhatsApp
          </h2>
          <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto my-3" />
          <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2 leading-relaxed">
            Join our celebration group for real-time Sakharpuda schedule updates, Muhurtham alerts, and ceremony details.
          </p>
        </div>

        {/* Primary Action: Join WhatsApp Group */}
        <div className="flex items-center justify-center relative z-10 mb-8">
          <a
            href={event.whatsappGroupLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join Celebration WhatsApp Group"
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-widest shadow-sm transition-all flex items-center justify-center gap-2.5 active:scale-98"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>JOIN CELEBRATION WHATSAPP GROUP</span>
          </a>
        </div>

        {/* Family Coordinators Contact Cards */}
        <div className="mt-8 pt-6 border-t border-[#D4AF37]/15 relative z-10">
          <p className="text-[#9E2A2B] text-xs tracking-[0.4em] uppercase font-bold text-center mb-4">
            Family Coordinators &amp; Hospitality
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {event.contactPersons.map((contact, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D4AF37]/20 shadow-sm flex items-center justify-between gap-3"
              >
              <br>
      
                <div>
                  <h5 className="font-cormorant font-bold text-lg text-[#1a1a1a]">
                    {contact.name}
                  </h5>
                  <p className="text-xs text-gray-500">{contact.role}</p>
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E2A2B] hover:text-[#D4AF37] mt-1 font-mono transition-colors"
                  >
                    <Phone className="w-3 h-3 text-[#D4AF37]" />
                    <span>{contact.phone}</span>
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="p-2.5 rounded-full bg-[#FAF7F2] hover:bg-white border border-[#D4AF37]/30 text-[#5A5A40] transition-colors"
                    title={`Call ${contact.name}`}
                    aria-label={`Call ${contact.name} at ${contact.phone}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?phone=${contact.phone.replace(/[^0-9]/g, '')}&text=Hello!%20Reaching%20out%20regarding%20the%20Sakharpuda%20Ceremony.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-[#25D366] transition-colors"
                    title={`WhatsApp ${contact.name}`}
                    aria-label={`Send WhatsApp message to ${contact.name}`}
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
