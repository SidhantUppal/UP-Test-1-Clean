// Mock Walk Assignment Service - Updated for realistic walk management
// This service provides mock data for walk assignments with proper statuses

import {
  WalkType,
  WalkStatus,
  WalkScheduleType,
  WalkTemplate,
  WalkAssignment,
  WalkExecution
} from '@/types/behaviour/walks';

// Generate realistic walk assignments
export const generateMockWalkAssignments = (): WalkAssignment[] => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return [
    // Currently Live Walks
    {
      assignmentId: 'wa-001',
      walkId: 1,
      walkTemplate: {} as WalkTemplate, // Will be populated from templates
      assignedTo: 'user-001',
      assignedToName: 'John Smith',
      assignedBy: 'manager-001',
      scheduleType: 'scheduled',
      scheduledFor: new Date(today.getTime() - 30 * 60000), // 30 minutes ago
      dueBy: new Date(today.getTime() + 30 * 60000), // 30 minutes from now
      location: 'Building A - Production Floor',
      status: 'currently-live',
      startedAt: new Date(today.getTime() - 15 * 60000),
      completedCheckpoints: 3,
      totalCheckpoints: 12,
      issuesFound: 2,
      outstandingIssues: 2,
      totalScore: 45
    },
    {
      assignmentId: 'wa-002',
      walkId: 4,
      walkTemplate: {} as WalkTemplate,
      assignedTo: 'user-002',
      assignedToName: 'Sarah Johnson',
      assignedBy: 'manager-001',
      scheduleType: 'ad-hoc',
      scheduledFor: new Date(today.getTime() - 45 * 60000),
      dueBy: new Date(today.getTime()),
      location: 'Building A - All Floors',
      status: 'currently-live',
      startedAt: new Date(today.getTime() - 20 * 60000),
      completedCheckpoints: 2,
      totalCheckpoints: 5,
      issuesFound: 1,
      outstandingIssues: 1,
      totalScore: 30
    },

    // Upcoming Walks (Today)
    {
      assignmentId: 'wa-003',
      walkId: 2,
      walkTemplate: {} as WalkTemplate,
      assignedTo: 'user-003',
      assignedToName: 'Mike Wilson',
      assignedBy: 'manager-001',
      scheduleType: 'scheduled',
      scheduledFor: new Date(today.getTime() + 2 * 3600000), // In 2 hours
      dueBy: new Date(today.getTime() + 3 * 3600000),
      location: 'Warehouse B - All Areas',
      status: 'upcoming',
      totalCheckpoints: 15,
      notes: 'Weekly security check'
    },
    {
      assignmentId: 'wa-004',
      walkId: 7,
      walkTemplate: {} as WalkTemplate,
      assignedTo: 'user-001',
      assignedToName: 'John Smith',
      assignedBy: 'manager-002',
      scheduleType: 'scheduled',
      scheduledFor: new Date(today.getTime() + 4 * 3600000), // In 4 hours
      dueBy: new Date(today.getTime() + 5 * 3600000),
      location: 'All Buildings',
      status: 'upcoming',
      totalCheckpoints: 5,
      notes: 'Monthly safety equipment check'
    },

    // Missed Walks (Should have been done)
    {
      assignmentId: 'wa-005',
      walkId: 1,
      walkTemplate: {} as WalkTemplate,
      assignedTo: 'user-004',
      assignedToName: 'Emma Davis',
      assignedBy: 'manager-001',
      scheduleType: 'scheduled',
      scheduledFor: new Date(today.getTime() - 6 * 3600000), // 6 hours ago
      dueBy: new Date(today.getTime() - 4 * 3600000), // Due 4 hours ago
      location: 'Building C - Office Areas',
      status: 'missed',
      totalCheckpoints: 8,
      notes: 'Daily housekeeping - OVERDUE'
    },
    {
      assignmentId: 'wa-006',
      walkId: 3,
      walkTemplate: {} as WalkTemplate,
      assignedTo: 'user-005',
      assignedToName: 'Tom Brown',
      assignedBy: 'manager-001',
      scheduleType: 'scheduled',
      scheduledFor: new Date(today.getTime() - 24 * 3600000), // Yesterday
      dueBy: new Date(today.getTime() - 20 * 3600000),
      location: 'Building A - Emergency Exits',
      status: 'missed',
      totalCheckpoints: 10,
      notes: 'Critical: Fire safety check missed'
    },

    // Not Completed (Started but not finished)
    {
      assignmentId: 'wa-007',
      walkId: 6,
      walkTemplate: {} as WalkTemplate,
      assignedTo: 'user-006',
      assignedToName: 'Lisa Anderson',
      assignedBy: 'manager-002',
      scheduleType: 'ad-hoc',
      scheduledFor: new Date(today.getTime() - 3 * 3600000),
      dueBy: new Date(today.getTime() - 1 * 3600000),
      location: 'Building B - Production',
      status: 'not-completed',
      startedAt: new Date(today.getTime() - 2.5 * 3600000),
      completedCheckpoints: 4,
      totalCheckpoints: 6,
      issuesFound: 3,
      outstandingIssues: 3,
      totalScore: 60,
      notes: 'Walk abandoned due to equipment failure'
    },

    // Recently Completed Walks
    {
      assignmentId: 'wa-008',
      walkId: 1,
      walkTemplate: {} as WalkTemplate,
      assignedTo: 'user-001',
      assignedToName: 'John Smith',
      assignedBy: 'manager-001',
      scheduleType: 'scheduled',
      scheduledFor: new Date(today.getTime() - 8 * 3600000),
      dueBy: new Date(today.getTime() - 7 * 3600000),
      location: 'Building A - Production Floor',
      status: 'completed',
      startedAt: new Date(today.getTime() - 8 * 3600000),
      completedAt: new Date(today.getTime() - 7.5 * 3600000),
      completedCheckpoints: 12,
      totalCheckpoints: 12,
      issuesFound: 0,
      outstandingIssues: 0,
      totalScore: 180
    },
    {
      assignmentId: 'wa-009',
      walkId: 4,
      walkTemplate: {} as WalkTemplate,
      assignedTo: 'user-002',
      assignedToName: 'Sarah Johnson',
      assignedBy: 'manager-001',
      scheduleType: 'scheduled',
      scheduledFor: new Date(today.getTime() - 26 * 3600000),
      dueBy: new Date(today.getTime() - 25 * 3600000),
      location: 'Building A - All Floors',
      status: 'completed',
      startedAt: new Date(today.getTime() - 26 * 3600000),
      completedAt: new Date(today.getTime() - 25.7 * 3600000),
      completedCheckpoints: 5,
      totalCheckpoints: 5,
      issuesFound: 2,
      outstandingIssues: 1, // One issue still not resolved
      totalScore: 375,
      notes: 'Issue with first floor men\'s bathroom - maintenance notified'
    },
    {
      assignmentId: 'wa-010',
      walkId: 2,
      walkTemplate: {} as WalkTemplate,
      assignedTo: 'user-003',
      assignedToName: 'Mike Wilson',
      assignedBy: 'manager-001',
      scheduleType: 'ad-hoc',
      scheduledFor: new Date(today.getTime() - 48 * 3600000),
      dueBy: new Date(today.getTime() - 47 * 3600000),
      location: 'Warehouse B - Perimeter',
      status: 'completed',
      startedAt: new Date(today.getTime() - 48 * 3600000),
      completedAt: new Date(today.getTime() - 47.5 * 3600000),
      completedCheckpoints: 15,
      totalCheckpoints: 15,
      issuesFound: 3,
      outstandingIssues: 2, // Two issues still pending
      totalScore: 225,
      notes: 'Multiple security concerns identified - review needed'
    }
  ];
};

// Mock service class
export default class MockWalkAssignmentService {
  private static assignments: WalkAssignment[] = generateMockWalkAssignments();

  // Get all assignments
  static getAllAssignments(): WalkAssignment[] {
    return this.assignments;
  }

  // Get assignments by status
  static getAssignmentsByStatus(status: WalkStatus): WalkAssignment[] {
    return this.assignments.filter(a => a.status === status);
  }

  // Get assignments for a specific user
  static getUserAssignments(userId: string): WalkAssignment[] {
    return this.assignments.filter(a => a.assignedTo === userId);
  }

  // Get upcoming walks for today
  static getTodaysUpcomingWalks(): WalkAssignment[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.assignments.filter(a =>
      a.status === 'upcoming' &&
      a.scheduledFor >= today &&
      a.scheduledFor < tomorrow
    );
  }

  // Get walks with outstanding issues
  static getWalksWithIssues(): WalkAssignment[] {
    return this.assignments.filter(a =>
      a.outstandingIssues && a.outstandingIssues > 0
    );
  }

  // Get overdue walks
  static getOverdueWalks(): WalkAssignment[] {
    const now = new Date();
    return this.assignments.filter(a =>
      (a.status === 'missed' ||
       (a.status === 'upcoming' && a.dueBy < now))
    );
  }

  // Start a walk (transition from upcoming to currently-live)
  static startWalk(assignmentId: string): WalkAssignment | null {
    const assignment = this.assignments.find(a => a.assignmentId === assignmentId);
    if (assignment && assignment.status === 'upcoming') {
      assignment.status = 'currently-live';
      assignment.startedAt = new Date();
      return assignment;
    }
    return null;
  }

  // Complete a walk
  static completeWalk(
    assignmentId: string,
    completedCheckpoints: number,
    issuesFound: number,
    score: number
  ): WalkAssignment | null {
    const assignment = this.assignments.find(a => a.assignmentId === assignmentId);
    if (assignment && assignment.status === 'currently-live') {
      assignment.status = 'completed';
      assignment.completedAt = new Date();
      assignment.completedCheckpoints = completedCheckpoints;
      assignment.issuesFound = issuesFound;
      assignment.outstandingIssues = issuesFound; // Initially all issues are outstanding
      assignment.totalScore = score;
      return assignment;
    }
    return null;
  }

  // Get statistics
  static getStatistics() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return {
      totalCompleted: this.assignments.filter(a => a.status === 'completed').length,
      activeWalks: this.assignments.filter(a => a.status === 'currently-live').length,
      scheduledToday: this.assignments.filter(a =>
        a.status === 'upcoming' &&
        a.scheduledFor >= today &&
        a.scheduledFor < tomorrow
      ).length,
      overdueWalks: this.getOverdueWalks().length,
      issuesFound: this.assignments.reduce((sum, a) => sum + (a.issuesFound || 0), 0),
      outstandingIssues: this.assignments.reduce((sum, a) => sum + (a.outstandingIssues || 0), 0),
      pointsEarned: this.assignments
        .filter(a => a.status === 'completed')
        .reduce((sum, a) => sum + (a.totalScore || 0), 0)
    };
  }
}