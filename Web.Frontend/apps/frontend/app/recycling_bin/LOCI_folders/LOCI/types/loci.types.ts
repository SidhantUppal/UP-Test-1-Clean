export type LOCIStatus = 'complete' | 'partial' | 'broken' | 'pending';
export type LOCIType = 'P' | 'V' | 'V2' | 'F' | 'I' | 'C' | 'DB' | 'N' | 'M';

export interface LOCIElement {
  id: string;
  pageId: string;
  element: string;
  status: LOCIStatus;
  type: LOCIType[];
  permission?: string;
  currentUser?: { 
    role: string; 
    hasPermission: boolean; 
  };
  info: {
    action: string;
    effects: string[];
    api?: string;
  };
  connections: string[];
  validation?: string[];
  dbRules?: string[];
  history: { 
    date: string; 
    change: string; 
    by: string; 
  }[];
  filePath?: string;
  lineNumber?: number;
  lastUpdated: string;
}

export interface LOCIPageInfo {
  pageId: string;
  title: string;
  route: string;
  permission?: string;
  elements: string[];
  lastScanned: string;
}

export interface LOCIConversation {
  timestamp: string;
  userPrompt: string;
  claudeResponse: string;
  changesMade: string[];
  status: 'pending' | 'resolved' | 'failed';
}

export interface LOCIStorage {
  getElement(id: string): Promise<LOCIElement | null>;
  saveElement(element: LOCIElement): Promise<void>;
  getPageElements(pageId: string): Promise<LOCIElement[]>;
  getConversations(elementId: string): Promise<LOCIConversation[]>;
  saveConversation(elementId: string, conversation: LOCIConversation): Promise<void>;
}