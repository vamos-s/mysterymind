'use client';

import { motion } from 'framer-motion';

interface TimeBarProps {
  timeRemaining: number;
  totalTime: number;
}

export default function TimeBar({ timeRemaining, totalTime }: TimeBarProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const timePercentage = (timeRemaining / totalTime) * 100;
  const timeColor = timePercentage > 50 ? 'bg-green-500' : timePercentage > 25 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="mb-6">
      <div className="flex justify-between text-white/80 text-sm mb-2">
        <span>Time Remaining</span>
        <span>{formatTime(timeRemaining)}</span>
      </div>
      <div className="h-3 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: `${timePercentage}%` }}
          className={`h-full ${timeColor} transition-colors`}
        />
      </div>
    </div>
  );
}
