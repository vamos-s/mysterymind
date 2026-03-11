'use client';

import { NextIntlClientProvider, useTranslations } from 'next-intl';
import enMessages from '@/messages/en.json';

function GameCard({ href, icon, title, description }: { href: string; icon: string; title: string; description: string }) {
  return (
    <a href={href} className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
      <h2 className="text-2xl font-bold text-white mb-2">
        {icon} {title}
      </h2>
      <p className="text-purple-200">{description}</p>
    </a>
  );
}

export default function Home() {
  return (
    <NextIntlClientProvider messages={enMessages} locale="en">
      <HomeContent />
    </NextIntlClientProvider>
  );
}

function HomeContent() {
  const t = useTranslations();

  const games = [
    { href: '/mystery', icon: '🔍', title: t('games.mystery.title'), description: t('games.mystery.description') },
    { href: '/search', icon: '🔎', title: t('games.search.title'), description: t('games.search.description') },
    { href: '/escape', icon: '🚪', title: t('games.escape.title'), description: t('games.escape.description') },
    { href: '/picture', icon: '🖼️', title: t('games.picture.title'), description: t('games.picture.description') }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">{t('nav.title')}</h1>
          <p className="text-xl text-purple-200">{t('nav.subtitle')}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game) => (
            <GameCard key={game.href} {...game} />
          ))}
        </div>
      </div>
    </div>
  );
}

