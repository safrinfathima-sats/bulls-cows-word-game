import React from 'react';
import { LetterTrackerState } from '../types/game';
import { Sparkles, Trash2, CheckCircle2 } from 'lucide-react';

interface DeductionPadProps {
  letterStates: Record<string, LetterTrackerState>;
  onToggleLetterState: (letter: string) => void;
  onResetPad: () => void;
  onAutoDeduce: () => void;
  quickNotes: string;
  onQuickNotesChange: (notes: string) => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const DeductionPad: React.FC<DeductionPadProps> = ({
  letterStates,
  onToggleLetterState,
  onResetPad,
  onAutoDeduce,
  quickNotes,
  onQuickNotesChange,
}) => {
  const getBadge = (state: LetterTrackerState) => {
    switch (state) {
      case 'bull':
        return <span className="text-emerald-400 font-bold">🐂 Bull</span>;
      case 'cow':
        return <span className="text-amber-400 font-bold">🐄 Cow</span>;
      case 'eliminated':
        return <span className="text-rose-400 font-bold">❌ Out</span>;
      default:
        return <span className="text-slate-500">? Unknown</span>;
    }
  };

  const getLetterStyle = (state: LetterTrackerState) => {
    switch (state) {
      case 'bull':
        return 'bg-emerald-950/70 border-emerald-500/80 text-emerald-300 ring-1 ring-emerald-500/40 shadow-sm shadow-emerald-950';
      case 'cow':
        return 'bg-amber-950/70 border-amber-500/80 text-amber-300 ring-1 ring-amber-500/40 shadow-sm shadow-amber-950';
      case 'eliminated':
        return 'bg-slate-900 border-slate-800 text-slate-600 line-through opacity-50';
      default:
        return 'bg-slate-800/80 border-slate-700/60 text-slate-200 hover:border-slate-500';
    }
  };

  const eliminatedCount = Object.values(letterStates).filter(s => s === 'eliminated').length;
  const inWordCount = Object.values(letterStates).filter(s => s === 'bull' || s === 'cow').length;

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span>Detective Scratchpad</span>
            <span className="text-xs font-normal text-slate-400 font-mono">
              ({eliminatedCount} eliminated · {inWordCount} suspects found)
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Click letters to cycle status: <span className="text-slate-400">?</span> → <span className="text-rose-400">❌ Out</span> → <span className="text-amber-300">🐄 Cow</span> → <span className="text-emerald-300">🐂 Bull</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onAutoDeduce}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/60 rounded-md transition-colors"
            title="Auto-eliminate letters from 0-Bull 0-Cow guesses"
          >
            <Sparkles className="h-3 w-3" />
            <span>Auto-Deduce</span>
          </button>
          <button
            onClick={onResetPad}
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-md transition-colors border border-transparent hover:border-rose-900/50"
            title="Reset scratchpad"
          >
            <Trash2 className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 26 Letter Grid */}
      <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-13 gap-1.5 mb-3">
        {ALPHABET.map((char) => {
          const state = letterStates[char] || 'unknown';
          return (
            <button
              key={char}
              onClick={() => onToggleLetterState(char)}
              className={`flex flex-col items-center justify-center h-11 rounded-lg border text-sm font-mono font-bold transition-all active:scale-95 ${getLetterStyle(
                state
              )}`}
              title={`${char}: Click to toggle`}
            >
              <span>{char}</span>
              <span className="text-[9px] -mt-0.5 font-normal">
                {state === 'bull' ? '🐂' : state === 'cow' ? '🐄' : state === 'eliminated' ? '✕' : '·'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Quick Notes Scratch area */}
      <div className="mt-2">
        <label className="block text-xs font-medium text-slate-400 mb-1">
          Deduction Notes / Anagram Brainstorm:
        </label>
        <input
          type="text"
          value={quickNotes}
          onChange={(e) => onQuickNotesChange(e.target.value)}
          placeholder="e.g. Secret contains A and T, does not have R, S, L..."
          className="w-full px-3 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500/60 transition-colors font-mono"
        />
      </div>
    </div>
  );
};
