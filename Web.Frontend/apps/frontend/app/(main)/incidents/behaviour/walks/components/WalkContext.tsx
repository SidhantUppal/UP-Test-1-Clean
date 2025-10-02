"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import MockWalkService, {
  WalkSession,
  WalkTemplate,
  mockActiveWalks,
  mockWalkTemplates,
  mockCompletedWalks,
  mockScheduledWalks
} from '@/services/mockWalkService';

// Walk Statistics interface
export interface WalkStatistics {
  totalCompleted: number;
  activeWalks: number;
  scheduledToday: number;
  overdueWalks: number;
  issuesFound: number;
  pointsEarned: number;
  completionRate: number;
  averageDuration: number;
}

// Context state interface
interface WalkContextState {
  // Data
  activeWalks: WalkSession[];
  templates: WalkTemplate[];
  completedWalks: any[];
  scheduledWalks: any[];
  statistics: WalkStatistics | null;

  // UI State
  isLoading: boolean;
  error: string | null;

  // Actions
  refreshData: () => Promise<void>;
  startWalk: (templateId: number, assignedTo: string) => Promise<WalkSession>;
  completeWalk: (sessionId: string) => Promise<void>;
  pauseWalk: (sessionId: string) => Promise<void>;
  resumeWalk: (sessionId: string) => Promise<void>;
}

// Create context
const WalkContext = createContext<WalkContextState | undefined>(undefined);

// Custom hook for using walk context
export const useWalkContext = () => {
  const context = useContext(WalkContext);
  if (context === undefined) {
    throw new Error('useWalkContext must be used within a WalkProvider');
  }
  return context;
};

// Walk Provider Component
export const WalkProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeWalks, setActiveWalks] = useState<WalkSession[]>([]);
  const [templates, setTemplates] = useState<WalkTemplate[]>([]);
  const [completedWalks, setCompletedWalks] = useState<any[]>([]);
  const [scheduledWalks, setScheduledWalks] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<WalkStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate statistics from data
  const calculateStatistics = (): WalkStatistics => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate overdue walks (scheduled walks that are past due)
    const overdueCount = scheduledWalks.filter(walk => {
      const walkTime = new Date();
      const [hours, minutes] = walk.time.split(':');
      walkTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      return walkTime < new Date();
    }).length;

    // Calculate total points from completed walks
    const totalPoints = completedWalks.reduce((sum, walk) => sum + (walk.totalPoints || 0), 0);

    // Calculate total issues from all walks
    const totalIssues =
      activeWalks.reduce((sum, walk) => sum + walk.issuesFound, 0) +
      completedWalks.reduce((sum, walk) => sum + (walk.issuesFound || 0), 0);

    // Calculate average duration from completed walks
    const avgDuration = completedWalks.length > 0
      ? completedWalks.reduce((sum, walk) => sum + (walk.duration || 0), 0) / completedWalks.length
      : 0;

    // Calculate completion rate (completed vs total scheduled for today)
    const totalScheduled = scheduledWalks.length + completedWalks.filter(walk => {
      const completedDate = new Date(walk.completedAt);
      return completedDate >= today;
    }).length;

    const completedToday = completedWalks.filter(walk => {
      const completedDate = new Date(walk.completedAt);
      return completedDate >= today;
    }).length;

    const completionRate = totalScheduled > 0 ? (completedToday / totalScheduled) * 100 : 0;

    return {
      totalCompleted: completedWalks.length,
      activeWalks: activeWalks.length,
      scheduledToday: scheduledWalks.length,
      overdueWalks: overdueCount,
      issuesFound: totalIssues,
      pointsEarned: totalPoints,
      completionRate: Math.round(completionRate),
      averageDuration: Math.round(avgDuration)
    };
  };

  // Fetch all data
  const refreshData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Simulate API calls with mock data
      // In production, these would be actual API calls
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

      const activeSessions = MockWalkService.getActiveSessions();
      const walkTemplates = MockWalkService.getTemplates();

      setActiveWalks(activeSessions);
      setTemplates(walkTemplates);
      setCompletedWalks(mockCompletedWalks);
      setScheduledWalks(mockScheduledWalks);

      // Calculate statistics after data is loaded
      const stats = calculateStatistics();
      setStatistics(stats);

    } catch (err) {
      console.error('Error fetching walk data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load walk data');
    } finally {
      setIsLoading(false);
    }
  };

  // Start a new walk
  const startWalk = async (templateId: number, assignedTo: string): Promise<WalkSession> => {
    try {
      const session = MockWalkService.startWalk(templateId, assignedTo);
      await refreshData(); // Refresh to get updated data
      return session;
    } catch (err) {
      console.error('Error starting walk:', err);
      throw err;
    }
  };

  // Complete a walk
  const completeWalk = async (sessionId: string) => {
    try {
      MockWalkService.completeWalk(sessionId);
      await refreshData();
    } catch (err) {
      console.error('Error completing walk:', err);
      throw err;
    }
  };

  // Pause a walk
  const pauseWalk = async (sessionId: string) => {
    try {
      MockWalkService.pauseWalk(sessionId);
      await refreshData();
    } catch (err) {
      console.error('Error pausing walk:', err);
      throw err;
    }
  };

  // Resume a walk
  const resumeWalk = async (sessionId: string) => {
    try {
      MockWalkService.resumeWalk(sessionId);
      await refreshData();
    } catch (err) {
      console.error('Error resuming walk:', err);
      throw err;
    }
  };

  // Initial data load
  useEffect(() => {
    refreshData();
  }, []);

  // Update statistics when data changes
  useEffect(() => {
    if (!isLoading && !error) {
      const stats = calculateStatistics();
      setStatistics(stats);
    }
  }, [activeWalks, completedWalks, scheduledWalks, isLoading, error]);

  const contextValue: WalkContextState = {
    activeWalks,
    templates,
    completedWalks,
    scheduledWalks,
    statistics,
    isLoading,
    error,
    refreshData,
    startWalk,
    completeWalk,
    pauseWalk,
    resumeWalk
  };

  return (
    <WalkContext.Provider value={contextValue}>
      {children}
    </WalkContext.Provider>
  );
};