import React from 'react';

export interface CountryFlagProps {
  country?: string; // 'italy' | 'thailand' | 'china' | 'malaysia' | 'cambodia' | 'myanmar'
  code?: string; // 'IT' | 'TH' | 'CN' | 'MY' | 'KH' | 'MM'
  className?: string; // wrapper class
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCode?: boolean;
}

const sizeClasses: Record<string, string> = {
  sm: 'w-5 h-3.5',
  md: 'w-7 h-5',
  lg: 'w-9 h-6',
  xl: 'w-12 h-8',
};

export const CountryFlag: React.FC<CountryFlagProps> = ({
  country,
  code,
  className = '',
  size = 'md',
  showCode = false,
}) => {
  const codeClean = (code || '').toLowerCase().trim();
  const countryClean = (country || '').toLowerCase().trim();
  const combined = `${codeClean} ${countryClean}`;

  // Normalize to standard country key with strict precedence
  let key = 'it';
  if (
    codeClean === 'mm' ||
    combined.includes('myan') ||
    combined.includes('burma') ||
    combined.includes('yangon') ||
    combined.includes('mandalay')
  ) {
    key = 'mm';
  } else if (
    codeClean === 'my' ||
    combined.includes('malay')
  ) {
    key = 'my';
  } else if (
    codeClean === 'th' ||
    combined.includes('thai') ||
    combined.includes('bangkok')
  ) {
    key = 'th';
  } else if (
    codeClean === 'cn' ||
    combined.includes('chin') ||
    combined.includes('beijing')
  ) {
    key = 'cn';
  } else if (
    codeClean === 'kh' ||
    combined.includes('cambo') ||
    combined.includes('phnom')
  ) {
    key = 'kh';
  } else if (
    codeClean === 'it' ||
    combined.includes('ital') ||
    combined.includes('rome') ||
    combined.includes('messina')
  ) {
    key = 'it';
  }

  const dimensionClass = sizeClasses[size] || sizeClasses.md;

  const renderSvg = () => {
    switch (key) {
      case 'it':
        // Italy Tricolor: Green, White, Red
        return (
          <svg
            viewBox="0 0 300 200"
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Flag of Italy"
          >
            <rect width="100" height="200" fill="#009246" />
            <rect x="100" width="100" height="200" fill="#FFFFFF" />
            <rect x="200" width="100" height="200" fill="#CE2B37" />
          </svg>
        );

      case 'th':
        // Thailand: Red, White, Blue, White, Red (1:1:2:1:1)
        return (
          <svg
            viewBox="0 0 300 200"
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Flag of Thailand"
          >
            <rect width="300" height="200" fill="#A51931" />
            <rect y="33.33" width="300" height="133.34" fill="#F4F5F8" />
            <rect y="66.66" width="300" height="66.68" fill="#2D2A4A" />
          </svg>
        );

      case 'cn':
        // China: Red with 5 Gold Stars
        return (
          <svg
            viewBox="0 0 300 200"
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Flag of China"
          >
            <rect width="300" height="200" fill="#DE2910" />
            {/* Main large 5-pointed star */}
            <polygon
              points="50,25 57,45 78,45 61,58 68,78 50,65 32,78 39,58 22,45 43,45"
              fill="#FFDE00"
            />
            {/* Small star 1 */}
            <polygon
              points="100,16 103,23 110,23 104,27 106,34 100,30 94,34 96,27 90,23 97,23"
              fill="#FFDE00"
              transform="rotate(18, 100, 25)"
            />
            {/* Small star 2 */}
            <polygon
              points="120,36 123,43 130,43 124,47 126,54 120,50 114,54 116,47 110,43 117,43"
              fill="#FFDE00"
              transform="rotate(35, 120, 45)"
            />
            {/* Small star 3 */}
            <polygon
              points="120,66 123,73 130,73 124,77 126,84 120,80 114,84 116,77 110,73 117,73"
              fill="#FFDE00"
            />
            {/* Small star 4 */}
            <polygon
              points="100,86 103,93 110,93 104,97 106,104 100,100 94,104 96,97 90,93 97,93"
              fill="#FFDE00"
              transform="rotate(-20, 100, 95)"
            />
          </svg>
        );

      case 'my':
        // Malaysia: 14 red & white stripes, blue canton with yellow crescent and 14-point star
        return (
          <svg
            viewBox="0 0 280 140"
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Flag of Malaysia"
          >
            {/* 14 Stripes */}
            {Array.from({ length: 14 }).map((_, i) => (
              <rect
                key={i}
                y={i * 10}
                width="280"
                height="10"
                fill={i % 2 === 0 ? '#CC0000' : '#FFFFFF'}
              />
            ))}
            {/* Blue Canton */}
            <rect width="140" height="80" fill="#010066" />
            {/* Yellow Crescent */}
            <circle cx="65" cy="40" r="26" fill="#FFCC00" />
            <circle cx="72" cy="40" r="22" fill="#010066" />
            {/* 14-point Star */}
            <circle cx="92" cy="40" r="16" fill="#FFCC00" />
            <circle cx="92" cy="40" r="11" fill="#010066" />
            <circle cx="92" cy="40" r="7" fill="#FFCC00" />
          </svg>
        );

      case 'kh':
        // Cambodia: Blue, Red with Angkor Wat, Blue
        return (
          <svg
            viewBox="0 0 300 200"
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Flag of Cambodia"
          >
            <rect width="300" height="50" fill="#032EA6" />
            <rect y="50" width="300" height="100" fill="#ED1B24" />
            <rect y="150" width="300" height="50" fill="#032EA6" />
            {/* Angkor Wat Graphic silhouette */}
            <g fill="#FFFFFF" transform="translate(110, 68)">
              {/* Base */}
              <rect x="0" y="52" width="80" height="10" rx="1" />
              <rect x="5" y="44" width="70" height="8" rx="1" />
              <rect x="10" y="36" width="60" height="8" rx="1" />
              {/* Central Tower */}
              <polygon points="40,2 35,22 45,22" />
              <rect x="36" y="22" width="8" height="14" />
              {/* Left Tower */}
              <polygon points="20,12 16,26 24,26" />
              <rect x="17" y="26" width="6" height="10" />
              {/* Right Tower */}
              <polygon points="60,12 56,26 64,26" />
              <rect x="57" y="26" width="6" height="10" />
              {/* Flanking Small Turrets */}
              <polygon points="8,22 5,30 11,30" />
              <polygon points="72,22 69,30 75,30" />
            </g>
          </svg>
        );

      case 'mm':
        // Official Flag of Myanmar: Yellow (top), Green (middle), Red (bottom) with centered 5-pointed white star
        return (
          <svg
            viewBox="0 0 300 200"
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Flag of Myanmar"
          >
            <rect width="300" height="66.67" fill="#FECB00" />
            <rect y="66.67" width="300" height="66.67" fill="#34B233" />
            <rect y="133.34" width="300" height="66.67" fill="#EA2839" />
            {/* Centered regular 5-pointed white star */}
            <polygon
              points="150,34 164.7,79.8 210.9,80.2 173.8,107.7 187.6,151.8 150,125 112.4,151.8 126.2,107.7 89.1,80.2 135.3,79.8"
              fill="#FFFFFF"
            />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full bg-stone-200 flex items-center justify-center text-[10px] font-bold text-stone-600">
            {code || '🌐'}
          </div>
        );
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 ${className}`}
      title={country || code || 'Country'}
    >
      <span
        className={`relative inline-block ${dimensionClass} rounded-sm overflow-hidden border border-black/15 shadow-2xs flex-shrink-0 align-middle bg-stone-100`}
      >
        {renderSvg()}
      </span>
      {showCode && (
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
          {code || key.toUpperCase()}
        </span>
      )}
    </span>
  );
};
