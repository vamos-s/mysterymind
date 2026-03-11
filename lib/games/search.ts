export interface SearchProblem {
  id: string;
  level: number;
  title: string;
  description: string;
  image: string;
  objects: Array<{
    id: string;
    name: string;
    position: { x: number; y: number };
  }>;
  timeLimit: number;
  hintCount: number;
}

export const searchProblems: SearchProblem[] = [
  {
    id: 'search-001',
    level: 1,
    title: 'Living Room',
    description: 'Find 10 hidden objects in the living room',
    image: '/images/search/living-room.png',
    objects: [
      { id: 'obj-1', name: 'Key', position: { x: 150, y: 200 } },
      { id: 'obj-2', name: 'Book', position: { x: 350, y: 180 } },
      { id: 'obj-3', name: 'Clock', position: { x: 500, y: 120 } },
      { id: 'obj-4', name: 'Plant', position: { x: 280, y: 350 } },
      { id: 'obj-5', name: 'Lamp', position: { x: 420, y: 280 } },
      { id: 'obj-6', name: 'Phone', position: { x: 180, y: 300 } },
      { id: 'obj-7', name: 'Remote', position: { x: 320, y: 400 } },
      { id: 'obj-8', name: 'Pen', position: { x: 520, y: 350 } },
      { id: 'obj-9', name: 'Cup', position: { x: 380, y: 150 } },
      { id: 'obj-10', name: 'Note', position: { x: 250, y: 220 } }
    ],
    timeLimit: 180,
    hintCount: 3
  },
  {
    id: 'search-002',
    level: 2,
    title: 'Kitchen',
    description: 'Find 12 hidden objects in the kitchen',
    image: '/images/search/kitchen.png',
    objects: [
      { id: 'obj-1', name: 'Spoon', position: { x: 120, y: 250 } },
      { id: 'obj-2', name: 'Fork', position: { x: 320, y: 280 } },
      { id: 'obj-3', name: 'Knife', position: { x: 480, y: 220 } },
      { id: 'obj-4', name: 'Plate', position: { x: 250, y: 350 } },
      { id: 'obj-5', name: 'Cup', position: { x: 380, y: 400 } },
      { id: 'obj-6', name: 'Bowl', position: { x: 200, y: 420 } },
      { id: 'obj-7', name: 'Pan', position: { x: 520, y: 380 } },
      { id: 'obj-8', name: 'Pot', position: { x: 150, y: 450 } },
      { id: 'obj-9', name: 'Oven', position: { x: 350, y: 180 } },
      { id: 'obj-10', name: 'Fridge', position: { x: 550, y: 150 } },
      { id: 'obj-11', name: 'Timer', position: { x: 280, y: 320 } },
      { id: 'obj-12', name: 'Knife', position: { x: 420, y: 450 } }
    ],
    timeLimit: 240,
    hintCount: 2
  }
];
