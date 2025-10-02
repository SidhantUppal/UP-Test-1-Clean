// Behaviour report types for the Behavioural Safety module

export type BehaviourCategory = 'intervention' | 'quick-training' | 'save' | 'hazard' | 'near-miss' | 'good-behavior';

// Behaviour points mapping
export const BEHAVIOUR_POINTS: Record<BehaviourCategory, number> = {
  'intervention': 50,
  'quick-training': 30,
  'save': 100,
  'hazard': 40,
  'near-miss': 60,
  'good-behavior': 20
};

// Behaviour color classes for UI
export const BEHAVIOUR_COLORS: Record<BehaviourCategory, string> = {
  'intervention': 'bg-blue-100 text-blue-700 border-blue-200',
  'quick-training': 'bg-purple-100 text-purple-700 border-purple-200',
  'save': 'bg-green-100 text-green-700 border-green-200',
  'hazard': 'bg-orange-100 text-orange-700 border-orange-200',
  'near-miss': 'bg-red-100 text-red-700 border-red-200',
  'good-behavior': 'bg-teal-100 text-teal-700 border-teal-200'
};

// Behaviour icons for UI
export const BEHAVIOUR_ICONS: Record<BehaviourCategory, string> = {
  'intervention': '🛑',
  'quick-training': '📚',
  'save': '🛡️',
  'hazard': '⚠️',
  'near-miss': '⚡',
  'good-behavior': '✅'
};

// Behaviour report interface
export interface BehaviourReport {
  id: string;
  category: BehaviourCategory;
  reporter: string;
  reporterId?: string;
  location: string;
  locationId?: number;
  description: string;
  timestamp: string;
  points: number;
  status: 'active' | 'resolved' | 'acknowledged';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  evidence?: string[];
  tags?: string[];
  resolvedBy?: string;
  resolvedAt?: Date;
  notes?: string;
}