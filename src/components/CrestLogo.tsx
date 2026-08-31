import React from 'react';

interface CrestLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'full' | 'compact';
  showSubtitle?: boolean;
}

export const CrestLogo: React.FC<CrestLogoProps> = ({
  className = '',
  variant = 'full',
  showSubtitle = true,
}) => {
  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Visual Crest Emblem */}
      <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
        {/* Outer Laurel Wreath and Shield SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Laurel Leaves Left */}
          <path
            d="M20 70 C14 55 18 35 32 20 C32 24 30 32 34 38 C30 46 26 56 20 70 Z"
            fill="#E5A823"
            opacity="0.9"
          />
          <path
            d="M12 60 C10 48 15 36 24 26 C25 31 23 38 27 43 C23 50 18 56 12 60 Z"
            fill="#D49515"
          />
          <path
            d="M26 80 C18 72 15 62 16 52 C20 56 25 58 28 64 C28 70 27 75 26 80 Z"
            fill="#E5A823"
          />

          {/* Outer Laurel Leaves Right */}
          <path
            d="M80 70 C86 55 82 35 68 20 C68 24 70 32 66 38 C70 46 74 56 80 70 Z"
            fill="#E5A823"
            opacity="0.9"
          />
          <path
            d="M88 60 C90 48 85 36 76 26 C75 31 77 38 73 43 C77 50 82 56 88 60 Z"
            fill="#D49515"
          />
          <path
            d="M74 80 C82 72 85 62 84 52 C80 56 75 58 72 64 C72 70 73 75 74 80 Z"
            fill="#E5A823"
          />

          {/* Shield Background */}
          <path
            d="M32 24 H68 C68 24 69 54 50 78 C31 54 32 24 32 24 Z"
            fill="#5A1226"
            stroke="#E5A823"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* Shield Inner Accent Lines */}
          <path
            d="M36 28 H64 C64 28 65 52 50 72 C35 52 36 28 36 28 Z"
            stroke="#E5A823"
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.6"
          />

          {/* Top Star */}
          <polygon
            points="50,15 52.5,21 58.5,21.5 53.8,25 55.5,31 50,27.5 44.5,31 46.2,25 41.5,21.5 47.5,21"
            fill="#E5A823"
          />

          {/* Stylized 'U' Monogram */}
          <path
            d="M42 34 V48 C42 53.5 45.5 57 50 57 C54.5 57 58 53.5 58 48 V34 H53 V47 C53 49 51.8 51 50 51 C48.2 51 47 49 47 47 V34 H42 Z"
            fill="#E5A823"
          />

          {/* Est 2018 or 2024 Ribbon */}
          <rect x="36" y="80" width="28" height="6" rx="2" fill="#E5A823" />
          <text
            x="50"
            y="85"
            textAnchor="middle"
            fontSize="4.5"
            fontWeight="bold"
            fill="#5A1226"
            fontFamily="sans-serif"
          >
            UECA
          </text>
        </svg>
      </div>

      {/* Typography Brand Name */}
      {variant !== 'compact' && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-crest font-bold text-xl tracking-tight ${
                isLight ? 'text-[#E5A823]' : 'text-[#E5A823]'
              }`}
            >
              U
            </span>
            <span
              className={`font-semibold text-base sm:text-lg tracking-tight ${
                isLight ? 'text-white' : 'text-[#5A1226]'
              }`}
            >
              Education
            </span>
          </div>
          {showSubtitle && (
            <span
              className={`text-[10px] sm:text-[11px] font-medium uppercase tracking-widest ${
                isLight ? 'text-slate-300' : 'text-[#5A1226]/80'
              }`}
            >
              Consultant Agency
            </span>
          )}
        </div>
      )}
    </div>
  );
};
