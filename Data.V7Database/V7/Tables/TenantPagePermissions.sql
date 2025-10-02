CREATE TABLE [V7].[TenantPagePermissions] (
    [TenantPagePermissionID] INT                IDENTITY (1, 1) NOT NULL,
    [TenantID]               INT                NOT NULL,
    [TenantRoleID]           INT                NOT NULL,
    [PageRoute]              NVARCHAR (255)     NOT NULL,
    [AccessLevel]            NVARCHAR (50)      NOT NULL,
    [IsGranted]              BIT                DEFAULT ((1)) NOT NULL,
    [CreatedDate]            DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([TenantPagePermissionID] ASC),
    CONSTRAINT [FK_TenantPagePermissions_Tenant] FOREIGN KEY ([TenantID]) REFERENCES [V7].[Tenant] ([TenantID]),
    CONSTRAINT [FK_TenantPagePermissions_TenantRole] FOREIGN KEY ([TenantRoleID]) REFERENCES [V7].[TenantRole] ([TenantRoleID]),
    CONSTRAINT [CK_TenantServicePermission_PageRoute] UNIQUE NONCLUSTERED ([PageRoute] ASC)
);

