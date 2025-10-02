// Demo checklist data for consistent demos across the application
export const demoChecklist = {
  id: 'demo-safety-inspection',
  title: 'Daily Safety Inspection',
  description: 'Comprehensive safety inspection checklist for construction sites',
  category: 'Safety',
  estimatedTime: '30 minutes',
  assignedTo: {
    id: 'john-smith',
    name: 'John Smith',
    role: 'Safety Officer',
    avatar: 'JS'
  },
  createdBy: 'Sarah Johnson',
  createdDate: '2025-01-10',
  dueDate: '2025-01-17',
  priority: 'High',
  version: '2.1',
  lastUpdated: '2025-01-14',
  timesUsed: 142,
  completionRate: 94,
  questions: [
    {
      id: 'q1',
      number: 1,
      title: 'Site Access Control',
      description: 'Verify that site access is properly controlled and monitored',
      type: 'yn-na',
      required: true,
      category: 'Access Control',
      helpText: 'Check that all entry points are secured and visitor logs are maintained'
    },
    {
      id: 'q2',
      number: 2,
      title: 'PPE Compliance Check',
      description: 'Are all workers wearing required Personal Protective Equipment?',
      type: 'yn-na-dk',
      required: true,
      category: 'PPE',
      subQuestions: [
        {
          id: 'q2-1',
          title: 'Hard hats worn correctly',
          type: 'checkbox'
        },
        {
          id: 'q2-2',
          title: 'Safety boots in good condition',
          type: 'checkbox'
        },
        {
          id: 'q2-3',
          title: 'High-vis vests clean and visible',
          type: 'checkbox'
        }
      ]
    },
    {
      id: 'q3',
      number: 3,
      title: 'Equipment Safety Rating',
      description: 'Rate the overall safety condition of equipment on site',
      type: 'score-10',
      required: true,
      category: 'Equipment',
      weight: 2,
      helpText: '1 = Immediate attention required, 10 = Excellent condition'
    },
    {
      id: 'q4',
      number: 4,
      title: 'Hazard Identification',
      description: 'List any new hazards identified during inspection',
      type: 'text',
      required: false,
      category: 'Hazards',
      placeholder: 'Describe any hazards found...'
    },
    {
      id: 'q5',
      number: 5,
      title: 'Emergency Equipment Check',
      description: 'Are all emergency equipment and exits clearly marked and accessible?',
      type: 'pass-fail',
      required: true,
      category: 'Emergency',
      isKillQuestion: true,
      killMessage: 'Emergency equipment must be accessible at all times'
    },
    {
      id: 'q6',
      number: 6,
      title: 'Number of Workers On Site',
      description: 'Enter the total number of workers present during inspection',
      type: 'number',
      required: true,
      category: 'Personnel',
      min: 0,
      max: 500
    },
    {
      id: 'q7',
      number: 7,
      title: 'Weather Conditions',
      description: 'Select current weather conditions',
      type: 'dropdown',
      required: true,
      category: 'Environmental',
      options: [
        { value: 'clear', label: 'Clear/Sunny' },
        { value: 'cloudy', label: 'Cloudy' },
        { value: 'rain', label: 'Rain' },
        { value: 'storm', label: 'Storm' },
        { value: 'snow', label: 'Snow' },
        { value: 'fog', label: 'Fog' }
      ]
    },
    {
      id: 'q8',
      number: 8,
      title: 'Safety Meeting Conducted',
      description: 'Was a toolbox talk or safety meeting conducted today?',
      type: 'yn-na',
      required: true,
      category: 'Communication',
      taskOnNo: {
        title: 'Schedule Safety Meeting',
        assignTo: 'Site Supervisor',
        priority: 'High'
      }
    },
    {
      id: 'q9',
      number: 9,
      title: 'Inspection Photos',
      description: 'Take photos of the site conditions',
      type: 'photo',
      required: false,
      category: 'Documentation',
      maxPhotos: 5,
      photoInstructions: 'Include overall site view and any identified hazards'
    },
    {
      id: 'q10',
      number: 10,
      title: 'Inspector Signature',
      description: 'Sign to confirm inspection completion',
      type: 'signature',
      required: true,
      category: 'Verification'
    }
  ],
  scoringRules: {
    passingScore: 80,
    weightedScoring: true,
    showScoreToUser: true,
    requireAllKillQuestions: true
  },
  completionActions: {
    notifyOnComplete: ['Site Manager', 'Safety Director'],
    generateReport: true,
    createFollowUpTasks: true,
    archiveAfterDays: 90
  },
  metadata: {
    industry: 'Construction',
    regulatoryStandard: 'OSHA 1926',
    riskLevel: 'Medium',
    frequency: 'Daily',
    tags: ['safety', 'daily', 'inspection', 'construction', 'OSHA']
  }
};

// Sample completed inspection data for demos
export const demoCompletedInspection = {
  checklistId: demoChecklist.id,
  checklistTitle: demoChecklist.title,
  inspectionId: 'insp-2025-001',
  completedBy: {
    id: 'mike-wilson',
    name: 'Mike Wilson',
    role: 'Site Supervisor'
  },
  completedAt: '2025-01-17T09:45:00Z',
  duration: '28 minutes',
  score: 92,
  status: 'Passed',
  answers: [
    { questionId: 'q1', value: 'Yes', comment: 'All gates secured, visitor log up to date' },
    { questionId: 'q2', value: 'Yes', subAnswers: { 'q2-1': true, 'q2-2': true, 'q2-3': true } },
    { questionId: 'q3', value: 9, comment: 'Equipment well maintained' },
    { questionId: 'q4', value: 'Minor oil spill near generator - cleaned immediately' },
    { questionId: 'q5', value: 'Pass' },
    { questionId: 'q6', value: 47 },
    { questionId: 'q7', value: 'clear' },
    { questionId: 'q8', value: 'Yes', comment: 'Morning toolbox talk on ladder safety' },
    { questionId: 'q9', photos: ['site-overview.jpg', 'ppe-station.jpg'] },
    { questionId: 'q10', signature: 'data:image/png;base64,...' }
  ],
  issues: [
    {
      id: 'issue-001',
      severity: 'Low',
      description: 'Minor oil spill near generator',
      resolution: 'Cleaned immediately',
      resolvedBy: 'Mike Wilson'
    }
  ],
  followUpTasks: []
};