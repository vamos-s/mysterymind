'use client';

import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { motion } from 'framer-motion';

export default function SettingsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3"
    >
      <LanguageSelector />
      <ThemeToggle />
    </motion.div>
  );
}
