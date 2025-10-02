CREATE TABLE [V7].[TenantServicePermission] (
    [TenantServicePermissionID] INT                IDENTITY (1, 1) NOT NULL,
    [TenantID]                  INT                NOT NULL,
    [ServiceName]               NVARCHAR (100)     NOT NULL,
    [IsEnabled]                 BIT                DEFAULT ((1)) NOT NULL,
    [CreatedDate]               DATETIMEOFFSET (7) DEFAULT (sysdatetimeoffset()) NOT NULL,
    PRIMARY KEY CLUSTERED ([TenantServicePermissionID] ASC),
    CONSTRAINT [FK_TenantServicePermission_Tenant] FOREIGN KEY ([TenantID]) REFERENCES [V7].[Tenant] ([TenantID]),
    CONSTRAINT [CK_TenantServicePermission_Name] UNIQUE NONCLUSTERED ([ServiceName] ASC)
);

