// Mock Walk Service - Following walk2.md specification
// This service provides mock data for Safety Walks frontend development
// Will be replaced with real API calls in Phase 2

// Import all types from the shared types directory
import {
  WalkType,
  WalkMode,
  WalkStatus,
  RouteType,
  CheckItemType,
  VerificationType,
  EvidenceType,
  CheckItem,
  WalkCheckpoint,
  SafetyWalk,
  WalkTemplate,
  WalkExecution,
  WalkResponse
} from '@/types/behaviour/walks';

import {
  BehaviourCategory,
  BehaviourReport,
  BEHAVIOUR_POINTS,
  BEHAVIOUR_COLORS,
  BEHAVIOUR_ICONS
} from '@/types/behaviour/reports';

import { Location } from '@/types/common/location';

// Re-export types for backward compatibility
export {
  WalkType,
  WalkMode,
  WalkStatus,
  RouteType,
  CheckItemType,
  VerificationType,
  EvidenceType,
  CheckItem,
  WalkCheckpoint,
  SafetyWalk,
  WalkTemplate,
  WalkExecution,
  WalkResponse,
  BehaviourCategory,
  BehaviourReport,
  BEHAVIOUR_POINTS,
  BEHAVIOUR_COLORS,
  BEHAVIOUR_ICONS,
  Location
};

// Additional types specific to mock service implementation
// (Types that are not part of the shared type system)

export interface MockSafetyWalk extends SafetyWalk {
  // Location & Route
  primaryLocation: Location;
  mapImageUrl?: string;
  routeType: RouteType;
  route?: any; // GeoJSON
  estimatedDistance?: number;

  // Checkpoints
  checkpoints: WalkCheckpoint[];
  isOrdered: boolean;

  // Requirements
  duration: number; // minutes
  isGPSTracked: boolean;
  isSignOffRequired: boolean;
  evidenceRequired: EvidenceType[];

  // Scheduling
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'adhoc';
    time?: string;
    assignedTo?: string[];
  };
}

// Walk execution interfaces - Mock service specific
export interface CheckpointResponse {
  checkpointId: number;
  timestamp: Date;
  responses: Array<{
    checkItemId: string;
    value: any;
  }>;
  evidence?: {
    photos?: string[];
    signature?: string;
    location?: [number, number];
  };
  passed: boolean;
  issues?: string[];
}

export interface BehaviourObservation {
  id: string;
  category: BehaviourCategory;
  description: string;
  location: string;
  timestamp: Date;
  evidence?: string[];
  points: number;
  checkpointId?: number;
}

export interface WalkSession {
  sessionId: string;
  walkId: number;
  executorId: number;
  executorName: string;
  
  // Progress
  status: WalkStatus;
  startTime: Date;
  endTime?: Date;
  currentCheckpointIndex: number;
  
  // Responses
  checkpointResponses: CheckpointResponse[];
  journeyObservations: BehaviourObservation[];
  
  // Evidence
  photos: string[];
  signatures: string[];
  gpsTrack?: Array<[number, number]>; // coordinates
  
  // Scoring
  totalPoints: number;
  checkpointsCompleted: number;
  issuesFound: number;
  
  // Generated Reports
  behaviourReportsCreated: number[];
}

// Mock Walk Templates
export const mockWalkTemplates: WalkTemplate[] = [
  {
    id: 1,
    title: 'Daily Housekeeping Walk',
    type: 'housekeeping',
    icon: '🧹',
    description: '5S cleanliness and organisation check',
    duration: 20,
    mode: 'checkpoint',
    isGPSTracked: true,
    popularity: 85,
    lastUsed: '2 hours ago',
    checkpoints: [
      {
        checkpointId: 101,
        name: 'Main Entrance',
        description: 'Check entrance area for cleanliness and safety',
        location: {
          name: 'Building A - Main Entry',
          coordinates: [-1.2345, 52.9876],
          qrCode: 'QR-ENTRY-001'
        },
        checks: [
          {
            id: 'chk-101-0',
            question: 'Scan QR code at entrance',
            type: 'qr' as any,
            required: true,
            scoreValue: 5
          },
          {
            id: 'chk-101-1',
            question: 'Is the floor clean and dry?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-101-2',
            question: 'Are safety mats in place and secure?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-101-3',
            question: 'Is signage clearly visible?',
            type: 'yes/no',
            required: true,
            scoreValue: 5
          }
        ],
        quickActions: ['Report hazard', 'Take photo', 'Add note'],
        verificationType: 'qr',
        confirmationRequired: true,
        orderNum: 1,
        travelTime: 0,
        expectedDuration: 120
      },
      {
        checkpointId: 102,
        name: 'Storage Area A',
        description: 'Verify storage organisation and accessibility',
        location: {
          name: 'Warehouse - Section A',
          coordinates: [-1.2346, 52.9877]
        },
        checks: [
          {
            id: 'chk-102-1',
            question: 'Are all items properly labelled?',
            type: 'yes/no',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-102-2',
            question: 'Are aisles clear of obstructions?',
            type: 'pass/fail',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-102-3',
            question: 'Any trip hazards present?',
            type: 'yes/no',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-102-4',
            question: 'Take photo of storage area',
            type: 'photo',
            required: false,
            scoreValue: 5
          }
        ],
        quickActions: ['Report hazard', 'Mark for cleaning'],
        verificationType: 'gps',
        confirmationRequired: true,
        orderNum: 2,
        travelTime: 60,
        expectedDuration: 180
      },
      {
        checkpointId: 103,
        name: 'Break Room',
        description: 'Check hygiene and supplies',
        location: {
          name: 'Staff Break Room',
          coordinates: [-1.2347, 52.9878]
        },
        checks: [
          {
            id: 'chk-103-1',
            question: 'Are surfaces clean and sanitized?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-103-2',
            question: 'Is waste properly disposed?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-103-3',
            question: 'First aid kit stocked?',
            type: 'checkbox',
            required: true,
            scoreValue: 15
          }
        ],
        // behaviourCategory: 'good-behavior',
        quickActions: ['Request supplies', 'Schedule cleaning'],
        // pointValue: 10,
        verificationType: 'manual',
        confirmationRequired: false,
        orderNum: 3,
        travelTime: 45,
        expectedDuration: 120
      }
    ]
  },
  {
    id: 2,
    title: 'Security Walk',
    type: 'security',
    icon: '🔒',
    description: 'Access control and perimeter security check',
    duration: 30,
    mode: 'hybrid',
    isGPSTracked: true,
    popularity: 92,
    lastUsed: 'Today',
    checkpoints: [
      {
        checkpointId: 201,
        name: 'Main Gate',
        description: 'Verify gate security and access control',
        location: {
          name: 'Perimeter - Main Gate',
          coordinates: [-1.2340, 52.9870],
          qrCode: 'QR-GATE-001'
        },
        checks: [
          {
            id: 'chk-201-1',
            question: 'Is gate locked and secure?',
            type: 'yes/no',
            required: true,
            scoreValue: 25
          },
          {
            id: 'chk-201-2',
            question: 'CCTV operational?',
            type: 'pass/fail',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-201-3',
            question: 'Access log updated?',
            type: 'checkbox',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-201-4',
            question: 'Photo of gate status',
            type: 'photo',
            required: false,
            scoreValue: 5
          }
        ],
        // behaviourCategory: 'intervention',
        quickActions: ['Report breach', 'Call security', 'Lock gate'],
        // pointValue: 25,
        verificationType: 'qr',
        confirmationRequired: true,
        orderNum: 1,
        travelTime: 0,
        expectedDuration: 180
      },
      {
        checkpointId: 202,
        name: 'Server Room',
        description: 'Check server room access and environment',
        location: {
          name: 'IT - Server Room',
          coordinates: [-1.2342, 52.9872]
        },
        checks: [
          {
            id: 'chk-202-1',
            question: 'Door properly secured?',
            type: 'yes/no',
            required: true,
            scoreValue: 30
          },
          {
            id: 'chk-202-2',
            question: 'Temperature within range?',
            type: 'text',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-202-3',
            question: 'No unauthorized personnel?',
            type: 'yes/no',
            required: true,
            scoreValue: 25
          }
        ],
        // behaviourCategory: 'save',
        quickActions: ['Alert IT', 'Check logs', 'Reset access'],
        // pointValue: 30,
        verificationType: 'manual',
        confirmationRequired: true,
        orderNum: 2,
        travelTime: 120,
        expectedDuration: 150
      }
    ]
  },
  {
    id: 3,
    title: 'Fire Safety Walk',
    type: 'fire',
    icon: '🔥',
    description: 'Emergency equipment and exit routes inspection',
    duration: 35,
    mode: 'checkpoint',
    isGPSTracked: false,
    popularity: 78,
    lastUsed: 'Yesterday',
    checkpoints: [
      {
        checkpointId: 301,
        name: 'Fire Exit A',
        description: 'Check emergency exit accessibility',
        location: {
          name: 'Building A - Emergency Exit',
          coordinates: [-1.2348, 52.9879]
        },
        checks: [
          {
            id: 'chk-301-1',
            question: 'Exit route clear and unobstructed?',
            type: 'pass/fail',
            required: true,
            scoreValue: 40
          },
          {
            id: 'chk-301-2',
            question: 'Emergency lighting working?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-301-3',
            question: 'Exit signage visible?',
            type: 'yes/no',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-301-4',
            question: 'Door opens freely?',
            type: 'yes/no',
            required: true,
            scoreValue: 25
          }
        ],
        // behaviourCategory: 'save',
        quickActions: ['Clear obstruction', 'Report fault', 'Test alarm'],
        // pointValue: 40,
        verificationType: 'photo',
        confirmationRequired: true,
        orderNum: 1,
        travelTime: 0,
        expectedDuration: 180
      },
      {
        checkpointId: 302,
        name: 'Fire Extinguisher Station 1',
        description: 'Verify extinguisher readiness',
        location: {
          name: 'Corridor A - Station 1',
          coordinates: [-1.2349, 52.9880]
        },
        checks: [
          {
            id: 'chk-302-1',
            question: 'Extinguisher present and mounted?',
            type: 'yes/no',
            required: true,
            scoreValue: 30
          },
          {
            id: 'chk-302-2',
            question: 'Pressure gauge in green zone?',
            type: 'pass/fail',
            required: true,
            scoreValue: 25
          },
          {
            id: 'chk-302-3',
            question: 'Inspection tag current?',
            type: 'yes/no',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-302-4',
            question: 'Access unobstructed?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          }
        ],
        // behaviourCategory: 'hazard',
        quickActions: ['Replace extinguisher', 'Schedule inspection'],
        // pointValue: 25,
        verificationType: 'manual',
        confirmationRequired: false,
        orderNum: 2,
        travelTime: 60,
        expectedDuration: 120
      }
    ]
  },
  {
    id: 4,
    title: 'Bathroom Hygiene Inspection',
    type: 'hygiene',
    icon: '🚻',
    description: 'Complete bathroom cleanliness and supply check',
    duration: 15,
    mode: 'checkpoint',
    isGPSTracked: false,
    popularity: 95,
    lastUsed: 'Today',
    checkpoints: [
      {
        checkpointId: 401,
        name: 'Ground Floor - Men\'s Bathroom',
        description: 'Verify cleanliness and supplies',
        location: {
          name: 'Building A - Ground Floor',
          qrCode: 'QR-BATH-GF-M'
        },
        checks: [
          {
            id: 'chk-401-0',
            question: 'Scan QR code at entrance',
            type: 'qr' as any,
            required: true,
            scoreValue: 5
          },
          {
            id: 'chk-401-1',
            question: 'Has bathroom been cleaned?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-401-2',
            question: 'Soap dispensers filled?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-401-3',
            question: 'Paper towels/dryers working?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-401-4',
            question: 'Toilet paper stocked?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-401-5',
            question: 'Floor dry and safe?',
            type: 'pass/fail',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-401-6',
            question: 'Photo of cleaning certificate',
            type: 'photo',
            required: false,
            scoreValue: 5
          }
        ],
        quickActions: ['Report issue', 'Request cleaning', 'Refill supplies'],
        verificationType: 'qr',
        confirmationRequired: true,
        orderNum: 1,
        travelTime: 0,
        expectedDuration: 180
      },
      {
        checkpointId: 402,
        name: 'Ground Floor - Women\'s Bathroom',
        description: 'Verify cleanliness and supplies',
        location: {
          name: 'Building A - Ground Floor',
          qrCode: 'QR-BATH-GF-W'
        },
        checks: [
          {
            id: 'chk-402-0',
            question: 'Scan QR code at entrance',
            type: 'qr' as any,
            required: true,
            scoreValue: 5
          },
          {
            id: 'chk-402-1',
            question: 'Has bathroom been cleaned?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-402-2',
            question: 'Soap dispensers filled?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-402-3',
            question: 'Paper towels/dryers working?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-402-4',
            question: 'Sanitary bins emptied?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-402-5',
            question: 'Floor dry and safe?',
            type: 'pass/fail',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-402-6',
            question: 'Photo of cleaning certificate',
            type: 'photo',
            required: false,
            scoreValue: 5
          }
        ],
        quickActions: ['Report issue', 'Request cleaning', 'Refill supplies'],
        verificationType: 'qr',
        confirmationRequired: true,
        orderNum: 2,
        travelTime: 30,
        expectedDuration: 180
      },
      {
        checkpointId: 403,
        name: 'First Floor - Men\'s Bathroom',
        description: 'Verify cleanliness and supplies',
        location: {
          name: 'Building A - First Floor',
          qrCode: 'QR-BATH-1F-M'
        },
        checks: [
          {
            id: 'chk-403-0',
            question: 'Scan QR code at entrance',
            type: 'qr' as any,
            required: true,
            scoreValue: 5
          },
          {
            id: 'chk-403-1',
            question: 'Has bathroom been cleaned?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-403-2',
            question: 'Soap dispensers filled?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-403-3',
            question: 'Paper towels/dryers working?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-403-4',
            question: 'Toilet paper stocked?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-403-5',
            question: 'Floor dry and safe?',
            type: 'pass/fail',
            required: true,
            scoreValue: 15
          }
        ],
        quickActions: ['Report issue', 'Request cleaning', 'Refill supplies'],
        verificationType: 'qr',
        confirmationRequired: true,
        orderNum: 3,
        travelTime: 60,
        expectedDuration: 180
      },
      {
        checkpointId: 404,
        name: 'First Floor - Women\'s Bathroom',
        description: 'Verify cleanliness and supplies',
        location: {
          name: 'Building A - First Floor',
          qrCode: 'QR-BATH-1F-W'
        },
        checks: [
          {
            id: 'chk-404-0',
            question: 'Scan QR code at entrance',
            type: 'qr' as any,
            required: true,
            scoreValue: 5
          },
          {
            id: 'chk-404-1',
            question: 'Has bathroom been cleaned?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-404-2',
            question: 'Soap dispensers filled?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-404-3',
            question: 'Paper towels/dryers working?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-404-4',
            question: 'Sanitary bins emptied?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-404-5',
            question: 'Floor dry and safe?',
            type: 'pass/fail',
            required: true,
            scoreValue: 15
          }
        ],
        quickActions: ['Report issue', 'Request cleaning', 'Refill supplies'],
        verificationType: 'qr',
        confirmationRequired: true,
        orderNum: 4,
        travelTime: 30,
        expectedDuration: 180
      },
      {
        checkpointId: 405,
        name: 'Disabled Access Bathroom',
        description: 'Verify accessibility and supplies',
        location: {
          name: 'Building A - Ground Floor',
          qrCode: 'QR-BATH-DA'
        },
        checks: [
          {
            id: 'chk-405-0',
            question: 'Scan QR code at entrance',
            type: 'qr' as any,
            required: true,
            scoreValue: 5
          },
          {
            id: 'chk-405-1',
            question: 'Has bathroom been cleaned?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-405-2',
            question: 'Emergency cord accessible?',
            type: 'pass/fail',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-405-3',
            question: 'Grab rails secure?',
            type: 'pass/fail',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-405-4',
            question: 'Supplies at accessible height?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-405-5',
            question: 'Floor dry and safe?',
            type: 'pass/fail',
            required: true,
            scoreValue: 15
          }
        ],
        quickActions: ['Report issue', 'Request cleaning', 'Emergency maintenance'],
        verificationType: 'qr',
        confirmationRequired: true,
        orderNum: 5,
        travelTime: 60,
        expectedDuration: 180
      }
    ]
  },
  {
    id: 5,
    title: 'Equipment Walk',
    type: 'equipment',
    icon: '⚙️',
    description: 'Machinery safety and maintenance check',
    duration: 30,
    mode: 'checkpoint',
    isGPSTracked: true,
    popularity: 70,
    lastUsed: '3 days ago',
    checkpoints: [
      {
        checkpointId: 501,
        name: 'Machine Shop - Lathe',
        description: 'Check lathe safety features',
        location: {
          name: 'Machine Shop - Lathe Area',
          qrCode: 'QR-LATHE-001'
        },
        checks: [
          {
            id: 'chk-501-1',
            question: 'Emergency stop functional?',
            type: 'pass/fail',
            required: true,
            scoreValue: 40
          },
          {
            id: 'chk-501-2',
            question: 'Guards in place?',
            type: 'yes/no',
            required: true,
            scoreValue: 30
          },
          {
            id: 'chk-501-3',
            question: 'Lockout/tagout procedures posted?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-501-4',
            question: 'Area clean of debris?',
            type: 'yes/no',
            required: false,
            scoreValue: 10
          }
        ],
        // behaviourCategory: 'near-miss',
        quickActions: ['Stop machine', 'Report fault', 'Tag out'],
        // pointValue: 30,
        verificationType: 'qr',
        confirmationRequired: true,
        orderNum: 1,
        travelTime: 0,
        expectedDuration: 240
      }
    ]
  },
  {
    id: 6,
    title: 'Opening Procedures Walk',
    type: 'security',
    icon: '🌅',
    description: 'Start of day safety and security checks',
    duration: 20,
    mode: 'checkpoint',
    isGPSTracked: false,
    popularity: 100,
    lastUsed: 'Today',
    checkpoints: [
      {
        checkpointId: 601,
        name: 'Main Entrance',
        description: 'Unlock and perform security check',
        location: {
          name: 'Building Main Entrance',
          qrCode: 'QR-OPEN-MAIN'
        },
        checks: [
          {
            id: 'chk-601-0',
            question: 'Scan QR code at entrance',
            type: 'qr' as any,
            required: true,
            scoreValue: 5
          },
          {
            id: 'chk-601-1',
            question: 'External doors secure overnight?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-601-2',
            question: 'No signs of forced entry?',
            type: 'pass/fail',
            required: true,
            scoreValue: 30
          },
          {
            id: 'chk-601-3',
            question: 'Alarm system disarmed properly?',
            type: 'yes/no',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-601-4',
            question: 'Enter alarm code',
            type: 'text',
            required: false,
            scoreValue: 5
          }
        ],
        quickActions: ['Call security', 'Report incident', 'Check CCTV'],
        verificationType: 'qr',
        confirmationRequired: true,
        orderNum: 1,
        travelTime: 0,
        expectedDuration: 180
      },
      {
        checkpointId: 602,
        name: 'Reception Area',
        description: 'Turn on systems and check messages',
        location: {
          name: 'Reception Desk',
          qrCode: 'QR-OPEN-RECEP'
        },
        checks: [
          {
            id: 'chk-602-1',
            question: 'Computer systems booted?',
            type: 'checkbox',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-602-2',
            question: 'Phone system operational?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-602-3',
            question: 'Check overnight messages/incidents',
            type: 'checkbox',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-602-4',
            question: 'Visitor log book ready?',
            type: 'yes/no',
            required: false,
            scoreValue: 5
          }
        ],
        quickActions: ['IT support', 'Check voicemail', 'Print visitor badges'],
        verificationType: 'manual',
        confirmationRequired: false,
        orderNum: 2,
        travelTime: 60,
        expectedDuration: 240
      },
      {
        checkpointId: 603,
        name: 'Emergency Exits',
        description: 'Verify all exits are clear and functional',
        location: {
          name: 'All Emergency Exits'
        },
        checks: [
          {
            id: 'chk-603-1',
            question: 'All fire exits unlocked?',
            type: 'pass/fail',
            required: true,
            scoreValue: 40
          },
          {
            id: 'chk-603-2',
            question: 'Exit routes clear?',
            type: 'pass/fail',
            required: true,
            scoreValue: 30
          },
          {
            id: 'chk-603-3',
            question: 'Emergency lighting tested?',
            type: 'checkbox',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-603-4',
            question: 'Photo of clear exit route',
            type: 'photo',
            required: false,
            scoreValue: 5
          }
        ],
        quickActions: ['Clear obstruction', 'Test alarm', 'Report fault'],
        verificationType: 'manual',
        confirmationRequired: true,
        orderNum: 3,
        travelTime: 120,
        expectedDuration: 300
      },
      {
        checkpointId: 604,
        name: 'First Aid Station',
        description: 'Check supplies and equipment',
        location: {
          name: 'Main First Aid Station',
          qrCode: 'QR-OPEN-AID'
        },
        checks: [
          {
            id: 'chk-604-0',
            question: 'Scan QR code at station',
            type: 'qr' as any,
            required: true,
            scoreValue: 5
          },
          {
            id: 'chk-604-1',
            question: 'First aid kit fully stocked?',
            type: 'yes/no',
            required: true,
            scoreValue: 25
          },
          {
            id: 'chk-604-2',
            question: 'AED operational (green light)?',
            type: 'pass/fail',
            required: true,
            scoreValue: 30
          },
          {
            id: 'chk-604-3',
            question: 'Emergency contact list current?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-604-4',
            question: 'Incident log book present?',
            type: 'checkbox',
            required: false,
            scoreValue: 5
          }
        ],
        quickActions: ['Order supplies', 'Test AED', 'Update contacts'],
        verificationType: 'qr',
        confirmationRequired: true,
        orderNum: 4,
        travelTime: 90,
        expectedDuration: 180
      },
      {
        checkpointId: 605,
        name: 'Utilities Room',
        description: 'Check main systems',
        location: {
          name: 'Utilities/Plant Room'
        },
        checks: [
          {
            id: 'chk-605-1',
            question: 'HVAC system running?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-605-2',
            question: 'Water pressure normal?',
            type: 'pass/fail',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-605-3',
            question: 'Electrical panels secure?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-605-4',
            question: 'Record temperature reading',
            type: 'text',
            required: false,
            scoreValue: 5
          },
          {
            id: 'chk-605-5',
            question: 'No unusual noises/smells?',
            type: 'yes/no',
            required: true,
            scoreValue: 15
          }
        ],
        quickActions: ['Call maintenance', 'Check meters', 'Reset system'],
        verificationType: 'manual',
        confirmationRequired: true,
        orderNum: 5,
        travelTime: 120,
        expectedDuration: 240
      },
      {
        checkpointId: 606,
        name: 'Staff Room',
        description: 'Final checks before opening',
        location: {
          name: 'Staff Break Room'
        },
        checks: [
          {
            id: 'chk-606-1',
            question: 'Safety notices displayed?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-606-2',
            question: 'Today\'s roster posted?',
            type: 'checkbox',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-606-3',
            question: 'Coffee machine on?',
            type: 'checkbox',
            required: false,
            scoreValue: 5
          },
          {
            id: 'chk-606-4',
            question: 'Emergency procedures visible?',
            type: 'yes/no',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-606-5',
            question: 'Staff briefing area ready?',
            type: 'yes/no',
            required: false,
            scoreValue: 5
          }
        ],
        quickActions: ['Print roster', 'Update notices', 'Team briefing'],
        verificationType: 'manual',
        confirmationRequired: false,
        orderNum: 6,
        travelTime: 60,
        expectedDuration: 120
      }
    ]
  },
  {
    id: 7,
    title: 'Safety Equipment Inspection',
    type: 'fire',
    icon: '🦺',
    description: 'Critical safety equipment verification',
    duration: 15,
    mode: 'checkpoint',
    isGPSTracked: false,
    popularity: 88,
    lastUsed: 'Yesterday',
    checkpoints: [
      {
        checkpointId: 701,
        name: 'Fire Extinguisher Station A',
        description: 'Verify extinguisher readiness',
        location: {
          name: 'Building A - Main Corridor',
          qrCode: 'QR-FIRE-A'
        },
        checks: [
          {
            id: 'chk-701-0',
            question: 'Scan QR code on extinguisher',
            type: 'qr' as any,
            required: true,
            scoreValue: 5
          },
          {
            id: 'chk-701-1',
            question: 'Extinguisher present and mounted?',
            type: 'yes/no',
            required: true,
            scoreValue: 25
          },
          {
            id: 'chk-701-2',
            question: 'Pressure gauge in green?',
            type: 'pass/fail',
            required: true,
            scoreValue: 30
          },
          {
            id: 'chk-701-3',
            question: 'Pin and tamper seal intact?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-701-4',
            question: 'Photo of inspection tag',
            type: 'photo',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-701-5',
            question: 'Signage clearly visible?',
            type: 'yes/no',
            required: false,
            scoreValue: 5
          }
        ],
        quickActions: ['Replace extinguisher', 'Schedule service', 'Report damage'],
        verificationType: 'qr',
        confirmationRequired: true,
        orderNum: 1,
        travelTime: 0,
        expectedDuration: 180
      },
      {
        checkpointId: 702,
        name: 'Emergency Eye Wash Station',
        description: 'Test eye wash functionality',
        location: {
          name: 'Laboratory Area',
          qrCode: 'QR-EYEWASH-1'
        },
        checks: [
          {
            id: 'chk-702-0',
            question: 'Scan QR code at station',
            type: 'qr' as any,
            required: true,
            scoreValue: 5
          },
          {
            id: 'chk-702-1',
            question: 'Water flows from both nozzles?',
            type: 'pass/fail',
            required: true,
            scoreValue: 35
          },
          {
            id: 'chk-702-2',
            question: 'Water temperature acceptable?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-702-3',
            question: 'Bowl/nozzles clean?',
            type: 'yes/no',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-702-4',
            question: 'Weekly test tag signed?',
            type: 'checkbox',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-702-5',
            question: 'Photo after testing',
            type: 'photo',
            required: false,
            scoreValue: 5
          }
        ],
        quickActions: ['Clean station', 'Report fault', 'Schedule maintenance'],
        verificationType: 'qr',
        confirmationRequired: true,
        orderNum: 2,
        travelTime: 120,
        expectedDuration: 240
      },
      {
        checkpointId: 703,
        name: 'Spill Kit Storage',
        description: 'Verify spill response supplies',
        location: {
          name: 'Chemical Storage Area'
        },
        checks: [
          {
            id: 'chk-703-1',
            question: 'Spill kit accessible?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-703-2',
            question: 'Absorbent materials stocked?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-703-3',
            question: 'PPE available (gloves, goggles)?',
            type: 'pass/fail',
            required: true,
            scoreValue: 25
          },
          {
            id: 'chk-703-4',
            question: 'Disposal bags present?',
            type: 'yes/no',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-703-5',
            question: 'Instructions card visible?',
            type: 'checkbox',
            required: false,
            scoreValue: 10
          }
        ],
        quickActions: ['Restock kit', 'Order supplies', 'Training needed'],
        verificationType: 'manual',
        confirmationRequired: true,
        orderNum: 3,
        travelTime: 90,
        expectedDuration: 180
      },
      {
        checkpointId: 704,
        name: 'PPE Distribution Point',
        description: 'Check personal protective equipment',
        location: {
          name: 'PPE Storage Cabinet',
          qrCode: 'QR-PPE-MAIN'
        },
        checks: [
          {
            id: 'chk-704-0',
            question: 'Scan QR code on cabinet',
            type: 'qr' as any,
            required: true,
            scoreValue: 5
          },
          {
            id: 'chk-704-1',
            question: 'Hard hats available (min 5)?',
            type: 'yes/no',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-704-2',
            question: 'Safety glasses stocked?',
            type: 'yes/no',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-704-3',
            question: 'Hi-vis vests available?',
            type: 'yes/no',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-704-4',
            question: 'Gloves (various sizes)?',
            type: 'yes/no',
            required: true,
            scoreValue: 10
          },
          {
            id: 'chk-704-5',
            question: 'Sign-out sheet current?',
            type: 'checkbox',
            required: false,
            scoreValue: 5
          },
          {
            id: 'chk-704-6',
            question: 'Photo of stock levels',
            type: 'photo',
            required: false,
            scoreValue: 5
          }
        ],
        quickActions: ['Order PPE', 'Check sizes', 'Update inventory'],
        verificationType: 'qr',
        confirmationRequired: false,
        orderNum: 4,
        travelTime: 60,
        expectedDuration: 180
      },
      {
        checkpointId: 705,
        name: 'Emergency Assembly Point',
        description: 'Verify assembly area readiness',
        location: {
          name: 'Car Park - Assembly Point'
        },
        checks: [
          {
            id: 'chk-705-1',
            question: 'Assembly point sign visible?',
            type: 'yes/no',
            required: true,
            scoreValue: 20
          },
          {
            id: 'chk-705-2',
            question: 'Area clear of vehicles?',
            type: 'pass/fail',
            required: true,
            scoreValue: 30
          },
          {
            id: 'chk-705-3',
            question: 'Roll call clipboard present?',
            type: 'checkbox',
            required: true,
            scoreValue: 15
          },
          {
            id: 'chk-705-4',
            question: 'Megaphone/whistle available?',
            type: 'yes/no',
            required: false,
            scoreValue: 10
          },
          {
            id: 'chk-705-5',
            question: 'Photo of clear assembly area',
            type: 'photo',
            required: false,
            scoreValue: 5
          }
        ],
        quickActions: ['Clear area', 'Update signage', 'Test evacuation'],
        verificationType: 'manual',
        confirmationRequired: true,
        orderNum: 5,
        travelTime: 180,
        expectedDuration: 120
      }
    ]
  }
];

// Mock Active Walks - Showing realistic demo scenarios
export const mockActiveWalks = [
  {
    sessionId: 'session-001',
    walkId: 4, // Bathroom Hygiene Inspection
    executorId: 1,
    executorName: 'John Smith',
    status: 'in-progress' as WalkStatus,
    startTime: new Date(Date.now() - 8 * 60 * 1000), // Started 8 minutes ago
    currentCheckpointIndex: 2, // Completed 2 of 5 bathrooms
    checkpointResponses: [
      {
        checkpointId: 401,
        timestamp: new Date(Date.now() - 7 * 60 * 1000),
        responses: [
          { checkItemId: 'chk-401-0', value: 'qr_scanned_QR-BATH-GF-M' },
          { checkItemId: 'chk-401-1', value: 'yes' },
          { checkItemId: 'chk-401-2', value: 'yes' },
          { checkItemId: 'chk-401-3', value: 'yes' },
          { checkItemId: 'chk-401-4', value: 'yes' },
          { checkItemId: 'chk-401-5', value: 'pass' },
          { checkItemId: 'chk-401-6', value: 'photo_cert_001.jpg' }
        ],
        passed: true,
        issues: []
      },
      {
        checkpointId: 402,
        timestamp: new Date(Date.now() - 4 * 60 * 1000),
        responses: [
          { checkItemId: 'chk-402-0', value: 'qr_scanned_QR-BATH-GF-W' },
          { checkItemId: 'chk-402-1', value: 'yes' },
          { checkItemId: 'chk-402-2', value: 'no' }, // Soap dispenser empty!
          { checkItemId: 'chk-402-3', value: 'yes' },
          { checkItemId: 'chk-402-4', value: 'yes' },
          { checkItemId: 'chk-402-5', value: 'pass' }
        ],
        passed: false,
        issues: ['Soap dispensers need refilling']
      }
    ],
    journeyObservations: [],
    photos: ['photo_cert_001.jpg'],
    signatures: [],
    gpsTrack: [],
    totalPoints: 145,
    checkpointsCompleted: 2,
    issuesFound: 1,
    behaviourReportsCreated: []
  },
  {
    sessionId: 'session-002',
    walkId: 6, // Opening Procedures Walk
    executorId: 2,
    executorName: 'Sarah Johnson',
    status: 'not-started' as WalkStatus,
    startTime: new Date(Date.now() + 30 * 60 * 1000), // Scheduled for 8:00 AM
    currentCheckpointIndex: 0,
    checkpointResponses: [],
    journeyObservations: [],
    photos: [],
    signatures: [],
    totalPoints: 0,
    checkpointsCompleted: 0,
    issuesFound: 0,
    behaviourReportsCreated: []
  },
  {
    sessionId: 'session-003',
    walkId: 7, // Safety Equipment Inspection
    executorId: 3,
    executorName: 'Mike Wilson',
    status: 'completed' as WalkStatus,
    startTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
    endTime: new Date(Date.now() - 23 * 60 * 60 * 1000 + 15 * 60 * 1000), // Took 15 minutes
    currentCheckpointIndex: 5,
    checkpointResponses: [
      // All 5 checkpoints completed successfully
    ],
    journeyObservations: [],
    photos: ['fire_ext_tag.jpg', 'eyewash_test.jpg', 'ppe_stock.jpg'],
    signatures: [],
    totalPoints: 395,
    checkpointsCompleted: 5,
    issuesFound: 0,
    behaviourReportsCreated: []
  }
];

// Mock Scheduled Walks
export const mockScheduledWalks = [
  {
    id: 'sched-001',
    walkId: '1',
    title: 'Afternoon Security Round',
    type: 'security' as WalkType,
    time: '14:00',
    assignedTo: 'John Smith',
    location: 'All Buildings'
  },
  {
    id: 'sched-002',
    walkId: '2',
    title: 'End of Day Housekeeping',
    type: 'housekeeping' as WalkType,
    time: '17:00',
    assignedTo: 'Sarah Johnson',
    location: 'Production Floor'
  }
];

// Mock Completed Walks
export const mockCompletedWalks = [
  {
    sessionId: 'session-003',
    walkId: 3,
    title: 'Daily Fire Safety Check',
    executorName: 'Mike Wilson',
    completedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    checkpointsCompleted: 15,
    issuesFound: 2,
    totalPoints: 120,
    duration: 32
  },
  {
    sessionId: 'session-004',
    walkId: 5,
    title: 'Weekly Equipment Inspection',
    executorName: 'Emma Davis',
    completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    checkpointsCompleted: 10,
    issuesFound: 0,
    totalPoints: 85,
    duration: 28
  }
];

// Service functions
export class MockWalkService {
  // Get all walk templates
  static getTemplates(): WalkTemplate[] {
    return mockWalkTemplates;
  }

  // Get template by ID
  static getTemplateById(id: number): WalkTemplate | undefined {
    return mockWalkTemplates.find(t => t.id === id);
  }

  // Get active walk sessions
  static getActiveSessions(): WalkSession[] {
    const stored = localStorage.getItem('walkSessions');
    if (stored) {
      const sessions = JSON.parse(stored);
      // Convert date strings back to Date objects
      return sessions.map((s: any) => ({
        ...s,
        startTime: new Date(s.startTime),
        endTime: s.endTime ? new Date(s.endTime) : undefined
      }));
    }
    return mockActiveWalks as WalkSession[];
  }

  // Get session by ID
  static getSessionById(sessionId: string): WalkSession | undefined {
    const sessions = this.getActiveSessions();
    return sessions.find(s => s.sessionId === sessionId);
  }

  // Start a new walk session
  static startWalk(walkId: number, executorName: string): WalkSession {
    const template = this.getTemplateById(walkId);
    if (!template) {
      throw new Error('Walk template not found');
    }

    const session: WalkSession = {
      sessionId: `session-${Date.now()}`,
      walkId,
      executorId: 1, // Mock user ID
      executorName,
      status: 'in-progress',
      startTime: new Date(),
      currentCheckpointIndex: 0,
      checkpointResponses: [],
      journeyObservations: [],
      photos: [],
      signatures: [],
      gpsTrack: [],
      totalPoints: 0,
      checkpointsCompleted: 0,
      issuesFound: 0,
      behaviourReportsCreated: []
    };

    // Save to localStorage
    const sessions = this.getActiveSessions();
    sessions.push(session);
    localStorage.setItem('walkSessions', JSON.stringify(sessions));

    return session;
  }

  // Update walk session
  static updateSession(sessionId: string, updates: Partial<WalkSession>): WalkSession {
    const sessions = this.getActiveSessions();
    const index = sessions.findIndex(s => s.sessionId === sessionId);
    
    if (index === -1) {
      throw new Error('Session not found');
    }

    sessions[index] = { ...sessions[index], ...updates };
    localStorage.setItem('walkSessions', JSON.stringify(sessions));
    
    return sessions[index];
  }

  // Complete checkpoint
  static completeCheckpoint(
    sessionId: string, 
    checkpointId: number, 
    response: CheckpointResponse
  ): WalkSession {
    const session = this.getSessionById(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    session.checkpointResponses.push(response);
    session.checkpointsCompleted++;
    session.currentCheckpointIndex++;
    
    // Calculate points
    const template = this.getTemplateById(session.walkId);
    const checkpoint = template?.checkpoints.find(c => c.checkpointId === checkpointId);
    if (checkpoint) {
      session.totalPoints += checkpoint.pointValue;
    }

    // Check for issues
    if (!response.passed) {
      session.issuesFound++;
    }

    return this.updateSession(sessionId, session);
  }

  // Add journey observation
  static addObservation(sessionId: string, observation: BehaviourObservation): WalkSession {
    const session = this.getSessionById(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    session.journeyObservations.push(observation);
    session.totalPoints += observation.points;

    return this.updateSession(sessionId, session);
  }

  // Complete walk
  static completeWalk(sessionId: string): WalkSession {
    const session = this.getSessionById(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    session.status = 'completed';
    session.endTime = new Date();

    return this.updateSession(sessionId, session);
  }

  // Pause walk
  static pauseWalk(sessionId: string): WalkSession {
    const session = this.getSessionById(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    session.status = 'paused';

    return this.updateSession(sessionId, session);
  }

  // Resume walk
  static resumeWalk(sessionId: string): WalkSession {
    const session = this.getSessionById(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    session.status = 'in-progress';

    return this.updateSession(sessionId, session);
  }

  // Add GPS coordinate
  static addGPSPoint(sessionId: string, coordinates: [number, number]): WalkSession {
    const session = this.getSessionById(sessionId);
    if (!session) {
      throw new Error('Session not found');
    }

    if (!session.gpsTrack) {
      session.gpsTrack = [];
    }
    session.gpsTrack.push(coordinates);

    return this.updateSession(sessionId, session);
  }

  // Clear all sessions (for testing)
  static clearSessions(): void {
    localStorage.removeItem('walkSessions');
  }
}

// Export default instance
export default MockWalkService;