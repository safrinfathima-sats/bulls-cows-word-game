import React from 'react';
import { Volume2, VolumeX, HelpCircle, BarChart3, Database, Notebook, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onOpenRules: () => void;
  onOpenStats: () => void;
  onOpenBackend: () => void;
  onToggleDeductionPad: () => void;
  isDeductionPadOpen: boolean;
  onNewGame: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isBackendActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRules,
  onOpenStats,
  onOpenBackend,
  onToggleDeductionPad,
  isDeductionPadOpen,
  onNewGame,
  isMuted,
  onToggleMute,
  isBackendActive,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 via-slate-900 to-amber-500/20 border border-slate-700/60 text-lg shadow-inner">
            <span role="img" aria-label="Bulls and Cows">🎯</span>
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white font-sans">
              BULLS <span className="text-emerald-400">&</span> COWS
            </span>
            <span className="hidden sm:inline-block ml-2 text-xs font-mono text-slate-400">
              4-Letter Word Deduction
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links / Interactive affordances */}
        <nav className="flex items-center gap-1.5 sm:gap-4 text-xs sm:text-sm font-medium text-slate-400">
          <button
            onClick={onOpenRules}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:text-white hover:bg-slate-900 transition-colors whitespace-nowrap shrink-0"
            title="How to play"
          >
            <HelpCircle className="h-4 w-4 text-slate-400" />
            <span className="hidden md:inline">Rules</span>
          </button>

          <button
            onClick={onToggleDeductionPad}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              isDeductionPadOpen
                ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                : 'hover:text-white hover:bg-slate-900 text-slate-400'
            }`}
            title="Toggle suspect scratchpad"
          >
            <Notebook className="h-4 w-4" />
            <span className="hidden md:inline">Scratchpad</span>
          </button>

          <button
            onClick={onOpenStats}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md hover:text-white hover:bg-slate-900 transition-colors whitespace-nowrap shrink-0"
            title="Game statistics"
          >
            <BarChart3 className="h-4 w-4 text-slate-400" />
            <span className="hidden md:inline">Stats</span>
          </button>

          <button
            onClick={onOpenBackend}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
              isBackendActive
                ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-500/30'
                : 'hover:text-white hover:bg-slate-900 text-slate-400'
            }`}
            title="Connect your Python/Node backend"
          >
            <Database className="h-4 w-4" />
            <span className="hidden md:inline">
              {isBackendActive ? 'Backend Connected' : 'API Link'}
            </span>
          </button>

          <button
            onClick={onToggleMute}
            className="flex items-center p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 transition-colors shrink-0"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onNewGame}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm hover:shadow-emerald-500/20 active:scale-95 transition-all whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>New Game</span>
          </button>
        </div>
      </div>
    </header>
  );
};
