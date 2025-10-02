CREATE TABLE [dbo].[RoleNavigationPreferences] (
    [RoleNavigationPreferencesID] INT            IDENTITY (1, 1) NOT NULL,
    [RoleID]                      NVARCHAR (50)  NOT NULL,
    [RoleName]                    NVARCHAR (100) NOT NULL,
    [NavigationPreferences]       NVARCHAR (MAX) NOT NULL,
    [CreatedDate]                 DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    [UpdatedDate]                 DATETIMEOFFSET (7)       DEFAULT (sysdatetimeoffset()) NULL,
    PRIMARY KEY CLUSTERED ([RoleNavigationPreferencesID] ASC),
    CONSTRAINT [UQ_RoleNavigationPreferences_RoleID] UNIQUE NONCLUSTERED ([RoleID] ASC)
);

