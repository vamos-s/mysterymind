'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NextIntlClientProvider } from 'next-intl';
import { useGameStore } from '@/lib/store';
import { escapeProblems, EscapeProblem } from '@/lib/games/escape';
import GameHeader from '@/components/GameHeader';
import GameFooter from '@/components/GameFooter';
import enMessages from '@/messages/en.json';

export default function EscapeGame() {
  const { currentLevel, addScore } = useGameStore();

  const [currentProblem] = useState<EscapeProblem | null>(escapeProblems[0]);
  const [inventory, setInventory] = useState<string[]>([]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [puzzleInput, setPuzzleInput] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(currentProblem?.timeLimit || 300);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState<Set<string>>(new Set());
  const [showPuzzle, setShowPuzzle] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAreaClick = (areaId: string, areaType: string) => {
    setSelectedArea(areaId);

    if (areaType === 'puzzle') {
      setShowPuzzle(true);
    } else if (areaType === 'object' && currentProblem) {
      const area = currentProblem.room.clickableAreas.find(a => a.id === areaId);
      if (area && !inventory.includes(area.name)) {
        setInventory((prev) => [...prev, area.name]);
        addScore(5);
      }
    } else if (areaType === 'door') {
      if (puzzleSolved.size === currentProblem?.puzzles.length) {
        setGameComplete(true);
        addScore(50);
      }
    }
  };

  const handlePuzzleSubmit = (puzzleId: string, solution: string) => {
    const puzzle = currentProblem?.puzzles.find((p) => p.id === puzzleId);
    if (puzzle && solution.toLowerCase() === puzzle.solution.toLowerCase()) {
      setPuzzleSolved((prev) => new Set(prev).add(puzzleId));
      addScore(20);
      setShowPuzzle(false);
      setPuzzleInput('');
    }
  };

  const handleRestart = () => {
    setInventory([]);
    setSelectedArea(null);
    setPuzzleInput('');
    setShowPuzzle(false);
    setHintsUsed(0);
    setShowHint(false);
    setTimeRemaining(currentProblem?.timeLimit || 300);
    setGameComplete(false);
    setPuzzleSolved(new Set());
  };

  const handleNextLevel = () => {
    handleRestart();
  };

  if (!currentProblem) return null;

  const selectedAreaData = currentProblem.room.clickableAreas.find((a) => a.id === selectedArea);
  const currentPuzzle = selectedAreaData?.type === 'puzzle'
    ? currentProblem.puzzles.find((puzzle) => !puzzleSolved.has(puzzle.id) && puzzle.id === selectedArea!)
    : null;

  return (
    <NextIntlClientProvider messages={enMessages} locale="en">
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-orange-900 dark:from-slate-950 dark:via-orange-950 dark:to-slate-950 pb-24">
        <GameHeader
          title="Escape Game"
          level={currentLevel}
          showScore={true}
          showTime={true}
          timeRemaining={timeRemaining}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mt-8 px-4"
        >
          <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              {currentProblem.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {currentProblem.description}
            </p>
          </div>

          <div className="mb-6 p-4 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl">
            <h3 className="text-lg font-semibold text-white mb-3">
              Inventory
            </h3>
            <div className="flex gap-2 flex-wrap">
              {inventory.length === 0 ? (
                <p className="text-white/60 text-sm">Empty</p>
              ) : (
                inventory.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-3 py-1 bg-white/20 rounded-lg text-white text-sm"
                  >
                    {item}
                  </motion.div>
                ))
              )}
            </div>
          </div>

          <div className="relative bg-gray-200 dark:bg-gray-700 rounded-xl aspect-[4/3] mb-6 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-6xl mb-4">🚪</div>
                <p className="text-lg">Room</p>
                <p className="text-sm">Click on objects to investigate</p>
              </div>
            </div>

            {currentProblem.room.clickableAreas.map((area) => {
              const isSolved = area.type === 'puzzle' && puzzleSolved.has(area.id);
              const isInInventory = area.type === 'object' && inventory.includes(area.name);

              return (
                <motion.button
                  key={area.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAreaClick(area.id, area.type)}
                  className={`absolute cursor-pointer transition-all ${
                    isSolved
                      ? 'bg-green-500/50'
                      : isInInventory
                      ? 'bg-yellow-500/50'
                      : area.type === 'door'
                      ? 'bg-blue-500/50'
                      : area.type === 'puzzle'
                      ? 'bg-purple-500/50'
                      : 'bg-orange-500/50'
                  } rounded-lg`}
                  style={{
                    left: `${(area.position.x / 600) * 100}%`,
                    top: `${(area.position.y / 450) * 100}%`,
                    width: '80px',
                    height: '60px',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <span className="text-white text-xs">
                    {area.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {showPuzzle && currentPuzzle && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                onClick={() => setShowPuzzle(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {currentPuzzle.description}
                  </h3>
                  <input
                    type="text"
                    value={puzzleInput}
                    onChange={(e) => setPuzzleInput(e.target.value)}
                    placeholder="Enter solution..."
                    className="w-full p-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 mb-4 focus:border-indigo-500 outline-none"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handlePuzzleSubmit(currentPuzzle.id, puzzleInput);
                      }
                    }}
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => handlePuzzleSubmit(currentPuzzle.id, puzzleInput)}
                      className="flex-1 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                      Submit
                    </button>
                    <button
                      onClick={() => setShowPuzzle(false)}
                      className="flex-1 py-2 bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl border-2 border-yellow-400"
              >
                <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">
                  💡 Hint ({hintsUsed}/{currentProblem.hintCount})
                </h4>
                <p className="text-yellow-700 dark:text-yellow-400">
                  {showHint && currentProblem.puzzles.find((p) => !puzzleSolved.has(p.id))?.clue}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {gameComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-green-500 text-center"
              >
                <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                  Complete! 🎉
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  You escaped the room!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <GameFooter
          onRestart={handleRestart}
          onNextLevel={handleNextLevel}
          showHint={!gameComplete}
          showRestart={true}
          showNextLevel={gameComplete}
        />
      </div>
    </NextIntlClientProvider>
  );
}
