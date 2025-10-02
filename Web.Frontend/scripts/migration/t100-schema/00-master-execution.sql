-- =============================================
-- T100 Schema Migration - Master Execution Script
-- Purpose: Execute all T100 schema creation scripts in correct order
-- Author: Platform Team
-- Date: 2025-07-29
-- =============================================

USE [V7-Dev];
GO

PRINT '========================================';
PRINT 'Starting T100 Schema Migration';
PRINT 'Target Database: V7-Dev';
PRINT 'Date: ' + CONVERT(VARCHAR, sysdatetimeoffset(), 120);
PRINT '========================================';
GO

-- Step 1: Create T100 Schema
PRINT 'Step 1: Creating T100 Schema...';
:r "01-create-t100-schema.sql"
GO

-- Step 2: Create Training & E-Learning Tables
PRINT 'Step 2: Creating Training & E-Learning Tables...';
:r "02-training-elearning-tables.sql"
GO

-- Step 3: Create Risk Assessment Tables
PRINT 'Step 3: Creating Risk Assessment Tables...';
:r "03-risk-assessment-tables.sql"
GO

-- Step 4: Create Safe Systems of Work Tables
PRINT 'Step 4: Creating Safe Systems of Work Tables...';
:r "04-safe-systems-work-tables.sql"
GO

-- Step 5: Create Policies Tables
PRINT 'Step 5: Creating Policies Tables...';
:r "06-policies-tables.sql"
GO

-- Step 6: Insert Reference Data
PRINT 'Step 6: Inserting Reference Data...';
:r "05-reference-data.sql"
GO

PRINT '========================================';
PRINT 'T100 Schema Migration Completed Successfully';
PRINT 'Total Tables Created: ~80+ tables across 4 modules';
PRINT 'Modules: Training & E-Learning, Risk Assessment, Safe Systems of Work, Policies';
PRINT 'Date: ' + CONVERT(VARCHAR, sysdatetimeoffset(), 120);
PRINT '========================================';
GO

-- Verification Queries
PRINT 'Verification: Checking table counts by module...';

SELECT 'Training & E-Learning Tables' as Module, COUNT(*) as TableCount
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'T100' 
AND TABLE_NAME LIKE '%Course%'

UNION ALL

SELECT 'Risk Assessment Tables' as Module, COUNT(*) as TableCount
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'T100' 
AND (TABLE_NAME LIKE '%Risk%' OR TABLE_NAME LIKE '%Hazard%' OR TABLE_NAME LIKE '%Control%')

UNION ALL

SELECT 'Safe Systems of Work Tables' as Module, COUNT(*) as TableCount
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'T100' 
AND (TABLE_NAME LIKE '%Method%' OR TABLE_NAME LIKE '%Safe%' OR TABLE_NAME LIKE '%SSOW%' OR TABLE_NAME LIKE '%Work%')

UNION ALL

SELECT 'Policies Tables' as Module, COUNT(*) as TableCount
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'T100' 
AND TABLE_NAME LIKE '%Policy%'

UNION ALL

SELECT 'Total T100 Tables' as Module, COUNT(*) as TableCount
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_SCHEMA = 'T100';

PRINT 'Migration verification complete.';
GO