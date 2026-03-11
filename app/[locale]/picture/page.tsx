'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useGameStore } from '@/lib/store';
import { pictureProblems, PictureProblem } from '@/lib/games/picture';
import GameHeader from '@/components/GameHeader';
import GameFooter from '@/components/GameFooter';

export default function PictureGame() {
  const t = useTranslations();
  const { currentLevel, addScore } = useGameStore();

  const [currentProblem] = useState<PictureProblem | null>(pictureProblems[0]);
  const [foundDifferences, setFoundDifferences] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(currentProblem?.timeLimit || 240);
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [hintedDifference, setHintedDifference] = useState<string | null>(null);

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

  const handleDifferenceClick = (diffId: string) => {
    if (!foundDifferences.has(diffId)) {
      setFoundDifferences((prev) => {
        const newFound = new Set(prev);
        newFound.add(diffId);
        addScore(10);

        if (currentProblem && newFound.size === currentProblem.totalDifferences) {
          setGameComplete(true);
        }

        if (hintedDifference === diffId) {
          setHintedDifference(null);
        }

        return newFound;
      });
    }
  };

  const handleRestart = () => {
    setFoundDifferences(new Set());
    setShowHint(false);
    setTimeRemaining(currentProblem?.timeLimit || 240);
    setGameComplete(false);
    setHintedDifference(null);
  };

  const handleNextLevel = () => {
    handleRestart();
  };

  if (!currentProblem) return null;

  const remainingDifferences = currentProblem.totalDifferences - foundDifferences.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-green-900 dark:from-slate-950 dark:via-green-950 dark:to-slate-950 pb-24">
      <GameHeader
        title={t('games.picture.title')}
        level={currentLevel}
        showScore={true}
        showTime={true}
        timeRemaining={timeRemaining}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mt-8 px-4"
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
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              {t('games.picture.differences')}
            </h3>
            <div className="flex gap-4 text-white/80">
              <span>✅ {t('games.picture.found')}: {foundDifferences.size}/{currentProblem.totalDifferences}</span>
              <span>⏳ {t('games.picture.remaining')}: {remainingDifferences}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="relative bg-gray-200 dark:bg-gray-700 rounded-xl aspect-[4/3] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">🖼️</div>
                <p className="text-sm">{t('games.picture.image')} 1</p>
              </div>
            </div>

            {currentProblem.differences.map((diff) => (
              <motion.button
                key={`${diff.id}-left`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDifferenceClick(diff.id)}
                disabled={foundDifferences.has(diff.id)}
                className={`absolute cursor-pointer transition-all ${
                  foundDifferences.has(diff.id)
                    ? 'bg-green-500/70'
                    : (showHint && hintedDifference === diff.id)
                    ? 'bg-yellow-500/70 animate-pulse'
                    : 'bg-transparent hover:bg-green-500/30'
                } rounded-full`}
                style={{
                  left: `${(diff.position.x / 600) * 100}%`,
                  top: `${(diff.position.y / 450) * 100}%`,
                  width: `${diff.radius * 2}px`,
                  height: `${diff.radius * 2}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {foundDifferences.has(diff.id) && (
                  <span className="text-white font-bold text-lg">✓</span>
                )}
              </motion.button>
            ))}
          </div>

          <div className="relative bg-gray-200 dark:bg-gray-700 rounded-xl aspect-[4/3] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">🖼️</div>
                <p className="text-sm">{t('games.picture.image')} 2</p>
              </div>
            </div>

            {currentProblem.differences.map((diff) => (
              <motion.button
                key={`${diff.id}-right`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDifferenceClick(diff.id)}
                disabled={foundDifferences.has(diff.id)}
                className={`absolute cursor-pointer transition-all ${
                  foundDifferences.has(diff.id)
                    ? 'bg-green-500/70'
                    : (showHint && hintedDifference === diff.id)
                    ? 'bg-yellow-500/70 animate-pulse'
                    : 'bg-transparent hover:bg-green-500/30'
                } rounded-full`}
                style={{
                  left: `${(diff.position.x / 600) * 100}%`,
                  top: `${(diff.position.y / 450) * 100}%`,
                  width: `${diff.radius * 2}px`,
                  height: `${diff.radius * 2}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {foundDifferences.has(diff.id) && (
                  <span className="text-white font-bold text-lg">✓</span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {showHint && !gameComplete && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg z-10"
            >
              💡 {t('games.picture.clickDifference')}
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
                {t('games.picture.complete')} 🎉
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('games.picture.foundAll', { count: currentProblem.totalDifferences })}
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
  );
}
