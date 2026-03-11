'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: '中文', flag: '🇨🇳' }
];

export default function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    // Remove current locale from pathname
    const segments = pathname.split('/');
    const newPath = segments.slice(2).join('/');
    router.push(`/${newLocale}/${newPath}`);
  };

  return (
    <motion.select
      whileHover={{ scale: 1.02 }}
      whileFocus={{ scale: 1.02 }}
      value={locale}
      onChange={(e) => handleChange(e.target.value)}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name}
        </option>
      ))}
    </motion.select>
  );
}
