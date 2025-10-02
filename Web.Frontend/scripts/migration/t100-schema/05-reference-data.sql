-- =============================================
-- T100 Reference Data Inserts
-- Purpose: Insert default reference data for T100 modules
-- Author: Platform Team
-- Date: 2025-07-29
-- Note: This assumes UserID 1 exists for audit fields
-- =============================================

USE [V7-Dev];
GO

DECLARE @SystemUserID INT = 1; -- Adjust this to match your system user ID

-- =============================================
-- Training & E-Learning Reference Data
-- =============================================

-- Course Types
INSERT INTO [T100].[CourseType] (TypeName, TypeDescription, CreatedByUserID)
VALUES 
    ('E-Learning', 'Online self-paced learning modules', @SystemUserID),
    ('Classroom', 'Instructor-led classroom training', @SystemUserID),
    ('Practical', 'Hands-on practical training sessions', @SystemUserID),
    ('SCORM', 'SCORM-compliant e-learning packages', @SystemUserID),
    ('Video', 'Video-based training content', @SystemUserID),
    ('Assessment', 'Assessment-only courses for certification', @SystemUserID),
    ('Webinar', 'Live or recorded webinar sessions', @SystemUserID),
    ('Blended', 'Combined online and classroom training', @SystemUserID);

-- Course Enrollment Status Types
INSERT INTO [T100].[CourseEnrolmentStatusType] (StatusName, StatusDescription, ColorCode, CreatedByUserID)
VALUES 
    ('Not Started', 'Course has been assigned but not yet started', '#6B7280', @SystemUserID),
    ('In Progress', 'Course is currently being taken', '#3B82F6', @SystemUserID),
    ('Completed', 'Course has been successfully completed', '#10B981', @SystemUserID),
    ('Failed', 'Course was not completed successfully', '#EF4444', @SystemUserID),
    ('Expired', 'Course enrollment has expired', '#F59E0B', @SystemUserID),
    ('Suspended', 'Course enrollment has been suspended', '#8B5CF6', @SystemUserID),
    ('Withdrawn', 'Student has withdrawn from the course', '#6B7280', @SystemUserID);

-- =============================================
-- Risk Assessment Reference Data
-- =============================================

-- Risk Matrix Types (Default 5x5 matrix)
INSERT INTO [T100].[RiskMatrixType] (MatrixName, MatrixDescription, LikelihoodLevels, ConsequenceLevels, IsDefault, CreatedByUserID)
VALUES 
    ('Standard 5x5 Matrix', 'Standard 5x5 risk matrix with likelihood and consequence', 5, 5, 1, @SystemUserID),
    ('Simple 3x3 Matrix', 'Simplified 3x3 risk matrix for basic assessments', 3, 3, 0, @SystemUserID),
    ('Detailed 7x7 Matrix', 'Detailed 7x7 risk matrix for complex assessments', 7, 7, 0, @SystemUserID);

-- Get the default matrix ID for subsequent inserts
DECLARE @DefaultMatrixID INT = (SELECT RiskMatrixTypeID FROM [T100].[RiskMatrixType] WHERE IsDefault = 1);

-- Risk Matrix Likelihood Types (for 5x5 matrix)
INSERT INTO [T100].[RiskMatrixLikelihoodType] (RiskMatrixTypeID, LikelihoodLevel, LikelihoodName, LikelihoodDescription, Probability, CreatedByUserID)
VALUES 
    (@DefaultMatrixID, 1, 'Very Unlikely', 'May occur in exceptional circumstances (< 1%)', 0.5, @SystemUserID),
    (@DefaultMatrixID, 2, 'Unlikely', 'Could occur at some time (1-10%)', 5, @SystemUserID),
    (@DefaultMatrixID, 3, 'Possible', 'Might occur at some time (10-50%)', 30, @SystemUserID),
    (@DefaultMatrixID, 4, 'Likely', 'Will probably occur in most circumstances (50-90%)', 70, @SystemUserID),
    (@DefaultMatrixID, 5, 'Very Likely', 'Expected to occur in most circumstances (> 90%)', 95, @SystemUserID);

-- Risk Matrix Consequence Types (for 5x5 matrix)
INSERT INTO [T100].[RiskMatrixConsequenceType] (RiskMatrixTypeID, ConsequenceLevel, ConsequenceName, ConsequenceDescription, CreatedByUserID)
VALUES 
    (@DefaultMatrixID, 1, 'Insignificant', 'No injuries, low financial loss, no impact', @SystemUserID),
    (@DefaultMatrixID, 2, 'Minor', 'First aid treatment, medium financial loss, minor impact', @SystemUserID),
    (@DefaultMatrixID, 3, 'Moderate', 'Medical treatment required, high financial loss, moderate impact', @SystemUserID),
    (@DefaultMatrixID, 4, 'Major', 'Extensive injuries, major financial loss, significant impact', @SystemUserID),
    (@DefaultMatrixID, 5, 'Catastrophic', 'Death, huge financial loss, catastrophic impact', @SystemUserID);

-- Risk Level Colors
INSERT INTO [T100].[RiskLevelColourType] (ColorName, ColorHex, ColorDescription, CreatedByUserID)
VALUES 
    ('Green', '#10B981', 'Low risk - acceptable', @SystemUserID),
    ('Yellow', '#F59E0B', 'Medium risk - monitor and review', @SystemUserID),
    ('Orange', '#F97316', 'High risk - immediate action required', @SystemUserID),
    ('Red', '#EF4444', 'Critical risk - stop work and address immediately', @SystemUserID);

-- Risk Matrix Color Mappings (5x5 matrix)
DECLARE @GreenID INT = (SELECT RiskLevelColourTypeID FROM [T100].[RiskLevelColourType] WHERE ColorName = 'Green');
DECLARE @YellowID INT = (SELECT RiskLevelColourTypeID FROM [T100].[RiskLevelColourType] WHERE ColorName = 'Yellow');
DECLARE @OrangeID INT = (SELECT RiskLevelColourTypeID FROM [T100].[RiskLevelColourType] WHERE ColorName = 'Orange');
DECLARE @RedID INT = (SELECT RiskLevelColourTypeID FROM [T100].[RiskLevelColourType] WHERE ColorName = 'Red');

INSERT INTO [T100].[RiskMatrixTypeColour] (RiskMatrixTypeID, LikelihoodLevel, ConsequenceLevel, RiskLevelColourTypeID, RiskScore, CreatedByUserID)
VALUES 
    -- Row 1 (Very Unlikely)
    (@DefaultMatrixID, 1, 1, @GreenID, 1, @SystemUserID),
    (@DefaultMatrixID, 1, 2, @GreenID, 2, @SystemUserID),
    (@DefaultMatrixID, 1, 3, @YellowID, 3, @SystemUserID),
    (@DefaultMatrixID, 1, 4, @YellowID, 4, @SystemUserID),
    (@DefaultMatrixID, 1, 5, @OrangeID, 5, @SystemUserID),
    -- Row 2 (Unlikely)
    (@DefaultMatrixID, 2, 1, @GreenID, 2, @SystemUserID),
    (@DefaultMatrixID, 2, 2, @YellowID, 4, @SystemUserID),
    (@DefaultMatrixID, 2, 3, @YellowID, 6, @SystemUserID),
    (@DefaultMatrixID, 2, 4, @OrangeID, 8, @SystemUserID),
    (@DefaultMatrixID, 2, 5, @OrangeID, 10, @SystemUserID),
    -- Row 3 (Possible)
    (@DefaultMatrixID, 3, 1, @YellowID, 3, @SystemUserID),
    (@DefaultMatrixID, 3, 2, @YellowID, 6, @SystemUserID),
    (@DefaultMatrixID, 3, 3, @OrangeID, 9, @SystemUserID),
    (@DefaultMatrixID, 3, 4, @OrangeID, 12, @SystemUserID),
    (@DefaultMatrixID, 3, 5, @RedID, 15, @SystemUserID),
    -- Row 4 (Likely)
    (@DefaultMatrixID, 4, 1, @YellowID, 4, @SystemUserID),
    (@DefaultMatrixID, 4, 2, @OrangeID, 8, @SystemUserID),
    (@DefaultMatrixID, 4, 3, @OrangeID, 12, @SystemUserID),
    (@DefaultMatrixID, 4, 4, @RedID, 16, @SystemUserID),
    (@DefaultMatrixID, 4, 5, @RedID, 20, @SystemUserID),
    -- Row 5 (Very Likely)
    (@DefaultMatrixID, 5, 1, @OrangeID, 5, @SystemUserID),
    (@DefaultMatrixID, 5, 2, @OrangeID, 10, @SystemUserID),
    (@DefaultMatrixID, 5, 3, @RedID, 15, @SystemUserID),
    (@DefaultMatrixID, 5, 4, @RedID, 20, @SystemUserID),
    (@DefaultMatrixID, 5, 5, @RedID, 25, @SystemUserID);

-- Hazard Category Types
INSERT INTO [T100].[HazardCategoryType] (CategoryTypeName, CategoryTypeDescription, CreatedByUserID)
VALUES 
    ('Physical', 'Physical hazards such as machinery, noise, temperature', @SystemUserID),
    ('Chemical', 'Chemical hazards including substances and fumes', @SystemUserID),
    ('Biological', 'Biological hazards such as bacteria, viruses', @SystemUserID),
    ('Ergonomic', 'Ergonomic hazards related to posture and repetitive tasks', @SystemUserID),
    ('Psychosocial', 'Workplace stress and mental health hazards', @SystemUserID),
    ('Environmental', 'Environmental factors affecting safety', @SystemUserID),
    ('Fire and Explosion', 'Fire, explosion and combustible material hazards', @SystemUserID),
    ('Electrical', 'Electrical hazards and power-related risks', @SystemUserID),
    ('Radiation', 'Ionizing and non-ionizing radiation hazards', @SystemUserID),
    ('Mechanical', 'Rotating equipment, pressure systems, and mechanical hazards', @SystemUserID),
    ('Transportation/Vehicle', 'Vehicle operations and material handling equipment', @SystemUserID),
    ('Confined Spaces', 'Hazards related to working in confined or restricted spaces', @SystemUserID),
    ('Security', 'Workplace violence, unauthorized access, and security risks', @SystemUserID),
    ('Working at Height', 'Falls from ladders, scaffolding, or elevated platforms', @SystemUserID),
    ('Housekeeping', 'Poor housekeeping leading to slips, trips, and other hazards', @SystemUserID),
    ('Lone Working', 'Risks associated with working alone or in isolation', @SystemUserID),
    ('Pressure Systems', 'Compressed air, steam, and hydraulic systems', @SystemUserID),
    ('Temperature Extremes', 'Exposure to extreme hot or cold environments', @SystemUserID),
    ('Noise and Vibration', 'Hearing damage and vibration-related injuries', @SystemUserID),
    ('Hazardous Substances', 'Asbestos, silica, lead, and other hazardous materials', @SystemUserID);

-- Control Measure Types (Hierarchy of Controls)
INSERT INTO [T100].[ControlMeasureType] (TypeName, TypeDescription, HierarchyLevel, CreatedByUserID)
VALUES 
    ('Elimination', 'Physically remove the hazard', 1, @SystemUserID),
    ('Substitution', 'Replace the hazard with something safer', 2, @SystemUserID),
    ('Engineering Controls', 'Isolate people from the hazard', 3, @SystemUserID),
    ('Administrative Controls', 'Change the way people work', 4, @SystemUserID),
    ('Personal Protective Equipment', 'Protect the individual worker', 5, @SystemUserID);

-- Risk Assessment Types
INSERT INTO [T100].[RiskAssessmentType] (TypeName, TypeDescription, CreatedByUserID)
VALUES 
    ('General Risk Assessment', 'Standard workplace risk assessment', @SystemUserID),
    ('Fire Risk Assessment', 'Assessment focused on fire safety', @SystemUserID),
    ('Manual Handling Assessment', 'Assessment for manual handling tasks', @SystemUserID),
    ('COSHH Assessment', 'Control of Substances Hazardous to Health assessment', @SystemUserID),
    ('Display Screen Equipment', 'DSE workstation risk assessment', @SystemUserID),
    ('Construction Risk Assessment', 'Risk assessment for construction activities', @SystemUserID),
    ('Lone Working Assessment', 'Assessment for lone working scenarios', @SystemUserID),
    ('Vehicle and Transport Assessment', 'Assessment for vehicle and transport operations', @SystemUserID);

-- Risk Assessment Format Types
INSERT INTO [T100].[RiskAssessmentFormatType] (FormatName, FormatDescription, CreatedByUserID)
VALUES 
    ('Standard Format', 'Standard risk assessment format', @SystemUserID),
    ('Quick Assessment', 'Simplified format for low-risk activities', @SystemUserID),
    ('Detailed Assessment', 'Comprehensive format for high-risk activities', @SystemUserID),
    ('Construction Format', 'Specialized format for construction activities', @SystemUserID),
    ('COSHH Format', 'Specialized format for chemical assessments', @SystemUserID);

-- Risk Assessment Status Types
INSERT INTO [T100].[RiskAssessmentStatusType] (StatusName, StatusDescription, ColorCode, WorkflowOrder, CreatedByUserID)
VALUES 
    ('Draft', 'Assessment is being prepared', '#6B7280', 1, @SystemUserID),
    ('Under Review', 'Assessment is being reviewed', '#3B82F6', 2, @SystemUserID),
    ('Approved', 'Assessment has been approved', '#10B981', 3, @SystemUserID),
    ('Published', 'Assessment is published and active', '#059669', 4, @SystemUserID),
    ('Requires Update', 'Assessment needs updating', '#F59E0B', 5, @SystemUserID),
    ('Expired', 'Assessment has expired and needs renewal', '#EF4444', 6, @SystemUserID),
    ('Archived', 'Assessment has been archived', '#6B7280', 7, @SystemUserID);

-- =============================================
-- Safe Systems of Work Reference Data
-- =============================================

-- SSOW Document Types
INSERT INTO [T100].[SSOWDocumentType] (TypeName, TypeDescription, TypeCategory, RequiresApproval, ReviewFrequencyMonths, CreatedByUserID)
VALUES 
    ('Standard Method Statement', 'Standard method statement for routine work', 'MethodStatement', 1, 12, @SystemUserID),
    ('High Risk Method Statement', 'Method statement for high-risk activities', 'MethodStatement', 1, 6, @SystemUserID),
    ('Construction Method Statement', 'Method statement for construction work', 'MethodStatement', 1, 12, @SystemUserID),
    ('Safe Working Procedure', 'General safe working procedure', 'SafeWorkingProcedure', 1, 24, @SystemUserID),
    ('Emergency Procedure', 'Emergency response procedure', 'SafeWorkingProcedure', 1, 12, @SystemUserID),
    ('Maintenance Procedure', 'Equipment maintenance procedure', 'SafeWorkingProcedure', 1, 12, @SystemUserID),
    ('Work Instruction', 'Detailed work instruction', 'WorkInstruction', 0, 24, @SystemUserID),
    ('Quality Instruction', 'Quality control work instruction', 'WorkInstruction', 1, 12, @SystemUserID);

-- SSOW Status Types
INSERT INTO [T100].[SSOWStatusType] (StatusName, StatusDescription, StatusCategory, ColorCode, WorkflowOrder, CreatedByUserID)
VALUES 
    ('Draft', 'Document is being prepared', 'Draft', '#6B7280', 1, @SystemUserID),
    ('Under Review', 'Document is being reviewed', 'Review', '#3B82F6', 2, @SystemUserID),
    ('Approved', 'Document has been approved', 'Approved', '#10B981', 3, @SystemUserID),
    ('Published', 'Document is published and active', 'Published', '#059669', 4, @SystemUserID),
    ('Requires Update', 'Document needs updating', 'Review', '#F59E0B', 5, @SystemUserID),
    ('Superseded', 'Document has been replaced by newer version', 'Archived', '#8B5CF6', 6, @SystemUserID),
    ('Withdrawn', 'Document has been withdrawn', 'Archived', '#EF4444', 7, @SystemUserID);

-- =============================================
-- Policies Reference Data
-- =============================================

-- Policy Types
INSERT INTO [T100].[PolicyType] (TypeName, TypeDescription, RequiresApproval, RequiresTraining, RequiresAcknowledgment, ReviewFrequencyMonths, CreatedByUserID)
VALUES 
    ('Corporate Policy', 'High-level corporate policies', 1, 0, 1, 24, @SystemUserID),
    ('Health & Safety Policy', 'Health and safety related policies', 1, 1, 1, 12, @SystemUserID),
    ('HR Policy', 'Human resources policies and procedures', 1, 1, 1, 24, @SystemUserID),
    ('IT Security Policy', 'Information technology and security policies', 1, 1, 1, 12, @SystemUserID),
    ('Quality Policy', 'Quality management and assurance policies', 1, 0, 1, 12, @SystemUserID),
    ('Environmental Policy', 'Environmental management policies', 1, 1, 1, 12, @SystemUserID),
    ('Financial Policy', 'Financial management and controls', 1, 0, 1, 12, @SystemUserID),
    ('Operational Policy', 'Day-to-day operational policies', 0, 0, 1, 24, @SystemUserID),
    ('Code of Conduct', 'Behavioral and ethical guidelines', 1, 1, 1, 12, @SystemUserID),
    ('Compliance Policy', 'Regulatory compliance policies', 1, 1, 1, 6, @SystemUserID);

-- Policy Status Types
INSERT INTO [T100].[PolicyStatusType] (StatusName, StatusDescription, StatusCategory, ColorCode, WorkflowOrder, CreatedByUserID)
VALUES 
    ('Draft', 'Policy is being prepared', 'Draft', '#6B7280', 1, @SystemUserID),
    ('Under Review', 'Policy is being reviewed', 'Review', '#3B82F6', 2, @SystemUserID),
    ('Approved', 'Policy has been approved', 'Approved', '#10B981', 3, @SystemUserID),
    ('Published', 'Policy is published and active', 'Published', '#059669', 4, @SystemUserID),
    ('Under Revision', 'Policy is being updated', 'Review', '#F59E0B', 5, @SystemUserID),
    ('Expired', 'Policy has expired and needs renewal', 'Expired', '#EF4444', 6, @SystemUserID),
    ('Superseded', 'Policy has been replaced by newer version', 'Archived', '#8B5CF6', 7, @SystemUserID),
    ('Withdrawn', 'Policy has been withdrawn', 'Archived', '#EF4444', 8, @SystemUserID);

PRINT 'Reference data inserted successfully';

-- Display summary of inserted data
SELECT 'Course Types' as DataType, COUNT(*) as RecordCount FROM [T100].[CourseType]
UNION ALL
SELECT 'Enrollment Status Types', COUNT(*) FROM [T100].[CourseEnrolmentStatusType]
UNION ALL
SELECT 'Risk Matrix Types', COUNT(*) FROM [T100].[RiskMatrixType]
UNION ALL
SELECT 'Risk Level Colors', COUNT(*) FROM [T100].[RiskLevelColourType]
UNION ALL
SELECT 'Hazard Category Types', COUNT(*) FROM [T100].[HazardCategoryType]
UNION ALL
SELECT 'Control Measure Types', COUNT(*) FROM [T100].[ControlMeasureType]
UNION ALL
SELECT 'Risk Assessment Types', COUNT(*) FROM [T100].[RiskAssessmentType]
UNION ALL
SELECT 'SSOW Document Types', COUNT(*) FROM [T100].[SSOWDocumentType]
UNION ALL
SELECT 'SSOW Status Types', COUNT(*) FROM [T100].[SSOWStatusType]
UNION ALL
SELECT 'Policy Types', COUNT(*) FROM [T100].[PolicyType]
UNION ALL
SELECT 'Policy Status Types', COUNT(*) FROM [T100].[PolicyStatusType];

GO