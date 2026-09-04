import React from 'react';

interface GaneshaSilhouetteProps {
  className?: string;
  size?: number;
}

/**
 * Detailed Traditional Maharashtrian Ganesha Silhouette (श्री गणपती बाप्पा)
 * Optimized for high-contrast crispness at mobile and desktop sizes.
 * Distinct crown, ears, Chandrakor tilak, graceful trunk, and blessing mudra.
 */
export const GaneshaSilhouette: React.FC<GaneshaSilhouetteProps> = ({
  className = '',
  size = 115,
}) => {
  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <svg
        width={size}
        height={Math.round(size * 1.15)}
        viewBox="0 0 140 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-[0_2px_8px_rgba(158,42,43,0.18)]"
      >
        <defs>
          {/* Radiant Royal Gold Gradient */}
          <linearGradient id="ganeshaGoldMain" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4BC" />
            <stop offset="30%" stopColor="#F7DC78" />
            <stop offset="70%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#9E7618" />
          </linearGradient>

          {/* Contrast Maroon Shade for Inner Details */}
          <linearGradient id="ganeshaMaroon" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9E2A2B" />
            <stop offset="100%" stopColor="#671112" />
          </linearGradient>

          {/* Halo Glow */}
          <radialGradient id="ganeshaHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2B2" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#E6B837" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Divine Radiant Halo (प्रभावळ) */}
        <circle cx="70" cy="54" r="36" fill="url(#ganeshaHalo)" />
        <circle
          cx="70"
          cy="54"
          r="34"
          stroke="#D4AF37"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          opacity="0.8"
        />

        {/* 2. Ornate Royal Crown (मुकुट / किरीट) */}
        {/* Crown Pinnacle / Kalash */}
        <path
          d="M70 6 L73 14 L67 14 Z M70 4 A2 2 0 1 1 70 8 A2 2 0 1 1 70 4"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1"
        />
        {/* Upper Tier */}
        <path
          d="M65 14 Q70 11 75 14 L77 22 Q70 19 63 22 Z"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1.2"
        />
        {/* Middle Tier with cutwork */}
        <path
          d="M60 23 Q70 19 80 23 L83 32 Q70 27 57 32 Z"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1.2"
        />
        <circle cx="70" cy="27" r="1.8" fill="#9E2A2B" />
        <circle cx="64" cy="27" r="1.2" fill="#FFFFFF" />
        <circle cx="76" cy="27" r="1.2" fill="#FFFFFF" />

        {/* Lower Crown Band */}
        <path
          d="M55 33 Q70 29 85 33 L87 40 Q70 36 53 40 Z"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1.2"
        />

        {/* 3. Auspicious Ears (सुपर्ण कर्ण) with Kundals */}
        {/* Right Ear (Viewer's Left) */}
        <path
          d="M54 40 C38 36 26 46 28 62 C30 73 42 76 52 70 C54 62 55 50 55 40 Z"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1.4"
        />
        {/* Right Ear Inner Arch */}
        <path
          d="M48 47 C40 48 35 53 37 62 C38 67 44 69 49 66"
          stroke="#9E2A2B"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Right Kundal */}
        <circle cx="29" cy="65" r="3.2" fill="url(#ganeshaGoldMain)" stroke="#9E2A2B" strokeWidth="1" />
        <circle cx="29" cy="65" r="1.4" fill="#9E2A2B" />

        {/* Left Ear (Viewer's Right) */}
        <path
          d="M86 40 C102 36 114 46 112 62 C110 73 98 76 88 70 C86 62 85 50 85 40 Z"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1.4"
        />
        {/* Left Ear Inner Arch */}
        <path
          d="M92 47 C100 48 105 53 103 62 C102 67 96 69 91 66"
          stroke="#9E2A2B"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
        />
        {/* Left Kundal */}
        <circle cx="111" cy="65" r="3.2" fill="url(#ganeshaGoldMain)" stroke="#9E2A2B" strokeWidth="1" />
        <circle cx="111" cy="65" r="1.4" fill="#9E2A2B" />

        {/* 4. Forehead and Divine Face Dome */}
        <path
          d="M54 40 Q70 36 86 40 Q88 52 84 60 Q70 63 56 60 Q52 52 54 40 Z"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1.2"
        />

        {/* Auspicious Chandrakor & Red Sindoor Tilak (चंद्रकोर व टिळा) */}
        <path
          d="M64 45 Q70 49 76 45 Q70 46.8 64 45 Z"
          fill="url(#ganeshaMaroon)"
        />
        <line x1="70" y1="42" x2="70" y2="52" stroke="#9E2A2B" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="70" cy="54" r="1.8" fill="#9E2A2B" />
        <circle cx="70" cy="48" r="1" fill="#FFF4BC" />

        {/* Benevolent Eyes */}
        <path d="M59 55 Q63 52 66 55 Q62 57 59 55 Z" fill="#671112" />
        <circle cx="62.5" cy="54.5" r="0.7" fill="#FFFFFF" />
        <path d="M74 55 Q77 52 81 55 Q78 57 74 55 Z" fill="#671112" />
        <circle cx="77.5" cy="54.5" r="0.7" fill="#FFFFFF" />

        {/* Tusks (Ekdanta) */}
        {/* Right tusk */}
        <path d="M62 63 L57 67 L62 68 Z" fill="#FFFFFF" stroke="#9E2A2B" strokeWidth="0.8" />
        {/* Left broken tusk */}
        <path d="M78 63 L82 66 L78 67 Z" fill="#FFFFFF" stroke="#9E2A2B" strokeWidth="0.8" />

        {/* 5. Graceful Curved Trunk (वक्रतुंड सोंड) turning to left holding Modak */}
        <path
          d="M65 60 Q70 62 75 60 C74 70 75 80 73 90 C71 99 65 106 56 107 C47 108 40 101 42 92 C44 84 53 84 57 89 C60 93 57 98 52 98 C49 98 48 95 50 93 C52 91 55 93 53 95 C52 96 50 95 50 94 C51 90 58 91 59 95 C60 101 52 103 46 99 C43 96 44 89 47 85 C53 73 64 72 65 60 Z"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1.5"
        />
        {/* Crisp Trunk Folds (वलये) */}
        <path d="M66 69 Q69 71 72 69" stroke="#9E2A2B" strokeWidth="1.2" fill="none" />
        <path d="M65 76 Q68 78 71 76" stroke="#9E2A2B" strokeWidth="1.2" fill="none" />
        <path d="M63 84 Q66 86 69 84" stroke="#9E2A2B" strokeWidth="1.2" fill="none" />

        {/* Auspicious Golden Modak on Trunk Tip */}
        <ellipse cx="40" cy="93" rx="4.5" ry="5.5" fill="#FFD54F" stroke="#9E2A2B" strokeWidth="1" />
        <path d="M40 88 L38 97 M40 88 L42 97" stroke="#9E2A2B" strokeWidth="0.8" />

        {/* 6. Divine Arms & Hands */}
        {/* Right Hand: Abhaya Mudra (आशीर्वाद हस्त) */}
        <path
          d="M47 80 C38 84 33 90 35 98 C37 103 44 103 49 96 C51 92 53 87 51 82 Z"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1.3"
        />
        {/* Blessing symbol on palm */}
        <circle cx="41" cy="95" r="3" fill="#9E2A2B" />
        <circle cx="41" cy="95" r="1.2" fill="#FFF4BC" />

        {/* Left Hand: Holding bowl of Modaks */}
        <path
          d="M93 80 C102 84 107 90 105 98 C103 103 96 103 91 96 C89 92 87 87 89 82 Z"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1.3"
        />
        {/* Modak bowl */}
        <path
          d="M96 95 C96 101 106 101 106 95 Z"
          fill="#D4AF37"
          stroke="#9E2A2B"
          strokeWidth="1"
        />
        <circle cx="98.5" cy="93.5" r="1.8" fill="#FFD54F" stroke="#9E2A2B" strokeWidth="0.6" />
        <circle cx="101" cy="92.5" r="2" fill="#FFC107" stroke="#9E2A2B" strokeWidth="0.6" />
        <circle cx="103.5" cy="93.5" r="1.8" fill="#FFD54F" stroke="#9E2A2B" strokeWidth="0.6" />

        {/* 7. Divine Body, Lambodara & Janeu */}
        <path
          d="M54 70 C44 76 39 87 41 100 C43 113 54 120 70 120 C86 120 97 113 99 100 C101 87 96 76 86 70 C82 77 78 84 70 84 C62 84 58 77 54 70 Z"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1.4"
        />
        {/* Sacred Janeu (यज्ञोपवीत) */}
        <path
          d="M58 72 Q67 88 86 104"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeDasharray="3 2"
          fill="none"
        />
        {/* Auspicious Necklace */}
        <path d="M57 66 Q70 74 83 66" stroke="#9E2A2B" strokeWidth="1.8" fill="none" />
        <circle cx="70" cy="72" r="2" fill="#FFD54F" stroke="#9E2A2B" strokeWidth="0.8" />

        {/* 8. Seated Posture (पद्मासन) */}
        <path
          d="M26 116 C26 107 37 105 48 112 C60 120 80 120 92 112 C103 105 114 107 114 116 C114 127 98 132 70 132 C42 132 26 127 26 116 Z"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1.4"
        />
        {/* Dhoti pleats */}
        <path
          d="M40 116 Q52 124 64 121 M76 121 Q88 124 100 116"
          stroke="#9E2A2B"
          strokeWidth="1.2"
          fill="none"
        />

        {/* 9. Sacred Blooming Lotus Throne (पद्मासन) */}
        <path
          d="M18 130 C28 124 42 130 52 133 C62 130 78 130 88 133 C98 130 112 124 122 130 C116 140 98 144 70 144 C42 144 24 140 18 130 Z"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1.4"
        />
        <path
          d="M14 136 C24 145 44 151 70 151 C96 151 116 145 126 136 C118 149 96 158 70 158 C44 158 22 149 14 136 Z"
          fill="url(#ganeshaGoldMain)"
          stroke="#9E2A2B"
          strokeWidth="1.4"
        />
        {/* Lotus petal contour lines */}
        <path
          d="M34 134 Q44 144 54 150 M106 134 Q96 144 86 150 M62 142 Q70 153 78 142"
          stroke="#9E2A2B"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    </div>
  );
};
