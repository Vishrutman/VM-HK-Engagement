import { EventDetails, WishMessage } from '../types';

// Helper to reliably derive Unix epoch ms pinned to Indian Standard Time (IST, UTC+05:30)
export function deriveTimestampFromIso(isoDate: string): number {
  return new Date(`${isoDate}:00+05:30`).getTime();
}

// Single source of truth for the event start time
const DEFAULT_ISO_DATE = "2026-09-21T10:30";

// Target Date: Monday, September 21, 2026, 10:30 AM IST (UTC+05:30)
// Auspicious Muhurtham: 11:00 AM – 12:15 PM, followed by Anand Bhojan
export const DEFAULT_EVENT_DETAILS: EventDetails = {
  eventName: "Engagement Ceremony",
  subTitle: "साखरपुडा • Sakharpuda & Ring Ceremony",
  date: "Monday, September 21, 2026",
  isoDate: DEFAULT_ISO_DATE,
  targetTimestamp: deriveTimestampFromIso(DEFAULT_ISO_DATE),
  durationHours: 3.5, // 10:30 AM to 2:00 PM (Muhurtham 11:00 AM – 12:15 PM followed by lunch)
  timeString: "10:30 AM onwards",
  muhurthamTime: "Auspicious Muhurtham: 11:00 AM – 12:15 PM",
  venueName: "Hotel Regenta",
  venueAddress: "Swatantra Path",
  city: "Vasco-da-Gama",
  state: "Goa 403802",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Regenta+Vasco-da-Gama+Goa",
  appleMapsUrl: "https://maps.apple.com/?q=Hotel+Regenta+Vasco-da-Gama+Goa",
  groomName: "Vishrut",
  brideName: "Hemangi",
  groomParents: "सौ. वीणा व श्री. विवेक मनगोळी (Sou. Veena & Shri Vivek Mangoli)",
  brideParents: "सौ. उज्वला व श्री. सुहास कुलकर्णी (Sou. Ujwala & Shri Suhas Kulkarni)",
  dressCodeTitle: "Traditional & Formal Attire",
  dressCodeDescription: "Traditional Indian Attire or Formals",
  // Standard 22-character WhatsApp group invite code format:
  whatsappGroupLink: "https://chat.whatsapp.com/BdEWWp6CwF4HfXrc4V1fQB",
  contactPersons: [
    {
      name: "Shri Vishodhan Mangoli (Groom's Brother)",
      role: "Guest Coordinator",
      phone: "+91 9503881180"
    },
    {
      name: "Shri Vivek Mangoli (Groom's Father)",
      role: "Guest Coordinator",
      phone: "+91 9545622001"
    }
  ],
  travelTips: []
};

export const INITIAL_WISHES: WishMessage[] = [
  {
    id: "w1",
    guestName: "प्रभाकर व सरोजिनी जोशी (Prabhakar & Sarojini Joshi)",
    relation: "Grandparents (आजोबा व आजी)",
    message: "सदा सुखी भव | May Lord Ganesha shower eternal bliss, health, and endless love upon Vishrut and Hemangi as you start your new auspicious journey together.",
    timestamp: Date.now() - 1000 * 60 * 60 * 24 * 3
  },
  {
    id: "w2",
    guestName: "निखिल व मानसी कुलकर्णी (Nikhil & Manasi Kulkarni)",
    relation: "Cousins (चुलत भाऊ-वहिनी)",
    message: "Heartiest congratulations Vishrut & Hemangi on your Sakharpuda! Can't wait to celebrate the ring ceremony with everyone at Hotel Regenta in Goa!",
    timestamp: Date.now() - 1000 * 60 * 60 * 14
  },
  {
    id: "w3",
    guestName: "अनिरुद्ध व श्वेता देशपांडे (Aniruddha & Shweta Deshpande)",
    relation: "Family Friends (कौटुंबिक स्नेही)",
    message: "हार्दिक मंगलमय शुभेच्छा! May your union be filled with joy, prosperity, and divine blessings. Looking forward to the Goa celebration!",
    timestamp: Date.now() - 1000 * 60 * 45
  }
];
