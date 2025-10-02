-- Static data for V7.SystemPermission table
-- These correspond to the Permission enum values in Bus.Core.Enums.Permission

-- Clear existing data (if this is a refresh)
-- DELETE FROM [V7].[SystemPermission];

-- Insert static permission data
SET IDENTITY_INSERT [V7].[SystemPermission] ON;

INSERT INTO [V7].[SystemPermission] ([PermissionID], [Name], [DisplayName], [Layer], [Module], [Description])
VALUES
    (1, 'INCIDENT_CREATE', 'Create Incidents', 'API', 'Incidents', 'Allows user to create new incident cases'),
    (2, 'INCIDENT_VIEW', 'View Incidents', 'API', 'Incidents', 'Allows user to view incident cases'),
    (3, 'INCIDENT_EDIT', 'Edit Incidents', 'API', 'Incidents', 'Allows user to edit existing incident cases'),
    (4, 'INCIDENT_DELETE', 'Delete Incidents', 'API', 'Incidents', 'Allows user to delete incident cases'),
    (5, 'INCIDENT_CLOSE', 'Close Incidents', 'API', 'Incidents', 'Allows user to close incident cases'),
    (6, 'INCIDENT_VIEW_STATS', 'View Incident Statistics', 'API', 'Incidents', 'Allows user to view incident statistics and reports');

SET IDENTITY_INSERT [V7].[SystemPermission] OFF;