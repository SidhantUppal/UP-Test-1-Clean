CREATE TABLE [V7].[SystemRolePermission] (
    [SystemRoleID] INT IDENTITY (1, 1) NOT NULL,
    [PermissionID] INT NOT NULL,
    PRIMARY KEY CLUSTERED ([SystemRoleID] ASC),
    CONSTRAINT [FK_SystemRolePermission_SystemPermission] FOREIGN KEY ([PermissionID]) REFERENCES [V7].[SystemPermission] ([PermissionID])
);

