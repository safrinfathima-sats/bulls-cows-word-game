import React from 'react';
import { LetterTrackerState } from '../types/game';
import { Sparkles, Trash2, ChevronDown, ChevronUp, Notebook } from 'lucide-react';

interface DeductionPadProps {
  letterStates: Record<string, LetterTrackerState>;
  onToggleLetterState: (letter: string) => void;
  onResetPad: () => void;
  onAutoDeduce: () => void;
  quickNotes: string;
  onQuickNotesChange: (notes: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const DeductionPad: React.FC<DeductionPadProps> = ({
  letterStates,
  onToggleLetterState,
  onResetPad,
  onAutoDeduce,
  quickNotes,
  onQuickNotesChange,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  const getLetterStyle = (state: LetterTrackerState) => {
    switch (state) {
      case 'bull':
        return 'bg-[#FFEBEB] border-2 border-[#FF6B6B] text-[#FF6B6B] font-extrabold shadow-xs';
      case 'cow':
        return 'bg-[#E8F9F8] border-2 border-[#28C7C0] text-[#20ABA5] font-extrabold shadow-xs';
      case 'eliminated':
        return 'bg-[#FFF8EC] border border-[#E7DFFF] text-[#746B85]/40 line-through opacity-50';
      default:
        return 'bg-white border-2 border-[#E7DFFF] text-[#30264A] hover:border-[#7047EB]/50 hover:bg-[#F2EEFF] active:bg-[#E7DFFF] shadow-xs';
    }
  };

  const eliminatedCount = Object.values(letterStates).filter((s) => s === 'eliminated').length;
  const inWordCount = Object.values(letterStates).filter((s) => s === 'bull' || s === 'cow').length;

  return (
    <div className="w-full rounded-2xl border-2 border-[#E7DFFF] bg-white p-3.5 sm:p-4 shadow-md shadow-[#7047EB]/5 transition-all duration-200">
      {/* Scratchpad Header with Collapse Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E7DFFF] pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FFF8EC] border-2 border-[#FFD166] text-[#7047EB] shadow-xs">
            <Notebook className="h-4 w-4 text-[#7047EB]" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-[#30264A] leading-tight flex items-center gap-1.5">
              <span>Detective Scratchpad</span>
            </h2>
            <span className="text-[11px] text-[#746B85] font-mono font-medium">
              {eliminatedCount} eliminated · {inWordCount} suspects
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={onAutoDeduce}
            className="flex items-center gap-1.5 min-h-[34px] px-3 py-1 text-xs font-bold text-[#20ABA5] bg-[#E8F9F8] border-2 border-[#28C7C0]/40 hover:bg-[#D4F3F1] active:bg-[#BDEEEB] rounded-xl transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-[#28C7C0] focus:outline-none"
            title="Auto-eliminate letters from 0B 0C guesses"
            aria-label="Auto deduce eliminated letters"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#28C7C0] shrink-0" />
            <span>Auto-Deduce</span>
          </button>

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="flex items-center gap-1 min-h-[34px] px-2.5 py-1 text-xs font-bold text-[#7047EB] hover:text-[#5D35D9] bg-[#F2EEFF] hover:bg-[#E7DFFF] active:bg-[#D4C7FF] border border-[#7047EB]/30 rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-[#7047EB] focus:outline-none"
              aria-expanded={!isCollapsed}
              aria-label={isCollapsed ? 'Expand scratchpad' : 'Collapse scratchpad'}
            >
              <span>{isCollapsed ? 'Expand' : 'Collapse'}</span>
              {isCollapsed ? (
                <ChevronDown className="h-3.5 w-3.5" />
              ) : (
                <ChevronUp className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Collapsible Content */}
      {!isCollapsed && (
        <div className="pt-3 animate-fade-in">
          {/* Legend and Reset */}
          <div className="flex items-center justify-between text-[11px] text-[#746B85] mb-2.5 px-0.5">
            <div className="flex flex-wrap items-center gap-1.5 font-medium">
              <span>Cycle:</span>
              <span className="text-[#30264A] font-bold font-mono">?</span>
              <span>→</span>
              <span className="text-[#746B85] line-through font-bold font-mono">❌ Out</span>
              <span>→</span>
              <span className="text-[#20ABA5] font-bold font-mono">🐄 Cow</span>
              <span>→</span>
              <span className="text-[#FF6B6B] font-bold font-mono">🐂 Bull</span>
            </div>

            <button
              onClick={() => {
                if (window.confirm('Reset all scratchpad suspect marks?')) {
                  onResetPad();
                }
              }}
              className="flex items-center gap-1 text-[11px] font-semibold text-[#746B85] hover:text-[#FF6B6B] transition-colors p-1 rounded-lg hover:bg-[#FFEBEB]"
              title="Reset scratchpad"
              aria-label="Reset scratchpad"
            >
              <Trash2 className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* 26 Letter Grid (Responsive: 7 cols on mobile, 9 on tablet, 13 on desktop) */}
          <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-13 gap-1.5 mb-3 touch-manipulation">
            {ALPHABET.map((char) => {
              const state = letterStates[char] || 'unknown';
              return (
                <button
                  key={char}
                  type="button"
                  onClick={() => onToggleLetterState(char)}
                  className={`flex flex-col items-center justify-center h-10 sm:h-11 min-w-[34px] rounded-xl border text-sm font-mono font-bold transition-all active:scale-95 focus-visible:ring-2 focus-visible:ring-[#7047EB] focus:outline-none ${getLetterStyle(
                    state
                  )}`}
                  title={`${char}: ${state}`}
                  aria-label={`Letter ${char}, currently ${state}`}
                >
                  <span className="leading-none">{char}</span>
                  <span className="text-[9px] -mt-0.5 font-normal">
                    {state === 'bull' ? '🐂' : state === 'cow' ? '🐄' : state === 'eliminated' ? '✕' : '·'}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Notes Scratch area in Warm Cream with Lavender Border */}
          <div>
            <label htmlFor="deduction-scratchpad-notes" className="block text-xs font-bold text-[#30264A] mb-1">
              Anagram & Detective Notes:
            </label>
            <input
              id="deduction-scratchpad-notes"
              type="text"
              value={quickNotes}
              onChange={(e) => onQuickNotesChange(e.target.value)}
              placeholder="e.g. Has A & T, no R/S/L. Possibles: MINT, TANK..."
              className="w-full px-3 py-2 rounded-xl bg-[#FFF8EC] border-2 border-[#E7DFFF] text-xs text-[#30264A] placeholder-[#746B85] focus:outline-none focus:border-[#7047EB] focus:ring-1 focus:ring-[#7047EB] transition-colors font-mono font-medium"
            />
          </div>
        </div>
      )}
    </div>
  );
};
