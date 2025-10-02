-- Add Hazard Task Types - Hierarchical Task Types for Hazard Management
-- This script adds support for hierarchical task types and creates hazard-specific task types

-- =====================================================
-- PHASE 1: Update TaskType table structure
-- =====================================================

-- Add hierarchical support and tenant isolation to TaskType table
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[V7].[TaskType]') AND name = 'ParentTaskTypeID')
BEGIN
    ALTER TABLE [V7].[TaskType] ADD ParentTaskTypeID INT NULL;
    ALTER TABLE [V7].[TaskType] ADD CONSTRAINT FK_TaskType_Parent 
        FOREIGN KEY (ParentTaskTypeID) REFERENCES [V7].[TaskType](TaskTypeID);
    PRINT 'Added ParentTaskTypeID column to TaskType table';
END

IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[V7].[TaskType]') AND name = 'UserAreaID')
BEGIN
    ALTER TABLE [V7].[TaskType] ADD UserAreaID INT NULL; -- NULL = Global default, specific ID = tenant-specific
    PRINT 'Added UserAreaID column to TaskType table for tenant isolation';
END

-- =====================================================
-- PHASE 2: Create main Hazard Management task type
-- =====================================================

-- Insert main Hazard Management task type if it doesn't exist
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_MANAGEMENT')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard Management', 'HAZARD_MANAGEMENT', 'Tasks related to hazard identification, assessment, and management', '🚨', 14, NULL, 1);
    
    PRINT 'Created main Hazard Management task type';
END

-- =====================================================
-- PHASE 3: Create hazard sub-types matching existing hazard categories
-- =====================================================

-- Get the parent Hazard Management task type ID
DECLARE @ParentTaskTypeID INT;
SELECT @ParentTaskTypeID = TaskTypeID FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_MANAGEMENT';

-- Create hazard sub-types based on existing hazard categories
-- These align with the hazard category types already in the system

-- Physical Hazards
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_PHYSICAL')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Physical', 'HAZARD_PHYSICAL', 'Physical hazard management tasks (slips, trips, falls, manual handling, working at height)', '⚠️', @ParentTaskTypeID, 1, NULL, 1);
END

-- Chemical Hazards  
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_CHEMICAL')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Chemical', 'HAZARD_CHEMICAL', 'Chemical hazard management tasks (hazardous substances, COSHH, asbestos)', '🧪', @ParentTaskTypeID, 2, NULL, 1);
END

-- Biological Hazards
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_BIOLOGICAL') 
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Biological', 'HAZARD_BIOLOGICAL', 'Biological hazard management tasks (infectious diseases, bacteria, viruses)', '🦠', @ParentTaskTypeID, 3, NULL, 1);
END

-- Electrical Hazards
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_ELECTRICAL')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Electrical', 'HAZARD_ELECTRICAL', 'Electrical hazard management tasks (fixed installations, portable equipment, PAT testing)', '⚡', @ParentTaskTypeID, 4, NULL, 1);
END

-- Environmental Hazards
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_ENVIRONMENTAL')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Environmental', 'HAZARD_ENVIRONMENTAL', 'Environmental hazard management tasks (extreme weather, temperature, air quality)', '🌡️', @ParentTaskTypeID, 5, NULL, 1);
END

-- Ergonomic Hazards
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_ERGONOMIC')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Ergonomic', 'HAZARD_ERGONOMIC', 'Ergonomic hazard management tasks (display screen equipment, posture, repetitive tasks)', '🪑', @ParentTaskTypeID, 6, NULL, 1);
END

-- Fire and Explosion Hazards
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_FIRE')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Fire/Explosion', 'HAZARD_FIRE', 'Fire and explosion hazard management tasks (ignition sources, combustible materials)', '🔥', @ParentTaskTypeID, 7, NULL, 1);
END

-- Psychosocial Hazards
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_PSYCHOSOCIAL')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Psychosocial', 'HAZARD_PSYCHOSOCIAL', 'Psychosocial hazard management tasks (work stress, mental health, workplace relationships)', '🧠', @ParentTaskTypeID, 8, NULL, 1);
END

PRINT 'Created all hazard sub-type task types';

-- =====================================================
-- PHASE 4: Create system holding pen users (per tenant)
-- =====================================================

-- Create holding pen system users for UserAreaID = 1 (adjust as needed for other tenants)
DECLARE @UserAreaID INT = 1;

-- Hazard Task Queue - general holding pen for unassigned hazard tasks
IF NOT EXISTS (SELECT * FROM [V7].[User] WHERE Email = 'hazard-queue@system.local' AND UserAreaID = @UserAreaID)
BEGIN
    INSERT INTO [V7].[User] (UserAreaID, FullName, Email, IsActive, IsSystemUser, CreatedDate)
    VALUES (@UserAreaID, 'Hazard Task Queue', 'hazard-queue@system.local', 1, 1, GETUTCDATE());
    
    PRINT 'Created Hazard Task Queue system user';
END

-- Safety Manager Queue - higher-level holding pen for complex hazards
IF NOT EXISTS (SELECT * FROM [V7].[User] WHERE Email = 'safety-manager@system.local' AND UserAreaID = @UserAreaID)  
BEGIN
    INSERT INTO [V7].[User] (UserAreaID, FullName, Email, IsActive, IsSystemUser, CreatedDate)
    VALUES (@UserAreaID, 'Safety Manager Queue', 'safety-manager@system.local', 1, 1, GETUTCDATE());
    
    PRINT 'Created Safety Manager Queue system user';
END

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

PRINT '';
PRINT '=== VERIFICATION ===';
PRINT 'Hazard Task Types Created:';

SELECT 
    tt.TypeName,
    tt.TypeCode, 
    CASE WHEN tt.ParentTaskTypeID IS NULL THEN 'Main Type' ELSE 'Sub Type' END as TypeCategory,
    tt.Icon,
    tt.DisplayOrder
FROM [V7].[TaskType] tt
WHERE tt.TypeCode LIKE 'HAZARD_%' OR tt.TypeCode = 'HAZARD_MANAGEMENT'
ORDER BY tt.ParentTaskTypeID ASC, tt.DisplayOrder ASC;

PRINT '';
PRINT 'System Users Created:';
SELECT FullName, Email FROM [V7].[User] WHERE IsSystemUser = 1 AND Email LIKE '%system.local';

PRINT '';
PRINT 'Database updates completed successfully!';