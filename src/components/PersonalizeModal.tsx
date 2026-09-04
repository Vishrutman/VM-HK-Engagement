import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Check, Calendar, MapPin, Copy, ExternalLink, Info } from 'lucide-react';
import { EventDetails } from '../types';
import { DEFAULT_EVENT_DETAILS, deriveTimestampFromIso } from '../data/eventData';

interface PersonalizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventDetails;
  onSave: (updated: EventDetails) => void;
}

export const PersonalizeModal: React.FC<PersonalizeModalProps> = ({
  isOpen,
  onClose,
  event,
  onSave,
}) => {
  const [formData, setFormData] = useState<EventDetails>(() =>
    JSON.parse(JSON.stringify(event))
  );
  const [copiedConfig, setCopiedConfig] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData(JSON.parse(JSON.stringify(event)));
    }
  }, [isOpen, event]);

  if (!isOpen) return null;

  const handleChange = (field: keyof EventDetails, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCoordinatorChange = (index: number, field: 'name' | 'role' | 'phone', val: string) => {
    setFormData((prev) => {
      const updated = prev.contactPersons.map((person, idx) =>
        idx === index ? { ...person, [field]: val } : { ...person }
      );
      return { ...prev, contactPersons: updated };
    });
  };

  const handleDateTimeChange = (val: string) => {
    if (!val) return;
    // Explicitly pin to Indian Standard Time (IST, UTC+05:30)
    const d = new Date(`${val}:00+05:30`);
    if (isNaN(d.getTime())) return;
    const timestamp = d.getTime();

    const dateDisplay = d.toLocaleDateString('en-US', {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const timeDisplay =
      d.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }) + ' onwards';

    setFormData((prev) => ({
      ...prev,
      isoDate: val,
      targetTimestamp: timestamp,
      date: dateDisplay,
      timeString: timeDisplay,
    }));
  };

  const handleVenueChange = (field: 'venueName' | 'venueAddress' | 'city' | 'state', value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      // Keep map query URLs synchronized with updated venue details
      const query = `${updated.venueName} ${updated.venueAddress} ${updated.city} ${updated.state}`.trim();
      updated.googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
      updated.appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(query)}`;
      return updated;
    });
  };

  const handleCopyConfig = () => {
    const code = `export const DEFAULT_EVENT_DETAILS: EventDetails = ${JSON.stringify(
      formData,
      null,
      2
    )};`;
    navigator.clipboard.writeText(code);
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 3000);
  };

  const handleReset = () => {
    setFormData(JSON.parse(JSON.stringify(DEFAULT_EVENT_DETAILS)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#FAF7F2] border border-[#D4AF37]/30 p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close personalization modal"
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-black/5 text-gray-500 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="text-[#9E2A2B] text-xs tracking-[0.4em] uppercase font-bold mb-1">
            Personalization &amp; Setup
          </div>
          <h3 className="font-cormorant font-light uppercase text-2xl sm:text-3xl text-[#1a1a1a] tracking-wide">
            Customize Invitation Details
          </h3>
          <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto my-2" />
        </div>

        {/* Informative Host Notice */}
        <div className="mb-5 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-[#5A5A40] space-y-1.5">
          <div className="flex items-start gap-2 font-bold text-[#9E2A2B]">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>Host Deployment Notice</span>
          </div>
          <p className="leading-relaxed text-[11px] text-gray-700">
            Saving here updates your local browser session for testing. For your guests on a deployed website, your final details must be committed to <code className="bg-amber-100/80 px-1 py-0.5 rounded text-[#9E2A2B] font-mono">src/data/eventData.ts</code> and rebuilt. Use the copy button below to copy the ready TypeScript code!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-1">
                Groom's Name
              </label>
              <input
                type="text"
                required
                value={formData.groomName}
                onChange={(e) => handleChange('groomName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-1">
                Bride's Name
              </label>
              <input
                type="text"
                required
                value={formData.brideName}
                onChange={(e) => handleChange('brideName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-1">
              Groom's Parents
            </label>
            <input
              type="text"
              value={formData.groomParents}
              onChange={(e) => handleChange('groomParents', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-1">
              Bride's Parents
            </label>
            <input
              type="text"
              value={formData.brideParents}
              onChange={(e) => handleChange('brideParents', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Date & Time Picker (Synced with Countdown & Calendar, pinned to IST) */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#D4AF37]/30 space-y-3">
            <div className="flex items-center gap-2 text-[#9E2A2B] text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Event Date &amp; Time (Indian Standard Time • IST UTC+05:30)</span>
            </div>
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">
                Select Date &amp; Starting Time (IST)
              </label>
              <input
                type="datetime-local"
                value={formData.isoDate || ''}
                onChange={(e) => handleDateTimeChange(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#D4AF37]/40 bg-[#FAF7F2]/60 text-xs sm:text-sm text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                  Display Date
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                  Display Time
                </label>
                <input
                  type="text"
                  value={formData.timeString}
                  onChange={(e) => handleChange('timeString', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                  Muhurtham Note
                </label>
                <input
                  type="text"
                  value={formData.muhurthamTime}
                  onChange={(e) => handleChange('muhurthamTime', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                  Duration (Hours, for Calendar)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="12"
                  value={formData.durationHours || 3.5}
                  onChange={(e) => handleChange('durationHours', parseFloat(e.target.value) || 3.5)}
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Venue & Navigation Details */}
          <div className="p-3.5 rounded-2xl bg-white border border-[#D4AF37]/30 space-y-3">
            <div className="flex items-center gap-2 text-[#9E2A2B] text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>Venue &amp; Maps Navigation</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                  Venue Name
                </label>
                <input
                  type="text"
                  value={formData.venueName}
                  onChange={(e) => handleVenueChange('venueName', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.venueAddress}
                  onChange={(e) => handleVenueChange('venueAddress', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleVenueChange('city', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                  State &amp; Pincode
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleVenueChange('state', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                Google Maps Navigation Link
              </label>
              <input
                type="url"
                value={formData.googleMapsUrl}
                onChange={(e) => handleChange('googleMapsUrl', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                Apple Maps Navigation Link
              </label>
              <input
                type="url"
                value={formData.appleMapsUrl}
                onChange={(e) => handleChange('appleMapsUrl', e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
              />
            </div>
          </div>

          {/* WhatsApp Group & Dress Code */}
          <div>
            <label className="block text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-1">
              WhatsApp Group Invite Link
            </label>
            <input
              type="url"
              placeholder="https://chat.whatsapp.com/..."
              value={formData.whatsappGroupLink}
              onChange={(e) => handleChange('whatsappGroupLink', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
            <p className="text-[10px] text-gray-500 mt-1">
              Real WhatsApp group links end in a 22-character invite code (e.g. https://chat.whatsapp.com/Kh8Jn9Lm2Pq4RsTu7VwXyZ).
            </p>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#1a1a1a] uppercase tracking-wider mb-1">
              Dress Code
            </label>
            <input
              type="text"
              value={formData.dressCodeDescription || formData.dressCodeTitle}
              onChange={(e) => {
                handleChange('dressCodeTitle', e.target.value);
                handleChange('dressCodeDescription', e.target.value);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/30 bg-white text-sm text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          {/* Family Coordinators */}
          <div className="pt-2 border-t border-[#D4AF37]/20">
            <p className="text-[11px] font-bold text-[#9E2A2B] uppercase tracking-wider mb-2">
              Family Coordinators
            </p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                    Coordinator 1 Name
                  </label>
                  <input
                    type="text"
                    value={formData.contactPersons[0]?.name || ''}
                    onChange={(e) => handleCoordinatorChange(0, 'name', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4AF37]/30 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.contactPersons[0]?.phone || ''}
                    onChange={(e) => handleCoordinatorChange(0, 'phone', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4AF37]/30 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                    Coordinator 2 Name
                  </label>
                  <input
                    type="text"
                    value={formData.contactPersons[1]?.name || ''}
                    onChange={(e) => handleCoordinatorChange(1, 'name', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4AF37]/30 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.contactPersons[1]?.phone || ''}
                    onChange={(e) => handleCoordinatorChange(1, 'phone', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#D4AF37]/30 bg-white text-xs text-[#1a1a1a] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Copy Config button for publishers */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopyConfig}
              className="w-full py-2 px-3 rounded-xl border border-[#D4AF37]/40 bg-white hover:bg-[#FAF7F2] text-[#9E2A2B] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedConfig ? '✓ Config Copied to Clipboard!' : 'Copy Code for src/data/eventData.ts'}</span>
            </button>
          </div>

          <div className="pt-4 flex items-center justify-between gap-3 border-t border-[#D4AF37]/20">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#1a1a1a] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-gray-300 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#5A5A40] hover:bg-[#4a4a30] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
