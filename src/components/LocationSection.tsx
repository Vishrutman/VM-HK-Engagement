import React, { useState } from 'react';
import { Navigation, ExternalLink, Copy, Check } from 'lucide-react';
import { EventDetails } from '../types';

interface LocationSectionProps {
  event: EventDetails;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ event }) => {
  const [copied, setCopied] = useState(false);

  const fullAddress = `${event.venueName}, ${event.venueAddress}, ${event.city}, ${event.state}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Google Maps embed query for Hotel Regenta Vasco-da-Gama Goa
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    'Hotel Regenta Central Vasco da Gama Goa Swatantra Path'
  )}&output=embed`;

  return (
    <section id="venue-location" className="py-12 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Title */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="text-[#9E2A2B] text-xs tracking-[0.4em] uppercase font-bold mb-2">
          Venue &amp; Location
        </div>
        <h2 className="font-cormorant font-light uppercase text-2xl sm:text-4xl text-[#1a1a1a] tracking-wide">
          Location &amp; Directions
        </h2>
        <div className="w-16 h-[1px] bg-[#D4AF37] mx-auto my-3" />
        <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold">
          Vasco-da-Gama • Goa
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Venue Address & Navigation Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D4AF37]/15 shadow-sm h-full flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 flex-shrink-0 mb-4 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="fill-[#D4AF37] w-6 h-6">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>

              <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-1">
                Ceremony Venue
              </div>
              <div className="font-cormorant text-2xl sm:text-3xl text-[#1a1a1a] font-light uppercase tracking-wide">
                {event.venueName}
              </div>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                {event.venueAddress}
                <br />
                {event.city}, {event.state}
              </p>

              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/20 text-[11px] text-[#5A5A40] font-medium">
                <span>🅿️ Valet parking and concierge at entrance</span>
              </div>

              {/* Copy Address Button */}
              <div className="mt-5 pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between">
                <button
                  onClick={handleCopyAddress}
                  className="text-[11px] uppercase font-bold text-[#E07A5F] border-b border-[#E07A5F]/40 pb-0.5 inline-flex items-center gap-1.5 cursor-pointer hover:text-[#9E2A2B]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Navigation Buttons in Warm Organic Style */}
            <div className="mt-8 space-y-3">
              <a
                href={event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#5A5A40] hover:bg-[#4a4a30] text-white text-xs font-bold uppercase tracking-widest shadow-sm transition-colors text-center"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={event.appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-white hover:bg-[#FAF7F2] border border-[#D4AF37]/40 text-[#4a4a4a] text-xs font-bold uppercase tracking-widest shadow-sm transition-colors text-center"
              >
                <ExternalLink className="w-4 h-4 text-[#D4AF37]" />
                <span>Open in Apple Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Embedded Interactive Map */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-sm bg-white h-full flex flex-col justify-between">
            <div className="bg-[#5A5A40] text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Live Venue Location Map
                </span>
              </div>
              <span className="text-xs text-[#FAF7F2] font-semibold">Vasco-da-Gama, Goa</span>
            </div>

            <div className="relative w-full h-[360px] sm:h-[420px] bg-[#FAF7F2]">
              <iframe
                title="Hotel Regenta Vasco-da-Gama Goa Map"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            <div className="p-4 bg-white border-t border-[#D4AF37]/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
              <span>Hotel Regenta Vasco-da-Gama • Valet Parking Provided</span>
              <a
                href={event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9E2A2B] font-bold uppercase tracking-wider text-[10px] hover:underline inline-flex items-center gap-1"
              >
                <span>Full Screen Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
