'use client';

import { useTranslations } from 'next-intl';
import { useGameStore } from '@/lib/store';
import { motion } from 'framer-motion';

interface GameHeaderProps {
  title: string;
  level?: number;
  showScore?: boolean;
  showTime?: boolean;
  timeRemaining?: number;
}

export default function GameHeader({
  title,
  level,
  showScore = true,
  showTime = true,
  timeRemaining
}: GameHeaderProps) {
  const t = useTranslations();
  const { score } = useGameStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h1>
          {level !== undefined && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('common.level')} {level}
            </p>
          )}
        </div>

        <div className="flex items-center gap-6">
          {showScore && (
            <div className="text-right">
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('common.points')}</p>
              <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                {score}
              </p>
            </div>
          )}
          {showTime && timeRemaining !== undefined && (
            <div className="text-right">
              <p className="text-xs text-gray-600 dark:text-gray-400">{t('common.time')}</p>
              <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                {formatTime(timeRemaining)}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
