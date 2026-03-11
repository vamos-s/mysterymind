export interface EscapeProblem {
  id: string;
  level: number;
  title: string;
  description: string;
  room: {
    image: string;
    clickableAreas: Array<{
      id: string;
      position: { x: number; y: number };
      type: 'puzzle' | 'object' | 'door';
      name: string;
    }>;
  };
  inventory: Array<string>;
  puzzles: Array<{
    id: string;
    description: string;
    solution: string;
    clue?: string;
    requiredItem?: string;
  }>;
  timeLimit: number;
  hintCount: number;
}

export const escapeProblems: EscapeProblem[] = [
  {
    id: 'escape-001',
    level: 1,
    title: 'Locked Room',
    description: 'You\'re locked in a room. Find the key and escape!',
    room: {
      image: '/images/escape/locked-room.png',
      clickableAreas: [
        { id: 'area-1', position: { x: 100, y: 200 }, type: 'object', name: 'Desk' },
        { id: 'area-2', position: { x: 400, y: 300 }, type: 'object', name: 'Bookshelf' },
        { id: 'area-3', position: { x: 550, y: 150 }, type: 'door', name: 'Door' },
        { id: 'area-4', position: { x: 250, y: 400 }, type: 'puzzle', name: 'Safe' }
      ]
    },
    inventory: [],
    puzzles: [
      {
        id: 'puzzle-1',
        description: 'The safe has a 4-digit lock. There\'s a note on the desk.',
        solution: '1984',
        clue: 'The note shows the year of the first Mac computer.',
        requiredItem: 'note'
      }
    ],
    timeLimit: 300,
    hintCount: 3
  },
  {
    id: 'escape-002',
    level: 2,
    title: 'Laboratory',
    description: 'Escape from the mysterious laboratory!',
    room: {
      image: '/images/escape/laboratory.png',
      clickableAreas: [
        { id: 'area-1', position: { x: 150, y: 180 }, type: 'object', name: 'Computer' },
        { id: 'area-2', position: { x: 450, y: 350 }, type: 'puzzle', name: 'Cabinet' },
        { id: 'area-3', position: { x: 300, y: 120 }, type: 'object', name: 'Equipment' },
        { id: 'area-4', position: { x: 520, y: 280 }, type: 'door', name: 'Exit' }
      ]
    },
    inventory: [],
    puzzles: [
      {
        id: 'puzzle-1',
        description: 'The computer is locked. Enter the password.',
        solution: 'ELEMENT',
        clue: 'Think about what you might find in a chemistry lab.',
        requiredItem: 'password-hint'
      },
      {
        id: 'puzzle-2',
        description: 'The cabinet needs a key.',
        solution: 'KEY',
        clue: 'Check under the equipment.',
        requiredItem: 'key'
      }
    ],
    timeLimit: 360,
    hintCount: 2
  }
];
