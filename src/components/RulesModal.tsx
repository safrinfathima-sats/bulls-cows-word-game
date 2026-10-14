import React from 'react';
import { X, CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold tracking-tight text-white mb-1 flex items-center gap-2">
          <span>How to Play Bulls & Cows</span>
        </h2>
        <p className="text-xs text-slate-400 mb-5">
          A timeless code-breaking deductive word puzzle.
        </p>

        {/* 4 Core Rules */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold shrink-0">
              1
            </span>
            <div className="text-xs sm:text-sm">
              <strong className="text-white">Input a 4-letter word:</strong> Each guess must be a valid 4-letter English word.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-rose-500/20 text-rose-400 font-mono text-xs font-bold shrink-0">
              2
            </span>
            <div className="text-xs sm:text-sm">
              <strong className="text-white">No repeated letters:</strong> The secret word is an <em>isogram</em> (all 4 letters are distinct). Your guesses must also have 4 unique letters (e.g., <span className="font-mono text-emerald-300">COLD</span> is valid, but <span className="font-mono text-rose-300">BOOK</span> is not).
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold shrink-0">
              3
            </span>
            <div className="text-xs sm:text-sm">
              <strong className="text-emerald-300 flex items-center gap-1">
                <span>🐂 BULL = Correct Letter, Correct Position:</span>
              </strong>
              The letter is in the secret word AND in the exact same spot.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold shrink-0">
              4
            </span>
            <div className="text-xs sm:text-sm">
              <strong className="text-amber-300 flex items-center gap-1">
                <span>🐄 COW = Correct Letter, Wrong Position:</span>
              </strong>
              The letter is in the secret word, but in a different position.
            </div>
          </div>
        </div>

        {/* Concrete Example Box */}
        <div className="mb-6 rounded-xl border border-slate-800 bg-slate-950/90 p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Example Walkthrough
          </div>
          <p className="text-xs text-slate-300 mb-3">
            Suppose the secret word is <strong className="text-white font-mono tracking-widest bg-slate-800 px-1.5 py-0.5 rounded">CART</strong>:
          </p>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 mb-2">
            <div className="flex items-center gap-1.5 font-mono text-sm font-bold">
              <span className="w-8 h-8 rounded bg-emerald-950 text-emerald-300 border border-emerald-500 flex items-center justify-center">C</span>
              <span className="w-8 h-8 rounded bg-amber-950 text-amber-300 border border-amber-500 flex items-center justify-center">R</span>
              <span className="w-8 h-8 rounded bg-amber-950 text-amber-300 border border-amber-500 flex items-center justify-center">A</span>
              <span className="w-8 h-8 rounded bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center">B</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/50">1 Bull (C)</span>
              <span className="px-2 py-1 rounded bg-amber-950 text-amber-300 border border-amber-500/50">2 Cows (R, A)</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            • 'C' is at index 1 in both words (Bull)<br />
            • 'R' and 'A' are in CART but at different slots (Cows)<br />
            • 'B' is not in CART (Miss)
          </p>
        </div>

        {/* 8 Guesses limit */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 mb-6">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-400" />
          <span>You have exactly <strong>8 guesses</strong> to deduce the secret word and claim victory!</span>
        </div>

        {/* Close CTA */}
        <button
          onClick={onClose}
          className="w-full py-2.5 text-sm font-semibold rounded-lg bg-emerald-400 text-slate-950 hover:bg-emerald-300 active:scale-98 transition-all"
        >
          Got it, Let's Play!
        </button>
      </div>
    </div>
  );
};
