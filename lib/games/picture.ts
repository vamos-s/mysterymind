export interface PictureProblem {
  id: string;
  level: number;
  title: string;
  description: string;
  images: [string, string]; // Left and right images
  differences: Array<{
    id: string;
    position: { x: number; y: number };
    radius: number;
  }>;
  totalDifferences: number;
  timeLimit: number;
  hintCount: number;
}

export const pictureProblems: PictureProblem[] = [
  {
    id: 'picture-001',
    level: 1,
    title: 'Garden Scene',
    description: 'Find 10 differences between the two garden images',
    images: ['/images/picture/garden-1.png', '/images/picture/garden-2.png'],
    differences: [
      { id: 'diff-1', position: { x: 80, y: 120 }, radius: 30 },
      { id: 'diff-2', position: { x: 180, y: 200 }, radius: 25 },
      { id: 'diff-3', position: { x: 280, y: 150 }, radius: 35 },
      { id: 'diff-4', position: { x: 350, y: 280 }, radius: 28 },
      { id: 'diff-5', position: { x: 450, y: 180 }, radius: 30 },
      { id: 'diff-6', position: { x: 120, y: 350 }, radius: 32 },
      { id: 'diff-7', position: { x: 220, y: 380 }, radius: 26 },
      { id: 'diff-8', position: { x: 400, y: 320 }, radius: 29 },
      { id: 'diff-9', position: { x: 300, y: 420 }, radius: 31 },
      { id: 'diff-10', position: { x: 500, y: 250 }, radius: 27 }
    ],
    totalDifferences: 10,
    timeLimit: 240,
    hintCount: 3
  },
  {
    id: 'picture-002',
    level: 2,
    title: 'City Street',
    description: 'Find 12 differences between the two city images',
    images: ['/images/picture/city-1.png', '/images/picture/city-2.png'],
    differences: [
      { id: 'diff-1', position: { x: 60, y: 100 }, radius: 28 },
      { id: 'diff-2', position: { x: 160, y: 180 }, radius: 32 },
      { id: 'diff-3', position: { x: 260, y: 130 }, radius: 30 },
      { id: 'diff-4', position: { x: 360, y: 260 }, radius: 26 },
      { id: 'diff-5', position: { x: 460, y: 160 }, radius: 34 },
      { id: 'diff-6', position: { x: 100, y: 330 }, radius: 29 },
      { id: 'diff-7', position: { x: 200, y: 360 }, radius: 31 },
      { id: 'diff-8', position: { x: 420, y: 300 }, radius: 27 },
      { id: 'diff-9', position: { x: 280, y: 400 }, radius: 33 },
      { id: 'diff-10', position: { x: 480, y: 230 }, radius: 28 },
      { id: 'diff-11', position: { x: 140, y: 410 }, radius: 30 },
      { id: 'diff-12', position: { x: 380, y: 380 }, radius: 32 }
    ],
    totalDifferences: 12,
    timeLimit: 300,
    hintCount: 2
  }
];
