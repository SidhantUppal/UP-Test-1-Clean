"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface DetailedBodyPart {
  id: string;
  name: string;
  code: string; // Maps to the 1-22 values
}

interface BodyPartRegion {
  id: string;
  name: string;
  parts: DetailedBodyPart[];
  x: number;
  y: number;
  radius: number;
}

interface AccidentBookBodyPartPickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedParts: string[];
  onSave: (selectedParts: string[]) => void;
}

const AccidentBookBodyPartPicker: React.FC<AccidentBookBodyPartPickerProps> = ({
  isOpen,
  onClose,
  selectedParts,
  onSave
}) => {
  const { currentTheme } = useTheme();
  const primaryColor = currentTheme?.colors?.primary || '#3d3a72';
  const [currentView, setCurrentView] = useState<'front' | 'back'>('back');
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedBodyParts, setSelectedBodyParts] = useState<string[]>(selectedParts);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detailed body part regions with specific parts
  const bodyPartRegions: Record<'front' | 'back', BodyPartRegion[]> = {
    front: [
      {
        id: 'head',
        name: 'Head',
        parts: [
          { id: 'scalp', name: 'Scalp', code: '4' },
          { id: 'forehead', name: 'Forehead', code: '3' },
          { id: 'temple-left', name: 'Temple (left)', code: '3' },
          { id: 'temple-right', name: 'Temple (right)', code: '3' },
          { id: 'ear-left', name: 'Ear (left)', code: '2' },
          { id: 'ear-right', name: 'Ear (right)', code: '2' },
          { id: 'eye-left', name: 'Eye (left)', code: '1' },
          { id: 'eye-right', name: 'Eye (right)', code: '1' },
          { id: 'nose', name: 'Nose', code: '3' },
          { id: 'mouth', name: 'Mouth', code: '3' },
          { id: 'neck', name: 'Neck', code: '6' },
          { id: 'face', name: 'Face', code: '3' }
        ],
        x: 149.8,
        y: 71,
        radius: 18.7
      },
      {
        id: 'rightShoulder',
        name: 'Right Shoulder',
        parts: [
          { id: 'shoulder-right', name: 'Shoulder (right)', code: '13' },
          { id: 'upper-arm-right', name: 'Upper Arm (right)', code: '13' }
        ],
        x: 90.9,
        y: 130,
        radius: 18.7
      },
      {
        id: 'leftShoulder',
        name: 'Left Shoulder',
        parts: [
          { id: 'shoulder-left', name: 'Shoulder (left)', code: '13' },
          { id: 'upper-arm-left', name: 'Upper Arm (left)', code: '13' }
        ],
        x: 168.9,
        y: 130,
        radius: 18.7
      },
      {
        id: 'torso',
        name: 'Torso',
        parts: [
          { id: 'collarbone-left', name: 'Collarbone (left)', code: '8' },
          { id: 'collarbone-right', name: 'Collarbone (right)', code: '8' },
          { id: 'pectoral-left', name: 'Pectoral (left)', code: '8' },
          { id: 'pectoral-right', name: 'Pectoral (right)', code: '8' },
          { id: 'chest', name: 'Chest', code: '8' },
          { id: 'rib-left', name: 'Rib (left)', code: '8' },
          { id: 'rib-right', name: 'Rib (right)', code: '8' },
          { id: 'abdomen', name: 'Abdomen', code: '8' },
          { id: 'internal-organs', name: 'Internal Organs', code: '8' }
        ],
        x: 129.9,
        y: 166.5,
        radius: 18.7
      },
      {
        id: 'rightArm',
        name: 'Right Arm',
        parts: [
          { id: 'lower-arm-right', name: 'Lower Arm (right)', code: '13' }
        ],
        x: 69.2,
        y: 206.2,
        radius: 18.7
      },
      {
        id: 'leftArm',
        name: 'Left Arm',
        parts: [
          { id: 'lower-arm-left', name: 'Lower Arm (left)', code: '13' }
        ],
        x: 191.9,
        y: 206.2,
        radius: 18.7
      },
      {
        id: 'rightHand',
        name: 'Right Hand',
        parts: [
          { id: 'hand-right', name: 'Hand (right)', code: '11' },
          { id: 'wrist-right', name: 'Wrist (right)', code: '12' },
          { id: 'thumb-right', name: 'Thumb (right)', code: '10' },
          { id: 'index-finger-right', name: 'Index Finger (right)', code: '10' },
          { id: 'middle-finger-right', name: 'Middle Finger (right)', code: '10' },
          { id: 'ring-finger-right', name: 'Ring Finger (right)', code: '10' },
          { id: 'little-finger-right', name: 'Little Finger (right)', code: '10' }
        ],
        x: 44.4,
        y: 257,
        radius: 18.7
      },
      {
        id: 'leftHand',
        name: 'Left Hand',
        parts: [
          { id: 'hand-left', name: 'Hand (left)', code: '11' },
          { id: 'wrist-left', name: 'Wrist (left)', code: '12' },
          { id: 'thumb-left', name: 'Thumb (left)', code: '10' },
          { id: 'index-finger-left', name: 'Index Finger (left)', code: '10' },
          { id: 'middle-finger-left', name: 'Middle Finger (left)', code: '10' },
          { id: 'ring-finger-left', name: 'Ring Finger (left)', code: '10' },
          { id: 'little-finger-left', name: 'Little Finger (left)', code: '10' }
        ],
        x: 215.1,
        y: 257,
        radius: 18.7
      },
      {
        id: 'pelvicRegion',
        name: 'Pelvic Region',
        parts: [
          { id: 'pelvis', name: 'Pelvis', code: '8' },
          { id: 'groin', name: 'Groin', code: '8' }
        ],
        x: 129.9,
        y: 247,
        radius: 18.7
      },
      {
        id: 'rightHip',
        name: 'Right Hip',
        parts: [
          { id: 'hip-right', name: 'Hip (right)', code: '18' }
        ],
        x: 90.9,
        y: 257,
        radius: 18.7
      },
      {
        id: 'leftHip',
        name: 'Left Hip',
        parts: [
          { id: 'hip-left', name: 'Hip (left)', code: '18' }
        ],
        x: 168.9,
        y: 257,
        radius: 18.7
      },
      {
        id: 'rightLeg',
        name: 'Right Leg',
        parts: [
          { id: 'upper-leg-right', name: 'Upper Leg (right)', code: '18' },
          { id: 'knee-right', name: 'Knee (right)', code: '18' },
          { id: 'lower-leg-right', name: 'Lower Leg (right)', code: '18' }
        ],
        x: 99.5,
        y: 329.5,
        radius: 18.7
      },
      {
        id: 'leftLeg',
        name: 'Left Leg',
        parts: [
          { id: 'upper-leg-left', name: 'Upper Leg (left)', code: '18' },
          { id: 'knee-left', name: 'Knee (left)', code: '18' },
          { id: 'lower-leg-left', name: 'Lower Leg (left)', code: '18' }
        ],
        x: 160.6,
        y: 329.5,
        radius: 18.7
      },
      {
        id: 'rightFoot',
        name: 'Right Foot',
        parts: [
          { id: 'ankle-right', name: 'Ankle (right)', code: '17' },
          { id: 'foot-top-right', name: 'Foot top (right)', code: '16' },
          { id: 'foot-instep-right', name: 'Foot instep (right)', code: '16' },
          { id: 'toe-right', name: 'Toe (right)', code: '15' }
        ],
        x: 108.1,
        y: 474.1,
        radius: 18.7
      },
      {
        id: 'leftFoot',
        name: 'Left Foot',
        parts: [
          { id: 'ankle-left', name: 'Ankle (left)', code: '17' },
          { id: 'foot-top-left', name: 'Foot top (left)', code: '16' },
          { id: 'foot-instep-left', name: 'Foot instep (left)', code: '16' },
          { id: 'toe-left', name: 'Toe (left)', code: '15' }
        ],
        x: 151.8,
        y: 474.1,
        radius: 18.7
      }
    ],
    back: [
      {
        id: 'head',
        name: 'Head',
        parts: [
          { id: 'scalp-back', name: 'Scalp', code: '4' },
          { id: 'neck-back', name: 'Neck', code: '6' }
        ],
        x: 149.8,
        y: 71,
        radius: 18.7
      },
      {
        id: 'upperBack',
        name: 'Upper Back',
        parts: [
          { id: 'upper-back', name: 'Upper Back', code: '7' },
          { id: 'shoulder-blade-left', name: 'Shoulder Blade (left)', code: '7' },
          { id: 'shoulder-blade-right', name: 'Shoulder Blade (right)', code: '7' }
        ],
        x: 129.9,
        y: 156.5,
        radius: 18.7
      },
      {
        id: 'leftArm',
        name: 'Left Arm',
        parts: [
          { id: 'upper-arm-left-back', name: 'Upper Arm (left)', code: '13' },
          { id: 'lower-arm-left-back', name: 'Lower Arm (left)', code: '13' }
        ],
        x: 69.2,
        y: 206.2,
        radius: 18.7
      },
      {
        id: 'rightArm',
        name: 'Right Arm',
        parts: [
          { id: 'upper-arm-right-back', name: 'Upper Arm (right)', code: '13' },
          { id: 'lower-arm-right-back', name: 'Lower Arm (right)', code: '13' }
        ],
        x: 191.9,
        y: 206.2,
        radius: 18.7
      },
      {
        id: 'lowerBack',
        name: 'Lower Back',
        parts: [
          { id: 'lower-back', name: 'Lower Back', code: '7' },
          { id: 'spine', name: 'Spine', code: '7' }
        ],
        x: 129.9,
        y: 226.2,
        radius: 18.7
      },
      {
        id: 'leftHand',
        name: 'Left Hand',
        parts: [
          { id: 'hand-left-back', name: 'Hand (left)', code: '11' },
          { id: 'wrist-left-back', name: 'Wrist (left)', code: '12' },
          { id: 'thumb-left-back', name: 'Thumb (left)', code: '10' },
          { id: 'index-finger-left-back', name: 'Index Finger (left)', code: '10' },
          { id: 'middle-finger-left-back', name: 'Middle Finger (left)', code: '10' },
          { id: 'ring-finger-left-back', name: 'Ring Finger (left)', code: '10' },
          { id: 'little-finger-left-back', name: 'Little Finger (left)', code: '10' }
        ],
        x: 44.4,
        y: 257,
        radius: 18.7
      },
      {
        id: 'rightHand',
        name: 'Right Hand',
        parts: [
          { id: 'hand-right-back', name: 'Hand (right)', code: '11' },
          { id: 'wrist-right-back', name: 'Wrist (right)', code: '12' },
          { id: 'thumb-right-back', name: 'Thumb (right)', code: '10' },
          { id: 'index-finger-right-back', name: 'Index Finger (right)', code: '10' },
          { id: 'middle-finger-right-back', name: 'Middle Finger (right)', code: '10' },
          { id: 'ring-finger-right-back', name: 'Ring Finger (right)', code: '10' },
          { id: 'little-finger-right-back', name: 'Little Finger (right)', code: '10' }
        ],
        x: 215.1,
        y: 257,
        radius: 18.7
      },
      {
        id: 'buttocks',
        name: 'Buttocks',
        parts: [
          { id: 'buttocks', name: 'Buttocks', code: '8' },
          { id: 'tailbone', name: 'Tailbone', code: '7' }
        ],
        x: 129.9,
        y: 270,
        radius: 18.7
      },
      {
        id: 'leftLeg',
        name: 'Left Leg',
        parts: [
          { id: 'upper-leg-left-back', name: 'Upper Leg (left)', code: '18' },
          { id: 'knee-left-back', name: 'Knee (left)', code: '18' },
          { id: 'lower-leg-left-back', name: 'Lower Leg (left)', code: '18' },
          { id: 'calf-left', name: 'Calf (left)', code: '18' }
        ],
        x: 99.5,
        y: 329.5,
        radius: 18.7
      },
      {
        id: 'rightLeg',
        name: 'Right Leg',
        parts: [
          { id: 'upper-leg-right-back', name: 'Upper Leg (right)', code: '18' },
          { id: 'knee-right-back', name: 'Knee (right)', code: '18' },
          { id: 'lower-leg-right-back', name: 'Lower Leg (right)', code: '18' },
          { id: 'calf-right', name: 'Calf (right)', code: '18' }
        ],
        x: 160.6,
        y: 329.5,
        radius: 18.7
      },
      {
        id: 'leftFoot',
        name: 'Left Foot',
        parts: [
          { id: 'ankle-left-back', name: 'Ankle (left)', code: '17' },
          { id: 'foot-left-back', name: 'Foot (left)', code: '16' },
          { id: 'heel-left', name: 'Heel (left)', code: '16' },
          { id: 'toe-left-back', name: 'Toe (left)', code: '15' }
        ],
        x: 108.1,
        y: 474.1,
        radius: 18.7
      },
      {
        id: 'rightFoot',
        name: 'Right Foot',
        parts: [
          { id: 'ankle-right-back', name: 'Ankle (right)', code: '17' },
          { id: 'foot-right-back', name: 'Foot (right)', code: '16' },
          { id: 'heel-right', name: 'Heel (right)', code: '16' },
          { id: 'toe-right-back', name: 'Toe (right)', code: '15' }
        ],
        x: 151.8,
        y: 474.1,
        radius: 18.7
      }
    ]
  };

  // Map body part codes to readable names (for the final selection)
  const bodyPartNames: Record<string, string> = {
    '1': 'Eye',
    '2': 'Ear',
    '3': 'Other parts of face',
    '4': 'Head',
    '5': 'Several head locations',
    '6': 'Neck',
    '7': 'Back',
    '8': 'Trunk',
    '9': 'Several torso locations',
    '10': 'Finger or fingers',
    '11': 'Hand',
    '12': 'Wrist',
    '13': 'Upper limb',
    '14': 'Several upper limb locations',
    '15': 'Toe',
    '16': 'Foot',
    '17': 'Ankle',
    '18': 'Lower limb',
    '19': 'Several lower limb locations',
    '20': 'Several locations',
    '21': 'General locations',
    '22': 'Unknown locations'
  };

  // Handle clicking outside dropdown
  useEffect(() => {
    // Only add event listeners on client side
    if (typeof window !== 'undefined') {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setShowDropdown(false);
          setSelectedRegion(null);
        }
      };

      if (showDropdown) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showDropdown]);

  const handleRegionClick = (region: BodyPartRegion, event: React.MouseEvent) => {
    event.stopPropagation();
    const svgContainer = (event.currentTarget as HTMLElement).closest('.relative');
    const svgElement = svgContainer?.querySelector('svg');
    
    if (svgElement) {
      const svgRect = svgElement.getBoundingClientRect();
      const containerRect = svgContainer.getBoundingClientRect();
      
      // Calculate the scale factor
      const scaleX = svgRect.width / 260; // SVG viewBox width
      const scaleY = svgRect.height / 580; // SVG viewBox height
      
      // Convert SVG coordinates to container coordinates
      const dotX = region.x * scaleX;
      const dotY = region.y * scaleY;
      
      setSelectedRegion(region.id);
      setDropdownPosition({
        x: dotX,
        y: dotY
      });
    }
    setShowDropdown(true);
  };

  const handlePartSelect = (part: DetailedBodyPart) => {
    const partKey = `${part.id}:${part.code}`;
    if (!selectedBodyParts.includes(partKey)) {
      setSelectedBodyParts([...selectedBodyParts, partKey]);
    }
    setShowDropdown(false);
    setSelectedRegion(null);
  };

  const handleRemovePart = (partKey: string) => {
    setSelectedBodyParts(selectedBodyParts.filter(p => p !== partKey));
  };

  const handleSave = () => {
    // Extract just the codes for saving
    const codes = selectedBodyParts.map(part => part.split(':')[1]);
    onSave(codes);
    onClose();
  };

  const handleCloseDropdown = () => {
    setShowDropdown(false);
    setSelectedRegion(null);
  };

  // Get selected parts for display by view
  const getSelectedPartsForView = (view: 'front' | 'back') => {
    const parts: { name: string, key: string }[] = [];
    
    selectedBodyParts.forEach(partKey => {
      const [partId, code] = partKey.split(':');
      
      // Find the part in the current view's regions
      for (const region of bodyPartRegions[view]) {
        const foundPart = region.parts.find(p => p.id === partId);
        if (foundPart) {
          parts.push({
            name: foundPart.name,
            key: partKey
          });
          break;
        }
      }
    });
    
    return parts;
  };

  if (!isOpen) return null;

  const selectedRegionData = selectedRegion ? 
    bodyPartRegions[currentView].find(r => r.id === selectedRegion) : null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-5xl bg-white rounded-lg shadow-xl modal-content">
          {/* Header */}
          <div className="bg-white px-4 py-4 rounded-t-lg flex items-center justify-between border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">Select body parts</h3>
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="flex">
            {/* Body Diagram */}
            <div className="flex-1 p-6">
              <div className="text-center mb-4">
                <h4 className="text-xl font-semibold text-gray-600 mb-4">
                  {currentView === 'front' ? 'FRONT' : 'BACK'}
                </h4>
                
                {/* Instructions */}
                <p className="text-sm text-gray-600 mb-4">
                  Click on a "hotspot" on the body image opposite to select one or more body parts within the appropriate region.
                </p>
                
                {/* Professional SVG Body Diagram */}
                <div className="relative inline-block">
                  <svg className="bp-body-picker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 580" preserveAspectRatio="xMidYMin slice" width="260" height="450">
                    <style type="text/css">
                      {`
                        .bp-no-hover {
                            pointer-events: none;
                        }

                        /*--------Styles for creating the body-hover points.--------*/
                        *[class^='bp-group-highlight-'] path {
                            opacity: 0;
                            pointer-events: none;
                            transition: 0.2s ease;
                        }

                        *[class^='bp-group-highlight-'] circle {
                            opacity: 0;
                            cursor: pointer;
                        }

                            *[class^='bp-group-highlight-'] circle:hover + path {
                                opacity: 100;
                                transition: 0.2s ease;
                            }
                        /*--------End of body-hover point styles.-------------------*/

                        .bp-shadow-front,
                        .bp-shadow-back {
                            fill: url(#bp-shadow-style);
                        }

                        .bp-body-fill-front,
                        .bp-body-fill-back {
                            fill: transparent;
                        }

                        .bp-group-highlight-front,
                        .bp-group-highlight-back {
                            opacity: 0.5;
                            fill: #F93A3A;
                        }

                        .bp-stroke-style {
                            fill: none;
                            stroke: #8999A5;
                            stroke-width: 1.8;
                            stroke-linecap: round;
                            stroke-miterlimit: 10;
                        }

                        .bp-detail-style {
                            fill: #8999A5;
                        }

                        *[class^='bp-selector bp-selector-'] circle {
                            fill: #D45250;
                            opacity: 0.3;
                        }

                            *[class^='bp-selector bp-selector-'] circle:last-of-type {
                                opacity: 1;
                            }
                      `}
                    </style>

                    <radialGradient id="bp-shadow-style" cx="129.2515" cy="419.9692" r="86.1027" gradientTransform="matrix(1 0 0 0.233 0 388.1637)" gradientUnits="userSpaceOnUse">
                        <stop offset="0" style={{stopColor:"#A7B4BC"}}></stop>
                        <stop offset="1" style={{stopColor:"#A7B4BC", stopOpacity:0.1}}></stop>
                    </radialGradient>

                    {currentView === 'front' ? (
                      <g data-bp="" className="bp-body-picker-front">
                        <ellipse className="bp-shadow-front" cx="129.3" cy="486" rx="86.1" ry="20.1"></ellipse>
                        <g data-bp="" className="bp-group-front-body">
                            <path className="bp-body-fill-front bp-no-hover" d="M219.1,267.3c3.1,3.2,5.5,3.6,6.7,3.6c3.2,0.1,3.1-2.6,1.8-3.2c-3.6-1.8-6.6-5.1-9.2-8
c-6.8-7.6-10.3-7.2-13.6-5.6l2.5-1.2c-5.8-5.3-7.6-25.3-10.3-34.2c-1.3-4.1-2.4-8-8.9-16c-4-5-9.8-56.6-12.3-62.8
c-2.7-6.6-9.9-11.2-24.7-14.9c-8.7-2.2-10.5-2.1-9.5-15c3.5-3.8,6.4-9.1,8-15.3c1-3.8,3.4-21.3-4.2-31.3
c-3.5-4.6-8.7-6.9-15.3-6.9c-6.9,0-12.1,2.3-15.7,6.9c-7.5,9.8-5,27.1-3.9,31.2c1.6,6.2,4.5,11.5,8,15.3c0.9,12.7-0.8,12.9-9.5,15
c-14.8,3.7-22,8.4-24.7,14.9c-2.6,6.1-8.3,57.8-12.3,62.8c-6.5,8-7.6,11.9-8.9,16c-2.7,8.9-4.5,28.9-10.3,34.2l2.5,1.2
c-3.3-1.6-6.8-2-13.6,5.6c-2.6,2.9-5.6,6.2-9.2,8c-1.3,0.7-1.4,3.3,1.8,3.2c1.2,0,3.6-0.5,6.7-3.6c0.2-0.2,1.4-1,1.3,0.3
c-0.4,6.4-11.4,16.9-8.7,18.5c1.1,0.7,2.9-2,4.8-4.6c2.2-3,4.4-6.2,4.8-6c1.3,0.6-7.8,14.9-5.5,16.1c3.2,1.8,7.5-15.5,9.8-14.5
c1,0.4-0.8,4.6-2.3,8.6c-1.3,3.4-2.5,6.5-1,6.9c1.6,0.5,2.7-1.8,5.1-7.7c0.4-1,2.1-6.3,3.1-5.8c0.8,0.4-2.8,9.4-0.4,10.1
c2.1,0.7,4.5-10.5,5.2-12c2-4,7.3-13.6,5.4-18l0.1,0.1c0,0,19.7-31.3,22.5-44c0.2-1.1,1.3-6.9,2.8-9c3.8-5.5,8.7-17.4,10.8-24.7
c4.2,22.4,0.9,36.7-1.5,44.5c-7.9,25.5-2.8,78.4,0.3,90c8.8,32.6,4.3,51.3,3.9,67.8c-0.5,17,15.6,72.3,14.7,79.5
c-1,7.3-3.7,14.6-9.5,18.8c-2.2,1.6,0.3,4.3,1.7,4.4c1.6,0,2.9-0.4,4.1,0.6c1.9,1.4,4.8,1.7,9.3,1c2.6,1.8,6.4,1.4,6.9,0.5
c1.4-2.8,1.5-23.4,0.5-25.6c-0.3-0.7-1.8-2.9-2.1-4.7c-0.6-5-0.5-28.3,0.8-37.9c3-22.9-1.3-51.7-0.7-56.1
c1.2-8.7,2.3-18.9,1.4-40.1c-0.4-9.6,2.6-18.3,0.1-59.1c0.3,0,2.8,0,3.2,0c-2.5,40.9,0.5,49.5,0.1,59.1
c-0.9,21.2,0.2,31.5,1.4,40.1c0.6,4.4-3.7,33.2-0.7,56.1c1.3,9.6,1.4,32.9,0.8,37.9c-0.2,1.8-1.8,4-2.1,4.7
c-1,2.2-0.9,22.8,0.5,25.6c0.4,0.9,4.3,1.4,6.9-0.5c4.5,0.8,7.4,0.4,9.3-1c1.2-1,2.5-0.6,4.1-0.6c1.5,0,3.9-2.8,1.7-4.4
c-5.8-4.2-8.5-11.4-9.5-18.8c-1-7.2,15.1-62.5,14.7-79.5c-0.5-16.5-4.9-35.2,3.9-67.8c3.1-11.6,8.2-64.5,0.3-90
c-2.5-8.2-5.7-22.1-1.5-44.5c2.1,7.3,6.9,19.3,10.8,24.7c1.5,2.2,2.5,7.9,2.8,9c2.8,12.7,22.5,44,22.5,44l0.1-0.1
c-1.9,4.4,3.4,14,5.4,18c0.8,1.5,3.1,12.7,5.2,12c2.3-0.8-1.3-9.7-0.4-10.1c1-0.5,2.7,4.8,3.1,5.8c2.4,5.8,3.5,8.1,5.1,7.7
c1.5-0.4,0.3-3.5-1-6.9c-1.5-3.9-3.3-8.1-2.3-8.6c2.3-1,6.6,16.2,9.8,14.5c2.3-1.3-6.8-15.5-5.5-16.1c0.4-0.2,2.6,3,4.8,6
c1.9,2.7,3.7,5.3,4.8,4.6c2.7-1.6-8.3-12.1-8.7-18.5C217.8,266.3,218.9,267,219.1,267.3z"></path>

                            <g data-bp="" className="bp-group-outline-front bp-no-hover">
                                <path className="bp-stroke-style" d="M128.4,264.9c2.5,40.9-0.5,49.5-0.1,59.1c0.9,21.2-0.2,31.5-1.4,40.1c-0.6,4.4,3.7,33.2,0.7,56.1
c-1.3,9.6-1.4,32.9-0.8,37.9c0.2,1.8,1.8,4,2.1,4.7c1,2.2,0.9,22.8-0.5,25.6c-0.4,0.9-4.3,1.4-6.9-0.5c-4.5,0.8-7.4,0.4-9.3-1
c-1.2-1-2.5-0.6-4.1-0.6c-1.5,0-3.9-2.8-1.7-4.4c5.8-4.2,8.5-11.4,9.5-18.8c1-7.2-15.1-62.5-14.7-79.5
c0.5-16.5,4.9-35.2-3.9-67.8c-3.1-11.6-8.3-64.5-0.3-90c2.4-7.8,5.7-22.1,1.5-44.5c-2.1,7.3-6.9,19.3-10.8,24.7
c-1.5,2.2-2.5,7.9-2.8,9c-2.8,12.7-22.5,44-22.5,44l-0.1-0.1c1.9,4.4-3.4,14-5.4,18c-0.8,1.5-3.1,12.7-5.2,12
c-2.3-0.8,1.3-9.7,0.4-10.1c-1-0.5-2.7,4.8-3.1,5.8c-2.4,5.8-3.5,8.1-5.1,7.7c-1.5-0.4-0.3-3.5,1-6.9c1.5-3.9,3.3-8.1,2.3-8.6
c-2.3-1-6.6,16.2-9.8,14.5c-2.3-1.3,6.8-15.5,5.5-16.1c-0.4-0.2-2.6,3-4.8,6c-1.9,2.7-3.7,5.3-4.8,4.6
c-2.7-1.6,8.3-12.1,8.7-18.5c0.1-1.3-1-0.6-1.3-0.3c-3.1,3.2-5.5,3.6-6.7,3.6c-3.2,0.1-3.1-2.6-1.8-3.2c3.6-1.8,6.6-5.1,9.2-8
c7.3-8.2,10.9-7.1,14.4-5.2l-3.3-1.6c5.8-5.3,7.6-25.3,10.3-34.2c1.3-4.1,2.4-8,8.9-16c4-5,9.8-56.6,12.3-62.8
c2.7-6.6,9.9-11.2,24.7-14.9c8.7-2.2,10.4-2.5,9.5-14.9c7.7,8.1,16.3,7.6,23.1,0c-0.9,12.4,0.7,12.7,9.5,14.9
c14.8,3.7,22,8.4,24.7,14.9c2.6,6.1,8.3,57.8,12.3,62.8c6.5,8,7.6,11.9,8.9,16c2.7,8.9,4.5,28.9,10.3,34.2l-3.3,1.6
c3.5-1.8,7.1-3,14.4,5.2c2.6,2.9,5.6,6.2,9.2,8c1.3,0.7,1.4,3.3-1.8,3.2c-1.2,0-3.6-0.5-6.7-3.6c-0.2-0.2-1.4-1-1.3,0.3
c0.4,6.4,11.4,16.9,8.7,18.5c-1.1,0.7-2.9-2-4.8-4.6c-2.2-3-4.4-6.2-4.8-6c-1.3,0.6,7.8,14.9,5.5,16.1
c-3.2,1.8-7.5-15.5-9.8-14.5c-1,0.4,0.8,4.6,2.3,8.6c1.3,3.4,2.5,6.5,1,6.9c-1.6,0.5-2.7-1.8-5.1-7.7c-0.4-1-2.1-6.3-3.1-5.8
c-0.8,0.4,2.8,9.4,0.4,10.1c-2.1,0.7-4.5-10.5-5.2-12c-2-4-7.3-13.6-5.4-18l-0.1,0.1c0,0-19.7-31.3-22.5-44
c-0.2-1.1-1.3-6.9-2.8-9c-3.8-5.5-8.7-17.4-10.8-24.7c-4.2,22.4-1,36.3,1.5,44.5c7.8,25.6,2.8,78.4-0.3,90
c-8.8,32.6-4.3,51.3-3.9,67.8c0.5,17-15.6,72.3-14.7,79.5c1,7.3,3.7,14.6,9.5,18.8c2.2,1.6-0.3,4.3-1.7,4.4
c-1.6,0-2.9-0.4-4.1,0.6c-1.9,1.4-4.8,1.7-9.3,1c-2.6,1.8-6.4,1.4-6.9,0.5c-1.4-2.8-1.5-23.4-0.5-25.6c0.3-0.7,1.8-2.9,2.1-4.7
c0.6-5,0.5-28.3-0.8-37.9c-3-22.9,1.3-51.7,0.7-56.1c-1.2-8.7-2.3-18.9-1.4-40.1c0.4-9.6-2.6-18.3-0.1-59.1
C131.2,264.9,128.7,264.9,128.4,264.9z
M129.9,115.9c-8.2-0.2-16.3-9-19.5-21.2c-1.1-4.1-3.6-21.5,3.9-31.2c3.5-4.6,8.8-6.9,15.7-6.9
c6.7,0,11.8,2.3,15.3,6.9c7.6,9.9,5.2,27.5,4.2,31.3C146.3,106.9,138.2,115.7,129.9,115.9L129.9,115.9L129.9,115.9z"></path>
                                <path className="bp-detail-style" d="M99.5,183c0,0-0.5-5.1-0.6-5.6c-0.5-3.2-2.9-5.3-3.3-9.8c-0.4-4.3,0.7-6,0.7-7.3c0-1.1-1-2.8-1.5-3.8
c0.2,1,0.7,3.4,0.5,4.2c-0.3,1.2-1.4,3.2-1.1,7.1c0.4,6.4,3.2,5.8,3.5,15.1C98.5,183,99.5,183,99.5,183z
M162.3,183c0.3-9.4,3.1-8.7,3.5-15.1c0.3-3.9-0.9-5.9-1.1-7.1c-0.2-0.9,0.3-3.3,0.5-4.2
c-0.4,1-1.5,2.7-1.5,3.8c0,1.4,1.1,3,0.7,7.3c-0.4,4.5-2.7,6.6-3.3,9.8c-0.1,0.5-0.6,5.6-0.6,5.6S161.5,183,162.3,183z
M136.9,261.3c-3.8,3.7-10,3.7-13.9,0c0.5,1.6,2.9,4.5,6.9,4.5C133.9,265.8,136.3,263.1,136.9,261.3z
M109,355.5c-4.4,10.6,8.8,17.6,14.6,7.9C118,369.4,108.1,366.8,109,355.5z
M47,266.7c5.3,1.1,9.3-5.4,10.1-9.8C56.6,257.6,53,265.1,47,266.7z
M150.9,355.5c4.4,10.6-8.8,17.6-14.6,7.9C141.9,369.4,151.8,366.8,150.9,355.5z
M212.9,266.7c-5.3,1.1-9.3-5.4-10.1-9.8C203.3,257.6,206.9,265.1,212.9,266.7z"></path>
                            </g>
                        </g>
                        
                        {/* Interactive hotspots */}
                        {bodyPartRegions[currentView].map((region) => (
                          <g key={region.id} className="bp-selector bp-selector-bp-front-selector">
                            <circle
                              cx={region.x}
                              cy={region.y}
                              r="18.7"
                              fill="#D45250"
                              fillOpacity="0.3"
                              cursor="pointer"
                              onClick={(e) => handleRegionClick(region, e)}
                            />
                            <circle
                              cx={region.x}
                              cy={region.y}
                              r="9.1"
                              fill="#D45250"
                              fillOpacity="0.3"
                              cursor="pointer"
                              onClick={(e) => handleRegionClick(region, e)}
                            />
                            <circle
                              cx={region.x}
                              cy={region.y}
                              r="4.5"
                              fill="#D45250"
                              fillOpacity="1"
                              cursor="pointer"
                              onClick={(e) => handleRegionClick(region, e)}
                            />
                          </g>
                        ))}
                        
                        <path className="bp-front-text-front bp-detail-style" d="M96.8,20.4v5h6.9v2.8h-6.9v7.4h-3.5V17.5H104v2.9H96.8z
M117.4,35.7c-0.6-1.5-1.3-2.9-1.9-4.4c-0.8-1.9-1.5-3.2-3.8-3.2v7.5h-3.4V17.5c2.4,0,5-0.2,7.4,0.1
c2.5,0.4,4.3,1.8,4.5,4.4c0.2,2.6-1.4,4.6-4,5c1.8,0.4,2.6,3,3.3,4.5c0.7,1.4,1.3,2.8,2,4.1H117.4z M116.5,22.9
c0-2.7-2.9-2.5-4.9-2.5v5.1C113.6,25.5,116.5,25.6,116.5,22.9z
M137.2,26.6c0,3.7-1.2,7.9-5.1,9.1c-3.2,1-6.9-0.1-8.4-3.2c-1.5-3.1-1.5-7.5-0.3-10.7c1.4-3.6,5.2-5.4,9-4.3
C136.3,18.7,137.2,23,137.2,26.6z M133.6,26.7c0-2.4-0.3-6.2-3.4-6.4c-3.5-0.2-4,3.6-4,6.2c0,2.3,0.2,5.9,3.1,6.4
C133,33.4,133.6,29.5,133.6,26.7z
M148,35.7l-4.9-10.8l-1-2.3v7.5v5.6H139V17.5h4.2l5,10.9l0.9,2.1v-8v-5h3.1v18.2H148z
M163,20.4v15.3h-3.5V20.4h-5v-2.9h13.5v2.9H163z"></path>
                      </g>
                    ) : (
                      <g data-bp="" className="bp-body-picker-back">
                        <ellipse className="bp-shadow-back" cx="129.3" cy="485.9" rx="86.1" ry="20.1"></ellipse>
                        <g data-bp="" className="bp-group-back-body">
                            <path className="bp-body-fill-back bp-no-hover" d="M128.9,462.9c1,2.2,0.8,19.7,0.8,20c0,0.3,1.2,7.1-7.4,7.1c-5.2,0-5.7-1.7-8.3-2.6
c-2-0.8-3.1,0.2-4.7-0.6c-4.4-2.2-2.5-5.9-1.9-6.8c4.1-6.6,6.3-4.2,8.8-16.2c1-7.2-15.4-63-14.9-80c0.5-16.5,4.9-35.2-3.9-67.8
c-3.1-11.6-8.3-64.5-0.3-90c2.4-7.7,5.7-22.1,1.5-44.5c-2.1,7.3-6.9,19.3-10.8,24.7c-1.5,2.2-2.5,7.9-2.8,9
c-2.8,12.7-22.5,44-22.5,44c1.9,4.4-3.4,13.9-5.4,17.9c-0.8,1.5-3.1,12.7-5.2,12c-2.3-0.8,1.3-9.7,0.4-10.1
c-1-0.5-2.7,4.8-3.1,5.8c-2.4,5.8-3.5,8.1-5.1,7.7c-1.5-0.4-0.3-3.5,1-6.9c1.5-3.9,3.3-8.1,2.3-8.6c-2.3-1-6.6,16.2-9.8,14.5
c-2.3-1.3,6.8-15.5,5.5-16.1c-0.4-0.2-2.6,3-4.8,6c-1.9,2.7-3.7,5.3-4.8,4.6c-2.7-1.6,8.3-12.1,8.7-18.5c0.1-1.3-1-0.6-1.3-0.3
c-3.1,3.2-5.5,3.6-6.7,3.6c-3.2,0.1-3.1-2.6-1.8-3.2c3.6-1.8,6.6-5.1,9.2-8c4.8-5.3,7.9-6.7,10.5-6.5l0.6-0.3
c5.8-5.3,7.6-25.3,10.3-34.2c1.3-4.1,2.4-8,8.9-16c4-5,9.8-56.6,12.3-62.8c2.7-6.6,9.9-11.2,24.7-14.9c8.7-2.2,9.4-1.8,9.4-15.1
c-2.9-2.5-6.3-9-8-15.2c-1.1-4.1-3.6-21.5,3.9-31.2c3.5-4.6,8.8-6.9,15.7-6.9c6.7,0,11.8,2.3,15.3,6.9c7.6,9.9,5.2,27.5,4.2,31.3
c-1.6,6.2-4.8,12-8,15.2c0,13.9,0.7,12.9,9.4,15.1c14.8,3.7,22,8.4,24.7,14.9c2.6,6.1,8.3,57.8,12.3,62.8c6.5,8,7.6,11.9,8.9,16
c2.7,8.9,4.5,28.9,10.3,34.2l0.4,0.3c2.6-0.3,5.9,1,10.8,6.5c2.6,2.9,5.6,6.2,9.2,8c1.3,0.7,1.4,3.3-1.8,3.2
c-1.2,0-3.6-0.5-6.7-3.6c-0.2-0.2-1.4-1-1.3,0.3c0.4,6.4,11.4,16.9,8.7,18.5c-1.1,0.7-2.9-2-4.8-4.6c-2.2-3-4.4-6.2-4.8-6
c-1.3,0.6,7.8,14.9,5.5,16.1c-3.2,1.8-7.5-15.5-9.8-14.5c-1,0.4,0.8,4.6,2.3,8.6c1.3,3.4,2.5,6.5,1,6.9c-1.6,0.5-2.7-1.8-5.1-7.7
c-0.4-1-2.1-6.3-3.1-5.8c-0.8,0.4,2.8,9.4,0.4,10.1c-2.1,0.7-4.5-10.5-5.2-12c-2-4-7.3-13.5-5.4-17.9c0,0-19.8-31.4-22.5-44
c-0.2-1.1-1.3-6.9-2.8-9c-3.8-5.5-8.7-17.4-10.8-24.7c-4.2,22.4-1,36.2,1.5,44.5c7.8,25.6,2.8,78.4-0.3,90
c-8.8,32.6-4.3,51.3-3.9,67.8c0.5,17-16.3,72.9-14.9,80c2.5,12,4.6,9.6,8.8,16.2c0.6,0.9,2.5,4.6-1.9,6.8
c-1.6,0.8-2.7-0.2-4.7,0.6c-2.6,1-3.1,2.6-8.3,2.6c-8.6,0-7.5-6.6-7.5-7.1c0-0.5-0.1-17.9,0.9-20c0.3-0.7,1.8-2.9,2.1-4.7
c0.6-5,0.5-28.3-0.8-37.9c-3-22.9,1.3-51.7,0.7-56.1c-1.2-8.7-2.3-18.9-1.4-40.1c0.4-8.9-1.3-17.2-1.6-49.9c0,32.8-2,41-1.6,49.9
c0.9,21.2-0.2,31.5-1.4,40.1c-0.6,4.4,3.7,33.2,0.7,56.1c-1.3,9.6-1.4,32.9-0.8,37.9C127.1,459.9,128.7,462.2,128.9,462.9z"></path>

                            <g data-bp="" className="bp-group-outline-back bp-no-hover">
                                <path className="bp-stroke-style" d="M128.9,462.9c1,2.2,0.8,19.7,0.8,20c0,0.3,1.2,7.1-7.4,7.1c-5.2,0-5.7-1.7-8.3-2.6c-2-0.8-3.1,0.2-4.7-0.6
c-4.4-2.2-2.5-5.9-1.9-6.8c4.1-6.6,6.3-4.2,8.8-16.2c1-7.2-15.4-63-14.9-80c0.5-16.5,4.9-35.2-3.9-67.8
c-3.1-11.6-8.3-64.5-0.3-90c2.4-7.7,5.7-22.1,1.5-44.5c-2.1,7.3-6.9,19.3-10.8,24.7c-1.5,2.2-2.5,7.9-2.8,9
c-2.8,12.7-22.5,44-22.5,44c1.9,4.4-3.4,13.9-5.4,17.9c-0.8,1.5-3.1,12.7-5.2,12c-2.3-0.8,1.3-9.7,0.4-10.1
c-1-0.5-2.7,4.8-3.1,5.8c-2.4,5.8-3.5,8.1-5.1,7.7c-1.5-0.4-0.3-3.5,1-6.9c1.5-3.9,3.3-8.1,2.3-8.6c-2.3-1-6.6,16.2-9.8,14.5
c-2.3-1.3,6.8-15.5,5.5-16.1c-0.4-0.2-2.6,3-4.8,6c-1.9,2.7-3.7,5.3-4.8,4.6c-2.7-1.6,8.3-12.1,8.7-18.5c0.1-1.3-1-0.6-1.3-0.3
c-3.1,3.2-5.5,3.6-6.7,3.6c-3.2,0.1-3.1-2.6-1.8-3.2c3.6-1.8,6.6-5.1,9.2-8c4.8-5.3,7.9-6.7,10.5-6.5l0.6-0.3
c5.8-5.3,7.6-25.3,10.3-34.2c1.3-4.1,2.4-8,8.9-16c4-5,9.8-56.6,12.3-62.8c2.7-6.6,9.9-11.2,24.7-14.9c8.7-2.2,9.4-1.8,9.4-15.1
c-2.9-2.5-6.3-9-8-15.2c-1.1-4.1-3.6-21.5,3.9-31.2c3.5-4.6,8.8-6.9,15.7-6.9c6.7,0,11.8,2.3,15.3,6.9c7.6,9.9,5.2,27.5,4.2,31.3
c-1.6,6.2-4.8,12-8,15.2c0,13.9,0.7,12.9,9.4,15.1c14.8,3.7,22,8.4,24.7,14.9c2.6,6.1,8.3,57.8,12.3,62.8c6.5,8,7.6,11.9,8.9,16
c2.7,8.9,4.5,28.9,10.3,34.2l0.4,0.3c2.6-0.3,5.9,1,10.8,6.5c2.6,2.9,5.6,6.2,9.2,8c1.3,0.7,1.4,3.3-1.8,3.2
c-1.2,0-3.6-0.5-6.7-3.6c-0.2-0.2-1.4-1-1.3,0.3c0.4,6.4,11.4,16.9,8.7,18.5c-1.1,0.7-2.9-2-4.8-4.6c-2.2-3-4.4-6.2-4.8-6
c-1.3,0.6,7.8,14.9,5.5,16.1c-3.2,1.8-7.5-15.5-9.8-14.5c-1,0.4,0.8,4.6,2.3,8.6c1.3,3.4,2.5,6.5,1,6.9c-1.6,0.5-2.7-1.8-5.1-7.7
c-0.4-1-2.1-6.3-3.1-5.8c-0.8,0.4,2.8,9.4,0.4,10.1c-2.1,0.7-4.5-10.5-5.2-12c-2-4-7.3-13.5-5.4-17.9c0,0-19.8-31.4-22.5-44
c-0.2-1.1-1.3-6.9-2.8-9c-3.8-5.5-8.7-17.4-10.8-24.7c-4.2,22.4-1,36.2,1.5,44.5c7.8,25.6,2.8,78.4-0.3,90
c-8.8,32.6-4.3,51.3-3.9,67.8c0.5,17-16.3,72.9-14.9,80c2.5,12,4.6,9.6,8.8,16.2c0.6,0.9,2.5,4.6-1.9,6.8
c-1.6,0.8-2.7-0.2-4.7,0.6c-2.6,1-3.1,2.6-8.3,2.6c-8.6,0-7.5-6.6-7.5-7.1c0-0.5-0.1-17.9,0.9-20c0.3-0.7,1.8-2.9,2.1-4.7
c0.6-5,0.5-28.3-0.8-37.9c-3-22.9,1.3-51.7,0.7-56.1c-1.2-8.7-2.3-18.9-1.4-40.1c0.4-8.9-1.3-17.2-1.6-49.9c0,32.8-2,41-1.6,49.9
c0.9,21.2-0.2,31.5-1.4,40.1c-0.6,4.4,3.7,33.2,0.7,56.1c-1.3,9.6-1.4,32.9-0.8,37.9C127.1,459.9,128.7,462.2,128.9,462.9z"></path>
                                <path className="bp-detail-style" d="M75.8,208.6c4.4,4,9.3,1.7,9.7-2.6C82.6,209.8,81.1,210,75.8,208.6z
M124,144.8c0,0,0.9,11.4-0.3,16.4c-4.3,16.9-13.4,18.2-13.4,18.2s9.9,0.1,14.5-18
C126.2,155.6,124,144.8,124,144.8z
M129.9,186.1c-1,14.2-0.8,31,0,39.3C130.8,217.1,131,200.3,129.9,186.1z
M121.7,363.1c-3.4-3.7-9.2-3-12.6,0.3C113.4,361.2,118.2,361.8,121.7,363.1z
M137.2,109.3c-3.9-2.8-10.5-3-14.3,0C127.8,108,131.7,108,137.2,109.3z
M174.3,206c0.4,4.3,5.3,6.6,9.7,2.6C178.7,210,177.2,209.8,174.3,206z
M135.3,161.4c4.6,18.2,14.5,18,14.5,18s-9.1-1.3-13.4-18.2c-1.3-5-0.3-16.4-0.3-16.4
S133.8,155.6,135.3,161.4z
M150.4,363.4c-3.3-3.3-9.2-3.9-12.6-0.3C141.4,361.8,146.2,361.2,150.4,363.4z
M129.8,251.5c0,0-0.6,22.4-1.4,23.1c-5.1,4.5-23.2,6.6-28.7-2.4c2.9,10.6,23.2,10.5,30.2,3.4
c7,7,27.3,7.2,30.2-3.4c-5.5,9-23.6,6.9-28.7,2.4C130.5,273.9,129.9,251.5,129.8,251.5L129.8,251.5z
M98.7,186.3c0,0-4.1-26-2.8-26.2c1.3-0.2,3.6,23.3,4.2,26.1L98.7,186.3z
M159.9,186.2c0.6-2.8,2.9-26.3,4.2-26.1c1.3,0.2-2.8,26.2-2.8,26.2L159.9,186.2z
M141.1,486.8c0.6,0.1,1.2-1.6,1.4-2.5c0.4-1.8,0-6.3-2.1-13.7c-1-3.5-1-6.6-1.2-6.6c-0.2,0,0,4.2,0.6,6.8
c2,8.2,2.1,11.7,1.7,13.2C141.3,484.9,140.5,486.7,141.1,486.8z
M118.5,484.1c-0.4-1.5-0.3-5,1.7-13.2c0.6-2.5,0.8-6.8,0.6-6.8c-0.2,0-0.2,3.1-1.2,6.6
c-2.1,7.3-2.5,11.9-2.1,13.7c0.2,0.9,0.7,2.6,1.4,2.5C119.5,486.7,118.7,484.9,118.5,484.1z"></path>
                            </g>
                        </g>
                        
                        {/* Interactive hotspots */}
                        {bodyPartRegions[currentView].map((region) => (
                          <g key={region.id} className="bp-selector bp-selector-bp-back-selector">
                            <circle
                              cx={region.x}
                              cy={region.y}
                              r="18.7"
                              fill="#D45250"
                              fillOpacity="0.3"
                              cursor="pointer"
                              onClick={(e) => handleRegionClick(region, e)}
                            />
                            <circle
                              cx={region.x}
                              cy={region.y}
                              r="9.1"
                              fill="#D45250"
                              fillOpacity="0.3"
                              cursor="pointer"
                              onClick={(e) => handleRegionClick(region, e)}
                            />
                            <circle
                              cx={region.x}
                              cy={region.y}
                              r="4.5"
                              fill="#D45250"
                              fillOpacity="1"
                              cursor="pointer"
                              onClick={(e) => handleRegionClick(region, e)}
                            />
                          </g>
                        ))}
                        
                        <path className="bp-back-text-back bp-detail-style" d="M100.3,35.7V17.5c2.1,0,4.3-0.1,6.4,0c2,0.1,4.5,0.5,5.3,2.6c0.9,2.2,0,5.1-2.3,5.9c2.7,0.4,3.8,3.1,3.2,5.6
c-0.5,2.4-2.6,3.5-4.9,3.9C105.6,36,102.9,35.7,100.3,35.7z M108.8,22.5c0-2.7-3.3-2.3-5.1-2.3v4.8
C105.7,25.1,108.8,25.4,108.8,22.5z M106.1,32.9c1.2,0,2.6-0.4,3.1-1.7c0.5-1,0.2-2.3-0.8-3c-1.3-0.9-3.2-0.6-4.7-0.6v5.2H106.1z
M126,35.7l-1-3.6h-6.3l-1,3.6h-3.4l5.4-18.2h4.8l5.4,18.2H126z M121.9,20.9l-2.4,8.5h4.8L121.9,20.9z
M143.8,35c-2.9,1.2-6.5,1.5-9.3-0.2c-2.8-1.7-3.6-5.1-3.5-8.1c0-3.1,1-6.4,3.7-8.2c2.6-1.7,6.2-1.6,9.1-0.6
v3.4c-2-0.9-4.7-1.6-6.7-0.4c-1.9,1.1-2.4,3.5-2.4,5.5c0,2,0.3,4.5,2.2,5.7c2.1,1.3,4.8,0.5,6.9-0.4V35z
M156.3,35.7l-5.5-8.8v8.8h-3.5V17.5h3.5v8.3l5.4-8.3h4.1l-6.2,8.7l6.5,9.5H156.3z"></path>
                      </g>
                    )}
                  </svg>

                  {/* Dropdown for body part selection */}
                  {showDropdown && selectedRegionData && (
                    <div 
                      ref={dropdownRef}
                      className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg min-w-48 max-h-64 overflow-y-auto"
                      style={{
                        left: `${dropdownPosition.x + 40}px`,
                        top: `${dropdownPosition.y - 20}px`
                      }}
                    >
                      <div className="bg-orange-500 text-white px-3 py-2 text-sm font-medium">
                        {selectedRegionData.name}
                      </div>
                      <ul className="py-1">
                        {selectedRegionData.parts.map((part) => (
                          <li
                            key={part.id}
                            onClick={() => handlePartSelect(part)}
                            className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                          >
                            {part.name}
                          </li>
                        ))}
                      </ul>
                      <div 
                        onClick={handleCloseDropdown}
                        style={{
                          backgroundColor: primaryColor,
                          color: '#ffffff'
                        }}
                        className="text-white px-3 py-2 text-sm cursor-pointer hover:opacity-90 text-center"
                      >
                        Close list
                      </div>
                    </div>
                  )}
                </div>
                
                {/* View Toggle */}
                <div className="mt-4 flex items-center justify-center space-x-4">
                  <button
                    onClick={() => setCurrentView('back')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      currentView === 'back' 
                        ? 'bg-gray-400 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Back
                  </button>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <button
                    onClick={() => setCurrentView('front')}
                    className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                      currentView === 'front' 
                        ? 'bg-gray-400 text-white' 
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Front
                  </button>
                </div>
              </div>
            </div>
            
            {/* Selected Parts Display */}
            <div className="w-80 bg-gray-50 p-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-4">
                  Use the switcher at the bottom of the body image to flip between the front and back views of the body. Click the title of any body part you wish to select and then click 'Add to list' to confirm your selection. To remove any body parts you have already selected, click the 'X' next to the body part in the table below. When you've finished, click the 'Save and Continue' button to return to the form.
                </p>
              </div>
              
              {/* Front Parts */}
              <div className="mb-4">
                <div className="bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 mb-2">
                  Front
                </div>
                <div className="bg-white border border-gray-300 min-h-20 max-h-32 overflow-y-auto">
                  {getSelectedPartsForView('front').map((part) => (
                    <div key={part.key} className="flex items-center justify-between px-3 py-1 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm text-gray-700">{part.name}</span>
                      <button
                        onClick={() => handleRemovePart(part.key)}
                        className="text-red-500 hover:text-red-700 font-bold text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Back Parts */}
              <div className="mb-6">
                <div className="bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 mb-2">
                  Back
                </div>
                <div className="bg-white border border-gray-300 min-h-20 max-h-32 overflow-y-auto">
                  {getSelectedPartsForView('back').map((part) => (
                    <div key={part.key} className="flex items-center justify-between px-3 py-1 border-b border-gray-100 last:border-b-0">
                      <span className="text-sm text-gray-700">{part.name}</span>
                      <button
                        onClick={() => handleRemovePart(part.key)}
                        className="text-red-500 hover:text-red-700 font-bold text-sm"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Save Button */}
              <div className="bg-gray-50 px-4 py-3 rounded-b-lg">
                <button
                  onClick={handleSave}
                  style={{
                    backgroundColor: primaryColor,
                    color: '#ffffff',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                  className="inline-flex justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
                >
                  Save and Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccidentBookBodyPartPicker;