"use client";

import React, { useState } from 'react';

interface BodyPart {
  id: string;
  name: string;
  category: string;
  coordinates: { x: number; y: number; width: number; height: number };
  side?: 'left' | 'right' | 'center';
}

interface Injury {
  bodyPartId: string;
  severity: 'minor' | 'moderate' | 'severe' | 'critical';
  type: string;
}

interface BodyPartPickerProps {
  value?: Injury[];
  onChange: (injuries: Injury[]) => void;
  required?: boolean;
}

const BodyPartPicker: React.FC<BodyPartPickerProps> = ({ value = [], onChange }) => {
  const [selectedParts, setSelectedParts] = useState<Injury[]>(value);
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);
  const [showInjuryModal, setShowInjuryModal] = useState(false);

  // Body parts data with coordinates for clickable regions
  const bodyParts: BodyPart[] = [
    // Head region
    { id: 'head', name: 'Head', category: 'Head', coordinates: { x: 165, y: 20, width: 70, height: 60 }, side: 'center' },
    { id: 'face', name: 'Face', category: 'Head', coordinates: { x: 175, y: 45, width: 50, height: 40 }, side: 'center' },
    { id: 'neck', name: 'Neck', category: 'Head', coordinates: { x: 185, y: 85, width: 30, height: 20 }, side: 'center' },
    
    // Torso
    { id: 'chest', name: 'Chest', category: 'Trunk', coordinates: { x: 160, y: 105, width: 80, height: 60 }, side: 'center' },
    { id: 'abdomen', name: 'Abdomen', category: 'Trunk', coordinates: { x: 165, y: 165, width: 70, height: 50 }, side: 'center' },
    { id: 'pelvis', name: 'Pelvis', category: 'Trunk', coordinates: { x: 165, y: 215, width: 70, height: 30 }, side: 'center' },
    
    // Arms
    { id: 'shoulder-left', name: 'Left Shoulder', category: 'Upper Limb', coordinates: { x: 140, y: 105, width: 30, height: 30 }, side: 'left' },
    { id: 'shoulder-right', name: 'Right Shoulder', category: 'Upper Limb', coordinates: { x: 230, y: 105, width: 30, height: 30 }, side: 'right' },
    { id: 'upper-arm-left', name: 'Left Upper Arm', category: 'Upper Limb', coordinates: { x: 125, y: 135, width: 25, height: 50 }, side: 'left' },
    { id: 'upper-arm-right', name: 'Right Upper Arm', category: 'Upper Limb', coordinates: { x: 250, y: 135, width: 25, height: 50 }, side: 'right' },
    { id: 'elbow-left', name: 'Left Elbow', category: 'Upper Limb', coordinates: { x: 125, y: 185, width: 25, height: 20 }, side: 'left' },
    { id: 'elbow-right', name: 'Right Elbow', category: 'Upper Limb', coordinates: { x: 250, y: 185, width: 25, height: 20 }, side: 'right' },
    { id: 'forearm-left', name: 'Left Forearm', category: 'Upper Limb', coordinates: { x: 115, y: 205, width: 25, height: 40 }, side: 'left' },
    { id: 'forearm-right', name: 'Right Forearm', category: 'Upper Limb', coordinates: { x: 260, y: 205, width: 25, height: 40 }, side: 'right' },
    { id: 'hand-left', name: 'Left Hand', category: 'Upper Limb', coordinates: { x: 105, y: 245, width: 25, height: 30 }, side: 'left' },
    { id: 'hand-right', name: 'Right Hand', category: 'Upper Limb', coordinates: { x: 270, y: 245, width: 25, height: 30 }, side: 'right' },
    
    // Legs
    { id: 'hip-left', name: 'Left Hip', category: 'Lower Limb', coordinates: { x: 155, y: 240, width: 30, height: 30 }, side: 'left' },
    { id: 'hip-right', name: 'Right Hip', category: 'Lower Limb', coordinates: { x: 215, y: 240, width: 30, height: 30 }, side: 'right' },
    { id: 'thigh-left', name: 'Left Thigh', category: 'Lower Limb', coordinates: { x: 155, y: 270, width: 30, height: 60 }, side: 'left' },
    { id: 'thigh-right', name: 'Right Thigh', category: 'Lower Limb', coordinates: { x: 215, y: 270, width: 30, height: 60 }, side: 'right' },
    { id: 'knee-left', name: 'Left Knee', category: 'Lower Limb', coordinates: { x: 155, y: 330, width: 30, height: 25 }, side: 'left' },
    { id: 'knee-right', name: 'Right Knee', category: 'Lower Limb', coordinates: { x: 215, y: 330, width: 30, height: 25 }, side: 'right' },
    { id: 'lower-leg-left', name: 'Left Lower Leg', category: 'Lower Limb', coordinates: { x: 155, y: 355, width: 25, height: 50 }, side: 'left' },
    { id: 'lower-leg-right', name: 'Right Lower Leg', category: 'Lower Limb', coordinates: { x: 220, y: 355, width: 25, height: 50 }, side: 'right' },
    { id: 'ankle-left', name: 'Left Ankle', category: 'Lower Limb', coordinates: { x: 155, y: 405, width: 25, height: 20 }, side: 'left' },
    { id: 'ankle-right', name: 'Right Ankle', category: 'Lower Limb', coordinates: { x: 220, y: 405, width: 25, height: 20 }, side: 'right' },
    { id: 'foot-left', name: 'Left Foot', category: 'Lower Limb', coordinates: { x: 150, y: 425, width: 30, height: 25 }, side: 'left' },
    { id: 'foot-right', name: 'Right Foot', category: 'Lower Limb', coordinates: { x: 220, y: 425, width: 30, height: 25 }, side: 'right' },
  ];

  const injuryTypes = [
    'Cut/Laceration',
    'Bruise/Contusion',
    'Fracture',
    'Sprain/Strain',
    'Burn',
    'Dislocation',
    'Amputation',
    'Crush injury',
    'Puncture wound',
    'Abrasion',
    'Internal injury'
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#dc2626'; // red-600
      case 'severe': return '#ea580c'; // orange-600
      case 'moderate': return '#f59e0b'; // amber-600
      case 'minor': return '#84cc16'; // lime-600
      default: return '#6b7280'; // gray-500
    }
  };

  const handleBodyPartClick = (bodyPartId: string) => {
    setSelectedBodyPart(bodyPartId);
    setShowInjuryModal(true);
  };

  const handleInjurySubmit = (severity: string, type: string) => {
    if (selectedBodyPart) {
      const newInjury: Injury = {
        bodyPartId: selectedBodyPart,
        severity: severity as Injury['severity'],
        type
      };
      
      const updatedInjuries = [...selectedParts.filter(p => p.bodyPartId !== selectedBodyPart), newInjury];
      setSelectedParts(updatedInjuries);
      onChange(updatedInjuries);
    }
    setShowInjuryModal(false);
    setSelectedBodyPart(null);
  };

  const removeInjury = (bodyPartId: string) => {
    const updatedInjuries = selectedParts.filter(p => p.bodyPartId !== bodyPartId);
    setSelectedParts(updatedInjuries);
    onChange(updatedInjuries);
  };

  const getBodyPartById = (id: string) => bodyParts.find(bp => bp.id === id);

  return (
    <div className="body-part-picker">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <button
              type="button"
              onClick={() => setViewSide('front')}
              className={`px-4 py-2 rounded-md transition-all ${
                viewSide === 'front' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Front View
            </button>
            <button
              type="button"
              onClick={() => setViewSide('back')}
              className={`px-4 py-2 rounded-md transition-all ${
                viewSide === 'back' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Back View
            </button>
          </div>
        </div>

        {/* Body Diagram */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <svg width="400" height="480" viewBox="0 0 400 480" className="border border-gray-100 rounded-lg">
              {/* Human body outline - simplified representation */}
              <g fill="none" stroke="#e5e7eb" strokeWidth="2">
                {/* Head */}
                <ellipse cx="200" cy="50" rx="35" ry="40" fill="#f9fafb" />
                {/* Neck */}
                <rect x="185" y="85" width="30" height="20" fill="#f9fafb" />
                {/* Torso */}
                <rect x="160" y="105" width="80" height="140" rx="10" fill="#f9fafb" />
                {/* Arms */}
                <rect x="125" y="105" width="25" height="100" rx="12" fill="#f9fafb" transform="rotate(-10 137 155)" />
                <rect x="250" y="105" width="25" height="100" rx="12" fill="#f9fafb" transform="rotate(10 262 155)" />
                <rect x="105" y="195" width="25" height="80" rx="12" fill="#f9fafb" transform="rotate(-5 117 235)" />
                <rect x="270" y="195" width="25" height="80" rx="12" fill="#f9fafb" transform="rotate(5 282 235)" />
                {/* Legs */}
                <rect x="155" y="240" width="30" height="90" rx="15" fill="#f9fafb" />
                <rect x="215" y="240" width="30" height="90" rx="15" fill="#f9fafb" />
                <rect x="155" y="320" width="25" height="85" rx="12" fill="#f9fafb" />
                <rect x="220" y="320" width="25" height="85" rx="12" fill="#f9fafb" />
                {/* Feet */}
                <ellipse cx="165" cy="435" rx="20" ry="15" fill="#f9fafb" />
                <ellipse cx="235" cy="435" rx="20" ry="15" fill="#f9fafb" />
              </g>

              {/* Clickable regions with injury indicators */}
              {bodyParts.map((part) => {
                const injury = selectedParts.find(p => p.bodyPartId === part.id);
                const isInjured = !!injury;
                
                return (
                  <g key={part.id}>
                    <rect
                      x={part.coordinates.x}
                      y={part.coordinates.y}
                      width={part.coordinates.width}
                      height={part.coordinates.height}
                      fill={isInjured ? getSeverityColor(injury.severity) : 'transparent'}
                      fillOpacity={isInjured ? 0.3 : 0}
                      stroke={isInjured ? getSeverityColor(injury.severity) : 'transparent'}
                      strokeWidth={isInjured ? 2 : 0}
                      className="cursor-pointer hover:fill-blue-200 hover:fill-opacity-30 transition-all"
                      onClick={() => handleBodyPartClick(part.id)}
                    />
                    {isInjured && (
                      <circle
                        cx={part.coordinates.x + part.coordinates.width / 2}
                        cy={part.coordinates.y + part.coordinates.height / 2}
                        r="8"
                        fill={getSeverityColor(injury.severity)}
                        className="pointer-events-none"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected Injuries Summary */}
        {selectedParts.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Selected Injuries ({selectedParts.length})</h4>
            <div className="space-y-2">
              {selectedParts.map((injury) => {
                const bodyPart = getBodyPartById(injury.bodyPartId);
                return (
                  <div key={injury.bodyPartId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: getSeverityColor(injury.severity) }}
                      />
                      <div>
                        <span className="font-medium text-gray-900">{bodyPart?.name}</span>
                        <span className="text-gray-600 text-sm ml-2">- {injury.type}</span>
                        <span className="text-gray-500 text-xs ml-2">({injury.severity})</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeInjury(injury.bodyPartId)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Instructions:</strong> Click on body parts to mark injuries. You can select multiple areas and specify the type and severity of each injury.
          </p>
        </div>
      </div>

      {/* Injury Details Modal */}
      {showInjuryModal && selectedBodyPart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Injury Details - {getBodyPartById(selectedBodyPart)?.name}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Injury Type
                </label>
                <select
                  id="injury-type"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {injuryTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['minor', 'moderate', 'severe', 'critical'].map(severity => (
                    <button
                      key={severity}
                      type="button"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          const typeSelect = document.getElementById('injury-type') as HTMLSelectElement;
                          handleInjurySubmit(severity, typeSelect?.value || '');
                        }
                      }}
                      className={`p-3 rounded-lg border-2 font-medium capitalize transition-all hover:scale-105`}
                      style={{
                        borderColor: getSeverityColor(severity),
                        color: getSeverityColor(severity),
                        backgroundColor: `${getSeverityColor(severity)}10`
                      }}
                    >
                      {severity}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowInjuryModal(false);
                    setSelectedBodyPart(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BodyPartPicker;