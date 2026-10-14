export type LetterEvaluation = 'bull' | 'cow' | 'miss';

export interface GuessLetterDetail {
  letter: string;
  status: LetterEvaluation;
}

export interface GuessRecord {
  id: string;
  word: string;
  bulls: number;
  cows: number;
  timestamp: number;
  details: GuessLetterDetail[];
}

export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
  };
}

export type LetterTrackerState = 'unknown' | 'eliminated' | 'cow' | 'bull';

export interface BackendConfig {
  enabled: boolean;
  endpointUrl: string; // e.g. "http://localhost:5000/api/guess"
  secretWordKey?: string;
  autoExtractBullsCows: boolean;
}
