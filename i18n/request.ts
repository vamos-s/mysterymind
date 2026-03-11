import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'ko', 'ja', 'zh'] as const;
type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    locale: locale as string,
    timeZone: 'Asia/Seoul',
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
