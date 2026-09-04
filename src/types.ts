export interface EventDetails {
  eventName: string;
  subTitle: string;
  date: string; // ISO or human readable
  isoDate?: string; // ISO datetime string e.g. "2026-09-21T10:30"
  targetTimestamp: number; // Unix epoch ms for countdown (derived from isoDate)
  durationHours?: number; // Ceremony duration in hours, e.g. 3.5 (10:30 AM – 2:00 PM)
  timeString: string;
  muhurthamTime: string;
  venueName: string;
  venueAddress: string;
  city: string;
  state: string;
  googleMapsUrl: string;
  appleMapsUrl: string;
  brideName: string;
  groomName: string;
  brideParents: string;
  groomParents: string;
  dressCodeTitle: string;
  dressCodeDescription: string;
  whatsappGroupLink: string;
  contactPersons: {
    name: string;
    role: string;
    phone: string;
  }[];
  travelTips: {
    title: string;
    distance: string;
    details: string;
  }[];
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export interface WishMessage {
  id: string;
  guestName: string;
  relation: string;
  message: string;
  timestamp: number;
}
