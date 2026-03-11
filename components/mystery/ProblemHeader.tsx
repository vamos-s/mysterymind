'use client';

interface ProblemHeaderProps {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  timeLimit: number;
  hintCount: number;
}

const DIFFICULTY_COLORS = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-red-500'
} as const;

const DIFFICULTY_LABELS = {
  easy: '⭐ Easy',
  medium: '⭐⭐ Medium',
  hard: '⭐⭐⭐ Hard'
} as const;

export default function ProblemHeader({
  title,
  description,
  difficulty,
  points,
  timeLimit,
  hintCount
}: ProblemHeaderProps) {
  return (
    <div className="mb-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg relative overflow-hidden">
      <div className="absolute top-0 right-0 px-4 py-2 rounded-bl-xl">
        <span className={`px-3 py-1 rounded-full text-sm font-bold text-white ${DIFFICULTY_COLORS[difficulty]}`}>
          {DIFFICULTY_LABELS[difficulty]}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-3xl">{title.split(' ')[0]}</span>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {title.split(' ').slice(1).join(' ')}
        </h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-3">{description}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
        <span>🎯 Points: {points}</span>
        <span>⏱️ Time: {Math.floor(timeLimit / 60)}m {timeLimit % 60}s</span>
        <span>💡 Hints: {hintCount}</span>
      </div>
    </div>
  );
}
