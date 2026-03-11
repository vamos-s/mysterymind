# MysteryMind - Brain Training Games

A brain training game application built with Next.js, featuring multiple game types designed to improve cognitive skills.

## 🎮 Features

### Game Categories

1. **Mystery** - Deduce who committed the crime using clues and logical reasoning
2. **Search** - Find hidden objects within a time limit
3. **Escape** - Solve puzzles to escape from a locked room
4. **Picture** - Find differences between two similar images

### Mystery Game Enhancements (Updated 2026-03-10)

The Mystery game includes four advanced systems:

#### 1. Timeline System
- Visualize each suspect's location and activity over time
- Crime time highlighted in red (🔴)
- Verified alibis marked with checkmark (✓)
- Scrollable responsive table

#### 2. Alibi Verification System
- Visual badges showing alibi status
- Green badge (✓) for verified alibis
- Yellow badge (⚠️) for contradictory alibis
- Helps identify trustworthy suspects

#### 3. Evidence Collection System
- Collect evidence by spending points
- 4 evidence items per level (levels 1-2)
- Descriptions revealed after collection
- Strategic resource management

#### 4. Notes/Memo System
- Take notes on each suspect
- Toggle panel to show/hide
- Editable until answer is revealed
- Organize clues and track deductions

## 🌐 Multi-language Support

- English (en)
- Korean (ko)
- Japanese (ja)
- Chinese (zh)

## 🎨 UI Features

- Dark mode support
- Smooth animations with Framer Motion
- Responsive design for mobile and desktop
- Score and timer tracking
- Hint system

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6 with Turbopack
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Internationalization**: next-intl
- **State Management**: Zustand

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/vamos-s/mysterymind.git
cd mysterymind

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3003](http://localhost:3003) with your browser to see the result.

## 📁 Project Structure

```
mysterymind/
├── app/                      # Next.js app directory
│   ├── mystery/             # Mystery game page
│   ├── search/              # Search game page
│   ├── escape/              # Escape game page
│   └── picture/             # Picture game page
├── components/             # Reusable components
├── lib/                    # Utility functions and game data
│   ├── games/
│   │   ├── mystery.ts      # Mystery game problems
│   │   ├── search.ts       # Search game data
│   │   ├── escape.ts       # Escape game data
│   │   └── picture.ts      # Picture game data
│   ├── store.ts            # Zustand global state
│   └── i18n/              # Internationalization config
├── messages/               # Translation files
├── docs/                  # Documentation
│   ├── DEVELOPMENT.md      # Development guide
│   └── PLAN.md            # Project plan
└── public/                # Static assets
```

## 🎯 Game Levels

### Mystery Game (50 Levels)
- **Easy (Levels 1-8)**: Simple scenarios with fewer suspects
- **Medium (Levels 9-26)**: More complex with additional clues
- **Hard (Levels 27-50)**: Challenging cases with multiple suspects and evidence

Each level includes:
- Unique storyline
- 4 suspects
- Multiple clues
- Timeline showing suspect movements
- Alibi verification status
- Collectible evidence (4 items per level)
- Notes system

## 📖 Documentation

For detailed guides, see:
- [User Guide](./docs/USER_GUIDE.md) - Complete guide for players (🇰🇷/🇺🇸)
- [Development Guide](./docs/DEVELOPMENT.md) - Detailed setup and implementation
- [Project Plan](./docs/PLAN.md) - Roadmap and features

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

**Live Demo**: https://mysterymind.vercel.app

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📝 Changelog

### Version 3.0 (2026-03-11)
- ✅ Expanded to 50 Mystery levels
  - Easy (Lv1~Lv8): 8 levels
  - Medium (Lv9~Lv26): 18 levels
  - Hard (Lv27~Lv50): 24 levels
- ✅ All levels include complete Timeline System
- ✅ All levels include complete Alibi Verification System
- ✅ All levels include complete Evidence Collection System (4 items each)
- ✅ All levels include complete Notes System
- ✅ All required fields verified and validated
- ✅ Updated documentation (README.md, DEVELOPMENT.md, PLAN.md)

### Version 2.0 (2026-03-10)
- ✅ Timeline system for suspect tracking
- ✅ Alibi verification system with visual badges
- ✅ Evidence collection system with point-based gameplay
- ✅ Notes/memo system for player deductions
- ✅ Enhanced UI with smooth animations
- ✅ All 10 levels updated with new data structures

### Version 1.0 (Initial Release)
- Basic game framework
- 4 game categories
- Multi-language support
- Score and timer tracking

---

Built with ❤️ using Next.js
