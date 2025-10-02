CREATE TABLE [V7].[IncidentCaseViewerRole] (
    [IncidentCaseViewerRoleID] INT IDENTITY (1, 1) NOT NULL,
    [UserAreaID]               INT NOT NULL,
    [RoleID]                   INT NOT NULL,
    PRIMARY KEY CLUSTERED ([IncidentCaseViewerRoleID] ASC),
    CONSTRAINT [FK_IncidentCaseViewerRole_Role] FOREIGN KEY ([RoleID]) REFERENCES [V7].[Role] ([RoleID]),
    CONSTRAINT [FK_IncidentCaseViewerRole_UserArea] FOREIGN KEY ([UserAreaID]) REFERENCES [V7].[UserArea] ([UserAreaID])
);

