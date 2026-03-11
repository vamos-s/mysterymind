'use client';

import { useEffect } from 'react';
import { useGameStore } from '@/lib/store';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useGameStore();

  useEffect(() => {
    // Apply theme to document
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [theme]);

  return <>{children}</>;
}
