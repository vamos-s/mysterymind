'use client';

import { motion } from 'framer-motion';
import type { TimelineEntry, Suspect } from '@/lib/games/mystery.types';

interface TimelineProps {
  entries: TimelineEntry[];
  suspects: Suspect[];
}

export default function Timeline({ entries, suspects }: TimelineProps) {
  if (!entries || entries.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="mb-6"
    >
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">⏰ Timeline</h3>
      <div className="p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b-2 border-white/30">
              <th className="text-left py-2 px-3 text-white font-semibold sticky left-0 bg-white/10">
                Time
              </th>
              {suspects.map((suspect) => (
                <th key={suspect.id} className="text-center py-2 px-2 text-white font-semibold whitespace-nowrap">
                  {suspect.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, idx) => (
              <tr key={idx} className={`border-b border-white/10 ${entry.crimeTime ? 'bg-red-500/20' : ''}`}>
                <td
                  className={`py-2 px-3 font-semibold whitespace-nowrap sticky left-0 ${
                    entry.crimeTime ? 'bg-red-500/20' : 'bg-white/10'
                  } ${entry.crimeTime ? 'text-red-400' : 'text-white'}`}
                >
                  {entry.time}
                  {entry.crimeTime && ' 🔴'}
                </td>
                {suspects.map((suspect) => {
                  const location = entry.suspectLocations.find((loc) => loc.suspectId === suspect.id);
                  return (
                    <td key={suspect.id} className="text-center py-2 px-2">
                      {location ? (
                        <div className="text-xs">
                          <div className="text-white/90 font-medium">{location.location}</div>
                          <div className="text-white/60 text-xs">{location.activity}</div>
                          {location.verified && (
                            <span className="inline-block ml-1 text-green-400 text-xs">✓</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-white/30">?</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 text-xs text-white/50 flex items-center gap-4">
          <span>✓ = Verified alibi</span>
          <span>🔴 = Crime time</span>
        </div>
      </div>
    </motion.div>
  );
}
