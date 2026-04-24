'use client';

interface SMLogoProps {
  variant?: 'dark' | 'light' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const sizes = {
  sm: { icon: 32, text: 'text-lg' },
  md: { icon: 44, text: 'text-2xl' },
  lg: { icon: 64, text: 'text-4xl' },
};

export default function SMLogoComponent({
  variant = 'gold',
  size = 'md',
  showText = true,
}: SMLogoProps) {
  const s = sizes[size];
  const goldColor = variant === 'dark' ? '#1F5C52' : '#C9A84C';
  const textColor =
    variant === 'dark'
      ? 'text-teal-DEFAULT'
      : variant === 'light'
      ? 'text-cream'
      : 'text-gold';

  return (
    <div className="flex flex-col items-center gap-1 select-none">
      {/* Peacock SVG — traced from the SM brand mark */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="SM Luxury logo"
      >
        {/* Main swirling body */}
        <path
          d="M42 68 C42 68 36 58 34 48 C32 38 36 28 40 22 C44 16 50 14 52 18 C54 22 50 28 46 32 C42 36 40 40 42 46 C44 52 50 56 48 62 C46 68 42 68 42 68Z"
          fill={goldColor}
          opacity="0.9"
        />
        {/* Large sweep / tail */}
        <path
          d="M44 30 C50 24 60 18 64 20 C68 22 64 32 56 36 C50 39 44 38 44 38"
          stroke={goldColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M42 36 C48 26 58 16 66 16 C70 16 70 26 62 32 C56 37 44 38 44 38"
          stroke={goldColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        {/* Leaf decorations */}
        <ellipse cx="30" cy="46" rx="5" ry="2.5" fill={goldColor} transform="rotate(-30 30 46)" opacity="0.8"/>
        <ellipse cx="26" cy="52" rx="5" ry="2.5" fill={goldColor} transform="rotate(-20 26 52)" opacity="0.7"/>
        <ellipse cx="28" cy="40" rx="4.5" ry="2" fill={goldColor} transform="rotate(-45 28 40)" opacity="0.7"/>
        <ellipse cx="24" cy="44" rx="4" ry="2" fill={goldColor} transform="rotate(-15 24 44)" opacity="0.6"/>
        <ellipse cx="32" cy="56" rx="4" ry="2" fill={goldColor} transform="rotate(-10 32 56)" opacity="0.6"/>
        {/* Dots at top */}
        <circle cx="52" cy="12" r="1.5" fill={goldColor}/>
        <circle cx="56" cy="10" r="1.2" fill={goldColor} opacity="0.8"/>
        <circle cx="60" cy="9" r="1" fill={goldColor} opacity="0.6"/>
        {/* Small curl */}
        <path
          d="M38 24 C36 20 38 16 42 16 C44 16 44 18 42 20"
          stroke={goldColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {showText && (
        <span
          className={`font-display tracking-widest2 font-light ${s.text} ${textColor} leading-none`}
          style={{ letterSpacing: '0.2em' }}
        >
          SM
        </span>
      )}
    </div>
  );
}
