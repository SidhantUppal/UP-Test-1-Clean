// Mock Risk Assessment Service
// Provides sample Risk Assessments with control measures for Dynamic Risk Assessment system

export interface RiskAssessmentControlMeasure {
  id: string;
  name: string;
  description: string;
  category: string;
  importance?: 'low' | 'medium' | 'high' | 'critical';
  sourceAssessmentId: string;
  sourceAssessmentName: string;
}

export interface RiskAssessment {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  createdDate: Date;
  lastModified: Date;
  createdBy: string;
  location: string;
  controlMeasures: RiskAssessmentControlMeasure[];
  riskRating: 'low' | 'medium' | 'high' | 'very-high';
  version: string;
}

export class MockRiskAssessmentService {
  private static riskAssessments: RiskAssessment[] = [
    {
      id: 'ra-001',
      name: 'Explosive Materials Handling - Main Facility',
      category: 'General',
      description: 'Comprehensive risk assessment for handling and storage of explosive materials',
      status: 'active',
      createdDate: new Date('2024-01-15'),
      lastModified: new Date('2024-12-01'),
      createdBy: 'John Smith',
      location: 'Building A - Production Floor',
      riskRating: 'very-high',
      version: '2.3',
      controlMeasures: [
        {
          id: 'cm-001-01',
          name: 'Static Electricity Control',
          description: 'Maintain humidity levels between 45-65% and use anti-static equipment',
          category: 'environmental',
          importance: 'critical',
          sourceAssessmentId: 'ra-001',
          sourceAssessmentName: 'Explosive Materials Handling'
        },
        {
          id: 'cm-001-02',
          name: 'Temperature Monitoring',
          description: 'Continuous temperature monitoring with automatic alerts above 25°C',
          category: 'environmental',
          importance: 'high',
          sourceAssessmentId: 'ra-001',
          sourceAssessmentName: 'Explosive Materials Handling'
        },
        {
          id: 'cm-001-03',
          name: 'Blast Shields Installation',
          description: 'Install reinforced blast shields between work stations',
          category: 'safety',
          importance: 'critical',
          sourceAssessmentId: 'ra-001',
          sourceAssessmentName: 'Explosive Materials Handling'
        },
        {
          id: 'cm-001-04',
          name: 'Emergency Deluge System',
          description: 'Automatic water deluge system activated by heat/flame detection',
          category: 'safety',
          importance: 'critical',
          sourceAssessmentId: 'ra-001',
          sourceAssessmentName: 'Explosive Materials Handling'
        },
        {
          id: 'cm-001-05',
          name: 'Personnel Certification Check',
          description: 'Verify all personnel have valid explosives handling certification',
          category: 'certification',
          importance: 'high',
          sourceAssessmentId: 'ra-001',
          sourceAssessmentName: 'Explosive Materials Handling'
        }
      ]
    },
    {
      id: 'ra-002',
      name: 'Fire Safety - Propellant Storage',
      category: 'Fire',
      description: 'Fire prevention and control measures for propellant storage areas',
      status: 'active',
      createdDate: new Date('2024-02-20'),
      lastModified: new Date('2024-11-15'),
      createdBy: 'Sarah Johnson',
      location: 'Building C - Storage Bunker',
      riskRating: 'very-high',
      version: '3.1',
      controlMeasures: [
        {
          id: 'cm-002-01',
          name: 'Fire Detection System',
          description: 'Multi-zone smoke, heat, and flame detection with redundancy',
          category: 'safety',
          importance: 'critical',
          sourceAssessmentId: 'ra-002',
          sourceAssessmentName: 'Fire Safety - Propellant Storage'
        },
        {
          id: 'cm-002-02',
          name: 'Automatic Suppression',
          description: 'Inert gas suppression system with manual backup',
          category: 'safety',
          importance: 'critical',
          sourceAssessmentId: 'ra-002',
          sourceAssessmentName: 'Fire Safety - Propellant Storage'
        },
        {
          id: 'cm-002-03',
          name: 'Fire-Rated Barriers',
          description: 'Maintain 4-hour fire-rated walls between storage compartments',
          category: 'procedural',
          importance: 'high',
          sourceAssessmentId: 'ra-002',
          sourceAssessmentName: 'Fire Safety - Propellant Storage'
        },
        {
          id: 'cm-002-04',
          name: 'Hot Work Permit System',
          description: 'Strict permit system for any hot work within 100m',
          category: 'procedural',
          importance: 'high',
          sourceAssessmentId: 'ra-002',
          sourceAssessmentName: 'Fire Safety - Propellant Storage'
        },
        {
          id: 'cm-002-05',
          name: 'Emergency Evacuation Drills',
          description: 'Monthly evacuation drills with quarterly full-site exercises',
          category: 'procedural',
          importance: 'medium',
          sourceAssessmentId: 'ra-002',
          sourceAssessmentName: 'Fire Safety - Propellant Storage'
        },
        {
          id: 'cm-002-06',
          name: 'Fire Equipment Inspection',
          description: 'Weekly inspection of all fire suppression equipment',
          category: 'equipment',
          importance: 'high',
          sourceAssessmentId: 'ra-002',
          sourceAssessmentName: 'Fire Safety - Propellant Storage'
        }
      ]
    },
    {
      id: 'ra-003',
      name: 'COSHH - Rocket Fuel Components',
      category: 'COSHH',
      description: 'Control of Substances Hazardous to Health for rocket fuel handling',
      status: 'active',
      createdDate: new Date('2024-03-10'),
      lastModified: new Date('2024-12-10'),
      createdBy: 'Dr. Michael Chen',
      location: 'Building D - Chemical Processing',
      riskRating: 'very-high',
      version: '2.0',
      controlMeasures: [
        {
          id: 'cm-003-01',
          name: 'Fume Extraction System',
          description: 'Local exhaust ventilation at all mixing and transfer points',
          category: 'environmental',
          importance: 'critical',
          sourceAssessmentId: 'ra-003',
          sourceAssessmentName: 'COSHH - Rocket Fuel Components'
        },
        {
          id: 'cm-003-02',
          name: 'Chemical-Resistant PPE',
          description: 'Full chemical suits with SCBA for all direct handling',
          category: 'safety',
          importance: 'critical',
          sourceAssessmentId: 'ra-003',
          sourceAssessmentName: 'COSHH - Rocket Fuel Components'
        },
        {
          id: 'cm-003-03',
          name: 'Spill Containment',
          description: 'Secondary containment with 110% capacity for all storage',
          category: 'environmental',
          importance: 'high',
          sourceAssessmentId: 'ra-003',
          sourceAssessmentName: 'COSHH - Rocket Fuel Components'
        },
        {
          id: 'cm-003-04',
          name: 'Chemical Monitoring',
          description: 'Continuous air monitoring for toxic vapors with alarms',
          category: 'environmental',
          importance: 'critical',
          sourceAssessmentId: 'ra-003',
          sourceAssessmentName: 'COSHH - Rocket Fuel Components'
        },
        {
          id: 'cm-003-05',
          name: 'Decontamination Stations',
          description: 'Emergency shower and eyewash within 10 seconds reach',
          category: 'safety',
          importance: 'high',
          sourceAssessmentId: 'ra-003',
          sourceAssessmentName: 'COSHH - Rocket Fuel Components'
        },
        {
          id: 'cm-003-06',
          name: 'Medical Surveillance',
          description: 'Quarterly health checks for all chemical handlers',
          category: 'certification',
          importance: 'medium',
          sourceAssessmentId: 'ra-003',
          sourceAssessmentName: 'COSHH - Rocket Fuel Components'
        },
        {
          id: 'cm-003-07',
          name: 'Chemical Compatibility Matrix',
          description: 'Strict segregation based on chemical compatibility',
          category: 'procedural',
          importance: 'critical',
          sourceAssessmentId: 'ra-003',
          sourceAssessmentName: 'COSHH - Rocket Fuel Components'
        }
      ]
    },
    {
      id: 'ra-004',
      name: 'Manual Handling - Warhead Assembly',
      category: 'Manual Handling',
      description: 'Ergonomic and safety assessment for warhead component handling',
      status: 'active',
      createdDate: new Date('2024-04-05'),
      lastModified: new Date('2024-11-20'),
      createdBy: 'Tom Wilson',
      location: 'Building B - Assembly Bay',
      riskRating: 'high',
      version: '1.8',
      controlMeasures: [
        {
          id: 'cm-004-01',
          name: 'Mechanical Lifting Aids',
          description: 'Use of overhead cranes for components over 25kg',
          category: 'equipment',
          importance: 'high',
          sourceAssessmentId: 'ra-004',
          sourceAssessmentName: 'Manual Handling - Warhead Assembly'
        },
        {
          id: 'cm-004-02',
          name: 'Two-Person Lift Protocol',
          description: 'Mandatory two-person lift for items 15-25kg',
          category: 'procedural',
          importance: 'medium',
          sourceAssessmentId: 'ra-004',
          sourceAssessmentName: 'Manual Handling - Warhead Assembly'
        },
        {
          id: 'cm-004-03',
          name: 'Ergonomic Workstations',
          description: 'Height-adjustable workbenches with anti-fatigue mats',
          category: 'equipment',
          importance: 'medium',
          sourceAssessmentId: 'ra-004',
          sourceAssessmentName: 'Manual Handling - Warhead Assembly'
        },
        {
          id: 'cm-004-04',
          name: 'Manual Handling Training',
          description: 'Annual refresher training on safe lifting techniques',
          category: 'certification',
          importance: 'medium',
          sourceAssessmentId: 'ra-004',
          sourceAssessmentName: 'Manual Handling - Warhead Assembly'
        },
        {
          id: 'cm-004-05',
          name: 'Task Rotation Schedule',
          description: 'Rotate personnel every 2 hours to prevent repetitive strain',
          category: 'procedural',
          importance: 'low',
          sourceAssessmentId: 'ra-004',
          sourceAssessmentName: 'Manual Handling - Warhead Assembly'
        }
      ]
    },
    {
      id: 'ra-005',
      name: 'Working at Height - Launch Tower',
      category: 'Working at Height',
      description: 'Safety measures for work on missile launch tower platforms',
      status: 'active',
      createdDate: new Date('2024-05-12'),
      lastModified: new Date('2024-12-05'),
      createdBy: 'Lisa Martinez',
      location: 'Launch Complex Alpha',
      riskRating: 'high',
      version: '2.2',
      controlMeasures: [
        {
          id: 'cm-005-01',
          name: 'Fall Arrest Systems',
          description: 'Twin lanyard harness system with shock absorbers',
          category: 'safety',
          importance: 'critical',
          sourceAssessmentId: 'ra-005',
          sourceAssessmentName: 'Working at Height - Launch Tower'
        },
        {
          id: 'cm-005-02',
          name: 'Edge Protection',
          description: 'Guardrails on all platforms and walkways above 2m',
          category: 'safety',
          importance: 'high',
          sourceAssessmentId: 'ra-005',
          sourceAssessmentName: 'Working at Height - Launch Tower'
        },
        {
          id: 'cm-005-03',
          name: 'Weather Monitoring',
          description: 'No work at height in winds exceeding 35mph',
          category: 'environmental',
          importance: 'high',
          sourceAssessmentId: 'ra-005',
          sourceAssessmentName: 'Working at Height - Launch Tower'
        },
        {
          id: 'cm-005-04',
          name: 'Tool Tethering',
          description: 'All tools and equipment tethered to prevent drops',
          category: 'procedural',
          importance: 'medium',
          sourceAssessmentId: 'ra-005',
          sourceAssessmentName: 'Working at Height - Launch Tower'
        },
        {
          id: 'cm-005-05',
          name: 'Rescue Plan',
          description: 'Dedicated rescue team on standby during all height work',
          category: 'procedural',
          importance: 'high',
          sourceAssessmentId: 'ra-005',
          sourceAssessmentName: 'Working at Height - Launch Tower'
        },
        {
          id: 'cm-005-06',
          name: 'Height Work Permit',
          description: 'Permit required for all work above 6 feet',
          category: 'procedural',
          importance: 'medium',
          sourceAssessmentId: 'ra-005',
          sourceAssessmentName: 'Working at Height - Launch Tower'
        }
      ]
    },
    {
      id: 'ra-006',
      name: 'Display Screen Equipment - Control Room',
      category: 'Display Screen Equipment',
      description: 'DSE assessment for missile control room operators',
      status: 'active',
      createdDate: new Date('2024-06-08'),
      lastModified: new Date('2024-10-30'),
      createdBy: 'Emma Davis',
      location: 'Control Center',
      riskRating: 'low',
      version: '1.5',
      controlMeasures: [
        {
          id: 'cm-006-01',
          name: 'Ergonomic Seating',
          description: 'Fully adjustable chairs with lumbar support',
          category: 'equipment',
          importance: 'medium',
          sourceAssessmentId: 'ra-006',
          sourceAssessmentName: 'Display Screen Equipment - Control Room'
        },
        {
          id: 'cm-006-02',
          name: 'Screen Positioning',
          description: 'Monitors at eye level, arm\'s length distance',
          category: 'procedural',
          importance: 'low',
          sourceAssessmentId: 'ra-006',
          sourceAssessmentName: 'Display Screen Equipment - Control Room'
        },
        {
          id: 'cm-006-03',
          name: 'Regular Breaks',
          description: '10-minute break every hour of continuous screen work',
          category: 'procedural',
          importance: 'low',
          sourceAssessmentId: 'ra-006',
          sourceAssessmentName: 'Display Screen Equipment - Control Room'
        },
        {
          id: 'cm-006-04',
          name: 'Eye Testing',
          description: 'Annual eye tests for all control room operators',
          category: 'certification',
          importance: 'low',
          sourceAssessmentId: 'ra-006',
          sourceAssessmentName: 'Display Screen Equipment - Control Room'
        }
      ]
    },
    {
      id: 'ra-007',
      name: 'Electrical Safety - Test Range',
      category: 'General',
      description: 'Electrical hazard controls for missile test range operations',
      status: 'active',
      createdDate: new Date('2024-07-15'),
      lastModified: new Date('2024-12-08'),
      createdBy: 'Robert Brown',
      location: 'Test Range Facility',
      riskRating: 'high',
      version: '2.7',
      controlMeasures: [
        {
          id: 'cm-007-01',
          name: 'Lockout/Tagout Procedures',
          description: 'LOTO required for all electrical maintenance',
          category: 'procedural',
          importance: 'critical',
          sourceAssessmentId: 'ra-007',
          sourceAssessmentName: 'Electrical Safety - Test Range'
        },
        {
          id: 'cm-007-02',
          name: 'Arc Flash Protection',
          description: 'Category 4 arc flash PPE for high voltage work',
          category: 'safety',
          importance: 'critical',
          sourceAssessmentId: 'ra-007',
          sourceAssessmentName: 'Electrical Safety - Test Range'
        },
        {
          id: 'cm-007-03',
          name: 'Ground Fault Protection',
          description: 'GFCI protection on all portable equipment',
          category: 'equipment',
          importance: 'high',
          sourceAssessmentId: 'ra-007',
          sourceAssessmentName: 'Electrical Safety - Test Range'
        },
        {
          id: 'cm-007-04',
          name: 'Electrical Isolation',
          description: 'Physical isolation of test equipment during operations',
          category: 'procedural',
          importance: 'high',
          sourceAssessmentId: 'ra-007',
          sourceAssessmentName: 'Electrical Safety - Test Range'
        },
        {
          id: 'cm-007-05',
          name: 'Qualified Electrician Only',
          description: 'Only certified electricians perform electrical work',
          category: 'certification',
          importance: 'high',
          sourceAssessmentId: 'ra-007',
          sourceAssessmentName: 'Electrical Safety - Test Range'
        }
      ]
    },
    {
      id: 'ra-008',
      name: 'Confined Space - Fuel Tank Entry',
      category: 'General',
      description: 'Safety procedures for missile fuel tank inspection and maintenance',
      status: 'active',
      createdDate: new Date('2024-08-20'),
      lastModified: new Date('2024-11-25'),
      createdBy: 'James Anderson',
      location: 'Maintenance Bay 3',
      riskRating: 'very-high',
      version: '3.0',
      controlMeasures: [
        {
          id: 'cm-008-01',
          name: 'Atmospheric Testing',
          description: 'Continuous gas monitoring for oxygen and toxic vapors',
          category: 'environmental',
          importance: 'critical',
          sourceAssessmentId: 'ra-008',
          sourceAssessmentName: 'Confined Space - Fuel Tank Entry'
        },
        {
          id: 'cm-008-02',
          name: 'Entry Permit System',
          description: 'Written permit required with rescue plan',
          category: 'procedural',
          importance: 'critical',
          sourceAssessmentId: 'ra-008',
          sourceAssessmentName: 'Confined Space - Fuel Tank Entry'
        },
        {
          id: 'cm-008-03',
          name: 'Standby Attendant',
          description: 'Trained attendant maintaining continuous contact',
          category: 'procedural',
          importance: 'critical',
          sourceAssessmentId: 'ra-008',
          sourceAssessmentName: 'Confined Space - Fuel Tank Entry'
        },
        {
          id: 'cm-008-04',
          name: 'Forced Ventilation',
          description: 'Continuous mechanical ventilation during entry',
          category: 'equipment',
          importance: 'high',
          sourceAssessmentId: 'ra-008',
          sourceAssessmentName: 'Confined Space - Fuel Tank Entry'
        },
        {
          id: 'cm-008-05',
          name: 'Emergency Retrieval',
          description: 'Tripod and winch system for emergency extraction',
          category: 'equipment',
          importance: 'high',
          sourceAssessmentId: 'ra-008',
          sourceAssessmentName: 'Confined Space - Fuel Tank Entry'
        },
        {
          id: 'cm-008-06',
          name: 'Confined Space Training',
          description: 'Annual confined space entry certification',
          category: 'certification',
          importance: 'high',
          sourceAssessmentId: 'ra-008',
          sourceAssessmentName: 'Confined Space - Fuel Tank Entry'
        }
      ]
    },
    {
      id: 'ra-009',
      name: 'Noise Exposure - Engine Testing',
      category: 'General',
      description: 'Hearing conservation for rocket engine test operations',
      status: 'active',
      createdDate: new Date('2024-09-10'),
      lastModified: new Date('2024-12-12'),
      createdBy: 'Patricia Wilson',
      location: 'Engine Test Stand',
      riskRating: 'high',
      version: '2.1',
      controlMeasures: [
        {
          id: 'cm-009-01',
          name: 'Acoustic Barriers',
          description: 'Sound-absorbing barriers around test stand',
          category: 'environmental',
          importance: 'high',
          sourceAssessmentId: 'ra-009',
          sourceAssessmentName: 'Noise Exposure - Engine Testing'
        },
        {
          id: 'cm-009-02',
          name: 'Hearing Protection',
          description: 'Double hearing protection (plugs + muffs) required',
          category: 'safety',
          importance: 'critical',
          sourceAssessmentId: 'ra-009',
          sourceAssessmentName: 'Noise Exposure - Engine Testing'
        },
        {
          id: 'cm-009-03',
          name: 'Exclusion Zones',
          description: 'No personnel within 500m during engine tests',
          category: 'procedural',
          importance: 'critical',
          sourceAssessmentId: 'ra-009',
          sourceAssessmentName: 'Noise Exposure - Engine Testing'
        },
        {
          id: 'cm-009-04',
          name: 'Noise Monitoring',
          description: 'Real-time sound level monitoring with alerts',
          category: 'environmental',
          importance: 'medium',
          sourceAssessmentId: 'ra-009',
          sourceAssessmentName: 'Noise Exposure - Engine Testing'
        },
        {
          id: 'cm-009-05',
          name: 'Audiometric Testing',
          description: 'Annual hearing tests for all test personnel',
          category: 'certification',
          importance: 'medium',
          sourceAssessmentId: 'ra-009',
          sourceAssessmentName: 'Noise Exposure - Engine Testing'
        }
      ]
    },
    {
      id: 'ra-010',
      name: 'Radiation Safety - NDT Operations',
      category: 'General',
      description: 'Radiographic testing safety for missile component inspection',
      status: 'active',
      createdDate: new Date('2024-10-05'),
      lastModified: new Date('2024-12-15'),
      createdBy: 'Dr. Kevin Lee',
      location: 'NDT Laboratory',
      riskRating: 'high',
      version: '1.9',
      controlMeasures: [
        {
          id: 'cm-010-01',
          name: 'Radiation Monitoring',
          description: 'Personal dosimeters and area monitors required',
          category: 'environmental',
          importance: 'critical',
          sourceAssessmentId: 'ra-010',
          sourceAssessmentName: 'Radiation Safety - NDT Operations'
        },
        {
          id: 'cm-010-02',
          name: 'Lead Shielding',
          description: 'Appropriate lead shielding based on source strength',
          category: 'safety',
          importance: 'critical',
          sourceAssessmentId: 'ra-010',
          sourceAssessmentName: 'Radiation Safety - NDT Operations'
        },
        {
          id: 'cm-010-03',
          name: 'Controlled Area',
          description: 'Restricted access with warning lights and barriers',
          category: 'procedural',
          importance: 'high',
          sourceAssessmentId: 'ra-010',
          sourceAssessmentName: 'Radiation Safety - NDT Operations'
        },
        {
          id: 'cm-010-04',
          name: 'ALARA Principle',
          description: 'Time, distance, shielding to minimize exposure',
          category: 'procedural',
          importance: 'high',
          sourceAssessmentId: 'ra-010',
          sourceAssessmentName: 'Radiation Safety - NDT Operations'
        },
        {
          id: 'cm-010-05',
          name: 'Radiation Safety Officer',
          description: 'RSO approval required for all radiographic work',
          category: 'certification',
          importance: 'high',
          sourceAssessmentId: 'ra-010',
          sourceAssessmentName: 'Radiation Safety - NDT Operations'
        }
      ]
    },
    {
      id: 'ra-011',
      name: 'Emergency Response - Chemical Spill',
      category: 'General',
      description: 'Emergency procedures for hazardous chemical spills',
      status: 'active',
      createdDate: new Date('2024-11-01'),
      lastModified: new Date('2024-12-18'),
      createdBy: 'Nancy Thompson',
      location: 'All Chemical Areas',
      riskRating: 'high',
      version: '2.5',
      controlMeasures: [
        {
          id: 'cm-011-01',
          name: 'Spill Kits',
          description: 'Appropriate spill kits within 50 feet of all chemical storage',
          category: 'equipment',
          importance: 'high',
          sourceAssessmentId: 'ra-011',
          sourceAssessmentName: 'Emergency Response - Chemical Spill'
        },
        {
          id: 'cm-011-02',
          name: 'Emergency Response Team',
          description: 'Trained HAZMAT team available 24/7',
          category: 'procedural',
          importance: 'critical',
          sourceAssessmentId: 'ra-011',
          sourceAssessmentName: 'Emergency Response - Chemical Spill'
        },
        {
          id: 'cm-011-03',
          name: 'Evacuation Routes',
          description: 'Clearly marked evacuation routes and assembly points',
          category: 'procedural',
          importance: 'high',
          sourceAssessmentId: 'ra-011',
          sourceAssessmentName: 'Emergency Response - Chemical Spill'
        },
        {
          id: 'cm-011-04',
          name: 'Chemical Inventory',
          description: 'Real-time inventory with SDS readily available',
          category: 'procedural',
          importance: 'medium',
          sourceAssessmentId: 'ra-011',
          sourceAssessmentName: 'Emergency Response - Chemical Spill'
        }
      ]
    },
    {
      id: 'ra-012',
      name: 'Lone Working - Remote Test Sites',
      category: 'General',
      description: 'Safety procedures for personnel working alone at remote locations',
      status: 'active',
      createdDate: new Date('2024-11-15'),
      lastModified: new Date('2024-12-20'),
      createdBy: 'David Clark',
      location: 'Remote Test Facilities',
      riskRating: 'medium',
      version: '1.3',
      controlMeasures: [
        {
          id: 'cm-012-01',
          name: 'Check-In System',
          description: 'Hourly check-in via satellite phone or radio',
          category: 'procedural',
          importance: 'high',
          sourceAssessmentId: 'ra-012',
          sourceAssessmentName: 'Lone Working - Remote Test Sites'
        },
        {
          id: 'cm-012-02',
          name: 'GPS Tracking',
          description: 'Real-time GPS location tracking devices',
          category: 'equipment',
          importance: 'medium',
          sourceAssessmentId: 'ra-012',
          sourceAssessmentName: 'Lone Working - Remote Test Sites'
        },
        {
          id: 'cm-012-03',
          name: 'Emergency Beacon',
          description: 'Personal locator beacon for emergencies',
          category: 'equipment',
          importance: 'high',
          sourceAssessmentId: 'ra-012',
          sourceAssessmentName: 'Lone Working - Remote Test Sites'
        },
        {
          id: 'cm-012-04',
          name: 'First Aid Training',
          description: 'Advanced first aid training for all lone workers',
          category: 'certification',
          importance: 'medium',
          sourceAssessmentId: 'ra-012',
          sourceAssessmentName: 'Lone Working - Remote Test Sites'
        },
        {
          id: 'cm-012-05',
          name: 'Weather Monitoring',
          description: 'Continuous weather updates and evacuation triggers',
          category: 'environmental',
          importance: 'medium',
          sourceAssessmentId: 'ra-012',
          sourceAssessmentName: 'Lone Working - Remote Test Sites'
        }
      ]
    }
  ];

  /**
   * Get all risk assessments
   */
  static getAllRiskAssessments(): RiskAssessment[] {
    return this.riskAssessments;
  }

  /**
   * Get risk assessments by category
   */
  static getRiskAssessmentsByCategory(category: string): RiskAssessment[] {
    return this.riskAssessments.filter(ra => ra.category === category);
  }

  /**
   * Get a specific risk assessment by ID
   */
  static getRiskAssessmentById(id: string): RiskAssessment | undefined {
    return this.riskAssessments.find(ra => ra.id === id);
  }

  /**
   * Get control measures from specific risk assessments
   */
  static getControlMeasuresFromAssessments(assessmentIds: string[]): RiskAssessmentControlMeasure[] {
    const controlMeasures: RiskAssessmentControlMeasure[] = [];

    assessmentIds.forEach(id => {
      const assessment = this.getRiskAssessmentById(id);
      if (assessment) {
        controlMeasures.push(...assessment.controlMeasures);
      }
    });

    return controlMeasures;
  }

  /**
   * Search risk assessments by name or description
   */
  static searchRiskAssessments(searchTerm: string): RiskAssessment[] {
    const term = searchTerm.toLowerCase();
    return this.riskAssessments.filter(ra =>
      ra.name.toLowerCase().includes(term) ||
      ra.description.toLowerCase().includes(term) ||
      ra.location.toLowerCase().includes(term)
    );
  }

  /**
   * Get risk assessment categories
   */
  static getCategories(): string[] {
    const categories = new Set(this.riskAssessments.map(ra => ra.category));
    return Array.from(categories).sort();
  }

  /**
   * Get risk assessments by risk rating
   */
  static getRiskAssessmentsByRating(rating: string): RiskAssessment[] {
    return this.riskAssessments.filter(ra => ra.riskRating === rating);
  }

  /**
   * Get active risk assessments
   */
  static getActiveRiskAssessments(): RiskAssessment[] {
    return this.riskAssessments.filter(ra => ra.status === 'active');
  }
}