import React from 'react';
import { X, RotateCcw } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#30264A]/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl border-2 border-[#E7DFFF] bg-white p-6 shadow-2xl text-[#30264A]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-[#746B85] hover:text-[#30264A] hover:bg-[#F2EEFF] transition-colors focus-visible:ring-2 focus-visible:ring-[#7047EB] focus:outline-none"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#7047EB] mb-4">
          Game Statistics
        </h2>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-4 gap-2 mb-6 text-center">
          <div className="p-2.5 rounded-2xl bg-[#FFF8EC] border-2 border-[#E7DFFF]">
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#30264A] tabular-nums">
              {stats.gamesPlayed}
            </div>
            <div className="text-[11px] text-[#746B85] font-bold">Played</div>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#E8F9F8] border-2 border-[#28C7C0]/40">
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#20ABA5] tabular-nums">
              {winPercentage}%
            </div>
            <div className="text-[11px] text-[#20ABA5] font-bold">Win Rate</div>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#FFEBEB] border-2 border-[#FF6B6B]/40">
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#FF6B6B] tabular-nums">
              {stats.currentStreak}
            </div>
            <div className="text-[11px] text-[#FF6B6B] font-bold">Streak</div>
          </div>

          <div className="p-2.5 rounded-2xl bg-[#F2EEFF] border-2 border-[#7047EB]/30">
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#7047EB] tabular-nums">
              {stats.maxStreak}
            </div>
            <div className="text-[11px] text-[#7047EB] font-bold">Best</div>
          </div>
        </div>

        {/* Guess Distribution Histogram */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#746B85] mb-3">
            Guess Distribution (1 - 8 Guesses)
          </h3>
          <div className="space-y-1.5 font-mono text-xs">
            {([1, 2, 3, 4, 5, 6, 7, 8] as const).map((num) => {
              const count = stats.guessDistribution[num] || 0;
              const widthPct = Math.max(10, Math.round((count / maxFreq) * 100));

              return (
                <div key={num} className="flex items-center gap-2">
                  <span className="w-3 text-[#746B85] font-bold text-right">{num}</span>
                  <div className="flex-1 bg-[#FFF8EC] border border-[#E7DFFF] rounded-lg h-5 p-0.5 overflow-hidden flex items-center">
                    <div
                      style={{ width: `${count > 0 ? widthPct : 0}%` }}
                      className={`h-full rounded-md transition-all duration-500 flex items-center justify-end px-2 ${
                        count > 0
                          ? 'bg-gradient-to-r from-[#7047EB] to-[#28C7C0] text-white font-extrabold'
                          : 'bg-transparent text-[#746B85]'
                      }`}
                    >
                      <span className="text-[10px] tabular-nums font-extrabold">
                        {count}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#E7DFFF]">
          <button
            onClick={() => {
              if (window.confirm('Reset all game statistics?')) {
                onResetStats();
              }
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#746B85] hover:text-[#FF6B6B] transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Stats</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-extrabold rounded-xl bg-[#7047EB] text-white hover:bg-[#5D35D9] shadow-md shadow-[#7047EB]/20 transition-all active:scale-95"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
