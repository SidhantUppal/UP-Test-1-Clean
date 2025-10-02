"use client";

import { useState } from 'react';
import { HAZARD_SEVERITY_LEVELS, getSeverityColor } from '@/types/hazard.types';
import {
  BehaviourCategory,
  BEHAVIOUR_COLORS,
  BEHAVIOUR_ICONS,
  BEHAVIOUR_POINTS
} from '@/types/behaviour/reports';
import DeviceFrameWrapper from '@/components/DeviceFrameWrapper';

interface NewHazardMobileViewProps {
  formData: any;
  categories: Array<{ HazardCategoryID: number; CategoryName: string; CategoryTypeName: string }>;
  locations: Array<{ LocationID: number; LocationName: string }>;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  onChange: (field: string, value: any) => void;
}

export default function NewHazardMobileView({
  formData,
  categories,
  locations,
  onClose,
  onSubmit,
  onChange
}: NewHazardMobileViewProps) {
  const [showBehaviourModal, setShowBehaviourModal] = useState(false);
  const [selectedBehaviour, setSelectedBehaviour] = useState<BehaviourCategory | null>(null);
  const [showTaskOptions, setShowTaskOptions] = useState(false);

  const handleBehaviourClick = (category: BehaviourCategory) => {
    setSelectedBehaviour(category);
    setShowBehaviourModal(true);
  };

  const handleBehaviourReport = (data: any) => {
    console.log('Behaviour report submitted:', data);
    setShowBehaviourModal(false);
    setSelectedBehaviour(null);
  };

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(e);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Mobile View - Report New Hazard</h2>
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
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">Report Hazard</h1>
                    <p className="text-xs text-gray-500">Quick field reporting</p>
                  </div>
                  <button className="p-2 bg-orange-500 text-white rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </header>

              {/* Mobile Form Content - Scrollable */}
              <div className="flex-1 overflow-y-auto pb-20">
                <form onSubmit={handleMobileSubmit} className="p-4 space-y-4">
                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.fixedWhenFound}
                          onChange={(e) => onChange('fixedWhenFound', e.target.checked)}
                          className="mr-2 h-5 w-5 text-green-600 rounded"
                        />
                        <span className="text-sm font-medium">Fixed when found</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.assignToMe}
                          onChange={(e) => onChange('assignToMe', e.target.checked)}
                          className="mr-2 h-5 w-5 text-blue-600 rounded"
                        />
                        <span className="text-sm font-medium">Assign to me</span>
                      </label>
                    </div>
                  </div>

                  {/* Severity Selection */}
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Severity Level <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {HAZARD_SEVERITY_LEVELS.map((level) => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => onChange('severity', level.value)}
                          className={`py-2 px-2 rounded-md text-xs font-medium transition-all ${
                            formData.severity === level.value
                              ? 'ring-2 ring-offset-1'
                              : 'hover:opacity-80'
                          }`}
                          style={{
                            backgroundColor: formData.severity === level.value
                              ? getSeverityColor(level.value)
                              : `${getSeverityColor(level.value)}20`,
                            color: formData.severity === level.value
                              ? '#ffffff'
                              : getSeverityColor(level.value),
                            borderColor: getSeverityColor(level.value)
                          }}
                        >
                          {level.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hazard Type Selection */}
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hazard Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.hazardCategoryId}
                      onChange={(e) => onChange('hazardCategoryId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      required
                    >
                      <option value="">Select hazard type...</option>
                      <option value="slip_trip_fall">Slip Trip or Fall Hazard</option>
                      <option value="electrical">Electrical Hazard</option>
                      <option value="respiratory">Respiratory Hazard</option>
                      <option value="general">General</option>
                      <option value="collapse_falling">Collapse/Falling Object Hazard</option>
                      <option value="fire">Fire Hazard</option>
                      <option value="trapping">Trapping Hazard</option>
                      <option value="explosive">Explosive Hazard</option>
                      <option value="asbestos">Asbestos Hazard</option>
                      <option value="drowning">Drowning Hazard</option>
                      <option value="mechanical">Mechanical Hazard</option>
                      <option value="handling">Handling Hazard</option>
                      <option value="moving_equipment">Moving Equipment Hazard</option>
                      <option value="noise">Noise Hazard</option>
                      {categories.map((cat) => (
                        <option key={cat.HazardCategoryID} value={cat.HazardCategoryID}>
                          {cat.CategoryName} ({cat.CategoryTypeName})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Location Selection */}
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <select
                      value={formData.locationId}
                      onChange={(e) => onChange('locationId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="">Select location...</option>
                      {locations.map((loc) => (
                        <option key={loc.LocationID} value={loc.LocationID}>
                          {loc.LocationName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.hazardDescription}
                      onChange={(e) => onChange('hazardDescription', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm resize-none"
                      rows={4}
                      placeholder="Describe the hazard..."
                      required
                    />
                  </div>

                  {/* Assignment Section (Optional) */}
                  {!formData.assignToMe && (
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assign To
                      </label>
                      <input
                        type="text"
                        value={formData.assignedToUserName || formData.assignedToRoleName || ''}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                        placeholder="Not assigned - tap to select"
                      />
                    </div>
                  )}

                  {/* Photo Capture */}
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <button
                      type="button"
                      className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-md text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm font-medium">Add Photo</span>
                    </button>
                  </div>

                  {/* Resolution Notes (if fixed when found) */}
                  {formData.fixedWhenFound && (
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <label className="block text-sm font-medium text-green-700 mb-2">
                        Resolution Notes <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.resolutionNotes}
                        onChange={(e) => onChange('resolutionNotes', e.target.value)}
                        className="w-full px-3 py-2 border border-green-300 rounded-md text-sm resize-none"
                        rows={3}
                        placeholder="How was this resolved?"
                        required
                      />

                      {/* Create Follow-up Task */}
                      <div className="mt-3 pt-3 border-t border-green-200">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.createFollowUpTask}
                            onChange={(e) => {
                              onChange('createFollowUpTask', e.target.checked);
                              if (e.target.checked) {
                                setShowTaskOptions(true);
                              } else {
                                setShowTaskOptions(false);
                              }
                            }}
                            className="mr-2 h-4 w-4 text-blue-600 rounded"
                          />
                          <span className="text-sm font-medium text-gray-700">Create follow-up task</span>
                        </label>

                        {/* Follow-up Task Options */}
                        {showTaskOptions && formData.createFollowUpTask && (
                          <div className="mt-3 space-y-3 pl-6">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Task Type <span className="text-red-500">*</span>
                              </label>
                              <select
                                value={formData.followUpTaskType}
                                onChange={(e) => onChange('followUpTaskType', e.target.value)}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs"
                              >
                                <option value="">Select task type</option>
                                <option value="verification">Verification - Check fix</option>
                                <option value="documentation">Documentation - Update procedures</option>
                                <option value="training">Training - Brief team</option>
                                <option value="permanent">Permanent Fix</option>
                                <option value="other">Other - Custom task</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Due Date <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="date"
                                value={formData.followUpTaskDueDate}
                                onChange={(e) => onChange('followUpTaskDueDate', e.target.value)}
                                className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-xs"
                                min={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Submit Hazard Report
                    </button>
                  </div>
                </form>
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

              {/* Behaviour Quick Report Modal - Now inside the device frame */}
              {showBehaviourModal && selectedBehaviour && (
                <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
                  <div className="bg-white w-full rounded-t-2xl p-6 animate-slide-up">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{BEHAVIOUR_ICONS[selectedBehaviour]}</span>
                        <div>
                          <h3 className="font-semibold">{selectedBehaviour.replace('-', ' ')}</h3>
                          <p className="text-sm text-gray-500">+{BEHAVIOUR_POINTS[selectedBehaviour]} points</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowBehaviourModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows={3}
                      placeholder="Quick observation..."
                    />
                    <button
                      onClick={() => handleBehaviourReport({ category: selectedBehaviour })}
                      className="w-full mt-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Submit Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          </DeviceFrameWrapper>
        </div>

        {/* Information Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-4">
              <span className="font-medium">Field Reporting Features:</span>
              <span>✓ Quick capture</span>
              <span>✓ Photo evidence</span>
              <span>✓ GPS location</span>
              <span>✓ Offline support</span>
            </div>
            <div className="text-xs text-gray-500">
              Optimized for mobile field workers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}