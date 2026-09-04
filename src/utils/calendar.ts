import { EventDetails } from '../types';

function formatUtcForCalendar(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  );
}

function escapeIcsText(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/**
 * RFC 5545 §3.1 Line Folding: Lines of text SHOULD NOT be longer than 75 octets,
 * excluding CRLF. Long lines are split by inserting CRLF followed immediately by
 * a single white-space character (SPACE). Multi-byte UTF-8 characters (e.g. Devanagari)
 * must be measured in octets (bytes), not UTF-16 code units.
 */
function foldIcsLine(line: string, maxOctets: number = 75): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= maxOctets) {
    return line;
  }

  let result = '';
  let currentLineBytes = 0;
  let isFirstLine = true;

  for (const ch of line) {
    const chBytes = encoder.encode(ch).length;
    // Continuation lines start with a single space (1 octet), leaving maxOctets - 1 for text
    const limit = isFirstLine ? maxOctets : maxOctets - 1;

    if (currentLineBytes + chBytes > limit) {
      result += '\r\n ';
      currentLineBytes = 1 + chBytes;
      result += ch;
      isFirstLine = false;
    } else {
      result += ch;
      currentLineBytes += chBytes;
    }
  }

  return result;
}

export function getGoogleCalendarUrl(event: EventDetails): string {
  const durationMs = (event.durationHours || 3.5) * 60 * 60 * 1000;
  const startDate = new Date(event.targetTimestamp);
  const endDate = new Date(event.targetTimestamp + durationMs);

  const startUtc = formatUtcForCalendar(startDate);
  const endUtc = formatUtcForCalendar(endDate);
  const dates = `${startUtc}/${endUtc}`;

  const title = encodeURIComponent(`${event.eventName}: ${event.groomName} & ${event.brideName}`);
  const details = encodeURIComponent(
    `We cordially invite you to celebrate the auspicious Engagement Ceremony (Sakharpuda / साखरपुडा) of ${event.groomName} and ${event.brideName}.\n\n` +
    `Date: ${event.date}\n` +
    `Time: ${event.timeString}\n` +
    `Muhurtham: ${event.muhurthamTime}\n` +
    `Dress Code: ${event.dressCodeDescription || event.dressCodeTitle}\n\n` +
    `Venue: ${event.venueName}, ${event.venueAddress}, ${event.city}, ${event.state}`
  );
  const location = encodeURIComponent(`${event.venueName}, ${event.venueAddress}, ${event.city}, ${event.state}`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

export function downloadIcsFile(event: EventDetails): void {
  const durationMs = (event.durationHours || 3.5) * 60 * 60 * 1000;
  const startDate = new Date(event.targetTimestamp);
  const endDate = new Date(event.targetTimestamp + durationMs);
  const startUtc = formatUtcForCalendar(startDate);
  const endUtc = formatUtcForCalendar(endDate);
  const nowUtc = formatUtcForCalendar(new Date());

  const locationStr = `${event.venueName}, ${event.venueAddress}, ${event.city}, ${event.state}`;
  const summaryStr = `${event.eventName} (Sakharpuda): ${event.groomName} & ${event.brideName}`;
  const descriptionStr = `Auspicious Engagement Ceremony (Sakharpuda / साखरपुडा) of ${event.groomName} & ${event.brideName} at ${event.venueName}. ${event.muhurthamTime}. Dress code: ${event.dressCodeDescription || event.dressCodeTitle}`;

  const rawLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Traditional Marathi Sakharpuda Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:sakharpuda-${event.targetTimestamp}@invitation.goa`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${escapeIcsText(summaryStr)}`,
    `DESCRIPTION:${escapeIcsText(descriptionStr)}`,
    `LOCATION:${escapeIcsText(locationStr)}`,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "BEGIN:VALARM",
    "TRIGGER:-P1D",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeIcsText(`Reminder: ${event.groomName} & ${event.brideName}'s Sakharpuda Tomorrow!`)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ];

  const icsContent = rawLines.map((line) => foldIcsLine(line)).join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${event.groomName}_${event.brideName}_Sakharpuda.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

