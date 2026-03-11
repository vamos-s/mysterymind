# MysteryMind Development Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git

### Installation

```bash
# Clone repository
git clone <repository-url>
cd mysterymind

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
mysterymind/
├── app/
│   ├── [lang]/
│   │   ├── page.tsx              # Main page (category selection)
│   │   ├── mystery/
│   │   │   └── page.tsx          # Mystery game page
│   │   ├── search/
│   │   │   └── page.tsx          # Search game page
│   │   ├── escape/
│   │   │   └── page.tsx          # Escape game page
│   │   └── picture/
│   │       └── page.tsx          # Picture game page
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── CategoryCard.tsx          # Category selection card
│   ├── GameHeader.tsx            # Game header with score/time
│   ├── GameFooter.tsx            # Game footer with hints/controls
│   ├── SettingsPanel.tsx         # Theme/language settings
│   ├── ThemeToggle.tsx           # Dark mode toggle
│   └── LanguageSelector.tsx      # Language selector
├── lib/
│   ├── i18n.ts                   # i18next configuration
│   ├── store.ts                  # Zustand store
│   └── games/
│       ├── mystery.ts            # Mystery game data
│       ├── search.ts             # Search game data
│       ├── escape.ts             # Escape game data
│       └── picture.ts            # Picture game data
├── public/
│   └── images/                   # Game images
├── docs/
│   ├── PLAN.md                   # Project plan
│   └── DEVELOPMENT.md            # This file
└── package.json
```

---

## 🛠️ Development Setup

### 1. Install Required Packages

```bash
# Core dependencies
npm install framer-motion zustand i18next react-i18next

# TypeScript types (if not already installed)
npm install --save-dev @types/node
```

### 2. Set up i18next

Create `lib/i18n.ts`:

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // English translations
    }
  },
  ko: {
    translation: {
      // Korean translations
    }
  },
  ja: {
    translation: {
      // Japanese translations
    }
  },
  zh: {
    translation: {
      // Chinese translations
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
```

### 3. Set up Zustand Store

Create `lib/store.ts`:

```typescript
import { create } from 'zustand';

interface GameState {
  currentCategory: string;
  currentLevel: number;
  score: number;
  hintsUsed: number;
  timeRemaining: number;
  setCurrentCategory: (category: string) => void;
  setCurrentLevel: (level: number) => void;
  addScore: (points: number) => void;
  useHint: () => void;
  setTimeRemaining: (time: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  currentCategory: '',
  currentLevel: 1,
  score: 0,
  hintsUsed: 0,
  timeRemaining: 300, // 5 minutes default
  setCurrentCategory: (category) => set({ currentCategory: category }),
  setCurrentLevel: (level) => set({ currentLevel: level }),
  addScore: (points) => set((state) => ({ score: state.score + points })),
  useHint: () => set((state) => ({ hintsUsed: state.hintsUsed + 1 })),
  setTimeRemaining: (time) => set({ timeRemaining: time }),
  resetGame: () => set({
    currentCategory: '',
    currentLevel: 1,
    score: 0,
    hintsUsed: 0,
    timeRemaining: 300
  })
}));
```

### 4. Create Language Selector Component

Create `components/LanguageSelector.tsx`:

```typescript
'use client';

import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ko', name: '한국어' },
    { code: 'ja', name: '日本語' },
    { code: 'zh', name: '中文' }
  ];

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
}
```

### 5. Create Theme Toggle Component

Create `components/ThemeToggle.tsx`:

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

---

## 🎮 Game Development Guide

### Mystery Game Enhancements (2026-03-10)

The Mystery Game has been significantly enhanced with four new systems to improve gameplay and logical reasoning:

#### 1. Timeline System
- **Purpose**: Visualize each suspect's location and activity over time
- **Data Structure**:
  ```typescript
  timeline: Array<{
    time: string; // HH:MM format
    crimeTime?: boolean;
    suspectLocations: Array<{
      suspectId: string;
      location: string;
      activity: string;
      verified?: boolean;
    }>;
  }>
  ```
- **Features**:
  - Table format showing all suspects at each time point
  - Crime time highlighted in red (🔴)
  - Verified alibis marked with checkmark (✓)
  - Scrollable responsive design
- **Benefits**: Players can track suspect movements and identify opportunities for the crime

#### 2. Alibi Verification System
- **Purpose**: Show alibi status for each suspect
- **Data Structure**:
  ```typescript
  suspects: Array<{
    // ... other fields
    alibiVerified?: boolean;
    alibiContradicted?: boolean;
  }>
  ```
- **Features**:
  - Green badge (✓ Alibi Verified) for confirmed alibis
  - Yellow badge (⚠️ Alibi Contradicted) for contradictory alibis
  - Visual indicators on suspect cards
- **Benefits**: Players can quickly identify which alibis are trustworthy or suspect

#### 3. Evidence Collection System
- **Purpose**: Allow players to collect evidence using points
- **Data Structure**:
  ```typescript
  evidence: Array<{
    id: string;
    name: string;
    icon: string;
    description: string;
    cost: number;
    location: string;
    collected?: boolean;
  }>
  ```
- **Features**:
  - Grid layout of evidence cards
  - Click to collect (costs points)
  - Hidden description revealed after collection
  - Green highlight for collected items
  - Disabled when insufficient points
- **Benefits**: Strategic resource management, players choose which evidence to collect

#### 4. Notes/Memo System
- **Purpose**: Allow players to take notes on each suspect
- **Features**:
  - Toggle button to show/hide notes panel
  - Individual text area for each suspect
  - Editable until answer is revealed
  - Animated expand/collapse
- **Benefits**: Players can organize clues and track their deductions

#### Implementation Details
- **Files Modified**:
  - `lib/games/mystery.ts`: Added data structures for all 4 systems
  - `app/mystery/page.tsx`: Added UI components and state management
- **State Added**:
  ```typescript
  const [collectedEvidence, setCollectedEvidence] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showNotes, setShowNotes] = useState(false);
  ```
- **All Levels (1-50)**: Include timeline and alibi verification data
- **Evidence Data**: Added to all 50 levels (4 items each level)

### Game Data Structure

Each game type follows a consistent structure:

```typescript
interface GameProblem {
  id: string;
  level: number;
  title: string;
  description: string;
  // Type-specific fields
}

// Mystery game specific
interface MysteryProblem extends GameProblem {
  difficulty: 'easy' | 'medium' | 'hard';
  scenario: string;
  suspects: Array<{
    id: string;
    name: string;
    age?: string;
    occupation?: string;
    statement: string;
    alibi: string;
    alibiVerified?: boolean; // 알리바이 검증 완료 여부
    alibiContradicted?: boolean; // 알리바이 모순 발견 여부
  }>;
  clues: Array<{
    id: string;
    description: string;
    type: 'time' | 'location' | 'evidence' | 'witness' | 'alibi';
    relatedSuspect?: string; // 단서와 연관된 용의자 ID
  }>;
  evidence: Array<{
    id: string;
    name: string;
    icon: string;
    description: string;
    cost: number; // 수집에 필요한 포인트
    location: string; // 증거 발견 장소
    collected?: boolean; // 수집 여부
  }>;
  timeline: Array<{
    time: string; // HH:MM format
    crimeTime?: boolean;
    suspectLocations: Array<{
      suspectId: string;
      location: string;
      activity: string;
      verified?: boolean; // 알리바이 검증 여부
    }>;
  }>;
  correctAnswer: string;
  explanation: string;
  timeLimit: number;
  hintCount: number;
  points: number;
}

// Search game specific
interface SearchProblem extends GameProblem {
  image: string;
  objects: Array<{ id: string; name: string; position: { x: number; y: number } }>;
  timeLimit: number;
}

// Escape game specific
interface EscapeProblem extends GameProblem {
  room: {
    image: string;
    clickableAreas: Array<{ id: string; position: { x: number; y: number }; type: string }>;
  };
  inventory: Array<string>;
  puzzles: Array<{ id: string; solution: string; clue?: string }>;
}

// Picture game specific
interface PictureProblem extends GameProblem {
  images: [string, string]; // Left and right images
  differences: Array<{ id: string; position: { x: number; y: number } }>;
  timeLimit: number;
}
```

### Creating New Games

#### Step 1: Define Game Data

Create `lib/games/mystery.ts`:

```typescript
import { MysteryProblem } from '@/types/game';

export const mysteryProblems: MysteryProblem[] = [
  {
    id: 'mystery-001',
    level: 1,
    title: 'Stolen Cake',
    description: 'Who stole the cake from the office?',
    scenario: 'On Friday afternoon, a cake disappeared from the break room. Four people were in the office.',
    suspects: [
      { id: 'suspect-1', name: 'Kim', statement: 'I was at lunch.' },
      { id: 'suspect-2', name: 'Lee', statement: 'I was in a meeting.' },
      { id: 'suspect-3', name: 'Park', statement: 'I was organizing files.' },
      { id: 'suspect-4', name: 'Choi', statement: 'I was fixing the printer.' }
    ],
    clues: [
      { id: 'clue-1', description: 'The cake was eaten at 2:30 PM.' },
      { id: 'clue-2', description: 'Kim has cream on their face.' },
      { id: 'clue-3', description: 'The meeting ended at 2:00 PM.' }
    ],
    correctAnswer: 'suspect-1',
    explanation: 'Kim was at lunch but has cream on their face, suggesting they ate the cake.'
  }
];
```

#### Step 2: Create Game Page Component

Create `app/[lang]/mystery/page.tsx`:

```typescript
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useGameStore } from '@/lib/store';
import { mysteryProblems } from '@/lib/games/mystery';
import GameHeader from '@/components/GameHeader';
import GameFooter from '@/components/GameFooter';

export default function MysteryGame() {
  const { t } = useTranslation();
  const { currentLevel, addScore, useHint } = useGameStore();
  const [selectedSuspect, setSelectedSuspect] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const problem = mysteryProblems[0]; // For demo, use first problem

  const handleAnswer = (suspectId: string) => {
    setSelectedSuspect(suspectId);
    if (suspectId === problem.correctAnswer) {
      addScore(100);
    }
    setShowAnswer(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4">
      <GameHeader title={t('games.mystery.title')} level={currentLevel} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto mt-8"
      >
        {/* Game content */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {problem.title}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          {problem.scenario}
        </p>

        {/* Suspects */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {problem.suspects.map((suspect) => (
            <motion.button
              key={suspect.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(suspect.id)}
              disabled={showAnswer}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedSuspect === suspect.id
                  ? suspect.id === problem.correctAnswer
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                    : 'border-red-500 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-500'
              }`}
            >
              <h3 className="font-bold text-gray-900 dark:text-gray-100">
                {suspect.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {suspect.statement}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Answer explanation */}
        {showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-gray-100">
              {selectedSuspect === problem.correctAnswer ? '✅ Correct!' : '❌ Wrong!'}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {problem.explanation}
            </p>
          </motion.div>
        )}
      </motion.div>

      <GameFooter />
    </div>
  );
}
```

#### Step 3: Add Translations

Update `lib/i18n.ts`:

```typescript
const resources = {
  en: {
    translation: {
      games: {
        mystery: {
          title: 'Mystery',
          description: 'Deduce who did it!'
        },
        search: {
          title: 'Search',
          description: 'Find hidden objects!'
        },
        escape: {
          title: 'Escape',
          description: 'Solve puzzles to escape!'
        },
        picture: {
          title: 'Picture',
          description: 'Find the differences!'
        }
      }
    }
  },
  ko: {
    translation: {
      games: {
        mystery: {
          title: '미스터리',
          description: '누가 그랬을까요?'
        },
        search: {
          title: '탐색',
          description: '숨겨진 물건을 찾으세요!'
        },
        escape: {
          title: '탈출',
          description: '퍼즐을 풀고 탈출하세요!'
        },
        picture: {
          title: '그림',
          description: '다른 그림을 찾으세요!'
        }
      }
    }
  }
};
```

---

## 🎨 UI Components

### Category Card

```typescript
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: string;
  onClick: () => void;
}

export default function CategoryCard({ title, description, icon, onClick }: CategoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </motion.div>
  );
}
```

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Manual Testing Checklist

- [ ] All 4 game types load correctly
- [ ] Scoring system works
- [ ] Hint system functions
- [ ] Timer counts down correctly
- [ ] Language switching works
- [ ] Dark mode toggle works
- [ ] Mobile responsive design
- [ ] Back navigation works
- [ ] Game state persists correctly

---

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Environment Variables

Set up environment variables in Vercel:

```env
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
SUPABASE_URL=your_supabase_url  # Phase 3+
SUPABASE_ANON_KEY=your_supabase_key  # Phase 3+
```

---

## 📊 Development Workflow

### Feature Development

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Test locally
4. Commit changes: `git commit -m "feat: add your feature"`
5. Push branch: `git push origin feature/your-feature`
6. Create pull request
7. Review and merge

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(mystery): add new mystery problem
fix(timer): resolve timer not stopping issue
docs(development): update deployment guide
```

---

## 🔧 Troubleshooting

### Common Issues

**Issue: i18n not loading translations**
```typescript
// Make sure you're using useTranslation hook in client components
'use client';
import { useTranslation } from 'react-i18next';
```

**Issue: Zustand state not updating**
```typescript
// Make sure you're using the store correctly
const { score, addScore } = useGameStore();
addScore(100); // This will update state
```

**Issue: Framer Motion animations not working**
```typescript
// Make sure you're using motion components
import { motion } from 'framer-motion';

// Use motion.div instead of div
<motion.div animate={{ opacity: 1 }} />
```

**Issue: Dark mode not persisting**
```typescript
// Check localStorage is being set
localStorage.setItem('theme', newTheme);
document.documentElement.classList.toggle('dark', newTheme === 'dark');
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [i18next Documentation](https://www.i18next.com/)

---

*Last updated: 2026-03-10*
