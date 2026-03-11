'use client';

import { useGameStore } from '@/lib/store';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface GameFooterProps {
  onRestart?: () => void;
  onNextLevel?: () => void;
  showHint?: boolean;
  showRestart?: boolean;
  showNextLevel?: boolean;
}

export default function GameFooter({
  onRestart,
  onNextLevel,
  showHint = true,
  showRestart = true,
  showNextLevel = true
}: GameFooterProps) {
  const router = useRouter();
  const t = useTranslations();
  const { hintsUsed, useHint } = useGameStore();

  const handleBack = () => {
    router.push('/');
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 p-4 z-50"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          ← {t('common.back')}
        </motion.button>

        {showHint && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={useHint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
          >
            💡 {t('common.hint')} ({hintsUsed})
          </motion.button>
        )}

        <div className="flex items-center gap-3">
          {showRestart && onRestart && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition-colors"
            >
              🔄 {t('common.restart')}
            </motion.button>
          )}
          {showNextLevel && onNextLevel && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNextLevel}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
            >
              ➡️ {t('common.nextLevel')}
            </motion.button>
          )}
        </div>
      </div>
    </motion.footer>
  );
}
