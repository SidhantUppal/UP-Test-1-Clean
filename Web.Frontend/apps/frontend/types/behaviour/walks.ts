// Walk-related types for the Behavioural Safety module

import { Location } from '../common/location';

// Enums and type unions
export type WalkType = 'housekeeping' | 'security' | 'fire' | 'hygiene' | 'equipment' | 'general';
export type WalkMode = 'journey' | 'checkpoint' | 'hybrid';
export type WalkStatus = 'upcoming' | 'currently-live' | 'missed' | 'not-completed' | 'completed';
export type WalkScheduleType = 'scheduled' | 'ad-hoc';
export type RouteType = 'linear' | 'circuit' | 'custom';
export type CheckItemType = 'yes/no' | 'pass/fail' | 'checkbox' | 'photo' | 'text';
export type VerificationType = 'qr' | 'gps' | 'manual' | 'photo';
export type EvidenceType = 'photo' | 'signature' | 'scan' | 'location';

// Check item interface
export interface CheckItem {
  id: string;
  question: string;
  type: CheckItemType;
  required: boolean;
  scoreValue?: number;
}

// Walk checkpoint interface
export interface WalkCheckpoint {
  checkpointId: number;
  name: string;
  description: string;
  location: Location;
  checks: CheckItem[];
  quickActions: string[];
  verificationType: VerificationType;
  confirmationRequired?: boolean;
  orderNum: number;
  travelTime?: number;
  expectedDuration?: number;
  mapPosition?: {
    x: number;
    y: number;
  };
}

// Safety walk interface
export interface SafetyWalk {
  walkId: number;
  title: string;
  type: WalkType;
  icon?: string;
  description: string;
  duration: number;
  mode: WalkMode;
  routeType?: RouteType;
  isGPSTracked: boolean;
  isOrdered?: boolean;
  popularity?: number;
  lastUsed?: string;
  checkpoints: WalkCheckpoint[];
  mapImageUrl?: string;
  createdBy?: string;
  createdDate?: Date;
}

// Walk template interface
export interface WalkTemplate {
  templateId: number;
  title: string;
  type: WalkType;
  icon: string;
  description: string;
  duration: number;
  mode: WalkMode;
  isGPSTracked: boolean;
  popularity: number;
  lastUsed: string;
  checkpoints: WalkCheckpoint[];
}

// Walk assignment interface (replaces execution)
export interface WalkAssignment {
  assignmentId: string;
  walkId: number;
  walkTemplate: WalkTemplate;
  assignedTo: string;
  assignedToName?: string;
  assignedBy: string;
  scheduleType: WalkScheduleType;
  scheduledFor: Date;
  dueBy: Date;
  location: string;
  status: WalkStatus;
  startedAt?: Date;
  completedAt?: Date;
  completedCheckpoints?: number;
  totalCheckpoints: number;
  issuesFound?: number;
  outstandingIssues?: number;
  totalScore?: number;
  notes?: string;
}

// Walk execution interface (when walk is being performed)
export interface WalkExecution {
  executionId: string;
  assignmentId: string;
  walkId: number;
  walk: SafetyWalk;
  userId: string;
  userName?: string;
  status: WalkStatus;
  startedAt: Date;
  completedAt?: Date;
  currentCheckpoint: number;
  completedCheckpoints: number[];
  checkpointResponses: Map<number, any>;
  totalScore?: number;
  gpsTrack?: [number, number][];
  evidence?: {
    type: EvidenceType;
    url: string;
    timestamp: Date;
  }[];
  issuesFound: number;
  issuesResolved: number;
}

// Walk response interface
export interface WalkResponse {
  responseId: string;
  walkId: number;
  executionId: string;
  checkpointId: number;
  responses: {
    checkId: string;
    value: any;
    timestamp: Date;
  }[];
  evidence?: {
    type: EvidenceType;
    url: string;
  }[];
  notes?: string;
  completedAt: Date;
}