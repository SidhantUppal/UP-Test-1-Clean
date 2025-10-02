CREATE TABLE [V7].[TenantElementPermissions] (
    [TenantElementPermissionID] INT                IDENTITY (1, 1) NOT NULL,
    [TenantID]                  INT                NOT NULL,
    [TenantRoleID]              INT                NOT NULL,
    [ElementPattern]            NVARCHAR (255)     NOT NULL,
    [PermissionType]            NVARCHAR (50)      NOT NULL,
    [IsGranted]                 BIT                DEFAULT ((1)) NOT NULL,
    [CreatedDate]               DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([TenantElementPermissionID] ASC),
    CONSTRAINT [FK_TenantElementPermissions_Tenant] FOREIGN KEY ([TenantID]) REFERENCES [V7].[Tenant] ([TenantID]),
    CONSTRAINT [FK_TenantElementPermissions_TenantRole] FOREIGN KEY ([TenantRoleID]) REFERENCES [V7].[TenantRole] ([TenantRoleID]),
    CONSTRAINT [CK_TenantElementPermissions_PageRoute] UNIQUE NONCLUSTERED ([ElementPattern] ASC)
);

