'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { investigationService, type InvestigationData, type WhyLevel, type BarrierCategory, type Barrier } from '@/services/investigationService';

// Barrier Analysis Component
interface BarrierAnalysisSectionProps {
  investigation: InvestigationData;
  setInvestigation: React.Dispatch<React.SetStateAction<InvestigationData>>;
}

const BarrierAnalysisSection: React.FC<BarrierAnalysisSectionProps> = ({ investigation, setInvestigation }) => {
  // Initialize barrier categories if not already present
  const initializeBarrierCategories = () => {
    if (investigation.barrierCategories.length === 0) {
      const defaultCategories: BarrierCategory[] = [
        {
          id: 1,
          name: 'Physical',
          description: 'Physical barriers that prevent or contain hazards',
          barriers: []
        },
        {
          id: 2,
          name: 'Administrative',
          description: 'Procedures, training, and administrative controls',
          barriers: []
        },
        {
          id: 3,
          name: 'Human',
          description: 'Human actions and decisions',
          barriers: []
        },
        {
          id: 4,
          name: 'Management Systems',
          description: 'Management oversight and systems',
          barriers: []
        }
      ];

      setInvestigation(prev => ({
        ...prev,
        barrierCategories: defaultCategories
      }));
    }
  };

  React.useEffect(() => {
    initializeBarrierCategories();
  }, []);

  const addBarrier = (categoryId: number) => {
    const newBarrier: Barrier = {
      id: Date.now(),
      categoryId,
      description: '',
      expectedFunction: '',
      status: 'Present',
      failureMode: '',
      failureReason: '',
      evidence: [],
      effectivenessRating: 3,
      recommendations: [],
      witnesses: [],
      attachments: []
    };

    setInvestigation(prev => ({
      ...prev,
      barrierCategories: prev.barrierCategories.map(category =>
        category.id === categoryId
          ? { ...category, barriers: [...category.barriers, newBarrier] }
          : category
      )
    }));
  };

  const updateBarrier = (categoryId: number, barrierId: number, field: keyof Barrier, value: any) => {
    setInvestigation(prev => ({
      ...prev,
      barrierCategories: prev.barrierCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              barriers: category.barriers.map(barrier =>
                barrier.id === barrierId
                  ? { ...barrier, [field]: value }
                  : barrier
              )
            }
          : category
      )
    }));
  };

  const removeBarrier = (categoryId: number, barrierId: number) => {
    setInvestigation(prev => ({
      ...prev,
      barrierCategories: prev.barrierCategories.map(category =>
        category.id === categoryId
          ? { ...category, barriers: category.barriers.filter(barrier => barrier.id !== barrierId) }
          : category
      )
    }));
  };

  const handleAttachmentUpload = (categoryId: number, barrierId: number, files: FileList | null) => {
    if (!files) return;

    const newAttachments = Array.from(files);
    updateBarrier(categoryId, barrierId, 'attachments', [
      ...investigation.barrierCategories
        .find(cat => cat.id === categoryId)?.barriers
        .find(bar => bar.id === barrierId)?.attachments || [],
      ...newAttachments
    ]);
  };

  const removeAttachment = (categoryId: number, barrierId: number, attachmentIndex: number) => {
    const barrier = investigation.barrierCategories
      .find(cat => cat.id === categoryId)?.barriers
      .find(bar => bar.id === barrierId);

    if (barrier) {
      const updatedAttachments = barrier.attachments.filter((_, index) => index !== attachmentIndex);
      updateBarrier(categoryId, barrierId, 'attachments', updatedAttachments);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Barrier Analysis Method</h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>Analyze each type of barrier to identify what failed, was absent, or was inadequate in preventing this incident.</p>
            </div>
          </div>
        </div>
      </div>

      {investigation.barrierCategories.map(category => (
        <div key={category.id} className="border border-gray-200 rounded-lg">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">{category.name} Barriers</h4>
                <p className="text-sm text-gray-600 mt-1">{category.description}</p>
              </div>
              <button
                onClick={() => addBarrier(category.id)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Barrier
              </button>
            </div>
          </div>

          <div className="p-6">
            {category.barriers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p className="mt-2">No barriers added yet. Click "Add Barrier" to start analyzing {category.name.toLowerCase()} barriers.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {category.barriers.map(barrier => (
                  <div key={barrier.id} className="border border-gray-200 rounded-lg p-6 bg-white">
                    <div className="flex justify-between items-start mb-4">
                      <h5 className="text-md font-medium text-gray-900">Barrier {barrier.id}</h5>
                      <button
                        onClick={() => removeBarrier(category.id, barrier.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Remove this barrier"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Barrier Description</label>
                          <textarea
                            value={barrier.description}
                            onChange={(e) => updateBarrier(category.id, barrier.id, 'description', e.target.value)}
                            rows={3}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe this specific barrier..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Expected Function</label>
                          <textarea
                            value={barrier.expectedFunction}
                            onChange={(e) => updateBarrier(category.id, barrier.id, 'expectedFunction', e.target.value)}
                            rows={2}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="What was this barrier supposed to do?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Barrier Status</label>
                          <select
                            value={barrier.status}
                            onChange={(e) => updateBarrier(category.id, barrier.id, 'status', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="Present">Present (functioned correctly)</option>
                            <option value="Failed">Failed (was there but didn't work)</option>
                            <option value="Inadequate">Inadequate (insufficient)</option>
                            <option value="Absent">Absent (should have been there)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Effectiveness Rating</label>
                          <select
                            value={barrier.effectivenessRating}
                            onChange={(e) => updateBarrier(category.id, barrier.id, 'effectivenessRating', Number(e.target.value))}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value={1}>1 - Very Poor</option>
                            <option value={2}>2 - Poor</option>
                            <option value={3}>3 - Adequate</option>
                            <option value={4}>4 - Good</option>
                            <option value={5}>5 - Excellent</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Failure Mode</label>
                          <textarea
                            value={barrier.failureMode}
                            onChange={(e) => updateBarrier(category.id, barrier.id, 'failureMode', e.target.value)}
                            rows={2}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="How did this barrier fail?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Failure Reason</label>
                          <textarea
                            value={barrier.failureReason}
                            onChange={(e) => updateBarrier(category.id, barrier.id, 'failureReason', e.target.value)}
                            rows={3}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Why did this barrier fail or not exist?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Witnesses</label>
                          <input
                            type="text"
                            value={barrier.witnesses.join(', ')}
                            onChange={(e) => updateBarrier(category.id, barrier.id, 'witnesses',
                              e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter witness names, separated by commas"
                          />
                        </div>

                        {/* Evidence Attachments Section */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Evidence Attachments</label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                            <div className="text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <div className="mt-4">
                                <label htmlFor={`file-upload-${category.id}-${barrier.id}`} className="cursor-pointer">
                                  <span className="mt-2 block text-sm font-medium text-gray-900">
                                    Upload evidence files
                                  </span>
                                  <span className="mt-1 block text-xs text-gray-500">
                                    PNG, JPG, PDF up to 10MB each
                                  </span>
                                  <input
                                    id={`file-upload-${category.id}-${barrier.id}`}
                                    name={`file-upload-${category.id}-${barrier.id}`}
                                    type="file"
                                    className="sr-only"
                                    multiple
                                    accept=".png,.jpg,.jpeg,.pdf,.doc,.docx"
                                    onChange={(e) => handleAttachmentUpload(category.id, barrier.id, e.target.files)}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>

                          {/* Display uploaded attachments */}
                          {barrier.attachments.length > 0 && (
                            <div className="mt-4">
                              <h6 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files ({barrier.attachments.length})</h6>
                              <div className="space-y-2">
                                {barrier.attachments.map((file, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                                    <div className="flex items-center space-x-3">
                                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                      </svg>
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                        <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => removeAttachment(category.id, barrier.id, index)}
                                      className="text-red-600 hover:text-red-800"
                                      title="Remove attachment"
                                    >
                                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                      </svg>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Mock incident data structure (matches recent incidents table)
const mockIncidentData = {
  'INC-2025-089': {
    id: 'INC-2025-089',
    reference: 'INC-2025-089',
    caseNumber: 'INC-2025-089',
    status: 'Open',
    severity: 'Medium',
    personReporting: 'Sarah Mitchell',
    personAffected: 'N/A',
    summary: 'Near miss - crane load swing detected early by safety systems',
    location: 'Construction Yard',
    dateTime: '2025-09-25T14:45:00',
    incidentType: 'Near Miss',
    typeName: 'Near Miss',
    incidentDate: '2025-09-25T14:45:00',
    description: 'Crane load began to swing unexpectedly during lifting operation. Safety systems detected the movement and automatically stopped the operation. No injury occurred but could have been serious.',
    reporterName: 'Sarah Mitchell',
    reportedDate: '2025-09-25T14:45:00'
  },
  'INC-2025-088': {
    id: 'INC-2025-088',
    reference: 'INC-2025-088',
    caseNumber: 'INC-2025-088',
    status: 'In Progress',
    severity: 'Low',
    personReporting: 'Michael Thompson',
    personAffected: 'Michael Thompson',
    summary: 'Minor first aid - small cut while handling packaging materials',
    location: 'Packaging Department',
    dateTime: '2025-09-24T11:20:00',
    incidentType: 'Accident Book',
    typeName: 'Accident Book',
    incidentDate: '2025-09-24T11:20:00',
    description: 'Employee sustained a small cut on finger while handling packaging materials. First aid was administered immediately and employee returned to work.',
    reporterName: 'Michael Thompson',
    reportedDate: '2025-09-24T11:20:00'
  },
  'INC-2025-087': {
    id: 'INC-2025-087',
    reference: 'INC-2025-087',
    caseNumber: 'INC-2025-087',
    status: 'Under Investigation',
    severity: 'High',
    personReporting: 'Emma Watson',
    personAffected: 'David Chang',
    summary: 'Chemical exposure - employee felt nauseous after ventilation system failure',
    location: 'Laboratory 2',
    dateTime: '2025-09-23T16:15:00',
    incidentType: 'Dangerous Occurrence',
    typeName: 'Dangerous Occurrence',
    incidentDate: '2025-09-23T16:15:00',
    description: 'Ventilation system failure led to chemical vapor buildup. Employee experienced nausea and was immediately removed from area. Full investigation underway.',
    reporterName: 'Emma Watson',
    reportedDate: '2025-09-23T16:15:00'
  },
  'INC-2025-086': {
    id: 'INC-2025-086',
    reference: 'INC-2025-086',
    caseNumber: 'INC-2025-086',
    status: 'Closed',
    severity: 'Medium',
    personReporting: 'James Rodriguez',
    personAffected: 'Lisa Parker',
    summary: 'Slip on wet floor in canteen - no injury, safety mats installed',
    location: 'Staff Canteen',
    dateTime: '2025-09-22T12:30:00',
    incidentType: 'Accident Report',
    typeName: 'Accident Report',
    incidentDate: '2025-09-22T12:30:00',
    description: 'Employee slipped on wet floor in canteen area but managed to regain balance without injury. Non-slip mats have been installed as preventive measure.',
    reporterName: 'James Rodriguez',
    reportedDate: '2025-09-22T12:30:00'
  },
  'INC-2025-085': {
    id: 'INC-2025-085',
    reference: 'INC-2025-085',
    caseNumber: 'INC-2025-085',
    status: 'In Progress',
    severity: 'Low',
    personReporting: 'Alex Johnson',
    personAffected: 'N/A',
    summary: 'Near miss - pedestrian walkway blocked by delivery truck',
    location: 'Loading Dock A',
    dateTime: '2025-09-21T08:45:00',
    incidentType: 'Near Miss',
    typeName: 'Near Miss',
    incidentDate: '2025-09-21T08:45:00',
    description: 'Delivery truck blocked pedestrian walkway forcing workers to walk around vehicle in unsafe manner. Driver was reminded of parking procedures.',
    reporterName: 'Alex Johnson',
    reportedDate: '2025-09-21T08:45:00'
  },
  'INC-2025-084': {
    id: 'INC-2025-084',
    reference: 'INC-2025-084',
    caseNumber: 'INC-2025-084',
    status: 'Open',
    severity: 'Medium',
    personReporting: 'Rachel Green',
    personAffected: 'Mark Stevens',
    summary: 'Eye irritation from dust - improved ventilation recommended',
    location: 'Grinding Workshop',
    dateTime: '2025-09-20T15:10:00',
    incidentType: 'Accident Report',
    typeName: 'Accident Report',
    incidentDate: '2025-09-20T15:10:00',
    description: 'Worker experienced eye irritation from dust particles during grinding operation. Eye wash used immediately. Ventilation system upgrade recommended.',
    reporterName: 'Rachel Green',
    reportedDate: '2025-09-20T15:10:00'
  },
  'INC-2025-083': {
    id: 'INC-2025-083',
    reference: 'INC-2025-083',
    caseNumber: 'INC-2025-083',
    status: 'Closed',
    severity: 'Low',
    personReporting: 'Peter Wilson',
    personAffected: 'N/A',
    summary: 'Near miss - unsecured scaffolding noticed during inspection',
    location: 'Maintenance Area',
    dateTime: '2025-09-19T10:30:00',
    incidentType: 'Near Miss',
    typeName: 'Near Miss',
    incidentDate: '2025-09-19T10:30:00',
    description: 'Routine inspection revealed unsecured scaffolding that could have collapsed. Scaffolding was immediately secured and inspection procedures reviewed.',
    reporterName: 'Peter Wilson',
    reportedDate: '2025-09-19T10:30:00'
  },
  'INC-2025-082': {
    id: 'INC-2025-082',
    reference: 'INC-2025-082',
    caseNumber: 'INC-2025-082',
    status: 'Under Investigation',
    severity: 'Critical',
    personReporting: 'Sophie Davis',
    personAffected: 'Multiple',
    summary: 'Fire alarm malfunction during evacuation drill - system fault identified',
    location: 'Building A',
    dateTime: '2025-09-18T14:00:00',
    incidentType: 'Dangerous Occurrence',
    typeName: 'Dangerous Occurrence',
    incidentDate: '2025-09-18T14:00:00',
    description: 'Fire alarm system failed to operate correctly during scheduled evacuation drill. Multiple zones affected. Full system inspection and testing underway.',
    reporterName: 'Sophie Davis',
    reportedDate: '2025-09-18T14:00:00'
  },
  'INC-2025-081': {
    id: 'INC-2025-081',
    reference: 'INC-2025-081',
    caseNumber: 'INC-2025-081',
    status: 'Closed',
    severity: 'Low',
    personReporting: 'Kevin Brown',
    personAffected: 'Kevin Brown',
    summary: 'Bruised knee from trip over extension cord - cord management improved',
    location: 'Office Floor 2',
    dateTime: '2025-09-17T09:25:00',
    incidentType: 'Accident Report',
    typeName: 'Accident Report',
    incidentDate: '2025-09-17T09:25:00',
    description: 'Employee tripped over extension cord in walkway resulting in bruised knee. First aid provided and cord management system implemented.',
    reporterName: 'Kevin Brown',
    reportedDate: '2025-09-17T09:25:00'
  },
  'INC-2025-080': {
    id: 'INC-2025-080',
    reference: 'INC-2025-080',
    caseNumber: 'INC-2025-080',
    status: 'In Progress',
    severity: 'Medium',
    personReporting: 'Anna Taylor',
    personAffected: 'N/A',
    summary: 'Near miss - forklift safety sensor prevented collision with worker',
    location: 'Warehouse C',
    dateTime: '2025-09-16T13:40:00',
    incidentType: 'Near Miss',
    typeName: 'Near Miss',
    incidentDate: '2025-09-16T13:40:00',
    description: 'Forklift safety sensor automatically stopped vehicle when worker entered danger zone. System worked as designed but highlights need for increased awareness.',
    reporterName: 'Anna Taylor',
    reportedDate: '2025-09-16T13:40:00'
  },
  'INC-2025-079': {
    id: 'INC-2025-079',
    reference: 'INC-2025-079',
    caseNumber: 'INC-2025-079',
    status: 'Open',
    severity: 'High',
    personReporting: 'Chris Martinez',
    personAffected: 'Jennifer Lee',
    summary: 'Equipment malfunction - press machine emergency stop activated',
    location: 'Production Line 3',
    dateTime: '2025-09-15T07:15:00',
    incidentType: 'Dangerous Occurrence',
    typeName: 'Dangerous Occurrence',
    incidentDate: '2025-09-15T07:15:00',
    description: 'Press machine began operating erratically. Emergency stop was immediately activated by operator. Machine is out of service pending full inspection.',
    reporterName: 'Chris Martinez',
    reportedDate: '2025-09-15T07:15:00'
  },
  'INC-2025-078': {
    id: 'INC-2025-078',
    reference: 'INC-2025-078',
    caseNumber: 'INC-2025-078',
    status: 'Closed',
    severity: 'Low',
    personReporting: 'Maria Garcia',
    personAffected: 'N/A',
    summary: 'Near miss - loose handrail discovered during routine inspection',
    location: 'Stairwell B',
    dateTime: '2025-09-14T11:50:00',
    incidentType: 'Near Miss',
    typeName: 'Near Miss',
    incidentDate: '2025-09-14T11:50:00',
    description: 'Routine inspection revealed loose handrail on stairwell. Handrail was immediately secured and all other handrails checked as precaution.',
    reporterName: 'Maria Garcia',
    reportedDate: '2025-09-14T11:50:00'
  },
  'INC-2025-077': {
    id: 'INC-2025-077',
    reference: 'INC-2025-077',
    caseNumber: 'INC-2025-077',
    status: 'Under Investigation',
    severity: 'Medium',
    personReporting: 'Robert Kim',
    personAffected: 'Susan White',
    summary: 'Allergic reaction to new cleaning chemical - product being reviewed',
    location: 'Cleaning Storage',
    dateTime: '2025-09-13T16:20:00',
    incidentType: 'Accident Report',
    typeName: 'Accident Report',
    incidentDate: '2025-09-13T16:20:00',
    description: 'Employee experienced allergic reaction to new cleaning product. Medical attention provided immediately. Product safety data being reviewed.',
    reporterName: 'Robert Kim',
    reportedDate: '2025-09-13T16:20:00'
  },
  'INC-2025-076': {
    id: 'INC-2025-076',
    reference: 'INC-2025-076',
    caseNumber: 'INC-2025-076',
    status: 'Closed',
    severity: 'Low',
    personReporting: 'Daniel Moore',
    personAffected: 'Daniel Moore',
    summary: 'Paper cut while handling documents - first aid applied',
    location: 'Administration Office',
    dateTime: '2025-09-12T14:35:00',
    incidentType: 'Accident Book',
    typeName: 'Accident Book',
    incidentDate: '2025-09-12T14:35:00',
    description: 'Minor paper cut sustained while handling documents. Basic first aid was applied and employee continued with normal duties.',
    reporterName: 'Daniel Moore',
    reportedDate: '2025-09-12T14:35:00'
  },
  'INC-2025-075': {
    id: 'INC-2025-075',
    reference: 'INC-2025-075',
    caseNumber: 'INC-2025-075',
    status: 'In Progress',
    severity: 'Medium',
    personReporting: 'Laura Johnson',
    personAffected: 'N/A',
    summary: 'Near miss - vehicle reversed into loading area without spotter',
    location: 'Loading Bay 2',
    dateTime: '2025-09-11T08:10:00',
    incidentType: 'Near Miss',
    typeName: 'Near Miss',
    incidentDate: '2025-09-11T08:10:00',
    description: 'Delivery vehicle reversed into loading area without designated spotter present. No collision occurred but procedure was not followed correctly.',
    reporterName: 'Laura Johnson',
    reportedDate: '2025-09-11T08:10:00'
  }
};

export default function IncidentInvestigatePage() {
  const params = useParams();
  const router = useRouter();
  const incidentId = params.id as string;

  const [investigation, setInvestigation] = useState<InvestigationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('setup');

  const generateProblemStatement = (incidentData: any): string => {
    const parts = [];

    if (incidentData.incidentType) {
      parts.push(`${incidentData.incidentType} incident`);
    }

    if (incidentData.incidentDate) {
      parts.push(`occurred on ${new Date(incidentData.incidentDate).toLocaleDateString()}`);
    }

    if (incidentData.location) {
      parts.push(`at ${incidentData.location}`);
    }

    if (incidentData.summary) {
      parts.push(`involving ${incidentData.summary.toLowerCase()}`);
    }

    if (incidentData.severity) {
      parts.push(`(Severity: ${incidentData.severity})`);
    }

    return parts.length > 0
      ? parts.join(' ').charAt(0).toUpperCase() + parts.join(' ').slice(1) + '.'
      : 'Investigation required to determine root cause of reported incident.';
  };

  const initializeInvestigation = async () => {
    try {
      setLoading(true);

      // Debug logging
      console.log('Initializing investigation for incident ID:', incidentId);
      console.log('Available incident IDs:', Object.keys(mockIncidentData));

      // Get incident data
      const incidentData = mockIncidentData[incidentId as keyof typeof mockIncidentData];

      console.log('Found incident data:', incidentData);

      if (!incidentData) {
        console.error('Incident not found in mock data');
        throw new Error(`Incident not found: ${incidentId}`);
      }

      // Create investigation with auto-populated data
      const investigationData: InvestigationData = {
        incidentCaseId: incidentId,
        investigationTeam: [],
        problemStatement: generateProblemStatement(incidentData),
        timeline: {
          start: new Date(),
          target: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
        },
        targetCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        stakeholders: [
          incidentData.personReporting + ' (Reporter)',
          incidentData.personAffected !== 'N/A' ? incidentData.personAffected + ' (Affected)' : ''
        ].filter(Boolean),
        investigationType: '5-whys',
        barrierCategories: [],
        whyLevels: Array.from({ length: 5 }, (_, i) => ({
          id: i + 1,
          question: `Why did this happen? (Level ${i + 1})`,
          answer: '',
          evidence: [],
          confidenceLevel: 1,
          witnesses: [],
          attachments: []
        })),
        qualityScore: 0,
        status: 'draft',
        prePopulatedData: {
          incidentDate: incidentData.incidentDate,
          incidentTime: new Date(incidentData.dateTime).toLocaleTimeString('en-GB', { hour12: false }),
          location: incidentData.location,
          description: incidentData.description,
          peopleInvolved: [incidentData.personReporting, incidentData.personAffected].filter(p => p !== 'N/A'),
          severity: incidentData.severity,
          incidentType: incidentData.incidentType,
          originalReporter: incidentData.personReporting,
          reportedDate: incidentData.reportedDate,
          caseNumber: incidentData.caseNumber
        },
        dataSource: 'incident'
      };

      setInvestigation(investigationData);
    } catch (error) {
      console.error('Failed to initialize investigation:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to load incident data for investigation: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (incidentId) {
      initializeInvestigation();
    } else {
      console.error('No incident ID provided');
      setLoading(false);
    }
  }, [incidentId]);


  const handleSave = async () => {
    if (!investigation) return;

    try {
      setSaving(true);
      // In a real implementation, this would save to the backend
      console.log('Saving investigation:', investigation);
      alert('Investigation saved successfully');
    } catch (error) {
      console.error('Failed to save investigation:', error);
      alert('Failed to save investigation');
    } finally {
      setSaving(false);
    }
  };

  const updateWhyLevel = (levelId: number, field: keyof WhyLevel, value: any) => {
    if (!investigation) return;

    setInvestigation(prev => {
      if (!prev) return prev;

      const updatedWhyLevels = prev.whyLevels.map(level =>
        level.id === levelId ? { ...level, [field]: value } : level
      );

      return {
        ...prev,
        whyLevels: updatedWhyLevels,
        qualityScore: investigationService.calculateQualityScore({ ...prev, whyLevels: updatedWhyLevels })
      };
    });
  };

  const updateInvestigationField = (field: keyof InvestigationData, value: any) => {
    if (!investigation) return;

    setInvestigation(prev => {
      if (!prev) return prev;

      const updated = { ...prev, [field]: value };
      return {
        ...updated,
        qualityScore: investigationService.calculateQualityScore(updated)
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading investigation...</p>
        </div>
      </div>
    );
  }

  if (!investigation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Investigation Not Found</h1>
          <p className="text-gray-600 mb-6">Unable to load incident data for investigation.</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const qualityGrade = investigationService.getQualityGrade(investigation.qualityScore);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Investigation: {investigation.prePopulatedData?.caseNumber}
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  {investigation.prePopulatedData?.incidentType} • {investigation.prePopulatedData?.location}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Quality Score */}
              <div className="text-right">
                <div className="text-sm text-gray-500">Quality Score</div>
                <div className={`text-lg font-bold ${qualityGrade.color}`}>
                  {investigation.qualityScore}% ({qualityGrade.grade})
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Investigation'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {[
              { id: 'setup', name: 'Setup & Team' },
              { id: 'analysis', name: investigation.investigationType === '5-whys' ? '5 Whys Analysis' : 'Barrier Analysis' },
              { id: 'actions', name: 'Actions & Recommendations' },
              { id: 'summary', name: 'Summary & Approval' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'setup' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pre-populated Incident Data */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                  Auto-populated
                </span>
                Incident Information
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Incident Reference</label>
                  <div className="mt-1 p-2 bg-gray-50 rounded-md text-sm text-gray-900">
                    {investigation.prePopulatedData?.caseNumber}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <div className="mt-1 p-2 bg-gray-50 rounded-md text-sm text-gray-900">
                      {investigation.prePopulatedData?.incidentDate ?
                        new Date(investigation.prePopulatedData.incidentDate).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <div className="mt-1 p-2 bg-gray-50 rounded-md text-sm text-gray-900">
                      {investigation.prePopulatedData?.incidentTime || 'N/A'}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <div className="mt-1 p-2 bg-gray-50 rounded-md text-sm text-gray-900">
                    {investigation.prePopulatedData?.location}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Severity</label>
                  <div className="mt-1">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      investigation.prePopulatedData?.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      investigation.prePopulatedData?.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                      investigation.prePopulatedData?.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {investigation.prePopulatedData?.severity}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <div className="mt-1 p-2 bg-gray-50 rounded-md text-sm text-gray-900">
                    {investigation.prePopulatedData?.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Investigation Setup */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Investigation Setup</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Problem Statement</label>
                  <textarea
                    value={investigation.problemStatement}
                    onChange={(e) => updateInvestigationField('problemStatement', e.target.value)}
                    rows={3}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Describe the problem to be investigated..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Investigation Team</label>
                  <textarea
                    value={investigation.investigationTeam.join(', ')}
                    onChange={(e) => updateInvestigationField('investigationTeam',
                      e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    rows={2}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter team member names, separated by commas..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Target Completion Date</label>
                  <input
                    type="date"
                    value={investigation.targetCompletionDate.toISOString().split('T')[0]}
                    onChange={(e) => updateInvestigationField('targetCompletionDate', new Date(e.target.value))}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Stakeholders</label>
                  <textarea
                    value={investigation.stakeholders.join(', ')}
                    onChange={(e) => updateInvestigationField('stakeholders',
                      e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                    rows={2}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter stakeholder names and roles..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Investigation Methodology</label>
                  <select
                    value={investigation.investigationType}
                    onChange={(e) => updateInvestigationField('investigationType', e.target.value as '5-whys' | 'barrier-analysis')}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="5-whys">5 Whys Root Cause Analysis</option>
                    <option value="barrier-analysis">Barrier Analysis</option>
                  </select>
                  <p className="mt-1 text-sm text-gray-600">
                    {investigation.investigationType === '5-whys'
                      ? 'Progressive questioning to identify root causes through multiple "why" questions'
                      : 'Systematic analysis of safety barriers that failed, were absent, or were inadequate'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {investigation.investigationType === '5-whys' ? '5 Whys Root Cause Analysis' : 'Barrier Analysis Investigation'}
            </h3>

            {investigation.investigationType === '5-whys' ? (
              <div className="space-y-6">
                {investigation.whyLevels.map((whyLevel, index) => (
                  <div key={whyLevel.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 font-semibold rounded-full mr-3">
                        {whyLevel.id}
                      </div>
                      <h4 className="text-lg font-medium text-gray-900">
                        {index === 0 ? 'Why did this incident occur?' : `Why ${whyLevel.id}?`}
                      </h4>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Answer</label>
                        <textarea
                          value={whyLevel.answer}
                          onChange={(e) => updateWhyLevel(whyLevel.id, 'answer', e.target.value)}
                          rows={3}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Provide a detailed answer to this question..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Confidence Level</label>
                          <select
                            value={whyLevel.confidenceLevel}
                            onChange={(e) => updateWhyLevel(whyLevel.id, 'confidenceLevel', Number(e.target.value))}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value={1}>1 - Very Low</option>
                            <option value={2}>2 - Low</option>
                            <option value={3}>3 - Medium</option>
                            <option value={4}>4 - High</option>
                            <option value={5}>5 - Very High</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Witnesses</label>
                          <input
                            type="text"
                            value={whyLevel.witnesses.join(', ')}
                            onChange={(e) => updateWhyLevel(whyLevel.id, 'witnesses',
                              e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter witness names, separated by commas"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <BarrierAnalysisSection
                investigation={investigation}
                setInvestigation={setInvestigation}
              />
            )}
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Actions & Recommendations</h3>
            <p className="text-gray-600">Actions and recommendations will be implemented here based on the investigation findings.</p>
          </div>
        )}

        {activeTab === 'summary' && (
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Investigation Summary</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Investigation Status</label>
                <select
                  value={investigation.status}
                  onChange={(e) => updateInvestigationField('status', e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="review">Under Review</option>
                  <option value="approved">Approved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Quality Assessment</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{qualityGrade.description}</span>
                  <span className={`text-lg font-bold ${qualityGrade.color}`}>
                    {investigation.qualityScore}% ({qualityGrade.grade})
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}