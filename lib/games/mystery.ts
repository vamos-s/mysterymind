export interface MysteryProblem {
  id: string;
  level: number;
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  description: string;
  scenario: string;
  suspects: Array<{
    id: string;
    name: string;
    age?: string;
    occupation?: string;
    statement: string;
    alibi: string;
    alibiVerified?: boolean; // 알리바이 검증 완료 여부
    alibiContradicted?: boolean; // 알리바이 모순 발견 여부
  }>;
  clues: Array<{
    id: string;
    description: string;
    type: 'time' | 'location' | 'evidence' | 'witness' | 'alibi';
    relatedSuspect?: string; // 단서와 연관된 용의자 ID
  }>;
  evidence: Array<{
    id: string;
    name: string;
    icon: string;
    description: string;
    cost: number; // 수집에 필요한 포인트
    location: string; // 증거 발견 장소
    collected?: boolean; // 수집 여부
  }>;
  timeline: Array<{
    time: string; // HH:MM format
    crimeTime?: boolean;
    suspectLocations: Array<{
      suspectId: string;
      location: string;
      activity: string;
      verified?: boolean; // 알리바이 검증 여부
    }>;
  }>;
  correctAnswer: string;
  explanation: string;
  timeLimit: number;
  hintCount: number;
  points: number;
}

export const mysteryProblems: MysteryProblem[] = [
  // ============ LEVEL 1-3: EASY ============
  {
    id: 'mystery-001',
    level: 1,
    difficulty: 'easy',
    title: '🍰 The Stolen Cake',
    description: 'Who stole the cake from the office?',
    scenario: 'On Friday afternoon, a delicious chocolate cake disappeared from the office break room. Four people were working that day. Security cameras show someone eating cake at 2:30 PM. Can you figure out who took it?',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Kim',
        age: '28',
        occupation: 'Accountant',
        statement: 'I was at lunch from 1:00 PM to 2:00 PM.',
        alibi: 'Restaurant receipt shows 1:15 PM',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Lee',
        age: '35',
        occupation: 'Manager',
        statement: 'I was in a meeting all afternoon until 3:00 PM.',
        alibi: 'Meeting minutes show attendance',
        alibiVerified: true,
        alibiContradicted: true
      },
      {
        id: 'suspect-3',
        name: 'Park',
        age: '42',
        occupation: 'Receptionist',
        statement: 'I was organizing files in my office.',
        alibi: 'Office logbook entry at 2:00 PM',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-4',
        name: 'Choi',
        age: '31',
        occupation: 'IT Support',
        statement: 'I was fixing the printer near the break room.',
        alibi: 'Printer maintenance log at 1:30 PM',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The cake was eaten at exactly 2:30 PM according to security footage.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '👔 Kim returned from lunch at 2:15 PM with white cream on their shirt collar.',
        type: 'evidence',
        relatedSuspect: 'suspect-1'
      },
      {
        id: 'clue-3',
        description: '📝 The meeting actually ended at 2:30 PM, not 3:00 PM.',
        type: 'alibi',
        relatedSuspect: 'suspect-2'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Security Camera Footage',
        icon: '📹',
        description: 'Footage shows the cake being eaten at 2:30 PM. A person is seen but the face is not visible.',
        cost: 20,
        location: 'Break Room camera',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Kim\'s Shirt',
        icon: '👔',
        description: 'Kim returned from lunch with white cream stains on their shirt collar. Could be from the chocolate cake.',
        cost: 15,
        location: 'Kim\'s office desk',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Meeting Minutes',
        icon: '📝',
        description: 'The meeting officially ended at 2:30 PM, not 3:00 PM as Lee claimed. Lee had free time after 2:30 PM.',
        cost: 25,
        location: 'Meeting Room archive',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Restaurant Receipt',
        icon: '🧾',
        description: 'Receipt shows Kim was at the restaurant from 1:15 PM to 1:45 PM. Returned to office at 2:15 PM.',
        cost: 10,
        location: 'Office records',
        collected: false
      }
    ],
    timeline: [
      {
        time: '1:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Restaurant', activity: 'Lunch', verified: true },
          { suspectId: 'suspect-2', location: 'Meeting Room A', activity: 'Meeting', verified: true },
          { suspectId: 'suspect-3', location: 'Reception Office', activity: 'Organizing files', verified: true },
          { suspectId: 'suspect-4', location: 'Break Room', activity: 'Fixing printer', verified: true }
        ]
      },
      {
        time: '1:30',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Restaurant', activity: 'Lunch', verified: true },
          { suspectId: 'suspect-2', location: 'Meeting Room A', activity: 'Meeting', verified: true },
          { suspectId: 'suspect-3', location: 'Reception Office', activity: 'Organizing files', verified: true },
          { suspectId: 'suspect-4', location: 'Break Room', activity: 'Fixing printer', verified: true }
        ]
      },
      {
        time: '2:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Office entrance', activity: 'Returning from lunch', verified: true },
          { suspectId: 'suspect-2', location: 'Meeting Room A', activity: 'Meeting', verified: true },
          { suspectId: 'suspect-3', location: 'Reception Office', activity: 'Organizing files', verified: true },
          { suspectId: 'suspect-4', location: 'IT Room', activity: 'Working', verified: false }
        ]
      },
      {
        time: '2:15',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Break Room', activity: 'Near cake', verified: false },
          { suspectId: 'suspect-2', location: 'Meeting Room A', activity: 'Meeting', verified: true },
          { suspectId: 'suspect-3', location: 'Reception Office', activity: 'Organizing files', verified: true },
          { suspectId: 'suspect-4', location: 'IT Room', activity: 'Working', verified: false }
        ]
      },
      {
        time: '2:30',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Break Room', activity: 'Eating cake', verified: true },
          { suspectId: 'suspect-2', location: 'Meeting Room A', activity: 'Meeting ended', verified: true },
          { suspectId: 'suspect-3', location: 'Reception Office', activity: 'Organizing files', verified: true },
          { suspectId: 'suspect-4', location: 'IT Room', activity: 'Working', verified: false }
        ]
      },
      {
        time: '3:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Accounting Office', activity: 'Working', verified: false },
          { suspectId: 'suspect-2', location: 'Manager Office', activity: 'Working', verified: true },
          { suspectId: 'suspect-3', location: 'Reception Office', activity: 'Organizing files', verified: true },
          { suspectId: 'suspect-4', location: 'IT Room', activity: 'Working', verified: false }
        ]
      }
    ],
    correctAnswer: 'suspect-1',
    explanation: 'Kim was at lunch until 2:00 PM but returned with cream on their shirt at 2:15 PM. The cake was eaten at 2:30 PM. Kim had time to take and eat the cake between returning from lunch and the cake being consumed.',
    timeLimit: 300,
    hintCount: 3,
    points: 100
  },
  {
    id: 'mystery-002',
    level: 2,
    difficulty: 'easy',
    title: '🏺 The Broken Vase',
    description: 'Who broke the expensive vase?',
    scenario: 'A valuable antique vase was found shattered in the living room. Three family members were home. The accident happened between 2:00 PM and 3:00 PM. Neighbors heard a loud crash.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Alice',
        age: '16',
        occupation: 'Student',
        statement: 'I was reading in my bedroom all afternoon.',
        alibi: 'Book from library',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-2',
        name: 'Bob',
        age: '14',
        occupation: 'Student',
        statement: 'I was at soccer practice from 1:00 PM to 4:00 PM.',
        alibi: 'Coach attendance sheet',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Charlie',
        age: '12',
        occupation: 'Student',
        statement: 'I was watching TV in the living room but fell asleep.',
        alibi: 'TV was left on',
        alibiVerified: false,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The neighbors heard a crash at exactly 2:45 PM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 Alice was seen by a delivery person walking to the kitchen at 2:40 PM.',
        type: 'alibi',
        relatedSuspect: 'suspect-1'
      },
      {
        id: 'clue-3',
        description: '✅ Bob\'s soccer coach confirms he was at practice the entire time.',
        type: 'witness',
        relatedSuspect: 'suspect-2'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Neighbor\'s Statement',
        icon: '📞',
        description: 'Neighbors confirm they heard a loud crash at exactly 2:45 PM coming from the living room.',
        cost: 15,
        location: 'Neighbor house',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Delivery Driver Report',
        icon: '📦',
        description: 'Delivery driver confirms seeing Alice walking toward the kitchen at 2:40 PM, not reading in her bedroom.',
        cost: 20,
        location: 'Delivery company records',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Team Attendance Sheet',
        icon: '📋',
        description: 'Soccer team attendance sheet shows Bob was at practice from 1:00 PM to 4:00 PM. Confirmed by coach.',
        cost: 25,
        location: 'Coach\'s office',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Alice\'s Library Book',
        icon: '📚',
        description: 'The book Alice claimed to be reading shows no signs of being read since the morning.',
        cost: 10,
        location: 'Alice\'s bedroom',
        collected: false
      }
    ],
    timeline: [
      {
        time: '2:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Bedroom', activity: 'Reading', verified: false },
          { suspectId: 'suspect-2', location: 'Soccer Field', activity: 'Practice', verified: true },
          { suspectId: 'suspect-3', location: 'Living Room', activity: 'Watching TV', verified: false }
        ]
      },
      {
        time: '2:30',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Bedroom', activity: 'Reading', verified: false },
          { suspectId: 'suspect-2', location: 'Soccer Field', activity: 'Practice', verified: true },
          { suspectId: 'suspect-3', location: 'Living Room', activity: 'Watching TV', verified: false }
        ]
      },
      {
        time: '2:40',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Hallway to Kitchen', activity: 'Walking', verified: true },
          { suspectId: 'suspect-2', location: 'Soccer Field', activity: 'Practice', verified: true },
          { suspectId: 'suspect-3', location: 'Living Room', activity: 'Watching TV (asleep)', verified: false }
        ]
      },
      {
        time: '2:45',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Living Room', activity: 'Near vase', verified: true },
          { suspectId: 'suspect-2', location: 'Soccer Field', activity: 'Practice', verified: true },
          { suspectId: 'suspect-3', location: 'Living Room', activity: 'Sleeping', verified: false }
        ]
      },
      {
        time: '3:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Bedroom', activity: 'Reading', verified: false },
          { suspectId: 'suspect-2', location: 'Soccer Field', activity: 'Practice', verified: true },
          { suspectId: 'suspect-3', location: 'Living Room', activity: 'Waking up', verified: false }
        ]
      }
    ],
    correctAnswer: 'suspect-1',
    explanation: 'Alice claimed she was reading in her bedroom, but a delivery person saw her going to the kitchen at 2:40 PM, just 5 minutes before the crash at 2:45 PM. She likely went to the kitchen and accidentally broke the vase.',
    timeLimit: 300,
    hintCount: 2,
    points: 120
  },
  {
    id: 'mystery-003',
    level: 3,
    difficulty: 'easy',
    title: '🎒 The Missing Backpack',
    description: 'Who took the backpack from the library?',
    scenario: 'A student\'s backpack disappeared from the library study room. Four students were in the library that afternoon. The backpack contained a laptop and textbooks.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'David',
        age: '19',
        occupation: 'Student',
        statement: 'I was studying at the main desk all afternoon.',
        alibi: 'Library entrance log',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Emma',
        age: '20',
        occupation: 'Student',
        statement: 'I went to the restroom at 3:00 PM and came back at 3:15 PM.',
        alibi: 'Friends saw her',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-3',
        name: 'Frank',
        age: '21',
        occupation: 'Student',
        statement: 'I was printing papers in the computer lab.',
        alibi: 'Print job logs',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-4',
        name: 'Grace',
        age: '18',
        occupation: 'Student',
        statement: 'I was browsing books on the second floor.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The backpack was last seen at 3:05 PM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 Emma was seen entering the study room at 3:10 PM.',
        type: 'alibi',
        relatedSuspect: 'suspect-2'
      },
      {
        id: 'clue-3',
        description: '👛 Emma bought a similar laptop case the next day.',
        type: 'evidence',
        relatedSuspect: 'suspect-2'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Study Room Footage',
        icon: '📹',
        description: 'Security camera footage shows Emma entering the study room at 3:10 PM and leaving with a backpack at 3:12 PM.',
        cost: 20,
        location: 'Library security office',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Laptop Case Receipt',
        icon: '🧾',
        description: 'Receipt shows Emma purchased a new laptop case on Saturday, the day after the backpack disappeared.',
        cost: 25,
        location: 'Electronics store records',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Student ID Card',
        icon: '🪪',
        description: 'A student ID card was found near the study room entrance. It belongs to Emma and was dropped around 3:10 PM.',
        cost: 15,
        location: 'Study room floor',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Library Entry Log',
        icon: '📋',
        description: 'Library entry log shows Emma leaving the library at 3:20 PM, carrying a backpack that matches the description.',
        cost: 20,
        location: 'Front desk records',
        collected: false
      }
    ],
    timeline: [
      {
        time: '2:45',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Main Desk', activity: 'Studying', verified: true },
          { suspectId: 'suspect-2', location: 'Study Room', activity: 'Reading', verified: false },
          { suspectId: 'suspect-3', location: 'Computer Lab', activity: 'Printing', verified: true },
          { suspectId: 'suspect-4', location: 'Second Floor', activity: 'Browsing books', verified: false }
        ]
      },
      {
        time: '3:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Main Desk', activity: 'Studying', verified: true },
          { suspectId: 'suspect-2', location: 'Hallway to Restroom', activity: 'Leaving study room', verified: true },
          { suspectId: 'suspect-3', location: 'Computer Lab', activity: 'Printing', verified: true },
          { suspectId: 'suspect-4', location: 'Second Floor', activity: 'Browsing books', verified: false }
        ]
      },
      {
        time: '3:05',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Main Desk', activity: 'Studying', verified: true },
          { suspectId: 'suspect-2', location: 'Hallway', activity: 'Returning from restroom', verified: true },
          { suspectId: 'suspect-3', location: 'Computer Lab', activity: 'Printing', verified: true },
          { suspectId: 'suspect-4', location: 'Second Floor', activity: 'Browsing books', verified: false }
        ]
      },
      {
        time: '3:10',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Main Desk', activity: 'Studying', verified: true },
          { suspectId: 'suspect-2', location: 'Study Room', activity: 'Checking backpack', verified: true },
          { suspectId: 'suspect-3', location: 'Computer Lab', activity: 'Printing', verified: true },
          { suspectId: 'suspect-4', location: 'Second Floor', activity: 'Browsing books', verified: false }
        ]
      },
      {
        time: '3:15',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Main Desk', activity: 'Studying', verified: true },
          { suspectId: 'suspect-2', location: 'Study Room', activity: 'Reading', verified: true },
          { suspectId: 'suspect-3', location: 'Computer Lab', activity: 'Printing', verified: true },
          { suspectId: 'suspect-4', location: 'Second Floor', activity: 'Browsing books', verified: false }
        ]
      }
    ],
    correctAnswer: 'suspect-2',
    explanation: 'Emma went to the restroom at 3:00 PM but was seen entering the study room at 3:10 PM. She had the opportunity to take the backpack during that time. The fact that she bought a similar laptop case the next day suggests guilt.',
    timeLimit: 300,
    hintCount: 3,
    points: 140
  },

  // ============ LEVEL 4-6: MEDIUM ============
  {
    id: 'mystery-004',
    level: 4,
    difficulty: 'medium',
    title: '💎 The Stolen Diamond',
    description: 'Who stole the museum\'s diamond?',
    scenario: 'A priceless diamond disappeared from the museum during the night. Security guards were patrolling. The alarm was triggered at 3:47 AM.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Detective Johnson',
        age: '45',
        occupation: 'Security Guard',
        statement: 'I was patrolling the west wing from 3:00 AM to 4:00 AM.',
        alibi: 'Security logs show patrol',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Maria',
        age: '38',
        occupation: 'Night Cleaner',
        statement: 'I was cleaning the east wing all night.',
        alibi: 'Cleaning checklist',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-3',
        name: 'Dr. Evans',
        age: '52',
        occupation: 'Curator',
        statement: 'I was working late in my office on the top floor.',
        alibi: 'Office lights on',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-4',
        name: 'James',
        age: '29',
        occupation: 'Assistant',
        statement: 'I left at 8:00 PM and went straight home.',
        alibi: 'GPS tracker shows route',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The alarm was triggered at 3:47 AM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 The east wing was closed for renovation that night.',
        type: 'alibi',
        relatedSuspect: 'suspect-2'
      },
      {
        id: 'clue-3',
        description: '👔 Maria had a key card access to all areas.',
        type: 'evidence',
        relatedSuspect: 'suspect-2'
      },
      {
        id: 'clue-4',
        description: '👮 Security footage shows Maria in the diamond exhibit area at 3:30 AM.',
        type: 'alibi',
        relatedSuspect: 'suspect-2'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Security Camera Footage',
        icon: '📹',
        description: 'Clear footage shows Maria entering the diamond exhibit area at 3:30 AM and leaving at 3:48 AM, just after the alarm.',
        cost: 25,
        location: 'East wing security archive',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Key Card Access Log',
        icon: '🔑',
        description: 'Key card log shows Maria accessed the diamond exhibit at 3:28 AM using her personal key card. She was the only person with access that night.',
        cost: 20,
        location: 'Security system database',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Glove Fragment',
        icon: '🧤',
        description: 'A blue glove fragment was found near the diamond display case. It matches the gloves Maria wears for cleaning.',
        cost: 15,
        location: 'Diamond exhibit floor',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Bank Statement',
        icon: '📄',
        description: 'Bank records show a large deposit to Maria\'s account the day after the theft, labeled \"private sale\".',
        cost: 30,
        location: 'Bank records',
        collected: false
      }
    ],
    timeline: [
      {
        time: '3:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'West Wing', activity: 'Patrolling', verified: true },
          { suspectId: 'suspect-2', location: 'East Wing', activity: 'Cleaning', verified: false },
          { suspectId: 'suspect-3', location: 'Top Floor Office', activity: 'Working', verified: true },
          { suspectId: 'suspect-4', location: 'Home', activity: 'Sleeping', verified: true }
        ]
      },
      {
        time: '3:30',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'West Wing', activity: 'Patrolling', verified: true },
          { suspectId: 'suspect-2', location: 'Diamond Exhibit', activity: 'Near display', verified: true },
          { suspectId: 'suspect-3', location: 'Top Floor Office', activity: 'Working', verified: true },
          { suspectId: 'suspect-4', location: 'Home', activity: 'Sleeping', verified: true }
        ]
      },
      {
        time: '3:47',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'West Wing', activity: 'Patrolling', verified: true },
          { suspectId: 'suspect-2', location: 'Diamond Exhibit', activity: 'Stealing diamond', verified: true },
          { suspectId: 'suspect-3', location: 'Top Floor Office', activity: 'Working', verified: true },
          { suspectId: 'suspect-4', location: 'Home', activity: 'Sleeping', verified: true }
        ]
      },
      {
        time: '4:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'West Wing', activity: 'Patrolling', verified: true },
          { suspectId: 'suspect-2', location: 'Storage Room', activity: 'Hiding', verified: false },
          { suspectId: 'suspect-3', location: 'Top Floor Office', activity: 'Working', verified: true },
          { suspectId: 'suspect-4', location: 'Home', activity: 'Sleeping', verified: true }
        ]
      }
    ],
    correctAnswer: 'suspect-2',
    explanation: 'Maria claimed to be cleaning the east wing, but it was closed for renovation that night. Security footage shows her in the diamond exhibit area at 3:30 AM, just 17 minutes before the alarm. She had the access key and opportunity.',
    timeLimit: 360,
    hintCount: 3,
    points: 180
  },
  {
    id: 'mystery-005',
    level: 5,
    difficulty: 'medium',
    title: '🎭 The Theater Murder',
    description: 'Who murdered the famous actor?',
    scenario: 'Famous actor Victor Sterling was found dead in his dressing room during intermission. Three people were backstage. The murder happened between 8:45 PM and 9:00 PM.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Linda',
        age: '32',
        occupation: 'Costume Designer',
        statement: 'I was in the costume room fixing Linda\'s dress.',
        alibi: 'Costume room occupant',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-2',
        name: 'Tom',
        age: '41',
        occupation: 'Stage Manager',
        statement: 'I was at the sound booth monitoring the show.',
        alibi: 'Sound booth occupant',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Rachel',
        age: '27',
        occupation: 'Actress',
        statement: 'I was practicing my lines in the green room.',
        alibi: 'Green room occupant',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ Medical examiner estimates death at 8:52 PM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 Linda left the costume room at 8:50 PM according to a makeup artist.',
        type: 'alibi',
        relatedSuspect: 'suspect-1'
      },
      {
        id: 'clue-3',
        description: '🔪 A bloody costume scissors was found in Linda\'s bag.',
        type: 'evidence',
        relatedSuspect: 'suspect-1'
      },
      {
        id: 'clue-4',
        description: '😤 Linda had a heated argument with Victor earlier that day about casting.',
        type: 'evidence',
        relatedSuspect: 'suspect-1'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Bloody Scissors',
        icon: '✂️',
        description: 'A pair of costume scissors stained with blood was found in Linda\'s bag. Blood type matches Victor\'s.',
        cost: 25,
        location: 'Linda\'s costume bag',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Makeup Artist Testimony',
        icon: '💄',
        description: 'The makeup artist confirms she saw Linda leaving the costume room at 8:50 PM, heading toward Victor\'s dressing room.',
        cost: 20,
        location: 'Green room',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Voice Recording',
        icon: '🎤',
        description: 'A recording of the argument between Linda and Victor was captured on stage. Linda was heard threatening Victor.',
        cost: 30,
        location: 'Sound booth archives',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Dressing Room Entry Log',
        icon: '🚪',
        description: 'The electronic door log shows Linda entered Victor\'s dressing room at 8:51 PM and exited at 8:53 PM.',
        cost: 25,
        location: 'Theater security system',
        collected: false
      }
    ],
    timeline: [
      {
        time: '8:45',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Costume Room', activity: 'Fixing dress', verified: true },
          { suspectId: 'suspect-2', location: 'Sound Booth', activity: 'Monitoring show', verified: true },
          { suspectId: 'suspect-3', location: 'Green Room', activity: 'Practicing lines', verified: true }
        ]
      },
      {
        time: '8:50',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Hallway', activity: 'Leaving costume room', verified: true },
          { suspectId: 'suspect-2', location: 'Sound Booth', activity: 'Monitoring show', verified: true },
          { suspectId: 'suspect-3', location: 'Green Room', activity: 'Practicing lines', verified: true }
        ]
      },
      {
        time: '8:52',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Victor\'s Dressing Room', activity: 'Murdering Victor', verified: true },
          { suspectId: 'suspect-2', location: 'Sound Booth', activity: 'Monitoring show', verified: true },
          { suspectId: 'suspect-3', location: 'Green Room', activity: 'Practicing lines', verified: true }
        ]
      },
      {
        time: '9:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Costume Room', activity: 'Back in room', verified: false },
          { suspectId: 'suspect-2', location: 'Sound Booth', activity: 'Monitoring show', verified: true },
          { suspectId: 'suspect-3', location: 'Green Room', activity: 'Practicing lines', verified: true }
        ]
      }
    ],
    correctAnswer: 'suspect-1',
    explanation: 'Linda claimed to be in the costume room, but left at 8:50 PM. The murder occurred at 8:52 PM. Bloody scissors were found in her bag, and she had motive - an argument with Victor about casting earlier that day.',
    timeLimit: 360,
    hintCount: 3,
    points: 200
  },
  {
    id: 'mystery-006',
    level: 6,
    difficulty: 'medium',
    title: '🌊 The Beach House Burglary',
    description: 'Who robbed the beach house?',
    scenario: 'A luxury beach house was burglarized while the owners were on vacation. Valuables including jewelry and electronics were stolen. The burglary happened on Sunday night.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Neighbor Mike',
        age: '34',
        occupation: 'Fisherman',
        statement: 'I was out fishing all night until 4:00 AM.',
        alibi: 'Boat rental log',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Sarah',
        age: '28',
        occupation: 'Housekeeper',
        statement: 'I was at home watching TV all night.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-3',
        name: 'Jake',
        age: '22',
        occupation: 'Surfer',
        statement: 'I was at a beach party until midnight.',
        alibi: 'Party photos on social media',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The alarm was disabled at 11:45 PM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '👟 Footprints in sand show someone with size 8 shoes.',
        type: 'evidence',
        relatedSuspect: 'suspect-2'
      },
      {
        id: 'clue-3',
        description: '🔑 Sarah had a spare key to the beach house.',
        type: 'evidence',
        relatedSuspect: 'suspect-2'
      },
      {
        id: 'clue-4',
        description: '👠 Sarah wears size 8 shoes.',
        type: 'evidence',
        relatedSuspect: 'suspect-2'
      },
      {
        id: 'clue-5',
        description: '📺 The neighbors saw lights on at the beach house at 11:50 PM.',
        type: 'alibi',
        relatedSuspect: 'suspect-2'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Spare Key Copy',
        icon: '🔑',
        description: 'A spare key to the beach house was found in Sarah\'s home. It matches the lock.',
        cost: 25,
        location: 'Sarah\'s house',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Sand Footprints',
        icon: '👟',
        description: 'Footprints in the sand near the beach house show size 8 shoe impressions. They match Sarah\'s shoe size and brand.',
        cost: 20,
        location: 'Beach area',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Neighbor\'s Photo',
        icon: '📸',
        description: 'Neighbor\'s photo taken at 11:50 PM shows lights on inside the beach house and a person matching Sarah\'s description.',
        cost: 25,
        location: 'Neighbor\'s phone',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Security Log',
        icon: '📋',
        description: 'Security log shows the alarm was disabled using the keypad code - a code only Sarah knew besides the owners.',
        cost: 30,
        location: 'Beach house security system',
        collected: false
      }
    ],
    timeline: [
      {
        time: '11:30',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Ocean (boat)', activity: 'Fishing', verified: true },
          { suspectId: 'suspect-2', location: 'Home', activity: 'Watching TV', verified: false },
          { suspectId: 'suspect-3', location: 'Beach Party', activity: 'Partying', verified: true }
        ]
      },
      {
        time: '11:45',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Ocean (boat)', activity: 'Fishing', verified: true },
          { suspectId: 'suspect-2', location: 'Beach House exterior', activity: 'Disabling alarm', verified: true },
          { suspectId: 'suspect-3', location: 'Beach Party', activity: 'Partying', verified: true }
        ]
      },
      {
        time: '11:50',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Ocean (boat)', activity: 'Fishing', verified: true },
          { suspectId: 'suspect-2', location: 'Beach House', activity: 'Stealing valuables', verified: true },
          { suspectId: 'suspect-3', location: 'Beach Party', activity: 'Partying', verified: true }
        ]
      },
      {
        time: '12:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Ocean (boat)', activity: 'Fishing', verified: true },
          { suspectId: 'suspect-2', location: 'Home', activity: 'Hiding stolen goods', verified: false },
          { suspectId: 'suspect-3', location: 'Home', activity: 'Sleeping', verified: true }
        ]
      }
    ],
    correctAnswer: 'suspect-2',
    explanation: 'Sarah had a spare key and opportunity. The footprints matched her size 8 shoes. The neighbors saw lights on at 11:50 PM, just 5 minutes after the alarm was disabled. Her alibi has no witnesses to confirm it.',
    timeLimit: 360,
    hintCount: 4,
    points: 220
  },

  // ============ LEVEL 7-10: HARD ============
  {
    id: 'mystery-007',
    level: 7,
    difficulty: 'hard',
    title: '🏢 The Corporate Spy',
    description: 'Who leaked the confidential information?',
    scenario: 'Top-secret company plans were leaked to a competitor. Five senior employees had access. The leak occurred over the weekend through email.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Robert Chen',
        age: '48',
        occupation: 'VP of Engineering',
        statement: 'I was at a tech conference in Tokyo all weekend.',
        alibi: 'Flight tickets, conference attendance',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Jennifer Liu',
        age: '39',
        occupation: 'Project Manager',
        statement: 'I was home sick in bed.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Marcus Williams',
        age: '45',
        occupation: 'Director of Operations',
        statement: 'I was at my lake house with family.',
        alibi: 'Family photos, witness testimony',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-4',
        name: 'Sophie Patel',
        age: '36',
        occupation: 'Head of Security',
        statement: 'I was at the office monitoring the weekend shift.',
        alibi: 'Security log',
        alibiVerified: true,
        alibiContradicted: true
      },
      {
        id: 'suspect-5',
        name: 'David Kim',
        age: '42',
        occupation: 'Chief Technology Officer',
        statement: 'I was at home working remotely.',
        alibi: 'VPN connection logs',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The email was sent from company IP at 2:47 AM Saturday.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '🔍 The email was encrypted using Sophie\'s personal encryption key.',
        type: 'evidence',
        relatedSuspect: 'suspect-4'
      },
      {
        id: 'clue-3',
        description: '📍 The office security system shows Sophie entering at 2:30 AM Saturday.',
        type: 'alibi',
        relatedSuspect: 'suspect-4'
      },
      {
        id: 'clue-4',
        description: '💰 Sophie has $50,000 in unexplained deposits in her bank account.',
        type: 'evidence',
        relatedSuspect: 'suspect-4'
      },
      {
        id: 'clue-5',
        description: '😤 Sophie recently applied for a promotion that was denied.',
        type: 'evidence',
        relatedSuspect: 'suspect-4'
      },
      {
        id: 'clue-6',
        description: '🔗 Sophie has connections to the competitor company through her sister.',
        type: 'evidence',
        relatedSuspect: 'suspect-4'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Email Encryption Key',
        icon: '🔐',
        description: 'Forensic analysis reveals the leaked email was encrypted with Sophie\'s personal encryption key. Only she has access to this key.',
        cost: 30,
        location: 'Forensic lab report',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Security Entry Log',
        icon: '📋',
        description: 'Security footage and entry logs show Sophie entering the office at 2:30 AM Saturday and leaving at 3:15 AM.',
        cost: 25,
        location: 'Security system',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Bank Records',
        icon: '🏦',
        description: 'Bank records show five deposits of $10,000 each to Sophie\'s account over the past month, labeled \"consulting fees\" from an unknown source.',
        cost: 35,
        location: 'Bank statement',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Sister\'s Company Link',
        icon: '🔗',
        description: 'Public records show Sophie\'s sister is a senior executive at the competitor company. They were in communication the day before the leak.',
        cost: 25,
        location: 'Corporate records',
        collected: false
      }
    ],
    timeline: [
      {
        time: '2:20',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Tokyo Hotel', activity: 'Sleeping', verified: true },
          { suspectId: 'suspect-2', location: 'Home', activity: 'Sick in bed', verified: false },
          { suspectId: 'suspect-3', location: 'Lake House', activity: 'With family', verified: true },
          { suspectId: 'suspect-4', location: 'Office entrance', activity: 'Arriving', verified: true },
          { suspectId: 'suspect-5', location: 'Home', activity: 'Working remotely', verified: true }
        ]
      },
      {
        time: '2:30',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Tokyo Hotel', activity: 'Sleeping', verified: true },
          { suspectId: 'suspect-2', location: 'Home', activity: 'Sick in bed', verified: false },
          { suspectId: 'suspect-3', location: 'Lake House', activity: 'With family', verified: true },
          { suspectId: 'suspect-4', location: 'Office Server Room', activity: 'Accessing files', verified: true },
          { suspectId: 'suspect-5', location: 'Home', activity: 'Working remotely', verified: true }
        ]
      },
      {
        time: '2:47',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Tokyo Hotel', activity: 'Sleeping', verified: true },
          { suspectId: 'suspect-2', location: 'Home', activity: 'Sick in bed', verified: false },
          { suspectId: 'suspect-3', location: 'Lake House', activity: 'With family', verified: true },
          { suspectId: 'suspect-4', location: 'Office Computer', activity: 'Sending leak email', verified: true },
          { suspectId: 'suspect-5', location: 'Home', activity: 'Working remotely', verified: true }
        ]
      },
      {
        time: '3:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Tokyo Hotel', activity: 'Sleeping', verified: true },
          { suspectId: 'suspect-2', location: 'Home', activity: 'Sick in bed', verified: false },
          { suspectId: 'suspect-3', location: 'Lake House', activity: 'With family', verified: true },
          { suspectId: 'suspect-4', location: 'Office', activity: 'Monitoring shift', verified: true },
          { suspectId: 'suspect-5', location: 'Home', activity: 'Working remotely', verified: true }
        ]
      }
    ],
    correctAnswer: 'suspect-4',
    explanation: 'Sophie, as Head of Security, had full access. The email was encrypted with her personal key. She entered the office at 2:30 AM, 17 minutes before the email was sent at 2:47 AM. Large unexplained deposits, a denied promotion, and family connections to the competitor provide both motive and means.',
    timeLimit: 420,
    hintCount: 4,
    points: 280
  },
  {
    id: 'mystery-008',
    level: 8,
    difficulty: 'hard',
    title: '🚢 The Yacht Murder',
    description: 'Who killed the billionaire on his yacht?',
    scenario: 'Billionaire Arthur Vanderbilt was shot dead on his yacht during a party. The yacht was isolated in the Mediterranean. Four guests and three crew members were aboard.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Victoria',
        age: '35',
        occupation: 'Business Partner',
        statement: 'I was in my cabin changing for dinner.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-2',
        name: 'James',
        age: '42',
        occupation: 'Best Friend',
        statement: 'I was at the bar getting drinks.',
        alibi: 'Multiple witnesses',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Isabella',
        age: '28',
        occupation: 'Model',
        statement: 'I was on deck taking photos.',
        alibi: 'Photos timestamped',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-4',
        name: 'Captain Morgan',
        age: '55',
        occupation: 'Yacht Captain',
        statement: 'I was on the bridge navigating.',
        alibi: 'Navigation log',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The shot was heard at 11:23 PM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '🔫 A 9mm gun matching Arthur\'s collection was found in Victoria\'s handbag.',
        type: 'evidence',
        relatedSuspect: 'suspect-1'
      },
      {
        id: 'clue-3',
        description: '💰 Victoria stood to inherit Arthur\'s fortune upon marriage.',
        type: 'evidence',
        relatedSuspect: 'suspect-1'
      },
      {
        id: 'clue-4',
        description: '👔 Arthur had threatened to cancel the wedding that afternoon.',
        type: 'evidence',
        relatedSuspect: 'suspect-1'
      },
      {
        id: 'clue-5',
        description: '📍 Victoria\'s cabin had a direct view of Arthur\'s private deck.',
        type: 'evidence',
        relatedSuspect: 'suspect-1'
      },
      {
        id: 'clue-6',
        description: '👀 The maid saw Victoria exiting Arthur\'s deck at 11:25 PM.',
        type: 'alibi',
        relatedSuspect: 'suspect-1'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: '9mm Pistol',
        icon: '🔫',
        description: 'A 9mm pistol matching Arthur\'s personal collection was found in Victoria\'s handbag. It had been fired once.',
        cost: 30,
        location: 'Victoria\'s handbag',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Maid\'s Testimony',
        icon: '👀',
        description: 'The maid confirms she saw Victoria entering Arthur\'s private deck at 11:20 PM and exiting at 11:25 PM, just after the shot.',
        cost: 25,
        location: 'Maid statement',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Prenuptial Agreement',
        icon: '📄',
        description: 'Legal document shows Victoria would inherit Arthur\'s entire fortune upon marriage. Arthur threatened to cancel the wedding that afternoon.',
        cost: 35,
        location: 'Arthur\'s safe',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Cabin Location Map',
        icon: '🗺️',
        description: 'The yacht layout shows Victoria\'s cabin has a direct line of sight to Arthur\'s private deck. The distance is only 20 feet.',
        cost: 20,
        location: 'Yacht documentation',
        collected: false
      }
    ],
    timeline: [
      {
        time: '11:10',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Victoria\'s Cabin', activity: 'Changing', verified: false },
          { suspectId: 'suspect-2', location: 'Bar', activity: 'Getting drinks', verified: true },
          { suspectId: 'suspect-3', location: 'Main Deck', activity: 'Taking photos', verified: true },
          { suspectId: 'suspect-4', location: 'Bridge', activity: 'Navigating', verified: true }
        ]
      },
      {
        time: '11:20',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Hallway to Arthur\'s Deck', activity: 'Walking', verified: false },
          { suspectId: 'suspect-2', location: 'Bar', activity: 'Getting drinks', verified: true },
          { suspectId: 'suspect-3', location: 'Main Deck', activity: 'Taking photos', verified: true },
          { suspectId: 'suspect-4', location: 'Bridge', activity: 'Navigating', verified: true }
        ]
      },
      {
        time: '11:23',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Arthur\'s Private Deck', activity: 'Shooting Arthur', verified: true },
          { suspectId: 'suspect-2', location: 'Bar', activity: 'Getting drinks', verified: true },
          { suspectId: 'suspect-3', location: 'Main Deck', activity: 'Taking photos', verified: true },
          { suspectId: 'suspect-4', location: 'Bridge', activity: 'Navigating', verified: true }
        ]
      },
      {
        time: '11:25',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Hallway', activity: 'Exiting Arthur\'s deck', verified: true },
          { suspectId: 'suspect-2', location: 'Bar', activity: 'Getting drinks', verified: true },
          { suspectId: 'suspect-3', location: 'Main Deck', activity: 'Taking photos', verified: true },
          { suspectId: 'suspect-4', location: 'Bridge', activity: 'Navigating', verified: true }
        ]
      },
      {
        time: '11:30',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Victoria\'s Cabin', activity: 'Hiding', verified: false },
          { suspectId: 'suspect-2', location: 'Bar', activity: 'Getting drinks', verified: true },
          { suspectId: 'suspect-3', location: 'Main Deck', activity: 'Taking photos', verified: true },
          { suspectId: 'suspect-4', location: 'Bridge', activity: 'Navigating', verified: true }
        ]
      }
    ],
    correctAnswer: 'suspect-1',
    explanation: 'Victoria had motive - she would inherit Arthur\'s fortune upon marriage, but Arthur threatened to cancel the wedding that day. The gun found in her handbag was from Arthur\'s collection. Her cabin overlooked the private deck, and a maid saw her exiting the area just after the shot at 11:23 PM.',
    timeLimit: 420,
    hintCount: 4,
    points: 300
  },
  {
    id: 'mystery-009',
    level: 9,
    difficulty: 'hard',
    title: '🏰 The Castle Heist',
    description: 'Who stole the royal crown?',
    scenario: 'The royal crown disappeared from its display case in the ancient castle. The theft occurred during a private event. Seven suspects had opportunity.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Countess Helena',
        age: '47',
        occupation: 'Royal Advisor',
        statement: 'I was in the royal library with the Queen.',
        alibi: 'Queen confirms',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Sir William',
        age: '58',
        occupation: 'Head Guard',
        statement: 'I was patrolling the perimeter.',
        alibi: 'Guard roster',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Elena',
        age: '32',
        occupation: 'Maid',
        statement: 'I was cleaning the guest rooms.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: false
      },
      {
        id: 'suspect-4',
        name: 'Dr. Reinhardt',
        age: '62',
        occupation: 'Art Expert',
        statement: 'I was examining paintings.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: false
      },
      {
        id: 'suspect-5',
        name: 'Prince Alexander',
        age: '35',
        occupation: 'Royal Family',
        statement: 'I was in my private chambers.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: true
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The crown disappeared at 9:17 PM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '🔍 The display case lock was picked with professional skill.',
        type: 'evidence'
      },
      {
        id: 'clue-3',
        description: '📚 Prince Alexander is an expert lockpicker.',
        type: 'evidence',
        relatedSuspect: 'suspect-5'
      },
      {
        id: 'clue-4',
        description: '💰 Prince Alexander has enormous gambling debts.',
        type: 'evidence',
        relatedSuspect: 'suspect-5'
      },
      {
        id: 'clue-5',
        description: '👟 Footprints match Prince Alexander\'s shoes.',
        type: 'evidence',
        relatedSuspect: 'suspect-5'
      },
      {
        id: 'clue-6',
        description: '🚪 The castle has secret passages only the royal family knows.',
        type: 'location'
      },
      {
        id: 'clue-7',
        description: '📍 A secret passage connects Prince Alexander\'s chambers to the crown room.',
        type: 'evidence',
        relatedSuspect: 'suspect-5'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Lockpicking Tools',
        icon: '🔧',
        description: 'Professional-grade lockpicking tools were found hidden in Prince Alexander\'s chambers. They match the marks on the display case lock.',
        cost: 30,
        location: 'Prince Alexander\'s chambers',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Debt Records',
        icon: '📊',
        description: 'Casino records reveal Prince Alexander has gambling debts of 5 million euros. The crown is worth more than enough to cover them.',
        cost: 35,
        location: 'Private investigator report',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Shoe Print Analysis',
        icon: '👟',
        description: 'Forensic analysis of shoe prints near the display case shows they match Prince Alexander\'s custom-made shoes, which only he wears.',
        cost: 25,
        location: 'Forensic lab',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Secret Passage Map',
        icon: '🗺️',
        description: 'An ancient map of the castle shows a hidden passage connecting the Prince\'s chambers to the crown room. Only the royal family knows about it.',
        cost: 30,
        location: 'Royal archives',
        collected: false
      }
    ],
    timeline: [
      {
        time: '9:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Royal Library', activity: 'With Queen', verified: true },
          { suspectId: 'suspect-2', location: 'Perimeter', activity: 'Patrolling', verified: true },
          { suspectId: 'suspect-3', location: 'Guest Rooms', activity: 'Cleaning', verified: false },
          { suspectId: 'suspect-4', location: 'Art Gallery', activity: 'Examining paintings', verified: false },
          { suspectId: 'suspect-5', location: 'Private Chambers', activity: 'In room', verified: false }
        ]
      },
      {
        time: '9:10',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Royal Library', activity: 'With Queen', verified: true },
          { suspectId: 'suspect-2', location: 'Perimeter', activity: 'Patrolling', verified: true },
          { suspectId: 'suspect-3', location: 'Guest Rooms', activity: 'Cleaning', verified: false },
          { suspectId: 'suspect-4', location: 'Art Gallery', activity: 'Examining paintings', verified: false },
          { suspectId: 'suspect-5', location: 'Secret Passage', activity: 'Entering passage', verified: false }
        ]
      },
      {
        time: '9:17',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Royal Library', activity: 'With Queen', verified: true },
          { suspectId: 'suspect-2', location: 'Perimeter', activity: 'Patrolling', verified: true },
          { suspectId: 'suspect-3', location: 'Guest Rooms', activity: 'Cleaning', verified: false },
          { suspectId: 'suspect-4', location: 'Art Gallery', activity: 'Examining paintings', verified: false },
          { suspectId: 'suspect-5', location: 'Crown Room', activity: 'Stealing crown', verified: true }
        ]
      },
      {
        time: '9:25',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Royal Library', activity: 'With Queen', verified: true },
          { suspectId: 'suspect-2', location: 'Perimeter', activity: 'Patrolling', verified: true },
          { suspectId: 'suspect-3', location: 'Guest Rooms', activity: 'Cleaning', verified: false },
          { suspectId: 'suspect-4', location: 'Art Gallery', activity: 'Examining paintings', verified: false },
          { suspectId: 'suspect-5', location: 'Private Chambers', activity: 'Hiding crown', verified: false }
        ]
      }
    ],
    correctAnswer: 'suspect-5',
    explanation: 'Prince Alexander had the means - expert lockpicking skills and knowledge of secret passages connecting his chambers to the crown room. He had motive - enormous gambling debts. His footprints were found at the scene, and the theft happened while he was supposedly in his private chambers.',
    timeLimit: 480,
    hintCount: 5,
    points: 350
  },
  {
    id: 'mystery-010',
    level: 10,
    difficulty: 'hard',
    title: '🌍 The Conspiracy',
    description: 'Who assassinated the world leader?',
    scenario: 'World leader Elena Kovalova was assassinated at a peace summit. The killer acted with precision. Six suspects from different countries are under investigation.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Agent Chen',
        age: '38',
        occupation: 'Chinese Intelligence',
        statement: 'I was at my embassy monitoring communications.',
        alibi: 'Embassy records',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Commander Volkov',
        age: '44',
        occupation: 'Russian Security',
        statement: 'I was at hotel security.',
        alibi: 'Security log',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Agent Smith',
        age: '40',
        occupation: 'American Intelligence',
        statement: 'I was with my detail protecting the Vice President.',
        alibi: 'Team confirms',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-4',
        name: 'Dr. Kovalova\'s Assistant',
        age: '29',
        occupation: 'Personal Assistant',
        statement: 'I was preparing documents in the office.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: false
      },
      {
        id: 'suspect-5',
        name: 'Mikhail Kovalov',
        age: '45',
        occupation: 'Elena\'s Brother',
        statement: 'I was attending the gala dinner.',
        alibi: 'Multiple witnesses',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-6',
        name: 'Yuri Volkov',
        age: '52',
        occupation: 'Political Rival',
        statement: 'I was at my hotel suite.',
        alibi: 'No witnesses',
        alibiVerified: true,
        alibiContradicted: true
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The assassination occurred at 8:42 PM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '🔫 The weapon was a rare Soviet-era sniper rifle.',
        type: 'evidence'
      },
      {
        id: 'clue-3',
        description: '📍 The shot came from Yuri\'s hotel suite window.',
        type: 'alibi',
        relatedSuspect: 'suspect-6'
      },
      {
        id: 'clue-4',
        description: '🔗 Commander Volkov is Yuri\'s cousin.',
        type: 'evidence',
        relatedSuspect: 'suspect-6'
      },
      {
        id: 'clue-5',
        description: '💰 Large transfers from Yuri\'s account to Commander Volkov.',
        type: 'evidence',
        relatedSuspect: 'suspect-6'
      },
      {
        id: 'clue-6',
        description: '😤 Yuri had publicly threatened Elena for months.',
        type: 'evidence',
        relatedSuspect: 'suspect-6'
      },
      {
        id: 'clue-7',
        description: '🏨 Yuri checked out of his hotel at 8:50 PM, immediately after the shooting.',
        type: 'alibi',
        relatedSuspect: 'suspect-6'
      },
      {
        id: 'clue-8',
        description: '🔑 Commander Volkov had access to Yuri\'s suite.',
        type: 'evidence',
        relatedSuspect: 'suspect-6'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Soviet Sniper Rifle',
        icon: '🔫',
        description: 'A rare Soviet-era Dragunov sniper rifle was found in Yuri\'s hotel suite. Ballistics match the bullet that killed Elena.',
        cost: 35,
        location: 'Yuri\'s hotel suite',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Financial Transfers',
        icon: '💰',
        description: 'Bank records show transfers of 2 million euros from Yuri\'s account to Commander Volkov\'s account over the past month, labeled \"security services\".',
        cost: 40,
        location: 'International bank records',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Public Speech Transcript',
        icon: '📜',
        description: 'Transcript of Yuri\'s speech at political rally shows him threatening Elena multiple times, saying \"she must be stopped at all costs\".',
        cost: 30,
        location: 'News archives',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Hotel Checkout Record',
        icon: '🏨',
        description: 'Hotel records show Yuri checked out of his suite at 8:50 PM, just 8 minutes after the assassination. He also purchased an emergency flight ticket.',
        cost: 35,
        location: 'Hotel management system',
        collected: false
      }
    ],
    timeline: [
      {
        time: '8:30',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Chinese Embassy', activity: 'Monitoring communications', verified: true },
          { suspectId: 'suspect-2', location: 'Hotel Security', activity: 'On duty', verified: true },
          { suspectId: 'suspect-3', location: 'Summit Venue', activity: 'Protecting VP', verified: true },
          { suspectId: 'suspect-4', location: 'Office', activity: 'Preparing documents', verified: false },
          { suspectId: 'suspect-5', location: 'Gala Dinner', activity: 'Attending', verified: true },
          { suspectId: 'suspect-6', location: 'Hotel Suite', activity: 'Setting up', verified: false }
        ]
      },
      {
        time: '8:35',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Chinese Embassy', activity: 'Monitoring communications', verified: true },
          { suspectId: 'suspect-2', location: 'Hotel Security', activity: 'On duty', verified: true },
          { suspectId: 'suspect-3', location: 'Summit Venue', activity: 'Protecting VP', verified: true },
          { suspectId: 'suspect-4', location: 'Office', activity: 'Preparing documents', verified: false },
          { suspectId: 'suspect-5', location: 'Gala Dinner', activity: 'Attending', verified: true },
          { suspectId: 'suspect-6', location: 'Hotel Suite Window', activity: 'Positioning rifle', verified: true }
        ]
      },
      {
        time: '8:42',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Chinese Embassy', activity: 'Monitoring communications', verified: true },
          { suspectId: 'suspect-2', location: 'Hotel Security', activity: 'On duty', verified: true },
          { suspectId: 'suspect-3', location: 'Summit Venue', activity: 'Protecting VP', verified: true },
          { suspectId: 'suspect-4', location: 'Office', activity: 'Preparing documents', verified: false },
          { suspectId: 'suspect-5', location: 'Gala Dinner', activity: 'Attending', verified: true },
          { suspectId: 'suspect-6', location: 'Hotel Suite Window', activity: 'Shooting Elena', verified: true }
        ]
      },
      {
        time: '8:45',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Chinese Embassy', activity: 'Monitoring communications', verified: true },
          { suspectId: 'suspect-2', location: 'Hotel Security', activity: 'On duty', verified: true },
          { suspectId: 'suspect-3', location: 'Summit Venue', activity: 'Protecting VP', verified: true },
          { suspectId: 'suspect-4', location: 'Office', activity: 'Preparing documents', verified: false },
          { suspectId: 'suspect-5', location: 'Gala Dinner', activity: 'Attending', verified: true },
          { suspectId: 'suspect-6', location: 'Hotel Suite', activity: 'Packing rifle', verified: false }
        ]
      },
      {
        time: '8:50',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Chinese Embassy', activity: 'Monitoring communications', verified: true },
          { suspectId: 'suspect-2', location: 'Hotel Security', activity: 'On duty', verified: true },
          { suspectId: 'suspect-3', location: 'Summit Venue', activity: 'Protecting VP', verified: true },
          { suspectId: 'suspect-4', location: 'Office', activity: 'Preparing documents', verified: false },
          { suspectId: 'suspect-5', location: 'Gala Dinner', activity: 'Attending', verified: true },
          { suspectId: 'suspect-6', location: 'Hotel Lobby', activity: 'Checking out', verified: true }
        ]
      }
    ],
    correctAnswer: 'suspect-6',
    explanation: 'Yuri, as a political rival, had the strongest motive. He publicly threatened Elena for months. The Soviet-era sniper rifle was found in his suite - a weapon only available to people with his connections. He checked out immediately after the assassination at 8:50 PM, and financial records show he paid his cousin Commander Volkov, who provided access.',
    timeLimit: 480,
    hintCount: 5,
    points: 400
  },

  // ============ LEVEL 11-15: EASY ============
  {
    id: 'mystery-011',
    level: 11,
    difficulty: 'easy',
    title: '🎈 The Stolen Balloon',
    description: 'Who took the rare helium balloon?',
    scenario: 'A rare collectible helium balloon disappeared from the school science fair. Four students were near the exhibit. The balloon was taken between 10:00 AM and 10:30 AM.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Nora',
        age: '10',
        occupation: 'Student',
        statement: 'I was watching the robot demonstration.',
        alibi: 'Robot demonstration log',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Oscar',
        age: '11',
        occupation: 'Student',
        statement: 'I was getting a drink at the water fountain.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-3',
        name: 'Paige',
        age: '10',
        occupation: 'Student',
        statement: 'I was helping my teacher set up.',
        alibi: 'Teacher confirms',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-4',
        name: 'Quinn',
        age: '11',
        occupation: 'Student',
        statement: 'I was in the restroom.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The balloon was last seen at 10:15 AM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 Oscar was seen by a parent heading toward the balloon exhibit at 10:10 AM.',
        type: 'alibi',
        relatedSuspect: 'suspect-2'
      },
      {
        id: 'clue-3',
        description: '🎈 A similar balloon was found in Oscar\'s backpack.',
        type: 'evidence',
        relatedSuspect: 'suspect-2'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Parent Testimony',
        icon: '👨',
        description: 'A parent confirms seeing Oscar walking toward the balloon exhibit at 10:10 AM.',
        cost: 15,
        location: 'Parent statement',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Balloon in Backpack',
        icon: '🎈',
        description: 'The rare helium balloon was found hidden in Oscar\'s backpack.',
        cost: 25,
        location: 'Oscar\'s backpack',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Robot Demo Log',
        icon: '🤖',
        description: 'Log shows Nora was watching the robot demonstration from 10:00 AM to 10:30 AM.',
        cost: 10,
        location: 'Teacher records',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Teacher Testimony',
        icon: '👩',
        description: 'Teacher confirms Paige was helping set up the science fair from 9:45 AM to 10:30 AM.',
        cost: 10,
        location: 'Teacher statement',
        collected: false
      }
    ],
    timeline: [
      {
        time: '10:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Robot Demo Area', activity: 'Watching demo', verified: true },
          { suspectId: 'suspect-2', location: 'Hallway', activity: 'Walking', verified: false },
          { suspectId: 'suspect-3', location: 'Setup Area', activity: 'Helping teacher', verified: true },
          { suspectId: 'suspect-4', location: 'Restroom', activity: 'In restroom', verified: false }
        ]
      },
      {
        time: '10:10',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Robot Demo Area', activity: 'Watching demo', verified: true },
          { suspectId: 'suspect-2', location: 'Near Balloon Exhibit', activity: 'Approaching', verified: true },
          { suspectId: 'suspect-3', location: 'Setup Area', activity: 'Helping teacher', verified: true },
          { suspectId: 'suspect-4', location: 'Restroom', activity: 'In restroom', verified: false }
        ]
      },
      {
        time: '10:15',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Robot Demo Area', activity: 'Watching demo', verified: true },
          { suspectId: 'suspect-2', location: 'Balloon Exhibit', activity: 'Taking balloon', verified: true },
          { suspectId: 'suspect-3', location: 'Setup Area', activity: 'Helping teacher', verified: true },
          { suspectId: 'suspect-4', location: 'Restroom', activity: 'In restroom', verified: false }
        ]
      },
      {
        time: '10:30',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Robot Demo Area', activity: 'Watching demo', verified: true },
          { suspectId: 'suspect-2', location: 'Classroom', activity: 'Hiding balloon', verified: false },
          { suspectId: 'suspect-3', location: 'Setup Area', activity: 'Helping teacher', verified: true },
          { suspectId: 'suspect-4', location: 'Classroom', activity: 'In class', verified: false }
        ]
      }
    ],
    correctAnswer: 'suspect-2',
    explanation: 'Oscar claimed to be at the water fountain, but a parent saw him heading toward the balloon exhibit at 10:10 AM. The balloon was taken at 10:15 AM and later found in his backpack.',
    timeLimit: 300,
    hintCount: 3,
    points: 150
  },
  {
    id: 'mystery-012',
    level: 12,
    difficulty: 'easy',
    title: '📖 The Lost Book',
    description: 'Who took the rare library book?',
    scenario: 'A valuable signed book disappeared from the library reference section. Four library patrons were in that area. The book was taken around 3:00 PM.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Robert',
        age: '25',
        occupation: 'Graduate Student',
        statement: 'I was at the computer lab researching.',
        alibi: 'Lab sign-in sheet',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Susan',
        age: '32',
        occupation: 'Professor',
        statement: 'I was in my office grading papers.',
        alibi: 'Office occupant',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Tom',
        age: '45',
        occupation: 'Businessman',
        statement: 'I was browsing the magazine section.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-4',
        name: 'Ursula',
        age: '28',
        occupation: 'Librarian',
        statement: 'I was at the circulation desk.',
        alibi: 'Security footage',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The book was last seen at 2:55 PM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 Tom was seen by a student near the reference section at 2:50 PM.',
        type: 'alibi',
        relatedSuspect: 'suspect-3'
      },
      {
        id: 'clue-3',
        description: '📚 Tom was browsing online bookstores for the same rare book that morning.',
        type: 'evidence',
        relatedSuspect: 'suspect-3'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Student Testimony',
        icon: '👨',
        description: 'A student confirms seeing Tom near the reference section at 2:50 PM, not browsing magazines.',
        cost: 15,
        location: 'Student statement',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Browser History',
        icon: '💻',
        description: 'Tom\'s browser history shows he was searching for the rare signed book on multiple book selling websites that morning.',
        cost: 25,
        location: 'Tom\'s phone',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Lab Sign-in Sheet',
        icon: '📋',
        description: 'Robert signed in to the computer lab at 2:30 PM and signed out at 3:30 PM. Confirmed by lab monitors.',
        cost: 15,
        location: 'Computer lab',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Security Footage',
        icon: '📹',
        description: 'Security footage shows Ursula at the circulation desk from 2:00 PM to 4:00 PM without leaving.',
        cost: 15,
        location: 'Library security',
        collected: false
      }
    ],
    timeline: [
      {
        time: '2:45',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Computer Lab', activity: 'Researching', verified: true },
          { suspectId: 'suspect-2', location: 'Office', activity: 'Grading papers', verified: true },
          { suspectId: 'suspect-3', location: 'Reference Section', activity: 'Browsing', verified: true },
          { suspectId: 'suspect-4', location: 'Circulation Desk', activity: 'Working', verified: true }
        ]
      },
      {
        time: '2:50',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Computer Lab', activity: 'Researching', verified: true },
          { suspectId: 'suspect-2', location: 'Office', activity: 'Grading papers', verified: true },
          { suspectId: 'suspect-3', location: 'Near Rare Book', activity: 'Examining', verified: true },
          { suspectId: 'suspect-4', location: 'Circulation Desk', activity: 'Working', verified: true }
        ]
      },
      {
        time: '2:55',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Computer Lab', activity: 'Researching', verified: true },
          { suspectId: 'suspect-2', location: 'Office', activity: 'Grading papers', verified: true },
          { suspectId: 'suspect-3', location: 'Reference Section', activity: 'Taking book', verified: true },
          { suspectId: 'suspect-4', location: 'Circulation Desk', activity: 'Working', verified: true }
        ]
      },
      {
        time: '3:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Computer Lab', activity: 'Researching', verified: true },
          { suspectId: 'suspect-2', location: 'Office', activity: 'Grading papers', verified: true },
          { suspectId: 'suspect-3', location: 'Magazine Section', activity: 'Browsing', verified: false },
          { suspectId: 'suspect-4', location: 'Circulation Desk', activity: 'Working', verified: true }
        ]
      }
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Tom claimed to be browsing magazines, but a student saw him near the reference section at 2:50 PM. His browser history shows he was searching for the same rare book that morning. He had opportunity and motive.',
    timeLimit: 300,
    hintCount: 3,
    points: 160
  },
  {
    id: 'mystery-013',
    level: 13,
    difficulty: 'easy',
    title: '🎨 The Missing Painting',
    description: 'Who stole the student art painting?',
    scenario: 'A student\'s painting was stolen from the school art gallery before the exhibition. Four students had access. The painting was taken during lunch break.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Alex',
        age: '16',
        occupation: 'Student Artist',
        statement: 'I was at the cafeteria eating lunch.',
        alibi: 'Friends confirm',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Bella',
        age: '15',
        occupation: 'Student',
        statement: 'I was in the art room working on my project.',
        alibi: 'Art room occupant',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-3',
        name: 'Chris',
        age: '17',
        occupation: 'Student',
        statement: 'I was at basketball practice.',
        alibi: 'Coach confirms',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-4',
        name: 'Diana',
        age: '16',
        occupation: 'Student',
        statement: 'I was studying in the library.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The painting was taken at 12:30 PM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 The art room was locked during lunch break.',
        type: 'alibi',
        relatedSuspect: 'suspect-2'
      },
      {
        id: 'clue-3',
        description: '🎨 Bella was jealous of the stolen painting because it won first place.',
        type: 'evidence',
        relatedSuspect: 'suspect-2'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Art Room Key',
        icon: '🔑',
        description: 'The art room key was in Bella\'s possession. She used a duplicate to access the room during lunch break.',
        cost: 20,
        location: 'Bella\'s locker',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Teacher Report',
        icon: '👩',
        description: 'Art teacher confirms the art room was locked during lunch break and Bella had a duplicate key.',
        cost: 20,
        location: 'Teacher statement',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Jealousy Incident',
        icon: '😤',
        description: 'Multiple students report Bella was jealous that the stolen painting won first place instead of hers.',
        cost: 15,
        location: 'Student statements',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Coach Testimony',
        icon: '🏀',
        description: 'Basketball coach confirms Chris was at practice from 12:00 PM to 1:00 PM.',
        cost: 10,
        location: 'Coach statement',
        collected: false
      }
    ],
    timeline: [
      {
        time: '12:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Cafeteria', activity: 'Eating lunch', verified: true },
          { suspectId: 'suspect-2', location: 'Art Room', activity: 'Working', verified: false },
          { suspectId: 'suspect-3', location: 'Gym', activity: 'Practice', verified: true },
          { suspectId: 'suspect-4', location: 'Library', activity: 'Studying', verified: false }
        ]
      },
      {
        time: '12:20',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Cafeteria', activity: 'Eating lunch', verified: true },
          { suspectId: 'suspect-2', location: 'Art Gallery', activity: 'Near painting', verified: true },
          { suspectId: 'suspect-3', location: 'Gym', activity: 'Practice', verified: true },
          { suspectId: 'suspect-4', location: 'Library', activity: 'Studying', verified: false }
        ]
      },
      {
        time: '12:30',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Cafeteria', activity: 'Eating lunch', verified: true },
          { suspectId: 'suspect-2', location: 'Art Gallery', activity: 'Taking painting', verified: true },
          { suspectId: 'suspect-3', location: 'Gym', activity: 'Practice', verified: true },
          { suspectId: 'suspect-4', location: 'Library', activity: 'Studying', verified: false }
        ]
      },
      {
        time: '12:45',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Cafeteria', activity: 'Eating lunch', verified: true },
          { suspectId: 'suspect-2', location: 'Art Room', activity: 'Hiding painting', verified: false },
          { suspectId: 'suspect-3', location: 'Gym', activity: 'Practice', verified: true },
          { suspectId: 'suspect-4', location: 'Library', activity: 'Studying', verified: false }
        ]
      }
    ],
    correctAnswer: 'suspect-2',
    explanation: 'Bella claimed to be in the art room, but it was locked during lunch break. She had a duplicate key. Her jealousy over the painting winning first place gave her motive.',
    timeLimit: 300,
    hintCount: 3,
    points: 170
  },
  {
    id: 'mystery-014',
    level: 14,
    difficulty: 'easy',
    title: '🏆 The Stolen Trophy',
    description: 'Who took the championship trophy?',
    scenario: 'The school championship trophy was stolen from the display case in the hallway. Four students were seen nearby. The theft happened after school.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Emma',
        age: '14',
        occupation: 'Cheerleader',
        statement: 'I was at cheer practice until 5:00 PM.',
        alibi: 'Coach confirms',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Frank',
        age: '15',
        occupation: 'Football Player',
        statement: 'I was in the weight room training.',
        alibi: 'Weight room log',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Grace',
        age: '14',
        occupation: 'Student',
        statement: 'I was in detention until 4:00 PM.',
        alibi: 'Teacher confirms',
        alibiVerified: true,
        alibiContradicted: true
      },
      {
        id: 'suspect-4',
        name: 'Henry',
        age: '15',
        occupation: 'Student',
        statement: 'I was at the computer club meeting.',
        alibi: 'Club president confirms',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The trophy was stolen at 3:45 PM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 Grace left detention early at 3:30 PM.',
        type: 'alibi',
        relatedSuspect: 'suspect-3'
      },
      {
        id: 'clue-3',
        description: '🏆 Grace was upset she didn\'t make the championship team.',
        type: 'evidence',
        relatedSuspect: 'suspect-3'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Detention Record',
        icon: '📝',
        description: 'Detention record shows Grace left early at 3:30 PM, claiming she had a doctor appointment.',
        cost: 20,
        location: 'School office',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Witness Statement',
        icon: '👀',
        description: 'A janitor saw Grace near the trophy display case at 3:40 PM.',
        cost: 15,
        location: 'Janitor statement',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Team Tryout Results',
        icon: '📋',
        description: 'Team tryout results show Grace was cut from the championship team, which explains her motivation.',
        cost: 15,
        location: 'Coach\'s office',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Cheer Practice Log',
        icon: '📣',
        description: 'Cheer practice log confirms Emma was at practice from 3:00 PM to 5:00 PM.',
        cost: 10,
        location: 'Coach\'s records',
        collected: false
      }
    ],
    timeline: [
      {
        time: '3:30',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Gym', activity: 'Cheer practice', verified: true },
          { suspectId: 'suspect-2', location: 'Weight Room', activity: 'Training', verified: true },
          { suspectId: 'suspect-3', location: 'Leaving Detention', activity: 'Leaving early', verified: true },
          { suspectId: 'suspect-4', location: 'Computer Lab', activity: 'Club meeting', verified: true }
        ]
      },
      {
        time: '3:40',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Gym', activity: 'Cheer practice', verified: true },
          { suspectId: 'suspect-2', location: 'Weight Room', activity: 'Training', verified: true },
          { suspectId: 'suspect-3', location: 'Near Trophy Case', activity: 'Examining', verified: true },
          { suspectId: 'suspect-4', location: 'Computer Lab', activity: 'Club meeting', verified: true }
        ]
      },
      {
        time: '3:45',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Gym', activity: 'Cheer practice', verified: true },
          { suspectId: 'suspect-2', location: 'Weight Room', activity: 'Training', verified: true },
          { suspectId: 'suspect-3', location: 'Trophy Display Case', activity: 'Taking trophy', verified: true },
          { suspectId: 'suspect-4', location: 'Computer Lab', activity: 'Club meeting', verified: true }
        ]
      },
      {
        time: '4:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Gym', activity: 'Cheer practice', verified: true },
          { suspectId: 'suspect-2', location: 'Weight Room', activity: 'Training', verified: true },
          { suspectId: 'suspect-3', location: 'Home', activity: 'With trophy', verified: false },
          { suspectId: 'suspect-4', location: 'Computer Lab', activity: 'Club meeting', verified: true }
        ]
      }
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Grace claimed to be in detention until 4:00 PM, but she left early at 3:30 PM. A janitor saw her near the trophy case at 3:40 PM, and the trophy was stolen at 3:45 PM. She was upset about not making the championship team.',
    timeLimit: 300,
    hintCount: 3,
    points: 175
  },
  {
    id: 'mystery-015',
    level: 15,
    difficulty: 'easy',
    title: '🎵 The Missing Violin',
    description: 'Who took the antique violin?',
    scenario: 'An antique violin disappeared from the music room before the school concert. Four students had access. The violin was taken during rehearsal break.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Iris',
        age: '16',
        occupation: 'Violinist',
        statement: 'I was in the practice room all break.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-2',
        name: 'Jack',
        age: '17',
        occupation: 'Pianist',
        statement: 'I was at the piano in the main hall.',
        alibi: 'Multiple witnesses',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Kate',
        age: '16',
        occupation: 'Cellist',
        statement: 'I was helping the music teacher organize music.',
        alibi: 'Teacher confirms',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-4',
        name: 'Leo',
        age: '17',
        occupation: 'Clarinetist',
        statement: 'I was in the restroom.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The violin was taken at 2:20 PM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 Iris was seen by a student entering the music room at 2:15 PM.',
        type: 'alibi',
        relatedSuspect: 'suspect-1'
      },
      {
        id: 'clue-3',
        description: '🎵 Iris had previously asked to borrow the violin but was refused.',
        type: 'evidence',
        relatedSuspect: 'suspect-1'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Student Testimony',
        icon: '👨',
        description: 'A student confirms seeing Iris entering the music room at 2:15 PM during break, not in the practice room.',
        cost: 15,
        location: 'Student statement',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Teacher Record',
        icon: '👩',
        description: 'Music teacher records show Iris asked to borrow the antique violin multiple times but was refused each time.',
        cost: 20,
        location: 'Teacher records',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Practice Room Log',
        icon: '📋',
        description: 'Practice room log shows Iris was signed in from 2:00 PM to 2:10 PM, then signed out. No one was in the practice room during break.',
        cost: 15,
        location: 'Music room records',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Main Hall Witnesses',
        icon: '👥',
        description: 'Multiple students and the music teacher confirm Jack was playing the piano in the main hall during the entire break.',
        cost: 10,
        location: 'Witness statements',
        collected: false
      }
    ],
    timeline: [
      {
        time: '2:10',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Practice Room', activity: 'Practicing', verified: true },
          { suspectId: 'suspect-2', location: 'Main Hall', activity: 'Playing piano', verified: true },
          { suspectId: 'suspect-3', location: 'Music Office', activity: 'Helping teacher', verified: true },
          { suspectId: 'suspect-4', location: 'Restroom', activity: 'In restroom', verified: false }
        ]
      },
      {
        time: '2:15',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Music Room', activity: 'Entering room', verified: true },
          { suspectId: 'suspect-2', location: 'Main Hall', activity: 'Playing piano', verified: true },
          { suspectId: 'suspect-3', location: 'Music Office', activity: 'Helping teacher', verified: true },
          { suspectId: 'suspect-4', location: 'Restroom', activity: 'In restroom', verified: false }
        ]
      },
      {
        time: '2:20',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Music Room', activity: 'Taking violin', verified: true },
          { suspectId: 'suspect-2', location: 'Main Hall', activity: 'Playing piano', verified: true },
          { suspectId: 'suspect-3', location: 'Music Office', activity: 'Helping teacher', verified: true },
          { suspectId: 'suspect-4', location: 'Restroom', activity: 'In restroom', verified: false }
        ]
      },
      {
        time: '2:30',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Practice Room', activity: 'Hiding violin', verified: false },
          { suspectId: 'suspect-2', location: 'Main Hall', activity: 'Playing piano', verified: true },
          { suspectId: 'suspect-3', location: 'Music Office', activity: 'Helping teacher', verified: true },
          { suspectId: 'suspect-4', location: 'Restroom', activity: 'In restroom', verified: false }
        ]
      }
    ],
    correctAnswer: 'suspect-1',
    explanation: 'Iris claimed to be in the practice room during break, but a student saw her entering the music room at 2:15 PM. She had previously been refused permission to borrow the violin and wanted it badly enough to steal it.',
    timeLimit: 300,
    hintCount: 3,
    points: 180
  },

  // ============ LEVEL 16-35: MEDIUM ============
  {
    id: 'mystery-016',
    level: 16,
    difficulty: 'medium',
    title: '🎬 The Stolen Script',
    description: 'Who leaked the movie script?',
    scenario: 'A confidential movie script was leaked online before release. Four people had access. The leak occurred during production week.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Director Miller',
        age: '52',
        occupation: 'Film Director',
        statement: 'I was in the editing suite all week.',
        alibi: 'Editor confirms',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Sarah Chen',
        age: '31',
        occupation: 'Script Supervisor',
        statement: 'I was at home reviewing changes.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-3',
        name: 'Tom Baker',
        age: '38',
        occupation: 'Producer',
        statement: 'I was on set filming all day.',
        alibi: 'Film crew confirms',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-4',
        name: 'Lisa Wong',
        age: '28',
        occupation: 'Assistant',
        statement: 'I was organizing files in my office.',
        alibi: 'Office log shows',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The script was uploaded at 11:23 AM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 Sarah was seen at a coffee shop using a laptop at 11:00 AM.',
        type: 'alibi',
        relatedSuspect: 'suspect-2'
      },
      {
        id: 'clue-3',
        description: '💻 Sarah recently applied for a job with a competitor studio.',
        type: 'evidence',
        relatedSuspect: 'suspect-2'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Coffee Shop Security',
        icon: '☕',
        description: 'Security footage shows Sarah at coffee shop with a laptop at 11:00 AM, just 23 minutes before the script was uploaded.',
        cost: 25,
        location: 'Coffee shop',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'IP Address Log',
        icon: '🌐',
        description: 'The script was uploaded from a public Wi-Fi IP at the coffee shop where Sarah was seen.',
        cost: 30,
        location: 'Server logs',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Competitor Job Application',
        icon: '📝',
        description: 'Sarah applied for a job at a rival studio that offered a bonus for bringing exclusive scripts.',
        cost: 35,
        location: 'HR records',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Editor Testimony',
        icon: '👨',
        description: 'The editor confirms Director Miller was in the editing suite from 9:00 AM to 5:00 PM.',
        cost: 20,
        location: 'Studio',
        collected: false
      }
    ],
    timeline: [
      {
        time: '10:30',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Editing Suite', activity: 'Editing', verified: true },
          { suspectId: 'suspect-2', location: 'Home', activity: 'Claimed: reviewing changes', verified: false },
          { suspectId: 'suspect-3', location: 'Film Set', activity: 'Filming', verified: true },
          { suspectId: 'suspect-4', location: 'Office', activity: 'Organizing files', verified: true }
        ]
      },
      {
        time: '11:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Editing Suite', activity: 'Editing', verified: true },
          { suspectId: 'suspect-2', location: 'Coffee Shop', activity: 'Using laptop', verified: true },
          { suspectId: 'suspect-3', location: 'Film Set', activity: 'Filming', verified: true },
          { suspectId: 'suspect-4', location: 'Office', activity: 'Organizing files', verified: true }
        ]
      },
      {
        time: '11:23',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Editing Suite', activity: 'Editing', verified: true },
          { suspectId: 'suspect-2', location: 'Coffee Shop', activity: 'Uploading script', verified: true },
          { suspectId: 'suspect-3', location: 'Film Set', activity: 'Filming', verified: true },
          { suspectId: 'suspect-4', location: 'Office', activity: 'Organizing files', verified: true }
        ]
      },
      {
        time: '12:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Editing Suite', activity: 'Editing', verified: true },
          { suspectId: 'suspect-2', location: 'Home', activity: 'Back home', verified: false },
          { suspectId: 'suspect-3', location: 'Film Set', activity: 'Filming', verified: true },
          { suspectId: 'suspect-4', location: 'Office', activity: 'Organizing files', verified: true }
        ]
      }
    ],
    correctAnswer: 'suspect-2',
    explanation: 'Sarah claimed to be at home reviewing changes, but she was seen at a coffee shop with a laptop at 11:00 AM. The script was uploaded at 11:23 AM from that same coffee shop IP address. She had applied for a job at a competitor studio that offered bonuses for exclusive scripts.',
    timeLimit: 360,
    hintCount: 3,
    points: 200
  },
  {
    id: 'mystery-017',
    level: 17,
    difficulty: 'medium',
    title: '🏊 The Stolen Necklace',
    description: 'Who stole the diamond necklace?',
    scenario: 'A $2 million diamond necklace disappeared from a hotel safe during a charity gala. Four guests were seen near the VIP room.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Barbara Jones',
        age: '45',
        occupation: 'Philanthropist',
        statement: 'I was mingling with guests all evening.',
        alibi: 'Multiple witnesses',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Marcus Wright',
        age: '38',
        occupation: 'Businessman',
        statement: 'I was at the bar getting drinks.',
        alibi: 'Bartender confirms',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Elena Rodriguez',
        age: '34',
        occupation: 'Event Coordinator',
        statement: 'I was coordinating the main ballroom.',
        alibi: 'Staff confirms',
        alibiVerified: true,
        alibiContradicted: true
      },
      {
        id: 'suspect-4',
        name: 'David Kim',
        age: '42',
        occupation: 'Hotel Manager',
        statement: 'I was checking on kitchen operations.',
        alibi: 'Kitchen staff confirms',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The necklace was stolen at 8:45 PM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 Elena was seen entering the VIP room at 8:40 PM.',
        type: 'alibi',
        relatedSuspect: 'suspect-3'
      },
      {
        id: 'clue-3',
        description: '🔑 Elena had the safe code as event coordinator.',
        type: 'evidence',
        relatedSuspect: 'suspect-3'
      },
      {
        id: 'clue-4',
        description: '💰 Elena has large gambling debts.',
        type: 'evidence',
        relatedSuspect: 'suspect-3'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'VIP Room Security',
        icon: '📹',
        description: 'Security footage shows Elena entering the VIP room at 8:40 PM and leaving at 8:50 PM, just after the necklace was stolen.',
        cost: 25,
        location: 'Hotel security',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Safe Access Log',
        icon: '🔐',
        description: 'The safe was opened at 8:45 PM using the event coordinator code, which Elena had access to.',
        cost: 30,
        location: 'Hotel safe',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Debt Records',
        icon: '📊',
        description: 'Financial records show Elena has gambling debts of $150,000. The stolen necklace is worth much more.',
        cost: 35,
        location: 'Private investigator',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Bartender Testimony',
        icon: '🍺',
        description: 'The bartender confirms Marcus was at the bar from 8:00 PM to 9:00 PM.',
        cost: 20,
        location: 'Hotel bar',
        collected: false
      }
    ],
    timeline: [
      {
        time: '8:30',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Main Ballroom', activity: 'Mingling', verified: true },
          { suspectId: 'suspect-2', location: 'Hotel Bar', activity: 'Getting drinks', verified: true },
          { suspectId: 'suspect-3', location: 'Main Ballroom', activity: 'Coordinating', verified: true },
          { suspectId: 'suspect-4', location: 'Kitchen', activity: 'Checking operations', verified: true }
        ]
      },
      {
        time: '8:40',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Main Ballroom', activity: 'Mingling', verified: true },
          { suspectId: 'suspect-2', location: 'Hotel Bar', activity: 'Getting drinks', verified: true },
          { suspectId: 'suspect-3', location: 'VIP Room Hallway', activity: 'Approaching', verified: true },
          { suspectId: 'suspect-4', location: 'Kitchen', activity: 'Checking operations', verified: true }
        ]
      },
      {
        time: '8:45',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Main Ballroom', activity: 'Mingling', verified: true },
          { suspectId: 'suspect-2', location: 'Hotel Bar', activity: 'Getting drinks', verified: true },
          { suspectId: 'suspect-3', location: 'VIP Room', activity: 'Stealing necklace', verified: true },
          { suspectId: 'suspect-4', location: 'Kitchen', activity: 'Checking operations', verified: true }
        ]
      },
      {
        time: '8:50',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Main Ballroom', activity: 'Mingling', verified: true },
          { suspectId: 'suspect-2', location: 'Hotel Bar', activity: 'Getting drinks', verified: true },
          { suspectId: 'suspect-3', location: 'Main Ballroom', activity: 'Back at work', verified: false },
          { suspectId: 'suspect-4', location: 'Kitchen', activity: 'Checking operations', verified: true }
        ]
      }
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Elena claimed to be coordinating the main ballroom, but security footage shows her entering the VIP room at 8:40 PM. The necklace was stolen at 8:45 PM. She had the safe code and motive - large gambling debts.',
    timeLimit: 360,
    hintCount: 4,
    points: 220
  },
  {
    id: 'mystery-018',
    level: 18,
    difficulty: 'medium',
    title: '🏛️ The Stolen Medal',
    description: 'Who stole the Olympic medal?',
    scenario: 'A gold medal was stolen from the athlete\'s dorm room during training camp. Four athletes had access.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Jake Thompson',
        age: '24',
        occupation: 'Swimmer',
        statement: 'I was at the pool training all morning.',
        alibi: 'Coach confirms',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Emily Davis',
        age: '23',
        occupation: 'Gymnast',
        statement: 'I was at the gym practicing.',
        alibi: 'Gym monitor confirms',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Chris Miller',
        age: '25',
        occupation: 'Runner',
        statement: 'I was in my room resting.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-4',
        name: 'Sarah Lee',
        age: '22',
        occupation: 'Diver',
        statement: 'I was at the diving pool.',
        alibi: 'Multiple witnesses',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The medal was stolen at 10:15 AM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 Chris was seen by a teammate leaving the dorm hallway at 10:05 AM.',
        type: 'alibi',
        relatedSuspect: 'suspect-3'
      },
      {
        id: 'clue-3',
        description: '😤 Chris had previously lost to Jake in competition.',
        type: 'evidence',
        relatedSuspect: 'suspect-3'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Teammate Testimony',
        icon: '🏃',
        description: 'A teammate saw Chris leaving the dorm hallway near Jake\'s room at 10:05 AM.',
        cost: 20,
        location: 'Athlete statement',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Competition Records',
        icon: '🏆',
        description: 'Records show Chris lost to Jake in the last competition, creating tension between them.',
        cost: 25,
        location: 'Competition archives',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Pool Coach Testimony',
        icon: '🏊',
        description: 'The swimming coach confirms Jake was at the pool training from 9:00 AM to 11:00 AM.',
        cost: 20,
        location: 'Swimming pool',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Diving Coach Testimony',
        icon: '🏊‍♀️',
        description: 'The diving coach confirms Sarah was at the diving pool from 9:30 AM to 11:00 AM.',
        cost: 20,
        location: 'Diving pool',
        collected: false
      }
    ],
    timeline: [
      {
        time: '10:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Swimming Pool', activity: 'Training', verified: true },
          { suspectId: 'suspect-2', location: 'Gym', activity: 'Practicing', verified: true },
          { suspectId: 'suspect-3', location: 'Room', activity: 'Resting', verified: false },
          { suspectId: 'suspect-4', location: 'Diving Pool', activity: 'Practicing', verified: true }
        ]
      },
      {
        time: '10:05',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Swimming Pool', activity: 'Training', verified: true },
          { suspectId: 'suspect-2', location: 'Gym', activity: 'Practicing', verified: true },
          { suspectId: 'suspect-3', location: 'Dorm Hallway', activity: 'Near Jake\'s room', verified: true },
          { suspectId: 'suspect-4', location: 'Diving Pool', activity: 'Practicing', verified: true }
        ]
      },
      {
        time: '10:15',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Swimming Pool', activity: 'Training', verified: true },
          { suspectId: 'suspect-2', location: 'Gym', activity: 'Practicing', verified: true },
          { suspectId: 'suspect-3', location: 'Jake\'s Room', activity: 'Stealing medal', verified: true },
          { suspectId: 'suspect-4', location: 'Diving Pool', activity: 'Practicing', verified: true }
        ]
      },
      {
        time: '10:30',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Swimming Pool', activity: 'Training', verified: true },
          { suspectId: 'suspect-2', location: 'Gym', activity: 'Practicing', verified: true },
          { suspectId: 'suspect-3', location: 'Room', activity: 'Hiding medal', verified: false },
          { suspectId: 'suspect-4', location: 'Diving Pool', activity: 'Practicing', verified: true }
        ]
      }
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Chris claimed to be resting in his room, but a teammate saw him near Jake\'s room at 10:05 AM. The medal was stolen at 10:15 AM. He had motive - he previously lost to Jake in competition.',
    timeLimit: 360,
    hintCount: 3,
    points: 230
  },
  {
    id: 'mystery-019',
    level: 19,
    difficulty: 'medium',
    title: '🏎️ The Stolen Trophy',
    description: 'Who stole the championship trophy?',
    scenario: 'A championship trophy was stolen from the team\'s locker room before the final game. Four team members had access.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Mike Johnson',
        age: '28',
        occupation: 'Team Captain',
        statement: 'I was in strategy meetings all afternoon.',
        alibi: 'Coach confirms',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Lisa Park',
        age: '24',
        occupation: 'Star Player',
        statement: 'I was warming up on the field.',
        alibi: 'Multiple teammates confirm',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Tom Wilson',
        age: '27',
        occupation: 'Reserve Player',
        statement: 'I was getting tape from the training room.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-4',
        name: 'Anna Martinez',
        age: '25',
        occupation: 'Trainer',
        statement: 'I was treating injured players.',
        alibi: 'Multiple players confirm',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The trophy was stolen at 2:35 PM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 Tom was seen entering the locker room at 2:25 PM.',
        type: 'alibi',
        relatedSuspect: 'suspect-3'
      },
      {
        id: 'clue-3',
        description: '😤 Tom was upset he didn\'t make the starting lineup.',
        type: 'evidence',
        relatedSuspect: 'suspect-3'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Locker Room Security',
        icon: '📹',
        description: 'Security footage shows Tom entering the locker room at 2:25 PM and leaving at 2:40 PM, just after the trophy was stolen.',
        cost: 25,
        location: 'Locker room',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Team Roster',
        icon: '📋',
        description: 'The official team roster shows Tom was a reserve player and not in the starting lineup.',
        cost: 20,
        location: 'Team records',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Player Complaints',
        icon: '😤',
        description: 'Multiple teammates report Tom was upset about not making the starting lineup.',
        cost: 15,
        location: 'Player statements',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Coach Testimony',
        icon: '🏀',
        description: 'The coach confirms Mike was in strategy meetings from 2:00 PM to 3:00 PM.',
        cost: 20,
        location: 'Coach\'s office',
        collected: false
      }
    ],
    timeline: [
      {
        time: '2:20',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Strategy Room', activity: 'In meetings', verified: true },
          { suspectId: 'suspect-2', location: 'Field', activity: 'Warming up', verified: true },
          { suspectId: 'suspect-3', location: 'Training Room', activity: 'Claimed: getting tape', verified: false },
          { suspectId: 'suspect-4', location: 'Training Room', activity: 'Treating players', verified: true }
        ]
      },
      {
        time: '2:25',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Strategy Room', activity: 'In meetings', verified: true },
          { suspectId: 'suspect-2', location: 'Field', activity: 'Warming up', verified: true },
          { suspectId: 'suspect-3', location: 'Locker Room Hallway', activity: 'Entering', verified: true },
          { suspectId: 'suspect-4', location: 'Training Room', activity: 'Treating players', verified: true }
        ]
      },
      {
        time: '2:35',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Strategy Room', activity: 'In meetings', verified: true },
          { suspectId: 'suspect-2', location: 'Field', activity: 'Warming up', verified: true },
          { suspectId: 'suspect-3', location: 'Locker Room', activity: 'Stealing trophy', verified: true },
          { suspectId: 'suspect-4', location: 'Training Room', activity: 'Treating players', verified: true }
        ]
      },
      {
        time: '2:40',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Strategy Room', activity: 'In meetings', verified: true },
          { suspectId: 'suspect-2', location: 'Field', activity: 'Warming up', verified: true },
          { suspectId: 'suspect-3', location: 'Training Room', activity: 'Back with tape', verified: false },
          { suspectId: 'suspect-4', location: 'Training Room', activity: 'Treating players', verified: true }
        ]
      }
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Tom claimed to be getting tape from the training room, but security footage shows him entering the locker room at 2:25 PM. The trophy was stolen at 2:35 PM. He was upset about not making the starting lineup.',
    timeLimit: 360,
    hintCount: 3,
    points: 240
  },
  {
    id: 'mystery-020',
    level: 20,
    difficulty: 'medium',
    title: '💍 The Stolen Gem',
    description: 'Who stole the rare gem?',
    scenario: 'A rare emerald was stolen from a jewelry store during opening hours. Three employees and one customer were present.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Alice Chen',
        age: '32',
        occupation: 'Store Manager',
        statement: 'I was in my office doing paperwork.',
        alibi: 'Office camera shows',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Bob Williams',
        age: '28',
        occupation: 'Sales Associate',
        statement: 'I was helping customers at the front counter.',
        alibi: 'Multiple customers confirm',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Carol Davis',
        age: '35',
        occupation: 'Security Guard',
        statement: 'I was patrolling the store perimeter.',
        alibi: 'Patrol log shows',
        alibiVerified: true,
        alibiContradicted: true
      },
      {
        id: 'suspect-4',
        name: 'David Park',
        age: '40',
        occupation: 'Customer',
        statement: 'I was browsing jewelry cases.',
        alibi: 'Store footage shows',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      {
        id: 'clue-1',
        description: '⏱️ The gem was stolen at 11:17 AM.',
        type: 'time'
      },
      {
        id: 'clue-2',
        description: '📍 Carol entered the display room at 11:10 AM.',
        type: 'alibi',
        relatedSuspect: 'suspect-3'
      },
      {
        id: 'clue-3',
        description: '🔑 Carol has keys to all display cases.',
        type: 'evidence',
        relatedSuspect: 'suspect-3'
      },
      {
        id: 'clue-4',
        description: '💰 Carol has large credit card debt.',
        type: 'evidence',
        relatedSuspect: 'suspect-3'
      }
    ],
    evidence: [
      {
        id: 'ev-1',
        name: 'Display Room Security',
        icon: '📹',
        description: 'Security footage shows Carol entering the display room at 11:10 AM and leaving at 11:20 AM, just after the gem was stolen.',
        cost: 25,
        location: 'Store security',
        collected: false
      },
      {
        id: 'ev-2',
        name: 'Key Registry',
        icon: '🔑',
        description: 'The key registry shows Carol has master keys to all display cases in the store.',
        cost: 30,
        location: 'Store records',
        collected: false
      },
      {
        id: 'ev-3',
        name: 'Credit Report',
        icon: '💳',
        description: 'Financial records show Carol has $25,000 in credit card debt. The stolen emerald is worth much more.',
        cost: 35,
        location: 'Credit agency',
        collected: false
      },
      {
        id: 'ev-4',
        name: 'Customer Statements',
        icon: '👥',
        description: 'Multiple customers confirm Bob was helping them at the front counter from 11:00 AM to 12:00 PM.',
        cost: 20,
        location: 'Customer statements',
        collected: false
      }
    ],
    timeline: [
      {
        time: '11:00',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Office', activity: 'Paperwork', verified: true },
          { suspectId: 'suspect-2', location: 'Front Counter', activity: 'Helping customers', verified: true },
          { suspectId: 'suspect-3', location: 'Perimeter', activity: 'Patrolling', verified: true },
          { suspectId: 'suspect-4', location: 'Browsing Area', activity: 'Browsing', verified: true }
        ]
      },
      {
        time: '11:10',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Office', activity: 'Paperwork', verified: true },
          { suspectId: 'suspect-2', location: 'Front Counter', activity: 'Helping customers', verified: true },
          { suspectId: 'suspect-3', location: 'Display Room', activity: 'Entering', verified: true },
          { suspectId: 'suspect-4', location: 'Browsing Area', activity: 'Browsing', verified: true }
        ]
      },
      {
        time: '11:17',
        crimeTime: true,
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Office', activity: 'Paperwork', verified: true },
          { suspectId: 'suspect-2', location: 'Front Counter', activity: 'Helping customers', verified: true },
          { suspectId: 'suspect-3', location: 'Display Room', activity: 'Stealing gem', verified: true },
          { suspectId: 'suspect-4', location: 'Browsing Area', activity: 'Browsing', verified: true }
        ]
      },
      {
        time: '11:20',
        suspectLocations: [
          { suspectId: 'suspect-1', location: 'Office', activity: 'Paperwork', verified: true },
          { suspectId: 'suspect-2', location: 'Front Counter', activity: 'Helping customers', verified: true },
          { suspectId: 'suspect-3', location: 'Perimeter', activity: 'Patrolling', verified: false },
          { suspectId: 'suspect-4', location: 'Browsing Area', activity: 'Browsing', verified: true }
        ]
      }
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Carol claimed to be patrolling the perimeter, but security footage shows her entering the display room at 11:10 AM. The gem was stolen at 11:17 AM. She had keys to all display cases and motive - large credit card debt.',
    timeLimit: 360,
    hintCount: 4,
    points: 250
  },
  {
    id: 'mystery-021',
    level: 21,
    difficulty: 'medium',
    title: '🎨 The Stolen Painting',
    description: 'Who stole artwork from gallery?',
    scenario: 'A valuable painting was stolen from an art gallery during exhibition. Four suspects had access.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Gallery Director',
        age: '55',
        occupation: 'Director',
        statement: 'I was in my office all morning.',
        alibi: 'Office camera shows',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Art Dealer',
        age: '42',
        occupation: 'Dealer',
        statement: 'I was examining other paintings.',
        alibi: 'Security footage',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Gallery Guard',
        age: '38',
        occupation: 'Security',
        statement: 'I was patrolling the east wing.',
        alibi: 'Patrol log shows',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-4',
        name: 'Curator',
        age: '48',
        occupation: 'Curator',
        statement: 'I was giving guided tours.',
        alibi: 'Tour group confirms',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ The painting was stolen at 10:32 AM.', type: 'time' },
      { id: 'clue-2', description: '📍 The gallery guard was seen near the painting at 10:28 AM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 The guard had large gambling debts.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Only guards had keys to display cases.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Security Footage', icon: '📹', description: 'Footage shows the guard near the stolen painting at 10:28 AM, just 4 minutes before it was stolen.', cost: 25, location: 'Gallery security', collected: false },
      { id: 'ev-2', name: 'Debt Records', icon: '📊', description: 'Financial records show the guard has $45,000 in gambling debts.', cost: 35, location: 'Private investigator', collected: false },
      { id: 'ev-3', name: 'Key Registry', icon: '🔑', description: 'Only security guards had keys to open display cases.', cost: 30, location: 'Gallery records', collected: false },
      { id: 'ev-4', name: 'Director Testimony', icon: '👨', description: 'The director was in his office on camera from 9:00 AM to 11:00 AM.', cost: 20, location: 'Gallery office', collected: false }
    ],
    timeline: [
      { time: '10:20', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Gallery', activity: 'Examining', verified: true },
        { suspectId: 'suspect-3', location: 'East Wing', activity: 'Patrolling', verified: false },
        { suspectId: 'suspect-4', location: 'Gallery', activity: 'Giving tours', verified: true }
      ]},
      { time: '10:28', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Gallery', activity: 'Examining', verified: true },
        { suspectId: 'suspect-3', location: 'Near Painting', activity: 'Near display', verified: true },
        { suspectId: 'suspect-4', location: 'Gallery', activity: 'Giving tours', verified: true }
      ]},
      { time: '10:32', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Gallery', activity: 'Examining', verified: true },
        { suspectId: 'suspect-3', location: 'Display Case', activity: 'Stealing painting', verified: true },
        { suspectId: 'suspect-4', location: 'Gallery', activity: 'Giving tours', verified: true }
      ]},
      { time: '10:40', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Gallery', activity: 'Examining', verified: true },
        { suspectId: 'suspect-3', location: 'East Wing', activity: 'Patrolling', verified: false },
        { suspectId: 'suspect-4', location: 'Gallery', activity: 'Giving tours', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'The guard claimed to be patrolling the east wing, but security footage shows him near the painting at 10:28 AM. The painting was stolen at 10:32 AM. He had keys to display cases and large gambling debts for motive.',
    timeLimit: 360,
    hintCount: 3,
    points: 260
  },
  {
    id: 'mystery-022',
    level: 22,
    difficulty: 'medium',
    title: '📚️ The Stolen Book',
    description: 'Who stole rare manuscript from library?',
    scenario: 'A rare manuscript was stolen from a university library. Four people had access.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Professor Adams',
        age: '52',
        occupation: 'Professor',
        statement: 'I was lecturing all morning.',
        alibi: 'Class attendance',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Graduate Student',
        age: '28',
        occupation: 'Student',
        statement: 'I was in the study room.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-3',
        name: 'Librarian',
        age: '45',
        occupation: 'Librarian',
        statement: 'I was at the circulation desk.',
        alibi: 'Desk camera shows',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-4',
        name: 'Researcher',
        age: '38',
        occupation: 'Researcher',
        statement: 'I was in the archives.',
        alibi: 'Archive log shows',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ The manuscript was stolen at 2:18 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 The student was seen near special collections at 2:12 PM.', type: 'alibi', relatedSuspect: 'suspect-2' },
      { id: 'clue-3', description: '📝 The student needed to publish to graduate.', type: 'evidence', relatedSuspect: 'suspect-2' },
      { id: 'clue-4', description: '🔑 The student had temporary access to special collections.', type: 'evidence', relatedSuspect: 'suspect-2' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Library Camera', icon: '📹', description: 'Camera footage shows the student near special collections at 2:12 PM.', cost: 25, location: 'Library security', collected: false },
      { id: 'ev-2', name: 'Academic Records', icon: '📝', description: 'Academic records show the student needed to publish to graduate this semester.', cost: 30, location: 'University records', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '📋', description: 'The access log shows the student was granted temporary access to special collections.', cost: 25, location: 'Library records', collected: false },
      { id: 'ev-4', name: 'Class Attendance', icon: '👥', description: 'Class attendance confirms Professor Adams was lecturing from 2:00 PM to 3:00 PM.', cost: 20, location: 'Classroom', collected: false }
    ],
    timeline: [
      { time: '2:05', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Classroom', activity: 'Lecturing', verified: true },
        { suspectId: 'suspect-2', location: 'Study Room', activity: 'Claimed: studying', verified: false },
        { suspectId: 'suspect-3', location: 'Circulation Desk', activity: 'Working', verified: true },
        { suspectId: 'suspect-4', location: 'Archives', activity: 'Researching', verified: true }
      ]},
      { time: '2:12', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Classroom', activity: 'Lecturing', verified: true },
        { suspectId: 'suspect-2', location: 'Special Collections', activity: 'Near manuscript', verified: true },
        { suspectId: 'suspect-3', location: 'Circulation Desk', activity: 'Working', verified: true },
        { suspectId: 'suspect-4', location: 'Archives', activity: 'Researching', verified: true }
      ]},
      { time: '2:18', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Classroom', activity: 'Lecturing', verified: true },
        { suspectId: 'suspect-2', location: 'Special Collections', activity: 'Stealing manuscript', verified: true },
        { suspectId: 'suspect-3', location: 'Circulation Desk', activity: 'Working', verified: true },
        { suspectId: 'suspect-4', location: 'Archives', activity: 'Researching', verified: true }
      ]},
      { time: '2:30', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Classroom', activity: 'Lecturing', verified: true },
        { suspectId: 'suspect-2', location: 'Study Room', activity: 'Studying', verified: false },
        { suspectId: 'suspect-3', location: 'Circulation Desk', activity: 'Working', verified: true },
        { suspectId: 'suspect-4', location: 'Archives', activity: 'Researching', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-2',
    explanation: 'The student claimed to be in the study room, but camera footage shows them near special collections at 2:12 PM. The manuscript was stolen at 2:18 PM. They had temporary access and motive - needing to publish to graduate.',
    timeLimit: 360,
    hintCount: 3,
    points: 270
  },
  {
    id: 'mystery-023',
    level: 23,
    difficulty: 'medium',
    title: '💻️ The Stolen Laptop',
    description: 'Who stole laptop from office?',
    scenario: 'A company laptop with confidential data was stolen from an office.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Manager',
        age: '45',
        occupation: 'Department Manager',
        statement: 'I was in meetings all morning.',
        alibi: 'Meeting minutes',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Intern',
        age: '23',
        occupation: 'Intern',
        statement: 'I was at my desk working.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-3',
        name: 'Senior Developer',
        age: '35',
        occupation: 'Developer',
        statement: 'I was coding in my office.',
        alibi: 'Git commits show',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-4',
        name: 'HR Manager',
        age: '42',
        occupation: 'HR Manager',
        statement: 'I was interviewing candidates.',
        alibi: 'Interview schedule',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ The laptop was stolen at 11:27 AM.', type: 'time' },
      { id: 'clue-2', description: '📍 The intern was seen near the manager\'s office at 11:20 AM.', type: 'alibi', relatedSuspect: 'suspect-2' },
      { id: 'clue-3', description: '💰 The intern has significant debts.', type: 'evidence', relatedSuspect: 'suspect-2' },
      { id: 'clue-4', description: '🔗 The intern was seen talking to competitor recruiter.', type: 'evidence', relatedSuspect: 'suspect-2' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Office Camera', icon: '📹', description: 'Office camera shows the intern near the manager\'s office at 11:20 AM.', cost: 25, location: 'Office security', collected: false },
      { id: 'ev-2', name: 'Financial Records', icon: '📊', description: 'Financial records show the intern has $30,000 in debts.', cost: 30, location: 'Background check', collected: false },
      { id: 'ev-3', name: 'Recruiter Contact', icon: '🔗', description: 'The intern was seen having lunch with a competitor recruiter last week.', cost: 25, location: 'Restaurant', collected: false },
      { id: 'ev-4', name: 'Meeting Minutes', icon: '📝', description: 'Meeting minutes confirm the manager was in meetings from 10:00 AM to 12:00 PM.', cost: 20, location: 'Meeting room', collected: false }
    ],
    timeline: [
      { time: '11:15', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Meeting Room', activity: 'In meetings', verified: true },
        { suspectId: 'suspect-2', location: 'Desk', activity: 'Claimed: working', verified: false },
        { suspectId: 'suspect-3', location: 'Office', activity: 'Coding', verified: true },
        { suspectId: 'suspect-4', location: 'Interview Room', activity: 'Interviewing', verified: true }
      ]},
      { time: '11:20', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Meeting Room', activity: 'In meetings', verified: true },
        { suspectId: 'suspect-2', location: 'Near Manager Office', activity: 'Near office', verified: true },
        { suspectId: 'suspect-3', location: 'Office', activity: 'Coding', verified: true },
        { suspectId: 'suspect-4', location: 'Interview Room', activity: 'Interviewing', verified: true }
      ]},
      { time: '11:27', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Meeting Room', activity: 'In meetings', verified: true },
        { suspectId: 'suspect-2', location: 'Manager Office', activity: 'Stealing laptop', verified: true },
        { suspectId: 'suspect-3', location: 'Office', activity: 'Coding', verified: true },
        { suspectId: 'suspect-4', location: 'Interview Room', activity: 'Interviewing', verified: true }
      ]},
      { time: '11:35', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Meeting Room', activity: 'In meetings', verified: true },
        { suspectId: 'suspect-2', location: 'Desk', activity: 'Working', verified: false },
        { suspectId: 'suspect-3', location: 'Office', activity: 'Coding', verified: true },
        { suspectId: 'suspect-4', location: 'Interview Room', activity: 'Interviewing', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-2',
    explanation: 'The intern claimed to be at their desk, but office camera shows them near the manager\'s office at 11:20 AM. The laptop was stolen at 11:27 AM. They have significant debts and were seen with a competitor recruiter.',
    timeLimit: 360,
    hintCount: 3,
    points: 280
  },
  {
    id: 'mystery-024',
    level: 24,
    difficulty: 'medium',
    title: '🎸️ The Stolen Guitar',
    description: 'Who stole guitar from studio?',
    scenario: 'A vintage guitar was stolen from a recording studio. Four people had access.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Studio Owner',
        age: '52',
        occupation: 'Owner',
        statement: 'I was in my office.',
        alibi: 'Office camera shows',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Musician A',
        age: '31',
        occupation: 'Musician',
        statement: 'I was recording in Studio B.',
        alibi: 'Recording log',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Studio Manager',
        age: '38',
        occupation: 'Manager',
        statement: 'I was organizing equipment.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-4',
        name: 'Musician B',
        age: '28',
        occupation: 'Musician',
        statement: 'I was in the lounge.',
        alibi: 'Lounge camera shows',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ The guitar was stolen at 3:15 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 The manager was seen near the guitar at 3:08 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 The manager sold instruments online before.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 The manager had keys to all rooms.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Studio Camera', icon: '📹', description: 'Studio camera shows the manager near the guitar at 3:08 PM.', cost: 25, location: 'Studio security', collected: false },
      { id: 'ev-2', name: 'Online Listings', icon: '💻', description: 'Online records show the manager previously sold studio instruments for personal profit.', cost: 30, location: 'Online marketplace', collected: false },
      { id: 'ev-3', name: 'Key Registry', icon: '🔑', description: 'The key registry shows the manager had master keys to all studio rooms.', cost: 25, location: 'Studio records', collected: false },
      { id: 'ev-4', name: 'Recording Log', icon: '🎵', description: 'Recording log confirms Musician A was recording from 3:00 PM to 4:00 PM.', cost: 20, location: 'Studio B', collected: false }
    ],
    timeline: [
      { time: '3:00', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Studio B', activity: 'Recording', verified: true },
        { suspectId: 'suspect-3', location: 'Equipment Room', activity: 'Claimed: organizing', verified: false },
        { suspectId: 'suspect-4', location: 'Lounge', activity: 'In lounge', verified: true }
      ]},
      { time: '3:08', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Studio B', activity: 'Recording', verified: true },
        { suspectId: 'suspect-3', location: 'Near Guitar', activity: 'Near instrument', verified: true },
        { suspectId: 'suspect-4', location: 'Lounge', activity: 'In lounge', verified: true }
      ]},
      { time: '3:15', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Studio B', activity: 'Recording', verified: true },
        { suspectId: 'suspect-3', location: 'Guitar Display', activity: 'Stealing guitar', verified: true },
        { suspectId: 'suspect-4', location: 'Lounge', activity: 'In lounge', verified: true }
      ]},
      { time: '3:25', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Studio B', activity: 'Recording', verified: true },
        { suspectId: 'suspect-3', location: 'Equipment Room', activity: 'Organizing', verified: false },
        { suspectId: 'suspect-4', location: 'Lounge', activity: 'In lounge', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'The manager claimed to be organizing equipment, but studio camera shows them near the guitar at 3:08 PM. The guitar was stolen at 3:15 PM. They had master keys and history of selling studio instruments online.',
    timeLimit: 360,
    hintCount: 3,
    points: 290
  },
  {
    id: 'mystery-025',
    level: 25,
    difficulty: 'medium',
    title: '🏆️ The Stolen Trophy',
    description: 'Who stole sports trophy from display?',
    scenario: 'A championship trophy was stolen from a sports center display.',
    suspects: [
      {
        id: 'suspect-1',
        name: 'Coach A',
        age: '48',
        occupation: 'Coach',
        statement: 'I was training the team.',
        alibi: 'Practice schedule',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-2',
        name: 'Player',
        age: '24',
        occupation: 'Athlete',
        statement: 'I was receiving treatment.',
        alibi: 'Trainer confirms',
        alibiVerified: true,
        alibiContradicted: false
      },
      {
        id: 'suspect-3',
        name: 'Facility Manager',
        age: '42',
        occupation: 'Manager',
        statement: 'I was in my office.',
        alibi: 'No witnesses',
        alibiVerified: false,
        alibiContradicted: true
      },
      {
        id: 'suspect-4',
        name: 'Fan Club President',
        age: '35',
        occupation: 'Volunteer',
        statement: 'I was organizing fan events.',
        alibi: 'Volunteer log shows',
        alibiVerified: true,
        alibiContradicted: false
      }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ The trophy was stolen at 4:32 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 The manager was seen near the display at 4:25 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 The manager has been asking about trophy value.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Only facility staff had display case keys.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Facility Camera', icon: '📹', description: 'Facility camera shows the manager near the trophy display at 4:25 PM.', cost: 25, location: 'Sports center security', collected: false },
      { id: 'ev-2', name: 'Inquiry Records', icon: '📋', description: 'Records show the manager recently inquired about the trophy\'s monetary value.', cost: 30, location: 'Facility records', collected: false },
      { id: 'ev-3', name: 'Key Registry', icon: '🔑', description: 'Only facility management staff had keys to the display case.', cost: 25, location: 'Facility records', collected: false },
      { id: 'ev-4', name: 'Trainer Testimony', icon: '🏋', description: 'The trainer confirms the player was receiving treatment from 4:00 PM to 5:00 PM.', cost: 20, location: 'Training room', collected: false }
    ],
    timeline: [
      { time: '4:20', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Training Field', activity: 'Training team', verified: true },
        { suspectId: 'suspect-2', location: 'Training Room', activity: 'Receiving treatment', verified: true },
        { suspectId: 'suspect-3', location: 'Office', activity: 'Claimed: in office', verified: false },
        { suspectId: 'suspect-4', location: 'Event Room', activity: 'Organizing events', verified: true }
      ]},
      { time: '4:25', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Training Field', activity: 'Training team', verified: true },
        { suspectId: 'suspect-2', location: 'Training Room', activity: 'Receiving treatment', verified: true },
        { suspectId: 'suspect-3', location: 'Near Trophy Display', activity: 'Near display', verified: true },
        { suspectId: 'suspect-4', location: 'Event Room', activity: 'Organizing events', verified: true }
      ]},
      { time: '4:32', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Training Field', activity: 'Training team', verified: true },
        { suspectId: 'suspect-2', location: 'Training Room', activity: 'Receiving treatment', verified: true },
        { suspectId: 'suspect-3', location: 'Trophy Display', activity: 'Stealing trophy', verified: true },
        { suspectId: 'suspect-4', location: 'Event Room', activity: 'Organizing events', verified: true }
      ]},
      { time: '4:40', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Training Field', activity: 'Training team', verified: true },
        { suspectId: 'suspect-2', location: 'Training Room', activity: 'Receiving treatment', verified: true },
        { suspectId: 'suspect-3', location: 'Office', activity: 'In office', verified: false },
        { suspectId: 'suspect-4', location: 'Event Room', activity: 'Organizing events', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'The manager claimed to be in their office, but facility camera shows them near the trophy display at 4:25 PM. The trophy was stolen at 4:32 PM. They had access to display case keys and had inquired about the trophy\'s value.',
    timeLimit: 360,
    hintCount: 3,
    points: 300
  },
  {
    id: 'mystery-026',
    level: 26,
    difficulty: 'medium',
    title: '💍️ The Stolen Watch',
    description: 'Who stole luxury watch from boutique?',
    scenario: 'A luxury watch was stolen from a high-end boutique.',
    suspects: [
      { id: 'suspect-1', name: 'Store Manager', age: '42', occupation: 'Manager', statement: 'I was in my office.', alibi: 'Office camera', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Sales Associate', age: '26', occupation: 'Associate', statement: 'I was assisting customers.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-3', name: 'Security Guard', age: '35', occupation: 'Security', statement: 'I was monitoring main entrance.', alibi: 'Entrance camera', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-4', name: 'VIP Customer', age: '38', occupation: 'Businesswoman', statement: 'I was browsing.', alibi: 'Store footage', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Watch stolen at 3:22 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Sales associate seen near watch case at 3:15 PM.', type: 'alibi', relatedSuspect: 'suspect-2' },
      { id: 'clue-3', description: '💰 Associate has $15,000 debt.', type: 'evidence', relatedSuspect: 'suspect-2' },
      { id: 'clue-4', description: '🔑 Only staff had display case keys.', type: 'evidence', relatedSuspect: 'suspect-2' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Store Camera', icon: '📹', description: 'Camera shows associate near watch case at 3:15 PM.', cost: 25, location: 'Boutique security', collected: false },
      { id: 'ev-2', name: 'Debt Records', icon: '📊', description: 'Associate has $15,000 in personal debts.', cost: 30, location: 'Background check', collected: false },
      { id: 'ev-3', name: 'Key Registry', icon: '🔑', description: 'Only staff had access to display case keys.', cost: 25, location: 'Store records', collected: false },
      { id: 'ev-4', name: 'Entrance Camera', icon: '📹', description: 'Guard was at main entrance all afternoon.', cost: 20, location: 'Boutique security', collected: false }
    ],
    timeline: [
      { time: '3:10', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Main Floor', activity: 'Assisting customers', verified: true },
        { suspectId: 'suspect-3', location: 'Main Entrance', activity: 'Monitoring', verified: true },
        { suspectId: 'suspect-4', location: 'Browsing Area', activity: 'Browsing', verified: true }
      ]},
      { time: '3:15', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Near Watch Case', activity: 'Near case', verified: true },
        { suspectId: 'suspect-3', location: 'Main Entrance', activity: 'Monitoring', verified: true },
        { suspectId: 'suspect-4', location: 'Browsing Area', activity: 'Browsing', verified: true }
      ]},
      { time: '3:22', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Watch Case', activity: 'Stealing watch', verified: true },
        { suspectId: 'suspect-3', location: 'Main Entrance', activity: 'Monitoring', verified: true },
        { suspectId: 'suspect-4', location: 'Browsing Area', activity: 'Browsing', verified: true }
      ]},
      { time: '3:30', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Main Floor', activity: 'Assisting customers', verified: false },
        { suspectId: 'suspect-3', location: 'Main Entrance', activity: 'Monitoring', verified: true },
        { suspectId: 'suspect-4', location: 'Browsing Area', activity: 'Browsing', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-2',
    explanation: 'Sales associate claimed to be assisting customers but camera shows them near watch case at 3:15 PM. Watch stolen at 3:22 PM. They had access to keys and significant debts.',
    timeLimit: 360,
    hintCount: 3,
    points: 310
  },
  {
    id: 'mystery-027',
    level: 27,
    difficulty: 'medium',
    title: '🎫️ The Stolen Rifle',
    description: 'Who stole rifle from collection?',
    scenario: 'A vintage rifle was stolen from a private collection.',
    suspects: [
      { id: 'suspect-1', name: 'Collection Owner', age: '58', occupation: 'Collector', statement: 'I was in my study.', alibi: 'Household staff', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Security Guard', age: '38', occupation: 'Guard', statement: 'I was patrolling perimeter.', alibi: 'Patrol log', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Housekeeper', age: '45', occupation: 'Housekeeper', statement: 'I was cleaning guest rooms.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Family Friend', age: '50', occupation: 'Retired Military', statement: 'I was viewing collection.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Rifle stolen at 2:45 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Housekeeper seen near collection at 2:38 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Housekeeper has large gambling debts.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Housekeeper has master key.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Home Security', icon: '📹', description: 'Security shows housekeeper near collection at 2:38 PM.', cost: 25, location: 'Home security', collected: false },
      { id: 'ev-2', name: 'Debt Records', icon: '📊', description: 'Housekeeper has $40,000 in gambling debts.', cost: 35, location: 'Background check', collected: false },
      { id: 'ev-3', name: 'Master Key', icon: '🔑', description: 'Housekeeper has master key to collection room.', cost: 25, location: 'Key registry', collected: false },
      { id: 'ev-4', name: 'Patrol Log', icon: '📋', description: 'Guard patrolling perimeter all afternoon.', cost: 20, location: 'Security records', collected: false }
    ],
    timeline: [
      { time: '2:30', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Study', activity: 'Reading', verified: true },
        { suspectId: 'suspect-2', location: 'Perimeter', activity: 'Patrolling', verified: true },
        { suspectId: 'suspect-3', location: 'Guest Wing', activity: 'Cleaning', verified: true },
        { suspectId: 'suspect-4', location: 'Collection Room', activity: 'Viewing collection', verified: true }
      ]},
      { time: '2:38', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Study', activity: 'Reading', verified: true },
        { suspectId: 'suspect-2', location: 'Perimeter', activity: 'Patrolling', verified: true },
        { suspectId: 'suspect-3', location: 'Near Collection', activity: 'Near rifles', verified: true },
        { suspectId: 'suspect-4', location: 'Collection Room', activity: 'Viewing collection', verified: true }
      ]},
      { time: '2:45', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Study', activity: 'Reading', verified: true },
        { suspectId: 'suspect-2', location: 'Perimeter', activity: 'Patrolling', verified: true },
        { suspectId: 'suspect-3', location: 'Collection Room', activity: 'Stealing rifle', verified: true },
        { suspectId: 'suspect-4', location: 'Collection Room', activity: 'Viewing collection', verified: true }
      ]},
      { time: '2:55', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Study', activity: 'Reading', verified: true },
        { suspectId: 'suspect-2', location: 'Perimeter', activity: 'Patrolling', verified: true },
        { suspectId: 'suspect-3', location: 'Guest Wing', activity: 'Cleaning', verified: false },
        { suspectId: 'suspect-4', location: 'Collection Room', activity: 'Viewing collection', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Housekeeper claimed to be cleaning guest rooms but security shows them near collection at 2:38 PM. Rifle stolen at 2:45 PM. They had master key and large gambling debts.',
    timeLimit: 360,
    hintCount: 3,
    points: 320
  },
  {
    id: 'mystery-028',
    level: 28,
    difficulty: 'medium',
    title: '🏭️ The Stolen Mask',
    description: 'Who stole theater prop mask?',
    scenario: 'A valuable theater mask was stolen backstage.',
    suspects: [
      { id: 'suspect-1', name: 'Director', age: '48', occupation: 'Director', statement: 'I was in director booth.', alibi: 'Booth footage', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Actor A', age: '32', occupation: 'Actor', statement: 'I was practicing lines.', alibi: 'Fellow actor', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Stagehand', age: '26', occupation: 'Stagehand', statement: 'I was moving sets.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Actor B', age: '35', occupation: 'Actor', statement: 'I was in costume room.', alibi: 'Costume staff', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Mask stolen at 7:15 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Stagehand seen near prop storage at 7:08 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Stagehand needed quick money.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Stagehand had prop room access.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Backstage Camera', icon: '📹', description: 'Camera shows stagehand near prop storage at 7:08 PM.', cost: 25, location: 'Theater security', collected: false },
      { id: 'ev-2', name: 'Financial Records', icon: '📊', description: 'Stagehand has $8,000 in urgent bills.', cost: 30, location: 'Payroll records', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Stagehand had access to prop storage room.', cost: 25, location: 'Theater records', collected: false },
      { id: 'ev-4', name: 'Costume Staff', icon: '👥', description: 'Actor B confirmed in costume room all evening.', cost: 20, location: 'Costume room', collected: false }
    ],
    timeline: [
      { time: '7:00', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Director Booth', activity: 'Directing', verified: true },
        { suspectId: 'suspect-2', location: 'Rehearsal Room', activity: 'Practicing', verified: true },
        { suspectId: 'suspect-3', location: 'Backstage', activity: 'Moving sets', verified: true },
        { suspectId: 'suspect-4', location: 'Costume Room', activity: 'In costume', verified: true }
      ]},
      { time: '7:08', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Director Booth', activity: 'Directing', verified: true },
        { suspectId: 'suspect-2', location: 'Rehearsal Room', activity: 'Practicing', verified: true },
        { suspectId: 'suspect-3', location: 'Near Prop Storage', activity: 'Near storage', verified: true },
        { suspectId: 'suspect-4', location: 'Costume Room', activity: 'In costume', verified: true }
      ]},
      { time: '7:15', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Director Booth', activity: 'Directing', verified: true },
        { suspectId: 'suspect-2', location: 'Rehearsal Room', activity: 'Practicing', verified: true },
        { suspectId: 'suspect-3', location: 'Prop Storage', activity: 'Stealing mask', verified: true },
        { suspectId: 'suspect-4', location: 'Costume Room', activity: 'In costume', verified: true }
      ]},
      { time: '7:25', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Director Booth', activity: 'Directing', verified: true },
        { suspectId: 'suspect-2', location: 'Rehearsal Room', activity: 'Practicing', verified: true },
        { suspectId: 'suspect-3', location: 'Backstage', activity: 'Moving sets', verified: false },
        { suspectId: 'suspect-4', location: 'Costume Room', activity: 'In costume', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Stagehand claimed to be moving sets but backstage camera shows them near prop storage at 7:08 PM. Mask stolen at 7:15 PM. They had prop room access and urgent financial need.',
    timeLimit: 360,
    hintCount: 3,
    points: 330
  },
  {
    id: 'mystery-029',
    level: 29,
    difficulty: 'medium',
    title: '🎪️ The Stolen Diamond',
    description: 'Who stole diamond from auction house?',
    scenario: 'A rare diamond was stolen from an auction house preview.',
    suspects: [
      { id: 'suspect-1', name: 'Auction Director', age: '50', occupation: 'Director', statement: 'I was preparing catalog.', alibi: 'Office staff', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Security Chief', age: '42', occupation: 'Security', statement: 'I was monitoring main hall.', alibi: 'Hall cameras', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Appraiser', age: '38', occupation: 'Appraiser', statement: 'I was examining items.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Bidder', age: '45', occupation: 'Collector', statement: 'I was previewing items.', alibi: 'Hall cameras', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Diamond stolen at 4:18 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Appraiser seen near diamond at 4:12 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Appraiser offered diamond to buyer.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Appraiser had display access.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Preview Room Camera', icon: '📹', description: 'Camera shows appraiser near diamond at 4:12 PM.', cost: 25, location: 'Auction house security', collected: false },
      { id: 'ev-2', name: 'Buyer Contact', icon: '📞', description: 'Appraiser contacted a buyer offering the diamond.', cost: 35, location: 'Phone records', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Appraiser had access to preview displays.', cost: 25, location: 'Auction house records', collected: false },
      { id: 'ev-4', name: 'Hall Cameras', icon: '📹', description: 'Security chief was monitoring main hall all afternoon.', cost: 20, location: 'Auction house security', collected: false }
    ],
    timeline: [
      { time: '4:05', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Director Office', activity: 'Preparing catalog', verified: true },
        { suspectId: 'suspect-2', location: 'Main Hall', activity: 'Monitoring', verified: true },
        { suspectId: 'suspect-3', location: 'Preview Room', activity: 'Examining items', verified: true },
        { suspectId: 'suspect-4', location: 'Preview Room', activity: 'Previewing', verified: true }
      ]},
      { time: '4:12', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Director Office', activity: 'Preparing catalog', verified: true },
        { suspectId: 'suspect-2', location: 'Main Hall', activity: 'Monitoring', verified: true },
        { suspectId: 'suspect-3', location: 'Near Diamond', activity: 'Near diamond', verified: true },
        { suspectId: 'suspect-4', location: 'Preview Room', activity: 'Previewing', verified: true }
      ]},
      { time: '4:18', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Director Office', activity: 'Preparing catalog', verified: true },
        { suspectId: 'suspect-2', location: 'Main Hall', activity: 'Monitoring', verified: true },
        { suspectId: 'suspect-3', location: 'Diamond Display', activity: 'Stealing diamond', verified: true },
        { suspectId: 'suspect-4', location: 'Preview Room', activity: 'Previewing', verified: true }
      ]},
      { time: '4:30', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Director Office', activity: 'Preparing catalog', verified: true },
        { suspectId: 'suspect-2', location: 'Main Hall', activity: 'Monitoring', verified: true },
        { suspectId: 'suspect-3', location: 'Preview Room', activity: 'Examining items', verified: false },
        { suspectId: 'suspect-4', location: 'Preview Room', activity: 'Previewing', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Appraiser claimed to be examining items but camera shows them near diamond at 4:12 PM. Diamond stolen at 4:18 PM. They had display access and offered diamond to a buyer.',
    timeLimit: 360,
    hintCount: 3,
    points: 340
  },
  {
    id: 'mystery-030',
    level: 30,
    difficulty: 'medium',
    title: '🏊️ The Stolen Trophy',
    description: 'Who stole championship cup from museum?',
    scenario: 'A championship trophy was stolen from a sports museum.',
    suspects: [
      { id: 'suspect-1', name: 'Museum Curator', age: '48', occupation: 'Curator', statement: 'I was giving guided tours.', alibi: 'Tour group', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Security Head', age: '45', occupation: 'Security', statement: 'I was monitoring security room.', alibi: 'Security logs', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Maintenance Worker', age: '38', occupation: 'Maintenance', statement: 'I was repairing lighting.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Tourist', age: '35', occupation: 'Visitor', statement: 'I was viewing exhibits.', alibi: 'Museum cameras', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Trophy stolen at 1:35 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Worker seen near trophy at 1:28 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Worker has family emergency.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Worker had exhibit access.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Museum Camera', icon: '📹', description: 'Camera shows worker near trophy at 1:28 PM.', cost: 25, location: 'Museum security', collected: false },
      { id: 'ev-2', name: 'Emergency Records', icon: '📋', description: 'Worker has family medical emergency requiring $20,000.', cost: 30, location: 'HR records', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Worker had access to trophy exhibit case.', cost: 25, location: 'Museum records', collected: false },
      { id: 'ev-4', name: 'Security Logs', icon: '📋', description: 'Security head was in security room all afternoon.', cost: 20, location: 'Museum security', collected: false }
    ],
    timeline: [
      { time: '1:20', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Main Hall', activity: 'Guiding tours', verified: true },
        { suspectId: 'suspect-2', location: 'Security Room', activity: 'Monitoring', verified: true },
        { suspectId: 'suspect-3', location: 'Exhibit Area', activity: 'Repairing lighting', verified: true },
        { suspectId: 'suspect-4', location: 'Viewing Area', activity: 'Viewing exhibits', verified: true }
      ]},
      { time: '1:28', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Main Hall', activity: 'Guiding tours', verified: true },
        { suspectId: 'suspect-2', location: 'Security Room', activity: 'Monitoring', verified: true },
        { suspectId: 'suspect-3', location: 'Near Trophy', activity: 'Near trophy', verified: true },
        { suspectId: 'suspect-4', location: 'Viewing Area', activity: 'Viewing exhibits', verified: true }
      ]},
      { time: '1:35', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Main Hall', activity: 'Guiding tours', verified: true },
        { suspectId: 'suspect-2', location: 'Security Room', activity: 'Monitoring', verified: true },
        { suspectId: 'suspect-3', location: 'Trophy Case', activity: 'Stealing trophy', verified: true },
        { suspectId: 'suspect-4', location: 'Viewing Area', activity: 'Viewing exhibits', verified: true }
      ]},
      { time: '1:45', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Main Hall', activity: 'Guiding tours', verified: true },
        { suspectId: 'suspect-2', location: 'Security Room', activity: 'Monitoring', verified: true },
        { suspectId: 'suspect-3', location: 'Exhibit Area', activity: 'Repairing lighting', verified: false },
        { suspectId: 'suspect-4', location: 'Viewing Area', activity: 'Viewing exhibits', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Worker claimed to be repairing lighting but museum camera shows them near trophy at 1:28 PM. Trophy stolen at 1:35 PM. They had exhibit access and family emergency requiring money.',
    timeLimit: 360,
    hintCount: 3,
    points: 350
  },

  // ============ LEVEL 31-50: HARD ============
  {
    id: 'mystery-031',
    level: 31,
    difficulty: 'hard',
    title: '🌍 The Diplomat Murder',
    description: 'Who assassinated diplomat?',
    scenario: 'A diplomat was assassinated during peace negotiations. The killer was professional.',
    suspects: [
      { id: 'suspect-1', name: 'Bodyguard A', age: '35', occupation: 'Protection', statement: 'I was with diplomat all day.', alibi: 'Schedule confirms', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Bodyguard B', age: '40', occupation: 'Protection', statement: 'I was monitoring perimeter.', alibi: 'Patrol logs', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Diplomatic Staff', age: '38', occupation: 'Secretary', statement: 'I was preparing documents.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Foreign Agent', age: '42', occupation: 'Intelligence', statement: 'I was at my embassy.', alibi: 'Embassy confirms', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Assassin at 3:47 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Staff member seen alone at 3:40 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Staff member had large gambling debts.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Staff member had master key.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-5', description: '🔗 Staff member contacted foreign agent.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Security Camera', icon: '📹', description: 'Camera shows staff member leaving diplomat\'s office at 3:47 PM, just after assassination.', cost: 35, location: 'Embassy security', collected: false },
      { id: 'ev-2', name: 'Debt Records', icon: '📊', description: 'Staff member has $75,000 in gambling debts.', cost: 40, location: 'Background check', collected: false },
      { id: 'ev-3', name: 'Master Key', icon: '🔑', description: 'Staff member had master key to diplomat\'s private office.', cost: 30, location: 'Embassy records', collected: false },
      { id: 'ev-4', name: 'Contact Records', icon: '📞', description: 'Staff member contacted foreign agent 3 times last month.', cost: 35, location: 'Phone records', collected: false }
    ],
    timeline: [
      { time: '3:30', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Diplomat Side', activity: 'Protecting', verified: true },
        { suspectId: 'suspect-2', location: 'Perimeter', activity: 'Patrolling', verified: true },
        { suspectId: 'suspect-3', location: 'Office', activity: 'Preparing documents', verified: true },
        { suspectId: 'suspect-4', location: 'Embassy', activity: 'In embassy', verified: true }
      ]},
      { time: '3:40', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Diplomat Side', activity: 'Protecting', verified: true },
        { suspectId: 'suspect-2', location: 'Perimeter', activity: 'Patrolling', verified: true },
        { suspectId: 'suspect-3', location: 'Near Diplomat Office', activity: 'Approaching', verified: true },
        { suspectId: 'suspect-4', location: 'Embassy', activity: 'In embassy', verified: true }
      ]},
      { time: '3:47', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Diplomat Side', activity: 'Protecting', verified: true },
        { suspectId: 'suspect-2', location: 'Perimeter', activity: 'Patrolling', verified: true },
        { suspectId: 'suspect-3', location: 'Diplomat Office', activity: 'Assassinating diplomat', verified: true },
        { suspectId: 'suspect-4', location: 'Embassy', activity: 'In embassy', verified: true }
      ]},
      { time: '3:55', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Diplomat Side', activity: 'Protecting', verified: true },
        { suspectId: 'suspect-2', location: 'Perimeter', activity: 'Patrolling', verified: true },
        { suspectId: 'suspect-3', location: 'Office', activity: 'Back at work', verified: false },
        { suspectId: 'suspect-4', location: 'Embassy', activity: 'In embassy', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Staff member claimed to be preparing documents but was seen near diplomat\'s office at 3:40 PM. Diplomat assassinated at 3:47 PM. They had master key, large gambling debts, and contacted foreign agent.',
    timeLimit: 480,
    hintCount: 4,
    points: 400
  },
  {
    id: 'mystery-032',
    level: 32,
    difficulty: 'hard',
    title: '🏴️ The CEO Murder',
    description: 'Who murdered company CEO?',
    scenario: 'A CEO was murdered during board meeting. Multiple suspects.',
    suspects: [
      { id: 'suspect-1', name: 'CFO', age: '48', occupation: 'Finance', statement: 'I was presenting financials.', alibi: 'Meeting attendees', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'VP Operations', age: '45', occupation: 'Operations', statement: 'I was in back of room.', alibi: 'Meeting attendees', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Legal Counsel', age: '52', occupation: 'Legal', statement: 'I was taking notes.', alibi: 'Meeting attendees', alibiVerified: true, alibiContradicted: true },
      { id: 'suspect-4', name: 'Competitor Spy', age: '40', occupation: 'Infiltrator', statement: 'I was not in meeting.', alibi: 'Security footage', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 10:23 AM.', type: 'time' },
      { id: 'clue-2', description: '📍 Legal counsel seen at CEO\'s coffee at 10:15 AM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Legal counsel stands to inherit shares.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '☕ Legal counsel purchased poison.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Coffee Analysis', icon: '☕', description: 'CEO\'s coffee contained untraceable poison. Legal counsel was seen preparing it at 10:15 AM.', cost: 35, location: 'Forensic lab', collected: false },
      { id: 'ev-2', name: 'Stock Options', icon: '📊', description: 'Legal counsel owns massive stock options that vest if CEO dies.', cost: 40, location: 'SEC filings', collected: false },
      { id: 'ev-3', name: 'Poison Purchase', icon: '💊', description: 'Legal counsel purchased rare poison 3 days before meeting.', cost: 35, location: 'Chemical supplier', collected: false },
      { id: 'ev-4', name: 'Meeting Recording', icon: '🎥', description: 'Meeting audio shows legal counsel stepped out at 10:15 AM.', cost: 30, location: 'Board room', collected: false }
    ],
    timeline: [
      { time: '10:05', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Board Room', activity: 'Presenting', verified: true },
        { suspectId: 'suspect-2', location: 'Board Room', activity: 'Attending', verified: true },
        { suspectId: 'suspect-3', location: 'Board Room', activity: 'Taking notes', verified: true },
        { suspectId: 'suspect-4', location: 'Outside', activity: 'Watching', verified: true }
      ]},
      { time: '10:15', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Board Room', activity: 'Presenting', verified: true },
        { suspectId: 'suspect-2', location: 'Board Room', activity: 'Attending', verified: true },
        { suspectId: 'suspect-3', location: 'CEO\'s Coffee', activity: 'Preparing coffee', verified: true },
        { suspectId: 'suspect-4', location: 'Outside', activity: 'Watching', verified: true }
      ]},
      { time: '10:23', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Board Room', activity: 'Presenting', verified: true },
        { suspectId: 'suspect-2', location: 'Board Room', activity: 'Attending', verified: true },
        { suspectId: 'suspect-3', location: 'Board Room', activity: 'In meeting', verified: true },
        { suspectId: 'suspect-4', location: 'Outside', activity: 'Watching', verified: true }
      ]},
      { time: '10:30', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Board Room', activity: 'Presenting', verified: true },
        { suspectId: 'suspect-2', location: 'Board Room', activity: 'Attending', verified: true },
        { suspectId: 'suspect-3', location: 'Board Room', activity: 'In meeting', verified: true },
        { suspectId: 'suspect-4', location: 'Outside', activity: 'Leaving', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Legal counsel claimed to be taking notes but was seen preparing CEO\'s coffee at 10:15 AM. CEO murdered at 10:23 AM. They own stock options vesting on death and purchased rare poison.',
    timeLimit: 480,
    hintCount: 4,
    points: 420
  },
  {
    id: 'mystery-033',
    level: 33,
    difficulty: 'hard',
    title: '🏯️ The General Murder',
    description: 'Who assassinated military general?',
    scenario: 'A general was assassinated during inspection. Professional hit.',
    suspects: [
      { id: 'suspect-1', name: 'Colonel A', age: '48', occupation: 'Colonel', statement: 'I was leading inspection.', alibi: 'Inspection team', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Colonel B', age: '45', occupation: 'Colonel', statement: 'I was reviewing protocols.', alibi: 'Protocol logs', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Intelligence Officer', age: '38', occupation: 'Intelligence', statement: 'I was monitoring comms.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Bodyguard', age: '32', occupation: 'Protection', statement: 'I was at general\'s side.', alibi: 'Schedule confirms', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Assassination at 2:18 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Intelligence officer alone at 2:10 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Intelligence officer in enemy debt.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔫 Intelligence officer had sniper access.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Base Camera', icon: '📹', description: 'Camera shows intelligence officer leaving base alone at 2:10 PM, returned at 2:25 PM.', cost: 35, location: 'Base security', collected: false },
      { id: 'ev-2', name: 'Counter-Intel Report', icon: '🕵️', description: 'Counter-intelligence report shows enemy agent paid intelligence officer $100,000.', cost: 40, location: 'Counter-intelligence', collected: false },
      { id: 'ev-3', name: 'Armory Log', icon: '🔫', description: 'Armory records show intelligence officer signed out sniper rifle at 1:45 PM.', cost: 30, location: 'Armory records', collected: false },
      { id: 'ev-4', name: 'Inspection Report', icon: '📋', description: 'Inspection report from Colonel A confirms general\'s position all day.', cost: 25, location: 'Inspection report', collected: false }
    ],
    timeline: [
      { time: '2:00', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Inspection Site', activity: 'Leading inspection', verified: true },
        { suspectId: 'suspect-2', location: 'Command Post', activity: 'Reviewing protocols', verified: true },
        { suspectId: 'suspect-3', location: 'Comms Room', activity: 'Monitoring', verified: true },
        { suspectId: 'suspect-4', location: 'General Side', activity: 'Protecting', verified: true }
      ]},
      { time: '2:10', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Inspection Site', activity: 'Leading inspection', verified: true },
        { suspectId: 'suspect-2', location: 'Command Post', activity: 'Reviewing protocols', verified: true },
        { suspectId: 'suspect-3', location: 'Base Entrance', activity: 'Leaving base', verified: true },
        { suspectId: 'suspect-4', location: 'General Side', activity: 'Protecting', verified: true }
      ]},
      { time: '2:18', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Inspection Site', activity: 'Leading inspection', verified: true },
        { suspectId: 'suspect-2', location: 'Command Post', activity: 'Reviewing protocols', verified: true },
        { suspectId: 'suspect-3', location: 'Sniper Position', activity: 'Assassinating', verified: true },
        { suspectId: 'suspect-4', location: 'General Side', activity: 'Protecting', verified: true }
      ]},
      { time: '2:25', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Inspection Site', activity: 'Leading inspection', verified: true },
        { suspectId: 'suspect-2', location: 'Command Post', activity: 'Reviewing protocols', verified: true },
        { suspectId: 'suspect-3', location: 'Base Entrance', activity: 'Returning to base', verified: true },
        { suspectId: 'suspect-4', location: 'General Side', activity: 'Protecting', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Intelligence officer claimed to monitor comms but camera shows them leaving base alone at 2:10 PM. General assassinated at 2:18 PM. They were paid by enemy agent and accessed sniper rifle.',
    timeLimit: 480,
    hintCount: 4,
    points: 440
  },
  {
    id: 'mystery-034',
    level: 34,
    difficulty: 'hard',
    title: '🎭️ The Actor Murder',
    description: 'Who murdered famous actor?',
    scenario: 'A famous actor was murdered during filming. Complex case.',
    suspects: [
      { id: 'suspect-1', name: 'Director', age: '52', occupation: 'Director', statement: 'I was directing scene.', alibi: 'Film crew', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Co-star A', age: '35', occupation: 'Actor', statement: 'I was in makeup.', alibi: 'Makeup artist', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Stunt Double', age: '28', occupation: 'Stunt', statement: 'I was reviewing choreography.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Producer', age: '48', occupation: 'Producer', statement: 'I was on set.', alibi: 'Set crew', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 4:42 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Stunt double seen near trailer at 4:35 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Stunt double has replacement motive.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔫 Stunt double accessed props.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Set Camera', icon: '📹', description: 'Camera shows stunt double entering actor\'s trailer at 4:35 PM, leaving at 4:45 PM.', cost: 35, location: 'Set security', collected: false },
      { id: 'ev-2', name: 'Contract Review', icon: '📝', description: 'Stunt double\'s contract expiring soon. Actor was refusing renewal.', cost: 40, location: 'Studio records', collected: false },
      { id: 'ev-3', name: 'Prop Access Log', icon: '🎭', description: 'Stunt double signed out dangerous prop used in murder.', cost: 30, location: 'Prop department', collected: false },
      { id: 'ev-4', name: 'Director Testimony', icon: '🎥', description: 'Director confirms directing scene all afternoon.', cost: 25, location: 'Set log', collected: false }
    ],
    timeline: [
      { time: '4:30', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Set', activity: 'Directing scene', verified: true },
        { suspectId: 'suspect-2', location: 'Makeup Room', activity: 'In makeup', verified: true },
        { suspectId: 'suspect-3', location: 'Trailer Area', activity: 'Approaching trailer', verified: true },
        { suspectId: 'suspect-4', location: 'Set', activity: 'On set', verified: true }
      ]},
      { time: '4:35', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Set', activity: 'Directing scene', verified: true },
        { suspectId: 'suspect-2', location: 'Makeup Room', activity: 'In makeup', verified: true },
        { suspectId: 'suspect-3', location: 'Actor\'s Trailer', activity: 'Entering trailer', verified: true },
        { suspectId: 'suspect-4', location: 'Set', activity: 'On set', verified: true }
      ]},
      { time: '4:42', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Set', activity: 'Directing scene', verified: true },
        { suspectId: 'suspect-2', location: 'Makeup Room', activity: 'In makeup', verified: true },
        { suspectId: 'suspect-3', location: 'Actor\'s Trailer', activity: 'Murdering actor', verified: true },
        { suspectId: 'suspect-4', location: 'Set', activity: 'On set', verified: true }
      ]},
      { time: '4:45', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Set', activity: 'Directing scene', verified: true },
        { suspectId: 'suspect-2', location: 'Makeup Room', activity: 'In makeup', verified: true },
        { suspectId: 'suspect-3', location: 'Trailer Area', activity: 'Leaving trailer', verified: true },
        { suspectId: 'suspect-4', location: 'Set', activity: 'On set', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Stunt double claimed to review choreography but camera shows them entering actor\'s trailer at 4:35 PM. Actor murdered at 4:42 PM. They had contract expiring and accessed murder weapon.',
    timeLimit: 480,
    hintCount: 4,
    points: 460
  },
  {
    id: 'mystery-035',
    level: 35,
    difficulty: 'hard',
    title: '🏭️ The Scientist Murder',
    description: 'Who murdered scientist?',
    scenario: 'A leading scientist was murdered in their lab. Suspicious circumstances.',
    suspects: [
      { id: 'suspect-1', name: 'Research Partner', age: '42', occupation: 'Researcher', statement: 'I was in adjacent lab.', alibi: 'Lab staff', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Lab Assistant', age: '28', occupation: 'Assistant', statement: 'I was preparing samples.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-3', name: 'Research Rival', age: '45', occupation: 'Researcher', statement: 'I was at conference.', alibi: 'Conference log', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-4', name: 'Lab Director', age: '52', occupation: 'Director', statement: 'I was in my office.', alibi: 'Office staff', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 11:35 AM.', type: 'time' },
      { id: 'clue-2', description: '📍 Assistant seen in victim\'s lab at 11:28 AM.', type: 'alibi', relatedSuspect: 'suspect-2' },
      { id: 'clue-3', description: '💰 Assistant stole research.', type: 'evidence', relatedSuspect: 'suspect-2' },
      { id: 'clue-4', description: '🧪 Assistant had lab key.', type: 'evidence', relatedSuspect: 'suspect-2' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Lab Camera', icon: '📹', description: 'Camera shows assistant entering victim\'s lab at 11:28 AM, leaving at 11:40 AM.', cost: 35, location: 'Lab security', collected: false },
      { id: 'ev-2', name: 'Research Theft', icon: '🧬', description: 'Assistant was caught stealing victim\'s research data last week.', cost: 40, location: 'Lab records', collected: false },
      { id: 'ev-3', name: 'Lab Key', icon: '🔑', description: 'Assistant had temporary lab key to access victim\'s research area.', cost: 30, location: 'Key registry', collected: false },
      { id: 'ev-4', name: 'Conference Attendance', icon: '📝', description: 'Rival confirmed at conference all morning.', cost: 25, location: 'Conference records', collected: false }
    ],
    timeline: [
      { time: '11:20', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Adjacent Lab', activity: 'Researching', verified: true },
        { suspectId: 'suspect-2', location: 'Sample Prep Area', activity: 'Preparing samples', verified: true },
        { suspectId: 'suspect-3', location: 'Conference', activity: 'At conference', verified: true },
        { suspectId: 'suspect-4', location: 'Director Office', activity: 'Working', verified: true }
      ]},
      { time: '11:28', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Adjacent Lab', activity: 'Researching', verified: true },
        { suspectId: 'suspect-2', location: 'Victim\'s Lab', activity: 'Entering lab', verified: true },
        { suspectId: 'suspect-3', location: 'Conference', activity: 'At conference', verified: true },
        { suspectId: 'suspect-4', location: 'Director Office', activity: 'Working', verified: true }
      ]},
      { time: '11:35', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Adjacent Lab', activity: 'Researching', verified: true },
        { suspectId: 'suspect-2', location: 'Victim\'s Lab', activity: 'Murdering scientist', verified: true },
        { suspectId: 'suspect-3', location: 'Conference', activity: 'At conference', verified: true },
        { suspectId: 'suspect-4', location: 'Director Office', activity: 'Working', verified: true }
      ]},
      { time: '11:40', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Adjacent Lab', activity: 'Researching', verified: true },
        { suspectId: 'suspect-2', location: 'Sample Prep Area', activity: 'Preparing samples', verified: false },
        { suspectId: 'suspect-3', location: 'Conference', activity: 'At conference', verified: true },
        { suspectId: 'suspect-4', location: 'Director Office', activity: 'Working', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-2',
    explanation: 'Assistant claimed to prepare samples but camera shows them entering victim\'s lab at 11:28 AM. Scientist murdered at 11:35 AM. They stole research data and had lab key.',
    timeLimit: 480,
    hintCount: 4,
    points: 480
  },
  {
    id: 'mystery-036',
    level: 36,
    difficulty: 'hard',
    title: '🏰️ The Judge Murder',
    description: 'Who murdered judge?',
    scenario: 'A prominent judge was murdered in their chambers during trial preparation. Complex political motivations.',
    suspects: [
      { id: 'suspect-1', name: 'Assistant Judge A', age: '35', occupation: 'Assistant', statement: 'I was reviewing files in my office.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-2', name: 'Defense Attorney', age: '42', occupation: 'Attorney', statement: 'I was preparing defense arguments.', alibi: 'Fellow attorney', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Prosecutor', age: '48', occupation: 'Prosecutor', statement: 'I was in witness preparation.', alibi: 'Staff confirms', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-4', name: 'Political Consultant', age: '52', occupation: 'Consultant', statement: 'I was meeting with other clients.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 3:18 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Assistant seen entering judge\'s chambers at 3:10 PM.', type: 'alibi', relatedSuspect: 'suspect-1' },
      { id: 'clue-3', description: '💰 Assistant offered judge case bribe.', type: 'evidence', relatedSuspect: 'suspect-1' },
      { id: 'clue-4', description: '🔑 Assistant had chambers access.', type: 'evidence', relatedSuspect: 'suspect-1' },
      { id: 'clue-5', description: '📋 Political case involved consultant\'s client.', type: 'evidence', relatedSuspect: 'suspect-4' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Chambers Camera', icon: '📹', description: 'Camera shows assistant entering judge\'s chambers at 3:10 PM, leaving at 3:20 PM.', cost: 35, location: 'Courthouse security', collected: false },
      { id: 'ev-2', name: 'Bribe Offer', icon: '💰', description: 'Wiretap shows assistant offering judge $500,000 for favorable ruling.', cost: 40, location: 'Wiretap records', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Access log shows assistant had judge\'s chambers access key.', cost: 30, location: 'Courthouse records', collected: false },
      { id: 'ev-4', name: 'Case Connections', icon: '📋', description: 'Case files show political consultant\'s client was defendant in controversial case.', cost: 35, location: 'Court records', collected: false }
    ],
    timeline: [
      { time: '3:05', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Assistant Office', activity: 'Reviewing files', verified: false },
        { suspectId: 'suspect-2', location: 'Defense Office', activity: 'Preparing arguments', verified: true },
        { suspectId: 'suspect-3', location: 'Witness Room', activity: 'Preparation', verified: true },
        { suspectId: 'suspect-4', location: 'Meeting Room', activity: 'Meeting clients', verified: false }
      ]},
      { time: '3:10', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Judge\'s Chambers', activity: 'Entering chambers', verified: true },
        { suspectId: 'suspect-2', location: 'Defense Office', activity: 'Preparing arguments', verified: true },
        { suspectId: 'suspect-3', location: 'Witness Room', activity: 'Preparation', verified: true },
        { suspectId: 'suspect-4', location: 'Meeting Room', activity: 'Meeting clients', verified: false }
      ]},
      { time: '3:18', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Judge\'s Chambers', activity: 'Murdering judge', verified: true },
        { suspectId: 'suspect-2', location: 'Defense Office', activity: 'Preparing arguments', verified: true },
        { suspectId: 'suspect-3', location: 'Witness Room', activity: 'Preparation', verified: true },
        { suspectId: 'suspect-4', location: 'Meeting Room', activity: 'Meeting clients', verified: false }
      ]},
      { time: '3:20', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Assistant Office', activity: 'Back at work', verified: false },
        { suspectId: 'suspect-2', location: 'Defense Office', activity: 'Preparing arguments', verified: true },
        { suspectId: 'suspect-3', location: 'Witness Room', activity: 'Preparation', verified: true },
        { suspectId: 'suspect-4', location: 'Meeting Room', activity: 'Meeting clients', verified: false }
      ]}
    ],
    correctAnswer: 'suspect-1',
    explanation: 'Assistant claimed to be reviewing files but camera shows them entering judge\'s chambers at 3:10 PM. Judge murdered at 3:18 PM. They offered judge bribe of $500,000 and had chambers access.',
    timeLimit: 480,
    hintCount: 4,
    points: 500
  },
  {
    id: 'mystery-037',
    level: 37,
    difficulty: 'hard',
    title: '🎪️ The Diplomat Kidnapping',
    description: 'Who kidnapped diplomat?',
    scenario: 'A diplomat was kidnapped during peace summit. Multiple countries involved. Highly sensitive political case.',
    suspects: [
      { id: 'suspect-1', name: 'Diplomat\'s Aide', age: '38', occupation: 'Assistant', statement: 'I was in meeting with ambassador.', alibi: 'Ambassador confirms', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Security Officer A', age: '42', occupation: 'Security', statement: 'I was monitoring exits.', alibi: 'Security logs', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-3', name: 'Foreign Agent', age: '35', occupation: 'Intelligence', statement: 'I was in embassy suite.', alibi: 'Embassy records', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-4', name: 'Rival Diplomat', age: '48', occupation: 'Diplomat', statement: 'I was attending summit sessions.', alibi: 'Summit footage', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Kidnapping at 10:47 AM.', type: 'time' },
      { id: 'clue-2', description: '📍 Security officer seen near diplomat\'s vehicle at 10:40 AM.', type: 'alibi', relatedSuspect: 'suspect-2' },
      { id: 'clue-3', description: '💰 Security officer has massive debts.', type: 'evidence', relatedSuspect: 'suspect-2' },
      { id: 'clue-4', description: '🔑 Security officer had vehicle access.', type: 'evidence', relatedSuspect: 'suspect-2' },
      { id: 'clue-5', description: '📞 Security officer contacted rival diplomat.', type: 'evidence', relatedSuspect: 'suspect-4' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Summit Camera', icon: '📹', description: 'Camera shows security officer near diplomat\'s vehicle at 10:40 AM, loading diplomat inside.', cost: 35, location: 'Summit security', collected: false },
      { id: 'ev-2', name: 'Debt Records', icon: '📊', description: 'Financial records show security officer has $200,000 in gambling debts.', cost: 40, location: 'Background check', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Security access log shows officer had vehicle keys.', cost: 30, location: 'Security records', collected: false },
      { id: 'ev-4', name: 'Contact Records', icon: '📞', description: 'Phone records show security officer contacted rival diplomat 5 times before summit.', cost: 35, location: 'Intelligence reports', collected: false }
    ],
    timeline: [
      { time: '10:30', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Ambassador Meeting', activity: 'In meeting', verified: true },
        { suspectId: 'suspect-2', location: 'Security Post', activity: 'Monitoring exits', verified: false },
        { suspectId: 'suspect-3', location: 'Embassy Suite', activity: 'In embassy', verified: true },
        { suspectId: 'suspect-4', location: 'Summit Session', activity: 'Attending session', verified: true }
      ]},
      { time: '10:40', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Ambassador Meeting', activity: 'In meeting', verified: true },
        { suspectId: 'suspect-2', location: 'Diplomat\'s Vehicle', activity: 'Loading diplomat', verified: true },
        { suspectId: 'suspect-3', location: 'Embassy Suite', activity: 'In embassy', verified: true },
        { suspectId: 'suspect-4', location: 'Summit Session', activity: 'Attending session', verified: true }
      ]},
      { time: '10:47', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Ambassador Meeting', activity: 'In meeting', verified: true },
        { suspectId: 'suspect-2', location: 'Transport Route', activity: 'Transporting diplomat', verified: true },
        { suspectId: 'suspect-3', location: 'Embassy Suite', activity: 'In embassy', verified: true },
        { suspectId: 'suspect-4', location: 'Summit Session', activity: 'Attending session', verified: true }
      ]},
      { time: '11:00', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Ambassador Meeting', activity: 'In meeting', verified: true },
        { suspectId: 'suspect-2', location: 'Security Post', activity: 'Back at post', verified: false },
        { suspectId: 'suspect-3', location: 'Embassy Suite', activity: 'In embassy', verified: true },
        { suspectId: 'suspect-4', location: 'Summit Session', activity: 'Attending session', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-2',
    explanation: 'Security officer claimed to be monitoring exits but camera shows them loading diplomat into vehicle at 10:40 AM. Diplomat kidnapped at 10:47 AM. They had vehicle access, massive gambling debts, and contacted rival diplomat.',
    timeLimit: 480,
    hintCount: 4,
    points: 520
  },
  {
    id: 'mystery-038',
    level: 38,
    difficulty: 'hard',
    title: '🏛️ The Executive Theft',
    description: 'Who stole prototype?',
    scenario: 'A valuable technology prototype was stolen from corporation R&D facility. Industrial espionage suspected.',
    suspects: [
      { id: 'suspect-1', name: 'R&D Director', age: '52', occupation: 'Director', statement: 'I was overseeing experiments.', alibi: 'Lab staff confirms', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Lead Engineer', age: '38', occupation: 'Engineer', statement: 'I was coding in my lab.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-3', name: 'Security Head', age: '48', occupation: 'Security', statement: 'I was monitoring facility.', alibi: 'Security logs', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Competitor Spy', age: '42', occupation: 'Infiltrator', statement: 'I was posing as consultant.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Prototype stolen at 2:32 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Lead engineer seen near secure lab at 2:25 PM.', type: 'alibi', relatedSuspect: 'suspect-2' },
      { id: 'clue-3', description: '💰 Lead engineer offered to competitor.', type: 'evidence', relatedSuspect: 'suspect-2' },
      { id: 'clue-4', description: '🔑 Lead engineer had lab access.', type: 'evidence', relatedSuspect: 'suspect-2' },
      { id: 'clue-5', description: '🔗 Lead engineer contacted competitor.', type: 'evidence', relatedSuspect: 'suspect-4' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Lab Camera', icon: '📹', description: 'Camera shows lead engineer entering secure lab at 2:25 PM, leaving with prototype at 2:35 PM.', cost: 35, location: 'R&D security', collected: false },
      { id: 'ev-2', name: 'Offer Recording', icon: '💻', description: 'Recording shows lead engineer offering prototype to competitor for $5 million.', cost: 40, location: 'Counter-intelligence', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Access log shows lead engineer had secure lab access.', cost: 30, location: 'R&D records', collected: false },
      { id: 'ev-4', name: 'Contact Records', icon: '🔗', description: 'Phone records show lead engineer contacted competitor\'s procurement 7 times.', cost: 35, location: 'Intelligence reports', collected: false }
    ],
    timeline: [
      { time: '2:15', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Experiment Area', activity: 'Overseeing', verified: true },
        { suspectId: 'suspect-2', location: 'Lab Office', activity: 'Claimed: coding', verified: false },
        { suspectId: 'suspect-3', location: 'Security Room', activity: 'Monitoring', verified: false },
        { suspectId: 'suspect-4', location: 'Consultant Office', activity: 'Posing as consultant', verified: false }
      ]},
      { time: '2:25', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Experiment Area', activity: 'Overseeing', verified: true },
        { suspectId: 'suspect-2', location: 'Secure Lab', activity: 'Entering lab', verified: true },
        { suspectId: 'suspect-3', location: 'Security Room', activity: 'Monitoring', verified: false },
        { suspectId: 'suspect-4', location: 'Consultant Office', activity: 'Posing as consultant', verified: false }
      ]},
      { time: '2:32', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Experiment Area', activity: 'Overseeing', verified: true },
        { suspectId: 'suspect-2', location: 'Secure Lab', activity: 'Stealing prototype', verified: true },
        { suspectId: 'suspect-3', location: 'Security Room', activity: 'Monitoring', verified: false },
        { suspectId: 'suspect-4', location: 'Consultant Office', activity: 'Posing as consultant', verified: false }
      ]},
      { time: '2:35', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Experiment Area', activity: 'Overseeing', verified: true },
        { suspectId: 'suspect-2', location: 'Secure Lab', activity: 'Leaving lab', verified: true },
        { suspectId: 'suspect-3', location: 'Security Room', activity: 'Monitoring', verified: false },
        { suspectId: 'suspect-4', location: 'Consultant Office', activity: 'Posing as consultant', verified: false }
      ]}
    ],
    correctAnswer: 'suspect-2',
    explanation: 'Lead engineer claimed to be coding but camera shows them entering secure lab at 2:25 PM. Prototype stolen at 2:32 PM. They offered prototype to competitor for $5 million and contacted competitor procurement.',
    timeLimit: 480,
    hintCount: 4,
    points: 540
  },
  {
    id: 'mystery-039',
    level: 39,
    difficulty: 'hard',
    title: '🎨️ The Artist Murder',
    description: 'Who murdered famous artist?',
    scenario: 'A famous artist was murdered in their studio. The art world has complex relationships and motives.',
    suspects: [
      { id: 'suspect-1', name: 'Gallery Owner', age: '55', occupation: 'Gallery', statement: 'I was preparing artist\'s exhibition.', alibi: 'Gallery staff confirms', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Artist Assistant', age: '32', occupation: 'Assistant', statement: 'I was organizing artist\'s supplies.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-3', name: 'Art Critic', age: '45', occupation: 'Critic', statement: 'I was writing review of artist\'s work.', alibi: 'Blog post', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-4', name: 'Art Dealer', age: '48', occupation: 'Dealer', statement: 'I was negotiating other acquisitions.', alibi: 'Phone records', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 4:22 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Assistant seen entering artist\'s studio at 4:15 PM.', type: 'alibi', relatedSuspect: 'suspect-2' },
      { id: 'clue-3', description: '💰 Assistant had credit for stolen paintings.', type: 'evidence', relatedSuspect: 'suspect-2' },
      { id: 'clue-4', description: '🔑 Assistant had studio access.', type: 'evidence', relatedSuspect: 'suspect-2' },
      { id: 'clue-5', description: '😤 Artist fired assistant morning of murder.', type: 'evidence', relatedSuspect: 'suspect-2' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Studio Camera', icon: '📹', description: 'Camera shows assistant entering artist\'s studio at 4:15 PM, leaving at 4:25 PM, just after murder.', cost: 35, location: 'Studio security', collected: false },
      { id: 'ev-2', name: 'Theft Records', icon: '🎨', description: 'Police reports show assistant was suspected of stealing other artist\'s paintings.', cost: 40, location: 'Police records', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Studio access log shows assistant had master key.', cost: 30, location: 'Studio records', collected: false },
      { id: 'ev-4', name: 'Firing Notice', icon: '📝', description: 'Email shows artist fired assistant morning of murder, citing "betrayal".', cost: 35, location: 'Artist\'s computer', collected: false }
    ],
    timeline: [
      { time: '4:10', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Gallery', activity: 'Preparing exhibition', verified: true },
        { suspectId: 'suspect-2', location: 'Artist\'s Studio', activity: 'Entering studio', verified: true },
        { suspectId: 'suspect-3', location: 'Office', activity: 'Writing review', verified: true },
        { suspectId: 'suspect-4', location: 'Phone Call', activity: 'Negotiating acquisitions', verified: true }
      ]},
      { time: '4:15', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Gallery', activity: 'Preparing exhibition', verified: true },
        { suspectId: 'suspect-2', location: 'Artist\'s Studio', activity: 'With artist', verified: true },
        { suspectId: 'suspect-3', location: 'Office', activity: 'Writing review', verified: true },
        { suspectId: 'suspect-4', location: 'Phone Call', activity: 'Negotiating acquisitions', verified: true }
      ]},
      { time: '4:22', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Gallery', activity: 'Preparing exhibition', verified: true },
        { suspectId: 'suspect-2', location: 'Artist\'s Studio', activity: 'Murdering artist', verified: true },
        { suspectId: 'suspect-3', location: 'Office', activity: 'Writing review', verified: true },
        { suspectId: 'suspect-4', location: 'Phone Call', activity: 'Negotiating acquisitions', verified: true }
      ]},
      { time: '4:25', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Gallery', activity: 'Preparing exhibition', verified: true },
        { suspectId: 'suspect-2', location: 'Artist\'s Studio', activity: 'Leaving studio', verified: true },
        { suspectId: 'suspect-3', location: 'Office', activity: 'Writing review', verified: true },
        { suspectId: 'suspect-4', location: 'Phone Call', activity: 'Negotiating acquisitions', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-2',
    explanation: 'Assistant claimed to organize supplies but camera shows them entering artist\'s studio at 4:15 PM. Artist murdered at 4:22 PM. Artist fired assistant that morning, and assistant had theft history.',
    timeLimit: 480,
    hintCount: 4,
    points: 560
  },
  {
    id: 'mystery-040',
    level: 40,
    difficulty: 'hard',
    title: '🏊️ The Captain Murder',
    description: 'Who murdered ship captain?',
    scenario: 'A ship captain was murdered during voyage. The crew has tensions and secrets. Maritime mystery.',
    suspects: [
      { id: 'suspect-1', name: 'First Mate', age: '45', occupation: 'First Mate', statement: 'I was on bridge commanding.', alibi: 'Bridge log shows', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Ship\'s Cook', age: '38', occupation: 'Cook', statement: 'I was preparing dinner in galley.', alibi: 'Galley staff confirms', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Crew Member A', age: '32', occupation: 'Seaman', statement: 'I was on deck maintenance.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Crew Member B', age: '28', occupation: 'Seaman', statement: 'I was in engine room.', alibi: 'Engineer confirms', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 9:47 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Crew member A seen entering captain\'s cabin at 9:40 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Crew member A owed captain money.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Crew member A had cabin access.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-5', description: '😤 Captain threatened crew member A earlier.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Deck Camera', icon: '📹', description: 'Camera shows crew member A entering captain\'s cabin at 9:40 PM, leaving at 9:50 PM.', cost: 35, location: 'Ship security', collected: false },
      { id: 'ev-2', name: 'Debt Records', icon: '📊', description: 'Ship log shows crew member A owed captain $15,000 in gambling debts.', cost: 40, location: 'Ship records', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Ship access log shows crew member A had master cabin keys as night watch.', cost: 30, location: 'Ship records', collected: false },
      { id: 'ev-4', name: 'Witness Statements', icon: '👥', description: 'Multiple crew members report captain threatened crew member A that day about debts.', cost: 35, location: 'Crew statements', collected: false }
    ],
    timeline: [
      { time: '9:30', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Bridge', activity: 'Commanding', verified: true },
        { suspectId: 'suspect-2', location: 'Galley', activity: 'Preparing dinner', verified: true },
        { suspectId: 'suspect-3', location: 'Deck', activity: 'Maintenance', verified: true },
        { suspectId: 'suspect-4', location: 'Engine Room', activity: 'Working', verified: true }
      ]},
      { time: '9:40', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Bridge', activity: 'Commanding', verified: true },
        { suspectId: 'suspect-2', location: 'Galley', activity: 'Preparing dinner', verified: true },
        { suspectId: 'suspect-3', location: 'Captain\'s Cabin', activity: 'Entering cabin', verified: true },
        { suspectId: 'suspect-4', location: 'Engine Room', activity: 'Working', verified: true }
      ]},
      { time: '9:47', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Bridge', activity: 'Commanding', verified: true },
        { suspectId: 'suspect-2', location: 'Galley', activity: 'Preparing dinner', verified: true },
        { suspectId: 'suspect-3', location: 'Captain\'s Cabin', activity: 'Murdering captain', verified: true },
        { suspectId: 'suspect-4', location: 'Engine Room', activity: 'Working', verified: true }
      ]},
      { time: '9:50', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Bridge', activity: 'Commanding', verified: true },
        { suspectId: 'suspect-2', location: 'Galley', activity: 'Preparing dinner', verified: true },
        { suspectId: 'suspect-3', location: 'Deck', activity: 'On deck', verified: false },
        { suspectId: 'suspect-4', location: 'Engine Room', activity: 'Working', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Crew member A claimed deck maintenance but camera shows them entering captain\'s cabin at 9:40 PM. Captain murdered at 9:47 PM. They owed captain money and captain threatened them that day.',
    timeLimit: 480,
    hintCount: 4,
    points: 580
  },
  {
    id: 'mystery-041',
    level: 41,
    difficulty: 'hard',
    title: '🏥️ The Doctor Murder',
    description: 'Who murdered chief surgeon?',
    scenario: 'A chief surgeon was murdered during shift. Hospital politics and conflicts.',
    suspects: [
      { id: 'suspect-1', name: 'Assistant Surgeon A', age: '38', occupation: 'Surgeon', statement: 'I was in surgery.', alibi: 'OR logs confirm', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Resident Doctor', age: '30', occupation: 'Resident', statement: 'I was on rounds.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-3', name: 'Nurse Supervisor', age: '42', occupation: 'Nurse', statement: 'I was in nurse station.', alibi: 'Station logs show', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-4', name: 'Hospital Administrator', age: '52', occupation: 'Administrator', statement: 'I was in meetings.', alibi: 'Calendar shows', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 3:12 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Resident seen near surgeon\'s office at 3:05 PM.', type: 'alibi', relatedSuspect: 'suspect-2' },
      { id: 'clue-3', description: '💰 Resident had large gambling debts.', type: 'evidence', relatedSuspect: 'suspect-2' },
      { id: 'clue-4', description: '🔑 Resident had office access.', type: 'evidence', relatedSuspect: 'suspect-2' },
      { id: 'clue-5', description: '😤 Surgeon fired resident morning of murder.', type: 'evidence', relatedSuspect: 'suspect-2' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Hospital Camera', icon: '📹', description: 'Camera shows resident entering surgeon\'s office at 3:05 PM, leaving at 3:15 PM.', cost: 35, location: 'Hospital security', collected: false },
      { id: 'ev-2', name: 'Debt Records', icon: '📊', description: 'Financial records show resident has $50,000 in gambling debts.', cost: 40, location: 'Background check', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Hospital access log shows resident had surgeon\'s office access.', cost: 30, location: 'Hospital records', collected: false },
      { id: 'ev-4', name: 'Termination Email', icon: '📝', description: 'Email shows surgeon fired resident that morning, citing incompetence.', cost: 35, location: 'Hospital records', collected: false }
    ],
    timeline: [
      { time: '3:00', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Operating Room', activity: 'In surgery', verified: true },
        { suspectId: 'suspect-2', location: 'Ward', activity: 'Claimed: on rounds', verified: false },
        { suspectId: 'suspect-3', location: 'Nurse Station', activity: 'Supervising', verified: true },
        { suspectId: 'suspect-4', location: 'Admin Office', activity: 'In meetings', verified: true }
      ]},
      { time: '3:05', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Operating Room', activity: 'In surgery', verified: true },
        { suspectId: 'suspect-2', location: 'Surgeon\'s Office', activity: 'Entering office', verified: true },
        { suspectId: 'suspect-3', location: 'Nurse Station', activity: 'Supervising', verified: true },
        { suspectId: 'suspect-4', location: 'Admin Office', activity: 'In meetings', verified: true }
      ]},
      { time: '3:12', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Operating Room', activity: 'In surgery', verified: true },
        { suspectId: 'suspect-2', location: 'Surgeon\'s Office', activity: 'Murdering surgeon', verified: true },
        { suspectId: 'suspect-3', location: 'Nurse Station', activity: 'Supervising', verified: true },
        { suspectId: 'suspect-4', location: 'Admin Office', activity: 'In meetings', verified: true }
      ]},
      { time: '3:15', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Operating Room', activity: 'In surgery', verified: true },
        { suspectId: 'suspect-2', location: 'Ward', activity: 'On rounds', verified: false },
        { suspectId: 'suspect-3', location: 'Nurse Station', activity: 'Supervising', verified: true },
        { suspectId: 'suspect-4', location: 'Admin Office', activity: 'In meetings', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-2',
    explanation: 'Resident claimed to be on rounds but camera shows them entering surgeon\'s office at 3:05 PM. Surgeon murdered at 3:12 PM. They had office access, large gambling debts, and surgeon fired them that morning.',
    timeLimit: 480,
    hintCount: 4,
    points: 600
  },
  {
    id: 'mystery-042',
    level: 42,
    difficulty: 'hard',
    title: '🎰️ The Casino Murder',
    description: 'Who murdered casino owner?',
    scenario: 'A casino owner was murdered in their office. Gambling debts, rivalries, and secrets.',
    suspects: [
      { id: 'suspect-1', name: 'Casino Manager', age: '45', occupation: 'Manager', statement: 'I was on casino floor.', alibi: 'Floor cameras show', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Head Dealer', age: '35', occupation: 'Dealer', statement: 'I was dealing high stakes table.', alibi: 'Table logs show', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Security Chief', age: '42', occupation: 'Security', statement: 'I was monitoring surveillance.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Rival Casino Owner', age: '48', occupation: 'Owner', statement: 'I was at my casino.', alibi: 'Security shows', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 8:17 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Security chief seen near owner\'s office at 8:10 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Security chief had $75,000 gambling debts.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Security chief had office access.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-5', description: '😤 Owner threatened security chief.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Casino Camera', icon: '📹', description: 'Camera shows security chief entering owner\'s office at 8:10 PM, leaving at 8:20 PM.', cost: 35, location: 'Casino security', collected: false },
      { id: 'ev-2', name: 'Debt Records', icon: '📊', description: 'Financial records show security chief has $75,000 in gambling debts.', cost: 40, location: 'Background check', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Casino access log shows security chief had owner\'s office master key.', cost: 30, location: 'Casino records', collected: false },
      { id: 'ev-4', name: 'Witness Statements', icon: '👥', description: 'Multiple staff report owner threatened security chief about incompetence.', cost: 35, location: 'Staff statements', collected: false }
    ],
    timeline: [
      { time: '8:05', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Casino Floor', activity: 'Managing', verified: true },
        { suspectId: 'suspect-2', location: 'High Stakes Table', activity: 'Dealing', verified: true },
        { suspectId: 'suspect-3', location: 'Surveillance Room', activity: 'Monitoring', verified: false },
        { suspectId: 'suspect-4', location: 'Rival Casino', activity: 'At rival casino', verified: true }
      ]},
      { time: '8:10', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Casino Floor', activity: 'Managing', verified: true },
        { suspectId: 'suspect-2', location: 'High Stakes Table', activity: 'Dealing', verified: true },
        { suspectId: 'suspect-3', location: 'Owner\'s Office', activity: 'Entering office', verified: true },
        { suspectId: 'suspect-4', location: 'Rival Casino', activity: 'At rival casino', verified: true }
      ]},
      { time: '8:17', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Casino Floor', activity: 'Managing', verified: true },
        { suspectId: 'suspect-2', location: 'High Stakes Table', activity: 'Dealing', verified: true },
        { suspectId: 'suspect-3', location: 'Owner\'s Office', activity: 'Murdering owner', verified: true },
        { suspectId: 'suspect-4', location: 'Rival Casino', activity: 'At rival casino', verified: true }
      ]},
      { time: '8:20', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Casino Floor', activity: 'Managing', verified: true },
        { suspectId: 'suspect-2', location: 'High Stakes Table', activity: 'Dealing', verified: true },
        { suspectId: 'suspect-3', location: 'Surveillance Room', activity: 'Monitoring', verified: false },
        { suspectId: 'suspect-4', location: 'Rival Casino', activity: 'At rival casino', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Security chief claimed to monitor surveillance but camera shows them entering owner\'s office at 8:10 PM. Owner murdered at 8:17 PM. They had office master key, large gambling debts, and owner threatened them.',
    timeLimit: 480,
    hintCount: 4,
    points: 600
  },
  {
    id: 'mystery-043',
    level: 43,
    difficulty: 'hard',
    title: '🏙️️ The Mayor Murder',
    description: 'Who murdered city mayor?',
    scenario: 'A city mayor was murdered during re-election campaign. Political corruption and scandals.',
    suspects: [
      { id: 'suspect-1', name: 'Chief of Staff', age: '45', occupation: 'Staff', statement: 'I was preparing speeches.', alibi: 'Staff witnesses', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Campaign Manager', age: '38', occupation: 'Manager', statement: 'I was organizing rally.', alibi: 'Rally planner', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'City Clerk', age: '35', occupation: 'Clerk', statement: 'I was in archives.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Political Opponent', age: '48', occupation: 'Opponent', statement: 'I was at debate.', alibi: 'Debate footage', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 2:05 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Clerk seen near mayor\'s office at 1:58 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Clerk took bribes from mayor.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Clerk had office access.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-5', description: '📋 Clerk was being blackmailed.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'City Hall Camera', icon: '📹', description: 'Camera shows clerk entering mayor\'s office at 1:58 PM, leaving at 2:08 PM.', cost: 35, location: 'City Hall security', collected: false },
      { id: 'ev-2', name: 'Bribe Records', icon: '📋', description: 'Investigation records show clerk accepted $100,000 in bribes from mayor.', cost: 40, location: 'District Attorney', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'City Hall access log shows clerk had mayor\'s office access.', cost: 30, location: 'City records', collected: false },
      { id: 'ev-4', name: 'Blackmail Evidence', icon: '📄', description: 'Found emails showing someone blackmailing clerk about bribes.', cost: 35, location: 'Clerk\'s computer', collected: false }
    ],
    timeline: [
      { time: '1:50', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Preparing speeches', verified: true },
        { suspectId: 'suspect-2', location: 'Rally Site', activity: 'Organizing', verified: true },
        { suspectId: 'suspect-3', location: 'Archives', activity: 'Claimed: in archives', verified: false },
        { suspectId: 'suspect-4', location: 'Debate Hall', activity: 'At debate', verified: true }
      ]},
      { time: '1:58', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Preparing speeches', verified: true },
        { suspectId: 'suspect-2', location: 'Rally Site', activity: 'Organizing', verified: true },
        { suspectId: 'suspect-3', location: 'Mayor\'s Office', activity: 'Entering office', verified: true },
        { suspectId: 'suspect-4', location: 'Debate Hall', activity: 'At debate', verified: true }
      ]},
      { time: '2:05', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Preparing speeches', verified: true },
        { suspectId: 'suspect-2', location: 'Rally Site', activity: 'Organizing', verified: true },
        { suspectId: 'suspect-3', location: 'Mayor\'s Office', activity: 'Murdering mayor', verified: true },
        { suspectId: 'suspect-4', location: 'Debate Hall', activity: 'At debate', verified: true }
      ]},
      { time: '2:08', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Office', activity: 'Preparing speeches', verified: true },
        { suspectId: 'suspect-2', location: 'Rally Site', activity: 'Organizing', verified: true },
        { suspectId: 'suspect-3', location: 'Archives', activity: 'In archives', verified: false },
        { suspectId: 'suspect-4', location: 'Debate Hall', activity: 'At debate', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Clerk claimed to be in archives but camera shows them entering mayor\'s office at 1:58 PM. Mayor murdered at 2:05 PM. They were taking bribes and being blackmailed.',
    timeLimit: 480,
    hintCount: 4,
    points: 600
  },
  {
    id: 'mystery-044',
    level: 44,
    difficulty: 'hard',
    title: '🎭️ The Director Murder',
    description: 'Who murdered film director?',
    scenario: 'A famous film director was murdered on set. Hollywood secrets and scandals.',
    suspects: [
      { id: 'suspect-1', name: 'Producer A', age: '52', occupation: 'Producer', statement: 'I was managing budget.', alibi: 'Budget meeting', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Cinematographer', age: '42', occupation: 'Cinematographer', statement: 'I was scouting locations.', alibi: 'Location scout', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Script Supervisor', age: '38', occupation: 'Script', statement: 'I was reviewing script.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Lead Actor', age: '35', occupation: 'Actor', statement: 'I was rehearsing lines.', alibi: 'Rehearsal log', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 11:45 AM.', type: 'time' },
      { id: 'clue-2', description: '📍 Script supervisor seen near director\'s trailer at 11:38 AM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Script supervisor stole director\'s ideas.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Script supervisor had trailer access.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-5', description: '😤 Director sued script supervisor.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Set Camera', icon: '📹', description: 'Camera shows script supervisor entering director\'s trailer at 11:38 AM, leaving at 11:48 AM.', cost: 35, location: 'Set security', collected: false },
      { id: 'ev-2', name: 'Plagiarism Suit', icon: '⚖️', description: 'Court records show director sued script supervisor for stealing script ideas.', cost: 40, location: 'Court records', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Production access log shows script supervisor had director\'s trailer key.', cost: 30, location: 'Production records', collected: false },
      { id: 'ev-4', name: 'Location Scout', icon: '📍', description: 'Cinematographer confirmed scouting locations with GPS tracking.', cost: 25, location: 'GPS records', collected: false }
    ],
    timeline: [
      { time: '11:30', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Production Office', activity: 'Managing budget', verified: true },
        { suspectId: 'suspect-2', location: 'Location', activity: 'Scouting', verified: true },
        { suspectId: 'suspect-3', location: 'Script Office', activity: 'Claimed: reviewing', verified: false },
        { suspectId: 'suspect-4', location: 'Rehearsal Hall', activity: 'Rehearsing', verified: true }
      ]},
      { time: '11:38', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Production Office', activity: 'Managing budget', verified: true },
        { suspectId: 'suspect-2', location: 'Location', activity: 'Scouting', verified: true },
        { suspectId: 'suspect-3', location: 'Director\'s Trailer', activity: 'Entering trailer', verified: true },
        { suspectId: 'suspect-4', location: 'Rehearsal Hall', activity: 'Rehearsing', verified: true }
      ]},
      { time: '11:45', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Production Office', activity: 'Managing budget', verified: true },
        { suspectId: 'suspect-2', location: 'Location', activity: 'Scouting', verified: true },
        { suspectId: 'suspect-3', location: 'Director\'s Trailer', activity: 'Murdering director', verified: true },
        { suspectId: 'suspect-4', location: 'Rehearsal Hall', activity: 'Rehearsing', verified: true }
      ]},
      { time: '11:48', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Production Office', activity: 'Managing budget', verified: true },
        { suspectId: 'suspect-2', location: 'Location', activity: 'Scouting', verified: true },
        { suspectId: 'suspect-3', location: 'Script Office', activity: 'In office', verified: false },
        { suspectId: 'suspect-4', location: 'Rehearsal Hall', activity: 'Rehearsing', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Script supervisor claimed to review script but camera shows them entering director\'s trailer at 11:38 AM. Director murdered at 11:45 AM. Director was suing them for plagiarism.',
    timeLimit: 480,
    hintCount: 4,
    points: 600
  },
  {
    id: 'mystery-045',
    level: 45,
    difficulty: 'hard',
    title: '⚖️️ The Judge Murder',
    description: 'Who murdered supreme court judge?',
    scenario: 'A supreme court judge was murdered during controversial case deliberation. Political thriller scenario.',
    suspects: [
      { id: 'suspect-1', name: 'Judge\'s Clerk', age: '32', occupation: 'Clerk', statement: 'I was preparing court documents.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-2', name: 'Law Firm Partner', age: '48', occupation: 'Attorney', statement: 'I was at law firm.', alibi: 'Firm cameras', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Supreme Court Police', age: '42', occupation: 'Police', statement: 'I was guarding chambers.', alibi: 'Patrol log shows', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-4', name: 'Journalist', age: '35', occupation: 'Journalist', statement: 'I was researching story.', alibi: 'Newsroom', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 9:32 AM.', type: 'time' },
      { id: 'clue-2', description: '📍 Clerk seen entering judge\'s chambers at 9:25 AM.', type: 'alibi', relatedSuspect: 'suspect-1' },
      { id: 'clue-3', description: '💰 Clerk received massive payment.', type: 'evidence', relatedSuspect: 'suspect-1' },
      { id: 'clue-4', description: '🔑 Clerk had chambers access.', type: 'evidence', relatedSuspect: 'suspect-1' },
      { id: 'clue-5', description: '📋 Clerk leaked case documents.', type: 'evidence', relatedSuspect: 'suspect-1' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Supreme Court Camera', icon: '📹', description: 'Camera shows clerk entering judge\'s chambers at 9:25 AM, leaving at 9:35 AM.', cost: 35, location: 'Court security', collected: false },
      { id: 'ev-2', name: 'Financial Records', icon: '📊', description: 'Bank records show clerk received $500,000 in anonymous transfer.', cost: 40, location: 'Financial investigation', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Court access log shows clerk had judge\'s chambers access.', cost: 30, location: 'Court records', collected: false },
      { id: 'ev-4', name: 'Leak Investigation', icon: '🔍', description: 'Internal investigation shows clerk leaked case documents.', cost: 35, location: 'Court records', collected: false }
    ],
    timeline: [
      { time: '9:20', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Clerk Office', activity: 'Claimed: preparing documents', verified: false },
        { suspectId: 'suspect-2', location: 'Law Firm', activity: 'At firm', verified: true },
        { suspectId: 'suspect-3', location: 'Chambers Area', activity: 'Guarding', verified: true },
        { suspectId: 'suspect-4', location: 'Newsroom', activity: 'Researching', verified: true }
      ]},
      { time: '9:25', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Judge\'s Chambers', activity: 'Entering chambers', verified: true },
        { suspectId: 'suspect-2', location: 'Law Firm', activity: 'At firm', verified: true },
        { suspectId: 'suspect-3', location: 'Chambers Area', activity: 'Guarding', verified: true },
        { suspectId: 'suspect-4', location: 'Newsroom', activity: 'Researching', verified: true }
      ]},
      { time: '9:32', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Judge\'s Chambers', activity: 'Murdering judge', verified: true },
        { suspectId: 'suspect-2', location: 'Law Firm', activity: 'At firm', verified: true },
        { suspectId: 'suspect-3', location: 'Chambers Area', activity: 'Guarding', verified: true },
        { suspectId: 'suspect-4', location: 'Newsroom', activity: 'Researching', verified: true }
      ]},
      { time: '9:35', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Clerk Office', activity: 'Preparing documents', verified: false },
        { suspectId: 'suspect-2', location: 'Law Firm', activity: 'At firm', verified: true },
        { suspectId: 'suspect-3', location: 'Chambers Area', activity: 'Guarding', verified: true },
        { suspectId: 'suspect-4', location: 'Newsroom', activity: 'Researching', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-1',
    explanation: 'Clerk claimed to prepare documents but camera shows them entering judge\'s chambers at 9:25 AM. Judge murdered at 9:32 AM. They received $500,000 anonymous payment and leaked case documents.',
    timeLimit: 480,
    hintCount: 4,
    points: 600
  },
  {
    id: 'mystery-046',
    level: 46,
    difficulty: 'hard',
    title: '🏟️️ The Coach Murder',
    description: 'Who murdered championship coach?',
    scenario: 'A championship coach was murdered during finals. Sports rivalry and secrets.',
    suspects: [
      { id: 'suspect-1', name: 'Assistant Coach A', age: '40', occupation: 'Coach', statement: 'I was training players.', alibi: 'Training field witnesses', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Team Doctor', age: '45', occupation: 'Doctor', statement: 'I was treating injuries.', alibi: 'Medical log shows', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Equipment Manager', age: '38', occupation: 'Manager', statement: 'I was in equipment room.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Rival Coach', age: '48', occupation: 'Coach', statement: 'I was at my team\'s hotel.', alibi: 'Hotel cameras', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 6:28 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Equipment manager seen near coach\'s office at 6:20 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Equipment manager had betting debts.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Equipment manager had office access.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-5', description: '😤 Coach fired equipment manager morning of murder.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Stadium Camera', icon: '📹', description: 'Camera shows equipment manager entering coach\'s office at 6:20 PM, leaving at 6:30 PM.', cost: 35, location: 'Stadium security', collected: false },
      { id: 'ev-2', name: 'Debt Records', icon: '📊', description: 'Financial records show equipment manager has $60,000 in betting debts.', cost: 40, location: 'Background check', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Stadium access log shows equipment manager had coach\'s office access.', cost: 30, location: 'Stadium records', collected: false },
      { id: 'ev-4', name: 'Termination Notice', icon: '📝', description: 'Email shows coach fired equipment manager that morning.', cost: 35, location: 'Team records', collected: false }
    ],
    timeline: [
      { time: '6:15', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Training Field', activity: 'Training players', verified: true },
        { suspectId: 'suspect-2', location: 'Medical Room', activity: 'Treating injuries', verified: true },
        { suspectId: 'suspect-3', location: 'Equipment Room', activity: 'Claimed: in room', verified: false },
        { suspectId: 'suspect-4', location: 'Rival Hotel', activity: 'At hotel', verified: true }
      ]},
      { time: '6:20', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Training Field', activity: 'Training players', verified: true },
        { suspectId: 'suspect-2', location: 'Medical Room', activity: 'Treating injuries', verified: true },
        { suspectId: 'suspect-3', location: 'Coach\'s Office', activity: 'Entering office', verified: true },
        { suspectId: 'suspect-4', location: 'Rival Hotel', activity: 'At hotel', verified: true }
      ]},
      { time: '6:28', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Training Field', activity: 'Training players', verified: true },
        { suspectId: 'suspect-2', location: 'Medical Room', activity: 'Treating injuries', verified: true },
        { suspectId: 'suspect-3', location: 'Coach\'s Office', activity: 'Murdering coach', verified: true },
        { suspectId: 'suspect-4', location: 'Rival Hotel', activity: 'At hotel', verified: true }
      ]},
      { time: '6:30', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Training Field', activity: 'Training players', verified: true },
        { suspectId: 'suspect-2', location: 'Medical Room', activity: 'Treating injuries', verified: true },
        { suspectId: 'suspect-3', location: 'Equipment Room', activity: 'In room', verified: false },
        { suspectId: 'suspect-4', location: 'Rival Hotel', activity: 'At hotel', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Equipment manager claimed to be in equipment room but camera shows them entering coach\'s office at 6:20 PM. Coach murdered at 6:28 PM. Coach fired them that morning and they had betting debts.',
    timeLimit: 480,
    hintCount: 4,
    points: 600
  },
  {
    id: 'mystery-047',
    level: 47,
    difficulty: 'hard',
    title: '🎸️ The Rock Star Murder',
    description: 'Who murdered rock star?',
    scenario: 'A rock star was murdered in recording studio. Music industry dark secrets.',
    suspects: [
      { id: 'suspect-1', name: 'Band Manager', age: '48', occupation: 'Manager', statement: 'I was negotiating record deal.', alibi: 'Record label', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Producer', age: '42', occupation: 'Producer', statement: 'I was mixing album.', alibi: 'Studio recording', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Roadie', age: '32', occupation: 'Roadie', statement: 'I was setting up equipment.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Rival Band Member', age: '38', occupation: 'Musician', statement: 'I was at my studio.', alibi: 'Studio cameras', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 10:42 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Roadie seen near rock star\'s lounge at 10:35 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Roadie stole rock star\'s royalties.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Roadie had lounge access.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-5', description: '😤 Rock star caught roadie stealing.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Studio Camera', icon: '📹', description: 'Camera shows roadie entering rock star\'s lounge at 10:35 PM, leaving at 10:45 PM.', cost: 35, location: 'Studio security', collected: false },
      { id: 'ev-2', name: 'Royalty Records', icon: '📊', description: 'Financial records show roadie embezzled $80,000 in royalties.', cost: 40, location: 'Label investigation', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Studio access log shows roadie had rock star\'s lounge master key.', cost: 30, location: 'Studio records', collected: false },
      { id: 'ev-4', name: 'Confrontation Witness', icon: '👥', description: 'Band members report rock star caught roadie stealing royalties and threatened to expose.', cost: 35, location: 'Band statements', collected: false }
    ],
    timeline: [
      { time: '10:30', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Record Label', activity: 'Negotiating deal', verified: true },
        { suspectId: 'suspect-2', location: 'Studio', activity: 'Mixing album', verified: true },
        { suspectId: 'suspect-3', location: 'Equipment Area', activity: 'Claimed: setting up', verified: false },
        { suspectId: 'suspect-4', location: 'Rival Studio', activity: 'At studio', verified: true }
      ]},
      { time: '10:35', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Record Label', activity: 'Negotiating deal', verified: true },
        { suspectId: 'suspect-2', location: 'Studio', activity: 'Mixing album', verified: true },
        { suspectId: 'suspect-3', location: 'Rock Star\'s Lounge', activity: 'Entering lounge', verified: true },
        { suspectId: 'suspect-4', location: 'Rival Studio', activity: 'At studio', verified: true }
      ]},
      { time: '10:42', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Record Label', activity: 'Negotiating deal', verified: true },
        { suspectId: 'suspect-2', location: 'Studio', activity: 'Mixing album', verified: true },
        { suspectId: 'suspect-3', location: 'Rock Star\'s Lounge', activity: 'Murdering rock star', verified: true },
        { suspectId: 'suspect-4', location: 'Rival Studio', activity: 'At studio', verified: true }
      ]},
      { time: '10:45', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Record Label', activity: 'Negotiating deal', verified: true },
        { suspectId: 'suspect-2', location: 'Studio', activity: 'Mixing album', verified: true },
        { suspectId: 'suspect-3', location: 'Equipment Area', activity: 'Setting up', verified: false },
        { suspectId: 'suspect-4', location: 'Rival Studio', activity: 'At studio', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Roadie claimed to set up equipment but camera shows them entering rock star\'s lounge at 10:35 PM. Rock star murdered at 10:42 PM. Roadie embezzled royalties and rock star threatened to expose.',
    timeLimit: 480,
    hintCount: 4,
    points: 600
  },
  {
    id: 'mystery-048',
    level: 48,
    difficulty: 'hard',
    title: '🎭️ The Actress Murder',
    description: 'Who murdered famous actress?',
    scenario: 'A famous actress was murdered on movie set. Hollywood glamour and dark secrets.',
    suspects: [
      { id: 'suspect-1', name: 'Director A', age: '52', occupation: 'Director', statement: 'I was directing scene.', alibi: 'Film crew', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Makeup Artist', age: '35', occupation: 'Makeup', statement: 'I was applying makeup.', alibi: 'Trailer cameras', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Costume Designer', age: '42', occupation: 'Designer', statement: 'I was fitting costumes.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Producer', age: '48', occupation: 'Producer', statement: 'I was reviewing budget.', alibi: 'Budget meeting', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 3:08 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Costume designer seen near actress\'s trailer at 3:00 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Costume designer stole actress\'s designs.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Costume designer had trailer access.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-5', description: '😤 Actress sued costume designer.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Set Camera', icon: '📹', description: 'Camera shows costume designer entering actress\'s trailer at 3:00 PM, leaving at 3:10 PM.', cost: 35, location: 'Set security', collected: false },
      { id: 'ev-2', name: 'Design Theft', icon: '🎨', description: 'Legal records show actress sued costume designer for stealing her original designs.', cost: 40, location: 'Court records', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Production access log shows costume designer had trailer master key.', cost: 30, location: 'Production records', collected: false },
      { id: 'ev-4', name: 'Lawsuit Documents', icon: '⚖️', description: 'Found lawsuit documents showing actress was suing costume designer for $500,000.', cost: 35, location: 'Actress\'s papers', collected: false }
    ],
    timeline: [
      { time: '2:55', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Set', activity: 'Directing scene', verified: true },
        { suspectId: 'suspect-2', location: 'Makeup Trailer', activity: 'Applying makeup', verified: true },
        { suspectId: 'suspect-3', location: 'Costume Room', activity: 'Claimed: fitting costumes', verified: false },
        { suspectId: 'suspect-4', location: 'Production Office', activity: 'Reviewing budget', verified: true }
      ]},
      { time: '3:00', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Set', activity: 'Directing scene', verified: true },
        { suspectId: 'suspect-2', location: 'Makeup Trailer', activity: 'Applying makeup', verified: true },
        { suspectId: 'suspect-3', location: 'Actress\'s Trailer', activity: 'Entering trailer', verified: true },
        { suspectId: 'suspect-4', location: 'Production Office', activity: 'Reviewing budget', verified: true }
      ]},
      { time: '3:08', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Set', activity: 'Directing scene', verified: true },
        { suspectId: 'suspect-2', location: 'Makeup Trailer', activity: 'Applying makeup', verified: true },
        { suspectId: 'suspect-3', location: 'Actress\'s Trailer', activity: 'Murdering actress', verified: true },
        { suspectId: 'suspect-4', location: 'Production Office', activity: 'Reviewing budget', verified: true }
      ]},
      { time: '3:10', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Set', activity: 'Directing scene', verified: true },
        { suspectId: 'suspect-2', location: 'Makeup Trailer', activity: 'Applying makeup', verified: true },
        { suspectId: 'suspect-3', location: 'Costume Room', activity: 'Fitting costumes', verified: false },
        { suspectId: 'suspect-4', location: 'Production Office', activity: 'Reviewing budget', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Costume designer claimed to fit costumes but camera shows them entering actress\'s trailer at 3:00 PM. Actress murdered at 3:08 PM. Actress sued them for stealing her designs.',
    timeLimit: 480,
    hintCount: 4,
    points: 600
  },
  {
    id: 'mystery-049',
    level: 49,
    difficulty: 'hard',
    title: '🏖️️ The Resort Murder',
    description: 'Who murdered wealthy guest?',
    scenario: 'A wealthy guest was murdered at luxury resort. Secrets among the wealthy.',
    suspects: [
      { id: 'suspect-1', name: 'Resort Manager', age: '52', occupation: 'Manager', statement: 'I was in main office.', alibi: 'Office cameras', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Personal Chef', age: '42', occupation: 'Chef', statement: 'I was preparing meals.', alibi: 'Kitchen cameras', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Spa Manager', age: '38', occupation: 'Manager', statement: 'I was overseeing treatments.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Concierge', age: '35', occupation: 'Concierge', statement: 'I was assisting guests.', alibi: 'Lobby cameras', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 7:35 PM.', type: 'time' },
      { id: 'clue-2', description: '📍 Spa manager seen near guest\'s suite at 7:28 PM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Spa manager had gambling debts.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Spa manager had suite access.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-5', description: '😤 Guest fired spa manager.', type: 'evidence', relatedSuspect: 'suspect-3' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Resort Camera', icon: '📹', description: 'Camera shows spa manager entering guest\'s suite at 7:28 PM, leaving at 7:38 PM.', cost: 35, location: 'Resort security', collected: false },
      { id: 'ev-2', name: 'Debt Records', icon: '📊', description: 'Financial records show spa manager has $45,000 in gambling debts.', cost: 40, location: 'Background check', collected: false },
      { id: 'ev-3', name: 'Access Log', icon: '🔑', description: 'Resort access log shows spa manager had master suite key.', cost: 30, location: 'Resort records', collected: false },
      { id: 'ev-4', name: 'Termination Notice', icon: '📝', description: 'Found termination letter showing guest fired spa manager.', cost: 35, location: 'Guest\'s documents', collected: false }
    ],
    timeline: [
      { time: '7:20', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Main Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Kitchen', activity: 'Preparing meals', verified: true },
        { suspectId: 'suspect-3', location: 'Spa Area', activity: 'Claimed: overseeing', verified: false },
        { suspectId: 'suspect-4', location: 'Lobby', activity: 'Assisting guests', verified: true }
      ]},
      { time: '7:28', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Main Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Kitchen', activity: 'Preparing meals', verified: true },
        { suspectId: 'suspect-3', location: 'Guest\'s Suite', activity: 'Entering suite', verified: true },
        { suspectId: 'suspect-4', location: 'Lobby', activity: 'Assisting guests', verified: true }
      ]},
      { time: '7:35', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Main Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Kitchen', activity: 'Preparing meals', verified: true },
        { suspectId: 'suspect-3', location: 'Guest\'s Suite', activity: 'Murdering guest', verified: true },
        { suspectId: 'suspect-4', location: 'Lobby', activity: 'Assisting guests', verified: true }
      ]},
      { time: '7:38', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Main Office', activity: 'Working', verified: true },
        { suspectId: 'suspect-2', location: 'Kitchen', activity: 'Preparing meals', verified: true },
        { suspectId: 'suspect-3', location: 'Spa Area', activity: 'Overseeing', verified: false },
        { suspectId: 'suspect-4', location: 'Lobby', activity: 'Assisting guests', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Spa manager claimed to oversee treatments but camera shows them entering guest\'s suite at 7:28 PM. Guest murdered at 7:35 PM. Guest fired them and they had gambling debts.',
    timeLimit: 480,
    hintCount: 4,
    points: 600
  },
  {
    id: 'mystery-050',
    level: 50,
    difficulty: 'hard',
    title: '🏛️️ The Diplomat Murder',
    description: 'Who murdered high-ranking diplomat?',
    scenario: 'A high-ranking diplomat was murdered during summit. International conspiracy.',
    suspects: [
      { id: 'suspect-1', name: 'Diplomatic Advisor', age: '48', occupation: 'Advisor', statement: 'I was in summit sessions.', alibi: 'Summit footage', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-2', name: 'Bodyguard Chief', age: '42', occupation: 'Security', statement: 'I was coordinating security.', alibi: 'Security logs', alibiVerified: true, alibiContradicted: false },
      { id: 'suspect-3', name: 'Diplomatic Secretary', age: '38', occupation: 'Secretary', statement: 'I was preparing briefing.', alibi: 'No witnesses', alibiVerified: false, alibiContradicted: true },
      { id: 'suspect-4', name: 'Foreign Diplomat', age: '52', occupation: 'Diplomat', statement: 'I was in my embassy suite.', alibi: 'Embassy cameras', alibiVerified: true, alibiContradicted: false }
    ],
    clues: [
      { id: 'clue-1', description: '⏱️ Murder at 11:52 AM.', type: 'time' },
      { id: 'clue-2', description: '📍 Secretary seen entering diplomat\'s office at 11:45 AM.', type: 'alibi', relatedSuspect: 'suspect-3' },
      { id: 'clue-3', description: '💰 Secretary accepted bribe from foreign country.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-4', description: '🔑 Secretary had office master key.', type: 'evidence', relatedSuspect: 'suspect-3' },
      { id: 'clue-5', description: '🔗 Secretary contacted foreign diplomat.', type: 'evidence', relatedSuspect: 'suspect-4' }
    ],
    evidence: [
      { id: 'ev-1', name: 'Summit Camera', icon: '📹', description: 'Camera shows secretary entering diplomat\'s office at 11:45 AM, leaving at 11:55 AM.', cost: 35, location: 'Summit security', collected: false },
      { id: 'ev-2', name: 'Bribe Recording', icon: '💰', description: 'Wiretap shows secretary accepting $1 million bribe from foreign diplomat.', cost: 40, location: 'Intelligence', collected: false },
      { id: 'ev-3', name: 'Master Key', icon: '🔑', description: 'Diplomatic access log shows secretary had office master key.', cost: 30, location: 'Diplomatic records', collected: false },
      { id: 'ev-4', name: 'Contact Records', icon: '🔗', description: 'Phone records show secretary contacted foreign diplomat 12 times during summit.', cost: 35, location: 'Intelligence', collected: false }
    ],
    timeline: [
      { time: '11:40', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Summit Hall', activity: 'In sessions', verified: true },
        { suspectId: 'suspect-2', location: 'Security Center', activity: 'Coordinating', verified: true },
        { suspectId: 'suspect-3', location: 'Briefing Room', activity: 'Claimed: preparing', verified: false },
        { suspectId: 'suspect-4', location: 'Embassy Suite', activity: 'In suite', verified: true }
      ]},
      { time: '11:45', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Summit Hall', activity: 'In sessions', verified: true },
        { suspectId: 'suspect-2', location: 'Security Center', activity: 'Coordinating', verified: true },
        { suspectId: 'suspect-3', location: 'Diplomat\'s Office', activity: 'Entering office', verified: true },
        { suspectId: 'suspect-4', location: 'Embassy Suite', activity: 'In suite', verified: true }
      ]},
      { time: '11:52', crimeTime: true, suspectLocations: [
        { suspectId: 'suspect-1', location: 'Summit Hall', activity: 'In sessions', verified: true },
        { suspectId: 'suspect-2', location: 'Security Center', activity: 'Coordinating', verified: true },
        { suspectId: 'suspect-3', location: 'Diplomat\'s Office', activity: 'Murdering diplomat', verified: true },
        { suspectId: 'suspect-4', location: 'Embassy Suite', activity: 'In suite', verified: true }
      ]},
      { time: '11:55', suspectLocations: [
        { suspectId: 'suspect-1', location: 'Summit Hall', activity: 'In sessions', verified: true },
        { suspectId: 'suspect-2', location: 'Security Center', activity: 'Coordinating', verified: true },
        { suspectId: 'suspect-3', location: 'Briefing Room', activity: 'Preparing briefing', verified: false },
        { suspectId: 'suspect-4', location: 'Embassy Suite', activity: 'In suite', verified: true }
      ]}
    ],
    correctAnswer: 'suspect-3',
    explanation: 'Secretary claimed to prepare briefing but camera shows them entering diplomat\'s office at 11:45 AM. Diplomat murdered at 11:52 AM. They accepted $1 million bribe from foreign diplomat and had office master key.',
    timeLimit: 480,
    hintCount: 4,
    points: 600
  }
];

// Helper functions
export function getMysteryProblem(level: number): MysteryProblem | undefined {
  return mysteryProblems.find(p => p.level === level);
}

export function getNextMysteryLevel(currentLevel: number): number {
  const problem = getMysteryProblem(currentLevel);
  if (!problem) return 1;

  // Find next level with same or higher difficulty
  const nextProblem = mysteryProblems.find(p => p.level > currentLevel);
  return nextProblem ? nextProblem.level : 1; // Return to level 1 if completed all
}