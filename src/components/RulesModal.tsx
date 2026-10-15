import React from 'react';
import { X, AlertTriangle, Lightbulb } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#30264A]/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl border-2 border-[#E7DFFF] bg-white p-5 sm:p-6 shadow-2xl text-[#30264A] max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#746B85] hover:text-[#30264A] hover:bg-[#F2EEFF] transition-colors focus-visible:ring-2 focus-visible:ring-[#7047EB] focus:outline-none"
          aria-label="Close rules"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#7047EB] mb-1">
          How to Play Bulls & Cows
        </h2>
        <p className="text-xs text-[#746B85] mb-4 font-medium">
          A timeless code-breaking deductive word puzzle.
        </p>

        {/* 4 Core Rules */}
        <div className="space-y-2.5 mb-5">
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FFF8EC] border border-[#E7DFFF]">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F2EEFF] text-[#7047EB] font-mono text-xs font-bold shrink-0">
              1
            </span>
            <div className="text-xs sm:text-sm text-[#30264A]">
              <strong className="text-[#7047EB]">Input a 4-letter word:</strong> Each guess must be a valid 4-letter English word.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FFF8EC] border border-[#E7DFFF]">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FFEBEB] text-[#FF6B6B] font-mono text-xs font-bold shrink-0">
              2
            </span>
            <div className="text-xs sm:text-sm text-[#30264A]">
              <strong className="text-[#FF6B6B]">No repeated letters:</strong> The secret word is an <em>isogram</em> (all 4 letters are distinct). Your guesses must also have 4 unique letters (e.g., <span className="font-mono font-bold text-[#7047EB]">COLD</span> is valid, but <span className="font-mono font-bold text-[#FF6B6B]">BOOK</span> is not).
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FFEBEB]/60 border border-[#FF6B6B]/30">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#FFEBEB] text-[#FF6B6B] font-mono text-xs font-bold shrink-0">
              3
            </span>
            <div className="text-xs sm:text-sm text-[#30264A]">
              <strong className="text-[#FF6B6B] flex items-center gap-1">
                <span>🐂 BULL = Correct Letter, Exact Position:</span>
              </strong>
              The letter is in the secret word AND in the exact same spot.
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#E8F9F8]/60 border border-[#28C7C0]/40">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#E8F9F8] text-[#20ABA5] font-mono text-xs font-bold shrink-0">
              4
            </span>
            <div className="text-xs sm:text-sm text-[#30264A]">
              <strong className="text-[#20ABA5] flex items-center gap-1">
                <span>🐄 COW = Correct Letter, Wrong Position:</span>
              </strong>
              The letter is in the secret word, but in a different position.
            </div>
          </div>
        </div>

        {/* Concrete Example Box */}
        <div className="mb-4 rounded-2xl border-2 border-[#E7DFFF] bg-white p-3.5 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#746B85] mb-1.5">
            Concrete Example
          </div>
          <p className="text-xs text-[#30264A] mb-2.5 font-medium">
            Suppose the secret word is <strong className="text-[#7047EB] font-mono font-bold tracking-widest bg-[#F2EEFF] px-2 py-0.5 rounded-md">CART</strong>:
          </p>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFF8EC] border border-[#E7DFFF] mb-2">
            <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-extrabold">
              <span className="w-8 h-8 rounded-lg bg-[#FFEBEB] text-[#FF6B6B] border-2 border-[#FF6B6B] flex items-center justify-center shadow-xs">C</span>
              <span className="w-8 h-8 rounded-lg bg-[#E8F9F8] text-[#20ABA5] border-2 border-[#28C7C0] flex items-center justify-center shadow-xs">R</span>
              <span className="w-8 h-8 rounded-lg bg-[#E8F9F8] text-[#20ABA5] border-2 border-[#28C7C0] flex items-center justify-center shadow-xs">A</span>
              <span className="w-8 h-8 rounded-lg bg-white text-[#746B85] border-2 border-[#E7DFFF] flex items-center justify-center shadow-xs">B</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold">
              <span className="px-2 py-1 rounded-lg bg-[#FFEBEB] text-[#FF6B6B] border border-[#FF6B6B]/40">1B (C)</span>
              <span className="px-2 py-1 rounded-lg bg-[#E8F9F8] text-[#20ABA5] border border-[#28C7C0]/40">2C (R, A)</span>
            </div>
          </div>
          <p className="text-[11px] text-[#746B85] leading-normal font-medium">
            • 'C' is at slot 1 in both words → <strong className="text-[#FF6B6B]">1 Bull</strong><br />
            • 'R' and 'A' are in the word at different slots → <strong className="text-[#20ABA5]">2 Cows</strong><br />
            • 'B' is not in CART → Miss
          </p>
        </div>

        {/* Pro Tips for First-Time Players in Sunny Yellow Accent */}
        <div className="mb-4 rounded-2xl border-2 border-[#FFD166] bg-[#FFF8EC] p-3.5">
          <div className="text-xs font-bold text-[#30264A] flex items-center gap-1.5 mb-1.5">
            <Lightbulb className="h-4 w-4 text-[#FFD166] fill-[#FFD166]" />
            <span>Strategy Tips for Beginners</span>
          </div>
          <ul className="text-xs text-[#746B85] space-y-1 list-disc list-inside font-medium">
            <li>Start with diverse words containing common vowels (e.g., <span className="font-mono font-bold text-[#7047EB]">TAPE</span>, <span className="font-mono font-bold text-[#7047EB]">LION</span>).</li>
            <li>If you get <strong className="text-[#30264A]">0 Bulls & 0 Cows</strong>, celebrate! You just eliminated 4 entire letters from the alphabet.</li>
            <li>Use the <strong>Detective Scratchpad</strong> to track suspects and tap <strong>Auto-Deduce</strong>.</li>
          </ul>
        </div>

        {/* 8 Guesses limit */}
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-[#F2EEFF] border border-[#7047EB]/30 text-xs text-[#7047EB] font-bold mb-5">
          <AlertTriangle className="h-4 w-4 shrink-0 text-[#7047EB]" />
          <span>You have exactly 8 guesses to deduce the secret word!</span>
        </div>

        {/* Close CTA in Royal Purple */}
        <button
          onClick={onClose}
          className="w-full py-3 text-sm font-extrabold rounded-xl bg-[#7047EB] text-white hover:bg-[#5D35D9] active:bg-[#4C28C7] shadow-md shadow-[#7047EB]/25 active:scale-98 transition-all focus-visible:ring-2 focus-visible:ring-[#28C7C0] focus:outline-none"
        >
          Got it, Let's Play!
        </button>
      </div>
    </div>
  );
};
