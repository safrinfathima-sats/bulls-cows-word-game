import React, { useState } from 'react';
import { Trophy, Frown, RotateCcw, Share2, Check } from 'lucide-react';
import { GuessRecord } from '../types/game';
import { BullMascot, CowMascot } from './Mascots';

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
      text += `${idx + 1}. ${'🐂'.repeat(g.bulls)}${'🐄'.repeat(g.cows)}${'⬜'.repeat(
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#30264A]/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl border-2 border-[#E7DFFF] bg-white p-5 sm:p-6 shadow-2xl text-[#30264A] text-center animate-pop">
        {/* Animated Mascot Celebration / Sympathy Duo */}
        <div className="mb-3 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center gap-3">
            <BullMascot mood={isWon ? 'celebrate' : 'puzzled'} size={64} />
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF8EC] border-2 border-[#FFD166] shadow-xs">
              {isWon ? (
                <Trophy className="h-6 w-6 text-[#FFD166] fill-[#FFD166]" />
              ) : (
                <Frown className="h-6 w-6 text-[#FF6B6B]" />
              )}
            </div>
            <CowMascot mood={isWon ? 'celebrate' : 'puzzled'} size={64} />
          </div>

          {/* Speech Bubble from Mascots */}
          <div className="mt-2.5 max-w-xs rounded-2xl bg-[#FFF8EC] border-2 border-[#E7DFFF] px-3.5 py-2 text-xs text-[#30264A] shadow-xs">
            {isWon ? (
              <span className="font-semibold">
                <strong className="text-[#7047EB] font-bold">Barnaby & Clara:</strong> "Brilliant deduction! 4 Bulls for the win! 🎉"
              </span>
            ) : (
              <span className="font-semibold">
                <strong className="text-[#20ABA5] font-bold">Barnaby & Clara:</strong> "Phew, that was a tough word! Ready for a rematch?"
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#7047EB] mb-1">
          {isWon ? 'Brilliant Deduction!' : 'Out of Guesses!'}
        </h2>
        <p className="text-xs text-[#746B85] mb-4 font-medium">
          {isWon
            ? `You cracked the secret code in ${guessCount} of 8 attempts!`
            : 'You reached the 8-guess limit. Here is the secret code word:'}
        </p>

        {/* Secret Word Showcase in Royal Purple */}
        <div className="mb-4 p-3.5 rounded-2xl bg-[#FFF8EC] border-2 border-[#E7DFFF]">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#746B85] mb-1">
            Secret 4-Letter Word
          </div>
          <div className="flex justify-center gap-1.5 sm:gap-2 my-1 font-mono text-xl sm:text-2xl font-extrabold tracking-widest text-[#7047EB]">
            {secretWord.split('').map((char, i) => (
              <span
                key={i}
                className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-white border-2 border-[#7047EB] text-[#7047EB] shadow-xs"
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* Attempts Timeline Summary */}
        <div className="mb-5 rounded-2xl bg-[#FFF8EC] border border-[#E7DFFF] p-2.5 sm:p-3 max-h-36 overflow-y-auto">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#746B85] mb-1.5 text-left">
            Attempts Recap
          </div>
          <div className="space-y-1 font-mono text-xs text-left">
            {guesses.map((g, idx) => (
              <div
                key={g.id}
                className="flex items-center justify-between px-2.5 py-1 rounded-xl bg-white border border-[#E7DFFF]"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#746B85] font-bold w-4">{idx + 1}.</span>
                  <span className="font-extrabold tracking-wider text-[#30264A]">{g.word}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#FF6B6B] bg-[#FFEBEB] px-2 py-0.5 rounded-md border border-[#FF6B6B]/30 font-bold">
                    {g.bulls}B
                  </span>
                  <span className="text-[#20ABA5] bg-[#E8F9F8] px-2 py-0.5 rounded-md border border-[#28C7C0]/40 font-bold">
                    {g.cows}C
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons in Turquoise and Royal Purple */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <button
            onClick={handleShare}
            className="w-full sm:flex-1 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl bg-[#E8F9F8] hover:bg-[#D4F3F1] text-[#20ABA5] border-2 border-[#28C7C0]/40 flex items-center justify-center gap-1.5 transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-[#28C7C0] focus:outline-none"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-[#36B56A]" />
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
            className="w-full sm:flex-1 py-2.5 px-3 text-xs sm:text-sm font-extrabold rounded-xl bg-[#7047EB] hover:bg-[#5D35D9] text-white flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#7047EB]/25 active:scale-95 focus-visible:ring-2 focus-visible:ring-[#28C7C0] focus:outline-none"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
