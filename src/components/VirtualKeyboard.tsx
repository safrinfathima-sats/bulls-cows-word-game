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
      return 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-2 sm:px-3 flex-[1.4]';
    }
    if (key === 'BACKSPACE') {
      return 'bg-slate-700 hover:bg-slate-600 active:bg-slate-800 text-slate-200 px-2 sm:px-3 flex-[1.2]';
    }

    switch (status) {
      case 'bull':
        return 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-sm shadow-emerald-950';
      case 'cow':
        return 'bg-amber-600 text-white font-bold border-amber-500 shadow-sm shadow-amber-950';
      case 'eliminated':
        return 'bg-slate-900 text-slate-600 border-slate-800 line-through opacity-60';
      default:
        return 'bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-100 border-slate-700/60';
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-1.5 select-none">
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
                  onClick={() => {
                    if (isEnter) onEnter();
                    else if (isBackspace) onBackspace();
                    else onKeyPress(key);
                  }}
                  className={`flex h-11 sm:h-12 items-center justify-center rounded-lg border text-sm sm:text-base font-mono font-semibold transition-all duration-100 active:scale-95 disabled:opacity-40 disabled:pointer-events-none ${
                    !isEnter && !isBackspace ? 'flex-1 min-w-[28px] sm:min-w-[36px]' : ''
                  } ${getKeyStyle(key)}`}
                >
                  {isEnter ? (
                    <span className="flex items-center gap-1">
                      <CornerDownLeft className="h-3.5 w-3.5 hidden sm:inline" />
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
