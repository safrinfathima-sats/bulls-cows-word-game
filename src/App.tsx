import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { GameBoard } from './components/GameBoard';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { DeductionPad } from './components/DeductionPad';
import { RulesModal } from './components/RulesModal';
import { StatsModal } from './components/StatsModal';
import { GameEndModal } from './components/GameEndModal';
import { MascotDuoBanner, MascotMood } from './components/Mascots';
import {
  getRandomSecretWord,
  calculateBullsAndCows,
  isFourLetterIsogram,
  validateGuess,
} from './data/wordList';
import { soundController } from './utils/audio';
import {
  GuessRecord,
  GameStatus,
  GameStats,
  LetterTrackerState,
  BackendConfig,
} from './types/game';

const MAX_GUESSES = 8;

const INITIAL_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  },
};

export default function App() {
  // Game Play State
  const [secretWord, setSecretWord] = useState<string>(() => getRandomSecretWord());
  const [guesses, setGuesses] = useState<GuessRecord[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [inputError, setInputError] = useState<string | null>(null);
  const [duplicateChar, setDuplicateChar] = useState<string | null>(null);

  // Keyboard and scratchpad letter evaluations
  const [keyStatusMap, setKeyStatusMap] = useState<Record<string, LetterTrackerState>>({});
  const [letterStates, setLetterStates] = useState<Record<string, LetterTrackerState>>({});
  const [quickNotes, setQuickNotes] = useState<string>('');

  // Animated Mascots State (Barnaby the Bull & Clara the Cow)
  const [bullMood, setBullMood] = useState<MascotMood>('wave');
  const [cowMood, setCowMood] = useState<MascotMood>('wave');
  const [mascotSpeech, setMascotSpeech] = useState<string>(
    'Welcome! Guess our secret 4-letter word. Barnaby tracks exact Bulls 🎯 and Clara tracks misplaced Cows 💡!'
  );
  const [showMascotSpeech, setShowMascotSpeech] = useState<boolean>(true);

  // UI Drawer / Modals State (defaults to collapsed on mobile to prioritize board + keyboard)
  const [isDeductionPadOpen, setIsDeductionPadOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });
  const [rulesOpen, setRulesOpen] = useState<boolean>(false);
  const [statsOpen, setStatsOpen] = useState<boolean>(false);
  const [gameEndOpen, setGameEndOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(() => soundController.isMuted());

  // Backend Integration Config
  const [backendConfig, setBackendConfig] = useState<BackendConfig>(() => {
    try {
      const saved = localStorage.getItem('bulls_cows_backend_config');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      enabled: false,
      endpointUrl: 'http://localhost:5000/api/guess',
      autoExtractBullsCows: true,
    };
  });

  // Persistent Statistics
  const [stats, setStats] = useState<GameStats>(() => {
    try {
      const saved = localStorage.getItem('bulls_cows_stats');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_STATS;
  });

  // Save stats to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('bulls_cows_stats', JSON.stringify(stats));
    } catch {}
  }, [stats]);

  // Save backend config to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bulls_cows_backend_config', JSON.stringify(backendConfig));
    } catch {}
  }, [backendConfig]);

  // Clear temporary input error after a delay
  useEffect(() => {
    if (inputError) {
      const timer = setTimeout(() => {
        setInputError(null);
        setDuplicateChar(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [inputError]);

  // Trigger win confetti
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899'],
    });
  }, []);

  // Update stats on win or loss
  const recordGameResult = useCallback((won: boolean, attempts: number) => {
    setStats((prev) => {
      const gamesPlayed = prev.gamesPlayed + 1;
      const gamesWon = won ? prev.gamesWon + 1 : prev.gamesWon;
      const currentStreak = won ? prev.currentStreak + 1 : 0;
      const maxStreak = Math.max(prev.maxStreak, currentStreak);
      const newDistribution = { ...prev.guessDistribution };

      if (won && attempts >= 1 && attempts <= 8) {
        newDistribution[attempts as keyof typeof newDistribution] =
          (newDistribution[attempts as keyof typeof newDistribution] || 0) + 1;
      }

      return {
        gamesPlayed,
        gamesWon,
        currentStreak,
        maxStreak,
        guessDistribution: newDistribution,
      };
    });
  }, []);

  // Reset/Start New Game
  const handleNewGame = useCallback(() => {
    const newWord = getRandomSecretWord();
    setSecretWord(newWord);
    setGuesses([]);
    setCurrentInput('');
    setGameStatus('playing');
    setInputError(null);
    setDuplicateChar(null);
    setKeyStatusMap({});
    setLetterStates({});
    setQuickNotes('');
    setGameEndOpen(false);
    setBullMood('wave');
    setCowMood('wave');
    setMascotSpeech('New game! Guess our secret 4-letter word. Barnaby tracks exact Bulls & Clara tracks misplaced Cows!');
    setTimeout(() => {
      setBullMood('idle');
      setCowMood('idle');
    }, 2200);
  }, []);

  // Handle typing a character
  const handleCharInput = useCallback((char: string) => {
    if (gameStatus !== 'playing') return;
    const upperChar = char.toUpperCase();

    if (!/^[A-Z]$/.test(upperChar)) return;

    // Check if word is already 4 letters
    if (currentInput.length >= 4) {
      soundController.playKey();
      return;
    }

    // Check for duplicate letter in current input
    if (currentInput.includes(upperChar)) {
      setDuplicateChar(upperChar);
      setInputError(`'${upperChar}' already entered! All 4 letters must be unique.`);
      setBullMood('puzzled');
      setMascotSpeech(`Heads up! All 4 letters must be unique. '${upperChar}' is already in your word!`);
      setTimeout(() => setBullMood('idle'), 1600);
      soundController.playError();
      return;
    }

    setInputError(null);
    setDuplicateChar(null);
    soundController.playKey();
    setCurrentInput((prev) => prev + upperChar);
  }, [currentInput, gameStatus]);

  // Handle Backspace
  const handleBackspace = useCallback(() => {
    if (gameStatus !== 'playing') return;
    if (currentInput.length > 0) {
      soundController.playBackspace();
      setCurrentInput((prev) => prev.slice(0, -1));
      setInputError(null);
      setDuplicateChar(null);
    }
  }, [currentInput, gameStatus]);

  // Handle Submit Guess
  const handleSubmit = useCallback(async () => {
    if (gameStatus !== 'playing') return;

    if (currentInput.length < 4) {
      setInputError(`Incomplete word! Enter all 4 letters (${4 - currentInput.length} needed).`);
      soundController.playError();
      return;
    }

    // Validate isogram rule
    const isogramCheck = isFourLetterIsogram(currentInput);
    if (!isogramCheck.valid) {
      setInputError(isogramCheck.reason || 'Invalid 4-letter isogram.');
      soundController.playError();
      return;
    }

    // Check if word already guessed
    if (guesses.some((g) => g.word === currentInput)) {
      setInputError(`You already guessed '${currentInput}'! Try a different word.`);
      soundController.playError();
      return;
    }

    // Validate against dictionary (can be relaxed if backend handles it)
    if (!backendConfig.enabled) {
      const dictCheck = validateGuess(currentInput, true);
      if (!dictCheck.valid) {
        setInputError(dictCheck.reason || 'Not in word list.');
        soundController.playError();
        return;
      }
    }

    let bulls = 0;
    let cows = 0;
    let details: { letter: string; status: 'bull' | 'cow' | 'miss' }[] = [];

    // If external backend is enabled, send guess to user backend
    if (backendConfig.enabled && backendConfig.endpointUrl) {
      try {
        const response = await fetch(backendConfig.endpointUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ guess: currentInput }),
        });

        if (!response.ok) {
          throw new Error(`Server returned HTTP ${response.status}`);
        }

        const data = await response.json();
        if (typeof data.bulls === 'number' && typeof data.cows === 'number') {
          bulls = data.bulls;
          cows = data.cows;
        } else {
          // fallback calculation if backend didn't return standard keys
          const calc = calculateBullsAndCows(currentInput, secretWord);
          bulls = calc.bulls;
          cows = calc.cows;
          details = calc.details;
        }
      } catch (err) {
        setInputError(`Backend error: ${err instanceof Error ? err.message : 'failed'}. Using local engine.`);
        const calc = calculateBullsAndCows(currentInput, secretWord);
        bulls = calc.bulls;
        cows = calc.cows;
        details = calc.details;
      }
    } else {
      // Local calculation
      const calc = calculateBullsAndCows(currentInput, secretWord);
      bulls = calc.bulls;
      cows = calc.cows;
      details = calc.details;
    }

    const newRecord: GuessRecord = {
      id: Math.random().toString(36).substring(2, 9),
      word: currentInput,
      bulls,
      cows,
      timestamp: Date.now(),
      details,
    };

    const newGuesses = [...guesses, newRecord];
    setGuesses(newGuesses);
    setCurrentInput('');
    soundController.playGuessSubmit(bulls, cows);

    // Update keyboard and scratchpad status mapping
    setKeyStatusMap((prev) => {
      const next = { ...prev };
      // If 0 bulls and 0 cows, all 4 letters are completely eliminated
      if (bulls === 0 && cows === 0) {
        currentInput.split('').forEach((ch) => {
          next[ch] = 'eliminated';
        });
      }
      return next;
    });

    // Mascot Reactions:
    // Bull reacts playfully when correct letter is in correct position (Bull)
    // Cow reacts playfully when correct letter is in wrong position (Cow)
    if (bulls === 4) {
      setBullMood('celebrate');
      setCowMood('celebrate');
      setMascotSpeech('🎉 4 BULLS! Brilliant deduction! We cracked the secret word!');
      setGameStatus('won');
      soundController.playWin();
      triggerConfetti();
      recordGameResult(true, newGuesses.length);
      setTimeout(() => setGameEndOpen(true), 800);
      return;
    }

    // Playful reaction to Bulls and Cows
    const nextBull: MascotMood = bulls > 0 ? 'react' : 'idle';
    const nextCow: MascotMood = cows > 0 ? 'react' : 'idle';
    setBullMood(nextBull);
    setCowMood(nextCow);

    if (bulls > 0 && cows > 0) {
      setMascotSpeech(`Great progress! 🎯 ${bulls} Bull${bulls > 1 ? 's' : ''} in the right spot & 💡 ${cows} Cow${cows > 1 ? 's' : ''} misplaced!`);
    } else if (bulls > 0) {
      setMascotSpeech(`Barnaby cheered! 🎯 ${bulls} Bull${bulls > 1 ? 's' : ''} locked into the exact position!`);
    } else if (cows > 0) {
      setMascotSpeech(`Clara jingled her bell! 💡 ${cows} Cow${cows > 1 ? 's' : ''} in the word, but in different slots!`);
    } else {
      setMascotSpeech(`0 Bulls & 0 Cows! You just eliminated all 4 letters from your suspect list! 🔍`);
    }

    // Auto-settle mascots back to calm idle after 1.8 seconds so animations are brief
    setTimeout(() => {
      setBullMood((prev) => (prev === 'celebrate' ? 'celebrate' : 'idle'));
      setCowMood((prev) => (prev === 'celebrate' ? 'celebrate' : 'idle'));
    }, 1800);

    // Check Loss condition (reached max 8 attempts)
    if (newGuesses.length >= MAX_GUESSES) {
      setBullMood('puzzled');
      setCowMood('puzzled');
      setMascotSpeech(`Aww, out of guesses! The secret word was "${secretWord}". Ready for a rematch?`);
      setGameStatus('lost');
      soundController.playLoss();
      recordGameResult(false, newGuesses.length);
      setTimeout(() => setGameEndOpen(true), 800);
    }
  }, [
    currentInput,
    gameStatus,
    guesses,
    backendConfig,
    secretWord,
    triggerConfetti,
    recordGameResult,
  ]);

  // Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return; // Don't intercept when user is typing in notes/inputs
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        setRulesOpen(false);
        setStatsOpen(false);
        setGameEndOpen(false);
      } else if (/^[a-zA-Z]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        handleCharInput(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmit, handleBackspace, handleCharInput]);

  // Deduction pad handlers
  const handleToggleLetterState = (letter: string) => {
    setLetterStates((prev) => {
      const current = prev[letter] || 'unknown';
      let next: LetterTrackerState = 'unknown';
      if (current === 'unknown') next = 'eliminated';
      else if (current === 'eliminated') next = 'cow';
      else if (current === 'cow') next = 'bull';
      else next = 'unknown';

      return { ...prev, [letter]: next };
    });
  };

  const handleAutoDeduce = () => {
    setLetterStates((prev) => {
      const next = { ...prev };
      // Scan all guesses with 0 bulls and 0 cows
      guesses.forEach((g) => {
        if (g.bulls === 0 && g.cows === 0) {
          g.word.split('').forEach((ch) => {
            next[ch] = 'eliminated';
          });
        }
      });
      return next;
    });
  };

  const handleResetPad = () => {
    setLetterStates({});
    setQuickNotes('');
  };

  const handleToggleMute = () => {
    const newState = soundController.toggleMute();
    setIsMuted(newState);
  };

  return (
    <div className="min-h-screen bg-[#FFF8EC] text-[#30264A] flex flex-col font-sans selection:bg-[#FFD166] selection:text-[#30264A]">
      {/* Top Bar Header */}
      <Header
        onOpenRules={() => setRulesOpen(true)}
        onOpenStats={() => setStatsOpen(true)}
        onToggleDeductionPad={() => setIsDeductionPadOpen((prev) => !prev)}
        isDeductionPadOpen={isDeductionPadOpen}
        onNewGame={handleNewGame}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-6 flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* Main Game Play Column */}
          <div className={`${isDeductionPadOpen ? 'lg:col-span-7' : 'lg:col-span-12 max-w-xl mx-auto'} w-full space-y-3`}>
            {/* Mascot Welcome & Live Reaction Banner */}
            <MascotDuoBanner
              bullMood={bullMood}
              cowMood={cowMood}
              speechText={showMascotSpeech ? mascotSpeech : undefined}
              onDismissSpeech={() => setShowMascotSpeech(false)}
              onTapMascot={() => {
                setShowMascotSpeech(true);
                setBullMood('wave');
                setCowMood('wave');
                setTimeout(() => {
                  setBullMood('idle');
                  setCowMood('idle');
                }, 1500);
              }}
              compact={guesses.length > 0}
            />

            {/* Active Game Board */}
            <GameBoard
              guesses={guesses}
              currentInput={currentInput}
              maxGuesses={MAX_GUESSES}
              gameStatus={gameStatus}
              inputError={inputError}
              duplicateChar={duplicateChar}
              onOpenRules={() => setRulesOpen(true)}
            />

            {/* Virtual Keyboard */}
            <div className="pt-1">
              <VirtualKeyboard
                onKeyPress={handleCharInput}
                onEnter={handleSubmit}
                onBackspace={handleBackspace}
                keyStatusMap={{ ...keyStatusMap, ...letterStates }}
                disabled={gameStatus !== 'playing'}
              />
            </div>

            {/* Mobile quick-open bar for Scratchpad when collapsed */}
            {!isDeductionPadOpen && (
              <div className="flex justify-center pt-1 lg:hidden">
                <button
                  type="button"
                  onClick={() => setIsDeductionPadOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-white hover:bg-[#F2EEFF] text-[#7047EB] border-2 border-[#E7DFFF] transition-all shadow-xs"
                  aria-label="Open Detective Scratchpad"
                >
                  <span>🕵️ Open Detective Scratchpad</span>
                  <span className="text-[10px] bg-[#F2EEFF] text-[#7047EB] px-2 py-0.5 rounded-full font-mono font-bold">
                    {Object.values(letterStates).filter((s) => s === 'eliminated').length} eliminated
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Interactive Deduction / Detective Scratchpad Column */}
          {isDeductionPadOpen && (
            <div className="lg:col-span-5 w-full space-y-4">
              <DeductionPad
                letterStates={letterStates}
                onToggleLetterState={handleToggleLetterState}
                onResetPad={handleResetPad}
                onAutoDeduce={handleAutoDeduce}
                quickNotes={quickNotes}
                onQuickNotesChange={setQuickNotes}
                isCollapsed={false}
                onToggleCollapse={() => setIsDeductionPadOpen(false)}
              />

              {/* Guesses Log summary widget in Pure White Card */}
              <div className="p-3.5 sm:p-4 rounded-2xl border-2 border-[#E7DFFF] bg-white shadow-md shadow-[#7047EB]/5">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#30264A]">
                    Live Deduction Log
                  </span>
                  <span className="text-xs text-[#746B85] font-mono font-semibold">
                    {guesses.length} of {MAX_GUESSES} used
                  </span>
                </div>
                {guesses.length === 0 ? (
                  <p className="text-xs text-[#746B85] italic py-1.5">
                    No guesses yet. Enter your first 4-letter word above or use your physical keyboard.
                  </p>
                ) : (
                  <div className="space-y-1.5 font-mono text-xs max-h-48 overflow-y-auto">
                    {guesses.map((g, idx) => (
                      <div
                        key={g.id}
                        className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-[#FFF8EC] border border-[#E7DFFF]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[#746B85] font-bold w-4">{idx + 1}.</span>
                          <span className="font-extrabold tracking-widest text-[#30264A]">{g.word}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#FF6B6B] bg-[#FFEBEB] font-bold px-2 py-0.5 rounded-md border border-[#FF6B6B]/30">
                            🐂 {g.bulls}B
                          </span>
                          <span className="text-[#20ABA5] bg-[#E8F9F8] font-bold px-2 py-0.5 rounded-md border border-[#28C7C0]/40">
                            🐄 {g.cows}C
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer in Warm Cream with Lavender Border */}
      <footer className="w-full border-t border-[#E7DFFF] bg-[#FFF8EC] py-3 text-center text-xs text-[#746B85]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Bulls & Cows 4-Letter Word Deductive Puzzle · Final Year Project Edition
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRulesOpen(true)}
              className="text-[#7047EB] hover:underline font-bold transition-colors"
            >
              Game Rules
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <RulesModal isOpen={rulesOpen} onClose={() => setRulesOpen(false)} />
      <StatsModal
        isOpen={statsOpen}
        onClose={() => setStatsOpen(false)}
        stats={stats}
        onResetStats={() => setStats(INITIAL_STATS)}
      />
      <GameEndModal
        isOpen={gameEndOpen}
        status={gameStatus === 'won' ? 'won' : 'lost'}
        secretWord={secretWord}
        guesses={guesses}
        onPlayAgain={handleNewGame}
      />
    </div>
  );
}
