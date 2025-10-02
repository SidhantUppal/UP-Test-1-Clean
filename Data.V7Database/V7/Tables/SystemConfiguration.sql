CREATE TABLE [V7].[SystemConfiguration] (
    [SystemConfigurationID] INT            NOT NULL,
    [Name]                  NVARCHAR (30)  NOT NULL,
    [Description]           NVARCHAR (255) NOT NULL,
    [Value]                 NVARCHAR (255) NOT NULL,
    PRIMARY KEY CLUSTERED ([SystemConfigurationID] ASC),
    CONSTRAINT [CK_SystemConfiguration_Name] UNIQUE NONCLUSTERED ([Name] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_SystemConfiguration_Name_includes]
    ON [V7].[SystemConfiguration]([Name] ASC)
    INCLUDE([SystemConfigurationID], [Description], [Value]);

