// Standard Workplace Hazards Library
// This is a temporary implementation using local constants
// TODO: Migrate to database-driven approach with [V7].[StandardHazardLibrary] table

export interface StandardHazard {
  id: number;
  code: string;
  category: string;
  name: string;
  description?: string;
  suggestedControls?: string[];
  requiresSeparateAssessment?: boolean;
  separateAssessmentNote?: string;
}

export const HAZARD_CATEGORIES = {
  PHYSICAL: 'Physical',
  CHEMICAL: 'Chemical',
  BIOLOGICAL: 'Biological',
  ENVIRONMENTAL: 'Environmental',
  ELECTRICAL: 'Electrical',
  ERGONOMIC: 'Ergonomic',
  FIRE: 'Fire',
  PSYCHOSOCIAL: 'Psychosocial'
} as const;

export type HazardCategory = typeof HAZARD_CATEGORIES[keyof typeof HAZARD_CATEGORIES];

// Standard 22 workplace hazards as per UK HSE guidelines
export const STANDARD_WORKPLACE_HAZARDS: StandardHazard[] = [
  // Physical Hazards (6)
  {
    id: 1,
    code: 'STD-PHY-001',
    category: HAZARD_CATEGORIES.PHYSICAL,
    name: 'Slips, Trips & Falls',
    description: 'Wet floors, uneven surfaces, obstacles in walkways, poor lighting, trailing cables',
    suggestedControls: [
      'Regular housekeeping and cleaning schedules',
      'Install non-slip flooring in high-risk areas',
      'Ensure adequate lighting in all areas',
      'Keep walkways clear of obstacles',
      'Use warning signs for wet floors',
      'Secure trailing cables and wires'
    ]
  },
  {
    id: 2,
    code: 'STD-PHY-002',
    category: HAZARD_CATEGORIES.PHYSICAL,
    name: 'Manual Handling',
    description: 'Lifting, carrying, pushing, pulling heavy or awkward loads',
    requiresSeparateAssessment: true,
    separateAssessmentNote: 'Use TILE, MAC, RAPP, REBA or RULA assessment tools for detailed analysis',
    suggestedControls: [
      'Provide manual handling training',
      'Use mechanical aids where possible',
      'Implement team lifting for heavy items',
      'Reduce load weights',
      'Improve storage layout to minimise carrying distances',
      'Rotate tasks to prevent repetitive strain'
    ]
  },
  {
    id: 3,
    code: 'STD-PHY-003',
    category: HAZARD_CATEGORIES.PHYSICAL,
    name: 'Working at Height',
    description: 'Work on ladders, scaffolds, roofs, or elevated platforms',
    suggestedControls: [
      'Use appropriate access equipment',
      'Install guardrails and barriers',
      'Provide safety harnesses and fall arrest systems',
      'Ensure proper training and competence',
      'Implement permit to work system',
      'Regular inspection of equipment'
    ]
  },
  {
    id: 4,
    code: 'STD-PHY-004',
    category: HAZARD_CATEGORIES.PHYSICAL,
    name: 'Machinery & Equipment',
    description: 'Moving parts, sharp edges, entanglement risks, crushing hazards',
    suggestedControls: [
      'Install machine guards and safety devices',
      'Implement lock-out/tag-out procedures',
      'Provide appropriate PPE',
      'Regular maintenance and inspection',
      'Clear operating procedures',
      'Operator training and certification'
    ]
  },
  {
    id: 5,
    code: 'STD-PHY-005',
    category: HAZARD_CATEGORIES.PHYSICAL,
    name: 'Vehicles & Driving',
    description: 'Workplace transport, forklift operations, delivery vehicles, car park safety',
    suggestedControls: [
      'Separate pedestrian and vehicle routes',
      'Speed limits and traffic management',
      'Visibility aids and warning systems',
      'Driver training and assessment',
      'Vehicle maintenance schedules',
      'Loading/unloading procedures'
    ]
  },
  {
    id: 6,
    code: 'STD-PHY-006',
    category: HAZARD_CATEGORIES.PHYSICAL,
    name: 'Struck by Objects',
    description: 'Falling objects, flying debris, moving materials',
    suggestedControls: [
      'Secure storage of materials at height',
      'Use of tool lanyards',
      'Protective barriers and nets',
      'Hard hat zones',
      'Exclusion zones during lifting operations',
      'Regular inspection of storage systems'
    ]
  },

  // Chemical Hazards (3)
  {
    id: 7,
    code: 'STD-CHM-001',
    category: HAZARD_CATEGORIES.CHEMICAL,
    name: 'Hazardous Substances',
    description: 'Cleaning chemicals, solvents, acids, alkalis, toxic materials',
    suggestedControls: [
      'COSHH assessments for all chemicals',
      'Proper storage and labeling',
      'Provide appropriate PPE',
      'Ventilation and extraction systems',
      'Spill kits and emergency procedures',
      'Training on safe handling'
    ]
  },
  {
    id: 8,
    code: 'STD-CHM-002',
    category: HAZARD_CATEGORIES.CHEMICAL,
    name: 'Dust & Fumes',
    description: 'Wood dust, silica dust, welding fumes, exhaust emissions',
    suggestedControls: [
      'Local exhaust ventilation (LEV)',
      'Respiratory protective equipment',
      'Dust suppression systems',
      'Regular air quality monitoring',
      'Health surveillance program',
      'Minimize exposure time'
    ]
  },
  {
    id: 9,
    code: 'STD-CHM-003',
    category: HAZARD_CATEGORIES.CHEMICAL,
    name: 'Asbestos',
    description: 'Asbestos-containing materials in buildings',
    requiresSeparateAssessment: true,
    separateAssessmentNote: 'Requires specialist asbestos survey and management plan',
    suggestedControls: [
      'Asbestos register and management plan',
      'Regular inspections',
      'Control access to affected areas',
      'Use licensed contractors for removal',
      'Awareness training for all staff',
      'Emergency procedures'
    ]
  },

  // Biological Hazards (2)
  {
    id: 10,
    code: 'STD-BIO-001',
    category: HAZARD_CATEGORIES.BIOLOGICAL,
    name: 'Bacteria & Viruses',
    description: 'Legionella, infectious diseases, contamination risks',
    suggestedControls: [
      'Water system management and testing',
      'Hygiene facilities and procedures',
      'Vaccination programs where appropriate',
      'Isolation procedures',
      'PPE for high-risk activities',
      'Waste disposal procedures'
    ]
  },
  {
    id: 11,
    code: 'STD-BIO-002',
    category: HAZARD_CATEGORIES.BIOLOGICAL,
    name: 'Mold & Fungi',
    description: 'Damp conditions leading to mold growth',
    suggestedControls: [
      'Control humidity and ventilation',
      'Regular building maintenance',
      'Prompt repair of water damage',
      'Professional remediation if found',
      'Health monitoring for exposed workers',
      'PPE during cleaning'
    ]
  },

  // Environmental Hazards (4)
  {
    id: 12,
    code: 'STD-ENV-001',
    category: HAZARD_CATEGORIES.ENVIRONMENTAL,
    name: 'Noise',
    description: 'Excessive noise from machinery, equipment, or processes',
    suggestedControls: [
      'Noise assessments and monitoring',
      'Engineering controls to reduce noise',
      'Hearing protection zones',
      'Provide appropriate hearing protection',
      'Health surveillance (audiometry)',
      'Limit exposure duration'
    ]
  },
  {
    id: 13,
    code: 'STD-ENV-002',
    category: HAZARD_CATEGORIES.ENVIRONMENTAL,
    name: 'Vibration',
    description: 'Hand-arm vibration from tools, whole-body vibration from vehicles',
    suggestedControls: [
      'Vibration assessments',
      'Low-vibration tools and equipment',
      'Anti-vibration gloves',
      'Job rotation to limit exposure',
      'Health surveillance program',
      'Maintenance of equipment'
    ]
  },
  {
    id: 14,
    code: 'STD-ENV-003',
    category: HAZARD_CATEGORIES.ENVIRONMENTAL,
    name: 'Temperature Extremes',
    description: 'Working in very hot or cold environments',
    suggestedControls: [
      'Temperature monitoring',
      'Appropriate clothing and PPE',
      'Rest breaks and rotation',
      'Hydration facilities',
      'Acclimatization procedures',
      'Emergency response procedures'
    ]
  },
  {
    id: 15,
    code: 'STD-ENV-004',
    category: HAZARD_CATEGORIES.ENVIRONMENTAL,
    name: 'Poor Lighting',
    description: 'Inadequate, excessive, or poorly positioned lighting',
    suggestedControls: [
      'Lighting surveys and assessments',
      'Upgrade lighting to appropriate levels',
      'Emergency lighting systems',
      'Task lighting where needed',
      'Regular maintenance and cleaning',
      'Reduce glare and shadows'
    ]
  },

  // Electrical Hazards (2)
  {
    id: 16,
    code: 'STD-ELE-001',
    category: HAZARD_CATEGORIES.ELECTRICAL,
    name: 'Electrical Equipment',
    description: 'Faulty wiring, damaged equipment, overloaded circuits',
    suggestedControls: [
      'PAT testing program',
      'Fixed wire testing',
      'Visual inspection procedures',
      'Qualified electricians for repairs',
      'RCD protection',
      'Electrical safety training'
    ]
  },
  {
    id: 17,
    code: 'STD-ELE-002',
    category: HAZARD_CATEGORIES.ELECTRICAL,
    name: 'Static Electricity',
    description: 'Build-up of static charge in certain environments',
    suggestedControls: [
      'Grounding and bonding systems',
      'Anti-static equipment and clothing',
      'Humidity control',
      'Conductive flooring',
      'Regular testing and monitoring',
      'Training on static risks'
    ]
  },

  // Ergonomic Hazards (2)
  {
    id: 18,
    code: 'STD-ERG-001',
    category: HAZARD_CATEGORIES.ERGONOMIC,
    name: 'Display Screen Equipment',
    description: 'Computer workstations, prolonged screen use',
    suggestedControls: [
      'DSE assessments for users',
      'Adjustable furniture and equipment',
      'Regular breaks from screen work',
      'Eye tests for DSE users',
      'Training on correct posture',
      'Document holders and accessories'
    ]
  },
  {
    id: 19,
    code: 'STD-ERG-002',
    category: HAZARD_CATEGORIES.ERGONOMIC,
    name: 'Repetitive Strain',
    description: 'Repetitive movements, awkward postures, forceful exertions',
    suggestedControls: [
      'Task rotation and job design',
      'Ergonomic tools and equipment',
      'Regular breaks and stretching',
      'Workstation adjustments',
      'Early reporting of symptoms',
      'Occupational health referrals'
    ]
  },

  // Fire Hazards (1)
  {
    id: 20,
    code: 'STD-FIR-001',
    category: HAZARD_CATEGORIES.FIRE,
    name: 'Fire & Explosion',
    description: 'Fire risks from ignition sources, fuel, and oxygen',
    requiresSeparateAssessment: true,
    separateAssessmentNote: 'Requires separate fire risk assessment (Standard or PAS79)',
    suggestedControls: [
      'Fire risk assessment',
      'Fire detection and alarm systems',
      'Fire fighting equipment',
      'Emergency evacuation procedures',
      'Fire safety training',
      'Regular drills and maintenance'
    ]
  },

  // Psychosocial Hazards (2)
  {
    id: 21,
    code: 'STD-PSY-001',
    category: HAZARD_CATEGORIES.PSYCHOSOCIAL,
    name: 'Stress & Fatigue',
    description: 'Work-related stress, long hours, shift work, high workload',
    suggestedControls: [
      'Stress risk assessments',
      'Workload management',
      'Flexible working arrangements',
      'Employee assistance programs',
      'Mental health first aiders',
      'Regular 1-to-1 meetings'
    ]
  },
  {
    id: 22,
    code: 'STD-PSY-002',
    category: HAZARD_CATEGORIES.PSYCHOSOCIAL,
    name: 'Lone Working',
    description: 'Working alone or in isolation',
    suggestedControls: [
      'Lone working risk assessment',
      'Check-in procedures',
      'Panic alarms or devices',
      'Regular contact schedule',
      'Emergency procedures',
      'Training on personal safety'
    ]
  }
];

// Helper functions
export const getHazardsByCategory = (category: HazardCategory): StandardHazard[] => {
  return STANDARD_WORKPLACE_HAZARDS.filter(h => h.category === category);
};

export const getHazardsByAssessmentType = (assessmentType: string): StandardHazard[] => {
  switch(assessmentType.toLowerCase()) {
    case 'fire':
      return STANDARD_WORKPLACE_HAZARDS.filter(h => 
        h.category === HAZARD_CATEGORIES.FIRE || 
        h.code.includes('FIR')
      );
    case 'manual-handling':
      return STANDARD_WORKPLACE_HAZARDS.filter(h => 
        h.category === HAZARD_CATEGORIES.ERGONOMIC || 
        h.name.toLowerCase().includes('manual') ||
        h.name.toLowerCase().includes('lifting')
      );
    case 'dse':
    case 'display-screen':
      return STANDARD_WORKPLACE_HAZARDS.filter(h => 
        h.code === 'STD-ERG-001'
      );
    case 'coshh':
    case 'chemical':
      return STANDARD_WORKPLACE_HAZARDS.filter(h => 
        h.category === HAZARD_CATEGORIES.CHEMICAL
      );
    case 'standard':
    default:
      return STANDARD_WORKPLACE_HAZARDS;
  }
};

export const getHazardById = (id: number): StandardHazard | undefined => {
  return STANDARD_WORKPLACE_HAZARDS.find(h => h.id === id);
};

export const getHazardByCode = (code: string): StandardHazard | undefined => {
  return STANDARD_WORKPLACE_HAZARDS.find(h => h.code === code);
};

export const getCategoryCounts = (): Record<string, number> => {
  const counts: Record<string, number> = {};
  STANDARD_WORKPLACE_HAZARDS.forEach(hazard => {
    counts[hazard.category] = (counts[hazard.category] || 0) + 1;
  });
  return counts;
};

// Export categories as array for iteration
export const HAZARD_CATEGORIES_ARRAY = Object.values(HAZARD_CATEGORIES);