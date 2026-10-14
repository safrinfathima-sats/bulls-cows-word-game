import React from 'react';
import { GuessRecord } from '../types/game';

interface GameBoardProps {
  guesses: GuessRecord[];
  currentInput: string;
  maxGuesses: number;
  gameStatus: 'playing' | 'won' | 'lost';
  inputError: string | null;
  duplicateChar: string | null;
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
    <div className="w-full max-w-md mx-auto">
      {/* Visual Instruction Banner */}
      <div className="mb-4 flex items-center justify-between text-xs text-slate-400 px-1 border-b border-slate-800/60 pb-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
            <strong className="text-emerald-300 font-semibold">Bulls:</strong> Correct letter & spot
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span>
            <strong className="text-amber-300 font-semibold">Cows:</strong> In word, wrong spot
          </span>
        </div>
        <span className="font-mono tabular-nums text-slate-400">
          {Math.min(currentAttempt + (gameStatus === 'playing' ? 1 : 0), maxGuesses)} / {maxGuesses}
        </span>
      </div>

      {/* Rows Container */}
      <div className="space-y-2">
        {Array.from({ length: maxGuesses }).map((_, rowIndex) => {
          const isPastRow = rowIndex < guesses.length;
          const isCurrentRow = rowIndex === guesses.length && gameStatus === 'playing';
          const guessData = isPastRow ? guesses[rowIndex] : null;

          return (
            <div
              key={rowIndex}
              className={`flex items-center justify-between gap-2 p-1.5 rounded-xl border transition-all duration-200 ${
                isCurrentRow
                  ? 'border-emerald-500/40 bg-slate-900/60 shadow-lg shadow-emerald-950/20'
                  : isPastRow
                  ? 'border-slate-800/80 bg-slate-900/30'
                  : 'border-slate-800/30 bg-slate-950/20 opacity-50'
              }`}
            >
              {/* Row index indicator */}
              <div className="w-6 text-center font-mono text-xs text-slate-500 tabular-nums">
                {rowIndex + 1}
              </div>

              {/* 4 Letter Tiles */}
              <div className="flex items-center gap-2 flex-1 justify-center">
                {Array.from({ length: 4 }).map((_, letterIndex) => {
                  let char = '';
                  let isDuplicate = false;
                  let tileBorder = 'border-slate-800 bg-slate-900/40 text-slate-500';

                  if (isPastRow && guessData) {
                    char = guessData.word[letterIndex] || '';
                    tileBorder = 'border-slate-700 bg-slate-800/90 text-white font-bold shadow-sm';
                  } else if (isCurrentRow) {
                    char = currentInput[letterIndex] || '';
                    if (char && char === duplicateChar) {
                      isDuplicate = true;
                    }
                    if (char) {
                      tileBorder = isDuplicate
                        ? 'border-rose-500 bg-rose-950/40 text-rose-200 animate-shake shadow-sm shadow-rose-950/50'
                        : 'border-slate-600 bg-slate-800 text-white animate-pop shadow-sm';
                    } else if (letterIndex === currentInput.length) {
                      tileBorder = 'border-emerald-500/60 bg-slate-900/80 ring-1 ring-emerald-500/30 text-white';
                    }
                  }

                  return (
                    <div
                      key={letterIndex}
                      className={`relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-lg border text-lg sm:text-xl font-mono uppercase tracking-wider font-extrabold transition-all duration-150 ${tileBorder}`}
                    >
                      {char}
                      {isCurrentRow && letterIndex === currentInput.length && (
                        <span className="absolute bottom-1 w-2.5 h-0.5 bg-emerald-400 animate-pulse rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bulls and Cows Result Indicator */}
              <div className="w-24 sm:w-28 flex items-center justify-end gap-1.5 sm:gap-2 pr-1 font-mono text-xs">
                {isPastRow && guessData ? (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {/* Bulls badge */}
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold tabular-nums border ${
                        guessData.bulls > 0
                          ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-950/50'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500'
                      }`}
                      title={`${guessData.bulls} Bull${guessData.bulls === 1 ? '' : 's'} (correct position)`}
                    >
                      <span className="text-xs" role="img" aria-label="Bulls">🐂</span>
                      <span>{guessData.bulls}B</span>
                    </div>

                    {/* Cows badge */}
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold tabular-nums border ${
                        guessData.cows > 0
                          ? 'bg-amber-950/80 border-amber-500/50 text-amber-300 shadow-sm shadow-amber-950/50'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500'
                      }`}
                      title={`${guessData.cows} Cow${guessData.cows === 1 ? '' : 's'} (wrong position)`}
                    >
                      <span className="text-xs" role="img" aria-label="Cows">🐄</span>
                      <span>{guessData.cows}C</span>
                    </div>
                  </div>
                ) : isCurrentRow ? (
                  <div className="text-[11px] text-slate-400 font-sans text-right">
                    {currentInput.length === 4 ? (
                      <span className="text-emerald-400 font-semibold animate-pulse">Press ENTER</span>
                    ) : (
                      <span>{4 - currentInput.length} left</span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-slate-700">
                    <span>—</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time input validation error banner */}
      {inputError && (
        <div className="mt-3 flex items-center justify-center gap-2 p-2 rounded-lg bg-rose-950/70 border border-rose-500/40 text-rose-200 text-xs sm:text-sm animate-shake shadow-md">
          <span className="text-rose-400">⚠️</span>
          <span>{inputError}</span>
        </div>
      )}
    </div>
  );
};
