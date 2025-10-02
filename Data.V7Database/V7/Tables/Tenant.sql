CREATE TABLE [V7].[Tenant] (
    [TenantID]        INT            IDENTITY (1, 1) NOT NULL,
    [Name]            NVARCHAR (255) NOT NULL,
    [AzureADTenantID] NVARCHAR (255) NOT NULL,
    [Status]          NVARCHAR (20)  DEFAULT ('Active') NOT NULL,
    PRIMARY KEY CLUSTERED ([TenantID] ASC),
    CONSTRAINT [CK_Tenants_Name] UNIQUE NONCLUSTERED ([Name] ASC)
);

