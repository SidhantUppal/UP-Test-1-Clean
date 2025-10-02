-- Add Hazard Task Types - Tasks Service Database Migration
-- Extends TaskType table to support hierarchical task types and creates hazard-specific task types
-- This script is idempotent and safe to run multiple times

PRINT 'Starting Hazard Task Types migration...';

-- =====================================================
-- PHASE 1: Update TaskType table structure for hierarchy
-- =====================================================

-- Add hierarchical support to TaskType table
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID('[V7].[TaskType]') AND name = 'ParentTaskTypeID')
BEGIN
    ALTER TABLE [V7].[TaskType] ADD ParentTaskTypeID INT NULL;
    ALTER TABLE [V7].[TaskType] ADD CONSTRAINT FK_TaskType_Parent 
        FOREIGN KEY (ParentTaskTypeID) REFERENCES [V7].[TaskType](TaskTypeID);
    PRINT 'Added ParentTaskTypeID column to TaskType table for hierarchical support';
END

-- Add tenant isolation support to TaskType table  
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
-- PHASE 3: Create hazard sub-types based on existing hazard categories
-- =====================================================

-- Get the parent Hazard Management task type ID
DECLARE @ParentTaskTypeID INT;
SELECT @ParentTaskTypeID = TaskTypeID FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_MANAGEMENT';

IF @ParentTaskTypeID IS NULL
BEGIN
    RAISERROR('Could not find Hazard Management parent task type', 16, 1);
    RETURN;
END

PRINT 'Creating hazard sub-types under parent TaskTypeID: ' + CAST(@ParentTaskTypeID AS NVARCHAR(10));

-- Physical Hazards (slips, trips, falls, manual handling, working at height)
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_PHYSICAL')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Physical', 'HAZARD_PHYSICAL', 'Physical hazard management tasks (slips, trips, falls, manual handling, working at height)', '⚠️', @ParentTaskTypeID, 1, NULL, 1);
    PRINT 'Created Physical Hazard task type';
END

-- Chemical Hazards (hazardous substances, COSHH, asbestos)
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_CHEMICAL')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Chemical', 'HAZARD_CHEMICAL', 'Chemical hazard management tasks (hazardous substances, COSHH, asbestos)', '🧪', @ParentTaskTypeID, 2, NULL, 1);
    PRINT 'Created Chemical Hazard task type';
END

-- Biological Hazards (infectious diseases, bacteria, viruses)
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_BIOLOGICAL')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Biological', 'HAZARD_BIOLOGICAL', 'Biological hazard management tasks (infectious diseases, bacteria, viruses)', '🦠', @ParentTaskTypeID, 3, NULL, 1);
    PRINT 'Created Biological Hazard task type';
END

-- Electrical Hazards (fixed installations, portable equipment, PAT testing)
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_ELECTRICAL')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Electrical', 'HAZARD_ELECTRICAL', 'Electrical hazard management tasks (fixed installations, portable equipment, PAT testing)', '⚡', @ParentTaskTypeID, 4, NULL, 1);
    PRINT 'Created Electrical Hazard task type';
END

-- Environmental Hazards (extreme weather, temperature, air quality)  
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_ENVIRONMENTAL')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Environmental', 'HAZARD_ENVIRONMENTAL', 'Environmental hazard management tasks (extreme weather, temperature, air quality)', '🌡️', @ParentTaskTypeID, 5, NULL, 1);
    PRINT 'Created Environmental Hazard task type';
END

-- Ergonomic Hazards (display screen equipment, posture, repetitive tasks)
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_ERGONOMIC')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Ergonomic', 'HAZARD_ERGONOMIC', 'Ergonomic hazard management tasks (display screen equipment, posture, repetitive tasks)', '🪑', @ParentTaskTypeID, 6, NULL, 1);
    PRINT 'Created Ergonomic Hazard task type';
END

-- Fire and Explosion Hazards (ignition sources, combustible materials)
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_FIRE')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Fire/Explosion', 'HAZARD_FIRE', 'Fire and explosion hazard management tasks (ignition sources, combustible materials)', '🔥', @ParentTaskTypeID, 7, NULL, 1);
    PRINT 'Created Fire/Explosion Hazard task type';
END

-- Psychosocial Hazards (work stress, mental health, workplace relationships)
IF NOT EXISTS (SELECT * FROM [V7].[TaskType] WHERE TypeCode = 'HAZARD_PSYCHOSOCIAL')
BEGIN
    INSERT INTO [V7].[TaskType] (TypeName, TypeCode, Description, Icon, ParentTaskTypeID, DisplayOrder, UserAreaID, IsActive)
    VALUES ('Hazard - Psychosocial', 'HAZARD_PSYCHOSOCIAL', 'Psychosocial hazard management tasks (work stress, mental health, workplace relationships)', '🧠', @ParentTaskTypeID, 8, NULL, 1);
    PRINT 'Created Psychosocial Hazard task type';
END

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

PRINT '';
PRINT '=== MIGRATION VERIFICATION ===';
PRINT 'Hazard Task Types Created:';

SELECT 
    tt.TaskTypeID,
    tt.TypeName,
    tt.TypeCode, 
    CASE WHEN tt.ParentTaskTypeID IS NULL THEN 'Main Type' ELSE 'Sub Type' END as TypeCategory,
    tt.Icon,
    tt.DisplayOrder,
    tt.IsActive
FROM [V7].[TaskType] tt
WHERE tt.TypeCode LIKE 'HAZARD_%' OR tt.TypeCode = 'HAZARD_MANAGEMENT'
ORDER BY tt.ParentTaskTypeID ASC, tt.DisplayOrder ASC;

PRINT '';
PRINT 'Hazard Task Types migration completed successfully!';
PRINT 'Ready for integration with hazard management system.';