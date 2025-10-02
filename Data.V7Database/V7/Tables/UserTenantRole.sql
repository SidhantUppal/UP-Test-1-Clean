CREATE TABLE [V7].[UserTenantRole] (
    [UserTenantRoleID] INT                IDENTITY (1, 1) NOT NULL,
    [UserTenantID]     INT                NOT NULL,
    [TenantRoleID]     INT                NOT NULL,
    [AssignedAt]       DATETIMEOFFSET (7) NOT NULL,
    PRIMARY KEY CLUSTERED ([UserTenantRoleID] ASC),
    CONSTRAINT [FK_UserTenantRole_TenantRole] FOREIGN KEY ([TenantRoleID]) REFERENCES [V7].[TenantRole] ([TenantRoleID]),
    CONSTRAINT [FK_UserTenantRole_UserTenant] FOREIGN KEY ([UserTenantID]) REFERENCES [V7].[UserTenant] ([UserTenantID])
);

