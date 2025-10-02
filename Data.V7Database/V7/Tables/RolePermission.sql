CREATE TABLE [V7].[RolePermission] (
    [RolePermissionID] INT IDENTITY (1, 1) NOT NULL,
    [RoleID]           INT NULL,
    [PermissionID]     INT NULL,
    [Permit]           BIT DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([RolePermissionID] ASC),
    CONSTRAINT [FK_RolePermission_PermissionID] FOREIGN KEY ([PermissionID]) REFERENCES [V7].[Permission] ([PermissionID]),
    CONSTRAINT [FK_RolePermission_RoleID] FOREIGN KEY ([RoleID]) REFERENCES [V7].[Role] ([RoleID])
);


GO
CREATE NONCLUSTERED INDEX [IX_RolePermission_RolePermission]
    ON [V7].[RolePermission]([RoleID] ASC, [PermissionID] ASC)
    INCLUDE([Permit]);

