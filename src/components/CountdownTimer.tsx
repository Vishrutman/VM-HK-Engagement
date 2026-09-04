import React, { useState, useEffect } from 'react';
import { CountdownTime } from '../types';

interface CountdownTimerProps {
  targetTimestamp: number;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetTimestamp }) => {
  const calculateTimeLeft = (): CountdownTime => {
    const now = Date.now();
    const difference = targetTimestamp - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, isExpired: false };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-2">
      <div className="text-center mb-4">
        <p className="font-cinzel text-xs tracking-[0.3em] text-[#9E2A2B] font-bold uppercase">
          Countdown to Auspicious Muhurtham
        </p>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 w-full">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="bg-white p-3 sm:p-4 rounded-2xl shadow-sm text-center border border-[#D4AF37]/15 transition-transform hover:-translate-y-0.5"
          >
            <div className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-bold text-[#9E2A2B] leading-tight">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mt-1">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
