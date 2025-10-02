-- Create RoleNavigationPreferences table in V7-Dev database
USE [V7-Dev];
GO

-- Drop table if it exists (for clean setup)
IF OBJECT_ID('dbo.RoleNavigationPreferences', 'U') IS NOT NULL
    DROP TABLE dbo.RoleNavigationPreferences;
GO

-- Create the RoleNavigationPreferences table
CREATE TABLE dbo.RoleNavigationPreferences (
    RoleNavigationPreferencesID INT IDENTITY(1,1) PRIMARY KEY,
    RoleID NVARCHAR(50) NOT NULL,
    RoleName NVARCHAR(100) NOT NULL,
    NavigationPreferences NVARCHAR(MAX) NOT NULL, -- JSON string containing preferences
    CreatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    UpdatedDate DATETIMEOFFSET (7) DEFAULT sysdatetimeoffset(),
    CONSTRAINT UQ_RoleNavigationPreferences_RoleID UNIQUE (RoleID)
);
GO

-- Create index for better performance
CREATE INDEX IX_RoleNavigationPreferences_RoleID 
ON dbo.RoleNavigationPreferences(RoleID);
GO

-- Grant permissions to v7_app user
GRANT SELECT, INSERT, UPDATE, DELETE ON dbo.RoleNavigationPreferences TO v7_app;
GO

-- Insert default preferences for different roles
-- Admin role - full access
INSERT INTO dbo.RoleNavigationPreferences (RoleID, RoleName, NavigationPreferences)
VALUES ('admin', 'Administrator', '{"primaryItems":[{"id":"home","name":"Home","icon":"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z","href":"/","permission":"dashboard.view"},{"id":"checklists","name":"Checklists","icon":"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z","href":"/checklists","permission":"checklists.view","hasDropdown":true},{"id":"documents","name":"Documents","icon":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z","href":"/documents","permission":"documents.view","hasDropdown":true},{"id":"incidents","name":"Incidents","icon":"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z","href":"/incidents","permission":"incidents.view","hasDropdown":true},{"id":"risk-assessments","name":"Risk Assessments","icon":"M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z","href":"/risk-assessments","permission":"risk-assessments.view","hasDropdown":true},{"id":"legal-register","name":"Legal Register","icon":"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z","href":"/legal-register","permission":"legal-register.view"},{"id":"assets","name":"Assets","icon":"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4","href":"/assets","permission":"assets.view"},{"id":"employees","name":"Employees","icon":"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z","href":"/employees","permission":"employees.view"}],"maxPrimaryItems":10,"lastUpdated":"' + CONVERT(VARCHAR, sysdatetimeoffset(), 127) + '"}');

-- Manager role - management focused
INSERT INTO dbo.RoleNavigationPreferences (RoleID, RoleName, NavigationPreferences)
VALUES ('manager', 'Manager', '{"primaryItems":[{"id":"home","name":"Home","icon":"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z","href":"/","permission":"dashboard.view"},{"id":"checklists","name":"Checklists","icon":"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z","href":"/checklists","permission":"checklists.view","hasDropdown":true},{"id":"incidents","name":"Incidents","icon":"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z","href":"/incidents","permission":"incidents.view","hasDropdown":true},{"id":"risk-assessments","name":"Risk Assessments","icon":"M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z","href":"/risk-assessments","permission":"risk-assessments.view","hasDropdown":true},{"id":"employees","name":"Employees","icon":"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z","href":"/employees","permission":"employees.view"},{"id":"documents","name":"Documents","icon":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z","href":"/documents","permission":"documents.view","hasDropdown":true},{"id":"training","name":"Training","icon":"M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z","href":"/training-records","permission":"training.view"},{"id":"tasks","name":"Tasks","icon":"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4","href":"/tasks","permission":"tasks.view"}],"maxPrimaryItems":8,"lastUpdated":"' + CONVERT(VARCHAR, sysdatetimeoffset(), 127) + '"}');

-- Employee role - essential operational tools
INSERT INTO dbo.RoleNavigationPreferences (RoleID, RoleName, NavigationPreferences)
VALUES ('employee', 'Employee', '{"primaryItems":[{"id":"home","name":"Home","icon":"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z","href":"/","permission":"dashboard.view"},{"id":"checklists","name":"Checklists","icon":"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z","href":"/checklists","permission":"checklists.view","hasDropdown":true},{"id":"incidents","name":"Incidents","icon":"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z","href":"/incidents","permission":"incidents.view","hasDropdown":true},{"id":"tasks","name":"Tasks","icon":"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4","href":"/tasks","permission":"tasks.view"},{"id":"training","name":"Training","icon":"M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z","href":"/training-records","permission":"training.view"},{"id":"elearning","name":"E-Learning","icon":"M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z","href":"/e-learning","permission":"elearning.view"}],"maxPrimaryItems":6,"lastUpdated":"' + CONVERT(VARCHAR, sysdatetimeoffset(), 127) + '"}');

-- Contractor role - contractor-specific tools
INSERT INTO dbo.RoleNavigationPreferences (RoleID, RoleName, NavigationPreferences)
VALUES ('contractor', 'Contractor', '{"primaryItems":[{"id":"home","name":"Home","icon":"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z","href":"/","permission":"dashboard.view"},{"id":"contractors","name":"Contractors","icon":"M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2m8-10a4 4 0 100-8 4 4 0 000 8zm8 6v-6M19 15l-3 3 3 3","href":"/contractors","permission":"contractors.view","hasDropdown":true},{"id":"permits","name":"Permits","icon":"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z","href":"/permits","permission":"permits.view","hasDropdown":true},{"id":"incidents","name":"Incidents","icon":"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z","href":"/incidents","permission":"incidents.view","hasDropdown":true},{"id":"checklists","name":"Checklists","icon":"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z","href":"/checklists","permission":"checklists.view","hasDropdown":true},{"id":"documents","name":"Documents","icon":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z","href":"/documents","permission":"documents.view","hasDropdown":true}],"maxPrimaryItems":6,"lastUpdated":"' + CONVERT(VARCHAR, sysdatetimeoffset(), 127) + '"}');

-- ReadOnly role - view-only access
INSERT INTO dbo.RoleNavigationPreferences (RoleID, RoleName, NavigationPreferences)
VALUES ('readonly', 'Read Only', '{"primaryItems":[{"id":"home","name":"Home","icon":"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z","href":"/","permission":"dashboard.view"},{"id":"incidents","name":"Incidents","icon":"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z","href":"/incidents","permission":"incidents.view","hasDropdown":true},{"id":"risk-assessments","name":"Risk Assessments","icon":"M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z","href":"/risk-assessments","permission":"risk-assessments.view","hasDropdown":true},{"id":"legal-register","name":"Legal Register","icon":"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z","href":"/legal-register","permission":"legal-register.view"},{"id":"documents","name":"Documents","icon":"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z","href":"/documents","permission":"documents.view","hasDropdown":true}],"maxPrimaryItems":5,"lastUpdated":"' + CONVERT(VARCHAR, sysdatetimeoffset(), 127) + '"}');

GO

PRINT 'RoleNavigationPreferences table created successfully!';

-- Check the table structure
SELECT 
    COLUMN_NAME, 
    DATA_TYPE, 
    CHARACTER_MAXIMUM_LENGTH, 
    IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'RoleNavigationPreferences'
ORDER BY ORDINAL_POSITION;
GO

-- Verify the sample data
SELECT RoleID, RoleName, CreatedDate FROM dbo.RoleNavigationPreferences;
GO