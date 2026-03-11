'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export const dynamic = 'force-dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useGameStore } from '@/lib/store';
import { mysteryProblems, MysteryProblem, getMysteryProblem, getNextMysteryLevel } from '@/lib/games/mystery';
import GameHeader from '@/components/GameHeader';
import NotesModal from '@/components/mystery/NotesModal';
import ProblemHeader from '@/components/mystery/ProblemHeader';
import ScenarioCard from '@/components/mystery/ScenarioCard';
import Timeline from '@/components/mystery/Timeline';
import TimeBar from '@/components/mystery/TimeBar';
import SuspectCard from '@/components/mystery/SuspectCard';
import CluesCard from '@/components/mystery/CluesCard';
import ActionButton from '@/components/mystery/ActionButton';

export default function MysteryGame() {
  const t = useTranslations('mystery');
  const { currentLevel, addScore, subtractScore, setCurrentLevel, score } = useGameStore();
  const resultRef = useRef<HTMLDivElement>(null);

  // Memoize current problem to prevent unnecessary recalculations
  const currentProblem = useMemo<MysteryProblem | null>(
    () => getMysteryProblem(currentLevel) || mysteryProblems[0],
    [currentLevel]
  );

  // State
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(currentProblem?.timeLimit || 300);
  const [timeStopped, setTimeStopped] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedClues, setRevealedClues] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showNotes, setShowNotes] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showResetWarning, setShowResetWarning] = useState(false);

  // Lock/Unlock body scroll when Notes modal is open
  useEffect(() => {
    document.body.style.overflow = showNotes ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showNotes]);

  // Reset state when problem changes
  useEffect(() => {
    if (currentProblem) {
      setTimeRemaining(currentProblem.timeLimit);
      setSelectedSuspect(null);
      setShowAnswer(false);
      setHintsUsed(0);
      setRevealedClues(new Set());
      setGameComplete(false);
      setTimeStopped(false);
    }
  }, [currentProblem]);

  // Timer
  useEffect(() => {
    if (timeStopped || !currentProblem) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentProblem, timeStopped]);

  // Memoize isWrongAnswer for performance
  const isWrongAnswer = useMemo(
    () => selectedSuspect !== null && selectedSuspect !== currentProblem?.correctAnswer,
    [selectedSuspect, currentProblem?.correctAnswer]
  );

  // Reset to level 1 helper function (defined before use)
  const resetToLevel1 = useCallback(() => {
    setCurrentLevel(1);
    setSelectedSuspect(null);
    setShowAnswer(false);
    setTimeStopped(false);
    setHintsUsed(0);
    setRevealedClues(new Set());
    setNotes({});
    setShowNotes(false);
    setGameComplete(false);
    setShowResetWarning(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setCurrentLevel]);

  const handleAnswer = useCallback(
    (suspectId: string) => {
      setTimeStopped(true);

      if (suspectId === currentProblem?.correctAnswer) {
        // Correct answer
        setSelectedSuspect(suspectId);
        setShowAnswer(true);
        addScore(50);
        setGameComplete(true);
        setShowResetWarning(false);
      } else {
        // Wrong answer
        const currentLevelValue = currentProblem?.level || 1;

        // Check if we should reset immediately (level 2+ and score < 50)
        if (currentLevelValue > 1 && score < 50) {
          resetToLevel1();
          return;
        }

        // Otherwise, deduct points normally
        subtractScore(50);
        setSelectedSuspect(suspectId);
        setShowAnswer(true);
        setGameComplete(false);

        // Show reset warning if next wrong answer will cause reset
        setShowResetWarning(currentLevelValue > 1 && score - 50 < 50);
      }

      // Scroll to result
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 150);
    },
    [currentProblem, score, addScore, subtractScore, resetToLevel1]
  );

  const handleResetToLevel1 = useCallback(() => {
    resetToLevel1();
  }, [resetToLevel1]);

  const handleRestart = useCallback(() => {
    const currentLevelValue = currentProblem?.level || 1;
    if (currentLevelValue > 1 && score < 0) {
      handleResetToLevel1();
      return;
    }
    setSelectedSuspect(null);
    setShowAnswer(false);
    setTimeStopped(false);
    setHintsUsed(0);
    setRevealedClues(new Set());
    setNotes({});
    setShowNotes(false);
    setGameComplete(false);
    setShowResetWarning(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentProblem, score, handleResetToLevel1]);

  const handleNextLevel = useCallback(() => {
    const nextLevel = getNextMysteryLevel(currentProblem?.level || 1);
    if (nextLevel) {
      setCurrentLevel(nextLevel);
      // The currentProblem will update automatically via the useMemo when currentLevel changes
      setSelectedSuspect(null);
      setShowAnswer(false);
      setTimeStopped(false);
      setHintsUsed(0);
      setRevealedClues(new Set());
      setNotes({});
      setShowNotes(false);
      setGameComplete(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentProblem, setCurrentLevel]);

  const handleHint = useCallback(() => {
    const unrevealedClue = currentProblem?.clues.find((clue) => !revealedClues.has(clue.id));
    if (!unrevealedClue) return;

    if (score < 20) {
      alert(`Not enough points! You need 20 points to reveal this clue.`);
      return;
    }

    subtractScore(20);
    setHintsUsed((prev) => prev + 1);
    setRevealedClues((prev) => new Set([...prev, unrevealedClue.id]));
  }, [currentProblem, revealedClues, score, subtractScore]);

  const handleRevealClue = useCallback(
    (clueId: string) => {
      if (revealedClues.has(clueId)) return;

      if (score < 20) {
        alert(`Not enough points! You need 20 points to reveal this clue.`);
        return;
      }

      subtractScore(20);
      setHintsUsed((prev) => prev + 1);
      setRevealedClues((prev) => new Set([...prev, clueId]));
    },
    [revealedClues, score, subtractScore]
  );

  const handleNotesChange = useCallback((suspectId: string, content: string) => {
    setNotes((prev) => ({ ...prev, [suspectId]: content }));
  }, []);

  if (!currentProblem) return null;

  const canUseHint = !timeStopped && hintsUsed < currentProblem.hintCount && score >= 20;

  return (
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

      {/* Notes Modal */}
      <NotesModal
        isOpen={showNotes}
        onClose={() => setShowNotes(false)}
        suspects={currentProblem.suspects}
        notes={notes}
        onNotesChange={handleNotesChange}
        disabled={showAnswer}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mt-8 px-4"
      >
        {/* Problem Header */}
        <ProblemHeader
          title={currentProblem.title}
          description={currentProblem.description}
          difficulty={currentProblem.difficulty}
          points={currentProblem.points}
          timeLimit={currentProblem.timeLimit}
          hintCount={currentProblem.hintCount}
        />

        {/* Scenario Card */}
        <ScenarioCard scenario={currentProblem.scenario} />

        {/* Timeline */}
        <Timeline
          entries={currentProblem.timeline}
          suspects={currentProblem.suspects}
        />

        {/* Time Bar */}
        <TimeBar
          timeRemaining={timeRemaining}
          totalTime={currentProblem.timeLimit}
        />

        {/* Suspects */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            👥 {t('suspects')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentProblem.suspects.map((suspect, index) => (
              <motion.div
                key={suspect.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SuspectCard
                  suspect={suspect}
                  isSelected={selectedSuspect === suspect.id}
                  isDisabled={showAnswer}
                  onSelect={handleAnswer}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex justify-center gap-3">
          <ActionButton
            onClick={handleHint}
            disabled={!canUseHint}
            variant={!canUseHint ? 'secondary' : 'primary'}
          >
            {t('getHint')}
          </ActionButton>
          <ActionButton
            onClick={() => setShowNotes(!showNotes)}
            variant={showNotes ? 'primary' : 'secondary'}
          >
            {showNotes ? t('hideNotes') : t('showNotes')}
          </ActionButton>
        </div>

        {/* Clues Card */}
        <CluesCard
          clues={currentProblem.clues}
          revealedClueIds={Array.from(revealedClues)}
          onRevealClue={handleRevealClue}
          disabled={showAnswer}
        />

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
                {gameComplete ? t('caseSolved') : t('gameOver')}
              </h3>

              {gameComplete ? (
                <>
                  <h4 className="font-semibold text-lg text-indigo-600 dark:text-indigo-400 mb-2">
                    {t('explanation')}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                    {currentProblem.explanation}
                  </p>
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center mb-4">
                    <p className="text-green-700 dark:text-green-400 font-bold text-lg">
                      {t('pointsEarned')}
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    {getNextMysteryLevel(currentProblem?.level || 1) ? (
                      <ActionButton onClick={handleNextLevel} variant="success">
                        {t('nextLevel')}
                      </ActionButton>
                    ) : (
                      <ActionButton onClick={handleRestart}>
                        {t('tryAgain')}
                      </ActionButton>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center mb-4">
                    <p className="text-red-700 dark:text-red-400 font-bold text-lg">
                      {t('wrongSuspect')}
                    </p>
                    {currentProblem?.level > 1 && (
                      <p className="text-red-600 dark:text-red-500 font-bold mt-1">
                        {t('pointsPenalty')}
                      </p>
                    )}
                  </div>
                  {/* Reset Warning */}
                  {showResetWarning && (
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center mb-4 border-2 border-orange-400">
                      <p className="text-orange-700 dark:text-orange-400 font-bold text-lg">
                        {t('resetWarning')}
                      </p>
                      <p className="text-orange-600 dark:text-orange-500 font-semibold mt-1">
                        {t('resetWarningDesc')}
                      </p>
                    </div>
                  )}
                  <div className="mt-4 text-center">
                    <ActionButton onClick={handleRestart} variant="primary">
                      {t('tryAgain')}
                    </ActionButton>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
