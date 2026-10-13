import React from 'react';

interface SidebarGraffitiXProps {
  className?: string;
  size?: number;
}

export const SidebarGraffitiX: React.FC<SidebarGraffitiXProps> = ({
  className = '',
  size = 140
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 200 200"
        width={size}
        height={size}
        className="overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Blade 1 Gradient: Royal Blue -> Cyan -> Emerald */}
          <linearGradient id="sidebar-x-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="40%" stopColor="#00d2ff" />
            <stop offset="70%" stopColor="#00f5d4" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          {/* Blade 2 Gradient: Hot Pink -> Vivid Magenta -> Purple */}
          <linearGradient id="sidebar-x-magenta" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff007f" />
            <stop offset="35%" stopColor="#f72585" />
            <stop offset="70%" stopColor="#7209b7" />
            <stop offset="100%" stopColor="#3a0ca3" />
          </linearGradient>

          {/* Golden Yellow Accent for Splatters */}
          <linearGradient id="sidebar-x-gold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffd166" />
            <stop offset="100%" stopColor="#ff9f1c" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="x-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* BACKGROUND VIBRANT SPRAY SPLATTERS */}
        <g opacity="0.85">
          {/* Cyan/Blue splatters */}
          <circle cx="35" cy="45" r="4" fill="#00d2ff" />
          <circle cx="22" cy="70" r="2.5" fill="#00f5d4" />
          <circle cx="48" cy="28" r="3" fill="#2563eb" />
          <circle cx="160" cy="165" r="4" fill="#00d2ff" />
          <circle cx="175" cy="145" r="2.5" fill="#00f5d4" />
          <circle cx="185" cy="172" r="3" fill="#2563eb" />
          <path d="M 165 155 Q 175 168 180 180" stroke="#00d2ff" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Magenta/Pink splatters */}
          <circle cx="165" cy="35" r="4" fill="#ff007f" />
          <circle cx="178" cy="50" r="2" fill="#f72585" />
          <circle cx="150" cy="20" r="3.5" fill="#7209b7" />
          <circle cx="35" cy="155" r="4" fill="#ff007f" />
          <circle cx="20" cy="140" r="2.5" fill="#f72585" />
          <circle cx="25" cy="175" r="3.5" fill="#7209b7" />
          <path d="M 30 150 Q 22 165 18 182" stroke="#ff007f" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Yellow/Orange splatters */}
          <circle cx="95" cy="18" r="3" fill="#ffd166" />
          <circle cx="108" cy="182" r="3" fill="#ffd166" />
          <circle cx="85" cy="185" r="2" fill="#ff9f1c" />
        </g>

        {/* 3D DROP SHADOW UNDERLAYER */}
        <g fill="#000000" className="opacity-20 dark:opacity-60 transition-opacity" transform="translate(3, 4)">
          <path d="M 40 32 L 85 92 L 32 168 L 62 168 L 100 115 L 138 168 L 168 168 L 115 92 L 160 32 L 130 32 L 100 75 L 70 32 Z" />
        </g>

        {/* MAIN DYNAMIC GRAFFITI CROSSING BLADES */}
        <g stroke="#000000" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
          
          {/* Blade 1: Top-Left to Bottom-Right (Blue to Cyan to Emerald) */}
          <path
            d="M 38 30 L 88 95 L 142 170 L 172 170 L 118 95 L 68 30 Z"
            fill="url(#sidebar-x-cyan)"
          />
          {/* Cyan drips */}
          <path d="M 148 170 C 150 180 152 188 150 195 C 149 197 147 196 147 190 C 146 182 147 174 148 170 Z" fill="#00d2ff" stroke="#000" strokeWidth="1" />
          <circle cx="150" cy="198" r="2.5" fill="#00d2ff" />

          {/* Blade 2: Top-Right to Bottom-Left (Hot Pink to Magenta to Deep Purple) */}
          <path
            d="M 162 30 L 112 95 L 58 170 L 28 170 L 82 95 L 132 30 Z"
            fill="url(#sidebar-x-magenta)"
          />
          {/* Magenta drips */}
          <path d="M 38 170 C 40 180 42 190 39 196 C 38 198 36 197 36 190 C 35 182 37 174 38 170 Z" fill="#ff007f" stroke="#000" strokeWidth="1" />
          <circle cx="39" cy="199" r="2.5" fill="#ff007f" />

          {/* Center Intersection Paint Splatter Splash */}
          <circle cx="100" cy="95" r="9" fill="#00f5d4" opacity="0.9" />
          <circle cx="104" cy="98" r="6" fill="#ff007f" opacity="0.9" />
          <circle cx="98" cy="94" r="3" fill="#ffffff" />
        </g>

        {/* HIGHLIGHT BRUSH STROKES */}
        <g fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.75">
          <path d="M 46 36 L 82 86" />
          <path d="M 154 36 L 118 86" />
          <path d="M 94 104 L 136 162" />
          <path d="M 106 104 L 64 162" />
        </g>
      </svg>
    </div>
  );
};
