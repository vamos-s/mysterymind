'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Suspect } from '@/lib/games/mystery.types';

interface SuspectCardProps {
  suspect: Suspect;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (suspectId: string) => void;
}

export default function SuspectCard({ suspect, isSelected, isDisabled, onSelect }: SuspectCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleCardClick = useCallback(() => {
    if (!isDisabled) {
      onSelect(suspect.id);
    }
  }, [isDisabled, suspect.id, onSelect]);

  const handleExpandClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDisabled) {
      setExpanded(!expanded);
    }
  }, [isDisabled, expanded]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onClick={handleCardClick}
      className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700'
      } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          {suspect.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 truncate">
              {suspect.name}
            </h4>
            {isSelected && (
              <span className="text-indigo-600 dark:text-indigo-400">✓</span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {suspect.occupation || ''} {suspect.age && `(${suspect.age})`}
          </p>
        </div>
        <motion.button
          layout
          onClick={handleExpandClick}
          disabled={isDisabled}
          className={`p-2 rounded-lg transition-colors ${
            expanded
              ? 'bg-indigo-100 text-indigo-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-label={expanded ? 'Collapse' : 'Expand'}
        >
          <motion.svg
            animate={{ rotate: expanded ? 180 : 0 }}
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3"
        >
          <div>
            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              📝 Statement
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{suspect.statement}</p>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              🔒 Alibi
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{suspect.alibi}</p>
          </div>
          {suspect.alibiVerified && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
              <span>✓</span>
              <span>Alibi Verified</span>
            </div>
          )}
          {suspect.alibiContradicted && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm font-medium">
              <span>⚠️</span>
              <span>Alibi Contradicted</span>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
