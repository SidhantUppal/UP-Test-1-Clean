-- Make sure Network Service has access so that it can be run from IIS

--EXEC sp_addrolemember 'db_datareader', 'NT AUTHORITY\NETWORK SERVICE'
--EXEC sp_addrolemember 'db_datawriter', 'NT AUTHORITY\NETWORK SERVICE'
--EXEC sp_addrolemember 'db_owner', 'NT AUTHORITY\NETWORK SERVICE'

-- Run static data scripts
-- Ensure order is correct to handle dependencies

-- Static data - Core foundation tables (no dependencies)
:r .\StaticData\BSSTimeZone.StaticData.sql
:r .\StaticData\ThemeType.StaticData.sql

---- Static data - User/UserArea circular dependency resolution
---- Step 1: UserArea (references User but will be updated later)
:r .\StaticData\UserArea.StaticData.sql

---- Step 2: Bootstrap Users (creates system users for other tables to reference)  
:r .\StaticData\User.StaticData.sql

-- Static data - Tables that depend on Users existing
:r .\StaticData\AlertType.StaticData.sql
:r .\StaticData\Competency.StaticData.sql
:r .\StaticData\HazardCategoryType.StaticData.sql
:r .\StaticData\HazardSeverityType.StaticData.sql
:r .\StaticData\IncidentCategoryType.StaticData.sql
:r .\StaticData\IncidentType.StaticData.sql
:r .\StaticData\IncidentPriorityType.StaticData.sql
:r .\StaticData\IncidentSeverityType.StaticData.sql
:r .\StaticData\IncidentStatusType.StaticData.sql
:r .\StaticData\QuestionnaireStaticDataType.StaticData.sql
:r .\StaticData\TaskStatusType.StaticData.sql
:r .\StaticData\WorkProcessType.StaticData.sql
:r .\StaticData\Location.StaticData.sql

-- Step 3: User Roles (depends on User existing)
:r .\StaticData\Role.StaticData.sql

-- Step 4: Authentication tables (depend on User existing)
:r .\StaticData\ApiKey.StaticData.sql
