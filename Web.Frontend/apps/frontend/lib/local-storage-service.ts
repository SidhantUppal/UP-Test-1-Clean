// Local storage service for T100 Platform
// This provides temporary storage before database integration

export interface ChecklistTemplate {
  id: string;
  title: string;
  description: string;
  category: 'safety' | 'quality' | 'maintenance' | 'compliance' | 'operations' | 'hr';
  version: string;
  createdBy: string;
  createdDate: string;
  lastUpdated: string;
  estimatedTime: string;
  questions: ChecklistQuestion[];
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  timesUsed: number;
  avgScore?: number;
}

export interface ChecklistQuestion {
  id: string;
  text: string;
  type: 'yn-na' | 'yn-na-dk' | 'checkbox' | 'score-5' | 'score-10' | 'pass-fail' | 'text' | 'number' | 'dropdown' | 'multiple-single' | 'multiple-multi' | 'date-time' | 'photo' | 'signature';
  required: boolean;
  helpText?: string;
  category?: string;
  options?: string[];
  min?: number;
  max?: number;
  units?: string;
  weight?: number;
  isKillQuestion?: boolean;
}

export interface ChecklistAssignment {
  id: string;
  checklistId: string;
  checklistTitle: string;
  assignedTo: string;
  assignedBy: string;
  assignedDate: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  completedDate?: string;
  score?: number;
  responses?: ChecklistResponse[];
}

export interface ChecklistResponse {
  questionId: string;
  value: string | number | boolean | string[];
  timestamp: string;
  notes?: string;
}

class LocalStorageService {
  private readonly STORAGE_KEYS = {
    CHECKLISTS: 't100_checklists',
    ASSIGNMENTS: 't100_checklist_assignments',
    DRAFT_CHECKLIST: 't100_draft_checklist',
    USER_PREFERENCES: 't100_user_preferences',
    DEBUG_SETTINGS: 't100_debug_settings'
  };

  // Checklist Template Management
  saveChecklist(checklist: Omit<ChecklistTemplate, 'id' | 'createdDate' | 'lastUpdated' | 'timesUsed'>): ChecklistTemplate {
    const existingChecklists = this.getAllChecklists();
    
    const newChecklist: ChecklistTemplate = {
      ...checklist,
      id: this.generateId(),
      createdDate: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      timesUsed: 0,
      avgScore: undefined
    };
    
    existingChecklists.push(newChecklist);
    localStorage.setItem(this.STORAGE_KEYS.CHECKLISTS, JSON.stringify(existingChecklists));
    
    return newChecklist;
  }

  updateChecklist(id: string, updates: Partial<ChecklistTemplate>): ChecklistTemplate | null {
    const checklists = this.getAllChecklists();
    const index = checklists.findIndex(c => c.id === id);
    
    if (index === -1) return null;
    
    checklists[index] = {
      ...checklists[index],
      ...updates,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(this.STORAGE_KEYS.CHECKLISTS, JSON.stringify(checklists));
    return checklists[index];
  }

  getChecklist(id: string): ChecklistTemplate | null {
    const checklists = this.getAllChecklists();
    return checklists.find(c => c.id === id) || null;
  }

  getAllChecklists(): ChecklistTemplate[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.CHECKLISTS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading checklists:', error);
      return [];
    }
  }

  getChecklistsByCategory(category: string): ChecklistTemplate[] {
    return this.getAllChecklists().filter(c => c.category === category);
  }

  deleteChecklist(id: string): boolean {
    const checklists = this.getAllChecklists();
    const filtered = checklists.filter(c => c.id !== id);
    
    if (filtered.length < checklists.length) {
      localStorage.setItem(this.STORAGE_KEYS.CHECKLISTS, JSON.stringify(filtered));
      return true;
    }
    return false;
  }

  // Draft Management
  saveDraft(checklist: Partial<ChecklistTemplate>): void {
    localStorage.setItem(this.STORAGE_KEYS.DRAFT_CHECKLIST, JSON.stringify({
      ...checklist,
      savedAt: new Date().toISOString()
    }));
  }

  getDraft(): Partial<ChecklistTemplate> | null {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.DRAFT_CHECKLIST);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error loading draft:', error);
      return null;
    }
  }

  clearDraft(): void {
    localStorage.removeItem(this.STORAGE_KEYS.DRAFT_CHECKLIST);
  }

  // Assignment Management
  createAssignment(
    checklistId: string,
    assignedTo: string,
    dueDate: string,
    assignedBy: string = 'Current User'
  ): ChecklistAssignment | null {
    const checklist = this.getChecklist(checklistId);
    if (!checklist) return null;

    const assignments = this.getAllAssignments();
    const newAssignment: ChecklistAssignment = {
      id: this.generateId(),
      checklistId,
      checklistTitle: checklist.title,
      assignedTo,
      assignedBy,
      assignedDate: new Date().toISOString(),
      dueDate,
      status: 'pending'
    };

    assignments.push(newAssignment);
    localStorage.setItem(this.STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));

    // Increment times used
    this.updateChecklist(checklistId, { timesUsed: checklist.timesUsed + 1 });

    return newAssignment;
  }

  getAllAssignments(): ChecklistAssignment[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.ASSIGNMENTS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading assignments:', error);
      return [];
    }
  }

  getAssignmentsByUser(userId: string): ChecklistAssignment[] {
    return this.getAllAssignments().filter(a => a.assignedTo === userId);
  }

  getAssignment(id: string): ChecklistAssignment | null {
    const assignments = this.getAllAssignments();
    return assignments.find(a => a.id === id) || null;
  }

  updateAssignment(id: string, updates: Partial<ChecklistAssignment>): ChecklistAssignment | null {
    const assignments = this.getAllAssignments();
    const index = assignments.findIndex(a => a.id === id);
    
    if (index === -1) return null;
    
    assignments[index] = {
      ...assignments[index],
      ...updates
    };
    
    localStorage.setItem(this.STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
    return assignments[index];
  }

  completeAssignment(id: string, responses: ChecklistResponse[], score: number): ChecklistAssignment | null {
    return this.updateAssignment(id, {
      status: 'completed',
      completedDate: new Date().toISOString(),
      responses,
      score
    });
  }

  // Search and Filter
  searchChecklists(query: string): ChecklistTemplate[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllChecklists().filter(c => 
      c.title.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      c.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Import/Export
  exportChecklists(): string {
    const data = {
      checklists: this.getAllChecklists(),
      assignments: this.getAllAssignments(),
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    return JSON.stringify(data, null, 2);
  }

  importChecklists(jsonData: string): { checklistsImported: number; assignmentsImported: number } {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.checklists) {
        const existingChecklists = this.getAllChecklists();
        const newChecklists = [...existingChecklists, ...data.checklists];
        localStorage.setItem(this.STORAGE_KEYS.CHECKLISTS, JSON.stringify(newChecklists));
      }
      
      if (data.assignments) {
        const existingAssignments = this.getAllAssignments();
        const newAssignments = [...existingAssignments, ...data.assignments];
        localStorage.setItem(this.STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(newAssignments));
      }
      
      return {
        checklistsImported: data.checklists?.length || 0,
        assignmentsImported: data.assignments?.length || 0
      };
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Invalid import data format');
    }
  }

  // Utility Methods
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  clearAllData(): void {
    Object.values(this.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  // Debug Settings Management
  getDebugSetting(key: string, defaultValue: boolean = false): boolean {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.DEBUG_SETTINGS);
      const settings = stored ? JSON.parse(stored) : {};
      return settings[key] !== undefined ? settings[key] : defaultValue;
    } catch (error) {
      console.error('Error loading debug settings:', error);
      return defaultValue;
    }
  }

  setDebugSetting(key: string, value: boolean): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.DEBUG_SETTINGS);
      const settings = stored ? JSON.parse(stored) : {};
      settings[key] = value;
      localStorage.setItem(this.STORAGE_KEYS.DEBUG_SETTINGS, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving debug settings:', error);
    }
  }

  getAllDebugSettings(): Record<string, boolean> {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEYS.DEBUG_SETTINGS);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Error loading debug settings:', error);
      return {};
    }
  }

  // Initialize with demo data if empty
  initializeWithDemoData(): void {
    if (this.getAllChecklists().length === 0) {
      const demoChecklists: Omit<ChecklistTemplate, 'id' | 'createdDate' | 'lastUpdated' | 'timesUsed'>[] = [
        {
          title: 'Daily Safety Inspection',
          description: 'Comprehensive daily safety walkthrough for construction sites',
          category: 'safety',
          version: '2.1',
          createdBy: 'Safety Manager',
          estimatedTime: '15 minutes',
          status: 'published',
          tags: ['daily', 'safety', 'construction'],
          questions: [
            {
              id: 'q1',
              text: 'Are all workers wearing required PPE?',
              type: 'yn-na',
              required: true,
              category: 'PPE',
              helpText: 'Check for hard hats, safety glasses, and steel-toe boots'
            },
            {
              id: 'q2',
              text: 'Is the work area free of trip hazards?',
              type: 'yn-na',
              required: true,
              category: 'Work Area'
            },
            {
              id: 'q3',
              text: 'Rate the overall site cleanliness',
              type: 'score-5',
              required: false,
              category: 'General'
            }
          ]
        },
        {
          title: 'Equipment Maintenance Check',
          description: 'Standard maintenance checklist for heavy equipment',
          category: 'maintenance',
          version: '1.3',
          createdBy: 'Maintenance Supervisor',
          estimatedTime: '30 minutes',
          status: 'published',
          tags: ['equipment', 'maintenance', 'monthly'],
          questions: [
            {
              id: 'q1',
              text: 'Is the oil level within acceptable range?',
              type: 'yn-na',
              required: true,
              category: 'Fluids'
            },
            {
              id: 'q2',
              text: 'Enter the current hour meter reading',
              type: 'number',
              required: true,
              category: 'Readings',
              units: 'hours'
            }
          ]
        }
      ];

      demoChecklists.forEach(checklist => this.saveChecklist(checklist));
    }
  }
}

// Export singleton instance
export const localStorageService = new LocalStorageService();

// Export types
export type { ChecklistTemplate, ChecklistQuestion, ChecklistAssignment, ChecklistResponse };