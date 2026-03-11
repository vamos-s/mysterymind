'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useGameStore } from '@/lib/store';
import { searchProblems, SearchProblem } from '@/lib/games/search';
import GameHeader from '@/components/GameHeader';
import GameFooter from '@/components/GameFooter';

export default function SearchGame() {
  const t = useTranslations();
  const { currentLevel, addScore } = useGameStore();

  const [currentProblem] = useState<SearchProblem | null>(searchProblems[0]);
  const [foundObjects, setFoundObjects] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(currentProblem?.timeLimit || 180);
  const [showHint, setShowHint] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

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

  const handleObjectClick = (objectId: string) => {
    if (!foundObjects.has(objectId)) {
      setFoundObjects((prev) => {
        const newFound = new Set(prev);
        newFound.add(objectId);
        addScore(10);

        // Check if all objects found
        if (currentProblem && newFound.size === currentProblem.objects.length) {
          setGameComplete(true);
        }

        return newFound;
      });
    }
  };

  const handleRestart = () => {
    setFoundObjects(new Set());
    setShowHint(false);
    setTimeRemaining(currentProblem?.timeLimit || 180);
    setGameComplete(false);
  };

  const handleNextLevel = () => {
    handleRestart();
  };

  if (!currentProblem) return null;

  const remainingObjects = currentProblem.objects.length - foundObjects.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-blue-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 pb-24">
      <GameHeader
        title={t('games.search.title')}
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
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">
              {t('games.search.objectsToFind')}
            </h3>
            <div className="flex gap-4 text-white/80">
              <span>✅ {t('games.search.found')}: {foundObjects.size}</span>
              <span>⏳ {t('games.search.remaining')}: {remainingObjects}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {currentProblem.objects.map((obj) => (
              <motion.div
                key={obj.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-2 rounded-lg text-center text-sm ${
                  foundObjects.has(obj.id)
                    ? 'bg-green-500 text-white line-through'
                    : 'bg-white/20 text-white'
                }`}
              >
                {obj.name}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative bg-gray-200 dark:bg-gray-700 rounded-xl aspect-[4/3] mb-6 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-4">🏠</div>
              <p className="text-lg">{t('games.search.gameScene')}</p>
              <p className="text-sm">{t('games.search.clickHint')}</p>
            </div>
          </div>

          {currentProblem.objects.map((obj) => (
            <motion.button
              key={obj.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: showHint && !foundObjects.has(obj.id) ? 1 : 0 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleObjectClick(obj.id)}
              disabled={foundObjects.has(obj.id)}
              className={`absolute w-12 h-12 rounded-full cursor-pointer transition-all ${
                foundObjects.has(obj.id) ? 'bg-green-500/50' : 'bg-blue-500/50 hover:bg-blue-500'
              }`}
              style={{
                left: `${(obj.position.x / 600) * 100}%`,
                top: `${(obj.position.y / 450) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {foundObjects.has(obj.id) && '✓'}
            </motion.button>
          ))}

          {showHint && !gameComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg"
            >
              💡 {t('games.search.findHint')}
            </motion.div>
          )}
        </div>

        <AnimatePresence>
          {gameComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-green-500 text-center"
            >
              <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                {t('games.search.complete')} 🎉
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {t('games.search.foundAll', { count: currentProblem.objects.length })}
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
