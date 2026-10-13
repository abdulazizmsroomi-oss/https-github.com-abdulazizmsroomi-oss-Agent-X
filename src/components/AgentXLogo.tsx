import React from 'react';

interface AgentXLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  showTagline?: boolean;
}

export const AgentXLogo: React.FC<AgentXLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  showTagline = false,
}) => {
  // Dimensions based on size
  const sizeMap = {
    sm: { width: 140, height: 48 },
    md: { width: 220, height: 75 },
    lg: { width: 320, height: 110 },
    xl: { width: 440, height: 150 },
  };

  const { width, height } = sizeMap[size];

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <svg
        viewBox="0 0 460 150"
        width={width}
        height={height}
        className="overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient definitions based on the vibrant graffiti tag image */}
          {/* Letter A: Yellow to Orange/Hot Pink */}
          <linearGradient id="grad-a" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#fffb00" />
            <stop offset="45%" stopColor="#ffb703" />
            <stop offset="80%" stopColor="#fb5607" />
            <stop offset="100%" stopColor="#ff007f" />
          </linearGradient>

          {/* Letter G: Hot Pink to Magenta/Purple */}
          <linearGradient id="grad-g" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff007f" />
            <stop offset="50%" stopColor="#ff00a0" />
            <stop offset="85%" stopColor="#d90429" />
            <stop offset="100%" stopColor="#7b2cbf" />
          </linearGradient>

          {/* Letter E: Cyan to Electric Blue */}
          <linearGradient id="grad-e" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5d4" />
            <stop offset="45%" stopColor="#00bbf9" />
            <stop offset="100%" stopColor="#3a86ff" />
          </linearGradient>

          {/* Letter N: Lime to Neon Green/Orange */}
          <linearGradient id="grad-n" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#70e000" />
            <stop offset="50%" stopColor="#38b000" />
            <stop offset="85%" stopColor="#ffd166" />
            <stop offset="100%" stopColor="#ff7b00" />
          </linearGradient>

          {/* Letter T: Neon Lime to Cyan */}
          <linearGradient id="grad-t" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9ef01a" />
            <stop offset="50%" stopColor="#00f5d4" />
            <stop offset="100%" stopColor="#0077b6" />
          </linearGradient>

          {/* Swoosh Underline: Magenta to Orange to Yellow */}
          <linearGradient id="grad-swoosh" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff007f" />
            <stop offset="40%" stopColor="#ff5400" />
            <stop offset="80%" stopColor="#ffb703" />
            <stop offset="100%" stopColor="#ffd60a" />
          </linearGradient>

          {/* Letter X Blade 1 (Top-Left to Bottom-Right): Royal Blue to Cyan */}
          <linearGradient id="grad-x-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4361ee" />
            <stop offset="50%" stopColor="#00b4d8" />
            <stop offset="100%" stopColor="#06d6a0" />
          </linearGradient>

          {/* Letter X Blade 2 (Top-Right to Bottom-Left): Neon Magenta to Purple */}
          <linearGradient id="grad-x-pink" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff007f" />
            <stop offset="45%" stopColor="#e0218a" />
            <stop offset="85%" stopColor="#7209b7" />
            <stop offset="100%" stopColor="#3a0ca3" />
          </linearGradient>

          {/* Drop shadow filters for realistic graffiti depth */}
          <filter id="graffiti-shadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="3" dy="4" stdDeviation="0" floodColor="#000000" floodOpacity="0.95" />
          </filter>
        </defs>

        {/* BACKGROUND SPRAY PAINT SPLATTERS */}
        <g opacity="0.9">
          {/* Cyan Splatters */}
          <circle cx="50" cy="25" r="4" fill="#00f5d4" />
          <circle cx="35" cy="40" r="2.5" fill="#00bbf9" />
          <circle cx="42" cy="70" r="6" fill="#00bbf9" />
          <circle cx="28" cy="95" r="3.5" fill="#00f5d4" />
          <path d="M 40 68 Q 30 75 32 85 Q 34 90 31 100" stroke="#00f5d4" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Pink/Magenta Splatters */}
          <circle cx="160" cy="20" r="4.5" fill="#ff007f" />
          <circle cx="180" cy="15" r="2.5" fill="#ff00a0" />
          <circle cx="140" cy="35" r="3" fill="#ff007f" />
          <circle cx="170" cy="130" r="4" fill="#ff007f" />
          <circle cx="180" cy="142" r="2.5" fill="#ff007f" />

          {/* Yellow/Orange Splatters */}
          <circle cx="85" cy="12" r="4" fill="#ffd60a" />
          <circle cx="110" cy="18" r="2.5" fill="#ffb703" />
          <circle cx="240" cy="20" r="3" fill="#ffd166" />
          <circle cx="270" cy="15" r="4" fill="#70e000" />

          {/* Blue & Purple Splatters around X */}
          <circle cx="350" cy="12" r="3.5" fill="#00b4d8" />
          <circle cx="380" cy="8" r="5" fill="#4361ee" />
          <circle cx="430" cy="25" r="3" fill="#ff007f" />
          <circle cx="445" cy="65" r="4.5" fill="#7209b7" />
          <circle cx="435" cy="115" r="3" fill="#ff007f" />
          <circle cx="410" cy="135" r="4" fill="#00b4d8" />
          <circle cx="320" cy="140" r="3" fill="#38b000" />
        </g>

        {/* 3D BLACK GRAFFITI OUTLINE UNDERLAYER */}
        <g fill="#000000" stroke="#000000" strokeWidth="9" strokeLinejoin="round" strokeLinecap="round" transform="translate(4, 5)">
          {/* A */}
          <path d="M 30 115 L 75 18 L 105 18 L 135 115 L 108 115 L 100 88 L 65 88 L 52 115 Z M 72 68 L 92 68 L 82 38 Z" />
          {/* G */}
          <path d="M 195 42 Q 170 18 140 28 Q 115 38 115 72 Q 115 105 142 115 Q 175 125 195 100 L 195 68 L 160 68 L 160 85 L 175 85 L 175 92 Q 160 102 142 96 Q 132 90 132 72 Q 132 50 148 44 Q 165 38 180 50 Z" />
          {/* E */}
          <path d="M 200 25 L 250 25 L 250 45 L 220 45 L 220 62 L 245 62 L 245 80 L 220 80 L 220 98 L 252 98 L 248 116 L 198 116 Z" />
          {/* N */}
          <path d="M 260 25 L 280 25 L 305 85 L 305 25 L 325 25 L 325 116 L 305 116 L 280 55 L 280 116 L 260 116 Z" />
          {/* T */}
          <path d="M 330 25 L 385 25 L 385 45 L 368 45 L 368 116 L 348 116 L 348 45 L 330 45 Z" />
          {/* Swoosh Underline */}
          <path d="M 115 120 C 180 112 280 115 315 125 C 270 135 180 132 115 120 Z" />
          {/* X */}
          <path d="M 365 20 L 415 82 L 460 20 L 490 20 L 435 88 L 492 148 L 460 148 L 410 88 L 360 148 L 330 148 L 390 82 L 340 20 Z" />
        </g>

        {/* MAIN VIBRANT GRAFFITI LETTERS WITH COLOR GRADIENTS */}
        <g stroke="#000000" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
          
          {/* LETTER A (Yellow to Orange/Pink) */}
          <g>
            <path
              d="M 30 115 L 75 18 L 105 18 L 135 115 L 108 115 L 100 88 L 65 88 L 52 115 Z"
              fill="url(#grad-a)"
            />
            {/* Inner A cutout */}
            <path d="M 72 68 L 92 68 L 82 38 Z" fill="#080d19" stroke="#000000" strokeWidth="3" />
            {/* A drips */}
            <path d="M 52 115 C 50 128 47 135 50 145 C 52 148 55 148 54 142 C 53 135 55 125 56 115 Z" fill="#ffb703" stroke="#000" strokeWidth="1.5" />
            <path d="M 125 115 C 127 125 128 132 126 138 C 125 140 123 138 123 130 C 122 125 123 118 123 115 Z" fill="#ff007f" stroke="#000" strokeWidth="1" />
          </g>

          {/* LETTER G (Hot Pink to Magenta/Purple) */}
          <g>
            <path
              d="M 195 42 Q 170 18 140 28 Q 115 38 115 72 Q 115 105 142 115 Q 175 125 195 100 L 195 68 L 160 68 L 160 85 L 175 85 L 175 92 Q 160 102 142 96 Q 132 90 132 72 Q 132 50 148 44 Q 165 38 180 50 Z"
              fill="url(#grad-g)"
            />
            {/* G Paint Drip */}
            <path d="M 165 118 C 167 128 168 138 166 146 C 165 148 163 148 163 142 C 162 135 163 125 164 118 Z" fill="#ff007f" stroke="#000" strokeWidth="1" />
          </g>

          {/* LETTER E (Cyan to Electric Blue) */}
          <g>
            <path
              d="M 200 25 L 250 25 L 250 45 L 220 45 L 220 62 L 245 62 L 245 80 L 220 80 L 220 98 L 252 98 L 248 116 L 198 116 Z"
              fill="url(#grad-e)"
            />
            {/* E Paint Drip */}
            <path d="M 215 116 C 216 124 218 132 216 140 C 215 142 213 141 213 134 C 212 128 213 120 214 116 Z" fill="#00bbf9" stroke="#000" strokeWidth="1" />
          </g>

          {/* LETTER N (Lime to Neon Yellow/Orange) */}
          <g>
            <path
              d="M 260 25 L 280 25 L 305 85 L 305 25 L 325 25 L 325 116 L 305 116 L 280 55 L 280 116 L 260 116 Z"
              fill="url(#grad-n)"
            />
            {/* N Paint Drip */}
            <path d="M 275 116 C 276 126 278 136 275 144 C 274 146 272 145 272 138 C 271 130 273 122 274 116 Z" fill="#ffd166" stroke="#000" strokeWidth="1" />
          </g>

          {/* LETTER T (Neon Lime to Cyan) */}
          <g>
            <path
              d="M 330 25 L 385 25 L 385 45 L 368 45 L 368 116 L 348 116 L 348 45 L 330 45 Z"
              fill="url(#grad-t)"
            />
            {/* T Paint Drip */}
            <path d="M 358 116 C 360 128 362 138 359 148 C 358 150 356 149 356 142 C 355 132 357 122 357 116 Z" fill="#00f5d4" stroke="#000" strokeWidth="1" />
          </g>

          {/* SWOOSH UNDERLINE (Magenta to Orange to Yellow) */}
          <g>
            <path
              d="M 115 120 C 180 112 280 115 315 125 C 270 135 180 132 115 120 Z"
              fill="url(#grad-swoosh)"
            />
            {/* Swoosh Drip */}
            <path d="M 225 128 C 227 138 229 148 226 156 C 225 158 223 158 223 150 C 222 142 224 133 224 128 Z" fill="#ff7b00" stroke="#000" strokeWidth="1" />
          </g>

          {/* LETTER X (Dynamic Crossing Brush Blades) */}
          <g>
            {/* Blade 1: Top-Left to Bottom-Right (Cyan/Blue) */}
            <path
              d="M 340 20 L 400 85 L 455 148 L 485 148 L 420 85 L 365 20 Z"
              fill="url(#grad-x-blue)"
            />
            {/* Blade 2: Top-Right to Bottom-Left (Magenta/Purple Crossing on Top) */}
            <path
              d="M 455 20 L 410 82 L 350 148 L 325 148 L 390 82 L 435 20 Z"
              fill="url(#grad-x-pink)"
            />

            {/* X Paint Drips */}
            <path d="M 335 148 C 337 158 338 168 335 176 C 334 178 332 177 332 170 C 331 162 333 154 334 148 Z" fill="#ff007f" stroke="#000" strokeWidth="1" />
            <path d="M 445 148 C 447 160 449 170 446 182 C 445 184 443 183 443 174 C 442 165 444 155 444 148 Z" fill="#00b4d8" stroke="#000" strokeWidth="1" />
            <circle cx="335" cy="182" r="2.5" fill="#ff007f" />
            <circle cx="446" cy="188" r="3" fill="#00b4d8" />
          </g>

        </g>
      </svg>

      {/* Subtitles & Badges */}
      {showSubtitle && (
        <div className="flex items-center gap-2 mt-0.5 pl-1">
          <span className="text-[11px] font-black tracking-wider uppercase bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
            GRC | Cybersecurity | Compliance
          </span>
        </div>
      )}

      {showTagline && (
        <div className="flex items-center gap-2 mt-1 pl-1">
          <span className="text-[10px] font-extrabold tracking-widest text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-500/50 shadow-sm shadow-emerald-500/20">
            FROM RISK TO TRUST
          </span>
          <span className="text-[10px] font-extrabold text-amber-300">
            👑 COMPLIANCE BUILDS TRUST
          </span>
        </div>
      )}
    </div>
  );
};
