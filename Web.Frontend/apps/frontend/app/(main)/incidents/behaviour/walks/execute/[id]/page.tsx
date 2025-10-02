"use client";

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import DeviceFrameWrapper from '@/components/DeviceFrameWrapper';
import {
  WalkTemplate,
  WalkCheckpoint
} from '@/types/behaviour/walks';
import {
  BehaviourCategory,
  BEHAVIOUR_COLORS,
  BEHAVIOUR_ICONS,
  BEHAVIOUR_POINTS
} from '@/types/behaviour/reports';
import MockWalkService, {
  WalkSession,
  BehaviourObservation,
  CheckpointResponse
} from '@/services/mockWalkService';

export default function WalkExecutePage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const walkId = params.id as string;
  const templateId = searchParams.get('template');

  // State
  const [session, setSession] = useState<WalkSession | null>(null);
  const [template, setTemplate] = useState<WalkTemplate | null>(null);
  const [currentCheckpoint, setCurrentCheckpoint] = useState<WalkCheckpoint | null>(null);
  const [checkResponses, setCheckResponses] = useState<Record<string, any>>({});
  const [showBehaviourPanel, setShowBehaviourPanel] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [journeyMode, setJourneyMode] = useState(false);
  const [showQuickReport, setShowQuickReport] = useState(false);
  const [selectedBehaviour, setSelectedBehaviour] = useState<BehaviourCategory | null>(null);

  // New state for walk flow
  const [walkStarted, setWalkStarted] = useState(false);
  const [viewMode, setViewMode] = useState<'start' | 'list' | 'checkpoint'>('start');
  const [completedCheckpoints, setCompletedCheckpoints] = useState<Set<number>>(new Set());

  // Initialize or load walk session
  useEffect(() => {
    if (walkId === 'new' && templateId) {
      // Start new walk from template
      const tmpl = MockWalkService.getTemplateById(parseInt(templateId));
      if (tmpl) {
        const newSession = MockWalkService.startWalk(parseInt(templateId), 'Current User');
        setSession(newSession);
        setTemplate(tmpl);
        // Don't set current checkpoint yet - wait for start button
      }
    } else if (walkId !== 'new') {
      // Resume existing walk
      const existingSession = MockWalkService.getSessionById(walkId);
      if (existingSession) {
        setSession(existingSession);
        const tmpl = MockWalkService.getTemplateById(existingSession.walkId);
        if (tmpl) {
          setTemplate(tmpl);
          // If resuming, check if walk was started
          if (existingSession.currentCheckpointIndex > 0 || existingSession.checkpointsCompleted > 0) {
            setWalkStarted(true);
            setViewMode('list');
            // Populate completed checkpoints
            const completed = new Set<number>();
            for (let i = 0; i < existingSession.currentCheckpointIndex; i++) {
              completed.add(i);
            }
            setCompletedCheckpoints(completed);
          }
        }
      }
    }
  }, [walkId, templateId]);

  // GPS tracking
  useEffect(() => {
    if (gpsEnabled && navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
          setCurrentLocation(coords);
          if (session) {
            MockWalkService.addGPSPoint(session.sessionId, coords);
          }
        },
        (error) => console.error('GPS error:', error),
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [gpsEnabled, session]);

  // Start the walk
  const startWalk = () => {
    setWalkStarted(true);
    setViewMode('list');
  };

  // Select a checkpoint from the list
  const selectCheckpoint = (checkpointIndex: number) => {
    if (!template) return;
    setCurrentCheckpoint(template.checkpoints[checkpointIndex]);
    setViewMode('checkpoint');
    setCheckResponses({});
  };

  // Handle checkpoint completion
  const completeCheckpoint = () => {
    if (!session || !currentCheckpoint || !template) return;

    // Check if all required checks are completed
    const requiredChecks = currentCheckpoint.checks.filter(c => c.required);
    const allCompleted = requiredChecks.every(check => checkResponses[check.id] !== undefined);

    if (!allCompleted) {
      alert('Please complete all required checks');
      return;
    }

    // Create checkpoint response
    const response: CheckpointResponse = {
      checkpointId: currentCheckpoint.checkpointId,
      timestamp: new Date(),
      responses: Object.entries(checkResponses).map(([checkItemId, value]) => ({
        checkItemId,
        value
      })),
      passed: !Object.values(checkResponses).includes('no') && !Object.values(checkResponses).includes('fail'),
      issues: Object.entries(checkResponses)
        .filter(([_, value]) => value === 'no' || value === 'fail')
        .map(([id]) => currentCheckpoint.checks.find(c => c.id === id)?.question || '')
    };

    // Update session
    const updatedSession = MockWalkService.completeCheckpoint(
      session.sessionId,
      currentCheckpoint.checkpointId,
      response
    );

    // Mark checkpoint as completed
    const checkpointIndex = template.checkpoints.findIndex(cp => cp.checkpointId === currentCheckpoint.checkpointId);
    setCompletedCheckpoints(prev => new Set([...prev, checkpointIndex]));

    // Go back to list view
    setViewMode('list');
    setCurrentCheckpoint(null);
    setCheckResponses({});
    setSession(updatedSession);

    // Check if all checkpoints are completed
    if (completedCheckpoints.size + 1 === template.checkpoints.length) {
      // Walk completed
      MockWalkService.completeWalk(session.sessionId);
      router.push('/incidents/behaviour/walks');
    }
  };

  // Handle behaviour observation
  const addBehaviourObservation = (category: BehaviourCategory, description: string) => {
    if (!session) return;

    const observation: BehaviourObservation = {
      id: `obs-${Date.now()}`,
      category,
      description,
      location: currentCheckpoint?.location.name || 'In transit',
      timestamp: new Date(),
      points: BEHAVIOUR_POINTS[category],
      checkpointId: currentCheckpoint?.checkpointId
    };

    const updatedSession = MockWalkService.addObservation(session.sessionId, observation);
    setSession(updatedSession);
    setShowQuickReport(false);
    setSelectedBehaviour(null);
  };

  // Pause/Resume walk
  const togglePause = () => {
    if (!session) return;
    
    if (session.status === 'paused') {
      const updated = MockWalkService.resumeWalk(session.sessionId);
      setSession(updated);
    } else {
      const updated = MockWalkService.pauseWalk(session.sessionId);
      setSession(updated);
    }
  };

  // Calculate progress
  const progress = session && template 
    ? (session.checkpointsCompleted / template.checkpoints.length) * 100 
    : 0;

  // Format time elapsed
  const formatElapsed = () => {
    if (!session) return '00:00';
    const elapsed = Date.now() - new Date(session.startTime).getTime();
    const minutes = Math.floor(elapsed / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!session || !template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-purple-600"></div>
          <p className="mt-4 text-gray-600">Loading walk...</p>
        </div>
      </div>
    );
  }

  // Render start screen
  if (viewMode === 'start') {
    return (
      <DeviceFrameWrapper defaultDevice="phone" showToggle={true}>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{template.title}</h1>
              <p className="text-gray-600">{template.checkpoints.length} checkpoints to complete</p>
            </div>

            <button
              onClick={startWalk}
              className="w-full py-4 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
            >
              Start Walk
            </button>

            <button
              onClick={() => router.push('/incidents/behaviour/walks')}
              className="w-full mt-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </DeviceFrameWrapper>
    );
  }

  // Render checkpoint list
  if (viewMode === 'list') {
    return (
      <DeviceFrameWrapper defaultDevice="phone" showToggle={true}>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => router.push('/incidents/behaviour/walks')}
                    className="p-1.5 hover:bg-gray-100 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-lg font-semibold">{template.title}</h1>
                    <p className="text-xs text-gray-500">{completedCheckpoints.size} of {template.checkpoints.length} completed</p>
                  </div>
                </div>
                <button
                  onClick={togglePause}
                  className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    session.status === 'paused'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {session.status === 'paused' ? 'Resume' : 'Pause'}
                </button>
              </div>
              <div className="w-full bg-gray-200 h-1 mt-3">
                <div
                  className="bg-purple-600 h-1 transition-all duration-300"
                  style={{ width: `${(completedCheckpoints.size / template.checkpoints.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Checkpoints List */}
          <div className="flex-1 overflow-auto p-4">
            <h2 className="text-sm font-semibold text-gray-600 uppercase mb-3">Select a Checkpoint</h2>
            <div className="space-y-3">
              {template.checkpoints.map((checkpoint, index) => {
                const isCompleted = completedCheckpoints.has(index);
                const isFirst = index === 0 && completedCheckpoints.size === 0;

                return (
                  <button
                    key={checkpoint.checkpointId}
                    onClick={() => !isCompleted && selectCheckpoint(index)}
                    disabled={isCompleted}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      isCompleted
                        ? 'bg-gray-100 border-gray-300 opacity-60 cursor-not-allowed'
                        : isFirst
                        ? 'bg-green-50 border-green-400 hover:bg-green-100 shadow-md'
                        : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCompleted
                          ? 'bg-gray-300 text-white'
                          : isFirst
                          ? 'bg-green-500 text-white'
                          : 'bg-purple-100 text-purple-600'
                      }`}>
                        {isCompleted ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className="text-sm font-semibold">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          isFirst && !isCompleted ? 'text-green-700' : 'text-gray-900'
                        }`}>
                          {checkpoint.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{checkpoint.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-gray-500">
                            {checkpoint.checks.length} checks
                          </span>
                          {checkpoint.checks.some(c => c.type === 'photo') && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">📷 Photo</span>
                          )}
                          {checkpoint.checks.some(c => (c.type as any) === 'qr') && (
                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">QR Code</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Behaviour Bar */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 z-40">
            <div className="px-3 py-2">
              <div className="flex justify-around">
                {(Object.keys(BEHAVIOUR_POINTS) as BehaviourCategory[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedBehaviour(category);
                      setShowQuickReport(true);
                    }}
                    className="p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                    title={category.replace('-', ' ')}
                  >
                    <span className="text-xl">{BEHAVIOUR_ICONS[category]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Report Modal */}
        {showQuickReport && selectedBehaviour && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white w-full rounded-t-2xl p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Report {selectedBehaviour.replace('-', ' ')}</h3>
                <button
                  onClick={() => {
                    setShowQuickReport(false);
                    setSelectedBehaviour(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4 ${BEHAVIOUR_COLORS[selectedBehaviour]}`}>
                <span className="text-lg">{BEHAVIOUR_ICONS[selectedBehaviour]}</span>
                <span>{selectedBehaviour.replace('-', ' ')}</span>
                <span>+{BEHAVIOUR_POINTS[selectedBehaviour]}pts</span>
              </div>

              <textarea
                placeholder="Describe what you observed..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none h-24 mb-4"
                autoFocus
              />

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addBehaviourObservation(selectedBehaviour, 'Quick observation during walk');
                  }}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                >
                  Submit Report
                </button>
                <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </DeviceFrameWrapper>
    );
  }

  // Render checkpoint view
  if (!currentCheckpoint) {
    return (
      <DeviceFrameWrapper defaultDevice="phone" showToggle={true}>
        <div className="min-h-screen flex items-center justify-center">
          <p>No checkpoint selected</p>
        </div>
      </DeviceFrameWrapper>
    );
  }

  return (
    <DeviceFrameWrapper defaultDevice="phone" showToggle={true}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simplified Mobile Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-40">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <button
                onClick={() => {
                  setViewMode('list');
                  setCurrentCheckpoint(null);
                  setCheckResponses({});
                }}
                className="p-1.5 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1 min-w-0">
                <h1 className="text-base font-semibold truncate">{currentCheckpoint.name}</h1>
                <p className="text-xs text-gray-500">{currentCheckpoint.checks.length} checks</p>
              </div>
            </div>
            <button
              onClick={togglePause}
              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                session.status === 'paused'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {session.status === 'paused' ? 'Resume' : 'Pause'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area - Simplified Mobile */}
      <div className="flex-1 overflow-auto">
        {/* View Toggle Tabs */}
        <div className="flex bg-white border-b border-gray-200">
          <button
            onClick={() => setShowMapView(false)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              !showMapView
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            Checkpoint
          </button>
          <button
            onClick={() => setShowMapView(true)}
            className={`flex-1 py-3 text-sm font-medium border-b-2 transition-colors ${
              showMapView
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500'
            }`}
          >
            Map View
          </button>
        </div>

        <div className="px-3 py-4">
        {showMapView ? (
          // Map View
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              {template.mapImageUrl ? (
                <img src={template.mapImageUrl} alt="Walk map" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <div className="text-center text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <p className="text-sm">No map uploaded</p>
                  {gpsEnabled && session.gpsTrack && session.gpsTrack.length > 0 && (
                    <p className="text-xs mt-2">GPS tracking: {session.gpsTrack.length} points</p>
                  )}
                </div>
              )}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={gpsEnabled}
                  onChange={(e) => setGpsEnabled(e.target.checked)}
                  className="checkbox checkbox-sm checkbox-primary"
                />
                <span className="text-sm">GPS Tracking</span>
              </label>
              <button 
                onClick={() => setShowMapView(false)}
                className="text-sm text-purple-600 font-medium"
              >
                Back to Checkpoint
              </button>
            </div>
          </div>
        ) : (
          // Checkpoint View
          <div className="space-y-4">
            {/* Checkpoint Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="w-full">
                    <h2 className="text-lg font-semibold">{currentCheckpoint.name}</h2>
                    <p className="text-xs text-gray-600 mt-1">{currentCheckpoint.description}</p>
                  </div>
                </div>
              </div>

              {/* Checks List - Mobile Optimized */}
              <div className="p-3 space-y-3">
                {currentCheckpoint.checks.map((check) => (
                  <div key={check.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-start justify-between mb-2">
                      <label className="text-sm font-medium flex-1 pr-2">
                        {check.question}
                        {check.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      {check.scoreValue && (
                        <span className="text-xs text-gray-500">{check.scoreValue} pts</span>
                      )}
                    </div>

                    {/* Check Input Based on Type */}
                    {check.type === 'yes/no' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCheckResponses({...checkResponses, [check.id]: 'yes'})}
                          className={`flex-1 px-3 py-3 rounded-lg border text-sm font-medium transition-colors min-h-[44px] ${
                            checkResponses[check.id] === 'yes'
                              ? 'bg-green-100 border-green-300 text-green-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setCheckResponses({...checkResponses, [check.id]: 'no'})}
                          className={`flex-1 px-3 py-3 rounded-lg border text-sm font-medium transition-colors min-h-[44px] ${
                            checkResponses[check.id] === 'no'
                              ? 'bg-red-100 border-red-300 text-red-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    )}

                    {check.type === 'pass/fail' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCheckResponses({...checkResponses, [check.id]: 'pass'})}
                          className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            checkResponses[check.id] === 'pass'
                              ? 'bg-green-100 border-green-300 text-green-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Pass
                        </button>
                        <button
                          onClick={() => setCheckResponses({...checkResponses, [check.id]: 'fail'})}
                          className={`flex-1 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            checkResponses[check.id] === 'fail'
                              ? 'bg-red-100 border-red-300 text-red-700'
                              : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Fail
                        </button>
                      </div>
                    )}

                    {check.type === 'checkbox' && (
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={checkResponses[check.id] === true}
                          onChange={(e) => setCheckResponses({...checkResponses, [check.id]: e.target.checked})}
                          className="checkbox checkbox-primary"
                        />
                        <span className="text-sm">Confirmed</span>
                      </label>
                    )}

                    {check.type === 'photo' && (
                      <button
                        onClick={() => {
                          // Mock taking a photo
                          setCheckResponses({...checkResponses, [check.id]: `photo_${Date.now()}.jpg`});
                        }}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center justify-center gap-2 min-h-[44px]"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {checkResponses[check.id] ? '✓ Photo taken' : 'Take Photo'}
                      </button>
                    )}

                    {(check.type as any) === 'qr' && (
                      <button
                        onClick={() => {
                          // Mock scanning QR code
                          setCheckResponses({...checkResponses, [check.id]: `qr_scanned_${currentCheckpoint.location.qrCode || 'QR001'}`});
                        }}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center justify-center gap-2 min-h-[44px]"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h2M4 12h8m-4 0v8m-4-8h.01M8 8H4.01M12 8h4.01M16 4h2" />
                        </svg>
                        {checkResponses[check.id] ? '✓ QR Scanned' : 'Scan QR Code'}
                      </button>
                    )}

                    {check.type === 'text' && (
                      <input
                        type="text"
                        value={checkResponses[check.id] || ''}
                        onChange={(e) => setCheckResponses({...checkResponses, [check.id]: e.target.value})}
                        placeholder="Enter details..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Checkpoint Actions */}
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={completeCheckpoint}
                  className="w-full px-4 py-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors min-h-[56px] text-base active:scale-95"
                >
                  Complete Checkpoint
                </button>
              </div>
            </div>

          </div>
        )}
        </div>
      </div>

      {/* Always Visible Bottom Behaviour Bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 z-40">
        <div className="px-3 py-2">
          <div className="flex justify-around">
            {(Object.keys(BEHAVIOUR_POINTS) as BehaviourCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedBehaviour(category);
                  setShowQuickReport(true);
                }}
                className="p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors"
                title={category.replace('-', ' ')}
              >
                <span className="text-xl">{BEHAVIOUR_ICONS[category]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Report Modal */}
      {showQuickReport && selectedBehaviour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Report {selectedBehaviour.replace('-', ' ')}</h3>
              <button
                onClick={() => {
                  setShowQuickReport(false);
                  setSelectedBehaviour(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4 ${BEHAVIOUR_COLORS[selectedBehaviour]}`}>
              <span className="text-lg">{BEHAVIOUR_ICONS[selectedBehaviour]}</span>
              <span>{selectedBehaviour.replace('-', ' ')}</span>
              <span>+{BEHAVIOUR_POINTS[selectedBehaviour]}pts</span>
            </div>

            <textarea
              placeholder="Describe what you observed..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none h-24 mb-4"
              autoFocus
            />

            <div className="flex gap-3">
              <button
                onClick={() => {
                  addBehaviourObservation(selectedBehaviour, 'Quick observation during walk');
                }}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
              >
                Submit Report
              </button>
              <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </DeviceFrameWrapper>
  );
}