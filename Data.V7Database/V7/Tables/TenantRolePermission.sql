CREATE TABLE [V7].[TenantRolePermission] (
    [TenantRolePermissionID] INT IDENTITY (1, 1) NOT NULL,
    [TenantID]               INT NOT NULL,
    [PermissionID]           INT NOT NULL,
    [IsGranted]              BIT DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([TenantRolePermissionID] ASC),
    CONSTRAINT [FK_TenantRolePermission_SystemPermission] FOREIGN KEY ([PermissionID]) REFERENCES [V7].[SystemPermission] ([PermissionID]),
    CONSTRAINT [FK_TenantRolePermission_Tenant] FOREIGN KEY ([TenantID]) REFERENCES [V7].[Tenant] ([TenantID])
);

