import React from 'react';
import { X, Award, Flame, Target, RotateCcw } from 'lucide-react';
import { GameStats } from '../types/game';

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: GameStats;
  onResetStats: () => void;
}

export const StatsModal: React.FC<StatsModalProps> = ({
  isOpen,
  onClose,
  stats,
  onResetStats,
}) => {
  if (!isOpen) return null;

  const winPercentage = stats.gamesPlayed > 0
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100)
    : 0;

  const maxFreq = Math.max(1, ...Object.values(stats.guessDistribution));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-bold tracking-tight text-white mb-4">
          Game Statistics
        </h2>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-4 gap-2 mb-6 text-center">
          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xl sm:text-2xl font-bold font-mono text-white tabular-nums">
              {stats.gamesPlayed}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Played</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              {winPercentage}%
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Win Rate</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-400 tabular-nums">
              {stats.currentStreak}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Streak</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-xl sm:text-2xl font-bold font-mono text-blue-400 tabular-nums">
              {stats.maxStreak}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">Best</div>
          </div>
        </div>

        {/* Guess Distribution Histogram */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Guess Distribution (1 - 8 Guesses)
          </h3>
          <div className="space-y-1.5 font-mono text-xs">
            {([1, 2, 3, 4, 5, 6, 7, 8] as const).map((num) => {
              const count = stats.guessDistribution[num] || 0;
              const widthPct = Math.max(8, Math.round((count / maxFreq) * 100));

              return (
                <div key={num} className="flex items-center gap-2">
                  <span className="w-3 text-slate-400 text-right">{num}</span>
                  <div className="flex-1 bg-slate-950/70 rounded h-5 p-0.5 overflow-hidden flex items-center">
                    <div
                      style={{ width: `${count > 0 ? widthPct : 0}%` }}
                      className={`h-full rounded transition-all duration-500 flex items-center justify-end px-1.5 ${
                        count > 0
                          ? 'bg-gradient-to-r from-emerald-600 to-emerald-400 text-slate-950 font-bold'
                          : 'bg-transparent text-slate-600'
                      }`}
                    >
                      <span className="text-[10px] tabular-nums font-bold">
                        {count}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <button
            onClick={() => {
              if (window.confirm('Reset all game statistics?')) {
                onResetStats();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Stats</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
