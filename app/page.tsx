'use client';

import { NextIntlClientProvider } from 'next-intl';
import enMessages from '@/messages/en.json';

export default function Home() {
  return (
    <NextIntlClientProvider messages={enMessages} locale="en">
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <header className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">{enMessages.nav.title}</h1>
            <p className="text-xl text-purple-200">{enMessages.nav.subtitle}</p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a href="/mystery" className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
              <h2 className="text-2xl font-bold text-white mb-2">🔍 {enMessages.games.mystery.title}</h2>
              <p className="text-purple-200">{enMessages.games.mystery.description}</p>
            </a>

            <a href="/search" className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
              <h2 className="text-2xl font-bold text-white mb-2">🔎 {enMessages.games.search.title}</h2>
              <p className="text-purple-200">{enMessages.games.search.description}</p>
            </a>

            <a href="/escape" className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
              <h2 className="text-2xl font-bold text-white mb-2">🚪 {enMessages.games.escape.title}</h2>
              <p className="text-purple-200">{enMessages.games.escape.description}</p>
            </a>

            <a href="/picture" className="p-8 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
              <h2 className="text-2xl font-bold text-white mb-2">🖼️ {enMessages.games.picture.title}</h2>
              <p className="text-purple-200">{enMessages.games.picture.description}</p>
            </a>
          </div>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
