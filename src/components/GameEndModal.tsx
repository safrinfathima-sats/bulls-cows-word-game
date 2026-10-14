import React, { useState } from 'react';
import { Trophy, Frown, RotateCcw, Share2, Check, Sparkles } from 'lucide-react';
import { GuessRecord } from '../types/game';

interface GameEndModalProps {
  isOpen: boolean;
  status: 'won' | 'lost';
  secretWord: string;
  guesses: GuessRecord[];
  onPlayAgain: () => void;
}

export const GameEndModal: React.FC<GameEndModalProps> = ({
  isOpen,
  status,
  secretWord,
  guesses,
  onPlayAgain,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isWon = status === 'won';
  const guessCount = guesses.length;

  const handleShare = () => {
    let text = `🎯 Bulls & Cows (${guessCount}/8 Guesses)\n`;
    guesses.forEach((g, idx) => {
      text += `${idx + 1}. ${'🐂'.repeat(g.bulls)}${'🐄'.repeat(g.cows)}${'⬛'.repeat(
        Math.max(0, 4 - g.bulls - g.cows)
      )} (${g.bulls}B ${g.cows}C)\n`;
    });
    if (isWon) {
      text += `Solved in ${guessCount} guess${guessCount === 1 ? '' : 'es'}! 🏆`;
    } else {
      text += `Better luck next time!`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100 text-center animate-pop">
        {/* Header Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border text-3xl shadow-inner">
          {isWon ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-950/80 border-emerald-500/50 text-emerald-400">
              <Trophy className="h-8 w-8" />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-950/80 border-rose-500/50 text-rose-400">
              <Frown className="h-8 w-8" />
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-extrabold tracking-tight text-white mb-1">
          {isWon ? 'Brilliant Deduction!' : 'Out of Guesses!'}
        </h2>
        <p className="text-xs text-slate-400 mb-5">
          {isWon
            ? `You successfully cracked the secret code in ${guessCount} of 8 attempts!`
            : 'You reached the 8-guess limit. Here is the secret code word:'}
        </p>

        {/* Secret Word Showcase */}
        <div className="mb-6 p-4 rounded-xl bg-slate-950/90 border border-slate-800">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Secret 4-Letter Word
          </div>
          <div className="flex justify-center gap-2 my-2 font-mono text-2xl sm:text-3xl font-extrabold tracking-widest text-emerald-400">
            {secretWord.split('').map((char, i) => (
              <span
                key={i}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 shadow-sm"
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Attempts Timeline Summary */}
        <div className="mb-6 rounded-xl bg-slate-950/60 border border-slate-800/80 p-3 max-h-40 overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 text-left">
            Attempts Recap
          </div>
          <div className="space-y-1.5 font-mono text-xs text-left">
            {guesses.map((g, idx) => (
              <div
                key={g.id}
                className="flex items-center justify-between px-2 py-1 rounded bg-slate-900 border border-slate-800"
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 w-4">{idx + 1}.</span>
                  <span className="font-bold tracking-wider text-white">{g.word}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-300 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    {g.bulls}B
                  </span>
                  <span className="text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/30">
                    {g.cows}C
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={handleShare}
            className="w-full sm:flex-1 py-2.5 px-4 text-xs sm:text-sm font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Share2 className="h-4 w-4" />
                <span>Share Score</span>
              </>
            )}
          </button>

          <button
            onClick={onPlayAgain}
            className="w-full sm:flex-1 py-2.5 px-4 text-xs sm:text-sm font-bold rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-950/50 active:scale-95"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
