'use client';

import { motion } from 'framer-motion';
import { GameCategory } from '@/lib/store';
import { useTranslations } from 'next-intl';

interface CategoryCardProps {
  category: GameCategory;
  icon: string;
  onClick: () => void;
}

const categoryConfig: Record<GameCategory, string> = {
  mystery: 'bg-gradient-to-br from-purple-500 to-indigo-600',
  search: 'bg-gradient-to-br from-blue-500 to-cyan-600',
  escape: 'bg-gradient-to-br from-orange-500 to-red-600',
  picture: 'bg-gradient-to-br from-green-500 to-teal-600'
};

export default function CategoryCard({ category, icon, onClick }: CategoryCardProps) {
  const t = useTranslations();

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all bg-white dark:bg-gray-800"
    >
      <div className={`w-16 h-16 rounded-xl ${categoryConfig[category]} flex items-center justify-center text-3xl mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {t(`games.${category}.title`)}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {t(`games.${category}.description`)}
      </p>
    </motion.div>
  );
}
