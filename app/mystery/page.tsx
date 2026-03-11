'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NextIntlClientProvider } from 'next-intl';
import { useGameStore } from '@/lib/store';
import { mysteryProblems, MysteryProblem, getMysteryProblem, getNextMysteryLevel } from '@/lib/games/mystery';
import GameHeader from '@/components/GameHeader';
import enMessages from '@/messages/en.json';

const DIFFICULTY_COLORS = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-red-500'
};

const DIFFICULTY_LABELS = {
  easy: '⭐ Easy',
  medium: '⭐⭐ Medium',
  hard: '⭐⭐⭐ Hard'
};

const CLUE_TYPE_ICONS = {
  time: '⏱️',
  location: '📍',
  evidence: '🔍',
  witness: '👁️',
  alibi: '🛡️'
} as const;

export default function MysteryGame() {
  const { currentLevel, addScore, subtractScore, setCurrentLevel, score } = useGameStore();
  const resultRef = useRef<HTMLDivElement>(null);

  const [currentProblem, setCurrentProblem] = useState<MysteryProblem | null>(getMysteryProblem(currentLevel) || mysteryProblems[0]);
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(currentProblem?.timeLimit || 300);
  const [timeStopped, setTimeStopped] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedClues, setRevealedClues] = useState<Set<string>>(new Set());
  const [collectedEvidence, setCollectedEvidence] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showNotes, setShowNotes] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [wasWrongAnswer, setWasWrongAnswer] = useState(false);
  const [showResetWarning, setShowResetWarning] = useState(false);

  useEffect(() => {
    if (currentProblem) {
   
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimeRemaining(currentProblem.timeLimit);
      setSelectedSuspect(null);
      setShowAnswer(false);
      setHintsUsed(0);
      setRevealedClues(new Set());
      setGameComplete(false);
      setTimeStopped(false);
    }
  }, [currentProblem]);

  useEffect(() => {
    if (timeStopped) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowAnswer(true);
          setGameComplete(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentProblem, timeStopped]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (suspectId: string) => {
    // Stop timer immediately when selecting an answer
    setTimeStopped(true);

    if (suspectId === currentProblem?.correctAnswer) {
      // Correct answer - give 50 points instead of the full problem.points
      setSelectedSuspect(suspectId);
      setShowAnswer(true);
      addScore(50); // Fixed 50 points for correct answer
      setGameComplete(true);
      setWasWrongAnswer(false);
      setShowResetWarning(false);
    } else {
      // Wrong answer - deduct 50 points as penalty
      const penalty = 50;
      const currentLevelValue = currentProblem?.level || 1;

      // Calculate if the next wrong answer will cause reset (score will be < 0 after penalty)
      const nextScore = score - penalty;
      const shouldWarnReset = currentLevelValue > 1 && nextScore < 0;

      // Deduct penalty points (allow going negative on level 1, but track for reset warning on level 2+)
      subtractScore(penalty);
      setSelectedSuspect(suspectId);
      setShowAnswer(true);
      setGameComplete(false);
      setWasWrongAnswer(true);

      // Show reset warning if on level 2+ and points < 0
      setShowResetWarning(shouldWarnReset);
    }

    // Scroll to result - ensure it actually scrolls to the bottom
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 150);
  };

  const handleCollectEvidence = (evidenceId: string, cost: number) => {
    if (collectedEvidence.has(evidenceId)) return;

    if (score >= cost) {
      setCollectedEvidence(new Set([...collectedEvidence, evidenceId]));
      subtractScore(cost);
    }
  };

  const handleRestart = () => {
    // If points < 0, reset to level 1 (only applies to level 2+)
    const currentLevelValue = currentProblem?.level || 1;
    if (currentLevelValue > 1 && score < 0) {
      setCurrentLevel(1);
      const level1Problem = getMysteryProblem(1);
      if (level1Problem) {
        setCurrentProblem(level1Problem);
      }
    }
    // Reset other states
    setSelectedSuspect(null);
    setShowAnswer(false);
    setTimeStopped(false);
    setHintsUsed(0);
    setRevealedClues(new Set());
    setCollectedEvidence(new Set());
    setNotes({});
    setShowNotes(false);
    setTimeRemaining(currentProblem?.timeLimit || 300);
    setGameComplete(false);
    setWasWrongAnswer(false);
    setShowResetWarning(false);
  };

  const handleNextLevel = () => {
    const nextLevel = getNextMysteryLevel(currentProblem?.level || 1);
    if (nextLevel) {
      const nextProblem = getMysteryProblem(nextLevel);
      if (nextProblem) {
        setCurrentProblem(nextProblem);
        setSelectedSuspect(null);
        setShowAnswer(false);
        setTimeStopped(false);
        setHintsUsed(0);
        setRevealedClues(new Set());
        setCollectedEvidence(new Set());
        setNotes({});
        setShowNotes(false);
        setGameComplete(false);
      }
    }
  };

  const handleHint = () => {
    // Find first clue that hasn't been revealed
    const unrevealedClue = currentProblem?.clues.find((clue) => !revealedClues.has(clue.id));

    if (!unrevealedClue) return; // No more clues to reveal

    // Use fixed cost for hints (clues don't have individual costs)
    const clueCost = 20;
    if (score < clueCost) {
      alert(`Not enough points! You need ${clueCost} points to reveal this clue.`);
      return;
    }

    // Deduct points and reveal clue
    subtractScore(clueCost);
    setHintsUsed((prev) => prev + 1);
    setRevealedClues(new Set([...revealedClues, unrevealedClue.id]));
  };

  if (!currentProblem) return null;

  const timePercentage = (timeRemaining / currentProblem.timeLimit) * 100;
  const timeColor = timePercentage > 50 ? 'bg-green-500' : timePercentage > 25 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <NextIntlClientProvider messages={enMessages} locale="en" timeZone="Asia/Seoul">
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 pb-24">
        <GameHeader
          title="Mystery Game"
          level={currentProblem.level}
          showScore={true}
          showTime={true}
          timeRemaining={timeRemaining}
          hintsUsed={hintsUsed}
          totalHints={currentProblem.hintCount}
          showHintCounter={true}
        />

        {/* Action Buttons */}
        <div className="max-w-4xl mx-auto mt-4 px-4 flex justify-end gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleHint}
            disabled={timeStopped || hintsUsed >= currentProblem.hintCount}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
              !timeStopped && hintsUsed < currentProblem.hintCount
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                : 'bg-gray-500 text-gray-300 cursor-not-allowed'
            }`}
          >
            💡 Get Hint (-20 pts)
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNotes(!showNotes)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
              showNotes
                ? 'bg-indigo-500 text-white'
                : 'bg-white/20 text-white/70 hover:bg-white/30'
            }`}
          >
            📝 {showNotes ? 'Hide Notes' : 'Show Notes'}
          </motion.button>
        </div>

        {/* Notes Panel */}
        <AnimatePresence>
          {showNotes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="max-w-4xl mx-auto mt-4 px-4"
            >
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  📝 Detective Notes
                </h3>
                <div className="space-y-4">
                  {currentProblem.suspects.map((suspect) => (
                    <div key={suspect.id} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                          {suspect.name[0]}
                        </div>
                        <h4 className="font-semibold text-white">{suspect.name}</h4>
                      </div>
                      <textarea
                        value={notes[suspect.id] || ''}
                        onChange={(e) => setNotes({ ...notes, [suspect.id]: e.target.value })}
                        placeholder="Write your notes about this suspect..."
                        disabled={showAnswer}
                        rows={2}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm resize-none focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mt-8 px-4"
        >
          {/* Problem Header */}
          <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-2 rounded-bl-xl">
              <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${DIFFICULTY_COLORS[currentProblem.difficulty]}`}>
                {DIFFICULTY_LABELS[currentProblem.difficulty]}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{currentProblem.title.split(' ')[0]}</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {currentProblem.title.split(' ').slice(1).join(' ')}
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {currentProblem.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <span>🎯 Points: {currentProblem.points}</span>
              <span>⏱️ Time: {Math.floor(currentProblem.timeLimit / 60)}m {currentProblem.timeLimit % 60}s</span>
              <span>💡 Hints: {currentProblem.hintCount}</span>
            </div>
          </div>

          {/* Scenario Card */}
          <div className="mb-6 p-6 bg-indigo-50 dark:bg-gray-800 rounded-xl border-2 border-indigo-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300 mb-3 flex items-center gap-2">
              📜 Scenario
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {currentProblem.scenario}
            </p>
          </div>

          {/* Timeline */}
          {currentProblem.timeline && currentProblem.timeline.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                ⏰ Timeline
              </h3>
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-x-auto">
                <table className="w-full text-sm min-w-[600px]">
                  <thead>
                    <tr className="border-b-2 border-white/30">
                      <th className="text-left py-2 px-3 text-white font-semibold sticky left-0 bg-white/10">Time</th>
                      {currentProblem.suspects.map((suspect) => (
                        <th key={suspect.id} className="text-center py-2 px-2 text-white font-semibold whitespace-nowrap">
                          {suspect.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentProblem.timeline.map((entry, idx) => (
                      <tr
                        key={idx}
                        className={`border-b border-white/10 ${entry.crimeTime ? 'bg-red-500/20' : ''}`}
                      >
                        <td className={`py-2 px-3 font-semibold whitespace-nowrap sticky left-0 ${entry.crimeTime ? 'bg-red-500/20' : 'bg-white/10'} ${entry.crimeTime ? 'text-red-400' : 'text-white'}`}>
                          {entry.time}
                          {entry.crimeTime && ' 🔴'}
                        </td>
                        {currentProblem.suspects.map((suspect) => {
                          const location = entry.suspectLocations.find(
                            (loc) => loc.suspectId === suspect.id
                          );
                          return (
                            <td key={suspect.id} className="text-center py-2 px-2">
                              {location ? (
                                <div className="text-xs">
                                  <div className="text-white/90 font-medium">{location.location}</div>
                                  <div className="text-white/60 text-xs">{location.activity}</div>
                                  {location.verified && (
                                    <span className="inline-block ml-1 text-green-400 text-xs">✓</span>
                                  )}
                                </div>
                              ) : (
                                <span className="text-white/30">?</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 text-xs text-white/50 flex items-center gap-4">
                  <span>✓ = Verified alibi</span>
                  <span>🔴 = Crime time</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Time Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-white/80 text-sm mb-2">
              <span>Time Remaining</span>
              <span>{formatTime(timeRemaining)}</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: `${timePercentage}%` }}
                className={`h-full ${timeColor} transition-colors`}
              />
            </div>
          </div>

          {/* Evidence Collection */}
          {currentProblem.evidence && currentProblem.evidence.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                🔍 Collect Evidence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentProblem.evidence.map((ev) => {
                  const isCollected = collectedEvidence.has(ev.id);
                  return (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: isCollected ? 1 : 1.02 }}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        isCollected
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-yellow-500/50 bg-yellow-50/10 dark:bg-yellow-900/10 hover:border-yellow-500'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{ev.icon}</span>
                          <h4 className="font-semibold text-white">{ev.name}</h4>
                        </div>
                        {isCollected && (
                          <span className="text-green-400">✓ Collected</span>
                        )}
                      </div>
                      <p className="text-xs text-white/50 mb-2">
                        📍 {ev.location}
                      </p>
                      {isCollected ? (
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {ev.description}
                        </p>
                      ) : (
                        <button
                          onClick={() => handleCollectEvidence(ev.id, ev.cost)}
                          className={`w-full py-2 rounded-lg font-semibold text-sm transition-all ${
                            score >= ev.cost
                              ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                              : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                          }`}
                          disabled={score < ev.cost || showAnswer}
                        >
                          Collect ({ev.cost} pts)
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Suspects */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              👥 Suspects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentProblem.suspects.map((suspect, index) => {
                const isSelected = selectedSuspect === suspect.id;
                const isCorrect = suspect.id === currentProblem.correctAnswer;

                return (
                  <motion.button
                    key={suspect.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => !showAnswer && handleAnswer(suspect.id)}
                    disabled={showAnswer}
                    className={`p-5 rounded-xl border-2 text-left transition-all ${
                      isSelected && showAnswer
                        ? isCorrect
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-white/20 bg-white/10 hover:border-indigo-400 hover:bg-white/20'
                    } ${showAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                        {suspect.name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-lg text-white">
                            {suspect.name}
                          </h4>
                          {/* Alibi Status Indicators */}
                          {suspect.alibiVerified && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/50">
                              ✓ Alibi Verified
                            </span>
                          )}
                          {suspect.alibiContradicted && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/50">
                              ⚠️ Alibi Contradicted
                            </span>
                          )}
                        </div>
                        <p className="text-white/60 text-sm mb-2">
                          {suspect.occupation} • Age: {suspect.age}
                        </p>
                        <p className="text-white/80 text-sm italic">
                          &ldquo;{suspect.statement}&rdquo;
                        </p>
                        <div className="mt-2 text-xs text-white/70">
                          <span className="font-semibold">Alibi:</span> {suspect.alibi}
                        </div>
                        {isSelected && showAnswer && (
                          <div className="mt-3 text-sm">
                            {isCorrect ? (
                              <span className="text-green-600 dark:text-green-400 font-semibold">
                                ✅ Correct! This is the culprit.
                              </span>
                            ) : (
                              <span className="text-red-600 dark:text-red-400 font-semibold">
                                ❌ Wrong! This suspect is innocent.
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Clues */}
          {revealedClues.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-2 border-yellow-400"
            >
              <h3 className="text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-4 flex items-center gap-2">
                💡 Clues ({revealedClues.size}/{currentProblem.hintCount})
              </h3>
              <div className="space-y-3">
                {currentProblem.clues
                  .filter((clue) => revealedClues.has(clue.id))
                  .map((clue) => (
                    <motion.div
                      key={clue.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-white dark:bg-gray-800 rounded-lg"
                    >
                      <span className="mr-2">{CLUE_TYPE_ICONS[clue.type] || '🔍'}</span>
                      <span className="text-yellow-700 dark:text-yellow-400">
                        {clue.description}
                      </span>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          )}

          {/* Result */}
          <AnimatePresence>
            {showAnswer && (
              <motion.div
                ref={resultRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`p-6 rounded-xl shadow-lg border-2 ${
                  gameComplete
                    ? 'border-green-500 bg-white dark:bg-gray-800'
                    : 'border-red-500 bg-white dark:bg-gray-800'
                }`}
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  {gameComplete ? '🎉 Case Solved!' : '💔 Game Over!'}
                </h3>
                {gameComplete ? (
                  <>
                    <h4 className="font-semibold text-lg text-indigo-600 dark:text-indigo-400 mb-2">
                      Explanation
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {currentProblem.explanation}
                    </p>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center mb-4">
                      <p className="text-green-700 dark:text-green-400 font-bold text-lg">
                        +50 Points Earned!
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center">
                      {getNextMysteryLevel(currentProblem?.level || 1) ? (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleNextLevel}
                          className="px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors font-semibold"
                        >
                          ➡️ Next Level
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleRestart}
                          className="px-6 py-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-semibold"
                        >
                          🔄 Try Again
                        </motion.button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center mb-4">
                      <p className="text-red-700 dark:text-red-400 font-bold text-lg">
                        You selected the wrong suspect!
                      </p>
                      <p className="text-red-600 dark:text-red-500 font-bold mt-1">
                        -50 Points Penalty!
                      </p>
                    </div>
                    {/* Reset Warning - only show on level 2+ when points < 0 */}
                    {showResetWarning && (
                      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center mb-4 border-2 border-orange-400">
                        <p className="text-orange-700 dark:text-orange-400 font-bold text-lg">
                          ⚠️ Warning: Reset to Level 1!
                        </p>
                        <p className="text-orange-600 dark:text-orange-500 font-semibold mt-1">
                          Clicking 'Try Again' will reset you to Level 1.
                        </p>
                      </div>
                    )}
                    {/* Show hints that were used */}
                    {revealedClues.size > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Clues you revealed:
                        </h4>
                        <div className="space-y-2">
                          {currentProblem.clues
                            .filter((clue) => revealedClues.has(clue.id))
                            .map((clue) => (
                              <div key={clue.id} className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                <span className="mr-2">{CLUE_TYPE_ICONS[clue.type] || '🔍'}</span>
                                <span className="text-yellow-700 dark:text-yellow-400 text-sm">
                                  {clue.description}
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-4 text-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRestart}
                        className="px-6 py-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors font-semibold"
                      >
                        🔄 Try Again
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </NextIntlClientProvider>
  );
}
