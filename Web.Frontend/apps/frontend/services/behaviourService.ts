// Behaviour Safety API Service
const BEHAVIOUR_SERVICE_URL = process.env.NEXT_PUBLIC_BEHAVIOUR_SERVICE_URL || 'http://localhost:3014';

export interface BehaviourCategory {
  id: string;
  name: string;
  code: string;
  description: string;
  color: string;
  icon: string;
  points: number;
  isActive: boolean;
}

export interface BehaviourReport {
  id: number;
  category: string;
  categoryName?: string;
  type: string;
  description: string;
  reporter: string;
  reporterId: number;
  location: string;
  locationId?: number;
  timestamp: string;
  points: number;
  status: 'active' | 'resolved' | 'pending' | 'closed';
  followUp: boolean;
  images?: string[];
  attachments?: any[];
  commentsCount: number;
  likes: number;
  tags?: string[];
  severity?: 'low' | 'medium' | 'high' | 'critical';
  actionsTaken?: string;
  correctiveActions?: string;
  orgGroupId?: number;
  orgGroupName?: string;
}

export interface BehaviourComment {
  id: number;
  reportId: number;
  userId: number;
  userName: string;
  comment: string;
  timestamp: string;
  isEdited: boolean;
}

export interface BehaviourStats {
  todayReports: number;
  weeklyReports: number;
  monthlyReports: number;
  activeSaves: number;
  weeklyPoints: number;
  monthlyPoints: number;
  participationRate: number;
  topCategories: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  trendData: Array<{
    date: string;
    count: number;
  }>;
  leaderboard: Array<{
    userId: number;
    userName: string;
    points: number;
    reports: number;
    badges: string[];
  }>;
}

export interface SafetyWalk {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  leader: string;
  leaderId: number;
  participants: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  observations: number;
  positiveFindings: number;
  correctiveActions: number;
  duration?: string;
  route?: string;
  notes?: string;
  attachments?: any[];
}

export interface UserImpact {
  userId: number;
  userName: string;
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  totalReports: number;
  saves: number;
  interventions: number;
  nearMisses: number;
  hazardsIdentified: number;
  badges: Array<{
    id: string;
    name: string;
    description: string;
    earnedDate: string;
    icon: string;
  }>;
  recentActivity: BehaviourReport[];
  rank: number;
  percentile: number;
}

class BehaviourService {
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-user-id': '1', // TODO: Get from auth context
      'x-user-area-id': '1' // TODO: Get from auth context
    };
  }

  // Categories
  async getCategories(): Promise<BehaviourCategory[]> {
    // Return mock data for now
    return this.getMockCategories();
  }

  // Reports
  async getBehaviourReports(params?: {
    category?: string;
    startDate?: string;
    endDate?: string;
    userId?: number;
    location?: string;
    status?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ reports: BehaviourReport[]; pagination: any; stats: BehaviourStats }> {
    // Return mock data for now
    return {
      reports: this.getMockReports(params),
      pagination: {
        page: params?.page || 1,
        pageSize: params?.pageSize || 20,
        totalCount: 237,
        totalPages: 12
      },
      stats: this.getMockStats()
    };
  }

  async createBehaviourReport(data: Partial<BehaviourReport>): Promise<BehaviourReport> {
    // Mock implementation - return created report
    const newReport: BehaviourReport = {
      id: Math.floor(Math.random() * 10000),
      category: data.category || 'intervention',
      type: data.type || 'Safety Observation',
      description: data.description || '',
      reporter: 'Current User',
      reporterId: 1,
      location: data.location || 'Main Office',
      timestamp: new Date().toISOString(),
      points: this.calculatePoints(data.category || 'intervention'),
      status: 'active',
      followUp: data.followUp || false,
      images: data.images || [],
      commentsCount: 0,
      likes: 0,
      tags: data.tags || []
    };
    
    return newReport;
  }

  async updateBehaviourReport(id: number, data: Partial<BehaviourReport>): Promise<BehaviourReport> {
    // Mock implementation
    const existing = this.getMockReports({})[0];
    return { ...existing, ...data, id };
  }

  async deleteBehaviourReport(id: number): Promise<void> {
    // Mock implementation
    return Promise.resolve();
  }

  // Comments
  async getComments(reportId: number): Promise<BehaviourComment[]> {
    return this.getMockComments(reportId);
  }

  async addComment(reportId: number, comment: string): Promise<BehaviourComment> {
    return {
      id: Math.floor(Math.random() * 10000),
      reportId,
      userId: 1,
      userName: 'Current User',
      comment,
      timestamp: new Date().toISOString(),
      isEdited: false
    };
  }

  // Statistics
  async getBehaviourStats(params?: {
    startDate?: string;
    endDate?: string;
    userId?: number;
    orgGroupId?: number;
  }): Promise<BehaviourStats> {
    return this.getMockStats();
  }

  // Safety Walks
  async getSafetyWalks(params?: {
    status?: string;
    startDate?: string;
    endDate?: string;
    leaderId?: number;
  }): Promise<SafetyWalk[]> {
    return this.getMockSafetyWalks();
  }

  async createSafetyWalk(data: Partial<SafetyWalk>): Promise<SafetyWalk> {
    return {
      id: Math.floor(Math.random() * 10000),
      title: data.title || 'Safety Walk',
      date: data.date || new Date().toISOString(),
      time: data.time || '09:00',
      location: data.location || 'Main Site',
      leader: data.leader || 'Current User',
      leaderId: data.leaderId || 1,
      participants: data.participants || [],
      status: 'scheduled',
      observations: 0,
      positiveFindings: 0,
      correctiveActions: 0
    };
  }

  // User Impact
  async getUserImpact(userId?: number): Promise<UserImpact> {
    return this.getMockUserImpact(userId || 1);
  }

  // Export
  async exportReports(params: {
    format: 'csv' | 'pdf' | 'excel';
    startDate?: string;
    endDate?: string;
    category?: string;
  }): Promise<Blob> {
    // Mock implementation - return empty blob
    return new Blob(['Mock export data'], { type: 'text/csv' });
  }

  // Likes
  async toggleLike(reportId: number): Promise<{ liked: boolean; count: number }> {
    return { liked: true, count: Math.floor(Math.random() * 50) };
  }

  // Helper Methods
  private calculatePoints(category: string): number {
    const pointsMap: Record<string, number> = {
      'intervention': 50,
      'quick-training': 30,
      'save': 100,
      'hazard': 40,
      'near-miss': 60,
      'good-behavior': 20,
    };
    
    return pointsMap[category.toLowerCase().replace(' ', '-')] || 10;
  }

  // Mock Data Methods
  private getMockCategories(): BehaviourCategory[] {
    return [
      {
        id: 'intervention',
        name: 'Intervention',
        code: 'INT',
        description: 'Stopped unsafe behaviour or condition',
        color: 'bg-red-100 text-red-600',
        icon: '🛑',
        points: 50,
        isActive: true
      },
      {
        id: 'quick-training',
        name: 'Quick Training',
        code: 'QT',
        description: 'Provided on-the-spot training or guidance',
        color: 'bg-blue-100 text-blue-600',
        icon: '📚',
        points: 30,
        isActive: true
      },
      {
        id: 'save',
        name: 'Save',
        code: 'SAVE',
        description: 'Prevented a potential incident',
        color: 'bg-green-100 text-green-600',
        icon: '✅',
        points: 100,
        isActive: true
      },
      {
        id: 'hazard',
        name: 'Hazard',
        code: 'HAZ',
        description: 'Identified and reported a hazard',
        color: 'bg-yellow-100 text-yellow-600',
        icon: '⚠️',
        points: 40,
        isActive: true
      },
      {
        id: 'near-miss',
        name: 'Near Miss',
        code: 'NM',
        description: 'Reported a near miss incident',
        color: 'bg-orange-100 text-orange-600',
        icon: '⚡',
        points: 60,
        isActive: true
      },
      {
        id: 'good-behavior',
        name: 'Good Behavior',
        code: 'GB',
        description: 'Recognized positive safety behavior',
        color: 'bg-purple-100 text-purple-600',
        icon: '👍',
        points: 20,
        isActive: true
      }
    ];
  }

  private getMockReports(params?: any): BehaviourReport[] {
    const reports: BehaviourReport[] = [
      {
        id: 1,
        category: 'intervention',
        categoryName: 'Intervention',
        type: 'Unsafe Act',
        description: 'Stopped colleague from working at height without proper harness',
        reporter: 'John Smith',
        reporterId: 1,
        location: 'Workshop A',
        timestamp: new Date().toISOString(),
        points: 50,
        status: 'active',
        followUp: true,
        images: [],
        commentsCount: 3,
        likes: 12,
        severity: 'high',
        actionsTaken: 'Immediately stopped work and provided correct PPE'
      },
      {
        id: 2,
        category: 'save',
        categoryName: 'Save',
        type: 'Critical Save',
        description: 'Identified and removed damaged ladder before use',
        reporter: 'Sarah Johnson',
        reporterId: 2,
        location: 'Warehouse B',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        points: 100,
        status: 'resolved',
        followUp: false,
        images: [],
        commentsCount: 5,
        likes: 23,
        severity: 'critical'
      },
      {
        id: 3,
        category: 'good-behavior',
        categoryName: 'Good Behavior',
        type: 'Positive Observation',
        description: 'Team consistently wearing all required PPE',
        reporter: 'Mike Wilson',
        reporterId: 3,
        location: 'Production Floor',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        points: 20,
        status: 'active',
        followUp: false,
        images: [],
        commentsCount: 1,
        likes: 8
      },
      {
        id: 4,
        category: 'near-miss',
        categoryName: 'Near Miss',
        type: 'Near Miss',
        description: 'Forklift nearly collided with pedestrian in blind spot',
        reporter: 'Emma Davis',
        reporterId: 4,
        location: 'Loading Bay',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        points: 60,
        status: 'active',
        followUp: true,
        images: [],
        commentsCount: 7,
        likes: 15,
        severity: 'high',
        correctiveActions: 'Installing mirrors and warning signs at blind spots'
      },
      {
        id: 5,
        category: 'hazard',
        categoryName: 'Hazard',
        type: 'Hazard Spotted',
        description: 'Oil spill in main corridor - cleaned immediately',
        reporter: 'Tom Brown',
        reporterId: 5,
        location: 'Main Building',
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        points: 40,
        status: 'resolved',
        followUp: false,
        images: [],
        commentsCount: 2,
        likes: 10
      },
      {
        id: 6,
        category: 'quick-training',
        categoryName: 'Quick Training',
        type: 'On-the-spot Training',
        description: 'Provided ladder safety training to new contractor',
        reporter: 'Lisa Anderson',
        reporterId: 6,
        location: 'Site Entrance',
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        points: 30,
        status: 'active',
        followUp: false,
        images: [],
        commentsCount: 0,
        likes: 5
      }
    ];

    // Filter by category if provided
    if (params?.category && params.category !== 'all') {
      return reports.filter(r => r.category === params.category);
    }

    return reports;
  }

  private getMockStats(): BehaviourStats {
    return {
      todayReports: 47,
      weeklyReports: 312,
      monthlyReports: 1248,
      activeSaves: 8,
      weeklyPoints: 1840,
      monthlyPoints: 7250,
      participationRate: 76,
      topCategories: [
        { category: 'Intervention', count: 89, percentage: 28.5 },
        { category: 'Hazard', count: 72, percentage: 23.1 },
        { category: 'Good Behavior', count: 65, percentage: 20.8 },
        { category: 'Near Miss', count: 43, percentage: 13.8 },
        { category: 'Save', count: 28, percentage: 9.0 },
        { category: 'Quick Training', count: 15, percentage: 4.8 }
      ],
      trendData: [
        { date: '2024-01-01', count: 42 },
        { date: '2024-01-02', count: 38 },
        { date: '2024-01-03', count: 51 },
        { date: '2024-01-04', count: 47 },
        { date: '2024-01-05', count: 55 },
        { date: '2024-01-06', count: 34 },
        { date: '2024-01-07', count: 45 }
      ],
      leaderboard: [
        { userId: 1, userName: 'John Smith', points: 580, reports: 23, badges: ['🏆', '⭐', '🎯'] },
        { userId: 2, userName: 'Sarah Johnson', points: 520, reports: 19, badges: ['⭐', '🎯'] },
        { userId: 3, userName: 'Mike Wilson', points: 470, reports: 21, badges: ['🎯'] },
        { userId: 4, userName: 'Emma Davis', points: 410, reports: 17, badges: ['🌟'] },
        { userId: 5, userName: 'Tom Brown', points: 380, reports: 15, badges: [] }
      ]
    };
  }

  private getMockComments(reportId: number): BehaviourComment[] {
    return [
      {
        id: 1,
        reportId,
        userId: 2,
        userName: 'Sarah Johnson',
        comment: 'Great observation! This could have prevented a serious incident.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        isEdited: false
      },
      {
        id: 2,
        reportId,
        userId: 3,
        userName: 'Mike Wilson',
        comment: 'We should add this to our toolbox talk topics.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        isEdited: false
      },
      {
        id: 3,
        reportId,
        userId: 4,
        userName: 'Emma Davis',
        comment: 'Similar issue was reported last week in Building C. We need a site-wide solution.',
        timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        isEdited: true
      }
    ];
  }

  private getMockSafetyWalks(): SafetyWalk[] {
    return [
      {
        id: 1,
        title: 'Weekly Production Floor Walk',
        date: new Date().toISOString(),
        time: '09:00',
        location: 'Production Floor',
        leader: 'John Smith',
        leaderId: 1,
        participants: ['Sarah Johnson', 'Mike Wilson', 'Emma Davis'],
        status: 'scheduled',
        observations: 0,
        positiveFindings: 0,
        correctiveActions: 0,
        route: 'Main entrance → Assembly line → Quality control → Packaging',
        notes: 'Focus on PPE compliance and housekeeping'
      },
      {
        id: 2,
        title: 'Warehouse Safety Inspection',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        time: '14:00',
        location: 'Warehouse B',
        leader: 'Sarah Johnson',
        leaderId: 2,
        participants: ['Tom Brown', 'Lisa Anderson'],
        status: 'completed',
        observations: 12,
        positiveFindings: 8,
        correctiveActions: 4,
        duration: '45 minutes',
        notes: 'Identified issues with forklift charging station'
      },
      {
        id: 3,
        title: 'Construction Site Walk',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        time: '08:00',
        location: 'New Building Site',
        leader: 'Mike Wilson',
        leaderId: 3,
        participants: ['John Smith', 'Emma Davis', 'External Auditor'],
        status: 'scheduled',
        observations: 0,
        positiveFindings: 0,
        correctiveActions: 0,
        route: 'Site entrance → Excavation area → Steel work → Concrete pour area'
      }
    ];
  }

  private getMockUserImpact(userId: number): UserImpact {
    return {
      userId,
      userName: 'Current User',
      totalPoints: 2840,
      currentStreak: 7,
      longestStreak: 23,
      totalReports: 47,
      saves: 3,
      interventions: 12,
      nearMisses: 8,
      hazardsIdentified: 15,
      badges: [
        {
          id: 'safety-champion',
          name: 'Safety Champion',
          description: 'Submitted 25+ safety observations',
          earnedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          icon: '🏆'
        },
        {
          id: 'life-saver',
          name: 'Life Saver',
          description: 'Prevented 3 potential incidents',
          earnedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
          icon: '⭐'
        },
        {
          id: 'streak-master',
          name: 'Streak Master',
          description: 'Maintained a 21-day reporting streak',
          earnedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          icon: '🔥'
        },
        {
          id: 'mentor',
          name: 'Safety Mentor',
          description: 'Provided 10+ quick training sessions',
          earnedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
          icon: '👨‍🏫'
        }
      ],
      recentActivity: this.getMockReports().slice(0, 3),
      rank: 5,
      percentile: 92
    };
  }
}

export const behaviourService = new BehaviourService();