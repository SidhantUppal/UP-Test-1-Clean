'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const riskAssessmentTypes = [
  { id: 1, name: 'General Risk Assessment', description: 'Standard workplace risk assessment' },
  { id: 3, name: 'Manual Handling Assessment', description: 'Assessment for manual handling tasks' },
  { id: 4, name: 'COSHH Assessment', description: 'Control of Substances Hazardous to Health assessment' },
  { id: 5, name: 'Display Screen Equipment', description: 'DSE workstation risk assessment' },
  { id: 6, name: 'Construction Risk Assessment', description: 'Risk assessment for construction activities' },
  { id: 7, name: 'Lone Working Assessment', description: 'Assessment for lone working scenarios' },
  { id: 8, name: 'Vehicle and Transport Assessment', description: 'Assessment for vehicle and transport operations' }
];

// HSE common workplace hazards for general risk assessment
const commonHazards = [
  { 
    id: 1, 
    category: 'Physical', 
    name: 'Slips and Trips', 
    requiresSeparateAssessment: false,
    suggestedControls: [
      'Keep walkways clear and unobstructed',
      'Clean up spills immediately',
      'Ensure adequate lighting in all areas',
      'Use appropriate flooring materials',
      'Maintain surfaces in good condition'
    ]
  },
  { 
    id: 2, 
    category: 'Physical', 
    name: 'Manual Handling', 
    requiresSeparateAssessment: true,
    separateAssessmentNote: 'Manual Handling Operations Regulations 1992 may require detailed assessment',
    suggestedControls: [
      'Avoid manual handling where possible',
      'Use mechanical handling aids',
      'Train employees in safe lifting techniques',
      'Assess individual loads and capabilities',
      'Implement team lifting procedures'
    ]
  },
  { 
    id: 3, 
    category: 'Physical', 
    name: 'Working at Height', 
    requiresSeparateAssessment: false,
    suggestedControls: [
      'Use appropriate access equipment',
      'Install edge protection and guardrails',
      'Provide fall protection equipment',
      'Regular inspection of equipment',
      'Training in safe working practices'
    ]
  },
  { 
    id: 4, 
    category: 'Physical', 
    name: 'Equipment and Machinery', 
    requiresSeparateAssessment: false,
    suggestedControls: [
      'Install appropriate machine guarding',
      'Implement lock-out/tag-out procedures',
      'Regular maintenance and inspection',
      'Provide training on safe operation',
      'Emergency stop procedures'
    ]
  },
  { 
    id: 5, 
    category: 'Physical', 
    name: 'Noise', 
    requiresSeparateAssessment: true,
    separateAssessmentNote: 'Control of Noise at Work Regulations may require noise assessment',
    suggestedControls: [
      'Reduce noise at source where possible',
      'Provide hearing protection',
      'Limit exposure time',
      'Regular audiometric testing',
      'Noise control engineering measures'
    ]
  },
  { 
    id: 6, 
    category: 'Physical', 
    name: 'Vibration', 
    requiresSeparateAssessment: true,
    separateAssessmentNote: 'Control of Vibration at Work Regulations may require assessment',
    suggestedControls: [
      'Use anti-vibration tools and equipment',
      'Job rotation to limit exposure',
      'Regular rest breaks',
      'Health surveillance',
      'Maintenance of equipment'
    ]
  },
  { 
    id: 7, 
    category: 'Chemical', 
    name: 'Harmful Substances', 
    requiresSeparateAssessment: true,
    separateAssessmentNote: 'COSHH Regulations require separate assessment',
    suggestedControls: [
      'Substitute with safer alternatives',
      'Provide appropriate PPE',
      'Ensure adequate ventilation',
      'Safe storage and handling procedures',
      'Emergency procedures for spills'
    ]
  },
  { 
    id: 8, 
    category: 'Workplace', 
    name: 'Display Screen Equipment', 
    requiresSeparateAssessment: false,
    suggestedControls: [
      'Conduct DSE workstation assessments',
      'Provide adjustable furniture',
      'Ensure regular breaks from screen work',
      'Provide eye tests',
      'Training on proper posture'
    ]
  },
  { 
    id: 9, 
    category: 'Physical', 
    name: 'Electrical Safety', 
    requiresSeparateAssessment: false,
    suggestedControls: [
      'Regular PAT testing of equipment',
      'Use of RCD protection',
      'Visual inspections of equipment',
      'Qualified electricians for installations',
      'Emergency isolation procedures'
    ]
  },
  { 
    id: 10, 
    category: 'Workplace', 
    name: 'Fire Safety', 
    requiresSeparateAssessment: true,
    separateAssessmentNote: 'Fire Risk Assessment required under Fire Safety Order',
    suggestedControls: [
      'Install fire detection systems',
      'Provide appropriate extinguishers',
      'Clear evacuation routes',
      'Regular fire drills',
      'Staff training on procedures'
    ]
  },
  { 
    id: 11, 
    category: 'Physical', 
    name: 'Workplace Transport', 
    requiresSeparateAssessment: true,
    separateAssessmentNote: 'May require detailed transport risk assessment',
    suggestedControls: [
      'Segregate pedestrians and vehicles',
      'Implement speed limits',
      'Reversing procedures and banksmen',
      'High-visibility clothing',
      'Regular vehicle maintenance'
    ]
  },
  { 
    id: 12, 
    category: 'Psychosocial', 
    name: 'Work-related Stress', 
    requiresSeparateAssessment: false,
    suggestedControls: [
      'Reasonable workload management',
      'Provide support systems',
      'Clear communication of expectations',
      'Flexible working arrangements',
      'Stress awareness training'
    ]
  },
  { 
    id: 13, 
    category: 'Physical', 
    name: 'Gas Safety', 
    requiresSeparateAssessment: true,
    separateAssessmentNote: 'Gas Safety Regulations require specialist assessment',
    suggestedControls: [
      'Regular gas appliance servicing',
      'Carbon monoxide detection',
      'Emergency shut-off procedures',
      'Ventilation requirements',
      'Competent person installations'
    ]
  },
  { 
    id: 14, 
    category: 'Specialist', 
    name: 'Confined Spaces', 
    requiresSeparateAssessment: true,
    separateAssessmentNote: 'Confined Spaces Regulations require permit-to-work system',
    suggestedControls: [
      'Permit to work system',
      'Atmospheric monitoring',
      'Emergency rescue procedures',
      'Trained and competent personnel',
      'Communication systems'
    ]
  },
  { 
    id: 15, 
    category: 'Specialist', 
    name: 'Pressure Equipment', 
    requiresSeparateAssessment: true,
    separateAssessmentNote: 'Pressure Equipment Regulations require written scheme',
    suggestedControls: [
      'Written scheme of examination',
      'Regular thorough examination',
      'Pressure relief systems',
      'Competent operator training',
      'Safe operating procedures'
    ]
  }
];

export default function CreateStandardRiskAssessmentPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    orgGroup: '',
    activity: '',
    riskMatrixType: '5x5', // Default to 5x5
    peopleAtRisk: [] as Array<{type: 'person' | 'group', value: string, id: string}>,
    assetsAtRisk: [] as Array<{type: 'asset' | 'category', value: string, id: string}>,
    environmentalDamage: [] as Array<{type: 'damage' | 'impact', value: string, id: string}>
  });

  // Modal states
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showOrgGroupModal, setShowOrgGroupModal] = useState(false);
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const [showAssetsModal, setShowAssetsModal] = useState(false);
  const [showEnvironmentalModal, setShowEnvironmentalModal] = useState(false);
  const [customGroup, setCustomGroup] = useState('');
  const [customAsset, setCustomAsset] = useState('');
  const [customEnvironmental, setCustomEnvironmental] = useState('');

  // Advanced features toggle
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false);
  const [showAdvancedPanel, setShowAdvancedPanel] = useState(false);
  const [advancedFeatures, setAdvancedFeatures] = useState({
    assetsAtRisk: false,
    environmentalDamage: false,
    controlMeasureScoring: false,
    residualRiskCalc: false,
    howOftenUndertaken: false,
    scoreCurrentControls: false,
    linkDocumentsProcesses: false,
    buildInduction: false
  });

  // Hazards state
  const [selectedHazards, setSelectedHazards] = useState<number[]>([]);
  const [expandedHazards, setExpandedHazards] = useState<number[]>([]);
  const [hazardControls, setHazardControls] = useState<{[key: number]: {
    suggested: {control: string, importance: number}[], 
    custom: {control: string, importance: number}[],
    requiresSeparateAssessment: boolean
  }}>({});

  // Navigation sections
  const sections = [
    { id: 1, name: 'Assessment Type', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'upcoming' },
    { id: 2, name: 'Basic Information', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'upcoming' },
    { id: 3, name: 'Hazards', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'upcoming' },
    { id: 4, name: 'Control Measures', status: 'upcoming' },
    { id: 5, name: 'Risk Scoring', status: 'upcoming' },
    { id: 6, name: 'Review & Submit', status: 'upcoming' }
  ];

  const canNavigateToSection = (sectionId: number) => {
    // Can always go back to previous sections
    if (sectionId < currentStep) return true;
    // Can only go forward if previous steps are complete
    if (sectionId === 2 && selectedType) return true;
    if (sectionId === 3 && formData.title && formData.activity) return true;
    return false;
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedType) {
      setCurrentStep(2);
    } else if (currentStep === 2 && formData.title && formData.activity) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSectionClick = (sectionId: number) => {
    if (canNavigateToSection(sectionId)) {
      setCurrentStep(sectionId);
    }
  };

  const handleAddPerson = (person: {type: 'person' | 'group', value: string, id: string}) => {
    setFormData({
      ...formData,
      peopleAtRisk: [...formData.peopleAtRisk, person]
    });
  };

  const handleRemovePerson = (id: string) => {
    setFormData({
      ...formData,
      peopleAtRisk: formData.peopleAtRisk.filter(p => p.id !== id)
    });
  };

  const handleAddAsset = (asset: {type: 'asset' | 'category', value: string, id: string}) => {
    setFormData({
      ...formData,
      assetsAtRisk: [...formData.assetsAtRisk, asset]
    });
  };

  const handleRemoveAsset = (id: string) => {
    setFormData({
      ...formData,
      assetsAtRisk: formData.assetsAtRisk.filter(a => a.id !== id)
    });
  };

  const handleAddEnvironmental = (damage: {type: 'damage' | 'impact', value: string, id: string}) => {
    setFormData({
      ...formData,
      environmentalDamage: [...formData.environmentalDamage, damage]
    });
  };

  const handleRemoveEnvironmental = (id: string) => {
    setFormData({
      ...formData,
      environmentalDamage: formData.environmentalDamage.filter(e => e.id !== id)
    });
  };

  // Mock data for locations and org groups
  const locations = [
    { id: '1', name: 'Main Office', type: 'Office' },
    { id: '2', name: 'Warehouse A', type: 'Warehouse' },
    { id: '3', name: 'Manufacturing Plant', type: 'Factory' },
    { id: '4', name: 'Construction Site 1', type: 'Construction' },
    { id: '5', name: 'Remote Office', type: 'Office' },
  ];

  const orgGroups = [
    { id: '1', name: 'Operations', description: 'Operational departments' },
    { id: '2', name: 'Administration', description: 'Administrative functions' },
    { id: '3', name: 'Engineering', description: 'Engineering and technical teams' },
    { id: '4', name: 'Safety & Compliance', description: 'Health, safety and compliance' },
    { id: '5', name: 'Facilities', description: 'Facilities management' },
  ];

  // Mock data for people
  const people = [
    { id: '1', name: 'John Smith', role: 'Site Manager' },
    { id: '2', name: 'Sarah Johnson', role: 'Safety Officer' },
    { id: '3', name: 'Mike Wilson', role: 'Operator' },
    { id: '4', name: 'Emma Davis', role: 'Supervisor' },
    { id: '5', name: 'Tom Brown', role: 'Engineer' },
  ];

  const commonGroups = [
    'All Employees',
    'Contractors',
    'Visitors',
    'Maintenance Staff',
    'Office Workers',
    'Production Staff',
    'Management Team',
    'Cleaning Staff',
    'Security Personnel',
    'Emergency Response Team'
  ];

  // Mock data for assets
  const assets = [
    { id: '1', name: 'Forklift FLT-001', category: 'Equipment' },
    { id: '2', name: 'Main Server Room', category: 'IT Infrastructure' },
    { id: '3', name: 'Company Vehicles', category: 'Fleet' },
    { id: '4', name: 'Production Line A', category: 'Machinery' },
    { id: '5', name: 'Chemical Storage Unit', category: 'Storage' },
  ];

  const assetCategories = [
    'Buildings & Infrastructure',
    'Production Equipment',
    'IT Systems & Data',
    'Company Vehicles',
    'Tools & Small Equipment',
    'Raw Materials',
    'Finished Products',
    'Office Equipment',
    'Safety Equipment',
    'Environmental Control Systems'
  ];

  // Mock data for environmental impacts
  const commonEnvironmentalRisks = [
    'Chemical spills or leaks',
    'Air emissions/pollution',
    'Water contamination',
    'Soil contamination',
    'Noise pollution',
    'Waste generation',
    'Energy consumption',
    'Habitat disruption',
    'Light pollution',
    'Hazardous material release'
  ];

  const renderStep1 = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Choose Your Risk Assessment Type</h2>
        <p className="text-gray-600 text-sm mt-1">Select the type of risk assessment that best fits your needs</p>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {riskAssessmentTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                selectedType === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <h3 className="font-medium text-gray-900">{type.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 border-t border-gray-200 flex justify-between">
        <button 
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          onClick={() => router.push('/risk-assessments/new')}
        >
          Cancel
        </button>
        <button 
          style={{ 
            backgroundColor: '#3d3a72', 
            color: '#ffffff', 
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontWeight: '500',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'opacity 0.2s'
          }} 
          className="hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNext}
          disabled={!selectedType}
        >
          Next Step
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Risk Assessment Details</h2>
            <p className="text-gray-600 text-sm mt-1">Provide the basic information about your risk assessment</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Advanced Features</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showAdvancedFeatures}
                onChange={(e) => {
                  setShowAdvancedFeatures(e.target.checked);
                  setShowAdvancedPanel(e.target.checked);
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Advanced Features Panel */}
      {showAdvancedPanel && (
        <div className="p-6 bg-blue-50 border-b border-blue-200">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Advanced Features</h3>
            <p className="text-sm text-blue-700">Enable additional features for your risk assessment</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={advancedFeatures.assetsAtRisk}
                onChange={(e) => setAdvancedFeatures({...advancedFeatures, assetsAtRisk: e.target.checked})}
                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Assets at Risk</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={advancedFeatures.environmentalDamage}
                onChange={(e) => setAdvancedFeatures({...advancedFeatures, environmentalDamage: e.target.checked})}
                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Environmental Damage</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={advancedFeatures.controlMeasureScoring}
                onChange={(e) => setAdvancedFeatures({...advancedFeatures, controlMeasureScoring: e.target.checked})}
                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Control Measure Scoring</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={advancedFeatures.residualRiskCalc}
                onChange={(e) => setAdvancedFeatures({...advancedFeatures, residualRiskCalc: e.target.checked})}
                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Residual Risk Calculation</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={advancedFeatures.howOftenUndertaken}
                onChange={(e) => setAdvancedFeatures({...advancedFeatures, howOftenUndertaken: e.target.checked})}
                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">How Often Undertaken</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={advancedFeatures.scoreCurrentControls}
                onChange={(e) => setAdvancedFeatures({...advancedFeatures, scoreCurrentControls: e.target.checked})}
                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Score Current Controls</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={advancedFeatures.linkDocumentsProcesses}
                onChange={(e) => setAdvancedFeatures({...advancedFeatures, linkDocumentsProcesses: e.target.checked})}
                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Link Documents & Processes</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={advancedFeatures.buildInduction}
                onChange={(e) => setAdvancedFeatures({...advancedFeatures, buildInduction: e.target.checked})}
                className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Build Induction</span>
            </label>
          </div>
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assessment Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter a descriptive title for this risk assessment"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
          />
        </div>

        {/* Location and Org Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <button
              type="button"
              onClick={() => setShowLocationModal(true)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {formData.location || 'Click to select location...'}
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Organization Group *
            </label>
            <button
              type="button"
              onClick={() => setShowOrgGroupModal(true)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {formData.orgGroup || 'Click to select organization group...'}
            </button>
          </div>
        </div>

        {/* Risk Matrix Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Risk Matrix Type
          </label>
          <select
            value={formData.riskMatrixType}
            onChange={(e) => setFormData({ ...formData, riskMatrixType: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="5x5">5x5 Matrix (Standard)</option>
            <option value="3x3">3x3 Matrix (Simplified)</option>
            <option value="high-med-low">High/Medium/Low (Basic)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Choose the risk scoring method that best fits your assessment needs
          </p>
        </div>

        {/* Activity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Description *
          </label>
          <textarea
            value={formData.activity}
            onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
            placeholder="Describe the activity or process being assessed"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
          />
        </div>

        {/* People at Risk */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            People at Risk
          </label>
          <div className="space-y-2">
            {formData.peopleAtRisk.map((person) => (
              <div key={person.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                <span className="text-sm">
                  {person.type === 'person' ? '👤' : '👥'} {person.value}
                </span>
                <button
                  className="text-sm text-gray-600 hover:text-gray-900 ml-auto"
                  onClick={() => handleRemovePerson(person.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
              onClick={() => setShowPeopleModal(true)}
            >
              + Add People at Risk
            </button>
          </div>
        </div>

        {/* Assets at Risk */}
        {(!showAdvancedFeatures || advancedFeatures.assetsAtRisk) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assets at Risk
            </label>
            <div className="space-y-2">
              {formData.assetsAtRisk.map((asset) => (
                <div key={asset.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <span className="text-sm">
                    {asset.type === 'asset' ? '🏗️' : '📦'} {asset.value}
                  </span>
                  <button
                    className="text-sm text-gray-600 hover:text-gray-900 ml-auto"
                    onClick={() => handleRemoveAsset(asset.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                onClick={() => setShowAssetsModal(true)}
              >
                + Add Assets at Risk
              </button>
            </div>
          </div>
        )}

        {/* Environmental Damage */}
        {(!showAdvancedFeatures || advancedFeatures.environmentalDamage) && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Potential Environmental Damage
            </label>
            <div className="space-y-2">
              {formData.environmentalDamage.map((damage) => (
                <div key={damage.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <span className="text-sm">
                    {damage.type === 'damage' ? '⚠️' : '🌍'} {damage.value}
                  </span>
                  <button
                    className="text-sm text-gray-600 hover:text-gray-900 ml-auto"
                    onClick={() => handleRemoveEnvironmental(damage.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                onClick={() => setShowEnvironmentalModal(true)}
              >
                + Add Environmental Risk
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="p-6 border-t border-gray-200 flex justify-between">
        <button 
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          onClick={handleBack}
        >
          Back
        </button>
        <div className="flex gap-3">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => router.push('/risk-assessments/new')}
          >
            Cancel
          </button>
          <button 
            style={{ 
              backgroundColor: '#3d3a72', 
              color: '#ffffff', 
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: 'pointer',
              fontSize: '14px',
              transition: 'opacity 0.2s'
            }} 
            className="hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNext}
            disabled={!formData.title || !formData.activity}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );

  const handleHazardToggle = (hazardId: number) => {
    if (selectedHazards.includes(hazardId)) {
      setSelectedHazards(selectedHazards.filter(id => id !== hazardId));
      setExpandedHazards(expandedHazards.filter(id => id !== hazardId));
      const newControls = { ...hazardControls };
      delete newControls[hazardId];
      setHazardControls(newControls);
    } else {
      setSelectedHazards([...selectedHazards, hazardId]);
      const hazard = commonHazards.find(h => h.id === hazardId);
      if (hazard) {
        setHazardControls({
          ...hazardControls,
          [hazardId]: { 
            suggested: hazard.suggestedControls.map(control => ({ control, importance: 3 })), // Default importance: Medium (3)
            custom: [],
            requiresSeparateAssessment: false
          }
        });
      }
    }
  };

  const handleHazardExpand = (hazardId: number) => {
    if (expandedHazards.includes(hazardId)) {
      setExpandedHazards(expandedHazards.filter(id => id !== hazardId));
    } else {
      setExpandedHazards([...expandedHazards, hazardId]);
    }
  };

  const handleControlImportance = (hazardId: number, controlIndex: number, isCustom: boolean, importance: number) => {
    const controls = hazardControls[hazardId];
    if (!controls) return;

    if (isCustom) {
      const updatedCustom = [...controls.custom];
      updatedCustom[controlIndex].importance = importance;
      setHazardControls({
        ...hazardControls,
        [hazardId]: { ...controls, custom: updatedCustom }
      });
    } else {
      const updatedSuggested = [...controls.suggested];
      updatedSuggested[controlIndex].importance = importance;
      setHazardControls({
        ...hazardControls,
        [hazardId]: { ...controls, suggested: updatedSuggested }
      });
    }
  };

  const handleAddCustomControl = (hazardId: number, control: string) => {
    if (!control.trim()) return;
    
    const controls = hazardControls[hazardId];
    if (!controls) return;

    setHazardControls({
      ...hazardControls,
      [hazardId]: { 
        ...controls, 
        custom: [...controls.custom, { control, importance: 3 }] // Default importance: Medium
      }
    });
  };

  const handleRemoveCustomControl = (hazardId: number, index: number) => {
    const controls = hazardControls[hazardId];
    if (!controls) return;

    setHazardControls({
      ...hazardControls,
      [hazardId]: { 
        ...controls, 
        custom: controls.custom.filter((_, i) => i !== index) 
      }
    });
  };

  const handleSeparateAssessmentToggle = (hazardId: number) => {
    const controls = hazardControls[hazardId];
    if (!controls) return;

    setHazardControls({
      ...hazardControls,
      [hazardId]: { 
        ...controls, 
        requiresSeparateAssessment: !controls.requiresSeparateAssessment
      }
    });
  };

  const handleSave = async () => {
    try {
      // Validate required fields
      if (!formData.title || !formData.activity) {
        alert('Please fill in all required fields');
        return;
      }

      // Prepare assessment data
      const assessmentData = {
        type: selectedType,
        title: formData.title,
        location: formData.location,
        orgGroup: formData.orgGroup,
        activity: formData.activity,
        riskMatrixType: formData.riskMatrixType,
        peopleAtRisk: formData.peopleAtRisk,
        assetsAtRisk: formData.assetsAtRisk,
        environmentalDamage: formData.environmentalDamage,
        hazards: selectedHazards,
        controls: hazardControls
      };

      // Save to API
      const response = await fetch('/api/risk-assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-userarea-id': '1',
          'x-user-id': '1'
        },
        body: JSON.stringify(assessmentData)
      });

      if (!response.ok) throw new Error('Failed to save assessment');

      // Navigate back or show success message
      router.push('/risk-assessments');
    } catch (error) {
      console.error('Error saving assessment:', error);
      alert('Failed to save assessment. Please try again.');
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate step 1 fields
      if (!selectedType || !formData.title || !formData.activity) {
        alert('Please complete all required fields before proceeding.');
        return;
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit on step 3
      handleSave();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Function to get hazard icon SVG
  const getHazardIcon = (hazardName: string) => {
    const iconMap: {[key: string]: React.JSX.Element} = {
      'Slips and Trips': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      'Manual Handling': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 21v-7" />
        </svg>
      ),
      'Working at Height': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7l4-4m0 0l4 4m-4-4v18" />
        </svg>
      ),
      'Equipment and Machinery': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      'Noise': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
        </svg>
      ),
      'Vibration': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16l4-8 4 8V4M6 8h12M6 16h12" />
        </svg>
      ),
      'Harmful Substances': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      'Display Screen Equipment': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      'Electrical Safety': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      'Fire Safety': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
        </svg>
      ),
      'Workplace Transport': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M16 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0M7 12h2m6 0h2M5 17h14a2 2 0 0 0 2 -2v-3a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v3a2 2 0 0 0 2 2z" />
        </svg>
      ),
      'Work-related Stress': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      'Gas Safety': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
        </svg>
      ),
      'Confined Spaces': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      'Pressure Equipment': (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z M8 12a4 4 0 118 0" />
        </svg>
      )
    };
    
    return iconMap[hazardName] || (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    );
  };

  const renderStep3 = () => {
    const categories = [...new Set(commonHazards.map(h => h.category))];
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Identify Hazards</h2>
          <p className="text-gray-600 text-sm mt-1">Select all hazards that apply to this activity based on HSE guidelines</p>
        </div>
        <div className="p-6 space-y-6">
          {/* Hazard Selection */}
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-4">Common Workplace Hazards</h3>
            {categories.map(category => (
              <div key={category} className="mb-6">
                <h4 className="text-sm font-semibold text-gray-600 uppercase mb-3">{category} Hazards</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {commonHazards
                    .filter(h => h.category === category)
                    .map(hazard => (
                      <div key={hazard.id} className="relative">
                        <label
                          className={`flex items-start p-3 rounded-lg border cursor-pointer transition-all min-h-[80px] ${
                            selectedHazards.includes(hazard.id)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedHazards.includes(hazard.id)}
                            onChange={() => handleHazardToggle(hazard.id)}
                            className="sr-only"
                          />
                          <div className={`mr-3 mt-0.5 ${
                            selectedHazards.includes(hazard.id) ? 'text-blue-600' : 'text-gray-500'
                          }`}>
                            {getHazardIcon(hazard.name)}
                          </div>
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex items-start justify-between">
                              <span className={`text-sm ${
                                selectedHazards.includes(hazard.id) ? 'font-medium text-blue-900' : 'text-gray-700'
                              }`}>
                                {hazard.name}
                              </span>
                              {selectedHazards.includes(hazard.id) && (
                                <svg className="w-5 h-5 ml-2 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            <div className="mt-2 flex justify-end">
                              {hazard.requiresSeparateAssessment ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                                  May require separate assessment
                                </span>
                              ) : (
                                <span className="h-5"></span>
                              )}
                            </div>
                          </div>
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Hazards with Control Measures */}
          {selectedHazards.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-base font-medium text-gray-700 mb-4">
                Selected Hazards & Control Measures ({selectedHazards.length})
              </h3>
              <div className="space-y-3">
                {selectedHazards.map(hazardId => {
                  const hazard = commonHazards.find(h => h.id === hazardId);
                  if (!hazard) return null;
                  const isExpanded = expandedHazards.includes(hazardId);
                  const controls = hazardControls[hazardId];

                  return (
                    <div
                      key={hazardId}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => handleHazardExpand(hazardId)}
                        className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div className={`mr-3 ${isExpanded ? 'text-blue-600' : 'text-gray-500'}`}>
                            {getHazardIcon(hazard.name)}
                          </div>
                          <div className="text-left">
                            <h4 className="font-medium text-gray-900">{hazard.name}</h4>
                            <p className="text-xs text-gray-500 mt-1">{hazard.category}</p>
                          </div>
                        </div>
                        <svg
                          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {isExpanded && controls && (
                        <div className="p-4 bg-white border-t border-gray-200">
                          {/* Separate Assessment Toggle */}
                          {hazard.requiresSeparateAssessment && (
                            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                              <label className="flex items-center justify-between">
                                <div>
                                  <h6 className="text-sm font-medium text-gray-900">Requires Separate Assessment</h6>
                                  <p className="text-xs text-gray-600 mt-1">{hazard.separateAssessmentNote}</p>
                                </div>
                                <div className="ml-4">
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                      type="checkbox"
                                      checked={controls.requiresSeparateAssessment}
                                      onChange={() => handleSeparateAssessmentToggle(hazardId)}
                                      className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                  </label>
                                </div>
                              </label>
                            </div>
                          )}

                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-3">Suggested Control Measures</h5>
                            <div className="space-y-3">
                              {controls.suggested.map((item, index) => (
                                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-start justify-between mb-2">
                                    <span className="text-sm text-gray-700 flex-1">{item.control}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">Importance:</span>
                                    <div className="flex gap-1">
                                      {[1, 2, 3, 4, 5].map((level) => (
                                        <button
                                          key={level}
                                          onClick={() => handleControlImportance(hazardId, index, false, level)}
                                          className={`w-6 h-6 rounded text-xs font-medium transition-colors ${
                                            item.importance === level
                                              ? level <= 2 ? 'bg-green-500 text-white' : level === 3 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                                              : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                          }`}
                                        >
                                          {level}
                                        </button>
                                      ))}
                                    </div>
                                    <span className="text-xs text-gray-500 ml-2">
                                      {item.importance <= 2 ? 'Low' : item.importance === 3 ? 'Medium' : 'High'}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium text-gray-700 mb-3">Additional Control Measures</h5>
                            <div className="space-y-3">
                              {controls.custom.map((item, index) => (
                                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                                  <div className="flex items-start justify-between mb-2">
                                    <span className="text-sm text-gray-700 flex-1">{item.control}</span>
                                    <button
                                      className="text-sm text-gray-600 hover:text-gray-900"
                                      onClick={() => handleRemoveCustomControl(hazardId, index)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-500">Importance:</span>
                                    <div className="flex gap-1">
                                      {[1, 2, 3, 4, 5].map((level) => (
                                        <button
                                          key={level}
                                          onClick={() => handleControlImportance(hazardId, index, true, level)}
                                          className={`w-6 h-6 rounded text-xs font-medium transition-colors ${
                                            item.importance === level
                                              ? level <= 2 ? 'bg-green-500 text-white' : level === 3 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                                              : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                          }`}
                                        >
                                          {level}
                                        </button>
                                      ))}
                                    </div>
                                    <span className="text-xs text-gray-500 ml-2">
                                      {item.importance <= 2 ? 'Low' : item.importance === 3 ? 'Medium' : 'High'}
                                    </span>
                                  </div>
                                </div>
                              ))}
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Add custom control measure"
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      const input = e.target as HTMLInputElement;
                                      handleAddCustomControl(hazardId, input.value);
                                      input.value = '';
                                    }
                                  }}
                                />
                                <button
                                  className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50"
                                  onClick={() => {
                                    const input = document.querySelector(`input[placeholder="Add custom control measure"]`) as HTMLInputElement;
                                    if (input) {
                                      handleAddCustomControl(hazardId, input.value);
                                      input.value = '';
                                    }
                                  }}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-between">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={handleBack}
          >
            Back
          </button>
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => router.push('/risk-assessments/new')}
            >
              Cancel
            </button>
            <button 
              style={{ 
                backgroundColor: '#3d3a72', 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }} 
              className="hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedHazards.length === 0}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full px-8 py-4 lg:px-12 xl:px-16">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" style={{ margin: 0 }}>Create Standard Risk Assessment</h1>
              <p className="text-gray-600 mt-1">Complete a comprehensive multi-step risk assessment</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                style={{ 
                  backgroundColor: '#3d3a72', 
                  color: '#ffffff', 
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'opacity 0.2s'
                }} 
                className="hover:opacity-80"
              >
                Save Assessment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 py-8 lg:px-12 xl:px-16 space-y-6">
        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Assessment Progress</h2>
            <span className="text-sm text-gray-600">Step {currentStep} of 3</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(currentStep / 3) * 100}%`,
                backgroundColor: '#3d3a72'
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span className={currentStep >= 1 ? 'font-medium' : ''}>Basic Information</span>
            <span className={currentStep >= 2 ? 'font-medium' : ''}>Risk Analysis</span>
            <span className={currentStep >= 3 ? 'font-medium' : ''}>Review & Submit</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>

          {/* Navigation Buttons */}
          <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
              className={`px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                currentStep === 1 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextStep}
              style={{ 
                backgroundColor: currentStep === 3 ? '#e77726' : '#3d3a72', 
                color: '#ffffff', 
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'opacity 0.2s'
              }} 
              className="hover:opacity-80"
            >
              {currentStep === 3 ? 'Submit Assessment' : 'Next Step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}