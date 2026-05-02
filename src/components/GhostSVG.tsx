import React from 'react';
import { motion } from 'motion/react';

interface GhostSVGProps {
  variant?: 'cute' | 'code' | 'rocket' | 'hero' | 'guardian' | 'moon' | 'flower' | 'flow';
  color?: string;
  size?: number;
  holo?: boolean;
  selected?: boolean;
  talking?: boolean;
  className?: string;
}

export const GhostSVG: React.FC<GhostSVGProps> = ({
  variant = 'cute',
  color = '#9d4edd',
  size = 64,
  holo = false,
  selected = false,
  talking = false,
  className = '',
}) => {
  const height = size * 1.25;
  const eyeScale = talking ? [1, 0.4, 1] : [1, 0.1, 1];
  const eyeInterval = talking ? 0.4 : 4;

  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height }}
    >
      <svg
        width={size}
        height={height}
        viewBox="0 0 100 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id={`holo-fill-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9d4edd" />
            <stop offset="25%" stopColor="#00e5ff" />
            <stop offset="50%" stopColor="#ffb300" />
            <stop offset="75%" stopColor="#00ff9d" />
            <stop offset="100%" stopColor="#ff006e" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Selection Ring */}
        {selected && (
          <circle cx="50" cy="50" r="48" stroke={color} strokeWidth="2" strokeDasharray="4 4">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="10s"
              repeatCount="indefinite"
            />
          </circle>
        )}

        <motion.g
          animate={{ y: [-5, 0, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Main Body */}
          <path
            d="M20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50V90C80 95.5228 75.5228 100 70 100C64.4772 100 60 95.5228 60 90C60 84.4772 55.5228 80 50 80C44.4772 80 40 84.4772 40 90C40 95.5228 35.5228 100 30 100C24.4772 100 20 95.5228 20 90V50Z"
            fill={holo ? `url(#holo-fill-${variant})` : color}
            fillOpacity={holo ? 0.8 : 0.6}
            stroke={color}
            strokeWidth="1.5"
            filter="url(#glow)"
          />

          {/* Eyes */}
          <motion.circle
            cx="40"
            cy="45"
            r="4"
            fill="#fff"
            animate={{ scaleY: eyeScale }}
            transition={{ duration: eyeScale[1], repeat: Infinity, repeatDelay: eyeInterval }}
          />
          <motion.circle
            cx="60"
            cy="45"
            r="4"
            fill="#fff"
            animate={{ scaleY: eyeScale }}
            transition={{ duration: eyeScale[1], repeat: Infinity, repeatDelay: eyeInterval }}
          />

          {/* Variant Decorations */}
          {variant === 'code' && (
            <path d="M35 65L30 70L35 75M65 65L70 70L65 75" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          )}
          {variant === 'rocket' && (
            <path d="M45 15L50 5L55 15M30 30L20 40M70 30L80 40" stroke="#fff" strokeWidth="2" />
          )}
          {variant === 'hero' && (
            <path d="M20 40C15 40 10 35 15 25L50 15L85 25C90 35 85 40 80 40" fill={color} fillOpacity="0.4" />
          )}
        </motion.g>
      </svg>
    </div>
  );
};
