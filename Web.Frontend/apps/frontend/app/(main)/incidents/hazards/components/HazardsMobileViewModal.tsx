"use client";

import { useState } from 'react';
import { Hazard, getSeverityColor } from '@/types/hazard.types';
import {
  BehaviourCategory,
  BEHAVIOUR_COLORS,
  BEHAVIOUR_ICONS,
  BEHAVIOUR_POINTS
} from '@/types/behaviour/reports';
import MobileHazardCard from './MobileHazardCard';
import BehaviourQuickReportModal from './BehaviourQuickReportModal';
import DeviceFrameWrapper from '@/components/DeviceFrameWrapper';

interface HazardsMobileViewModalProps {
  hazards: Hazard[];
  loading: boolean;
  onClose: () => void;
}

export default function HazardsMobileViewModal({
  hazards,
  loading,
  onClose
}: HazardsMobileViewModalProps) {
  const [selectedBehaviour, setSelectedBehaviour] = useState<BehaviourCategory | null>(null);
  const [showBehaviourModal, setShowBehaviourModal] = useState(false);

  const handleBehaviourClick = (category: BehaviourCategory) => {
    setSelectedBehaviour(category);
    setShowBehaviourModal(true);
  };

  const handleBehaviourReport = (data: any) => {
    console.log('Behaviour report submitted:', data);
    // In a real implementation, this would send to the backend
    setShowBehaviourModal(false);
    setSelectedBehaviour(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Mobile View - Hazards Management</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Device Frame Content */}
        <div className="flex-1 overflow-hidden p-4">
          <DeviceFrameWrapper defaultDevice="phone" showToggle={true}>
            <div className="h-full bg-gray-50 flex flex-col">
              {/* Mobile Header */}
              <header className="sticky top-0 bg-white border-b border-gray-200 z-30 px-4 py-3">
                <div className="flex items-center justify-between">
                  <h1 className="text-lg font-bold text-gray-900">Hazards</h1>
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                      {hazards.length} Active
                    </span>
                    <button className="p-1">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </header>

              {/* Mobile Content - Scrollable */}
              <div className="flex-1 overflow-y-auto pb-20">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-gray-500">Loading hazards...</div>
                  </div>
                ) : hazards.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-500 px-4">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <p className="text-sm">No hazards found</p>
                    </div>
                  </div>
                ) : (
                  <div className="px-3 py-3 space-y-3">
                    {hazards.map((hazard) => (
                      <MobileHazardCard key={hazard.hazardId} hazard={hazard} />
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Behaviour Panel - Always Visible */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 z-40 shadow-lg">
                <div className="px-3 py-2">
                  <div className="text-xs text-gray-600 text-center mb-1 font-medium">
                    Quick Safety Report
                  </div>
                  <div className="flex justify-around">
                    {(Object.keys(BEHAVIOUR_POINTS) as BehaviourCategory[]).map((category) => (
                      <button
                        key={category}
                        onClick={() => handleBehaviourClick(category)}
                        className="p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors flex flex-col items-center gap-1 min-w-[44px]"
                        title={`${category.replace('-', ' ')} (${BEHAVIOUR_POINTS[category]} pts)`}
                      >
                        <span className="text-xl" role="img" aria-label={category}>
                          {BEHAVIOUR_ICONS[category]}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">
                          +{BEHAVIOUR_POINTS[category]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </DeviceFrameWrapper>
        </div>

        {/* Information Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-6">
              <span className="font-medium">Behaviour Categories:</span>
              <span>🛑 Intervention</span>
              <span>📚 Training</span>
              <span>🛡️ Save</span>
              <span>⚠️ Hazard</span>
              <span>⚡ Near Miss</span>
              <span>✅ Good Behavior</span>
            </div>
            <div className="text-xs text-gray-500">
              Tap any icon to report
            </div>
          </div>
        </div>
      </div>

      {/* Behaviour Report Modal */}
      {showBehaviourModal && selectedBehaviour && (
        <BehaviourQuickReportModal
          category={selectedBehaviour}
          onSubmit={handleBehaviourReport}
          onClose={() => {
            setShowBehaviourModal(false);
            setSelectedBehaviour(null);
          }}
        />
      )}
    </div>
  );
}