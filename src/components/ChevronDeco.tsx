import React from 'react';

interface ChevronDecoProps {
  count?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const ChevronDeco: React.FC<ChevronDecoProps> = ({
  count = 4,
  className = '',
  size = 'md',
  color = '#E5A823',
}) => {
  const sizeMap = {
    sm: 'w-3 h-5',
    md: 'w-4 h-7',
    lg: 'w-6 h-10',
  };

  return (
    <div className={`flex items-center gap-1 sm:gap-1.5 opacity-90 select-none ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <svg
          key={index}
          className={`${sizeMap[size]} transition-transform duration-300 hover:translate-x-0.5`}
          viewBox="0 0 24 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 4 L20 20 L6 36"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
};
