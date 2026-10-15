import React from 'react';

export type MascotMood = 'idle' | 'wave' | 'react' | 'celebrate' | 'puzzled';

interface MascotProps {
  mood?: MascotMood;
  className?: string;
  size?: number;
}

/**
 * Barnaby the Bull (Bulls = Coral Red #FF6B6B, Correct Letter & Exact Position)
 * Vivid, cheerful cartoon detective bull with sunny yellow horns and coral-red bowtie badge.
 */
export const BullMascot: React.FC<MascotProps> = ({
  mood = 'idle',
  className = '',
  size = 72,
}) => {
  const getAnimationClass = () => {
    switch (mood) {
      case 'react':
        return 'animate-bounce';
      case 'celebrate':
        return 'animate-[bounce_0.6s_infinite]';
      case 'puzzled':
        return 'animate-[spin_3s_ease-in-out_infinite]';
      case 'wave':
        return 'animate-pulse';
      default:
        return 'hover:scale-105 transition-transform';
    }
  };

  const isHappy = mood === 'react' || mood === 'celebrate';
  const isPuzzled = mood === 'puzzled';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${getAnimationClass()} ${className}`}
      style={{ width: size, height: size }}
      title="Barnaby the Bull: Correct letter in the exact position (Bull)"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Soft Lavender Shadow */}
        <ellipse cx="50" cy="94" rx="28" ry="5" fill="#7047EB" opacity="0.15" />

        {/* Tail */}
        <path
          d="M 28 75 Q 16 78 20 66"
          stroke="#4C3D6D"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="65" r="3.5" fill="#FF6B6B" />

        {/* Sunny Yellow Horns */}
        <path
          d="M 32 36 C 24 22 14 26 12 18 C 19 19 28 26 36 32"
          fill="#FFD166"
          stroke="#E5A610"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M 68 36 C 76 22 86 26 88 18 C 81 19 72 26 64 32"
          fill="#FFD166"
          stroke="#E5A610"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />

        {/* Left Ear */}
        <ellipse cx="26" cy="42" rx="9" ry="5" transform="rotate(-20 26 42)" fill="#30264A" />
        <ellipse cx="26" cy="42" rx="6" ry="3" transform="rotate(-20 26 42)" fill="#FFAAA6" />

        {/* Right Ear */}
        <ellipse cx="74" cy="42" rx="9" ry="5" transform="rotate(20 74 42)" fill="#30264A" />
        <ellipse cx="74" cy="42" rx="6" ry="3" transform="rotate(20 74 42)" fill="#FFAAA6" />

        {/* Bull Body in Deep Purple-Charcoal */}
        <path
          d="M 30 52 C 30 46 70 46 70 52 L 72 84 C 72 88 68 91 63 91 L 37 91 C 32 91 28 88 28 84 Z"
          fill="#30264A"
          stroke="#201933"
          strokeWidth="1.5"
        />
        {/* Soft Lavender-tinted Belly Patch */}
        <ellipse cx="50" cy="74" rx="14" ry="12" fill="#4C3D6D" />

        {/* Bull Head */}
        <ellipse cx="50" cy="46" rx="24" ry="20" fill="#403260" stroke="#30264A" strokeWidth="1.5" />

        {/* Eyes */}
        {isHappy ? (
          // Happy squinting curves
          <g stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round">
            <path d="M 39 42 Q 43 38 47 42" />
            <path d="M 53 42 Q 57 38 61 42" />
          </g>
        ) : isPuzzled ? (
          // Puzzled asymmetric eyes
          <g>
            <circle cx="43" cy="42" r="4.5" fill="#FFFFFF" />
            <circle cx="44" cy="42" r="2.5" fill="#201933" />
            <circle cx="57" cy="40" r="3.5" fill="#FFFFFF" />
            <circle cx="57" cy="40" r="2" fill="#201933" />
          </g>
        ) : (
          // Standard wide eyes with sparkles
          <g>
            <circle cx="43" cy="42" r="4.2" fill="#FFFFFF" />
            <circle cx="44" cy="42" r="2.5" fill="#201933" />
            <circle cx="45.5" cy="40.5" r="1" fill="#FFFFFF" />

            <circle cx="57" cy="42" r="4.2" fill="#FFFFFF" />
            <circle cx="58" cy="42" r="2.5" fill="#201933" />
            <circle cx="59.5" cy="40.5" r="1" fill="#FFFFFF" />
          </g>
        )}

        {/* Big Friendly Snout */}
        <rect x="35" y="48" width="30" height="18" rx="9" fill="#FFAAA6" stroke="#FF6B6B" strokeWidth="1.2" />
        {/* Nostrils */}
        <circle cx="44" cy="55" r="2" fill="#C93B3B" />
        <circle cx="56" cy="55" r="2" fill="#C93B3B" />
        {/* Golden Nose Ring */}
        <circle cx="50" cy="62" r="4" stroke="#FFD166" strokeWidth="2" fill="none" />

        {/* Coral Red Bowtie / Detective Badge (Matches Bull Red) */}
        <path
          d="M 44 68 L 56 68 L 53 77 L 50 75 L 47 77 Z"
          fill="#FF6B6B"
          stroke="#E04848"
          strokeWidth="1"
        />
        <circle cx="50" cy="68" r="2.2" fill="#FFD166" />

        {/* Arms / Hooves */}
        {mood === 'wave' || mood === 'celebrate' ? (
          <g>
            {/* Left arm waving high */}
            <path d="M 28 62 Q 18 52 18 42" stroke="#30264A" strokeWidth="5" strokeLinecap="round" />
            <circle cx="18" cy="42" r="4" fill="#201933" />
            {/* Right arm resting */}
            <path d="M 72 62 Q 80 70 76 78" stroke="#30264A" strokeWidth="5" strokeLinecap="round" />
            <circle cx="76" cy="78" r="4" fill="#201933" />
          </g>
        ) : (
          <g>
            <ellipse cx="30" cy="68" rx="4.5" ry="6" fill="#201933" />
            <ellipse cx="70" cy="68" rx="4.5" ry="6" fill="#201933" />
          </g>
        )}

        {/* Celebration Stars in Sunny Yellow */}
        {mood === 'celebrate' && (
          <g fill="#FFD166" className="animate-spin" style={{ transformOrigin: '80px 20px' }}>
            <polygon points="80,12 82,18 88,18 83,22 85,28 80,24 75,28 77,22 72,18 78,18" />
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Clara the Cow (Cows = Turquoise #28C7C0, Correct Letter in Wrong Position)
 * Sweet cartoon white-and-lavender spotted cow with a turquoise bell collar and sunny yellow horns.
 */
export const CowMascot: React.FC<MascotProps> = ({
  mood = 'idle',
  className = '',
  size = 72,
}) => {
  const getAnimationClass = () => {
    switch (mood) {
      case 'react':
        return 'animate-bounce';
      case 'celebrate':
        return 'animate-[bounce_0.6s_infinite_0.1s]';
      case 'puzzled':
        return 'animate-pulse';
      case 'wave':
        return 'animate-pulse';
      default:
        return 'hover:scale-105 transition-transform';
    }
  };

  const isHappy = mood === 'react' || mood === 'celebrate';
  const isPuzzled = mood === 'puzzled';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${getAnimationClass()} ${className}`}
      style={{ width: size, height: size }}
      title="Clara the Cow: Correct letter in the wrong position (Cow)"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Soft Shadow */}
        <ellipse cx="50" cy="94" rx="28" ry="5" fill="#7047EB" opacity="0.15" />

        {/* Cute Swishing Tail */}
        <path
          d="M 72 75 Q 84 78 80 66"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="80" cy="65" r="3.5" fill="#746B85" />

        {/* Sunny Yellow Horns */}
        <path
          d="M 35 34 C 32 24 26 26 24 20 C 29 21 34 26 38 31"
          fill="#FFD166"
          stroke="#E5A610"
          strokeWidth="1.2"
        />
        <path
          d="M 65 34 C 68 24 74 26 76 20 C 71 21 66 26 62 31"
          fill="#FFD166"
          stroke="#E5A610"
          strokeWidth="1.2"
        />

        {/* Left Floppy Ear */}
        <ellipse cx="24" cy="42" rx="9" ry="5" transform="rotate(-30 24 42)" fill="#FFFFFF" stroke="#E7DFFF" strokeWidth="1" />
        <ellipse cx="24" cy="42" rx="6" ry="3" transform="rotate(-30 24 42)" fill="#FFAAA6" />

        {/* Right Floppy Ear (With purple-grey patch) */}
        <ellipse cx="76" cy="42" rx="9" ry="5" transform="rotate(30 76 42)" fill="#746B85" />
        <ellipse cx="76" cy="42" rx="6" ry="3" transform="rotate(30 76 42)" fill="#FFAAA6" />

        {/* Cow Body in Crisp White */}
        <path
          d="M 30 52 C 30 46 70 46 70 52 L 72 84 C 72 88 68 91 63 91 L 37 91 C 32 91 28 88 28 84 Z"
          fill="#FFFFFF"
          stroke="#E7DFFF"
          strokeWidth="1.5"
        />
        {/* Cow Spots on Body in Lavender/Purple-Grey */}
        <path d="M 64 68 C 68 70 72 75 70 82 C 65 83 60 78 62 72 Z" fill="#746B85" />
        <circle cx="38" cy="78" r="6" fill="#746B85" />

        {/* Cow Head */}
        <ellipse cx="50" cy="46" rx="24" ry="20" fill="#FFFFFF" stroke="#E7DFFF" strokeWidth="1.5" />

        {/* Head Patch over right eye */}
        <path
          d="M 52 32 C 64 30 72 38 68 48 C 62 48 56 42 52 32 Z"
          fill="#746B85"
        />

        {/* Eyes */}
        {isHappy ? (
          // Happy curves with eyelashes
          <g stroke="#30264A" strokeWidth="2.5" strokeLinecap="round">
            <path d="M 39 42 Q 43 38 47 42" />
            <path d="M 53 42 Q 57 38 61 42" />
            {/* Eyelashes */}
            <line x1="47" y1="39" x2="49" y2="37" />
            <line x1="61" y1="39" x2="63" y2="37" />
          </g>
        ) : isPuzzled ? (
          <g>
            <circle cx="43" cy="41" r="3.5" fill="#30264A" />
            <circle cx="57" cy="43" r="4.5" fill="#30264A" />
            <circle cx="58" cy="42" r="1.5" fill="#FFFFFF" />
          </g>
        ) : (
          <g>
            {/* Left Eye */}
            <circle cx="43" cy="42" r="4" fill="#30264A" />
            <circle cx="44.5" cy="40.5" r="1.5" fill="#FFFFFF" />
            <path d="M 39 38 L 41 36" stroke="#30264A" strokeWidth="1.2" strokeLinecap="round" />

            {/* Right Eye (Inside dark patch) */}
            <circle cx="57" cy="42" r="4" fill="#FFFFFF" />
            <circle cx="57.5" cy="42" r="2.8" fill="#30264A" />
            <circle cx="59" cy="40.5" r="1.5" fill="#FFFFFF" />
            <path d="M 61 38 L 63 36" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          </g>
        )}

        {/* Cute Rosy Cheeks */}
        <ellipse cx="33" cy="48" rx="4" ry="2" fill="#FFAAA6" opacity="0.9" />
        <ellipse cx="67" cy="48" rx="4" ry="2" fill="#FFAAA6" opacity="0.9" />

        {/* Pink Snout with Smile */}
        <rect x="36" y="49" width="28" height="17" rx="8.5" fill="#FFE0E0" stroke="#FFAAA6" strokeWidth="1.2" />
        {/* Nostrils */}
        <ellipse cx="45" cy="56" rx="2" ry="1.5" fill="#C93B3B" />
        <ellipse cx="55" cy="56" rx="2" ry="1.5" fill="#C93B3B" />
        {/* Cute smile */}
        <path d="M 47 60 Q 50 62 53 60" stroke="#C93B3B" strokeWidth="1.5" strokeLinecap="round" />

        {/* Turquoise Collar & Cow Bell (Matches Cow Turquoise #28C7C0) */}
        <path d="M 37 68 Q 50 71 63 68" stroke="#28C7C0" strokeWidth="3" strokeLinecap="round" />
        {/* Golden Bell */}
        <path
          d="M 47 70 L 53 70 L 55 77 L 45 77 Z"
          fill="#FFD166"
          stroke="#E5A610"
          strokeWidth="1"
        />
        <circle cx="50" cy="78" r="1.5" fill="#20ABA5" />

        {/* Arms / Hooves */}
        {mood === 'wave' || mood === 'celebrate' ? (
          <g>
            {/* Right arm waving high */}
            <path d="M 72 62 Q 82 52 82 42" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
            <circle cx="82" cy="42" r="4" fill="#746B85" />
            {/* Left arm */}
            <path d="M 28 62 Q 20 70 24 78" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
            <circle cx="24" cy="78" r="4" fill="#746B85" />
          </g>
        ) : (
          <g>
            <ellipse cx="30" cy="68" rx="4.5" ry="6" fill="#746B85" />
            <ellipse cx="70" cy="68" rx="4.5" ry="6" fill="#746B85" />
          </g>
        )}

        {/* Celebration Hearts / Sparkle in Sunny Yellow */}
        {mood === 'celebrate' && (
          <g fill="#FFD166" className="animate-pulse">
            <circle cx="20" cy="22" r="3" />
            <circle cx="82" cy="26" r="2.5" />
          </g>
        )}
      </svg>
    </div>
  );
};

interface MascotDuoBannerProps {
  bullMood?: MascotMood;
  cowMood?: MascotMood;
  speechText?: string;
  onDismissSpeech?: () => void;
  onTapMascot?: () => void;
  compact?: boolean;
}

/**
 * Mascot Duo Banner:
 * Displays Barnaby the Bull and Clara the Cow standing together,
 * within a bright white card with lavender borders and cheerful speech bubble.
 */
export const MascotDuoBanner: React.FC<MascotDuoBannerProps> = ({
  bullMood = 'idle',
  cowMood = 'idle',
  speechText,
  onDismissSpeech,
  onTapMascot,
  compact = false,
}) => {
  return (
    <div className="relative w-full rounded-2xl bg-white border-2 border-[#E7DFFF] p-3 sm:p-4 shadow-md shadow-[#7047EB]/5 transition-all duration-300">
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        {/* The Two Mascots Standing Together */}
        <button
          type="button"
          onClick={onTapMascot}
          className="flex items-center gap-2 sm:gap-3 shrink-0 p-1.5 rounded-2xl hover:bg-[#FFF8EC] transition-colors cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#7047EB] focus:outline-none"
          title="Click to interact with Barnaby & Clara"
          aria-label="Interact with Barnaby the Bull and Clara the Cow"
        >
          {/* Barnaby the Bull */}
          <div className="flex flex-col items-center">
            <BullMascot mood={bullMood} size={compact ? 54 : 66} />
            <span className="text-[11px] font-bold text-[#FF6B6B] -mt-1 font-sans flex items-center gap-0.5">
              <span>Barnaby</span>
              <span className="text-[9px] bg-[#FFEBEB] text-[#FF6B6B] border border-[#FF6B6B]/30 px-1 rounded-md font-bold">
                Bull
              </span>
            </span>
          </div>

          {/* Friendly '&' mark in Sunny Yellow */}
          <span className="text-[#FFD166] font-extrabold text-sm -mt-3 group-hover:scale-125 transition-transform">★</span>

          {/* Clara the Cow */}
          <div className="flex flex-col items-center">
            <CowMascot mood={cowMood} size={compact ? 54 : 66} />
            <span className="text-[11px] font-bold text-[#20ABA5] -mt-1 font-sans flex items-center gap-0.5">
              <span>Clara</span>
              <span className="text-[9px] bg-[#E8F9F8] text-[#20ABA5] border border-[#28C7C0]/40 px-1 rounded-md font-bold">
                Cow
              </span>
            </span>
          </div>
        </button>

        {/* Speech Bubble Area in Warm Cream with Lavender Border */}
        <div className="relative flex-1 w-full">
          <div className="relative rounded-2xl bg-[#FFF8EC] border-2 border-[#E7DFFF] p-3 text-xs sm:text-sm text-[#30264A] shadow-xs">
            {/* Speech bubble pointer arrow */}
            <div className="hidden sm:block absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[8px] border-r-[#E7DFFF]" />
            <div className="sm:hidden absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-b-[8px] border-b-[#E7DFFF]" />

            <div className="flex items-start justify-between gap-2">
              <div className="leading-relaxed">
                {speechText ? (
                  <p className="font-semibold text-[#30264A]">{speechText}</p>
                ) : (
                  <div className="space-y-1 text-xs">
                    <p className="font-medium text-[#30264A]">
                      <strong className="text-[#FF6B6B] font-bold">Barnaby:</strong> "I count <span className="text-[#FF6B6B] font-bold">Bulls</span> — correct letter & exact spot! 🎯"
                    </p>
                    <p className="font-medium text-[#30264A]">
                      <strong className="text-[#20ABA5] font-bold">Clara:</strong> "And I count <span className="text-[#20ABA5] font-bold">Cows</span> — in word, but wrong spot! 💡"
                    </p>
                  </div>
                )}
              </div>

              {onDismissSpeech && (
                <button
                  type="button"
                  onClick={onDismissSpeech}
                  className="text-[#746B85] hover:text-[#30264A] hover:bg-[#E7DFFF]/40 p-1 rounded-lg text-xs shrink-0 focus-visible:ring-1 focus-visible:ring-[#7047EB]"
                  title="Dismiss tip"
                  aria-label="Dismiss mascot message"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
