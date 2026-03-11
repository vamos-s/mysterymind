'use client';

import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import CategoryCard from '@/components/CategoryCard';
import SettingsPanel from '@/components/SettingsPanel';
import { GameCategory } from '@/lib/store';

export default function HomePage() {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split('/')[1];

  const categories: Array<{
    category: GameCategory;
    icon: string;
  }> = [
    { category: 'mystery', icon: '🔍' },
    { category: 'search', icon: '👀' },
    { category: 'escape', icon: '🔒' },
    { category: 'picture', icon: '🖼️' }
  ];

  const handleCategoryClick = (category: GameCategory) => {
    router.push(`/${locale}/${category}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      {/* Header */}
      <header className="bg-white/10 dark:bg-black/20 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {t('nav.title')}
            </h1>
            <p className="text-white/80 text-sm">
              {t('nav.subtitle')}
            </p>
          </div>
          <SettingsPanel />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {categories.map((item) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categories.indexOf(item) * 0.1 }}
            >
              <CategoryCard
                category={item.category}
                icon={item.icon}
                onClick={() => handleCategoryClick(item.category)}
              />
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-black/20 border-t border-white/10 p-4 text-center text-white/60 text-sm">
        <p>MysteryMind © 2026 - Train your brain with puzzles!</p>
      </footer>
    </div>
  );
}
