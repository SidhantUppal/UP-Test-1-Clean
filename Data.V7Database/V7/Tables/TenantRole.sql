CREATE TABLE [V7].[TenantRole] (
    [TenantRoleID]       INT            IDENTITY (1, 1) NOT NULL,
    [TenantID]           INT            NOT NULL,
    [Name]               NVARCHAR (100) NOT NULL,
    [DisplayName]        NVARCHAR (255) NOT NULL,
    [ParentSystemRoleID] INT            NULL,
    [IsCustomRole]       BIT            DEFAULT ((1)) NOT NULL,
    PRIMARY KEY CLUSTERED ([TenantRoleID] ASC),
    CONSTRAINT [FK_TenantRole_Tenant] FOREIGN KEY ([TenantID]) REFERENCES [V7].[Tenant] ([TenantID]),
    UNIQUE NONCLUSTERED ([TenantID] ASC, [Name] ASC),
    CONSTRAINT [CK_TenantRole_Name] UNIQUE NONCLUSTERED ([Name] ASC)
);

