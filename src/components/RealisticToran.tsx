import React from 'react';

/**
 * RealisticToran:
 * Authentic, lavish Maharashtrian & Indian wedding toran (तोरण)
 * Handcrafted with dense, overlapping botanical marigold flowers (केशरी व सोनपिवळा झेंडू),
 * fragrant white Mogra buds (मोगरा), glossy fresh mango leaves (आम्रपल्लव),
 * and ornate hanging brass temple bells (पितळी घंटा).
 */
export const RealisticToran: React.FC = () => {
  // 5 Symmetrical arches across a 1440px width viewBox
  // Arch 3 (576 to 864) hangs gracefully in the exact center above the hero invocation
  const arches = [
    { startX: -10, midX: 135, endX: 288, midY: 66 },
    { startX: 288, midX: 432, endX: 576, midY: 70 },
    { startX: 576, midX: 720, endX: 864, midY: 74 }, // Center Arch
    { startX: 864, midX: 1008, endX: 1152, midY: 70 },
    { startX: 1152, midX: 1305, endX: 1450, midY: 66 },
  ];

  // Dense floral arrangement along the curved arches (60% overlap so it forms a thick continuous rope of flowers)
  const getArchFlowers = (arch: typeof arches[0], count: number, offset: number) => {
    const flowers = [];
    for (let i = 0; i <= count; i++) {
      const t = i / count;
      const x = Math.round((1 - t) * (1 - t) * arch.startX + 2 * (1 - t) * t * arch.midX + t * t * arch.endX);
      const y = Math.round((1 - t) * (1 - t) * 10 + 2 * (1 - t) * t * arch.midY + t * t * 10);
      // Alternating deep saffron marigold, golden marigold, and occasionally mogra
      const kind = (i + offset) % 2 === 0 ? 'saffron' : 'golden';
      const scale = 0.94 + ((i * 7) % 5) * 0.03;
      const rot = ((i * 47) % 360);
      flowers.push({ x, y, kind, scale, rot, index: i });
    }
    return flowers;
  };

  // Arch node junction points for hanging tassels
  const nodes = [0, 288, 576, 864, 1152, 1440];

  return (
    <div className="relative z-30 w-full flex justify-center pointer-events-none select-none overflow-hidden -mt-1 sm:-mt-2">
      <svg
        viewBox="0 0 1440 185"
        preserveAspectRatio="xMidYMin slice"
        className="w-full h-28 sm:h-36 md:h-44 drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]"
      >
        <defs>
          {/* Natural Depth Shadow for 3D Layered Flowers */}
          <filter id="flowerDepth" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.38" />
          </filter>

          <filter id="leafDepth" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.3" />
          </filter>

          {/* Deep Saffron / Keshari Marigold Radial Gradient */}
          <radialGradient id="saffronRuffleGrad" cx="50%" cy="46%" r="52%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="20%" stopColor="#FFB74D" />
            <stop offset="50%" stopColor="#F57C00" />
            <stop offset="80%" stopColor="#E65100" />
            <stop offset="100%" stopColor="#BF360C" />
          </radialGradient>

          {/* Bright Golden Yellow / Sonpivla Marigold Radial Gradient */}
          <radialGradient id="goldenRuffleGrad" cx="50%" cy="46%" r="52%">
            <stop offset="0%" stopColor="#FFFFF0" />
            <stop offset="22%" stopColor="#FFF59D" />
            <stop offset="55%" stopColor="#FFCA28" />
            <stop offset="85%" stopColor="#FFA000" />
            <stop offset="100%" stopColor="#E65100" />
          </radialGradient>

          {/* Velvety Saffron Petal Center */}
          <radialGradient id="fluffySaffronCore" cx="45%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFF8E1" />
            <stop offset="35%" stopColor="#FFA726" />
            <stop offset="75%" stopColor="#E65100" />
            <stop offset="100%" stopColor="#BF360C" />
          </radialGradient>

          {/* Velvety Golden Petal Center */}
          <radialGradient id="fluffyGoldenCore" cx="45%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FFEE58" />
            <stop offset="80%" stopColor="#FFB300" />
            <stop offset="100%" stopColor="#E65100" />
          </radialGradient>

          {/* Botanical Glossy Mango Leaf Gradient */}
          <linearGradient id="mangoLeafGloss" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#43A047" />
            <stop offset="30%" stopColor="#2E7D32" />
            <stop offset="70%" stopColor="#1B5E20" />
            <stop offset="100%" stopColor="#0B3D11" />
          </linearGradient>

          {/* Mogra Jasmine Bud Gradient */}
          <radialGradient id="mograBudGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="65%" stopColor="#FFFDE7" />
            <stop offset="90%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#43A047" />
          </radialGradient>

          {/* Sacred Kalawa Woven Thread */}
          <linearGradient id="sacredRope" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B71C1C" />
            <stop offset="25%" stopColor="#F57C00" />
            <stop offset="50%" stopColor="#FFD54F" />
            <stop offset="75%" stopColor="#F57C00" />
            <stop offset="100%" stopColor="#B71C1C" />
          </linearGradient>

          {/* Polished Temple Brass Bell Gradient */}
          <linearGradient id="templeBrass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8DC" />
            <stop offset="25%" stopColor="#F5D77F" />
            <stop offset="60%" stopColor="#D4AF37" />
            <stop offset="85%" stopColor="#AA7A1E" />
            <stop offset="100%" stopColor="#664604" />
          </linearGradient>

          {/* 1. REALISTIC SAFFRON MARIGOLD (केशरी झेंडू) - Dense Multi-Ruffled Rosette */}
          <g id="lushSaffronMarigold" filter="url(#flowerDepth)">
            {/* Calyx backing shadow */}
            <circle cx="0" cy="0" r="16.5" fill="#A83204" opacity="0.45" />
            {/* Outer ruffled petal tier (14 lobes) */}
            <path
              d="M 19.8 0.0 L 16.9 1.9 L 13.8 3.2 L 16.0 5.6 L 17.8 8.6 L 14.4 9.0 L 11.1 8.9 L 12.0 12.0 L 12.3 15.5 L 9.0 14.4 L 6.2 12.8 L 5.6 16.0 L 4.4 19.3 L 1.9 16.9 L 0.0 14.2 L -1.9 16.9 L -4.4 19.3 L -5.6 16.0 L -6.2 12.8 L -9.0 14.4 L -12.3 15.5 L -12.0 12.0 L -11.1 8.9 L -14.4 9.0 L -17.8 8.6 L -16.0 5.6 L -13.8 3.2 L -16.9 1.9 L -19.8 0.0 L -16.9 -1.9 L -13.8 -3.2 L -16.0 -5.6 L -17.8 -8.6 L -14.4 -9.0 L -11.1 -8.9 L -12.0 -12.0 L -12.3 -15.5 L -9.0 -14.4 L -6.2 -12.8 L -5.6 -16.0 L -4.4 -19.3 L -1.9 -16.9 L -0.0 -14.2 L 1.9 -16.9 L 4.4 -19.3 L 5.6 -16.0 L 6.2 -12.8 L 9.0 -14.4 L 12.3 -15.5 L 12.0 -12.0 L 11.1 -8.9 L 14.4 -9.0 L 17.8 -8.6 L 16.0 -5.6 L 13.8 -3.2 L 16.9 -1.9 Z"
              fill="url(#saffronRuffleGrad)"
            />
            {/* Middle ruffled petal tier (12 lobes, rotated) */}
            <path
              d="M 15.2 0.0 L 12.9 1.7 L 10.4 2.8 L 12.0 5.0 L 13.2 7.6 L 10.3 7.9 L 7.6 7.6 L 7.9 10.3 L 7.6 13.2 L 5.0 12.0 L 2.8 10.4 L 1.7 12.9 L 0.0 15.2 L -1.7 12.9 L -2.8 10.4 L -5.0 12.0 L -7.6 13.2 L -7.9 10.3 L -7.6 7.6 L -10.3 7.9 L -13.2 7.6 L -12.0 5.0 L -10.4 2.8 L -12.9 1.7 L -15.2 0.0 L -12.9 -1.7 L -10.4 -2.8 L -12.0 -5.0 L -13.2 -7.6 L -10.3 -7.9 L -7.6 -7.6 L -7.9 -10.3 L -7.6 -13.2 L -5.0 -12.0 L -2.8 -10.4 L -1.7 -12.9 L -0.0 -15.2 L 1.7 -12.9 L 2.8 -10.4 L 5.0 -12.0 L 7.6 -13.2 L 7.9 -10.3 L 7.6 -7.6 L 10.3 -7.9 L 13.2 -7.6 L 12.0 -5.0 L 10.4 -2.8 L 12.9 -1.7 Z"
              fill="#F57C00"
              transform="rotate(15)"
            />
            {/* Inner ruffled petal tier (10 lobes) */}
            <path
              d="M 10.8 0.0 L 8.9 1.4 L 6.8 2.2 L 8.0 4.1 L 8.7 6.3 L 6.4 6.4 L 4.2 5.8 L 4.1 8.0 L 3.3 10.3 L 1.4 8.9 L 0.0 7.2 L -1.4 8.9 L -3.3 10.3 L -4.1 8.0 L -4.2 5.8 L -6.4 6.4 L -8.7 6.3 L -8.0 4.1 L -6.8 2.2 L -8.9 1.4 L -10.8 0.0 L -8.9 -1.4 L -6.8 -2.2 L -8.0 -4.1 L -8.7 -6.3 L -6.4 -6.4 L -4.2 -5.8 L -4.1 -8.0 L -3.3 -10.3 L -1.4 -8.9 L -0.0 -7.2 L 1.4 -8.9 L 3.3 -10.3 L 4.1 -8.0 L 4.2 -5.8 L 6.4 -6.4 L 8.7 -6.3 L 8.0 -4.1 L 6.8 -2.2 L 8.9 -1.4 Z"
              fill="#FFA726"
              transform="rotate(30)"
            />
            {/* Dense Fluffy Pompom Center - Full Volume, NO Holes, NO Dark Donuts! */}
            <path
              d="M 6.2 0.0 L 4.9 1.0 L 3.5 1.5 L 4.2 2.8 L 4.4 4.4 L 2.8 4.2 L 1.5 3.5 L 1.0 4.9 L 0.0 6.2 L -1.0 4.9 L -1.5 3.5 L -2.8 4.2 L -4.4 4.4 L -4.2 2.8 L -3.5 1.5 L -4.9 1.0 L -6.2 0.0 L -4.9 -1.0 L -3.5 -1.5 L -4.2 -2.8 L -4.4 -4.4 L -2.8 -4.2 L -1.5 -3.5 L -1.0 -4.9 L -0.0 -6.2 L 1.0 -4.9 L 1.5 -3.5 L 2.8 -4.2 L 4.4 -4.4 L 4.2 -2.8 L 3.5 -1.5 L 4.9 -1.0 Z"
              fill="url(#fluffySaffronCore)"
              transform="rotate(45)"
            />
            {/* Velvety flower petal tips in center */}
            <circle cx="-1" cy="-1" r="2.2" fill="#FFE082" />
            <circle cx="1.2" cy="1" r="1.8" fill="#FFB74D" />
            <circle cx="0.2" cy="-0.2" r="1.2" fill="#FFF8E1" />
          </g>

          {/* 2. REALISTIC GOLDEN YELLOW MARIGOLD (सोनपिवळा झेंडू) */}
          <g id="lushGoldenMarigold" filter="url(#flowerDepth)">
            <circle cx="0" cy="0" r="16.5" fill="#E65100" opacity="0.38" />
            <path
              d="M 19.8 0.0 L 16.9 1.9 L 13.8 3.2 L 16.0 5.6 L 17.8 8.6 L 14.4 9.0 L 11.1 8.9 L 12.0 12.0 L 12.3 15.5 L 9.0 14.4 L 6.2 12.8 L 5.6 16.0 L 4.4 19.3 L 1.9 16.9 L 0.0 14.2 L -1.9 16.9 L -4.4 19.3 L -5.6 16.0 L -6.2 12.8 L -9.0 14.4 L -12.3 15.5 L -12.0 12.0 L -11.1 8.9 L -14.4 9.0 L -17.8 8.6 L -16.0 5.6 L -13.8 3.2 L -16.9 1.9 L -19.8 0.0 L -16.9 -1.9 L -13.8 -3.2 L -16.0 -5.6 L -17.8 -8.6 L -14.4 -9.0 L -11.1 -8.9 L -12.0 -12.0 L -12.3 -15.5 L -9.0 -14.4 L -6.2 -12.8 L -5.6 -16.0 L -4.4 -19.3 L -1.9 -16.9 L -0.0 -14.2 L 1.9 -16.9 L 4.4 -19.3 L 5.6 -16.0 L 6.2 -12.8 L 9.0 -14.4 L 12.3 -15.5 L 12.0 -12.0 L 11.1 -8.9 L 14.4 -9.0 L 17.8 -8.6 L 16.0 -5.6 L 13.8 -3.2 L 16.9 -1.9 Z"
              fill="url(#goldenRuffleGrad)"
            />
            <path
              d="M 15.2 0.0 L 12.9 1.7 L 10.4 2.8 L 12.0 5.0 L 13.2 7.6 L 10.3 7.9 L 7.6 7.6 L 7.9 10.3 L 7.6 13.2 L 5.0 12.0 L 2.8 10.4 L 1.7 12.9 L 0.0 15.2 L -1.7 12.9 L -2.8 10.4 L -5.0 12.0 L -7.6 13.2 L -7.9 10.3 L -7.6 7.6 L -10.3 7.9 L -13.2 7.6 L -12.0 5.0 L -10.4 2.8 L -12.9 1.7 L -15.2 0.0 L -12.9 -1.7 L -10.4 -2.8 L -12.0 -5.0 L -13.2 -7.6 L -10.3 -7.9 L -7.6 -7.6 L -7.9 -10.3 L -7.6 -13.2 L -5.0 -12.0 L -2.8 -10.4 L -1.7 -12.9 L -0.0 -15.2 L 1.7 -12.9 L 2.8 -10.4 L 5.0 -12.0 L 7.6 -13.2 L 7.9 -10.3 L 7.6 -7.6 L 10.3 -7.9 L 13.2 -7.6 L 12.0 -5.0 L 10.4 -2.8 L 12.9 -1.7 Z"
              fill="#FFCA28"
              transform="rotate(18)"
            />
            <path
              d="M 10.8 0.0 L 8.9 1.4 L 6.8 2.2 L 8.0 4.1 L 8.7 6.3 L 6.4 6.4 L 4.2 5.8 L 4.1 8.0 L 3.3 10.3 L 1.4 8.9 L 0.0 7.2 L -1.4 8.9 L -3.3 10.3 L -4.1 8.0 L -4.2 5.8 L -6.4 6.4 L -8.7 6.3 L -8.0 4.1 L -6.8 2.2 L -8.9 1.4 L -10.8 0.0 L -8.9 -1.4 L -6.8 -2.2 L -8.0 -4.1 L -8.7 -6.3 L -6.4 -6.4 L -4.2 -5.8 L -4.1 -8.0 L -3.3 -10.3 L -1.4 -8.9 L -0.0 -7.2 L 1.4 -8.9 L 3.3 -10.3 L 4.1 -8.0 L 4.2 -5.8 L 6.4 -6.4 L 8.7 -6.3 L 8.0 -4.1 L 6.8 -2.2 L 8.9 -1.4 Z"
              fill="#FFD54F"
              transform="rotate(35)"
            />
            <path
              d="M 6.2 0.0 L 4.9 1.0 L 3.5 1.5 L 4.2 2.8 L 4.4 4.4 L 2.8 4.2 L 1.5 3.5 L 1.0 4.9 L 0.0 6.2 L -1.0 4.9 L -1.5 3.5 L -2.8 4.2 L -4.4 4.4 L -4.2 2.8 L -3.5 1.5 L -4.9 1.0 L -6.2 0.0 L -4.9 -1.0 L -3.5 -1.5 L -4.2 -2.8 L -4.4 -4.4 L -2.8 -4.2 L -1.5 -3.5 L -1.0 -4.9 L -0.0 -6.2 L 1.0 -4.9 L 1.5 -3.5 L 2.8 -4.2 L 4.4 -4.4 L 4.2 -2.8 L 3.5 -1.5 L 4.9 -1.0 Z"
              fill="url(#fluffyGoldenCore)"
              transform="rotate(50)"
            />
            <circle cx="-1" cy="-1" r="2.2" fill="#FFFFEE" />
            <circle cx="1.2" cy="1" r="1.8" fill="#FFF59D" />
            <circle cx="0.2" cy="-0.2" r="1.2" fill="#FFFFFF" />
          </g>

          {/* 3. GLOSSY BOTANICAL MANGO LEAF (आम्रपल्लव) with Veins & Sheen */}
          <g id="lushMangoLeaf" filter="url(#leafDepth)">
            {/* Graceful lanceolate leaf contour */}
            <path
              d="M0,0 C-9,18 -13,44 -4,68 C-1,76 0,80 0,80 C0,80 1,76 4,68 C13,44 9,18 0,0 Z"
              fill="url(#mangoLeafGloss)"
              stroke="#0B3D11"
              strokeWidth="0.5"
            />
            {/* Prominent lighter central vein */}
            <path d="M0,2 L0,74" stroke="#81C784" strokeWidth="1.2" opacity="0.9" />
            {/* Lateral fine veins */}
            <path
              d="M0,16 Q-6,22 -8,28 M0,26 Q6,32 8,38 M0,36 Q-7,42 -9,48 M0,46 Q7,52 8,58 M0,56 Q-6,62 -7,66"
              stroke="#A5D6A7"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.65"
              fill="none"
            />
            {/* Glossy specular highlight */}
            <path
              d="M-2,10 C-5,22 -6,38 -2,50"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.35"
              fill="none"
            />
          </g>

          {/* 4. DELICATE WHITE MOGRA (JASMINE) BLOSSOM BUD */}
          <g id="lushMograBud">
            {/* Green calyx cap */}
            <path d="M-4,4 C-2,10 2,10 4,4 Z" fill="#2E7D32" />
            {/* Creamy white folded jasmine petals */}
            <path
              d="M0,-10 C-5,-5 -6,2 -2,7 C0,8 2,8 4,6 C7,2 5,-5 0,-10 Z"
              fill="url(#mograBudGrad)"
            />
            <path
              d="M-2,-8 C2,-6 6,-1 3,5 C1,7 -2,6 -3,3 C-4,1 -3,-6 -2,-8 Z"
              fill="#FFFFFF"
              opacity="0.9"
            />
            <circle cx="0.5" cy="-0.5" r="1.8" fill="#FFF9C4" />
          </g>

          {/* 5. ORNATE BRASS TEMPLE BELL (पितळी घंटा) with Golden Bead String */}
          <g id="lushBrassBell">
            {/* Golden bead string */}
            <line x1="0" y1="0" x2="0" y2="18" stroke="#D4AF37" strokeWidth="1.6" />
            <circle cx="0" cy="6" r="2.2" fill="#FFF2B2" stroke="#AA7A1E" strokeWidth="0.5" />
            <circle cx="0" cy="13" r="2.5" fill="#FFF2B2" stroke="#AA7A1E" strokeWidth="0.5" />
            {/* Bell suspension loop */}
            <circle cx="0" cy="19" r="3.2" fill="none" stroke="#D4AF37" strokeWidth="1.4" />
            {/* Bell body */}
            <path
              d="M-7,22 C-7,20 7,20 7,22 C8,28 14,35 15,40 C15,43 11,44 0,44 C-11,44 -15,43 -15,40 C-14,35 -8,28 -7,22 Z"
              fill="url(#templeBrass)"
              stroke="#855A08"
              strokeWidth="0.8"
            />
            {/* Engraved rim band on bell */}
            <path d="M-13,38 Q0,40 13,38" stroke="#FFF2B2" strokeWidth="1" fill="none" opacity="0.85" />
            {/* Bell clapper / tongue */}
            <circle cx="0" cy="46" r="3.2" fill="#855A08" stroke="#D4AF37" strokeWidth="0.8" />
            {/* Shiny highlight */}
            <path d="M-5,24 C-4,30 -8,36 -9,39" stroke="#FFF8DC" strokeWidth="1.2" fill="none" opacity="0.75" />
          </g>
        </defs>

        {/* ============================================================ */}
        {/* LAYER 1: Dense Background Mango Leaves along Top Lintel     */}
        {/* ============================================================ */}
        <g opacity="0.96">
          {Array.from({ length: 64 }).map((_, idx) => {
            const x = idx * 23 - 8;
            const rot = ((idx % 7) - 3) * 6;
            const scale = 0.58 + (idx % 3) * 0.05;
            return (
              <use
                key={`bg-leaf-${idx}`}
                href="#lushMangoLeaf"
                x={x}
                y="0"
                transform={`scale(${scale}) rotate(${rot}, ${x}, 0)`}
              />
            );
          })}
        </g>

        {/* ============================================================ */}
        {/* LAYER 2: Sacred Woven Red & Gold Thread (कलावा दोरी)        */}
        {/* ============================================================ */}
        <path
          d="M -20,6 L 1460,6"
          stroke="url(#sacredRope)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* ============================================================ */}
        {/* LAYER 3: Dense Top Horizontal Garland Band (अखंड झेंडू माळ) */}
        {/* 90+ Tightly overlapping flowers running 100% edge-to-edge   */}
        {/* ============================================================ */}
        <g>
          {Array.from({ length: 92 }).map((_, idx) => {
            const x = idx * 16 - 10;
            const isSaffron = idx % 2 === 0;
            const href = isSaffron ? '#lushSaffronMarigold' : '#lushGoldenMarigold';
            const rot = (idx * 37) % 360;
            const scale = 0.88 + (idx % 3) * 0.06;
            return (
              <use
                key={`top-garland-${idx}`}
                href={href}
                x={x}
                y="8"
                transform={`scale(${scale}) rotate(${rot}, ${x}, 8)`}
              />
            );
          })}
        </g>

        {/* ============================================================ */}
        {/* LAYER 4: 5 Lavish Scalloped Floral Arches (तोरण कमानी)      */}
        {/* Dense 26-flower continuous braided garland curves            */}
        {/* ============================================================ */}
        {arches.map((arch, archIdx) => {
          const flowers = getArchFlowers(arch, 26, archIdx * 3);

          return (
            <g key={`arch-group-${archIdx}`}>
              {/* Natural garland shadow string behind flowers */}
              <path
                d={`M${arch.startX},10 Q${arch.midX},${arch.midY + 4} ${arch.endX},10`}
                fill="none"
                stroke="#1A0B05"
                strokeWidth="10"
                opacity="0.3"
                strokeLinecap="round"
              />

              {/* Mango leaves nestled along the curve facing downwards */}
              {flowers
                .filter((_, fIdx) => fIdx % 3 === 1)
                .map((fl, fIdx) => {
                  const leafRot = ((fIdx * 23) % 40) - 20;
                  return (
                    <use
                      key={`arch-${archIdx}-leaf-${fIdx}`}
                      href="#lushMangoLeaf"
                      x={fl.x}
                      y={fl.y - 4}
                      transform={`scale(0.48) rotate(${leafRot}, ${fl.x}, ${fl.y - 4})`}
                    />
                  );
                })}

              {/* Densely packed, overlapping marigolds along the arch */}
              {flowers.map((fl, fIdx) => {
                const href =
                  fl.kind === 'saffron' ? '#lushSaffronMarigold' : '#lushGoldenMarigold';

                return (
                  <use
                    key={`arch-${archIdx}-flower-${fIdx}`}
                    href={href}
                    x={fl.x}
                    y={fl.y}
                    transform={`scale(${fl.scale}) rotate(${fl.rot}, ${fl.x}, ${fl.y})`}
                  />
                );
              })}

              {/* Mogra buds tucked delicately between marigolds */}
              {flowers
                .filter((_, fIdx) => fIdx % 4 === 2)
                .map((fl, fIdx) => (
                  <use
                    key={`arch-${archIdx}-mogra-${fIdx}`}
                    href="#lushMograBud"
                    x={fl.x + 2}
                    y={fl.y + 14}
                    transform="scale(0.95)"
                  />
                ))}
            </g>
          );
        })}

        {/* ============================================================ */}
        {/* LAYER 5: Hanging Floral Tassels at Arch Nodes & Centers     */}
        {/* With mango leaf crowns, marigold clusters & temple bells    */}
        {/* ============================================================ */}
        {nodes.map((nodeX, idx) => (
          <g key={`node-tassel-${idx}`} transform={`translate(${nodeX}, 10)`}>
            {/* Fan of 3 glossy mango leaves at top of tassel */}
            <use href="#lushMangoLeaf" x="-8" y="0" transform="rotate(-26) scale(0.68)" />
            <use href="#lushMangoLeaf" x="8" y="0" transform="rotate(26) scale(0.68)" />
            <use href="#lushMangoLeaf" x="0" y="4" transform="scale(0.72)" />

            {/* Rosette cluster of flowers at junction node */}
            <use href="#lushSaffronMarigold" x="-7" y="10" transform="scale(0.85)" />
            <use href="#lushGoldenMarigold" x="7" y="10" transform="scale(0.85)" />
            <use href="#lushSaffronMarigold" x="0" y="14" transform="scale(0.95)" />

            {/* Vertical cascading garland strand */}
            <use href="#lushMograBud" x="0" y="32" transform="scale(1.2)" />
            <use href="#lushGoldenMarigold" x="0" y="46" transform="scale(0.82)" />
            <use href="#lushMograBud" x="0" y="60" transform="scale(1.15)" />
            <use href="#lushSaffronMarigold" x="0" y="73" transform="scale(0.78)" />

            {/* Ornate Brass Temple Bell at the bottom of the tassel */}
            <use href="#lushBrassBell" x="0" y="86" transform="scale(0.95)" />
          </g>
        ))}

        {/* Center of each arch: Additional miniature floral drop with bell */}
        {arches.map((arch, idx) => (
          <g key={`center-drop-${idx}`} transform={`translate(${arch.midX}, ${arch.midY})`}>
            <use href="#lushMangoLeaf" x="-5" y="0" transform="rotate(-18) scale(0.52)" />
            <use href="#lushMangoLeaf" x="5" y="0" transform="rotate(18) scale(0.52)" />
            <use href="#lushGoldenMarigold" x="0" y="8" transform="scale(0.8)" />
            <use href="#lushMograBud" x="0" y="24" transform="scale(1.1)" />
            <use href="#lushSaffronMarigold" x="0" y="36" transform="scale(0.72)" />
            <use href="#lushBrassBell" x="0" y="46" transform="scale(0.85)" />
          </g>
        ))}
      </svg>
    </div>
  );
};
