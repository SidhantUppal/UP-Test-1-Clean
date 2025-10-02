-- Update incidents icon in all role navigation preferences
USE [V7-Dev];
GO

-- New medical briefcase icon path (stroke-based)
DECLARE @newIcon NVARCHAR(500) = 'M20 7h-3V6a2 2 0 00-2-2H9a2 2 0 00-2 2v1H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 7h6V6H9v1zm3 3v6m-3-3h6';

-- Update admin role
UPDATE dbo.RoleNavigationPreferences 
SET NavigationPreferences = REPLACE(NavigationPreferences, 
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z', 
    @newIcon),
    UpdatedDate = sysdatetimeoffset()
WHERE RoleID = 'admin';

-- Update manager role
UPDATE dbo.RoleNavigationPreferences 
SET NavigationPreferences = REPLACE(NavigationPreferences, 
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z', 
    @newIcon),
    UpdatedDate = sysdatetimeoffset()
WHERE RoleID = 'manager';

-- Update employee role
UPDATE dbo.RoleNavigationPreferences 
SET NavigationPreferences = REPLACE(NavigationPreferences, 
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z', 
    @newIcon),
    UpdatedDate = sysdatetimeoffset()
WHERE RoleID = 'employee';

-- Update contractor role
UPDATE dbo.RoleNavigationPreferences 
SET NavigationPreferences = REPLACE(NavigationPreferences, 
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z', 
    @newIcon),
    UpdatedDate = sysdatetimeoffset()
WHERE RoleID = 'contractor';

-- Update readonly role
UPDATE dbo.RoleNavigationPreferences 
SET NavigationPreferences = REPLACE(NavigationPreferences, 
    'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z', 
    @newIcon),
    UpdatedDate = sysdatetimeoffset()
WHERE RoleID = 'readonly';

GO

-- Verify the updates
SELECT RoleID, RoleName, UpdatedDate 
FROM dbo.RoleNavigationPreferences 
WHERE NavigationPreferences LIKE '%' + 'M20 7h-3V6a2 2 0 00-2-2H9a2 2 0 00-2 2v1H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM9 7h6V6H9v1zm3 3v6m-3-3h6' + '%';

PRINT 'Incidents icon updated successfully in all role navigation preferences!';