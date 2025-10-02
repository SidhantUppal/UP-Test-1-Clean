CREATE TABLE [dbo].[UserNavigationPreferences] (
    [UserNavigationPreferencesID] INT            IDENTITY (1, 1) NOT NULL,
    [UserID]                      INT            NOT NULL,
    [NavigationPreferences]       NVARCHAR (MAX) NOT NULL,
    [CreatedDate]                 DATETIMEOFFSET (7)       NULL,
    [UpdatedDate]                 DATETIMEOFFSET (7)       NULL,
    CONSTRAINT [PK_UserNavigationPreferences] PRIMARY KEY CLUSTERED ([UserNavigationPreferencesID] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_UserNavigationPreferences_UpdatedDate]
    ON [dbo].[UserNavigationPreferences]([UpdatedDate] DESC);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_UserNavigationPreferences_UserID_Unique]
    ON [dbo].[UserNavigationPreferences]([UserID] ASC);

