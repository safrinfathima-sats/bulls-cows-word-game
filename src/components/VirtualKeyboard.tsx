import React from 'react';
import { Delete, CornerDownLeft } from 'lucide-react';
import { LetterTrackerState } from '../types/game';

interface VirtualKeyboardProps {
  onKeyPress: (char: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
  keyStatusMap: Record<string, LetterTrackerState>;
  disabled?: boolean;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  onKeyPress,
  onEnter,
  onBackspace,
  keyStatusMap,
  disabled = false,
}) => {
  const getKeyStyle = (key: string) => {
    const status = keyStatusMap[key];

    if (key === 'ENTER') {
      return 'bg-[#7047EB] hover:bg-[#5D35D9] active:bg-[#4C28C7] text-white font-extrabold text-xs sm:text-sm px-2 sm:px-3 flex-[1.4] shadow-sm shadow-[#7047EB]/20';
    }
    if (key === 'BACKSPACE') {
      return 'bg-[#F2EEFF] hover:bg-[#E7DFFF] active:bg-[#D4C7FF] text-[#7047EB] border-2 border-[#E7DFFF] px-2 sm:px-3 flex-[1.2] shadow-xs font-bold';
    }

    switch (status) {
      case 'bull':
        return 'bg-[#FF6B6B] text-white font-extrabold border-2 border-[#E04848] shadow-xs';
      case 'cow':
        return 'bg-[#28C7C0] text-white font-extrabold border-2 border-[#20ABA5] shadow-xs';
      case 'eliminated':
        return 'bg-[#FFF8EC] text-[#746B85]/50 border border-[#E7DFFF] line-through opacity-60';
      default:
        return 'bg-white hover:bg-[#F2EEFF] active:bg-[#E7DFFF] text-[#30264A] font-bold border-2 border-[#E7DFFF] shadow-xs';
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto px-1 py-1 select-none touch-manipulation">
      <div className="flex flex-col gap-1.5">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1 sm:gap-1.5 w-full">
            {row.map((key) => {
              const isEnter = key === 'ENTER';
              const isBackspace = key === 'BACKSPACE';

              return (
                <button
                  key={key}
                  disabled={disabled}
                  type="button"
                  onClick={() => {
                    if (isEnter) onEnter();
                    else if (isBackspace) onBackspace();
                    else onKeyPress(key);
                  }}
                  className={`flex h-11 sm:h-12 min-h-[44px] items-center justify-center rounded-xl border text-sm sm:text-base font-mono transition-all duration-100 active:scale-95 disabled:opacity-40 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-[#7047EB] focus:outline-none ${
                    !isEnter && !isBackspace ? 'flex-1 min-w-[28px] sm:min-w-[34px]' : ''
                  } ${getKeyStyle(key)}`}
                  aria-label={isEnter ? 'Enter Guess' : isBackspace ? 'Backspace' : `Letter ${key}`}
                >
                  {isEnter ? (
                    <span className="flex items-center gap-1 leading-none font-extrabold">
                      <CornerDownLeft className="h-3.5 w-3.5 hidden xs:inline" />
                      <span>ENTER</span>
                    </span>
                  ) : isBackspace ? (
                    <Delete className="h-4 w-4" />
                  ) : (
                    key
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
