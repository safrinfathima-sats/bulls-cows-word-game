import React from 'react';
import { Volume2, VolumeX, HelpCircle, BarChart3, Notebook, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onOpenRules: () => void;
  onOpenStats: () => void;
  onToggleDeductionPad: () => void;
  isDeductionPadOpen: boolean;
  onNewGame: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenRules,
  onOpenStats,
  onToggleDeductionPad,
  isDeductionPadOpen,
  onNewGame,
  isMuted,
  onToggleMute,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-[#E7DFFF] bg-[#FFF8EC]/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 sm:gap-6 px-3 py-2.5 sm:px-6 sm:py-3">
        {/* Zone 1: Brand Wordmark in Royal Purple with Mascot Duo */}
        <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap shrink-0">
          <div className="flex items-center -space-x-1 sm:space-x-1">
            <span
              role="img"
              aria-label="Barnaby the Bull"
              className="text-2xl sm:text-3xl hover:scale-110 transition-transform cursor-default drop-shadow-xs"
              title="Barnaby the Bull (Bulls = Correct letter in exact position)"
            >
              🐂
            </span>
            <span
              role="img"
              aria-label="Clara the Cow"
              className="text-2xl sm:text-3xl hover:scale-110 transition-transform cursor-default drop-shadow-xs"
              title="Clara the Cow (Cows = Letter in word, wrong position)"
            >
              🐄
            </span>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-[#7047EB] font-sans leading-none flex items-center gap-1.5">
              <span>BULLS</span>
              <span className="text-[#FF6B6B]">&</span>
              <span>COWS</span>
            </h1>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#746B85] font-medium">
              4-Letter Word Deduction
            </span>
          </div>
        </div>

        {/* Zone 2: Balanced Navigation Controls */}
        <nav className="flex items-center gap-1.5 sm:gap-3 text-xs sm:text-sm font-semibold text-[#746B85]">
          <button
            onClick={onOpenRules}
            className="flex items-center gap-1.5 min-h-[38px] px-2.5 py-1.5 rounded-xl hover:text-[#30264A] hover:bg-white hover:shadow-xs transition-all whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-[#7047EB] focus:outline-none"
            title="How to play rules"
            aria-label="How to play rules"
          >
            <HelpCircle className="h-4 w-4 text-[#7047EB]" />
            <span className="hidden sm:inline">Rules</span>
          </button>

          <button
            onClick={onToggleDeductionPad}
            className={`flex items-center gap-1.5 min-h-[38px] px-2.5 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-[#7047EB] focus:outline-none ${
              isDeductionPadOpen
                ? 'bg-[#F2EEFF] text-[#7047EB] border border-[#7047EB]/30 shadow-xs font-bold'
                : 'hover:text-[#30264A] hover:bg-white text-[#746B85] border border-transparent'
            }`}
            title="Toggle suspect scratchpad"
            aria-label="Toggle scratchpad"
          >
            <Notebook className="h-4 w-4 text-[#FFD166]" />
            <span className="hidden sm:inline">Scratchpad</span>
            <span
              className={`inline-block w-2 h-2 rounded-full sm:hidden ${
                isDeductionPadOpen ? 'bg-[#7047EB]' : 'bg-transparent'
              }`}
            />
          </button>

          <button
            onClick={onOpenStats}
            className="flex items-center gap-1.5 min-h-[38px] px-2.5 py-1.5 rounded-xl hover:text-[#30264A] hover:bg-white hover:shadow-xs transition-all whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-[#7047EB] focus:outline-none"
            title="Game statistics"
            aria-label="Game statistics"
          >
            <BarChart3 className="h-4 w-4 text-[#28C7C0]" />
            <span className="hidden sm:inline">Stats</span>
          </button>

          <button
            onClick={onToggleMute}
            className="flex items-center justify-center min-h-[38px] min-w-[38px] p-2 rounded-xl text-[#746B85] hover:text-[#30264A] hover:bg-white hover:shadow-xs transition-all shrink-0 focus-visible:ring-2 focus-visible:ring-[#7047EB] focus:outline-none"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            aria-label={isMuted ? 'Unmute sound effects' : 'Mute sound effects'}
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-[#746B85]" /> : <Volume2 className="h-4 w-4 text-[#7047EB]" />}
          </button>
        </nav>

        {/* Zone 3: Primary Action in Royal Purple */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onNewGame}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-bold text-white bg-[#7047EB] hover:bg-[#5D35D9] active:bg-[#4C28C7] rounded-xl shadow-md hover:shadow-lg shadow-[#7047EB]/25 active:scale-95 transition-all whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-[#28C7C0] focus:outline-none"
            aria-label="Start a new game"
          >
            <RotateCcw className="h-4 w-4 shrink-0" />
            <span>New Game</span>
          </button>
        </div>
      </div>
    </header>
  );
};
