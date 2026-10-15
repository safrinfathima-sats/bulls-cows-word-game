import React from 'react';
import { GuessRecord } from '../types/game';
import { CornerDownLeft } from 'lucide-react';

interface GameBoardProps {
  guesses: GuessRecord[];
  currentInput: string;
  maxGuesses: number;
  gameStatus: 'playing' | 'won' | 'lost';
  inputError: string | null;
  duplicateChar: string | null;
  onOpenRules?: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  guesses,
  currentInput,
  maxGuesses,
  gameStatus,
  inputError,
  duplicateChar,
}) => {
  const currentAttempt = guesses.length;

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-white border-2 border-[#E7DFFF] p-3 sm:p-4 shadow-md shadow-[#7047EB]/5">
      {/* Persistent Compact HUD & Legend */}
      <div className="mb-3 flex items-center justify-between text-xs text-[#746B85] px-1 border-b border-[#E7DFFF] pb-2.5">
        <div className="flex items-center gap-2.5 sm:gap-3 text-[11px] sm:text-xs">
          <span className="flex items-center gap-1.5" title="Letter is in the word AND in the exact same position">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF6B6B] shadow-xs"></span>
            <strong className="text-[#FF6B6B] font-bold">Bulls:</strong>
            <span className="text-[#746B85] hidden xs:inline">Exact spot</span>
          </span>
          <span className="flex items-center gap-1.5" title="Letter is in the word, but in a different position">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#28C7C0] shadow-xs"></span>
            <strong className="text-[#20ABA5] font-bold">Cows:</strong>
            <span className="text-[#746B85] hidden xs:inline">Wrong spot</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs tabular-nums text-[#746B85]">
          <span>Attempt</span>
          <strong className="text-[#7047EB] bg-[#F2EEFF] px-2 py-0.5 rounded-md font-bold">
            {Math.min(currentAttempt + (gameStatus === 'playing' ? 1 : 0), maxGuesses)} / {maxGuesses}
          </strong>
        </div>
      </div>

      {/* Rows Container (Exactly 8 Guesses) */}
      <div className="space-y-1.5 sm:space-y-2">
        {Array.from({ length: maxGuesses }).map((_, rowIndex) => {
          const isPastRow = rowIndex < guesses.length;
          const isCurrentRow = rowIndex === guesses.length && gameStatus === 'playing';
          const guessData = isPastRow ? guesses[rowIndex] : null;

          return (
            <div
              key={rowIndex}
              className={`flex items-center justify-between gap-1.5 sm:gap-2 px-2 py-1.5 rounded-xl border transition-all duration-200 ${
                isCurrentRow
                  ? 'border-2 border-[#7047EB] bg-[#F2EEFF] shadow-sm ring-2 ring-[#7047EB]/20'
                  : isPastRow
                  ? 'border border-[#E7DFFF] bg-white hover:border-[#7047EB]/30'
                  : 'border border-[#E7DFFF]/60 bg-[#FFF8EC]/40 opacity-50'
              }`}
            >
              {/* Row index indicator */}
              <div
                className={`w-5 sm:w-6 text-center font-mono text-xs font-bold tabular-nums shrink-0 ${
                  isCurrentRow ? 'text-[#7047EB]' : 'text-[#746B85]'
                }`}
              >
                {rowIndex + 1}
              </div>

              {/* 4 Letter Tiles */}
              <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-center">
                {Array.from({ length: 4 }).map((_, letterIndex) => {
                  let char = '';
                  let isDuplicate = false;
                  let tileStyle = 'border-2 border-[#E7DFFF] bg-white text-[#746B85]';

                  if (isPastRow && guessData) {
                    char = guessData.word[letterIndex] || '';
                    tileStyle = 'border-2 border-[#7047EB]/40 bg-white text-[#30264A] font-extrabold shadow-xs';
                  } else if (isCurrentRow) {
                    char = currentInput[letterIndex] || '';
                    if (char && char === duplicateChar) {
                      isDuplicate = true;
                    }
                    if (char) {
                      tileStyle = isDuplicate
                        ? 'border-2 border-[#FF6B6B] bg-[#FFEBEB] text-[#FF6B6B] animate-shake shadow-xs ring-2 ring-[#FF6B6B]/40'
                        : 'border-2 border-[#7047EB] bg-white text-[#30264A] animate-pop shadow-xs font-extrabold';
                    } else if (letterIndex === currentInput.length) {
                      tileStyle = 'border-2 border-[#7047EB] bg-white ring-2 ring-[#7047EB]/30 text-[#7047EB]';
                    }
                  }

                  return (
                    <div
                      key={letterIndex}
                      className={`relative flex h-10 w-10 sm:h-12 sm:w-12 min-w-[36px] items-center justify-center rounded-xl border-2 text-base sm:text-xl font-mono uppercase tracking-wider font-extrabold transition-all duration-150 select-none ${tileStyle}`}
                    >
                      {char}
                      {isCurrentRow && letterIndex === currentInput.length && (
                        <span className="absolute bottom-1 w-2.5 h-0.5 bg-[#7047EB] animate-pulse rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bulls and Cows Result Indicator */}
              <div className="w-24 sm:w-28 flex items-center justify-end gap-1.5 sm:gap-2 font-mono text-xs shrink-0">
                {isPastRow && guessData ? (
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    {/* Bulls badge in Coral Red */}
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold tabular-nums border ${
                        guessData.bulls > 0
                          ? 'bg-[#FFEBEB] border-[#FF6B6B] text-[#FF6B6B] shadow-xs'
                          : 'bg-[#F2EEFF]/60 border-[#E7DFFF] text-[#746B85]'
                      }`}
                      title={`${guessData.bulls} Bull${guessData.bulls === 1 ? '' : 's'} (correct position)`}
                      aria-label={`${guessData.bulls} Bulls`}
                    >
                      <span className="text-xs" role="img" aria-label="Bulls">🐂</span>
                      <span>{guessData.bulls}B</span>
                    </div>

                    {/* Cows badge in Turquoise */}
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold tabular-nums border ${
                        guessData.cows > 0
                          ? 'bg-[#E8F9F8] border-[#28C7C0] text-[#20ABA5] shadow-xs'
                          : 'bg-[#F2EEFF]/60 border-[#E7DFFF] text-[#746B85]'
                      }`}
                      title={`${guessData.cows} Cow${guessData.cows === 1 ? '' : 's'} (wrong position)`}
                      aria-label={`${guessData.cows} Cows`}
                    >
                      <span className="text-xs" role="img" aria-label="Cows">🐄</span>
                      <span>{guessData.cows}C</span>
                    </div>
                  </div>
                ) : isCurrentRow ? (
                  <div className="text-[11px] sm:text-xs font-sans text-right">
                    {currentInput.length === 4 ? (
                      <span className="inline-flex items-center gap-1 text-[#7047EB] font-extrabold animate-pulse bg-[#F2EEFF] px-2 py-1 rounded-lg border border-[#7047EB]/40 shadow-xs">
                        <span>ENTER</span>
                        <CornerDownLeft className="h-3 w-3" />
                      </span>
                    ) : (
                      <span className="text-[#746B85] font-medium">
                        {4 - currentInput.length} left
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full text-[#E7DFFF]">
                    <span>—</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time input validation error banner in Coral Red */}
      {inputError && (
        <div className="mt-3 flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#FFEBEB] border-2 border-[#FF6B6B] text-[#C93B3B] text-xs sm:text-sm animate-shake shadow-xs text-center font-semibold">
          <span className="text-sm">⚠️</span>
          <span>{inputError}</span>
        </div>
      )}
    </div>
  );
};
