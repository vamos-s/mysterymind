'use client';

import { useEffect } from 'react';
import ThemeProvider from '@/components/ThemeProvider';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
