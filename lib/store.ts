import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type GameCategory = 'mystery' | 'search' | 'escape' | 'picture';

interface GameState {
  // Current game state
  currentCategory: GameCategory | null;
  currentLevel: number;
  score: number;
  hintsUsed: number;
  timeRemaining: number;
  isPlaying: boolean;
  isPaused: boolean;

  // Theme
  theme: 'light' | 'dark';

  // Actions
  setCurrentCategory: (category: GameCategory) => void;
  setCurrentLevel: (level: number) => void;
  addScore: (points: number) => void;
  subtractScore: (points: number) => void;
  resetGame: () => void;
  useHint: () => void;
  setTimeRemaining: (time: number) => void;
  decrementTime: () => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      // Initial state
      currentCategory: null,
      currentLevel: 1,
      score: 0,
      hintsUsed: 0,
      timeRemaining: 300,
      isPlaying: false,
      isPaused: false,
      theme: 'dark', // Default to dark mode for teen/adult audience

      // Actions
      setCurrentCategory: (category) => set({ currentCategory: category }),
      setCurrentLevel: (level) => set({ currentLevel: level }),
      addScore: (points) => set((state) => ({ score: state.score + points })),
      subtractScore: (points) => set((state) => ({ score: state.score - points })), // Allow negative scores for level reset logic
      useHint: () => set((state) => ({ hintsUsed: state.hintsUsed + 1 })),
      setTimeRemaining: (time) => set({ timeRemaining: time }),
      decrementTime: () => set((state) => ({
        timeRemaining: Math.max(0, state.timeRemaining - 1)
      })),
      startGame: () => set({ isPlaying: true, isPaused: false }),
      pauseGame: () => set({ isPaused: true }),
      resumeGame: () => set({ isPaused: false }),
      endGame: () => set({ isPlaying: false, isPaused: false }),
      resetGame: () => set({
        currentCategory: null,
        currentLevel: 1,
        score: 0,
        hintsUsed: 0,
        timeRemaining: 300,
        isPlaying: false,
        isPaused: false
      }),
      setTheme: (theme) => set({ theme })
    }),
    {
      name: 'mysterymind-storage',
      storage: createJSONStorage(() => {
        // Only use localStorage on client side
        if (typeof window !== 'undefined') {
          return window.localStorage;
        }
        // Fallback for SSR
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {}
        };
      })
    }
  )
);
