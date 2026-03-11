'use client';

import { motion, AnimatePresence } from 'framer-motion';
import type { Suspect } from '@/lib/games/mystery.types';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  suspects: Suspect[];
  notes: Record<string, string>;
  onNotesChange: (suspectId: string, content: string) => void;
  disabled?: boolean;
}

export default function NotesModal({
  isOpen,
  onClose,
  suspects,
  notes,
  onNotesChange,
  disabled = false
}: NotesModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-2xl md:w-full z-50"
          >
            <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  📝 Detective Notes
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
                  aria-label="Close notes"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* Content */}
              <div className="p-6 overflow-y-auto flex-1">
                <div className="space-y-4">
                  {suspects.map((suspect) => (
                    <div key={suspect.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base">
                          {suspect.name[0]}
                        </div>
                        <h4 className="font-semibold text-white text-lg">{suspect.name}</h4>
                      </div>
                      <textarea
                        value={notes[suspect.id] || ''}
                        onChange={(e) => onNotesChange(suspect.id, e.target.value)}
                        placeholder="Write your notes about this suspect..."
                        disabled={disabled}
                        rows={3}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 text-sm resize-none focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
