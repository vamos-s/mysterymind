// Mystery game type definitions

export interface SuspectLocation {
  suspectId: string;
  location: string;
  activity: string;
  verified?: boolean | undefined;
}

export interface TimelineEntry {
  time: string;
  crimeTime?: boolean;
  suspectLocations: SuspectLocation[];
}

export interface Clue {
  id: string;
  type: 'time' | 'location' | 'evidence' | 'witness' | 'alibi';
  description: string;
  relatedSuspect?: string;
}

export interface Evidence {
  id: string;
  name: string;
  icon: string;
  description: string;
  cost: number;
  location: string;
  collected?: boolean;
}

export interface Suspect {
  id: string;
  name: string;
  age?: string | number | undefined;
  occupation?: string | undefined;
  statement: string;
  alibi: string;
  alibiVerified?: boolean | undefined;
  alibiContradicted?: boolean | undefined;
}

export interface MysteryProblem {
  id: string;
  level: number;
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  description: string;
  scenario: string;
  suspects: Suspect[];
  clues: Clue[];
  evidence: Evidence[];
  timeline: TimelineEntry[];
  correctAnswer: string;
  explanation: string;
  timeLimit: number;
  hintCount: number;
  points: number;
}
