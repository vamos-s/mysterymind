# MysteryMind Project Plan

## 🎯 Project Overview

| Item | Description |
|------|-------------|
| **Project Name** | MysteryMind |
| **Target Users** | Teenagers and general adults |
| **Project Type** | Web-based puzzle/deduction game |
| **Tech Stack** | Next.js, i18n, Tailwind CSS, Framer Motion, Zustand, Vercel |
| **Repository** | https://github.com/vamos-s/mysterymind.git |
| **Deployment** | Vercel |

---

## 🎮 Game Categories

### 1. 🔍 Mystery (미스터리)
- **Type**: Story-based deduction puzzles
- **Example**: "Who stole the cake?"
- **Structure**: Scenario + Suspects + Clues + Timeline + Evidence + Answer selection
- **Levels**: 50 levels (Lv1~Lv50)
  - Easy (Lv1~Lv8): Simple scenarios
  - Medium (Lv9~Lv26): More complex with additional clues
  - Hard (Lv27~Lv50): Challenging cases with multiple suspects and evidence
- **Features**:
  - Timeline System: Visualize suspect locations over time
  - Alibi Verification: Show verified/contradicted alibis
  - Evidence Collection: Collect evidence using points
  - Notes System: Take notes on each suspect

### 2. 👀 Search (탐색)
- **Type**: Hidden object search
- **Example**: Find 10 hidden objects in a room
- **Structure**: Image scene + Object list + Timer
- **Levels**: Lv1 (few objects, clear) to Lv50+ (complex, moving backgrounds)
- **Status**: ⚠️ Coming soon

### 3. 🔒 Escape (탈출)
- **Type**: Room escape puzzles
- **Example**: Find key → Unlock door → Escape
- **Structure**: Locked room + Puzzles + Inventory + Solution
- **Levels**: Lv1 (1-step) to Lv50+ (multi-room, complex puzzles)
- **Status**: ⚠️ Coming soon

### 4. 🖼️ Picture (그림)
- **Type**: Spot the difference / Riddle pictures
- **Example**: Find 10 differences between two images
- **Structure**: Two images + Difference counter + Timer
- **Levels**: Lv1 (obvious) to Lv50+ (subtle, pattern-based)
- **Status**: ⚠️ Coming soon

---

## 📊 Difficulty System

### Mystery Game Levels

| Level Range | Difficulty | Hints | Time Limit | Features |
|-------------|------------|-------|------------|----------|
| Lv1~Lv8 | Easy | 4 uses | 10 minutes | Simple scenarios |
| Lv9~Lv26 | Medium | 3 uses | 8 minutes | Additional clues |
| Lv27~Lv50 | Hard | 2 uses | 8 minutes | Complex cases |

### General Level System

| Level Range | Difficulty | Hints | Time Limit | Features |
|-------------|------------|-------|------------|----------|
| Lv1~Lv10 | Beginner | Unlimited | No limit | Basic puzzles |
| Lv11~Lv20 | Easy | 3 uses | 5 minutes | Time tracking enabled |
| Lv21~Lv30 | Medium | 2 uses | 3 minutes | Multiple clues |
| Lv31~Lv40 | Hard | 1 use | 2 minutes | Complex puzzles |
| Lv41~Lv50 | Expert | 0 uses | 1 minute | Advanced mechanics |
| Lv51+ | Master | 0 uses | No limit | Bonus scoring |

---

## 🚀 Development Phases

### Phase 1: MVP ✅ COMPLETED (Weeks 1-2)
**Goal**: Basic playable demos

- [x] Project setup (Next.js + Tailwind + i18n)
- [x] Main page + Navigation
- [x] Mystery game demo (10 levels)
- [x] Basic scoring system
- [x] Dark mode support
- [x] Mobile responsiveness
- [x] Multi-language support (en, ko, ja, zh)

**Deliverables**:
- ✅ Working web app at http://localhost:3003
- ✅ Mystery game playable
- ✅ Basic user experience

### Phase 2: Content Expansion ✅ COMPLETED (2026-03-11)
**Goal**: Expand content and features

- [x] 50 Mystery problems
- [x] Difficulty system (Lv1~Lv50)
- [x] Hint system
- [x] Time limits
- [x] Timeline System
- [x] Alibi Verification System
- [x] Evidence Collection System
- [x] Notes/Memo System

**Deliverables**:
- ✅ 50 Mystery levels completed
  - Easy (8 levels): Lv1~Lv8
  - Medium (18 levels): Lv9~Lv26
  - Hard (24 levels): Lv27~Lv50
- ✅ Complete difficulty system
- ✅ All enhanced features implemented

### Phase 3: Advanced Features (Weeks 5-6) - IN PROGRESS
**Goal**: Social and competitive features

- [ ] Expand Search, Escape, Picture games to Lv1~Lv50
- [ ] Leaderboard (Supabase backend)
- [ ] User authentication
- [ ] User profiles
- [ ] Daily challenges

**Deliverables**:
- [ ] Full competitive system
- [ ] User accounts
- [ ] Weekly challenge system

### Phase 4: Production (Weeks 7-8) - PENDING
**Goal**: Production-ready deployment

- [x] Multi-language support (Korean, English, Japanese, Chinese)
- [x] Mobile optimization
- [ ] Vercel production deployment
- [ ] Performance optimization
- [ ] User feedback collection

**Deliverables**:
- [ ] Production website deployed
- [x] Multi-language support
- [ ] Analytics integration
- [ ] Public launch

---

## 🎨 UI/UX Guidelines

### Design Philosophy

| Aspect | SilverMind | MysteryMind |
|--------|------------|-------------|
| Target | Seniors (60-70) | Teens/Adults |
| Design | Simple, large buttons, soft colors | Modern, dark mode emphasis, animations |
| Speed | Slow | Fast, challenging |
| Complexity | Low | Medium-High |

### Key Features
- Dark mode by default for teens/young adults
- Smooth animations using Framer Motion
- Responsive mobile-first design
- Clear visual feedback for interactions
- Progress bars and score displays
- Achievement animations

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
│   ├── i18n/                      # i18next configuration
│   │   ├── request.ts            # Server-side i18n config
│   │   └── config.ts             # i18next client config
│   ├── store.ts                   # Zustand store
│   └── games/
│       ├── mystery.ts            # Mystery game data (50 levels)
│       ├── search.ts             # Search game data
│       ├── escape.ts             # Escape game data
│       └── picture.ts            # Picture game data
├── messages/                      # Translation files
│   ├── en.json
│   ├── ko.json
│   ├── ja.json
│   └── zh.json
├── public/
│   └── images/                   # Game images
├── docs/
│   ├── PLAN.md                   # This file
│   └── DEVELOPMENT.md            # Development guide
└── package.json
```

---

## 🛠️ Technical Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16.1.6** | React framework with App Router + Turbopack |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Zustand** | State management |
| **next-intl** | Internationalization |
| **Vercel** | Deployment |
| **Supabase** (Phase 3) | Backend for leaderboard/user data |

---

## 📊 Success Metrics

### MVP Success ✅
- [x] Mystery game playable
- [x] Basic scoring system
- [x] Mobile-responsive UI
- [x] Dark mode support

### Phase 2 Success ✅
- [x] 50 Mystery levels completed
- [x] Difficulty system working
- [x] Hint system implemented
- [x] Time limits working
- [x] Timeline system implemented
- [x] Alibi verification system implemented
- [x] Evidence collection system implemented
- [x] Notes system implemented

### Phase 3 Success (In Progress)
- [ ] Leaderboard functional
- [ ] User authentication working
- [ ] Daily challenges live
- [ ] Expand other games to 50 levels

### Phase 4 Success (Pending)
- [x] Multi-language support
- [ ] Production deployment
- [ ] 100+ daily active users (target)

---

## 🎯 Next Steps

1. ✅ Project created
2. ✅ Planning document created
3. ✅ Development guide created
4. ✅ Set up i18n
5. ✅ Set up Zustand store
6. ✅ Create main page
7. ✅ Create Mystery game
8. ✅ Expand to 50 levels
9. ✅ Implement Timeline System
10. ✅ Implement Alibi Verification System
11. ✅ Implement Evidence Collection System
12. ✅ Implement Notes System
13. [ ] Create Search game
14. [ ] Create Escape game
15. [ ] Create Picture game
16. [ ] Test and iterate
17. [ ] Deploy to production

---

## 📝 Notes

### Mystery Game Level Breakdown (50 Levels)

#### Easy Levels (Lv1~Lv8)
- Simple scenarios with clear clues
- 4 suspects per level
- 5 clues per level
- 4 evidence items per level
- Time limit: 8-10 minutes
- Hint count: 4

#### Medium Levels (Lv9~Lv26)
- More complex scenarios
- 4 suspects per level
- 5 clues per level
- 4 evidence items per level
- Time limit: 8 minutes
- Hint count: 3

#### Hard Levels (Lv27~Lv50)
- Challenging cases
- 4 suspects per level
- 5 clues per level
- 4 evidence items per level
- Time limit: 8 minutes
- Hint count: 2

### Mystery Game Systems

#### 1. Timeline System
- Visualizes each suspect's location and activity over time
- Crime time highlighted in red (🔴)
- Verified alibis marked with checkmark (✓)

#### 2. Alibi Verification System
- Green badge (✓) for verified alibis
- Yellow badge (⚠️) for contradictory alibis

#### 3. Evidence Collection System
- 4 evidence items per level
- Collectible using points
- Descriptions revealed after collection
- Green highlight for collected items

#### 4. Notes/Memo System
- Individual text area for each suspect
- Toggle button to show/hide
- Editable until answer is revealed

### Content Creation Strategy

**Option A: AI-Generated Content** ✅ USED
- Use AI to generate puzzles
- Human review and editing
- Faster content production

**Option B: Manual Creation**
- Curated, high-quality puzzles
- Slower but higher control
- Better for consistency

**Option C: User-Generated Content**
- Users create and submit puzzles
- Community moderation
- Infinite content potential

*Decision: Phase 1-2 used AI-generated content with manual review. Phase 3+ may explore user-generated content.*

### Deployment Plan
1. Development: `localhost:3003`
2. Preview: Vercel Preview Deployments
3. Production: Vercel Production Deployment

### Git Workflow
- Main branch: Production
- Dev branch: Development
- Feature branches: Individual features

---

*Last updated: 2026-03-11*
