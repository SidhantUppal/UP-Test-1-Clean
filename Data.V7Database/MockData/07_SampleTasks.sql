-- Sample Tasks - Demo task data matching frontend examples
-- Uses the reference data from previous scripts

SET IDENTITY_INSERT [V7].[BSSTask] ON;

INSERT INTO [V7].[BSSTask] (
    [TaskID], [Title], [Description], [Reference], [UserAreaID], [LocationID], 
    [TaskTypeID], [TaskSeverityID], [DueDate], [CreatedByUserID], [CreatedDate], 
    [TaskStatusTypeID], [IsAnonymous], [CanOneEmployeeAccept], [IsEvidenceRequiredToClose],
    [IsCreatorApprovalRequiredToClose], [IsSubmittedForApproval], [HasTravelCost],
    [RelatedDocumentTypeName], [RelatedDocumentTitle]
)
VALUES
    -- Task 1: Critical Safety Incident
    (1001, 
     'Review Critical Safety Incident Report - Building A',
     'Immediate review required for safety incident that occurred during maintenance work. Incident involved electrical hazard that resulted in minor injury. Full investigation and corrective actions required.',
     'TSK-2025-1001',
     1, -- Safety & Compliance
     1, -- Building A
     1, -- Safety Inspection
     4, -- Critical
     DATEADD(day, 3, sysdatetimeoffset()), -- Due in 3 days
     2, -- Sarah Johnson
     DATEADD(day, -2, sysdatetimeoffset()), -- Created 2 days ago
     1, -- New
     0, -- Not Anonymous
     1, -- Can One Employee Accept
     1, -- Evidence Required to Close
     1, -- Creator Approval Required
     0, -- Not Submitted for Approval
     0, -- No Travel Cost
     'Safety',
     'INC-2025-001'
    ),

    -- Task 2: Emergency Work Permit
    (1002,
     'Approve Emergency Work Permit - Power Outage',
     'Emergency electrical work permit requires immediate approval for power restoration work in Building B. Contractor is standing by for authorization.',
     'TSK-2025-1002',
     2, -- Operations
     2, -- Building B
     2, -- Permit Approval
     4, -- Critical
     DATEADD(hour, 4, sysdatetimeoffset()), -- Due in 4 hours
     3, -- Mike Davis
     DATEADD(hour, -2, sysdatetimeoffset()), -- Created 2 hours ago
     2, -- In Progress
     0, -- Not Anonymous
     1, -- Can One Employee Accept
     0, -- Evidence Not Required
     1, -- Creator Approval Required
     0, -- Not Submitted for Approval
     0, -- No Travel Cost
     'Permit',
     'EWP-2025-001'
    ),

    -- Task 3: Quarterly Compliance Review
    (1003,
     'Complete Quarterly Compliance Review',
     'Q1 compliance review for all active contractors - 15 contractors pending review. Must verify insurance, certifications, and training records are current.',
     'TSK-2025-1003',
     1, -- Safety & Compliance
     1, -- Building A
     3, -- Compliance Check
     2, -- Medium
     DATEADD(day, 14, sysdatetimeoffset()), -- Due in 2 weeks
     4, -- Lisa Anderson
     DATEADD(day, -5, sysdatetimeoffset()), -- Created 5 days ago
     2, -- In Progress
     0, -- Not Anonymous
     0, -- Multiple people can work on it
     1, -- Evidence Required
     1, -- Creator Approval Required
     0, -- Not Submitted for Approval
     0, -- No Travel Cost
     'Compliance',
     'QCR-2025-Q1'
    ),

    -- Task 4: New Contractor Verification
    (1004,
     'Verify New Contractor Documentation - Global Tech Services',
     'Review and verify all onboarding documentation for new contractor Global Tech Services. Check insurance, bonds, certifications, and safety training.',
     'TSK-2025-1004',
     1, -- Safety & Compliance
     NULL, -- No specific location
     5, -- Contractor Verification
     3, -- High
     DATEADD(day, 1, sysdatetimeoffset()), -- Due tomorrow
     1, -- John Smith
     DATEADD(day, -1, sysdatetimeoffset()), -- Created yesterday
     1, -- New
     0, -- Not Anonymous
     1, -- Can One Employee Accept
     1, -- Evidence Required
     0, -- Creator Approval Not Required
     0, -- Not Submitted for Approval
     0, -- No Travel Cost
     'Contractors',
     'CONT-789'
    ),

    -- Task 5: Process Review
    (1005,
     'Update Process Workflow - Chemical Handling',
     'Revise chemical handling process documentation based on new regulatory requirements. Update safety procedures and training materials.',
     'TSK-2025-1005',
     1, -- Safety & Compliance
     8, -- Laboratory
     6, -- Process Review
     3, -- High
     DATEADD(day, 5, sysdatetimeoffset()), -- Due in 5 days
     2, -- Sarah Johnson
     DATEADD(day, -3, sysdatetimeoffset()), -- Created 3 days ago
     2, -- In Progress
     0, -- Not Anonymous
     0, -- Multiple people can work on it
     1, -- Evidence Required
     1, -- Creator Approval Required
     0, -- Not Submitted for Approval
     0, -- No Travel Cost
     'Processes',
     'PROC-234'
    ),

    -- Task 6: Training Assignment
    (1006,
     'Assign Safety Training - New Employees',
     'Schedule and assign mandatory safety training for 3 new employees starting next week. Include site orientation and equipment training.',
     'TSK-2025-1006',
     4, -- HR & Training
     NULL, -- No specific location
     7, -- Training Assignment
     2, -- Medium
     DATEADD(day, 7, sysdatetimeoffset()), -- Due in 1 week
     7, -- James Martinez
     DATEADD(day, -1, sysdatetimeoffset()), -- Created yesterday
     1, -- New
     0, -- Not Anonymous
     1, -- Can One Employee Accept
     0, -- Evidence Not Required
     0, -- Creator Approval Not Required
     0, -- Not Submitted for Approval
     0, -- No Travel Cost
     'Training',
     'TRN-2025-001'
    ),

    -- Task 7: System Configuration
    (1007,
     'Configure New User Access - Maintenance Team',
     'Set up system access for new maintenance team members. Configure permissions for work order system and equipment databases.',
     'TSK-2025-1007',
     5, -- Administration
     NULL, -- No specific location
     8, -- System Configuration
     2, -- Medium
     DATEADD(day, 3, sysdatetimeoffset()), -- Due in 3 days
     15, -- System Administrator
     sysdatetimeoffset(), -- Created today
     1, -- New
     0, -- Not Anonymous
     1, -- Can One Employee Accept
     0, -- Evidence Not Required
     0, -- Creator Approval Not Required
     0, -- Not Submitted for Approval
     0, -- No Travel Cost
     'Admin',
     'USR-2025-003'
    ),

    -- Task 8: Completed Task Example
    (1008,
     'Monthly Safety Inspection - Warehouse 1',
     'Routine monthly safety inspection of Warehouse 1 including fire safety systems, emergency exits, and equipment condition.',
     'TSK-2025-1008',
     1, -- Safety & Compliance
     3, -- Warehouse 1
     1, -- Safety Inspection
     2, -- Medium
     DATEADD(day, -1, sysdatetimeoffset()), -- Was due yesterday
     8, -- Michelle Chen
     DATEADD(day, -10, sysdatetimeoffset()), -- Created 10 days ago
     4, -- Completed
     0, -- Not Anonymous
     1, -- Can One Employee Accept
     1, -- Evidence Required
     0, -- Creator Approval Not Required
     0, -- Not Submitted for Approval
     0, -- No Travel Cost
     'Safety',
     'MSI-2025-001'
    );

-- Update the completed task with completion details
UPDATE [V7].[BSSTask] 
SET 
    [CompletedDate] = DATEADD(hour, -2, sysdatetimeoffset()),
    [CompletedByFullName] = 'Michelle Chen'
WHERE [TaskID] = 1008;

SET IDENTITY_INSERT [V7].[BSSTask] OFF;