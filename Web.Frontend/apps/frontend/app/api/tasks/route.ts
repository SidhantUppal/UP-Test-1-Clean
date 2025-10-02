import { NextRequest, NextResponse } from 'next/server';

const TASKS_SERVICE_URL = process.env.TASKS_SERVICE_URL || 'http://localhost:3008';

// DEMO MODE: Using dummy data for demonstration
const DUMMY_TASKS = [
  // Critical & Overdue Tasks
  {
    TaskID: 1001,
    Title: "Emergency Permit Approval - Site 3 Hot Work",
    Description: "Urgent approval needed for welding operations in confined space",
    TaskTypeID: 2,
    TaskPriorityID: 4,
    StatusID: 1,
    AssignedToFullName: "John Smith",
    CreatedByFullName: "Mike Davis",
    DueByDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "PER-2024-018",
    isProcessTask: false
  },
  {
    TaskID: 1002,
    Title: "Process Safety Review - Chemical Storage Procedure",
    Description: "Review and approve updated chemical storage process workflow",
    TaskTypeID: 4,
    TaskPriorityID: 4,
    StatusID: 2,
    AssignedToFullName: "Lisa Anderson",
    CreatedByFullName: "Process Manager",
    DueByDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "PRO-2024-045",
    isProcessTask: true
  },

  // High Priority - Due Today
  {
    TaskID: 1003,
    Title: "Contractor Safety Certification Verification",
    Description: "Verify ABC Construction safety certifications before site access",
    TaskTypeID: 3,
    TaskPriorityID: 3,
    StatusID: 2,
    AssignedToFullName: "Emma Wilson",
    CreatedByFullName: "John Smith",
    DueByDate: new Date().toISOString(),
    CreatedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "CON-2024-156",
    isProcessTask: false
  },
  {
    TaskID: 1004,
    Title: "Incident Investigation Process Update",
    Description: "Update incident investigation workflow with new 5 Whys methodology",
    TaskTypeID: 4,
    TaskPriorityID: 3,
    StatusID: 1,
    AssignedToFullName: "James Martinez",
    CreatedByFullName: "Process Manager",
    DueByDate: new Date().toISOString(),
    CreatedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "PRO-2024-046",
    isProcessTask: true
  },

  // Medium Priority - Due This Week
  {
    TaskID: 1005,
    Title: "Monthly Safety Inspection - Warehouse B",
    Description: "Complete routine safety inspection checklist for Warehouse B",
    TaskTypeID: 5,
    TaskPriorityID: 2,
    StatusID: 2,
    AssignedToFullName: "Mike Davis",
    CreatedByFullName: "Safety Manager",
    DueByDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "INS-2024-089",
    isProcessTask: false
  },
  {
    TaskID: 1006,
    Title: "Risk Assessment Process Documentation",
    Description: "Document new risk assessment process for equipment maintenance",
    TaskTypeID: 1,
    TaskPriorityID: 2,
    StatusID: 2,
    AssignedToFullName: "Sarah Johnson",
    CreatedByFullName: "Process Manager",
    DueByDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "PRO-2024-047",
    isProcessTask: true
  },
  {
    TaskID: 1007,
    Title: "Training Module Review - Hazard Recognition",
    Description: "Review and approve new hazard recognition training materials",
    TaskTypeID: 1,
    TaskPriorityID: 2,
    StatusID: 1,
    AssignedToFullName: "Robert Chen",
    CreatedByFullName: "Training Coordinator",
    DueByDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date().toISOString(),
    Reference: "TRN-2024-034",
    isProcessTask: false
  },

  // Low Priority - Future Tasks
  {
    TaskID: 1008,
    Title: "Quarterly Compliance Audit Preparation",
    Description: "Prepare documentation for Q2 compliance audit",
    TaskTypeID: 5,
    TaskPriorityID: 1,
    StatusID: 1,
    AssignedToFullName: "Lisa Anderson",
    CreatedByFullName: "Compliance Officer",
    DueByDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date().toISOString(),
    Reference: "AUD-2024-Q2",
    isProcessTask: false
  },
  {
    TaskID: 1009,
    Title: "Standard Operating Procedure Update",
    Description: "Update SOP for equipment lockout/tagout process",
    TaskTypeID: 4,
    TaskPriorityID: 1,
    StatusID: 3,
    AssignedToFullName: "Emma Wilson",
    CreatedByFullName: "Process Manager",
    DueByDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "PRO-2024-048",
    isProcessTask: true
  },

  // Completed Tasks
  {
    TaskID: 1010,
    Title: "Emergency Response Plan Review",
    Description: "Annual review of site emergency response procedures",
    TaskTypeID: 1,
    TaskPriorityID: 3,
    StatusID: 4,
    AssignedToFullName: "John Smith",
    CreatedByFullName: "Safety Manager",
    DueByDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "ERP-2024-001",
    isProcessTask: false
  },
  {
    TaskID: 1011,
    Title: "Contractor Onboarding Process Implementation",
    Description: "Deploy new contractor onboarding workflow system",
    TaskTypeID: 4,
    TaskPriorityID: 2,
    StatusID: 4,
    AssignedToFullName: "James Martinez",
    CreatedByFullName: "Process Manager",
    DueByDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "PRO-2024-044",
    isProcessTask: true
  },

  // More Active Tasks
  {
    TaskID: 1012,
    Title: "Permit to Work System Process Optimization",
    Description: "Optimize permit approval workflow for faster turnaround",
    TaskTypeID: 4,
    TaskPriorityID: 3,
    StatusID: 2,
    AssignedToFullName: "Sarah Johnson",
    CreatedByFullName: "Process Manager",
    DueByDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "PRO-2024-049",
    isProcessTask: true
  },
  {
    TaskID: 1013,
    Title: "Vehicle Safety Inspection - Fleet Review",
    Description: "Complete safety inspections for company vehicle fleet",
    TaskTypeID: 5,
    TaskPriorityID: 2,
    StatusID: 2,
    AssignedToFullName: "Mike Davis",
    CreatedByFullName: "Fleet Manager",
    DueByDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date().toISOString(),
    Reference: "FLT-2024-023",
    isProcessTask: false
  },
  {
    TaskID: 1014,
    Title: "ISO 45001 Documentation Review",
    Description: "Review and update ISO 45001 compliance documentation",
    TaskTypeID: 1,
    TaskPriorityID: 2,
    StatusID: 1,
    AssignedToFullName: "Robert Chen",
    CreatedByFullName: "Quality Manager",
    DueByDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date().toISOString(),
    Reference: "ISO-2024-007",
    isProcessTask: false
  },
  {
    TaskID: 1015,
    Title: "Behavior-Based Safety Process Training",
    Description: "Develop training materials for new BBS observation process",
    TaskTypeID: 4,
    TaskPriorityID: 2,
    StatusID: 2,
    AssignedToFullName: "Lisa Anderson",
    CreatedByFullName: "Process Manager",
    DueByDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "PRO-2024-050",
    isProcessTask: true
  },
  {
    TaskID: 1016,
    Title: "Electrical Safety Audit - Building C",
    Description: "Conduct electrical safety audit for Building C systems",
    TaskTypeID: 5,
    TaskPriorityID: 3,
    StatusID: 1,
    AssignedToFullName: "Emma Wilson",
    CreatedByFullName: "Facilities Manager",
    DueByDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date().toISOString(),
    Reference: "AUD-2024-019",
    isProcessTask: false
  },
  {
    TaskID: 1017,
    Title: "Near Miss Reporting Process Enhancement",
    Description: "Enhance near miss reporting workflow with mobile app integration",
    TaskTypeID: 4,
    TaskPriorityID: 2,
    StatusID: 2,
    AssignedToFullName: "James Martinez",
    CreatedByFullName: "Process Manager",
    DueByDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "PRO-2024-051",
    isProcessTask: true
  },
  {
    TaskID: 1018,
    Title: "Confined Space Entry Permit Review",
    Description: "Review and approve confined space entry permit for Tank 3",
    TaskTypeID: 2,
    TaskPriorityID: 4,
    StatusID: 1,
    AssignedToFullName: "John Smith",
    CreatedByFullName: "Operations Manager",
    DueByDate: new Date().toISOString(),
    CreatedDate: new Date().toISOString(),
    Reference: "PER-2024-019",
    isProcessTask: false
  },
  {
    TaskID: 1019,
    Title: "Contractor Insurance Verification",
    Description: "Verify insurance coverage for XYZ Services contractor",
    TaskTypeID: 3,
    TaskPriorityID: 2,
    StatusID: 2,
    AssignedToFullName: "Sarah Johnson",
    CreatedByFullName: "Procurement Team",
    DueByDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "CON-2024-157",
    isProcessTask: false
  },
  {
    TaskID: 1020,
    Title: "Quality Control Process Standardization",
    Description: "Standardize QC processes across all production lines",
    TaskTypeID: 4,
    TaskPriorityID: 3,
    StatusID: 2,
    AssignedToFullName: "Robert Chen",
    CreatedByFullName: "Process Manager",
    DueByDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "PRO-2024-052",
    isProcessTask: true
  },
  {
    TaskID: 1021,
    Title: "Environmental Compliance Check",
    Description: "Quarterly environmental compliance verification",
    TaskTypeID: 5,
    TaskPriorityID: 2,
    StatusID: 3,
    AssignedToFullName: "Lisa Anderson",
    CreatedByFullName: "Environmental Officer",
    DueByDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "ENV-2024-008",
    isProcessTask: false
  },
  {
    TaskID: 1022,
    Title: "Maintenance Request Process Automation",
    Description: "Implement automated workflow for maintenance request handling",
    TaskTypeID: 4,
    TaskPriorityID: 2,
    StatusID: 2,
    AssignedToFullName: "Mike Davis",
    CreatedByFullName: "Process Manager",
    DueByDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "PRO-2024-053",
    isProcessTask: true
  },
  {
    TaskID: 1023,
    Title: "Safety Data Sheet Update",
    Description: "Update SDS for new chemical products in inventory",
    TaskTypeID: 1,
    TaskPriorityID: 3,
    StatusID: 1,
    AssignedToFullName: "Emma Wilson",
    CreatedByFullName: "Chemical Safety Officer",
    DueByDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date().toISOString(),
    Reference: "SDS-2024-015",
    isProcessTask: false
  },
  {
    TaskID: 1024,
    Title: "Visitor Management Process Review",
    Description: "Review and optimize visitor check-in and safety briefing process",
    TaskTypeID: 4,
    TaskPriorityID: 1,
    StatusID: 1,
    AssignedToFullName: "James Martinez",
    CreatedByFullName: "Process Manager",
    DueByDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date().toISOString(),
    Reference: "PRO-2024-054",
    isProcessTask: true
  },
  {
    TaskID: 1025,
    Title: "Fire Safety Equipment Inspection",
    Description: "Monthly fire extinguisher and alarm system inspection",
    TaskTypeID: 5,
    TaskPriorityID: 3,
    StatusID: 2,
    AssignedToFullName: "John Smith",
    CreatedByFullName: "Fire Safety Marshal",
    DueByDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    CreatedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    Reference: "FSI-2024-011",
    isProcessTask: false
  }
];

export async function GET(request: NextRequest) {
  try {
    // DEMO MODE: Return dummy data instead of fetching from database
    console.log('Demo mode: Returning dummy tasks data');
    return NextResponse.json(DUMMY_TASKS);

    // Original database fetch code (commented out for demo)
    /*
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const url = `${TASKS_SERVICE_URL}/api/tasks${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Tasks service responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    */
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${TASKS_SERVICE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Tasks service responded with ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create task' },
      { status: 500 }
    );
  }
}