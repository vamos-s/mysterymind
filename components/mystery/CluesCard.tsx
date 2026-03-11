'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface Clue {
  id: string;
  type: 'time' | 'location' | 'evidence' | 'witness' | 'alibi';
  description: string;
}

const ICONS: Record<string, string> = {
  time: '⏰',
  location: '📍',
  evidence: '🔍',
  witness: '👤',
  alibi: '🔒'
};

const TYPE_COLORS: Record<string, string> = {
  time: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  location: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  evidence: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  witness: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  alibi: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
};

interface CluesCardProps {
  clues: Clue[];
  revealedClueIds: string[];
  onRevealClue: (clueId: string) => void;
  disabled?: boolean;
}

export default function CluesCard({
  clues,
  revealedClueIds,
  onRevealClue,
  disabled = false
}: CluesCardProps) {
  const t = useTranslations('mystery');
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    if (!disabled) {
      setExpanded(!expanded);
    }
  }, [disabled, expanded]);

  const handleRevealClick = useCallback(
    (e: React.MouseEvent, clueId: string) => {
      e.stopPropagation();
      if (!disabled && !revealedClueIds.includes(clueId)) {
        onRevealClue(clueId);
      }
    },
    [disabled, revealedClueIds, onRevealClue]
  );

  return (
    <div className="mb-6">
      <button
        onClick={handleExpandClick}
        disabled={disabled}
        className={`w-full p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${
          expanded
            ? 'bg-white dark:bg-gray-800 border-indigo-500'
            : 'bg-white/10 dark:bg-gray-800/50 border-white/20 hover:border-white/30'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-label={expanded ? 'Hide clues' : 'Show clues'}
      >
        <div className="flex items-center gap-2 text-white font-semibold">
          <span>🔍</span>
          <span>{t('cluesTitle')}</span>
          <span className="text-white/60 text-sm">
            ({revealedClueIds.length}/{clues.length})
          </span>
        </div>
        <motion.svg
          animate={{ rotate: expanded ? 180 : 0 }}
          className="w-5 h-5 text-white/80"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
          >
            <div className="space-y-3">
              {clues.map((clue) => {
                const isRevealed = revealedClueIds.includes(clue.id);
                return (
                  <div
                    key={clue.id}
                    className={`p-4 rounded-lg border ${
                      isRevealed
                        ? 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600'
                        : 'bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{ICONS[clue.type]}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-semibold ${TYPE_COLORS[clue.type]}`}
                          >
                            {clue.type}
                          </span>
                          {isRevealed && (
                            <span className="text-green-600 dark:text-green-400 text-sm font-medium">
                              ✓ {t('revealed')}
                            </span>
                          )}
                        </div>
                        {isRevealed ? (
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {clue.description}
                          </p>
                        ) : (
                          <button
                            onClick={(e) => handleRevealClick(e, clue.id)}
                            disabled={disabled}
                            className={`text-sm text-indigo-600 dark:text-indigo-400 hover:underline ${
                              disabled ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {t('clickToReveal')}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
