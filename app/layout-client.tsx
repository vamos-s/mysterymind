'use client';

import ThemeProvider from '@/components/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';

export default function LayoutClient({ children, messages }: { children: React.ReactNode; messages: Record<string, unknown> }) {
  return (
    <NextIntlClientProvider messages={messages} locale="en" timeZone="Asia/Seoul">
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
