'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Camera, MapPin, List, Clock, CheckCircle, SkipForward, ChevronDown, ChevronUp, X } from 'lucide-react';

interface WalkCheckpoint {
  id: string;
  number: number;
  name: string;
  location: string;
  verified: boolean;
  skipped: boolean;
  photo?: string;
}

interface ScheduledWalk {
  id: string;
  name: string;
  location: string;
  duration: number;
  checkpoints: number;
  lastCompleted?: Date;
  progress: number;
  status: 'not-started' | 'in-progress' | 'completed';
  assignedDate: Date;
  dueDate: Date;
}

export default function MyWalksPage() {
  const [selectedWalk, setSelectedWalk] = useState<ScheduledWalk | null>(null);
  const [currentCheckpoint, setCurrentCheckpoint] = useState(0);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list');
  const [showBehaviorPanel, setShowBehaviorPanel] = useState(false);
  const [showEarlyFinishModal, setShowEarlyFinishModal] = useState(false);
  const [earlyFinishReason, setEarlyFinishReason] = useState('');
  const [checkpoints, setCheckpoints] = useState<WalkCheckpoint[]>([]);

  // Mock data for scheduled walks
  const scheduledWalks: ScheduledWalk[] = [
    {
      id: '1',
      name: 'Main Floor Safety Walk',
      location: 'Building A - Production Floor',
      duration: 45,
      checkpoints: 12,
      lastCompleted: new Date('2025-01-28'),
      progress: 0,
      status: 'not-started',
      assignedDate: new Date('2025-01-29'),
      dueDate: new Date('2025-01-30'),
    },
    {
      id: '2',
      name: 'Warehouse Inspection',
      location: 'Building B - Storage Area',
      duration: 30,
      checkpoints: 8,
      progress: 3,
      status: 'in-progress',
      assignedDate: new Date('2025-01-28'),
      dueDate: new Date('2025-01-29'),
    },
    {
      id: '3',
      name: 'Office Area Walk',
      location: 'Building C - Admin',
      duration: 20,
      checkpoints: 6,
      lastCompleted: new Date('2025-01-27'),
      progress: 0,
      status: 'not-started',
      assignedDate: new Date('2025-01-29'),
      dueDate: new Date('2025-01-31'),
    },
  ];

  // Mock checkpoints for a walk
  const mockCheckpoints: WalkCheckpoint[] = [
    { id: '1', number: 1, name: 'Entry Point', location: 'Main Gate', verified: false, skipped: false },
    { id: '2', number: 2, name: 'Loading Dock', location: 'North Side', verified: false, skipped: false },
    { id: '3', number: 3, name: 'Storage Area', location: 'Warehouse', verified: false, skipped: false },
    { id: '4', number: 4, name: 'Break Room', location: 'Floor 2', verified: false, skipped: false },
    { id: '5', number: 5, name: 'Emergency Exit', location: 'South Wall', verified: false, skipped: false },
    { id: '6', number: 6, name: 'Fire Equipment', location: 'All Areas', verified: false, skipped: false },
  ];

  useEffect(() => {
    if (selectedWalk) {
      setCheckpoints(mockCheckpoints);
      // Check for offline data
      const savedProgress = localStorage.getItem(`walk-${selectedWalk.id}`);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        setCurrentCheckpoint(parsed.currentCheckpoint);
        setCheckpoints(parsed.checkpoints);
      }
    }
  }, [selectedWalk]);

  const handleCheckpointVerify = () => {
    const updatedCheckpoints = [...checkpoints];
    updatedCheckpoints[currentCheckpoint].verified = true;
    setCheckpoints(updatedCheckpoints);

    // Save progress offline
    if (selectedWalk) {
      localStorage.setItem(`walk-${selectedWalk.id}`, JSON.stringify({
        currentCheckpoint,
        checkpoints: updatedCheckpoints,
        timestamp: new Date().toISOString(),
      }));
    }

    // Auto-advance to next checkpoint
    if (currentCheckpoint < checkpoints.length - 1) {
      setTimeout(() => {
        setCurrentCheckpoint(currentCheckpoint + 1);
      }, 500);
    }
  };

  const handleSkipCheckpoint = () => {
    const updatedCheckpoints = [...checkpoints];
    updatedCheckpoints[currentCheckpoint].skipped = true;
    setCheckpoints(updatedCheckpoints);

    if (currentCheckpoint < checkpoints.length - 1) {
      setCurrentCheckpoint(currentCheckpoint + 1);
    }
  };

  const handleUndo = () => {
    if (currentCheckpoint > 0) {
      setCurrentCheckpoint(currentCheckpoint - 1);
      const updatedCheckpoints = [...checkpoints];
      updatedCheckpoints[currentCheckpoint - 1].verified = false;
      updatedCheckpoints[currentCheckpoint - 1].skipped = false;
      setCheckpoints(updatedCheckpoints);
    }
  };

  const handleEarlyFinish = () => {
    if (selectedWalk && earlyFinishReason) {
      // Save early finish data
      localStorage.setItem(`walk-${selectedWalk.id}-finished`, JSON.stringify({
        reason: earlyFinishReason,
        checkpoint: currentCheckpoint,
        timestamp: new Date().toISOString(),
      }));
      setShowEarlyFinishModal(false);
      setSelectedWalk(null);
      setCurrentCheckpoint(0);
    }
  };

  const progress = selectedWalk && checkpoints.length > 0
    ? (checkpoints.filter(c => c.verified || c.skipped).length / checkpoints.length) * 100
    : 0;

  if (selectedWalk) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <div className="bg-[#3d3a72] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedWalk(null)} className="p-2">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="font-semibold">{selectedWalk.name}</h1>
              <p className="text-sm opacity-90">{selectedWalk.location}</p>
            </div>
          </div>
          <button
            onClick={() => setShowEarlyFinishModal(true)}
            className="text-sm bg-white/20 px-3 py-1 rounded"
          >
            Finish Early
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-white p-4 border-b">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress: {Math.round(progress)}%</span>
            <span>{checkpoints.filter(c => c.verified || c.skipped).length}/{checkpoints.length} Checkpoints</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-[#e77726] h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* View Toggle */}
        <div className="bg-white p-2 flex gap-2 border-b">
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 py-2 rounded flex items-center justify-center gap-2 ${
              viewMode === 'map' ? 'bg-[#3d3a72] text-white' : 'bg-gray-100'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Map View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-2 rounded flex items-center justify-center gap-2 ${
              viewMode === 'list' ? 'bg-[#3d3a72] text-white' : 'bg-gray-100'
            }`}
          >
            <List className="w-4 h-4" />
            List View
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-4">
          {viewMode === 'map' ? (
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">Map View - Checkpoint {currentCheckpoint + 1}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {checkpoints.map((checkpoint, index) => (
                <div
                  key={checkpoint.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    index === currentCheckpoint
                      ? 'border-[#e77726] bg-orange-50'
                      : checkpoint.verified
                      ? 'border-green-500 bg-green-50'
                      : checkpoint.skipped
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        checkpoint.verified ? 'bg-green-500' :
                        checkpoint.skipped ? 'bg-yellow-500' :
                        index === currentCheckpoint ? 'bg-[#e77726]' : 'bg-gray-400'
                      }`}>
                        {checkpoint.verified ? '✓' : checkpoint.number}
                      </div>
                      <div>
                        <p className="font-medium">{checkpoint.name}</p>
                        <p className="text-sm text-gray-600">{checkpoint.location}</p>
                      </div>
                    </div>
                    {checkpoint.verified && <CheckCircle className="w-5 h-5 text-green-500" />}
                    {checkpoint.skipped && <SkipForward className="w-5 h-5 text-yellow-500" />}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Current Checkpoint Actions */}
          {currentCheckpoint < checkpoints.length && (
            <div className="mt-6 p-4 bg-white rounded-lg border-2 border-[#3d3a72]">
              <h3 className="font-semibold mb-3">
                Checkpoint {currentCheckpoint + 1}: {checkpoints[currentCheckpoint].name}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleCheckpointVerify}
                  className="bg-[#3d3a72] text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <Camera className="w-5 h-5" />
                  Scan QR / Photo
                </button>
                <button
                  onClick={handleSkipCheckpoint}
                  className="bg-yellow-500 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <SkipForward className="w-5 h-5" />
                  Skip (Permission)
                </button>
              </div>
              {currentCheckpoint > 0 && (
                <button
                  onClick={handleUndo}
                  className="w-full mt-3 py-2 border border-gray-300 rounded-lg text-gray-600"
                >
                  Undo Previous
                </button>
              )}
            </div>
          )}

          {/* Completion Message */}
          {currentCheckpoint >= checkpoints.length && (
            <div className="mt-6 p-6 bg-green-100 rounded-lg text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Walk Completed!</h3>
              <p className="text-gray-600">All checkpoints have been verified.</p>
              <button
                onClick={() => {
                  setSelectedWalk(null);
                  setCurrentCheckpoint(0);
                }}
                className="mt-4 bg-[#3d3a72] text-white px-6 py-2 rounded-lg"
              >
                Return to My Walks
              </button>
            </div>
          )}
        </div>

        {/* Behavior Reporting Panel */}
        <div className={`bg-white border-t transition-all duration-300 ${
          showBehaviorPanel ? 'h-64' : 'h-16'
        }`}>
          <button
            onClick={() => setShowBehaviorPanel(!showBehaviorPanel)}
            className="w-full p-4 flex items-center justify-between"
          >
            <span className="font-medium">Report Behavior Observation</span>
            {showBehaviorPanel ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>
          {showBehaviorPanel && (
            <div className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <button className="py-2 px-4 bg-green-100 text-green-700 rounded-lg">
                  Safe Behavior
                </button>
                <button className="py-2 px-4 bg-red-100 text-red-700 rounded-lg">
                  Unsafe Behavior
                </button>
              </div>
              <textarea
                placeholder="Describe the behavior..."
                className="w-full p-3 border rounded-lg resize-none h-24"
              />
              <button className="w-full mt-3 bg-[#e77726] text-white py-2 rounded-lg">
                Submit Observation
              </button>
            </div>
          )}
        </div>

        {/* Early Finish Modal */}
        {showEarlyFinishModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Finish Walk Early</h3>
                <button onClick={() => setShowEarlyFinishModal(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                You've completed {checkpoints.filter(c => c.verified || c.skipped).length} of {checkpoints.length} checkpoints.
                Please provide a reason for finishing early:
              </p>
              <textarea
                value={earlyFinishReason}
                onChange={(e) => setEarlyFinishReason(e.target.value)}
                placeholder="Enter reason..."
                className="w-full p-3 border rounded-lg resize-none h-24 mb-4"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowEarlyFinishModal(false)}
                  className="flex-1 py-2 border border-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEarlyFinish}
                  disabled={!earlyFinishReason}
                  className="flex-1 py-2 bg-[#3d3a72] text-white rounded-lg disabled:opacity-50"
                >
                  Finish Walk
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#3d3a72] text-white p-4">
        <h1 className="text-xl font-semibold">My Walks</h1>
        <p className="text-sm opacity-90 mt-1">Scheduled safety walks</p>
      </div>

      {/* Stats */}
      <div className="p-4 grid grid-cols-3 gap-3">
        <div className="bg-white rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-[#3d3a72]">{scheduledWalks.length}</p>
          <p className="text-xs text-gray-600">Assigned</p>
        </div>
        <div className="bg-white rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-[#e77726]">
            {scheduledWalks.filter(w => w.status === 'in-progress').length}
          </p>
          <p className="text-xs text-gray-600">In Progress</p>
        </div>
        <div className="bg-white rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-green-500">
            {scheduledWalks.filter(w => w.status === 'completed').length}
          </p>
          <p className="text-xs text-gray-600">Completed</p>
        </div>
      </div>

      {/* Walk List */}
      <div className="p-4 space-y-3">
        {scheduledWalks.map((walk) => (
          <div
            key={walk.id}
            onClick={() => setSelectedWalk(walk)}
            className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 active:scale-98 transition-transform cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{walk.name}</h3>
                <p className="text-sm text-gray-600">{walk.location}</p>
              </div>
              {walk.status === 'in-progress' && (
                <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                  In Progress
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{walk.duration} min</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="w-4 h-4" />
                <span>{walk.checkpoints} checkpoints</span>
              </div>
            </div>

            {walk.progress > 0 && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#e77726] h-2 rounded-full"
                    style={{ width: `${(walk.progress / walk.checkpoints) * 100}%` }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
              <span>Due: {walk.dueDate.toLocaleDateString()}</span>
              {walk.lastCompleted && (
                <span>Last: {walk.lastCompleted.toLocaleDateString()}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PWA Install Prompt (would be triggered by service worker) */}
      <div className="fixed bottom-4 left-4 right-4 bg-[#3d3a72] text-white p-4 rounded-lg hidden">
        <p className="text-sm mb-2">Install My Walks app for offline access</p>
        <button className="bg-white text-[#3d3a72] px-4 py-2 rounded text-sm font-medium">
          Install App
        </button>
      </div>
    </div>
  );
}