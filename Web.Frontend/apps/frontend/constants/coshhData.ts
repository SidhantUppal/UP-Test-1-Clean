// COSHH Assessment Data Constants
// This file contains all dummy data for COSHH assessments
// Will be replaced with API calls when backend is ready

export interface GHSPictogram {
  id: string;
  label: string;
  description: string;
  code: string;
}

export interface PPEType {
  id: string;
  name: string;
  description: string;
}

export interface ControlMeasure {
  id: string;
  category: 'elimination' | 'substitution' | 'engineering' | 'administrative' | 'ppe';
  measure: string;
  importance: number; // 1-5
}

// GHS Hazard Pictograms (GHS01-GHS09)
export const GHS_PICTOGRAMS: GHSPictogram[] = [
  {
    id: 'GHS01',
    label: 'Explosive',
    description: 'Unstable explosives, self-reactive substances',
    code: 'GHS01'
  },
  {
    id: 'GHS02',
    label: 'Flammable',
    description: 'Flammable gases, liquids, solids, aerosols',
    code: 'GHS02'
  },
  {
    id: 'GHS03',
    label: 'Oxidizing',
    description: 'Oxidizing gases, liquids, solids',
    code: 'GHS03'
  },
  {
    id: 'GHS04',
    label: 'Gas Under Pressure',
    description: 'Compressed, liquefied, dissolved gases',
    code: 'GHS04'
  },
  {
    id: 'GHS05',
    label: 'Corrosive',
    description: 'Skin corrosion, serious eye damage, corrosive to metals',
    code: 'GHS05'
  },
  {
    id: 'GHS06',
    label: 'Toxic',
    description: 'Acute toxicity (fatal or toxic)',
    code: 'GHS06'
  },
  {
    id: 'GHS07',
    label: 'Harmful/Irritant',
    description: 'Skin/eye irritation, respiratory irritation',
    code: 'GHS07'
  },
  {
    id: 'GHS08',
    label: 'Health Hazard',
    description: 'Carcinogenicity, respiratory sensitization, reproductive toxicity',
    code: 'GHS08'
  },
  {
    id: 'GHS09',
    label: 'Environmental Hazard',
    description: 'Hazardous to the aquatic environment',
    code: 'GHS09'
  }
];

// Physical States
export const PHYSICAL_STATES = [
  { id: 'solid', label: 'Solid', description: 'Solid form at room temperature' },
  { id: 'liquid', label: 'Liquid', description: 'Liquid form at room temperature' },
  { id: 'gas', label: 'Gas', description: 'Gaseous form at room temperature' },
  { id: 'dust', label: 'Dust', description: 'Fine solid particles' },
  { id: 'fume', label: 'Fume', description: 'Solid particles from condensation' },
  { id: 'vapor', label: 'Vapor', description: 'Gaseous form of normally liquid substances' },
  { id: 'mist', label: 'Mist', description: 'Liquid droplets suspended in air' },
  { id: 'aerosol', label: 'Aerosol', description: 'Suspension of fine particles or droplets' }
];

// Usage Frequency
export const USAGE_FREQUENCIES = [
  { id: 'continuous', label: 'Continuous', description: 'Used continuously throughout the day' },
  { id: 'daily', label: 'Daily', description: 'Used every working day' },
  { id: 'weekly', label: 'Weekly', description: 'Used one or more times per week' },
  { id: 'monthly', label: 'Monthly', description: 'Used one or more times per month' },
  { id: 'occasionally', label: 'Occasionally', description: 'Used less than monthly' },
  { id: 'rarely', label: 'Rarely', description: 'Used very infrequently' }
];

// Routes to Exposure
export const ROUTES_TO_EXPOSURE = [
  { id: 'inhalation', label: 'Inhalation', description: 'Breathing in vapors, fumes, dust' },
  { id: 'skin_contact', label: 'Skin Contact', description: 'Direct contact with skin' },
  { id: 'eye_contact', label: 'Eye Contact', description: 'Splashes or vapors affecting eyes' },
  { id: 'ingestion', label: 'Ingestion', description: 'Accidental swallowing' },
  { id: 'injection', label: 'Injection', description: 'Puncture wounds or cuts' }
];

// Persons at Risk
export const PERSONS_AT_RISK = [
  { id: 'employees', label: 'Employees', description: 'All staff members' },
  { id: 'contractors', label: 'Contractors', description: 'External contractors and workers' },
  { id: 'visitors', label: 'Visitors', description: 'Visitors to the premises' },
  { id: 'public', label: 'Members of Public', description: 'General public who may be affected' },
  { id: 'pregnant', label: 'Pregnant Workers', description: 'Pregnant or nursing mothers' },
  { id: 'young', label: 'Young Persons', description: 'Workers under 18 years' },
  { id: 'vulnerable', label: 'Vulnerable Groups', description: 'Immunocompromised or sensitive individuals' },
  { id: 'cleaners', label: 'Cleaning Staff', description: 'Cleaning and maintenance personnel' },
  { id: 'emergency', label: 'Emergency Services', description: 'First responders and emergency personnel' }
];

// PPE Types
export const PPE_TYPES: PPEType[] = [
  { id: 'safety_glasses', name: 'Safety Glasses', description: 'Eye protection from splashes' },
  { id: 'goggles', name: 'Chemical Goggles', description: 'Sealed eye protection' },
  { id: 'face_shield', name: 'Face Shield', description: 'Full face protection' },
  { id: 'gloves_nitrile', name: 'Nitrile Gloves', description: 'Chemical resistant gloves' },
  { id: 'gloves_latex', name: 'Latex Gloves', description: 'General purpose gloves' },
  { id: 'gloves_pvc', name: 'PVC Gloves', description: 'Heavy duty chemical gloves' },
  { id: 'lab_coat', name: 'Lab Coat', description: 'Body protection' },
  { id: 'apron', name: 'Chemical Apron', description: 'Chemical resistant apron' },
  { id: 'respirator_dust', name: 'Dust Mask', description: 'Particulate protection' },
  { id: 'respirator_half', name: 'Half-Face Respirator', description: 'Vapor and particulate protection' },
  { id: 'respirator_full', name: 'Full-Face Respirator', description: 'Complete respiratory protection' },
  { id: 'safety_boots', name: 'Safety Boots', description: 'Foot protection' },
  { id: 'hearing', name: 'Hearing Protection', description: 'Ear defenders or plugs' }
];

// First Aid Measures
export const FIRST_AID_MEASURES = [
  {
    route: 'inhalation',
    measures: [
      'Remove person to fresh air immediately',
      'Keep person warm and at rest',
      'If breathing is difficult, give oxygen if trained',
      'If not breathing, give artificial respiration',
      'Seek immediate medical attention'
    ]
  },
  {
    route: 'skin_contact',
    measures: [
      'Remove contaminated clothing immediately',
      'Wash skin thoroughly with soap and water for at least 15 minutes',
      'Do not use solvents or thinners',
      'If irritation persists, seek medical attention',
      'Launder contaminated clothing before reuse'
    ]
  },
  {
    route: 'eye_contact',
    measures: [
      'Rinse immediately with plenty of water for at least 15 minutes',
      'Hold eyelids open while rinsing',
      'Remove contact lenses if present and easy to do',
      'Continue rinsing',
      'Seek immediate medical attention'
    ]
  },
  {
    route: 'ingestion',
    measures: [
      'Do NOT induce vomiting unless directed by medical personnel',
      'Rinse mouth with water',
      'Never give anything by mouth to an unconscious person',
      'Keep person warm and at rest',
      'Seek immediate medical attention'
    ]
  }
];

// Fire Extinguisher Types
export const FIRE_EXTINGUISHER_TYPES = [
  { id: 'water_jet', label: 'Water (Jet)', suitable: 'Class A fires (wood, paper, textiles)' },
  { id: 'water_spray', label: 'Water (Spray)', suitable: 'Class A fires, cooling' },
  { id: 'foam', label: 'Foam', suitable: 'Class A & B fires (flammable liquids)' },
  { id: 'dry_powder', label: 'Dry Powder', suitable: 'Class A, B, C fires (including gases)' },
  { id: 'co2', label: 'CO2', suitable: 'Class B fires and electrical' },
  { id: 'wet_chemical', label: 'Wet Chemical', suitable: 'Class F fires (cooking oils)' },
  { id: 'fire_blanket', label: 'Fire Blanket', suitable: 'Small fires, clothing fires' }
];

// Disposal Methods
export const DISPOSAL_METHODS = [
  { id: 'general_waste', label: 'General Waste', description: 'Can be disposed with regular waste' },
  { id: 'specialist', label: 'Specialist Contractor', description: 'Requires licensed waste contractor' },
  { id: 'neutralization', label: 'Neutralization', description: 'Chemical neutralization before disposal' },
  { id: 'incineration', label: 'Incineration', description: 'High temperature incineration required' },
  { id: 'recycling', label: 'Recycling', description: 'Can be recycled or reclaimed' },
  { id: 'return_supplier', label: 'Return to Supplier', description: 'Return to manufacturer/supplier' },
  { id: 'sewage', label: 'Sewage System', description: 'Can be disposed via sewage with treatment' },
  { id: 'landfill', label: 'Special Landfill', description: 'Requires special landfill site' }
];

// Health Surveillance Options
export const HEALTH_SURVEILLANCE_OPTIONS = [
  { id: 'lung_function', label: 'Lung Function Test', frequency: 'Annual', description: 'Spirometry testing' },
  { id: 'skin_check', label: 'Skin Examination', frequency: 'Quarterly', description: 'Dermatological examination' },
  { id: 'blood_test', label: 'Blood Testing', frequency: 'Annual', description: 'Biological monitoring' },
  { id: 'urine_test', label: 'Urine Analysis', frequency: '6 Monthly', description: 'Biological exposure monitoring' },
  { id: 'hearing_test', label: 'Audiometry', frequency: 'Annual', description: 'Hearing assessment' },
  { id: 'vision_test', label: 'Vision Testing', frequency: '2 Years', description: 'Eye examination' },
  { id: 'respiratory', label: 'Respiratory Questionnaire', frequency: 'Annual', description: 'Health questionnaire' },
  { id: 'patch_test', label: 'Patch Testing', frequency: 'As Required', description: 'Allergy testing' }
];

// Sample Control Measures for COSHH
export const COSHH_CONTROL_MEASURES: ControlMeasure[] = [
  // Elimination
  { id: 'cm1', category: 'elimination', measure: 'Eliminate the use of this substance', importance: 5 },
  { id: 'cm2', category: 'elimination', measure: 'Change process to avoid substance use', importance: 5 },
  
  // Substitution
  { id: 'cm3', category: 'substitution', measure: 'Replace with less hazardous substance', importance: 4 },
  { id: 'cm4', category: 'substitution', measure: 'Use substance in less hazardous form', importance: 4 },
  
  // Engineering Controls
  { id: 'cm5', category: 'engineering', measure: 'Install local exhaust ventilation (LEV)', importance: 4 },
  { id: 'cm6', category: 'engineering', measure: 'Use fume cupboard or extraction booth', importance: 4 },
  { id: 'cm7', category: 'engineering', measure: 'Enclose the process', importance: 4 },
  { id: 'cm8', category: 'engineering', measure: 'Automate the process', importance: 3 },
  { id: 'cm9', category: 'engineering', measure: 'Improve general ventilation', importance: 3 },
  
  // Administrative Controls
  { id: 'cm10', category: 'administrative', measure: 'Reduce exposure time', importance: 3 },
  { id: 'cm11', category: 'administrative', measure: 'Reduce number of people exposed', importance: 3 },
  { id: 'cm12', category: 'administrative', measure: 'Implement safe work procedures', importance: 3 },
  { id: 'cm13', category: 'administrative', measure: 'Provide COSHH training', importance: 3 },
  { id: 'cm14', category: 'administrative', measure: 'Display safety data sheets', importance: 2 },
  { id: 'cm15', category: 'administrative', measure: 'Implement permit to work system', importance: 3 },
  { id: 'cm16', category: 'administrative', measure: 'Regular air monitoring', importance: 3 },
  
  // PPE
  { id: 'cm17', category: 'ppe', measure: 'Provide appropriate gloves', importance: 2 },
  { id: 'cm18', category: 'ppe', measure: 'Provide eye protection', importance: 2 },
  { id: 'cm19', category: 'ppe', measure: 'Provide respiratory protection', importance: 2 },
  { id: 'cm20', category: 'ppe', measure: 'Provide protective clothing', importance: 2 }
];

// Precautionary Statements (Common P-codes)
export const PRECAUTIONARY_STATEMENTS = [
  { code: 'P201', statement: 'Obtain special instructions before use' },
  { code: 'P202', statement: 'Do not handle until all safety precautions have been read and understood' },
  { code: 'P210', statement: 'Keep away from heat, hot surfaces, sparks, open flames and other ignition sources' },
  { code: 'P233', statement: 'Keep container tightly closed' },
  { code: 'P240', statement: 'Ground and bond container and receiving equipment' },
  { code: 'P241', statement: 'Use explosion-proof equipment' },
  { code: 'P242', statement: 'Use non-sparking tools' },
  { code: 'P243', statement: 'Take action to prevent static discharges' },
  { code: 'P260', statement: 'Do not breathe dust/fume/gas/mist/vapours/spray' },
  { code: 'P264', statement: 'Wash hands thoroughly after handling' },
  { code: 'P270', statement: 'Do not eat, drink or smoke when using this product' },
  { code: 'P271', statement: 'Use only outdoors or in a well-ventilated area' },
  { code: 'P272', statement: 'Contaminated work clothing should not be allowed out of the workplace' },
  { code: 'P273', statement: 'Avoid release to the environment' },
  { code: 'P280', statement: 'Wear protective gloves/protective clothing/eye protection/face protection' },
  { code: 'P284', statement: 'In case of inadequate ventilation wear respiratory protection' },
  { code: 'P301+P310', statement: 'IF SWALLOWED: Immediately call a POISON CENTER/doctor' },
  { code: 'P302+P352', statement: 'IF ON SKIN: Wash with plenty of water' },
  { code: 'P304+P340', statement: 'IF INHALED: Remove person to fresh air and keep comfortable for breathing' },
  { code: 'P305+P351+P338', statement: 'IF IN EYES: Rinse cautiously with water for several minutes. Remove contact lenses' }
];

// Sample Organizations (dummy data)
export const ORGANIZATIONS = [
  'Head Office',
  'Manufacturing - Site A',
  'Manufacturing - Site B',
  'Warehouse - North',
  'Warehouse - South',
  'Laboratory',
  'Maintenance Department',
  'Quality Control',
  'Research & Development'
];

// Sample Locations (dummy data)
export const LOCATIONS = [
  'Main Building - Ground Floor',
  'Main Building - First Floor',
  'Main Building - Second Floor',
  'Production Hall A',
  'Production Hall B',
  'Chemical Storage Area',
  'Laboratory 1',
  'Laboratory 2',
  'Workshop',
  'Maintenance Bay',
  'Loading Bay',
  'External Storage'
];

// Risk Levels
export const RISK_LEVELS = [
  { id: 'low', label: 'Low', color: 'green', value: 1 },
  { id: 'medium', label: 'Medium', color: 'yellow', value: 2 },
  { id: 'high', label: 'High', color: 'orange', value: 3 },
  { id: 'critical', label: 'Critical', color: 'red', value: 4 }
];

// Storage Conditions
export const STORAGE_CONDITIONS = [
  { id: 'cool_dry', label: 'Cool, dry place' },
  { id: 'ventilated', label: 'Well-ventilated area' },
  { id: 'locked', label: 'Locked storage' },
  { id: 'fireproof', label: 'Fireproof cabinet' },
  { id: 'segregated', label: 'Segregated from incompatibles' },
  { id: 'bunded', label: 'Bunded area' },
  { id: 'refrigerated', label: 'Refrigerated storage' },
  { id: 'dark', label: 'Protected from light' }
];

// Emergency Equipment
export const EMERGENCY_EQUIPMENT = [
  { id: 'eyewash', label: 'Eye Wash Station', location: 'Within 10 seconds walk' },
  { id: 'safety_shower', label: 'Safety Shower', location: 'Within 10 seconds walk' },
  { id: 'spill_kit', label: 'Spill Kit', location: 'In storage area' },
  { id: 'first_aid', label: 'First Aid Kit', location: 'Mounted on wall' },
  { id: 'fire_extinguisher', label: 'Fire Extinguisher', location: 'Near exit' },
  { id: 'fire_blanket', label: 'Fire Blanket', location: 'Near work area' },
  { id: 'emergency_alarm', label: 'Emergency Alarm', location: 'Multiple locations' },
  { id: 'respirator', label: 'Emergency Respirator', location: 'Emergency cabinet' }
];