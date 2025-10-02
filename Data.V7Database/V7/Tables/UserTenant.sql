CREATE TABLE [V7].[UserTenant] (
    [UserTenantID] INT           IDENTITY (1, 1) NOT NULL,
    [UserID]       INT           NOT NULL,
    [TenantID]     INT           NOT NULL,
    [Status]       NVARCHAR (20) DEFAULT ('Active') NULL,
    PRIMARY KEY CLUSTERED ([UserTenantID] ASC),
    CONSTRAINT [FK_UserTenant_Tenant] FOREIGN KEY ([TenantID]) REFERENCES [V7].[Tenant] ([TenantID]),
    CONSTRAINT [FK_UserTenant_User] FOREIGN KEY ([UserID]) REFERENCES [V7].[User] ([UserID])
);

